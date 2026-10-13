# CODE-036 — annexe de livraison

## Bases et livraison

Pré-vol du hub : fetch puis reset sur origin/main ; fiche, gouvernance et mission lues au HEAD `f1c98bc894a0749f069c2fc976bad7ae2870f545`.
Bases distantes vérifiées : backend `eab85bd99726501448fc3d82fa86f49baf83d7a1`, frontend `8e27eb9147cb0e2954e590e3a7b282a6cd5e7c45` ; copies locales équivalentes `8e8d856` et `8807e87`. Worktrees isolés et branches `code-036`.
Rebase local sur les parents équivalents, HEAD distants contrôlés par connecteur avant publication, mises à jour avec expected_sha sans force ; arbres locaux/API identiques. Le connecteur assure l'accès Git privé comme sur les missions précédentes.
Backend main final : `267c86401a30f472fb50e506183198d33962079a`, arbre `23cba4e314faa4aa9a53204b060c2024874a2445` ; commit local équivalent `7425bbf`.
Frontend main final : `7ed93fa6d608d1dec081474c5db597b3356dbe36`, arbre `6553f490947029076f20ed3bda3d9b42e70df8fe` ; commit local équivalent `801e52e`.
Publication initiale backend `e0eacf5145f6bec8049ef7c4778c62d975782331`, frontend `e8702bb7fa7fecf28506f45c14300aadfe3448a9`. Ajustements finaux : contexte de conversation avec réponses de l'entreprise ; retrait immédiat des lignes pendant changement de vue et refus des réponses HTTP devenues périmées.

## A — classement de conversation

Nouveau service `services/conversation-triage.js` : modèle Claude Opus 4.7 déjà utilisé par le projet. Les messages persistés du fil entier sont lus ensemble, en distinguant is_page ; les réponses de l'entreprise servent de contexte et ne suffisent pas à établir l'intention du correspondant. Aucun nom de participant ni identifiant n'est ajouté au prompt ; les éventuels renseignements présents dans les messages restent des données non fiables, jamais des instructions.
Trois catégories locales : demande, demarchage, sans_objet. Pour écarter, catégorie reconnue, uncertain=false et confiance numérique d'au moins 0,95 sont nécessaires. Réponse invalide, doute, erreur du modèle, absence de messages entrants, pièce jointe seule ou fil dépassant le budget de contexte : Demande par prudence. Aucun fil n'est tronqué pour décider de l'écarter.
Classement asynchrone, au maximum deux appels de modèle simultanés ; fingerprint du contexte et révision de la conversation empêchent les reclassements inutiles et les décisions périmées. Après un nouvel apport de données, une décision IA revient provisoirement à Demande ; un résultat calculé sur une ancienne révision n'est pas appliqué et est replanifié.
Migration SQLite non destructive dans `services/database.js` : tri_category, tri_source, tri_fingerprint, tri_classified_at, tri_revision. Les nouvelles données de conversation et les messages entrants planifient le classement après persistance. Aucun changement des routines de synchronisation Messenger ni des échanges SMS.
La correction via PATCH /api/facebook/conversations/:id/classification porte la source human, incrémente la révision et fait autorité, même si le modèle était en cours ou qu'un nouveau message/sync arrive ensuite. Les autres champs CRM restent conservés. Reclasser en Demande restaure également la visibilité locale d'une conversation archivée/anciennement masquée.

## B — affichage et vider

Conversions ouvre désormais l'Inbox et son filtre À traiter par défaut. Leads Facebook, flux Échanges et autres sections restent accessibles. Structure de l'Inbox conservée ; seuls contrôles et classement sont ajoutés dans `js/conversions.js`, `index.html`, `css/conversions.css`.
À traiter : Demandes actives. Écartés : Démarchage/Sans objet actifs, avec nombre simple. Tout voir : toutes les conversations locales, écartés et archivées inclus, y compris les anciennes conversations masquées. La liste ajoute les anciennes conversations en SQLite aux objets reçus de Graph ; la lecture Graph et sa synchronisation restent actives.
Chaque catégorie peut être corrigée vers l'une des deux autres en un clic ; À traiter permet aussi de faire revenir une conversation archivée. La vue et la sélection restent cohérentes après reclassement.
Vider (archiver) exige une confirmation explicite dans l'interface et confirmed=true dans POST /api/facebook/conversations/archive-discarded. Choix non destructif imposé par l'interdiction de suppression : seul archived=1 est appliqué aux écartés actifs ; aucune ligne/message n'est effacé et deleted n'est pas modifié. Les conversations restent dans Tout voir. Un reclassement en Demande les remet dans À traiter.
Le vidage a été vérifié sur des fixtures uniquement ; il n'a pas été exécuté sur les données réelles.

