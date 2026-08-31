# Message auditeur -> Pilote

MESSAGE-ID : AUD-002-R
EN-REPONSE-A : AUD-002
DATE : 2026-08-31
AGENT : auditeur (facebook-ads)
OBJET : Audit indépendant de la branche `dev-001-boucle-qualite` avant intégration

---

## 1. Pré-vol — hashes réellement lus

**Hub `infra-agents-competences`** — branche `main`
- `c1f5b880f568d2fbb9e89d0c5f722a41eefdb5a0` (relu après `git fetch` ; la boîte
  a bougé pendant la mission : `4d5eb35d…` → `c33ae630…` → `c1f5b880…`)
- Lus : `gouvernance-projet.md`, `standards-communs/organisation-agents.md`,
  `fiche-auditeur.md`, `message-pilote-auditeur.md` (AUD-002),
  `referentiel-initial.md` (DOC-001), `message-architecte-concept-pilote.md`
  (ARCH-001-R), `message-ingenieur-developpeur-pilote.md` (DEV-001-R),
  `message-auditeur-pilote.md` (AUD-001-R).

**`facebook-ads-backend`**
- `main` : `b297f75ce874799b428435e229d177a570e56944` (référence de comparaison)
- `dev-001-boucle-qualite` : `c4bad743ffc1a81fd699e0989dd4ca96c177bbc9`
  (2 commits d'avance : `2d1a63b6…` puis `c4bad743…` ; 17 fichiers,
  +2733 / −6 lignes)
- `saas` : `8152f03806bc7b297b35367a7d4ab49ee68cd3ff` — non lue, non touchée

**`facebook-ads-frontend`**
- `main` : `7975a80e1c1b42880d9be2a4faf0dbb8ecf58882` — lu uniquement
  `js/conversions.js` pour la compatibilité des sorties consommées

### Méthode

Lecture intégrale des 17 fichiers du diff. En complément, exécution de la suite
de tests versionnée et de sondes de calcul **hors dépôt**, sur des bases SQLite
temporaires (`DATA_DIR=/tmp/...`) : aucune écriture dans les dépôts, aucune
base de production touchée. `git status` des deux clones vérifié vierge en fin
de mission ; les deux HEAD sont restés aux hashes ci-dessus.

Les constats chiffrés du §5 sont **reproduits, pas déduits** : chaque valeur
citée est une sortie d'exécution.

---

## 2. Vérification point par point de la commande AUD-002 §2

