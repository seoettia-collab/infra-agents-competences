# Message auditeur -> Pilote

MESSAGE-ID : AUD-001-R
EN-REPONSE-A : AUD-001
DATE : 2026-08-31
AGENT : auditeur (facebook-ads)
OBJET : Audit du trou de tracking (CAPI), du score inerte et de l'absence d'alertes

---

## 1. Pré-vol documentaire — sources et hashes réellement lus

**Hub `infra-agents-competences`** — branche `main`
- `4d5eb35db17fc9f902a29776c6a10e5a60283d71` (relu après `git fetch` anti-cache ;
  hash identique avant/après refresh)
- Lus : `projets/facebook-ads/gouvernance/gouvernance-projet.md`,
  `standards-communs/organisation-agents.md`,
  `agents/auditeur/fiche-auditeur.md`,
  `agents/auditeur/message-pilote-auditeur.md` (AUD-001),
  `agents/documentation-technique/referentiel-initial.md` (DOC-001 v1.0),
  `agents/architecte-concept/message-architecte-concept-pilote.md` (ARCH-001-R),
  `agents/ingenieur-developpeur/message-ingenieur-developpeur-pilote.md` (DEV-001-R),
  `agents/gpt-pilote/message-direction-gpt-pilote.md`.

**`facebook-ads-backend`**
- `main` : `b297f75ce874799b428435e229d177a570e56944` (26/05/2026) — périmètre d'audit
- `dev-001-boucle-qualite` : `c4bad743ffc1a81fd699e0989dd4ca96c177bbc9` (31/08/2026) —
  existence constatée, **non fusionnée**
- `saas` : `8152f03806bc7b297b35367a7d4ab49ee68cd3ff` — gelée, non lue au-delà de
  `package.json`
- `docs/` inventorié : 3 fichiers — `ARCHITECTURE.md`, `CHECKLIST.md`,
  `FICHE_TECHNIQUE.md` (lus) + `README.md`
- Code lu sur les constats concernés : `services/database.js`,
  `services/syncService.js`, `services/claude-api.js`, `services/graph-metrics.js`,
  `routes/leads.js`, `routes/insights.js`, `routes/ai.js`, `server.js`,
  `package.json`

**`facebook-ads-frontend`**
- `main` : `7975a80e1c1b42880d9be2a4faf0dbb8ecf58882` (28/05/2026)
- `saas` : `7e2b8464831fdaa27aec0ede00468c1d39695598` — gelée, non lue
- Pas de dossier `docs/` (conforme). Racine inventoriée : `index.html`,
  `leads-deleted.html`, `MODIFICATIONS_INDEX_HTML.txt`, `assets/`, `css/`, `js/`
- Code lu sur les constats concernés : `js/conversions.js`

**Périmètre d'audit retenu.** AUD-001 vise `main` backend et frontend. La branche
`dev-001-boucle-qualite` n'est pas auditée au fond dans ce lot : elle n'est ni
fusionnée ni déployée, donc elle ne modifie pas l'état de la production. Elle est
signalée en §7 parce qu'elle change la lecture de plusieurs constats.

SaaS : aucune modification, aucun merge, aucune actualisation. Lecture seule
intégrale — aucun fichier de code ni de documentation n'a été écrit.

---

## 2. Réponse a) — confirmation ou infirmation par audit du code

### 2.1 CAPI absente — **CONFIRMÉ** (critique)

Aucune intégration Conversions API sur `main`. Vérifié par recherche exhaustive :
les seules occurrences de « CAPI » / « pixel » dans le code sont des
**interdictions adressées à l'IA**, pas des implémentations :

- `services/claude-api.js:376-380` — interdit de recommander Pixel, CAPI,
  Events Manager ;
- `routes/ai.js:1576-1578`, `4530-4560` — mêmes interdictions, formulées quatre
  fois ;
- aucun appel sortant vers `/<pixel_id>/events`, aucun `CAPI_ACCESS_TOKEN`,
  aucune file d'événements, aucune table dédiée.

Le flux est **strictement entrant** : `routes/insights.js`, `server.js:524`,
`routes/ai.js:1359` et `services/facebook-api.js:560` lisent
`actions` / `cost_per_action_type` depuis Graph Insights. Rien n'est jamais
renvoyé. Le constat du Pilote est exact, et il est la conséquence documentée de
la décision **D5** (DOC-001 §4) — ce n'est pas un oubli d'implémentation.

### 2.2 `leads.score` inerte — **CONFIRMÉ** (critique)

