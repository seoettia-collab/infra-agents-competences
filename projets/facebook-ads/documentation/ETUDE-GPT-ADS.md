# DIAG-008 — Intégration GPT Ads dans le Facebook Dashboard
25 octobre 2026 — v1.0 — EN-REPONSE-A : DIAG-008 / GPT-ADS-001.

## 1. France : OUI, éligible ; raccordement Mistral : NON, pas prêt

- [SÛR — O1/O2] La France figure comme disponible en libre-service dans Ads Manager. L'annonce européenne du 18/08/2026, actualisée le 31/08, l'incluait déjà ; l'extension du 21/10 n'est donc pas sa date d'ouverture.
- [SÛR — O1] L'entité juridique facturée doit être établie dans un pays disponible.
- [À VÉRIFIER] L'accès effectif du compte Mistral, sa validation, sa facturation et sa clé Advertiser API n'ont pas été contrôlés ; éligibilité nationale ne signifie pas compte prêt à diffuser.
- [SÛR — code/PR] Le formulaire préparé ne remet pas aujourd'hui les demandes au dashboard ; la PR est ouverte, brouillon, non fusionnée.
- [SÛR — conclusion] Le parcours site → CRM → alerte gérant peut être réalisé indépendamment de la gestion publicitaire OpenAI ; aucun lancement publicitaire n'est nécessaire pour rendre ce premier parcours utile.

## Pré-vol, périmètre et portée

| Élément | Référence immuable inspectée |
|---|---|
| Hub | `58b45297a77d2befce77bc1debd5afa29b61f1f7` |
| Backend main | `78fa5535acf1e06618669863812d873e0952a121` |
| Frontend main | `2274e5d043e493f2e684a05b80ff55d2df22ff5c` |
| Site PR nº 1 | `e3a667f04a2694635b4c9c452d7d3014c1c96db4` ; base `3547b525c90c9466f24ca56c41468fc9ca19ff28` |

- [SÛR] Fiche, mission, gouvernance, décisions et inventaire backend lus ; vérification par code aux hashes ci-dessus.
- [SÛR] Étude seulement : aucun SMS, prospect fictif transmis, compte créé, événement de conversion envoyé, changement publicitaire ou modification de code.
- [À VÉRIFIER] Le déploiement exécuté et la base de production n'ont pas été inspectés ; « présent » ci-dessous désigne le code main, pas un test réel réussi.
- [SÛR — instruction du Gérant] n8n ne fait pas partie du système retenu ; son URL présente dans le site est un reste de câblage, pas une preuve de service disponible.

## 2. Existant du dashboard et éléments réutilisables

| Besoin | Routes / fonctions / tables présentes | Ce qui manque pour GPT-ADS-001 |
|---|---|---|
| Persister un prospect | [SÛR] `services/database.js:108–120,588–612` : table `leads`, fonction `upsertLead`. | Pas de réception publique du formulaire site identifiée dans les routes inventoriées et montées examinées. |
| Lire les prospects | [SÛR] `GET /api/facebook/leads`, `routes/leads.js:31–195` : SQLite, nom, téléphone, réponses brutes, statut, note, catégorie. | Leur nom de route Facebook n'interdit pas la lecture d'une fiche d'autre origine ; adaptation de provenance à établir. |
| Champs | [SÛR] `full_name`, `phone_number`, `email`, `form_id/name`, `created_time`, `campaign_name`, `ad_name`, `raw_fields`. Migrations : `city`, `crm_status`, `note`, `category`, archivage/suppression. | Pas de colonnes structurées dédiées prénom/code postal/travaux multiples/provenance dans le schéma lu. |
| Projet et code postal | [SÛR] `js/conversions.js:185–207` sait lire les clés « travaux » et « codepostal » dans `raw_fields`. | Contrat de remise site → fiche non réalisé ; la capacité JSON ne prouve pas l'alimentation. |
| Catégorie métier | [SÛR] `PATCH /api/facebook/leads/:id/category`, `routes/leads.js:327–339` : une valeur autorisée. | Catégorie unique ; « Peinture » et « Autres travaux » ne correspondent pas directement à la liste actuelle. Plusieurs choix du formulaire ne doivent pas disparaître. |
| Suivi commercial | [SÛR] `PATCH /api/facebook/leads/:id/status`, `database.updateLeadCrmStatus`, colonne `crm_status`. UI : « nouveau », « contacté », « rendez-vous », « négociation », « devis signé », « terminé » (`js/conversions.js:506–512,4210–4227`). | Suivi manuel réutilisable ; pas une preuve de génération de devis contractuel, liaison à un logiciel de devis ou gestion de chantier. |
| Notes / échanges | [SÛR] `lead_notes`, `outbound_calls`, `inbound_sms` ; `GET/POST /api/comms/notes`, `GET /api/comms/full-history/:lead_id`. | Distinguer notification interne et contact réellement adressé au prospect. |
| Origine | [SÛR] Exemple Messenger : `raw_fields.source='messenger'` (`routes/webhook.js:501–519`). | Aucun modèle homogène d'origine et d'historique multicanal démontré. |