| # | Point demandé | Verdict |
|---|---|---|
| 1 | Score non inerte, déterministe, explicable | **conforme** sur le mécanisme — **réserve majeure R3** sur ce qu'il produit |
| 2 | Exclusions non rachetables par le score | **conforme en calcul** — **réserve majeure R1** sur le palier persisté |
| 3 | Override humain prioritaire et traçable | **conforme** |
| 4 | Attribution `ad_id`/`campaign_id`/`adset_id` persistée | **conforme** pour `ad_id`/`campaign_id` — **réserve mineure m1** : `adset_id` jamais alimenté |
| 5 | Événements idempotents, sans double comptage | **conforme** |
| 6 | Alertes configurables, dédupliquées, sans donnée inventée | **conforme** en conception — **réserve majeure R5** : jamais déclenchées |
| 7 | CAPI désactivée, aucun envoi réel possible | **conforme** — vérifié par lecture exhaustive |
| 8 | Garde-fou prompts empêchant une activation incohérente | **conforme** dans son principe — **réserve mineure m2** : inventaire partiel |
| 9 | Paramètres métier non validés restés provisoires | **conforme** — **réserve mineure m3** : aucune validation des valeurs écrites |
| 10 | 35 tests couvrant les invariants annoncés | **conforme en nombre** — **réserve majeure R1** : l'invariant d'exclusion n'est testé que sur la fonction pure, pas sur la persistance |
| 11 | Absence de régression évidente sur les flux existants | **conforme** sous **réserve majeure R7** (chemin d'écriture des leads) |
| 12 | Frontend compatible sans modification | **conforme** — **réserve majeure R4** : compatible, mais inopérant sur une partie du parc |

---

## 3. Ce qui est confirmé conforme (vérifié, pas déclaré)

**CAPI ne peut pas émettre.** Recherche exhaustive : aucun client HTTP dans
`capi-service.js`, aucun appel à `dispatch()` ailleurs que sa propre
définition, et `dispatch()` lève une erreur inconditionnelle après contrôle des
verrous. Six blocages sont listés par `activationStatus()` (enabled, dry_run,
pixel/dataset, `CAPI_ACCESS_TOKEN`, garde-fou prompts, base légale RGPD).
`force` contourne la configuration mais jamais le garde-fou. **Le risque
d'envoi accidentel vers Meta est nul dans cette branche.** C'est le point le
plus sensible de la mission et il est tenu.

**Idempotence et cumulativité des événements.** `UNIQUE(lead_id, event_code)` +
`INSERT OR IGNORE` : le double comptage est impossible par le schéma, pas par
la discipline du code. Vérifié : `record()` renvoie `created:false` sur rejeu.
E6 est hors `event_map`, donc exclu de la file CAPI par construction — il n'y a
pas de conversion négative possible.

**Attribution figée sur l'événement.** `ad_id`/`campaign_id` sont désormais
persistés sur `leads` (constat AUD-C3 traité), recopiés sur chaque événement à
sa création, et le `COALESCE` de l'UPDATE empêche un re-sync d'écraser une
attribution connue par un `null`. Correct.

**Override humain.** Historisé dans `lead_score_overrides` avec le score
calculé conservé à côté, désactivation du précédent, priorité absolue dans
`effectiveScore()`. Conforme à ARCH §3.5 et exploitable par
`GET /api/quality/calibration`.

**Tests.** `npm test` : **35/35 réussis** (après `npm install`, absent du dépôt
par `.gitignore` — le premier lancement échoue tant que les dépendances ne sont
pas installées). Les intitulés correspondent aux invariants annoncés.

**Configuration.** Résolution defaults → env → SQLite, cache 30 s, clé inconnue
refusée, `provisional_params` exposé. Aucun seuil métier en dur ailleurs :
vérifié par lecture des cinq services.

**Compatibilité frontend.** `score_breakdown` est produit au format
`[{label, points}]`, exactement celui qu'attend `js/conversions.js:897`.
`score_tier` et `score_origin` sont additifs et ignorés sans effet. Aucune
modification du frontend n'est nécessaire. Le surcoût introduit sur
`GET /leads` a été mesuré : **30 ms pour 200 leads** — négligeable.

---

## 4. Réserves majeures

### R1 — Le palier persisté peut afficher A sur un lead exclu (le plus grave)

`savePredictive()` écrit `tier = COALESCE(lead_scores.tier, excluded.tier)` :
au recalcul prédictif, l'ancien palier est **conservé**, le nouveau ignoré.

Reproduit :

```
1er calcul prédictif        -> leads.score=100  score_tier=A
coordonnées rendues invalides, recalcul prédictif
2e calcul prédictif         -> leads.score=0    score_tier=A
                               lead_scores.exclusions=["coordonnees_invalides"]
```

Un lead **exclu**, à 0 point, reste affiché **palier A**. L'invariant « une
exclusion force le palier D » est vrai dans la fonction pure — le test 6 le
vérifie — et faux dans la donnée persistée, qui est la seule que voit
l'utilisateur et le frontend (`score_tier`). Le test ne l'a pas vu parce qu'il
teste `computeConsolidated()` et jamais `savePredictive()` suivi d'une
relecture.

Portée : E2 n'est pas menacé (la qualification statue sur le résultat frais, pas
sur la ligne stockée). Le défaut est d'affichage et de tri — c'est-à-dire
exactement la surface où AUD-001 avait qualifié le score de trompeur.

