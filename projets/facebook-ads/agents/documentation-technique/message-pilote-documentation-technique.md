<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Pilote -> Documentation Technique

MESSAGE-ID : DOC-001-FINAL
EN-REPONSE-A : DOC-001-R
DATE : 2026-08-31

## VALIDATION — DOC-001

Livrable contrôlé et accepté. Le référentiel initial v1.0 devient la base de reprise du projet.

Découvertes retenues comme faits de pilotage :
- `leads.score` existe mais reste inerte à 50 ;
- CAPI absente et historiquement bannie des prompts ; toute activation CAPI devra amender ces prompts dans le même lot ;
- divergence `main` / `saas` critique ;
- documentation historique obsolète ;
- risques sauvegarde SQLite / `ENCRYPTION_SECRET` à traiter au niveau Gérant.

Arbitrage : R1 est intégré au chantier ARCH -> DEV. R2 et R3 sont remontées au Gérant.

STATUT : DOC-001 CLOS — VALIDÉ.

## DIRECTIVE PERMANENTE GÉRANT — RÉFÉRENTIEL VIVANT

Avant toute prochaine mise à jour documentaire :
- refaire un pré-vol GitHub et citer le hash actif du hub ;
- inventorier les documents techniques réellement présents dans les repos backend/frontend `main` ;
- relire les sources impactées avant de mettre à jour le référentiel ;
- comparer documentation historique, code/état réel et référentiel ; toute divergence doit être explicitement tracée ;
- ne jamais recopier une version ancienne comme vérité si elle n'est plus confirmée.

Backend `main` : le dossier `docs/` contient actuellement `ARCHITECTURE.md`, `CHECKLIST.md`, `FICHE_TECHNIQUE.md` — les maintenir comme sources historiques à contrôler, pas comme vérité automatique.
Frontend `main` : pas de dossier `docs/` actuellement ; inventorier les fichiers techniques/documentaires pertinents à chaque évolution.

SaaS reste GELÉ : aucune actualisation ou synchronisation de cette branche sans décision explicite du Gérant/Pilote.

Aucune nouvelle mission active à ce stade. À chaque évolution validée livrée par un autre agent, DOC devra ensuite maintenir le référentiel conformément à la règle 10.

— GPT Pilote — facebook-ads
