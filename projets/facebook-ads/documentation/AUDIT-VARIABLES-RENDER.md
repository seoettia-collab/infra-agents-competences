# AUDIT DES VARIABLES D'ENVIRONNEMENT RENDER — CODE-019

**Date :** 11/10/2026  
**Mode :** lecture seule stricte  
**Périmètre :** 4 services Render seulement ; aucune valeur de variable n'a été copiée ou consignée.

## Synthèse

| Service | Variables configurées dans Render | Orphelines configurées | Variables lues mais non configurées manuellement | Conclusion |
|---|---:|---:|---:|---|
| `mistral-pro-reno-backend` | 36 | 3 | 19 + `PORT` fourni par Render | Nettoyage utile ; 1 absence à impact sécurité. |
| `fb-ads-saas` | 20 | 0 | 32 + `PORT` fourni par Render | Configuration volontairement partielle ; plusieurs fonctions de communication/image indisponibles. |
| `mistralpro-reno-backend` | 7 | 3 | 0 + `PORT` fourni par Render | 3 reliquats SMSP sans lecture code. |
| `mistral-devis` | 7 | 0 | 7 + variables système Render | SMTP absent : fonction d'envoi email non configurée. |

> Les verdicts `manquante` suivent la définition de la mission : variable lue par le code mais non configurée manuellement sur le service. Une remarque précise lorsqu'un fallback rend l'absence non bloquante.

## 1. mistral-pro-reno-backend — production

Service Render : `srv-d6cq3hi4d50c73aa1rkg` — branche `main`.

| Variable | Utilisée par le code ? | Verdict | Remarque |
|---|---|---|---|
| `AGENT_PHONE_NUMBER` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `ALLOWED_ORIGINS` | non | orpheline | Aucune lecture runtime ; le CORS est défini statiquement dans server.js. |
| `ANTHROPIC_API_KEY` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `AUTO_REPLY_ALLOWLIST_PSID` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `AUTO_REPLY_ENABLED` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `BACKEND_URL` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `CACHE_TTL` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `CALLER_ID_NUMBER` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `DASHBOARD_API_KEY` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `ENABLE_MMS` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `FB_ACCESS_TOKEN` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `FB_AD_ACCOUNT_ID` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `FB_APP_ID` | non | orpheline | Aucune lecture runtime sur la branche main. |
| `FB_APP_SECRET` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `FB_PAGE_ID` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `FB_VERIFY_TOKEN` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `GITHUB_TOKEN` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `GOOGLE_APPLICATION_CREDENTIALS` | oui | utilisée | Utilisée par le proxy Pilote Drive ; un Secret File service-account.json est aussi présent sur le service. |
| `NODE_ENV` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `OPENAI_API_KEY` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `PILOTE_DRIVE_FOLDER_ID` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `PILOTE_PUSH_SECRET` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `PURGE_ENABLED` | non | orpheline | Résidu de la route temporaire CODE-015 ; le code de cette route a été retiré en CODE-018. |
| `RUNWAY_API_SECRET` | oui | utilisée | Nom prioritaire utilisé ; RUNWAYML_API_SECRET n'est qu'un alias de repli. |
| `SMS_GATEWAY_DEVICE_ID` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `SMS_GATEWAY_PASSWORD` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `SMS_GATEWAY_PHONE` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `SMS_GATEWAY_USERNAME` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `SMTP_FROM` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `SMTP_HOST` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `SMTP_PASS` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `SMTP_PORT` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `SMTP_USER` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `TWILIO_ACCOUNT_SID` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `TWILIO_AUTH_TOKEN` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `TWILIO_PHONE_NUMBER` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `AUTO_REPLY_MAX_DELAY_MS` | oui | manquante | Valeur par défaut intégrée : 10000 ms. |
| `AUTO_REPLY_MIN_DELAY_MS` | oui | manquante | Valeur par défaut intégrée : 5000 ms. |
| `AUTO_SMS_ENABLED` | oui | manquante | Absente ; le code/setting persistant conserve un comportement par défaut, donc pas de panne directe. |
| `CONTENT_PROVIDER` | oui | manquante | Absente ; défaut code = openai. |
| `DATA_DIR` | oui | manquante | Lue par le script de purge hors ligne uniquement ; pas nécessaire au serveur web normal. |
| `ENABLE_MESSENGER_SMS_TEST` | oui | manquante | Absente ; défaut = fonctionnalité test désactivée. |
| `FB_PAGE_ACCESS_TOKEN` | oui | manquante | Absente ; le service Messenger sait résoudre le token de page via FB_ACCESS_TOKEN + FB_PAGE_ID. |
| `IMAGE_PROMPT_MODE` | oui | manquante | Absente ; défaut intégré = full. |
| `IMAGE_PROVIDER` | oui | manquante | Absente ; sélection automatique selon les fournisseurs disponibles. |
| `MAINTENANCE_MODE` | oui | manquante | Absente ; défaut = mode maintenance inactif. |
| `OPENAI_CONTENT_MODEL` | oui | manquante | Absente ; modèle par défaut intégré. |
| `OPENAI_IMAGE_MODEL` | oui | manquante | Absente ; défaut intégré = gpt-image-2. |
| `OPENAI_REASONING` | oui | manquante | Absente ; défaut intégré = minimal. |
| `OPENAI_TEXT_MODEL` | oui | manquante | Absente ; modèle par défaut intégré. |
| `PUBLIC_BACKEND_URL` | oui | manquante | Absente ; fallback sur le protocole/hôte de la requête. |
| `PURGE_CONFIRMATION` | oui | manquante | Une seule lecture, dans le script de purge hors ligne ; l'argument CLI --confirm prend priorité. Inutile au runtime web. |
| `RUNWAYML_API_SECRET` | oui | manquante | Alias de secours absent ; aucun impact car RUNWAY_API_SECRET est configurée. |
| `RUNWAY_MODEL` | oui | manquante | Absente ; défaut intégré = gen4_image. |
| `SMS_GATEWAY_TOKEN` | oui | manquante | Absente ; impact sécurité : la validation du token webhook devient permissive quand ce token n'est pas configuré. |
| `PORT` | oui | utilisée | Fournie automatiquement par Render au runtime ; non configurée manuellement dans la liste du service. |

