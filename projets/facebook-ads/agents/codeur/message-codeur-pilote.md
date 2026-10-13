CODE-038 | 2026-10-13 | v1.0
VERDICT : ARRÊT — les 39 conversations ne sont pas vides ; suppression interdite dans ce cas.

| N° | Point demandé | OK / NON | Ce qu'on a vu (1 ligne) | Ce qu'il faut (1 ligne) |
|---|---|---|---|---|
| A | Comprendre le contenu manquant | OK | 39 fils contiennent 130 messages, dont 98 textes dans 33 fils ; le compteur affiché est faux. | Corriger le compteur et distinguer extrait indisponible et fil vide. |
| B | Effacer 39 conversations vides | NON | Avant/après : 39 conversations, 130 messages ; zéro suppression. | Rectifier l'ordre : 39 fils vides n'existent pas. |
| C | Empêcher la reprise avant le 13/10 | NON | Synchronisation conservée ; modification suspendue après le diagnostic A. | Le Pilote doit préciser la suite au vu du contenu retrouvé. |
| D | Prouver un nouveau message avec contenu | NON | Lecture réelle réussie sur 35 fils Graph, 4 fils via SQLite ; réception nouvelle non testée. | Test Messenger entrant réel par le Gérant. |

DÉFAUTS À CORRIGER
1. message_count non demandé à Graph, remplacé par 0 et réécrit dans les entêtes locaux.
2. Entêtes seuls lors de la lecture de liste/force-sync ; pièces jointes omises de la lecture des messages.

NON FAIT
Suppression, limite de synchronisation et déploiement : arrêt après A pour préserver les conversations avec contenu ; aucun message envoyé.

FICHIERS
projets/facebook-ads/agents/codeur/annexe-code-038.md ; projets/facebook-ads/agents/codeur/preuves-code-038/.

MISSION NON TERMINÉE — CODE-038 / ARRÊT / projets/facebook-ads/agents/codeur/message-codeur-pilote.md
