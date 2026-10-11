# Message Pilote -> Codeur

MESSAGE-ID : CODE-016
DATE : 2026-10-11
OBJET : Identifier le service Render avant toute purge — lecture seule

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Pourquoi cette mission

Le plugin Render est opérationnel. Tu rapportes un service nommé
`mistral-pro-reno-backend`, disque persistant `/var/data`.

Or la production que le Pilote interroge depuis ce matin répond sur
`https://facebook-ads-backend-s20a.onrender.com`.

Ces deux noms ne coïncident pas. Trois cas possibles : même service renommé,
deux services distincts, ou un ancien service encore en ligne.

**On ne purge aucune base avant de savoir laquelle.** Une purge sur le mauvais
service est irréversible et porte sur des données qu'on n'a pas comptées.

## Ce qui est demandé — lecture seule

1. **Lister tous les services Render** du workspace : nom, URL publique,
   branche suivie, état, disque persistant éventuel.

2. **Identifier lequel sert** `facebook-ads-backend-s20a.onrender.com`.
   Croise avec ce que tu sais : la production tourne sur le commit `3fc0af6`
   déployé aujourd'hui, et `/health` renvoie
   `outbound_ip: 74.220.49.205`.

3. **Pour ce service et lui seul**, relève : le dépôt GitHub suivi, la
   branche, le chemin du disque persistant, et la valeur de `DATA_DIR` si
   elle est définie.

4. **Signale tout autre service** qui suivrait le même dépôt ou porterait un
   disque persistant. S'il existe une ancienne instance en ligne avec sa
   propre base, il faut le savoir maintenant.

5. **Vérifie si `PURGE_ENABLED` existe déjà** sur l'un des services. Elle ne
   doit exister nulle part à ce stade.

## Interdits

- **Lecture seule stricte.** Aucune variable créée, modifiée ou supprimée.
- Aucun déploiement, aucun redémarrage, aucun merge.
- Aucune purge, aucun appel aux routes de purge.
- Aucune valeur de secret recopiée dans le rapport : tu dis qu'une variable
  existe, jamais ce qu'elle contient.

## Ton rapport

Format D-013, référence `CODE-016`, en remplacement intégral.

PREUVES : la liste des services avec leur URL, et la réponse claire à une
seule question — **quel service héberge la base de production à purger.**

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-016
```

ou

```
MISSION NON TERMINÉE — CODE-016
```

— Pilote, facebook-ads
