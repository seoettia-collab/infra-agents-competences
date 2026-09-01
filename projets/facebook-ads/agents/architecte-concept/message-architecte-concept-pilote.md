# Message architecte-concept -> Pilote

MESSAGE-ID : ARCH-003-R
EN-REPONSE-A : ARCH-003
DATE : 2026-09-01
AGENT : architecte-concept (facebook-ads)
OBJET : Concept fonctionnel — diagnostics natifs Meta en seconde source dans Audit/Reco

---

## 0. Pré-vol — ce qui a réellement été lu

| Source | Référence |
|---|---|
| Hub `infra-agents-competences` | `ed200d8` (01/09/2026) |
| Socle | `standards-communs/organisation-agents.md` (règles 1 à 15) |
| Gouvernance projet | `projets/facebook-ads/gouvernance/gouvernance-projet.md` |
| Référentiel DOC | `referentiel-initial.md` v1.0 |
| META-005 poussé | `5049d7e5191755ae8ff021842e4fc40fd1819953` |
| Mon rapport précédent | ARCH-002-R (`9ca136a`) |
| Backend `main` | `b297f75ce874799b428435e229d177a570e56944` (26/05/2026) |
| Frontend `main` | `7975a80e1c1b42880d9be2a4faf0dbb8ecf58882` (28/05/2026) |

Backend relu pour comprendre l'existant : `services/claude-api.js`, `routes/ai.js`
(routes `analyze`, `audit-config`, `audit-and-fix`, `audit-chat`, `execute-action`).
Frontend : `js/ai-recommendations.js`. Branche `saas` non ouverte (gelée).

**Correction à mon propre rapport** : ARCH-002-R indiquait la Meta Model API
« US-only ». META-005 établit au 01/09/2026 que l'accès a été élargi
(Muse Spark 1.2). **Ma réserve R1 est caduque.** Sans effet sur le présent lot :
le moteur IA n'est pas le sujet ici.

---

## 1. Principe directeur — trois voix, jamais fondues

La demande du Gérant tient en une phrase : savoir qui dit quoi. Le concept
repose donc sur une séparation stricte et permanente :

| Voix | Origine | Nature |
|---|---|---|
| **Mistral dit** | nos données + nos règles métier | notre diagnostic, fait autorité sur le métier |
| **Meta signale** | diagnostics du système Meta sur lui-même | information externe, jamais une décision |
| **L'IA synthétise** | Audit/Reco existant, qui voit les deux | recommandation finale, traçable |

Règle non négociable : **une recommandation affichée porte toujours la marque de
sa voix d'origine.** Aucune fusion silencieuse. Aucune reco Meta ne peut
apparaître comme si Mistral l'avait produite, et réciproquement.

**Meta conseille. Mistral analyse. Le Gérant décide.**

---

## 2. A — Périmètre V1

### 2.1 Ce que Meta expose réellement (vérifié le 01/09/2026)

La documentation officielle « Opportunity Score and Recommendations »
(Marketing API, mise à jour du **27/08/2026**) établit :

- `GET /act_<AD_ACCOUNT_ID>/recommendations` retourne les recommandations
  personnalisées du compte, chacune avec : un type, les objets concernés, un
  horodatage de création, un **estimé de gain** (`lift_estimate`), un **texte
  descriptif**, un **gain de score attendu** (`opportunity_score_lift`) et une
  **URL de lien profond vers Ads Manager**.
- Trois stades de recommandation : `pre_create_guidance` (avant création),
  `pre_flight_recommendation` (sur brouillon), `mid_flight_recommendation`
  (sur objets actifs). **Seul le stade « mid-flight » intéresse la V1.**
- L'**Opportunity Score 0–100** est un champ **du compte publicitaire**,
  actualisé en quasi temps réel, et il est retourné par la requête au niveau
  **portefeuille d'entreprise** (`GET /<BUSINESS_ID>/recommendations`).
- Meta documente explicitement trois façons d'appliquer une recommandation, dont
  l'**option 1 : lien profond vers Ads Manager**, présentée comme la voie
  adaptée aux applications de reporting et de dashboard. C'est exactement notre
  cas en V1.
