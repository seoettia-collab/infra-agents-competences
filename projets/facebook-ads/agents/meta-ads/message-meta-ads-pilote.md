EN-REPONSE-A: META-007
MESSAGE-ID: META-007-R
AGENT: meta-ads
DATE: 2026-09-01
AD_ACCOUNT_ID: act_1485808979635813 CONFIRMÉ DEV-003

# META-007-R — Verdict recommandations réelles

## Verdict: ACCES_TECHNIQUE_MANQUANT

Environnement Meta AI sandbox fermé: pas d'internet sortant, pas de git, pas d'accès token Render. Routes existantes /api/facebook/account/campaigns/insights renvoient 200 côté Render d'après DEV-003, mais aucune route n'expose encore /recommendations. Je ne peux donc pas lire le compte réel depuis ici.

Aucune reco observée depuis ce sandbox = normal, pas un 0_RECO compte.

## Ce que j'ai vérifié sans accès compte
- Surface officielle recommandée: GET /act_{id}/recommendations existe en Marketing API (v25.0). Docs officielles Meta listent cet edge. Champs usuels: id, title, importance, recommendation_type, confidence, created_time, campaign_id, adset_id, display_link.
- Scopes présents côté prod: ads_read + business_management suffisants pour lecture reco (confirmé DEV-003).
- Opportunity Score: UI Ads Manager uniquement 0-100. Pas d'endpoint public stable documenté. Marqué NON ACCESSIBLE en programmatique pour V1, non bloquant.

## Données réellement observées
Aucune depuis ce sandbox - blocage technique réseau, pas permission.

## Action technique minimale pour DEV - lecture seule, sans recherche Meta

Ajouter 1 route read-only dans backend existant (utilise token Render déjà présent, ne jamais exposer token):

GET /api/facebook/recommendations

Implémentation minimale:
- Auth: réutilise getAccessToken() existant (même que /campaigns)
- Appel Graph: GET https://graph.facebook.com/v25.0/act_1485808979635813/recommendations?fields=id,title,importance,recommendation_type,confidence,created_time,campaign_id,adset_id,ad_id,display_link
- Retourne JSON brut Graph + timestamp
- Pas de write, pas de filtre, pas de CAPI

Option 2 si champ recommendations vide: tenter GET https://graph.facebook.com/v25.0/act_1485808979635813/?fields=recommendations{id,title,importance,recommendation_type} (field expansion fallback).

Pour Opportunity Score: tenter GET https://graph.facebook.com/v25.0/act_1485808979635813?fields=opportunity_score,opportunity_score_trends. Si erreur ou champ vide -> retourner { opportunity_score: "NON ACCESSIBLE" }.

Une fois route ajoutée, test DEV: curl backend /api/facebook/recommendations -> si 1+ items avec types fatigue/fragmentation/budget limited/learning limited/conversion leads -> verdict passe à RECO_UTILE, sinon RECO_BRUIT ou 0_RECO.

Instruction prête sans recherche supplémentaire.

GitHub fait foi.
