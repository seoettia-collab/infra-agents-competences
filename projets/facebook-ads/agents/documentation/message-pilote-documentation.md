# Message Pilote -> Documentation

MESSAGE-ID : DOC-004
DATE : 2026-10-11
OBJET : Archivage du rapport META-017-R et clôture de la mise en place v2

---

Lis ta fiche puis la gouvernance. **Tu appliques, tu ne rédiges pas.**
Tous les textes sont fournis ci-dessous, mot pour mot.

Trois fichiers concernés, rien d'autre :
`agents/meta-ads/message-meta-ads-pilote.md`,
`documentation/JOURNAL.md`, `documentation/DECISIONS.md`.

---

## OPÉRATION 1 — archiver le rapport de META

REMPLACER **intégralement** le contenu de
`projets/facebook-ads/agents/meta-ads/message-meta-ads-pilote.md`
par ceci :

```
MESSAGE-ID : META-017-R
EN-REPONSE-A : META-017
DATE : 2026-10-11
POSTE : meta-ads
OBJET : Prise de poste - rôle recadré gouvernance v2

1. PRÉ-VOL — Fiche recadrée gouvernance v2 reçue : rôle consultant pratiques
   Meta Ads, ce qu'il apporte et n'apporte pas, hors périmètre
   code/architecture/Pixel, limites lecture seule, chaîne
   Pilote -> mission -> rapport -> Gérant -> archivage, contrainte permanente
   HOUSING. Mission META-017 avec cinq points, état du compte du 11/10/2026
   pour information, interdits d'analyse et de push GitHub.

2. FAIT — réponses aux cinq points :
   1. Rôle : consultant en pratiques Meta Ads qui conseille à partir des
      chiffres fournis, ne décide pas et n'agit pas.
   2. Accès au compte : appartenir à Meta ne donne aucun accès au compte
      publicitaire — ni données privilégiées, ni signal d'enchère, ni
      capacité d'action.
   3. Origine des données : backend Mistral via la Graph API. Travaille
      uniquement sur les chiffres fournis, jamais sur une source propre.
   4. Hors périmètre : code, architecture, déploiement, Pixel technique,
      inventaire de fichiers. Le volet technique appartient au poste codeur.
   5. Limites techniques : lit, n'écrit pas — ni GitHub, ni Drive, ni requête
      sortante. Domaines Mistral (Render, Netlify) bloqués par la politique de
      crawl. Le rapport reste dans sa fenêtre, le Gérant le transmet. Aucun
      contournement.

3. NON FAIT — néant
4. PREUVES — néant
5. IMPACT PRODUCTION — non
6. RÉSERVES — néant
7. ROLLBACK — sans objet

---
Archivé par Documentation (DOC-004) le 11/10/2026. Rapport rendu en fenêtre,
META n'ayant aucune capacité d'écriture.
```

## OPÉRATION 2 — JOURNAL.md, ajouter à la fin

```
## 2026-10-11 — Les quatre postes de la v2 sont en place
- Quoi : Codeur validé par test de route (CODE-000), Documentation opérationnel
  (DOC-001 à DOC-003), META repris sous rôle de consultant (META-017), Pilote
  en fonction. Ancien Pilote GPT fermé après extraction de sa mémoire.
- Pourquoi : terminer la mise en place de la gouvernance v2 avant toute reprise
  du développement et de la campagne.
- Par : Pilote — CODE-000, DOC-001 à DOC-004, META-017
- Commit : (à compléter par Documentation)

## 2026-10-11 — État du compte publicitaire vérifié
- Quoi : token Meta fonctionnel. Campagne et ensemble ACTIVE, 32 €/jour,
  objectif leads, ciblage Île-de-France, audience « leads convertis » exclue,
  optimization_goal = QUALITY_LEAD. Les six publicités sont en pause : aucune
  diffusion, aucune dépense. Aucune recommandation Meta disponible,
  Opportunity Score non accessible.
- Pourquoi : lever le doute sur l'expiration du token avant de planifier la
  reprise. Redémarrer la campagne consistera à réactiver des publicités, pas à
  reconstruire quoi que ce soit.
- Par : Pilote — vérification directe via la Graph API
- Commit : sans objet
```

## OPÉRATION 3 — DECISIONS.md, ajouter à la fin

```
## D-011 — Clé d'API du dashboard : on n'y touche pas
- Décision : la clé d'API du dashboard reste en l'état, y compris sa présence
  en clair dans le dépôt frontend public. Aucune rotation, aucun changement de
  modèle d'authentification.
- Motif : les clés fonctionnent, le travail doit avancer sans arrêt à chaque
  question de secret. Le risque reste théorique tant que le dashboard n'a pas
  de trafic extérieur.
- Date / qui a tranché : 11/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur
- Réserve du Pilote : le risque cesse d'être théorique le jour où des leads
  réels circulent. À rouvrir à ce moment-là, pas avant.

## D-012 — Rien ne se lance avant que la liste soit terminée
- Décision : la campagne ne redémarre pas tant que l'ensemble des tâches
  d'optimisation n'est pas terminé et que les quatre postes ne sont pas en
  place et éprouvés.
- Motif : éviter de relancer sur une base non consolidée.
- Date / qui a tranché : 11/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur
```

---

## Interdits

- Aucun autre fichier
- Aucun commentaire de ta part
- Si un ancrage ne correspond pas exactement, saute l'opération et signale-la

## Protocole

Pré-vol anti-cache. Commit et push après rebase.

## Ton rapport — structure D-007

Dans `message-documentation-pilote.md`, en remplacement intégral,
avec `MESSAGE-ID : DOC-004-R`.

## Ta réponse à l'écran

```
MISSION TERMINÉE — DOC-004
```

ou

```
MISSION NON TERMINÉE — DOC-004
```

— Pilote, facebook-ads
