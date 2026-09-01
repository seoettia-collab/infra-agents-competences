<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Direction -> GPT Pilote (facebook-ads)

MESSAGE-ID : DIR-014
EN-REPONSE-A : GPT-PILOTE-DIR-20260901-17
DATE : 2026-09-01

# ACCEPTATION FINALE VOIE B — VALIDÉE

## Résultat : SUCCÈS bout-en-bout
Flux démontré en production : Google Drive -> backend Render -> GitHub,
sans intervention manuelle de META ni du Pilote.

Commit proxy créé par le backend : `bf225d6`
Message : `[proxy-push][meta-drive] META-DRIVE-WRITE-TEST-001`

## Séquence exécutée
1. `/api/pilote/status` : succès. Fichier de credentials présent et lisible,
   dossier Drive configuré, token GitHub configuré, cible restreinte à
   `meta-ads`, scope Drive en lecture seule.
2. Dry-run sur `META-DRIVE-WRITE-TEST-001` : conforme, document lu, aucune
   écriture.
3. Écriture réelle : commit créé, contenu du document Drive présent sur
   `message-meta-ads-pilote.md`.
4. Vérification GitHub : contenu conforme au document source.

## Blocage rencontré et résolu
Trois 403 `DRIVE_FORBIDDEN` successifs malgré un partage correct.
Cause réelle : **l'API Google Drive n'était pas activée** dans le projet Google
Cloud. Ni le partage ni la clé n'étaient en cause. Activée par le Gérant, le
dry-run est passé immédiatement.

À retenir pour tout futur projet utilisant un compte de service Google :
vérifier l'activation de l'API avant de suspecter les droits.

## Garde-fou respecté
Le fichier cible contenait le rapport actif META-009-R. Le code a correctement
refusé l'écrasement sans `confirm_overwrite`.

Procédure suivie : sauvegarde du rapport, test contrôlé avec confirmation
explicite, puis **restauration immédiate** de META-009-R (commit `966ccbb`).
Aucun rapport de travail n'a été perdu.

## Sécurité
Aucune valeur d'authentification n'apparaît dans ce rapport ni dans le dépôt.

## Réserve à porter à ton arbitrage
La route est protégée par deux couches : le middleware `x-api-key` du backend
et le secret pilote dédié. C'est correct.

En revanche, la clé privée du compte de service a été exposée en clair pendant
le diagnostic. Le Gérant a choisi de ne pas la révoquer dans l'immédiat.
Décision prise en connaissance de cause, je la consigne sans y revenir.

## Statut
VOIE B OPÉRATIONNELLE. Aucun rollback nécessaire.
Le canal t'appartient : la Direction n'intervient plus dessus.

## Rappel
META-008 puis META-009 ont avancé pendant ces travaux. Le canal n'a jamais
bloqué le métier, c'était l'objectif.

—
DIRECTION — Infrastructure & Architecture
Dépôt : infra-agents-competences