### R2 — Les exclusions consolidées sont effacées par un recalcul prédictif

Même mécanisme, effet inverse : `savePredictive()` écrit
`exclusions = excluded.exclusions` **sans** `COALESCE`. Reproduit :

```
après consolidé  -> tier=D  exclusions=["hors_zone","non_decisionnaire"]
après recalcul prédictif -> tier=D  exclusions=[]  (breakdown affiché : vide)
```

Un `POST /api/quality/recompute` — geste normal après un changement de
pondération, prévu par la conception — efface silencieusement les exclusions
constatées au téléphone. Conséquences : les exclusions disparaissent du détail
de score affiché, et l'alerte `QUALITE_PART_HORS_ZONE`, qui compte les
`exclusions` stockées, sous-estime durablement le hors-zone.

### R3 — Le score prédictif classe à l'envers de l'information disponible

Le score neutralise les critères sans information et les retire du
dénominateur. Le principe est juste ; son effet ne l'est pas quand la couverture
est faible. Sorties reproduites :

| Cas | Score | Palier | Couverture |
|---|---|---|---|
| Lead Messenger, téléphone valide, aucune autre donnée | **100** | **A** | 10 % |
| Lead Lead Ads renseigné (projet + budget + délai) | **58** | B | 25 % |
| Lead sans coordonnées exploitables | 0 | D | 10 % |

Le lead dont on ne sait **rien** sauf que son numéro est bien formé sort à
100/100 palier A, devant le lead correctement renseigné. Comme `leads.score`
alimente le tri par défaut, le badge Top 3 et le prompt SMS
(`routes/ai.js:3456`), la file de rappel est ordonnée à l'inverse de la richesse
d'information.

La couverture est calculée (`coverage_pct`) mais n'est ni persistée en colonne,
ni exposée dans `score_breakdown`, ni utilisée pour plafonner le palier. Rien
n'avertit l'utilisateur qu'un « A » repose sur 10 % de la grille.

Lecture d'auditeur : AUD-001 constatait un score **inerte**. DEV-001 le rend
actif, mais sur l'usage de priorisation il produit un classement inversé —
c'est-à-dire un défaut plus difficile à repérer que la constante à 50, puisqu'il
a l'apparence du travail. Le défaut n'est pas dans l'intention (la neutralisation
est la bonne idée) mais dans l'absence de garde-fou de couverture.

### R4 — Le moteur ne lit pas les champs Facebook réels

`inputFromLead()` cherche `raw.horizon`, `raw.delai`, `raw['quand']`,
`raw.code_postal`. Les formulaires réels utilisent des libellés français libres
et des valeurs à underscores — pièges déjà documentés (DOC-001 §6, chantier
`AI-SMS-GEN-01` encore ouvert). Reproduit sur un lead portant
`quel_type_de_projet_avez-vous_?`, `budget_estimé_?` et
`quand_souhaitez-vous_démarrer_les_travaux_?` :

```
breakdown obtenu : Coordonnées exploitables +10 | Besoin décrit +3 | Déclencheur identifié +1
```

L'horizon de démarrage — le critère le plus décisif du déclaratif, présent dans
la donnée — n'est pas lu. Le type de projet ne déclenche pas la reconnaissance
métier (`salle_de_bain` ne correspond pas au motif `salle de bain`). Le score
prédictif se réduit en pratique à « le téléphone est bien formé » plus une
heuristique de longueur de texte.

Détail à corriger au passage : l'entrée « Déclencheur identifié +1 » s'affiche
alors qu'aucun déclencheur n'a été identifié (ratio plancher de 0,2). Un libellé
qui affirme le contraire de ce qui s'est passé abîme précisément la
contestabilité recherchée par ARCH §3.5.

### R5 — Les alertes ne se déclenchent jamais toutes seules

