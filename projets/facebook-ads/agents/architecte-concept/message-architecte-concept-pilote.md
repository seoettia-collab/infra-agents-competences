# Message architecte-concept -> Pilote

MESSAGE-ID : ARCH-004-R
EN-REPONSE-A : ARCH-004
DATE : 2026-09-01
AGENT : architecte-concept (facebook-ads)
OBJET : Maillon META -> système sans relais du Gérant — architectures, tests de capacité, verdict

---

## 0. Pré-vol — ce qui a réellement été lu

| Source | Référence |
|---|---|
| Hub `infra-agents-competences` | `ac5460d` (01/09/2026) |
| Socle | `standards-communs/organisation-agents.md` (règles 1 à 15) |
| Gouvernance projet | `projets/facebook-ads/gouvernance/gouvernance-projet.md` |
| DIR-015 | `message-direction-gpt-pilote.md` (Voie B éprouvée, commit proxy `7930dd8`) |
| DEV-008-R | `message-ingenieur-developpeur-pilote.md` (Voie B en prod, `main` `8c97dc5`) |
| Capacités META | `fiche-meta-ads.md` §2 et §2bis — **source de vérité utilisée ici** |
| Boîte META | `message-meta-ads-pilote.md` (contient `META-010-R`) |
| Backend `main` | `8c97dc5498b5032c7d66205cc21043617df97911` |
| Code Voie B relu | `routes/pilote-drive.routes.js` (109 l.), `services/pilote-drive-proxy.js` (452 l.) |

**Réserve de pré-vol, à signaler d'emblée** : ARCH-004 est référencé
`EN-REPONSE-A : DIR-015 / META-013-R`. **`META-013-R` n'existe pas dans le
dépôt** — la boîte META contient `META-010-R`, et aucun fichier ne mentionne
META-011, META-012 ni META-013. Je n'ai donc pas pu le lire et **je n'en invente
pas le contenu**. Les capacités de META retenues ici viennent de
`fiche-meta-ads.md`, qui fait foi. Si META-013-R contient des résultats de test
plus récents, ce rapport doit être relu à leur lumière (voir §9, R1).

Aucune implémentation. Aucun code écrit. Branche `saas` non ouverte.

---

## 1. Le problème, posé exactement

### 1.1 Ce qui fonctionne déjà

```
Pilote ──> Drive ──> META            (mission descendante : OK)
Drive ──> backend Render ──> GitHub  (Voie B : OK, éprouvée DIR-015)
```

La Voie B est en production : `POST /api/pilote/push-meta-response` lit un
document Drive **dans un dossier autorisé**, en **lecture seule Drive**, et
écrit une **cible d'allowlist** sur GitHub avec le préfixe de commit
`[proxy-push][meta-drive]`, protégée par `x-pilote-secret` en comparaison à
temps constant, avec **fermeture par défaut** si le secret n'est pas configuré.

### 1.2 Ce qui manque

Le retour de META n'entre dans Drive que par une main humaine.

### 1.3 La contrainte physique qui commande tout le reste

D'après la fiche META :

> Google Drive écriture : IMPOSSIBLE. **Son outil ouvre des pages, il n'émet pas
> de requête authentifiée.**
> GitHub écriture : IMPOSSIBLE (ni git, ni réseau programmatique).

Ces deux lignes disent la même chose sous deux angles : **META n'est pas un
client réseau, c'est un lecteur de pages.** Toute architecture qui suppose que
META « envoie » quelque chose est morte à la naissance.

Mais elles laissent une porte ouverte, et c'est la seule : *ouvrir une page* est
**une requête HTTP GET non authentifiée**. Si cette requête atteint réellement
notre serveur, alors META peut émettre de l'information — pas en l'envoyant,
mais **en la lisant**. C'est le pivot de tout ce rapport.

### 1.4 Une part du relais humain ne sera jamais supprimée — le dire maintenant

META et le Pilote sont deux fenêtres de conversation distinctes. Aucun dispositif
serveur ne permet à l'une de prendre la parole dans l'autre. **Il restera donc
toujours un geste humain : ouvrir la session de META et lui donner la main.**

Ce que ce lot peut supprimer, c'est le transport du **contenu** : Ricardo ne
copie plus, ne télécharge plus, ne ré-upload plus, ne relit plus le rapport. Il
lance la session, et le rapport arrive seul.

Cette distinction n'est pas un détail de langage. Si on promet « zéro
intervention humaine » et qu'il reste un clic, on aura livré un échec ; si on
promet « zéro manipulation de contenu » et qu'on le tient, on aura livré
exactement ce que demande le critère de succès — *« sans que Ricardo touche au
contenu »*. C'est bien ce périmètre-là qui est visé.

