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

## 9. Règle du code — exclusivité
Seul l'agent **ingenieur-developpeur** écrit du code.
Aucun autre rôle n'y touche : ni l'architecte du concept, ni l'auditeur,
ni la Documentation Technique, ni le Pilote, ni un agent métier.
Les autres SPÉCIFIENT ; l'ingénieur-développeur IMPLÉMENTE.

## 10. Documentation Technique — obligatoire
Chaque projet doit avoir un agent **documentation-technique**.
Il tient l'historique, le référentiel et la trace de CHAQUE évolution.
C'est ce qui garde le projet vivant et reprenable par n'importe quelle session.

## 11. Auditeur
Chaque projet peut activer un agent **auditeur** : il audite le CODE et le
CONCEPT. Lecture seule — il constate et rapporte, il ne corrige jamais.
Cette non-intervention garantit son indépendance.

## 12. Modèle imposé
Tous les agents Claude tournent sur **Opus 5**.

## 13. Agents standard d'un projet
- architecte-concept       : concept, vision, structure fonctionnelle
- ingenieur-developpeur    : solution technique + écriture du code (exclusif)
- documentation-technique  : historique, évolutions, référentiel (obligatoire)
- auditeur                 : audit code et concept (lecture seule)
- agents métier            : selon le projet (ex. meta-ads)

## 14. Fin de mission — STOP court obligatoire
Le rapport détaillé va dans le DÉPÔT, pas dans le chat.
À l'écran, l'agent ne rend qu'un STOP COURT, 4 lignes maximum :

  agent · MESSAGE-ID · statut (terminé / partiel / bloqué)
  fichier(s) modifié(s)
  commit (hash)
  réserves : une ligne, ou "aucune"

Interdit à l'écran : recopier le rapport, détailler les constats, expliquer la
démarche, lister les sources. Celui qui veut le détail lit le dépôt — c'est tout
l'intérêt d'avoir GitHub comme mémoire.

Un STOP long est une faute de protocole, même si le travail est bon.
