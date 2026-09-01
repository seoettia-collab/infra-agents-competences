<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Pilote -> ingenieur-developpeur

MESSAGE-ID : DEV-005
EN-REPONSE-A : AUD-004-R
DATE : 2026-09-01

## MISSION DEV-005 — ACTIVER LA ROUTE READ-ONLY ET LIRE LE COMPTE RÉEL

### 0. État validé
AUD-004 est VALIDÉ / CLOS : branche DEV-004 **INTÉGRABLE**, aucun bloqueur.

Branche à intégrer :
`dev-004-meta-recommendations-readonly`

Commit validé :
`b0741a97db33288c5445e2a7cc3cd364dbd3b0b6`

Backend `main` de référence avant opération :
`b297f75ce874799b428435e229d177a570e56944`

### 1. Objectif unique
Activer en production la route strictement read-only :
`GET /api/facebook/recommendations`

Puis effectuer **une lecture réelle** du compte Meta Mistral Pro Reno afin de retourner au Pilote les données brutes nécessaires à META pour trancher :
- recommandations réellement présentes ;
- réponse valide vide ;
- ou erreur Graph réelle ;
- Opportunity Score présent ou `NON_ACCESSIBLE`.

DEV ne qualifie PAS le sens métier des recommandations.

### 2. Avant merge
- fetch/refresh du backend ;
- vérifier que `main` n'a pas divergé de manière conflictuelle depuis le hash de référence ;
- comparer `main` avec `b0741a97db33288c5445e2a7cc3cd364dbd3b0b6` ;
- si conflit ou modification inattendue sur les mêmes fichiers : STOP `MISSION NON TERMINÉE`, ne pas forcer.

### 3. Activation
Si pré-vol propre :
- intégrer uniquement le lot DEV-004 validé dans `facebook-ads-backend/main` ;
- push `main` afin de déclencher l'auto-déploiement Render ;
- ne toucher ni frontend ni `saas` ;
- aucune autre feature dans ce merge.

### 4. Vérification production
Après déploiement effectif :
1. vérifier `/health` ;
2. appeler `GET /api/facebook/recommendations` avec le mécanisme d'authentification Dashboard déjà autorisé, sans reproduire la clé dans le rapport ;
3. conserver uniquement la réponse utile, sans secret ;
4. retourner :
   - `outcome` ;
   - nombre de recommandations ;
   - `recommendation_type` réellement reçus ;
   - Opportunity Score valeur réelle ou `NON_ACCESSIBLE` ;
   - `diagnostic.errors` si erreur/cascade.

Si la première lecture échoue, ne fais aucune recherche métier Facebook : rapporter la réponse brute au Pilote, qui consultera META.

### 5. Contraintes absolues
- aucune écriture Meta ;
- aucun POST/PATCH/DELETE vers Graph ;
- aucune modification campagne/adset/ad ;
- aucune activation CAPI ;
- aucun secret/token/clé API dans rapport ou logs ;
- aucun frontend ;
- SaaS GELÉ ;
- aucune interprétation métier Meta par DEV.

### 6. Livrable
Remplacer `message-ingenieur-developpeur-pilote.md` avec :
- `MESSAGE-ID : DEV-005-R` ;
- `EN-REPONSE-A : DEV-005` ;
- hash `main` après merge ;
- confirmation déploiement actif ;
- résultat production brut de `/api/facebook/recommendations` ;
- types réellement reçus ;
- Opportunity Score ;
- confirmation zéro write Meta / zéro secret / zéro SaaS.

## STATUT ÉCRAN — FORMAT GÉRANT
Répondre uniquement :
`DEV-005 — MISSION TERMINÉE`
ou
`DEV-005 — MISSION NON TERMINÉE`

— GPT Pilote — facebook-ads