---

## 2. Architectures évaluées

Quatre voies, dont trois issues de la directive et une quatrième qui est le
repli. Aucune n'est présupposée valide.

### Voie C1 — Ingestion par navigation GET, jeton one-shot, payload borné et chunké

**Principe.** Le backend expose une route publique de dépôt. META y accède par
navigation successive, chaque URL portant un fragment du rapport encodé, un
numéro de séquence et une empreinte. Le backend accumule, vérifie l'empreinte
globale, puis écrit sur GitHub par le chemin déjà éprouvé.

```
Pilote ──(jeton one-shot dans le document de mission)──> Drive ──> META
META ──(GET n°1..k, payload chunké)──> backend ──> tampon
META ──(GET finalize + empreinte globale)──> backend ──> GitHub
```

**Le jeton — point de conception essentiel.** Il n'est jamais donné à META par
Ricardo. Le backend le frappe à la création de la mission, le Pilote l'insère
dans le document de mission Drive que META lit déjà. Le jeton descend donc par
le canal qui fonctionne, et remonte par le canal qu'on ouvre. **Aucun secret
permanent, aucune valeur durable, aucune circulation par le Gérant.**

| Critère | Analyse |
|---|---|
| **Sécurité** | Jeton à usage unique, TTL court, lié à un MESSAGE-ID et à une cible unique, révoqué à la finalisation. Il n'autorise qu'une chose : déposer un rapport dans la boîte META. Il ne remplace pas `PILOTE_PUSH_SECRET` et ne donne accès à rien d'autre |
| **Limites de taille** | Le vrai plafond. Une URL est raisonnablement exploitable jusqu'à ~2 000 caractères ; l'encodage inflate d'environ un tiers. Soit **~1,2 ko utile par navigation**. Un rapport META de 20 ko demanderait ~17 navigations — ramenées à **4 ou 5 avec une compression avant encodage**. C'est le levier décisif |
| **Idempotence** | Chaque fragment est adressé par (jeton, séquence, empreinte du fragment). Un rejeu identique est absorbé sans effet ; un fragment divergent sur une séquence déjà servie est rejeté. La finalisation n'écrit que si l'empreinte globale correspond |
| **Expiration** | Jeton et tampon expirent ensemble. Tampon purgé à la finalisation, à l'expiration, ou sur rejet |
| **Journalisation** | Identifiant du jeton (jamais sa valeur), séquence, taille, empreinte, IP, verdict. Aucune valeur de secret, réduction déjà en place dans le proxy |
| **Risque cache / prefetch** | **Le risque principal.** Un GET qui modifie un état viole la sémantique HTTP : préchargement du navigateur, aperçu de lien, antivirus, réessai de l'agent, cache d'hébergeur peuvent rejouer l'appel. Traité par construction — dépôt idempotent adressé par contenu, écriture GitHub **uniquement** sur appel de finalisation explicite portant l'empreinte globale, `Cache-Control: no-store`, nonce unique par URL |
| **Rollback** | Route distincte derrière un interrupteur. Coupée, on revient à la Voie B sans rien perdre |
| **Impact backend** | Un fichier de route, un service de tampon. **Réutilise** l'écriture GitHub, l'allowlist de cibles, le garde-fou `ACTIVE_REPORT_PROTECTED` et la réduction de messages déjà audités. Aucun frontend, aucun appel Meta Ads |

**Réserve technique sérieuse.** Un tampon en mémoire est perdu si Render
redémarre en cours de dépôt : le dépôt échoue et doit être refait. L'alternative
est un tampon persisté, donc **une table de plus** — première écriture en base de
tout ce canal. Arbitrage à poser au Pilote : *tampon volatile, simple, avec
reprise manuelle en cas de redémarrage* (recommandé pour la V1) **ou** *tampon
persisté, robuste, avec une table à maintenir*.

**Verdict Voie C1 : la seule qui supprime réellement le transport humain — sous
réserve absolue du test T1.**

### Voie C2 — Page de dépôt transformant une navigation en POST

**Principe.** Le backend sert une page contenant un formulaire ou du script ;
le navigateur de META l'exécute et émet un POST.

Deux conditions cumulatives : que l'outil de META **exécute** le script ou
soumette le formulaire, et surtout qu'il puisse **y injecter le contenu du
rapport**. Or la fiche décrit un outil qui *ouvre des pages* — un lecteur, pas
un pilote d'interface. Même en supposant l'exécution de script, il faudrait que
META saisisse plusieurs dizaines de milliers de caractères dans un champ, ce
qu'aucun élément du dossier ne laisse espérer.

