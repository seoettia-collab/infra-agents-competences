# Message Pilote -> Documentation

MESSAGE-ID : DOC-002
DATE : 2026-10-11
OBJET : Dépoussiérage du référentiel — opérations mécaniques

---

Lis ta fiche puis la gouvernance. Rappel de ta règle : **tu appliques, tu ne
rédiges pas.** Tous les textes de remplacement sont fournis ci-dessous, mot pour
mot. N'en invente aucun, n'en reformule aucun.

Les points supprimés du référentiel ne disparaissent pas : ils sont déplacés
dans le journal, avec leur date de résolution. Rien ne se perd.

Fichiers concernés : `projets/facebook-ads/documentation/REFERENTIEL.md` et
`projets/facebook-ads/documentation/JOURNAL.md`. Rien d'autre.

---

## OPÉRATION 1 — REFERENTIEL.md, en-tête

REMPLACER :

```
Version 1.0 — établi le 31/08/2026 par documentation-technique (DOC-001).
```

PAR :

```
Version 1.1 — établi le 31/08/2026, révisé le 11/10/2026 par le Pilote (DOC-002).
Les points résolus ont été déplacés dans JOURNAL.md avec leur date.
```

## OPÉRATION 2 — REFERENTIEL.md, §3, paragraphe d'activité

REMPLACER le paragraphe qui commence par `**Activité : le projet est à l'arrêt`
et va jusqu'à `avant d'ouvrir un chantier.` PAR :

```
**Activité : le projet est à l'arrêt depuis le 1er septembre 2026.** Dernier
commit backend `main` : `873e367` (01/09), frontend `main` : `7975a80` (28/05),
branche `saas` : 12/05. Toute reprise doit commencer par vérifier l'état réel de
la production — token Meta 60 j, passerelle Android, base SQLite — avant
d'ouvrir un chantier.
```

## OPÉRATION 3 — REFERENTIEL.md, §6 Critique, ligne V3

REMPLACER :

```
| V3 | **Documentation interne obsolète** : `docs/ARCHITECTURE.md`, `CHECKLIST.md`, `FICHE_TECHNIQUE.md` arrêtées au 23/04/2026, soit ~2 mois de livraisons non tracées | la CHECKLIST annonce « 99 % » et « aucun bug connu » : ces chiffres ne sont pas fiables et ne doivent pas être cités |
```

PAR :

```
| V3 | **Documentation interne obsolète** : `docs/ARCHITECTURE.md`, `CHECKLIST.md`, `FICHE_TECHNIQUE.md` arrêtées au 23/04/2026. Seul `docs/VOIE_B_DEV-006.md` est récent (01/09/2026) | la CHECKLIST annonce « 99 % » et « aucun bug connu » : ces chiffres ne sont pas fiables et ne doivent pas être cités |
```

## OPÉRATION 4 — REFERENTIEL.md, §6 Élevé, SUPPRIMER la ligne V4

SUPPRIMER entièrement cette ligne du tableau :

```
| V4 | **Aucun test automatisé**, ni unitaire sur `main`, ni E2E sur `saas` | toute régression n'est détectée qu'en production, par l'usage |
```

Ne renumérote pas les autres lignes. V5 à V13 gardent leur numéro.

## OPÉRATION 5 — REFERENTIEL.md, §6 Modéré, SUPPRIMER la ligne V10

SUPPRIMER entièrement cette ligne du tableau :

```
| V10 | `package.json` désaligné (2.8.0) par rapport aux versions annoncées (3.5.x) |
```

Ne renumérote pas les autres lignes.

## OPÉRATION 6 — REFERENTIEL.md, §7, points 2 et 5

REMPLACER :

```
2. Lire les docs internes du dépôt **en sachant qu'elles s'arrêtent au 23/04** —
   le code fait foi au-delà.
```

PAR :

```
2. Lire les docs internes du dépôt **en sachant qu'elles s'arrêtent au 23/04**,
   sauf `docs/VOIE_B_DEV-006.md` (01/09) — le code fait foi au-delà.
```

REMPLACER :

```
5. Seul l'agent `ingenieur-developpeur` écrit du code (règle 9 du socle).
```

PAR :

```
5. Seul le poste `codeur` écrit du code (gouvernance v2 du 11/10/2026).
```

## OPÉRATION 7 — REFERENTIEL.md, §2, ajout en fin de section

AJOUTER, juste avant la ligne `## 3. Ce qui est en cours ou en suspens`, le bloc
suivant :