### Points production

- `PURGE_ENABLED` : **orpheline confirmée** ; la route temporaire a été retirée du code.
- `ALLOWED_ORIGINS` : **orpheline confirmée** ; le CORS utilise actuellement une liste statique dans `server.js`.
- `FB_APP_ID` : **orpheline confirmée** sur `main`.
- `SMS_GATEWAY_TOKEN` : **manquante avec impact sécurité** ; sans token configuré, la validation webhook du service SMS accepte les requêtes sans secret.
- `RUNWAY_API_SECRET` / `RUNWAYML_API_SECRET` : le code accepte deux noms pour le même usage, mais Render n'en configure qu'un. **Pas de doublon réellement configuré.**
- `PURGE_CONFIRMATION` : une seule lecture dans `scripts/purge-leads-communications.js`; c'est un fallback CLI, sans rôle dans le serveur web normal.

## 2. fb-ads-saas — SaaS gelé

Service Render : `srv-d7139du3jp1c7390flq0` — branche `saas`.

| Variable | Utilisée par le code ? | Verdict | Remarque |
|---|---|---|---|
| `ANTHROPIC_API_KEY` | oui | utilisée | Lecture runtime confirmée sur la branche saas. |
| `DASHBOARD_API_KEY` | oui | utilisée | Lecture runtime confirmée sur la branche saas. |
| `ENCRYPTION_SECRET` | oui | utilisée | Lecture runtime confirmée sur la branche saas. |
| `FB_ACCESS_TOKEN` | oui | utilisée | Lecture runtime confirmée sur la branche saas. |
| `FB_AD_ACCOUNT_ID` | oui | utilisée | Lecture runtime confirmée sur la branche saas. |
| `FB_APP_ID` | oui | utilisée | Lecture runtime confirmée sur la branche saas. |
| `FB_APP_SECRET` | oui | utilisée | Lecture runtime confirmée sur la branche saas. |
| `FB_OAUTH_CONFIG_ID` | oui | utilisée | Lecture runtime confirmée sur la branche saas. |
| `FB_REDIRECT_URI` | oui | utilisée | Lecture runtime confirmée sur la branche saas. |
| `FB_VERIFY_TOKEN` | oui | utilisée | Lecture runtime confirmée sur la branche saas. |
| `FRONTEND_URL` | oui | utilisée | Lecture runtime confirmée sur la branche saas. |
| `NODE_ENV` | oui | utilisée | Lecture runtime confirmée sur la branche saas. |
| `SAAS_BOOTSTRAP_OWNER_EMAIL` | oui | utilisée | Lecture runtime confirmée sur la branche saas. |
| `SAAS_BOOTSTRAP_OWNER_PASSWORD` | oui | utilisée | Lecture runtime confirmée sur la branche saas. |
| `SESSION_SECRET` | oui | utilisée | Lecture runtime confirmée sur la branche saas. |
| `STRIPE_PRICE_BUSINESS` | oui | utilisée | Lecture runtime confirmée sur la branche saas. |
| `STRIPE_PRICE_PRO` | oui | utilisée | Lecture runtime confirmée sur la branche saas. |
| `STRIPE_PRICE_STARTER` | oui | utilisée | Lecture runtime confirmée sur la branche saas. |
| `STRIPE_SECRET_KEY` | oui | utilisée | Lecture runtime confirmée sur la branche saas. |
| `STRIPE_WEBHOOK_SECRET` | oui | utilisée | Lecture runtime confirmée sur la branche saas. |
| `AGENT_PHONE_NUMBER` | oui | manquante | Absente ; certaines actions d'appel doivent fournir le numéro agent autrement. |
| `AUTO_REPLY_ALLOWLIST_PSID` | oui | manquante | Absente ; sans allowlist, elle ne restreint rien si l'auto-réponse est activée. |
| `AUTO_REPLY_ENABLED` | oui | manquante | Absente ; défaut = auto-réponse désactivée. |
| `AUTO_REPLY_MAX_DELAY_MS` | oui | manquante | Absente ; défaut intégré = 10000 ms. |
| `AUTO_REPLY_MIN_DELAY_MS` | oui | manquante | Absente ; défaut intégré = 5000 ms. |
| `AUTO_SMS_ENABLED` | oui | manquante | Absente ; fallback applicatif, mais les autres dépendances SMS sont elles-mêmes absentes. |
| `BACKEND_URL` | oui | manquante | Absente ; fallback codé vers l'URL du backend production main, risque de croisement si la fonction Twilio est utilisée. |
| `CACHE_TTL` | oui | manquante | Absente ; défaut intégré = 900 s. |
| `ENABLE_MESSENGER_SMS_TEST` | oui | manquante | Absente ; défaut = test désactivé. |
| `ENABLE_MMS` | oui | manquante | Absente ; défaut = MMS désactivé. |
| `FB_PAGE_ACCESS_TOKEN` | oui | manquante | Absente ; valeur globale non fournie, certains flux tenant peuvent fournir leur propre contexte. |
| `FB_PAGE_ID` | oui | manquante | Absente ; plusieurs chemins Messenger/publication globaux peuvent échouer sans contexte tenant. |
| `IMAGE_PROMPT_MODE` | oui | manquante | Absente ; défaut intégré = full. |
| `IMAGE_PROVIDER` | oui | manquante | Absente ; sélection automatique, mais aucune clé image n'est configurée. |
| `MAINTENANCE_MODE` | oui | manquante | Absente ; défaut = mode maintenance inactif. |
| `META_APP_ID` | oui | manquante | Alias absent ; fb-token-refresher retombe sur FB_APP_ID, qui est configurée. |
| `META_APP_SECRET` | oui | manquante | Alias absent ; fb-token-refresher retombe sur FB_APP_SECRET, qui est configurée. |
| `OPENAI_API_KEY` | oui | manquante | Absente ; fournisseur image OpenAI indisponible. |
| `RUNWAYML_API_SECRET` | oui | manquante | Absente ; fournisseur image Runway indisponible. Avec OPENAI_API_KEY absente, aucune clé de génération d'image n'est configurée. |
| `SMS_GATEWAY_DEVICE_ID` | oui | manquante | Absente ; SMS Gateway non configuré. |
| `SMS_GATEWAY_PASSWORD` | oui | manquante | Absente ; SMS Gateway non configuré. |
| `SMS_GATEWAY_PHONE` | oui | manquante | Absente ; SMS Gateway non configuré. |
| `SMS_GATEWAY_TOKEN` | oui | manquante | Absente ; validation token webhook non configurée. |
| `SMS_GATEWAY_USERNAME` | oui | manquante | Absente ; SMS Gateway non configuré. |
| `SMTP_FROM` | oui | manquante | Absente ; messagerie email non configurée. |
| `SMTP_HOST` | oui | manquante | Absente ; messagerie email non configurée. |
| `SMTP_PASS` | oui | manquante | Absente ; messagerie email non configurée. |
| `SMTP_PORT` | oui | manquante | Absente ; messagerie email non configurée. |
| `SMTP_USER` | oui | manquante | Absente ; messagerie email non configurée. |
| `TWILIO_ACCOUNT_SID` | oui | manquante | Absente ; Voice Twilio non configuré. |
| `TWILIO_AUTH_TOKEN` | oui | manquante | Absente ; Voice Twilio non configuré. |
| `TWILIO_PHONE_NUMBER` | oui | manquante | Absente ; Voice Twilio non configuré. |
| `PORT` | oui | utilisée | Fournie automatiquement par Render au runtime ; non configurée manuellement. |

