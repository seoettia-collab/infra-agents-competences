CODE-026 | 2026-10-12 | v1.0
VERDICT : OK — SMS reçu puis ignoré par le filtre leads-only

| N° | Point demandé | OK / NON | Ce qu'on a vu (1 ligne) | Ce qu'il faut (1 ligne) |
|---|---|---|---|---|
| 1 | Téléphone | OK | Passe : événements sms:received des tests retrouvés dans Render ; preuve indirecte. | Rien pour localiser la perte. |
| 2 | File d’attente | OK | Passe : arrivée au backend ; Completed/0 réessai rapporté pour le 11/10 à 19h02. | Capture actuelle non consultée. |
| 3 | Backend | OK | Passe : tests e083bea5 à 19h02 et 72388c7c à 21h13 acceptés puis filtrés. | HTTP 200 déduit du code ; journal HTTP absent. |
| 4 | Filtre applicatif | OK | Bloque : aucun lead non supprimé correspondant ; retour not_a_lead avant INSERT. | Tester avec le numéro exact d’un lead existant. |

DÉFAUTS À CORRIGER
1. FILTRE-LEAD-01 jette par conception tout SMS sans lead correspondant, avec succès HTTP.
2. Réception avec lead connu non prouvée en production ; 28 variantes FR rapprochées en SQLite isolé.
3. Journaux existants exposant numéro et contenu ; aucun secret ni numéro complet recopié ici.

NON FAIT
Aucune correction, écriture production, fusion, déploiement ou action Messenger ; aucun nouveau SMS réel requis pour localiser ces deux pertes.
Consultation directe du téléphone/file et test Node 20.11.1 non réalisés ; contrôles SQL isolés : 34/34.

FICHIERS
projets/facebook-ads/agents/codeur/CODE-026-annexe.md
projets/facebook-ads/agents/codeur/CODE-026-preuves.json

MISSION TERMINÉE — CODE-026 / OK / projets/facebook-ads/agents/codeur/message-codeur-pilote.md
