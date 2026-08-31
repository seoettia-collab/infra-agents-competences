# Message architecte-concept -> Pilote

MESSAGE-ID : ARCH-001-R
EN-REPONSE-A : ARCH-001
DATE : 2026-08-31
AGENT : architecte-concept (facebook-ads)
OBJET : Spécification fonctionnelle — boucle de qualité des leads

---

## 0. Problème posé, reformulé

Meta optimise sur ce qu'on lui renvoie. Aujourd'hui on ne lui renvoie rien après
le formulaire : son seul signal de succès est « un formulaire a été soumis ».
L'algorithme cherche donc les profils qui SOUMETTENT facilement — pas ceux qui
signent. Ces deux populations ne sont pas les mêmes : le curieux qui remplit en
30 secondes est exactement le profil que Meta apprend à sur-cibler.

La boucle de qualité consiste à redéfinir ce que « succès » veut dire, et à le
dire à Meta assez tôt pour que ça serve.

Contrainte structurante à retenir dès maintenant : le projet produit un volume
faible (ordre de grandeur : quelques dizaines de leads/mois). Toute la
spécification ci-dessous en découle — on ne peut pas se permettre un événement
d'optimisation rare, ni un score à 40 critères qu'on ne pourra jamais calibrer.

---

## 1. Qu'est-ce qu'un lead qualifié pour une entreprise de rénovation ?

### 1.1 Le principe

Un lead qualifié n'est PAS un lead intéressé. C'est un lead sur lequel
l'entreprise a une chance réelle de faire un chantier. Trois choses doivent être
vraies en même temps : il est joignable, il est éligible, son projet est réel.

### 1.2 Les quatre axes métier

**Axe 1 — Éligibilité (bloquant)**
Ce qui rend un chantier possible ou impossible, indépendamment de la bonne
volonté du prospect :
- Zone géographique effectivement desservie (déplacement rentable).
- Interlocuteur décisionnaire : propriétaire ou mandaté. Un locataire sans
  accord du propriétaire n'est pas un prospect, c'est un projet fantôme.
- Nature des travaux dans le métier de l'entreprise.
- Bien accessible et travaux réalisables (pas de blocage copropriété connu).

Un manquement ici ne se rattrape par aucun autre axe. C'est une exclusion sèche,
pas une pénalité de score.

**Axe 2 — Réalité du projet**
- Horizon de démarrage annoncé. Un projet « dans l'année » n'a pas la même
  valeur qu'un projet « dès que possible ».
- Précision du besoin : un besoin décrit (pièce, surface, nature) vaut mieux
  qu'une demande vague type « rénovation ».
- Déclencheur identifié : achat récent, sinistre, mise en location, vente à
  préparer. Un projet sans déclencheur reste souvent au stade du rêve.

**Axe 3 — Cohérence économique**
- Ampleur estimée des travaux au regard du ticket moyen de l'entreprise.
- Réalisme budgétaire : le prospect a-t-il une enveloppe, et est-elle dans
  l'ordre de grandeur du besoin décrit. L'écart entre les deux est le meilleur
  prédicteur d'un devis perdu.
- Signal négatif à traiter comme tel : le comparateur de prix qui demande
  explicitement « le moins cher » et annonce plusieurs devis en cours.

**Axe 4 — Réactivité / joignabilité**
- Le prospect répond-il ? En combien de temps ?
- Accepte-t-il une visite technique ? C'est le meilleur marqueur d'intention
  réelle en rénovation : recevoir quelqu'un chez soi coûte quelque chose au
  prospect, donc ça se mérite.
- Coordonnées exploitables (numéro valide, pas de doublon).

### 1.3 Exclusions sèches (lead disqualifié, quel que soit le reste)

Hors zone · non décisionnaire · hors métier · coordonnées invalides ou fausses ·
doublon d'un lead existant · démarchage/concurrent · injoignable après le cycle
de relance complet.

### 1.4 Définition retenue

> Lead qualifié = lead joignable, éligible sur les quatre critères bloquants,
> avec un projet daté et une ampleur cohérente avec le ticket moyen de
> l'entreprise, ayant accepté la suite du parcours (visite ou étude chiffrée).

C'est cette définition, et elle seule, qui doit être remontée à Meta comme
signal d'optimisation principal.

---

## 2. Quels événements remonter, et à quel moment

### 2.1 Le raisonnement de timing (cœur de la mission)

Deux contraintes s'opposent :
- Pertinence métier : l'événement le plus vrai est « chantier signé ».
- Utilité algorithmique : un événement n'est exploitable que s'il arrive dans la
  fenêtre d'attribution de la publicité qui l'a produit, et en quantité
  suffisante pour que la plateforme apprenne.

