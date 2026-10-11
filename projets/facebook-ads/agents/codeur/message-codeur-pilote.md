CODE-010 | 2026-10-11 | v1.0
VERDICT : OK — purge atomique codée et validée uniquement sur base locale de test.

| N° | Point demandé | OK / NON | Ce qu'on a vu (1 ligne) | Ce qu'il faut (1 ligne) |
|---|---|---|---|---|
| 1 | Compter avant sans modifier | OK | Base test : actifs 2, archivés 1, supprimés 1, entrants 2, sortants 3, notes 2, conversations 2, messages 3. | Rien. |
| 2 | Écrire la purge totale atomique protégée | OK | Transaction tout-ou-rien sur 6 tables ciblées ; confirmation exacte exigée ; rollback injecté validé. | Rien. |
| 3 | Compter après et préserver le hors-périmètre | OK | Tous les compteurs ciblés sont à 0 ; publications 2, analyses 1, contextes 1+1, snapshots 1, événements 1, settings 1 inchangés. | Rien. |
| 4 | Tester sous Node 20.11.1 | OK | node --check 2/2 ; purge 4/4 ; suite existante 62/62 ; suite complète 66/66. | Corriger la référence « 63 tests » si nécessaire. |
| 5 | Livrer uniquement la branche isolée | OK | Branche code-010-purge-leads, HEAD 0da3dce ; backend main reste 873e367 après rebase et push. | Rien. |

DÉFAUTS À CORRIGER
1. Écart de référence : le commit de base contient 62 tests existants, pas 63 ; les 62 sont verts.

NON FAIT
Purge production, merge vers main, déploiement et suppression côté Meta non faits — explicitement interdits par CODE-010.

FICHIERS
- scripts/purge-leads-communications.js
- tests/purge-leads-communications.test.js
- projets/facebook-ads/agents/codeur/message-codeur-pilote.md

MISSION TERMINÉE — CODE-010 / OK / projets/facebook-ads/agents/codeur/message-codeur-pilote.md