```
### Livré en septembre 2026

- **Voie B** — relais Drive vers GitHub : route `POST /api/pilote/push-meta-response`,
  lecture seule Drive sur dossier autorisé, écriture sur une cible GitHub en
  liste blanche, protection par `x-pilote-secret`, fermeture par défaut si le
  secret n'est pas configuré. Auditée deux fois avant mise en service.
- **Tests automatisés** — 63 tests sur `main`, tous verts sous Node 20.11.1
  (`tests/meta-recommendations.test.js`, `tests/pilote-drive-proxy.test.js`).

```

## OPÉRATION 8 — JOURNAL.md, ajouter les entrées

AJOUTER à la fin du fichier `JOURNAL.md`, exactement ce bloc :

```
## 2026-10-11 — Dépoussiérage du référentiel
- Quoi : points résolus retirés du référentiel et consignés ici (V4, V10).
  Dates d'activité et rôle du poste codeur corrigés.
- Pourquoi : le référentiel mélangeait le vivant et le réglé ; les missions
  s'écrivent à partir de ce document.
- Par : Pilote + Documentation — DOC-002
- Commit : (à compléter par Documentation)

## 2026-10-11 — Gouvernance v2 : quatre postes
- Quoi : passage de sept postes à quatre — Pilote, Codeur, Documentation, META.
  Six postes retirés et archivés.
- Pourquoi : concentrer la connaissance sur un seul poste et confier
  l'exécution à des postes étroits.
- Par : Gérant + Pilote — décisions D-001 à D-006
- Commit : 2c17187

## 2026-09-01 — V10 résolu : version de package.json alignée
- Quoi : `package.json` du backend est en 3.5.0, conforme aux versions
  annoncées. Le désalignement signalé le 31/08 n'existe plus.
- Pourquoi : constat de vérification, pas une intervention.
- Par : Pilote — DOC-002 (vérifié le 11/10/2026)
- Commit : sans objet

## 2026-09-01 — V4 résolu : tests automatisés en place sur main
- Quoi : 63 tests automatisés sur `main`, tous verts sous Node 20.11.1.
  Le référentiel du 31/08 indiquait « aucun test automatisé ».
- Pourquoi : arrivés avec les lots Voie B et recommandations Meta.
- Par : Pilote — DOC-002 (vérifié le 11/10/2026)
- Commit : 873e367

## 2026-09-01 — Sonde L0 posée puis retirée
- Quoi : sonde de capacité `/probe/l0/…` déployée pour tester si META pouvait
  atteindre notre backend, puis retirée par revert.
- Pourquoi : les domaines Render et Netlify sont bloqués par la politique de
  crawl de META. La sonde était devenue inéprouvable.
- Par : ingenieur-developpeur — DEV-009 à DEV-011
- Commit : a85cafe (pose), 873e367 (retrait)

## 2026-09-01 — Voie B en production
- Quoi : relais Drive vers GitHub livré et mis en service.
- Pourquoi : permettre l'archivage des rapports META sans écriture directe,
  META n'ayant aucune capacité d'écriture.
- Par : ingenieur-developpeur — DEV-006 à DEV-008
- Commit : 7930dd8
```

---

## Interdits sur cette mission

- Ne touche à aucun autre fichier
- Ne renumérote aucune ligne de tableau
- N'ajoute aucun commentaire de ta part dans les fichiers
- Si un texte à remplacer ne se trouve pas **exactement** tel qu'écrit ici,
  **n'improvise pas** : saute l'opération et signale-la dans ton rapport

## Protocole

Pré-vol anti-cache. Commit et push après rebase.

## Ton rapport

Dans `message-documentation-pilote.md`, en remplacement intégral. Numéroté :

1. HEAD du hub lu au pré-vol
2. Opérations appliquées : lesquelles
3. Opérations sautées : lesquelles et pourquoi
4. Hash du commit poussé

## Ta réponse à l'écran

```
MISSION TERMINÉE — DOC-002
```

ou

```
MISSION NON TERMINÉE — DOC-002
```

— Pilote, facebook-ads
