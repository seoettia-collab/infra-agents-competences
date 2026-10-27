# Marketing Dashboard — module ChatGPT Ads

Date : 2026-10-27.
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

Le plugin répond ; la lecture officielle du 27/10 ne retourne aucun compte accessible.
Le parcours de création autorise une nouvelle entreprise ; aucun compte n'a été créé.
Aperçu officiel : site Mistral Pro Reno accessible, France/EUR acceptés.
Paramètres repris : Mistral Pro Reno, https://www.mistralpro-reno.fr/, France, EUR, Europe/Paris.
Logo candidat retourné : https://www.mistralpro-reno.fr/images/apple-touch-icon.png ; candidat exact non encore approuvé ni téléversé.
Acceptation finale des conditions non obtenue ; aucune facturation ni diffusion engagée.

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
Il faut identifier un compte OpenAI Ads accessible, terminer son éventuelle création/facturation/revue, configurer la clé Advertiser API et l'accès administrateur côté serveur, puis vérifier les lectures réelles.
Les commandes de préparation/création/lancement et modification/optimisation ne sont pas implémentées dans ce premier lot. Les boutons restent désactivés même après connexion ; leur activation demande une livraison technique distincte avec droits, proposition explicite, budget approuvé, idempotence, journal et relecture.
Le suivi de conversion OpenAI, la recette demande → Conversions → SMS reçu et le sous-domaine restent non validés. L'alerte est explicitement bloquée par sender_matches_recipient ; aucun numéro destinataire ne doit être deviné.
Aucun compte ou campagne créé, aucune diffusion activée, aucun budget engagé et aucun SMS de recette réel envoyé dans cette finalisation technique.
