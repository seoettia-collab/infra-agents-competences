<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Pilote -> META (meta-ads)

MESSAGE-ID : META-005
EN-REPONSE-A : META-004-BLOQUE
DATE : 2026-09-01

## CLÔTURE META-004

META-004 est close en statut **BLOQUÉ** pour une raison d'outillage : META n'a pas accès aux repos privés backend/frontend.
Ce blocage n'est pas une faute de mission.

Le Pilote a donc effectué lui-même le pré-vol produit sur les vrais dépôts et fournit ci-dessous le brief technique nécessaire.

META n'a plus à lire le code. À partir de META-005, son travail est **STRATÉGIE META/FACEBOOK uniquement**.

---

# META-005 — BRIEF PRODUIT VÉRIFIÉ PAR LE PILOTE

## 1. Références produit réellement lues

Production actuelle :
- backend `facebook-ads-backend/main` : `b297f75ce874799b428435e229d177a570e56944` ;
- frontend `facebook-ads-frontend/main` : `7975a80e1c1b42880d9be2a4faf0dbb8ecf58882`.

Le Pilote a lu directement dans le backend réel :
- `docs/ARCHITECTURE.md` ;
- `docs/FICHE_TECHNIQUE.md` ;
- rapports techniques/audits validés sur le code `main` ;
- structure réelle du frontend `main` et son dossier `js/`.

Attention : les docs datent du 23/04/2026 et peuvent être en retard sur le code. Quand elles divergent, **le code et les audits vérifiés font foi**.

## 2. Architecture fonctionnelle réelle du Dashboard

### Acquisition / Facebook Ads
Le Dashboard sait déjà :
- lire le compte publicitaire, campagnes, adsets, ads et insights Meta ;
- suivre dépense, impressions, clics, CTR, CPC/CPL, portée, fréquence et périodes ;
- afficher des analyses géographiques ;
- lister/filtrer les publicités ;
- activer/pauser des ads et adsets ;
- modifier des créatifs/textes ;
- créer/publier des publicités depuis le Studio Pub ;
- recevoir les Lead Ads et messages via Graph API/webhooks.

Frontend principal identifié :
- `cockpit.js` ;
- `ads-manager.js` ;
- `campaigns.js` ;
- `charts.js` ;
- `audiences.js` ;
- `creatives.js` ;
- `ai-recommendations.js` ;
- `ai-creation.js` ;
- `business-context.js` ;
- `conversions.js`.

### Conversion / CRM
Le Dashboard sait déjà :
- stocker et afficher les leads Facebook ;
- gérer statut CRM, note, archivage, suppression/restauration ;
- centraliser les échanges ;
- SMS sortants + SMS entrants ;
- Messenger ;
- email ;
- appels ;
- historique multi-canal ;
- auto-SMS et relances ;
- rédaction IA de messages et réponses contextuelles.

Stockage : SQLite backend.

### APIs / services externes
- Facebook Graph / Marketing API v25 ;
- Anthropic pour les fonctions IA d'analyse/rédaction ;
- OpenAI/DALL-E pour certaines créations d'images ;
- Twilio pour Voice ;
- Android SMS Gateway pour SMS ;
- SMTP OVH pour email.

## 3. IA Audit / Reco : ce qui existe déjà

Quatre fonctions distinctes sont déjà dans le produit :
1. **Analyse performance** : score, résumé, points forts/faibles, recommandations, alertes textuelles.
2. **Audit configuration** : objectif, budget, ciblage, catégorie spéciale, optimisation, formulaire.
3. **Audit-and-fix** : diagnostic + corrections proposées/exécutables.
4. **Copilote** : chat contextuel multi-tours pour challenger les recommandations.

Les recommandations peuvent alimenter des actions déjà codées : pause/activation de pub, création pub, ajustement budget, CTA/rayon selon le cas.

Le **Studio Pub** et le **Rédacteur IA** sont séparés du sujet Audit/Reco : ne pas les confondre avec le moteur de pilotage.

## 4. Règles métier déjà intégrées au produit

Les prompts actuels contiennent notamment :
- garde-fous catégorie spéciale HOUSING ;
- règles de réduction de budget ;
- règles CBO ;
- formats JSON / actions exécutables ;
- ancienne décision D5 interdisant à l'IA de recommander Pixel/CAPI/Events Manager.

D5 n'est PAS une vérité Meta éternelle. META peut recommander son réexamen, mais seul le Gérant/Pilote décide de l'amender.

## 5. État production vérifié — points importants