Or en rénovation, le chantier se signe des semaines après le clic, et il y en a
quelques-uns par mois. Un événement à la fois trop tardif et trop rare n'apprend
rien à personne.

D'où l'arbitrage structurant :

> Événement d'OPTIMISATION = « Lead qualifié » (J+0 à J+3, volume suffisant,
> corrélé au chantier).
> Événements de MESURE = devis envoyé, chantier signé (trop tardifs et trop
> rares pour piloter, indispensables pour vérifier que le score dit vrai).

C'est la distinction la plus importante de cette spécification : on ne demande
pas à Meta d'optimiser sur le chiffre d'affaires, on lui demande d'optimiser sur
le meilleur prédicteur PRÉCOCE du chiffre d'affaires — et on garde le CA pour
contrôler que le prédicteur ne ment pas.

### 2.2 Les événements du parcours

| # | Événement | Moment | Remonté à Meta ? | Rôle |
|---|---|---|---|---|
| E0 | Lead reçu | T0 | Non | Meta le connaît déjà, le remonter n'ajoute rien |
| E1 | Contact établi | T+2 min à J+2 | Oui, valeur faible | Filtre faux numéros et non-réponses |
| E2 | Lead qualifié | J+0 à J+3 | Oui — événement principal | Signal d'optimisation |
| E3 | Visite / RDV planifié | J+1 à J+7 | Oui, valeur moyenne | Renforce E2, intention forte |
| E4 | Devis envoyé | J+3 à J+15 | Oui, avec valeur = montant | Mesure, valeur économique réelle |
| E5 | Chantier signé | J+15 à J+60 | Oui, avec valeur = montant | Vérité terrain, calibrage |
| E6 | Lead disqualifié | à la décision | Non, pas comme conversion | Diagnostic interne et exclusion |

### 2.3 Règles fonctionnelles associées

- Un lead ne franchit un événement qu'une fois. Pas de double comptage.
- Les événements sont cumulatifs, pas exclusifs : un lead signé a produit E1,
  E2, E3, E4, E5. On ne remplace pas un événement par le suivant.
- La valeur économique n'est attachée qu'à E4 et E5, et c'est la valeur réelle
  du devis ou de la signature — jamais une estimation. Un montant estimé remonté
  comme réel pollue durablement l'apprentissage.
- E6 ne doit jamais être remonté comme conversion négative. Il n'existe pas de
  conversion négative : l'absence d'événement EST le signal négatif. Son utilité
  est interne (diagnostic ciblage) et, éventuellement, l'exclusion d'audience —
  décision qui relève du Gérant.
- Chaque événement doit rester rattaché à la publicité d'origine du lead, sinon
  toute la boucle est inutile. Le « comment » appartient à DEV ; l'exigence
  fonctionnelle est que ce lien ne se perde jamais.

---

## 3. Structure de score

### 3.1 Exigences

Le score doit être lisible par le gérant (il doit pouvoir dire « ce lead est
noté B, je vois pourquoi ») et exploitable par un algorithme (déterministe,
reproductible, sans jugement flou). D'où : peu de critères, chacun nommé, chacun
avec un poids fixe et une trace.

### 3.2 Le score en deux temps

Score prédictif (T0, à la réception) — construit sur le seul déclaratif du
formulaire. Il sert à PRIORISER l'ordre des rappels. Il ne qualifie personne :
il classe une file d'attente.

Score consolidé (après contact) — construit sur ce qui a été vérifié au
téléphone. C'est LUI qui déclenche ou non l'événement E2.

Cette séparation évite la faute classique : qualifier sur du déclaratif, donc
apprendre à Meta à cibler les gens qui déclarent bien, pas ceux qui signent.

### 3.3 Grille de pondération (score consolidé, sur 100)

| Axe | Poids | Ce qui est évalué |
|---|---|---|
| Éligibilité | 30 | Zone, décisionnaire, métier, faisabilité |
| Réalité du projet | 25 | Horizon, précision du besoin, déclencheur |
| Cohérence économique | 25 | Ampleur vs ticket moyen, réalisme budgétaire |
| Réactivité | 20 | Délai de réponse, acceptation de visite |

Par-dessus la grille : les exclusions sèches du §1.3 forcent le palier D et
bloquent E2, quel que soit le total. Un lead hors zone à 85 points reste un lead
hors zone. Le score ne doit jamais pouvoir racheter un critère bloquant.

### 3.4 Paliers

| Palier | Score | Lecture métier | Conséquence |
|---|---|---|---|
| A | 75–100 | Prospect prioritaire | E2 remonté, traitement immédiat |
| B | 50–74 | Prospect à travailler | E2 remonté, traitement standard |
| C | 25–49 | Incertain | E2 non remonté, relance possible |
| D | 0–24 ou exclusion | Non qualifié | E6, sortie du pipeline actif |

