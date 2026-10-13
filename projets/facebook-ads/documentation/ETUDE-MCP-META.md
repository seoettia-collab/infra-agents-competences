# ETUDE-MCP-META — DIAG-004
DIAG-004 | 2026-10-13 | v1.0
EN-RÉPONSE-À : DIAG-004
HEAD de lecture du hub : `333d576bd49dd45b40fdf2ce6aa7ba3a84752cf1`

[SÛR] Recherche sur documentation officielle Meta consultée le 13/10/2026 ; aucune installation, connexion, demande d’autorisation ni création de credential.
[SÛR] La mission autorise explicitement ce fichier ETUDE-MCP-META.md, au-delà du nommage habituel DIAGNOSTIC-*.md.
[SÛR] Les accès web ont d’abord échoué dans l’outil de navigation ; les mêmes pages officielles ont ensuite été lues directement, sans connexion.
[SÛR] Le contenu de l’aide Business était dans des blocs HTML encodés ; il a été décodé pour lire l’article, sans exécuter ses scripts.

## Partie 1 — Serveur MCP publicités

### Verdict

**[SÛR] Le MCP apporte un gain réel de diagnostics et de contrôles prêts à l’emploi, mais recoupe les API sur les objets publicitaires et n’ouvre pas l’algorithme interne de Meta.**

[SÛR] Le gain établi est un service directement utilisable par un agent, comprenant anomalies, benchmarks et règles d’action ; ce n’est pas la preuve d’un accès à des données secrètes.
[À VÉRIFIER] L’équivalence exacte de certains outils `ads_insights_*` avec des endpoints publics Marketing API n’est pas documentée dans les fiches lues ; ni leur exclusivité ni leur disponibilité sur notre compte ne sont démontrées.
[SÛR] Pour les deux catégories mises en avant par la mission : l’historique a un équivalent Marketing API ; la qualité des datasets a une API Meta dédiée sur Graph v25.0.

### 1. Deux chemins d’accès

| Chemin | Prérequis et étapes documentées | Convient à Mistral ? |
|---|---|---|
| Sans posséder d’application Meta | [SÛR] Compte autorisé sur les actifs et plateforme supportée ; suivre le parcours du client IA, utiliser le serveur officiel, autoriser les actions. | [SÛR] Oui pour relier simplement un agent au compte ; pas de besoin d’app développeur imposé. |
| Avec son application Meta | [SÛR] Créer/réutiliser une app ; ajouter le cas d’usage MCP publicités ; configurer le retour OAuth du client ; consentement Facebook Login for Business ; autre voie programmatique documentée. | [SÛR] Destiné aux intégrations personnalisées ; n’est pas un prérequis du premier chemin. |

