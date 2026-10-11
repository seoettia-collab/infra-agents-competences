# Message Pilote -> Codeur

MESSAGE-ID : CODE-019
DATE : 2026-10-11
OBJET : Audit des variables d'environnement Render — lecture seule

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Sur CODE-018

Six points sur sept, propre. La variable `PURGE_ENABLED` reste orpheline : le
connecteur ne sait pas supprimer une variable isolée. Ce point entre dans la
présente mission.

## Pourquoi cette mission

Le Gérant ne sait plus ce qui traîne sur ses services Render. Le Pilote a
relevé 53 variables utilisées par le code du backend, mais **aucun moyen de
voir celles réellement présentes** sur les services : le connecteur Render
expose l'écriture, pas la lecture de la liste.

Toi tu as accès au tableau de bord Render. Fais l'inventaire.

## Périmètre — quatre services, workspace `tea-d4qdtsali9vc739s5000`

| Service | ID | Rôle |
|---|---|---|
| `mistral-pro-reno-backend` | `srv-d6cq3hi4d50c73aa1rkg` | Dashboard Facebook Ads — production |
| ` fb-ads-saas` | `srv-d7139du3jp1c7390flq0` | SaaS gelé, branche `saas` |
| `mistralpro-reno-backend` | `srv-d6mjepa4d50c73cubleg` | Backend du site vitrine `mistralpro-reno.fr` |
| `mistral-devis` | `srv-d8jgvr77f7vs73bed3vg` | Logiciel Mistral Devis |

## Ce qui est demandé

Pour **chaque service**, un tableau :

| Variable | Utilisée par le code ? | Verdict | Remarque |
|---|---|---|---|

- **Utilisée par le code ?** : compare avec les `process.env.` du dépôt que
  le service déploie, hors `node_modules`.
- **Verdict** : `utilisée` / `orpheline` / `doublon` / `manquante`.
- **`manquante`** : le code la lit mais elle n'existe pas sur le service.
  C'est le cas le plus grave — une fonction qui échoue en silence.

**N'écris jamais la valeur d'une variable.** Son nom, son verdict, rien
d'autre. Si une valeur te paraît être un secret exposé au mauvais endroit,
dis-le sans la recopier.

## Pistes déjà relevées par le Pilote, à confirmer ou infirmer

- `PURGE_ENABLED` — orpheline certaine sur le service de production
- `CODE_BOT_TOKEN` — aucune trace dans le code
- `ETHEREAL_API`, `ETHEREAL_API_KEY`, `ETHEREAL_CACHE`, `ETHEREAL_WEB` —
  aucune trace
- `RUNWAY_API_SECRET` et `RUNWAYML_API_SECRET` — deux noms, probablement le
  même usage
- `PURGE_CONFIRMATION` — lue une fois, vérifier si elle sert encore

Ces pistes viennent d'une lecture du code seul. Elles peuvent être fausses.

## Question annexe — renommage

Le Gérant veut renommer les services pour lever la confusion :

- `mistral-pro-reno-backend` → `facebook-ads-backend`
- ` fb-ads-saas` → `facebook-ads-saas` *(son nom commence par une espace)*
- `mistralpro-reno-backend` → `site-vitrine-backend`

**Vérifie uniquement, ne renomme rien** : renommer un service change-t-il son
URL `onrender.com` ? Si oui, quels services ont un domaine personnalisé qui
les protégerait de la rupture ?

C'est bloquant : l'URL `facebook-ads-backend-s20a.onrender.com` est câblée
dans le frontend et chez Meta.

## Interdits

- **Lecture seule stricte** : aucune variable créée, modifiée ou supprimée,
  aucun renommage, aucun déploiement, aucun redémarrage
- Aucune valeur de variable dans le rapport
- Ne touche à aucun service hors de la liste ci-dessus

## Où écrire

```
projets/facebook-ads/documentation/AUDIT-VARIABLES-RENDER.md
```

Une section par service.

## Ton rapport

Format D-013, référence `CODE-019`, en remplacement intégral.
PREUVES : par service, le nombre de variables présentes, orphelines,
manquantes. Plus la réponse sur le renommage.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-019
```

ou

```
MISSION NON TERMINÉE — CODE-019
```

— Pilote, facebook-ads
