# Message architecte-concept -> Pilote

MESSAGE-ID : ARCH-002-R
EN-REPONSE-A : ARCH-002
DATE : 2026-08-31
AGENT : architecte-concept (facebook-ads)
OBJET : Étude concept — remplacement du moteur IA Audit / IA Reco par une IA Meta

---

## 0. Pré-vol — ce qui a réellement été lu

| Source | Référence lue |
|---|---|
| Hub `infra-agents-competences` | `ae3a29a` (31/08/2026) |
| Gouvernance projet | `projets/facebook-ads/gouvernance/gouvernance-projet.md` |
| Socle | `standards-communs/organisation-agents.md` (règles 1 à 15) |
| Référentiel DOC | `referentiel-initial.md` v1.0 (DOC-001) |
| Backend `main` | `b297f75ce874799b428435e229d177a570e56944` (26/05/2026) |
| Frontend `main` | `7975a80e1c1b42880d9be2a4faf0dbb8ecf58882` (28/05/2026) |

Fichiers backend inspectés : `services/claude-api.js` (1175 l.), `routes/ai.js`
(4700 l.), `services/prompts/communication-prompt.js`.
Frontend : `js/ai-recommendations.js` (2254 l.), `js/ai-creation.js` (3480 l.).

Branche `saas` : non ouverte, gelée et hors sujet, conformément à la mission.

---

## 1. Vérification préalable des faits Meta (sources officielles, août 2026)

La mission impose de ne rien supposer. Voici ce qui est établi.

**Meta Model API — existe, mais n'est pas ce qu'on croit**
- Lancée en **public preview le 9 juillet 2026**, avec **Muse Spark 1.1** comme
  premier et seul modèle (Meta Superintelligence Labs).
- Accès **réservé aux développeurs situés aux États-Unis**. Self-serve,
  compatible SDK OpenAI.
- C'est un **modèle généraliste** : agentique, code, multimodal, contexte 1 M
  tokens. Rien, dans la communication officielle Meta, n'évoque un accès
  privilégié aux données publicitaires.

**Point capital, à énoncer clairement au Gérant :**

> **Muse Spark ne connaît pas mieux Facebook Ads qu'un autre modèle.**
> C'est un modèle de raisonnement généraliste vendu par Meta, exactement comme
> Claude est vendu par Anthropic. Le fait que l'éditeur du modèle soit aussi
> l'éditeur de la régie publicitaire ne lui donne, à ce jour, **aucun accès
> supplémentaire aux données du compte, aucune donnée d'entraînement
> propriétaire déclarée sur les Ads, aucun signal interne d'enchère.**
> Il faudra toujours lui fournir NOS données, comme aujourd'hui.

**Meta AI (assistant grand public)** : autre produit, sans API publique. Hors
sujet pour un backend.

**Ce qui, en revanche, est réellement natif Meta et existe déjà :**
- **Ads MCP Server** (`https://mcp.facebook.com/ads`), connecteur AI officiel
  Meta ouvert le 29/04/2026, documentation mise à jour le 14/07/2026. Il expose
  la Marketing API à un agent IA en 7 familles d'outils : reporting,
  création/gestion, catalogues, **santé et qualité des signaux**, aide Business
  Help Center, tests A/B et lift studies, journaux d'activité.
- Les **recommandations de performance de Meta** exposées par la Marketing API
  (Performance Recommendations, diagnostics de signaux), ainsi que
  l'Opportunity Score visible dans Ads Manager.

C'est là que se trouve la vraie matière « native Meta » — **côté données, pas
côté modèle**. Ce constat oriente toute la suite du rapport.

---

## 2. A — Cartographie des fonctions actuelles à préserver

Le dashboard n'a pas « une IA ». Il a **quatre fonctions IA distinctes** dans le
périmètre Audit/Reco, plus des fonctions IA connexes hors périmètre.

### 2.1 Dans le périmètre de la mission

