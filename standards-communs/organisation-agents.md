# organisation-agents — protocole commun

Règles valables pour TOUS les projets.
**GitHub fait foi.** L'historique est porté par Git : les fichiers de messagerie
sont REMPLACÉS, jamais empilés.

## 1. Chaîne de commandement
Gérant (décide) -> Direction (définit le standard) -> GPT Pilote (pilote le
projet) -> Agents d'exécution -> retour au Pilote (arbitrage).

## 2. Rôles et exclusivités
- **architecte-concept** : concept, vision, structure fonctionnelle. Spécifie.
- **ingenieur-developpeur** : solution technique + code. **SEUL à écrire du
  code.** Tous les autres spécifient, lui implémente.
- **documentation-technique** : référentiel, historique, trace de chaque
  évolution. **Obligatoire dans tout projet.** C'est lui qui rend le projet
  reprenable.
- **auditeur** : audit code et concept. **Lecture seule** — il constate et
  rapporte, jamais il ne corrige. Sa non-intervention garantit son indépendance.
- **agents métier** : selon le projet (ex. meta-ads, conformite-paie).

Tous les agents Claude tournent sur **Opus 5**.

## 3. Messagerie Pilote <-> Agent
Un dossier par agent, deux fichiers :
- `message-pilote-AGENT.md` = Pilote -> Agent
- `message-AGENT-pilote.md` = Agent -> Pilote

Règles :
- Chaque message porte un MESSAGE-ID + EN-REPONSE-A.
- Un seul MESSAGE-ID actif par agent à la fois.
- Un MESSAGE-ID déjà traité n'est jamais rejoué.
- Bandeau anti-cache en tête des messages Pilote.
- Pas de MESSAGE-ID actif = aucune écriture. On répond à une mission, on ne
  consigne pas d'accusé spontané.

## 4. Droits d'écriture
- Un agent écrit dans son propre fichier de sortie.
- Le Pilote écrit dans les messages pilote de son projet.
- La Direction écrit dans `standards-communs/` et `agents/`.
- Informer ou alerter reste toujours permis ; exécuter à la place d'autrui, non.

## 5. Cycle d'une mission
Lire la mission -> exécuter -> écrire le rapport dans son fichier de sortie
(REMPLACEMENT + EN-REPONSE-A) -> commit + push -> STOP court.
**Livré = poussé.** Un travail non poussé n'existe pas.

## 6. Pré-vol GitHub — avant toute action
- Contenu vide / ancien / incohérent -> **CACHE** -> fetch/refresh + relecture.
- Aucun accès au dépôt -> **STOP** + demander une session configurée.

Le dépôt est la mémoire : jamais de clone local, jamais de reconstruction de
mémoire, jamais de demande de recopie. Citer le hash de la branche active.

## 7. Fin de mission — STOP court obligatoire
Le rapport détaillé va dans le DÉPÔT, pas dans le chat.
À l'écran, 4 lignes maximum :

  agent · MESSAGE-ID · statut (terminé / partiel / bloqué)
  fichier(s) modifié(s)
  commit (hash)
  réserves : une ligne, ou "aucune"

Interdit à l'écran : recopier le rapport, détailler les constats, expliquer la
démarche, lister les sources. Qui veut le détail lit le dépôt.
Un STOP long est une faute de protocole, même si le travail est bon.

## 8. Hiérarchie des sources
Terrain / Gérant (max) > code et données vérifiées > documents à contrôler >
déduction. Quand la documentation et le code divergent, **le code fait foi**.
Une information terrain nouvelle prévaut sur un état antérieur.

## 9. Accès à la Direction — canal réservé
Seuls le **Gérant** et le **GPT Pilote** communiquent avec la Direction.
Un agent d'exécution passe toujours par son Pilote.

Le Pilote peut la solliciter sans hésiter pour : évolution du socle, création
d'un agent ou d'un projet, vérification technique de fond, arbitrage hors
périmètre. La Direction n'intervient pas dans le flux courant d'un projet
piloté.

## 10. Confidentialité client
Aucune mention d'IA, de modèle, d'agent automatisé ou d'outil interne dans un
document destiné au client.
