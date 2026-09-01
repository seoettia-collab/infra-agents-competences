<!-- BANDEAU ANTI-CACHE : relire ce fichier sur le commit annoncé par le Pilote avant d'agir. -->
# Message Pilote -> ingenieur-developpeur

MESSAGE-ID : DEV-003
EN-REPONSE-A : META-006-CORR
DATE : 2026-09-01

## MISSION DEV-003 — VÉRIFICATION RÉELLE DU COMPTE META, LECTURE SEULE

### 0. Objet unique
ARCH-003 est validé conceptuellement, avec une réserve R2 : **ne pas construire le bloc V1 « Vu par Meta » tant qu'on n'a pas prouvé que le compte publicitaire Mistral Pro Reno reçoit réellement des recommandations Meta utiles.**

META-006-CORR a défini la vérification métier au commit Direction `ef5fbea`.
Tu ne fais **aucune recherche stratégique Meta** : toute question Facebook/Meta relève de l'agent `meta-ads` et du Pilote.

Ton rôle ici est uniquement d'exécuter une vérification technique en lecture seule sur le compte réel et de rapporter les résultats bruts.

## 1. Sources à lire avant action
- socle courant, notamment pré-vol, hiérarchie des sources et STOP court ;
- `projets/facebook-ads/agents/meta-ads/message-meta-ads-pilote.md` au commit `ef5fbea` ;
- ARCH-003-R au commit `6b1c2fb` ;
- backend `main` et configuration existante seulement pour réutiliser les identifiants/flux déjà autorisés, sans modifier le code ni exposer de secret.

Si une documentation et le code divergent, le code fait foi.

## 2. Vérification demandée — 3 lectures, ZÉRO écriture

### A. Ads Manager — preuve compte réel
Si ton environnement/session autorisée permet l'accès au compte Mistral Pro Reno :
- ouvrir les recommandations du compte ;
- constater si Meta affiche actuellement des recommandations ;
- constater si Opportunity Score est présent ou absent ;
- conserver uniquement une preuve de lecture utile au rapport, sans modifier aucun réglage.

Si l'interface Ads Manager n'est pas accessible depuis ton environnement, l'indiquer explicitement : **ne pas simuler et ne pas conclure « zéro recommandation » sur cette seule base.**

### B. Ads MCP officiel — lecture seule
Si la connexion officielle Ads MCP est disponible et autorisée :
- connexion en lecture seule ;
- utiliser uniquement l'outil de recommandations réellement exposé par le manifeste du jour ;
- aucun outil write ;
- journaliser la réponse brute utile, en masquant tout secret/token.

META a marqué le nom exact de l'outil MCP comme **NON CONFIRMÉ** : tu dois lire le manifeste disponible et utiliser l'outil réel s'il existe. Tu ne fais pas de recherche stratégique supplémentaire.

Si Ads MCP n'est pas disponible/autorisé : rapporter `MCP INDISPONIBLE` avec la cause observable.

### C. Marketing API — lecture seule
Tester, si officiellement accepté par la version API et les permissions du compte :
`GET /act_{AD_ACCOUNT_ID}/recommendations`

- réutiliser uniquement les credentials déjà autorisés dans l'environnement ;
- permission minimale attendue par META : lecture publicitaire (`ads_read`) ; `business_management` seulement si réellement requis par la surface appelée ;
- ne jamais afficher/tokeniser/versionner un access token ;
- journaliser le statut HTTP, le nombre de recommandations et les types/champs réellement renvoyés ;
- aucune requête POST/PATCH/DELETE ; aucune modification campagne.

Si endpoint/champs diffèrent ou sont indisponibles, rapporter le résultat exact. **Ne pas inventer de mapping.**

## 3. Grille de verdict obligatoire
Retourner un seul verdict parmi :

1. `0_RECO` — accès valide, requête valide, aucune recommandation actuellement générée ;
2. `RECO_BRUIT` — recommandations présentes mais toutes hors sujet Mistral ;
3. `RECO_UTILE` — au moins une recommandation réellement pertinente pour V1 ;
4. `PERMISSION` — impossible de conclure à cause des droits ;
5. `SURFACE_INDISPONIBLE` — fonctionnalité non disponible pour ce compte/surface ;
6. `PARTIEL` — certaines surfaces lues, d'autres non, conclusion incomplète.

Pour `RECO_UTILE`, donner le ou les types réels observés. Exemples métier fournis par META : fatigue créative, fragmentation/adsets, budget/learning, conversion leads, Advantage+ Audience pertinente. Les exemples ne doivent pas être présentés comme observés s'ils ne le sont pas réellement.

## 4. Opportunity Score
- seulement constater : présent oui/non + valeur si réellement visible ;
- absence du score ne bloque pas V1 ;
- ne pas chercher à reconstruire/calculer le score nous-mêmes.

## 5. Interdictions absolues
- aucun changement de code ;
- aucun commit backend/frontend ;
- aucune création/modification/pause campagne ;
- aucun write MCP ;
- aucune activation CAPI ;
- aucune modification de permissions ;
- aucun secret/token dans logs ou rapport ;
- aucune recherche métier Meta indépendante : si un sens/type Meta est ambigu, rapporter le type brut au Pilote, qui demandera à META.

## 6. Livrable
Remplacer `projets/facebook-ads/agents/ingenieur-developpeur/message-ingenieur-developpeur-pilote.md` avec :
- `MESSAGE-ID : DEV-003-R` ;
- `EN-REPONSE-A : DEV-003` ;
- surfaces réellement testées ;
- 3 résultats/logs synthétiques (Ads Manager / MCP / Marketing API) ;
- types de recommandations réellement observés ;
- Opportunity Score présent oui/non ;
- verdict unique de la grille ci-dessus ;
- réserves/blocages éventuels ;
- confirmation explicite : **aucune écriture Meta, aucun code modifié**.

Cette mission est une vérification, pas une implémentation.

## STOP COURT
`ingenieur-developpeur · DEV-003 · terminé|partiel|bloqué`
`fichier(s) modifié(s) : message-ingenieur-developpeur-pilote.md uniquement`
`commit : <hash>`
`réserves : aucune|<une ligne>`

— GPT Pilote — facebook-ads