| Critère | Analyse |
|---|---|
| Sécurité | Comparable à C1, avec en plus une surface web servie publiquement |
| Taille | Excellente **si** ça marche : un POST n'a pas la limite d'URL |
| Autres critères | Sans objet tant que la faisabilité n'est pas démontrée |

**Verdict Voie C2 : peu probable, mais le gain serait tel qu'un test bon marché
se justifie — et seulement si T1 échoue ou si T2 révèle une limite d'URL
rédhibitoire.**

### Voie C3 — Fichier ou lien public temporaire produit par META

**Principe.** META génère un fichier dans son bac à sable et en publie un lien
que le backend irait chercher.

La directive pose elle-même que `/mnt/data` est inaccessible à Render. Les liens
de ce type sont en général liés à la session et à l'authentification de
l'utilisateur : ils ne sont pas récupérables par un serveur tiers. Quant à
déposer sur un service de partage externe, cela suppose une requête sortante
authentifiée — exactement ce que META ne sait pas faire.

**Verdict Voie C3 : NO-GO, sauf preuve contraire apportée par un test T7.**
On ne conçoit rien dessus.

### Voie C4 — Repli : Voie B pilotée sans le Gérant

**Principe.** Ne rien ouvrir de nouveau. META rend son rapport **inline au
Pilote** — canal décrit comme *« toujours fiable »* par sa fiche. Le Pilote,
qui sait déjà écrire dans le dossier Drive et appeler la route, dépose et
déclenche.

C'est déjà la manœuvre décrite par DIR-015 : *« tu crées le document dans le
dossier partagé, tu déclenches la route »*. **Si le Pilote fait ces deux gestes
lui-même, le Gérant ne touche déjà plus au contenu aujourd'hui, sans une ligne
de code.**

| Critère | Analyse |
|---|---|
| Sécurité | Inchangée, déjà auditée deux fois (AUD-006, AUD-007) |
| Taille | Aucune limite pratique |
| Coût | Nul |
| Limite | Reste tributaire de la capacité du Pilote à écrire sur Drive et à appeler la route sans passer par Ricardo — **fait à vérifier, pas à supposer** |

**Verdict Voie C4 : c'est le socle. Elle doit rester en service quoi qu'il
advienne, et elle est le repli permanent de C1.**

---

## 3. Capacités META à vérifier — AVANT toute ligne de code

C'est le point 6 de la directive, et le cœur du livrable. **Tant que T1 n'a pas
été exécuté, toute décision de développement serait prise sur une hypothèse.**

Ces tests se conduisent par une mission META ordinaire. Chacun a un résultat
attendu binaire et une conséquence de conception.

| # | Test | Protocole | Ce qu'il décide |
|---|---|---|---|
| **T1** | **Émission d'un GET réel** | Le Pilote place dans la mission META une URL unique vers une route de test du backend. META l'ouvre. On regarde le journal serveur | **Test racine.** Si le serveur ne voit rien, **C1 et C2 tombent ensemble** et le lot s'arrête sur C4 |
| **T2** | **Longueur d'URL exploitable** | Trois URL de charge croissante (~1 000, ~3 000, ~6 000 caractères). Vérifier ce qui arrive **entier** côté serveur | Fixe la taille des fragments et donc leur nombre. Une limite basse rend C1 pénible et peut justifier C2 |
| **T3** | **Fidélité du transport** | Une charge connue avec caractères d'échappement, accents, retours à la ligne encodés. Comparer l'empreinte reçue à l'empreinte attendue | Valide que le contenu n'est ni tronqué ni altéré. Sans cela, aucune écriture GitHub n'est acceptable |
| **T4** | **Séquence multiple dans un même tour** | Cinq navigations successives demandées en une fois. Compter les arrivées et l'ordre | Détermine si un rapport multi-fragments est réaliste, ou si META s'arrête après une ou deux ouvertures |
| **T5** | **Rejeu et préchargement** | Une seule navigation demandée. Compter les requêtes reçues | Dimensionne l'idempotence. Si un appel arrive en double, la conception de C1 le prévoit déjà, mais il faut le savoir |
| **T6** | **Lecture de la réponse** | La route renvoie un code de contrôle. META doit le restituer | Conditionne la poignée de main de finalisation et la détection d'échec par META |
| **T7** | **Uniquement si T1 échoue** | (a) C2 : la page de dépôt s'exécute-t-elle ? (b) C3 : META peut-il produire une URL publique durable, récupérable par un tiers ? | Départage un repli éventuel avant d'abandonner |

