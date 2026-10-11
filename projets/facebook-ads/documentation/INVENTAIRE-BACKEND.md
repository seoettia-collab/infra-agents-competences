# INVENTAIRE BACKEND — facebook-ads

Carte des routes du backend. Établi par lecture du code, pas de la doc.
Commit de base : 873e367 — branche main.

## routes/ai.js

| Méthode + chemin | Ce qu'elle fait (une ligne) | Entrées principales | Service appelé | Doublon apparent avec |
|---|---|---|---|---|
| GET `/api/ai/analyze` | Analyse les performances Meta, les enrichit avec le contexte local puis génère des recommandations IA. | Query : `date_preset`, `campaign_id`, `status_filter` | `facebook-api`, `database`, `claude-api.analyzeWithClaude` | — |
| POST `/api/ai/generate-content` | Génère les textes d'une publicité à partir du thème et du contexte marketing fourni. | Body : `theme`, `tone`, `style`, `targetAudience`, `projectType`, `offer`, `season`, `freeText`, `isGlobal` | `claude-api.generateAdContent` | — |
| GET `/api/ai/history` | Route active mais placeholder : renvoie que l'historique n'est pas encore disponible. | Aucune | Aucun | — |
| POST `/api/ai/generate-image` | Génère une image publicitaire à partir d'un thème ou d'un prompt personnalisé. | Body : `theme`, `projectType`, `tone`, `headline`, `imageStyle`, `imageRatio`, `roomType`, `customPrompt`, `quality`, `visualOptions` | `image-api.generateImage` | — |
| POST `/api/ai/generate-image-prompt` | Produit en anglais un prompt image optimisé à partir du contexte de la publicité. | Body : `theme`, `projectType`, `tone`, `headline`, `primary_text`, `description`, `imageStyle`, `isGlobal` | SDK Anthropic | — |
| POST `/api/ai/generate-accroches` | Génère des variantes d'accroches/titres à partir du thème ou des textes existants. | Body : `theme`, `projectType`, `tone`, `primary_text`, `existing_headline`, `isGlobal` | SDK Anthropic | — |
| POST `/api/ai/execute-action` | Exécute une action recommandée : pause/activation, CTA, rayon, budget/âge ou redirection de création. | Body : `action_type`, `action_data` | Graph API via `axios` | — |
| POST `/api/ai/ab-test-analyze` | Compare deux ou trois publicités et renvoie une analyse A/B par IA. | Body : `ads` | `claude-api.analyzeABTest` | — |
| GET `/api/ai/audit-config` | Audite la configuration campagnes/adsets/ads avec le contexte business et CRM puis produit un rapport IA. | Query : `date_preset`, `campaign_id` | Graph API via `axios`, `database`, SDK Anthropic | — |
| POST `/api/ai/audit-and-fix` | Audite les textes des pubs actives, propose des corrections IA puis applique celles marquées à modifier. | Aucune entrée métier | Graph API via `axios`, SDK Anthropic, `facebook-api.updateAdCreativeText` | — |
| GET `/api/ai/status` | Indique si les clés Claude et Runway sont configurées et expose le modèle image sélectionné. | Aucune | Aucun ; lecture des variables d'environnement | — |
| GET `/api/ai/publish/campaigns` | Liste les campagnes existantes pour alimenter le sélecteur de publication. | Aucune | `facebook-publish.getExistingCampaigns` | `GET /api/ai/publish/list-campaigns` |
| GET `/api/ai/publish/check` | Vérifie les permissions nécessaires à la publication Facebook. | Aucune | `facebook-publish.checkPublishPermissions` | — |
| GET `/api/ai/publish/test-post` | Route de debug qui crée directement une campagne test en pause sur Facebook. | Aucune | Graph API via `axios.post` | — |
| DELETE `/api/ai/publish/campaign/:id` | Supprime la campagne Facebook désignée par son identifiant de chemin. | Param : `id` | `facebook-publish.deleteCampaign` | `GET /api/ai/publish/delete-campaign` |
| GET `/api/ai/publish/delete-campaign` | Supprime une campagne Facebook désignée par un paramètre de requête, notamment depuis un navigateur. | Query : `id` | `facebook-publish.deleteCampaign` | `DELETE /api/ai/publish/campaign/:id` |
| GET `/api/ai/publish/list-campaigns` | Liste directement jusqu'à 50 campagnes du compte avec leurs principaux champs. | Aucune | Graph API via `axios.get` | `GET /api/ai/publish/campaigns` |
| GET `/api/ai/publish/delete-all-test` | Liste les campagnes puis marque comme supprimées toutes celles sauf la campagne réelle codée en dur. | Aucune | Graph API via `axios.get/post` | — |
| GET `/api/ai/publish/test-image` | Route de debug qui téléverse une image distante dans la bibliothèque d'images publicitaires Meta. | Aucune | Graph API via `axios.post` | — |
| GET `/api/ai/publish/test-page` | Vérifie que le System User peut accéder à la Page Facebook. | Aucune | Graph API via `axios.get` | — |
| GET `/api/ai/publish/test-creative` | Route de debug qui crée un creative publicitaire minimal de test. | Aucune | Graph API via `axios.post` | — |
| GET `/api/ai/publish/test-adset` | Route de debug qui crée une campagne test en pause puis un adset test avec budget. | Aucune | Graph API via `axios.post` | — |
| GET `/api/ai/publish/leadgen-forms` | Récupère le jeton de Page puis liste les formulaires Lead existants de la Page. | Aucune | Graph API via `axios.get` | — |
| GET `/api/ai/publish/create-leadgen-form` | Récupère le jeton de Page puis crée un formulaire Lead minimal nom/email/téléphone. | Aucune | Graph API via `axios.get/post` | — |
| GET `/api/ai/publish/test-lead-ad` | Route de debug qui crée un creative Lead puis une publicité en pause dans un adset existant. | Aucune | Graph API via `axios.post` | — |
| GET `/api/ai/publish/search-regions` | Recherche les identifiants de régions utilisables pour le ciblage publicitaire en France. | Query : `q` | Graph API via `axios.get` | — |
| GET `/api/ai/publish/campaign-adsets` | Liste les adsets d'une campagne et leurs paramètres de diffusion/ciblage. | Query : `campaignId` | Graph API via `axios.get` | — |
| POST `/api/ai/publish` | Publie une publicité image complète depuis une URL, un média temporaire ou du base64. | Body : image, textes, CTA, lien, campagne/adset, budget, ciblage, Page, mode Lead, formulaire, statut | `image-upload`, `facebook-publish.publishFullAd` | — |
| POST `/api/ai/publish-video` | Publie une vidéo Lead Ad en téléversant la vidéo, créant le creative puis la publicité. | Body : `videoTempId`/`videoBase64`, `headline`, `primaryText`, `description`, `linkUrl`, `pageId`, `adSetId`, `leadFormId`, `status` | `video`, `facebook-publish.uploadVideo/createVideoLeadAdCreative/createAd` | — |
| POST `/api/ai/suggest-reply` | Suggère une réponse Messenger à partir d'un extrait de conversation et d'un ton. | Body : `conversation_snippet`, `participant_name`, `tone` | SDK Anthropic | `POST /api/ai/messenger-reply-custom` |
| POST `/api/ai/messenger-reply-custom` | Génère une réponse Messenger à partir de l'historique et d'instructions personnalisées. | Body : `conversation_id`, `participant_name`, `messages`, `custom_instructions` | SDK Anthropic | `POST /api/ai/suggest-reply` |
| POST `/api/ai/lead-reply-custom` | Génère une réponse/relance lead à partir du contexte du lead et d'instructions personnalisées. | Body : `lead_name`, `lead_context`, `custom_instructions`, projet/ville/budget/dernier message/canal | SDK Anthropic | `POST /api/ai/suggest-lead-followup` |
| POST `/api/ai/suggest-lead-followup` | Suggère une relance lead standard à partir du projet, du budget, du délai et de l'ancienneté du lead. | Body : `lead_name`, `lead_email`, `lead_phone`, `project_type`, `budget`, `delay`, `age_hours`, `tone` | SDK Anthropic | `POST /api/ai/lead-reply-custom` |
| POST `/api/ai/commercial-reply` | Génère une réponse commerciale courte ou complète orientée prise de rendez-vous. | Body : `type`, `participant_name`, `conversation_snippet`, `lead_context` | `database`, SDK Anthropic | — |
| POST `/api/ai/verify-text` | Vérifie et corrige l'orthographe et la grammaire d'un texte destiné au SMS. | Body : `text` | SDK Anthropic | — |
| POST `/api/ai/write-from-idea` | Transforme une idée ou note brute en message rédigé avec le contexte lead éventuel. | Body : `idea`, `lead_context`, `gender` | SDK Anthropic | — |
| POST `/api/ai/sms-generate` | Génère un SMS personnalisé de contact ou qualification à partir du contexte lead. | Body : `lead_context`, `sms_type`, `gender`, `tone` | SDK Anthropic | — |
| GET `/api/ai/publish/video-permissions` | Diagnostique les permissions et accès nécessaires à l'upload vidéo Facebook. | Aucune | Graph API via `axios.get` | — |
| POST `/api/ai/audit-chat` | Répond à une question sur un audit en tenant compte du contexte et de l'historique fourni. | Body : `question`, `audit_context`, `history` | SDK Anthropic | — |
| POST `/api/ai/verify-reco-done` | Vérifie côté Meta si une recommandation a réellement été appliquée ou si son résultat est visible. | Body : `action_type`, `action_data`, `titre`, `source` | Graph API via `axios.get` | — |
| POST `/api/ai/copilot-orchestrate` | Lance analyse performance et audit config, fusionne les deux rapports avec l'IA puis sauvegarde le rapport Copilote. | Body : `date_preset`, `campaign_id`, `status_filter` | Routes internes `/ai/analyze` + `/ai/audit-config` via `axios`, `database`, SDK Anthropic | — |
| GET `/api/ai/copilot-latest` | Restaure le dernier rapport Copilote sauvegardé dans la base locale. | Aucune | `database` | — |

