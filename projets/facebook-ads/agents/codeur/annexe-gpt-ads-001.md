# GPT-ADS-001 — Étude d’intégration du module « GPT Ads »

25 octobre 2026 — Étude seule. Les propositions ci-dessous ne sont ni développées ni activées.

## 1. Conclusion et correction de périmètre

Le parcours demandé est réalisable dans le Facebook Dashboard existant. Le premier lot doit livrer la réception des demandes du site et leur suivi, avec une alerte interne fiable. Il ne dépend pas de l’ouverture d’un compte OpenAI Ads.

**Le Gérant confirme que n8n ne fait pas partie du système.** Une URL n8n subsiste dans le code de la PR nº 1 ; cela prouve une destination codée dans ce brouillon, pas un service installé ou actif. Aucun workflow n8n n’a été contacté. L’architecture proposée supprime cette dépendance : formulaire du site → réception dédiée du Dashboard → enregistrement SQLite → alerte gérant en tâche séparée → suivi CRM.

Le nom « GPT Ads » désigne ici la vue de suivi de cette acquisition. Aucun appel à un modèle GPT n’est nécessaire pour recevoir une demande ou émettre une alerte à texte fixe. Les campagnes ChatGPT Ads relèvent d’une connexion publicitaire distincte, non encore établie.

## 2. Références inspectées et portée de la preuve

