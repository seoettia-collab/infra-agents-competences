CODE-028 | 2026-10-12 | v1.0
VERDICT : NON — test réel en attente ; nettoyage refusé sur fixtures modifiées

| N° | Point demandé | OK / NON | Ce qu'on a vu (1 ligne) | Ce qu'il faut (1 ligne) |
|---|---|---|---|---|
| A1 | Enregistrer tout SMS entrant | OK | Inconnu conservé ; test HTTP local complet passé. | Confirmer avec le SMS réel. |
| A2 | Lead correspondant | OK | Rattachement et STOP conservés ; tests passés. | Rien. |
| A3 | Sans rattachement | OK | lead_id NULL, aucun lead créé automatiquement. | Rien. |
| A4 | Distinction et journal | OK | Champ unattached ; FILTRE-LEAD-01 dit enregistré. | Rien. |
| B1 | Séparation et compteur | OK | Onglet distinct visible ; flux habituel exclut les SMS sans lead. | Confirmer sur le SMS réel. |
| B2 | Rattacher ou créer | OK | Deux actions dédiées ; transactions et accès API testés. | Rien. |
| B3 | Aucune alerte dans les leads | OK | Aucun nouveau badge, toast ou notification de lead. | Rien. |
| C1 | Demander le SMS inconnu | OK | Texte CODE-028 TEST INCONNU demandé au Gérant. | Retour envoyé et heure d’envoi. |
| C2 | Réception réelle en base | NON | Aucun test corrélé reçu ; boîte séparée à zéro. | SMS depuis un numéro absent des leads. |
| C3 | Visible séparément, absent des leads | NON | Panneau vide vérifié en navigateur ; test réel absent. | Vérifier le message réel et le flux. |
| C4 | Revenir en arrière si échec | NON | Aucun échec réel constaté ; test en attente. | Appliquer si le test échoue. |
| D | Nettoyage ciblé | NON | Refus HTTP 409 : deux échanges supplémentaires ; aucune suppression. | Arbitrage sur SMS 270 et appel 271. |
| Déploiement | Merge et auto-déploiement | OK | Backend e66a4b1 live ; frontend f503aab en ligne ; santé 200. | Rien. |

DÉFAUTS À CORRIGER
1. Validation réelle de réception encore manquante.
2. Fixtures : 2 leads, 2 SMS et 1 appel, au lieu de 2 leads et 1 SMS annoncés.

NON FAIT
Test réel et nettoyage ; route temporaire retirée et vérifiée HTTP 404 ; Messenger et SaaS non touchés.

FICHIERS
projets/facebook-ads/agents/codeur/CODE-028-annexe.md
projets/facebook-ads/agents/codeur/CODE-028-preuves.json
projets/facebook-ads/agents/codeur/CODE-028-tests.log

MISSION TERMINÉE — CODE-028 / NON / projets/facebook-ads/agents/codeur/message-codeur-pilote.md
