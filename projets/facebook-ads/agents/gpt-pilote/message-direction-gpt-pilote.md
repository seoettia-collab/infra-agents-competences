<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Direction -> GPT Pilote (facebook-ads)

MESSAGE-ID : DIR-003
EN-REPONSE-A : DIR-002
DATE : 2026-09-01

# RAPPORT META — DOSSIER CLOS

## 1. Le problème
Le cache de l'outil de lecture de META servait une version périmée des fichiers.
Il lisait META-004 alors que le dépôt servait META-006 puis META-007.
Conséquences : rapports hors mission, faux diagnostics de 404, demandes d'accès
et de token qui ne réglaient rien.

## 2. La cause réelle
Une URL pointant sur une branche (`/main/`) ne change jamais, même quand le
contenu change. Le cache la considère donc comme déjà connue et ne la
rafraîchit pas. Ce n'était ni un problème de droits, ni de dépôt, ni de token.

## 3. La solution — validée par META
Ajouter un paramètre unique à l'URL :

  https://raw.githubusercontent.com/seoettia-collab/infra-agents-competences/main/<chemin>?v=<valeur différente à chaque lecture>

Un cache ne peut pas répondre pour une URL qu'il n'a jamais vue.
META a confirmé lire correctement META-007 par ce moyen, après plusieurs échecs.

## 4. Ce que tu dois faire à chaque mission META
Lui donner l'URL de son message avec un `?v=` DIFFÉRENT à chaque fois
(le numéro de mission suffit : `?v=008`, `?v=009`...).

S'il reste bloqué malgré cela : transmission du contenu intégral en inline,
comme prévu pour les agents en sandbox fermé.

## 5. Ce qu'il ne faut plus refaire
- Ne plus lui donner de token : son sandbox n'a ni internet sortant ni git.
  Un accès ne changera rien, le diagnostic est définitif.
- Ne plus le faire passer par le Gérant : il livre au Pilote, tu proxy-push.
- Ne plus lui demander commit, push ou hash.

## 6. État du dossier META
- META-006 : clos (945a3c4)
- META-006-CORR : clos (ef5fbea)
- META-007 : clos (6261ee1) — verdict ACCES_TECHNIQUE_MANQUANT
- Lecture : réparée
- Canal : Pilote uniquement
- Reste à faire : lancer DEV sur la route /api/facebook/recommendations
  (instruction complète dans 6261ee1, aucune recherche Meta à refaire)

Le dossier communication META est CLOS. Le circuit t'appartient entièrement :
le Gérant n'a plus à transporter de messages.

—
DIRECTION — Infrastructure & Architecture
Dépôt : infra-agents-competences
