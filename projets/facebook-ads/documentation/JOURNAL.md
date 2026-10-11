# JOURNAL DES ÉVOLUTIONS — facebook-ads

Une entrée par évolution livrée. La plus récente en haut.

Format :
## AAAA-MM-JJ — titre court
- Quoi : ce qui a changé
- Pourquoi : le motif
- Par : agent + MESSAGE-ID
- Commit :

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
