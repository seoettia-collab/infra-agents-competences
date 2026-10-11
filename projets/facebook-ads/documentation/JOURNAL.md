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

## 2026-10-11 — Les quatre postes de la v2 sont en place
- Quoi : Codeur validé par test de route (CODE-000), Documentation opérationnel
  (DOC-001 à DOC-003), META repris sous rôle de consultant (META-017), Pilote
  en fonction. Ancien Pilote GPT fermé après extraction de sa mémoire.
- Pourquoi : terminer la mise en place de la gouvernance v2 avant toute reprise
  du développement et de la campagne.
- Par : Pilote — CODE-000, DOC-001 à DOC-005, META-017
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

## 2026-10-11 — Inventaire complet du code
- Quoi : carte des 155 routes backend (14 fichiers) et des 160 appels frontend
  (9 fichiers), établie par lecture directe du code.
- Pourquoi : aucune carte n'existait. Impossible de chercher des redondances
  dans un code non inventorié.
- Par : codeur — CODE-001 à CODE-009
- Fichiers : documentation/INVENTAIRE-BACKEND.md, INVENTAIRE-FRONTEND.md

## 2026-10-11 — Premier diagnostic
- Quoi : aucun vrai doublon actif trouvé. Dix appels suspectés cassés, dont
  huit fonctionnent en réalité — l'inventaire reconstruisait mal les chemins.
  Deux vrais défauts : renommage de lead et création de lead de test.
- Pourquoi : le Gérant soupçonnait des redondances. La redondance technique
  n'existe pas là où on la cherchait.
- Par : diagnostic — DIAG-001 ; codeur — CODE-011
- Fichiers : documentation/DIAGNOSTIC-001.md, VERIFICATION-APPELS.md

## 2026-10-11 — Trois corrections déployées
- Quoi : renommage de lead corrigé, création de lead de test alignée,
  confirmation explicite ajoutée sur les deux routes GET destructrices.
  L'identifiant de campagne codé en dur a été sorti du code.
- Pourquoi : une suppression en masse décidait quelle campagne survivait à
  partir d'une valeur figée datant de mars 2026.
- Par : codeur — CODE-012, CODE-013
- Commit : backend 3fc0af6, frontend 014800d

## 2026-10-11 — Purge totale de la base de production
- Quoi : 120 leads, 216 communications, 70 conversations et 168 messages
  effacés définitivement, sans archivage. Tables protégées intactes :
  15 publications, 71 analyses, 8642 relevés de métriques, 104 événements
  webhook, contexte métier et configuration.
- Pourquoi : repartir sur une base propre avant la relance de campagne.
- Par : Pilote, sur ordre du Gérant — CODE-010, CODE-014 à CODE-018
- Commit : 802338d (retrait de la route temporaire)

## 2026-10-11 — Audit des variables d'environnement Render
- Quoi : quatre services inventoriés. Production 36 variables dont 3
  orphelines ; SaaS 20 ; site vitrine 7 dont 3 orphelines ; Mistral Devis 7.
  Deux services tournent sur le dépôt facebook-ads-backend, chacun avec son
  disque monté sur /var/data.
- Pourquoi : personne ne savait ce qui traînait sur les services.
- Par : codeur — CODE-019
- Fichier : documentation/AUDIT-VARIABLES-RENDER.md

## 2026-10-11 — Changement de téléphone et sécurisation du webhook SMS
- Quoi : passerelle SMSGate réinstallée sur un nouveau téléphone, même compte,
  même numéro. SMS_GATEWAY_DEVICE_ID mis à jour. Un token de signature a été
  posé dans la Signing Key de l'application et dans SMS_GATEWAY_TOKEN du
  service de production.
- Pourquoi : sans token, le webhook acceptait toute requête. N'importe qui
  connaissant l'adresse pouvait injecter de faux SMS dans une base propre.
- Par : Pilote et Gérant — CODE-021, CODE-022, CODE-023

## 2026-10-11 — Test des communications
- Quoi : SMS sortant validé, livré et enregistré. SMS entrant reçu par le
  webhook puis filtré faute de lead correspondant — comportement normal sur
  base vide. Appel vocal configuré mais non testé réellement.
- Pourquoi : vérifier la chaîne de communication avant la relance.
- Par : codeur — CODE-021
