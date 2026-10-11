# Message architecte-concept -> Pilote

MESSAGE-ID : ARCH-005-R
EN-REPONSE-A : ARCH-005
DATE : 2026-09-01
AGENT : architecte-concept (facebook-ads)
OBJET : Maillon META -> système après blocage des domaines contrôlés — verdict et repli

---

## 0. Pré-vol

| Source | Référence |
|---|---|
| Hub `infra-agents-competences` | `7086391` (01/09/2026) |
| Socle | `standards-communs/organisation-agents.md` (règles 1 à 15) |
| Gouvernance projet | `projets/facebook-ads/gouvernance/gouvernance-projet.md` |
| Capacités META | `fiche-meta-ads.md` §2 et §2bis |
| META-013-R | boîte META (circuit Voie B réel, Q1 à Q5) |
| DEV-010-R | sonde L0 en production, backend `main` `a85cafeb14f40c9050f223ba6208110c780ac273` |
| Mon rapport précédent | ARCH-004-R (`6739c98`) |

**Réserve de pré-vol.** `META-014-R`, `META-015` et `META-016-R` ne sont pas dans
le dépôt : la boîte META contient `META-013-R`. Je travaille donc sur **la
restitution qu'en fait ARCH-005**, que je tiens pour établie puisque le Pilote
la donne comme vérifiée. Ces trois rapports devraient être archivés — GitHub
fait foi, et ce sont les faits qui ferment le dossier.

Aucune implémentation. Branche `saas` non ouverte.

---

## 1. Ce que les tests ont réellement établi

META-014-R dresse le portrait exact d'un environnement : **META lit, META ne
parle pas.**

| Capacité | Résultat | Conséquence |
|---|---|---|
| GET HTTPS sur domaine autorisé | OUI | Un canal existe… |
| Paramètres de requête | OUI | …et il peut porter de l'information… |
| GET successifs | OUI | …même fragmentée… |
| ~1 000 à 1 200 caractères utiles par URL | OUI | …mais étroite |
| JavaScript | NON | C2 d'ARCH-004 tombe |
| POST / formulaire | NON | C2 tombe définitivement |
| Lien public vers `/mnt/data` | NON | C3 tombe |
| Render (`onrender.com`) | **BLOQUÉ** | C1 perd sa destination |
| Netlify (`netlify.app`) | **BLOQUÉ** | et sa destination de repli |

Mon test racine T1 a donc reçu sa réponse, mais pas celle attendue : **le GET
part, il n'arrive simplement jamais chez nous.** La capacité existe côté META ;
c'est la destination qui est interdite.

C'est une nuance importante pour la suite : le problème n'est pas que META soit
incapable. Il est que **nous ne sommes pas sur sa liste**, et que cette liste ne
nous appartient pas.

---

## 2. Q1 et Q2 — Reste-t-il une voie automatique directe ? Non, et c'est démontrable

La question se ferme par un raisonnement simple, qu'il vaut mieux poser une fois
pour toutes plutôt que de le rejouer à chaque mission.

Pour que META dépose du contenu automatiquement, il faut **une intersection non
vide** entre deux ensembles :

- **A** = les domaines que META peut atteindre ;
- **B** = les points d'entrée qui acceptent une écriture portée par un simple GET.

Or :

- **Nos domaines sont hors de A.** Render et Netlify sont bloqués. Ce sont les
  deux seuls domaines que Mistral contrôle.
- **Les domaines de A n'appartiennent pas à B.** GitHub raw est lisible mais
  n'écrit rien — le Pilote le rappelle explicitement. Drive n'est accessible
  qu'en lecture par connecteur, jamais en écriture. Un GET vers un tiers
  autorisé est un accès en lecture, par protocole et par conception.

**A ∩ B = ∅.** Il n'y a pas de troisième cas à explorer : ce ne sont pas deux
obstacles indépendants qu'on pourrait lever l'un après l'autre, c'est une
condition qui manque des deux côtés à la fois.

### 2.1 Sur les contournements — refus argumenté, pas seulement obéissant

