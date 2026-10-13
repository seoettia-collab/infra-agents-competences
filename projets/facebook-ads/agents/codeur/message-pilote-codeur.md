# Message Pilote -> Codeur

MESSAGE-ID : CODE-034
DATE : 2026-10-13
OBJET : Refonte ergonomique de l'IA Reco — reprise de CODE-032

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Sur CODE-033

Validé. Imagerie retirée, options visuelles supprimées, six thèmes, prompt
copiable, 138 tests verts. Ton verdict NON est honnête : tu n'as pas pu
confirmer les limites de Meta et tu n'as rien inventé.

**Information pour toi** : l'agent Administration Meta a cherché ces limites
avec un accès direct au compte. Résultat : **40, 125 et 30 caractères sont
des recommandations d'affichage, pas des plafonds techniques.** Tu as eu
raison de retirer les troncatures. Ne les remets pas.

## Pourquoi cette reprise

CODE-032 n'a jamais été exécutée : j'ai déposé CODE-033 dans ta boîte avant
que tu l'aies faite, et elle a été écrasée. Erreur du Pilote, pas la tienne.

La maquette est validée par le Gérant depuis ce matin.

## La maquette

```
projets/facebook-ads/documentation/maquettes/maquette-ia-reco.html
```

Ouvre-la. Autonome, lisible dans un navigateur, reprend les variables de
`css/variables.css`. **Aucune identité visuelle à inventer.**

## Pourquoi

L'écran actuel se lit de haut en bas comme un rapport. Le Gérant veut décider
en un coup d'œil.

> « Il y a une décision à prendre : mettre en pause, relancer, éliminer. Les
> infos doivent être réactives tout de suite, en un clin d'œil. »

Et sur le rôle de l'IA, décision D-023 : **elle juge, le Gérant valide.**

## Ce qui change — six points

**1. Les actions passent en tête.** Le plan d'action occupe la colonne
principale, en haut. Une ligne par action : ce qu'il faut faire, puis une
phrase de motif. Rien d'autre.

**2. Un bouton par action.** Pauser, Relancer, Supprimer, exécutable
directement. Quand aucune action n'est possible, bouton désactivé avec la
mention correspondante.

**3. Un bouton Ignorer.** Obligatoire. Sans lui, une recommandation refusée
revient à chaque analyse. Une action ignorée ne réapparaît pas pour la même
publicité tant que la situation n'a pas changé. Réutilise le système Ignore
existant s'il convient.

**4. Le détail sous un chevron.** Replié par défaut. Dépliable d'un clic :
le pourquoi développé, la source — performance, audit ou les deux — et
l'impact attendu. **Ces champs disparaissent de la vue principale.**

**5. Tout le reste à droite, replié.** Chiffres, points forts, points à
surveiller, bloc « Vu par Meta ». Fermés par défaut sauf les chiffres.
Sous 980 px de large, la colonne droite passe sous la principale.

**6. Actions irréversibles en rouge, avec confirmation.** Supprimer une
publicité, modifier un budget. Pauser et relancer sont réversibles, un clic
suffit.

## Deux points de cohérence

- Le bloc **« Vu par Meta »** existe déjà depuis CODE-031 : conserve-le, place
  simplement son emplacement selon la maquette
- Les métriques absentes s'affichent en tiret, jamais en zéro — acquis de
  CODE-030, à ne pas défaire

## Ce que tu ne touches pas

- Le moteur IA, les prompts, les règles métier
- Les garde-fous : mode réduction, HOUSING, D5, protection 72 heures,
  exclusion des pubs en pause
- Le Studio Pub que tu viens de simplifier, le Rédacteur IA

## Vérification attendue

Après déploiement : les actions sont en haut, le détail replié, le bouton
Ignorer fonctionne, l'affichage tient sur un écran étroit.

## Déploiement

Autorisé. Livraison continue, D-024.

## Interdits

- Ne touche jamais à ` fb-ads-saas` (`srv-d7139du3jp1c7390flq0`)
- Aucune action réelle sur les publicités pendant les tests
- Aucune valeur de secret

## Ton rapport

Format D-013, référence `CODE-034`.
Si le hub refuse la publication, pousse sur `code-034-rapport`.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-034
```

ou

```
MISSION NON TERMINÉE — CODE-034
```

— Pilote, facebook-ads
