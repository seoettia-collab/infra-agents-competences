<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Pilote -> META (meta-ads)

MESSAGE-ID : META-003
EN-REPONSE-A : META-002-RAPPORT
DATE : 2026-08-31 18:52 UTC

## 1. Où nous en sommes — CADRAGE IMPORTANT

Nous sommes en phase d'INSTALLATION DE LA STRUCTURE DE COMMUNICATION.
Ce n'est pas encore la phase de travail de fond.

Objectif des échanges META-001 et META-002 : vérifier que la boucle hub
fonctionne. C'est VALIDÉ :
- tu reçois tes missions dans message-pilote-meta-ads.md
- tu réponds dans message-meta-ads-pilote.md
- la Direction pousse (dernier commit rapport : 5e091ea)

La boucle tourne. C'est l'essentiel à ce stade.

## 2. Ton périmètre — définitif

META = STRATÉGIE GROWTH & CONVERSION FACEBOOK / META. Rien d'autre.

Tu es ici parce que tu es très à l'aise sur Meta/Facebook. C'est ta valeur.

Ne fais PAS :
- de code, de revue technique, d'inventaire de fichiers ;
- d'analyse d'architecture backend/frontend ;
- de demande d'accès aux dépôts de code.

Le volet technique est couvert par les agents Claude (ingénieur/architecte) et
sera traité APRÈS, dans une phase dédiée. Ce n'est pas ton sujet.

## 3. Points techniques déjà vérifiés par la Direction

Pour information uniquement — ne pas analyser, ne pas commenter techniquement.
Ces éléments corrigent tes hypothèses P1/P2/P3 :

- P1 : la chaîne webhook -> lead -> SMS automatique EXISTE et fonctionne.
  Envoi automatique à T+2 minutes, gestion des heures ouvrables, relances.
  Rien à construire.
- P2 : CPL, CTR, dépense, impressions, clics, fréquence sont DÉJÀ agrégés
  (niveaux campagne, publicité, jour). Rien à construire.
- P3 : CONFIRMÉ. Aucune Conversions API (CAPI). Le système lit les conversions
  Meta mais ne renvoie aucun événement. L'algorithme Meta n'apprend donc pas la
  qualité réelle des leads. C'est le seul vrai trou identifié.
- Pas de score de qualité formalisé ni de système d'alertes.

## 4. Mission META-003

Aucune mission de fond pour l'instant.

Accuse réception de ce cadrage en une réponse COURTE (10 lignes maximum) :
- confirmation que ton périmètre est compris (stratégie Meta uniquement) ;
- confirmation que le technique est hors de ton champ et viendra après ;
- rien d'autre.

Tu recevras une mission stratégique quand la structure sera complète.

## 5. Cadre permanent

- Rapport dans message-meta-ads-pilote.md (REMPLACEMENT), EN-REPONSE-A : META-003.
- Réponse courte. Pas de rapport long tant qu'on installe la structure.
- GitHub fait foi. Confidentialité client respectée.

—
DIRECTION — Infrastructure & Architecture
Responsable des standards communs et de la structure des projets
Dépôt : infra-agents-competences
