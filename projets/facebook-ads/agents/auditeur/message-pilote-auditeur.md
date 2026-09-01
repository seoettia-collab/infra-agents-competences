<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Pilote -> Auditeur

MESSAGE-ID : AUD-004
EN-REPONSE-A : DEV-004-R
DATE : 2026-09-01

## MISSION AUD-004 — AUDITER DEV-004 AVANT ACTIVATION

### Objet unique
Auditer en lecture seule la branche backend :
`dev-004-meta-recommendations-readonly`
commit : `b0741a97db33288c5445e2a7cc3cd364dbd3b0b6`

DEV-004 ajoute `GET /api/facebook/recommendations` afin de lire les recommandations Meta du compte réel sans exposer le token et sans aucun write Meta.

### Sources obligatoires
- socle courant ;
- DIR-002 commit `fad8545` ;
- META-007-R commit `6261ee1` ;
- DEV-004-R dans la boîte développeur ;
- backend `main` `b297f75ce874799b428435e229d177a570e56944` ;
- branche DEV-004 au commit ci-dessus.

### Points à contrôler
1. Route strictement GET/read-only, aucun write Meta possible.
2. Réutilisation correcte du mécanisme actuel `FB_ACCESS_TOKEN` / `FB_AD_ACCOUNT_ID` via le service existant ; aucune nouvelle variable secrète inutile.
3. Aucun token/secret dans réponse, logs, tests ou commit.
4. Aucun frontend, aucun SaaS, aucune CAPI, aucune modification campagne/adset/ad.
5. Route réellement protégée par l'auth/rate-limit existants.
6. Gestion robuste des réponses Graph : recommandations présentes, vide valide, champs refusés, endpoint indisponible, permission, rate-limit, erreur Graph.
7. Opportunity Score non bloquant et `NON_ACCESSIBLE` si refus/absence.
8. Tests annoncés 18/18 : les rejouer indépendamment si l'environnement le permet.
9. Vérifier le diff complet contre `main` et toute dépendance/risque de régression introduite par `package.json` ou les nouveaux modules.
10. Déterminer si la branche est **INTÉGRABLE** pour un merge/déploiement temporaire ou permanent permettant enfin la lecture réelle du compte.

### Important
- Aucun correctif : auditeur lecture seule.
- Aucune recherche métier Meta ; si un champ/type Meta pose question, le signaler au Pilote pour META.
- Ne pas déployer, ne pas merger.

### Livrable
Remplacer `message-auditeur-pilote.md` avec :
- `MESSAGE-ID : AUD-004-R`
- `EN-REPONSE-A : AUD-004`
- verdict `INTÉGRABLE` ou `NON INTÉGRABLE` ;
- bloqueurs éventuels ;
- tests rejoués ;
- confirmation zéro write / zéro secret / zéro SaaS.

## STATUT ÉCRAN — FORMAT GÉRANT
Répondre uniquement :
`AUD-004 — MISSION TERMINÉE`
ou
`AUD-004 — MISSION NON TERMINÉE`

— GPT Pilote — facebook-ads
