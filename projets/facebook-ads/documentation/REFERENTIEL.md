# Référentiel initial — projet facebook-ads

Version 1.0 — établi le 31/08/2026 par documentation-technique (DOC-001).

Objectif : rendre le projet reprenable par n'importe quelle session sans relire
de conversation. Ce document décrit le RÉSULTAT, pas le récit.

Sources : conversation « Facebook dashboard technician role 03 » (historique),
dépôts `facebook-ads-backend` / `facebook-ads-frontend` lus le 31/08/2026,
docs internes `docs/ARCHITECTURE.md` `docs/CHECKLIST.md` `docs/FICHE_TECHNIQUE.md`
et `docs/SAAS_*.md` (branche saas), constats vérifiés par la Direction.
Quand la doc interne et le code divergent, **le code fait foi** — les écarts sont
listés en §6.

---

## 1. Ce que fait le projet

Outil unique de pilotage de l'acquisition Meta Ads et de traitement des leads
pour une entreprise de rénovation. Objectif métier : **ne perdre aucun contact
entrant et répondre vite**.

Deux moitiés indissociables :

| Moitié | Rôle |
|---|---|
| **Acquisition** | lire les campagnes Meta, mesurer, auditer, créer et publier des pubs |
| **Conversion** | capter les leads, centraliser les échanges 4 canaux, assister la réponse par IA, suivre le pipeline CRM |

**7 vues** : Cockpit · Gestion Ads · IA Reco · Studio Pub · Conversations ·
Publication · Géographie. Conversations est le cœur d'usage quotidien.

### Topologie

| Élément | Valeur |
|---|---|
| Backend | Node.js / Express / SQLite (better-sqlite3) — Render, auto-deploy `main` |
| Frontend | HTML/CSS/JS vanilla, aucun framework — Netlify, auto-deploy `main` |
| Backend prod | https://facebook-ads-backend-s20a.onrender.com |
| Frontend prod | https://mistral-fb-ads-dashboard.netlify.app |
| Auth API | header `x-api-key` sur `/api/*` |
| API Meta | Graph API v25.0 |
| Volumétrie | backend 566 commits sur `main`, frontend 460 commits sur `main` |

**Deux déploiements Render autonomes**, même dépôt, branches différentes :
`main` = production mono-client (Mistral Pro Reno), `saas` = instance
multi-tenant. Tenant 1 = Ricardo / Mistral Pro Reno ; tenant 2 = Louis /
Mistral Intérieurs (pose de cuisines).

---

## 2. Ce qui est livré et opérationnel

### Acquisition
- Sync delta Graph API toutes les 5 min + snapshots intraday 5 min.
- Agrégation dépense / impressions / clics / CTR / CPC / CPL / portée /
  fréquence aux niveaux campagne, publicité et jour. **Vérifié.**
- Gestion Ads : liste campagnes/adsets/ads, édition budget inline,
  activation/pause, édition créative, indicateurs de flux temps réel.
- IA Reco : audit de configuration, Copilote avec actions auto-exécutables
  (`fix_cta`, `adjust_radius`, `open_meta`, `info_only`), système Ignore,
  mode réduction de budget orienté rentabilité (FB-AI-07).
- Contexte métier par campagne et par pub (tables `campaign_context` /
  `ad_context`, routes `/api/context/*`) injecté dans les prompts (FB-AI-05).
- Studio Pub : génération texte GPT-5.5 + image gpt-image-2, fallback Claude
  automatique ; « Décliner une pub » avec 3 variantes sur univers visuels
  imposés (ADS-DECLINE) ; publication directe en ACTIVE.
- Géographie : performance par région + audiences.

### Conversion
- Leads Facebook Lead Ads synchronisés ; extraction Messenger → lead auto.
- Pipeline CRM **10 statuts** (nouveau → devis signé → terminé), statut éditable
  inline, note par lead, bloc-notes `lead_notes` multi-entrées.
- Protection anti-résurrection : `upsertLead()` exclut `crm_status = 'terminé'`
  et `deleted = 1`.
- Catégories métier (salle de bain, cuisine, combles, rénovation complète,
  salon, autre) + vues Archives et Relance (LEAD-CATEGORY-01 / LEAD-RELANCE-01).