| Fonction | Point d'entrée | Ce qu'elle produit |
|---|---|---|
| **F1 — Analyse de performance** | `/api/ai/analyze` | JSON : `score_global`, résumé, points forts/faibles, 3 à 5 recommandations priorisées, alertes |
| **F2 — Audit de configuration** | `/api/ai/audit-config` | JSON : `score_config`, verdict, problèmes critiques, checklist 6 points (objectif, budget mini, ciblage IDF, catégorie HOUSING, optimization goal, formulaire lead) |
| **F3 — Audit-and-fix** | `/api/ai/audit-and-fix` | Analyse des pubs actives + corrections proposées et appliquées |
| **F4 — Copilote (chat contextuel)** | `/api/ai/audit-chat` | Réponse en français naturel, avec historique, sur la base du rapport d'audit courant. Conçu pour être **challengé** par Ricardo |

Fonctions annexes rattachées : `/api/ai/ab-test-analyze`,
`/api/ai/verify-reco-done`, système Ignore côté frontend.

### 2.2 Hors périmètre mais dépendant du même service

Studio Pub (`generate-content`, `generate-image`, `generate-accroches`,
`write-from-idea`), rédaction commerciale (`suggest-reply`,
`lead-reply-custom`, `commercial-reply`, `sms-generate`, `verify-text`).
Ces routes partagent `services/claude-api.js`. **Toute intervention sur le
moteur doit s'arrêter aux fonctions F1–F4** sous peine d'emporter le Studio Pub
et le Rédacteur IA, qui ne sont pas dans la commande.

### 2.3 Les règles métier — le vrai capital

C'est le point que le Gérant doit avoir en tête avant tout arbitrage. Les
prompts ne sont pas des questions posées à une IA : ce sont **des règlements**.
On y trouve, écrits noir sur blanc :

