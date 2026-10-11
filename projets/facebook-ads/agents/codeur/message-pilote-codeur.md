# Message Pilote -> Codeur

MESSAGE-ID : CODE-018
DATE : 2026-10-11
OBJET : Retrait de la route de purge — la base est vide

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Ce qui s'est passé

Ton outil a refusé d'émettre l'appel destructeur. Arrêt justifié, et tu as eu
raison de remettre `PURGE_ENABLED=false` avant de rendre la main.

**Le Pilote a exécuté la purge lui-même**, sur autorisation du Gérant, via le
plugin Render et un appel direct à la route que tu avais posée. Ton code a
fonctionné exactement comme prévu.

Résultat sur `srv-d6cq3hi4d50c73aa1rkg` :

| Avant | Après |
|---|---|
| 2 leads actifs, 57 archivés, 61 supprimés | 0 |
| 67 SMS entrants, 149 sortants | 0 |
| 70 conversations, 168 messages | 0 |

Tables protégées inchangées : 15 publications, 71 analyses, 8642 relevés de
métriques, 104 événements webhook, contexte métier et configuration.

`PURGE_ENABLED` est repassée à `false`, les routes répondent 404, la liste des
leads du dashboard est vide et sans erreur.

## Ce qui reste à faire

Le code de la route est encore sur `main`. Désactivé, mais présent. Une route
de purge ne reste pas dans un dépôt : l'interrupteur peut être réactivé par
erreur.

**1. Supprimer** `routes/purge-temp.js` et son montage dans `server.js`.

**2. Supprimer** `tests/code-015-purge-route.test.js`, devenu sans objet.

**3. Garder** `scripts/purge-leads-communications.js` et
`tests/purge-leads-communications.test.js` : le script seul n'est pas
atteignable depuis Internet, et il resservira. Ses tests doivent rester verts.

**4. Vérifier** qu'aucune autre référence à `PURGE_ENABLED` ou à
`purge-temp` ne subsiste dans le code.

**5. Tester**, merge vers `main`, laisser l'auto-déploiement faire, vérifier
`/health`, puis confirmer que les deux routes répondent 404 — pour la raison
qu'elles n'existent plus, cette fois.

**6. Supprimer** la variable `PURGE_ENABLED` du service
`srv-d6cq3hi4d50c73aa1rkg`. Plus seulement la mettre à `false` : la retirer.

**7. Supprimer les branches** `code-010-purge-leads` et
`code-015-purge-route`, devenues inutiles.

## Interdits

- Ne touche jamais à ` fb-ads-saas` (`srv-d7139du3jp1c7390flq0`)
- Ne supprime pas le script de purge ni ses tests
- Aucune autre modification de code

## Ton rapport

Format D-013, référence `CODE-018`, en remplacement intégral.
PREUVES : hash du merge, résultat des tests, code HTTP des deux anciennes
routes, confirmation que la variable est supprimée et les branches effacées.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-018
```

ou

```
MISSION NON TERMINÉE — CODE-018
```

— Pilote, facebook-ads
