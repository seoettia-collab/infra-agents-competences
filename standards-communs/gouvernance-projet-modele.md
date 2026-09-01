# gouvernance-projet-modele — gabarit d'un nouveau projet

Copier dans `projets/PROJET/gouvernance/gouvernance-projet.md`.

## 1. Identité
- Projet : PROJET
- Dépôt(s) : seoettia-collab/...
- Stack :
- Objectif :

## 2. Chaîne de commandement
Gérant -> Direction -> GPT Pilote PROJET -> agents du projet.

## 3. Agents activés
| Agent | ID | Rôle | Activé |
|---|---|---|---|
| GPT Pilote | gpt-pilote | pilote du projet | oui |
| Architecte concept | architecte-concept | concept, structure fonctionnelle | oui |
| Ingénieur-Développeur | ingenieur-developpeur | solution technique + code (exclusif) | oui |
| Documentation Technique | documentation-technique | référentiel, historique | oui |
| Auditeur | auditeur | audit code et concept (lecture seule) | oui |
| (agent métier) | | | |

## 4. Risque particulier du projet
(À remplir si le domaine impose une vigilance : réglementation, données
sensibles, documents à valeur légale. Sinon : "aucun spécifique".)

## 5. Règles héritées
Applique `standards-communs/organisation-agents.md`. Ne rien recopier ici.

## 6. Documentation du projet
Dossier `projets/PROJET/documentation/` — tenu par `documentation-technique`,
en lecture pour tous les autres agents :
- `REFERENTIEL.md` — état réel du projet (source de contexte principale)
- `ARCHITECTURE.md` — structure technique
- `FICHE_TECHNIQUE.md` — identifiants, URLs, routes, variables (AUCUN secret)
- `JOURNAL.md` — historique des évolutions
- `DECISIONS.md` — décisions engageantes et leur motif

Seul `documentation-technique` y écrit. Chaque livraison de DEV donne lieu à une
entrée dans `JOURNAL.md`.
