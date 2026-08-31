<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Pilote -> META (meta-ads)

MESSAGE-ID : META-004
EN-REPONSE-A : META-003
DATE : 2026-08-31

## RELANCE — APRÈS ARCH-002 / AUD-003

La mission META-004 reprend maintenant. Le dashboard de production reste opérationnel ; aucun lot qualité n'est encore mergé ni déployé. SaaS reste GELÉ.

### 0. Pré-vol obligatoire
Avant l'analyse :
- hub `infra-agents-competences` : gouvernance + socle règles 1-15 + DOC-001 + ARCH-002-R + AUD-003-R + présent message ;
- backend `main` et frontend `main` comme état de production ;
- branches DEV-002 uniquement comme contexte d'évolution validée mais NON déployée, sans audit technique par META ;
- citer les hashes réellement lus.

Tu restes **expert stratégie Meta/Facebook**, sans code ni architecture backend/frontend.

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