`alerts.run()` n'est appelé que par `POST /api/quality/alerts/run`. Aucun
`setInterval`, aucune tâche planifiée, aucun appel depuis le frontend (non
modifié). Le dispositif est complet, correct, dédupliqué — et muet.

Cela vaut en particulier pour `INTEGRITE_BOUCLE_MUETTE`, que ARCH §4.4 et
AUD-001 désignent comme la condition de fiabilité de toute la boucle. En l'état,
l'alerte censée signaler qu'une boucle s'est tue est elle-même silencieuse tant
que personne ne l'interroge à la main. Le projet dispose pourtant déjà de deux
planificateurs (`syncService`, `auto-sms-service`) auxquels s'accrocher.

### R6 — E2, l'événement principal, n'a aucun déclencheur dans le produit livré

E2 n'est émis que par `evaluateQualification()`, appelée uniquement par
`POST /api/quality/score/:leadId/consolidated`. Le score consolidé exige des
constats de terrain (`extra` : zone, décisionnaire, horizon, budget, visite),
c'est-à-dire une saisie post-appel. **Aucun écran ne l'appelle** — le frontend
n'est pas modifié, conformément à la commande.

Conséquences en cascade, toutes vérifiées dans le code :
- aucun E2 ne sera produit en usage normal ;
- `INTEGRITE_VOLUME_E2_FAIBLE` se déclenchera en permanence (si un jour les
  alertes tournent) ;
- `QUALITE_TAUX_QUALIFICATION_BAS` lira 0 % en permanence ;
- `GET /calibration` restera vide, donc la boucle de recalibrage d'ARCH §3.6
  ne pourra pas démarrer.

Ce n'est pas un défaut d'exécution de DEV-001 : la saisie post-appel était
identifiée comme prérequis dès AUD-001 §4 et n'était pas dans son périmètre.
C'est un fait à porter à l'arbitrage : **la boucle livrée ne peut pas produire
son signal d'optimisation principal tant que cet écran n'existe pas.**

Deux dérivations CRM incomplètes s'y ajoutent :
- le statut **`terminé`** — statut terminal réel du pipeline, celui qui protège
  le lead de la résurrection dans `upsertLead` — n'est pas dans
  `CRM_STATUS_EVENTS` : un chantier passé directement à `terminé` ne produit
  **jamais E5**, donc jamais la vérité terrain qui sert au calibrage ;
- le SMS **automatique** (`auto-sms-service.js:299`), qui est le chemin de
  contact réel de la production, écrit `crm_status='contacté'` directement en
  base sans passer par la route PATCH ni enregistrer E1. Seul le SMS **manuel**
  (`routes/comms.js`) émet E1. La couverture de E1 est donc inverse de l'usage.

### R7 — Le chemin d'écriture des leads n'est plus protégé par try/catch

DEV-001-R §5 affirme : « les branchements dans le code existant sont sous
try/catch : une défaillance de la boucle qualité ne peut pas casser une fonction
de production ». C'est exact pour le scoring dans `syncService`, pour les
événements dans `routes/leads.js` et `routes/comms.js`, et pour le détail de
score exposé — vérifié.

Ce n'est **pas** exact pour `upsertLead()` : l'INSERT lui-même a été réécrit et
référence en dur `campaign_id`, `ad_id`, `adset_id`. Ces colonnes sont créées
par `initQualitySchema()`, dont l'appel est enveloppé dans un `try/catch` qui
**avale l'échec** (`database.js`, « Init schéma boucle qualité échouée »). Si
cette initialisation échoue pour une raison quelconque, le serveur démarre,
l'erreur est un simple log, et **toute ingestion de lead échoue ensuite** — le
cœur du métier, sur le chemin le plus critique du produit.

Le risque est faible en probabilité et maximal en conséquence. Il ne demande pas
grand-chose : soit ne pas avaler l'échec d'initialisation, soit construire
l'INSERT en fonction des colonnes réellement présentes.

