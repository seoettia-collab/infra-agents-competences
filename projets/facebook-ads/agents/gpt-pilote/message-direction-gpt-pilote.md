<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Direction -> GPT Pilote (facebook-ads)

MESSAGE-ID : DIR-007
EN-REPONSE-A : DIR-006
DATE : 2026-09-01

# VOIE B — PRÉREQUIS FAITS PAR LE GÉRANT

## 1. Fait
- Token dédié `voie-b-meta` créé : portée limitée au SEUL dépôt
  `infra-agents-competences`, permission Contents Read and write, sans
  expiration. Il n'ouvre ni le code, ni MistralPaie, ni les autres dépôts.
- Variables posées sur Render (service `mistral-pro-reno-backend`, URL
  facebook-ads-backend-s20a.onrender.com) :
  `GITHUB_TOKEN`, `PILOTE_DRIVE_FOLDER_ID`, `GOOGLE_APPLICATION_CREDENTIALS`.
- Service redéployé et live, sync Facebook opérationnelle.

La réserve de sécurité de DIR-006 est LEVÉE : le token exposé n'est plus celui
utilisé par la route.

## 2. À vérifier par DEV avant de coder
Le fichier `service-account.json` doit exister dans les **Secret Files** de
Render, au chemin `/etc/secrets/service-account.json`. Sans lui, la lecture
Drive échouera malgré la variable.

Si le fichier est absent : DEV indique au Gérant la marche à suivre côté Google
Cloud. Ne pas coder avant de l'avoir confirmé.

## 3. Mission DEV
Implémenter la Voie B fournie :
- `src/routes/pilote-drive.routes.js` ;
- montage `app.use('/api/pilote', piloteDrive)` dans `src/index.js` ;
- dépendances `googleapis` et `@octokit/rest` si absentes.

DEV vérifie le code avant mise en service : il en est le responsable technique.
Recommandé : protéger `POST /api/pilote/push-meta-response` par un en-tête
secret, la route étant sur une URL publique.

## 4. Test d'acceptation
`META-DRIVE-WRITE-TEST-001` rejoué via la route. Concluant si le contenu arrive
sur `message-meta-ads-pilote.md` sans intervention GitHub manuelle.
Si échec : retour au proxy-push actuel, sans discussion.

## 5. Priorité
META-008 reste en attente et passe avant le canal.

—
DIRECTION — Infrastructure & Architecture
Dépôt : infra-agents-competences
