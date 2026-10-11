# INVENTAIRE FRONTEND — facebook-ads

Appels backend réellement présents dans le code du dashboard.
Commit de base : 7975a80 — branche main.

## js/conversions.js

| Chemin appelé | Méthode | Ce qui le déclenche | Route présente dans l’inventaire backend ? | Remarque |
|---|---|---|---|---|
| `/api/leads/:leadId/rename` | POST | Clic sur le crayon de renommage d’un lead. | non | Préfixe différent : backend inventorié sous /api/facebook/leads/:id/rename. |
| `/webhook/admin/backfill-messenger-leads` | POST | Bouton de synchronisation rétroactive Messenger vers leads. | oui | — |
| `/api/cache/clear` | POST | Rafraîchissement forcé de la liste des leads. | non | Route absente des 155 routes backend inventoriées. |
| `/api/facebook/leads[?filter=archived]` | GET | Chargement ou rafraîchissement de la liste des leads. | oui | Le même site choisit la vue active ou archives. |
| `/api/facebook/leads/:id/archive` | PATCH | Action groupée Archiver sur les leads sélectionnés. | oui | Route réutilisée dans plusieurs flux d’archivage. |
| `/api/facebook/leads/:id/archive` | PATCH | Catégorisation groupée depuis Archives : désarchivage préalable. | oui | Appel répété dans le même fichier. |
| `/api/facebook/leads/:id/category` | PATCH | Catégorisation groupée : application de la catégorie choisie. | oui | Route appelée aussi pour le flux Relance. |
| `/api/facebook/leads/:id/archive` | PATCH | Action groupée Désarchiver. | oui | Appel répété dans le même fichier. |
| `/api/facebook/leads/:id/archive` | PATCH | Action groupée Mettre en relance : désarchivage préalable. | oui | Appel répété dans le même fichier. |
| `/api/facebook/leads/:id/category` | PATCH | Action groupée Mettre en relance : affectation de la catégorie Relance. | oui | Appel répété dans le même fichier. |
| `/api/facebook/leads/:id` | DELETE | Action groupée Supprimer sur les leads sélectionnés. | oui | Même route aussi utilisée pour la suppression unitaire. |
| `/api/comms/full-history/:leadId?limit=50` | GET | Ouverture ou rafraîchissement de l’historique d’un lead. | oui | Même historique complet chargé aussi depuis la modale communications. |
| `/api/ai/write-from-idea` | POST | Bouton IA de rédaction depuis une idée dans la zone lead. | oui | Même route réutilisée plus bas par le brouillon depuis idée. |
| `/api/facebook/upload-attachment` | POST | Sélection d’une photo dans la zone de réponse Messenger inline. | non | Inventaire backend : /api/messenger/upload-attachment. |
| `/api/ai/verify-text` | POST | Bouton de vérification du texte dans la réponse inline. | oui | Route de vérification appelée depuis plusieurs zones. |
| `/api/comms/sms` | POST | Bouton Envoyer SMS depuis la zone inline. | oui | Route SMS appelée depuis plusieurs flux du fichier. |
| `/api/facebook/leads/:leadId/conversation` | GET | Envoi Messenger inline : résolution de la conversation du lead. | oui | Même résolution réutilisée dans la modale Messenger. |
| `/api/facebook/conversations/:id/reply` | POST | Envoi Messenger inline : envoi du texte. | oui | Même route de réponse appelée depuis trois flux. |
| `/api/facebook/send-photo` | POST | Envoi Messenger inline : envoi d’une photo. | non | Inventaire backend : /api/messenger/send-photo. |
| `/api/ai/verify-text` | POST | Vérification du texte d’une réponse manuelle. | oui | Appel répété dans le même fichier. |
| `/api/comms/sms` | POST | Envoi d’une réponse manuelle par SMS. | oui | Appel répété dans le même fichier. |
| `/api/ai/sms-generate` | POST | Bouton IA pour générer un SMS de contact. | oui | Même génération SMS réutilisée dans la modale. |
| `/api/comms/sms` | POST | Envoi du SMS généré ou édité depuis la zone inline. | oui | Appel répété dans le même fichier. |
| `/api/facebook/conversations` | GET | Chargement de la liste des conversations Messenger. | oui | La même route sert aussi à la vue archivées avec un filtre. |
| `/api/facebook/conversations/:id/messages` | GET | Clic sur une conversation pour charger ses messages. | oui | — |
| `/api/facebook/conversations/:id/reply` | POST | Bouton Envoyer dans le fil Messenger. | oui | Appel répété dans le même fichier. |
| `/api/ai/suggest-reply` | POST | Bouton de suggestion IA dans une conversation Messenger. | oui | — |
| `/api/ai/commercial-reply` | POST | Bouton de génération d’une réponse commerciale. | oui | Même route réutilisée dans le drawer lead. |
| `/api/ai/messenger-reply-custom` | POST | Génération Messenger avec instructions personnalisées. | oui | Même route réutilisée dans la modale Messenger. |
| `/api/facebook/conversations/:id` | DELETE | Suppression de la conversation ouverte. | oui | Même route aussi appelée depuis la liste. |
| `/api/facebook/conversations/:id/archive` | PATCH | Archivage ou désarchivage de la conversation ouverte. | oui | Même route aussi appelée depuis la liste. |
| `/api/facebook/conversations/:id/archive` | PATCH | Archivage ou désarchivage directement depuis la liste. | oui | Appel répété dans le même fichier. |
| `/api/facebook/conversations/:id` | DELETE | Suppression d’une conversation directement depuis la liste. | oui | Appel répété dans le même fichier. |
| `/api/facebook/conversations?filter=archived` | GET | Ouverture de la vue Conversations archivées. | oui | Variante filtrée de la route conversations. |
| `/api/facebook/conversations/:id/status` | PATCH | Changement du statut CRM d’une conversation. | oui | — |
| `/api/facebook/conversations/stats` | GET | Chargement des KPI du pipeline commercial. | oui | Déclenché au chargement de l’écran Conversions. |
| `/api/comms/flux-echanges?limit=:n&offset=:n[&type=:type]` | GET | Ouverture, filtrage ou pagination du Flux Échanges. | oui | URL construite dynamiquement selon filtre et pagination. |
| `/api/comms/{inbound|outbound}/:id` | DELETE | Suppression groupée d’éléments sélectionnés dans le Flux Échanges. | oui | Le chemin choisit inbound ou outbound selon la source. |
| `/api/comms/{inbound|outbound}/:id` | DELETE | Suppression unitaire d’un élément du Flux Échanges. | oui | Même appel dynamique que la suppression groupée. |
| `/api/comms/notes/:leadId` | GET | Chargement des notes d’un lead dans le Flux Échanges. | oui | — |
| `/api/comms/notes` | POST | Ajout d’une note depuis le Flux Échanges. | oui | — |
| `/api/comms/notes/:id` | DELETE | Suppression d’une note depuis le Flux Échanges. | oui | — |
| `/api/facebook/leads/:id/archive` | PATCH | Archivage ou désarchivage depuis le drawer du lead. | oui | Appel répété dans le même fichier. |
| `/api/facebook/leads/:id/archive` | PATCH | Archivage ou désarchivage depuis la liste des leads. | oui | Appel répété dans le même fichier. |
| `/api/facebook/leads/:id/status` | PATCH | Changement du statut CRM d’un lead. | oui | — |
| `/api/facebook/leads/:id/note` | PATCH | Sauvegarde de la note inline d’un lead. | oui | — |
| `/api/facebook/leads/:id` | DELETE | Suppression unitaire d’un lead depuis la liste. | oui | Même route que la suppression groupée. |
| `/api/ai/lead-reply-custom` | POST | Génération d’une réponse lead avec instructions personnalisées. | oui | — |
| `/api/ai/commercial-reply` | POST | Génération d’une réponse commerciale depuis le drawer lead. | oui | Appel répété dans le même fichier. |
| `/api/ai/verify-text` | POST | Vérification du texte IA généré pour un lead. | oui | Appel répété dans le même fichier. |
| `/api/comms/email` | POST | Bouton d’envoi email du texte IA d’un lead. | oui | — |
| `/api/comms/sms` | POST | Bouton d’envoi SMS du texte IA d’un lead. | oui | Appel répété dans plusieurs flux SMS. |
| `/api/facebook/leads?filter=archived` | GET | Ouverture ou rafraîchissement de la vue Leads archivés. | oui | Même variante filtrée que le chargement principal des leads. |
| `/api/ai/suggest-lead-followup` | POST | Bouton de suggestion de relance pour un lead. | oui | — |
| `/api/comms/call/click-to-call` | POST | Bouton Appeler depuis une fiche lead. | oui | Même route utilisée aussi depuis un autre contexte. |
| `/api/comms/call/hangup` | POST | Bouton Raccrocher pour l’appel courant. | oui | Même route utilisée aussi depuis un autre contexte. |
| `/api/comms/call/click-to-call` | POST | Bouton Appeler depuis le contexte ou drawer secondaire. | oui | Appel répété dans le même fichier. |
| `/api/comms/call/hangup` | POST | Bouton Raccrocher depuis le contexte secondaire. | oui | Appel répété dans le même fichier. |
| `/api/comms/templates` | GET | Ouverture de la modale SMS : chargement des modèles disponibles. | oui | Chargé une fois puis conservé en cache frontend. |
| `/api/ai/sms-generate` | POST | Bouton Générer SMS IA dans la modale SMS. | oui | Appel répété dans le même fichier. |
| `/api/facebook/upload-attachment` | POST | Sélection de photos dans la modale Messenger. | non | Inventaire backend : /api/messenger/upload-attachment. |
| `/api/ai/messenger-reply-custom` | POST | Bouton Générer Messenger IA dans la modale. | oui | Appel répété dans le même fichier. |
| `/api/facebook/leads/:leadId/conversation` | GET | Envoi Messenger depuis la modale : résolution de la conversation du lead. | oui | Appel répété dans le même fichier. |
| `/api/facebook/conversations/:id/reply` | POST | Envoi Messenger depuis la modale : envoi du texte. | oui | Appel répété dans le même fichier. |
| `/api/facebook/send-photo` | POST | Envoi Messenger depuis la modale : envoi d’une photo. | non | Inventaire backend : /api/messenger/send-photo. |
| `/api/comms/sms` | POST | Bouton Envoyer SMS dans la modale SMS. | oui | Appel répété dans le même fichier. |
| `/api/comms/full-history/:leadId` | GET | Ouverture de l’historique communications : chargement bidirectionnel complet. | oui | Chargé avec l’historique sortant juste après. |
| `/api/comms/history/:leadId` | GET | Ouverture de l’historique communications : complément sortant appels/SMS. | oui | Recoupe partiellement full-history dans le même flux. |
| `/debug/reset-conversations` | GET | Commande de test pour réinitialiser les conversations. | non | Route absente des 155 routes backend inventoriées. |
| `/debug/create-test-lead` | POST | Commande de test pour créer un lead de test. | non | Route absente des 155 routes backend inventoriées. |
| `/api/comms/auto-sms/status` | GET | Chargement de l’état actuel Auto-SMS. | oui | Même route relue avant chaque bascule. |
| `/api/comms/auto-sms/status` | GET | Clic sur la bascule Auto-SMS : lecture de l’état courant. | oui | Appel répété dans le même fichier. |
| `/api/comms/auto-sms/toggle` | POST | Clic sur la bascule Auto-SMS : écriture du nouvel état. | oui | — |
| `/api/ai/write-from-idea` | POST | Bouton Brouillon depuis idée dans la zone de rédaction. | oui | Appel répété dans le même fichier. |
| `/api/comms/sms` | POST | Bouton Envoyer le brouillon rédigé en SMS. | oui | Appel répété dans plusieurs flux SMS. |

