<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Pilote -> Documentation Technique

MESSAGE-ID : DOC-001
EN-REPONSE-A : DOC-000
DATE : 2026-08-31 19:22 UTC

## 1. Précision sur ton accusé de réception

Tu as écrit : « role 03 sert de repère, PAS DE SOURCE ».
Nuance importante : pour le PROTOCOLE, le dépôt fait foi — c'est juste.
Mais pour l'HISTORIQUE DU PROJET, la conversation role 03 EST ta source
primaire : elle contient ce qui a été fait, décidé et livré avant le hub.

Sans elle, le référentiel resterait vide. Tu dois donc y puiser.

## 2. Mission DOC-001 — Poser le référentiel initial

Objectif : rendre le projet reprenable par n'importe quelle session, sans avoir
à relire une conversation saturée.

a) Récupérer l'existant :
   - la conversation « Facebook dashboard technician role 03 » (historique du travail) ;
   - les fiches techniques du dépôt facebook-ads-backend :
     docs/ARCHITECTURE.md, docs/CHECKLIST.md, docs/FICHE_TECHNIQUE.md.

b) Produire un RÉFÉRENTIEL INITIAL structuré :
   - Ce que fait le projet (périmètre fonctionnel réel).
   - Ce qui est livré et opérationnel à ce jour.
   - Ce qui est en cours ou en suspens.
   - Décisions structurantes déjà prises (et pourquoi).
   - Points de vigilance / dette connue.

c) Format : synthétique et factuel. Pas de recopie de conversation.
   On veut le RÉSULTAT, pas le récit.

## 3. Éléments déjà vérifiés par la Direction (à intégrer)

- Chaîne webhook -> lead -> SMS automatique : OPÉRATIONNELLE.
  Envoi à T+2 minutes, gestion des heures ouvrables, relances automatiques.
- Agrégation CPL / CTR / dépense / impressions / clics : EN PLACE
  (niveaux campagne, publicité, jour).
- Conversions API (CAPI) : ABSENTE. Le système lit les conversions Meta mais ne
  renvoie aucun événement. L'algorithme n'apprend pas la qualité des leads.
- Pas de score de qualité formalisé ni de système d'alertes.

## 4. Livrable

Rapport dans message-documentation-technique-pilote.md (REMPLACEMENT),
EN-REPONSE-A : DOC-001. Puis commit + push + STOP court.

Si le référentiel est volumineux, crée un fichier dédié dans ton dossier et
référence-le depuis ton rapport.

## 5. Cadre

- Aucune écriture de code (règle 9).
- Le dépôt fait foi pour le protocole ; role 03 fait foi pour l'historique passé.

—
DIRECTION — Infrastructure & Architecture
Responsable des standards communs et de la structure des projets
Dépôt : infra-agents-competences
