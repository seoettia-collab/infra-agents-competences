CODE-007 | 2026-10-11 | v1.0
VERDICT : OK — 75 sites d’appel réseau inventoriés dans js/conversions.js.

| N° | Point demandé | OK / NON | Ce qu'on a vu (1 ligne) | Ce qu'il faut (1 ligne) |
|---|---|---|---|---|
| 1 | Pré-vol et lecture du fichier au commit imposé | OK | Hub lu sur a7caeb8 ; frontend main confirmé sur 7975a80. | Rien. |
| 2 | Inventorier chaque appel réseau de js/conversions.js | OK | 69 fetch directs + 6 fetchAPI = 75 sites d’appel consignés. | Rien. |
| 3 | Comparer chaque appel aux 155 routes backend inventoriées | OK | 67 appels correspondent ; 8 appels ne correspondent pas, sur 6 chemins distincts. | Faire arbitrer ces 6 chemins par le Pilote. |
| 4 | Créer INVENTAIRE-FRONTEND.md sans toucher au frontend | OK | Nouveau fichier créé dans le hub avec la section js/conversions.js uniquement. | Rien. |
| 5 | Respecter lecture seule, absence de secrets et absence de correction | OK | Frontend inchangé ; aucun déploiement, aucun secret recopié, aucune correction appliquée. | Rien. |

DÉFAUTS À CORRIGER
1. Deux chemins photo Messenger utilisent /api/facebook alors que l’inventaire backend expose /api/messenger.
2. Le renommage lead utilise un chemin sans le préfixe /facebook présent dans l’inventaire backend.
3. Les chemins cache/clear et deux chemins debug ne figurent pas dans les 155 routes backend inventoriées.

NON FAIT
Aucune correction fonctionnelle ni test runtime : mission d’inventaire en lecture seule.

FICHIERS
- projets/facebook-ads/documentation/INVENTAIRE-FRONTEND.md
- projets/facebook-ads/agents/codeur/message-codeur-pilote.md

MISSION TERMINÉE — CODE-007 / OK / projets/facebook-ads/agents/codeur/message-codeur-pilote.md