## Suite de l'inventaire

Deux autres fichiers de routes seront ajoutés ici lors des missions séparées.

## routes/campaigns.js

| Méthode + chemin | Ce qu'elle fait (une ligne) | Entrées principales | Service appelé | Doublon apparent avec |
|---|---|---|---|---|
| GET `/api/facebook/recommendations` | Lit les recommandations natives Meta et leur score d'opportunité sans mise en cache. | Aucune | `facebook-api.getRecommendations` / `meta-recommendations` | — |
| GET `/api/facebook/account` | Renvoie les informations du compte publicitaire configuré. | Aucune | `facebook-api.getAccount` | — |
| GET `/api/facebook/campaigns` | Liste les campagnes du compte avec filtre de statut et limite. | Query : `status`, `limit` | `facebook-api.getCampaigns` | `GET /api/ai/publish/campaigns`; `GET /api/ai/publish/list-campaigns` |
| GET `/api/facebook/campaigns/:id` | Renvoie les détails d'une campagne précise. | Param : `id` | `facebook-api.request` | — |
| POST `/api/facebook/campaigns/:id/budget` | Modifie le budget quotidien d'une campagne. | Param : `id`; Body : `dailyBudget` | Graph API via `axios.post` | — |
| GET `/api/facebook/campaigns/:id/strategy` | Détermine si le budget est porté par la campagne, les adsets, les deux ou aucun. | Param : `id` | Graph API via `axios.get` | — |
| GET `/api/facebook/adsets` | Liste les adsets, éventuellement limités à une campagne. | Query : `campaign_id`, `limit` | `facebook-api.getAdSets` | `GET /api/ai/publish/campaign-adsets` |
| GET `/api/facebook/ads/filters` | Renvoie campagnes et adsets utilisés par les listes de filtrage. | Aucune | `facebook-api.getCampaignsAndAdsets` | — |
| GET `/api/facebook/ads/logs` | Renvoie les 50 dernières actions locales enregistrées sur les publicités. | Aucune | Journal mémoire `adsActionLog` | — |
| GET `/api/facebook/ads/details` | Liste les publicités enrichies avec créatif, métriques et ligne Messenger locale éventuelle. | Query : `campaign_id`, `adset_id`, `date_preset` | `facebook-api.getAdsWithDetails`, `database` | — |

