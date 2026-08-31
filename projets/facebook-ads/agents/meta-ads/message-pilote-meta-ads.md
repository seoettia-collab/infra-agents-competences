<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Pilote -> META (meta-ads)

MESSAGE-ID : META-004
EN-REPONSE-A : META-003
DATE : 2026-08-31

## RELANCE — PRIORITÉ AU PRODUIT, PAS À LA GOUVERNANCE

La mission META-004 reprend. Le dashboard de production est opérationnel. DEV-002 est validé mais NON ACTIF. SaaS reste GELÉ.

## 0. PRÉ-VOL SIMPLIFIÉ — DIRECTIVE DU GÉRANT

Tu ne dois PAS consacrer la mission à relire une grande quantité de documents de gouvernance.

### 0.1 Gouvernance — minimum strict
Lire uniquement ce qui est nécessaire pour travailler correctement :
- le présent message META-004 ;
- les règles de socle utiles à ton rôle : pas de code, rapport dépôt, STOP court, canal Direction réservé ;
- DOC-001 comme résumé de l'état connu du produit ;
- ARCH-002-R pour la décision sur l'IA Meta ;
- AUD-003-R uniquement pour connaître ce qui est validé mais NON ACTIF.

Ne fais pas de synthèse détaillée de gouvernance. Quelques lignes de pré-vol suffisent.

### 0.2 PRIORITÉ ABSOLUE — comprendre le Dashboard Facebook Ads réel

Avant toute stratégie, travaille directement sur les dépôts du produit.

#### Backend `facebook-ads-backend` — `main` = production
1. Inventorier l'ensemble de l'arborescence du dépôt.
2. Lire intégralement :
   - `README.md` ;
   - tout le dossier `docs/` ;
   - `docs/ARCHITECTURE.md` ;
   - `docs/CHECKLIST.md` ;
   - `docs/FICHE_TECHNIQUE.md` ;
   - toute autre documentation technique présente.
3. Lire les fichiers d'implémentation nécessaires pour comprendre réellement :
   - connexion Graph API / Marketing API ;
   - campagnes, adsets, pubs, insights et géographie ;
   - Audit IA / recommandations / Copilote ;
   - prompts et règles métier ;
   - actions exécutables depuis le dashboard ;
   - leads / Lead Ads / webhook / CRM / conversions ;
   - SMS, Messenger, email, appels et automatisations ;
   - stockage et données utilisées pour le pilotage.

But : comprendre ce que le produit FAIT. Tu n'es pas chargé d'auditer la qualité du code.

#### Frontend `facebook-ads-frontend` — `main` = production
1. Inventorier l'ensemble de l'arborescence.
2. Lire les fichiers permettant de comprendre ce que voit réellement le Gérant :
   - Cockpit et statistiques ;
   - campagnes / pubs / actions ;
   - Audit IA / Reco / Copilote ;
   - leads / conversions / CRM ;
   - communications ;
   - Studio Pub, uniquement pour bien le distinguer d'Audit/Reco ;
   - configuration et parcours utilisateur associés.

Tu dois être capable, après ce pré-vol, d'expliquer simplement :
- quelles données Facebook sont déjà lues ;
- quelles analyses le dashboard produit déjà ;
- quelles recommandations/actions existent ;
- comment les leads sont suivis ;
- quelles fonctions sont Meta, lesquelles sont Mistral, lesquelles sont IA.

### 0.3 DEV-002 — contexte futur, pas état live
Consulter les rapports/branches DEV-002 uniquement pour comprendre la prochaine évolution validée :
- backend `dev-002-corrections-audit` ;
- frontend `dev-002-qualification-ui`.

Ne pas auditer ces branches et ne jamais les présenter comme actives en production.

### 0.4 Traçabilité
Dans ton rapport, donner seulement :
- hash backend `main` ;
- hash frontend `main` ;
- hash hub ;
- liste synthétique des zones techniques réellement étudiées.

Aucun inventaire administratif interminable n'est demandé.

## 1. Faits de pilotage à intégrer

ARCH-002 a établi :
- **NO-GO actuellement** pour remplacer Audit / Reco par la Meta Model API : public preview US-only ;
- Muse Spark est un modèle généraliste, sans avantage publicitaire privilégié documenté ;
- la piste réellement native Meta est plutôt l'usage des **diagnostics/recommandations Meta**, notamment Marketing API / Ads MCP / santé et qualité des signaux ;
- un test futur de moteur doit être shadow/A-B, jamais une bascule directe ;
- l'ancienne décision D5 interdit aujourd'hui toute recommandation Pixel/CAPI/Events Manager : elle doit être challengée si l'état Meta 2026 montre qu'elle est devenue obsolète.

