EN-REPONSE-A: META-006-CORR
AGENT: meta-ads
DATE: 2026-09-01

# META-006-CORR — Vérification lecture seule compte Mistral Pro Reno - Vu par Meta V1

## Question unique
Le compte reçoit-il actuellement des recommandations Meta mid-flight utiles et
exploitables pour V1 « Vu par Meta » ?

## 1. Surface à vérifier - ordre
1. Ads Manager manuel en premier — preuve visuelle immédiate que Meta génère
   quelque chose pour ce compte réel, sans permission ni code. Si zéro, inutile
   d'appeler l'API.
2. Ads MCP officiel lecture seule en second — voie programmatique officielle
   Meta (mcp.facebook.com/ads). Lecture seule, sans risque d'écriture. Permet de
   tester si les recommandations remontent via le canal officiel hors UI.
3. Marketing API en troisième — endpoint /recommendations. Nécessite un token
   ads_read. Confirme la disponibilité programmatique pour le Dashboard.

Pourquoi cet ordre : l'UI fait foi côté client, le MCP est la couche que le
Dashboard utilisera en V1, l'API est le fallback.

## 2. Lecture programmatique exacte - si officiellement disponible
- Ads Manager : onglet Recommandations + Opportunity Score en colonne.
  Screenshot + export CSV si disponible.
- Marketing API : GET /act_{ad_account_id}/recommendations
  (developers.facebook.com/docs/marketing-api/recommendations/).
  Champs : title, importance, recommendation_type.
  Permission minimale : ads_read + business_management en lecture.
  MARQUAGE : endpoint officiel, mais disponibilité par compte variable selon
  éligibilité Meta.
- Ads MCP : outil get_ad_recommendations / list_recommendations
  (nom exact à vérifier dans le manifeste MCP officiel le jour J).
  Permission : connexion MCP Ads, scope ads_read uniquement.
  MARQUAGE : manifeste à vérifier, aucun appel write.
- Opportunity Score : UI uniquement (0-100). Pas d'endpoint officiel public
  documenté. MARQUAGE : non confirmé en API/MCP, ne pas en faire un prérequis.

## 3. Interprétation des résultats
- Zéro recommandation générée : normal si compte à petit budget, Learning
  Limited récent ou historique court. Meta n'en génère pas en permanence.
- Présentes mais hors sujet : ex. « Activer Advantage+ Shopping » sur du Lead
  Ads, « Installer Pixel » déjà fait, « Ajouter catalogue » e-commerce.
  = bruit pour la V1, ne justifie pas le bloc.
- Erreur de permission : token ads_read manquant, compte non lié au Business
  Manager connecté. = corriger la permission avant de conclure.
- Fonctionnalité indisponible : compte trop récent, dépense insuffisante, région
  non éligible. = documenter.

## 4. Preuve minimale suffisante pour GO V1
V1 justifiée si au moins UN type parmi ces recommandations réelles est observé
sur le compte réel :
- Fatigue créative / Creative limited
- Fragmentation audience / Too many ad sets
- Budget limited / Learning Limited due to budget
- Conversion leads vs Leads (qualité)
- Advantage+ Audience pertinente pour du Lead Ads
- Estimation d'audience trop serrée IDF

Un seul type utile et récurrent suffit. Pas besoin de volume.

## 5. Opportunity Score - vérification
- Vérifier dans les colonnes d'Ads Manager : score présent 0-100 ? Si oui, noter
  la valeur.
- Score vide ou « Not enough data » = compte non éligible actuellement.
- Ne pas bloquer la V1 s'il est absent. C'est une plus-value, pas un prérequis :
  le bloc « Vu par Meta » peut vivre avec une seule recommandation utile.

## 6. Instruction prête pour DEV - lecture seule, sans recherche Meta
1. Ouvrir Ads Manager sur le compte Mistral Pro Reno, screenshot Recommandations
   + Opportunity Score.
2. Connecter Ads MCP officiel en read-only (ads_read), appeler l'outil de
   recommandations en lecture seule pour act_{id}, loguer la réponse brute.
3. Appeler GET /act_{id}/recommendations avec un token ads_read, loguer la
   réponse brute.
4. Retourner au Pilote : 3 logs + verdict — 0 reco / reco bruit / 1+ reco utile
   de type X, et Score présent oui/non.
5. Aucune activation CAPI, aucune modification de campagne, aucun write MCP.

GitHub fait foi.