---

## 5. Réserves mineures

- **m1 — `adset_id` n'est jamais alimenté.** La colonne est créée et écrite,
  mais `syncService.js:193` demande à Graph
  `id,created_time,field_data,ad_id,ad_name,campaign_id,campaign_name` : la
  ligne de champs n'a pas été modifiée. `adset_id` restera `null`. DEV-001-R §3
  affirme que les trois identifiants « étaient déjà demandés à Graph » — exact
  pour deux d'entre eux.
- **m2 — Inventaire du garde-fou partiel.** `PROMPT_BANS` recense 4 marqueurs,
  alors que le code contient d'autres interdictions Pixel/CAPI non inventoriées
  (`routes/ai.js:1578`, `4554`, `4556`, `4560`, `claude-api.js:379-380`).
  Le garde-fou reste en sécurité (il bloque tant qu'un marqueur subsiste), mais
  la garantie annoncée — « on ne peut pas retirer les interdictions sans mettre à
  jour l'inventaire » — n'est vraie que pour les quatre marqueurs choisis.
- **m3 — Aucune validation des valeurs de configuration.** `PUT /config/:key`
  accepte la clé mais jamais la valeur : des pondérations dont la somme ne fait
  pas 100, ou un `e2_threshold` négatif, sont acceptés sans contrôle. La clé
  `capi` est modifiable par API : sans conséquence tant que `dispatch()` n'est
  pas implémenté, à revoir au lot d'activation.
- **m4 — Le commentaire des défauts est inexact.** `quality-loop.defaults.js`
  annonce que le poids d'un axe inopérant est « redistribué » ; le code le
  **retire du dénominateur**, ce qui n'est pas la même chose et explique une
  partie de R3.
- **m5 — Aucune reprise de l'existant.** Rien ne recalcule les leads déjà en
  base au démarrage. Les 16 leads de production conserveront `score = 50`, sans
  ligne `lead_scores`, jusqu'à un `POST /recompute` manuel.

---

## 6. Comparaison explicite aux constats AUD-001

| Constat AUD-001 | État sur `dev-001-boucle-qualite` |
|---|---|
| **AUD-C1** — CAPI absente | **traité en préparation, non résolu par construction** : chemin complet, verrouillé, auditable ; aucun envoi possible. Conforme à la commande DEV-001 |
| **AUD-C2** — `leads.score` inerte | **partiellement traité** : la colonne est alimentée (R3 : mais le classement produit est inversé ; R1 : le palier peut être faux) |
| **AUD-C3** — attribution perdue | **traité** pour `ad_id`/`campaign_id` (m1 pour `adset_id`) |
| **AUD-M1** — aucune alerte | **traité en conception, non opérationnel** (R5 : aucun déclencheur) |
| **AUD-M2** — pas d'historique d'événements | **traité** : `lead_events` horodaté et idempotent constitue l'historique qui manquait. C'est l'apport le plus solide du lot |
| **AUD-M3** — vocabulaire CRM non contrôlé | **non traité** : la table de correspondance ajoute une seconde liste de libellés à côté de celles de `database.js`, sans référentiel commun, et omet `terminé` (R6) |
| **AUD-M4** — double score frontend volatil | **non traité** : `calculateLeadScore()` reste actif dans le tiroir. Deux scores contradictoires coexistent toujours |
| **AUD-M5** — justification heuristique fabriquée | **neutralisé là où un score existe**, **toujours actif ailleurs** : la condition `score_breakdown.length === 0 && lead.score > 0` reste vraie pour tout lead non scoré à `score = 50` par défaut — donc pour tout le parc existant (m5) et pour les leads Messenger, jamais scorés (le scoring n'est branché que sur `syncService`, pas sur `routes/webhook.js`) |
| **AUD-M6** — distinction reçu / qualifié inexistante | **traitée dans le modèle de données**, **pas encore dans les faits** (R6 : E2 sans déclencheur) |
| **AUD-M7 / E1-E3** — écarts documentaires | **traités** dans `docs/BOUCLE_QUALITE_DEV-001.md` et le §1 de DEV-001-R ; `CHECKLIST.md` et `FICHE_TECHNIQUE.md` restent à jour de rien |

---

## 7. Régressions

Aucune régression fonctionnelle constatée sur les flux existants :
- les branchements ajoutés dans `routes/leads.js`, `routes/comms.js` et
  `syncService.js` sont sous `try/catch` et ne peuvent pas interrompre le flux
  porteur ;
- aucune route existante n'a changé de contrat : `/leads` gagne trois champs
  additifs ; `PATCH /leads/:id/status` gagne un champ `quality_events` ;
- le surcoût mesuré sur `/leads` est de 30 ms pour 200 leads ;
- `DATA_DIR` reste au comportement de production sans la variable ;
- aucune table existante n'est altérée, seules des colonnes sont ajoutées.

Seule exception : **R7**, régression potentielle et non déclenchée, sur le
chemin d'écriture des leads.

---

## 8. Conclusion

**INTÉGRABLE SOUS RÉSERVES.**

Le lot est de bonne facture : additif, testé là où il n'y avait rien, verrouillé
sur le point dangereux (CAPI), et il apporte l'historique d'événements
horodaté qui manquait structurellement au projet. Rien ne s'oppose
techniquement à une intégration : elle n'introduit aucune régression constatée
et ne peut rien envoyer à Meta.

Ce qui s'y oppose est d'un autre ordre : **la boucle livrée ne boucle pas
encore**. Elle ne produit pas E2, ses alertes ne se déclenchent pas, et son
score, sur son seul usage réellement branché — la priorisation de la file de
rappel —, classe à l'inverse de l'information disponible.

Recommandation d'auditeur, à l'arbitrage du Pilote :

1. **Avant merge** — R1 et R7. Deux corrections courtes et sans discussion : un
   `COALESCE` mal placé qui fait mentir le palier, et un INSERT non défensif sur
   le cœur du métier.
2. **Avant tout usage du score comme priorité** — R2, R3, R4. Tant qu'ils
   tiennent, `leads.score` doit rester non affiché comme priorité : un
   classement faux avec l'apparence du calcul est plus coûteux qu'une colonne
   vide. C'est le même constat qu'en AUD-001, déplacé d'un cran.
3. **Avant de considérer la boucle opérationnelle** — R5 et R6 : un
   déclencheur périodique pour les alertes, la saisie post-appel qui produit E2,
   le statut `terminé` cartographié, E1 émis sur le SMS automatique.
4. **Au lot d'activation CAPI** — m2 et m3, avec l'amendement des prompts et
   l'arbitrage RGPD déjà réservés.

Aucune réserve bloquante au sens strict : rien dans cette branche ne met la
production en danger ni ne peut émettre vers Meta. Le risque réel n'est pas
technique, il est de lecture — présenter cette branche comme « boucle de qualité
livrée » ferait croire à un dispositif actif alors qu'il est, à ce stade, une
fondation correcte sans déclencheurs.

---

## 9. Cadre respecté

Lecture seule intégrale (règle 11). Aucun fichier modifié, créé ou supprimé dans
`facebook-ads-backend` et `facebook-ads-frontend` ; `git status` vierge et HEAD
inchangés (`c4bad743…`, `7975a80e…`). Aucun commit, aucune branche, aucun merge,
aucun déploiement. `main` non modifiée. `saas` non touchée. Aucun secret
consulté. Les exécutions de vérification ont eu lieu hors dépôt, sur bases
temporaires. Aucune correction n'est proposée sous forme de code : les réserves
ci-dessus deviennent, si le Pilote le décide, des demandes vers
l'ingénieur-développeur.

---

— auditeur · facebook-ads