## Suite de l'inventaire

Les autres fichiers frontend seront ajoutés ici lors des missions séparées.
## js/ads-manager.js

| Chemin appelé | Méthode | Ce qui le déclenche | Route présente dans l’inventaire backend ? | Remarque |
|---|---|---|---|---|
| `/api/facebook/ads/filters` | GET | Chargement du Gestionnaire de pubs : listes campagnes/adsets pour les filtres. | oui | — |
| `/api/facebook/campaigns/:id/strategy` | GET | Sélection ou chargement d’une campagne : détection de la stratégie budgétaire. | oui | — |
| `/api/facebook/ads/details?[campaign_id][&adset_id][&période]` | GET | Chargement ou rafraîchissement du tableau des publicités. | oui | URL construite selon les filtres actifs. |
| `/api/facebook/adsets/:id/status` | POST | Clic d’activation/pause d’un adset. | oui | En cas de campagne CBO, le code peut basculer sur la campagne. |
| `/api/facebook/campaigns/:id/status` | POST | Fallback CBO lors d’un clic d’activation/pause d’adset. | oui | Appelé seulement si la modification adset est refusée pour CBO. |
| `/api/facebook/ads/:id/status` | POST | Clic d’activation/pause d’une publicité. | oui | Même route réutilisée pour désactiver les perdants A/B. |
| `/api/facebook/ads/:id` | DELETE | Confirmation d’archivage/suppression d’une publicité. | oui | — |
| `/api/ai/ab-test-analyze` | POST | Bouton d’analyse IA d’un test A/B sélectionné. | oui | — |
| `/api/facebook/ads/:id/status` | POST | Action groupée de désactivation des perdants d’un test A/B. | oui | Appel répété dans le même fichier. |
| `/api/facebook/ads/:id/hd-image` | GET | Bouton Télécharger l’image d’une publicité : résolution de l’image HD. | oui | Le téléchargement final du fichier image est externe au backend. |
| `/api/facebook/ads/:id/preview` | GET | Ouverture de l’aperçu Facebook d’une publicité. | oui | — |
| `/api/facebook/ads/:id/source` | GET | Ouverture de la duplication : chargement de la publicité source. | oui | — |
| `/api/facebook/ads/:id/decline-preview` | POST | Bouton Décliner avec IA : génération des variantes sans publication. | oui | — |
| `/api/facebook/ads/:id/decline-with-ai` | POST | Validation des variantes générées : création des déclinaisons. | oui | — |
| `/api/facebook/ads/:id/duplicate` | POST | Confirmation de duplication d’une publicité. | oui | — |
| `/api/facebook/ads/:id/budget` | GET | Ouverture de la modale budget d’une publicité. | oui | — |
| `/api/facebook/ads/:id/budget` | POST | Enregistrement du nouveau budget depuis la modale. | oui | — |
| `/api/facebook/lead-forms` | GET | Ouverture de la modale de changement de formulaire Lead. | oui | — |
| `/api/facebook/ads/:id/update-form` | POST | Validation du nouveau formulaire associé à une publicité. | oui | — |
| `/api/facebook/ads/:id/details` | GET | Ouverture de la modale d’édition complète d’une publicité. | oui | — |
| `/api/facebook/adsets/:id/targeting` | GET | Ouverture de la modale de ciblage géographique : lecture du ciblage actuel. | oui | — |
| `/api/facebook/geo/search?q=:query` | GET | Recherche saisie dans la modale de ciblage géographique. | oui | Appel déclenché par la recherche utilisateur. |
| `/api/facebook/adsets/:id/geo-locations` | POST | Enregistrement du ciblage géographique choisi. | oui | — |
## js/ai-creation.js

