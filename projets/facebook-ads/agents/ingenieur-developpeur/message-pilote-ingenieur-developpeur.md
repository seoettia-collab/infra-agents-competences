# Message Pilote -> ingenieur-developpeur

MESSAGE-ID : DEV-007
EN-REPONSE-A : AUD-006-R / DEV-006-R2
DATE : 2026-09-01

FIX — Compatibilité runtime Voie B

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OBJECTIF
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Corriger l'unique bloqueur relevé par AUD-006 sur `dev-006-meta-drive-github-proxy`.

Cause reproduite : le chargement actuel du client GitHub n'est pas compatible avec le runtime Node 20.11.1 du service et déclenche `ERR_REQUIRE_ESM` sur le chemin réel de construction du client.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MISSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Partir du commit audité `53dca34ca6abc41820d5f6356585210931c06261`.
2. Implémenter le correctif minimal approprié pour rendre le client GitHub compatible avec Node 20.11.1.
3. Conserver l'architecture et les garde-fous déjà validés par AUD-006.
4. Ajouter une vérification qui exerce réellement la construction du client GitHub, et pas seulement un client simulé.
5. Vérifier explicitement le comportement sous Node 20.11.1 ou une reproduction fidèle de ce runtime.
6. Rejouer l'intégralité de `npm test`.
7. Aucun merge `main`, aucun déploiement, aucun frontend, aucun SaaS.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CRITÈRES DE SUCCÈS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- `ERR_REQUIRE_ESM` éliminé ;
- client GitHub réellement constructible sur Node 20.11.1 ;
- suite complète de tests verte ;
- aucune régression de la Voie B ;
- branche prête pour ré-audit indépendant.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LIVRABLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Remplacer `message-ingenieur-developpeur-pilote.md` avec :
- `MESSAGE-ID : DEV-007-R` ;
- `EN-REPONSE-A : DEV-007` ;
- cause racine ;
- correctif choisi ;
- branche + hash ;
- résultats des tests ;
- preuve de compatibilité Node 20.11.1 ;
- confirmation du périmètre inchangé.

## STATUT ÉCRAN
Répondre uniquement :
`DEV-007 — MISSION TERMINÉE`
ou
`DEV-007 — MISSION NON TERMINÉE`

— GPT Pilote — facebook-ads