### Deux effets de bord importants avant de mélanger les origines

1. [SÛR — mécanisme] `getLastLeadSync()` calcule le maximum de `created_time` de toute la table `leads`, sans source (`database.js:878–882`). `syncService.js:134–170` utilise cette date pour demander uniquement les leads Facebook plus récents.
2. [À VÉRIFIER — scénario déduit] Si une demande site datée 10 h est ajoutée avant la récupération d'un lead Facebook daté 9 h 59, ce dernier peut sortir du filtre delta. Aucun incident réel de ce type n'a été recherché.
3. [SÛR — code] Le rattrapage SMS prospect parcourt les fiches récentes sans filtrer la provenance (`syncService.js:259–314`). Des chemins auto-SMS et réglages persistent malgré la décision D-017.
4. [À VÉRIFIER] Leur activation effective en production est inconnue ; ne pas présenter l'interdiction décidée comme une preuve de désactivation technique. Une entrée site ne doit pas déclencher un SMS prospect non demandé.

## 3. Circuit SMS : gérant et prospect sont deux usages différents

### Ce qui est réutilisable

- [SÛR] `services/sms-gateway-service.js:133–203` fournit `sendSms(to,message)` : normalisation, envoi SMSGate, jusqu'à quatre tentatives, retour d'identifiant et d'état fournisseur.
- [SÛR] Variables de configuration référencées : `SMS_GATEWAY_USERNAME`, `SMS_GATEWAY_PASSWORD`, `SMS_GATEWAY_PHONE`, appareil facultatif ; aucune valeur secrète lue.
- [SÛR] Twilio sert à la voix via `POST /api/comms/call/click-to-call` ; il n'est pas nécessaire de substituer Twilio au transport SMSGate pour l'alerte.
- [SÛR] L'ancien `services/messenger-sms-test.js` vise le numéro agent, mais `isTestModeEnabled()` retourne toujours false et son envoi utilise Twilio. Ce n'est pas une alerte de production réutilisable telle quelle.
- [À VÉRIFIER] Passerelle opérationnelle, appareil disponible et numéro personnel destinataire distinct du numéro expéditeur : à confirmer avant essai réel.

### Pourquoi la route actuelle ne remplit pas l'usage interne

- [SÛR] `POST /api/comms/sms` exige une fiche lead, accepte un destinataire substitué, ajoute la signature puis journalise `type='sms'` ; après succès, marque le lead « contacté » (`routes/comms.js:70–145`).
- [SÛR — conséquence] Envoyer par cette route au gérant avec le lead lié donnerait un faux signal de contact client. L'alerte interne doit rester distincte dans le suivi.
- [À VÉRIFIER — besoin fonctionnel] Manquent le déclenchement à l'enregistrement site, le destinataire interne confirmé, l'état d'alerte et la distinction acceptation/remise ; le comment appartient au Codeur.

### Si le SMS échoue, la demande reste-t-elle ?

- [SÛR — code Facebook] `syncService.js:203–240` appelle `upsertLead` avant de programmer le SMS ; `auto-sms-service.js:245–324` rattrape l'erreur sans supprimer la fiche.
- [SÛR] L'échec de `POST /api/comms/sms` tente d'enregistrer un historique « failed », sans suppression de `leads` (`routes/comms.js:169–187`).
- [SÛR — limite] Ces constats prouvent l'indépendance du stockage vis-à-vis de l'envoi dans ces chemins, pas la livraison SMS, ni une reprise durable de toute notification après redémarrage.
- [À VÉRIFIER — exigence du premier lot] La demande site doit être confirmée après persistance, rester visible et exploitable si l'alerte échoue, et permettre de savoir que l'alerte reste à traiter. L'échec SMS ne doit pas faire resoumettre la demande.

## 4. Formulaire du site — PR nº 1

