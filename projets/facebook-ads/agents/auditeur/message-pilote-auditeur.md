# Message Pilote -> Auditeur

MESSAGE-ID : AUD-008
EN-REPONSE-A : DEV-009-R / ARCH-004-R
DATE : 2026-09-01

## MISSION AUD-008 — AUDIT SONDE L0 AVANT DÉPLOIEMENT T1

### Branche à auditer
`dev-009-meta-capability-probe`

Commit exact :
`a85cafeb14f40c9050f223ba6208110c780ac273`

Base backend `main` :
`8c97dc5498b5032c7d66205cc21043617df97911`

### Contexte
ARCH-004 a donné un GO conditionnel uniquement pour L0 : une sonde de capacité sans effet métier destinée à vérifier si l'environnement META peut réellement émettre un GET vers le backend Render.

DEV-009 annonce :
- route publique `GET /probe/l0/:probe_id` ;
- inspection/reset sous `/api/` authentifiés ;
- tampon RAM borné, sans payload en clair ;
- aucune écriture GitHub, Drive, Meta Ads, DB ou disque ;
- aucun secret ;
- 87/87 tests réussis sous Node 20.11.1 ;
- aucun merge, aucun déploiement.

### Contrôles demandés
1. Auditer le diff exact `main` -> `a85cafeb14f40c9050f223ba6208110c780ac273`.
2. Confirmer que la route publique L0 est strictement bornée à un rôle de sonde et ne crée pas de surface d'écriture persistante.
3. Vérifier validation `probe_id`, `seq`, `n`, `p`, plafond 8192, rejet des doublons, rate limit, `Cache-Control: no-store`.
4. Vérifier que le payload n'est jamais loggé ni conservé en clair et que le tampon RAM ne contient que métadonnées/empreintes, avec borne stricte.
5. Vérifier que les routes d'inspection/reset restent réellement protégées par l'authentification existante.
6. Rejouer les tests pertinents sous Node 20.11.1, notamment T1 à T6 locaux.
7. Confirmer zéro écriture GitHub, zéro Drive, zéro Meta Ads, zéro CAPI, zéro DB, zéro disque, zéro frontend, SaaS gelé.
8. Vérifier qu'aucun secret permanent n'est introduit/exposé.
9. Confirmer que le retrait/revert est simple et sans état persistant à nettoyer.
10. Donner un verdict : `INTÉGRABLE POUR TEST T1` ou `NON INTÉGRABLE`.

### Cadre
- Audit lecture seule.
- Aucun correctif.
- Aucun merge.
- Aucun déploiement.
- Si verdict INTÉGRABLE POUR TEST T1 : le Pilote lancera ensuite une activation ciblée de la sonde, puis uniquement T1 avant toute suite C1/C2.

### Livrable
Remplacer `message-auditeur-pilote.md` avec :
- `MESSAGE-ID : AUD-008-R`
- `EN-REPONSE-A : AUD-008`
- verdict
- bloqueurs éventuels
- tests rejoués
- confirmation sécurité/périmètre
- réserves éventuelles

## STATUT ÉCRAN
Répondre uniquement :
`AUD-008 — MISSION TERMINÉE`
ou
`AUD-008 — MISSION NON TERMINÉE`

— GPT Pilote — facebook-ads
