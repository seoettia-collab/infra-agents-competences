# Message ingenieur-developpeur -> Pilote

MESSAGE-ID : DEV-003-R
EN-REPONSE-A : DEV-003
DATE : 2026-09-01
AGENT : ingenieur-developpeur (facebook-ads)
OBJET : Vérification lecture seule des recommandations Meta sur le compte réel

---

## 1. Sources lues

| Source | Référence |
|---|---|
| Hub `infra-agents-competences` | `main` `67646f742c3b84789da7d1c427ea7ad6771de1a2` |
| Socle | `standards-communs/organisation-agents.md` (pré-vol, hiérarchie des sources, règle 14) |
| META-006-CORR | commit `ef5fbea` (lu via `git show`, comme demandé) |
| ARCH-003-R | commit `6b1c2fb` (lu via `git show`) |
| Backend `main` | `b297f75ce874799b428435e229d177a570e56944` — lu seulement |

Backend consulté en lecture pour identifier les flux déjà autorisés :
`services/facebook-api.js` (version Graph `v25.0`), `routes/campaigns.js`,
`routes/insights.js`, `routes/ai.js`. **Aucun fichier modifié.**

---

## 2. VERDICT

### `PARTIEL`

**Aucune des trois surfaces de recommandations n'a pu être lue depuis mon
environnement d'exécution.** Ce qui a été établi, c'est que le blocage ne vient
**pas** des droits du compte.

Je ne conclus donc **pas** `0_RECO` : la question métier « le compte reçoit-il
des recommandations utiles ? » reste **ouverte**. Conclure zéro sur la base de
ces trois échecs d'accès serait exactement l'erreur que DEV-003 §2.A interdit.

---

## 3. Résultats par surface

### A. Ads Manager — **NON ACCESSIBLE depuis mon environnement**

```
GET https://adsmanager.facebook.com/adsmanager/manage/campaigns
-> HTTP 302
-> redirect: business.facebook.com/business/loginpage/?next=...&login_options[0]=FB
```

Constat brut : redirection vers la page de connexion Business. Je n'ai ni
navigateur ni session Facebook authentifiée ; l'interface exige une session
utilisateur interactive.

Conséquence : **ni recommandations ni Opportunity Score n'ont été observés**.
Aucune conclusion tirée de cette surface, conformément à DEV-003 §2.A.

### B. Ads MCP officiel — **MCP INDISPONIBLE**

Le point d'entrée officiel **existe et répond** :

```
GET  https://mcp.facebook.com/ads
-> HTTP 405 {"title":"Method Not Allowed",
             "detail":"MCP endpoints accept POST for JSON-RPC; GET is not supported."}

POST https://mcp.facebook.com/ads   (JSON-RPC "initialize", protocole 2025-06-18)
-> HTTP 401 {"title":"Authentication Required",
             "detail":"Failed to authenticate MCP request"}

POST https://mcp.facebook.com/ads   (JSON-RPC "tools/list")
-> HTTP 401  (identique)
```

Cause observable de l'indisponibilité, en deux points :
1. le serveur exige une authentification que je ne peux pas fournir ;
2. **aucun connecteur Meta/Facebook Ads n'existe** dans le répertoire de
   connecteurs de ma session, ni dans mes outils disponibles — recherche faite
   sur `meta ads`, `facebook ads`, `ads manager`, `marketing api`. Les seuls
   résultats sont des agrégateurs tiers (Windsor.ai, Supermetrics), qui ne sont
   **pas** le MCP officiel Meta et ne sont ni connectés ni autorisés.

**Le manifeste n'a donc pas pu être lu.** Le nom exact de l'outil de
recommandations reste **NON CONFIRMÉ**, exactement comme META l'avait marqué.
Aucun appel write n'a été tenté ; les deux seuls appels émis sont `initialize`
et `tools/list`, tous deux en lecture.

### C. Marketing API — **APPEL NON ÉMISSIBLE**

L'endpoint visé, tel que défini par META-006-CORR et ARCH-003-R :

```
GET /v25.0/act_1485808979635813/recommendations
```

Requête émise sans credentials, pour objectiver le refus :

```
-> HTTP 403
-> OAuthException, code 200 : "Provide valid app ID"
```

Ce résultat ne dit rien du compte : il dit seulement qu'aucun jeton n'était
joint. **Je ne dispose d'aucun jeton d'accès Meta**, et je ne dois ni en
extraire ni en exposer un.

Le jeton de production vit uniquement dans les variables d'environnement Render
du backend. J'ai vérifié le code : **aucune route existante ne permet d'appeler
un edge Graph arbitraire** (pas de proxy, pas de paramètre d'endpoint
injectable). Émettre cet appel exigerait donc d'ajouter une route — c'est-à-dire
une modification de code, interdite par DEV-003 §5.

**Ce qui a pu être établi sans exposer aucun secret.** La route de diagnostic
existante `GET /api/ai/publish/video-permissions` renvoie les *scopes* du jeton
de production, sans jamais renvoyer le jeton lui-même :

