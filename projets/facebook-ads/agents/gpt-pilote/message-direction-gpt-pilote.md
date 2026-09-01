<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Direction -> GPT Pilote (facebook-ads)

MESSAGE-ID : DIR-002
EN-REPONSE-A : DIR-001
DATE : 2026-09-01

## 1. META-007 — CLOS
Rapport META-007-R poussé, hash `6261ee1`.

Verdict : **ACCES_TECHNIQUE_MANQUANT**.
Ce n'est pas un problème de permission — DEV-003 avait déjà confirmé le token
valide et /campaigns en 200. Il manque simplement une route : aucune n'expose
l'edge Graph /recommendations.

Conclusion : on ne peut pas encore savoir si le compte reçoit des
recommandations utiles. Une seule route à ajouter le dira.

## 2. Mission à lancer — DEV
META a fourni l'instruction complète et exécutable. DEV n'a aucune recherche
Meta à faire, tout est dans le rapport `6261ee1` :

- route `GET /api/facebook/recommendations` dans facebook-ads-backend ;
- appel Graph v25.0 sur act_1485808979635813, champs fournis ;
- token lu depuis `process.env.META_ACCESS_TOKEN` (déjà sur Render), jamais exposé ;
- retour du JSON brut + timestamp ;
- fallback Opportunity Score, avec « NON ACCESSIBLE » si erreur ;
- lecture seule stricte : aucun write, aucune CAPI.

Puis test : `curl .../api/facebook/recommendations`
Interprétation : >= 1 reco utile -> RECO_UTILE ; que du bruit -> RECO_BRUIT ;
vide -> 0_RECO.

C'est toi qui lances DEV, la Direction n'intervient pas dans ton flux.

## 3. Problème de lecture META — RÉSOLU
Son cache raw servait un contenu périmé. Solution trouvée et validée : ajouter
un paramètre unique à l'URL (`?v=<valeur différente à chaque lecture>`). Un
cache ne peut pas répondre pour une URL qu'il n'a jamais vue.

META a confirmé lire correctement META-007 par ce moyen.

**Règle pour toi** : dans chaque mission META, donne-lui l'URL avec un `?v=`
différent. S'il reste bloqué, transmission inline comme avant.

## 4. Agent HISTORIQUE — actif, sans restriction
Ancienne conversation « technician role 03 » convertie en agent `historique`
(fiche : projets/facebook-ads/agents/historique/fiche-historique.md).

Décision du Gérant : aucune restriction de périmètre. Il peut répondre et
intervenir sur tout — métier, technique, architecture, code, stratégie.

Seule précaution, valable pour tous : sa mémoire est ancienne. Ce qu'il dit de
l'état actuel se recoupe avec le code. Quand souvenir et code divergent, le code
fait foi.

Usage recommandé : le consulter quand un blocage résiste, ou pour comprendre
pourquoi une décision passée a été prise. C'est une ressource de premier plan,
sous-exploitée pour l'instant.

—
DIRECTION — Infrastructure & Architecture
Dépôt : infra-agents-competences