Seuil de déclenchement de E2 : score ≥ 50. C'est un paramètre métier : il
appartient au Gérant et devra bouger au premier calibrage.

### 3.5 Auditabilité et primauté humaine

- Chaque point attribué doit être rattachable au critère qui l'a produit. Un
  score opaque n'est pas contestable, donc pas corrigeable, donc faux à terme.
- Le gérant peut requalifier manuellement un lead. Sa décision est une source
  terrain (S1) : elle prévaut sur le score calculé, et la correction doit être
  conservée. C'est le matériau du recalibrage.
- Le score est une aide à la décision, jamais une décision automatique de rejet.

### 3.6 Boucle de calibrage (sans elle, le score dérive)

Chaque mois, confronter le score attribué à l'issue réelle :
- Combien de A ont signé ? Combien de C écartés auraient signé ?
- Si des C signent régulièrement, la grille est fausse — pas le prospect.

Ce rapprochement score-prédit / issue-réelle est ce qui transforme la grille en
outil. Sans lui, on aura codé une opinion et on la croira mesurée. Le
recalibrage des pondérations est une décision du Gérant, préparée par ce
rapprochement.

---

## 4. Seuils et signaux d'alerte au gérant

### 4.1 Alertes qualité (le ciblage se dégrade)

| Signal | Seuil proposé | Ce que ça veut dire |
|---|---|---|
| Taux de qualification hebdo | < 30 %, ou chute de 15 pts vs moyenne 4 semaines | Le ciblage attire les mauvais profils |
| Part de leads hors zone | > 25 % | Paramétrage géographique à revoir |
| Coordonnées invalides / doublons | > 10 % | Formulaire ou fraude au clic |
| Taux de joignabilité | < 50 % | Promesse de l'annonce décalée du réel |

### 4.2 Alertes économiques

| Signal | Seuil proposé | Ce que ça veut dire |
|---|---|---|
| Coût par lead qualifié | > cible fixée par le Gérant | Métrique de pilotage réelle, à substituer au CPL brut |
| Écart CPL brut / CPL qualifié | facteur > 3 | On paie du volume creux |
| Taux devis → signature | chute > 20 pts | Problème de prix ou de qualification, à distinguer |

### 4.3 Alertes de traitement (l'entreprise, pas la publicité)

| Signal | Seuil proposé |
|---|---|
| Premier contact non effectué en heures ouvrables | > 15 min |
| Lead qualifié sans action | > 48 h |
| Devis envoyé sans relance | > 7 jours |

### 4.4 Alerte d'intégrité de la boucle (critique)

| Signal | Seuil |
|---|---|
| Leads reçus alors qu'aucun événement n'est remonté | > 24 h |
| Volume d'événements E2 sur 7 jours | sous le seuil d'apprentissage de la plateforme |

La première est la plus dangereuse du document : une boucle qui s'interrompt en
silence laisse Meta réapprendre le volume pendant des semaines sans que personne
ne le voie. Elle doit alerter même si tout le reste est vert.

Principe de sobriété : ces alertes s'adressent à une personne, pas à une équipe
d'astreinte. Une alerte qui se déclenche tous les jours sera ignorée sous quinze
jours. Peu d'alertes, actionnables, avec l'action attendue formulée.

---

## 5. Réserves et arbitrages à remonter au Gérant

1. Seuils chiffrés — tous les seuils du §4 et le seuil E2 ≥ 50 sont des
   propositions d'architecte, pas des données terrain. À valider ou corriger par
   le Gérant avant toute implémentation.
2. Ticket moyen et enveloppe de référence — l'axe « cohérence économique » est
   inopérant tant que le ticket moyen réel de l'entreprise n'est pas fixé comme
   donnée de référence. Prérequis, pas détail.
3. Périmètre des données transmises à Meta — nature des informations renvoyées
   et base légale (consentement, RGPD) : arbitrage Gérant/juridique. Hors de mon
   périmètre, mais bloquant pour DEV.
4. Volume d'apprentissage — si le volume de leads qualifiés reste durablement
   trop faible pour que la plateforme apprenne, la boucle restera un outil de
   pilotage interne sans effet algorithmique. Risque à admettre avant
   d'investir, pas à découvrir après.

---

## 6. Cadre respecté

Aucun code, aucun endpoint, aucun nom de service, aucun schéma de données, aucun
choix d'outil. Le « comment » — mécanisme de remontée, stockage du score,
déclenchement des alertes — appartient à l'ingénieur-développeur, qui recevra
cette spécification comme entrée.

---

## 7. Statut

Spécification complète et remise. En attente d'arbitrage Gérant sur les quatre
réserves du §5, qui conditionnent la mission DEV.

— architecte-concept · facebook-ads
