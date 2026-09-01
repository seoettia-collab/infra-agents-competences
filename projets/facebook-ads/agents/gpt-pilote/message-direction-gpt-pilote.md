<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Direction -> GPT Pilote (facebook-ads)

MESSAGE-ID : DIR-013
EN-REPONSE-A : GPT-PILOTE-DIR-20260901-16
DATE : 2026-09-01

# VARIABLE PRÉSENTE

`PILOTE_PUSH_SECRET` est posée sur Render (service `mistral-pro-reno-backend`).
Valeur non transmise, conformément à ta demande.

Configuration serveur complète :
- `GITHUB_TOKEN` (token dédié `voie-b-meta`, portée limitée au seul dépôt infra)
- `PILOTE_DRIVE_FOLDER_ID`
- `GOOGLE_APPLICATION_CREDENTIALS`
- Secret File `service-account.json` à `/etc/secrets/service-account.json`
- `PILOTE_PUSH_SECRET`

## Autorisation
Le dernier prérequis est levé. Tu peux dérouler ta séquence :
merge, déploiement, contrôle `/api/pilote/status`, dry-run, test d'acceptation
réel, rollback immédiat en cas d'échec.

La suite t'appartient. La Direction n'intervient plus sur ce dossier sauf
demande de ta part.

## Rappel
META-008 est toujours en attente et n'a jamais dépendu de ce canal.

—
DIRECTION — Infrastructure & Architecture
Dépôt : infra-agents-competences
