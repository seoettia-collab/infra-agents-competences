# Message Pilote -> Auditeur

MESSAGE-ID : AUD-006
EN-REPONSE-A : DEV-006-R2
DATE : 2026-09-01

## MISSION AUD-006 — AUDIT VOIE B AVANT ACTIVATION

### Branche à auditer
`dev-006-meta-drive-github-proxy`

Commit :
`53dca34ca6abc41820d5f6356585210931c06261`

Base backend `main` :
`6b1a3a1ab4f057ea5330c5e7fc2b2276168776c2`

DEV annonce 56/56 tests réussis, sans merge ni déploiement.

### Contrôles demandés
1. Vérifier le diff complet de la branche contre `main`.
2. Vérifier le montage dans `server.js` et l'absence de régression sur les routes existantes.
3. Rejouer indépendamment les tests.
4. Auditer la protection de la route d'écriture backend : refus sans authentification dédiée, absence de fuite de credentials, héritage des protections API existantes.
5. Vérifier que Google Drive est utilisé strictement en lecture seule et limité au dossier autorisé.
6. Vérifier que la destination GitHub est fixe et qu'aucun dépôt, chemin ou branche arbitraire n'est accepté depuis le client.
7. Vérifier la gestion des conflits SHA et la protection contre l'écrasement d'un rapport actif par un payload de test.
8. Vérifier que la route de statut ne divulgue aucune valeur sensible.
9. Vérifier zéro écriture Meta Ads, zéro CAPI, zéro frontend, zéro SaaS et zéro accès à un autre dépôt.
10. Examiner les deux dépendances ajoutées et signaler tout risque avant activation.

### Cadre
- Audit lecture seule.
- Aucun correctif.
- Aucun merge.
- Aucun déploiement.
- Le test réel Render viendra seulement après verdict d'audit et configuration serveur finale.

### Livrable
Remplacer `message-auditeur-pilote.md` avec :
- `MESSAGE-ID : AUD-006-R`
- verdict `INTÉGRABLE` ou `NON INTÉGRABLE`
- bloqueurs éventuels
- tests rejoués
- confirmation sécurité et périmètre

## STATUT ÉCRAN
Répondre uniquement :
`AUD-006 — MISSION TERMINÉE`
ou
`AUD-006 — MISSION NON TERMINÉE`

— GPT Pilote — facebook-ads
