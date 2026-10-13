# Message Pilote -> Codeur

MESSAGE-ID : CODE-039
DATE : 2026-10-13
OBJET : Supprimer les anciennes conversations et corriger le compteur

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Sur CODE-038

**Arrêt justifié, et décision importante.** Tu as découvert que les 39 fils
contiennent 130 messages dont 98 textes réels, et que c'est le compteur qui
est faux — `message_count` n'est jamais demandé à Graph et vaut 0 par défaut.

Si tu avais exécuté l'ordre, le Gérant perdait 98 messages réels. L'ordre
partait d'une fausse information affichée par son propre dashboard.

C'est exactement pour ça que la mission te demandait de comprendre avant
d'effacer. Bien joué.

## Décision du Gérant — 13/10/2026, en connaissance de cause

Le Gérant connaît ces conversations. Elles datent de juillet à septembre, soit
quatre mois au moins. Son jugement :

> Quatre mois sans réponse, le client est parti. Il vaut mieux tout effacer
> pour ne pas perdre du temps à trier.

**Suppression confirmée, en sachant qu'il y a du contenu réel.**

## Partie A — corriger le compteur *(à faire en premier)*

Le défaut que tu as trouvé doit être corrigé **avant** la suppression, pour
que les prochaines conversations s'affichent correctement.

1. Demande `message_count` à Graph lors de la synchronisation, au lieu de le
   remplacer par 0.
2. Récupère le contenu des messages à la synchronisation, pas seulement les
   entêtes.
3. Distingue à l'écran **« extrait indisponible »** de **« fil vide »** : ce
   ne sont pas la même chose, et c'est la confusion qui a failli coûter 98
   messages.

Tu signales aussi que les pièces jointes sont omises à la lecture. Traite-le
si c'est au même endroit, sinon dis-le et on en fera une mission.

## Partie B — supprimer

Les 39 conversations et leurs 130 messages.

- Comptage avant et après
- Transaction atomique
- **Aucune autre table** : leads, SMS, publications, analyses, métriques,
  configuration, contexte métier

## Partie C — empêcher le retour

Limite la synchronisation aux conversations **à partir du 13/10/2026**. Rien
d'antérieur ne doit être rechargé.

**La synchronisation reste active.** Le Gérant reçoit de vraies demandes de
devis par Messenger.

## Partie D — vérifier le canal

Après correction, confirme qu'une nouvelle conversation arriverait avec son
contenu et son compteur justes. Si tu ne peux pas le prouver sans message
réel, dis-le : le Gérant testera lui-même.

## Interdits

- Ne touche jamais à ` fb-ads-saas` (`srv-d7139du3jp1c7390flq0`)
- Aucune suppression hors de ces 39 conversations
- Aucune action côté Meta : la boîte de réception de la Page n'est pas touchée
- Aucune donnée personnelle dans le rapport : des nombres

## Déploiement

Autorisé. Livraison continue, D-024.

## Ton rapport

Format D-013, référence `CODE-039`.
Si le hub refuse la publication, pousse sur `code-039-rapport`.

PREUVES : comptages avant et après, correction du compteur vérifiée, état du
canal.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-039
```

ou

```
MISSION NON TERMINÉE — CODE-039
```

— Pilote, facebook-ads