### Points SaaS

- Aucune variable configurée n'est orpheline dans la branche `saas`.
- `META_APP_ID` / `META_APP_SECRET` sont des alias de secours ; `FB_APP_ID` / `FB_APP_SECRET` sont configurées et utilisées.
- `RUNWAYML_API_SECRET` et `OPENAI_API_KEY` sont absentes : les deux fournisseurs d'image prévus par le code sont indisponibles.
- Les familles Twilio, SMS Gateway et SMTP ne sont pas configurées sur ce service.
- `BACKEND_URL` est absente ; le fallback Twilio codé pointe vers le backend production principal. À corriger avant toute réactivation de cette fonction sur le SaaS.
- Aucun changement recommandé ici sans décision spécifique : la branche SaaS est gelée.

## 3. mistralpro-reno-backend — site vitrine

Service Render : `srv-d6mjepa4d50c73cubleg` — branche `main`.

| Variable | Utilisée par le code ? | Verdict | Remarque |
|---|---|---|---|
| `SMSP_LOGIN` | non | orpheline | Aucune lecture dans le dépôt main ; reliquat probable d'un ancien fournisseur SMS. |
| `SMSP_PASSWORD` | non | orpheline | Aucune lecture dans le dépôt main ; reliquat probable d'un ancien fournisseur SMS. |
| `SMSP_SENDER` | non | orpheline | Aucune lecture dans le dépôt main ; reliquat probable d'un ancien fournisseur SMS. |
| `SMTP_HOST` | oui | utilisée | Lue par server.js. |
| `SMTP_PASS` | oui | utilisée | Lue par server.js. |
| `SMTP_PORT` | oui | utilisée | Lue par server.js. |
| `SMTP_USER` | oui | utilisée | Lue par server.js. |
| `PORT` | oui | utilisée | Fournie automatiquement par Render au runtime. |