**Règle de conduite** : ces tests ne demandent aucun secret à META, n'écrivent
rien sur GitHub, et n'exposent qu'une route de test sans effet, retirable en un
commit. Coût estimé : une mission META, une demi-journée de DEV pour la route de
test.

**Critère d'arrêt franc** : si T1 échoue, on ne cherche pas d'astuce. On acte
que META est un lecteur, on consolide C4, et on ferme le sujet — comme la fiche
l'a déjà fait pour le token GitHub et l'écriture Drive : *« Trois tentatives,
même cause. Dossier clos. »*

---

## 4. Architecture recommandée

**C1 pour le contenu, C4 comme socle permanent, avec bascule automatique.**

```
1. Le Pilote crée la mission.
2. Le backend frappe un jeton one-shot lié au MESSAGE-ID et à la cible.
3. Le Pilote dépose la mission sur Drive, jeton inclus.
4. META lit, travaille, produit son rapport.
5. META dépose par navigations successives, puis finalise.
6. Le backend vérifie l'empreinte globale et écrit sur GitHub.
7. Le Pilote lit sur GitHub. Le Gérant n'a touché aucun contenu.
```

Quatre principes de conception qui ne se négocient pas :

1. **Le jeton descend par le canal existant.** Il ne circule jamais par Ricardo,
   n'est jamais permanent, ne vaut que pour un rapport et une cible.
2. **Aucune écriture GitHub avant finalisation vérifiée.** Un dépôt partiel ne
   produit jamais de commit. Le pire cas est un rapport à refaire, jamais un
   fichier à moitié écrit.
3. **C1 réutilise la Voie B, ne la double pas.** Même écriture GitHub, même
   allowlist, mêmes garde-fous, même préfixe de commit — distinct pour la
   traçabilité : `[proxy-ingest][meta-url]`. On ajoute une entrée, pas un
   second système.
4. **Repli explicite.** Si le dépôt échoue ou expire, le Pilote reprend par la
   Voie B. Aucun rapport n'est jamais perdu faute de canal.

**Seuil de bascule à retenir** : au-delà d'une taille de rapport à fixer après
T2, C1 devient une cérémonie de dix ouvertures de page pour un gain nul.
Au-delà du seuil, **la Voie B reste la bonne réponse**, et ce n'est pas un aveu
d'échec : c'est la reconnaissance qu'une URL n'est pas un tuyau.

---

## 5. Menaces et garde-fous

| Menace | Gravité | Garde-fou |
|---|---|---|
| Jeton exposé dans l'historique du navigateur, les journaux intermédiaires ou un en-tête de provenance | Élevée | Usage unique, TTL court, portée d'un seul rapport vers une seule cible, révocation à la finalisation, aucune valeur permanente |
| Route publique non authentifiée : sollicitation abusive, saturation | Moyenne | Jeton obligatoire, rejet immédiat et muet d'un jeton inconnu, limitation de débit, plafonds de taille totale et de nombre de fragments |
| Empoisonnement du contenu par un tiers ayant capté le jeton | Moyenne | Fenêtre courte, cible unique et non choisissable, préfixe de commit distinct, historique GitHub comme retour arrière, garde-fou `ACTIVE_REPORT_PROTECTED` déjà en place, relecture par le Pilote |
| GET mutant rejoué par cache, préchargement ou réessai | **Élevée** | Dépôt idempotent adressé par contenu, écriture différée à la finalisation, `Cache-Control: no-store`, nonce par URL, aucun état porté par la réponse |
| Troncature silencieuse d'une URL trop longue | **Élevée** | Empreinte par fragment **et** empreinte globale. Discordance = aucun commit |
| Redémarrage serveur pendant un dépôt | Moyenne | Tampon volatile assumé + reprise par la Voie B ; ou tampon persisté si le Pilote arbitre en ce sens |
| Dérive de périmètre : la route devient une porte d'écriture générique | **Élevée** | Une seule cible autorisée, chemin jamais fourni par l'appelant, aucun paramètre libre, aucune extension sans nouvel audit |
| Contenu inattendu dans le rapport | Faible | Taille plafonnée, type de contenu contraint, réduction des messages déjà implémentée |

**Interdit permanent, conformément au point 5 de la directive** : aucun secret
de longue durée dans une URL, dans un document Drive, ni dans un dépôt.
`PILOTE_PUSH_SECRET` ne doit jamais être communiqué à META, ni servir à ce
canal. Les deux mécanismes restent séparés.

---

## 6. Plan d'implémentation DEV minimal

Conditionné à T1. **Rien ne démarre avant.**