- **Mode réduction de budget** (FB-AI-05/07) : liste explicite de
  recommandations interdites (augmenter le budget, créer des pubs, élargir
  l'audience, réactiver une pub pausée…), avec priorité déclarée sur les
  « best practices Meta ».
- **Catégorie spéciale HOUSING** : interdiction absolue de mentionner l'âge, le
  genre ou toute analyse démographique, même descriptive, même si les données
  la montrent. Rayon géographique minimum imposé.
- **Décision D5** : interdiction formelle de recommander Pixel, CAPI ou Events
  Manager, jugés inapplicables au Lead Ads natif.
- **Budget en CBO** : interdiction de recommander un ajustement de budget sur
  une pub individuelle.
- Contraintes de forme : maximum 4 recommandations, 2 phrases par description,
  sortie JSON stricte sans markdown, cible sous 2500 tokens.
- Contrat de sortie complet, y compris le format `action_data` de `create_ad`
  (headline 40 car., 4 variantes, textes 125/255 car., CTA dans une liste fermée).

**Ces règles représentent des mois de terrain. Elles ne sont dans aucun modèle,
d'aucun fournisseur. Elles sont dans nos prompts.**

### 2.4 La couche d'actions exécutables

`/api/ai/execute-action` exécute réellement, contre la Graph API v25.0 :
`pause_ad`, `activate_ad`, `create_ad`, `adjust_budget`, `fix_age`, `fix_cta`,
`adjust_radius`. C'est du code applicatif Mistral, **totalement indépendant du
modèle**. Une recommandation n'a de valeur ici que si elle sort au bon format
`action_type` / `action_data` pour être exécutable en un clic.

---

## 3. B — Ce que « remplacer par une IA Meta » signifie réellement

Le système se décompose en **quatre couches**. Nommer ces couches est la
contribution principale de ce rapport, parce que la question du Gérant ne
concerne en réalité qu'une seule d'entre elles.

| Couche | Contenu | Propriétaire | Concernée par un changement de modèle ? |
|---|---|---|---|
| **C1 — Données** | Graph API v25.0 : campagnes, adsets, ads, insights, géo, créatifs, contexte métier | Meta (données) + notre collecte | Non |
| **C2 — Règles métier** | Prompts : réduction budget, HOUSING, D5, CBO, formats | **Mistral Pro Reno** | Non — à transporter à l'identique |
| **C3 — Moteur de raisonnement** | Claude Opus (`claude-opus-4-7`) | Anthropic | **Oui — c'est la seule couche visée** |
| **C4 — Actions** | `execute-action` vers la Graph API | Mistral Pro Reno | Non |

**Conclusion de cartographie : « remplacer l'IA par une IA Meta » = remplacer
C3, et rien d'autre.** C1, C2 et C4 restent intégralement notre système.

Ce qui serait « natif Meta » après l'opération : le fournisseur du modèle.
Ce qui resterait Mistral : la collecte, les règles, le contrat de sortie, les
actions, l'interface, le Copilote, le système Ignore — c'est-à-dire **le
produit**.

Autrement dit, dans le périmètre demandé, le changement porte sur environ **10 %
de la chaîne de valeur**, et sur la partie la moins différenciante : celle qui
est achetée sur étagère et remplaçable chez trois fournisseurs.

---

## 4. C — Comparaison des trois scénarios

### Scénario 1 — Remplacement total du moteur F1–F4

| | |
|---|---|
| **Bénéfices** | Fournisseur unique côté régie ; argument de cohérence d'écosystème ; coût au token annoncé inférieur à l'actuel |
| **Limites** | Aucun gain fonctionnel démontré ; les règles C2 doivent être réécrites et re-testées pour un modèle au comportement différent ; le contrat JSON strict et les garde-fous anti-troncature sont calibrés sur le modèle actuel |
| **Risques** | **Régression silencieuse sur la conformité HOUSING** : un modèle généraliste non contraint recommandera spontanément du ciblage démographique et du pixel/CAPI ; production en service ; F1–F4 partagent un service avec le Studio Pub |
| **Réversibilité** | Faible si la bascule est sèche |
| **Valeur métier** | **Nulle à négative en l'état** |

### Scénario 2 — Hybride / fallback

| | |
|---|---|
| **Bénéfices** | Continuité de service ; permet de préférer un moteur par fonction ; le projet maîtrise déjà ce motif (Studio Pub : GPT-5.5 avec repli Claude, décision D8) |
| **Limites** | Deux moteurs = deux comportements à qualifier, deux jeux de garde-fous, sorties potentiellement incohérentes d'une session à l'autre pour le même compte |
| **Risques** | Complexité de maintenance sur un projet tenu par une seule personne ; un fallback masque les défauts du moteur primaire au lieu de les révéler |
| **Réversibilité** | Bonne |
| **Valeur métier** | Faible — pertinent seulement APRÈS avoir démontré un gain |

### Scénario 3 — Test parallèle (shadow / A-B) avant toute bascule

| | |
|---|---|
| **Bénéfices** | Mêmes données, mêmes règles, deux moteurs, comparaison sur pièces ; **zéro risque production** ; produit une preuve au lieu d'une opinion |
| **Limites** | Demande un protocole de comparaison explicite et un peu de discipline de mesure |
| **Risques** | Coût de double appel sur la période de test — marginal au volume du compte |
| **Réversibilité** | **Totale** — rien n'est branché sur la production |
| **Valeur métier** | Élevée : c'est le seul scénario qui répond à la question « est-ce mieux ? » |

**Critères de comparaison à figer avant tout test** (sinon le test ne prouve
rien) : respect des interdits HOUSING et D5 ; respect du mode réduction ;
validité du JSON du premier coup ; part de recommandations réellement
exécutables via `execute-action` ; part de recommandations que Ricardo applique
vraiment ; tenue du Copilote quand il est contredit.

Ce dernier critère est sous-estimé : **le Copilote est explicitement conçu pour
être challengé** — reconnaître un argument valable, ou défendre sa position avec
des chiffres. C'est un comportement de modèle, difficile à spécifier, et c'est
la fonction la plus exposée à un changement de moteur.

---

## 5. D — Réponses explicites aux questions posées

**Une IA Meta peut-elle raisonnablement remplacer les fonctions Audit / Reco ?**
Techniquement oui, l'API étant compatible SDK OpenAI et la tâche relevant du
raisonnement généraliste sur des données fournies en entrée.
**Mais pas aujourd'hui pour ce projet** : la Meta Model API est en public
preview **réservée aux développeurs américains**. Mistral Pro Reno est une
entreprise française opérant en Île-de-France. **L'éligibilité géographique est
un obstacle dirimant, indépendant de toute considération de qualité.**
S'y ajoute le statut preview : pas d'engagement de stabilité, identifiants de
modèle susceptibles de bouger — inadapté à une production en service.

**Apporte-t-elle un avantage démontrable, ou est-ce un changement de
fournisseur ?**
En l'état des sources officielles : **c'est un changement de fournisseur de
modèle.** Aucun accès privilégié aux données Ads, aucun signal d'enchère, aucune
capacité d'analyse publicitaire spécifique n'est documenté. L'intuition « une IA
Meta comprendra mieux Facebook Ads » est séduisante et **non vérifiée** — elle
ne doit pas fonder une décision.

**Quelles données doivent toujours être fournies par notre dashboard ?**
Toutes. Sans exception : insights agrégés (dépense, impressions, clics, CTR,
CPC, CPL, portée, fréquence), structure du compte, statuts et créatifs des pubs
actives, données géographiques, contexte métier par campagne et par pub, état du
mode réduction et pubs flaggées, et l'intégralité des règles C2. Changer de
moteur ne délègue **aucune** de ces responsabilités à Meta.

**Quelles fonctions ne doivent surtout pas être cassées ?**
1. Les interdits HOUSING (âge, genre, démographie) — enjeu de conformité, pas de
   confort.
2. Le mode réduction de budget et sa priorité déclarée sur les best practices.
3. La décision D5 (aucune reco pixel/CAPI/Events Manager) tant qu'elle n'est pas
   amendée par ailleurs.
4. Le contrat de sortie JSON et le format `action_data`, dont dépend toute la
   couche C4 : une reco non exécutable est une reco perdue.
5. Le Copilote et sa capacité à être contredit.
6. Le Studio Pub et le Rédacteur IA — hors périmètre, mais servis par le même
   fichier : ils ne doivent pas être emportés par ricochet.

---

## 6. E — Recommandation finale

### Verdict : **NO-GO** sur le remplacement (scénarios 1 et 2). **TEST conditionnel** pour le scénario 3. **GO** sur une autre piste, qui est la vraie réponse au besoin.

**NO-GO immédiat**, pour trois motifs cumulatifs et indépendants :
1. Inéligibilité géographique (preview US-only) — bloquant, sans recours.
2. Statut preview — incompatible avec une production en service.
3. Aucun avantage démontré : ce serait payer un risque pour un changement de
   fournisseur.

**TEST conditionnel** — le scénario 3 devient recevable **si et seulement si**
la Meta Model API ouvre en Europe et sort de preview. Le test se fait alors hors
production, sur données réelles, sur les critères du §4. Bascule seulement en
cas de gain mesuré. La compatibilité SDK OpenAI rend ce test peu coûteux le jour
venu : c'est un argument pour attendre, pas pour se précipiter.

**GO recommandé — la piste réellement native Meta, et elle est disponible**

Le Gérant veut que le moteur d'analyse soit « issu de l'écosystème Meta ». La
réponse utile n'est pas de changer de LLM : c'est de **faire entrer les données
d'analyse de Meta dans l'audit**.

Aujourd'hui, F1 et F2 raisonnent sur des chiffres bruts. Or Meta publie ses
propres diagnostics — recommandations de performance, santé et qualité des
signaux, journaux d'activité, tests A/B et lift studies — accessibles par la
Marketing API et exposés par l'**Ads MCP Server** officiel, ouvert depuis le
29/04/2026.

Injecter ces éléments dans le contexte de l'audit rendrait le diagnostic
**réellement natif Meta**, tout en conservant intégralement C2, C3 et C4. Le
moteur importe peu ; ce qu'il a sous les yeux change tout.

**Migration progressive proposée, sans jamais exposer la production :**

| Étape | Contenu | Risque production |
|---|---|---|
| 1 | Spécifier l'enrichissement de F1/F2 par les diagnostics natifs Meta | Nul |
| 2 | Le faire porter par DEV en additif, derrière un interrupteur, sortie JSON inchangée | Nul (réversible par configuration) |
| 3 | Observer la qualité de l'audit enrichi sur quelques semaines | Nul |
| 4 | Le jour où la Meta Model API ouvre en Europe et sort de preview : test shadow C3, mêmes données, mêmes règles | Nul (hors production) |
| 5 | Bascule de moteur **seulement** si gain mesuré sur les critères du §4 | Encadré, réversible |

Le principe qui tient l'ensemble : **on ne change jamais deux couches à la
fois.** D'abord enrichir les données (gain probable, risque nul), ensuite —
peut-être, et sur preuve — changer le moteur.

---

## 7. Réserves portées au Pilote

1. **R1 — Éligibilité** : à re-vérifier avant toute reprise du sujet. Le statut
   « US-only, public preview » est daté du 9 juillet 2026 et peut évoluer. Ce
   rapport ne vaut que sous cette réserve.
2. **R2 — Décision D5** : la piste GO fait entrer les diagnostics de signaux
   Meta dans l'audit, alors que les prompts interdisent aujourd'hui toute
   mention de CAPI et d'Events Manager. **Arbitrage Gérant requis** : D5 doit
   être amendée, sinon l'outil contredira sa propre IA. Ce point rejoint la
   réserve R1 de DOC-001 et la spec ARCH-001 (boucle de qualité).
3. **R3 — Couplage de service** : F1–F4 partagent `services/claude-api.js` avec
   le Studio Pub et le Rédacteur IA. Toute mission DEV sur ce sujet doit borner
   explicitement son périmètre.
4. **R4 — Reprise après arrêt** : projet à l'arrêt depuis fin mai 2026. Avant
   d'ouvrir tout chantier, vérifier l'état réel de la production (tokens Meta
   60 j, passerelle SMS, base SQLite), conformément au §7 du référentiel.
5. **R5 — Autorisation d'un connecteur Meta** : un connecteur AI officiel donne
   un accès en lecture **et en écriture** au compte publicitaire. Le périmètre
   d'autorisation relève d'une décision du Gérant, pas d'un choix technique.

---

## 8. Cadre respecté

Aucun code, aucun endpoint applicatif à créer, aucun schéma de données, aucun
choix de bibliothèque, aucune modification de production, branche `saas` non
ouverte. Les URL et identifiants de modèles cités le sont comme **constats de
vérification**, pas comme prescriptions d'implémentation : le « comment »
appartient à l'ingénieur-développeur.

**Sources officielles utilisées** : blog Meta AI du 09/07/2026 (Muse Spark 1.1
et Meta Model API en public preview) ; blog développeurs Meta du 08/07/2026
(disponibilité US, compatibilité SDK OpenAI) ; documentation Meta for Developers
« Ads MCP Server », mise à jour du 14/07/2026 (7 familles d'outils, endpoint
hébergé, statut de connecteur AI officiel).

---

## 9. Statut

Étude terminée. Recommandation : **NO-GO** sur le remplacement, **TEST
conditionnel** différé, **GO** sur l'enrichissement de l'audit par les
diagnostics natifs Meta. Cinq réserves à l'arbitrage du Pilote et du Gérant,
dont R2 (amendement de D5) qui conditionne la piste GO.

— architecte-concept · facebook-ads
