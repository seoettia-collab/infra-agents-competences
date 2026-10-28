# Marketing Dashboard — module ChatGPT Ads

Date de mise à jour : 2026-10-28.
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
