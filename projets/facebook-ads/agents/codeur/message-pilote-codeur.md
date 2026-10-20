# Message Pilote -> Codeur

MESSAGE-ID : CODE-043
DATE : 2026-10-20
OBJET : Le texte des publicités est tronqué à l'envoi chez Meta

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Sur CODE-042

Validé. Liste réelle des formulaires, avertissement et confirmation, trace en
base avant envoi à Meta. Tu as aussi corrigé une fenêtre hors écran.

## Le défaut constaté

Le Gérant trouvait sa publicité peu informative. Vérification faite sur le
compte, le texte envoyé à Meta est **coupé en plein milieu d'une phrase**.

Publicité `120248281347920417` — « Salle de bain clé en main ».
Créative `1135265525510950`, modifiée le 19/10.

Texte réellement diffusé :

```
Votre salle de bain est vieillissante ? On s'occupe de tout :
plomberie, carrelage, sanitaires. 1 seul artisan, pas de
```

La phrase s'arrête sur « pas de ». Ce n'est pas un choix de rédaction, c'est
une troncature. Le prospect lit un texte inachevé.

Même valeur dans `creative.body` et dans `object_story_spec.link_data.message`.

## Ce qui est demandé

**1. Trouver où le texte est coupé.**

Pistes, à vérifier plutôt qu'à supposer :

- une troncature appliquée à la publication, héritée des anciennes limites du
  Studio Pub — 125 caractères était la valeur du « texte court ». Le texte
  ci-dessus en fait environ 120.
- une troncature à la génération, avant enregistrement
- une coupure lors d'une modification de créative

Tu as retiré les troncatures fausses en CODE-033. **Vérifie qu'il n'en reste
pas sur le chemin de publication**, qui est un autre chemin que la génération.

**2. Corriger la cause.** Un texte ne doit jamais partir coupé chez Meta. S'il
dépasse une limite réelle, il faut le refuser et le dire, pas le tronquer en
silence.

**3. Vérifier les deux publicités actives** et rapporter le texte réellement
diffusé pour chacune.

## Ce que tu ne fais pas

- **Tu ne réécris pas les textes publicitaires.** Tu corriges la troncature,
  le contenu appartient au Gérant.
- Tu ne republies aucune créative sans ordre : la Salle de bain vient d'être
  modifiée le 19/10 et son apprentissage court. Signale ce qu'il faudrait
  republier, le Gérant décidera.

## Ce que tu ne touches pas

- Les garde-fous : HOUSING, D5, mode réduction, protection 72 heures
- Le choix du formulaire livré en CODE-042
- L'IA Reco, la vue Conversions

## Déploiement

Autorisé pour la correction du code. **Aucune republication de créative.**

## Interdits

- Ne touche jamais à ` fb-ads-saas` (`srv-d7139du3jp1c7390flq0`)
- Aucune modification de budget, de ciblage ou de statut
- Aucune valeur de secret

## Ton rapport

Format D-013, référence `CODE-043`.
Si le hub refuse la publication, pousse sur `code-043-rapport`.

PREUVES : l'endroit exact où le texte était coupé, le texte complet des deux
publicités actives, et ce qu'il faudrait republier pour corriger l'existant.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-043
```

ou

```
MISSION NON TERMINÉE — CODE-043
```

— Pilote, facebook-ads
