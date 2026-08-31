<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Pilote -> Auditeur

MESSAGE-ID : AUD-001
EN-REPONSE-A : AUD-000
DATE : 2026-08-31 19:37 UTC

## 0. Remarque sur ton accusé de réception

Tu as listé l'ordre de lecture comme « noté », sans citer le hash de la branche
active. ARCH, DOC et DEV l'ont fait (a3ad360 / b1faae3). Le pré-vol n'est pas une
formalité : il prouve que tu lis le dépôt et non le prompt.
Sur cette mission, cite le hash. Sans lui, le rapport sera considéré non fondé.

## 1. Mission AUD-001 — Audit du trou de tracking (CAPI)

Constat de la Direction, à auditer et qualifier :
Le projet facebook-ads ne possède AUCUNE intégration Conversions API (CAPI).
Aucune occurrence de : capi, conversions/events, action_source, event_name,
test_event_code dans le backend. Le système LIT les conversions Meta
(action_type onsite_conversion.lead_grouped, présent dans insights.js,
geographic.js, ai.js, facebook-api.js) mais ne RENVOIE aucun événement à Meta.

Ce que tu dois produire :
a) Confirmer ou infirmer le constat (audit CODE).
b) Qualifier la GRAVITÉ : quel est l'impact réel de l'absence de retour
   d'événements sur l'apprentissage de l'algorithme Meta et sur le coût
   d'acquisition.
c) Auditer le CONCEPT : le projet distingue-t-il un lead reçu d'un lead
   QUALIFIÉ ? Sans cette distinction, même une CAPI ne servirait à rien.
d) Constater aussi : absence de score de qualité formalisé, absence de système
   d'alertes. Gravité de chacun.

## 2. Cadre — LECTURE SEULE (règle 11)

Tu ne corriges rien, tu ne proposes pas d'implémentation.
Tu CONSTATES et tu QUALIFIES. Tes constats deviendront des demandes vers DEV,
via le Pilote — jamais directement.

## 3. Livrable

Rapport dans message-auditeur-pilote.md (REMPLACEMENT), EN-REPONSE-A : AUD-001.
Constats classés par gravité (critique / majeur / mineur).
Puis commit + push + STOP court.

—
DIRECTION — Infrastructure & Architecture
Responsable des standards communs et de la structure des projets
Dépôt : infra-agents-competences
