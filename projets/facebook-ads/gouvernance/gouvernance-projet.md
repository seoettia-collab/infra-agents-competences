# Gouvernance — projet facebook-ads

Version 2.0 — 11/10/2026. Remplace la v1 (sept. 2026, sept postes).
Décidée par Ricardo ETTIA, Gérant. Écrite par le Pilote.

---

## 1. Identité

- Projet : facebook-ads
- Dépôts : `seoettia-collab/facebook-ads-backend`, `seoettia-collab/facebook-ads-frontend`
- Hub : `seoettia-collab/infra-agents-competences` — **GitHub fait foi**
- Objectif : acquisition et conversion de leads via Meta Ads (dashboard + backend)

## 2. Pourquoi cette restructuration

Sept postes produisaient plus de messages que de travail livré. La connaissance
se dispersait entre les boîtes et personne ne tenait le fil.

La v2 concentre la connaissance sur **un seul poste**, le Pilote, et répartit
l'exécution sur des postes étroits. Deux règles fondent tout le reste :

- **Un seul gardien de mémoire.** Le Pilote décide de ce qui est su et de ce qui
  est écrit. Les autres exécutent.
- **Des postes étroits.** Un exécutant au périmètre large se disperse et perd en
  précision. Chaque fiche borne un seul métier.

## 3. Chaîne de commandement

```
Gérant (Ricardo ETTIA)
   └── Pilote (Claude)  — connaissance, décision, spécification, contrôle
         ├── Codeur (GPT)         — implémentation et push
         ├── Documentation (GPT)  — écriture de la documentation sous dictée
         └── META (consultant)    — connaissance des pratiques Meta Ads
```

Le Gérant décide. Le Pilote pilote. Les trois autres exécutent dans leur
périmètre, et seulement dans leur périmètre.

## 4. Postes

| Poste | Dossier | Tenu par | Préfixe | Rôle |
|---|---|---|---|---|
| Pilote | `agents/pilote` | Claude | `PIL` | Connaissance du projet, spécification, contrôle, archivage. **Ne code pas.** |
| Codeur | `agents/codeur` | GPT | `CODE` | Implémente, teste, pousse. **N'invente pas de périmètre.** |
| Documentation | `agents/documentation` | GPT | `DOC` | Écrit la documentation **sous la dictée du Pilote**. |
| META | `agents/meta-ads` | META | `META` | Consultant pratiques Meta Ads. Lecture seule, aucune action. |

### 4.1 Postes retirés le 11/10/2026

`architecte-concept`, `auditeur`, `documentation-technique`,
`ingenieur-developpeur`, `historique`, `gpt-pilote`.

Leurs dernières sorties et leurs fiches sont conservées dans
`archives/2026-10-11-restructuration/`. Les décisions qu'elles contiennent
restent en vigueur tant qu'elles n'ont pas été amendées — en particulier
ARCH-001 (boucle de qualité des leads), ARCH-002-R, ARCH-003-R et ARCH-005-R.

## 5. Règles de la v2

### 5.1 Mémoire

- Le Pilote est le **seul gardien de la connaissance** du projet.
- La connaissance vit dans **GitHub**, jamais dans une conversation. Une fenêtre
  de conversation est volatile ; ce qui n'est pas écrit est perdu.
- Le poste Documentation **recopie, il ne reformule pas.** Le Pilote fournit le
  texte, Documentation le pose tel quel. Un scribe qui réécrit fait dériver la
  mémoire.

### 5.2 Code

- Le **Codeur GPT pousse lui-même** sur GitHub.
- Le Pilote **ne code pas** et ne pousse pas de code.
- **Contrôle ciblé, pas systématique.** Le Pilote relit ce qui touche la
  production, la sécurité ou les secrets. Le reste passe sans relecture.
- **Aucun merge vers `main` sans autorisation explicite du Gérant.** Inchangé.
- **Aucun déploiement sans ordre explicite du Gérant.** Inchangé.

### 5.3 META

- META appartient à Meta, **cela ne lui donne aucun accès à notre compte
  publicitaire** : ni données privilégiées, ni signal d'enchère, ni capacité
  d'action. Établi par ARCH-002-R.
- Les données du compte viennent **de notre backend via la Graph API**, jamais
  de META.
- META ne peut ni écrire, ni déclencher, ni pousser. Son rapport transite par le
  Gérant jusqu'au Pilote, qui l'archive. Limite de plateforme connue,
  sans solution à ce jour (ARCH-005-R).

### 5.4 Socle partagé

