# Message Pilote -> Documentation

MESSAGE-ID : DOC-007
DATE : 2026-10-13
OBJET : Consigner les décisions du 12 et 13 octobre

---

Lis ta fiche puis la gouvernance. **Tu recopies, tu ne reformules pas.**

Deux fichiers : `documentation/JOURNAL.md` et `documentation/DECISIONS.md`.

---

## OPÉRATION 1 — JOURNAL.md, ajouter à la fin

```
## 2026-10-12 — Relance de la campagne
- Quoi : deux publicités mises en ligne et en diffusion — « Extension maison
  en IDF » et « Salle de bain clé en main », reliées au formulaire « Devis
  Rénovation IDF - v4 Court ». Les six anciennes restent en pause.
  Budget 32 €/jour, Advantage+ complet, Île-de-France.
- Pourquoi : première campagne depuis l'arrêt du 1er septembre,
  repositionnement sur le gros œuvre.
- Par : Gérant, via le Studio Pub du dashboard

## 2026-10-13 — Le Copilote recommandait de couper ce qui marchait
- Quoi : recommandation urgente de pauser « Salle de bain clé en main » au
  motif de « 42 jours sans lead », alors que la publicité avait été remise en
  ligne la veille et était la plus performante des deux. Les 42 jours
  venaient de l'ancienne version, en pause depuis le 1er septembre.
- Pourquoi : l'ancienneté était calculée sur toute la vie de la publicité,
  pauses comprises.
- Par : constat du Pilote — corrigé par CODE-029

## 2026-10-13 — IA Reco limitée aux publicités en diffusion
- Quoi : les publicités en pause, archivées ou supprimées sont exclues du
  contexte envoyé à l'IA. L'ancienneté se compte depuis la reprise de
  diffusion. Aucune recommandation de pause ni de budget sur une publicité
  diffusant depuis moins de 72 heures.
- Pourquoi : éviter qu'une donnée périmée produise une mauvaise décision.
- Par : codeur — CODE-029
- Commit : backend 359225f, 96 tests verts

## 2026-10-13 — Audit des calculs du Copilote
- Quoi : six défauts démontrés. Les deux principaux : un rapport restauré
  redevient actionnable sans revalidation, et une métrique absente est
  affichée comme zéro.
- Pourquoi : le défaut du 13/10 laissait supposer d'autres calculs fautifs.
- Par : diagnostic — DIAG-002 puis DIAG-003
- Fichier : documentation/DIAGNOSTIC-003.md
```

## OPÉRATION 2 — DECISIONS.md, ajouter à la fin

```
## D-020 — Relance en gros œuvre, Advantage+ complet
- Décision : la campagne est repositionnée sur le gros œuvre — construction,
  extension, surélévation. Deux publicités seulement. Advantage+ complet :
  Meta pilote le ciblage, les placements et la répartition du budget.
- Motif : à 32 €/jour, deux campagnes ou six publicités ne sortiraient jamais
  de la phase d'apprentissage. L'automatisation fait mieux qu'un ciblage
  manuel à ce budget.
- Date / qui a tranché : 12/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur

## D-021 — Répartition des rôles avec Meta
- Décision : Meta pilote Facebook. META conseille le dashboard. Le Gérant
  valide. Le budget, l'optimisation et les publicités se décident dans le
  dashboard.
- Motif : garder la décision à l'intérieur de l'outil plutôt que de la
  déléguer à un conseil extérieur sans accès au compte.
- Date / qui a tranché : 12/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur

## D-022 — L'IA Reco n'analyse que les publicités en diffusion
- Décision : les publicités en pause sont exclues du contexte envoyé à l'IA,
  avant ou après 72 heures, sans exception. L'IA peut recommander de pauser
  une publicité ; elle ne commente pas celles qui le sont déjà.
- Motif : une publicité en pause n'est pas le sujet de l'analyse, et les
  données périmées produisent de mauvaises recommandations.
- Date / qui a tranché : 13/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur

## D-023 — Recommandations courtes, détail à la demande
- Décision : une recommandation du Copilote tient en une ligne. Le détail
  technique n'apparaît que si le Gérant demande à le voir.
- Motif : les recommandations doivent s'appliquer, pas se lire. Le détail
  fait perdre du temps à chaque consultation.
- Date / qui a tranché : 13/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur
```

---

## Interdits

- Aucun autre fichier
- Aucun commentaire de ta part
- Si un ancrage ne correspond pas, saute l'opération et signale-la

## Protocole

Pré-vol anti-cache. Commit et push après rebase.
Si le hub refuse la publication, pousse sur `doc-007-rapport`.

## Ton rapport

Format D-013, référence `DOC-007`.

## Ta réponse à l'écran

```
MISSION TERMINÉE — DOC-007
```

ou

```
MISSION NON TERMINÉE — DOC-007
```

— Pilote, facebook-ads
