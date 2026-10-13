# CODE-038 — diagnostic préalable et arrêt sans suppression

## Conclusion A, communiquée avant toute suppression

Le constat « 39 coquilles sans contenu » est contredit par la lecture réelle. Avant le diagnostic détaillé, GET /api/facebook/conversations/triage comptait déjà 39 conversations et 130 messages dans SQLite. Ces messages étaient donc enregistrés avant cette mission. La lecture des 39 fils a retourné exactement 130 messages ; chaque fil en retourne au moins un. 98 messages comportent du texte non vide, répartis sur 33 fils. 35 lectures ont répondu depuis Graph, 4 depuis le fallback SQLite. Zéro erreur de lecture. Les six fils sans texte retourné ne sont pas prouvés vides : l'adaptateur Graph ne demande pas les pièces jointes et impose has_attachment=false. Aucune sélection sûre de « 39 conversations vides » ne peut être constituée.

Les 39 entêtes portent message_count=0. Ce champ ne mesure pas le contenu local : services/messenger-api.js:getConversations demande id,updated_time,participants,snippet,unread_count et les métadonnées du dernier message, mais ne demande pas message_count. Il convertit la valeur absente en zéro. routes/messenger.js et services/syncService.js passent cette valeur à database.upsertConversation, qui écrase le compteur existant. Les extraits d'entête ne prouvent pas non plus l'absence du contenu de messages. Ce défaut du compteur est antérieur à CODE-036 : présent dans le commit f080e16 et conservé dans le main actuel. CODE-037 a rendu visible ce compteur erroné ; il aurait fallu vérifier sa correspondance avec la table messages avant de l'afficher.

La synchronisation automatique ne récupère pas seulement les entêtes : services/syncService.js:syncConversations appelle syncMessages pour chaque conversation et enregistre les messages avec upsertMessage. La lecture de la liste et POST force-sync, en revanche, ne synchronisent que les entêtes. L'ouverture d'un fil appelle getMessages et persiste sa réponse ; en cas d'échec Graph elle relit SQLite. Les requêtes de diagnostic ont utilisé ces routes existantes, avec leur cache local habituel, sans envoi ni suppression côté Meta.

La documentation JOURNAL.md établit une purge le 11/10/2026 de 70 conversations et 168 messages, puis une base vide. La synchronisation actuelle n'a pas de borne temporelle Messenger : elle peut donc réimporter l'historique conservé chez Meta. Le code explique ce retour. Il ne prouve pas une purge supplémentaire le matin du 13/10 ni la chronologie individuelle des 130 messages ; aucune telle chronologie n'est inventée. Le symptôme actuel « zéro messages » n'est pas la preuve d'une perte de contenu par purge.

L'affirmation « CODE-036 a classé sans texte, son résultat ne vaut rien » n'est pas établie : CODE-036 lisait la table messages et avait déjà 130 messages avant classement, selon ses preuves conservées dans le hub. La pertinence du classement reste révisable ; elle n'est pas certifiée par ce diagnostic. Les six fils sans texte retourné nécessitent notamment une vérification des pièces jointes et du contexte.

## B — préservation obligatoire

L'ordre limite explicitement la suppression aux conversations vides et interdit toute autre suppression. Effacer ces 39 fils aurait effacé du contenu réel. Aucun DELETE ni route de purge, reset, archivage ou reclassement n'a été appelé. Aucune transaction destructive n'a été créée ou exécutée. Comptage après : 39 conversations, 130 messages, 0 archivées, 0 supprimées ; catégories inchangées 36/3/0. Ce n'est pas un nettoyage réussi : B est bloquée et doit être réécrite par le Pilote au vu des preuves.

## C et D — non réalisés après l'arrêt A

Aucun changement de code ni déploiement. La borne du 13/10/2026 n'a pas été mise en place ; la synchronisation reste active dans son état précédent. Le diagnostic préalable demandé doit revenir au Pilote avant de poursuivre une opération fondée sur 39 fils supposés vides. Le traitement de la réception webhook persiste le texte/les pièces jointes via upsertMessage ; c'est une lecture du code, pas une preuve de réception nouvelle en production. Aucun message réel n'a été envoyé : le Gérant peut tester le canal entrant. Les lectures Graph réussies établissent l'accès aux contenus existants, pas la livraison future d'un webhook.

## Traçabilité

Pré-vol hub : git fetch origin puis nouveau worktree, git reset --hard origin/main ; HEAD 61701ee (hash complet disponible dans Git). Branche isolée code-038-rapport. Backend main distant vérifié : 267c86401a30f472fb50e506183198d33962079a ; copie locale de même arbre : 7425bbfeaf8ae75459b867dd6dfbee3f26ed9e8a. Aucun fichier backend/frontend modifié ; pas de tests Node requis pour un diagnostic sans changement de code. Aucun secret ni nom, identifiant ou texte de conversation dans les preuves : uniquement des agrégats. Aucun accès au service SaaS, aucune action Meta Ads, aucun envoi SMS/Messenger, aucune modification de leads, publications, analyses, métriques ou configuration.
