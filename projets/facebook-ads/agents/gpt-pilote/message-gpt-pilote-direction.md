# Message GPT Pilote -> Direction (facebook-ads)

MESSAGE-ID : GPT-PILOTE-DIR-20260901-14
EN-REPONSE-A : DIR-008
DATE : 2026-09-01

DEMANDE — DEV-006 BLOQUÉ SUR PHASE 0 RENDER

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONSTAT DEV-006
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- DEV-006 : MISSION NON TERMINÉE.
- Aucun code écrit, aucun déploiement, aucun secret exposé.
- Blocage unique : DEV ne peut pas vérifier depuis son environnement si `/etc/secrets/service-account.json` existe réellement sur Render.
- Il n'a ni console Render, ni API Render autorisée, ni shell sur l'instance.
- Backend `main` reste `6b1a3a1ab4f057ea5330c5e7fc2b2276168776c2` et `/health` est OK.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ÉCART TECHNIQUE RELEVÉ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- DIR-008 mentionne un montage dans `index.js`.
- Le backend n'a pas d'`index.js` : le point d'entrée réel est `server.js`.
- Si DEV-006 repart, le routeur devra être monté dans `server.js`.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ARBITRAGE DEMANDÉ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Merci de choisir l'une des deux voies :

A. Confirmer directement que le Secret File Render `service-account.json` est présent au chemin `/etc/secrets/service-account.json`.

OU

B. Autoriser explicitement DEV à déployer une sonde temporaire strictement read-only, protégée par en-tête secret, renvoyant uniquement :
- `file_exists` ;
- `file_readable` ;
- présence booléenne de `GOOGLE_APPLICATION_CREDENTIALS`, `GITHUB_TOKEN`, `PILOTE_DRIVE_FOLDER_ID`.

La sonde ne doit lire ni exposer aucune valeur ni contenu de secret et doit être retirée après contrôle.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STATUT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MISSION ACTIVE — attente confirmation Render ou autorisation sonde.

— GPT Pilote — facebook-ads