- **4 canaux centralisés** dans le Flux Échanges : SMS (passerelle Android
  SMSGate), appels (Twilio, sortants + entrants transférés), Messenger
  (page Facebook, photos in/out), Email (SMTP OVH + BCC d'archivage).
- **Chaîne webhook → lead → SMS automatique : opérationnelle.** Envoi à T+2 min,
  respect des heures ouvrables, relance J+1, opt-out STOP. **Vérifié.**
- Filtrage anti-bruit : un SMS entrant dont le numéro n'est pas rattaché à un
  lead est ignoré (banque, spam, livraisons…).
- Rattachement robuste : `findLeadByPhone` cherche le numéro aussi dans
  `full_name` et `raw_fields` ; idempotence des SMS entrants via `provider_sid`.
- Rédacteur IA : civilité M/F/neutre, ton Pro/Cordial cumulables, voix Je/Nous
  exclusives, textarea auto-agrandie, Copier / Envoyer SMS / Envoyer Email ;
  bouton « Répondre avec IA » sous chaque message reçu.

### Socle
- Middlewares : maintenance → security-logger → rate-limit → auth → validation.
- Cache backend à TTL différencié + cache frontend 60 s + refresh sélectif.
- Design system v2 fusionné sur `main` : `redesign.css` (carré, plat, hairlines,
  indigo + orange Mistral, Plus Jakarta Sans / JetBrains Mono) et UI Kit
  (sidebar 232 px, topbar, KPI sparklines SVG, score gauge).

---

## 3. Ce qui est en cours ou en suspens

| Sujet | État | Détail |
|---|---|---|
| Branche `saas` | ~70 % du socle livré, ~25 % éprouvé | multi-tenant DB/auth/OAuth FB/Stripe/console admin ; credentials Twilio, SMSGate, SMTP et téléphones **par tenant** ; profils métier par tenant (`tenant-profile.js`) |
| Tests E2E SaaS | 0 % | 11 scénarios listés, aucun exécuté |
| Onboarding tenant 2 (Louis) | en cours | test du flow signup en conditions réelles |
| Auto-reply Messenger phase 2 | bloqué ~90 % | dépend de Business Verification Meta puis App Review `pages_messaging` |
| Conversation IA illimitée | reporté | jamais lancé |
| Filtres de statut sur Flux Échanges | reporté | jamais lancé |
| Conversions API (CAPI) | **absente** | voir §5 et §6 |

**Activité : le projet est à l'arrêt depuis fin mai 2026.** Dernier commit
backend `main` 26/05, frontend `main` 28/05, branche `saas` 12/05. Toute reprise
doit commencer par vérifier l'état réel de la production (tokens Meta 60 j,
passerelle Android, base SQLite) avant d'ouvrir un chantier.

---

## 4. Décisions structurantes déjà prises

| # | Décision | Motif |
|---|---|---|
| D1 | Frontend **vanilla JS**, aucun framework | maintenabilité par une seule personne, pas de chaîne de build |
| D2 | **SQLite fichier** côté Render, pas de SGBD externe | coût et simplicité ; volumétrie faible |
| D3 | Multi-tenant sur une **branche `saas` séparée** + second service Render autonome | isoler totalement la prod du client pilote pendant la construction du SaaS |
| D4 | **Credentials par tenant** (Twilio, SMSGate, SMTP, tokens FB chiffrés via `ENCRYPTION_SECRET`) | indépendance complète des clients, révocation individuelle |
| D5 | Suivi des leads **uniquement via Graph API Lead Ads** — pixel et CAPI explicitement bannis des prompts IA (`routes/ai.js`, `services/claude-api.js`) | pas de site externe à instrumenter à l'époque ; l'IA proposait des recommandations pixel hors sujet |
| D6 | **L'IA est une boîte à outils à règles** : les contraintes métier sont écrites dans les prompts, jamais déduites | max 2 pubs actives à 30 €/j ; aucun jugement sur une pub de moins de 24 h ; « pub par métier précis » plutôt que rénovation générique ; contraintes de civilité et de pronom |
| D7 | Réponse aux messages **par IA uniquement** (bouton « Répondre » manuel supprimé) | garantir un ton homogène et relu |
| D8 | Répartition des modèles : Claude sur IA Reco / audit / rédaction, GPT-5.5 sur Studio Pub avec fallback Claude | qualité constatée par domaine ; le fallback évite la panne de génération |
| D9 | Aucun secret dans les fichiers versionnés ; le token GitHub vit uniquement dans une compétence dédiée | `docs/GOUVERNANCE.md` supprimé du dépôt (SECU-01) après exposition d'un token |
| D10 | Design system v2 appliqué en **override additif** (`redesign.css` chargé en dernier) plutôt qu'en refonte | réversible en commentant une ligne |

---

## 5. Constats de la Direction intégrés

1. Chaîne webhook → lead → SMS automatique : **opérationnelle**.
2. Agrégation CPL / CTR / dépense / impressions / clics : **en place**.
3. **Conversions API absente** : le système lit les conversions Meta mais ne
   renvoie aucun événement. L'algorithme Meta n'apprend pas la qualité des leads.
4. **Aucun score de qualité formalisé, aucun système d'alertes.**

Précision apportée par la lecture du code sur les points 3 et 4 :

- Le trou CAPI n'est pas un oubli, c'est le **prolongement de la décision D5**.
  Les prompts interdisent explicitement à l'IA de recommander pixel, CAPI ou
  Events Manager. Toute implémentation de CAPI devra donc **amender ces prompts
  en même temps que le code**, sinon l'outil contredira sa propre IA.
