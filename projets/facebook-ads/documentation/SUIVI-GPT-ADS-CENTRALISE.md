# Marketing Dashboard — module ChatGPT Ads

Date de mise à jour : 2026-10-31.

> Journal de livraisons datées. Les sections s'additionnent et certaines sont remplacées par les suivantes : l'accès desktop actuel est décrit à la fin, « Accès direct ChatGPT Ads sans connexion supplémentaire ». Pour une synthèse d'exploitation, lire [REFERENTIEL.md](REFERENTIEL.md). La gouvernance v3 remplace les anciennes procédures de coordination.
Décision de périmètre exprimée par Ricardo ETTIA dans la conversation Facebook marketing.

## Objectif corrigé

Faire évoluer Facebook Dashboard en Marketing Dashboard et ajouter un module natif ChatGPT Ads.
Le Gérant veut préparer, lancer, suivre et optimiser les campagnes OpenAI depuis cette application.
Le plugin ChatGPT Ads Manager installé dans ChatGPT est un moyen d'administration disponible ici ; son installation seule ne constitue pas l'intégration au Dashboard.
Le formulaire de réception n'est qu'un composant aval de ce module.
ADM-003 / Meta Ads constitue un sujet distinct, suspendu dans ce travail.
Pilotage et agents internes restent centralisés dans cette conversation, sans messages à transporter par le Gérant.

## Faisabilité vérifiée dans les références officielles

