# Message Pilote -> Diagnostic

MESSAGE-ID : DIAG-005
DATE : 2026-10-13
OBJET : Marche à suivre pour brancher le serveur MCP — écran par écran

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Sur DIAG-004

Bon travail. Verdict clair, sources citées, et tu as écarté l'hypothèse d'un
accès à l'algorithme interne au lieu de la laisser traîner.

## Ce qui est demandé

Le Gérant va brancher le serveur MCP publicités. **Il ne lit pas la
documentation — c'est ton rôle.** Tu as déjà lu ces pages pour DIAG-004.

Produis une **marche à suivre exécutable**, écran par écran, qu'il n'ait qu'à
appliquer sans jamais ouvrir un document.

## Forme attendue

Des étapes numérotées. Pour chacune :

- où aller, précisément : nom du site, nom du menu, nom du bouton
- quoi cliquer, quoi saisir
- ce qu'il doit voir une fois l'étape réussie

**Pas d'explication de fond, pas de justification, pas de lien à aller lire.**
Il exécute, il ne cherche pas.

Si une étape demande une information qu'il doit relever quelque part —
identifiant d'application, adresse de redirection — dis où la trouver et où
la recoller.

## Les deux chemins

**Chemin A — sans créer d'application Meta**, celui décrit par l'aide Meta
Business. Le plus court si le compte est éligible.

**Chemin B — avec une application Meta à créer**, depuis
`developers.facebook.com/apps`, avec le cas d'usage « Create & manage ads
with ads MCP server ».

Donne les deux, **A en premier**. Et dis en une ligne comment savoir, dès la
première étape, si A fonctionne ou s'il faut passer à B.

## Le client visé

Le Gérant branchera le connecteur dans **ChatGPT**. Donne les étapes pour ce
client précisément : mode développeur, type d'authentification, adresse du
serveur, identifiant client, URL de redirection à déclarer côté Meta.

## Les autorisations

Sept sont demandées. Pour chacune, une ligne : son nom exact, et à quoi elle
sert en français simple.

Signale celles qui donnent un **droit d'écriture** sur le compte — le Gérant
doit savoir ce qu'il accorde.

## Ce qui peut bloquer

Liste les blocages prévisibles et quoi faire : compte non éligible, cas
d'usage introuvable, autorisation refusée, URL de redirection rejetée.

## Ce que tu ne fais pas

- Aucune connexion, aucune installation, aucun token
- Tu n'inventes aucune étape : si la documentation ne la décrit pas, écris-le
- Aucune recommandation sur l'opportunité de brancher — c'est tranché

## Où écrire

```
projets/facebook-ads/documentation/MARCHE-A-SUIVRE-MCP.md
```

Si le hub refuse l'écriture, pousse sur `diag-005-rapport`.

## Ton rapport

Format D-013, référence `DIAG-005`. Une page au plus — **la marche à suivre
va dans le fichier**, pas dans le rapport.

## Ta réponse à l'écran

```
MISSION TERMINÉE — DIAG-005
```

ou

```
MISSION NON TERMINÉE — DIAG-005
```

— Pilote, facebook-ads
