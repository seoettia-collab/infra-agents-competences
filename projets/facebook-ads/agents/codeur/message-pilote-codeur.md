# Message Pilote -> Codeur

MESSAGE-ID : CODE-011
DATE : 2026-10-11
OBJET : Vérifier les appels cassés et les routes dangereuses — constat, pas correction

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Sur CODE-010

Travail propre : transaction atomique, rollback testé, hors-périmètre vérifié,
66 tests verts. Ta correction sur le nombre de tests est juste — 62, pas 63,
l'écart venait de moi. La purge attend l'ordre du Gérant, elle n'est pas
exécutée.

## Pourquoi cette mission maintenant

Les inventaires et le diagnostic viennent d'être faits. La matière est fraîche.
Dans deux semaines, plus personne ne saura de quoi on parle. On tranche
maintenant ce qui peut l'être.

**Cette mission ne corrige rien.** Elle établit des faits.

## Partie A — les dix appels sans route correspondante

Le diagnostic a relevé dix appels du dashboard vers des chemins absents de
l'inventaire backend. Liste de départ, dans `INVENTAIRE-FRONTEND.md` : photos
Messenger, image de l'éditeur, renommage de lead, vidage du cache, et les
autres marqués `non`.

Pour **chacun**, établis :

| Appel frontend | Route backend réellement existante ? | Verdict | Conséquence à l'écran |
|---|---|---|---|

- **Route réellement existante** : cherche un alias, un préfixe monté
  différemment dans `server.js`, un routeur monté sur un autre chemin. Un
  appel peut fonctionner sans que l'inventaire l'ait vu.
- **Verdict** : `fonctionne` / `cassé` / `à vérifier`.
- **Conséquence à l'écran** : ce que l'utilisateur constate — bouton sans
  effet, image qui ne s'affiche pas, erreur silencieuse. Une ligne.

C'est le point le plus utile de la mission : il dira ce qui est réellement
mort à l'écran.

## Partie B — les deux routes GET destructrices

`GET /api/ai/publish/delete-campaign` et l'autre route `GET` de suppression
relevée par le diagnostic, celle qui vise toutes les campagnes avec une
exception.

Établis pour chacune :
- son chemin exact et ce qu'elle supprime précisément
- si elle exige une authentification
- si elle demande une confirmation
- si un lien visité dans un navigateur suffit à la déclencher
- si une route équivalente et sûre existe déjà

**Ne les supprime pas.** Décris-les.

## Partie C — les 60 routes sans appel

Ne conclus pas qu'elles sont mortes. Vérifie seulement **où ailleurs** elles
pourraient être appelées : webhook entrant, tâche planifiée, appel entre
services, script, outil externe.

Donne trois nombres : appelées ailleurs, jamais appelées nulle part,
indéterminées. Avec la liste pour chaque catégorie.

## Interdits

- **Aucune correction, aucune suppression, aucune modification.** Lecture
  seule des deux dépôts.
- Aucun déploiement, aucun merge, aucune branche de code.
- Aucun appel à l'API Meta, aucune suppression de campagne — y compris pour
  « tester » les routes de la partie B. Tu les lis, tu ne les déclenches pas.
- Aucune clé, aucun identifiant dans le rapport.

## Où écrire

Crée dans le hub :

```
projets/facebook-ads/documentation/VERIFICATION-APPELS.md
```

Une section par partie. Ne touche à aucun autre fichier.

## Protocole

Pré-vol anti-cache. Push sur le hub uniquement, après rebase.

## Ton rapport

Format D-013, référence `CODE-011`, en remplacement intégral.
Dans les PREUVES : nombre d'appels cassés confirmés, nombre réparables par
simple correction de chemin, les trois nombres de la partie C.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-011
```

ou

```
MISSION NON TERMINÉE — CODE-011
```

— Pilote, facebook-ads
