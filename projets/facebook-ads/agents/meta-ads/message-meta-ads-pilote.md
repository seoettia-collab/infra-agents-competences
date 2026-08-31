EN-RÉPONSE-À: META-002
AGENT: meta-ads
MESSAGE-ID: META-002-RAPPORT
DATE: 2026-08-31 19:15 UTC

# État des lieux — Acquisition / Conversion Meta (factuel, inventaire fourni)

## a) Ce qui existe déjà

**ACQUISITION :**
- BACKEND routes/ : `campaigns`, `insights`, `leads`, `webhook`, `geographic`, `ads-decline`, `image-upload`, `video`, `facebook-publish`, `facebook-api`
- FRONTEND js/ : `ads-manager`, `campaigns`, `audiences`, `geographic`, `creatives`, `publish`, `charts`, `ai-creation`
- → Création, publication et suivi de campagnes existants. Webhook présent pour réception leads.

**CONVERSION :**
- BACKEND routes/ : `comms`, `messenger`, `context`, `history`
- BACKEND services/ : `auto-sms-service`, `autoReplyService`, `messenger-api`, `sms-gateway-service`, `twilio-service`, `email-service`, `database`, `syncService`
- FRONTEND js/ : `cockpit`, `conversions`, `business-context`, `api`, `state`, `navigation`
- → Suivi conversationnel, auto-réponse SMS/Messenger, contexte business stocké.

**TRANSVERSE :**
- BACKEND services/ : `graph-metrics`, `claude-api`, `prompts/communication-prompt`
- FRONTEND js/ : `ai-recommendations`, `config`, `export`, `toast`, `ui_kit_sparklines`
- BACKEND docs/ : `ARCHITECTURE.md`, `CHECKLIST.md`, `FICHE_TECHNIQUE.md`
- → Base IA et métriques en place.

## b) Ce qui manque pour piloter la performance

Sur la base des noms fournis, sans supposition de code :
- Aucune route nommée `conversions-api`, `capi`, `events`, `tracking` → pas de trace explicite de renvoi d'événements qualifiés vers Meta.
- Aucune route `audiences-custom`, `lookalike`, `retargeting` → `audiences` existe côté front, mais pas de service backend dédié visible pour création automatique d'audiences.
- Aucune route `budget-optimizer`, `rules`, `automation` → pilotage budget/statut semble manuel via `campaigns` / `ads-manager`.
- `insights` + `graph-metrics` présents, mais pas de `reporting`, `score`, `alerts` → pas de couche Score IA / alerte formalisée dans l'inventaire.
- `geographic` présent des deux côtés, mais pas de `attribution` ou `geo-performance` → pas de croisement géo x conversion visible.

## c) 3 priorités classées impact/effort (factuel, pas commercial)

P1 — IMPACT HAUT / EFFORT MOYEN : Vérifier et documenter dans docs/ le flux `webhook -> leads -> comms -> database`. C'est le cœur acquisition→conversion. Si webhook capte mais comms ne déclenche pas SMS T+2min, le délai de rappel casse toute perf.

P2 — IMPACT HAUT / EFFORT FAIBLE : Vérifier contenu de `insights` + `graph-metrics` + `charts`. Si CPL/CTR/dépense sont déjà agrégés, il ne manque que la couche agrégation pour cockpit. C'est le socle pilotage.

P3 — IMPACT MOYEN / EFFORT FAIBLE : Vérifier `conversions` (front) + absence de route CAPI (back). Si conversions ne renvoie rien à Meta, l'algo n'apprend pas la qualité. C'est un trou de tracking à qualifier.

Aucune reco commerciale, aucune modification de code. État des lieux sur inventaire fourni uniquement.

GitHub fait foi.
