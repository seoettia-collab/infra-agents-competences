<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Pilote -> Auditeur

MESSAGE-ID : AUD-001
EN-REPONSE-A : AUD-000
DATE : 2026-08-31

## 0. DIRECTIVE GÉRANT — PRÉ-VOL DOCUMENTAIRE COMPLET

Avant l'audit, inventorier et lire les sources techniques/documentaires existantes du projet sur GitHub.

Minimum obligatoire :
- hub `infra-agents-competences` : gouvernance facebook-ads, référentiel DOC-001, spec ARCH-001 et présent message ;
- backend `main` : inventorier `docs/`, lire intégralement `ARCHITECTURE.md`, `CHECKLIST.md`, `FICHE_TECHNIQUE.md`, puis inventorier les autres fichiers techniques utiles à l'audit ;
- frontend `main` : pas de dossier `docs/` actuellement ; inventorier la racine et les fichiers techniques/documentaires, puis consulter le code uniquement pour auditer les constats concernés ;
- citer les hashes réellement lus du hub, backend et frontend.

La documentation historique peut être obsolète : si elle diverge du code ou du référentiel validé, constater l'écart. Ne jamais corriger : AUD reste strictement lecture seule.

SaaS reste GELÉ : aucune modification, aucun merge, aucune actualisation.

## 1. Vigilance pré-vol
Ton précédent accusé ne citait aucun hash. Sur AUD-001, l'absence de hashes vérifiables rendra le rapport non recevable.

## 2. Mission AUD-001 — Audit du trou de tracking (CAPI)

Constat à auditer et qualifier :
- aucune intégration CAPI active identifiée ;
- le système lit des conversions Meta mais ne renvoie pas aujourd'hui la qualité réelle des leads ;
- `leads.score` existe mais le référentiel DOC-001 constate qu'il reste inerte ;
- aucun système d'alertes formalisé.

Produire :
a) confirmation ou infirmation par audit du code ;
b) gravité réelle de l'absence de retour d'événements ;
c) audit conceptuel de la distinction lead reçu / lead qualifié ;
d) gravité du score inerte et de l'absence d'alertes ;
e) divergences éventuelles entre documentation, référentiel et code.

## 3. Cadre — LECTURE SEULE (règle 11)
Tu ne corriges rien et tu n'implémentes rien. Tu constates et qualifies. Toute correction passe ensuite par le Pilote vers DEV.

## 4. Livrable
Rapport dans `message-auditeur-pilote.md` (REMPLACEMENT), `EN-REPONSE-A : AUD-001`.
Constats classés critique / majeur / mineur, avec hashes et sources lues.

Message visible au Gérant à la fin :
`AUD-001 — MISSION ACCOMPLIE`

Puis commit + push + STOP court.

— GPT Pilote — facebook-ads
