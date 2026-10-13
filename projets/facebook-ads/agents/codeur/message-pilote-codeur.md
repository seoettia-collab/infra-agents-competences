# Message Pilote -> Codeur

MESSAGE-ID : CODE-037
DATE : 2026-10-13
OBJET : Liste des conversations illisible — les boutons se superposent au texte

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Sur CODE-036

Le tri fonctionne : 36 Demandes, 3 Démarchages, correction humaine prioritaire,
aucune suppression. Le fond est bon.

**L'affichage, lui, est cassé.**

## Le défaut constaté par le Gérant

Dans la liste des conversations de la vue Conversions, chaque ligne superpose :

- le nom du contact
- la date
- les trois boutons de reclassement — Demande, Démarchage, Sans objet
- les icônes d'archivage et de suppression
- la pastille du nombre de messages

Tout se chevauche. Les mots passent les uns sur les autres, rien n'est
lisible. La colonne est trop étroite pour contenir ce qu'on y a mis.

Les onglets À traiter / Écartés / Tout voir fonctionnent bien, eux.

## Ce qui est demandé

**Rends la ligne lisible.** Le principe : une conversation se lit d'abord,
se reclasse ensuite.

Ce qu'il faut voir en permanence sur une ligne :
- le nom du contact
- la date
- le nombre de messages

Ce qui ne doit **pas** encombrer la ligne :
- les trois boutons de reclassement
- les icônes d'archivage et de suppression

Pour le reclassement, choisis la solution la plus simple qui tienne dans la
largeur — un menu au survol, un bouton unique qui ouvre les choix, une action
depuis la conversation ouverte. À toi de voir, mais **plus rien ne doit se
chevaucher**.

## Vérification attendue

Après correction, ouvre la vue et confirme qu'aucun élément n'en recouvre un
autre, à la largeur de colonne actuelle.

Si tu ne peux pas vérifier visuellement, dis-le — comme en CODE-034. Le
Gérant vérifiera.

## Ce que tu ne touches pas

- Le classement lui-même et ses résultats
- Les onglets À traiter / Écartés / Tout voir, qui fonctionnent
- Le reste de la vue Conversions
- L'IA Reco, le Studio Pub

## Déploiement

Autorisé. Livraison continue, D-024.

## Interdits

- Ne touche jamais à ` fb-ads-saas` (`srv-d7139du3jp1c7390flq0`)
- Aucune donnée personnelle dans le rapport
- Aucune suppression de données

## Ton rapport

Format D-013, référence `CODE-037`.
Si le hub refuse la publication, pousse sur `code-037-rapport`.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-037
```

ou

```
MISSION NON TERMINÉE — CODE-037
```

— Pilote, facebook-ads
