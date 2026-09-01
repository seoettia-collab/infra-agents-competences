<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message GPT Pilote -> Direction (facebook-ads)

MESSAGE-ID : GPT-PILOTE-DIR-20260901-04
EN-REPONSE-A : GPT-PILOTE-DIR-20260901-03
DATE : 2026-09-01

## DEMANDE — 6BIS INSUFFISANTE SUR DÉPÔT PRIVÉ : FALLBACK MISSION INLINE

### Constat confirmé
La règle 6bis « lecture par hash » est correcte contre le cache, mais elle ne suffit pas pour `meta-ads` dans son environnement actuel.

Test réel sur `META-006-CORR` :
- commit mission : `6469f2022991fc7e4ecbd47f15aecc0dda72999b` ;
- URL raw exacte au hash fournie ;
- URL GitHub commit exacte fournie ;
- l'agent reçoit `404` sur les deux ;
- `main` indexé continue de lui servir `META-004`.

Cause probable et cohérente avec le comportement : le dépôt `infra-agents-competences` est privé et l'outillage META n'est pas authentifié sur GitHub. Une URL immuable au hash reste donc inaccessible, même si elle élimine le cache.

## Arbitrage demandé — compléter le socle par un fallback 6ter

Pour tout agent qui cumule :
- environnement lecture seule ;
- aucun accès GitHub authentifié au dépôt privé ;
- impossibilité démontrée de lire la mission par hash ;

proposer la règle suivante :

### 6ter — Mission inline canonique
1. Le Pilote conserve la mission officielle dans `message-pilote-AGENT.md` sur GitHub.
2. Le Pilote transmet aussi à l'agent, dans son message de session, le **MESSAGE-ID exact + le contenu canonique de la mission**, sans dépendre d'une lecture GitHub impossible.
3. L'agent confirme uniquement que le MESSAGE-ID reçu inline est celui qu'il traite ; il ne cherche plus à déterminer le MESSAGE-ID actif via son index GitHub périmé.
4. L'agent exécute et livre UNE SEULE FOIS son rapport au Pilote, prêt au proxy-push selon 5bis.
5. Le Pilote vérifie la correspondance `EN-REPONSE-A`, proxy-push et clôture.
6. Si l'agent obtient plus tard un vrai accès GitHub lecture authentifié, retour immédiat au protocole normal 6/6bis.

### Cible préférable
Si la Direction peut techniquement doter META d'un connecteur GitHub en **lecture authentifiée uniquement** sur `infra-agents-competences` (et éventuellement les repos produit selon rôle), cette solution est préférable à long terme.

Mais tant que ce connecteur n'existe pas, le fallback inline est nécessaire pour ne pas bloquer le projet sur une impossibilité technique.

## Cas immédiat
La mission active reste `META-006-CORR`.
Aucun rapport `META-004` ne sera proxy-pushé.
Le Pilote est prêt à transmettre `META-006-CORR` inline dès arbitrage pour obtenir enfin la réponse ciblée sur la réserve R2.

### Statut
BLOQUANT COMMUNICATION UNIQUEMENT — aucun impact production/code.

— GPT Pilote — facebook-ads
