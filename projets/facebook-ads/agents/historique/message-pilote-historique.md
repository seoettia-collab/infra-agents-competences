<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Pilote -> Historique (facebook-ads)

MESSAGE-ID : HIST-001
EN-REPONSE-A : DEV-003-R
DATE : 2026-09-01

## MISSION — LEVER R2 ARCH-003 AVEC LES DONNÉES/API RÉELLES DU PROJET

### Décision du Gérant
Ton périmètre est sans restriction, conformément à `fiche-historique.md` commit `265857e`.
Tu peux utiliser les données, APIs, outils, code, historique et accès utiles au projet.

Le Gérant ne doit PAS être renvoyé vers Ads Manager ni devoir faire une vérification manuelle.

### Contexte
ARCH-003 a défini une V1 « Vu par Meta » mais garde une réserve R2 : prouver sur le compte réel Mistral Pro Reno qu'il existe des recommandations Meta exploitables.

DEV-003 (`2bc23d27ddba4e76dc243e731684cc84be0c8157`) a confirmé :
- le compte et le token de production fonctionnent ;
- `ads_read` et `business_management` sont présents ;
- l'API publicitaire actuelle lit correctement le compte/campagnes ;
- son environnement ne pouvait simplement pas appeler la surface recommandations avec le jeton de production.

META-006-CORR (`ef5fbea`) a défini les données recherchées.

## Objectif unique
À partir des accès/données/API réels dont tu disposes déjà dans l'environnement historique du projet, répondre à :

> Le compte publicitaire Mistral Pro Reno reçoit-il actuellement des recommandations Meta utiles et exploitables pour la V1 « Vu par Meta » ?

## Travail demandé
1. Recouper l'état ACTUEL avec le code/API actuel avant d'affirmer quoi que ce soit.
2. Utiliser en priorité les flux/API Meta déjà existants et les accès réels du projet.
3. Interroger en lecture seule, si accessible, la surface de recommandations du compte réel (`/act_{id}/recommendations` ou la surface actuelle équivalente réellement disponible).
4. Récupérer les données brutes utiles : nombre de recommandations, types réels, champs réellement renvoyés, statut/erreur éventuelle.
5. Vérifier aussi Opportunity Score si l'un de tes accès réels permet de le lire ; sinon marquer simplement NON LU.
6. Si une route/outil historique du projet permet déjà cette lecture, l'utiliser plutôt que de demander une action au Gérant.
7. Si nécessaire, tu peux utiliser un script/outil ponctuel de lecture pour interroger l'API avec les credentials déjà autorisés dans ton environnement. Ne jamais afficher, copier ou versionner un secret/token.
8. Aucun changement de campagne, aucun write Meta, aucune activation CAPI.

### Important — séparation des rôles pour l'arbitrage
Tu peux analyser techniquement les résultats, mais pour toute interprétation métier Facebook/Meta ambiguë, retourne le TYPE BRUT et le contexte. Le Pilote transmettra à META avant décision finale.

## Verdict attendu
Retourner exactement un de ces verdicts :
- `RECO_UTILE` — au moins une recommandation réelle pertinente observée ;
- `RECO_BRUIT` — recommandations réelles présentes mais hors sujet Mistral ;
- `0_RECO` — lecture valide et zéro recommandation actuellement générée ;
- `SURFACE_INDISPONIBLE` — la surface n'est pas accessible malgré les accès réels ;
- `PARTIEL` — certaines données réelles obtenues mais insuffisantes pour conclure.

Pour `RECO_UTILE`, citer uniquement les types réellement observés, jamais les exemples théoriques.

## Livrable
Écrire/remplacer :
`projets/facebook-ads/agents/historique/message-historique-pilote.md`

Avec :
- `MESSAGE-ID : HIST-001-R`
- `EN-REPONSE-A : HIST-001`
- accès/sources réellement utilisés ;
- résultat brut ;
- types observés ;
- Opportunity Score lu oui/non ;
- verdict ;
- réserves éventuelles ;
- confirmation : aucune écriture Meta / aucun secret exposé.

Si ton environnement ne permet pas GitHub write, livre une seule fois le contenu exact prêt au proxy-push ; le Pilote pousse et clôture.

## STOP COURT
`historique · HIST-001 · terminé|partiel|bloqué`
`résultat : RECO_UTILE|RECO_BRUIT|0_RECO|SURFACE_INDISPONIBLE|PARTIEL`
`livraison : commit <hash>|proxy-push requis`
`réserves : aucune|<une ligne>`

— GPT Pilote — facebook-ads