[SÛR] L’aide cite ChatGPT, Claude, Claude Code et Perplexity et le serveur `https://mcp.facebook.com/ads`.
[SÛR] L’application propre peut s’authentifier par OAuth, avec compte Facebook ou compte géré Meta ; les sept permissions du parcours développeur sont détaillées au point 5.
[SÛR] Les exigences de revue/vérification dépendent de l’accès demandé et des actifs gérés ; il n’est pas établi qu’une revue d’app soit nécessaire pour le parcours sans app.
[SÛR] Tous les comptes ne disposent pas encore de toutes les fonctions ; pour gérer les règles, il faut le contrôle total du portefeuille Business.
[SÛR] L’aide décrit : Business Suite → Paramètres → Intégrations → Ads MCP server → actif concerné → actions autorisées/bloquées ; absence du menu signifie fonction non disponible.
[SÛR] Les créations publicitaires sont initialement en pause ; le client demande une autorisation pour activation.
[SÛR] Sources : [Démarrage développeur](https://developers.facebook.com/documentation/ads-commerce/ads-ai-connectors/ads-mcp-server/ads-mcp-server-get-started), [Aide sans app](https://www.facebook.com/business/help/1456422242197840), [Annonce Meta](https://www.facebook.com/business/news/meta-ads-ai-connectors).
[À VÉRIFIER] L’éligibilité réelle du compte Mistral et la prise en charge du client choisi n’ont pas été testées.

### 2. Inventaire réel : sept catégories

[SÛR] Les sept pages de catégories totalisent 92 occurrences et 91 noms uniques ; `ads_get_ad_entities` figure dans reporting et gestion.
[SÛR] Il s’agit de l’inventaire publié, pas du résultat d’un appel tools/list sur le compte Mistral.
[SÛR] « Lecture » signifie ici pas de mutation annoncée par l’outil ; une analyse dérivée peut néanmoins être fournie.

### Reporting complet — 7 outils référencés

[SÛR] Rapports, score d’opportunité, contexte commercial, anomalies, diagnostics d’enchères, benchmarks sectoriels et tendances. [Source officielle](https://developers.facebook.com/documentation/ads-commerce/ads-ai-connectors/ads-mcp-server/ads-mcp-server-tools-comprehensive-reporting).

| Mode | Identifiants documentés |
|---|---|
| Lecture et diagnostic | `ads_get_ad_entities`, `ads_get_opportunity_score`, `ads_insights_advertiser_context`, `ads_insights_anomaly_signal`, `ads_insights_auction_ranking_benchmarks`, `ads_insights_industry_benchmark`, `ads_insights_performance_trend` |
| Écriture | Aucun outil d’écriture nommé dans cette catégorie. |

### Création et gestion publicitaire — 28 outils référencés

[SÛR] Comptes/Pages, entités publicitaires, créatifs/médias, bibliothèque publique, Instagram et audiences personnalisées. [Source officielle](https://developers.facebook.com/documentation/ads-commerce/ads-ai-connectors/ads-mcp-server/ads-mcp-server-tools-ad-creation-and-management).

| Mode | Identifiants documentés |
|---|---|
| Lecture | `ads_get_ad_accounts`, `ads_get_ad_account_pages`, `ads_get_pages_for_business`, `ads_get_user_pages`, `ads_get_field_context`, `ads_get_creatives`, `ads_get_creative_ads`, `ads_get_ad_images`, `ads_get_ad_videos`, `ads_get_ad_preview`, `ads_get_ad_entities`, `ads_library_search`, `ads_get_ig_accounts`, `ads_get_ig_media`, `ads_get_ad_account_custom_audiences`, `ads_get_custom_audience`, `ads_get_custom_audience_adsets` |
| Écriture | `ads_create_campaign`, `ads_create_ad_set`, `ads_create_ad`, `ads_update_entity`, `ads_activate_entity`, `ads_create_creative`, `ads_boost_ig_post`, `ads_create_custom_audience`, `ads_update_custom_audience`, `ads_update_custom_audience_users`, `ads_delete_custom_audience` |

### Catalogue — 34 outils référencés

[SÛR] Catalogues, produits, groupes, flux, règles de transformation, diagnostics et sources d’événements associées. [Source officielle](https://developers.facebook.com/documentation/ads-commerce/ads-ai-connectors/ads-mcp-server/ads-mcp-server-tools-catalog-creation-and-management).

| Mode | Identifiants documentés |
|---|---|
| Lecture | `ads_catalog_get_catalogs`, `ads_catalog_get_details`, `ads_catalog_get_diagnostics`, `ads_catalog_get_dynamic_ads_health`, `ads_catalog_get_data_sources`, `ads_catalog_get_product_details`, `ads_catalog_get_product_product_sets`, `ads_catalog_search_product`, `ads_catalog_get_product_sets`, `ads_catalog_get_product_set_details`, `ads_catalog_get_product_set_products`, `ads_catalog_get_product_feed_details`, `ads_catalog_get_product_feed_upload_sessions`, `ads_catalog_get_feed_rules`, `ads_catalog_event_source_get`, `ads_catalog_event_source_get_catalogs`, `ads_catalog_event_source_get_health`, `ads_catalog_event_source_get_recommendations` |
| Écriture | `ads_catalog_create`, `ads_catalog_update_catalog`, `ads_catalog_product_create`, `ads_catalog_update_product`, `ads_catalog_delete_product`, `ads_catalog_create_product_set`, `ads_catalog_update_product_set`, `ads_catalog_product_set_delete`, `ads_catalog_create_product_feed`, `ads_catalog_update_product_feed`, `ads_catalog_create_product_feed_upload_session`, `ads_catalog_product_feed_delete`, `ads_catalog_create_feed_rule`, `ads_catalog_product_feed_delete_rule`, `ads_catalog_event_source_connect`, `ads_catalog_event_source_disconnect` |

### Signaux et ensembles de données — 13 outils référencés

[SÛR] Datasets, volumes reçus, qualité de rapprochement, fraîcheur, règles d’événements et paramètres Pixel, conversions personnalisées. [Source officielle](https://developers.facebook.com/documentation/ads-commerce/ads-ai-connectors/ads-mcp-server/ads-mcp-server-tools-signals-and-datasets).

| Mode | Identifiants documentés |
|---|---|
| Lecture | `ads_get_datasets`, `ads_get_dataset_details`, `ads_get_dataset_stats`, `ads_get_dataset_quality`, `ads_pixel_event_read`, `ads_pixel_parameter_read`, `ads_get_customconversions` |
| Écriture | `ads_pixel_event_create`, `ads_pixel_event_update`, `ads_pixel_event_delete`, `ads_pixel_parameter_create`, `ads_pixel_parameter_update`, `ads_pixel_parameter_delete` |

### Aide et dépannage — 2 outils référencés

[SÛR] Erreurs bloquant la diffusion et recherche d’articles d’aide officiels. [Source officielle](https://developers.facebook.com/documentation/ads-commerce/ads-ai-connectors/ads-mcp-server/ads-mcp-server-tools-help-and-troubleshooting).

| Mode | Identifiants documentés |
|---|---|
| Lecture | `ads_get_errors`, `ads_get_help_article` |
| Écriture | Aucun outil d’écriture nommé dans cette catégorie. |

### A/B et études de lift — 7 outils référencés

[SÛR] Éligibilité, création, suivi et modification de tests ; mesure de l’effet incrémental. [Source officielle](https://developers.facebook.com/documentation/ads-commerce/ads-ai-connectors/ads-mcp-server/ads-mcp-server-tools-abtests-and-conversion-lift-studies).

| Mode | Identifiants documentés |
|---|---|
| Lecture | `ads_experiment_list_tests`, `ads_experiment_check_eligibility`, `ads_experiment_abtest_get_test`, `ads_experiment_lift_get_test` |
| Écriture | `ads_experiment_abtest_create_test`, `ads_experiment_abtest_update_test`, `ads_experiment_lift_create_test` |

### Historiques d’activité — 1 outils référencés

[SÛR] Journal des changements du compte, filtrable selon objet, période, catégorie ou auteur. [Source officielle](https://developers.facebook.com/documentation/ads-commerce/ads-ai-connectors/ads-mcp-server/ads-mcp-server-tools-activity-logs).

| Mode | Identifiants documentés |
|---|---|
| Lecture | `ads_account_get_activity_logs` |
| Écriture | Aucun outil d’écriture nommé dans cette catégorie. |


[SÛR] La page générale « Available tools » est un index ; les sept fiches liées donnent les noms et fonctions.
[SÛR] L’aide Business annonce plus de formats créatifs et des uploads que la fiche nominative de gestion, qui décrit un créatif image ; ces mentions ne permettent pas d’inventer un nom d’outil absent de l’inventaire.
[SÛR] Suppression de flux produit : la documentation précise une suppression asynchrone des produits issus du flux, sauf ceux alimentés par une autre source.
[SÛR] La famille signaux ne nomme aucun outil d’envoi brut d’événements CRM : gérer une règle Pixel ou lire une qualité ne signifie pas renvoyer un chantier signé.

### 3. Recoupement avec les API et notre dashboard

| Catégorie MCP | Déjà accessible par API, ou nouveau ? | Situation Mistral |
|---|---|---|
| Reporting complet | [SÛR] Entités, insights et score d’opportunité accessibles par Marketing API ; [À VÉRIFIER] équivalent exact des cinq outils de contexte/anomalies/benchmarks/tendance non établi. | [SÛR] Lectures usuelles et recommandations Meta présentes ; pas d’équivalent identifié à tous ces diagnostics prêts à l’emploi. |
| Gestion publicitaire | [SÛR] Cycle des campagnes/adsets/ads, médias et audiences dans les API existantes ; interface agent nouvelle, pas objets nouveaux. | [SÛR] Backend déjà capable de publier, changer statut/budget et modifier créatifs ; toutes les surfaces Instagram/audiences ne sont pas inventoriées. |
| Catalogue | [SÛR] Catalogues, produits, flux et diagnostics accessibles via les API Catalogue/Marketing ; pas besoin du MCP pour ces objets. | [SÛR] Hors métier : rénovation sans boutique ni stock produit. |
| Signaux et datasets | [SÛR] Datasets/Pixels et stats ont des surfaces Graph ; EMQ, couverture et fraîcheur via Dataset Quality API ; [À VÉRIFIER] parité exacte des règles Event Setup Tool non démontrée. | [SÛR] Capacité absente de notre inventaire ; surtout utile avec données de conversion effectivement envoyées ; D5 reste en vigueur. |
| Aide et dépannage | [SÛR] Certaines erreurs de diffusion sont des champs d’API ; la recherche d’aide est une surface documentaire dédiée. | [SÛR] Diagnostic/recherche prête à l’emploi supplémentaire, sans nouveau signal d’enchère brut. |
| A/B et conversion lift | [SÛR] Ad Study couvre split tests et conversion lift dans Marketing API ; le MCP en facilite l’usage. | [SÛR] Comparaison IA des pubs déjà présente ; cela n’équivaut pas à un test expérimental randomisé Meta ; éligibilité non testée. |
| Historique d’activité | [SÛR] Edge ad-account/activities dans Marketing API : déjà accessible, aucune exclusivité MCP. | [SÛR] Déjà appelé pour les reprises par CODE-029 ; l’accès ne résout pas seul les erreurs de traitement. |

[SÛR] Sources d’équivalence :
- [Insights API](https://developers.facebook.com/documentation/ads-commerce/marketing-api/reference/ad-account/insights) : métriques, périodes, filtres et reporting.
- [Ad Account](https://developers.facebook.com/documentation/ads-commerce/marketing-api/reference/ad-account) : `opportunity_score`, contrôles de diffusion et edge activités.
- [Ad Account Activities](https://developers.facebook.com/documentation/ads-commerce/marketing-api/reference/ad-account/activities) : journal d’activités.
- [Ad Study](https://developers.facebook.com/documentation/ads-commerce/marketing-api/reference/ad-study) : split tests et lift.
- [Ads Pixel Stats](https://developers.facebook.com/documentation/ads-commerce/marketing-api/reference/ads-pixel/stats) et [Ads Pixel](https://developers.facebook.com/documentation/ads-commerce/marketing-api/reference/ads-pixel) : données et configuration Pixel.
- [Dataset Quality API](https://developers.facebook.com/documentation/ads-commerce/conversions-api/dataset-quality-api) : endpoint Graph v25.0 dataset_quality, EMQ, couverture, fraîcheur, déduplication.
- [Catalogue](https://developers.facebook.com/documentation/ads-commerce/catalog/overview) : gestion et diagnostics par API.

[SÛR] « Signaux » désigne ici la qualité des événements reçus et de leur rapprochement, pas l’accès aux variables cachées du modèle de diffusion.
[SÛR] Une bonne EMQ mesure le rapprochement d’un événement à un utilisateur ; elle ne mesure pas si le lead deviendra un bon chantier.
[SÛR] Marketing API et Conversions/Dataset Quality sont des familles documentaires distinctes, même lorsqu’elles utilisent Graph : qualifier toute la santé des signaux de « même route Marketing actuelle » serait inexact.
[SÛR] Notre référence interne : INVENTAIRE-BACKEND.md au HEAD du hub, REFERENTIEL.md §2/§4/§5.
[SÛR] Preuve d’usage activités : [services/ai-delivery-scope.js L82–89](https://github.com/seoettia-collab/facebook-ads-backend/blob/359225f3ba612118de298926f18cf32abced3556/services/ai-delivery-scope.js#L82-L89).
[SÛR] La phrase de mission « backend en lecture seulement » est trop large : l’inventaire contient publication, modification budget/statut et duplication ; aucun de ces actes n’a été exécuté pour cette étude.

### 4. Ce que le MCP n’apporte pas

[SÛR] Aucun outil de l’inventaire ne donne les poids du modèle d’enchères, sa formule complète, les signaux latents de chaque impression ou le journal des décisions internes.
[SÛR] Il existe en revanche un outil de diagnostic/benchmark d’enchères : dire « il ne donne aucune information sur l’enchère » serait faux.
[SÛR] Un benchmark de classement ou de secteur est une sortie de diagnostic ; ce n’est pas l’ouverture du moteur interne ou la possibilité de le piloter.
[À VÉRIFIER] Les fiches de ces diagnostics n’exposent ni leur méthodologie complète, ni schéma détaillé, ni endpoint Marketing API strictement équivalent.
[SÛR] Le MCP n’invente pas le résultat commercial de Mistral : qualification, devis signé et chantier doivent être connus hors Meta avant d’être éventuellement transmis.
[SÛR] Il ne corrige pas automatiquement une mauvaise fenêtre de mesure, une ancienne recommandation restaurée ou une confusion de reprise dans le dashboard.
[SÛR] Conclusion documentaire : l’accès à l’algorithme interne envisagé par le Gérant n’est pas exposé par ces outils ; l’exclusivité API des diagnostics additionnels reste non établie.

### 5. Sept permissions et portée destructrice

[SÛR] Liste publiée pour l’accès avec application propre ; elle n’est pas une capture du consentement du compte Mistral.
[SÛR] Les risques ci-dessous sont déduits des droits et outils documentés ; ils supposent aussi accès à l’actif et action autorisée par les règles.

| Permission | Portée et risque |
|---|---|
| ads_mcp_management | [SÛR] Accès au pont MCP ; mutations possibles avec droits d’actifs/outils associés. |
| ads_read | [SÛR] Rapports ; pas de suppression publicitaire. La référence autorise aussi l’envoi d’événements serveur, sous prérequis : risque de mesure polluée. |
| ads_management | [SÛR] Gestion des pubs ; activation dépensière, changement de budget/statut, interruption de campagne. |
| catalog_management | [SÛR] Création/modification/suppression de catalogues ; produits/flux effaçables par outils exposés. |
| business_management | [SÛR] Lecture/écriture d’actifs Business ; risque d’altération de gestion/accès selon opérations autorisées. |
| pages_show_list | [SÛR] Liste des Pages gérées ; pas de droit autonome de suppression/publication. |
| instagram_basic | [SÛR] Lecture profil/médias professionnels ; pas de droit autonome de suppression ou de publication. |

[SÛR] La référence ne transforme pas chaque permission en accès à tous les outils ; distinction permission/actif/règle indispensable.
[SÛR] ads_read n’est donc pas une garantie universelle « aucune écriture sur toute la plateforme » ; aucun envoi d’événement n’a été testé.
[SÛR] Sources : [permissions](https://developers.facebook.com/documentation/development/permissions), [liste MCP requise](https://developers.facebook.com/documentation/ads-commerce/ads-ai-connectors/ads-mcp-server/ads-mcp-server-get-started).

[SÛR] Meta documente des règles de refus sur création, statut, budget, ciblage et créatifs ; elles sont exécutées côté serveur et en disponibilité limitée.
[SÛR] Cette gouvernance d’agent est un gain distinct de l’accès aux métriques ; elle dispose de sa propre API sur ads-api.facebook.com, et pas uniquement de l’edge Graph utilisé par notre dashboard.
[SÛR] Les règles ne rendent pas le modèle de raisonnement infaillible et ne valent que pour les actions/périmètres effectivement couverts.
[SÛR] Source : [Rules best practices](https://developers.facebook.com/documentation/ads-commerce/ads-ai-connectors/ads-mcp-server/ads-mcp-server-rules-best-practices).
[À VÉRIFIER] La disponibilité et la configuration de ces règles sur le portefeuille Mistral ne sont pas contrôlées.

## Partie 2 — Familles Meta : utilité pour obtenir ou attribuer des chantiers

| Famille | Ce qu’elle permet | Utile pour nous ? | Pourquoi |
|---|---|---|---|
| API Marketing | [SÛR] Mesurer et gérer les publicités, budgets et résultats. | Oui, déjà centrale. | Relie acquisition et coût des contacts ; ne prouve pas seule le chantier signé. |
| API Conversions | [SÛR] Renvoyer événements de qualification/conversion CRM et résultats hors ligne à Meta. | Oui en principe ; interdite aujourd’hui par D5. | Permet attribution aval et signaux de qualité ; pas de recommandation d’activation. |
| CAPI Gateway et Signals Gateway | [SÛR] Acheminer des événements ou organiser des pipelines sources/destinations. | Pas un gain autonome retenu. | Ne créent pas la qualification commerciale ; D5 s’applique toujours au renvoi CAPI. |
| Catalogue | [SÛR] Stock, produits, flux et publicités catalogue. | Non dans le périmètre actuel. | Entreprise de rénovation, sans boutique ni catalogue produit. |
| Plateforme de commerce | [SÛR] Infrastructure vendeurs, catalogue et flux de commandes. | Non. | Pas de vente à distance ni commandes marchandes à gérer. |
| Ads CLI | [SÛR] Interface terminal de la Marketing API, scripts et opérations sur objets publicitaires. | Faible gain métier direct ; non retenue. | Recoupe les fonctions API/MCP ; aucun accès privilégié au résultat chantier. |
| MCP publicités | [SÛR] Outils pour agents, diagnostics et contrôles d’action. | Gain opérationnel ciblé. | Benchmarks/anomalies prêts à l’emploi ; ne remplace pas la qualification des leads. |

### Trois éléments retenus

1. [SÛR] Marketing API — reste la source des objets et résultats publicitaires ; le MCP recoupe ce socle.
2. [SÛR] Conversions API pour CRM — seule famille étudiée visant directement le retour des événements aval ; D5 interdit son activation à ce jour.
3. [SÛR] Diagnostics MCP — intérêt pour investigation/anomalies/benchmarks et contrôle d’agent ; aucun gain de chantier garanti par le branchement.

[SÛR] CAPI pour CRM ne se limite pas à un pixel de site : le guide Meta traite les événements aval de leads Instant Forms et leur retour depuis le CRM.
[SÛR] Pour son optimisation Conversion Leads, Meta donne notamment des repères de volume de 200 leads/mois, retours quotidiens et étape aval dans les 28 jours ; ce sont des repères du guide, pas une garantie de rendement.
[À VÉRIFIER] Le volume et l’éligibilité de Mistral ne sont pas mesurés ; attribution d’un événement et amélioration causale des chantiers ne doivent pas être confondues.
[SÛR] Sources : [Conversions API](https://developers.facebook.com/documentation/ads-commerce/conversions-api), [CRM/Conversion Leads](https://developers.facebook.com/documentation/ads-commerce/conversions-api/conversion-leads-integration), [décision D5](https://github.com/seoettia-collab/infra-agents-competences/blob/333d576bd49dd45b40fdf2ce6aa7ba3a84752cf1/projets/facebook-ads/documentation/REFERENTIEL.md).

[SÛR] CLI = interface terminal appelant Marketing API ; MCP = serveur distant d’outils pour agent. Leur recouvrement comprend campagnes, publicités, catalogues et datasets.
[SÛR] L’aperçu CLI ne documente pas le même ensemble de benchmarks, recherche d’aide et gouvernance MCP : leur parité exhaustive n’est pas établie.
[SÛR] Sources : [Ads CLI](https://developers.facebook.com/documentation/ads-commerce/ads-ai-connectors/ads-cli/ads-cli-overview), [Insights CLI](https://developers.facebook.com/documentation/ads-commerce/ads-ai-connectors/ads-cli/insights), [Gateways](https://developers.facebook.com/documentation/ads-commerce/gateway-products), [Catalogue](https://developers.facebook.com/documentation/ads-commerce/catalog), [Commerce](https://developers.facebook.com/documentation/ads-commerce/commerce-platform).

### Limites et traçabilité

[SÛR] Aucune équivalence technique exacte inventée pour les outils dont la documentation ne fournit pas d’endpoint.
[SÛR] Aucun branchement, appel du MCP, interrogation du compte publicitaire, installation, génération de credential ou configuration de règle.
[SÛR] Les schémas/données exacts des cinq diagnostics ads_insights_* et l’accès du compte restent À VÉRIFIER.
[SÛR] Documentation générale et inventaire peuvent évoluer ; inventaire nominatif consulté le 13/10/2026, 91 noms uniques.
[SÛR] Les sources officielles ont été lues intégralement lorsqu’elles étaient nécessaires ; seules des synthèses et identifiants factuels sont reproduits.
[SÛR] Deux fichiers de livraison : cette étude et message-diagnostic-pilote.md ; aucun changement de dépôt applicatif.

[SÛR] Prépublication : HEAD du hub revérifié `a31b63669b2314490ddf816631e132539cf50882` ; mission DIAG-004 inchangée ; livraison basée sur cet arbre pour conserver les travaux concurrents.
