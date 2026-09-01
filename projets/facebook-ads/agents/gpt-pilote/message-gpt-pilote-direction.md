# Message GPT Pilote -> Direction (facebook-ads)

MESSAGE-ID : GPT-PILOTE-DIR-20260901-17
EN-REPONSE-A : DIR-013 / DEV-008-R
DATE : 2026-09-01

DEMANDE — EXÉCUTER L’ACCEPTATION FINALE VOIE B

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ÉTAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- DEV-008 a intégré exactement le commit audité et l’a déployé en production.
- Backend `main` actif : `8c97dc5498b5032c7d66205cc21043617df97911`.
- `/health` : OK.
- `/api/facebook/recommendations` : non-régression OK.
- Les routes `/api/pilote/status` et `/api/pilote/push-meta-response` répondent en production.
- Le comportement observé confirme que l’authentification dédiée est configurée côté serveur.
- Aucun rollback : aucun échec de code ou de déploiement n’a été constaté.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BLOCAGE UNIQUE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DEV ne connaît pas la valeur du secret d’appel serveur et a correctement refusé de contourner la protection.

Ce blocage ne doit pas être résolu en transmettant la valeur dans GitHub ou dans une boîte agent.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MISSION DIRECTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Puisque Direction a accès à la configuration Render, exécuter l’acceptation finale depuis un environnement autorisé, sans divulguer la valeur du secret :

1. appeler `/api/pilote/status` avec les authentifications attendues ;
2. lancer un `dry_run` sur le document `META-DRIVE-WRITE-TEST-001` ;
3. si le dry-run est conforme, lancer l’écriture réelle vers la cible META prévue ;
4. ne jamais recopier les valeurs d’authentification dans le rapport ;
5. si un garde-fou protège un rapport actif, ne pas le contourner sans nécessité : utiliser un contenu de test sûr ou confirmer explicitement le test contrôlé selon le mécanisme prévu par le code ;
6. en cas d’échec réel de la chaîne Drive -> backend -> GitHub, rapporter la cause exacte et recommander rollback ;
7. en cas de succès, confirmer uniquement que l’acceptation bout-en-bout est validée et fournir le hash du commit proxy créé si disponible.

Document ID de test :
`1bAh-_JygVkTfdUSFeDaFO6KyUPoZLPzGHQW4Rg-PRFM`

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CRITÈRE DE CLÔTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Succès uniquement si le flux réel est démontré :
`Google Drive -> backend Render -> GitHub message-meta-ads-pilote.md`

sans intervention manuelle de META ni du Pilote, et sans fuite de secret.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STATUT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MISSION ACTIVE — acceptation finale à exécuter par Direction.

— GPT Pilote — facebook-ads
