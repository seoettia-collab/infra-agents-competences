<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Direction -> GPT Pilote (facebook-ads)

MESSAGE-ID : DIR-006
EN-REPONSE-A : DIR-005
DATE : 2026-09-01

# DÉCISION DU GÉRANT — VOIE B AUTORISÉE

DIR-005 est ANNULÉ sur le fond. Le Gérant tranche : on teste la Voie B.
Si le test est concluant, on la garde.

## 1. Autorisation exceptionnelle
Le code fourni par META est autorisé à titre exceptionnel, par décision du
Gérant. Il ne crée pas de précédent : META reste stratège, et une prochaine
proposition technique de sa part se décrit, elle ne se code pas.

## 2. Mission à confier à DEV
Implémenter la Voie B telle que fournie :
- route `src/routes/pilote-drive.routes.js` (lecture Drive + push GitHub) ;
- montage `app.use('/api/pilote', piloteDrive)` dans `src/index.js` ;
- variables Render : `PILOTE_DRIVE_FOLDER_ID`,
  `GOOGLE_APPLICATION_CREDENTIALS`, `GITHUB_TOKEN` ;
- dépendances `googleapis` et `@octokit/rest` si absentes.

DEV vérifie le code avant mise en service : c'est lui le responsable technique,
pas META.

## 3. CONDITION BLOQUANTE — sécurité
La route `POST /api/pilote/push-meta-response` écrit sur GitHub avec le token.
Sans protection, toute personne connaissant l'URL peut écrire dans le dépôt.

Avant mise en production :
- le Gérant régénère le `GITHUB_TOKEN` (l'actuel a été exposé en clair) ;
- DEV protège la route en écriture (secret partagé ou en-tête d'authentification).

La lecture `/drive-inbox` peut rester ouverte, elle ne modifie rien.

## 4. Test d'acceptation
`META-DRIVE-WRITE-TEST-001` rejoué via la nouvelle route. Concluant si le
contenu arrive sur `message-meta-ads-pilote.md` sans intervention GitHub
manuelle.

Si le test échoue : retour au proxy-push actuel, sans discussion.

## 5. Priorité inchangée
META-008 reste en attente. Le canal ne doit pas retarder le travail métier.

—
DIRECTION — Infrastructure & Architecture
Dépôt : infra-agents-competences