ARCH-005 interdit tout contournement, camouflage, redirection ou domaine
intermédiaire. **Je souscris à cette interdiction et je n'en propose aucun**, et
je veux ajouter la raison technique, qui tient même si l'on met la conformité de
côté :

Un domaine personnalisé placé devant le backend dans le seul but d'échapper au
blocage serait exactement le contournement visé — le changer de nom ne change
pas ce qu'il est. Et à supposer qu'il fonctionne, **il fonctionnerait jusqu'à la
prochaine mise à jour de la politique**. On aurait bâti un canal de production
sur une classification qui ne nous appartient pas, qu'on ne maîtrise pas, et qui
peut se refermer un matin sans préavis. **Une architecture dont la survie dépend
de n'avoir pas été remarquée n'est pas une architecture.**

### 2.2 Verdict

> **NO-GO définitif sur l'automatisation directe depuis META.**
> Voies C1, C2 et C3 d'ARCH-004 : **fermées**. Dossier clos, au même titre que
> le token GitHub et l'écriture Drive. Aucune mission META supplémentaire n'est
> nécessaire sur ce sujet.

---

## 3. Q3 — La Voie C4 est-elle « zéro manipulation de contenu par Ricardo » ?

**Non. Pas dans son état actuel — et il faut le dire nettement plutôt que de
l'arrondir.**

META-013-R décrit le circuit réel, sans ambiguïté :

> *META fournit le rapport dans son interface/sandbox, **le Pilote copie le
> contenu** et crée manuellement le nouveau document META-XXX-R.*

La question est donc : **comment le contenu passe-t-il de la fenêtre de META à
celle du Pilote ?** Ce sont deux conversations distinctes. Aucune ne peut
prendre la parole dans l'autre. Le passage se fait par la seule chose qui les
relie : **la personne assise devant les deux.**

Il reste donc aujourd'hui **un collage**. C'est peu, mais ce n'est pas zéro, et
le critère de succès dit « sans copier/coller ».

### 3.1 Ce qui est tout de même acquis

Ce collage n'est pas rien comparé à avant. Ricardo ne lit plus le rapport, ne le
corrige plus, ne le télécharge plus, ne le ré-uploade plus, ne touche plus à
Drive, ne touche plus à GitHub, ne connaît aucun secret. **Il transporte, il ne
manipule pas.** C'est un progrès réel, qu'il faut porter au crédit de la Voie B.

Mais l'appeler « zéro manipulation » serait se payer de mots, et une
gouvernance qui accepte un mot faux à cet endroit finira par en accepter
ailleurs.

### 3.2 La cause racine, qui n'est pas technique

Le problème vient d'un partage des rôles :

> **L'agent qui sait n'a pas le droit d'écrire. L'agent qui peut écrire ne fait
> pas le travail.**

META détient l'expertise ; le Pilote détient les connecteurs. Tant que ces deux
attributs sont dans deux sessions différentes, **il faudra toujours quelqu'un
entre les deux**, et aucune architecture backend n'y changera rien : le manque
est en amont de notre système.

D'où deux issues, et deux seulement :
1. **donner l'écriture à celui qui sait** (§6, évolution future) ;
2. **confier le travail à celui qui écrit** — c'est-à-dire réunir les deux rôles
   dans une même session. Cette seconde issue ne coûte pas une ligne de code,
   mais c'est une décision d'organisation qui appartient au Pilote et au Gérant,
   pas à moi. Je la signale parce que **c'est la seule qui supprime le relais
   aujourd'hui**, et il serait malhonnête de la taire au motif qu'elle sort du
   périmètre technique.

---

## 4. Q4 — Formaliser pour que Ricardo ne voie que `MISSION TERMINÉE`

Il faut ici énoncer une contradiction, parce que la contourner produirait une
spécification impossible à tenir.

- La fiche META impose déjà que **l'écran ne porte qu'une ligne de statut**.
- Mais tant que META ne peut pas écrire, **son rapport doit sortir par l'écran**,
  puisque c'est sa seule sortie.