- `services/database.js:63` et `188-195` : colonne créée puis migrée en
  `INTEGER DEFAULT 50`.
- Recherche d'écriture (`SET score`, `score =`) sur l'ensemble du backend :
  **zéro occurrence**. `upsertLead()` (`database.js:573-596`) n'écrit pas la
  colonne, ni à l'INSERT ni à l'UPDATE.
- Lectures en revanche bien réelles : `getAllLeads()` trie
  `ORDER BY score DESC` (`database.js:598-603`), `routes/leads.js:206` calcule
  le badge `is_top3` à partir de ce tri, `routes/ai.js:3456` injecte
  `score || 50` dans le prompt SMS.

Conséquence mécanique : tous les leads valent 50. Le tri « par score » ordonne
des valeurs identiques — l'ordre affiché est celui, arbitraire, du critère de
départage (`created_time`). Le badge « Top 3 » désigne donc trois leads **sans
propriété commune**. Ce n'est pas un tri dégradé, c'est un tri qui affiche une
priorisation qu'il n'a pas calculée.

### 2.3 Aucun système d'alertes — **CONFIRMÉ** (majeur)

Aucun service, aucune route, aucune table, aucun planificateur d'alerte sur
`main`. Le mot « alertes » n'apparaît que dans un **gabarit de réponse JSON
demandé à l'IA** (`services/claude-api.js:422-425`) : c'est un champ de sortie de
texte généré, consommé par l'affichage, pas un dispositif de surveillance. Aucun
seuil, aucune persistance, aucun acquittement, aucune notification sortante.

### 2.4 Constats non demandés, relevés en cours d'audit

**C1 — attribution perdue à l'écriture (critique).** `services/syncService.js:193`
demande explicitement à Graph `ad_id` et `campaign_id`. Le schéma `leads`
(`database.js:108-120`) ne comporte **ni `ad_id`, ni `adset_id`, ni
`campaign_id`** : seuls `campaign_name` et `ad_name` sont persistés. Le lien
lead → publicité d'origine ne repose donc que sur des **libellés**, qu'un
renommage dans Meta suffit à rompre, sans trace. Conséquence directe sur la
mission : l'exigence ARCH §2.3 (« chaque événement rattaché à la publicité
d'origine, ce lien ne se perd jamais ») est **techniquement irréalisable en
l'état** — c'est un prérequis, pas un détail d'implémentation.

**C2 — aucun historique de statut CRM (majeur).** `crm_status` est une colonne
scalaire écrasée à chaque changement (`database.js:684`). Aucune table
d'historique, aucun horodatage de transition. Les dates des événements E1 à E5
d'ARCH §2.2 sont donc **non reconstituables rétroactivement** : la boucle ne
pourra pas être amorcée sur l'historique existant, seulement sur les leads à
venir.

**C3 — vocabulaire CRM non contrôlé (majeur).** `database.js:766-781` traite les
statuts par listes de synonymes en SQL (`'gagné','gagne','won','signé','signe',
'terminé','termine','converti'`…). Aucun enum, aucune contrainte. Un statut
saisi hors liste tombe silencieusement dans la catégorie par défaut. Un
événement de conversion déclenché sur cette base hériterait de cette imprécision
— et un événement faux envoyé à Meta est pire qu'aucun événement.

**C4 — second score, concurrent et volatil, côté frontend (majeur).**
`js/conversions.js:3595-3723` implémente `calculateLeadScore()`, un scoring
complet (âge, type de projet, budget, délai, malus « déjà contacté ») **entièrement
côté navigateur**, non persisté, jamais transmis au backend. Il alimente le
tiroir de détail (l. 3771, 3824, 3853) et le badge de priorité (l. 3728).
L'application affiche donc **deux scores différents pour le même lead** : celui
de la colonne (backend, constant à 50, libellé « Moyenne ») et celui du tiroir
(calculé, variable). Le second est **dépendant de l'heure d'affichage** : il
décroît de 30 points en 48 h par seule action du temps, sans qu'aucun fait
nouveau ne soit survenu.

**C5 — justification de score fabriquée à l'affichage (majeur).**
`js/conversions.js:896-906` : quand le backend ne fournit pas `score_breakdown`
— c'est-à-dire **toujours** —, le frontend **reconstitue un détail plausible par
heuristique** et l'affiche comme s'il expliquait le score. L'utilisateur lit une
justification qui n'a produit aucun point. C'est l'inverse exact de l'exigence
d'auditabilité d'ARCH §3.5 : un score opaque n'est pas contestable ; un score
faussement expliqué est pire, il est crédible.

