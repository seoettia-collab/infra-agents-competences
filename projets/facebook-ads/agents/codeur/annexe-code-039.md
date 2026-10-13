# CODE-039 — correction et suppression confirmée livrées

## Pré-vol et versions

Hub : git fetch origin, nouveau worktree, reset --hard origin/main ; base 3c53f2c481ad8b1a62bc26c33e9c13feade5e1e0, branche isolée code-039-rapport. Backend distant main de départ 267c86401a30f472fb50e506183198d33962079a, arbre 23cba4e314faa4aa9a53204b060c2024874a2445 ; base locale équivalente 7425bbfeaf8ae75459b867dd6dfbee3f26ed9e8a. Frontend distant 417d4ff787b2d916baf69b300cffab0627cc72bf, arbre 062ef8085965cd793305d42b88126c36c0c96ead ; base locale équivalente b7cbc98. Branches code-039 isolées.

Backend initial de correction : 13767674a0b57d9ecf4750c2db1cba63a77e3d04, arbre 84d1317073333c9c7f0c3bf223c446b35dab6081. Backend de correction testé : 91b2923bbdb46ae2bdcd66c9525b8dd86cf98796. Procédure ponctuelle réactivée après accord direct : 534618f1a4143509b4e87ce3809b85edb9c93290. Backend final, procédure retirée : 8eb4288c5165738859b245eca4781b1ee53bb8f6, arbre 69971a9bc55105f75f859edc3941d9c944326fb2, identique à l’arbre final déjà testé. Frontend : 88030b961537a120b46f1717dce9ed6c56c83489, arbre 3751b4e43f992c5c33741bebb92130cf326c1a86. Add/commit, nouvelle lecture des main distants inchangés puis rebase sur leurs bases locales équivalentes ; publication via connecteur GitHub avec expected_sha, arbres locaux et publiés identiques. Main et code-039 mis à jour, sans toucher saas.

## A — correction avant la tentative d'effacement

services/messenger-api.js demande désormais message_count à Graph. Une valeur absente reste null ; elle n'est plus remplacée par zéro. database.upsertConversation conserve un compteur connu si une nouvelle entête ne fournit pas de valeur. Le compteur affiché utilise les messages réellement enregistrés ; après synchronisation complète, c'est le compteur local exact du périmètre conservé. Le total historique de Graph n'est pas affiché à la place du contenu conservé depuis la borne.

La récupération des messages est partagée par la synchronisation automatique, la lecture de la liste et force-sync via services/messenger-sync.js. Les réponses Graph sont paginées sans suivre d'URL contenant un jeton : utilisation du curseur after sur l'endpoint original. Pagination incohérente ou dépassant 100 pages : erreur explicite, jamais fil déclaré complet. messages_synced_at, nouvelle colonne non destructive de conversations, distingue contenu complètement chargé et contenu indisponible. La récupération conserve texte, has_attachment et attachments ; les pièces jointes déjà reçues par webhook peuvent être enrichies sans remplacer leur texte. Un fil wh_ créé par webhook est réutilisé lors du passage de la synchronisation Graph pour éviter un doublon de conversation.

Le frontend distingue Nombre indisponible, Extrait indisponible et Fil vide. Fil vide exige une récupération complète et aucun message. Les images et liens de pièces jointes sont visibles dans le panneau de conversation ; protocoles autres que HTTP(S) refusés, texte et attributs échappés. Un fil ancien n'est pas déclaré vide lorsque le filtre temporel exclut son contenu.

Preuve réelle avant effacement : la requête Graph avec message_count est acceptée ; 0 conversation depuis la borne. Le stock local contient 39 conversations et 130 messages ; la liste Tout voir et le DOM affichent exactement 130 au total, zéro compteur nul, six extraits indisponibles et zéro libellé Fil vide. Aucune donnée personnelle recopiée. Le JavaScript Netlify est identique au fichier testé, hash dans frontend-deploy.json.

## B — suppression confirmée et exécutée

La première tentative avait été rejetée par auto-review faute d'accord utilisateur direct. Le Gérant a ensuite confirmé explicitement dans la conversation la suppression des 39 conversations et des 130 messages, en connaissance de cause. La confirmation a permis l'exécution, sans contournement du contrôle.

