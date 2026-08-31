# Gouvernance — projet fiche-de-paie

## 1. Identité
- Projet : fiche-de-paie (Logiciel Fiche de paie)
- Dépôt : seoettia-collab/MistralPaie
- Stack : backend Python / FastAPI, frontend compilé (static/assets)
- Objectif : gestion de la paie BTP — fiches de paie, contrats, DSN, DPAE,
  pointage, acomptes, exports comptables, registre du personnel.

## 2. Chaîne de commandement
Gérant -> Direction (standard) -> GPT Pilote fiche-de-paie -> agents du projet.

## 3. Agents activés
| Agent | ID | Rôle | Activé |
|---|---|---|---|
| GPT Pilote | gpt-pilote | pilote du projet | oui |
| Architecte concept | architecte-concept | concept, vision, structure fonctionnelle | oui |
| Ingénieur-Développeur | ingenieur-developpeur | solution technique + code (EXCLUSIF) | oui |
| Documentation Technique | documentation-technique | référentiel, historique, évolutions | oui |
| Auditeur | auditeur | audit code et concept (lecture seule) | oui |
| Conformité Paie | conformite-paie | veille réglementaire paie / DSN / BTP | oui |

## 4. RISQUE PARTICULIER DE CE PROJET
La paie et la DSN sont soumises à contrôle (URSSAF, DGFiP, caisses BTP).
Une erreur de calcul ou de déclaration a des conséquences légales et
financières réelles.
- `conformite-paie` NE VALIDE PAS juridiquement : il signale et documente.
  Toute décision engageante revient au Gérant, avec validation par un
  expert-comptable.
- Aucun barème, taux ou plafond n'est figé sans source datée.

## 5. Règles héritées
Applique standards-communs/ (protocole, droits, lots, sources, pré-vol,
confidentialité, STOP court). Ne rien recopier ici.