---

## 3. Réponse b) — gravité réelle de l'absence de retour d'événements

**Gravité : critique.** Non pas parce qu'une fonction manque, mais parce que le
budget publicitaire finance en continu un apprentissage orienté à côté de la
cible.

Mécanique constatée : le seul signal de succès dont Meta dispose est la
soumission de formulaire. L'algorithme optimise donc la population qui
**soumet**, pas celle qui **signe**. Ces deux populations divergent
structurellement en rénovation (ARCH §0), et cette divergence est **auto-
renforçante** : chaque euro dépensé sans retour d'événement affine le ciblage
vers le profil le moins rentable. Le défaut ne stagne pas, il s'aggrave.

Trois circonstances aggravantes constatées dans le code :

1. **Il n'y a pas de mesure de substitution.** `routes/insights.js:86-100` calcule
   le CPL en comptant les leads de la base locale. Ce CPL est un coût par
   formulaire, jamais un coût par lead utile. Aucun indicateur du dashboard ne
   distingue les deux — le pilotage se fait donc sur un chiffre qui a l'air
   d'être une performance commerciale et qui est un volume.
2. **Le défaut est silencieux par construction.** Rien ne signale l'absence de
   retour : le système ne sait pas qu'il ne dit rien à Meta.
3. **Le verrou est double.** Activer CAPI sans amender les quatre blocs
   d'interdiction de `routes/ai.js` et `services/claude-api.js` produirait un
   outil qui envoie des événements pendant que son IA continue d'interdire d'en
   parler. Code et prompts appartiennent au même lot — c'est une contrainte, pas
   une préférence.

**Circonstance atténuante à ne pas taire.** ARCH §5.4 pose la question du volume
d'apprentissage, et elle est réelle : à quelques dizaines de leads/mois, le
volume d'événements E2 restera vraisemblablement sous le seuil d'apprentissage
de la plateforme. La boucle apportera alors un pilotage interne fiable **sans
effet algorithmique mesurable**. Cela ne réduit pas la gravité du trou, mais cela
déplace la justification de l'investissement : c'est un arbitrage Gérant, à
poser avant, pas à découvrir après.

---

## 4. Réponse c) — audit conceptuel de la distinction lead reçu / lead qualifié

**Constat central : la distinction n'existe nulle part dans le système actuel.**
Ni en base, ni dans l'interface, ni dans les indicateurs. Le mot « lead » désigne
partout la même chose : une ligne reçue de Meta.

Éléments vérifiés :

- **En base.** Aucune colonne ne porte la qualification. `crm_status` porte
  l'avancement commercial, ce qui n'est pas la même notion : un lead peut être
  « en cours » et disqualifié, ou « nouveau » et excellent.
- **Dans les indicateurs.** Le compteur de leads du Cockpit et le CPL comptent
  des formulaires reçus. Aucune vue ne présente un volume qualifié ni un coût
  par lead qualifié.
- **Dans l'IA.** `routes/ai.js:3715` mentionne un `sms_type: 'qualification'` —
  la qualification existe donc comme **intention de conversation**, jamais comme
  **état enregistré**. Ce que le commercial apprend au téléphone ne revient
  jamais dans le système sous une forme exploitable.

**Cohérence avec ARCH-001-R.** La spécification est solide sur ce point et
l'audit ne la contredit pas : séparation score prédictif (déclaratif, priorise)
/ score consolidé (vérifié, qualifie), exclusions sèches non rachetables,
primauté de la décision humaine. Trois observations d'auditeur :

1. **Le déclaratif est plus pauvre que la grille ne le suppose.** Les champs
   réellement présents dans `raw_fields` sont : type de projet, budget estimé,
   délai de démarrage (`js/conversions.js:3786-3788`). Rien sur le statut
   propriétaire/locataire, rien sur le déclencheur, rien de fiable sur la zone.
   Deux des quatre axes d'ARCH §1.2 (éligibilité, cohérence économique)
   **dépendent donc entièrement d'une saisie humaine post-appel qui n'existe pas
   encore**. Sans écran de saisie, la grille reste théorique.
2. **L'axe économique est inopérant par construction** tant que le ticket moyen
   n'est pas une donnée de référence (ARCH §5.2). 25 des 100 points ne sont pas
   calculables aujourd'hui.
3. **La zone n'est pas contrôlable automatiquement** : aucune donnée de zone
   desservie n'existe côté `main`, et l'adresse du lead n'est pas normalisée.

