# Message Pilote -> Codeur

MESSAGE-ID : CODE-042
DATE : 2026-10-19
OBJET : Changer le formulaire d'une publicité depuis le dashboard

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Sur CODE-041

Validé. Villes affichées depuis la table La Poste, bouton Messenger
conditionnel, double initialisation éliminée. Travail propre.

## Le besoin

Un nouveau formulaire a été créé sur le compte :

```
4714720915406381 — Demande de devis Mistral Pro
```

Il doit remplacer l'ancien sur les publicités :

```
1644308539841274 — Devis Rénovation IDF - v4 Court
```

Dans Gestion Ads, **le bouton existe mais ne propose aucune liste de
formulaires à choisir.** Le Gérant ne peut donc pas faire le changement.

Décision du Gérant : **ça passe par le dashboard, pas par l'agent Meta**,
pour que l'historique des modifications soit conservé dans l'outil.

## Ce qui est demandé

**1. Lister les formulaires réellement disponibles** sur le compte, par
lecture de la Graph API. Pas une liste écrite en dur : les formulaires
changent.

**2. Les proposer au choix** sur la publicité sélectionnée, avec leur nom et
le formulaire actuellement rattaché bien visible.

**3. Appliquer le changement** sur la publicité choisie.

**4. Tracer la modification** : quel formulaire remplacé par quel autre, sur
quelle publicité, à quelle date. C'est la raison pour laquelle le Gérant veut
passer par le dashboard.

## Avertissement à afficher — obligatoire

Changer le formulaire d'une publicité en diffusion **relance sa phase
d'apprentissage** chez Meta.

La publicité « Salle de bain clé en main » produit sept leads en six jours.
Y toucher coûtera plusieurs jours de performance.

Le dashboard doit le dire avant de valider, pas après. Une confirmation
explicite est exigée, comme pour les actions destructrices.

## Ce que tu ne fais pas

- **Tu n'appliques aucun changement de formulaire toi-même.** Tu livres la
  fonction, le Gérant décide quand et sur quelle publicité.
- Aucune création ni suppression de formulaire
- Aucune modification des champs collectés
- Aucune action sur le budget, le ciblage, les statuts

## Ce que tu ne touches pas

- Les garde-fous : HOUSING, D5, mode réduction, protection 72 heures
- L'IA Reco, le Studio Pub, la vue Conversions

## Déploiement

Autorisé. Livraison continue, D-024.

## Interdits

- Ne touche jamais à ` fb-ads-saas` (`srv-d7139du3jp1c7390flq0`)
- Aucune valeur de secret
- Aucune donnée personnelle de lead dans le rapport

## Ton rapport

Format D-013, référence `CODE-042`.
Si le hub refuse la publication, pousse sur `code-042-rapport`.

PREUVES : les formulaires remontés par l'API, où la modification est tracée,
et la confirmation que l'avertissement s'affiche avant validation.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-042
```

ou

```
MISSION NON TERMINÉE — CODE-042
```

— Pilote, facebook-ads
