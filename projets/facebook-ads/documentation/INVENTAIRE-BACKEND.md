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
