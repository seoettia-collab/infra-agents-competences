# Message Pilote -> Codeur

MESSAGE-ID : CODE-032
DATE : 2026-10-13
OBJET : Refonte ergonomique de l'IA Reco — maquette validée

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Maquette validée par le Gérant

```
projets/facebook-ads/documentation/maquettes/maquette-ia-reco.html
```

Ouvre-la. Elle est autonome, lisible dans un navigateur, et reprend les
variables de couleur existantes de `css/variables.css`. **Aucune nouvelle
identité visuelle à inventer.**

## Pourquoi cette refonte

L'écran actuel se lit de haut en bas comme un rapport. Le Gérant veut décider
en un coup d'œil.

> « Il y a une décision à prendre : mettre en pause, relancer, éliminer. Les
> infos doivent être réactives tout de suite, en un clin d'œil. »

Et sur le rôle de l'IA, décision D-023 : **elle juge, le Gérant valide.** Elle
ne présente pas des informations à interpréter, elle propose une action.

## Ce qui change — six points

**1. Les actions passent en tête.** Le plan d'action occupe la colonne
principale, en haut. Une ligne par action : ce qu'il faut faire, puis en
dessous une phrase de motif. Rien d'autre.

**2. Un bouton par action, à droite de la ligne.** Pauser, Relancer,
Supprimer — l'action est exécutable directement. Quand aucune action n'est
possible, le bouton est désactivé avec la mention correspondante.

**3. Un bouton Ignorer.** Obligatoire. Sans lui, une recommandation refusée
revient à chaque analyse. Une action ignorée ne réapparaît pas pour la même
publicité tant que la situation n'a pas changé. Réutilise le système Ignore
existant côté frontend s'il convient.

**4. Le détail sous un chevron.** Replié par défaut. Dépliable d'un clic, il
contient : le pourquoi développé, la source — performance, audit ou les deux —
et l'impact attendu. **Ces champs disparaissent de la vue principale.**

**5. Tout le reste passe à droite, replié.** Chiffres, points forts, points à
surveiller, bloc « Vu par Meta ». Fermés par défaut, sauf les chiffres.
En dessous de 980 px de large, la colonne de droite passe sous la principale.

**6. Les actions irréversibles en rouge, avec confirmation.** Supprimer une
publicité, modifier un budget : confirmation obligatoire. Pauser et relancer
sont réversibles, un seul clic suffit.

## Deux points de cohérence à respecter

- Le bloc **« Vu par Meta »** est l'emplacement prévu pour CODE-031. Si
  CODE-031 n'est pas encore déployé, laisse le bloc avec « Meta ne signale
  rien à ce jour ».
- Les métriques absentes s'affichent en tiret, jamais en zéro — acquis de
  CODE-030, à ne pas défaire.

## Ce que tu ne touches pas

- Le moteur IA, les prompts, les règles métier
- Les garde-fous : mode réduction, HOUSING, D5, protection 72 heures,
  exclusion des pubs en pause
- Le Studio Pub, le Rédacteur IA, les autres vues du dashboard

## Vérification attendue

Après déploiement, ouvre la vue et confirme : les actions sont en haut, le
détail est replié, le bouton Ignorer fonctionne, et l'affichage tient sur un
écran étroit.

## Déploiement

Autorisé. Livraison continue, décision D-024 : ce qui est prêt et testé part
le jour même.

## Interdits

- Ne touche jamais à ` fb-ads-saas` (`srv-d7139du3jp1c7390flq0`)
- Aucune action réelle sur les publicités pendant les tests
- Aucune valeur de secret

## Ton rapport

Format D-013, référence `CODE-032`.
Si le hub refuse la publication, pousse sur `code-032-rapport`.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-032
```

ou

```
MISSION NON TERMINÉE — CODE-032
```

— Pilote, facebook-ads
