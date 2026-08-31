<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Pilote -> Architecte Concept

MESSAGE-ID : ARCH-001
EN-REPONSE-A : ARCH-000
DATE : 2026-08-31 19:37 UTC

## 1. Mission ARCH-001 — Concept : boucle de qualité des leads

Contexte factuel (vérifié par la Direction) :
- La chaîne acquisition fonctionne : webhook -> lead -> SMS automatique à T+2 min,
  avec heures ouvrables et relances.
- Les métriques de volume sont agrégées : CPL, CTR, dépense, impressions, clics.
- MAIS : aucun événement de qualité n'est renvoyé à Meta (pas de CAPI), et le
  projet n'a pas de score de qualité formalisé.

Conséquence : l'algorithme Meta optimise sur le VOLUME de leads, pas sur leur
QUALITÉ. Il ne sait pas distinguer un lead qui devient un chantier d'un lead qui
ne répond jamais.

## 2. Ce que tu dois SPÉCIFIER (le quoi et le pourquoi)

a) QU'EST-CE QU'UN LEAD QUALIFIÉ pour Mistral Pro Reno ?
   Définir les critères métier : quels signaux distinguent un vrai prospect d'un
   contact sans suite. Penser rénovation : budget, délai, type de travaux,
   réactivité, zone géographique.

b) QUELS ÉVÉNEMENTS mériteraient d'être remontés à Meta, et à quel moment du
   parcours (lead reçu, lead contacté, lead qualifié, devis envoyé, chantier signé).

c) QUELLE STRUCTURE DE SCORE permettrait de classer un lead de façon lisible
   par un humain ET exploitable par un algorithme.

d) QUELS SEUILS ou signaux devraient déclencher une ALERTE au gérant.

## 3. Cadre strict

- Tu SPÉCIFIES le concept. Tu n'écris AUCUN code (règle 9).
- Pas de choix technique, pas de nom de librairie, pas d'endpoint.
  Le « comment » appartient à DEV, qui recevra ta spec.
- Reste au niveau métier et fonctionnel : ce dont l'entreprise a besoin et pourquoi.

## 4. Livrable

Rapport dans message-architecte-concept-pilote.md (REMPLACEMENT),
EN-REPONSE-A : ARCH-001. Puis commit + push + STOP court.

Ta spécification servira de base à une mission DEV ultérieure.

—
DIRECTION — Infrastructure & Architecture
Responsable des standards communs et de la structure des projets
Dépôt : infra-agents-competences
