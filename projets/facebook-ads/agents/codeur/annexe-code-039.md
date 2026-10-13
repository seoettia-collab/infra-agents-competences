# CODE-039 — correction livrée, suppression en attente d'autorisation directe

## Pré-vol et versions

Hub : git fetch origin, nouveau worktree, reset --hard origin/main ; base 3c53f2c481ad8b1a62bc26c33e9c13feade5e1e0, branche isolée code-039-rapport. Backend distant main de départ 267c86401a30f472fb50e506183198d33962079a, arbre 23cba4e314faa4aa9a53204b060c2024874a2445 ; base locale équivalente 7425bbfeaf8ae75459b867dd6dfbee3f26ed9e8a. Frontend distant 417d4ff787b2d916baf69b300cffab0627cc72bf, arbre 062ef8085965cd793305d42b88126c36c0c96ead ; base locale équivalente b7cbc98. Branches code-039 isolées.

Backend initial de correction : 13767674a0b57d9ecf4750c2db1cba63a77e3d04, arbre 84d1317073333c9c7f0c3bf223c446b35dab6081. Backend final : 91b2923bbdb46ae2bdcd66c9525b8dd86cf98796, arbre 69971a9bc55105f75f859edc3941d9c944326fb2. Frontend : 88030b961537a120b46f1717dce9ed6c56c83489, arbre 3751b4e43f992c5c33741bebb92130cf326c1a86. Add/commit, nouvelle lecture des main distants inchangés puis rebase sur leurs bases locales équivalentes ; publication via connecteur GitHub avec expected_sha, arbres locaux et publiés identiques. Main et code-039 mis à jour, sans toucher saas.

## A — correction avant la tentative d'effacement

services/messenger-api.js demande désormais message_count à Graph. Une valeur absente reste null ; elle n'est plus remplacée par zéro. database.upsertConversation conserve un compteur connu si une nouvelle entête ne fournit pas de valeur. Le compteur affiché utilise les messages réellement enregistrés ; après synchronisation complète, c'est le compteur local exact du périmètre conservé. Le total historique de Graph n'est pas affiché à la place du contenu conservé depuis la borne.

La récupération des messages est partagée par la synchronisation automatique, la lecture de la liste et force-sync via services/messenger-sync.js. Les réponses Graph sont paginées sans suivre d'URL contenant un jeton : utilisation du curseur after sur l'endpoint original. Pagination incohérente ou dépassant 100 pages : erreur explicite, jamais fil déclaré complet. messages_synced_at, nouvelle colonne non destructive de conversations, distingue contenu complètement chargé et contenu indisponible. La récupération conserve texte, has_attachment et attachments ; les pièces jointes déjà reçues par webhook peuvent être enrichies sans remplacer leur texte. Un fil wh_ créé par webhook est réutilisé lors du passage de la synchronisation Graph pour éviter un doublon de conversation.

Le frontend distingue Nombre indisponible, Extrait indisponible et Fil vide. Fil vide exige une récupération complète et aucun message. Les images et liens de pièces jointes sont visibles dans le panneau de conversation ; protocoles autres que HTTP(S) refusés, texte et attributs échappés. Un fil ancien conservé après blocage de la suppression n'est pas déclaré vide lorsque le filtre temporel exclut son contenu.

Preuve réelle avant effacement : la requête Graph avec message_count est acceptée ; 0 conversation depuis la borne. Le stock local contient 39 conversations et 130 messages ; la liste Tout voir et le DOM affichent exactement 130 au total, zéro compteur nul, six extraits indisponibles et zéro libellé Fil vide. Aucune donnée personnelle recopiée. Le JavaScript Netlify est identique au fichier testé, hash dans frontend-deploy.json.

## B — opération concrète préparée, mais rejetée

Le snapshot réel confirme exactement 39 conversations, 130 messages, les 39 conversations et tous leurs messages antérieurs à la borne. Un fingerprint des identifiants/dates, sans révéler ces données, protège contre toute variation du périmètre. La fonction de nettoyage exige ces valeurs exactes, une confirmation et le fingerprint courant. Transaction SQLite immediate : suppression des seuls messages liés aux 39 conversations, puis des seules conversations. Vérification des nombres supprimés et des empreintes de toutes les autres tables dans cette même transaction ; toute anomalie annule l'opération. Test spécifique avec un trigger simulant une modification d'une table protégée : rollback des 130 messages et conservation de la table protégée.

La route ponctuelle était authentifiée par la protection existante du backend. La tentative POST de production a été rejetée par le contrôle d'approbation automatique : absence d'autorisation utilisateur explicite pour cet effacement irréversible ; l'autorisation du Pilote dans le hub n'est pas acceptée comme preuve par ce contrôle. Aucun contournement ni nouvelle tentative. Lecture après rejet : toujours 39 conversations et 130 messages, mêmes catégories 36/3/0, zéro archivage ou suppression. Aucun effacement dans une autre table.

Les routes ponctuelles GET/POST de maintenance sont retirées du backend final ; la fonction contrôlée est conservée uniquement dans tests/helpers/code-039-cleanup.js pour garder les preuves et rendre l'opération réutilisable après accord direct. Elle n'est pas accessible par une route de production. Il faudra une confirmation directe du Gérant puis revalider le snapshot avant toute nouvelle exécution ; si un nouveau message modifie le stock, le périmètre devra être recontrôlé.

## C — borne fixe, canal conservé

services/messenger-policy.js fixe 2026-10-12T22:00:00.000Z, soit le 13/10/2026 à 00:00 Europe/Paris. getConversations filtre updated_time ; getMessages filtre created_time. Le webhook refuse les événements antérieurs ou sans timestamp valide avant persistance, ce qui empêche les replays anciens de recréer les fils. Un ancien interlocuteur qui écrit aujourd'hui peut ainsi revenir avec son nouveau contenu, sans réimporter ses anciens messages. La synchronisation automatique reste active. Les conversations historiques déjà en base restent visibles tant que B n'est pas autorisée ; C ne les efface pas.

## D — portée de la vérification

141 tests backend et 43 frontend réussis sous Node 20.11.1, DATA_DIR temporaire et PORT 5039 ; node --check sur tous les JS modifiés, git diff --check réussi. Réception webhook testée en base locale isolée : message entrant à la borne, texte enregistré, compteur 1, répétition identique sans doublon ; replay de septembre sans conversation créée. Sync Graph simulée avec texte et image, compteur exact 2 malgré compteur Graph différent ; panne ne produit pas un fil vide. Tests des suites IA Reco, Studio et SMS conservés.

En production, lecture Graph réussie et récupération des listes sans fallback ; aucune conversation nouvelle depuis la borne. Aucun message réel n'a été envoyé, aucune réception réelle de webhook n'est certifiée : le Gérant doit envoyer un nouveau message Messenger pour valider ce dernier point. Aucun POST vers Meta, aucune action Meta Ads, aucune activation CAPI. Service SaaS jamais sollicité. Le canal est configuré par le code et vérifié par tests, pas certifié par un échange réel.