- Avertissement officiel : **l'API peut renvoyer moins de recommandations que
  l'interface Ads Manager**. Notre bloc ne sera donc jamais exhaustif, et doit
  le dire.

### 2.2 Verdict élément par élément

| Élément | Verdict V1 | Motif |
|---|---|---|
| **Recommandations Meta (mid-flight, filtrées)** | **Utile V1 — cœur du lot** | Seule information réellement inaccessible à nos calculs ; livrée avec estimé de gain et lien d'application |
| **Opportunity Score (0–100)** | **Utile V1, sous conditions strictes** | Voir §2.4 — piège de lecture majeur |
| **Fatigue créative** (`CREATIVE_FATIGUE`, `CREATIVE_LIMITED`) | **Utile V1** | Meta la détecte sur des signaux de répétition d'exposition que nos métriques brutes ne permettent pas de déduire correctement |
| **Fragmentation des adsets** (`FRAGMENTATION_V3`) | **Utile V1** | Rejoint directement la recommandation META-005 « 1 campagne CBO, 1 adset broad » |
| **Qualité des leads** (`CONVERSION_LEADS_OPTIMIZATION`) | **Utile V1 en affichage seul** | Correspond au P0 de META-005 ; à ne pas appliquer avant arbitrage (§7) |
| **Learning / Learning Limited** | **Utile V1 si confirmé, sinon V2** | Nœud de référence Marketing API existant (`Ad Campaign Learning Stage Info`), **surface exacte à confirmer par DEV au jour J**. Ne pas concevoir de fonction qui en dépende |
| **Contraintes budgétaires** (`BUDGET_LIMITED`, `SCALE_GOOD_CAMPAIGN`) | **Utile V1 en affichage, marqué « en conflit »** | Structurellement opposé au mode réduction budget — voir §4 |
| **Budget pacing comme diagnostic distinct** | **Non confirmé** | Meta documente le pacing comme réglage, pas comme diagnostic exposé. Ne rien concevoir dessus |
| **Santé / qualité des signaux, EMQ** | **Plus tard (V2)** | Surface existante côté MCP et nœuds pixel, mais **sans objet aujourd'hui** : Mistral est en Lead Ads natif sans pixel ni CAPI active. Deviendra pertinent après DEV-002 |
| **Recos catalogue / boutique** (`APLUSC_*`, `PRODUCT_SET_BOOSTING`, `SHOPS_ADS_SAOFF`, `ADVANTAGE_PLUS_CATALOG_ADS`) | **Bruit** | Mistral n'a ni catalogue ni boutique |
| **Recos site web** (`PIXEL_UPSELL`, `LANDING_PAGE_VIEW_OPTIMIZATION_GOAL`, `OFFSITE_CONVERSION`, `VALUE_OPTIMIZATION_GOAL`) | **Bruit** | Pas de site instrumenté ; entre en outre en conflit avec D5 |
| **Recos partenaires messagerie** (`MESSAGING_PARTNERS`, `WA_MESSAGING_PARTNERS`, `PARTNERSHIP_ADS`) | **Bruit** | Sans objet à cette échelle |
| **Tests A/B natifs, lift studies** | **Bruit à ce volume** | Confirmé par META-005 : réservé aux gros volumes |
| **Délai de réponse aux messages** (`UNIFIED_INBOX`) | **Plus tard** | Le dashboard mesure déjà mieux ce point via son propre flux d'échanges |

### 2.3 Le filtre de pertinence EST la fonctionnalité

Meta documente une quarantaine de types de recommandations. Pour un artisan en
Lead Ads natif, sans catalogue, sans site marchand, **la majorité est hors
sujet**. Afficher la liste brute reviendrait exactement à créer « le second
cockpit confus » que la mission demande d'éviter.

Le concept V1 est donc : **liste blanche de types pertinents**, tout le reste
masqué mais **compté et annoncé** (« 9 autres suggestions Meta non pertinentes
pour votre configuration »). Compter plutôt que cacher : le Gérant doit savoir
qu'un filtre existe, sinon le filtre devient une boîte noire de plus.