Ces trois points ne sont pas des défauts de la spécification : ce sont des
**prérequis de données** que la spécification suppose disponibles et qui ne le
sont pas. À traiter avant, pas pendant.

---

## 5. Réponse d) — gravité du score inerte et de l'absence d'alertes

### 5.1 Score inerte — **critique**

La gravité ne tient pas à l'absence de score. Elle tient à ce que **le système
affiche une priorisation qu'il ne calcule pas**. Un champ vide est honnête ; un
champ rempli d'une constante présentée comme une évaluation est trompeur.

Chaîne de tromperie constatée, du plus discret au plus grave :

1. tous les leads valent 50 ;
2. le tri « par score » et le badge « Top 3 » désignent des leads au hasard ;
3. le tiroir affiche un **second** score, calculé ailleurs, avec une autre
   échelle et une autre sémantique (C4) ;
4. ce second score **change tout seul avec le temps** ;
5. le détail « pourquoi ce score » est **fabriqué à l'affichage** (C5).

Le risque réel n'est pas informatique, il est commercial : l'utilisateur qui
fait confiance au Top 3 rappelle en priorité des leads que rien ne distingue,
pendant qu'un lead à fort potentiel attend. Un outil qui ne trie pas est
inefficace ; un outil qui trie faussement en affichant de la confiance est
nuisible. C'est la seconde situation.

Aggravation à signaler : `routes/ai.js:3456` injecte ce score dans le prompt de
rédaction SMS. Une constante sans signification alimente donc le raisonnement de
l'IA au rang de fait — contradiction frontale avec la décision **D6** (« l'IA est
une boîte à outils à règles »), qui exige que les contraintes soient écrites,
donc vraies.

### 5.2 Absence d'alertes — **majeur**, avec un volet critique

Absence d'alertes en général : majeur. Le projet est à l'arrêt depuis fin mai
2026 (DOC-001 §3) et dépend de composants à défaillance silencieuse — tokens
Meta à 60 jours (V8, refresh livré côté `saas` seulement), passerelle Android
(V7, incident déjà constaté), SQLite sans sauvegarde documentée (V5). Aucun de
ces trois défauts ne se manifeste par une erreur visible : ils se manifestent
par **l'absence de quelque chose**, ce qu'aucun utilisateur ne remarque à temps.

Volet critique : **l'alerte d'intégrité de boucle** d'ARCH §4.4. Une boucle CAPI
qui s'interrompt en silence laisse Meta réapprendre le volume pendant des
semaines, en dépensant. Auditeur concordant avec l'architecte sur ce point :
cette alerte n'est pas un confort d'exploitation, c'est la condition pour que la
boucle soit fiable plutôt que seulement présente. **Livrer CAPI sans elle serait
livrer un défaut plus difficile à détecter que celui qu'on corrige.**

Réserve d'auditeur sur ARCH §4 : quatorze seuils sont proposés pour un usage
mono-utilisateur. La sobriété est affirmée au §4.4 mais le volume proposé la
contredit. Recommandation : n'activer d'abord que l'intégrité de boucle et le
délai de premier contact, puis élargir sur constat. Une alerte ignorée est une
alerte morte, et elle rend suspectes celles qui l'accompagnent.

---

## 6. Réponse e) — divergences documentation / référentiel / code

| # | Source | Ce qui est écrit | Ce que dit le code | Gravité |
|---|---|---|---|---|
| E1 | `docs/CHECKLIST.md:156` | « Tri automatique par score — ✅ Production, Top 3 avec badge ⭐ » | Le tri existe, les valeurs triées sont identiques. Fonction annoncée en production, inopérante | majeur |
| E2 | `docs/FICHE_TECHNIQUE.md:460` | « `score` (INTEGER) : Score de qualification » | Constante `DEFAULT 50`, jamais écrite. La documentation nomme une intention comme si c'était un état | majeur |
| E3 | `docs/CHECKLIST.md` (global) | « 99 % », « aucun bug connu » | Documentation arrêtée au 23/04/2026 ; ~2 mois de livraisons non tracées. Chiffres non fiables — DOC-001 V3 le dit déjà, l'audit le confirme | majeur |
| E4 | DOC-001 §6 (V10) | « `package.json` désaligné (2.8.0) par rapport aux versions annoncées (3.5.x) » | `main` = **3.5.0** ; c'est `saas` qui est à 2.8.0. Le constat est exact mais **attribué à la mauvaise branche** | mineur |
| E5 | DOC-001 §5 | « la colonne `leads.score` (…) sert au tri par défaut et au badge Top 3, mais aucune ligne ne l'alimente » | Exact. Le référentiel ne mentionne pas le **second** score frontend (C4) ni la **justification fabriquée** (C5) : sous-estimation du périmètre réel du défaut | mineur |
| E6 | `docs/CHECKLIST.md:603` | « Pixel/CAPI (report : pas prioritaire pour Lead Ads) » | Cohérent avec D5 et avec le code. Aucune divergence — mais la mention « pas prioritaire » ne reflète plus l'arbitrage en cours | mineur |

