# Message documentation-technique -> Pilote

MESSAGE-ID : DOC-001-R
EN-REPONSE-A : DOC-001
DATE : 2026-08-31

## 1. Livrable

Référentiel initial posé :
`projets/facebook-ads/agents/documentation-technique/referentiel-initial.md` (v1.0)

Contenu : périmètre fonctionnel réel, livré/opérationnel, en cours et en suspens,
10 décisions structurantes avec leur motif, dette classée en 3 niveaux, procédure
de reprise. Synthétique, aucune recopie de conversation.

## 2. Sources croisées

- Conversation « Facebook dashboard technician role 03 » — historique du travail.
- Dépôts backend et frontend lus le 31/08/2026 (branches `main`, `saas`, redesign).
- `docs/ARCHITECTURE.md`, `CHECKLIST.md`, `FICHE_TECHNIQUE.md`, `SAAS_*.md`.
- Constats vérifiés transmis par la Direction (§5 du référentiel).

Règle appliquée : quand la doc interne et le code divergent, le code fait foi.

## 3. Ce que la lecture du code a ajouté aux constats de la Direction

1. **Le trou CAPI est le prolongement d'une décision assumée**, pas un oubli.
   Les prompts IA (`routes/ai.js`, `services/claude-api.js`) interdisent
   explicitement de recommander pixel / CAPI / Events Manager. Implémenter CAPI
   suppose d'amender ces prompts dans le même lot, sinon l'outil contredira son IA.

2. **Le score de lead est inerte.** `leads.score` existe (`INTEGER DEFAULT 50`),
   sert au tri par défaut et au badge « Top 3 », mais aucune ligne de code ne
   l'alimente. Tous les leads valent 50 : le tri et le Top 3 n'ont aucun effet.

3. **Divergence `main` / `saas` majeure.** Ancêtre commun au 18/03/2026 :
   `saas` +77 commits, `main` +137. 137 livraisons de production jamais portées
   sur le SaaS. Divergence identique côté frontend (+97 / −29). Le coût du
   rapprochement croît à chaque livraison sur `main`.

4. **Documentation interne obsolète de ~2 mois** (arrêtée au 23/04/2026). Ses
   chiffres « 99 % » et « aucun bug connu » ne sont pas fiables et ne doivent
   plus être cités.

5. **Projet à l'arrêt depuis fin mai 2026** (back `main` 26/05, front `main`
   28/05, `saas` 12/05). Toute reprise doit d'abord vérifier l'état réel de la
   production : tokens Meta 60 j, passerelle Android SMSGate, base SQLite.

## 4. Réserves portées à l'arbitrage du Pilote

- R1 — V1 (boucle de qualité : CAPI absente + score inerte + pas d'alertes) :
  chantier à ouvrir, il conditionne le rendement du budget publicitaire.
- R2 — V2 (divergence `main`/`saas`) : décision attendue — rapprocher maintenant,
  ou geler `main` le temps du SaaS. Ne pas trancher, c'est aggraver.
- R3 — V5/V6 (SQLite sans sauvegarde documentée, `ENCRYPTION_SECRET` en un seul
  exemplaire) : risque de perte irréversible, hors code.

Aucune réserve bloquante sur la mission DOC-001 elle-même.

## 5. Cadre respecté

Aucune écriture de code (règle 9). Écriture limitée à mon dossier d'agent.
Remplacement du fichier de sortie, jamais d'append.
