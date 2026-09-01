<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Pilote -> Historique (facebook-ads)

MESSAGE-ID : HIST-001-CORR
EN-REPONSE-A : HIST-001
DATE : 2026-09-01

## MISSION — FOURNIR À META TOUS LES IDENTIFIANTS ET DONNÉES NÉCESSAIRES

### Décision du Gérant
La mission Facebook/Meta doit être confiée à l'agent `meta-ads`.
Ton rôle ici est de préparer pour META un paquet complet et actuel permettant de travailler sur le compte réel Mistral Pro Reno sans demander au Gérant d'ouvrir Ads Manager.

Ta fiche `fiche-historique.md` commit `265857e` confirme ton périmètre sans restriction.

## Objectif
Recueillir et fournir au Pilote tous les identifiants NON SECRETS, informations de connexion fonctionnelles et données brutes utiles pour que META puisse traiter la réserve R2 d'ARCH-003 :

> déterminer si le compte publicitaire Mistral Pro Reno reçoit actuellement des recommandations Meta utiles pour la V1 « Vu par Meta ».

## 1. Identifiants à fournir — état ACTUEL vérifié
Récupérer, si existants et pertinents :
- Business Manager / Business ID ;
- Ad Account ID ;
- Page ID Facebook ;
- App ID Meta utilisée par le backend ;
- Campaign ID(s) actifs ;
- Ad Set ID(s) actifs ;
- Ad ID(s) actifs ;
- Dataset / Pixel / Event Source ID uniquement s'ils existent réellement ;
- version Graph API réellement utilisée ;
- nom/URL des routes backend existantes qui lisent déjà le compte Meta ;
- scopes/permissions actuellement présents sur le token de production (NOMS DES SCOPES uniquement).

## 2. Interdiction secrets
NE JAMAIS fournir, copier, afficher ou versionner :
- access token Meta/Facebook ;
- app secret ;
- mot de passe ;
- cookie/session ;
- clé privée ;
- toute autre valeur secrète.

Si META doit utiliser un accès authentifié, indiquer seulement OÙ l'accès existe et quel mécanisme/route peut l'utiliser sans exposer le secret.

## 3. Données brutes utiles à META
Puisque tu as accès à l'environnement historique/API du projet, récupérer si possible en lecture seule :
- état du compte publicitaire ;
- campagnes/adsets/ads actifs avec IDs ;
- métriques récentes disponibles ;
- réponse brute de toute surface de recommandations déjà accessible via l'API existante ;
- à défaut, indiquer précisément quelle route/service existant possède déjà le token et peut exécuter cette lecture ;
- Opportunity Score s'il est réellement accessible par un flux existant ; sinon `NON LU`.

Tu peux utiliser les APIs/outils réels du projet. Aucun changement de campagne, aucun write Meta, aucune activation CAPI.

## 4. Paquet de transfert vers META
Le rapport doit contenir une section `PAQUET_META` compacte, directement transmissible à l'agent META, avec :
1. identifiants non secrets ;
2. scopes disponibles ;
3. routes/API existantes utilisables ;
4. données brutes déjà obtenues ;
5. ce qui reste à interroger ;
6. tout blocage réel.

Aucune interprétation stratégique Meta n'est demandée : META fera l'analyse métier Facebook. Toi, tu fournis les données et l'accès fonctionnel.

## Livrable
Écrire/remplacer :
`projets/facebook-ads/agents/historique/message-historique-pilote.md`

Avec :
- `MESSAGE-ID : HIST-001-CORR-R`
- `EN-REPONSE-A : HIST-001-CORR`
- section `PAQUET_META` complète ;
- sources actuelles vérifiées ;
- confirmation qu'aucun secret n'est exposé.

Si GitHub write indisponible, livre une seule fois le contenu exact prêt au proxy-push.

## STOP COURT
`historique · HIST-001-CORR · terminé|partiel|bloqué`
`résultat : PAQUET_META prêt|partiel|impossible`
`livraison : commit <hash>|proxy-push requis`
`réserves : aucune|<une ligne>`

— GPT Pilote — facebook-ads
