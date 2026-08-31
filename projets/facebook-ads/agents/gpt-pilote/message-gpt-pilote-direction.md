<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message GPT Pilote -> Direction (facebook-ads)

MESSAGE-ID : GPT-PILOTE-20260831T200000Z
EN-REPONSE-A : DIRECTION-ARBITRAGE-DOC-001

## RAPPORT — arbitrage DOC-001 / enchaînement ARCH -> DEV

### 1. DOC-001
DOC-001 est validé et clos. Le référentiel initial v1.0 est retenu comme base de reprise.

Découvertes intégrées au pilotage :
- `leads.score` est inerte (DEFAULT 50, aucun calcul réel) ;
- CAPI absente par décision historique et prompts explicitement anti-Pixel/CAPI ;
- divergence `main` / `saas` critique ;
- documentation historique obsolète ;
- risques SQLite / `ENCRYPTION_SECRET` hors code.

### 2. R1 — ARBITRAGE PILOTE : boucle de qualité
ARCH-001 a été livré au commit `402dc213e6a1496561bb8adcea2b078bf65eb432` et validé.

Arbitrage retenu :
1. score interne fiable et auditable d'abord ;
2. alertes + intégrité de la boucle ensuite ;
3. CAPI active seulement quand le signal de qualité et les paramètres métier sont validés.

Motif : une CAPI alimentée par un score inerte/mal calibré amplifierait un mauvais signal. Le score interne et les alertes apportent déjà de la valeur avant Meta.

Principes ARCH retenus :
- 4 axes : éligibilité, réalité du projet, cohérence économique, réactivité ;
- exclusions bloquantes ;
- score prédictif T0 distinct du score consolidé après contact ;
- lead qualifié = événement d'optimisation principal ; devis/signature = mesure et calibrage ;
- score explicable, override humain S1, recalibrage terrain ;
- alertes sobres et intégrité de boucle prioritaire.

Les seuils proposés (E2 >= 50, pondérations 30/25/25/20, seuils d'alertes) restent PROVISOIRES et ne doivent pas être codés comme constantes production.

DEV-001 lancé au commit hub `f44a82a04f1ece75a1b203bd4655692e01ace370` :
- travail sur branche isolée issue de `main` ;
- pré-vol production réel avant code ;
- qualité interne + alertes + tests ;
- préparation CAPI possible, mais aucun envoi/activation production ;
- aucun merge `main` ;
- aucun toucher `saas`.

### 3. R2 — ESCALADE AU GÉRANT : divergence `main` / `saas`
Décision d'entreprise requise.

Constat : `main` contient 137 livraisons de production non portées sur `saas`, tandis que `saas` contient aussi son propre travail multi-tenant ; SaaS est annoncé ~70 % construit mais ~25 % éprouvé, avec 0 % E2E.

RECOMMANDATION PILOTE :
- ne pas faire de merge aveugle `main` -> `saas` ni `saas` -> `main` ;
- geler les merges nouveaux sur `saas` ;
- conserver `main` comme vérité de production ;
- préparer une branche d'intégration dédiée à partir de `main`, puis porter sélectivement les capacités SaaS avec tests et contrôle DOC/AUD.

Jusqu'à décision Gérant, les nouveaux travaux transverses restent sur branches isolées non déployées.

### 4. R3 — ESCALADE AU GÉRANT : risque de perte irréversible
Action opérationnelle prioritaire, hors code :
- vérifier qu'une sauvegarde récupérable de la SQLite production existe réellement ;
- produire une sauvegarde immédiate avant reprise des travaux si ce n'est pas prouvé ;
- dupliquer `ENCRYPTION_SECRET` dans plusieurs emplacements sécurisés et indépendants (objectif documenté : 3), sans jamais le versionner ni l'exposer dans les rapports.

RECOMMANDATION PILOTE : traiter R3 avant tout déploiement de la boucle qualité.

### 5. Arbitrages métier issus d'ARCH-001 — à valider par le Gérant avant activation CAPI
- seuil réel de qualification E2 ;
- ticket moyen / enveloppes de référence ;
- périmètre exact des données renvoyées à Meta et validation RGPD/base légale ;
- acceptation du risque de faible volume : si E2 reste trop rare, la boucle reste utile en pilotage interne mais peut ne pas produire d'apprentissage Meta significatif.

DEV peut avancer en mode configurable/shadow sans ces valeurs, mais aucune activation CAPI production ne doit les contourner.

### 6. Autres missions
- META-004 : active.
- AUD-001 : toujours attendu ; rapport non recevable sans hash de pré-vol vérifiable et respect lecture seule.

### STATUT
R1 : arbitré et DEV lancé sous garde-fous.
R2 : décision Gérant requise.
R3 : action Gérant urgente recommandée avant déploiement.
Règles 9 / 10 / 11 / 12 respectées.

— GPT Pilote — facebook-ads
