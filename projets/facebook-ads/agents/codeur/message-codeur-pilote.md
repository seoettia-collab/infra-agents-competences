CODE-033 | 2026-10-13 | v1.0
VERDICT : NON — Studio simplifié et déployé ; plafonds techniques Meta non confirmés

| N° | Point demandé | OK / NON | Ce qu'on a vu (1 ligne) | Ce qu'il faut (1 ligne) |
|---|---|---|---|---|
| A | Champs, limites et CTA réels Meta | NON | Champs et six CTA documentés ; limites dures non établies ; fausses troncatures retirées. | Confirmer les spécifications par placement dans Ads Guide. |
| A1 | Un seul texte principal | OK | Avant : long publié à la création, court prioritaire en édition ; maintenant un texte canonique. | Rien. |
| A2 | Accroches multiples | OK | Meta prévoit des titres multiples via asset feed ; création Studio n'envoyait qu'un titre. | Studio simplifié à une accroche. |
| B1 | Retirer la génération d'image | OK | Fonctions et appel au modèle retirés du Studio ; ancienne route fermée en HTTP 410. | Rien. |
| B2 | Retirer Options visuelles | OK | Panneau, champs, collecte et prompts associés supprimés. | Rien. |
| B3 | Retirer Générer tout | OK | Seule génération de contenu texte conservée. | Rien. |
| B4 | Conserver upload et aperçu | OK | Upload réel 800×1000 réussi et nettoyé ; aperçu de publication inchangé. | Rien. |
| C | Six thèmes, sans Type de projet | OK | Les six thèmes demandés seuls ; modes généraliste et type de projet retirés. | Rien. |
| D | Prompt image complet copiable | OK | Huit sections, invariants, contexte enregistré et copie intégrale vérifiés ; aucun modèle image. | Rien. |
| Déploiement | Livraison continue | OK | Backend eed1138 live ; frontend 44d1cdf servi ; 117 + 21 tests verts. | Rien. |

DÉFAUTS À CORRIGER
1. Limites techniques Meta et repères par placement non confirmés : Ads Guide inaccessible ; aucune valeur inventée.

NON FAIT
Essai de publication et recherche de limites par mutations Meta interdits ; confirmation officielle des plafonds reste à faire.

FICHIERS
projets/facebook-ads/agents/codeur/annexe-code-033.md
projets/facebook-ads/agents/codeur/preuves-code-033.json
projets/facebook-ads/agents/codeur/exemple-prompt-code-033.txt
projets/facebook-ads/agents/codeur/capture-code-033.jpg

MISSION TERMINÉE — CODE-033 / NON / projets/facebook-ads/agents/codeur/message-codeur-pilote.md
