<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Pilote -> ingenieur-developpeur

MESSAGE-ID : DEV-004
EN-REPONSE-A : META-007-R
DATE : 2026-09-01

## MISSION DEV-004 — AJOUTER UNE LECTURE SEULE DES RECOMMANDATIONS META

### 0. Contexte
META-007 est validée et close au commit proxy-push `66cce589d7b2563c487aba293dd1a96f74ab294b`.
Verdict META : `ACCES_TECHNIQUE_MANQUANT`.

La réserve R2 d'ARCH-003 reste ouverte uniquement parce que le backend existant ne possède pas encore de route qui interroge l'edge Graph des recommandations avec le token Render déjà en production.

Toute expertise Facebook/Meta vient de META. Tu ne fais aucune recherche métier Meta supplémentaire.

### 1. Objectif unique
Ajouter au backend une route **strictement read-only** :

`GET /api/facebook/recommendations`

Cette route doit utiliser le mécanisme/token Meta déjà présent dans le backend et retourner la réponse Graph utile sans jamais exposer le token.

### 2. Appel Meta à implémenter — fourni par META-007
Compte confirmé :
`act_1485808979635813`

Graph API production : `v25.0`.

Appel principal :
`GET /act_1485808979635813/recommendations`

Champs demandés par META-007 :
`id,title,importance,recommendation_type,confidence,created_time,campaign_id,adset_id,ad_id,display_link`

Si Meta rejette un ou plusieurs champs optionnels :
- ne fais PAS de recherche Meta indépendante ;
- journalise précisément l'erreur brute sans secret ;
- réduis uniquement aux champs déjà explicitement validés dans META-006/META-007 (`title,importance,recommendation_type`) si cela permet de tester l'edge sans inventer de mapping.

Fallback explicitement fourni par META-007 :
`GET /act_1485808979635813?fields=recommendations{id,title,importance,recommendation_type}`

Opportunity Score — essai non bloquant fourni par META :
`GET /act_1485808979635813?fields=opportunity_score,opportunity_score_trends`

Si le champ est refusé/absent : retourner `NON_ACCESSIBLE`. Ne pas reconstruire de score.

### 3. Contraintes absolues
- GET uniquement vers Meta ;
- aucun POST/PATCH/DELETE Meta ;
- aucune modification campagne/adset/ad ;
- aucune activation CAPI ;
- aucun secret/token dans logs, tests ou rapport ;
- réutiliser les protections/authentification backend existantes ;
- SaaS GELÉ ;
- aucun changement frontend dans ce lot.

### 4. Implémentation minimale
- Ajouter la méthode/service nécessaire dans le chemin Facebook API existant.
- Ajouter `GET /api/facebook/recommendations` dans l'architecture de routes existante, sans nouvelle architecture lourde.
- Retour attendu :
  - `source: "meta"` ;
  - `fetched_at` ;
  - réponse recommandations brute utile ;
  - statut Opportunity Score (`valeur` si réellement renvoyée, sinon `NON_ACCESSIBLE`) ;
  - aucune donnée secrète.
- Gestion d'erreur claire permettant au Pilote de distinguer : endpoint non disponible / champ refusé / permission / zéro recommandation.

### 5. Tests
Créer les tests nécessaires en mockant Graph :
- 1+ recommandation ;
- tableau vide valide ;
- champ optionnel refusé puis lecture minimale ;
- Opportunity Score absent ;
- erreur Graph ;
- vérification qu'aucun token n'est renvoyé.

Exécuter les tests backend existants + nouveaux.

### 6. Livraison
Travailler sur une branche dédiée `dev-004-meta-recommendations-readonly`.

Aucun merge `main`, aucun déploiement dans cette mission.

Rapport dans `message-ingenieur-developpeur-pilote.md` avec :
- `MESSAGE-ID : DEV-004-R`
- `EN-REPONSE-A : DEV-004`
- branche + hash ;
- fichiers modifiés ;
- tests ;
- résultat des mocks ;
- confirmation zéro write Meta / zéro secret / zéro SaaS.

## STOP ÉCRAN
`DEV-004 — MISSION TERMINÉE`
ou
`DEV-004 — MISSION NON TERMINÉE`

Aucun détail supplémentaire à l'écran.

— GPT Pilote — facebook-ads
