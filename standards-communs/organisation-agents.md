# organisation-agents — protocole commun

Règles de fonctionnement des agents, valables pour TOUS les projets.
GitHub fait foi. L'historique est porté par Git : les fichiers de messagerie
sont REMPLACÉS, jamais empilés.

## 1. Chaîne de commandement
Gérant (décide) -> Direction/Claude (définit la structure) ->
GPT Pilote (pilote le projet) -> Agents d'exécution (font le travail) ->
retour au Pilote (arbitrage) -> Direction (met à jour le standard si besoin).

## 2. Messagerie Pilote <-> Agent
- 1 dossier par agent : messages-agents/AGENT/
- 2 fichiers :
  - message-architecte-pilote.md = Pilote -> Agent
  - message-agent-concerne.md    = Agent -> Pilote
- Chaque message : un MESSAGE-ID horodaté + EN-REPONSE-A.
- 1 seul MESSAGE-ID actif par agent à la fois.
- Anti-réexécution : un MESSAGE-ID déjà traité n'est pas rejoué.
- Bandeau anti-cache en tête des messages Pilote : toujours relire le fichier
  sur la branche active avant d'agir.

## 3. Droits d'écriture
- Un agent écrit dans son propre message-agent-concerne.md.
- Le Pilote écrit dans les message-architecte-pilote.md.
- La Direction écrit dans standards-communs/ et agents/.
- Souplesse : informer/alerter est toujours permis (déposer une info dans le
  fichier d'un autre rôle si nécessaire), mais on n'exécute pas à la place d'autrui.

## 4. Cycle de travail d'un agent
CORRIGER -> CONTRÔLER -> NETTOYER -> RAPPORTER -> STOP court.
Le rapport va dans message-agent-concerne.md (remplacement + EN-REPONSE-A),
puis commit + push. Livré = poussé sur GitHub.

## 5. Cycle par lot (LOT)
Nettoyage de la messagerie à la CLÔTURE d'un lot, pas à chaque tâche.
Clôture = exécution + contrôle si requis + corrections + validation Pilote +
aucune réserve bloquante.

## 6. Hiérarchie des sources
S1 terrain / Gérant (max) > données validées > S2 documents à contrôler >
S3 déduction contrôlée. Une source S1 nouvelle prévaut sur un état antérieur.

## 7. Pré-vol GitHub (avant toute action)
- Contenu vide / ancien / incohérent -> CACHE -> fetch/refresh + relecture.
- Aucun accès au dépôt -> STOP + nouvelle session configurée.
Ne jamais reconstruire la mémoire ni recopier les fichiers : le dépôt est la mémoire.

## 8. Confidentialité client
Aucune mention d'IA, modèle, agent automatisé ou outil interne dans un document
destiné au client.