### Points site vitrine

- Les 4 variables SMTP configurées sont utilisées.
- `SMSP_LOGIN`, `SMSP_PASSWORD`, `SMSP_SENDER` n'ont aucune lecture dans le dépôt actuel : **3 orphelines confirmées**.

## 4. mistral-devis

Service Render : `srv-d8jgvr77f7vs73bed3vg` — branche `main`.

| Variable | Utilisée par le code ? | Verdict | Remarque |
|---|---|---|---|
| `ADMIN_PASSWORD` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `ADMIN_USER` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `ANTHROPIC_API_KEY` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `ANTHROPIC_MODEL` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `DATABASE_URL` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `SESSION_SECRET` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `SIGNNOW_API_KEY` | oui | utilisée | Lecture runtime confirmée sur la branche main. |
| `SIGNNOW_SENDER_EMAIL` | oui | manquante | Absente ; fallback d'adresse expéditeur intégré au code SignNow. |
| `SMTP_FROM` | oui | manquante | Absente ; fallback sur SMTP_USER, mais SMTP_USER est lui-même absent. |
| `SMTP_HOST` | oui | manquante | Absente ; l'endpoint d'envoi email retourne 503 tant que la configuration SMTP de base manque. |
| `SMTP_PASS` | oui | manquante | Absente ; l'endpoint d'envoi email retourne 503 tant que la configuration SMTP de base manque. |
| `SMTP_PORT` | oui | manquante | Absente ; défaut intégré = 465. |
| `SMTP_USER` | oui | manquante | Absente ; l'endpoint d'envoi email retourne 503 tant que la configuration SMTP de base manque. |
| `PUBLIC_BASE_URL` | oui | manquante | Lue uniquement par le script d'enregistrement webhook SignNow ; fallback sur l'URL Render actuelle. |
| `PORT` | oui | utilisée | Fournie automatiquement par Render au runtime. |
| `RENDER_GIT_COMMIT` | oui | utilisée | Variable système fournie automatiquement par Render. |

### Points Mistral Devis

