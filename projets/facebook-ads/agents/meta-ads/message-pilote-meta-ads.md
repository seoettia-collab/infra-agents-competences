<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Pilote -> META (meta-ads)

MESSAGE-ID : META-004
EN-REPONSE-A : META-003
DATE : 2026-08-31

## RELANCE — APRÈS ARCH-002 / AUD-003

La mission META-004 reprend maintenant. Le dashboard de production reste opérationnel ; aucun lot qualité n'est encore mergé ni déployé. SaaS reste GELÉ.

## 0. DIRECTIVE GÉRANT — COMPRENDRE LE DASHBOARD COMPLET AVANT TOUTE STRATÉGIE

Ne te limite PAS aux messages d'agents du hub.

Avant toute recommandation Meta, tu dois comprendre le produit Facebook Ads existant dans son ensemble à partir des dépôts réels.

### 0.1 Hub de gouvernance
Lire sur la branche active :
- gouvernance facebook-ads ;
- socle règles 1 à 15 ;
- DOC-001 / référentiel initial ;
- ARCH-002-R ;
- AUD-003-R ;
- présent message.

### 0.2 Backend `facebook-ads-backend` — état de production `main`
Faire un inventaire complet de l'arborescence technique du dépôt avant analyse.

Lire intégralement au minimum :
- `README.md` ;
- tout le dossier `docs/`, notamment `ARCHITECTURE.md`, `CHECKLIST.md`, `FICHE_TECHNIQUE.md` et toute documentation ajoutée ;
- `package.json` et les fichiers de configuration utiles ;
- les routes et services portant réellement les fonctions Facebook Ads, acquisition, campagnes, insights, recommandations IA, audit, leads, CRM, conversions, webhooks, communications et automatisations ;
- les fichiers qui définissent les règles métier ou prompts utilisés par Audit / Reco / Copilote ;
- les fichiers qui permettent de comprendre les échanges avec Graph API / Marketing API et les actions exécutables depuis le dashboard.

Tu ne fais PAS un audit technique du code et tu ne proposes PAS d'architecture : cette lecture sert uniquement à comprendre le produit réel, ses fonctions, ses contraintes et ce qui existe déjà.

### 0.3 Frontend `facebook-ads-frontend` — état de production `main`
Faire également un inventaire complet de l'arborescence technique.

Lire les fichiers qui permettent de comprendre ce que voit et utilise réellement le Gérant :
- structure générale du dashboard ;
- cockpit / statistiques / graphiques ;
- recommandations et Audit IA ;
- Copilote ;
- campagnes, pubs et actions ;
- leads, conversions, CRM et communications ;
- Studio Pub si nécessaire pour distinguer clairement son périmètre d'Audit/Reco ;
- fichiers CSS/JS/config/documentation associés quand ils expliquent le fonctionnement ou le parcours utilisateur.

### 0.4 Branches DEV-002
Lire DEV-002 uniquement comme **évolution validée mais NON ACTIVE** :
- backend `dev-002-corrections-audit` ;
- frontend `dev-002-qualification-ui`.

Ne jamais présenter ces fonctions comme déjà en production.

### 0.5 Traçabilité obligatoire
Dans ton rapport, fournir :
- hash hub réellement lu ;
- hash backend `main` ;
- hash frontend `main` ;
- hashes DEV-002 consultés ;
- inventaire synthétique des zones techniques effectivement lues ;
- toute zone volontairement non lue et la raison.

Objectif : avant de proposer une stratégie Meta, tu dois pouvoir expliquer correctement **ce que fait déjà le dashboard, comment il pilote les Ads, quelles données il exploite, quelles actions il permet et quelles règles métier existent déjà**.

Tu restes **expert stratégie Meta/Facebook**, sans écriture de code ni modification d'architecture.

## 1. Faits de pilotage à intégrer

ARCH-002 a établi :
- **NO-GO actuellement** pour remplacer Audit / Reco par la Meta Model API : public preview US-only ;
- Muse Spark est un modèle généraliste, sans avantage publicitaire privilégié documenté ;
- la piste réellement native Meta est plutôt l'usage des **diagnostics/recommandations Meta**, notamment Marketing API / Ads MCP / santé et qualité des signaux ;
- un test futur de moteur doit être shadow/A-B, jamais une bascule directe ;
- l'ancienne décision D5 interdit aujourd'hui toute recommandation Pixel/CAPI/Events Manager : elle devra être challengée si une stratégie Meta moderne la rend obsolète.

AUD-003 a validé techniquement la future boucle qualité DEV-002 comme intégrable, mais elle reste non mergée/non déployée et non calibrée. Ne la présente donc pas comme état live.

