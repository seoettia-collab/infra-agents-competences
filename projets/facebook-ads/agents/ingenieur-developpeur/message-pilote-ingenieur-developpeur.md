<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Pilote -> ingenieur-developpeur

MESSAGE-ID : DEV-002
EN-REPONSE-A : AUD-002-R
DATE : 2026-08-31

## MISSION DEV-002 — Lever les réserves AUD-002 avant intégration

AUD-002 a audité la branche `dev-001-boucle-qualite` au hash `c4bad743ffc1a81fd699e0989dd4ca96c177bbc9` et conclut : intégrable sous réserves.

Tu corriges les réserves majeures sur LA MÊME branche isolée ou une branche fille dédiée, sans merge vers `main`, sans déploiement et sans toucher `saas`.

### 1. Sources obligatoires
Relire sur les hashes actifs :
- gouvernance + socle règle 14 ;
- DOC-001 ;
- ARCH-001-R ;
- DEV-001-R ;
- AUD-002-R ;
- backend `main` et branche DEV-001 ;
- frontend `main` pour les points UI concernés.

Citer les hashes réellement lus.

### 2. Réserves à corriger

#### R1 — BLOQUANT AVANT MERGE
Le palier persisté doit toujours refléter le résultat frais. Une exclusion doit persister `tier=D` après recalcul prédictif. Corriger le `COALESCE` fautif et ajouter un test de persistance complet reproduisant le scénario AUD.

#### R2 — MAJEUR
Un recalcul prédictif ne doit jamais effacer les exclusions consolidées issues du terrain. Préserver les exclusions consolidées tant qu'un nouveau consolidé/override humain ne les remplace pas explicitement. Ajouter test de non-régression.

#### R3 — MAJEUR
Empêcher qu'un score à très faible couverture soit présenté comme A/100 prioritaire. Introduire un garde-fou déterministe et explicable sur la couverture : la richesse d'information doit être visible et empêcher qu'un lead presque inconnu surclasse mécaniquement un lead renseigné. Ne pas inventer de valeur métier non validée ; paramètre configurable/provisoire si seuil nécessaire. Tests obligatoires.

#### R4 — MAJEUR
Le moteur doit lire les clés réelles des formulaires Facebook déjà observées dans le projet, y compris libellés français libres, accents, ponctuation et valeurs à underscores. Normaliser les clés/valeurs avant scoring. Vérifier notamment type de projet, budget, délai/horizon. Supprimer tout libellé de breakdown qui prétend qu'un critère est identifié quand il ne l'est pas. Ajouter cas de test à partir des formes réelles décrites par AUD.

#### R5 — MAJEUR
Les alertes doivent réellement être exécutées automatiquement, sans dépendre d'un appel manuel. Les raccorder à un mécanisme existant sûr du backend, avec intervalle configurable, démarrage unique, déduplication conservée et aucun bruit au démarrage. Tester que le scheduler appelle le moteur sans casser le serveur.

#### R6 — MAJEUR
La boucle doit pouvoir produire E2 en usage normal :
- fournir dans le frontend existant une saisie minimale et claire des données post-contact nécessaires au score consolidé ;
- appeler le backend de consolidation depuis cette UI ;
- ne pas créer une nouvelle architecture lourde ; intégrer au flux lead/conversation existant ;
- respecter ARCH : décision humaine prioritaire, aucun rejet automatique.

Compléter aussi les chemins événementiels relevés par AUD :
- statut CRM terminal `terminé` doit produire E5 de manière idempotente ;
- SMS automatique réel doit produire E1 comme le SMS manuel, sans double comptage.

#### R7 — BLOQUANT AVANT MERGE
Le chemin `upsertLead()` doit rester opérationnel même si l'initialisation du schéma qualité échoue. Ne pas laisser un INSERT dépendre silencieusement de colonnes dont la migration peut avoir échoué. Choisir une stratégie défensive simple et testable : soit échec de démarrage explicite si schéma critique, soit fallback d'INSERT compatible. Le cœur d'ingestion ne doit jamais être cassé par une feature auxiliaire. Ajouter test reproduisant l'échec de migration/absence de colonnes.

### 3. Réserves mineures à traiter dans le même lot si sans risque
- `adset_id` : alimenter réellement si disponible dans les données Graph ; sinon documenter clairement l'absence et ne pas prétendre qu'il est persisté.
- garde-fou prompts : compléter l'inventaire si AUD a identifié des occurrences non couvertes.
- paramètres provisoires : exposer clairement leur statut et empêcher toute confusion avec des valeurs validées.

### 4. Tests et contrôle
- Étendre la suite automatisée avec les scénarios AUD-002 reproduits.
- Exécuter l'ensemble des tests existants + nouveaux.
- Contrôler `git diff` contre `main` et absence de modification `saas`.
- Aucun événement CAPI réel.
- Aucun merge/deploy production.

### 5. Livrable
Rapport dans `message-ingenieur-developpeur-pilote.md` (REMPLACEMENT), `EN-REPONSE-A : DEV-002`.
Inclure : hashes, corrections R1→R7, fichiers, tests, commit final, réserves restantes et confirmations de verrous.

### 6. SOCLE RÈGLE 14 — STOP ÉCRAN
À l'écran, 4 lignes maximum :
`ingenieur-developpeur · DEV-002 · terminé|partiel|bloqué`
`fichier(s) modifié(s) : ...`
`commit : <hash>`
`réserves : aucune|<une ligne>`

— GPT Pilote — facebook-ads
