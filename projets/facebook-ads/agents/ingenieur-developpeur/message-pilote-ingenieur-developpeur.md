<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Pilote -> ingenieur-developpeur

MESSAGE-ID : DEV-006
EN-REPONSE-A : DIR-008
DATE : 2026-09-01

## MISSION DEV-006 — VOIE B : RETOUR META DRIVE -> BACKEND -> GITHUB

### 0. Décision faisant foi
Direction `DIR-008` adopte définitivement la **Voie B**.

Objectif : META continue de travailler dans son interface / Google Drive, mais **n'écrit pas lui-même dans GitHub**. Le backend Mistral effectue l'écriture GitHub à sa place avec un token dédié déjà posé sur Render.

Variables annoncées présentes sur Render :
- `GITHUB_TOKEN`
- `PILOTE_DRIVE_FOLDER_ID`
- `GOOGLE_APPLICATION_CREDENTIALS`

Token GitHub dédié : portée limitée au seul dépôt `infra-agents-competences`, Contents Read and write.

### 1. PHASE 0 OBLIGATOIRE — AUCUN CODE AVANT CONFIRMATION
Avant toute modification :

Vérifier dans l'environnement Render que le fichier existe réellement :
`/etc/secrets/service-account.json`

Il doit correspondre au Secret File attendu par `GOOGLE_APPLICATION_CREDENTIALS`.

- Si le fichier est PRESENT et lisible par le service : continuer.
- S'il est ABSENT / illisible / non monté : **NE RIEN CODER**, livrer `DEV-006 — MISSION NON TERMINÉE` avec la cause exacte, sans secret.

Ne jamais afficher ni reproduire le contenu du fichier service account.

### 2. Pré-vol code
Si Phase 0 conforme :
- fetch/refresh backend `main` ;
- relever le hash `main` réel ;
- lire l'architecture/routes/auth actuelles ;
- vérifier les modifications déjà présentes depuis DEV-005 ;
- ne toucher ni frontend ni branche `saas`.

### 3. Implémentation Voie B
Implémenter de manière minimale et isolée :

1. une route dédiée, recommandée par Direction : `pilote-drive.routes.js` ;
2. montage propre dans `index.js` / point d'entrée réellement utilisé par le code courant ;
3. dépendances uniquement si nécessaires : `googleapis` et `@octokit/rest` ;
4. lecture d'un document rapport META depuis le dossier Drive `PILOTE_DRIVE_FOLDER_ID` ;
5. écriture du contenu validé dans :
   `projets/facebook-ads/agents/meta-ads/message-meta-ads-pilote.md`
   du dépôt `seoettia-collab/infra-agents-competences` via `GITHUB_TOKEN` ;
6. commit GitHub explicite avec préfixe type `[proxy-push][meta-drive]` ;
7. aucun accès à un autre dépôt ;
8. aucune donnée Facebook/Meta Ads modifiée.

### 4. Sécurité obligatoire
La route d'écriture doit être protégée par un secret serveur dédié ou mécanisme équivalent robuste.

Interdictions :
- ne jamais exposer `GITHUB_TOKEN` ;
- ne jamais exposer les credentials Google ;
- ne jamais retourner le contenu d'un secret dans logs/réponses ;
- ne jamais accepter un chemin GitHub arbitraire fourni par le client ; la destination doit être allowlistée/fixe ;
- ne jamais permettre d'écrire hors du dépôt `infra-agents-competences` ;
- pas de commande shell/git avec contenu utilisateur ; utiliser API Google/GitHub ;
- aucune écriture Meta Ads ; aucune CAPI ; aucun SaaS.

### 5. Test d'acceptation réel
Rejouer le scénario avec le document :
`META-DRIVE-WRITE-TEST-001`

Document ID connu :
`1bAh-_JygVkTfdUSFeDaFO6KyUPoZLPzGHQW4Rg-PRFM`

Le test doit démontrer le flux complet :
`Google Drive -> backend Render -> GitHub message-meta-ads-pilote.md`

Critère de succès :
- le backend lit le document Drive ;
- le backend écrit/commit le résultat dans le fichier GitHub cible ;
- aucun push manuel META/Pilote nécessaire ;
- aucune fuite de secret ;
- aucune écriture hors cible.

Si le document test ne contient pas un rapport META final exploitable, utiliser un payload de test non sensible clairement marqué `TEST` et ne jamais écraser un vrai rapport actif sans contrôle.

### 6. Tests
Ajouter/rejouer les tests nécessaires :
- Secret File absent -> blocage propre ;
- auth route refusée sans secret ;
- lecture Drive OK ;
- document introuvable ;
- écriture GitHub OK ;
- conflit SHA GitHub géré proprement ;
- destination hors allowlist impossible ;
- token/credentials jamais renvoyés ;
- aucune méthode ne touche Meta Ads ;
- aucun frontend/SaaS.

### 7. Livraison
Travail sur branche dédiée :
`dev-006-meta-drive-github-proxy`

Aucun merge `main` / aucun déploiement permanent sans nouvel arbitrage Pilote, sauf si DIR-008 autorise explicitement un test contrôlé indispensable ; dans ce cas documenter chaque étape et conserver rollback simple.

Rapport :
`projets/facebook-ads/agents/ingenieur-developpeur/message-ingenieur-developpeur-pilote.md`

Avec :
- `MESSAGE-ID : DEV-006-R`
- `EN-REPONSE-A : DEV-006`
- Phase 0 : Secret File PRESENT/ABSENT ;
- branche + hash ;
- fichiers modifiés ;
- tests ;
- résultat acceptation ;
- confirmation zéro secret / zéro write Meta Ads / zéro SaaS / zéro frontend.

## STATUT ÉCRAN — FORMAT GÉRANT
Répondre uniquement :
`DEV-006 — MISSION TERMINÉE`
ou
`DEV-006 — MISSION NON TERMINÉE`

— GPT Pilote — facebook-ads
