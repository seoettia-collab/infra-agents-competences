# Message Pilote -> Diagnostic

MESSAGE-ID : DIAG-002
DATE : 2026-10-13
OBJET : Sur quelles données le Copilote raisonne-t-il, et lesquelles sont fausses

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Mission volontairement étroite

**Une seule question**, et rien d'autre :

> Sur quelles données le Copilote raisonne-t-il, et lesquelles sont fausses,
> périmées ou mal calculées ?

Pas de refonte, pas de code, pas de proposition d'architecture. Tu listes des
défauts, on les corrigera ensuite un par un. **Cette mission ne doit pas durer
plus de deux heures.**

## Ce qui a déclenché la mission

Le 13/10 au matin, le Copilote a produit en recommandation **urgente** :

> « Pauser Ad Salle de bain clé en main — 42 jours sans lead généré malgré
> diffusion mature »

Trois erreurs dans une seule phrase :

1. La publicité avait été remise en ligne **la veille**, pas 42 jours plus tôt
2. Les 42 jours venaient de l'ancienne version, en pause depuis le 01/09
3. C'était la **meilleure** des deux : 222 impressions et 7 clics, contre 64
   impressions et 0 clic pour l'autre

Suivre cette recommandation aurait coupé la seule publicité qui fonctionnait.
Et elle était classée urgente, en tête de liste.

Ce n'est probablement pas un cas isolé : si un calcul d'ancienneté ignore les
pauses, d'autres calculs souffrent sans doute du même genre de défaut.

## Ta matière

- `documentation/INVENTAIRE-BACKEND.md`, section `routes/ai.js` — 42 routes
- `documentation/INVENTAIRE-FRONTEND.md`, section `js/ai-recommendations.js`
- `documentation/REFERENTIEL.md` et `DECISIONS.md`
- `documentation/DIAGNOSTIC-001.md`, ton premier travail

Tu ne lis pas le code. Si une information te manque pour trancher, écris que
l'inventaire ne le dit pas et passe au point suivant.

## Les quatre points à examiner

**1. Quelles données entrent dans l'analyse ?**
D'après les inventaires, qu'est-ce que le Copilote reçoit : quelles métriques,
sur quelle période, pour quels objets. Et surtout : **ce qu'il ne reçoit pas**
alors qu'il en aurait besoin.

**2. Quels calculs sont faits sur ces données ?**
Ancienneté, absence de résultat, tendance, score. Pour chacun : d'après ce que
tu lis, sur quoi porte le calcul, et peut-il donner un résultat faux comme
celui des 42 jours.

**3. Les statuts sont-ils correctement distingués ?**
Une publicité peut être configurée active sans diffuser, ou en pause depuis
hier, ou en pause depuis six mois. Le Copilote distingue-t-il ces états, ou
les traite-t-il pareil ?

**4. La priorisation est-elle fiable ?**
Comment une recommandation devient-elle « urgente » ? Un calcul faux peut-il
hisser une mauvaise recommandation en tête de liste — ce qui vient de se
produire ?

## Règles de jugement

- **Un défaut annoncé doit être démontré.** Cite ce qui te permet de
  l'affirmer. Sinon ce n'est pas un défaut, c'est une impression.
- Marque chaque constat `[SÛR]` ou `[À VÉRIFIER]`.
- **Hiérarchise** : ce qui peut faire prendre une mauvaise décision d'abord,
  le confort ensuite.
- **Ne gonfle pas la liste.** Si une partie est saine, dis-le. Trois défauts
  réels valent mieux que douze supposés.

## Ce que tu ne fais pas

- Aucune solution technique : tu dis ce qui est faux, pas comment le réparer
- Aucune refonte, aucune proposition d'architecture
- Tu ne juges ni le style du code, ni la qualité des textes produits par l'IA

## Où écrire

```
projets/facebook-ads/documentation/DIAGNOSTIC-002.md
```

Une section par point. Si le hub refuse l'écriture, pousse sur
`diag-002-rapport`.

## Ton rapport

Format D-013, référence `DIAG-002`. Une page au plus, le détail dans
`DIAGNOSTIC-002.md`.

## Ta réponse à l'écran

```
MISSION TERMINÉE — DIAG-002
```

ou

```
MISSION NON TERMINÉE — DIAG-002
```

— Pilote, facebook-ads