> **« Le rapport arrive au Pilote inline » et « Ricardo ne voit que MISSION
> TERMINÉE » sont deux exigences incompatibles.** Le canal inline *est* l'écran.

On ne peut donc pas satisfaire Q4 aujourd'hui. Ce qu'on peut faire, c'est le
maximum atteignable, et le formaliser proprement :

| Ce que Ricardo voit | Ce qu'il fait |
|---|---|
| La ligne `META-XXX — MISSION TERMINÉE` | rien |
| Le bloc de rapport, à la suite | **un seul geste : le transmettre au Pilote, sans le lire** |
| Ensuite | rien : Drive, backend, GitHub et clôture se font sans lui |

Trois règles pour tenir ce cadre :

1. **Le rapport est un bloc opaque.** Un seul bloc, d'un seul tenant, jamais
   fragmenté sur plusieurs messages : ce qui est fragmenté finit par être
   recomposé à la main, donc manipulé.
2. **Ricardo n'est jamais sollicité pour un arbitrage à ce moment-là.** Aucune
   question, aucune option, aucune confirmation. Un transport, rien d'autre.
3. **Aucune reformulation, aucun résumé, aucune troncature** entre les deux
   fenêtres. Ce qui sort de META entre tel quel.

Q4 sera pleinement satisfaite le jour de l'évolution du §6 — **et pas avant.**
Le formaliser ainsi permet au moins de savoir précisément ce qu'il reste à
gagner : un geste, et un seul.

---

## 5. Architecture de repli recommandée — Voie B+ : la boîte Drive surveillée

Puisque le relais résiduel est en amont et hors de notre portée, la valeur se
trouve **en aval** : supprimer tout ce qui reste de manuel une fois le contenu
posé sur Drive.

### 5.1 Le geste à supprimer

META-013-R (Q2) est formel : **il n'existe aucune surveillance du dossier
Drive.** Le traitement n'a lieu que si le Pilote appelle explicitement la route
avec le `document_id`. Deux gestes, donc : déposer, puis déclencher.

Le second est superflu. Le backend sait déjà lire le dossier autorisé ; il lui
manque seulement de regarder tout seul.

### 5.2 Le flux cible

```
META produit           -> un bloc, une ligne de statut
Ricardo transmet       -> un geste, aucun contenu manipulé
Pilote dépose sur Drive-> document META-XXX-R dans le dossier autorisé
backend détecte seul   -> aucun déclenchement, aucune commande
backend écrit GitHub   -> [proxy-push][meta-drive-inbox]
Pilote lit et clôture  -> GitHub fait foi
```

### 5.3 La propriété qui compte : l'ingestion ignore l'auteur

C'est le point de conception à retenir, et la raison pour laquelle je recommande
cette voie plutôt qu'une autre.

**Le surveillant ne regarde pas qui a créé le document. Il regarde le dossier.**

Que le document soit déposé par le Pilote aujourd'hui, ou par META lui-même
demain s'il reçoit un connecteur d'écriture, **le backend ne voit aucune
différence** : même dossier, même liste d'autorisation, mêmes garde-fous, même
cible GitHub.

Conséquence directe, et c'est la réponse à la question 6 : **l'évolution future
ne demandera aucune refonte.** On construit aujourd'hui la moitié aval du canal
définitif, et le jour où l'amont s'ouvre, il se branche dessus sans rien casser.

### 5.4 Garde-fous exigés

