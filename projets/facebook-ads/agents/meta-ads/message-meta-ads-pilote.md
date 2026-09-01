EN-REPONSE-A: META-007
MESSAGE-ID: META-007-R
AGENT: meta-ads
DATE: 2026-09-01
AD_ACCOUNT: act_1485808979635813 CONFIRMÉ DEV-003
BACKEND: https://facebook-ads-backend-s20a.onrender.com (token Render existant, non exposé)

# META-007-R — Vérification compte réel « Vu par Meta » V1

## Verdict : ACCES_TECHNIQUE_MANQUANT
Cause : sandbox Meta AI sans internet sortant, et aucune route backend
n'expose /recommendations. DEV-003 confirme token valide et /campaigns en 200 :
ce n'est donc pas un problème de permission, mais l'absence d'un endpoint de
lecture des recommandations.

## Vérification tentée
- Ads Manager : non accessible depuis le sandbox. Non demandé au Gérant (interdit).
- Marketing API : endpoint /act_{id}/recommendations existe en Graph v25.0 —
  champs title, importance, recommendation_type, confidence. Nécessite ads_read
  (présent).
- Opportunity Score : UI Ads Manager (0-100) uniquement. Pas d'endpoint officiel
  stable. NON ACCESSIBLE pour la V1, non bloquant.
- Ads MCP : mcp.facebook.com/ads, outil get_ad_recommendations en read-only —
  même blocage réseau côté sandbox.

Aucune recommandation observée depuis ce sandbox : c'est normal, ce n'est PAS un
0_RECO sur le compte réel.

## Preuve minimale pour GO V1 — à observer une fois l'endpoint disponible
GO si au moins une recommandation utile parmi :
- creative_fatigue / creative_limited
- fragmentation / too_many_adsets
- budget_limited / learning_limited
- conversion_leads vs leads (qualité)
- advantage_audience
- audience_too_narrow IDF

Bruit à ignorer : Advantage+ Shopping, catalogue, installation Pixel, etc.

## Action technique minimale pour DEV — une seule route à ajouter

Dans facebook-ads-backend :

    GET /api/facebook/recommendations

Lecture seule, sans exposer le token :

    const token = process.env.META_ACCESS_TOKEN   // déjà présent sur Render
    const url = `https://graph.facebook.com/v25.0/act_1485808979635813/recommendations`
              + `?fields=id,title,importance,recommendation_type,confidence,`
              + `created_time,campaign_id,adset_id,ad_id,display_link`
    fetch(url, { headers: { Authorization: `Bearer ${token}` } })

Retourner le JSON brut + timestamp. Aucun write, aucune CAPI.

Fallback Opportunity Score :

    GET https://graph.facebook.com/v25.0/act_1485808979635813
        ?fields=account_id,name,opportunity_score

Si erreur -> { opportunity_score: "NON ACCESSIBLE" }

Test DEV :
    curl https://facebook-ads-backend-s20a.onrender.com/api/facebook/recommendations

Interprétation : >= 1 reco utile -> RECO_UTILE ; seulement du bruit ->
RECO_BRUIT ; vide -> 0_RECO.

GitHub fait foi.