| GET `/api/facebook/ads/:adId/hd-image` | Résout l'image haute définition associée au créatif d'une publicité. | Param : `adId` | `facebook-api.getAdHighResImage` | — |
| GET `/api/facebook/ads` | Liste les publicités, éventuellement limitées à un adset. | Query : `adset_id`, `limit` | `facebook-api.getAds` | — |
| POST `/api/facebook/campaigns/:id/status` | Active ou met en pause une campagne entière. | Param : `id`; Body : `status` | `facebook-api.updateCampaignStatus` | — |
| POST `/api/facebook/adsets/:id/status` | Active ou met en pause un adset. | Param : `id`; Body : `status` | `facebook-api.updateAdSetStatus` | — |
| POST `/api/facebook/ads/:id/update-text` | Modifie tout ou partie des textes d'une publicité. | Param : `id`; Body : `titre`, `texte_principal`, `description` | `facebook-api.updateAdCreativeText` | — |
| POST `/api/facebook/ads/:id/update-creative` | Remplace les textes et/ou le média d'une publicité en reconstruisant son creative. | Param : `id`; Body : `titre`, `texte_principal`, `description`, `media_id`, `media_type`, `new_image_url` | Graph API via `axios.get/post` | — |
| GET `/api/facebook/ads/:id/details` | Renvoie les textes, média, CTA et statuts d'une publicité pour l'édition. | Param : `id` | Graph API via `axios.get` | — |
| POST `/api/facebook/ads/:id/status` | Active ou met en pause une publicité. | Param : `id`; Body : `status` | `facebook-api.updateAdStatus` | `POST /api/ai/execute-action` (`pause_ad` / `activate_ad`) |
| GET `/api/facebook/ads/:id/preview` | Récupère l'aperçu Facebook d'une publicité pour affichage. | Param : `id` | Graph API via `axios.get` | — |
| GET `/api/facebook/ads/:id/budget` | Renvoie le budget de l'adset auquel appartient la publicité. | Param : `id` | Graph API via `axios.get` | — |
| POST `/api/facebook/ads/:id/budget` | Modifie le budget de l'adset lié à une publicité, après contrôle du mode budgétaire de la campagne. | Param : `id`; Body : `dailyBudget` | Graph API via `axios.get/post` | `POST /api/facebook/adsets/:id/budget`; `POST /api/ai/execute-action` (`adjust_budget`) |