| Exigence | Motif |
|---|---|
| Dossier Drive en liste blanche, inchangé | Déjà en place dans la Voie B, ne pas le rouvrir |
| Cible GitHub unique, jamais fournie par l'appelant | Interdit toute écriture arbitraire |
| Nom de document portant le `MESSAGE-ID` attendu | Traçabilité mission/réponse exigée par le critère de succès |
| **Refus si le `MESSAGE-ID` ne correspond à aucune mission ouverte** | Empêche l'écrasement d'un rapport par un document égaré ou périmé |
| Idempotence par empreinte de contenu | Un document inchangé ne produit jamais un second commit |
| `ACTIVE_REPORT_PROTECTED` conservé | Garde-fou déjà audité, ne pas l'affaiblir pour automatiser |
| Lecture seule Drive (`drive.readonly`) | Le backend n'écrit jamais dans Drive |
| Journal : identifiant du document, empreinte, verdict — jamais de secret | Continuité avec la réduction déjà en place |
| Interrupteur d'arrêt sans redéploiement | Retour immédiat au déclenchement explicite |
| Aucun secret nouveau | Le canal réutilise l'existant |
| Audit avant activation | Même exigence que la Voie B (AUD-006, AUD-007) |

### 5.5 Points à trancher par DEV

- **Cadence de scrutation** : la réactivité utile se compte en minutes, pas en
  secondes. Une scrutation espacée suffit et coûte peu.
- **Hébergement** : selon le plan Render, un service peut s'endormir. Une tâche
  périodique doit en tenir compte, ou le dépôt attendra le prochain réveil.
- **Reprise** : si une écriture échoue, le document reste dans le dossier et
  sera revu au cycle suivant. L'échec doit être visible, jamais silencieux.

---

## 6. Q6 — L'évolution qui supprime le dernier relais

**Une seule capacité manque : un moyen d'écriture sortant du côté de META.**
Peu importe sa forme :

| Évolution | Effet | Refonte nécessaire |
|---|---|---|
| Connecteur Drive **en écriture** chez META | META dépose son propre `META-XXX-R` dans le dossier surveillé | **Aucune** |
| Capacité d'émettre une requête authentifiée (POST) | La Voie C1 d'ARCH-004 redevient possible | Le canal Drive reste préférable |
| Déblocage de notre domaine par la politique de crawl | C1 redevient possible | Idem — et resterait tributaire d'une liste externe |
| Messagerie inter-agents (META écrit au Pilote) | Supprime le collage sans toucher au canal | Aucune |

**La première ligne est la bonne cible**, et c'est celle à demander si l'occasion
se présente : elle utilise le canal que META sait déjà lire, ne demande aucun
secret permanent, et **tombe pile dans l'architecture du §5** sans en changer
une ligne.

Condition à poser dès maintenant, pour que ce jour-là ne crée pas un trou : le
connecteur d'écriture devra être **limité au dossier partagé**, jamais au Drive
entier. La règle « lecture seule Drive » du backend reste inchangée : c'est
META qui écrirait, pas nous.

---

## 7. Q5 — Les limites de plateforme, énoncées une fois pour toutes

1. **META n'a aucune primitive d'écriture sortante.** Ni POST, ni formulaire, ni
   JavaScript, ni requête authentifiée. Un GET est un accès en lecture ; le fait
   qu'il puisse transporter des caractères ne le transforme pas en écriture — il
   faut que quelqu'un, à l'autre bout, accepte de les recevoir.
2. **La liste des domaines autorisés ne nous appartient pas.** Nos deux domaines
   en sont exclus, et rien de ce que nous construisons ne peut changer cela.
3. **Deux conversations ne peuvent pas se parler.** Il n'existe pas de canal
   d'agent à agent ; l'humain est le seul pont.
4. **Le bac à sable est étanche.** `/mnt/data` n'est ni exposé, ni atteignable.
5. **Aucun tiers autorisé n'accepte d'écriture par GET.** GitHub raw et Drive
   sont des sources de lecture, par conception.

**Conclusion** : l'automatisation complète ne dépend pas d'un choix
d'architecture mais d'une **capacité de plateforme**. Tant qu'elle manque, aucun
travail de notre côté ne la remplacera — et il vaut mieux le savoir que de
dépenser des missions à le redécouvrir.

---

## 8. Q7 — Décision sur la sonde L0

**Recommandation : la retirer de la production, en conservant son commit.**

Trois raisons, dans l'ordre de force :

