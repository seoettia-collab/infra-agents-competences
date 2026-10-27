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