| POST `/api/facebook/ads/:id/duplicate` | Duplique une publicité dans le même adset ou un autre puis applique le nom et le statut demandés. | Param : `id`; Body : `adsetId`, `name`, `status` | Graph API via `axios.get/post` | — |
| GET `/api/facebook/ads/:id/source` | Renvoie les rattachements d'une publicité pour préremplir le flux de duplication. | Param : `id` | Graph API via `axios.get` | — |
| POST `/api/facebook/adsets/:id/age` | Endpoint de ciblage restreint présent dans le code ; décrit ici sans recommandation d'utilisation. | Param : `id`; Body : paramètres de ciblage restreints | Graph API via `axios.get/post` | — |
| POST `/api/facebook/adsets/:id/budget` | Modifie directement le budget quotidien d'un adset. | Param : `id`; Body : `dailyBudget` | Graph API via `axios.post` | `POST /api/facebook/ads/:id/budget`; `POST /api/ai/execute-action` (`adjust_budget`) |
| DELETE `/api/facebook/ads/:id` | Archive une publicité. | Param : `id` | `facebook-api.archiveAd` | — |
| POST `/api/facebook/ads/:id/update-form` | Remplace le formulaire Lead associé à une publicité. | Param : `id`; Body : `form_id` | `facebook-api.updateAdForm` | — |
| GET `/api/facebook/adsets/:id/targeting` | Renvoie la configuration de ciblage actuelle d'un adset. | Param : `id` | Graph API via `axios.get` | — |
| POST `/api/facebook/adsets/:id/geo-locations` | Met à jour uniquement la partie géographique du ciblage d'un adset en conservant le reste. | Param : `id`; Body : `regions`, `cities`, `geo_markets`, `location_types`, `excluded_regions` | Graph API via `axios.get/post` | — |
| GET `/api/facebook/geo/search` | Recherche les lieux de ciblage correspondant à une requête en France. | Query : `q`, `type`, `location_types` | Graph API via `axios.get` | `GET /api/ai/publish/search-regions` |
| GET `/api/facebook/geo/idf-regions` | Renvoie une liste statique de lieux franciliens et de leurs identifiants Meta. | Aucune | Données statiques locales | — |

## routes/insights.js

| Méthode + chemin | Ce qu'elle fait (une ligne) | Entrées principales | Service appelé | Doublon apparent avec |
|---|---|---|---|---|
| GET `/api/facebook/insights` | Renvoie les métriques globales du compte et complète le nombre de leads avec la base locale lorsque nécessaire. | Query : `date_preset`, `since`, `until` | `facebook-api.getInsights`, `database` | — |
| GET `/api/facebook/insights/campaigns` | Renvoie les métriques ventilées par campagne avec calcul du nombre de leads et du CPL. | Query : `date_preset`, `since`, `until` | `facebook-api.getInsightsByCampaign` | — |
| GET `/api/facebook/insights/ads` | Renvoie les métriques ventilées par publicité avec calcul du nombre de leads et du CPL. | Query : `date_preset`, `since`, `until` | `facebook-api.getInsightsByAd` | — |
| GET `/api/facebook/insights/adsets` | Renvoie les métriques ventilées par ensemble de publicités. | Query : `date_preset`, `since`, `until` | `facebook-api.getInsightsByAdSet` | — |
| GET `/api/facebook/insights/daily` | Renvoie l'évolution quotidienne des principales métriques publicitaires. | Query : `date_preset`, `since`, `until` | `facebook-api.getInsightsDaily` | — |
| GET `/api/facebook/insights/intraday` | Renvoie les snapshots locaux de la journée avec une granularité de cinq minutes. | Aucune | `database.getTodaySnapshots` | — |