```
HTTP 200
user_token_present : true      user_token_valid : true
scopes : catalog_management, pages_show_list, ads_management, ads_read,
         business_management, pages_messaging, leads_retrieval,
         pages_read_engagement, pages_manage_metadata, pages_manage_ads,
         pages_manage_posts, pages_utility_messaging, public_profile
```

**`ads_read` : présent. `business_management` : présent.** Le jeton est valide.
La permission minimale attendue par META-006-CORR §2 est donc **déjà acquise**.

Le verdict `PERMISSION` de la grille est ainsi **écarté** : le compte a les
droits. Le blocage est un blocage d'accès depuis mon environnement, pas un
blocage de permission côté Meta. Il ne faut pas envoyer quelqu'un corriger des
permissions qui sont correctes.

Contrôle complémentaire, même jeton, même compte : `GET /api/facebook/campaigns`
répond `HTTP 200` avec 1 campagne. La lecture publicitaire fonctionne donc
réellement en production — seul l'edge `/recommendations` n'a pas pu être
atteint.

---

## 4. Types de recommandations observés

**Aucun.** Aucune recommandation n'a été lue sur aucune surface. Je ne reprends
volontairement aucun des exemples de META-006-CORR §4 : ils décrivent ce qu'il
faudrait trouver, pas ce qui a été trouvé.

## 5. Opportunity Score

**Non constaté.** Le score n'est exposé que dans l'interface Ads Manager, qui
n'est pas accessible depuis mon environnement. Ni présence ni absence ne peuvent
être affirmées. Aucune tentative de reconstruction ou de calcul.

---

## 6. Ce qui débloquerait la vérification

Trois voies, par ordre de coût croissant. Aucune n'est engagée : elles relèvent
de l'arbitrage du Pilote et du Gérant.

1. **Le Gérant ouvre Ads Manager** sur le compte Mistral Pro Reno, onglet
   Recommandations, et regarde la colonne Opportunity Score. C'est la voie la
   plus rapide, sans code, sans permission supplémentaire — et META-006-CORR §1
   la classe déjà en premier précisément pour cette raison.

2. **Le Gérant exécute lui-même un appel unique**, depuis un poste où il
   dispose du jeton, sans le transmettre à personne :

   ```
   GET https://graph.facebook.com/v25.0/act_1485808979635813/recommendations
       ?access_token=<SON_JETON>
   ```

   Champs attendus d'après ARCH-003-R : `recommendation_type`, `title`,
   `importance`, `lift_estimate`, `opportunity_score_lift`, lien profond
   Ads Manager. Le corps de la réponse, jeton retiré, suffirait à trancher.

3. **Un lot ultérieur ajoute une route backend de lecture seule** dédiée à cet
   edge. C'est une modification de code : hors périmètre DEV-003, à commander
   explicitement si le Pilote le décide.

Pour la voie MCP, aucune action de ma part n'est possible tant qu'aucun
connecteur Meta Ads officiel n'est disponible et autorisé dans la session.

---

## 7. Réserves

1. La question de fond — le compte reçoit-il des recommandations utiles ? —
   **n'est pas tranchée**. La réserve R2 sur ARCH-003 reste donc entière : rien
   ne justifie encore de construire le bloc V1 « Vu par Meta ».
2. Une conclusion négative ne doit pas être déduite de ce rapport. Les trois
   échecs sont des échecs d'accès, pas des observations sur le compte.
3. Le nom de l'outil MCP de recommandations reste NON CONFIRMÉ : le manifeste
   n'a pas pu être lu.
4. Aucun sens ni type Meta n'a été interprété : aucun n'a été observé. Aucune
   recherche métier Meta n'a été conduite, conformément à DEV-003 §5.

---

## 8. Confirmations

- **Aucune écriture Meta.** Aucun POST, PATCH ou DELETE vers Graph. Les seuls
  appels émis sont : un GET Ads Manager (redirigé vers login), un GET et deux
  POST JSON-RPC de lecture vers `mcp.facebook.com/ads` (`initialize`,
  `tools/list`, tous deux refusés en 401), un GET `/recommendations` sans jeton
  (403), et deux GET sur des routes de lecture existantes de notre propre
  backend.
- **Aucun outil MCP write appelé.** Aucun outil MCP appelé du tout : la
  connexion n'a jamais abouti.
- **Aucun code modifié.** Backend et frontend vérifiés : `git status` vierge sur
  les deux clones. Aucun commit, aucune branche créée, aucun déploiement.
- **Aucune campagne créée, modifiée ou mise en pause.**
- **Aucune activation CAPI.** Aucune modification de permissions.
- **Aucun secret dans ce rapport.** Aucun jeton lu, affiché, journalisé ou
  versionné. Seuls les *scopes* — qui ne sont pas un secret — sont rapportés.
- **`main` et `saas` intactes** sur les deux dépôts.
- Seul fichier écrit par cette mission : le présent rapport.

---

— ingenieur-developpeur · facebook-ads
