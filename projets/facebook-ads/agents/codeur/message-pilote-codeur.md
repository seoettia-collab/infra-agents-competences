# Message Pilote -> Codeur

MESSAGE-ID : CODE-030
DATE : 2026-10-13
OBJET : Deux défauts du Copilote — rapport restauré non revalidé, inconnu affiché zéro

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Sur CODE-029

Validé. Périmètre d'analyse restreint, ancienneté comptée depuis la reprise,
protection des 72 heures en place, 96 tests verts, recommandation fautive
disparue à la vérification réelle. Bon travail.

## Contexte

Le Diagnostic a examiné les calculs du Copilote (`DIAGNOSTIC-003.md`) et
démontré six défauts. Deux peuvent encore faire prendre une mauvaise décision.
Cette mission ne traite que ceux-là. Les quatre autres suivront.

## Partie A — F01 : rapport restauré redevenu actionnable

Un ancien rapport peut être restauré et ses recommandations redeviennent
exécutables **sans avoir été revalidées** contre l'état réel du compte.

C'est le même mécanisme que l'incident de ce matin : une recommandation vraie
il y a six semaines redevient proposable aujourd'hui, alors que les
publicités, les statuts et les chiffres ont changé.

Ce qui est demandé :

1. Un rapport restauré est **consultable**, pas **actionnable**. Ses
   recommandations sont visibles, aucune ne peut être exécutée.
2. Pour agir, il faut relancer une analyse sur l'état courant.
3. Affiche clairement la date du rapport et le fait qu'il est historique.

La protection des 72 heures de CODE-029 ne suffit pas ici : elle porte sur
l'âge de la publicité, pas sur celui du rapport.

## Partie B — F02 : une donnée inconnue affichée comme zéro

Une métrique absente est présentée à zéro. Un CPM non renseigné devient
« CPM à 0 », et l'IA raisonne sur un chiffre qui n'existe pas.

Ce qui est demandé :

1. Distingue **absent** de **zéro**. Un chiffre non disponible n'est pas un
   chiffre nul.
2. Dans le contexte envoyé à l'IA, une métrique absente est marquée comme
   indisponible, pas convertie en 0.
3. À l'affichage, une métrique absente se montre par un tiret ou une mention
   explicite, jamais par un 0.
4. Vérifie les métriques les plus exposées : CPM, CPL, CPC, CTR, taux de
   conversion.

Un zéro faux est pire qu'une donnée manquante : il se calcule, se compare et
déclenche des alertes.

## Ce que tu ne touches pas

- Les quatre autres défauts du diagnostic — F03 à F06, autre mission
- Le moteur IA lui-même
- Les garde-fous : mode réduction, HOUSING, D5, protection 72 heures
- Studio Pub, Rédacteur IA, frontend hors affichage des métriques

## Vérification attendue

Relance une analyse réelle et confirme qu'aucune métrique absente n'apparaît
à zéro dans le contexte envoyé à l'IA.

## Déploiement

Autorisé.

## Interdits

- Ne touche jamais à ` fb-ads-saas` (`srv-d7139du3jp1c7390flq0`)
- Aucune action réelle sur les publicités
- Aucune valeur de secret

## Ton rapport

Format D-013, référence `CODE-030`, en remplacement intégral.
Si le hub refuse la publication, pousse sur `code-030-rapport`.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-030
```

ou

```
MISSION NON TERMINÉE — CODE-030
```

— Pilote, facebook-ads