## routes/geographic.js

| Méthode + chemin | Ce qu'elle fait (une ligne) | Entrées principales | Service appelé | Doublon apparent avec |
|---|---|---|---|---|
| GET `/api/facebook/geographic` | Renvoie les performances agrégées par région avec leurs indicateurs calculés. | Query : `date_preset`, `since`, `until` | `facebook-api.getInsightsGeographic` | — |
| GET `/api/facebook/geographic/cities` | Renvoie les performances agrégées au niveau ville lorsque Meta fournit cette ventilation. | Query : `date_preset`, `since`, `until` | `facebook-api.getInsightsGeographic` | — |
| GET `/api/facebook/geographic/demographics` | Route de ventilation démographique présente dans le code ; inventoriée ici sans détailler les dimensions sensibles. | Query : `date_preset`, `since`, `until` | `facebook-api.getInsightsDemographics` | — |

## routes/ads-decline.js

| Méthode + chemin | Ce qu'elle fait (une ligne) | Entrées principales | Service appelé | Doublon apparent avec |
|---|---|---|---|---|
| POST `/api/facebook/ads/:id/decline-preview` | Génère plusieurs variantes de texte et d'image à partir d'un créatif source sans les publier. | Param : `id`; Body : `nb_variants` | Graph API via `axios`, SDK Anthropic, `image-api.generateImage` | — |
| POST `/api/facebook/ads/:id/decline-with-ai` | Crée de nouveaux creatives et publicités à partir des variantes fournies dans l'ensemble source. | Param : `id`; Body : `variants` | Graph API via `axios.get/post` | — |

## routes/comms.js

| Méthode + chemin | Ce qu'elle fait (une ligne) | Entrées principales | Service appelé | Doublon apparent avec |
|---|---|---|---|---|
| POST `/api/comms/call/click-to-call` | Lance un appel sortant en mode bridge entre l'agent et le lead puis journalise l'appel. | Body : `lead_id`, `agent_phone_e164` | `twilio-service.clickToCall`, `database` | — |
| POST `/api/comms/sms` | Envoie un SMS via la passerelle Android, applique la signature et journalise l'envoi. | Body : `lead_id`, `to`, `body`, `skipSignature` | `sms-gateway-service.sendSms`, `database` | — |
| POST `/api/comms/mms` | Envoie un message multimédia via la passerelle Android lorsque cette fonction est activée. | Body : `lead_id`, `to`, `body`, `image_url` | `sms-gateway-service.sendMms`, `database` | — |
| GET `/api/comms/templates` | Renvoie les modèles de SMS disponibles. | Aucune | `twilio-service.getTemplates` | — |
| POST `/api/comms/call/hangup` | Termine un appel en cours à partir de son identifiant fournisseur. | Body : `call_sid` | `twilio-service.hangupCall` | — |
| GET `/api/comms/history/:lead_id` | Renvoie l'historique des communications sortantes enregistrées pour un lead. | Param : `lead_id`; Query : `limit` | `database.getOutboundHistory` | `GET /api/comms/full-history/:lead_id` |
| GET `/api/comms/full-history/:lead_id` | Renvoie l'historique bidirectionnel complet des communications enregistrées pour un lead. | Param : `lead_id`; Query : `limit` | `database.getFullCommsHistory` | `GET /api/comms/history/:lead_id` |
| GET `/api/comms/sms/status` | Vérifie l'état de la passerelle SMS Android et l'activation éventuelle du MMS. | Aucune | `sms-gateway-service.checkStatus` | — |
| POST `/api/comms/email` | Envoie un email via SMTP après nettoyage de la signature puis journalise l'envoi si un lead est fourni. | Body : `lead_id`, `to`, `subject`, `body` | `email-service.sendEmail`, `database` | — |
| GET `/api/comms/email/status` | Vérifie la configuration du service SMTP. | Aucune | `email-service.checkConfig` | — |
| GET `/api/comms/auto-sms/status` | Renvoie l'état persistant de l'envoi automatique de SMS. | Aucune | `database` | — |
| POST `/api/comms/auto-sms/toggle` | Active ou désactive l'envoi automatique de SMS et persiste le réglage. | Body : `enabled` | `database` | — |
| GET `/api/comms/flux-echanges` | Renvoie une timeline multi-canal paginée et filtrable des communications. | Query : `limit`, `offset`, `type`, `lead_id` | `database.getFluxEchanges` | — |
| GET `/api/comms/notes/:lead_id` | Renvoie les notes CRM associées à un lead. | Param : `lead_id` | `database.getLeadNotes` | — |
| POST `/api/comms/notes` | Ajoute une note CRM à un lead. | Body : `lead_id`, `note` | `database.addLeadNote` | — |
| PATCH `/api/comms/notes/:id` | Modifie le contenu d'une note CRM existante. | Param : `id`; Body : `note` | `database.updateLeadNote` | — |
| DELETE `/api/comms/notes/:id` | Supprime une note CRM. | Param : `id` | `database.deleteLeadNote` | — |
| DELETE `/api/comms/outbound/:id` | Supprime une communication sortante enregistrée dans le flux local. | Param : `id` | `database` | — |
| DELETE `/api/comms/inbound/:id` | Supprime un SMS entrant enregistré dans le flux local. | Param : `id` | `database` | — |
| POST `/api/comms/relink-orphan-sms` | Réassocie les SMS entrants non reliés aux leads correspondant aux règles locales de rapprochement. | Aucune | `database.relinkOrphanInboundSms` | — |