| Lot | Contenu | Sortie attendue |
|---|---|---|
| **L0 — Sonde de capacité** | Route de test sans effet, journalisée, sans écriture. Support des tests T1 à T6 | Verdict binaire : le GET arrive, ou il n'arrive pas |
| **L1 — Jeton** | Frappe d'un jeton one-shot lié à un MESSAGE-ID et à une cible, TTL, révocation, restitution au Pilote. Aucun secret permanent | Le Pilote obtient un jeton à insérer dans la mission |
| **L2 — Dépôt fragmenté** | Réception idempotente, contrôle de séquence, empreintes, plafonds, expiration, purge | Un contenu complet est reconstitué en mémoire, sans aucune écriture |
| **L3 — Finalisation** | Vérification de l'empreinte globale, puis écriture GitHub **par le chemin existant**, préfixe `[proxy-ingest][meta-url]` | Un commit conforme, ou un refus net |
| **L4 — Interrupteur et repli** | Activation par configuration, coupure sans redéploiement, repli documenté vers la Voie B | Retrait possible en une manœuvre |

Contraintes de mission pour DEV, à reprendre telles quelles :
aucun frontend, SaaS gelé, aucun garde-fou existant modifié, aucune nouvelle
cible GitHub, audit obligatoire avant activation — comme pour la Voie B.

---

## 7. Verdict

### `GO CONDITIONNEL`

**GO immédiat** sur **L0, la sonde de capacité**, et sur la campagne de tests
T1 à T6. C'est peu coûteux, sans risque, et cela transforme la question en fait.

**GO sur C1 (lots L1 à L4)** si et seulement si **T1 réussit et T3 est fidèle**.
Le nombre de fragments issu de T2 et T4 fixera le seuil de bascule.

**NO-GO immédiat** sur C3 : rien ne la soutient dans le dossier.

**NO-GO sur C2 en première intention** : à ne rouvrir que si T1 échoue, comme
dernière vérification avant clôture.

**Décision de repli, à acter dès maintenant** : si T1 échoue, la Voie C4 devient
la réponse définitive. On documente que META est un lecteur, et le sujet est
clos — comme l'ont été le token GitHub et l'écriture Drive.

**Et un geste utile, sans attendre quoi que ce soit** : vérifier si le Pilote
peut lui-même déposer sur Drive et appeler la route. Si oui, **le Gérant est
déjà hors du transport de contenu dès aujourd'hui**, et C1 ne fait plus que
supprimer un aller-retour entre deux fenêtres. Ce serait déjà l'essentiel du
critère de succès, obtenu sans une ligne de code — et cela mérite d'être
constaté avant d'engager DEV.

---

## 8. Réserves

1. **R1 — `META-013-R` introuvable dans le dépôt.** Capacités établies à partir
   de `fiche-meta-ads.md` et de DIR-015. Si META-013-R existe hors dépôt et
   contient des résultats de test, ce rapport doit être relu — et le fichier
   poussé, puisque GitHub fait foi.
2. **R2 — Aucune capacité de META n'a été testée par moi.** Je ne dispose ni de
   son environnement ni d'un moyen de l'éprouver. Tout ce rapport repose sur des
   capacités **déclarées**, d'où la place centrale donnée aux tests T1 à T7.
3. **R3 — Tampon volatile ou persisté** : arbitrage Pilote requis avant L2.
   Persister introduirait la première écriture en base de ce canal.
4. **R4 — Part humaine irréductible** : ouvrir la session de META restera un
   geste humain. Le critère de succès doit être lu comme *« Ricardo ne touche
   pas au contenu »*, ce qui est atteignable, et non *« Ricardo ne fait rien »*,
   qui ne l'est pas.
5. **R5 — Audit obligatoire** : une route publique non authentifiée qui aboutit
   à une écriture GitHub doit passer par l'Auditeur avant activation, au même
   titre que la Voie B, et avec la même exigence.

---

## 9. Cadre respecté

Aucun code, aucune modification backend ou frontend, aucun déploiement, aucun
secret lu, écrit ni demandé. Branche `saas` non ouverte. Les noms de routes, de
constantes et de codes d'erreur cités proviennent de la lecture du code déployé
et servent uniquement à évaluer l'impact ; le « comment » appartient à
l'ingénieur-développeur.

---

## 10. Statut

`ARCH-004 — MISSION TERMINÉE`

Quatre voies évaluées, sept tests de capacité définis, architecture recommandée
et bornée, menaces et garde-fous posés, plan DEV en cinq lots, verdict
**GO CONDITIONNEL** subordonné au test T1.

— architecte-concept · facebook-ads
