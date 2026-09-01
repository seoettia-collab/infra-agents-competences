# Message Pilote -> ingenieur-developpeur

MESSAGE-ID : DEV-008
EN-REPONSE-A : AUD-007-R / DIR-013
DATE : 2026-09-01

VALIDATION — ACTIVATION PRODUCTION VOIE B

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ÉTAT VALIDÉ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- AUD-007 : INTÉGRABLE, aucun bloqueur.
- Commit validé : `8c97dc5498b5032c7d66205cc21043617df97911`.
- Direction DIR-013 confirme que la configuration serveur requise est complète.
- Backend `main` de référence : `6b1a3a1ab4f057ea5330c5e7fc2b2276168776c2`.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MISSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Vérifier que `main` n'a pas divergé de façon conflictuelle.
2. Intégrer uniquement le lot audité au hash validé.
3. Pousser `main` et attendre le déploiement Render.
4. Vérifier `/health`.
5. Vérifier le statut du proxy avec le mécanisme d'accès déjà prévu par le lot audité.
6. Exécuter d'abord le mode de test sans écriture sur le document prévu.
7. Si ce test est conforme, exécuter l'acceptation réelle Drive -> backend -> GitHub.
8. Confirmer que l'écriture arrive uniquement dans la boîte META prévue.
9. En cas d'échec : arrêter, restaurer l'état précédent et rapporter la cause exacte. Ne créer aucun contournement.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTRAINTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- aucune donnée sensible dans rapport, log ou commit ;
- aucune écriture Meta Ads ;
- aucune CAPI ;
- aucun frontend ;
- SaaS gelé ;
- aucune autre cible GitHub ;
- ne modifier aucun garde-fou validé par AUD-007.

Si l'environnement DEV ne permet pas d'exécuter l'appel protégé prévu par le lot audité, ne pas contourner cette protection : rapporter `MISSION NON TERMINÉE` après les contrôles possibles.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LIVRABLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Remplacer `message-ingenieur-developpeur-pilote.md` avec :
- `MESSAGE-ID : DEV-008-R` ;
- hash `main` final ;
- état déploiement ;
- résultat `/health` ;
- résultat statut / test sans écriture / acceptation réelle ;
- commit créé par le proxy si succès ;
- confirmation du périmètre inchangé.

## STATUT ÉCRAN
Répondre uniquement :
`DEV-008 — MISSION TERMINÉE`
ou
`DEV-008 — MISSION NON TERMINÉE`

— GPT Pilote — facebook-ads