## routes/messenger.js

| Méthode + chemin | Ce qu'elle fait (une ligne) | Entrées principales | Service appelé | Doublon apparent avec |
|---|---|---|---|---|
| POST `/api/messenger/upload-attachment` | Reçoit une image locale et renvoie son URL publique pour usage Messenger. | Fichier multipart : `photo` | `multer`, stockage local | — |
| POST `/api/messenger/send-photo` | Transmet une image à une conversation Messenger et conserve une trace locale. | Body : `conversation_id`, `image_url`, `lead_id` | `messenger-api.sendPhoto`, `database` | — |
| GET `/api/facebook/conversations` | Renvoie les conversations depuis Graph et les enrichit avec les métadonnées CRM locales. | Query : `limit`, `filter` | `messenger-api.getConversations`, `database`, `graph-metrics` | — |
| GET `/api/facebook/conversations/stats` | Renvoie les indicateurs CRM agrégés des conversations et les délais de réponse. | Aucune | `database.getConversationStats`, `database.getResponseTimeStats` | — |

| GET `/api/facebook/conversations/:id/messages` | Renvoie les messages d'une conversation depuis Graph avec fallback sur le cache SQLite. | Param : `id`; Query : `limit` | `messenger-api.getMessages`, `database`, `graph-metrics` | — |
| PATCH `/api/facebook/conversations/:id/status` | Modifie le statut CRM local d'une conversation. | Param : `id`; Body : `status` | `database.updateConversationStatus` | — |
| PATCH `/api/facebook/conversations/:id/archive` | Archive ou désarchive une conversation dans le CRM local. | Param : `id`; Body : `archived` | `database.archiveConversation` | — |

| DELETE `/api/facebook/conversations/:id` | Supprime une conversation du CRM local sans suppression côté Facebook. | Param : `id` | `database.deleteConversation` | — |
| POST `/api/facebook/conversations/refresh-names` | Rafraîchit localement les noms de participants à partir des données Graph disponibles. | Aucune | `messenger-api.request`, `database` | — |
| POST `/api/facebook/conversations/force-sync` | Force la synchronisation des conversations Facebook vers le cache local. | Aucune | `messenger-api.getConversations`, `database` | — |
| GET `/api/facebook/leads/:leadId/conversation` | Résout la conversation Messenger associée à un lead à partir des données locales disponibles. | Param : `leadId` | `database.getLeadById`, `database` | — |
| POST `/api/facebook/conversations/:id/reply` | Endpoint de réponse Messenger présent dans le code ; reçoit un texte et conserve le résultat dans le cache local. | Param : `id`; Body : `message` | `messenger-api.sendReply`, `database` | — |

## routes/leads.js

