# Architecture — Marketing Dashboard

État documentaire au 29 octobre 2026, recoupé avec les arbres `main` des dépôts applicatifs et les sources citées dans l'audit.

## Composants

| Composant | Rôle |
|---|---|
| Frontend Netlify, HTML/CSS/JavaScript | Cockpit, Meta Ads, ChatGPT Ads, Conversions et interfaces métier |
| Backend Render, Node.js/Express | Routes API, clients fournisseurs, formulaires et traitements |
| SQLite / better-sqlite3 sur le disque Render | Leads, demandes site, échanges, sessions et files de notification |
| Site officiel MistralPro-Reno, OVH selon le suivi de livraison | Page publique `/devis-travaux/` utilisée par l'annonce |
| Meta Graph API | Campagnes, résultats et leads Facebook |
| OpenAI Advertiser API | Lecture serveur compte, campagnes et résultats ChatGPT Ads |
| SMSGate / Twilio / SMTP OVH / Web Push | SMS, téléphonie, e-mails et notifications selon leurs circuits distincts |

## Flux de demande de devis

Le formulaire du domaine officiel appelle `POST /public/lead-requests` sur le backend.
Le backend valide et enregistre dans une transaction SQLite : demande, rattachement au lead et alerte en attente.
Le reçu de stockage autorise la confirmation client ; l'alerte est traitée ensuite par le worker.
Les demandes sont affichées dans Conversions avec travaux, précision, origine et état d'alerte.

Aucun n8n n'est requis dans ce parcours.
Un échec SMS n'efface pas la demande et ne change pas le statut commercial en « contacté ».
L'UUID empêche le rejeu d'une même soumission ; le rapprochement site/Facebook demeure partiel.

Fichiers : `routes/site-leads.js`, `services/site-leads.js`, `routes/site-lead-page.js`, `public/site-lead-form/`.
Contrats détaillés : docs backend `CODE-045-SITE-INTAKE.md` et `GPT-ADS-FORM-INTEGRATION.md`.

## Module ChatGPT Ads

Frontend `js/chatgpt-ads.js` → accès Dashboard existant → `/api/chatgpt-ads` → `services/chatgpt-ads-api.js` → Advertiser API.

Quatre GET : status, account, campaigns, insights. Aucun endpoint natif d'écriture publicitaire.
Depuis le lot du 29/10, le desktop n'exige plus de connexion propriétaire supplémentaire pour ces lectures.
Le mobile conserve son authentification et ses routes séparées.
La clé Advertiser reste serveur. La clé Dashboard existante n'est pas une authentification propriétaire forte.

Référence d'accès actuelle : backend `docs/DIRECT-DASHBOARD-ADS-READS.md`.
Les anciennes notices d'accès administrateur ou de session desktop sont remplacées pour cette vue.

## Production et limites

- `main` : production Mistral Pro Reno ; branche `saas` distincte, hors de cette révision.
- Le plugin ChatGPT Ads Manager peut administrer le compte ; cela ne donne pas ces fonctions au module natif.
- Le suivi du 28/10 rapporte le formulaire et l'annonce déployés ; le parcours réel demande → Conversions → alerte reçue reste à valider.
- L'accès Ads direct est documenté comme déployé et observé le 29/10 ; il n'a pas été retesté en production pendant cet audit documentaire.
- Sauvegarde/restauration SQLite, livraison réelle des alertes et attribution OpenAI nécessitent leurs propres preuves.
