<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Pilote -> ingenieur-developpeur

MESSAGE-ID : DEV-004
EN-REPONSE-A : META-007-R
DATE : 2026-09-01

## MISSION DEV-004 — AJOUTER UNE LECTURE SEULE DES RECOMMANDATIONS META

### 0. Sources faisant foi
- Direction `DIR-002` : commit `fad8545`.
- META-007-R : commit `6261ee1`.
- DEV-003-R : commit `2bc23d27ddba4e76dc243e731684cc84be0c8157`.
- Code backend `main` actuel avant toute écriture.

META-007 est close avec verdict `ACCES_TECHNIQUE_MANQUANT` : le compte possède les droits nécessaires, mais aucune route backend n'expose encore l'edge Graph `/recommendations`.

**Règle importante :** META fournit le besoin Facebook ; pour l'implémentation technique, le code actuel fait foi. Le service `facebook-api.js` utilise actuellement `process.env.FB_ACCESS_TOKEN` et `FB_AD_ACCOUNT_ID`. Ne crée PAS `META_ACCESS_TOKEN` uniquement parce que ce nom apparaît dans le rapport META ; réutilise le mécanisme/token existant du service.

### 1. Objectif unique
Ajouter au backend une route strictement read-only :

`GET /api/facebook/recommendations`

Cette route doit utiliser `FacebookApiService` / son mécanisme `request()` existant afin de réutiliser le token Render déjà configuré sans jamais l'exposer.

### 2. Lecture Meta prescrite par META-007
Compte réel confirmé : `act_1485808979635813`.
Graph API production : `v25.0`.

Appel principal :
`GET /act_{AD_ACCOUNT_ID}/recommendations`

Champs demandés par META-007 :
`id,title,importance,recommendation_type,confidence,created_time,campaign_id,adset_id,ad_id,display_link`

Implémentation technique recommandée : utiliser `this.adAccountId` déjà alimenté par `FB_AD_ACCOUNT_ID`, plutôt que hardcoder l'identifiant, tout en vérifiant dans le rapport de test qu'il correspond bien au compte confirmé.

Si Meta rejette certains champs :
- ne fais aucune recherche métier Meta ;
- journalise l'erreur sans secret ;
- retente uniquement avec les champs explicitement confirmés par META : `title,importance,recommendation_type`.

Opportunity Score — essai non bloquant prescrit par META-007 :
`GET /act_{AD_ACCOUNT_ID}?fields=account_id,name,opportunity_score`

Si champ refusé, absent ou non documenté pour ce compte : retourner `NON_ACCESSIBLE`. Ne rien reconstruire.

### 3. Contraintes absolues
- GET uniquement vers Meta ;
- aucun POST/PATCH/DELETE Meta ;
- aucune modification campagne/adset/ad ;
- aucune activation CAPI ;
- aucun secret/token dans réponse, logs, tests ou rapport ;
- réutiliser l'authentification backend existante ;
- SaaS GELÉ ;
- aucun changement frontend dans ce lot ;
- aucune recherche Facebook/Meta supplémentaire : toute ambiguïté métier remonte au Pilote, qui consulte META.

### 4. Implémentation minimale
- Ajouter la méthode de lecture dans le service Facebook existant.
- Ajouter `GET /api/facebook/recommendations` dans les routes Facebook existantes, sans nouvelle architecture.
- Retour attendu :
  - `source: "meta"` ;
  - `fetched_at` ;
  - recommandations réellement retournées par Graph ;
  - `opportunity_score` avec valeur réelle ou `NON_ACCESSIBLE` ;
  - aucune donnée secrète.
- Gestion d'erreur permettant de distinguer : endpoint/edge refusé, champ refusé, permission, réponse valide vide.

### 5. Tests
Mocks Graph obligatoires :
- 1+ recommandation ;
- tableau vide valide ;
- champs étendus refusés puis lecture minimale ;
- Opportunity Score absent/refusé ;
- erreur Graph ;
- vérification qu'aucun token n'est renvoyé.

Exécuter les tests backend existants + nouveaux.

### 6. Test réel après implémentation
La mission ne sera considérée terminée que si l'agent peut aussi vérifier la route dans un environnement autorisé avec le compte réel, sans exposer le token.

Résultat attendu à remonter brut au Pilote :
- recommandations réellement reçues (nombre + types) ;
- ou réponse valide vide ;
- Opportunity Score présent ou `NON_ACCESSIBLE` ;
- éventuelle erreur Graph exacte sans secret.

**Ne tranche pas toi-même `RECO_UTILE / RECO_BRUIT` sur le sens métier.** Le Pilote transmettra les types réels à META pour arbitrage.

### 7. Livraison
Branche dédiée : `dev-004-meta-recommendations-readonly`.
Aucun merge `main`, aucun déploiement permanent sans nouvel arbitrage Pilote.

Rapport dans `message-ingenieur-developpeur-pilote.md` :
- `MESSAGE-ID : DEV-004-R`
- `EN-REPONSE-A : DEV-004`
- branche + hash ;
- fichiers modifiés ;
- tests ;
- résultat réel de lecture si accessible ;
- confirmation zéro write Meta / zéro secret / zéro SaaS.

## STATUT ÉCRAN — FORMAT GÉRANT
Répondre uniquement :
`DEV-004 — MISSION TERMINÉE`
ou
`DEV-004 — MISSION NON TERMINÉE`

— GPT Pilote — facebook-ads