La liste blanche est une **donnée métier révisable**, pas une constante gravée :
elle devra évoluer avec le compte.

### 2.4 Opportunity Score — piège de lecture à énoncer clairement

L'Opportunity Score **ne mesure pas la performance**. Il mesure la conformité du
compte aux réglages recommandés par Meta. Trois conséquences directes :

1. Un compte **volontairement contraint** — catégorie HOUSING, budget réduit
   assumé, pas de catalogue, pas de pixel — aura structurellement un score bas
   qu'il ne pourra jamais faire monter sans violer ses propres règles.
2. Le dashboard affiche déjà un `score_global` 0–100 produit par notre IA.
   **Deux scores sur 100 côte à côte qui ne mesurent pas la même chose, c'est la
   confusion garantie.**
3. Meta lui-même précise qu'un score élevé ne garantit aucune performance future.

**Décision de conception :** afficher le score de Meta **hors du registre visuel
de notre score**, avec un libellé qui dit ce qu'il est — « Meta · conformité aux
réglages recommandés : 62/100 » — et **ne jamais en faire un objectif**, ni un
KPI de suivi, ni un déclencheur d'alerte. C'est un indicateur de contexte.

**Dépendance technique à signaler** : le score est retourné par la requête au
niveau portefeuille d'entreprise. Si cet accès n'est pas ouvert, **V1 reste
viable sans le score** — les recommandations seules portent l'essentiel de la
valeur. Le score est un « bonus », pas un prérequis.

---

## 3. B — Présentation : le bloc « Vu par Meta »

La piste du Pilote est validée, avec des règles de cadrage.

### 3.1 Emplacement

Un bloc unique, **dans la vue IA Reco existante, sous le diagnostic Mistral**.
Pas de nouvel onglet, pas de nouvelle vue, pas de second cockpit. L'ordre de
lecture porte la hiérarchie : **on lit d'abord ce que Mistral conclut, ensuite
ce que Meta signale.**

### 3.2 Contenu et hiérarchie

```
VU PAR META                              Meta · lu il y a 12 min

Conformité aux réglages recommandés par Meta : 62/100
(indicateur Meta, distinct du score Mistral)

⚠ SIGNALE      Fatigue créative sur 2 publicités
               Estimation Meta : jusqu'à 8 % de coût par résultat en moins
               → Ouvrir dans Ads Manager

ℹ SUGGÈRE      Regrouper 2 ensembles de publicités similaires
               Estimation Meta : +14 points de conformité
               → Ouvrir dans Ads Manager

⛔ EN CONFLIT   Augmenter le budget des campagnes performantes
               Contraire à votre règle « réduction de budget » — non applicable

9 autres suggestions Meta non pertinentes pour votre configuration.
```

Trois registres, jamais mélangés :

| Registre | Définition | Comportement |
|---|---|---|
| **Signale** | Meta détecte un problème actif sur un objet en cours de diffusion | Priorité haute, remonte en tête |
| **Suggère** | Meta propose une optimisation de réglage | Priorité normale |
| **En conflit** | La suggestion contredit une règle Mistral | Affichée, expliquée, **non actionnable** |

### 3.3 Niveau de détail

Trois lignes maximum par entrée : quoi, gain estimé annoncé par Meta, lien.
Le texte descriptif de Meta est repris **tel quel et attribué** — nous ne le
reformulons pas, sous peine de brouiller la frontière entre les deux voix.
Traduction acceptable ; réinterprétation non.

### 3.4 Fraîcheur et source

Chaque bloc porte : la **source** (« Meta · Marketing API ») et **l'heure de
lecture**. Les recommandations Meta expirent — une entrée périmée doit
disparaître ou être marquée, jamais rester affichée comme si elle était vivante.

### 3.5 Comportement si la donnée est indisponible

Trois états explicites, jamais un blanc, jamais une valeur de repli inventée :

- **Aucune recommandation** → « Meta ne signale rien à ce jour. » (bon signe,
  à dire comme tel)
