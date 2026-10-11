# Message Pilote -> Codeur

MESSAGE-ID : CODE-015
DATE : 2026-10-11
OBJET : Purge par route temporaire — pose, exécution, retrait

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Sur CODE-014

Arrêt justifié. Ma mission supposait un accès shell à Render que tu n'as pas.
La base est sur le disque persistant du service : seul le backend lui-même
peut l'atteindre.

Tu as eu raison de t'arrêter plutôt que de chercher un contournement.

## Le principe retenu

Puisque seul le backend peut atteindre la base, c'est lui qui exécute. On pose
une **route temporaire**, on s'en sert, on la retire.

C'est l'opération la plus dangereuse de la journée : une route de purge
exposée sur Internet. Elle doit être verrouillée, et sa durée de vie se compte
en minutes.

## Étape 1 — poser la route

Branche : `code-015-purge-route`, depuis `origin/main`.

Deux routes temporaires, dans un fichier séparé — jamais dans un routeur
existant :

- une qui **compte** et ne modifie rien
- une qui **purge**, en réutilisant le script de `code-010-purge-leads` rebasé
  (HEAD `7eab6ae`), déjà testé 70/70

Verrous obligatoires, tous cumulatifs :

1. Méthode `POST` uniquement. Jamais `GET` : un lien visité ne doit rien
   pouvoir déclencher.
2. Authentification `x-api-key` habituelle.
3. Confirmation exacte `PURGE-TOTALE-11-10-2026` dans le corps de la requête.
4. **Interrupteur par variable d'environnement** : si `PURGE_ENABLED` n'est
   pas à `true`, les deux routes répondent 404 comme si elles n'existaient pas.
5. Le montage du fichier de routes est lui-même conditionné à cette variable.

Tests sous Node 20.11.1 : sans l'interrupteur → 404 ; avec l'interrupteur mais
sans confirmation → refus ; avec les deux → exécution. Suite complète verte.

Puis push de la branche, et **arrête-toi**. Rapporte avec le nom de la
variable à activer.

## Étape 2 — sur ordre écrit du Gérant uniquement

Il écrira `EXÉCUTE LA PURGE`. Alors, dans cet ordre :

1. Merge vers `main`, déploiement, `PURGE_ENABLED=true` activée sur Render
2. Appel de la route de comptage — **consigne les huit chiffres**
3. Appel de la route de purge avec la confirmation
4. Appel de la route de comptage — les tables visées à zéro
5. Vérification que campagnes, contexte métier, configuration et journaux sont
   intacts
6. Dashboard : liste des leads vide, sans erreur à l'écran

## Étape 3 — retrait immédiat, sans attendre d'ordre

Dès la purge vérifiée :

1. `PURGE_ENABLED` repassée à `false` ou supprimée
2. Suppression du fichier de routes temporaire, merge, déploiement
3. Vérification que les deux routes répondent 404

**La route ne survit pas à la session.** C'est la condition pour qu'elle
existe.

## Interdits

- Aucune suppression côté Facebook : les leads restent chez Meta
- Aucune table hors périmètre
- Aucune donnée personnelle dans les logs ni le rapport : des nombres
- Jamais de `GET` sur ces routes
- Si une étape échoue : arrêt, rapport, aucune réparation dans l'urgence

## Ton rapport

Format D-013, référence `CODE-015`, en remplacement intégral.
Après l'étape 1 : nom de la variable, hash de branche, résultat des tests.
Après les étapes 2 et 3 : les chiffres avant et après, et la confirmation que
les routes sont retirées et répondent 404.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-015
```

ou

```
MISSION NON TERMINÉE — CODE-015
```

— Pilote, facebook-ads
