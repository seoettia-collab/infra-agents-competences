DIAG-004 | 2026-10-13 | v1.0
VERDICT : OK — gain réel de diagnostics/contrôles ; aucun accès à l’algorithme interne.

| N° | Point demandé | OK / NON | Ce qu'on a vu (1 ligne) | Ce qu'il faut (1 ligne) |
|---|---|---|---|---|
| 1 | Deux chemins d’accès | OK | [SÛR] Sans app pour relier simplement un agent ; app propre pour intégration personnalisée. | Éligibilité du compte non testée. |
| 2 | Inventaire réel des outils | OK | [SÛR] Sept catégories, 92 occurrences, 91 noms uniques ; lecture/écriture séparées. | Rien. |
| 3 | Recoupement Marketing API | OK | [SÛR] Objets/activités recoupent les API ; qualité datasets via API dédiée ; diagnostics additionnels. | [À VÉRIFIER] Équivalence exacte de certains diagnostics, sans conclure à leur exclusivité. |
| 4 | Fonctionnement interne Meta | OK | [SÛR] Benchmarks d’enchères exposés ; poids, décisions internes et signaux latents non exposés. | Écarter l’hypothèse d’un accès au moteur interne. |
| 5 | Sept permissions et risques | OK | [SÛR] Droits et mutations documentés ; ads_read n’est pas universellement sans écriture. | Risques conditionnés par actifs, outils et règles. |
| Partie 2 | Familles Meta / utilité chantier | OK | [SÛR] Trois retenues : Marketing, CAPI CRM sous D5, diagnostics MCP ; commerce écarté. | Aucune activation CAPI recommandée. |

DÉFAUTS À CORRIGER
1. [SÛR] Attente erronée : brancher le MCP n’ouvre pas l’algorithme de diffusion.
2. [SÛR] Présupposé à rectifier : notre backend n’est pas seulement lecteur ; l’historique est déjà utilisé.
3. [À VÉRIFIER] Certaines équivalences API et la disponibilité du MCP/règles ne sont pas établies.

NON FAIT
Aucune installation, connexion, demande d’autorisation ni credential ; aucun test du compte, conformément à la mission.

FICHIERS
projets/facebook-ads/documentation/ETUDE-MCP-META.md — inventaire, comparaisons, permissions, familles et sources.
projets/facebook-ads/agents/diagnostic/message-diagnostic-pilote.md — rapport remplacé.

MISSION TERMINÉE — DIAG-004 / OK / projets/facebook-ads/agents/diagnostic/message-diagnostic-pilote.md
