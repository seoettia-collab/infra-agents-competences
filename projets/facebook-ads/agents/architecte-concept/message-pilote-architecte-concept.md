<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Pilote -> Architecte Concept

MESSAGE-ID : ARCH-002
EN-REPONSE-A : ARCH-001-R
DATE : 2026-08-31

## MISSION — Étudier le remplacement IA Audit / IA Reco par une IA Meta

### 0. Pré-vol obligatoire
Appliquer la directive permanente : gouvernance + référentiel DOC + documentation backend/frontend `main`, hashes réellement lus. SaaS reste GELÉ et hors sujet. Aucun code.

### 1. Intention du Gérant
Le dashboard Facebook Ads est déjà opérationnel et en service. L'objectif n'est PAS de le reconstruire.

Le Gérant souhaite savoir si les fonctions actuelles **IA Audit** et **IA Reco / Copilote** peuvent être remplacées par une IA de Meta afin que le moteur d'analyse soit issu de l'écosystème Meta/Facebook.

### 2. Point de départ à vérifier
Ne pas confondre :
- **Meta AI** = assistant grand public ;
- **Meta Model API** = offre développeur actuellement annoncée par Meta pour accéder à ses modèles, notamment Muse Spark en preview publique.

Vérifier l'état ACTUEL via sources officielles Meta avant toute conclusion. Ne jamais supposer qu'un modèle Meta possède un accès privilégié aux données Ads : vérifier ce qui est réellement fourni par l'API développeur.

### 3. Travail demandé — CONCEPT / PRODUIT uniquement

A. Cartographier les fonctions actuelles à préserver :
- Audit configuration ;
- recommandations ;
- Copilote / chat contextuel ;
- règles métier ;
- actions éventuelles déclenchées depuis les recommandations.

B. Déterminer ce que signifie réellement « remplacer par IA Meta » :
- remplacement du moteur LLM uniquement ;
- conservation des données Facebook déjà collectées par le dashboard ;
- conservation des règles métier Mistral et de la logique d'actions ;
- préciser ce qui serait réellement natif Meta et ce qui resterait notre propre système.

C. Comparer trois scénarios :
1. remplacement total du moteur IA Audit/Reco ;
2. mode hybride Meta + moteur actuel / fallback ;
3. test parallèle en shadow/A-B avant bascule.

Pour chaque scénario : bénéfices, limites, risques, réversibilité et valeur métier attendue.

D. Répondre explicitement :
- une IA Meta peut-elle raisonnablement remplacer les fonctions Audit / Reco actuelles ?
- apporte-t-elle un avantage démontrable pour l'analyse Facebook Ads, ou seulement un changement de fournisseur de modèle ?
- quelles données doivent toujours être fournies par notre dashboard ?
- quelles fonctions ne doivent surtout pas être cassées lors du remplacement ?

E. Proposer une recommandation finale : GO / TEST / NO-GO, avec une migration progressive qui ne met jamais la production actuelle en danger.

### 4. Contraintes
- Aucun code (règle 9).
- Aucun déploiement, aucune modification production.
- Produit actuel considéré opérationnel : préserver le fonctionnement existant.
- SaaS GELÉ.
- Ne pas vendre « Meta » comme automatiquement meilleur pour Meta Ads sans preuve.
- Sources officielles récentes obligatoires pour les capacités de l'IA/API Meta.

### 5. Livrable
Rapport détaillé dans `message-architecte-concept-pilote.md` (REMPLACEMENT), `EN-REPONSE-A : ARCH-002`.

Fin de mission — règle 14 : STOP écran 4 lignes maximum :
agent · MESSAGE-ID · statut
fichier(s) modifié(s)
commit
réserves : une ligne ou `aucune`

— GPT Pilote — facebook-ads