- [Advertiser API — Overview](https://developers.openai.com/ads/api-overview) : API prévue pour gérer campagnes, groupes, publicités, conversions et rapports depuis sa propre application.
- [Advertiser API — Quickstart](https://developers.openai.com/ads/api-quickstart) : compte publicitaire et clé Ads dédiés, vérification du compte, téléversement de créations, campagnes/groupes/publicités et suivi.
- Hôte API : https://api.ads.openai.com/v1.
- Authentification : clé Advertiser API conservée sur le serveur, distincte de OPENAI_API_KEY des modèles.
- Variable serveur retenue : OPENAI_ADS_API_KEY.
- Aucune clé Ads accessible/configurée n'a été vérifiée à cette étape.

## Architecture retenue

| Élément | Responsabilité |
|---|---|
| Marketing Dashboard | Navigation et identité générale de l'application existante |
| Facebook Ads | Fonctionnement existant, conservé dans ses contrôleurs dédiés |
| ChatGPT Ads | Compte, campagnes, créations, résultats et recommandations propres à OpenAI |
| Backend /api/chatgpt-ads | Auth existante + client serveur Advertiser API ; aucun secret navigateur |
| Conversions | Réception des demandes et provenance conservées |
| Notifications SMS | Alerte interne après sauvegarde, sans passer un prospect à contacté |
| Assistant d'optimisation | Analyse/recommandations à distinguer des modifications effectivement appliquées |

Points d'insertion identifiés : frontend index.html, js/navigation.js, nouveau js/chatgpt-ads.js et style dédié ; backend routes/chatgpt-ads.js et services/chatgpt-ads-api.js.
Le client ChatGPT Ads ne réutilise pas services/facebook-api.js ni les identifiants Meta.
Un état non connecté doit être explicite ; aucune donnée de démonstration ne doit passer pour une campagne réelle.

## Lots d'exécution

1. Connexion et lecture : identité Marketing Dashboard, module ChatGPT Ads, état de configuration réel, lecture compte/campagnes/résultats lorsque la clé est disponible.
2. Gestion : préparation des campagnes/groupes/créations, validation et rattachement au bon compte, retour des erreurs et journal des changements.
3. Mesure : provenance, réception des demandes et suivi de conversion OpenAI à vérifier sur compte réel.
4. Optimisation : lecture des résultats, recommandations, puis actions explicites et traçables.
5. Mise en service : tests réels, budget défini par le Gérant, activation publicitaire distincte du déploiement technique.

Aucune activation de campagne ni dépense publicitaire n'est autorisée par une simple connexion ou par les tests du module.
Aucune limite ou stratégie de ciblage ne doit être inventée ; utiliser la documentation officielle et l'éligibilité du compte.

## État des travaux déjà préparés

- CODE-045 : socle réception/Conversions livré, diagnostic production version code-045.
- CODE-046 : maquette seulement avant cette reprise.
- Formulaire réel fusionné en PR #3 backend : https://github.com/seoettia-collab/facebook-ads-backend/pull/3
- HEAD candidat : 91aaafafa181f86e8c1d22f1b79f44461e686a0d.
- Six choix exacts : Cuisine, Salle de bain, Peinture, Rénovation, Extension, Maison ; prénom, téléphone, code postal, précision facultative.
- Transaction, provenance, reçu/UUID persistants, compatibilité anciens UUID, pas de passage automatique à contacté.
- 182 tests Node 20.11.1 réussis par l'agent ; les 9 tests spécifiques ont aussi été relancés par le pilote : PASS.
- Fusion main 9059fa7f1a901b1931f4b76f5e023fa4bc2e2a98 ; Render dep-dbgh2ooae00c73dronrg live le 27/10/2026 à 21:03:13 UTC.
- Lecture production GET /devis-travaux : HTTP 200, six choix exacts et CSP vérifiés.
- QA visuelle non effectuée : navigateur headless local indisponible, téléchargement échoué.
- Diagnostic production : alert_configured=false, motif sender_matches_recipient (expéditeur et destinataire identiques). Aucun SMS réel de recette envoyé et aucun destinataire modifié. La réception SMS et la recette bout en bout ne sont pas validées.
- Le nouvel objectif rétablit le SMS malgré son abandon dans l'ancienne mission CODE-046 ; aucun n8n.
- Sous-domaine devis.mistralpro-reno.fr non configuré dans cette reprise.

## Compte OpenAI

Le Gérant a précisé qu'aucun compte publicitaire n'avait encore été créé. Le plugin installé ne constituait donc pas un compte.
Après approbation du logo exact et Accept directement en réponse au récapitulatif avec Conditions publicitaires et Politique de confidentialité, un unique compte Mistral Pro Reno a été créé avec succès le 27/10/2026.
Paramètres : Mistral Pro Reno, https://www.mistralpro-reno.fr/, France, EUR, Europe/Paris, entreprise faisant sa propre publicité ; nouvelle entreprise propriétaire Mistral Pro Reno.
Logo approuvé puis téléversé avec succès : https://www.mistralpro-reno.fr/images/apple-touch-icon.png ; le fichier retourné a été utilisé une seule fois pour la création.
Résultat officiel : created, accès ready. Au contrôle du 28/10/2026 après confirmation du Gérant : compte active, logo présent, revue approved, facturation self_serve_card complete, recommended_next_step done. Aucune action de configuration de facturation supplémentaire n'est requise. L'activation du compte ne prouve pas l'éligibilité à diffuser.
Le formulaire officiel sécurisé de configuration de la facturation a été appelé une fois. Aucune donnée de carte collectée dans la conversation, aucun moyen de paiement enregistré par le pilote.
Le Gérant a configuré la clé Advertiser API dans Render ; l'accès administrateur dédié a été configuré par le pilote. Le raccordement natif est confirmé par une lecture réelle réussie du bon compte depuis le backend. Aucune valeur secrète dans ce document.
Aucune campagne créée ou activée, aucun budget engagé. Aucun nouvel essai de création de compte ne doit être effectué : réutiliser le compte créé.

## Critère d'achèvement

Le module est opérationnel uniquement quand le compte réel est identifié par la clé Ads, les lectures sont vérifiées et les commandes prévues réalisent les actions annoncées avec readback.
Ni le plugin installé, ni une maquette, ni un formulaire seul ne suffisent.

## Livraison native vérifiée le 27/10/2026

- Backend PR #4 fusionnée : https://github.com/seoettia-collab/facebook-ads-backend/pull/4 ; tête relue 23c08595e8da4769386dec230f56430655ad469f, merge main 3f1b711498c0beaef6c9dfe7b80083f9f87664be.
- Render dep-dbgh6068bjmc73d8ikpg live à 21:10:42 UTC sur ce commit.
- Frontend PR #1 fusionnée : https://github.com/seoettia-collab/facebook-ads-frontend/pull/1 ; tête relue 1393dafdaed7843ca428306cc714b7e7b6a4c5ae, merge main dc881198bf9c760a4f5dfc0dfe37ea43ea30df12.
- Netlify production 6ae113633eb1524fb042b75d ready, publié à 21:11:10 UTC sur ce commit.
- URL : https://mistral-fb-ads-dashboard.netlify.app ; identité Marketing Dashboard, navigation ChatGPT Ads distincte de Meta Ads.
- GET des nouveaux JS/CSS : HTTP200, contenu identique aux fichiers relus. HTML et navigation publiés contrôlés ; Netlify normalise un lien existant vers /leads-deleted et les fins de fichiers, sans altérer le nouveau module.
- Revue indépendante sécurité et correctif des journées terminées/fuseaux PASS. Défaut initial UTC/navigateur corrigé ; horloge de reporting fondée sur account.timezone, Paris/Los Angeles/DST/changement de fuseau et pagination couverts.
- Tests Node20.11.1 : 188 backend natif, 74 frontend, 197 backend assemblé avec formulaire, tous PASS en environnement isolé. Le pilote a aussi relancé les 15 tests natifs backend et 6 frontend, puis les 188 backend avec DATA_DIR temporaire : PASS.
- Une première commande complète du pilote sans DATA_DIR isolé a échoué sur deux tests anciens ; relancée avec la configuration de recette attendue, elle passe. Aucun code Meta modifié pour ces tests.
- QA visuelle navigateur non effectuée ; aucune prétention de validation visuelle ni de recette publicitaire réelle.

### Contrôle API en production

- GET /api/chatgpt-ads/status sans clé Dashboard : HTTP401.
- Même statut avec auth Dashboard : HTTP200, admin_configured=false, ads_key_configured=false, connected=false, account_verified=false, read_only=true, writes_enabled=false.
- GET /api/chatgpt-ads/account avec auth Dashboard seule : HTTP503 admin_not_configured ; aucun appel publicitaire authentifié effectué.
- La clé Advertiser API et le secret administrateur dédié ne sont ni fournis ni générés par cette livraison. Aucun secret n'est ajouté au dépôt ou au frontend.

### Achèvement restant

Ce lot livre le module natif de connexion/lecture et le formulaire hébergé. Il ne finalise pas l'objectif complet de pilotage publicitaire.
Le compte OpenAI Ads a été créé ; facturation et revue sont terminées. La clé Advertiser API et l'accès administrateur sont configurés ; les lectures réelles du bon compte, des campagnes et des résultats ont été vérifiées avec succès le 28/10/2026.
Les commandes de préparation/création/lancement et modification/optimisation ne sont pas implémentées dans ce premier lot. Les boutons restent désactivés même après connexion ; leur activation demande une livraison technique distincte avec droits, proposition explicite, budget approuvé, idempotence, journal et relecture.
Le suivi de conversion OpenAI, la recette demande → Conversions → SMS reçu et le sous-domaine restent non validés. L'alerte est explicitement bloquée par sender_matches_recipient ; aucun numéro destinataire ne doit être deviné.
Un compte créé après acceptation explicite des conditions ; aucune campagne créée, aucune diffusion activée, aucun budget engagé et aucun SMS de recette réel envoyé.

## Reprise du 28/10/2026 — raccordement

Paiement confirmé complete par get_onboarding_status après « fait » du Gérant. Aucun nouveau formulaire de carte à proposer. Le compte est approuvé ; ne pas confondre cette configuration achevée avec une campagne prête à diffuser.
Le catalogue courant du plugin ne fournit pas d'action de création/récupération de clé Advertiser API. Recours aux réglages officiels du compte pour le raccordement natif ; la session navigateur de travail est déconnectée et affiche la connexion OpenAI. Aucune clé créée/configurée, aucun secret déplacé ni campagne activée à cette étape.

## Raccordement serveur — clé créée côté Gérant

Le Gérant confirme avoir créé la clé Advertiser API sous le nom Marketing Dashboard. Sa valeur n'a pas été transmise dans la conversation et ne doit pas l'être.
Le contrôle du backend avant configuration confirme admin_configured=false et ads_key_configured=false.
MARKETING_ADMIN_TOKEN a été généré aléatoirement (64 caractères) et enregistré via le mécanisme secret Render, exclusivement sur le service existant mistral-pro-reno-backend, sans remplacer les autres variables. Aucune valeur dans ce rapport, le dépôt ou le frontend.
La sélection Render est le seul espace retourné, Joseph's workspace, dont l'identifiant correspond au propriétaire déjà vérifié du service existant ; même cible technique autorisée, aucun nouveau service.
Render confirme la mise à jour et le déploiement API dep-dbgoq4m7bikc73b7153g live le 28/10/2026 à 06:51:12 heure de Paris. Contrôle production HTTP200 : admin_configured=true, ads_key_configured=false, connected=false, state=admin_access_required. Accès administrateur configuré ; clé Ads toujours absente.
OPENAI_ADS_API_KEY a été renseignée directement par le Gérant dans Environment du même service Render, puis déployée. Aucun transport de la clé via chat, capture ou fichier partagé.
Le raccordement sera vérifié par GET /ad_account depuis le backend après disponibilité de la clé. Un statut configuré ne suffira pas à affirmer la connexion réussie.

## Raccordement natif confirmé — 28/10/2026

Le déploiement manuel Render dep-dbgos8gn74is73d22ec0 est live, commit 3f1b711498c0beaef6c9dfe7b80083f9f87664be. Le contrôle de configuration retourne admin_configured=true et ads_key_configured=true.
Une lecture serveur authentifiée de /api/chatgpt-ads/account retourne HTTP200 success=true ; le compte retourné correspond exactement au compte Mistral Pro Reno créé dans ce flux (comparaison d'identifiant interne réussie). Nom Mistral Pro Reno, devise EUR, fuseau Europe/Paris, review_status approved.
/api/chatgpt-ads/campaigns et /api/chatgpt-ads/insights retournent HTTP200 success=true, aucune ligne, has_more=false. Ces retours vides ne constituent ni une panne ni des résultats de performance nuls : aucune campagne n'est encore présente.
Le code administrateur a été fourni au processus de contrôle via une entrée confidentielle sans écho ; aucune clé Ads lue ou affichée. Les traces de recette contiennent seulement les états et résultats autorisés.
Dans l'interface, l'utilisateur doit saisir le code administrateur Marketing (valeur MARKETING_ADMIN_TOKEN conservée dans Render), et non la clé publicitaire. Le code n'est conservé qu'en mémoire du navigateur ; la clé Ads reste serveur.
La connexion/lecture native est maintenant opérationnelle. Les commandes de lancement et d'optimisation restent non implémentées et désactivées ; le suivi de conversion, le parcours SMS réel et le sous-domaine restent ouverts. Aucune création/activation de campagne ni dépense publicitaire effectuée.

## Conversions — filtre du formulaire livré le 28/10/2026

Décision du Gérant : gérer tous les leads dans Conversions / Leads, avec filtrage du formulaire ; l'onglet ChatGPT Ads reste dédié au pilotage publicitaire.
Le menu Formulaire propose désormais Tous les formulaires, Devis — ChatGPT Ads (déclaré), Devis — site (toutes origines), puis les formulaires existants. Les options site restent disponibles même sans premier lead ou sans liste Meta.
Le filtrage des demandes site consulte site_requests sur la fiche commune. Une fiche créée initialement via Meta reste sélectionnable si une demande ChatGPT Ads lui a ensuite été rattachée ; une seule ligne est conservée, sans modifier form_id, statut, historique ou compteurs de contact. Le filtre ChatGPT correspond à l'origine déclarée, jamais à une attribution OpenAI prouvée.
La sélection reste conservée lors des rafraîchissements lorsqu'elle est encore disponible. Les filtres de catégorie, recherche et origine continuent de se combiner. Noms de formulaires rendus via textContent.
Frontend PR #2 : https://github.com/seoettia-collab/facebook-ads-frontend/pull/2 ; tête 3c14eb6b8785361161ae976038a7a08a8115757b, merge main 5ddeef726daf225c80d59af31b40bbd6bef29c8d.
Netlify production 6ae193e7eeebebc84993ab0d ready, publié à 07:19:28 heure de Paris sur ce commit. Contrôle HTTP200 du JS servi : nouveaux choix, filtre sur historique et conservation de sélection présents.
78 tests frontend PASS sous Node24.22.1, dont 4 nouveaux, revue indépendante GO et readback GitHub exact. Ancien binaire local Node20 indisponible ; aucune affirmation de tests Node20 pour ce lot.
Aucun appel API Meta, aucune demande de production créée, aucune mutation de prospect et aucun SMS envoyé. Recette visuelle navigateur non effectuée. La recette réelle formulaire → fiche Conversions → alerte et le suivi de conversion OpenAI restent à valider.

## Mini-application mobile livrée le 28/10/2026

Demande du Gérant : une mini-version installable sur téléphone avec notifications. URL de production : https://mistral-fb-ads-dashboard.netlify.app/mobile/ ; application Web installable (PWA), même backend et mêmes fiches Conversions / Leads, aucune base parallèle.
Consultation, recherche/filtres et détail des demandes ; appels et SMS réutilisent les mécanismes existants avec confirmation explicite et historique lié à l'identifiant exact du prospect. Une alerte push ne passe pas un prospect à contacté.
Notifications génériques sans nom ni coordonnées ; abonnement et autorisation du navigateur uniquement sur action du téléphone. Bouton de test réservé au téléphone connecté. Installation Android depuis Chrome, puis Réglages > Activer les notifications > Tester sur ce téléphone.

### Livraison et contrôles

- Backend PR #5 : https://github.com/seoettia-collab/facebook-ads-backend/pull/5 ; tête relue 3399e8a183912c6c11f36a2c644ed0ab8500bfa2 ; merge main a9a467fda786d383583c12ff74225cb94d1896f7.
- Render dep-dbgpon67bikc73b91vtg live à 06:56:33 UTC sur ce commit, après configuration serveur.
- Frontend PR #3 : https://github.com/seoettia-collab/facebook-ads-frontend/pull/3 ; tête relue 1402c6f87da3569f80b79f0fcfa512c0b4154b9c ; merge main ee4fe49e21a4f95e5a1709b7d6d3f895339beae2.
- Netlify 6ae19c2784808919855d71c4 ready et publié à 06:54:37 UTC sur ce commit.
- 18 tests mobiles backend PASS sous Node20.11.1 ; 17 tests mobiles frontend PASS, dont 8 tests du contrôleur complet dans VM. Assemblage frontend avec les tests existants : 95/95 PASS. Aucune affirmation de suite backend complète pour ce lot.
- Revue indépendante : corrections de l'historique (aucune correspondance approximative par prénom), du périmètre du proxy, de l'expiration/révocation et de la déduplication push ; GO sur les têtes relues.
- Production : page, scripts, manifeste, service worker et PNG192/512 HTTP200 ; dimensions exactes, CSP et périmètre /mobile/ vérifiés. Écran de connexion observé dans le navigateur de travail ; aucune session graphique ouverte sur les vraies fiches.
- Recette authentifiée via /mobile-api : connexion200, cookie Secure/HttpOnly/SameSite=Strict/Path=/mobile-api/, session200, config200 push configured=true et enabled=true, fonctionnalités SMS/call disponibles ; fiche fictive inexistante404 ; mutation sans CSRF403 ; déconnexion200. Aucun vrai prospect consulté/modifié ni aucun message envoyé pour cette recette.

### Configuration et limites

MOBILE_APP_ORIGIN pointe exactement vers le domaine Netlify existant. MOBILE_PUSH_ENABLED et les clés VAPID sont configurés dans Render uniquement. MARKETING_ADMIN_TOKEN a été renouvelé une fois pour la première installation mobile ; utiliser la valeur actuelle dans Render pour connecter le téléphone et accéder à l'administration Marketing. Aucune valeur secrète dans ce document, le code frontend ou la conversation.
Sessions opaques persistantes, cookie HttpOnly, CSRF et contrôle d'origine ; données privées et requêtes API exclues du cache du service worker. Notifications avec file persistante et reprises bornées, suppression des abonnements expirés ; aucune reprise des anciens prospects à l'activation.
La réception effective sur Android et l'installation sur le téléphone du Gérant restent à confirmer par son autorisation locale et le bouton de test. Les tests serveur ne prouvent pas une notification reçue. Aucun SMS, appel ou push réel de recette n'a été envoyé.
Les limites déjà ouvertes restent distinctes : alerte SMS manager sender_matches_recipient, suivi de conversion OpenAI, sous-domaine devis et commandes publicitaires de lancement/optimisation.

### Complément installation Android

Frontend PR #4 : https://github.com/seoettia-collab/facebook-ads-frontend/pull/4 ; tête corrigée et relue cec32c11184b99f8000b0ef81fa6cd992533da0f ; merge main f909fed28700ce7686f51d38774bb0fd1b2c5f96. Type MIME du manifeste explicitement fixé à application/manifest+json dans les deux configurations Netlify.
Le premier candidat de ce complément contenait deux assertions mal sérialisées dans GitHub ; non fusionné. Correction par includes et exécution du fichier exact relu : syntaxe valide et 10/10 tests PASS Node20.11.1 (blob exécuté identique au distant).

Netlify complément 6ae19e754a71bd2a2e736fcc ready et publié à 07:04:27 UTC sur f909fed28700ce7686f51d38774bb0fd1b2c5f96 ; GET production manifeste HTTP200 et Content-Type application/manifest+json; charset=utf-8 confirmés.

## Correctif connexion mobile — 28/10/2026

Capture du Gérant : message Session expirée sur écran de connexion. Distinction ajoutée entre première visite sans cookie (invitation neutre), code refusé (Code incorrect) et expiration après session connue. Aucun changement des droits ou secrets. Cache shell version v2.
Frontend PR #5 https://github.com/seoettia-collab/facebook-ads-frontend/pull/5 ; tête 6eb8eb4e9d7a419ef062a0fa133608ae54feb85d ; merge 5759dfc53f86497abd20841c8190f7ce0500e850.
Copie exacte relue depuis GitHub : syntaxe valide, 11/11 tests du contrôleur PASS Node20.11.1, relancés par le pilote.
Netlify 6ae1a07186bbd5a9dfeb6d5e ready, publié 2026-10-28T07:12:55.701Z sur 5759dfc53f86497abd20841c8190f7ce0500e850. Accueil vérifié dans le navigateur : Saisissez le code administrateur pour connecter ce téléphone, bouton actif, sans fausse alerte d'expiration. Aucun code erroné soumis en production, aucun vrai prospect ni aucune communication de recette.

## Connexion mobile e-mail et mot de passe — 28/10/2026

Décision explicite du Gérant : connexion par e-mail avec mot de passe. Aucun mot de passe à transmettre dans la conversation. Création initiale depuis Réglages sur son téléphone déjà connecté ; propriétaire unique ricardoettiadocuments@gmail.com validé serveur, aucune adresse propriétaire embarquée dans le frontend public.
Login principal e-mail/mot de passe ; accès de secours code administrateur séparé. Mot de passe de 12 à 128 caractères, confirmation dans le téléphone. Stockage serveur scrypt versionné, sel aléatoire de 16 octets, N32768/r8/p1, dérivation asynchrone bornée à deux opérations ; aucun mot de passe en clair ni dans le cache, les URL ou les journaux.
Changement exige le mot de passe actuel. L'oubli utilise uniquement un accès de secours fraîchement authentifié, autorisation serveur explicite valable cinq minutes et consommée après usage ; aucun mail de réinitialisation annoncé ou envoyé.
Première activation et rotation conservent session, CSRF, abonnement et outbox du téléphone courant ; les autres sessions/appareils sont révoqués. Identifiants enregistrés dans la base SQLite persistante commune. Contrôle d'origine, CSRF et limites d'essais persistantes maintenus, protection contre une connexion ancien mot de passe en vol après rotation.
Aucun token administrateur, VAPID, numéro de téléphone ni autre variable serveur modifié. Aucun mot de passe réel créé par les agents : définition personnelle restant à effectuer dans l'application.
Backend PR #6 https://github.com/seoettia-collab/facebook-ads-backend/pull/6 ; tête fdb2be3befad65035ebf897524638ed2018dae92 ; merge main 2b239265180a8ee4f5c8c8fc90b1b7a55ad3c606.
Frontend PR #6 https://github.com/seoettia-collab/facebook-ads-frontend/pull/6 ; tête 7ffefe7a0766b01657370a0ebd1e01f14f7e9adb.
Revue de sécurité indépendante GO sur les têtes exactes et readback des blobs de production conforme. 26/26 tests mobiles backend et 27/27 frontend PASS sous Node20.11.1, relancés par le pilote. Couverture du premier setup sur appareil déjà abonné avec outbox, de la rotation, de la récupération expirée/consommée, de la concurrence et de la réouverture SQLite.

Déploiement backend Render dep-dbgr0hvb9u1s7397ha80 live le 28/10/2026 à 09:21:35 heure de Paris sur 2b239265180a8ee4f5c8c8fc90b1b7a55ad3c606, avant fusion du frontend.
Merge frontend main 8e1cf30c751390ae8d809e78ad83125e287a9803 ; Netlify 6ae1b0a245793a87667817f7 ready, publié le 28/10/2026 à 09:22:01 heure de Paris sur ce commit.
Contrôle production /mobile-api/session sans session : HTTP401 session_required, réponse JSON no-store, aucune identité privée exposée. Écran public observé dans le navigateur : champs Email et Mot de passe, accès de secours séparé, invitation neutre et bouton de connexion disponible.
Pas de mot de passe réel défini ni de compte publicitaire modifié. L'activation personnelle puis une connexion réelle avec ce mot de passe restent à effectuer par le Gérant sur son téléphone. Aucune nouvelle notification, aucun SMS ou appel réel envoyé pour ce lot.

## Adaptation iPhone/iPad — 28/10/2026

Demande du Gérant : version iOS. Même application Web installable /mobile/, même compte et mêmes fiches ; aucun projet natif/App Store ni nouvelle infrastructure.
Aide Safari visible avant connexion et dans Réglages : Partager > Sur l'écran d'accueil > Ajouter, avec Ouvrir comme app web si l'option existe. Mode installé reconnu via display-mode:standalone ou navigator.standalone ; iPadOS identifié pour l'aide aussi lorsqu'il expose MacIntel tactile.
Notifications Apple proposées seulement depuis l'application installée ; disponibilité réelle toujours déterminée par les API. Aucun appel automatique à la permission. Indication iOS/iPadOS16.4 minimum. Android, accès, secrets, backend et CSS safe-area existants conservés. Shell version4.
Références officielles relues : https://webkit.org/blog/13878/ et https://support.apple.com/fr-fr/guide/iphone/iphea86e5236/ios . Le serveur acceptait déjà l'hôte web.push.apple.com ; pas de changement d'allowlist.
Frontend PR #7 https://github.com/seoettia-collab/facebook-ads-frontend/pull/7 ; tête 75f773d436877482427b73b00296d5584e68e806 ; merge 79a6a884e67cf1b512f03dd385e10b125faf7b7a.
Readback exact des cinq fichiers modifiés, app.js blob cf376f1b35ae65730ed3b16afec3938fecc1f560 identique à la copie testée. 32/32 tests mobiles frontend PASS Node20.11.1, relancés par le pilote, dont parcours iPhone navigateur/installé, iPadOS et garde des permissions.
Netlify 6ae1b33b56b4fc180f4ac64d ready, publié 2026-10-28T08:33:04.892Z sur 79a6a884e67cf1b512f03dd385e10b125faf7b7a. Recette iPhone physique et notification reçue non effectuées ; à confirmer sur le téléphone après installation et autorisation manuelles. Aucun push, SMS ou appel réel envoyé pour ce lot.

## Campagne initiale — proposition en attente d'autorisation de dépense

Le Gérant considère le sujet téléphone résolu. Visuel et texte validés en conversation le 28/10/2026 : adaptation carrée sans surimpressions de son affiche avant/après, image générée de maison avec extension (exec-b5e0bb0a-3bc6-4307-82dd-b7ec5d8bf58c.png). PNG statique1254x1254,2.9Mo ; contrôles sémantiques passés. Source initiale fournie : image(3).png, projection illustrative. Ne pas revenir aux précédents visuels de salon ou artisans.
Titre exact approuvé : Extensions et rénovation énergétique.
Corps exact approuvé : Île-de-France. Devis gratuit, réponse sous 48 h. Projection illustrative générée par IA.
Compte relu : Mistral Pro Reno, Admin, EUR, Europe/Paris, revue approved, facturation complete, identité not_required. Aucune campagne et aucun événement de conversion configuré à la lecture.
Proposition : une campagne standard, un groupe, une annonce, tous actifs après accord ; noms campagne et annonce Extensions et rénovation énergétique — IDF ; objectif clics, enchères Maximize Clicks, facturation par clic, budget quotidien moyen15EUR, test7jours avec fin explicite après activation, toutes plateformes web/iOS/Android, aucun contexte supplémentaire ni audience personnalisée. Région Île-de-France trouvée par lookup FR-IDF ; ne pas élargir à toute la France.
Destination exacte : https://facebook-ads-backend-s20a.onrender.com/devis-travaux?utm_source=chatgpt&utm_medium=paid&utm_campaign=extensions_renovation_energetique_idf
GET200 et sixchoix vérifiés, provenance UTM reconnue par le backend comme ChatGPT Ads déclaré et circuit Conversions existant. Aucun test sur vrai prospect ni SMS envoyé. Suivi de conversion OpenAI toujours non configuré : pas d'optimisation vers les demandes de devis à ce stade.
Preview_ad appelé sur le bon compte avec fichier/copie/destination ; résultat ready_to_render, ne prouve pas affichage effectif ni diffusion.
Documentation officielle actuelle minimumEUR15/jour et dépensejusqu'au double surunejournée : https://help.openai.com/en/articles/20001210-creating-campaigns-for-chatgpt-ads et https://help.openai.com/en/articles/20001413-daily-budgets .
Aucune autorisation complète de dépense encore reçue : les oui précédents valident seulement l'adaptation puis le visuel et le texte. Aucun upload publicitaire, aucune campagne/groupe/annonce créé, aucune dépense. Prochaineétape : approbation de l'ensemble du récapitulatif puis upload unique, créationcampagne, grouperelié, annonce et readback. Conserver idempotence et toutes les réussites ; ne pas recommencer après résultat ambigu.

## Formulaire public clair et compact — 28/10/2026

Demande du Gérant sur /devis-travaux : retirer le fond noir, supprimer le numéro de téléphone en haut et la phrase sous Parlons de votre projet, compacter la présentation.
Fond gris très clair, carte/champs blancs, texte foncé lisible et bouton bleu nuit ; titre ramené à27/30px, disposition centrée, marges et hauteur des contrôles réduites avec cibles tactiles d'au moins44px. Numéro et texte d'en-tête supprimés ; le champ téléphone à renseigner et le téléphone proposé après confirmation restent présents.
Backend PR #7 https://github.com/seoettia-collab/facebook-ads-backend/pull/7 ; tête eafaa2cc28a36e8830d2de5f636a13866763634e ; merge f0958e51dd7b5e35e56a387829d2ed29508a7019.
Deux fichiers uniquement : public/site-lead-form/index.html et form.css. Readback GitHub exact et blobs locaux identiques. Script, six services, champs, validation, UUID/provenance, sauvegarde et alertes inchangés. 9/9 tests existants du formulaire PASS Node20.11.1, aucune nouvelle suite cosmétique ajoutée.
Aucune soumission sur vrai prospect, aucun SMS/appel/push de recette. Aucune modification ou autorisation de campagne : le budget publicitaire proposé reste en attente de confirmation distincte.

Render dep-dbh4akss728c73c0q990 live sur f0958e51dd7b5e35e56a387829d2ed29508a7019, terminé à19:57:13 heure de Paris. Recette visuelle sur l'URL de campagne avec paramètres UTM : fond clair et carte blanche observés, titre sur une ligne, coordonnées compactes, numéro d'en-tête et phrase supprimés. Les six choix et les quatre champs attendus restent accessibles ; aucune soumission effectuée.
URL de recette : https://facebook-ads-backend-s20a.onrender.com/devis-travaux?utm_source=chatgpt&utm_medium=paid&utm_campaign=extensions_renovation_energetique_idf

## Intégration du ZIP Modernist — 28/10/2026

Fichier fourni par le Gérant : Modernist forme gpt ads.zip. Trois fichiers : index.html, form.css et apercu.html. Les deux fichiers de production ont été intégrés ; apercu.html exclu car démo à fausses cases et contexte vide. form.js relu inchangé, six choix/champs/anti-robot/placeholders et raccordement existant conservés.
La précision suivante du Gérant confirme les ajouts du design : téléphone cliquable d'en-tête, mentions légales fournies et Archivo. Elle remplace donc la suppression précédente du numéro en haut. En-tête et confirmation réutilisent la même variable serveur ; aucun changement du numéro dans business-context.
Archivo originale Google Fonts auto-hébergée, WOFF2 latin variable400–700 de34928octets et licence OFL conservée. Font-src 'self' ajouté au CSP ; aucune ressource Google externe à la visite, aucun script inline ni dataURI autorisé. Coche rendue en CSS simple. Les mentions légales sont celles fournies par le Gérant, sans vérification juridique prétendue.
Backend PR #8 https://github.com/seoettia-collab/facebook-ads-backend/pull/8 ; tête a4a1cd7e6b652aa9f37cf9ed845ef2be5d0d4a71 ; merge fda44a8dd87845b8b52ea9932f66ad989d40e814.
Readback exact des cinq fichiers, binaire font relu ; 9/9 tests formulaire existants PASS et fixture HTTP routefont/MIME/CSP/substitution des deux liens téléphone vérifiés. Aucun vrai prospect consulté ni demande de production soumise pour ces tests.
Render dep-dbh4q9l9el5s73dgt930 live sur ce merge, terminé à20:31:08 heure de Paris. Recette visuelle réelle : design Modernist, titre Votre devis gratuit, en-tête rendu, six cases, détail facultatif et coordonnées présents. Aucune soumission effectuée dans cette recette visuelle ; arrivée réelle dans Conversions et SMS restent à valider distinctement.

## Nouveau visuel avec textes fourni par le Gérant

visuel-prospection-v2.png fourni et souhait explicite de conserver tous les textes. PNG statique1080x1080,2209954octets, logo et CTA graphiques, téléphone0755188937.
Correction de la réponse antérieure : la page officielle Creating ads for ChatGPT Ads recommande des images simples et lisibles mais n'énonce pas d'interdiction générale de tous textes incrustés. Ne pas présenter une préférence du workflow comme une politique publicitaire. Revue OpenAI toujours nécessaire. https://help.openai.com/en/articles/20001212-creating-ads-for-chatgpt-ads
Conserver la mention projection illustrative dans le texte d'annonce. Discordance à résoudre avant diffusion :0755188937 sur visuel et0609109069 dans le formulaire/variable serveur. Aucun des deux numéros modifié automatiquement. Le nouveau visuel remplace la proposition précédente si le Gérant le confirme pour le lancement ; l'accord complet budget/création reste non reçu. Aucun upload/création publicitaire effectué.

## Numéro public confirmé par le Gérant

Le 28/10/2026, réponse explicite : 06 09 10 90 69. Ce numéro est retenu pour le formulaire et le visuel publicitaire ; il remplace le0755188937 de l'image transmise. Le formulaire utilisait déjà la bonne variable serveur, aucun changement de configuration ni de destinataire d'alerte.
Visuel fourni avec tous textes conservés à la demande du Gérant ; correction de la case téléphone via outil imagegen. Résultat exec-7b3121e0-31a6-4954-a717-4f6a06eb7036.png, numéro0609109069 vérifié visuellement. Cette décision ne valide ni budget ni création publicitaire ; aucun upload Ads ou activation effectué.

## Exécution autorisée et blocage de destination — 28/10/2026

Le Gérant confirme explicitement tout validé et demande de lancer la campagne : autorisation du récapitulatif15EUR/jour moyen,7jours,IDF,objectifclics,tous actifs. Ensuite correction explicite du texte : retirer Projection illustrative générée par IA. Corps final : Île-de-France. Devis gratuit, réponse sous 48 h.
Image finale : exec-7b3121e0-31a6-4954-a717-4f6a06eb7036.png, tous textes et0609109069. Ne pas utiliser image(5).png : c'est seulement une capture313x15 de la phrase à retirer, pas une créationpublicitaire.
Upload réussi UNE fois : adsfile:file_00000000c31881f699aa97a2dc0e8457. Réutiliser ce jeton dans le compte Mistral Pro Reno, ne pas retéléverser.
Campagne créée : cmpn_4d68cd5564ac8194853265ac04080d0d, nom Extensions et rénovation énergétique — IDF, status active, budget daily_spend_limit_micros15000000, objectifclics,billingclick, région IDF2000424, allplatforms, fin1793821252 (04/11/2026 à20:40 Paris). Clé d'idempotence edb0511d-4fdf-4848-adea-911adb859db0.
Groupe créé : adgrp_d11428a43cec8194a2517730ee1df362, Maximize Clicks/billingclick, statusactive, context_hints vide. Clé d'idempotence 47dff638-e11d-4cb2-8996-80a0c5a73ab5.
Créationannonce ÉCHOUÉE explicitement403 : Account verification must be approved before using a different ad URL. Clé de la tentative 23730839-ab08-4e63-9cff-1218bab8ee03. Aucun identifiantannonce retourné, annonce NON créée. Ne recréer ni campagne ni groupe.
Destinationrefusée : https://facebook-ads-backend-s20a.onrender.com/devis-travaux?utm_source=chatgpt&utm_medium=paid&utm_campaign=extensions_renovation_energetique_idf
Compte relu justeavant : actif,revueapprouvée,facturationcomplete. Le résultatne lève pas la restriction spécifique de destination.
Prochainepréparation autorisée : rendre le même formulaire accessible sous le domaine officiel www.mistralpro-reno.fr avec endpoint réception mêmeorigine/proxy et Conversionspréservé ; vérifier l'hébergementréel avant de coder. Destinationcorrigée à présenter au Gérant pour autoriser la reprise après cetéchec, sansdupliquercréationsréussies. Nouveaupayloadannonce nécessitera nouvelleclé unefoisvalidé.

## Lancement achevé — 28/10/2026

Après explication du blocage de destination, le Gérant valide explicitement la méthode : cette façon de faire, je valide ; terminer et lancer. Correction d'URL autorisée, même visuel et budget/objectifs conservés.
Site officiel hébergé sur OVH, dépôt seoettia-collab/MistralPro-Reno. PR #2 https://github.com/seoettia-collab/MistralPro-Reno/pull/2 fusionnée : tête c436f7e826961d47208d022f94efc3d4c6ee7c9b, main17bdb8bfe084ce6187ba97b1fa38fca010167eae. Retrait uniquement de l'ancienne301/devis-travaux et ajout du formulaire statique sous/devis-travaux/ avec assets Archivo/OFL. Sourcebackendfda44..., HTMLrendu exclusivementpublic, copieJS ne diffère que par l'adresse explicite de l'intakeRender ; backendcanonical form.js inchangé. CSP limité au répertoire, destinationCORSfixe autorisée. Aucun PHP/proxy ni nouvelleinfra.8/8tests Node20PASS relancés par le pilote, readback9/9 et binairefontexact.
URL finale : https://www.mistralpro-reno.fr/devis-travaux/?utm_source=chatgpt&utm_medium=paid&utm_campaign=extensions_renovation_energetique_idf
Production vérifiée : HTTP200 reste sur www.mistralpro-reno.fr, formulaire réel/sixchoix/0609109069 observés dans le navigateur ; JS/CSS/font octets identiques aux fichiers relus ; OPTIONSintake avecOriginwww204+ACAOexact. AucunPOSTréel deprospect de recette.
Petitcorrectif PR #3 https://github.com/seoettia-collab/MistralPro-Reno/pull/3, tête f58d814ee75e5944717964c11ff771e4c534b922, merge84a79cb1b8691de14746b6a51be3257482e04585 : typagefontWOFF2 et cache no-store scoped. Contrôleproduction final : JS/CSS/font200, font/woff2 présent, un seulCache-Control:no-store. Publication réelle prouvéeparlesfichiersservis ; outilworkflow_runs n'a pas fourni d'exécution, ne pas inventer son statut.

### Objets Ads effectivement créés

Compte : adacct_6ae118526cb0819496790afcf4fdd3f2 Mistral Pro Reno, EUR/EuropeParis.
Upload UNIQUE adsfile:file_00000000c31881f699aa97a2dc0e8457 conservé et réutilisé.
Campagne cmpn_4d68cd5564ac8194853265ac04080d0d, groupe adgrp_d11428a43cec8194a2517730ee1df362 conservés après le premier403 ; aucune duplication.
Annonce créée avec succès ad_1fe19adb7c7481a3aba74e7afaa36d05, clé ba30ad79-b7de-4eae-9e4e-f031d1e18354, active. Titre Extensions et rénovation énergétique. Corps Île-de-France. Devis gratuit, réponse sous 48 h.. URL finaleci-dessus ; imagecopiéeupload avec tous textes et numéro0609109069, cadrageintégral x0/y0/width1/height1.
Le get_ad de contrôle confirme review_status approved après in_review initial. Aucun appel d'appel ou nouvelle modification publicitaire nécessaire.
Budget quotidien moyen15000000micros=15EUR, ciblage régionÎle-de-France, toutesplateformes, objectifclics, enchèresMaximizeClicks/facturationclick, fin1793821252 soit4novembre2026à20:40Paris. Ne pas prolonger, augmenter ou créer des variantes sansnouvelaccord.
Snapshot show_campaign_delivery detail complet, observed_at1793217419 : account_issuesvide, campagneactive delivery_statuseligible, issuesvides, readiness/low_bid/descendantscomplete, availabilitycomplete, aucune limitation. Aucun blocage retourné au contrôle.
La valeur spend0 du snapshot concerne sa fenêtre historique antérieure au lancement : elle ne prouve ni dépensecourantenulle ni premièresimpressions. Aucun résultat de performance postlancement affirmé. ConversioneventsOpenAI toujoursabsents, optimisationclicsseulement. Recette réelle prospectConversions/SMS toujours distincte etnonvalidée.

Liens retournés :
Campagne https://ads.openai.com/manage/campaigns?act=adacct_6ae118526cb0819496790afcf4fdd3f2&campaignIds=cmpn_4d68cd5564ac8194853265ac04080d0d
Annonce https://ads.openai.com/manage/ads?act=adacct_6ae118526cb0819496790afcf4fdd3f2&adIds=ad_1fe19adb7c7481a3aba74e7afaa36d05

## Connexion desktop ChatGPT Ads par session commune — 28/10/2026

Capture du Gérant image(6).png : ancien champ codeadministrateur et connexionnonvérifiée dans desktop alors que campagne créée et approuvée. Correction : loginemail/motdepasse existant du propriétaire et réutilisation automatique du cookieHttpOnly/mobile-api/session. Aucun secretadministrateur en JS ou header ; aucune nouvelle session si déjàvalide, aucun changement du motdepasse ou desabonnements mobiles.
Backend PR #9 https://github.com/seoettia-collab/facebook-ads-backend/pull/9 ; tête b37e37c1fbe8ed646f323e8bfee95e9776a89f76 ; merge 53f67a07076f7814d1bb7517e148252c82832c58. GETallowlist /api/mobile/chatgpt-ads/status,account,campaigns,insights derrièreauthsession ; réutiliseclientAdvertiserexistant, bornesqueries etaucunendpointd'écriture. Logique dates/fuseau/devises/paginationinchangée.
Render dep-dbh5cb4s728c739spcq0 live surcemerge à21:09:14Paris avant frontend.
Frontend PR #8 https://github.com/seoettia-collab/facebook-ads-frontend/pull/8 ; tête d20993aa2984ca550ba95ba52aaae81820ab41b3 ; merge 0788fe68a856f0f58584e1ce518f645bd6e9b8f6. HTMLetmodule remplacentcodeadmin paremail/password, actualisationautosession et lecturescampagnes aprèsvérification. Actionslancement/optimisationrestentdésactivéesdanscettevueenlectureseule.
Netlify 6ae2567dd7517a4624c0104e ready, publié à21:09:45Paris sur 0788fe68a856f0f58584e1ce518f645bd6e9b8f6.
Revue indépendante GO sur têtesexactes :48/48 testsbackend (26mobile,15clientAds,7nouveaux) et10/10frontendVM PASSNode20. Le pilote arejoué7nouveauxbackend et10frontend :PASS ; une premièrecommande avecancienrépertoirededépendances n'a pas trouvéexpress, relancée surledossierdedépendancescorrect puisPASS.
Production : routecampagnes via/mobile-api sanscookieHTTP401session_required/no-store, aucunedonnéecompagne exposée. RecettevisuelleduDashboard : ongletChatGPTAds afficheEmail/Motdepasse etinvitationneutre, plusdecodeRender. Aucuneauthentificationréelleavec motdepassepersonnel réaliséepar le pilote ; affichageauthentifié àconfirmer par le Gérant aprèsconnexion. Aucunprospectconsulté ni écritureAds/budget/notification pourcelot.

## Connexion mémorisée et notifications conservées — 29/10/2026

Demande du Gérant : supprimer les ressaisies de mots de passe et retrouver une ouverture automatique comme Facebook. Interprétation livrée : conserver une identification initiale par navigateur/appareil et réutiliser la session privée existante ; aucun accès public aux données Ads et aucun nouveau mot de passe par module.

Backend PR #10 https://github.com/seoettia-collab/facebook-ads-backend/pull/10 ; tête relue 2fca4e66553a4ca14bbf3466c6a9bb23f1ca04a5, merge main 3f622ed21a78c0808a2e33df736ab185e424a6fe. GET/session explicite renouvelle cookie et expiration serveur pour30jours ; les lectures de fond/push ne prolongent pas la session. Une session expirée, révoquée ou invalidée par rotation ne ressuscite pas. Login valide même navigateur conserve session/CSRF/abonnementpush. Pas de renouvellement des droits de récupération5minutes.
Render dep-dbhea37b9u1s739oq5fg live sur ce merge, terminé2026-10-29T06:18:54Z soit07:18:54Paris.

Frontend PR #9 https://github.com/seoettia-collab/facebook-ads-frontend/pull/9 ; tête relue a6640474f28943c47c7425c9c28b19fdf0a33ce7, merge main a4c9c95a853c9272d85d0ab52bd902e488f19368. Connexion restaurée automatiquement par cookie ; formulaire masqué si session valide, autoremplissage navigateur facilité sans stockageJS du motdepasse, email conservé en cas d’erreur sans emailprivé hardcodé. Déconnexion explicite POST/logout avec CSRF, purgeUI après succès ; échec réseau signalé. La déconnexion révoque aussi sessionmobile et notifications associées dans le même navigateur.
Netlify6ae2e5100ce473cb62a0335d ready, publié2026-10-29T06:18:01Z soit07:18:01Paris sur ce merge.
Revue indépendante GO aux deux têtesexactes, readback identique des six fichiers production/tests ;51backend+12frontend=63/63PASSNode20.11.1. Pilote relit diff production et relance12frontendPASSNode24. QApublique navigateur confirme nouveau texte connexionmémorisée ; pas de motdepassepersonnel saisi et pas de sessionpropriétaire réelle restaurée par le pilote. Les tests de restauration sont synthétiques. Aucun prospect lu ni SMS/appel/push envoyé.
Limites : session non transférée entre appareils/navigateurs ; premièreconnexion nécessaire si cookie absent. Commandes lancement/optimisation du module demeurent désactivées ; pas de changement publicitaire ni de budget dans ce lot.

## Accès direct ChatGPT Ads sans connexion supplémentaire — 29/10/2026

Instruction explicite du Gérant après capture image(7).png : brancher directement sans mot de passe dans le Dashboard, comme Meta. Cette décision remplace l’exigence de session propriétaire pour les QUATRE lectures ChatGPT Ads du desktop ; elle ne supprime ni l’authentification mobile ni les protections des prospects, et n’autorise aucune écriture publicitaire.

Backend PR #11 https://github.com/seoettia-collab/facebook-ads-backend/pull/11 ; tête relue53328fed7c0ff7eabf12265d16f8c2d99dc8f9b9 ; merge main1eec03658e9416143379c8bb11882b717bfb151a. QuatreGET /api/chatgpt-ads/status,account,campaigns,insights derrière middleware Dashboard existant uniquement ; plus de headeradmin ou cookiepropriétaire supplémentaire. La clé Dashboard embarquée existante n’est pas une authentification forte ; les détenteurs de cet accès peuvent lire ces informations publicitaires. Aucune clé Advertiser/admin exposée, aucune création de session administrateur publique ni accèsmobile/prospect élargi. GETstricts, whitelistqueriesbornées, erreursréelles etclientserveur/hôtefixe conservés.
Render dep-dbhefhnb9u1s739ovdcg live sur ce merge, terminé2026-10-29T06:30:24Z soit07:30:24Paris.
Frontend PR #10 https://github.com/seoettia-collab/facebook-ads-frontend/pull/10 ; tête relueff93e7afe8b88f990ec7e88aa6875f7590979ab6 ; merge main8705e6e97f17cb2322693c44e1770982711fdb9e. Formulaire email/motdepasse et contrôles session propres à cette vue supprimés. Chargementautomatique GETdirect à l’ouverture via accèsDashboardexistant, credentialsomit, aucunappelmobile/session/logout. Pas de stockageJS de secrets. Dates/fuseaux/devises/paginationpréservés ; accèsrefusé purge les anciennesdonnées et neutralise réponsesconcurrentes.
Netlify6ae2e7cb80febb61c9a6aebe ready publié2026-10-29T06:29:37Z soit07:29:37Paris surcecommit.
Revueindépendante GO aux deux têtesexactes, cinqfichiersrelusGitHub identiqueslocaux.24/24testsNode20.11.1PASS (15backend,9frontend). Piloterelitdiffproduction etrelance9frontendPASSNode24. Middleware réel testé cléabsente/invalide401 etclévalide quatreGET200 sanscookie/admin/SetCookie ; mutations405, chemins inconnus404, injections400.
Recette navigateurproduction après actualisation et simpleclicChatGPTAds SANSaucune saisie : Comptevérifié MistralProReno, statutactive/revueapproved ; campagne Extensions et rénovation énergétique — IDF affichéeactive avec15,00EUR/jour. Aucun formulaireconnexion restant. Rapportautomatique22–28octobre2026 EuropeParis renvoie aucunrésultat pour cettepériode ; ne pas endéduire absence dediffusion ou dépensecourante. Aucunprospect consulté, aucunecommunication envoyée. Campagne/budget/créationinchangés ; boutons Lancer/Optimiser demeurentdésactivés carwritesnatifstoujoursnonimplémentés.

## Cockpit de décision ChatGPT Ads — livré le 29/10/2026

Demande du Gérant : visualiser l’état et l’avancement de la campagne, disposer d’outils de décision et suivre les demandes de devis. L’accès direct livré précédemment reste conservé. Ce lot ajoute la lecture et l’aide à la décision ; il ne modifie pas la campagne et ne garantit aucun pourcentage d’optimisation.

### Livraison et contrôles

- Backend PR #12 : https://github.com/seoettia-collab/facebook-ads-backend/pull/12 ; tête finale relue `91fc00fdb5ec57bf2c39494f5c1db164075b4c4f`, fusion main `a46573a54fe79d817d800ea684938158075faf3f`.
- Render `dep-dbheq2st50us738ngevg` live sur cette fusion, terminé le 29/10 à 07:53:35 Paris.
- Frontend PR #11 : https://github.com/seoettia-collab/facebook-ads-frontend/pull/11 ; tête relue `80178aea6dec47f53ff4da89ffadfd198aee1d91`, fusion main `e90b89d90e9e978b38f69a78b6a09c729dc12e67`.
- Netlify `6ae2ed10ea1c77da82875ebe` ready sur cette fusion, publié à 07:52:06 Paris.
- 23 tests backend et 14 frontend PASS Node 20.11.1. Revue indépendante des dix fichiers aux têtes immuables ; contrôle final du delta limité aux libellés français et assertions, puis nouvelle validation des 23 tests backend par le codeur.
- Le pilote a relu le code de production et comparé les blobs GitHub aux copies relues. Aucun test de production avec un vrai prospect, aucun SMS, appel ou push envoyé.

### Outils disponibles

GET /api/chatgpt-ads/cockpit, derrière le même accès Dashboard existant, renvoie uniquement configuration publicitaire et agrégats sans données personnelles. Paramètres stricts : campagne, dates de journées terminées (31 jours maximum), filtre UTM facultatif. Authentification mobile inchangée ; aucune session administrateur créée pour ce module.

L’interface offre sélection de campagne, période et comparaison de même durée, dépenses/impressions/clics/CPC/CTR canoniques OpenAI, évolution quotidienne, budget/objectif/date de fin, demandes déclarées et prospects distincts, statuts commerciaux actuels des prospects de la cohorte, états des alertes SMS et prochaines vérifications motivées. Les rapports vides, partiels, indisponibles et les métriques nulles restent distincts de zéro. Les périodes et les bornes CRM utilisent le fuseau du compte, y compris les journées de changement d’heure.

Les rapports courants/précédents sont demandés au grain agrégé du fournisseur ; les CPC/CTR ne sont pas reconstruits. Une lecture quotidienne distincte alimente la tendance. Pagination bornée ; aucune page partielle n’est présentée comme total complet. Les statuts commerciaux ne constituent pas un historique de changements de statut. Sans filtre UTM, les compteurs CRM couvrent toutes les demandes ChatGPT déclarées sur la période, indépendamment de la campagne sélectionnée.

La provenance UTM demeure déclarative. Conversions attribuées, coût par demande attribuée et rentabilité restent non vérifiés/non calculables ; aucun CPA ou ROAS inventé. L’objectif de coût acceptable par prospect n’est pas défini par le Gérant. Les recommandations sont des vérifications fondées sur les données, sans hausse automatique de budget ni score artificiel.

La fonction existante pure site-leads.alertConfiguration est réutilisée en lecture, avec projection de trois raisons autorisées seulement ; aucun numéro ni secret n’est renvoyé. Une configuration SMS bloquée est visible même avec zéro demande. Acceptation par la passerelle et réception sur le téléphone restent distinctes. Les alertes SMS internes ne sont pas les notifications PWA.

### Recette réelle du Dashboard

Après actualisation et clic ChatGPT Ads, sans identifiant supplémentaire : compte Mistral Pro Reno vérifié ; campagne Extensions et rénovation énergétique — IDF sélectionnée, statut configuré actif, budget 15 EUR/jour, objectif clics, fin 04/11/2026 à 20:40 Paris. Les sections, cartes et liens ont été contrôlés visuellement en haut et en bas de page.

Période par défaut 22–28 octobre / comparaison 15–21 octobre : aucune ligne de mesures publicitaires retournée, cartes affichées indisponibles et non zéro. Agrégats CRM affichés à zéro pour cette période. Le filtre a aussi été réellement utilisé sur le 28 octobre / comparaison 27 octobre : mêmes distinctions correctement affichées. Ces lectures ne prouvent pas une absence de diffusion ou de dépense le 29 octobre.

Diagnostic réel de configuration SMS : blocage parce que téléphone émetteur et destinataire sont identiques. Aucune configuration modifiée. Réception et recette formulaire → Conversions → alerte non attestées. L’état des notifications PWA n’est pas déduit de ce diagnostic SMS.

### Contrôle Ads Manager séparé et limites

Lecture fraîche par connecteur le 29/10 : compte actif, revue approuvée et facturation complète ; campagne active/objectif clics/budget et fin inchangés. Snapshot de diffusion complet : éligible, aucun blocage retourné. Cette lecture ponctuelle du connecteur n’est pas transformée en diagnostic automatique du backend ; le cockpit indique honnêtement que son diagnostic complet de diffusion n’est pas disponible.

Inventaires des sources de conversion et réglages d’événement vides, pagination terminée. Rapports de campagne 22–28 et 15–21 octobre vides ; pas de comparaison d’efficacité ni de recommandation d’augmentation. La campagne a été créée le 28 octobre : la fenêtre précédente ne représente pas une campagne ayant diffusé pendant sept jours.

Les commandes natives de création/modification/pause/optimisation restent non implémentées ; boutons d’écriture désactivés. Le lien Ads Manager permet d’ouvrir la campagne réelle. Prochain travail métier : fiabiliser l’alerte retenue, attester une demande contrôlée dans Conversions et sa notification, raccorder/valider les conversions OpenAI, puis exploiter un coût par prospect avec des preuves suffisantes. Ni budget, audience, annonce ou calendrier publicitaire modifiés dans ce lot.

## Priorité aux demandes de devis — 30/10/2026

Décision du Gérant : rechercher des leads dans Conversions, confier les arbitrages techniques au pilote et limiter les explications. Budget quotidien moyen de 15 EUR et fin du 04/11 à 20:40 Paris conservés ; aucune mutation de campagne, objectif, audience ou annonce dans ce lot.

### Lecture de référence

Fenêtre des sept journées terminées 23–29/10, Europe/Paris : 2 181 impressions, 21 clics, 19,48 EUR, CPC canonique 0,93 EUR et CTR canonique 0,96 %. Les lignes quotidiennes et le total concordent, pagination complète ; activité mesurée le 29/10. La dépense peut encore se consolider. CRM déclaré ChatGPT : zéro demande et zéro prospect distinct pour cette fenêtre ; cette lecture exclut le 30/10. Snapshot courant complet : campagne éligible, aucun blocage retourné. Ces observations ne prouvent aucune cause d’absence de leads.

Source web existante « My first pixel » détectée ; inventaire des réglages d’événement vide. L’objectif reste clics ; un suivi installé ne transforme pas cette campagne en optimisation conversions. Blocage SMS sender_matches_recipient conservé : il ne bloque pas l’enregistrement du formulaire. Aucune réception réelle de notification attestée.

### Correction du formulaire publiée

Backend PR13 : tête 943afb984040ac59de36cd70080b337df7c3515d, merge bf8313bef80fae9000db1de6a97e95a2e0787d06 ; Render dep-dbiedan40ujc739cfq80 live le 30/10 à 18:50:14Z.
Site officiel PR4 : tête 3bf31335fbeda4c5c1ff3ddbbd8cbd1f3001644b, merge b58f101059f4a59c3c45f01c5bf3e0d9fb49be5b ; JS réellement servi vérifié.
Le stockage navigateur indisponible ne bloque plus l’envoi : mémoire locale de page, UUID et reprise conservés. Confirmation uniquement après reçu strict stored=true ; aucune réussite simulée. 20 tests clients PASS Node24, relus indépendamment. Les cinq tests serveur SQLite inchangés n’ont pas été rejoués, liaison native Node20 indisponible.

### Mesure des demandes enregistrées

Backend PR14 : tête b4a13757b092dd18e91acdac759ccc8f93693288, merge 638cd3942eb8b14c4839867e608cf44398f897c8.
Site officiel PR5 : tête 5feadcd6f9acb9c4adc837afbded467d20ede11c, merge 94c090e0e1a565a5a461899a1a06667ae6f9e948.
45 tests synthétiques PASS Node24, dont 24 mesure, 12 site, 8 client existant et 1 GET HTTP réel isolé asset/CSP ; revue indépendante GO sur les 16 fichiers aux têtes exactes. Pas de nouvelle exécution des tests SQLite inchangés.
Les quatre fichiers publics du site officiel (index.html, form.js, form.css, measure.js) correspondent aux copies relues, après normalisation des fins de lignes. Recette navigateur : case facultative décochée avant formulaire, six choix, champs et bouton présents.

SDK officiel chargé seulement après accord facultatif, retrait accessible après confirmation. lead_created déclenché seulement après le premier reçu durable exact ; UUID pour déduplication, pas de rejeu d’un ancien reçu après rechargement, défaillance SDK non bloquante. Aucun nom, téléphone ou champ du formulaire fourni manuellement au payload. La notice signale cookies et rapprochement possible par coordonnées hachées du SDK ; aucune promesse d’anonymat. CSP limitées aux domaines officiels documentés. Sources primaires : https://developers.openai.com/ads/measurement-pixel et https://developers.openai.com/ads/supported-events, lues le 30/10.

Aucun prospect, SMS, appel, push ou événement OpenAI réel de recette émis. Réception fournisseur, événement de conversion défini/rattaché, attribution et optimisation vers conversions restent non validés. La tentative de connexion sécurisée aux réglages OpenAI a retourné « adresse e-mail ou mot de passe incorrect » ; aucune répétition automatique et aucune valeur de connexion dans les traces. Le connecteur courant ne fournit pas la création de ce réglage ; ne pas prétendre l’avoir configuré. Les boutons d’écriture du Dashboard demeurent désactivés.

Render dep-dbiemcq9lscs73f8amig live sur 638cd3942eb8b14c4839867e608cf44398f897c8 le 30/10 à 19:09:38Z ; measure.js de production identique à la copie relue.

## Connexion mobile : ne plus confondre panne et déconnexion — 31/10/2026

Demande du Gérant : résoudre les connexions répétées et mots de passe refusés. Audit actuel : desktop ChatGPT Ads charge par GET backend sans formulaire mot de passe et sans redirection automatique ; le site OpenAI externe a sa propre session. Lecture connecteur du compte Mistral Pro Reno réussie sans nouvelle authentification. Aucun mot de passe, secret ou compte modifié.

Défaut mobile avéré : checkSession traitait toute erreur réseau/timeout/serveur comme un motif d’afficher login. Correctif PR frontend #12 https://github.com/seoettia-collab/facebook-ads-frontend/pull/12, tête e5d4c4e76b904b00af772a1af962a5be94730933, merge ae65daa22a55865469b74fdb2dc18f8fd64d91a0.
Panne/offline/503/429 : écran temporairement indisponible, bouton Réessayer qui relit GET/session avec cookie existant ; seul un vrai401 demande connexion. Purge privée, invalidation réponses anciennes et annulation communications en attente conservées. Backend, durée30jours, cookie, CSRF et push inchangés ; cache shell mobilev5 pour mise à jour.
36/36 tests contrôleur/PWA PASS Node24 rejoués par codeur, reviewer indépendant et pilote. GO indépendant aux quatre fichiers exacts. Aucun prospect ou envoi réel. Netlify production6ae596773e3b2a865b7ce6c0 ready sur merge exact, publié31/10 à07:19:27Z soit08:19:27Paris ; app.js/index.html/sw.js réellement servis identiques aux copies relues.

Authentification site OpenAI non résolue : demande sécurisée de choix de méthode expirée au niveau outil puis lecture navigateur expirée ; résultat inconnu, aucun succès ni nouvel échec de credentials affirmé. Ne pas répéter automatiquement les saisies. Le refus précédent ne prouve pas que le mot de passe est mauvais : vérifier la méthode habituelle du compte. Guide officiel lu : https://help.openai.com/en/articles/7426629-why-cant-i-log-in-to-chatgpt. Aucune modification de campagne/budget ni des protections d’accès.

## Revue acquisition et éventuelle offre salle de bain — 31/10/2026

Objectif explicite : leads enregistrés, identifier si formulaire ou image freine et envisager salle de bain pour limiter dépenses. Revue fraîche en lecture uniquement. Campagne actuelle inchangée : active, objectif clics, 15 EUR/jour moyen, fin04/11 à20:40Paris. Compte approuvé/facturation complète ; snapshot diffusion complet, aucun blocage de compte/campagne/ad remonté.

Fenêtre24–30octobre, Europe/Paris, sept journées terminées : 3758impressions,37clics,31,62EUR, CPC canonique0,85EUR et CTR0,98%, pagination complète. Grain quotidien ad :29oct2181/21/19,48EUR/CPC0,93/CTR0,96% ;30oct1577/16/12,14EUR/CPC0,76/CTR1,01% ;24–28zéro mesuré avec includes zero_impression_items. Comparaison17–23oct : aucune ligne, campagne pas encore créée ; comparaison d’efficacité non valable. Dépenses susceptibles de consolidation ;31oct exclu.

Inventaire sources : un pixel web existant ; réglages d’événement toujours vides et aucun conversion_event_setting rattaché à la campagne. Suivi navigateur déployé précédemment ne prouve ni réception fournisseur ni optimisation conversions. Pas de taux conversion/CPA inventé ; CRM24–30nonconsultable dans ce contrôle sans reprendre interface privée, ne pas réutiliser comme actuel le zéro23–29.

Image exacte de l’annonce active inspectée par lecture URL : maison/extension, titre Agrandissez et rénovez votre maison, liste extension/surélévation/conversiongarage/rénovation et appel devis ; cohérente avec extension, aucune preuve de défaillance image ou de fatigue.37clics seulement, pas de comparaison historique/sibling significative : pas de remplacement justifié par la performance seule.

Agent formulaire : quatreassets publics identiques au HEADsite94c090… ; backend638cd394… ; CORS/validation/intake cohérents en lecture. Pas de bug bloquant établi ni recettePOSTeffectuée. Frictions et désalignements possibles (hypothèses) : bloc long consentement avant champs, pagegénérique Votre devis gratuit alors que l’annonce parle extension/énergétique, description avant coordonnées. Salle de bain déjà présente dans les sixchoix. Refus consentement n’empêche pas sauvegardeCRM. Prochaine priorité : configurer le but lead_created et attester parcours/enregistrement/mesure ; ensuite évaluer une offre dédiée et un formulaire aligné, sans budget additionnel ni diffusion simultanée non validée. Aucune campagne salle de bain créée, aucune mutation publicitaire, aucun prospect ou message émis. Une éventuelle activation passera par le workflow de proposition exacte du connecteur.

## Conversion créée et clarification du consentement — 31/10/2026

Le Gérant s’est connecté à son interface Ads Manager et a créé « Demande de devis ». Contrôle connecteur : événement6ae5994692908194ba08df140fd68973, lead_created, sourcecds_6ae38161426081949f0ee1713b84007e / pixel5g4S52UGifyewxRA8h2gW6, attribution clic30jours/vue1jour, nonarchivé, campaigns[]. La création est confirmée ; rattachement à campagne et optimisation conversions non réalisés.

Premier test réalisé par le Gérant : capture « Votre demande est enregistrée », case facultative décochée ; le Gérant confirme avoir peut-être oublié, pensant qu’il s’agissait d’un avertissement. Cette capture atteste la confirmation du formulaire mais pas une lecture de ficheCRM ni réceptionnotification. Lecture connecteur événements récents vide ; ne pas en déduire panne avec consentoff. Le Gérant est invité à une seconde demande test unique, avec ses propres coordonnées et nomTEST, optin avant envoi, sans cliquer publicité ; nouveau résultat pas encore attesté. Ne pas répéter ces tests automatiquement.

Demande actuelle : rendre le choix plus compréhensible et attractif, éventuellement précoché. Décision : pas de précochage de ce suivi publicitaire, consentement actif libre requis ; améliorer seulement clarté/compacité/label à premier niveau et détails accessibles, refus sans impactsurdevis. Référence officielle CNIL consultée : https://cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies/comment-mettre-mon-site-web-en-conformite (résultat de recherche officiel : cases décochées par défaut, informationà2niveaux admise). Aucun changement de collecte ni élargissement du consentement.

### Présentation du choix clarifiée

Backend PR15, tête 8f50ca902963b1f0faa8e76a1bc429d6e5ac65b0, fusion 4d199f8f84003ddaff98be0358a4f5ed88977450 ; site PR6, tête 756f4b206663eacd888c486decd86a535d47d289, fusion f096e6dd9ff19f3b1422aadfd90c664da0298983. Seulement deux HTML et deux CSS modifiés.
Titre « Mesure des publicités — au choix », libellé « J’accepte la mesure publicitaire OpenAI (facultatif) », information sur la finalité, les cookies et les coordonnées hachées possibles ; devis possible sans accord ; détails natifs repliables pour le refus et le retrait.
Case sans checked ni required ; JavaScript, SDK et collecte inchangés. Contrôle hors formulaire avant les champs, accessible après confirmation. Ligne cliquable, cibles tactiles de 44 px, focus visibles, couleurs neutres.
24/24 tests de mesure existants PASS Node24, rejoués indépendamment ; quatre fichiers distants exacts et quatre blobs JS inchangés contrôlés. Pas de recette visuelle ni de réduction de hauteur constatée ; aucune amélioration du taux de consentement ou de conversion revendiquée. Aucun événement ou lead émis par les agents.

Production du site officiel : index.html et form.css réellement servis identiques aux copies relues, après normalisation des fins de lignes. Déploiement Render dep-dbipnudg1s2s73f8khf0 sur la fusion backend encore update_in_progress au dernier contrôle ; ne pas présenter cette copie backend comme déjà live.

## Réception Pixel et rattachement campagne confirmés — 31/10/2026

Seconde demande test réalisée manuellement par le Gérant avec consentement coché : capture de confirmation d’enregistrement fournie. Le connecteur a retourné un événement lead_created, canal pixel_sdk, source attendue, reçu à 07:47:40 UTC (08:47:40 Paris), ainsi que sdk_init. La capture du flux Ads Manager confirme cette réception. Cela établit une transmission réelle du navigateur vers OpenAI, pas une attribution à un clic publicitaire ni un prospect commercial. Pas de lecture de la fiche CRM ou réception de notification attestée ; aucun nouvel envoi de recette à répéter.

Le Gérant a sélectionné puis enregistré « Demande de devis » sur la campagne existante. Relecture fraîche get_campaign et list_conversion_event_settings après confirmation : rattachement réciproque confirmé entre cmpn_4d68cd5564ac8194853265ac04080d0d et 6ae5994692908194ba08df140fd68973.
Campagne active ; objectif et enchères toujours clicks. Budget 15 EUR/jour moyen, ciblage Île-de-France et fin du 04/11/2026 à 20:40 Paris conservés. start_time vaut désormais 1793434978 (précédemment null) après l’enregistrement dans l’interface ; ne pas affirmer que tous les champs sont restés identiques.
Le champ Objectif grisé a été rapporté par le Gérant. Aucun passage à une optimisation conversions accompli. Le suivi de l’événement est opérationnel et rattaché ; optimisation pour les demandes, attribution des vraies demandes et rentabilité restent à établir. Aucune mutation publicitaire par l’agent, aucun budget augmenté, aucune campagne dupliquée.

## Bascule préparée vers conversions — confirmation finale requise

Instruction du Gérant : terminer l’optimisation et éviter de continuer à dépenser sur les clics. Le connecteur ne propose pas de mise à jour objective/bidding_type ; champ grisé rapporté dans l’interface. Préparation d’un remplacement technique, pas d’une seconde diffusion simultanée.
Compte revalidé par list_ad_accounts : Mistral Pro Reno, administrateur, EUR. Campagne, groupe et annonce actuels relus ; goal standard lead_created « Demande de devis » unique et actif vérifié avec pagination complète. Région Île-de-France revalidée par recherche : 2000424, France, région exacte.
Proposition : « Extensions et rénovation énergétique — IDF — Devis », campagne standard créée paused, objectif/bidding conversions, facturation click (oCPC), budget quotidien moyen 15 EUR, fin 04/11/2026 20:40 Paris. Toutes plateformes web/iOS/Android ; aucune exclusion, audience personnalisée ou nouveau contexte.
Groupe : maximize_conversions, facturation click, sans plafond manuel, statut active sous campagne paused. Une annonce chat_card active, même image existante du même compte, titre « Extensions et rénovation énergétique », corps « Île-de-France. Devis gratuit, réponse sous 48 h. », URL exacte actuelle avec ses UTM conservées. Aucun upload.
Le create_ad courant n’expose pas image_crop, alors que le get actuel retourne le cadrage intégral x0/y0/w1/h1. La proposition doit demander explicitement le cadrage par défaut ; ne pas prétendre conserver un champ non pris en charge.
Aperçu natif demandé avec la copie et le fichier exacts : réponse ready_to_render, sans prétendre que le pilote a inspecté le widget visuellement.
Ordre proposé après confirmation de l’ensemble : pause de la campagne Clics puis vérification ; création de la nouvelle campagne paused, du groupe et de l’annonce ; contrôles et attente de l’approbation publicitaire ; activation de la nouvelle campagne seulement après ces contrôles. Ne pas réactiver automatiquement l’ancienne en cas de rejet. Les créations et l’activation doivent utiliser une confirmation explicite couvrant ces états et cet ordre, exigée par les actions Ads Manager.
Aucune écriture publicitaire effectuée à ce stade, aucun objectif changé ni nouvelle campagne créée. L’ancienne campagne reste active tant que la confirmation de cette bascule n’est pas reçue. Le suivi Pixel et le rattachement déjà confirmés ne suffisent pas à déclarer l’optimisation conversions achevée.

## Agent dédié direction artistique publicitaire — 31/10/2026

Demandé explicitement par le Gérant et lancé dans cette conversation : directeur_artistique_publicitaire. Fiche durable : projets/facebook-ads/agents/direction-artistique-publicitaire/fiche-direction-artistique-publicitaire.md, commit 7066de8e8d8a375ab9e552c31fa3062503704adf.
Périmètre exclusif : visuels, lisibilité mobile, présentation professionnelle du formulaire et cohérence annonce/page. Aucun droit de décision sur budget, activation, collecte ou CRM ; coordination par le Pilote.

Première revue terminée en lecture sur image fournie et HTML/CSS publics. Points forts : avant/après lisible, identité crème/cuivré. Points à revoir : titre très dominant, appels au devis répétés, mention IA trop petite sur mobile ; distinguer habillage de publication et fichier créatif. Pas de rejet fournisseur ou de supériorité commerciale affirmé.
Direction proposée : fond ivoire #FAF6F0, encadré projet beige #F2E6D9, texte ardoise #182B3A, bouton cuivré foncé #8B4A22. Titre salle de bain, blocs Projet et Coordonnées repérables, six choix conservés, précisions facultatives après coordonnées. Consentement libre, décoché et retrait accessible ; éventuel déplacement près du bouton à intégrer sans régression.
Validation future : offre, premier geste et CTA compréhensibles à 360 px, absence de débordement et textes essentiels lisibles. Aucun design modifié, image générée ou publication effectué dans cette revue.

La proposition de bascule Extensions vers conversions demeure NON EXÉCUTÉE : le Gérant a exprimé un accord de principe tout en demandant de terminer la discussion avant décision finale, puis a envisagé l'offre salle de bain et un autre visuel/formulaire. Ces changements nécessitent une nouvelle proposition complète adaptée ; ne pas exécuter l'ancienne capsule comme déjà approuvée. L'ancienne campagne peut encore dépenser tant qu'une pause n'est pas effectivement appliquée.

## Formulaire professionnel salle de bain livré après validation — 31/10/2026

« Je valide » du Gérant est appliqué à la direction artistique présentée : refonte de présentation du formulaire. Cette validation n’est pas traitée comme une confirmation du lancement d’une nouvelle campagne ou d’un nouveau visuel.

Backend PR16, tête 03de2d59a23fa57988fdb4b4216700f0db720053, fusion a63a473a9a869538ee49241effcddcf3936bc261.
Site officiel PR7, tête aa4f40511094e94847c67f5348ba478a4debc2df, fusion 89998b4075d1bd9e6a76f0ddb0596a4d68dd699b.
Six fichiers modifiés : deux HTML, deux CSS et deux adaptations d’assertions existantes. Les quatre blobs JavaScript distants sont inchangés.

Titre « Votre projet de salle de bain », fond ivoire, bloc Projet beige, bloc Coordonnées gris doux, texte ardoise et CTA cuivré « Demander mon devis gratuit ». Les six choix exacts restent disponibles et décochés ; salle de bain mise en avant sans sélection forcée. Coordonnées avant précisions facultatives ; labels, contrastes, focus et états sélectionnés revus.

Le consentement demeure facultatif, décoché et indépendant de la demande. Il passe après les champs, hors formulaire, afin de rester accessible après confirmation. Le bouton est associé nativement par form="project-form" ; CSS masque ses actions quand le formulaire est masqué après reçu confirmé. Validation, FormData, champ anti-robot, UUID et suivi après enregistrement préservés.
24/24 tests de mesure existants PASS Node24, rejoués indépendamment ; revue technique GO et revue artistique GO aux têtes immuables exactes. Les calculs de contraste ne remplacent pas une recette visuelle. Aucun prospect, événement ou notification de production généré par les agents.

Publication confirmée : le HTML et le CSS publics du site officiel correspondent aux fichiers revus. Déploiement backend dep-dbir02navr4c73bcd8ig live sur a63a473a9a869538ee49241effcddcf3936bc261 (terminé 09:09:35 UTC). Contrôle navigateur du formulaire public : titre et ordre des sections corrects, consentement décoché et non requis, bouton submit.form=project-form et présent dans form.elements, trois champs obligatoires nom/telephone/code_postal. Aucun débordement horizontal au viewport 1348px. Capture complète de production examinée ; pas de capture native à 360px disponible dans cet environnement. Aucun envoi de formulaire de production effectué pour cette recette.

## Palette finale validée et publiée — 31/10/2026

Le Gérant a remplacé la palette ivoire/ardoise/cuivre par orange #FF6C00, rouge #D2232A, noir #000000 et gris clair #EEECEC, explicitement sans blanc. Le « ok » suivant valide l’application au formulaire uniquement. Pas de nouveau logo fourni ; aucun logo inventé et aucune mutation Ads.

Deux modifications CSS seules, aucune modification HTML/JS/intake : backend PR17 tête 17a7a6fe0e28a28dab8517558530d1bedb9ce4a2 fusion fd2ba703ccbfad789a64ff367cf67b90f724e060 ; site PR8 tête e0c1f7ba28f41ec4222ac5bb89159b52393b024c fusion ce7dee1218240ffb361ad9590a23ee9e251757b8. Blob CSS commun 2220e2bf2de96dbea36c23e199f77fb9c4853495.

CTA orange/texte noir contraste 7,40:1 ; texte noir/gris clair 17,84:1. Rouge réservé aux cadres et repères, car gris clair/rouge 4,45:1 ne suffit pas aux petits textes. Bandeau noir/texte gris clair. Cases de consentement et travaux personnalisées sans blanc, focus noir. Revue artistique indépendante GO aux têtes exactes.

Publication site officielle prouvée par comparaison exacte du CSS public à la version relue. Contrôle navigateur : fonds page/carte/champs/consentement/footer rgb(238,236,236), bouton rgb(255,108,0), textes noirs, bandeau noir/texte gris, consentement décoché. Bouton toujours associé à project-form, aucun débordement horizontal au viewport observé. Capture complète de production examinée ; pas de nouvelle preuve mobile360px. Aucun formulaire soumis, aucun événement ni alerte de test généré. Aucun nouveau test unitaire créé pour cette modification visuelle.

Backend Render dep-dbir6ouq1p3s73a2gudg live sur fd2ba703ccbfad789a64ff367cf67b90f724e060, terminé 09:23:32 UTC. Retour arrière : restaurer seulement les CSS précédents (backend a63a473a9a869538ee49241effcddcf3936bc261 ; site 89998b4075d1bd9e6a76f0ddb0596a4d68dd699b).

## Lancement salle de bain préparé — 31/10/2026, confirmation finale requise

Le Gérant a validé le visuel sobre et demandé « lancer ». Lecture actuelle : compte Mistral Pro Reno EUR Europe/Paris Admin approved ; ancienne campagne Extensions et rénovation énergétique — IDF encore active, objectif clicks, 15 EUR/jour, fin 04/11/2026 20:40:52 Paris. Son objectif n’est pas modifiable par update_campaign. Un seul goal standard non archivé lead_created — Demande de devis, source My first pixel ; geo Île-de-France France résolue sans élargissement.

Proposition préparée, PAS appliquée : pause ancienne et readback ; upload unique du visuel carré ; nouvelle campagne standard « Salle de bain — IDF — Devis » initialement paused, conversions/click billing, daily15EUR, fin inchangée ; groupe active sous campagne paused, maximize_conversions, sans context hints ; une annonce chat_card « Salle de bain — Avant/après », active, titre « Votre salle de bain », corps « Rénovation en Île-de-France. Devis gratuit. », cadrage par défaut ; activation nouvelle et vérifications. Toutes plateformes web/iOS/Android, aucune audience personnalisée ni exclusion géographique. Pas de double diffusion simultanée ni hausse/prolongation.

Destination proposée : https://www.mistralpro-reno.fr/devis-travaux/?utm_source=chatgpt&utm_medium=paid&utm_campaign=salle_de_bain_idf (UTM dans URL annonce ; pas de template supplémentaire).
Visuel portrait approuvé adapté en carré, tous textes conservés conformément au choix explicite du Gérant ; format PNG1254x1254, statique,1864317octets vérifiés indépendamment. La commande du validateur du plugin a échoué par dépendance oai_imgsan absente ; ne pas déclarer validation déterministe PASS. Aperçu Ads Manager préparé ready_to_render, sans preuve de rendu client. L’adaptation et la proposition complète requièrent approbation avant upload/création conformément au contrat actif ; aucun upload, pause ou create Ads exécuté. Le visuel reste disponible dans la conversation et généré automatiquement enregistré.

## Bascule complète exécutée après confirmation — 31/10/2026

Le Gérant a confirmé explicitement « JE Confirmes lancement complet » en réponse à la proposition complète. Les actions ont été exécutées dans l’ordre convenu et relues indépendamment après écriture.

- Ancienne campagne « Extensions et rénovation énergétique — IDF » (cmpn_4d68cd5564ac8194853265ac04080d0d) : paused confirmé avant import et encore paused après activation de la nouvelle.
- Import du seul visuel carré approuvé : file_id adsfile:file_00000000179c81f58bd3299fc8103a92. Un seul import, aucun doublon.
- Nouvelle campagne « Salle de bain — IDF — Devis » : cmpn_a73c18472664819693064b9cbeb0a978, créée paused puis activée, readback active ; objectif conversions, bidding_type conversions, facturation click (oCPC), budget quotidien 15000000micros =15EUR/jour, fin1793821252 =04/11/2026 20:40:52 Europe/Paris.
- Goal unique conservé : 6ae5994692908194ba08df140fd68973, « Demande de devis » standard lead_created. Ciblage Île-de-France FR-IDF2000424 ; toutes plateformes, sans audience personnalisée ni exclusion.
- Groupe adgrp_c87e861fbba48196afe3749faee3c181 : active, maximize_conversions avec billing_event_type click, context_hints=[].
- Annonce « Salle de bain — Avant/après » : ad_e902dafbdfd0819b95f349850903c568, active, examen OpenAI in_review au contrôle final. Titre « Votre salle de bain », corps « Rénovation en Île-de-France. Devis gratuit. ». Cadrage retourné intégral x0/y0/width1/height1.
- Destination exacte : https://www.mistralpro-reno.fr/devis-travaux/?utm_source=chatgpt&utm_medium=paid&utm_campaign=salle_de_bain_idf

Toutes les écritures et relectures ont réussi. Aucun budget augmenté, aucune échéance prolongée, aucune diffusion simultanée ancienne/nouvelle demandée. Les statuts active ne prouvent pas une diffusion déjà observée ; l’annonce reste en examen, aucun résultat de conversion ou impression nouvelle n’est revendiqué.

Campagne : https://ads.openai.com/manage/campaigns?act=adacct_6ae118526cb0819496790afcf4fdd3f2&campaignIds=cmpn_a73c18472664819693064b9cbeb0a978
Annonce : https://ads.openai.com/manage/ads?act=adacct_6ae118526cb0819496790afcf4fdd3f2&adIds=ad_e902dafbdfd0819b95f349850903c568

Prochaine vérification utile : décision d’examen, premières impressions/dépenses, puis demandes réellement attribuées. La validation du Pixel par l’ancien test reste une preuve de transmission brute, distincte d’une conversion publicitaire attribuée. Aucun nouveau prospect ni SMS de test créé pendant ce lancement. Aucun calendrier récurrent nouveau créé.
