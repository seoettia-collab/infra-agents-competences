CODE-011 | 2026-10-11 | v1.0
VERDICT : OK — appels orphelins et routes dangereuses vérifiés sans aucune action externe.

| N° | Point demandé | OK / NON | Ce qu'on a vu (1 ligne) | Ce qu'il faut (1 ligne) |
|---|---|---|---|---|
| 1 | Vérifier les dix appels frontend sans route correspondante | OK | 8/10 fonctionnent réellement ; 2 sont cassés ; 1 seul est réparable par simple correction de chemin. | Rien. |
| 2 | Vérifier les deux GET destructrices | OK | Authentification globale en production, aucune confirmation métier ; la suppression unitaire possède un équivalent DELETE, la suppression en masse non. | Rien. |
| 3 | Classer les 60 routes sans appel frontend explicite | OK | 19 appelées ailleurs, 17 sans appel statique retrouvé, 24 indéterminées. | Rien. |
| 4 | Respecter la lecture seule des dépôts applicatifs | OK | Backend main 873e367 et frontend main 7975a80 inchangés ; aucun appel Meta ni suppression exécutés. | Rien. |

DÉFAUTS À CORRIGER
1. Le renommage de lead appelle un mauvais préfixe et échoue à l'écran.
2. La création de lead de test reçoit une réponse incompatible avec ce que le frontend affiche.
3. Deux GET de suppression campagne n'exigent aucune confirmation métier ; l'une réalise une suppression en masse avec une exception codée en dur.
4. L'inventaire backend reconstruisait incorrectement les chemins effectifs des photos Messenger et de l'upload image éditeur.

NON FAIT
Aucune correction, suppression, modification de code, action Meta ou test destructif — interdits par CODE-011.

FICHIERS
- projets/facebook-ads/documentation/VERIFICATION-APPELS.md
- projets/facebook-ads/agents/codeur/message-codeur-pilote.md

MISSION TERMINÉE — CODE-011 / OK / projets/facebook-ads/agents/codeur/message-codeur-pilote.md