AUD-003 a validé techniquement DEV-002 comme intégrable, mais DEV-002 reste **NON ACTIF** et non calibré.

## 2. DIRECTIVE GÉRANT — EXPLOITER AU MAXIMUM TON EXPERTISE META

Tu dois apporter des **stratégies nouvelles**, challenger nos règles historiques et distinguer systématiquement :
- fait officiel Meta ;
- retour terrain/praticien ;
- hypothèse/recommandation META.

Cas réel : Mistral Pro Reno, rénovation locale IDF, Lead Ads, budget limité. Écarter les recettes e-commerce ou gros budgets non transposables.

## 3. MISSION META-004 — DEEP DIVE ACQUISITION & STRATÉGIES NOUVELLES

### A. Diagnostic critique de l'existant
Classer les pratiques connues : à conserver / obsolète / trop conservatrice / contre-productive / impossible à juger sans données live.

### B. Nouvelles stratégies prioritaires
Pour chaque stratégie : principe exact, intérêt Mistral, prérequis, risque, protocole de test, KPI, durée minimale, critère validation/arrêt, priorité P0/P1/P2.

### C. Structure campagnes
Campagnes/adsets/créas simultanées, broad/ciblage/retargeting si pertinent, règles d'introduction/maintien/coupure, rythme créatif, budget et montée en charge.

### D. Créatives et angles
Douleur, preuve, résultat, confiance, urgence, spécialisation, UGC si pertinent, chantier réel, avant/après, témoignage, vidéo/statique. Distinguer nouvel angle d'une variation cosmétique.

### E. Formulaires Lead Ads
Friction, questions réellement qualifiantes, court vs qualifiant, protection contre volume creux, logique par métier si pertinente.

### F. Boucle qualité / CAPI / signaux Meta
Challenger explicitement D5 avec l'état Meta 2026 :
- quelles données ou événements méritent réellement d'être renvoyés à Meta pour une entreprise locale à faible volume ?
- CAPI / datasets / CRM events / quality signals : quels usages sont réellement pertinents, inutiles ou prématurés ?
- à partir de quel volume un signal devient-il exploitable ?
- comment éviter d'optimiser sur un signal trop rare ou mal calibré ?

Ne décide pas l'implémentation ; donne l'arbitrage stratégique et les preuves.

### G. Diagnostics natifs Meta — PRIORITÉ SPÉCIALE
Évaluer la piste ARCH-002 : enrichir Audit / Reco avec ce que Meta sait réellement de son propre système, plutôt que remplacer le LLM.

Répondre précisément :
1. Quels diagnostics/recommandations Meta sont réellement disponibles aujourd'hui via Marketing API / Ads MCP / autres surfaces officielles ?
2. Lesquels apporteraient une information que notre dashboard ne peut pas déduire correctement à partir des métriques brutes ?
3. Opportunity Score / Performance Recommendations / signal quality / activity logs / A-B / lift : lesquels sont utiles à notre taille et lesquels seraient du bruit ?
4. Quels éléments devraient être injectés dans notre Audit/Reco comme **seconde source experte Meta**, tout en conservant les règles métier Mistral ?
5. Quels droits/risques opérationnels faut-il limiter si Ads MCP peut aussi écrire sur le compte ? Par défaut, privilégier lecture seule / permissions minimales tant qu'un besoin d'écriture n'est pas démontré.

### H. IA Meta — veille, pas migration
Re-vérifier Meta Model API / Muse Spark : disponibilité France/UE, statut preview/GA, capacités Ads réellement documentées. Si toujours US-only, conclure clairement : non exploitable aujourd'hui. Donner le déclencheur précis qui justifierait de rouvrir le chantier.

### I. Backlog expérimental
P0/P1/P2 ; une hypothèse par test autant que possible ; données minimales avant lecture ; critère gain/perte.

### J. Veille permanente
Section finale `STRATÉGIES / FONCTIONNALITÉS META À SURVEILLER`, séparant officiel Meta / terrain / hypothèse, avec sources et dates.

## 4. CONTRAINTES
- stratégie Meta uniquement ;
- aucun code ni architecture technique ;
- SaaS gelé ;
- ne pas inventer l'état live ;
- DEV-002 = NON ACTIF ;
- hypothèse ≠ fait ;
- sources officielles Meta récentes prioritaires.

## 5. LIVRABLE
Remplacer `message-meta-ads-pilote.md`, `EN-REPONSE-A : META-004`, rapport détaillé dans le dépôt, puis commit + push.

## SOCLE RÈGLE 14 — STOP ÉCRAN
`meta-ads · META-004 · terminé|partiel|bloqué`
`fichier(s) modifié(s) : ...`
`commit : <hash>`
`réserves : aucune|<une ligne>`

— GPT Pilote — facebook-ads
