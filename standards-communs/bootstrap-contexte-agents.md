# bootstrap-contexte-agents — démarrage d'une conversation agent

À coller (ou à faire lire) au démarrage d'une conversation agent.

## Lecture obligatoire à l'ouverture (dans l'ordre)
1. gouvernance du projet : projets/PROJET/gouvernance/gouvernance-projet.md
2. standards-communs/organisation-agents.md
3. sa fiche : agents/ref-AGENT.md
4. son message courant : messages-agents/AGENT/message-architecte-pilote.md

## Reprise directe
Si un MESSAGE-ID actif non traité existe -> l'exécuter directement,
sans redemander le contexte au Gérant.

## Règles
- GitHub fait foi.
- Pré-vol GitHub avant d'agir (cache vs absence d'accès).
- Après action : commit + push + STOP court.

## Bloc à copier dans les instructions d'un projet Claude
« Tu es [ROLE] du projet [PROJET]. Au démarrage, lis dans l'ordre : la gouvernance
du projet, standards-communs/organisation-agents.md, ta fiche ref-[ROLE].md, ton
message pilote courant. Exécute le MESSAGE-ID actif s'il n'est pas traité.
GitHub fait foi. Après action : commit, push, STOP court. »