- **Donnée non accessible** (droit, appel en échec) → « Diagnostics Meta
  indisponibles — dernière lecture : <date>. » Le reste de l'Audit fonctionne
  normalement.
- **Fonctionnalité non confirmée** (ex. Learning) → **rien n'est affiché**. On
  ne montre pas un emplacement vide en attente.

**Règle absolue : l'indisponibilité de la couche Meta ne dégrade jamais
l'Audit/Reco Mistral.** La couche est un supplément, pas une dépendance.

### 3.6 Mention de conformité

Meta indique qu'appliquer une recommandation engage l'annonceur au regard de ses
conditions d'utilisation. Le lien profond doit donc **mener à Ads Manager**, où
l'application se fait sous les yeux et la responsabilité du Gérant — ce qui est
un argument de plus, non technique, en faveur de la lecture seule.

---

## 4. C — Arbitrage des conflits

### 4.1 Le conflit est le cas nominal, pas le cas limite

Point capital, vérifié dans la liste officielle des types de recommandations :
Meta produit nativement des recommandations qui **contredisent frontalement** les
règles en vigueur chez Mistral.

| Recommandation Meta documentée | Règle Mistral heurtée |
|---|---|
| `BUDGET_LIMITED` — « votre budget limite vos performances » | Mode réduction de budget (FB-AI-05/07) |
| `SCALE_GOOD_CAMPAIGN` — « augmentez les budgets » | Mode réduction de budget |
| `CAPI_CRM_SETUP`, `CAPI_CRM_GUIDANCE_V2`, `CAPI_PERFORMANCE_MATCH_KEY_V2` | Décision D5 (aucune reco CAPI) |
| `PIXEL_UPSELL`, `PIXEL_OPTIMIZATION_HI`, `SIGNALS_GROWTH_CAPI_V2` | Décision D5 (aucune reco pixel) |
| Recos touchant au ciblage d'audience | Garde-fous HOUSING |

Ce n'est pas un accident : Meta optimise pour la dépense et l'adoption de ses
automatisations ; Mistral optimise pour la rentabilité d'un artisan qui a déjà
assez de chantiers. **La règle d'arbitrage doit donc être conçue pour
fonctionner en permanence, pas exceptionnellement.**

### 4.2 Ordre de préséance (du plus fort au plus faible)

1. **Conformité HOUSING** — non négociable, aucune exception.
2. **Décision humaine explicite du Gérant** — mode réduction, pub ignorée, reco
   écartée. Une décision prise ne se fait pas rappeler par un tiers.
3. **Règles métier Mistral** — budget maximum, zone géographique réelle, plafond
   de pubs actives, D5 tant qu'elle n'est pas amendée.
4. **Recommandation Meta** — dernier rang.

### 4.3 Comportement en cas de conflit

- La recommandation est **affichée** dans le registre « En conflit », avec la
  règle heurtée nommée en clair.
- Elle est **non actionnable** : pas de lien d'application, pas d'exécution.
- Elle **n'entre pas** dans la synthèse de l'IA comme argument.
- Elle **n'est jamais supprimée silencieusement.**

Ce dernier point mérite d'être défendu. Masquer les conflits produirait un outil
confortable et menteur. Les afficher rend visible une information de valeur :
*« Meta pousse à dépenser plus ; nous avons choisi le contraire, et voici
pourquoi. »* Le conflit affiché est une preuve que les garde-fous fonctionnent.
S'il n'y a jamais de conflit, c'est le filtre qu'il faut suspecter.

### 4.4 Corollaire : aucun écrasement silencieux

Aucune donnée Meta ne peut modifier une règle, un seuil, un statut ou une
décision enregistrée. La couche Meta est **strictement en lecture, y compris
vis-à-vis de notre propre système.**

---

## 5. D — Rôle de l'IA existante

L'IA Audit/Reco n'est **pas remplacée** dans ce lot. Elle change de position :
elle passe d'analyste unique à **analyste qui dispose d'un second avis**.

Trois usages, dans cet ordre :

