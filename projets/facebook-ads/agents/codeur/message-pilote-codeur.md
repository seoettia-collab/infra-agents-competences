# Message Pilote -> Codeur

MESSAGE-ID : CODE-044
DATE : 2026-10-20
OBJET : Studio Pub — aperçu réaliste et numéro de téléphone automatique

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Sur CODE-043

Validé. Tu as trouvé la coupure à 125 caractères dans le module de
publication, reliquat des anciennes limites, et tu l'as supprimée sans rien
republier.

Le Gérant veut **ces deux corrections avant de republier** sa publicité, pour
ne relancer l'apprentissage qu'une seule fois.

## Partie A — aperçu réaliste

Aujourd'hui, le Studio Pub affiche trois champs les uns sous les autres :
titre, texte principal, description. Le Gérant ne voit pas à quoi ressemblera
sa publicité.

> « Sur l'aperçu, nous devons voir le final de la publicité, comment il va
> être sur Facebook. »

Un aperçu de ce type existait avant la simplification de CODE-033 : vignette
de la Page, texte au-dessus, image, bandeau du lien, bouton d'appel à
l'action. Il a disparu.

Attendu : **rétablir un aperçu qui montre la publicité telle qu'un prospect
la verra** — en-tête de la Page avec la mention Sponsorisé, texte principal,
image, puis le bandeau avec le titre, la description et le bouton.

Deux exigences :

- **Vue mobile en priorité.** C'est là que le Gérant juge, et là que les
  prospects voient.
- **Ce qui est tronqué par Facebook doit se voir tronqué dans l'aperçu**,
  avec le « voir plus ». C'est tout l'intérêt : savoir ce qui sera réellement
  lu avant de publier.

## Partie B — le numéro de téléphone ajouté automatiquement

Décision du Gérant : le numéro de l'entreprise doit figurer dans le **texte
principal** de chaque publicité générée, afin d'être cliquable sur mobile.

```
06 09 10 90 69
```

Attendu :

- ajouté automatiquement à la fin du texte principal à chaque génération
- **modifiable et supprimable** par le Gérant dans le champ, comme le reste
- pris dans le contexte métier enregistré, pas écrit en dur dans le code :
  s'il change un jour, il ne doit se changer qu'à un seul endroit
- jamais ajouté deux fois si le Gérant l'a déjà saisi lui-même

## Ce que tu ne fais pas

- **Aucune republication de publicité.** Le Gérant republiera lui-même, avec
  sa nouvelle image, une fois ces deux corrections livrées.
- Tu ne réécris aucun texte publicitaire
- Tu ne remets aucune troncature : acquis de CODE-043 et CODE-033

## Ce que tu ne touches pas

- Les garde-fous : HOUSING, D5, mode réduction, protection 72 heures
- Le choix du formulaire livré en CODE-042
- L'IA Reco, la vue Conversions

## Déploiement

Autorisé pour le code. Aucune action sur le compte publicitaire.

## Interdits

- Ne touche jamais à ` fb-ads-saas` (`srv-d7139du3jp1c7390flq0`)
- Aucune modification de budget, de ciblage ou de statut
- Aucune valeur de secret

## Ton rapport

Format D-013, référence `CODE-044`.
Si le hub refuse la publication, pousse sur `code-044-rapport`.

PREUVES : où le numéro est lu, comment l'aperçu rend la troncature de
Facebook, et confirmation qu'aucune publicité n'a été modifiée.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-044
```

ou

```
MISSION NON TERMINÉE — CODE-044
```

— Pilote, facebook-ads