| Méthode + chemin | Ce qu'elle fait (une ligne) | Entrées principales | Service appelé | Doublon apparent avec |
|---|---|---|---|---|
| GET `/api/facebook/lead-forms` | Liste les formulaires Lead Ads actifs récupérés depuis Graph. | Aucune | `messenger-api.request`, `graph-metrics` | — |
| GET `/api/facebook/leads` | Renvoie les leads actifs ou archivés depuis SQLite, avec synchronisation Facebook de secours si la base est vide. | Query : `limit`, `form_id`, `sort`, `filter` | `database`, `syncService`, `messenger-api.request`, `graph-metrics` | — |
| PATCH `/api/facebook/leads/:id/archive` | Archive ou désarchive un lead dans le CRM local sans le supprimer. | Param : `id`; Body : `archived` | `database.archiveLead` | — |
| DELETE `/api/facebook/leads/:id` | Effectue une suppression locale réversible du lead dans SQLite ; les communications associées restent conservées. | Param : `id` | `database.deleteLead` | — |
| GET `/api/facebook/leads-deleted` | Liste les leads localement supprimés afin de permettre leur récupération, avec filtre de date optionnel. | Query : `limit`, `since` | `database.getDeletedLeads` | — |
| POST `/api/facebook/leads/:id/restore` | Restaure un lead supprimé localement et rend de nouveau visible son historique conservé. | Param : `id` | `database.restoreLead` | — |
| PATCH `/api/facebook/leads/:id/status` | Met à jour le statut CRM d'un lead. | Param : `id`; Body : `status` | `database.updateLeadCrmStatus` | — |
| PATCH `/api/facebook/leads/:id/category` | Affecte ou retire une catégorie métier autorisée sur un lead. | Param : `id`; Body : `category` | `database.updateLeadCategory` | — |
| PATCH `/api/facebook/leads/:id/note` | Met à jour la note inline associée à un lead. | Param : `id`; Body : `note` | `database.updateLeadInlineNote` | — |
| POST `/api/facebook/leads/:id/rename` | Renomme localement un lead et synchronise le nom de conversation locale lorsqu'il provient de Messenger. | Param : `id`; Body : `full_name` | `database` | — |

## routes/history.js

| Méthode + chemin | Ce qu'elle fait (une ligne) | Entrées principales | Service appelé | Doublon apparent avec |
|---|---|---|---|---|
| GET `/api/history` | Renvoie l'historique persistant des publications enregistrées localement. | Query : `limit` | `database.getAllPublications` | — |
| POST `/api/history` | Enregistre localement une entrée d'historique de publication avec ses principaux identifiants et métadonnées. | Body : `headline`, `primaryText`, `status`, `type`, `campaignId`, `adsetId`, `adId`, `creativeId`, `regions`, `budget` | `database.insertPublication` | — |
| DELETE `/api/history/:id` | Supprime une entrée précise de l'historique local des publications. | Param : `id` | `database.deletePublication` | — |
| DELETE `/api/history` | Supprime toutes les entrées de l'historique local des publications après confirmation explicite. | Body : `confirm=true` | `database.clearAllPublications` | — |
| GET `/api/history/analyses` | Renvoie la liste persistante des analyses IA enregistrées localement. | Query : `limit` | `database.getAllAnalyses` | `GET /api/ai/history` |
| GET `/api/history/analyses/:id` | Renvoie une analyse IA précise avec son payload décodé. | Param : `id` | `database.getAnalysisById` | — |
| POST `/api/history/analyses` | Enregistre localement une analyse IA et ses métadonnées. | Body : `type`, `score`, `resume`, `campaignId`, `campaignName`, `tokensUsed`, `payload` | `database.insertAnalysis` | — |
| DELETE `/api/history/analyses/:id` | Supprime une analyse IA précise de l'historique local. | Param : `id` | `database.deleteAnalysis` | — |
| DELETE `/api/history/analyses` | Supprime toutes les analyses IA enregistrées localement après confirmation explicite. | Body : `confirm=true` | `database.clearAllAnalyses` | — |

## routes/video.js

| Méthode + chemin | Ce qu'elle fait (une ligne) | Entrées principales | Service appelé | Doublon apparent avec |
|---|---|---|---|---|
| POST `/api/video/upload-temp` | Stocke temporairement une vidéo validée côté backend avec TTL et métadonnées SQLite. | Body : `videoBase64`, `filename`, `mimeType` | Stockage fichier local, `database` | — |
| GET `/api/video/status/:videoTempId` | Vérifie l'existence, l'expiration, la consommation et l'état fichier d'une vidéo temporaire. | Param : `videoTempId` | Stockage fichier local, `database` | — |
| DELETE `/api/video/:videoTempId` | Supprime manuellement une vidéo temporaire et sa ligne de métadonnées locale. | Param : `videoTempId` | Stockage fichier local, `database` | — |
| GET `/api/video/storage-info` | Renvoie l'usage du stockage temporaire vidéo et ses limites configurées. | Aucune | Stockage fichier local, `database` | — |
| POST `/api/video/upload` | Téléverse directement une vidéo vers Facebook et renvoie son identifiant média. | Body : `data`, `filename`, `mime_type` | Graph API via `axios.post` | — |
| POST `/api/image/upload` | Téléverse directement une image vers Facebook et renvoie son hash média ; commentaire de route source situé dans video.js. | Body : `data`, `filename`, `mime_type` | Graph API via `axios.post` | — |

