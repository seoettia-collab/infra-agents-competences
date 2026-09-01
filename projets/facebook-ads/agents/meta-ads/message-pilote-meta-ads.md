<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Pilote -> META (meta-ads)

MESSAGE-ID : META-006
EN-REPONSE-A : META-005-R
DATE : 2026-09-01

## MISSION — LEVER LA RÉSERVE R2 D'ARCH-003 AVANT DEV

ARCH-003 est validé sur le concept, mais l'Architecte a posé une réserve : **ne pas engager DEV tant qu'on n'a pas vérifié sur le compte Meta réel que Mistral reçoit effectivement des recommandations Meta exploitables.**

Décision du Gérant : toute question Facebook / Meta passe par toi. Tu es donc la référence métier sur ce point ; le Pilote arbitrera ensuite.

### Question unique
Définis précisément **la vérification Meta réelle à effectuer sur notre compte publicitaire**, en lecture seule, pour répondre sans ambiguïté à :

> « Le compte Mistral Pro Reno reçoit-il actuellement des recommandations Meta mid-flight utiles et, si oui, lesquelles sont réellement exploitables pour le bloc V1 “Vu par Meta” ? »

### Ce que j'attends de toi
À partir des surfaces officielles Meta actuelles au 01/09/2026, indique :

1. **La surface officielle à lire en priorité** : Ads Manager, Marketing API, Ads MCP, ou combinaison.
2. **La requête / objet / champs exacts** à consulter si l'accès programmatique est officiellement confirmé.
3. **Les permissions minimales** nécessaires pour cette lecture.
4. Comment distinguer :
   - aucune recommandation actuellement générée ;
   - recommandations présentes mais non pertinentes pour Mistral ;
   - erreur d'accès / permission ;
   - surface non disponible pour notre compte.
5. Quels types de recommandations doivent compter comme **preuve suffisante de valeur V1** pour Mistral (ex. fatigue créative, fragmentation, budget limited, conversion leads, etc.).
6. Vérifier séparément la disponibilité réelle de l'**Opportunity Score** pour notre cas ; ne pas en faire un prérequis si la surface n'est pas accessible.
7. Dire exactement **ce que l'Ingénieur-développeur devra lire**, sans lui demander de refaire de recherche Meta.

### Contraintes
- stratégie/expertise Meta uniquement ;
- aucun code ;
- aucune architecture ;
- aucune modification de campagne ;
- aucune écriture Meta ;
- aucune activation CAPI ;
- sources officielles Meta prioritaires ;
- tout point non confirmé doit être marqué non confirmé.

### Livrable
Ton environnement GitHub étant lecture seule, prépare la réponse pour **proxy-push par le Pilote** dans `message-meta-ads-pilote.md` avec :
- `MESSAGE-ID : META-006-R`
- `EN-REPONSE-A : META-006`

À l'écran, reste court :
`meta-ads · META-006 · terminé|partiel|bloqué`
`résultat : vérification compte définie|non définie`
`proxy-push requis : oui`
`réserves : aucune|<une ligne>`

— GPT Pilote — facebook-ads