| Chemin appelé | Méthode | Ce qui le déclenche | Route présente dans l’inventaire backend ? | Remarque |
|---|---|---|---|---|
| `/api/ai/generate-content` | POST | Bouton de génération initiale des textes publicitaires. | oui | Même route réutilisée dans plusieurs actions de régénération. |
| `/api/ai/generate-image` | POST | Passage à l’étape image avec génération IA. | oui | — |
| `/api/ai/generate-content` | POST | Action Générer tout : génération groupée des textes. | oui | Appel répété dans le même fichier. |
| `/api/video/upload-temp` | POST | Sélection d’une vidéo : stockage temporaire côté backend. | oui | — |
| `/api/video/:videoTempId` | DELETE | Suppression d’une vidéo temporaire retirée par l’utilisateur. | oui | — |
| `/api/image/upload-temp` | POST | Sélection d’une image : stockage temporaire côté backend. | oui | — |
| `/api/image/:imageTempId` | DELETE | Suppression d’une image temporaire retirée par l’utilisateur. | oui | — |
| `/api/ai/publish/campaigns` | GET | Ouverture du formulaire de publication : chargement des campagnes. | oui | Dans la paire doublon, c’est cette route qui est utilisée. |
| `/api/ai/publish` | POST | Validation du formulaire de publication d’une publicité image. | oui | — |
| `/api/ai/verify-text` | POST | Bouton de correction/vérification d’un champ texte. | oui | — |
| `/api/ai/generate-content` | POST | Régénération d’un seul champ texte. | oui | Appel répété dans le même fichier. |
| `/api/ai/generate-accroches` | POST | Bouton de régénération de toutes les accroches. | oui | — |
| `/api/ai/generate-image-prompt` | POST | Préparation automatique du prompt image. | oui | Même route réutilisée pour enrichir un prompt existant. |
| `/api/ai/generate-image-prompt` | POST | Bouton d’amélioration du prompt image existant. | oui | Appel répété dans le même fichier. |
| `/api/ai/generate-content` | POST | Régénération IA des textes depuis l’éditeur. | oui | Appel répété dans le même fichier. |
| `/api/facebook/ads/:id/update-creative` | POST | Enregistrement des modifications complètes d’une publicité existante. | oui | — |
| `/api/video/{upload|image-upload}` | POST | Téléversement direct d’un média depuis l’éditeur selon son type. | à vérifier | Branche vidéo présente ; branche /api/video/image-upload absente de l’inventaire backend. |