## routes/context.js

| Méthode + chemin | Ce qu'elle fait (une ligne) | Entrées principales | Service appelé | Doublon apparent avec |
|---|---|---|---|---|
| GET `/api/context/campaign/:id` | Renvoie le contexte business enregistré pour une campagne, notamment son mode de réduction et son motif. | Param : `id` | `database.getCampaignContext` | — |
| POST `/api/context/campaign/:id/reduction-mode` | Active ou désactive le mode réduction d'une campagne et enregistre le motif localement. | Param : `id`; Body : `enabled`, `reason` | `database.setCampaignReductionMode` | — |
| GET `/api/context/ad/:id` | Renvoie le contexte local d'une publicité et son éventuel indicateur de performance. | Param : `id` | `database.getAdContext` | — |
| POST `/api/context/ad/:id/performance-flag` | Active ou retire l'indicateur local de performance d'une publicité. | Param : `id`; Body : `enabled`, `last_status` | `database.setAdPerformanceFlag` | — |
| GET `/api/context/all` | Renvoie en bloc les campagnes en mode réduction et les publicités marquées pour initialiser l'interface. | Aucune | `database` | — |

## routes/webhook.js

| Méthode + chemin | Ce qu'elle fait (une ligne) | Entrées principales | Service appelé | Doublon apparent avec |
|---|---|---|---|---|
| GET `/webhook` | Répond au challenge de vérification Meta lorsque le jeton de vérification correspond. | Query Meta de vérification | Variables d'environnement locales | — |
| POST `/webhook` | Reçoit les événements Messenger, valide la signature, persiste conversations/messages, enrichit le CRM local et peut déclencher l'auto-réponse. | Payload webhook Messenger | `database`, `messenger-api`, `autoReplyService` | — |
| POST `/webhook/twilio/call-status` | Reçoit les changements d'état d'appel Twilio et met à jour l'historique local correspondant. | Body : `CallSid`, `CallStatus` | `database.updateOutboundCallStatus` | — |
| POST `/webhook/admin/backfill-messenger-leads` | Parcourt les conversations Messenger locales pour créer les fiches lead manquantes et rafraîchir les noms génériques disponibles. | Aucune | `database`, `messenger-api.getConversations` | — |

## routes/image-upload.js

| Méthode + chemin | Ce qu'elle fait (une ligne) | Entrées principales | Service appelé | Doublon apparent avec |
|---|---|---|---|---|
| POST `/api/image/upload-temp` | Valide puis stocke temporairement une image avec TTL, dimensions et métadonnées locales. | Body : `imageBase64`, `filename`, `mimeType` | Stockage fichier local, `database`, `image-size` | — |
| GET `/api/image/status/:imageTempId` | Vérifie l'existence, l'expiration, la consommation et l'état fichier d'une image temporaire. | Param : `imageTempId` | Stockage fichier local, `database` | — |
| DELETE `/api/image/:imageTempId` | Supprime manuellement une image temporaire et sa ligne de métadonnées locale. | Param : `imageTempId` | Stockage fichier local, `database` | — |

## routes/pilote-drive.routes.js

| Méthode + chemin | Ce qu'elle fait (une ligne) | Entrées principales | Service appelé | Doublon apparent avec |
|---|---|---|---|---|
| GET `/api/pilote/status` | Vérifie les prérequis du proxy Drive vers GitHub sans exposer les valeurs de secrets. | En-tête d'authentification du Pilote | `pilote-drive-proxy.checkCredentialsFile` | — |
| POST `/api/pilote/push-meta-response` | Lit un document Drive autorisé et écrit son contenu vers une cible GitHub autorisée, avec mode simulation et protection d'écrasement. | Body : `document_id`, `target`, `dry_run`, `confirm_overwrite`, `author` | `pilote-drive-proxy.pushMetaResponse` | — |