- La colonne `leads.score` existe (`INTEGER DEFAULT 50`) et sert au tri par
  défaut et au badge « Top 3 », mais **aucune ligne de code ne l'alimente**.
  Tous les leads valent donc 50 : le tri par score et le Top 3 sont inertes
  aujourd'hui.

---

## 6. Points de vigilance et dette connue

### Critique

| # | Point | Conséquence |
|---|---|---|
| V1 | **Boucle de qualité absente** : pas de CAPI, pas de score alimenté, pas d'alertes | Meta optimise sur le volume de leads, pas sur leur valeur ; le budget paie des leads non qualifiés |
| V2 | **Divergence `main` / `saas`** : ancêtre commun au 18/03/2026 ; `saas` a 77 commits d'avance, `main` en a 137 | 137 commits de production jamais portés sur le SaaS (ads-decline, contexte FB-AI-05/07, filtres leads, détection formulaire Dynamic Creative, catégories, dédup SMS entrants, `findLeadByPhone` élargi, bascule gpt-image-2…). Le coût du rapprochement croît à chaque livraison sur `main`. Même divergence côté frontend (`saas` +97 / −29) |
| V3 | **Documentation interne obsolète** : `docs/ARCHITECTURE.md`, `CHECKLIST.md`, `FICHE_TECHNIQUE.md` arrêtées au 23/04/2026, soit ~2 mois de livraisons non tracées | la CHECKLIST annonce « 99 % » et « aucun bug connu » : ces chiffres ne sont pas fiables et ne doivent pas être cités |

### Élevé

| # | Point | Conséquence |
|---|---|---|
| V4 | **Aucun test automatisé**, ni unitaire sur `main`, ni E2E sur `saas` | toute régression n'est détectée qu'en production, par l'usage |
| V5 | **SQLite en fichier sur Render**, sans stratégie de sauvegarde documentée | perte possible de l'historique CRM, des notes et du flux d'échanges |
| V6 | **`ENCRYPTION_SECRET` sauvegardé à un seul endroit** (objectif : 3) | perte = tokens Facebook de tous les tenants illisibles, ré-onboarding complet |
| V7 | **Passerelle SMS = un téléphone Android physique** (point de défaillance unique) ; RCS activé intercepte les messages avant la couche SMS lue par SMSGate | incident déjà constaté : réponses de leads jamais remontées |
| V8 | Tokens Facebook valables 60 j ; refresh automatique livré **côté `saas` seulement** | expiration silencieuse possible côté `main` |

### Modéré

| # | Point |
|---|---|
| V9 | Sessions SaaS en MemoryStore : invalidées à chaque redémarrage Render |
| V10 | `package.json` désaligné (2.8.0) par rapport aux versions annoncées (3.5.x) |
| V11 | Fichiers orphelins dans le frontend, non référencés par `index.html` : `js/ads-manager-BACKUP.js`, `js/creatives.js`, `css/buttons-v2.css`, `css/dashboard.css`, `css/styles.css` |
| V12 | `FB_ACCESS_TOKEN` et `FB_AD_ACCOUNT_ID` encore présents dans les variables d'environnement SaaS (retrait volontairement reporté) |
| V13 | Auto-reply Messenger suspendu à une validation Meta hors de notre contrôle |

### Particularités Meta à connaître (pièges déjà payés)

- Le numéro de téléphone d'un lead Facebook se trouve souvent dans `full_name`
  ou `raw_fields`, pas dans `phone_number`.
- Les pubs Dynamic Creative exposent le formulaire via
  `asset_feed_spec.call_to_actions[].value.lead_gen_form_id`, pas via
  `object_story_spec`.
- Depuis les restrictions `user_messaging` (2024), `/<senderId>?fields=name` est
  inexploitable : passer par `/<page_id>/conversations?fields=participants`.
- `standard_enhancements` est obsolète sur les créatives ; la Copy API recopie
  des champs périmés — créer les pubs « from scratch ».

---

## 7. Comment reprendre le projet

1. Lire ce référentiel, puis la gouvernance du projet dans le hub.
2. Lire les docs internes du dépôt **en sachant qu'elles s'arrêtent au 23/04** —
   le code fait foi au-delà.
3. Choisir explicitement la branche : `main` (production Mistral Pro Reno) ou
   `saas` (multi-tenant). Ne jamais livrer sur les deux sans arbitrage.
4. Avant tout push : `git fetch origin` puis rebase — la branche distante est
   fréquemment en avance.
5. Seul l'agent `ingenieur-developpeur` écrit du code (règle 9 du socle).
6. Après chaque évolution livrée, la mettre à jour ici.

---

*Fin du référentiel initial v1.0 — documentation-technique — 31/08/2026*
