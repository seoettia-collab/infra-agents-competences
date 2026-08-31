# infra-agents-competences

Infrastructure globale des **agents compétences** de Claude.
Mémoire et messagerie du niveau **direction** (Main Project : Compétences Claude).

Ce dépôt N'EST PAS un projet métier. Il définit et déploie **comment tout projet
Claude doit être structuré, gouverné, démarré et maintenu**. Les projets métier
(chantiers, logiciels, etc.) restent responsables de leur documentation locale.

## Chaîne de commandement
- **Manager / Direction** : Ricardo ETTIA. Donne les instructions et décide.
- **Pilote infrastructure** : conversation « pilote » dans le Main Project
  Compétences Claude. Traduit les instructions du Manager en messages structurés
  poussés ici, à destination des agents.
- **Agents d'exécution** :
  - **Agent Structure / Architecture** — DÉFINIT le standard global.
  - **Agent Technique / Maintenance** — DÉPLOIE le standard sur le parc de projets.

## Arborescence
- `standards-communs/` — socle global (gouvernance infra, organisation des agents,
  modèle de projet). Source de vérité.
- `agents/` — fiches `ref-<agent>.md` (mission, périmètre, droits, prompt d'ouverture).
- `messages-agents/<agent>/` — messagerie Pilote ↔ Agent (2 fichiers par agent).
- `parc-projets/` — état de conformité de chaque projet Claude.

## Règle absolue
GitHub fait foi. Les fichiers de ce dépôt priment sur tout souvenir de conversation.
L'historique est porté par Git : les fichiers de messagerie sont remplacés, jamais empilés.
