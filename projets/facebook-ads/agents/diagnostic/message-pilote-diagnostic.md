# Message Pilote -> Diagnostic

MESSAGE-ID : DIAG-006
DATE : 2026-10-13
OBJET : Le Studio Pub produit-il les bons champs au bon format pour Meta ?

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Sur DIAG-005

Bon travail. Tu n'as pas garanti ce que tu n'avais pas pu vérifier, et tu as
signalé que la documentation Meta renvoyait vers un ancien écran OpenAI.
C'est la bonne discipline.

## Le constat du Gérant

Le Studio Pub génère beaucoup de champs, et il n'est pas certain qu'ils
correspondent à ce que Meta attend réellement pour une publicité Lead Ads.

Ce que l'écran affiche aujourd'hui :

- « Accroches » — jusqu'à 5, 40 caractères maximum
- « Texte principal — court » — 125 caractères maximum
- « Texte principal — long » — 255 caractères maximum
- « Description » — 30 caractères maximum
- « Call-to-action » — liste déroulante

Plus un panneau d'options visuelles : type de projet, pièce, surface, type de
logement, éléments travaillés, style, ambiance, caméra, décoration.

## La question

> **Ces champs et ces limites correspondent-ils à ce que Meta attend vraiment
> pour une publicité image en Lead Ads ?**

## Les quatre points

**1. Les champs réels de Meta.**
D'après la documentation officielle, quels champs composent une publicité
image Lead Ads : titre, texte principal, description, lien, bouton d'appel à
l'action. Donne le nom de chacun et sa limite de caractères réelle.

**2. Le recoupement avec le Studio Pub.**

| Champ du Studio Pub | Existe chez Meta ? | Limite correcte ? |
|---|---|---|

Signale en particulier :
- les champs du Studio Pub qui n'existent pas chez Meta
- les champs de Meta que le Studio Pub ne produit pas
- les limites de caractères fausses

**3. Les « deux textes principaux ».**
Le Studio Pub produit un texte court et un texte long. Meta n'accepte qu'un
seul texte principal par publicité. À quoi servent ces deux champs dans le
code, et lequel part réellement chez Meta ?

**4. Le panneau d'options visuelles.**
Type de projet, pièce, surface, style, ambiance, caméra, décoration — ces
champs servent-ils à la génération d'image, ou finissent-ils dans le texte
envoyé à Meta ? Dis simplement où ils vont.

## Où chercher

- La documentation Meta : spécifications des publicités image, formats Lead
  Ads, limites de caractères
- `routes/ai.js`, les routes de génération de contenu
- `services/claude-api.js`, fonction `generateAdContent`
- `js/ai-creation.js` côté frontend
- `documentation/INVENTAIRE-BACKEND.md` et `INVENTAIRE-FRONTEND.md`

Tu peux lire le code, en lecture seule — décision D-019.

## Règles de jugement

- Un écart annoncé se démontre : cite le fichier ou la page officielle
- `[SÛR]` ou `[À VÉRIFIER]` sur chaque constat
- Hiérarchise : ce qui produit un contenu refusé ou tronqué par Meta d'abord
- **Ne gonfle pas la liste.** Si le Studio Pub est juste, dis-le

## Ce que tu ne fais pas

- Aucune solution technique, aucune proposition de refonte
- Aucun jugement sur la qualité des textes produits — c'est l'affaire de META
- Aucune modification de code

## Où écrire

```
projets/facebook-ads/documentation/DIAGNOSTIC-STUDIO-PUB.md
```

Si le hub refuse l'écriture, pousse sur `diag-006-rapport`.

## Ton rapport

Format D-013, référence `DIAG-006`. Une page au plus.

## Ta réponse à l'écran

```
MISSION TERMINÉE — DIAG-006
```

ou

```
MISSION NON TERMINÉE — DIAG-006
```

— Pilote, facebook-ads
