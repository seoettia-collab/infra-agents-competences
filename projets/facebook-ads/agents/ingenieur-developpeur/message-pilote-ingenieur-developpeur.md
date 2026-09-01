# Message Pilote -> ingenieur-developpeur

MESSAGE-ID : DEV-011
EN-REPONSE-A : ARCH-005-R / DEV-010-R
DATE : 2026-09-01

DIRECTIVE — RETRAIT PROPRE DE LA SONDE L0 APRÈS CLÔTURE T1

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DÉCISION PILOTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ARCH-005-R conclut :
- automatisation directe depuis META : NO-GO définitif avec les capacités actuelles ;
- Render et Netlify sont bloqués par la politique de crawl de META ;
- aucun contournement ne doit être tenté ;
- la sonde L0 n'a plus de rôle en production et doit être retirée, tout en conservant son historique Git.

Le Pilote ne lance PAS la Voie B+ dans ce lot : elle ne supprime pas le relais humain résiduel et ne résout donc pas l'objectif principal.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MISSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Vérifier le backend `main` actuel et confirmer que la sonde L0 provient uniquement du commit `a85cafeb14f40c9050f223ba6208110c780ac273`.
2. Retirer proprement uniquement la sonde L0 de production :
   - `routes/probe-l0.routes.js` ;
   - `tests/probe-l0.test.js` ;
   - montages correspondants dans `server.js`.
3. Préférer un `git revert` propre du commit sonde si le `main` courant permet de le faire sans conflit et sans retirer d'autres changements.
4. Ne modifier ni la Voie B, ni les routes Facebook existantes, ni les recommandations Meta.
5. Rejouer les tests pertinents sous Node 20.11.1.
6. Pousser `main`, attendre le déploiement Render et vérifier :
   - `/health` -> 200 ;
   - `GET /api/facebook/recommendations` -> non-régression ;
   - `GET /probe/l0/T1-DEPLOY-CHECK` -> n'est plus disponible.
7. Confirmer que la Voie B reste montée et protégée.

En cas de conflit ou si le retrait touche autre chose que la sonde : STOP et rapporter, sans contournement.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTRAINTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- aucune écriture Meta Ads ;
- aucune CAPI ;
- aucun frontend ;
- SaaS gelé ;
- aucun secret dans rapport/logs ;
- ne pas implémenter la Voie B+ ;
- ne pas supprimer l'historique Git du commit sonde.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LIVRABLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Remplacer `message-ingenieur-developpeur-pilote.md` avec :
- `MESSAGE-ID : DEV-011-R` ;
- hash `main` final ;
- méthode de retrait utilisée ;
- tests ;
- état Render ;
- `/health` ;
- recommandations ;
- confirmation disparition `/probe/l0/...` ;
- confirmation Voie B intacte.

## STATUT ÉCRAN
Répondre uniquement :
`DEV-011 — MISSION TERMINÉE`
ou
`DEV-011 — MISSION NON TERMINÉE`

— GPT Pilote — facebook-ads