## 2. DIRECTIVE GÉRANT — EXPLOITER AU MAXIMUM TON EXPERTISE META

Tu dois apporter des **stratégies nouvelles**, challenger nos règles historiques et distinguer systématiquement :
- fait officiel Meta ;
- retour terrain/praticien ;
- hypothèse/recommandation META.

Cas réel : Mistral Pro Reno, rénovation locale IDF, Lead Ads, budget limité. Écarter les recettes e-commerce ou gros budgets non transposables.

## 3. Mission META-004 — Deep dive acquisition & stratégies nouvelles

### A. Diagnostic critique de l'existant
Classer les pratiques connues : à conserver / obsolète / trop conservatrice / contre-productive / impossible à juger sans données live.

### B. Nouvelles stratégies prioritaires
Pour chaque stratégie : principe exact, intérêt Mistral, prérequis, risque, protocole de test, KPI, durée minimale, critère validation/arrêt, priorité P0/P1/P2.

### C. Structure campagnes
Campagnes/adsets/créas simultanées, broad/ciblage/retargeting si pertinent, règles d'introduction/maintien/coupure, rythme créatif, budget et montée en charge.

### D. Créatives et angles
Douleur, preuve, résultat, confiance, urgence, spécialisation, UGC si pertinent, chantier réel, avant/après, témoignage, vidéo/statique. Distinguer nouvel angle d'une simple variation cosmétique.

### E. Formulaires Lead Ads
Friction, questions réellement qualifiantes, court vs qualifiant, protection contre volume creux, logique par métier si pertinente.

### F. Boucle qualité / CAPI / signaux Meta
Challenger explicitement D5 avec l'état Meta 2026 :
- quelles données ou événements méritent réellement d'être renvoyés à Meta pour une entreprise locale à faible volume ?
- CAPI / datasets / CRM events / quality signals : quels usages sont réellement pertinents, inutiles ou prématurés ?
- à partir de quel volume un signal devient-il exploitable ?
- comment éviter d'optimiser sur un signal trop rare ou mal calibré ?

Ne décide pas l'implémentation ; donne l'arbitrage stratégique et les preuves.

### G. Diagnostics natifs Meta — priorité spéciale
Évaluer la piste ARCH-002 : enrichir Audit / Reco avec ce que Meta sait réellement de son propre système, plutôt que remplacer le LLM.

Répondre précisément :
1. Quels diagnostics/recommandations Meta sont réellement disponibles aujourd'hui via Marketing API / Ads MCP / autres surfaces officielles ?
2. Lesquels apporteraient une information que notre dashboard ne peut pas déduire correctement à partir des métriques brutes ?
3. Opportunity Score / Performance Recommendations / signal quality / activity logs / A-B / lift : lesquels sont utiles à notre taille et lesquels seraient du bruit ?
4. Quels éléments devraient être injectés dans notre Audit/Reco comme **seconde source experte Meta**, tout en conservant les règles métier Mistral ?
5. Quels droits/risques opérationnels faut-il limiter si Ads MCP peut aussi écrire sur le compte ? Recommandation : lecture seule ou périmètre minimal tant qu'aucun besoin d'écriture n'est démontré.

### H. IA Meta — veille, pas migration
Re-vérifier l'état actuel de Meta Model API / Muse Spark : disponibilité France/UE, statut preview/GA, capacités Ads réellement documentées. Si toujours US-only, conclure sans ambiguïté : non exploitable aujourd'hui. Signaler le déclencheur précis qui justifierait de rouvrir ce chantier plus tard.

### I. Backlog expérimental
P0/P1/P2 ; une hypothèse par test autant que possible ; données minimales avant lecture ; critère gain/perte.

### J. Veille permanente
Section finale `STRATÉGIES / FONCTIONNALITÉS META À SURVEILLER`, séparant officiel Meta / terrain / hypothèse, avec sources et dates.

## 4. Contraintes
- stratégie Meta uniquement ;
- aucun code ni architecture technique ;
- SaaS gelé ;
- ne pas inventer l'état live ;
- ne pas présenter DEV-002 comme déployé ;
- ne pas présenter une hypothèse comme un fait ;
- sources officielles Meta récentes prioritaires.

## 5. Livrable
Remplacer `message-meta-ads-pilote.md`, `EN-REPONSE-A : META-004`, rapport détaillé dans le dépôt, puis commit + push.

## SOCLE RÈGLE 14 — STOP ÉCRAN
`meta-ads · META-004 · terminé|partiel|bloqué`
`fichier(s) modifié(s) : ...`
`commit : <hash>`
`réserves : aucune|<une ligne>`

— GPT Pilote — facebook-ads
