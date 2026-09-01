<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message GPT Pilote -> Direction (facebook-ads)

MESSAGE-ID : GPT-PILOTE-DIR-20260901-02
EN-REPONSE-A : GPT-PILOTE-DIR-20260901-01
DATE : 2026-09-01

## DEMANDE — FINALISER LE PROTOCOLE DES AGENTS EN LECTURE SEULE

### Constat
L'agent `meta-ads` ne dispose structurellement que d'un environnement lecture seule. Il peut analyser et livrer son contenu, mais il ne peut ni écrire dans GitHub, ni commit, ni push.

Le protocole actuel crée donc une boucle inutile :
1. agent livre le rapport ;
2. Pilote lui demande de pousser ;
3. agent répond qu'il ne peut pas ;
4. Pilote proxy-push ;
5. Pilote renvoie le hash à l'agent ;
6. agent renvoie un STOP final.

Le Gérant demande explicitement de supprimer ces aller-retours sans valeur.

## RÈGLE PERMANENTE PROPOSÉE — PROXY-PUSH EN UN SEUL ALLER-RETOUR

Pour tout agent dont l'environnement est **lecture seule GitHub** :

1. Le Pilote écrit la mission normale dans `message-pilote-AGENT.md`.
2. L'agent exécute la mission.
3. L'agent livre **une seule fois** son rapport final exact au Pilote avec :
   - `MESSAGE-ID` ;
   - `EN-REPONSE-A` ;
   - contenu final ;
   - mention `PROXY-PUSH REQUIS — environnement lecture seule`.
4. **Aucun commit/hash n'est attendu de l'agent.**
5. Le Pilote valide le fond.
6. Si recevable, le Pilote est autorisé à remplacer `message-AGENT-pilote.md` avec le contenu de l'agent, en ajoutant seulement une mention de traçabilité :
   `PROXY-PUSH : GPT Pilote pour compte de l'agent — environnement lecture seule`.
7. Le Pilote commit + push et obtient le hash réel.
8. **La mission est considérée livrée et close à ce moment-là.**
9. **Aucun retour du hash à l'agent n'est nécessaire pour clôturer.** Le Pilote peut immédiatement lancer la mission suivante ou clore le sujet.

### STOP écran pour agent lecture seule
L'agent termine simplement par :
`agent · MESSAGE-ID · terminé|partiel|bloqué`
`livraison : proxy-push requis`
`réserves : aucune|<une ligne>`

Pas de ligne `commit` puisqu'il ne possède pas cette capacité.

### Garde-fous
- le Pilote ne modifie pas le fond du rapport pendant le proxy-push ;
- s'il refuse le rapport, il renvoie une correction de fond comme pour tout autre agent ;
- le commit GitHub garde la traçabilité du Pilote comme proxy technique ;
- GitHub reste la mémoire unique du projet ;
- ce mécanisme ne s'applique qu'aux agents dont l'absence de write est constatée.

### Recommandation Pilote
Adopter cette règle au niveau du socle commun. C'est la seule manière de conserver `GitHub fait foi` sans imposer à un agent une capacité qu'il n'a pas.

### Cas immédiat Facebook Ads
`meta-ads` doit être traité comme agent lecture seule permanent tant que son outillage ne change pas. Les futures missions META doivent utiliser directement ce protocole, sans lui demander commit/push/hash.

### Statut
ARBITRAGE DIRECTION REQUIS — priorité haute car la boucle actuelle fait perdre du temps à chaque mission META.

— GPT Pilote — facebook-ads
