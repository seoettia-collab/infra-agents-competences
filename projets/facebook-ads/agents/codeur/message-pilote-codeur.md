# Message Pilote -> Codeur

MESSAGE-ID : CODE-010
DATE : 2026-10-11
OBJET : Purge totale des leads et communications avant relance de campagne

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## ⚠ MISSION DESTRUCTRICE ET IRRÉVERSIBLE

Décision du Gérant du 11/10/2026 : **tout effacer définitivement**, leads et
conversations, sans archivage. Le Pilote a recommandé un archivage préalable,
le Gérant a tranché pour l'effacement total. La décision est prise, elle
s'exécute.

Tu ne discutes pas la décision. Tu l'exécutes proprement.

## État constaté

L'inventaire backend montre qu'**aucune route de purge n'existe** :

- `DELETE /api/facebook/leads/:id` est une suppression locale **réversible**,
  lead par lead, et **conserve les communications associées**.
- `/api/facebook/leads-deleted` et `/restore` permettent la récupération.
- Les suppressions de communications sont unitaires :
  `DELETE /api/comms/outbound/:id`, `/api/comms/inbound/:id`, `/notes/:id`.

Il faut donc écrire l'opération. C'est du code qui touche la base de
production.

## Ce qui est demandé

Dépôt : `seoettia-collab/facebook-ads-backend`
Commit de base : `873e3679122c27362323cd40d9d80c207e2dd7df` (branche `main`)
Branche de travail : `code-010-purge-leads`

**Étape 1 — compter avant.** Écris un script qui compte, sans rien modifier :
leads actifs, leads archivés, leads supprimés localement, communications
entrantes, sortantes, notes, conversations Messenger. Exécute-le et consigne
les chiffres.

**Étape 2 — écrire la purge.** Une opération unique, qui vide définitivement :
- tous les leads, quel que soit leur état — actifs, archivés, supprimés
- toutes les communications entrantes et sortantes
- toutes les notes CRM
- toutes les conversations locales rattachées

Contraintes :
- **Opération atomique** : tout ou rien. Un échec en cours ne doit pas laisser
  la base à moitié vide.
- **Protégée par une confirmation explicite** : la purge ne s'exécute que si
  elle reçoit la chaîne exacte `PURGE-TOTALE-11-10-2026`. Sans elle, elle
  refuse et ne fait rien.
- Ne touche à **aucune autre table** : ni campagnes, ni contexte métier, ni
  configuration, ni journaux applicatifs.
- Aucune donnée personnelle dans les logs : compte les lignes, ne les affiche
  pas.

**Étape 3 — compter après.** Même script qu'à l'étape 1. Les chiffres doivent
être à zéro sur les tables purgées, inchangés partout ailleurs.

## Ce que tu ne fais pas

- **Tu n'exécutes pas la purge en production.** Tu livres le code sur la
  branche, tu la testes sur une base locale de test
  (`DATA_DIR=/tmp/purge-test`), et tu t'arrêtes là.
- Aucun merge vers `main`. Aucun déploiement.
- Aucune suppression côté Facebook : les leads restent chez Meta, on ne vide
  que notre base locale.

L'exécution en production fera l'objet d'une mission séparée, sur ordre
explicite du Gérant.

## Tests obligatoires

Sous Node 20.11.1, sur base de test :
1. La purge sans la chaîne de confirmation refuse et ne modifie rien.
2. La purge avec la chaîne vide bien toutes les tables visées.
3. Les tables hors périmètre sont intactes après la purge.
4. La suite existante reste verte — 63 tests.

## Protocole

Pré-vol anti-cache sur les deux dépôts. Branche isolée, `node --check`,
tests, puis push de la branche uniquement.

## Ton rapport

Format D-013, référence `CODE-010`, en remplacement intégral.
Dans les PREUVES : chiffres avant et après sur la base de test, nom de la
branche, hash du commit, résultat des quatre tests.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-010
```

ou

```
MISSION NON TERMINÉE — CODE-010
```

— Pilote, facebook-ads