1. **Information brute visible** — le bloc « Vu par Meta » est lisible sans que
   l'IA intervienne. Si l'IA échoue, le bloc reste utile.
2. **Contexte supplémentaire pour l'analyse** — les recommandations Meta
   pertinentes et non conflictuelles sont fournies à l'IA **comme faits
   attribués**, jamais comme instructions. Le prompt doit énoncer que ce sont
   des observations d'un tiers, soumises aux mêmes règles métier que le reste,
   et que l'IA reste libre de les écarter en le justifiant.
3. **Synthèse finale** — l'IA peut converger avec Meta, diverger, ou signaler
   qu'un point est vu par les deux. **Une convergence Mistral + Meta est en soi
   une information forte**, et mérite d'être dite comme telle.

### 5.1 Traçabilité — exigence de fond

Toute recommandation importante de la synthèse doit porter son origine :
**Mistral**, **Meta**, ou **les deux**. Sans cela, la couche Meta contamine le
diagnostic métier sans qu'on puisse le constater, et on perd exactement ce que
la mission demande de préserver.

### 5.2 Garde-fous de prompt à conserver

Injecter des recommandations Meta dans le contexte de l'IA fait entrer dans le
prompt des textes qui parlent de pixel, de CAPI, de hausse de budget et
d'audiences. **Les interdits actuels (HOUSING, D5, mode réduction) doivent être
réaffirmés en tête de prompt, au-dessus des données Meta**, sinon la couche
Meta réintroduit par la bande ce que les règles interdisent. Le filtre de
pertinence du §2.3 est la première protection ; le prompt est la seconde.

---

## 6. E — Actions : lecture seule stricte

**V1 est en lecture seule côté diagnostics Meta. Sans exception.**

- Aucune action Meta automatique déclenchée par cette couche.
- Aucune pause, aucune hausse de budget, aucune modification de campagne au seul
  motif qu'un diagnostic Meta le recommande.
- Aucun branchement sur `execute-action` : la couche Meta **n'ajoute aucun type
  d'action** au dispositif existant.
- Les actions existantes du dashboard restent inchangées, soumises aux règles
  actuelles et à la validation de l'utilisateur.
- Le seul geste offert est **le lien profond vers Ads Manager**, où le Gérant
  applique lui-même, en conscience.

Écarté explicitement de la V1 : l'application par API
(`POST /act_<ID>/recommendations`). Techniquement disponible, mais elle
transfère à Meta le pouvoir de modifier le compte depuis notre interface —
contraire à la logique de garde-fous du projet et à la consigne du Pilote.

---

## 7. F — Surfaces Meta, classées

| Catégorie | Éléments | Utilisable en V1 |
|---|---|---|
| **1. Ads Manager uniquement** | Types de recommandations non exposés par l'API (Meta avertit que l'API peut en renvoyer moins que l'interface) | Non — à ne pas promettre |
| **2. Marketing API officielle** | `GET /act_<ID>/recommendations` ; Opportunity Score via requête portefeuille ; deep links Ads Manager | **Oui — socle de la V1** |
| **2 bis. Marketing API, surface à confirmer** | Learning / Learning Limited (nœud de référence existant) ; webhooks Ads « fatigue créative » et « recommandations » | Conditionnel — DEV confirme au jour J |
| **3. Ads MCP** (`mcp.facebook.com/ads`) | 7 familles d'outils dont signaux et jeux de données, journaux d'activité, tests A/B | Hors V1 — voir §7.1 |
| **4. Non confirmé / hypothèse** | Budget pacing exposé comme diagnostic ; EMQ hors contexte pixel/CAPI | **Ne rien concevoir dessus** |

### 7.1 Pourquoi l'API plutôt que le MCP en V1

Le MCP officiel est une **façade conversationnelle destinée à un agent IA**,
avec authentification par OAuth Business et accès en lecture **et en écriture**
au compte. Pour une lecture périodique de quelques champs dans un backend, la
Marketing API est le chemin direct, sans surface d'écriture à autoriser.