| Référence | Version examinée | Constat |
|---|---|---|
| Hub infra-agents-competences | ca8bc9ffde161ab7d16e77344db9100ec6f3fc5c | Fiche Codeur, gouvernance et décisions relues ; branche d’étude isolée. |
| facebook-ads-backend/main | 78fa5535acf1e06618669863812d873e0952a121 | Routes prospects/communications, SQLite, SMSGate, Twilio, synchronisation et automatismes. |
| facebook-ads-frontend/main | 2274e5d043e493f2e684a05b80ff55d2df22ff5c | Conversions, détail prospect, statuts, filtres et appels API. |
| [PR nº 1 du site](https://github.com/seoettia-collab/MistralPro-Reno/pull/1) | e3a667f04a2694635b4c9c452d7d3014c1c96db4 ; base 3547b525c90c9466f24ca56c41468fc9ca19ff28 | Ouverte et non fusionnée à la lecture ; branche ads/formulaire-devis-simple-20261024. |
| Connecteur ChatGPT Ads Manager | Lecture du 25/10/2026 | Aucun compte accessible ; aucun détail de campagnes, dépenses ou conversions ne peut donc être vérifié pour Mistral Pro Reno. |

Ces constats portent sur les versions Git et la réponse du connecteur, pas sur une inspection de la base ou des variables secrètes de production. La disponibilité effective du téléphone SMSGate, de la SIM, de Twilio et des identifiants n’a pas été testée. Aucun prospect réel n’a été consulté ni copié.

## 3. Existant réutilisable

| Élément | Preuve dans le code | Réutilisation / adaptation |
|---|---|---|
| Base prospects | backend/services/database.js : leads, upsertLead, getLeadById | Prénom dans full_name, téléphone dans phone_number, réponses dans raw_fields ; conserver les IDs Meta et préfixer les demandes site. |
| Fiche et historique CRM | frontend/js/conversions.js ; backend/routes/leads.js et routes/comms.js | Notes, rappel manuel, archivage, échanges et suivi des étapes ; éviter un second CRM. |
| Travaux et lieu | raw_fields.travaux et raw_fields.code_postal déjà lus par la fiche | Stocker un tableau de codes de travaux comme donnée canonique et une représentation lisible pour les vues existantes. La catégorie métier actuelle est unique et ne suffit pas aux multichoix. |
| Statuts | interface : nouveau, à recontacter, msg vocal, à revoir, contacté, rendez-vous, confirmé, négociation, devis signé, terminé | Ajouter « devis envoyé » ; tracer les changements. Le CRM n’est pas un outil de chiffrage, d’édition de devis ou de signature électronique. |
| SMS sortants principaux | backend/routes/comms.js POST /sms → services/sms-gateway-service.js | Transport SMSGate Cloud → téléphone Android → SIM ; réutilisable derrière un service d’alerte spécifique. |
| Twilio | services/twilio-service.js : clickToCall et sendSms | Appels et fonction SMS présentes ; aucun basculement SMSGate → Twilio automatique trouvé. Ne pas activer un secours sans règles et vérification de configuration. |
| Ancien test d’alerte agent | services/messenger-sms-test.js | Destinataire agent séparé et type historique spécifique, mais isTestModeEnabled retourne false ; ce n’est pas une alerte gérant opérationnelle pour les formulaires. |

### Pièges à traiter avant raccordement

1. **Alerter le gérant n’est pas contacter le prospect.** POST /api/comms/sms ajoute une signature client, écrit dans outbound_calls et force le statut « contacté », même avec un destinataire de remplacement. La synthèse CRM considère aussi toute ligne outbound_calls comme activité de contact. Une alerte interne doit donc avoir sa propre table/file et son affichage, sans augmenter les compteurs de contact client.
2. D-017 interdit les SMS automatiques de prise de contact. Le main inspecté conserve scheduleAutoSms, le rattrapage des nouveaux leads et la relance J+1. Leur activation réelle en production n’a pas été vérifiée. Le rattrapage sélectionne les leads récents sans filtre de provenance. Une simple insertion du formulaire dans leads pourrait donc déclencher des envois au prospect selon la configuration : les nouvelles demandes doivent être explicitement exclues de tous ces chemins, y compris des fonctions d’envoi elles-mêmes.
3. L’interface offre « devis signé », mais getCrmStatusBreakdown ne reconnaît pas ce libellé parmi ses conversions ; « terminé » est reconnu. Il faut aligner les libellés CRM avec les compteurs sans attribuer artificiellement une signature à OpenAI Ads.
4. upsertLead dédoublonne seulement sur id. Il ne dédoublonne pas un formulaire du site selon le téléphone ou une clé de soumission ; ses mises à jour ne réécrivent pas raw_fields. Réutiliser cette fonction seule ne suffit pas.
5. Les listes de formulaires et certaines lectures actuelles interrogent Meta. La vue des demandes site doit rester utilisable si Meta est indisponible et ne pas compter ces demandes dans les métriques publicitaires Meta.

## 4. PR nº 1 : prêt côté formulaire, réception à remplacer

La PR ajoute demande-devis.html, js/demande-devis.js et son CSS. Elle contient cinq choix cumulables : salle de bain, cuisine, peinture, rénovation complète, autres travaux. Prénom, téléphone et code postal sont requis ; une précision est facultative. La validation navigateur couvre le format français du téléphone et les huit départements d’Île-de-France. Les neuf scénarios annoncés dans la PR sont des tests simulés antérieurs, pas des essais exécutés dans cette étude.

Le formulaire POSTe actuellement vers l’ancienne URL n8n. Il envoie nom, telephone, code_postal, travaux sous forme de chaîne, message, form_name, form_location, submitted_at, page_url et quatre paramètres UTM. Il bloque le double clic dans la même page ; cette protection disparaît au rechargement et ne couvre pas un rejeu réseau. Aucun identifiant de soumission persistant ni oppref n’est transmis.

La confirmation et l’événement local lead_request_success sont déclenchés après tout HTTP 2xx. Cela ne prouve aujourd’hui ni un enregistrement dans le Dashboard ni une conversion OpenAI. Après raccordement, il faudra exiger une réponse JSON attestant le commit de la demande et retourner la même référence lors d’un rejeu.

La page ne charge pas de pixel et n’envoie pas de conversion OpenAI ; son dataLayer est seulement un point d’accroche. Elle évite merci.html et son comptage existant. La fusion du site sur main déclencherait le déploiement OVH : la PR doit rester non fusionnée pendant l’étude.

Le téléphone affiché dans cette PR est 07 55 18 89 37 ; le contexte métier du Dashboard emploie 06 09 10 90 69. Ne choisir aucun de ces numéros par défaut comme destinataire d’alerte : distinguer numéro public, SIM d’envoi et mobile du gérant.

## 5. Parcours proposé sans n8n

### Réception et conservation

Créer un endpoint public **uniquement de dépôt de demande**, proposé POST /public/lead-requests. Il ne doit accepter ni destination de SMS ni ordre d’envoi, et ne doit exposer aucune lecture de prospect. Le formulaire statique du site appelle ce récepteur HTTPS directement ; aucun secret Dashboard n’est placé dans le navigateur.

Le CORS actuel n’autorise pas le site Mistral Pro Reno et le parseur JSON général accepte jusqu’à 500 Mo. Monter la réception avec ses propres origines exactes, son petit plafond de corps (par exemple 16 Ko), sa validation, son quota par IP et ses limites d’abus **avant** les middlewares généraux. Ne pas ouvrir les autres routes /api/ au site. CORS n’authentifie pas un expéditeur : ajouter validation stricte, piège robot, limitation de débit et protection des quotas d’alertes.

Valider côté serveur : prénom non vide et borné, téléphone français normalisé E.164, code postal et zone, un à cinq travaux dans une liste fermée, précision facultative bornée, UTM bornés. Conserver le téléphone et le code postal comme chaînes. Utiliser l’heure serveur comme date de réception, sans faire confiance à submitted_at pour la décision.

Dans une transaction SQLite : créer la soumission, le prospect lié et une alerte gérant en attente, avec contrainte d’unicité. Répondre après commit ; si l’écriture échoue, aucune confirmation ni alerte ne doit partir. Un worker distinct traite l’alerte après commit. En panne SMS, la demande reste visible et le navigateur n’est pas invité à la soumettre à nouveau.

### Doublons

- Générer un UUID de soumission et le conserver au moins pendant les reprises/rechargements de cette demande ; ne pas stocker les coordonnées dans l’URL ni dans l’analytique.
- Contrainte serveur unique sur origine du formulaire + UUID ; stocker une empreinte du contenu normalisé. Même clé et même contenu : retourner la même demande sans autre prospect ni autre alerte. Même clé et contenu différent : conflit explicite, aucune écriture partielle.
- Tester les requêtes simultanées, les délais dépassés et les redémarrages. La garantie vient de la transaction et de la contrainte SQLite, pas seulement d’un bouton désactivé.
- Un téléphone identique avec une nouvelle clé peut désigner une nouvelle demande ou un téléphone partagé. Le signaler comme rapprochement possible ; ne pas supprimer ni fusionner automatiquement une demande légitime ou un prospect Meta. Conserver toutes les demandes et leur provenance.

### Alerte au gérant

Configurer un destinataire interne distinct, par exemple GERANT_ALERT_PHONE_E164, et un interrupteur d’alerte séparé des SMS clients. Le navigateur ne peut pas le remplacer. Texte fixe proposé : « Nouvelle demande site : prénom, code postal, travaux. Consultez le Dashboard. » Le détail et le téléphone du prospect restent dans la fiche ; aucun jeton d’accès dans le SMS.

File persistante avec unicité demande + type alerte, tentatives horodatées et états en attente, en cours, acceptée par le fournisseur, échec, résultat incertain. Une acceptation SMSGate ne prouve pas la remise sur le téléphone. Afficher l’état et permettre une reprise interne contrôlée sans modifier la demande ou le statut CRM.

L’adaptateur existant réessaie les POST SMS après erreur réseau et n’envoie aucune clé d’idempotence fournisseur ; un délai dépassé après acceptation peut entraîner un doublon. Ne pas reprendre aveuglément ce comportement : désactiver les reprises opaques dans le nouvel usage, distinguer refus certain et résultat inconnu, et ne pas promettre « exactement un SMS » sans support fournisseur confirmé. Pas de secours Twilio sur un résultat SMSGate incertain.

Le worker d’alerte ne doit jamais appeler la route SMS prospect, insérer une ligne de contact client ou modifier crm_status. SMS au prospect et relances restent manuels ; aucun automatisme historique ne doit inclure les nouvelles demandes.

### Provenance et mesure

Conserver séparément : canal de collecte « site web », origine d’acquisition déclarée (par exemple UTM chatgpt + paid), campagne/annonce lorsque fournies, date et page du formulaire. Présenter « ChatGPT Ads — provenance déclarée » tant que l’attribution publicitaire n’est pas vérifiée. Sans paramètres : origine inconnue/site, jamais ChatGPT Ads par défaut. Un lien partagé ou des UTM modifiés ne prouvent pas un clic publicitaire.

Prévoir un champ distinct pour le click reference OpenAI oppref lorsqu’il existe, avec les règles de consentement nécessaires ; la PR ne le conserve pas actuellement. Ne pas inventer ce paramètre, ni le confondre avec un lead ID Meta ou l’UUID du formulaire. Le premier lot conserve les informations nécessaires au suivi interne ; il n’envoie aucun événement publicitaire.

Dans le CRM : « nouveau » → « contacté » → « rendez-vous » → « devis envoyé » → « devis signé » ; conserver les étapes et notes utiles existantes. Le passage en devis signé est une décision saisie par le gérant, pas la preuve d’une signature électronique. Tracer les dates et présenter séparément demandes, devis et signatures. Pas de chiffre d’affaires ni de ROAS supposé.

## 6. OpenAI Ads : possibilités réelles et limites

### Connecteur ChatGPT

Le connecteur disponible expose des lectures de comptes, campagnes, groupes, annonces, dépenses et conversions ; il expose également des opérations de gestion, exclues de cette étude. Sa lecture des comptes retourne une liste vide. Cela signifie **aucun compte accessible dans cette connexion**, pas « aucun compte existant », pas « zéro dépense » et pas « inéligible en France ». Aucun nouvel utilisateur ni compte n’a été créé.

Le connecteur de cette conversation ne constitue pas à lui seul une authentification réutilisable par notre serveur. Il ne raccorde pas automatiquement les prospects au Dashboard et n’installe pas la mesure sur le site.

### Intégration applicative documentée

OpenAI documente une Advertiser API pour gérer les campagnes depuis une application, avec une clé propre au compte Ads conservée côté serveur. Elle permet donc un raccordement direct du Dashboard ; cette clé n’a pas été obtenue ni vérifiée ici. Source : [Advertiser API](https://developers.openai.com/ads/api-overview), consultée le 25/10/2026.

La lecture des campagnes et de leur reporting permet d’afficher impressions, clics, dépenses et conversions attribuées. Prévoir devise, fuseau, plage de dates, fenêtre d’attribution, pagination, date de dernière synchronisation et état « non connecté/indisponible » ; ne pas remplacer une absence de données par zéro. Les métriques récentes restent provisoires et peuvent être corrigées. Sources : [Reporting API](https://developers.openai.com/ads/reporting) et [Measure Results](https://help.openai.com/en/articles/20001214-measure-results).

Le comptage interne d’une demande reçue ne remonte pas automatiquement dans Ads Manager. La documentation distingue source de mesure, événement configuré et campagne associée. Une intégration Pixel et/ou Conversions API est nécessaire pour la mesure, avec identifiants d’événement cohérents pour éviter les doublons ; la Conversions API utilise une clé distincte. Un objectif possible est lead_created après commit réel, pas après clic sur le bouton ni après envoi du SMS. Sources : [Conversion Tracking](https://developers.openai.com/ads/conversion-tracking) et [Conversions Setup](https://developers.openai.com/ads/api-reference/conversion-setup).

La documentation officielle annonce le libre-service en France, mais cela ne démontre ni l’éligibilité ni l’accès opérationnel de ce compte. Source : [Ads Manager Availability](https://help.openai.com/en/articles/20001245-ads-manager-availability).

**Limite de gouvernance :** CAPI/pixel sont interdits par les règles actuelles du projet. Leur éventuelle application à la mesure OpenAI doit être explicitement cadrée et autorisée avant tout branchement. Aucun pixel, CAPI, envoi de coordonnées à OpenAI, activation ou modification de campagne dans ce premier lot. Un futur lot peut commencer par le reporting en lecture seule ; aucune synchronisation bidirectionnelle ou gestion de budget n’est nécessaire au parcours des demandes.

## 7. Accès et paramètres à obtenir pour la réalisation

| Élément | État constaté | Nécessaire pour |
|---|---|---|
| Lecture GitHub site/backend/frontend/hub | Accessible | Étude accomplie ; dépôts et PR identifiés. |
| Accès n8n | Sans objet | Aucun besoin : composant exclu par le Gérant. |
| Préproduction backend + données SQLite isolées | Non utilisée dans l’étude | Tests du futur endpoint et du worker sans toucher aux prospects réels. |
| Déploiement Render et OVH | Non exercé | Réalisation ultérieure autorisée ; vérifier domaine, HTTPS et réception avant fusion du site. |
| Destinataire d’alerte gérant | Pas confirmé comme rôle de destinataire | Configuration distincte ; ne pas déduire du numéro public ni d’AGENT_PHONE_NUMBER. |
| SMSGate : configuration et état Android/SIM | Transport identifié ; disponibilité non vérifiée | Avant un éventuel essai réel séparément autorisé ; aucune nouvelle clé à afficher dans un rapport. |
| Twilio SMS et numéro expéditeur | Code présent, aptitude réelle non vérifiée | Seulement si un secours devient un besoin validé. |
| Compte OpenAI Ads et droits | Aucun compte accessible par ce connecteur | Reporting et campagnes ; une connexion existante peut manquer de droits. |
| Clé Advertiser API du compte | Non fournie/non vérifiée | Connexion du serveur au reporting OpenAI ; stockage secret côté serveur uniquement. |
| Source/clé de conversion, gestion de consentement | Non vérifiées ; aucune activation autorisée | Futur lot de mesure, après décision sur CAPI/pixel et paramètres de confidentialité. |

## 8. Premier lot proposé : GPT-ADS-002 — demandes site et alertes internes

**Périmètre précis à autoriser ensuite :** réception directe du formulaire de la PR nº 1, idempotence, stockage durable, vue « GPT Ads » utilisant le CRM existant, file d’alertes gérant SMSGate et suivi jusqu’à la signature. Réalisation d’abord isolée avec faux transport SMS ; aucune gestion de campagne OpenAI, aucune campagne Meta, aucune CAPI/pixel, aucun SMS automatique au prospect.

| Travail | Fichiers / composants envisagés | Résultat vérifiable |
|---|---|---|
| 1. Contrat formulaire | Site demande-devis.html et js/demande-devis.js ; documentation PR | Ancienne URL n8n remplacée par endpoint Dashboard, travaux structurés, UUID réutilisable et confirmation sur reçu persistant. |
| 2. Réception dédiée | Backend server.js, nouveau routes/site-leads.js et service de validation | Dépôt public strictement limité, CORS ciblé, corps limité, anti-abus, aucune clé Dashboard côté site. |
| 3. Transaction et anti-doublon | services/database.js + nouveau service site-leads | Demande/prospect/alerte créés atomiquement ; index unique ; conflit de contenu détecté ; métadonnées de provenance conservées. |
| 4. Alertes persistantes | Nouveau services/gerant-alerts.js + adaptation bornée de sms-gateway-service.js | Faux fournisseur par défaut en test ; état fiable, reprise après redémarrage, absence de mutation du statut client. |
| 5. Garde des SMS clients | syncService.js, auto-sms-service.js, sélection de relance et chemins concernés | Toute nouvelle demande site exclue de prise de contact/rattrapage/relance automatique ; D-017 préservée. |
| 6. Vue et suivi | Frontend index.html/navigation selon besoin, js/conversions.js, CSS concerné ; routes/leads.js | Filtre de provenance, cinq travaux cumulables, CP, état d’alerte, notes et étapes ; lecture site autonome sans Graph. |
| 7. Statuts et bilan | routes/leads.js, services/database.js, interface CRM | « Devis envoyé » suivi et « devis signé » reconnu correctement ; pas de contamination des statistiques Meta. |

**Critères de réception du lot :**

1. Une soumission fictive multichoix crée une seule demande avec prénom, téléphone normalisé, CP et travaux ; aucun envoi externe.
2. Double clic, rejeu après timeout, deux requêtes simultanées et redémarrage donnent la même référence et une seule alerte en file.
3. Une panne SQLite interdit la confirmation et tout SMS ; une panne SMS conserve la demande et affiche l’échec sans demander au prospect de recommencer.
4. Une alerte au gérant ne compte jamais comme contact client ; aucun transport prospect n’est appelé, même lors d’un cycle de synchronisation/rattrapage/relance.
5. Un numéro réutilisé pour un autre projet n’efface ni la nouvelle demande ni l’historique ; le rapprochement potentiel est visible.
6. Les entrées invalides, corps trop grands et rafales sont refusés sans alerte ; un client ne peut pas imposer le destinataire interne.
7. Les UTM manquants/faux ne deviennent pas une attribution certaine ; aucun événement de conversion OpenAI n’est envoyé.
8. Les notes et étapes restent utilisables jusqu’à devis signé ; ce statut est correctement compté en interne. Les données Meta restent séparées.
9. Contrôle mobile de la PR avec réseau simulé, fournisseur SMS simulé et tests Node 20.11.1 ; aucune ouverture de worker réseau durant les tests.

Le développement de ce lot peut commencer sans compte OpenAI Ads ni disponibilité immédiate de SMSGate en utilisant des doubles de test. La réception réelle, un essai SMS et le déploiement seront des étapes ultérieures explicitement autorisées ; la présente étude ne les autorise pas.

## 9. Non exécuté

Aucune modification du code applicatif, aucune fusion de la PR, aucun déploiement, aucune requête au webhook hérité, aucun formulaire envoyé, aucun SMS, aucun appel Twilio/SMSGate, aucun compte publicitaire créé/modifié et aucune conversion publicitaire transmise. Aucun test d’exécution du futur parcours : il n’est pas implémenté. Étude fondée sur lecture ciblée de code, métadonnées GitHub, lecture des comptes Ads et documentation officielle. Publication du rapport uniquement sur une branche du hub, sans modification de main.
