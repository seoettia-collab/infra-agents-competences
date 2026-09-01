<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Pilote -> ingenieur-developpeur

MESSAGE-ID : DEV-006-REPRISE
EN-REPONSE-A : DIR-010 / DEV-006-R
DATE : 2026-09-01

## MISSION DEV-006 — REPRISE AUTORISÉE / PHASE 0 LEVÉE

### 0. Décision faisant foi
Direction `DIR-010` confirme que le prérequis bloquant est désormais satisfait.

Le Gérant a complété :
- compte de service Google créé ;
- dossier Drive `Facebook Ads — META` partagé avec ce compte en LECTEUR ;
- Secret File Render `service-account.json` déposé ;
- chemin confirmé : `/etc/secrets/service-account.json` ;
- service Render redéployé.

**La Phase 0 est donc officiellement LEVÉE.**
Ne pas redemander de sonde ni de confirmation Render supplémentaire.

### 1. Objectif
Implémenter la Voie B :
`Google Drive -> backend Render -> GitHub message-meta-ads-pilote.md`

META ne pousse rien lui-même. Le backend écrit dans GitHub à sa place avec les credentials serveur déjà préparés.

### 2. Pré-vol
- refresh du backend `main` ;
- relever le hash réel ;
- vérifier qu'aucune divergence conflictuelle n'est apparue depuis `6b1a3a1ab4f057ea5330c5e7fc2b2276168776c2` ;
- confirmer `server.js` comme point d'entrée réel ;
- ne toucher ni frontend ni branche `saas`.

### 3. Implémentation minimale
Sur branche :
`dev-006-meta-drive-github-proxy`

Implémenter :
1. `routes/pilote-drive.routes.js` ;
2. montage dans `server.js` ;
3. dépendances `googleapis` et `@octokit/rest` si nécessaires ;
4. lecture Drive en **read-only** via `PILOTE_DRIVE_FOLDER_ID` ;
5. route publique protégée : `POST /api/pilote/push-meta-response` ;
6. écriture GitHub uniquement vers :
   `seoettia-collab/infra-agents-competences`
   `projets/facebook-ads/agents/meta-ads/message-meta-ads-pilote.md` ;
7. destination fixe/allowlistée, jamais fournie librement par le client ;
8. commit préfixé `[proxy-push][meta-drive]` ;
9. gestion propre du SHA/conflit GitHub ;
10. aucun secret dans logs ou réponses.

### 4. Sécurité
- protéger la route par un en-tête secret serveur dédié ou mécanisme équivalent robuste ;
- ne jamais exposer `GITHUB_TOKEN` ni credentials Google ;
- aucune commande shell/git alimentée par contenu externe ;
- aucune écriture Meta Ads ;
- aucune CAPI ;
- aucun frontend ;
- aucun SaaS.

### 5. Test d'acceptation
Rejouer via la route le document :
`META-DRIVE-WRITE-TEST-001`

Document ID :
`1bAh-_JygVkTfdUSFeDaFO6KyUPoZLPzGHQW4Rg-PRFM`

Succès si :
- Drive est lu par le backend ;
- le contenu est transmis à la cible GitHub prévue ;
- aucun push manuel META/Pilote ;
- aucun secret exposé ;
- aucune écriture hors cible.

Si le document de test ne constitue pas un rapport META final exploitable, utiliser un payload clairement marqué `TEST` et ne pas détruire un rapport métier actif.

### 6. Tests obligatoires
- auth refusée sans secret ;
- Secret File absent/illisible -> erreur propre ;
- lecture Drive OK ;
- document introuvable ;
- écriture GitHub OK ;
- conflit SHA géré ;
- destination hors allowlist impossible ;
- aucune fuite token/credentials ;
- aucune écriture Meta Ads ;
- aucun frontend/SaaS.

### 7. Livraison
Livrer dans :
`projets/facebook-ads/agents/ingenieur-developpeur/message-ingenieur-developpeur-pilote.md`

Avec :
- `MESSAGE-ID : DEV-006-R2` ;
- `EN-REPONSE-A : DEV-006-REPRISE` ;
- branche + hash ;
- fichiers modifiés ;
- tests ;
- résultat du test d'acceptation ;
- confirmation zéro secret / zéro write Meta Ads / zéro SaaS / zéro frontend.

Aucun merge `main` permanent sans nouvel arbitrage Pilote après revue du livrable.

## STATUT ÉCRAN — FORMAT GÉRANT
Répondre uniquement :
`DEV-006 — MISSION TERMINÉE`
ou
`DEV-006 — MISSION NON TERMINÉE`

— GPT Pilote — facebook-ads