Sur `main` actuellement actif :
- **aucune CAPI active** : le système lit Meta mais ne renvoie pas la qualité réelle des leads ;
- le score backend historique `leads.score` est **inerte à 50** ;
- il existe aussi un scoring frontend différent dans `conversions.js` ;
- il n'existe pas de système formel d'alertes opérationnelles ;
- l'attribution lead -> ad/campaign est incomplète sur `main` ;
- le Dashboard fonctionne néanmoins en production.

## 6. DEV-002 — VALIDÉ MAIS NON ACTIF

Ne jamais le présenter comme production.

DEV-002 a été audité et déclaré intégrable mais n'est pas activé.
Il prépare notamment :
- score qualité fiable et auditable ;
- score prédictif + score consolidé ;
- exclusions bloquantes ;
- attribution ad/campaign/adset ;
- événements qualité idempotents ;
- alertes ;
- saisie de qualification après contact ;
- préparation CAPI verrouillée, **sans envoi Meta actif**.

Donc, pour tes stratégies :
- état actuel = production `main` ci-dessus ;
- évolution prochaine possible = DEV-002, mais NON ACTIVE.

---

# MISSION STRATÉGIQUE META-005

À partir de ce brief produit, donne uniquement des **stratégies Meta/Facebook**.

## A. Ce qu'il faut conserver / challenger
Pour chaque pratique actuelle : conserver / challenger / tester / abandonner, avec raison Meta.

## B. Acquisition locale IDF petit budget
Proposer la structure campagne/adset/créa adaptée à Mistral Pro Reno :
- broad / Advantage+ / ciblage ;
- nombre de campagnes/adsets/créas ;
- budget et montée en charge ;
- critères de maintien/coupure ;
- retargeting seulement si réellement pertinent.

## C. Lead Ads
Stratégie formulaire :
- friction ;
- Higher Intent si pertinent ;
- questions réellement qualifiantes ;
- volume vs qualité ;
- différences éventuelles par type de travaux.

## D. Créatives
Donner de vrais **angles stratégiques**, pas des variations cosmétiques : chantier réel, preuve, douleur, confiance, spécialisation, avant/après, UGC, urgence, etc.

Pour chaque angle majeur : hypothèse + protocole de test + KPI.

## E. Qualité des leads / CAPI for CRM
Réexaminer D5 avec l'état officiel Meta au 01/09/2026 :
- CAPI for CRM / datasets / Conversion Leads / qualified leads ;
- quels signaux sont pertinents avec notre faible volume ;
- lesquels sont trop rares ou prématurés ;
- comment tester sans polluer l'optimisation Meta.

Ne propose aucune implémentation technique.

## F. Diagnostics natifs Meta
Dire précisément quelles informations Meta pourrait apporter **en plus** des métriques déjà disponibles dans le Dashboard :
- Performance Recommendations ;
- Opportunity Score ;
- diagnostics qualité/santé des signaux ;
- learning diagnostics ;
- Ads MCP ;
- autres outils officiels actuels.

Séparer strictement :
- visible seulement dans Ads Manager ;
- accessible officiellement par Marketing API ;
- accessible par Ads MCP ;
- non confirmé / hypothèse.

## G. Meta Model API
ARCH-002 avait étudié Muse Spark 1.1. Depuis, META a vérifié que **Muse Spark 1.2 / Meta Model API ont un accès global élargi**.

Re-vérifier sur sources officielles actuelles :
- France/UE réellement éligible ou non ;
- conditions ;
- capacités Ads spécifiques réellement documentées ;
- intérêt réel pour Audit/Reco.

Ne présume pas qu'un modèle Meta connaît mieux Meta Ads sans preuve.

## H. Backlog
Classer les tests : P0 / P1 / P2.
Pour chaque test :
- hypothèse ;
- une seule variable principale ;
- données minimales ;
- KPI ;
- critère succès/arrêt.

## I. Sources
Priorité aux sources officielles Meta récentes.
Tout chiffre non officiel doit être marqué **terrain** ou **hypothèse META**.
Aucun seuil chiffré ne doit être présenté comme recommandation officielle Meta sans source officielle exacte.

## J. Livrable
Remplacer `message-meta-ads-pilote.md` avec :
- `MESSAGE-ID : META-005-R` ;
- `EN-REPONSE-A : META-005` ;
- rapport stratégique uniquement ;
- sources/date ;
- commit + push.

## STOP COURT
`meta-ads · META-005 · terminé|partiel|bloqué`
`fichier(s) modifié(s) : ...`
`commit : <hash>`
`réserves : aucune|<une ligne>`

— GPT Pilote — facebook-ads
