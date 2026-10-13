# Message Pilote -> Diagnostic

MESSAGE-ID : DIAG-003
DATE : 2026-10-13
OBJET : Les calculs du Copilote — reprise de DIAG-002 avec accès au code

---

**Relis ta fiche, elle a changé.** Le Gérant a levé l'interdiction de lire le
code. C'est la décision D-019 du 13/10/2026.

Puis lis la gouvernance. Format de rapport : D-013.

## Pourquoi cette reprise

DIAG-002 était bien mené, mais je t'avais envoyé chercher des calculs faux
dans des documents qui ne contiennent aucun calcul. Faute de cadrage de ma
part, pas de la tienne.

Tu avais raison de refuser d'inventer des défauts sans preuve. Maintenant tu
as la matière.

## Ce qui a changé

Tu peux lire `facebook-ads-backend` et `facebook-ads-frontend`, branche
`main`. **En lecture seule** : aucune branche, aucun commit, rien de poussé
dans un dépôt de code. Jamais la branche `saas`.

Et tu continues de ne proposer **aucune solution technique**. Tu dis qu'un
calcul est faux et pourquoi ; le comment appartient au `codeur`.

## La question, inchangée

> Sur quelles données le Copilote raisonne-t-il, et quels calculs peuvent
> produire un résultat faux ?

## Où chercher

- `services/claude-api.js` — construction des prompts, règles métier
- `routes/ai.js` — analyse, audit de configuration, audit-and-fix, chat
- `services/facebook-api.js`, `services/graph-metrics.js` — collecte
- `js/ai-recommendations.js` côté frontend — affichage et priorisation

## Les quatre points

**1. Ce qui entre dans l'analyse.** Quelles métriques, sur quelle période,
pour quels objets. Et ce qui n'y entre pas alors qu'il le faudrait.

**2. Les calculs.** Ancienneté, absence de résultat, tendance, score global,
score de configuration. Pour chacun : la formule réelle, et dans quel cas
elle donne un résultat faux.

Le cas connu : les « 42 jours sans lead » comptés sur toute la vie d'une
publicité, pauses comprises, alors qu'elle venait d'être remise en ligne.
**Cherche les formules qui souffrent du même genre de défaut.**

**3. Les statuts.** Une publicité peut être configurée active sans diffuser,
en pause depuis hier, ou en pause depuis six mois. Ces états sont-ils
distingués dans le calcul, ou confondus ?

**4. La priorisation.** Comment une recommandation devient « urgente ». Un
calcul faux peut-il hisser une mauvaise recommandation en tête — ce qui s'est
produit ?

## Règles de jugement, inchangées

- Un défaut annoncé se démontre : cite le fichier et ce que tu y as lu
- `[SÛR]` ou `[À VÉRIFIER]` sur chaque constat
- Hiérarchise : ce qui fait prendre une mauvaise décision d'abord
- **Ne gonfle pas la liste.** Si une partie est saine, dis-le

## Où écrire

```
projets/facebook-ads/documentation/DIAGNOSTIC-003.md
```

Si le hub refuse l'écriture, pousse sur `diag-003-rapport`.

## Ton rapport

Format D-013, référence `DIAG-003`. Une page au plus.

## Ta réponse à l'écran

```
MISSION TERMINÉE — DIAG-003
```

ou

```
MISSION NON TERMINÉE — DIAG-003
```

— Pilote, facebook-ads