Le MCP reprend son intérêt le jour où l'on voudra un agent conversationnel
plus large — ce n'est pas ce lot. **Autoriser un connecteur en écriture est une
décision du Gérant**, pas un choix d'implémentation.

---

## 8. G — Relation avec DEV-002 / CAPI / D5

DEV-002 reste **NON ACTIVE**. Aucune activation CAPI dans ce lot.

**Livrable sans aucune dépendance à DEV-002 :** l'intégralité de la V1 décrite
ici. Recommandations Meta, filtre de pertinence, bloc « Vu par Meta », règles de
conflit, traçabilité. Rien n'attend la boucle qualité.

**Ce qui gagnera en valeur après activation et calibrage de DEV-002 :**
- Les recommandations liées à la qualité des leads
  (`CONVERSION_LEADS_OPTIMIZATION`) deviennent applicables au lieu d'être
  seulement informatives.
- La santé des signaux devient lisible : aujourd'hui, sans événements sortants,
  elle n'a rien à mesurer.
- La convergence Mistral/Meta devient vérifiable : notre score de qualité et les
  diagnostics Meta portent enfin sur la même réalité.

**Ce qui exige un arbitrage séparé sur D5 / CAPI / RGPD :**
- Meta expose nativement des recommandations CAPI et pixel. En V1 elles tombent
  dans « En conflit » au titre de D5, ce qui est **cohérent mais transitoire** :
  D5 date d'une époque sans site à instrumenter, et Meta documente désormais
  Conversions API for CRM pour les Lead Ads.
- **Tant que D5 n'est pas amendée, la V1 reste correcte et cohérente.** Aucune
  urgence créée par ce lot. Mais D5 devra être tranchée avant l'activation de
  DEV-002, sinon l'outil affichera un conflit permanent avec sa propre feuille
  de route.

---

## 9. H — Plan par phases

| Phase | Contenu | Prérequis | Risque production |
|---|---|---|---|
| **V1** | Diagnostics Meta natifs en lecture seule dans IA Reco : recommandations filtrées, Opportunity Score cadré, bloc « Vu par Meta », règles de conflit, traçabilité d'origine | Accès en lecture aux recommandations du compte | **Nul** — additif, derrière un interrupteur, aucune écriture |
| **V1.5** (optionnel) | Learning / Learning Limited si la surface est confirmée ; fatigue créative en flux poussé | Confirmation DEV | Nul |
| **V2** | Exploitation des signaux de qualité, convergence avec la boucle qualité | DEV-002 activée **et** calibrée, D5 arbitrée, RGPD tranché | Encadré |
| **V3** | Tests shadow de moteurs IA alternatifs | Intérêt réel démontré (cf. ARCH-002-R) | Nul (hors production) |

Le principe de ARCH-002-R tient toujours : **on ne change jamais deux couches à
la fois.**

---

## 10. Exclusions explicites de la V1

À écarter sans ambiguïté, pour que la mission DEV ne dérive pas :

1. Toute application de recommandation par API.
2. Tout branchement sur `execute-action`.
3. Toute connexion au MCP officiel, en lecture comme en écriture.
4. Toute activation CAPI, tout envoi d'événement.
5. Tout nouvel onglet, toute nouvelle vue, tout second cockpit.
6. Tout affichage de recommandations catalogue, boutique, site web ou partenaires.
7. Toute fonction reposant sur une surface non confirmée (budget pacing, EMQ).
8. Toute modification du Studio Pub ou du Rédacteur IA, servis par le même
   service backend et hors périmètre.
9. Tout remplacement ou modification du moteur IA existant.
10. Toute alerte automatique déclenchée par l'Opportunity Score.

---

## 11. Dépendances

| # | Dépendance | Nature | Bloquante pour V1 ? |
|---|---|---|---|
| D-1 | Accès en lecture aux recommandations du compte publicitaire | Droit/permission | **Oui** |
| D-2 | Accès niveau portefeuille pour l'Opportunity Score | Droit/permission | Non — V1 dégradée mais utile sans le score |
| D-3 | Vérification de l'état réel de la production (token Meta 60 j) | Opérationnel | **Oui** — projet à l'arrêt depuis fin mai 2026 |
| D-4 | Validation de la liste blanche de types pertinents par le Gérant | Métier | Oui, avant livraison |
| D-5 | Confirmation par DEV de la surface Learning | Technique | Non — élément V1.5 |
| D-6 | Arbitrage D5 / CAPI / RGPD | Gouvernance | Non pour V1, **oui pour V2** |

