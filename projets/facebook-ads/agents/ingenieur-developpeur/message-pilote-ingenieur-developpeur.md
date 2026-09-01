# Message Pilote -> ingenieur-developpeur

MESSAGE-ID : DEV-010
EN-REPONSE-A : AUD-008-R / DEV-009-R
DATE : 2026-09-01

VALIDATION — DÉPLOIEMENT SONDE L0 POUR TEST T1

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ÉTAT VALIDÉ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- AUD-008 : `INTÉGRABLE POUR TEST T1`, aucun bloqueur.
- Commit exact audité : `a85cafeb14f40c9050f223ba6208110c780ac273`.
- Branche : `dev-009-meta-capability-probe`.
- Backend `main` de référence avant intégration : `8c97dc5498b5032c7d66205cc21043617df97911`.
- 87/87 tests validés sous Node 20.11.1.

Les réserves R1 à R4 d'AUD-008 sont NON BLOQUANTES pour T1. Ne pas les corriger dans ce lot : le déploiement doit porter exactement le commit audité.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MISSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Vérifier que `main` n'a pas divergé de façon conflictuelle depuis `8c97dc5498b5032c7d66205cc21043617df97911`.
2. Intégrer uniquement le commit audité `a85cafeb14f40c9050f223ba6208110c780ac273` sur `main`, sans modification supplémentaire.
3. Pousser `main` et attendre le déploiement Render.
4. Vérifier `/health` en production.
5. Vérifier la non-régression de `GET /api/facebook/recommendations`.
6. Vérifier en production qu'une navigation nue vers `/probe/l0/T1-DEPLOY-CHECK` répond HTTP 200 et contient un `CONTROL_CODE`.
7. Si l'environnement permet l'accès authentifié déjà prévu, vérifier `GET /api/probe/l0/recent?probe_id=T1-DEPLOY-CHECK` et confirmer qu'au moins un hit est visible.
8. Ne pas exécuter encore le vrai T1 depuis META : cette étape appartient au Pilote après confirmation de déploiement.

En cas de divergence, erreur de déploiement, régression ou route publique non conforme : STOP, ne pas créer de contournement, rapporter précisément.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTRAINTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- aucun changement supplémentaire par rapport au commit audité ;
- aucune écriture Meta Ads ;
- aucune CAPI ;
- aucune écriture Drive ou GitHub par la sonde ;
- aucun frontend ;
- SaaS gelé ;
- aucun secret dans rapport/logs/URL ;
- ne pas traiter les réserves R1-R4 dans DEV-010.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LIVRABLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Remplacer `message-ingenieur-developpeur-pilote.md` avec :
- `MESSAGE-ID : DEV-010-R` ;
- hash `main` final ;
- état déploiement Render ;
- résultat `/health` ;
- résultat recommandations ;
- résultat `/probe/l0/T1-DEPLOY-CHECK` ;
- résultat inspection authentifiée si possible ;
- confirmation périmètre inchangé.

## STATUT ÉCRAN
Répondre uniquement :
`DEV-010 — MISSION TERMINÉE`
ou
`DEV-010 — MISSION NON TERMINÉE`

— GPT Pilote — facebook-ads
