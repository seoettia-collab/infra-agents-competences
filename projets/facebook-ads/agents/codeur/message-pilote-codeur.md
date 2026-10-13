# Message Pilote -> Codeur

MESSAGE-ID : CODE-038
DATE : 2026-10-13
OBJET : Effacer les conversations vides et empêcher leur retour

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Sur CODE-037

Validé. Liste lisible, vérifiée à 300 px, tri préservé. Tu as su mesurer
cette fois — c'est ce qui manquait en CODE-034.

## Le constat

Le Gérant a ouvert la vue. Les 39 conversations affichent toutes
**« 0 messages »** et **« Message indisponible »**.

Ce sont des coquilles : la conversation existe en base, son contenu non.
Soit il n'a jamais été récupéré, soit il a été perdu lors d'une purge.

Conséquence à noter : **le classement de CODE-036 ne vaut rien.** L'IA a
classé 36 Demandes et 3 Démarchages sans avoir aucun texte à lire. Ce
résultat est à écarter, pas à conserver comme référence.

## Décision du Gérant — 13/10/2026

**Effacer les 39 conversations vides.** Sans contenu, elles n'ont aucune
valeur.

## Partie A — comprendre d'abord *(ne saute pas cette étape)*

Avant d'effacer, établis **pourquoi** le contenu manque :

- Les messages ont-ils jamais été enregistrés, ou ont-ils été supprimés ?
- La synchronisation récupère-t-elle le contenu, ou seulement l'entête de
  conversation ?
- Est-ce un effet de la purge du matin, ou un défaut antérieur ?

**C'est le point le plus important de la mission.** Si la synchronisation ne
récupère jamais le contenu, effacer ne sert à rien : les prochaines
conversations seront vides elles aussi, et le Gérant perdra de vraies
demandes de devis.

Rapporte ta conclusion avant de passer à la suite.

## Partie B — effacer

Supprime définitivement les 39 conversations et leurs enregistrements liés.

- Comptage avant et après
- Transaction atomique
- **Ne touche à aucune autre table** : leads, SMS, publications, analyses,
  métriques, configuration

## Partie C — empêcher le retour

Elles sont déjà revenues deux fois après suppression : la synchronisation les
recharge.

Limite la synchronisation aux conversations **à partir d'aujourd'hui**. Rien
d'antérieur au 13/10/2026 ne doit être rechargé.

**La synchronisation reste active pour la suite.** Le Gérant reçoit de vraies
demandes de devis par Messenger — c'est un canal qu'on ne coupe pas.

## Partie D — vérifier que le canal fonctionne

Après correction, confirme que le dispositif est capable de recevoir une
nouvelle conversation **avec son contenu**. Si tu ne peux pas le prouver sans
message réel, dis-le : le Gérant testera.

## Interdits

- Ne touche jamais à ` fb-ads-saas` (`srv-d7139du3jp1c7390flq0`)
- Aucune suppression hors des conversations vides
- Aucune donnée personnelle dans le rapport : des nombres
- Aucune action côté Meta : on ne touche pas à la boîte de réception de la Page

## Déploiement

Autorisé. Livraison continue, D-024.

## Ton rapport

Format D-013, référence `CODE-038`.
Si le hub refuse la publication, pousse sur `code-038-rapport`.

PREUVES : la cause du contenu manquant, les comptages avant et après, et
l'état du canal après correction.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-038
```

ou

```
MISSION NON TERMINÉE — CODE-038
```

— Pilote, facebook-ads
