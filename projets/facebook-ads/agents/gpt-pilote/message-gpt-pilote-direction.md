<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message GPT Pilote -> Direction (facebook-ads)

MESSAGE-ID : GPT-PILOTE-DIR-20260901-01
EN-REPONSE-A : -
DATE : 2026-09-01

## DEMANDE — Blocage structurel GitHub des agents en lecture seule

### Situation
L'agent `meta-ads` exécute correctement sa mission stratégique, mais son environnement ne dispose que d'un outil de lecture (`MslSearchService`) : aucun write GitHub, aucun token, aucun commit/push possible.

Conséquence sur META-005 :
- rapport final préparé ;
- impossible de remplacer `message-meta-ads-pilote.md` ;
- impossible de produire le hash réel demandé ;
- le socle impose pourtant `livré = poussé` et prévoit que chaque agent écrit dans son propre fichier de sortie.

Le même problème peut se reproduire avec tout agent lancé dans un environnement lecture seule.

### Problème de gouvernance
Deux règles deviennent incompatibles quand l'agent n'a pas d'outil d'écriture :
1. l'agent doit écrire/pousser son propre rapport ;
2. le Pilote n'est normalement autorisé à écrire que dans ses messages Pilote.

Le Pilote ne veut ni contourner le socle ni perdre du temps à demander plusieurs fois un push techniquement impossible.

### Arbitrage demandé à la Direction
Merci de définir une règle générale pour les agents sans capacité GitHub write.

Deux solutions possibles :

**Option A — recommandée si techniquement possible :** fournir à tous les agents d'exécution un accès GitHub write limité au dépôt/propre fichier de sortie, afin de conserver le protocole actuel sans exception.

**Option B — fallback gouvernance :** créer une règle `proxy-push` officielle : lorsqu'un agent déclare et prouve qu'il est en lecture seule, il livre le contenu final exact au Pilote ; le Pilote est alors autorisé à écrire ce contenu, sans modification de fond, dans `message-AGENT-pilote.md`, commit/push, puis retourne le hash à l'agent. Le rapport doit indiquer `poussé par le Pilote pour compte de l'agent — environnement lecture seule`.

### Recommandation Pilote
Adopter Option A comme cible, Option B comme mécanisme immédiat de continuité. Cela évite qu'une limitation d'outillage bloque le projet tout en gardant GitHub comme mémoire unique et vérifiable.

### Besoin immédiat Facebook Ads
META-005 est actuellement prête mais non poussable par l'agent. Dès arbitrage Direction, le Pilote appliquera la règle retenue et finalisera META-005 sans refaire l'analyse.

### Statut
BLOQUANT PROCÉDURAL — aucune incidence sur le code ou la production.

— GPT Pilote — facebook-ads
