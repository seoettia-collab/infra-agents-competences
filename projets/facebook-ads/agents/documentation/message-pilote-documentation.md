# Message Pilote -> Documentation

MESSAGE-ID : DOC-006
DATE : 2026-10-11
OBJET : Consigner la journée du 11 octobre — journal et décisions

---

Lis ta fiche puis la gouvernance. **Tu recopies, tu ne reformules pas.**
Tous les textes sont fournis mot pour mot ci-dessous.

Deux fichiers : `documentation/JOURNAL.md` et `documentation/DECISIONS.md`.
Rien d'autre.

---

## OPÉRATION 1 — JOURNAL.md, ajouter à la fin

```
## 2026-10-11 — Inventaire complet du code
- Quoi : carte des 155 routes backend (14 fichiers) et des 160 appels
  frontend (9 fichiers), établie par lecture directe du code.
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
- Pourquoi : une suppression en masse décidait quelle campagne survivre à
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
```

## OPÉRATION 2 — DECISIONS.md, ajouter à la fin

```
## D-015 — Clé d'API du dashboard : décision maintenue
- Décision : la clé reste en l'état, y compris en clair dans le dépôt
  frontend public. Confirmée après l'audit du 11/10/2026.
- Motif : les clés fonctionnent, le travail doit avancer. Le risque reste
  théorique tant que le dashboard n'a pas de trafic extérieur.
- Date / qui a tranché : 11/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur
- Réserve du Pilote : à rouvrir le jour où des leads réels circulent.

## D-016 — Pas de renommage des services Render sans domaine stable
- Décision : les services Render ne sont pas renommés. Reporté jusqu'à ce
  qu'un domaine personnalisé soit posé sur chacun.
- Motif : renommer change le sous-domaine onrender.com, et aucun des services
  n'a de domaine personnalisé. L'URL facebook-ads-backend-s20a.onrender.com
  est câblée dans le frontend et chez Meta.
- Date / qui a tranché : 11/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur

## D-017 — Suppression de l'envoi automatique de SMS
- Décision : plus d'envoi automatique de SMS à la création d'un lead. Le
  bouton Auto-SMS et la variable AUTO_SMS_ENABLED sont retirés. La rédaction
  assistée, l'envoi manuel et le Rédacteur IA restent en place.
- Motif : les destinataires repèrent les réponses automatiques, et c'est
  contre-productif en rénovation.
- Date / qui a tranché : 11/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur

## D-018 — Webhook SMS entrant signé
- Décision : le webhook SMS exige une signature. Le même token figure dans la
  Signing Key de SMSGate sur le téléphone et dans SMS_GATEWAY_TOKEN du service
  de production. Sans token configuré, le webhook doit refuser.
- Motif : la validation acceptait toute requête en l'absence de token.
- Date / qui a tranché : 11/10/2026 — Ricardo ETTIA, Gérant.
- Statut : en vigueur
- À savoir : après une réinstallation de l'application ou un changement de
  téléphone, remettre le token côté téléphone, sinon les SMS entrants
  s'arrêtent sans message d'erreur.
```

---

## Interdits

- Aucun autre fichier
- Aucun commentaire de ta part
- Si un ancrage ne correspond pas, saute l'opération et signale-la

## Protocole

Pré-vol anti-cache. Commit et push après rebase.

## Ton rapport

Format D-013, référence `DOC-006`, en remplacement intégral.

## Ta réponse à l'écran

```
MISSION TERMINÉE — DOC-006
```

ou

```
MISSION NON TERMINÉE — DOC-006
```

— Pilote, facebook-ads