---

## 12. Critères de décision GO / NO-GO vers DEV

Le Pilote peut prononcer un **GO** si les cinq conditions suivantes sont
réunies :

1. Le principe « Meta conseille, Mistral décide » est validé par le Gérant, avec
   l'ordre de préséance du §4.2.
2. La lecture seule stricte (§6) est actée, y compris le refus de l'application
   par API.
3. La liste blanche de types pertinents (§2.2) est validée, et le principe
   « compter plutôt que cacher » accepté.
4. Le cadrage de l'Opportunity Score (§2.4) est accepté : indicateur de
   contexte, jamais un objectif, jamais dans le même registre que notre score.
5. L'accès D-1 est confirmé disponible, et l'état de la production vérifié (D-3).

**NO-GO** si l'une de ces conditions manque, en particulier si le Gérant
souhaite l'application directe des recommandations depuis le dashboard : ce
serait un autre lot, avec un autre profil de risque, et il devrait être
spécifié comme tel.

**Indicateur de réussite de la V1**, à fixer avant de coder : au bout de quatre
semaines, le Gérant doit pouvoir citer **au moins une décision** qu'il a prise
grâce au bloc « Vu par Meta » et qu'il n'aurait pas prise autrement. Si la
réponse est « je ne le regarde plus », la V1 a échoué — et il vaudra mieux la
retirer que la laisser encombrer l'écran.

---

## 13. Réserves

1. **R1 — Surfaces mouvantes.** Les recommandations Meta évoluent fréquemment
   (Meta le documente lui-même). La liste blanche et les types cités doivent
   être re-vérifiés par DEV au jour de l'implémentation, pas repris de ce
   rapport comme d'une constante.
2. **R2 — Volume réel de recommandations inconnu.** Sur un compte de cette
   taille, il est possible que Meta ne renvoie presque rien. Ce ne serait pas un
   échec technique, mais cela réduirait la valeur du lot. **À vérifier par une
   simple lecture avant d'engager la conception détaillée** — une heure de
   vérification peut éviter un lot entier.
3. **R3 — D5.** Doit être arbitrée avant V2. Sans effet sur V1.
4. **R4 — Reprise après arrêt.** Projet à l'arrêt depuis fin mai 2026 : vérifier
   tokens Meta, passerelle SMS et base avant tout chantier.
5. **R5 — Périmètre de service.** `services/claude-api.js` sert aussi le Studio
   Pub et le Rédacteur IA. La mission DEV doit borner son périmètre
   explicitement.

---

## 14. Cadre respecté

Aucun code, aucune modification backend ou frontend, aucun déploiement, branche
`saas` non ouverte, aucune activation CAPI. Les noms d'endpoints et de types de
recommandations figurent ici comme **constats de vérification de surface**
exigés par le point F de la mission, non comme prescriptions d'implémentation :
le « comment » appartient à l'ingénieur-développeur.

**Source officielle principale** : Meta for Developers, Marketing API,
« Opportunity Score and Recommendations », mise à jour du **27/08/2026**
(endpoints de lecture et d'application, stades de recommandation, champs
retournés, liste des types supportés, avertissement de couverture API vs Ads
Manager). Complétée par la documentation « Ads MCP Server » (mise à jour du
14/07/2026) et par META-005 (`5049d7e`).

---

## 15. Statut

Concept fonctionnel complet. Périmètre V1 arrêté, exclusions listées, règles
d'arbitrage définies, dépendances et critères GO/NO-GO fournis au Pilote.
Réserve saillante : **R2** — confirmer par une lecture réelle que le compte
reçoit effectivement des recommandations Meta avant d'engager DEV.

— architecte-concept · facebook-ads