Référence : [PR nº 1](https://github.com/seoettia-collab/MistralPro-Reno/pull/1), titre ADS-LEAD-001, ouverte et brouillon au contrôle.

### Ce qu'il fait

- [SÛR] `demande-devis.html:24–44` : cinq choix cumulables, prénom, téléphone et code postal obligatoires ; message facultatif ; piège robot.
- [SÛR] `js/demande-devis.js:17–70` : présélection modifiable par `service`, validation téléphone français/code postal IDF, envoi de `nom` (qui contient le prénom), `telephone`, `code_postal`, `travaux` joints par virgules, message, identité du formulaire, date et URL sans query.
- [SÛR] Quatre UTM conservés : source, medium, campaign, content ; `oppref`, identifiant de soumission durable et historique des différentes prises de contact absents de ce payload.
- [SÛR] Destination : URL n8n dans `form.action` (`demande-devis.html:24`), reprise par `fetch(form.action)` (`js/demande-devis.js:79`). Aucun appel au backend du dashboard.
- [SÛR] Confirmation et `dataLayer.lead_request_success` après HTTP 2xx ; aucun pixel chargé sur cette page ; garde double-clic seulement dans la page ouverte (`busy/completed`).
- [À VÉRIFIER] Un 2xx de cette destination ne démontre ni stockage dashboard ni alerte gérant ; la documentation de la PR le reconnaît. Les neuf tests annoncés par son auteur ne sont pas rejoués ici.

### Ce qui manque

- [SÛR] Récepteur dashboard et remise durable de ces champs ; le webhook Messenger existant attend un payload Meta signé, pas cette demande de devis.
- [SÛR] Le domaine Mistral n'est pas dans la liste CORS du backend lue ; les routes `/api/` sont protégées par la clé dashboard (`server.js:18–52,94`, `middleware/auth.js`). Le formulaire public n'est donc pas simplement branchable sur une route administrative existante.
- [À VÉRIFIER — exigence] Raccordement public borné à la réception de demandes, contrôles serveur/anti-abus, confidentialité conforme au circuit réel ; aucun accès général au dashboard à remettre au visiteur.
- [SÛR] Aucune activation ni réparation n8n n'est requise par l'objectif du Gérant.

### Origine et doublons : trois problèmes distincts

| Problème | Existant | Exigence fonctionnelle manquante |
|---|---|---|
| Identifier l'entrée | [SÛR] Formulaire site et formulaires Meta identifiables. | Séparer point d'entrée « site » et acquisition « ChatGPT Ads / Facebook / direct / inconnue ». |
| Attribuer une campagne | [SÛR] UTM du site ; noms campagne/pub Facebook. | Ne pas déclarer « ChatGPT Ads » parce que le formulaire s'appelle GPT Ads ; conserver l'origine constatée et sa fiabilité. |
| Rejeu d'une même demande | [SÛR] `upsertLead` empêche le doublon de même `id` ; garde navigateur limitée à la session. | Une retransmission après timeout/rechargement ne crée pas une seconde demande. |
| Même personne sur deux canaux | [SÛR] `findLeadByPhone` rapproche des numéros français mais retourne seulement la fiche la plus récente ; `upsertLead` ne l'utilise pas pour fusionner. | Ne pas recréer aveuglément un contact, ni effacer la nouvelle demande, son projet et sa provenance. |
| Plusieurs projets / téléphone partagé | [À VÉRIFIER] Aucun arbitrage métier démontré. | Un numéro commun n'est pas une preuve suffisante que deux demandes sont identiques. |
| Conversion publicitaire | [SÛR — O7] Déduplication d'événements distincte du doublon CRM. | Un événement identique ne compte qu'une fois ; cela ne fusionne pas des contacts. |

- [SÛR] `upsertLead` déduplique par `id` uniquement ; son UPDATE n'enrichit pas `raw_fields` (`database.js:588–608`). Un nouveau contact multicanal ne peut pas être supposé géré sans perte d'information.
- [À VÉRIFIER] UTM est une indication d'acquisition, pas une preuve inviolable ; correspondance à une conversion attribuée OpenAI à confirmer séparément.

## 5. API publicitaire OpenAI : capacités et limites utiles

Sources officielles relevées le 25/10/2026. Les pages techniques non datées sont des états documentaires à cette date, pas une promesse de disponibilité sur le compte.

| Domaine | Lisible / modifiable documenté | Limite à retenir |
|---|---|---|
| Accès | [SÛR — O3] Clé Advertiser API propre au compte ; `GET /v1/ad_account`. | Ni la clé API de modèles ni une connexion au plugin ne prouvent que le backend possède cette clé. |
| Campagnes / groupes / annonces | [SÛR — O4] Lecture/liste, création et modification, activation/pause/archivage ; titre, texte, image et URL de destination d'une chat-card. | Modification créative = nouvelle revue ; activation et aperçu ne garantissent pas diffusion. Pas de contrôle des réponses de ChatGPT (O9). |
| Budget / dépenses | [SÛR — O4/O5] Budget et enchères modifiables ; dépenses/impressions/clics lisibles à plusieurs niveaux. | Devise du compte ; valeurs de reporting et micros de configuration différentes ; données récentes non finalisées. |
| Conversions | [SÛR — O5/O7] Reporting dédié et événements de conversion envoyés par pixel ou serveur. | Le compteur n'est pas un téléchargement des coordonnées des prospects ; réception du formulaire reste dans notre propre circuit. |
| Autorisations particulières | [SÛR — O6] Gestion de marque, provisioning pixel/clés CAPI et campagnes optimisées conversions peuvent nécessiter activation par OpenAI / représentant partenaire. | 403 « Conversion bidding is not enabled » ou certains 404 ne prouvent pas une erreur du Codeur. |
| Compte | [SÛR — O8] État, revues, marque, pause/activation, certains plafonds globaux. | Devise/fuseau non modifiables par mise à jour de marque ; plafonds globaux réservés à certains comptes. |
| Développement futur | [SÛR — O9, 21/10] Formats/objectifs/achat/mesure supplémentaires annoncés comme développement à venir. | Ne pas les promettre comme fonctionnalités déjà accessibles ; cas de devis natif générique non démontré dans les pages API lues. |

### Limites qui concernent directement le projet

- [SÛR — O4] La chat-card standard pointe vers une URL externe ; ses champs et limites diffèrent de Meta (titre 3–50 caractères, texte au plus 100). Les textes Meta du Studio ne sont pas présumés interchangeables.
- [SÛR — O6] L'objectif et l'événement d'une campagne optimisée conversions ne peuvent pas être changés après création ; événement standard admissible requis, pas un événement personnalisé d'optimisation.
- [SÛR — O3] Quotas : 600 requêtes/minute par endpoint et 1 200 globalement, contrôlés par compte et IP ; limites séparées pour les travaux bulk.
- [SÛR — O5] Les conversions arrivent par traitement quotidien : attendre au moins un jour ; `null` signifie indisponible, pas zéro ; les fenêtres et la base temporelle affectent les totaux.
- [SÛR — contradiction documentaire O5/O7] Reporting décrit `conversions` comme clics + vues, tandis que la page CAPI décrit encore ce total comme clics seuls, vues séparées. Le changelog du 30/09 de O3 confirme le premier comportement pour Insights.
- [À VÉRIFIER] Réconciliation des chiffres du compte avant tout tableau de bord contractuel : les deux textes ne doivent pas être fusionnés sans réserve.
- [SÛR — O7] La CAPI exige ses ressources de conversion et une clé dédiée ; attribution de clic par `oppref` à conserver lorsqu'il est disponible, sans capture automatique par la CAPI. Le formulaire de la PR ne le garde pas.
- [SÛR — gouvernance] Pixel/CAPI ne sont pas activés dans cette étude ; D5 et les contraintes permanentes ne sont pas amendées. Le périmètre d'un futur suivi OpenAI devra être explicitement arbitré, sans toucher à Meta.
- [SÛR — O9] L'API publicitaire n'ouvre pas les conversations privées, et acheter une publicité ne modifie pas les réponses de ChatGPT.
- [À VÉRIFIER] Formats natifs, options géographiques fines en France, objectifs autorisés et autorisations du compte Mistral : pas de contrôle effectif effectué.

## Accès et décisions manquants

| À obtenir / vérifier | Auprès de qui | Bloque quoi ? |
|---|---|---|
| Autorisation du lot site/CRM, accès de réalisation aux trois dépôts et déploiement | Gérant → Pilote/Codeur | Réalisation ; aucune fusion autorisée par cette étude. |
| Configuration SMSGate disponible au backend et numéro gérant confirmé | Gérant / exploitant du téléphone | Essai réel de notification, sans demander d'afficher des secrets. |
| Arbitrage provenance, demandes multiples et alertes indépendantes du contact prospect | Gérant/Pilote | Critères de réception du premier lot. |
| Compte OpenAI réellement sélectionné, rôles, facturation et revues | Administrateur Ads Manager | Diffusion publicitaire ultérieure, pas réception du site. |
| Clé Advertiser API propre à ce compte pour le backend | Administrateur du compte | Lecture/gestion publicitaire dans l'application, pas premier lot CRM. |
| Permissions de conversion/optimisation si refusées | OpenAI Ads Solutions / représentant partenaire | Fonction concernée seulement ; ne bloque pas le formulaire site. |
| Autorisation et conditions du suivi de conversions | Gérant/Pilote et responsable du site | Pixel/CAPI ultérieurs ; non inclus au premier lot. |

## Premier lot de réalisation à soumettre — un seul objectif utile

**Recevoir une demande du formulaire dans le CRM existant et notifier le gérant via SMSGate, sans dépendre d'OpenAI ni de n8n.**

Périmètre fonctionnel proposé, pas une conception d'API ni de schéma :

1. [À VÉRIFIER — à réaliser] Prénom, téléphone, code postal, tous les travaux choisis et précision conservés et visibles dans le dossier existant.
2. [À VÉRIFIER — à réaliser] Confirmation au visiteur liée à l'enregistrement durable, indépendamment du résultat SMS.
3. [À VÉRIFIER — à réaliser] Alerte interne au destinataire confirmé ; son échec reste visible, sans perte de demande et sans statut « prospect contacté » indu.
4. [À VÉRIFIER — à réaliser] Rejeu d'une même demande reconnu ; même personne via deux canaux traitée sans effacement des projets/origines.
5. [À VÉRIFIER — à réaliser] Distinction site / acquisition connue ou inconnue, sans attribuer fictivement à ChatGPT Ads les demandes directes.
6. [À VÉRIFIER — à réaliser] Non-régression de la récupération Facebook malgré un lead site plus récent ; aucun SMS automatique au prospect induit.
7. [À VÉRIFIER — à réaliser] Contrôles publics de réception et d'abus, sans exposer les droits administratifs du dashboard.

Recette minimale attendue du Codeur : soumission multi-travaux, panne de stockage, timeout puis rejeu, panne SMS, rapprochement multicanal, lead Facebook retardé après insertion site, contrôle des statuts et absence d'envoi prospect.
Les scénarios de recette doivent commencer sur données fictives et transport SMS simulé ; tout essai réel/déploiement reste soumis à son ordre de réalisation.
Hors lot : interface de création de campagnes, budget publicitaire, activation d'annonce, pixel/CAPI, nouveau CRM, génération de devis/PDF et chantier.

## Défauts et réserves hiérarchisés

1. [SÛR] La PR pointe vers un circuit n8n non retenu et n'a pas de remise dashboard démontrée.
2. [SÛR — mécanisme / À VÉRIFIER — occurrence] Mélanger des leads site et Facebook peut avancer le filtre delta Facebook ; les chemins auto-SMS ne sont pas bornés à une nouvelle origine.
3. [SÛR] La route SMS prospect marque « contacté » : mauvais indicateur si elle sert telle quelle à alerter le gérant.
4. [SÛR] Déduplication par ID ne résout ni personne multicanale, ni conservation de plusieurs demandes/provenances.
5. [SÛR] Champs multiples du formulaire et catégorie CRM unique ne concordent pas totalement.
6. [À VÉRIFIER] État opérationnel du compte publicitaire, configuration SMS et rendu de la PR non contrôlés.

## Références OpenAI — dates explicites ou date de relevé

| ID | Source officielle | Date |
|---|---|---|
| O1 | [Ads Manager Availability](https://help.openai.com/en/articles/20001245-ads-manager-availability) | Relevée 25/10/2026 ; page affiche mise à jour relative 4 jours. |
| O2 | [ChatGPT Ads expands across Europe](https://openai.com/index/chatgpt-ads-expands-across-europe/) | 18/08/2026 ; mise à jour 31/08/2026. |
| O3 | [Advertiser API Overview](https://developers.openai.com/ads/api-overview) | Relevée 25/10/2026 ; changelog daté notamment du 30/09/2026. |
| O4 | [Campaign Management](https://developers.openai.com/ads/campaign-management) | Non datée ; relevée 25/10/2026. |
| O5 | [Reporting](https://developers.openai.com/ads/reporting) | Non datée ; relevée 25/10/2026. |
| O6 | [API Partner Setup](https://developers.openai.com/ads/api-partner-setup) | Non datée ; relevée 25/10/2026. |
| O7 | [Conversions API](https://developers.openai.com/ads/conversions-api) | Non datée ; relevée 25/10/2026. |
| O8 | [Account Management](https://developers.openai.com/ads/account-management) | Non datée ; relevée 25/10/2026. |
| O9 | [Extension à 26 pays](https://openai.com/index/chatgpt-ads-expands-26-new-countries/) | 21/10/2026. |

Les fichiers et lignes cités se rapportent aux hashes du pré-vol, pas à une future version de main.
Verdict : **NON prêt à lancer en l'état**, malgré une France éligible ; étude terminée, premier lot utile délimité.
