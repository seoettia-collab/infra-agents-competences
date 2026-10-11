CODE-009 | 2026-10-11 | v1.0
VERDICT : OK — inventaire frontend terminé à 160 appels.

| N° | Point demandé | OK / NON | Ce qu'on a vu (1 ligne) | Ce qu'il faut (1 ligne) |
|---|---|---|---|---|
| 1 | Finir js/ai-recommendations.js | OK | 17 lignes restantes ajoutées ; section complète à 21 appels. | Rien. |
| 2 | Inventorier js/publish.js | OK | 10 appels backend inventoriés, tous présents côté backend. | Rien. |
| 3 | Inventorier js/cockpit.js | OK | 7 appels backend inventoriés, tous présents côté backend. | Rien. |
| 4 | Inventorier js/business-context.js | OK | 5 appels backend inventoriés, tous présents côté backend. | Rien. |
| 5 | Inventorier js/api.js | OK | 1 appel réseau générique inventorié, chemin dynamique marqué à vérifier. | Rien. |
| 6 | Inventorier js/init.js | OK | 1 appel réseau générique de retry inventorié, chemin dynamique marqué à vérifier. | Rien. |
| 7 | Vérifier les quatre paires de doublons IA | OK | Campagnes : première route utilisée ; suppression campagne : aucune ; Messenger : les deux ; Lead : les deux. | Rien. |
| 8 | Vérifier ads-manager-BACKUP.js | OK | Fichier vide ; aucune référence trouvée dans le dépôt et aucune charge dans index.html. | Rien. |
| 9 | Vérifier creatives.js et audiences.js | OK | Aucun appel réseau dans les deux ; creatives.js non chargé, audiences.js chargé par index.html. | Rien. |

DÉFAUTS À CORRIGER
1. L’appel /api/cache/clear de ai-recommendations.js n’existe pas dans l’inventaire backend.
2. La branche image dynamique relevée en CODE-008 reste à vérifier côté backend.
3. Les helpers dynamiques de api.js et init.js ne permettent pas un appariement statique unique.

NON FAIT
Rien.

FICHIERS
- projets/facebook-ads/documentation/INVENTAIRE-FRONTEND.md
- projets/facebook-ads/agents/codeur/message-codeur-pilote.md

MISSION TERMINÉE — CODE-009 / OK / projets/facebook-ads/agents/codeur/message-codeur-pilote.md