`standards-communs/organisation-agents.md` s'applique et **n'est pas modifié par
ce projet** : il est partagé avec d'autres projets du dépôt. La v2 est une
surcharge locale à facebook-ads.

## 6. Circuit d'une mission

```
1. Gérant demande
2. Pilote spécifie     -> écrit dans message-pilote-<poste>.md
3. Poste exécute       -> répond dans message-<poste>-pilote.md
4. Pilote contrôle     -> si production / sécurité / secrets
5. Gérant autorise     -> merge, déploiement
6. Pilote fait écrire  -> DECISIONS.md, JOURNAL.md via Documentation
```

Rapport **en remplacement intégral** du fichier de sortie, jamais en ajout.
Pré-vol anti-cache obligatoire avant toute lecture du hub.

## 6 bis. Règle de réponse à l'écran — tous les postes

Cette règle s'applique **à tous les postes sans exception**, Claude comme GPT.

En fin de mission, l'agent répond à l'écran **un bloc unique, et rien d'autre** :

```
MISSION TERMINÉE — <RÉFÉRENCE>
```

ou, si la mission n'a pas pu être menée à son terme :

```
MISSION NON TERMINÉE — <RÉFÉRENCE>
```

`<RÉFÉRENCE>` est l'identifiant de la mission : `CODE-004`, `DOC-012`, `META-017`.

**Interdit à l'écran** : résumé, liste, commentaire, hash de commit, explication,
réserve, question. Tout le détail — ce qui a été fait, ce qui ne l'a pas été,
les réserves, les hashes — va dans le **fichier de sortie du poste**, dans le hub.

Motif : l'écran du Gérant n'est pas un rapport. Un agent qui déverse son détail à
l'écran fait relire deux fois la même chose et déplace la mémoire du projet hors
de GitHub. Le hub garde la trace ; l'écran ne porte que l'état.

Hors mission, une question posée directement par le Gérant se répond normalement.

## 6 ter. Structure obligatoire du rapport — tous les postes

Le rapport va dans le fichier de sortie du poste, en remplacement intégral.
Sa structure est **fixe**. Un agent qui lit un rapport ne doit jamais avoir à
trier pour comprendre : il doit savoir d'avance où se trouve chaque information.

En-tête, toujours ces cinq lignes :

```
MESSAGE-ID : <RÉFÉRENCE>-R
EN-REPONSE-A : <RÉFÉRENCE>
DATE : AAAA-MM-JJ
POSTE : <nom du poste>
OBJET : <une ligne>
```

Corps, toujours ces sept points, numérotés, dans cet ordre :

```
1. PRÉ-VOL — HEAD du hub réellement lu, et commit de base s'il y en a un
2. FAIT — ce qui a été exécuté
3. NON FAIT — ce qui ne l'a pas été, et pourquoi
4. PREUVES — hashs, chemins de fichiers, chiffres de tests
5. IMPACT PRODUCTION — oui / non, et lequel
6. RÉSERVES — ce qui reste à trancher par le Pilote
7. ROLLBACK — la commande exacte, ou « sans objet »
```

Règles de forme :

- Un point vide s'écrit quand même, avec `néant`. On ne supprime pas un point.
- Une à deux lignes par point. Le rapport n'est pas un récit.
- Aucun bloc décoratif, aucun séparateur ASCII, aucune section inventée.
- Aucun secret, nulle part.

Motif : le rapport est lu par un autre poste que celui qui l'écrit. Une
structure variable oblige le lecteur à chercher, et ce qu'on cherche finit par
être oublié.

## 7. Documentation du projet

Dossier `documentation/` — **contenu décidé par le Pilote, écrit par
Documentation.**

| Fichier | Contenu |
|---|---|
| `REFERENTIEL.md` | État réel du projet |
| `ARCHITECTURE.md` | Structure technique |
| `FICHE_TECHNIQUE.md` | URLs, routes, variables — **aucun secret** |
| `JOURNAL.md` | Une entrée par évolution livrée |
| `DECISIONS.md` | Décisions engageantes et leur motif |

## 8. Contraintes permanentes

- Aucun secret dans un message, un rapport, un log ou une URL
- Aucune écriture vers Meta Ads
- CAPI désactivée (décision D5) tant qu'elle n'est pas amendée
- Branche `saas` gelée, sous gouvernance propre
- Runtime Node 20.11.1
- Catégorie spéciale HOUSING : aucune mention d'âge, de genre ni d'analyse
  démographique, y compris descriptive