## C — aucune action extérieure du classement

Le service de tri ne possède aucune commande d'envoi Messenger/SMS, de suppression ou d'archivage automatique. Il n'émet ni notification ni toast à l'issue du classement.
Pour les écartés, la liste supprime les marqueurs non-lus, attente et urgence ; les statistiques de conversations/retard de réponse ne les prennent pas pour des demandes à traiter. Le compteur Écartés reste un nombre neutre.
Le verrou AUTO-REPLY-OFF-01 déjà présent dans autoReplyService est conservé ; aucune auto-réponse réactivée. Synchronisation Messenger, SMS/chaîne, IA Reco, Studio, Rédacteur et garde-fous non modifiés. Aucune action Meta.

## D — résultat réel, uniquement des nombres

Périmètre initial en base : **39 conversations, 130 messages** ; **0 archivées, 0 supprimées**.
Le backfill a été lancé via POST /api/facebook/conversations/classify ; une relance après la livraison du contexte complet a traité les fingerprints du service final. Au terme de la file : **0 en attente, 0 tâches en file, 0 modèles en cours**.

| Catégorie | Conversations |
|---|---:|
| Demande | 36 |
| Démarchage | 3 |
| Sans objet | 0 |
| Total | 39 |

**12** conversations restent Demande par prudence (source fallback : doute, contexte insuffisant ou échec technique, sans distinction détaillée enregistrée). Ce sont des décisions conservatrices, pas des conversations retirées. Aucune correction humaine réelle n'a été simulée sur la clientèle.
Après classement : **39 conversations, 130 messages, 0 archivées, 0 supprimées**. Les quatre nombres correspondent au snapshot initial ; aucun vidage exécuté.
Lectures des trois vues : **À traiter 36**, **Écartés 3**, **Tout voir 39** ; catégories des vues vérifiées par agrégation, sans recopier d'identifiant, nom ou contenu. L'interface a confirmé le défaut À traiter, les trois écartés, trois boutons de retour À traiter et **0** marqueur d'alerte sur les écartés.
Le classement n'est pas une validation humaine de sa pertinence : c'est précisément la phase révisable demandée avant toute éventuelle suppression. Aucune donnée personnelle dans le rapport ou les preuves.

## Tests et déploiement

Node **20.11.1** : **133/133 tests backend**, **40/40 tests frontend**, soit **173 verts**. node --check sur chaque JS modifié et git diff --check réussis. DATA_DIR temporaire, PORT dédié ; dépendances locales réutilisées par lien de worktree, sans changement de lockfile.
Tests spécifiques : doute/faible confiance/panne, fil entier/historique, priorité humaine pendant modèle et après sync, révision périmée, contexte insuffisant/pièces jointes, file limitée à deux modèles, conservation des messages et drapeaux, confirmation avant archivage, réversibilité, interfaces sans alertes, trois catégories révisables, Tout voir/archives, changement de vue et réponse HTTP périmée. Suites historiques, SMS, IA Reco et Studio toujours vertes.

Render : service autorisé `srv-d6cq3hi4d50c73aa1rkg`, workspace `tea-d4qdtsali9vc739s5000`. Déploiement final `dep-db707e7avr4c73btcb10`, **live**, commit backend final, terminé le **13/10 à 10:11:49 UTC**. Déploiements automatiques, aucun doublon manuel.
Netlify : js/conversions.js et css/conversions.css identiques octet pour octet aux actifs testés du frontend final ; hashes dans la preuve frontend-deploy.json. Interface finale ouverte et contrôlée.

## Fichiers et limites des preuves

- `preuves-code-036/tests-backend.txt`, `tests-frontend.txt` : suites finales, données fictives uniquement.
- `preuves-code-036/classement-reel.json` : snapshots de nombres avant/après, état de file et répartition des trois vues ; aucun identifiant ni message.
- `preuves-code-036/frontend-deploy.json` : hashes des actifs publics.
- `preuves-code-036/deploiement.json` : déploiement final Render et commits.
Une capture limitée au compteur a été tentée deux fois et a échoué par timeout du navigateur. Aucune capture pleine contenant des données personnelles n'a été réalisée ou publiée ; les vérifications DOM ne rapportent que des nombres et des états de contrôles.
