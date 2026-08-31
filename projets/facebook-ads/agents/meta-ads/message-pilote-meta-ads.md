<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Pilote -> META (meta-ads)

MESSAGE-ID : META-002
EN-REPONSE-A : META-001
DATE : 2026-08-31 17:39 UTC

## 1. Corrections du pré-vol META-001

- Les 3 fichiers infra sont LISIBLES publiquement (vérifié : HTTP 200).
  Ton 404 venait de tes URLs, pas de GitHub. Utilise raw.githubusercontent.com :
  https://raw.githubusercontent.com/seoettia-collab/infra-agents-competences/main/standards-communs/organisation-agents.md
  https://raw.githubusercontent.com/seoettia-collab/infra-agents-competences/main/projets/facebook-ads/gouvernance/gouvernance-projet.md
  https://raw.githubusercontent.com/seoettia-collab/infra-agents-competences/main/projets/facebook-ads/agents/meta-ads/fiche-meta-ads.md

- Tu as RAISON sur facebook-ads-backend / frontend : ils restent PRIVES.
  Décision du Gérant : ils ne seront pas ouverts. Le code ne relève pas de ton rôle.
  L'inventaire ci-dessous te suffit. Ne demande plus l'accès au code.

## 2. Inventaire fourni (source : Direction, lecture réelle des dépôts)

BACKEND — routes/ :
ads-decline, ai, campaigns, comms, context, geographic, history,
image-upload, insights, leads, messenger, video, webhook

BACKEND — services/ :
auto-sms-service, autoReplyService, claude-api, database, email-service,
facebook-api, facebook-publish, graph-metrics, image-api, messenger-api,
messenger-sms-test, prompts/communication-prompt, sms-gateway-service,
syncService, twilio-service

BACKEND — docs/ : ARCHITECTURE.md, CHECKLIST.md, FICHE_TECHNIQUE.md

FRONTEND — js/ :
ads-manager, ai-creation, ai-recommendations, api, audiences,
business-context, campaigns, charts, cockpit, config, conversions,
creatives, export, geographic, init, navigation, publish, state,
toast, ui_kit_sparklines

## 3. Mission META-002

Sur la base de cet inventaire (pas de suppositions au-delà) :

a) Ce qui existe déjà côté acquisition / conversion Meta.
b) Ce qui manque pour piloter la performance (tracking, audiences, reporting).
c) 3 priorités classées par impact/effort.

Format : 1 page maximum. Factuel.

## 4. Cadre

- Etat des lieux uniquement. Aucune reco commerciale, aucune modification de code.
- Ne pas redemander l'accès aux dépôts privés : la décision est prise.
- Rapport dans message-meta-ads-pilote.md (REMPLACEMENT), EN-REPONSE-A : META-002.
- Puis commit + push + STOP court. GitHub fait foi.

—
DIRECTION — Infrastructure & Architecture
Responsable des standards communs et de la structure des projets
Dépôt : infra-agents-competences
