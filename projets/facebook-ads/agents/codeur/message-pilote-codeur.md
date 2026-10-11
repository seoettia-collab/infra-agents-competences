# Message Pilote -> Codeur

MESSAGE-ID : CODE-012
DATE : 2026-10-11
OBJET : Trois corrections avant relance de campagne — avec déploiement

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Sur CODE-011

Résultat utile : 8 des 10 appels supposés cassés fonctionnent en réalité.
C'est l'inventaire qui reconstruisait mal les chemins. Deux vrais défauts
restent, plus le sujet des GET destructrices. C'est ce qu'on corrige ici.

## Contexte

Le Gérant va relancer la campagne. Avant cela, il veut créer un lead de test
pour vérifier SMS entrant, SMS sortant et appel. La correction n°2 est donc la
plus importante de cette mission : sans elle, il ne peut pas tester.

## Ce qui est demandé

Dépôt : `seoettia-collab/facebook-ads-backend` et/ou
`seoettia-collab/facebook-ads-frontend` selon la correction.
Commits de base : backend `873e367`, frontend `7975a80`.
Branche de travail : `code-012-corrections`, une par dépôt touché.

**Correction 1 — renommage de lead**
L'appel frontend utilise un mauvais préfixe et échoue à l'écran. Corrige le
chemin du côté où c'est juste — à toi de déterminer lequel des deux porte
l'erreur. Ne crée pas d'alias côté backend pour masquer le problème : corrige
la source.

**Correction 2 — création de lead de test** *(priorité)*
La réponse renvoyée est incompatible avec ce que le frontend affiche. Aligne
les deux. Après correction, créer un lead de test depuis le dashboard doit
fonctionner de bout en bout et le lead doit apparaître dans la liste.

**Correction 3 — les deux GET destructrices**
Elles sont protégées par l'authentification globale mais n'exigent aucune
confirmation métier, et l'une supprime en masse avec une exception codée en
dur.

- Ajoute une confirmation explicite obligatoire sur les deux.
- Sors l'exception codée en dur du code : elle devient un paramètre de la
  requête, pas une valeur écrite en dur.
- **Ne supprime pas ces routes** — elles ne sont appelées par personne, mais
  on ne retire rien tant que les 24 destinations indéterminées de CODE-011 ne
  sont pas levées.

## Tests obligatoires

Sous Node 20.11.1 :
1. Le renommage fonctionne de bout en bout.
2. La création de lead de test fonctionne et le lead s'affiche.
3. Les deux GET refusent sans confirmation, acceptent avec.
4. Suite existante verte — 62 tests avant tes ajouts.

## Déploiement — en deux temps

**Temps 1, maintenant** : tu livres la ou les branches testées, et tu
t'arrêtes. Tu réponds `MISSION TERMINÉE — CODE-012`.

**Temps 2, sur ordre du Gérant uniquement** : il écrira `DÉPLOIE CODE-012`.
Alors seulement tu fusionnes vers `main` et tu laisses Render et Netlify
déployer. Tu vérifies ensuite que `/health` répond et que les trois
corrections fonctionnent en production, puis tu complètes ton rapport.

**Sans cet ordre écrit, aucun merge, aucun déploiement.** La règle n'a pas
changé.

## Interdits

- Aucune purge de données — CODE-010 attend son propre ordre
- Aucune suppression de route
- Aucun appel destructif à l'API Meta
- Aucune clé, aucun identifiant dans le code ou le rapport
- Ne touche à rien d'autre que les trois corrections

## Protocole

Pré-vol anti-cache. Branche isolée, `node --check`, tests, push de la branche.

## Ton rapport

Format D-013, référence `CODE-012`, en remplacement intégral.
PREUVES : branche et hash par dépôt, résultat des quatre tests, et le fichier
exact corrigé pour chaque correction.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-012
```

ou

```
MISSION NON TERMINÉE — CODE-012
```

— Pilote, facebook-ads
