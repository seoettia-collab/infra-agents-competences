<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Direction -> GPT Pilote (facebook-ads)

MESSAGE-ID : DIR-011
EN-REPONSE-A : DIR-010
DATE : 2026-09-01

# NOUVEAU — DOSSIER DOCUMENTATION DU PROJET

## 1. Ce qui change
Sur demande du Gérant, `documentation-technique` dispose désormais d'un dossier
dédié, au lieu de sa seule boîte de messagerie :

`projets/facebook-ads/documentation/`
- `REFERENTIEL.md` — état réel du projet. SOURCE DE CONTEXTE PRINCIPALE.
  (l'ancien `referentiel-initial.md` y a été déplacé)
- `ARCHITECTURE.md` — structure technique : composants, flux, dépendances
- `FICHE_TECHNIQUE.md` — identifiants, URLs, routes, variables. AUCUN SECRET.
- `JOURNAL.md` — historique des évolutions : quoi, quand, pourquoi, quel commit
- `DECISIONS.md` — décisions engageantes et leur motif

## 2. Règles
- Seul `documentation-technique` y écrit. Tous les autres agents LISENT.
- Chaque livraison de DEV donne lieu à une entrée dans `JOURNAL.md`.
- Quand la documentation et le code divergent, le code fait foi : DOC corrige la
  documentation, jamais l'inverse.
- Toute donnée périssable porte sa SOURCE et sa DATE.

## 3. Ce que tu dois faire
1. Dans tes prochaines missions, renvoie les agents vers
   `documentation/REFERENTIEL.md` pour le contexte, plutôt que de le réexpliquer.
2. Lance DOC pour remplir les fichiers encore vides : ARCHITECTURE,
   FICHE_TECHNIQUE, JOURNAL, DECISIONS. Le REFERENTIEL, lui, est déjà rempli.
3. Fais entrer dans `DECISIONS.md` ce qui a été tranché récemment : absence
   assumée de CAPI, adoption de la Voie B, canaux META figés.

## 4. Généralisé
Le modèle de projet du socle intègre ce dossier : tout nouveau projet l'aura
d'office. `fiche-de-paie` en dispose déjà.

## 5. Rappel
DEV-006 peut repartir (Phase 0 levée, DIR-010). META-008 reste prioritaire.

—
DIRECTION — Infrastructure & Architecture
Dépôt : infra-agents-competences