## js/ai-recommendations.js

| Chemin appelé | Méthode | Ce qui le déclenche | Route présente dans l’inventaire backend ? | Remarque |
|---|---|---|---|---|
| `/api/facebook/ads/filters` | GET | Chargement du sélecteur de campagne de l’analyse IA. | oui | — |
| `/api/ai/analyze?[période][&campaign_id][&status_filter]` | GET | Lancement de l’analyse de performance IA. | oui | URL construite selon les filtres. |
| `/api/facebook/ads/details` | GET | Chargement d’une liste détaillée de publicités pour la modale associée. | oui | Premier choix avant fallback. |
| `/api/facebook/ads` | GET | Fallback si la liste détaillée ne fournit rien. | oui | Fallback conditionnel. |
| `/api/ai/[action]` | POST | Application groupée des recommandations exécutables. | oui | chemin neutralisé, écriture refusée |
| `/api/ai/[action]` | POST | Exécution d’une recommandation individuelle. | oui | chemin neutralisé, écriture refusée |
| `/api/facebook/campaigns/:id` | GET | Ouverture de la modale campagne : lecture de l’état courant. | oui | Identifiant non recopié. |
| `/api/facebook/campaigns/:id/budget` | POST | Validation d’une modification depuis la modale campagne. | oui | — |
| `/api/facebook/ads/:id/status` | POST | Action de correction d’audit portant sur le statut d’une publicité. | oui | — |
| `/api/facebook/adsets/:id/[restricted]` | POST | Action d’audit visant un paramètre de ciblage restreint. | oui | chemin neutralisé, écriture refusée |
| `/api/facebook/adsets/:id/budget` | POST | Action de correction d’audit portant sur le budget d’un adset. | oui | — |
| `/api/ai/audit-config` | GET | Bouton Audit configuration. | oui | — |
| `/api/ai/audit-and-fix` | POST | Bouton Audit avec corrections automatiques. | oui | — |
| `/api/cache/clear` | POST | Bouton de vidage cache avant rafraîchissement. | non | Route absente des 155 routes backend inventoriées. |
| `/api/ai/audit-chat` | POST | Envoi d’une question dans le chat associé à l’audit. | oui | Même route réutilisée par le chat Copilote. |
| `/api/ai/copilot-orchestrate` | POST | Lancement du Copilote unifié performance + audit. | oui | — |
| `/api/ai/copilot-latest` | GET | Restauration du dernier rapport Copilote sauvegardé. | oui | — |
| `/api/ai/verify-reco-done` | POST | Vérification qu’une recommandation est constatée comme appliquée. | oui | — |
| `/api/ai/[action]` | POST | Exécution d’une action individuelle depuis le rapport Copilote. | oui | chemin neutralisé, écriture refusée |
| `/api/ai/[action]` | POST | Application groupée des actions Copilote exécutables. | oui | chemin neutralisé, écriture refusée |
| `/api/ai/audit-chat` | POST | Envoi d’une question dans le chat Copilote. | oui | Appel répété dans le même fichier. |
## js/publish.js

