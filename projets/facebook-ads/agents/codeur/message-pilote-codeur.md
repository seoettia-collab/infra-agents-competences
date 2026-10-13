# Message Pilote -> Codeur

MESSAGE-ID : CODE-036
DATE : 2026-10-13
OBJET : Tri des conversations entrantes par l'IA — classement, sans suppression

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Sur CODE-035

Validé. Les six défauts du diagnostic sont tous corrigés. Un audit en échec
renvoie maintenant un échec, et le score global devient indisponible plutôt
que faux. 159 tests verts, vérification sur analyse réelle.

## Le besoin

Les conversations Messenger arrivent dans le dashboard, mêlées : vraies
demandes de devis, démarchage, messages sans objet. Le Gérant doit trier à
la main.

**Correction d'une analyse antérieure** : il avait été envisagé de couper la
synchronisation Messenger. **C'est annulé.** Le Gérant reçoit de vraies
demandes de devis par ce canal. L'avis de META sur ce point était fondé sur
une information qu'il n'avait pas.

Le problème n'est pas le canal, c'est l'absence de tri.

## Décision du Gérant — 13/10/2026

**L'IA classe les conversations entrantes. Elle n'en efface aucune.**

Motif : un vrai prospect classé en spam et supprimé, c'est un chantier perdu
que personne ne verra jamais. Le classement se juge avant de lui donner la
suppression.

## Partie A — classer

Trois catégories, à l'arrivée de chaque conversation :

| Catégorie | Ce que c'est |
|---|---|
| **Demande** | Demande de devis, question sur des travaux, prise de contact réelle |
| **Démarchage** | Publicité, prospection commerciale, spam |
| **Sans objet** | Bonjour seul, question hors sujet, message vide de contenu |

Règles :

- **En cas de doute, c'est une Demande.** Le coût d'une erreur n'est pas
  symétrique : rater un prospect coûte un chantier, lire un spam coûte dix
  secondes.
- Le classement est **révisable par le Gérant** d'un clic. Sa correction fait
  autorité et doit être conservée.
- Le classement porte sur la **conversation**, pas sur chaque message.

## Partie B — afficher

Dans la vue Conversions :

- **À traiter** — les Demandes. C'est la vue par défaut.
- **Écartés** — Démarchage et Sans objet, dans une vue séparée avec un
  compteur. Pas une alerte, un simple nombre.
- Reclasser une conversation d'une vue à l'autre en un clic.
- Vider manuellement les écartés, avec confirmation.

**La vue À traiter ne change pas d'aspect** pour le reste. On ajoute un tri,
pas un nouvel écran.

## Partie C — ce qui est interdit

- **Aucune suppression automatique.** Jamais, quelle que soit la certitude du
  classement.
- Aucune notification, aucune alerte sur les écartés.
- Aucune réponse automatique.
- Le Gérant doit pouvoir **tout voir** s'il le demande, écartés compris.

## Partie D — les anciennes conversations

130 messages de mai sont en base, antérieurs à l'arrêt du projet. Classe-les
comme le reste. S'ils tombent en écartés, ils sortent de la vue sans être
supprimés.

## Ce que tu ne touches pas

- La synchronisation Messenger elle-même : elle reste active
- Les SMS et leur chaîne
- L'IA Reco, le Studio Pub
- Les garde-fous existants

## Vérification attendue

Classe les conversations réelles en base et rapporte la répartition obtenue :
combien de Demandes, de Démarchage, de Sans objet. Sans recopier aucun
contenu ni aucun nom.

## Déploiement

Autorisé. Livraison continue, D-024.

## Interdits

- Ne touche jamais à ` fb-ads-saas` (`srv-d7139du3jp1c7390flq0`)
- Aucune donnée personnelle dans le rapport : des nombres
- Aucune suppression de données
- Aucune valeur de secret

## Ton rapport

Format D-013, référence `CODE-036`.
Si le hub refuse la publication, pousse sur `code-036-rapport`.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-036
```

ou

```
MISSION NON TERMINÉE — CODE-036
```

— Pilote, facebook-ads