Aucune divergence relevée entre ARCH-001-R et le code : la spécification ne
décrit pas d'existant, elle décrit une cible. Elle est cohérente avec ce que
l'audit constate.

---

## 7. Fait susceptible de modifier la lecture du Pilote

La branche `dev-001-boucle-qualite` (`c4bad743…`, 31/08/2026) existe sur le
dépôt backend et DEV-001-R déclare y traiter la boucle de qualité, dont C1
(attribution persistée), le score alimenté, les alertes et un chemin CAPI
verrouillé. **Elle n'est pas fusionnée : `main` reste `b297f75c…`.**

Conséquence pour le Pilote : tous les constats du présent rapport portent sur
l'état **déployé**, et ils restent tous vrais en production aujourd'hui. Ils ne
constituent pas un jugement sur le travail de DEV-001, qui n'était pas dans le
périmètre d'AUD-001 et que je n'ai pas audité au fond. Si un audit de cette
branche est souhaité — notamment sur C2 (historique de statut absent, donc
événements non reconstituables) et C3 (vocabulaire CRM non contrôlé), qui
conditionnent la fiabilité des événements produits —, il relève d'une mission
distincte à ouvrir.

---

## 8. Synthèse des constats par gravité

**Critique**
- AUD-C1 — CAPI absente ; flux Meta strictement entrant ; budget engagé sur un
  apprentissage orienté volume, défaut auto-renforçant et silencieux.
- AUD-C2 — `leads.score` inerte, mais **affiché comme une évaluation** : tri,
  Top 3 et badges induisent en erreur ; le score alimente en outre un prompt IA.
- AUD-C3 — Attribution `ad_id` / `campaign_id` demandée à Graph puis perdue à
  l'écriture ; le rattachement à la publicité ne tient qu'à des libellés.
  Prérequis bloquant de la boucle.

**Majeur**
- AUD-M1 — Aucun dispositif d'alertes ; l'alerte d'intégrité de boucle est la
  condition de fiabilité de toute activation CAPI.
- AUD-M2 — Aucun historique de statut CRM ; événements E1–E5 non reconstituables
  sur l'existant.
- AUD-M3 — Vocabulaire CRM non contrôlé (synonymes en SQL, aucune contrainte).
- AUD-M4 — Second score concurrent côté frontend, volatil dans le temps, non
  persisté ; deux scores contradictoires pour un même lead.
- AUD-M5 — Justification de score fabriquée par heuristique à l'affichage.
- AUD-M6 — Distinction lead reçu / lead qualifié inexistante en base, en
  indicateurs et en interface.
- AUD-M7 — Écarts documentaires E1, E2, E3 : fonctions annoncées en production
  qui ne le sont pas.

**Mineur**
- AUD-m1 — E4 : constat `package.json` de DOC-001 attribué à la mauvaise branche.
- AUD-m2 — E5 : périmètre du défaut de score sous-estimé dans DOC-001.
- AUD-m3 — E6 : mention « CAPI non prioritaire » de la CHECKLIST devenue caduque.

**Prérequis de données identifiés (ni défauts ni corrections — arbitrages)**
zone desservie · ticket moyen · statut décisionnaire · déclencheur · base légale
RGPD du périmètre transmis à Meta · écran de saisie post-appel sans lequel le
score consolidé d'ARCH §3.2 reste théorique.

---

## 9. Cadre respecté

Lecture seule intégrale (règle 11). Aucun fichier de code, de configuration ou
de documentation modifié dans `facebook-ads-backend` ni `facebook-ads-frontend`.
Aucune branche créée, aucun merge, aucun déploiement. Branche `saas` non
touchée. Aucun secret consulté. Aucune correction proposée sous forme de code :
les constats ci-dessus deviennent, s'il en est décidé ainsi par le Pilote, des
demandes vers l'ingénieur-développeur.

---

— auditeur · facebook-ads
