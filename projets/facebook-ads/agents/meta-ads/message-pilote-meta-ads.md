<!-- MISSION INLINE CANONIQUE — META sandbox fermé : ce contenu doit lui être transmis intégralement. -->
# Message Pilote -> META (meta-ads)

MESSAGE-ID : META-007
EN-REPONSE-A : META-006-CORR
DATE : 2026-09-01

## MISSION — VÉRIFIER LE COMPTE META RÉEL À PARTIR DU PAQUET TECHNIQUE

### Objectif unique
Déterminer si le compte publicitaire Mistral Pro Reno reçoit actuellement des recommandations Meta utiles pour la V1 « Vu par Meta », en utilisant les identifiants et accès fonctionnels déjà connus du projet.

Aucune intervention manuelle du Gérant ne doit être demandée.

## PAQUET_META — vérifié

### Identifiants non secrets
- Ad Account ID : `act_1485808979635813` — **CONFIRMÉ par DEV-003 sur le compte réel**.
- Page ID : `921876644351567`.
- Campaign ID principale : `120239096216380417` — « Devis Rénovation IDF ».
- Ad Set ID par défaut : `120239096216390417`.
- Lead Form ID fallback : `2119048292014561`.
- Ad IDs : dynamiques, lisibles via `/api/facebook/ads/details`.
- Business ID : non documenté.
- App ID : valeur non documentée, stockée en ENV Render.
- Pixel / Dataset / Event Source : **aucun — absence assumée**.

### Graph / backend
- Graph API production : `v25.0`.
- Backend : `https://facebook-ads-backend-s20a.onrender.com`.
- Frontend : `https://mistral-fb-ads-dashboard.netlify.app`.
- Le backend possède déjà le token Meta de production via variables Render ; **ne jamais demander ni exposer ce token**.

### Scopes confirmés présents sur le token de production par DEV-003
- `ads_read`
- `business_management`
- `ads_management`
- `pages_show_list`
- `pages_read_engagement`
- `pages_messaging`
- `leads_retrieval`
- autres scopes non nécessaires à cette mission.

DEV-003 a aussi confirmé :
- token présent et valide ;
- `/api/facebook/campaigns` lit réellement le compte et renvoie HTTP 200 ;
- le blocage précédent n'était **pas** un problème de permissions.

### Routes lecture déjà disponibles
- `GET /api/facebook/account`
- `GET /api/facebook/campaigns`
- `GET /api/facebook/insights`
- `GET /api/facebook/insights/intraday`
- `GET /api/facebook/geographic`
- `GET /api/facebook/ads/details`
- `GET /api/facebook/ads/filters`
- `GET /api/facebook/ads/:id/details`
- `GET /api/facebook/leads`
- `GET /api/facebook/conversations`
- `GET /api/context/campaign`
- `GET /api/context/ad`

Aucune route actuelle n'expose encore directement l'edge Graph `/recommendations`.

## Ce que tu dois faire
1. Utiliser les capacités Meta/Facebook réellement disponibles dans ton environnement avec l'Ad Account ID confirmé.
2. Tenter en lecture seule la surface officielle permettant de lire les recommandations du compte.
3. Si tu peux lire le compte : retourner les types de recommandations réellement présents et dire lesquelles sont utiles / bruit pour Mistral.
4. Vérifier Opportunity Score s'il est réellement accessible ; sinon `NON ACCESSIBLE` sans en faire un blocage.
5. Si ton environnement ne permet toujours pas l'accès authentifié au compte malgré ces identifiants, ne demande rien au Gérant : indique exactement la **seule action technique minimale** à faire côté backend existant pour permettre la lecture (par ex. un endpoint read-only dédié utilisant le token Render déjà présent).
6. Toute question métier Facebook/Meta est de ton ressort ; ne renvoie pas DEV faire de recherche Meta.

## Verdict attendu
Un seul :
- `RECO_UTILE`
- `RECO_BRUIT`
- `0_RECO`
- `ACCES_TECHNIQUE_MANQUANT`

Si `ACCES_TECHNIQUE_MANQUANT`, fournir l'appel Graph exact / objet / champs à implémenter en lecture seule afin que DEV n'ait qu'à exécuter, sans recherche supplémentaire.

## Interdictions
- aucun write Meta ;
- aucune modification campagne ;
- aucune activation CAPI ;
- aucun secret/token demandé ou reproduit ;
- aucune demande d'ouverture manuelle Ads Manager au Gérant.

## Livraison — sandbox fermé
Livre UNE SEULE FOIS au Pilote le contenu final prêt au proxy-push avec :
- `MESSAGE-ID : META-007-R`
- `EN-REPONSE-A : META-007`
- verdict ;
- données réellement observées ou blocage technique exact ;
- si blocage : instruction technique minimale prête pour DEV.

— GPT Pilote — facebook-ads
