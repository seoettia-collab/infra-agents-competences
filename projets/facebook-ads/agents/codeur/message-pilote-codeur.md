# Message Pilote -> Codeur

MESSAGE-ID : CODE-000
DATE : 2026-10-11
OBJET : Test de route — vérification de la chaîne, pas du talent

---

## Avant tout

Lis ta fiche : `projets/facebook-ads/agents/codeur/fiche-codeur.md`
Puis la gouvernance : `projets/facebook-ads/gouvernance/gouvernance-projet.md`

Tu es le Codeur du projet facebook-ads. Gouvernance v2 depuis le 11/10/2026.
Cette mission est ta première. Elle ne sert pas à produire du code utile :
elle vérifie que tu respectes le protocole de bout en bout.

## Ce qui est demandé

Dépôt : `seoettia-collab/facebook-ads-backend`
Commit de base : `873e3679122c27362323cd40d9d80c207e2dd7df` (branche `main`)

1. **Pré-vol** : `git fetch -q origin && git reset -q --hard origin/main`.
   Cite le HEAD que tu lis réellement.
2. Crée la branche **`test-route/CODE-000`** depuis ce commit de base.
3. Ajoute le fichier **`tests/route-check.test.js`** : un seul test trivial,
   sans dépendance, sans accès réseau, sans accès base. Un `assert` qui passe.
4. Lance la suite complète sous **Node 20.11.1** :
   `node --test tests/*.test.js` (glob explicite).
   Il y a actuellement deux fichiers de test dans `tests/`. Donne le nombre de
   tests exécutés et le nombre de réussites.
5. `node --check` sur le fichier ajouté.
6. Commit, puis `fetch` → `rebase origin/main` → push **de la branche
   `test-route/CODE-000` uniquement**.

## Interdits sur cette mission

- **Ne fusionne pas vers `main`.** La branche reste seule.
- **Ne déploie rien.**
- Ne modifie **aucun** fichier existant. Tu ajoutes un fichier, c'est tout.
- Ne touche pas à la branche `saas`.
- Aucun secret nulle part, y compris dans le rapport.

Si quelque chose t'empêche d'avancer, **arrête-toi et dis-le dans ton rapport**.
Un blocage signalé vaut mieux qu'un contournement.

## Ton rapport

Dans `projets/facebook-ads/agents/codeur/message-codeur-pilote.md`,
en **remplacement intégral** du fichier. Court, numéroté :

1. HEAD du hub lu au pré-vol
2. Commit de base du backend
3. Nom de la branche créée
4. Résultat des tests : exécutés / réussis / échoués
5. Hash du commit poussé
6. Confirmation que `main` n'a pas bougé
7. Ce qui n'a pas pu être fait, et pourquoi

## Ta réponse à l'écran

Un bloc, rien d'autre :

```
MISSION TERMINÉE — CODE-000
```

ou

```
MISSION NON TERMINÉE — CODE-000
```

Pas de résumé, pas de liste, pas de hash à l'écran. Tout le détail est dans
ton fichier de sortie.

— Pilote, facebook-ads