Pré-vol de cette reprise : hub fetch puis reset --hard origin/main dans un nouveau worktree isolé code-039-confirmation, HEAD 893773c34af1b2cb1124c0b20ebaa1c2b454ed74 ; backend main 91b2923bbdb46ae2bdcd66c9525b8dd86cf98796. Les 141 tests backend ont été relancés et réussis pour la route ponctuelle. Les 43 tests frontend de la correction restent valides, frontend inchangé. node --check et diff --check réussis.

Snapshot réel avant exécution : exactement 39 conversations, 130 messages, les 39 conversations et tous leurs messages antérieurs à la borne ; aucun fil récent chez Graph. L'empreinte des identifiants/dates est identique à celle contrôlée avant la demande de confirmation : aucun nouveau fil ni message dans le périmètre. Les données individuelles ne figurent pas dans les preuves.

Transaction SQLite immediate : vérification du snapshot courant et de la confirmation ; suppression des seuls messages liés aux 39 conversations, puis des conversations. Vérification des nombres supprimés et des empreintes de toutes les autres tables dans cette même transaction ; toute anomalie provoque un rollback. Résultat réel : 39 conversations et 130 messages supprimés ; après, 0 conversation et 0 message. Toutes les autres tables identiques, y compris leads, SMS, publications, analyses, métriques, paramètres, contexte métier et événements webhook. Les seuls enregistrements effacés sont ceux des deux tables autorisées. Les comptages protégés sont dans suppression-confirmee.json ; aucune donnée personnelle.

La route ponctuelle était authentifiée par la protection existante du backend. GET et POST maintenance-code-039 sont retirés du backend final après exécution. La fonction contrôlée reste uniquement dans tests/helpers/code-039-cleanup.js, sans route de production. Les preuves du refus antérieur restent conservées, mais la présente v1.1 les remplace pour l'état de la mission.

## C — borne fixe, canal conservé

services/messenger-policy.js fixe 2026-10-12T22:00:00.000Z, soit le 13/10/2026 à 00:00 Europe/Paris. getConversations filtre updated_time ; getMessages filtre created_time. Le webhook refuse les événements antérieurs ou sans timestamp valide avant persistance, ce qui empêche les replays anciens de recréer les fils. Un ancien interlocuteur qui écrit aujourd'hui peut ainsi revenir avec son nouveau contenu, sans réimporter ses anciens messages. La synchronisation automatique reste active. Les 39 conversations historiques ont été effacées par B ; C empêche leur réimportation.

## D — portée de la vérification

141 tests backend et 43 frontend réussis sous Node 20.11.1, DATA_DIR temporaire et PORT 5039 ; node --check sur tous les JS modifiés, git diff --check réussi. Réception webhook testée en base locale isolée : message entrant à la borne, texte enregistré, compteur 1, répétition identique sans doublon ; replay de septembre sans conversation créée. Sync Graph simulée avec texte et image, compteur exact 2 malgré compteur Graph différent ; panne ne produit pas un fil vide. Tests des suites IA Reco, Studio et SMS conservés.

En production, lecture Graph réussie et récupération des listes sans fallback ; aucune conversation nouvelle depuis la borne. Aucun message réel n'a été envoyé, aucune réception réelle de webhook n'est certifiée : le Gérant doit envoyer un nouveau message Messenger pour valider ce dernier point. Aucun POST vers Meta, aucune action Meta Ads, aucune activation CAPI. Service SaaS jamais sollicité. Le canal est configuré par le code et vérifié par tests, pas certifié par un échange réel.

Contrôle réel après suppression : POST force-sync réussi, 0 conversation synchronisée et 0 erreur de contenu ; comptage ensuite toujours 0 conversation et 0 message, file de classement vide. Les anciens fils ne reviennent donc pas après cette synchronisation. Route de maintenance retirée, GET renvoie 404. Déploiement final Render dep-db71h6dbedkc73bm2110 live le 13/10/2026 à 11:41:19 UTC, commit 8eb4288c5165738859b245eca4781b1ee53bb8f6. Les preuves de cette reprise consignent ces contrôles. Aucun nouvel échange réel n’est créé pour effectuer ces contrôles.

Contrôle DOM après purge : À traiter et Tout voir affichent « Aucune conversation », zéro ligne et aucun chargement en cours ; compteur Écartés égal à zéro. Aucune capture contenant des données personnelles n’est enregistrée.