- Les 7 variables configurées sont réellement utilisées.
- Le bloc SMTP requis pour l'envoi d'email n'est pas configuré : `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` manquent et le code répond explicitement 503 dans ce cas.
- `SMTP_PORT` et `SMTP_FROM` ont des fallbacks, mais ne suffisent pas sans le trio SMTP de base.
- `SIGNNOW_SENDER_EMAIL` est optionnelle grâce à un fallback intégré.
- `PUBLIC_BASE_URL` est limitée à un script opérateur SignNow et possède un fallback vers l'URL Render actuelle.
- `PORT` et `RENDER_GIT_COMMIT` sont fournis automatiquement par Render.

## 5. Hypothèses demandées par le Pilote

| Hypothèse | Résultat |
|---|---|
| `PURGE_ENABLED` est orpheline | **Confirmé** sur la production : présente dans Render, aucune lecture dans le code actuel. |
| `CODE_BOT_TOKEN` n'a plus de trace | **Confirmé** : aucune occurrence dans les 4 dépôts/branches audités et variable non présente dans les 4 services. |
| `ETHEREAL_API` n'a plus de trace | **Confirmé** : aucune occurrence et non configurée. |
| `ETHEREAL_API_KEY` n'a plus de trace | **Confirmé** : aucune occurrence et non configurée. |
| `ETHEREAL_CACHE` n'a plus de trace | **Confirmé** : aucune occurrence et non configurée. |
| `ETHEREAL_WEB` n'a plus de trace | **Confirmé** : aucune occurrence et non configurée. |
| `RUNWAY_API_SECRET` et `RUNWAYML_API_SECRET` sont un doublon | **Doublon de nom dans le code main, pas dans Render** : production ne configure que `RUNWAY_API_SECRET`. Le SaaS, lui, lit seulement `RUNWAYML_API_SECRET` et ne la configure pas. |
| `PURGE_CONFIRMATION` est encore utile | **Pas au runtime web** : une seule lecture subsiste dans le script de purge hors ligne, comme fallback après l'argument CLI. |

## 6. Renommage des services Render

Render documente que le nom d'un Web Service participe à son sous-domaine `onrender.com`, et ses variables système `RENDER_EXTERNAL_URL` / `RENDER_EXTERNAL_HOSTNAME` suivent l'URL attribuée. La documentation Render indique également que ces références s'actualisent lors d'un renommage.

**Conclusion : renommer un service peut changer son URL `onrender.com`.**

| Service actuel | Nom proposé | Domaine personnalisé configuré ? | Renommage sûr aujourd'hui ? | Risque constaté |
|---|---|---|---|---|
| `mistral-pro-reno-backend` | `facebook-ads-backend` | **Non** | **NON** | Le frontend `js/config.js` et des fallbacks backend référencent l'URL Render actuelle. |
| `fb-ads-saas` | `facebook-ads-saas` | **Non** | **NON** | Aucun domaine stable ne protège les consommateurs de l'URL Render actuelle. |
| `mistralpro-reno-backend` | `site-vitrine-backend` | **Non** | **NON** | Aucun domaine stable ne protège l'URL actuelle. |

Les trois pages Settings montrent uniquement l'action **Add Custom Domain** : aucun Custom Domain n'est attaché à ces services.

**Recommandation avant tout renommage :**
1. attribuer un domaine personnalisé stable à chaque service concerné ;
2. basculer les consommateurs/webhooks vers ce domaine ;
3. vérifier les flux ;
4. seulement ensuite renommer le service Render.

## 7. Candidats au nettoyage ultérieur

Aucune suppression n'a été effectuée pendant CODE-019.

Candidats **confirmés** :
- Production : `PURGE_ENABLED`, `ALLOWED_ORIGINS`, `FB_APP_ID`.
- Site vitrine : `SMSP_LOGIN`, `SMSP_PASSWORD`, `SMSP_SENDER`.

À traiter comme **configuration manquante**, pas comme nettoyage :
- Production : `SMS_GATEWAY_TOKEN` en priorité pour verrouiller la validation webhook.
- SaaS : dépendances image, SMS, email et voix listées ci-dessus si ces fonctionnalités doivent être réactivées.
- Mistral Devis : trio SMTP de base si l'envoi email doit fonctionner.

## Sources techniques

- Dépôts Git aux branches réellement déployées, recherche `process.env.*` hors `node_modules`.
- Tableau de bord Render, section Environment, lecture des **noms de clés uniquement**.
- Render Docs : *Default Environment Variables*, *Web Services*, *Custom Domains* et documentation officielle sur `RENDER_EXTERNAL_URL`.