1. **Elle ne peut plus être éprouvée.** Le blocage porte sur le domaine, pas sur
   la route : depuis META, la sonde est injoignable quoi qu'elle contienne. Une
   sonde qu'on ne peut pas sonder n'a plus de valeur de diagnostic.
2. **Elle porte une dette d'audit.** DEV-010-R indique que les réserves R1 à R4
   d'AUD-008 n'ont **pas** été traitées, conformément à la consigne. Maintenir en
   production une route publique non authentifiée avec des réserves ouvertes,
   pour un test devenu impossible, c'est accumuler une dette sans contrepartie.
3. **Le retrait est propre et le retour bon marché.** DEV-010-R le documente :
   un `revert`, aucun état persistant, tampon en mémoire vive. Et le commit
   `a85cafeb…` reste dans l'historique : si la politique de crawl évolue ou si
   un domaine autorisé apparaît, un `cherry-pick` la remet en service en une
   manœuvre.

**Réserve** : ne retirer qu'**après** que le Pilote ait consigné formellement le
résultat de T1 (`LIVE_CRAWL_POLICY_BLOCKED` sur Render et Netlify) dans le
journal du projet. Le fait doit survivre à la disparition de l'outil qui l'a
produit — sinon, dans six mois, quelqu'un reproposera la même idée.

---

## 9. Verdict

| Objet | Verdict |
|---|---|
| Automatisation directe depuis META (C1/C2/C3) | **NO-GO définitif** — `A ∩ B = ∅` |
| Contournement de la politique de crawl | **NO-GO** — interdit, et fragile en soi |
| C4 = zéro manipulation de contenu | **NON** — un collage subsiste, dû au partage des rôles, pas au système |
| Voie B+ : boîte Drive surveillée | **GO** — supprime le déclenchement manuel, capacités déjà prouvées, aucun secret nouveau |
| Q4 : écran réduit à `MISSION TERMINÉE` | **Impossible aujourd'hui**, atteignable après l'évolution du §6 |
| Sonde L0 en production | **RETRAIT**, commit conservé, après consignation du résultat T1 |

**Recommandation d'ensemble.** Prendre acte que le dernier maillon dépend d'une
capacité de plateforme absente, cesser de chercher de ce côté, et employer
l'effort disponible à automatiser tout l'aval — ce qui est faisable, sûr, et
prêt le jour où l'amont s'ouvrira.

Et, en parallèle du chantier technique, examiner la piste qui ne coûte rien :
**réunir l'agent qui sait et l'agent qui écrit.** C'est la seule qui supprime le
relais aujourd'hui.

---

## 10. Réserves

1. **R1** — META-014-R, META-015 et META-016-R absents du dépôt : travail fondé
   sur la restitution du Pilote. À archiver.
2. **R2** — La politique de crawl est extérieure et peut évoluer dans les deux
   sens. Aucune décision durable ne doit reposer sur son état actuel — d'où le
   choix d'un canal (Drive) qui n'en dépend pas.
3. **R3** — Cadence de scrutation et comportement de l'hébergement à trancher
   par DEV avant conception détaillée (§5.5).
4. **R4** — Le retrait de la sonde suppose que DEV vérifie l'absence de
   régression sur `server.js`, où la Voie B est montée.
5. **R5** — Réunir META et le Pilote dans une même session est une décision
   d'organisation, hors de mon périmètre. Je la signale, je ne la tranche pas.

---

## 11. Cadre respecté

Aucun code, aucune modification backend ou frontend, aucun déploiement, aucun
contournement proposé, aucun secret lu ou demandé, aucune écriture Meta Ads,
aucune CAPI, branche `saas` non ouverte. GitHub reste la destination finale et
la Voie B reste le socle.

---

## 12. Statut

`ARCH-005 — MISSION TERMINÉE`

Automatisation directe depuis META : fermée et démontrée fermée. Repli
recommandé : boîte Drive surveillée, conçue pour ignorer l'auteur du dépôt et
accueillir sans refonte la future capacité d'écriture de META. Sonde L0 : à
retirer après consignation du résultat T1.

— architecte-concept · facebook-ads
