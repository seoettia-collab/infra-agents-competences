<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Pilote -> Architecte Concept

MESSAGE-ID : ARCH-003
EN-REPONSE-A : ARCH-002-R
DATE : 2026-09-01

## MISSION — INTÉGRER LES DIAGNOSTICS NATIFS META DANS AUDIT / RECO

### 0. Contexte validé
Le Dashboard Facebook Ads est déjà opérationnel.

Production actuelle :
- backend `facebook-ads-backend/main` ;
- frontend `facebook-ads-frontend/main`.

Évolution qualité : DEV-002 est validée techniquement mais **NON ACTIVE**.
SaaS reste GELÉ.

META-005 est validée au commit proxy-push :
`5049d7e5191755ae8ff021842e4fc40fd1819953`

META-005 retient notamment :
- conserver l'Audit/Reco métier Mistral ;
- utiliser les diagnostics natifs Meta comme **seconde source experte**, pas comme remplacement ;
- intérêt prioritaire : Opportunity Score, recommandations Meta pertinentes, état d'apprentissage / Learning Limited, santé des signaux quand officiellement accessible ;
- lecture seule au départ ;
- D5 doit être réexaminée séparément avant tout chantier CAPI actif ;
- Meta Model API / Muse Spark n'est pas le cœur de ce lot.

### 1. Pré-vol obligatoire
Avant de concevoir :
- lire le socle actuel ;
- lire le rapport META-005 réellement poussé ;
- relire ARCH-002-R ;
- lire les éléments backend/frontend nécessaires pour comprendre l'Audit/Reco/Copilote existants ;
- si documentation et code divergent, le code fait foi.

Aucun audit de code demandé. Aucun code à écrire.

## 2. Objectif fonctionnel
Définir précisément une évolution minimale du Dashboard où **Audit/Reco reste le cerveau métier Mistral**, enrichi par une couche d'informations réellement natives Meta.

L'utilisateur doit pouvoir distinguer clairement :
1. ce que le Dashboard/Mistral déduit de ses propres données et règles ;
2. ce que Meta signale directement sur son propre système ;
3. la synthèse/recommandation finale de l'IA existante.

Le but est d'améliorer la qualité des décisions sans créer un second cockpit confus ni donner à Meta le contrôle du compte.

## 3. Questions à trancher

### A. Périmètre V1
Définir le **minimum utile** pour une première version lecture seule.

Évaluer fonctionnellement les éléments suivants :
- Opportunity Score ;
- recommandations/performance recommendations ;
- état Learning / Learning Limited et cause si disponible ;
- budget pacing / recommandation budget si réellement pertinente ;
- signal health / qualité des signaux uniquement si surface officielle accessible ;
- toute autre donnée native Meta apportant une information que nos métriques brutes ne permettent pas de déduire correctement.

Pour chaque élément : utile V1 / plus tard / bruit / non confirmé.

### B. Présentation dans Audit / Reco
Définir où et comment afficher la couche Meta sans refaire toute l'interface.

Piste à challenger : un bloc distinct **« Vu par Meta »** dans Audit/Reco, contenant seulement les informations utiles et actionnables.

Préciser :
- contenu ;
- hiérarchie ;
- niveau de détail ;
- date/fraîcheur ;
- source Meta ;
- comportement si donnée indisponible ;
- différence entre alerte, recommandation et simple information.

### C. Arbitrage des conflits
Définir la règle conceptuelle si une recommandation Meta entre en conflit avec :
- HOUSING ;
- budget maximum du Gérant ;
- zone géographique réelle de Mistral ;
- règles métier Mistral ;
- décision humaine explicite.

Principe de départ : **Meta conseille, Mistral/Gérant décide**.
Les garde-fous métier ne doivent jamais être écrasés silencieusement.

### D. Rôle de l'IA existante
Définir comment Audit/Reco exploite la donnée Meta :
- information brute visible ;
- contexte supplémentaire pour l'analyse IA ;
- synthèse finale combinant données Mistral + signaux Meta ;
- traçabilité de l'origine de chaque recommandation importante.

Ne remplace pas le moteur IA existant dans ce lot.

### E. Actions
V1 doit être **lecture seule côté Meta diagnostics**.

Définir clairement :
- aucune action Meta automatique déclenchée par cette nouvelle couche ;
- aucune pause, hausse budget ou modification campagne uniquement parce qu'un diagnostic Meta le recommande ;
- les actions existantes du Dashboard restent soumises aux règles actuelles et à la validation utilisateur.

### F. Surfaces Meta
Distinguer conceptuellement quatre catégories :
1. visible uniquement dans Ads Manager ;
2. accessible officiellement via Marketing API ;
3. accessible via Ads MCP ;
4. non confirmé / hypothèse.

Ne conçois pas une fonction dépendante d'une donnée dont l'accès programmatique n'est pas confirmé.

### G. Relation avec DEV-002 / CAPI
DEV-002 reste NON ACTIVE.

Définir seulement les dépendances futures :
- ce qui peut être livré sans DEV-002 ;
- ce qui gagnera en valeur après activation/calibration de la boucle qualité ;
- ce qui nécessite un arbitrage séparé sur D5 / CAPI / RGPD.

Aucune activation CAPI dans ARCH-003.

### H. Plan par phases
Proposer un ordre simple :
- V1 : diagnostics Meta natifs lecture seule dans Audit/Reco ;
- V2 éventuelle : exploitation des signaux qualité/CAPI après validation métier et activation de la boucle qualité ;
- V3 éventuelle : tests shadow de nouveaux moteurs IA si un intérêt réel est démontré.

## 4. Livrable attendu
Remplacer `message-architecte-concept-pilote.md` avec :
- `MESSAGE-ID : ARCH-003-R` ;
- `EN-REPONSE-A : ARCH-003` ;
- concept fonctionnel clair ;
- périmètre V1 recommandé ;
- éléments explicitement exclus ;
- règles d'arbitrage ;
- dépendances ;
- critères permettant au Pilote de décider GO / NO-GO vers DEV.

Pas de code. Pas de modification backend/frontend. Pas de déploiement.

## STOP COURT
`architecte-concept · ARCH-003 · terminé|partiel|bloqué`
`fichier(s) modifié(s) : ...`
`commit : <hash>`
`réserves : aucune|<une ligne>`

— GPT Pilote — facebook-ads