| Chemin appelé | Méthode | Ce qui le déclenche | Route présente dans l’inventaire backend ? | Remarque |
|---|---|---|---|---|
| `/api/history?limit=50` | GET | Chargement de l’historique des publications. | oui | — |
| `/api/history` | POST | Enregistrement d’une publication dans l’historique local. | oui | — |
| `/api/history/:id` | DELETE | Suppression d’une entrée d’historique. | oui | — |
| `/api/history` | DELETE | Vidage complet de l’historique après confirmation. | oui | — |
| `/api/facebook/lead-forms` | GET | Chargement des formulaires Lead pour le formulaire de publication. | oui | — |
| `/api/ai/publish/campaigns` | GET | Chargement des campagnes existantes dans le formulaire de publication. | oui | Même route utilisée dans ai-creation.js. |
| `/api/ai/publish-video` | POST | Publication d’une publicité vidéo. | oui | — |
| `/api/ai/publish` | POST | Publication d’une publicité image avec média temporaire. | oui | Même route appelée dans une autre branche du même flux. |
| `/api/ai/publish` | POST | Publication d’une publicité image depuis les données du formulaire. | oui | Appel répété dans le même fichier. |
| `/api/image/upload-temp` | POST | Sélection d’une image : stockage temporaire avant publication. | oui | — |
