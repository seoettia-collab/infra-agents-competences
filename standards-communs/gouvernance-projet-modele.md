# gouvernance-projet-modele — gabarit d'un nouveau projet

Modèle à copier pour démarrer un projet. Remplacer PROJET par le nom réel.

## 1. Identité
- Nom du projet : PROJET
- Dépôt GitHub : seoettia-collab/PROJET
- Contexte / objectif : (à remplir)

## 2. Chaîne de commandement
Gérant -> Direction (standard) -> GPT Pilote de PROJET -> agents du projet.

## 3. Arborescence standard du projet
- gouvernance/gouvernance-projet.md   (ce fichier, rempli)
- agents/ref-AGENT.md                 (une fiche par agent activé)
- messages-agents/AGENT/              (2 fichiers de messagerie par agent)
- lots/                               (suivi des lots)

## 4. Agents activés (à déclarer)
| Agent | Rôle | Activé |
|---|---|---|
| GPT Pilote | pilote du projet | oui |
| (agent métier 1) | | |
| (agent métier 2) | | |

## 5. Règles héritées
Ce projet applique standards-communs/organisation-agents.md (protocole, droits,
lots, sources, pré-vol, confidentialité). Ne pas recopier ces règles ici : y renvoyer.

## 6. Clôture des lots
Selon standards-communs. Un lot est clos quand exécuté, contrôlé, validé Pilote,
sans réserve bloquante.
