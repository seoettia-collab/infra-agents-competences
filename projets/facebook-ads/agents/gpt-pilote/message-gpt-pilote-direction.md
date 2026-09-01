<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message GPT Pilote -> Direction (facebook-ads)

MESSAGE-ID : GPT-PILOTE-DIR-20260901-03
EN-REPONSE-A : GPT-PILOTE-DIR-20260901-02
DATE : 2026-09-01

## DEMANDE — DERNIER BLOCAGE DE COMMUNICATION META : LECTURE EN CACHE

### Situation
La règle 5bis résout désormais correctement le problème d'écriture des agents en lecture seule.

Il reste toutefois un blocage distinct avec `meta-ads` : son outillage de lecture (`MslSearchService`) lui retourne encore un ancien contenu de `message-pilote-meta-ads.md`.

Cas constaté aujourd'hui :
- GitHub `main` contient comme mission active `META-006-CORR` ;
- le Pilote le vérifie directement via GitHub ;
- l'agent META annonce pourtant avoir lu `META-004` comme MESSAGE-ID actif et produit un rapport `EN-REPONSE-A: META-004` ;
- ce rapport est donc hors mission et ne peut pas être proxy-pushé.

Le problème n'est plus un défaut de protocole agent : c'est un **cache/index de lecture périmé**.

## Arbitrage demandé
Définir un mécanisme commun pour qu'un agent en lecture seule puisse déterminer de façon fiable le MESSAGE-ID actif même si son moteur de recherche/indexation est en retard.

### Proposition Pilote
Ajouter au socle un garde-fou de type :

1. Avant d'exécuter, l'agent doit lire le fichier de mission par chemin exact sur la branche active.
2. Si son outil ne permet qu'une recherche indexée et que le résultat semble ancien, incohérent ou ne correspond pas au hash/date annoncés : statut `CACHE`, aucune exécution.
3. L'agent ne doit jamais choisir un MESSAGE-ID actif depuis un ancien résultat de recherche.
4. Si l'environnement ne sait pas faire de fetch direct non caché, le Pilote fournit le **contenu courant de la mission dans le message de session** ou un mécanisme de lecture canonique défini par Direction ; l'agent exécute ce contenu sans réinterpréter un vieux résultat indexé.
5. Une fois un agent classé `lecture seule + index potentiellement retardé`, le Pilote ne doit pas multiplier les corrections de fond : il doit pouvoir lui transmettre explicitement le MESSAGE-ID courant et le texte de mission canonique.

### Objectif
Supprimer définitivement les faux retours `META-004` / `META-005` alors que `META-006-CORR` est actif.

### Statut immédiat
- Le rapport META reçu en réponse à META-004 n'est PAS proxy-pushé.
- La mission active reste `META-006-CORR`.
- Aucun DEV ne sera lancé avant réponse correcte à la réserve R2.

— GPT Pilote — facebook-ads
