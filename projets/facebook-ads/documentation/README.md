# documentation — projet facebook-ads

Dossier de référence du projet. Tenu par l'agent `documentation-technique`.
C'est ici que vit la connaissance du projet, pas dans les conversations.

## Fichiers
- `REFERENTIEL.md` — état réel du projet : périmètre, ce qui est livré, ce qui
  est en cours, décisions structurantes, dette connue. Source de contexte
  principale, à lire avant toute mission.
- `ARCHITECTURE.md` — structure technique : composants, flux, dépendances.
- `FICHE_TECHNIQUE.md` — identifiants, URLs, routes, variables, environnements.
- `JOURNAL.md` — historique des évolutions : quoi, quand, pourquoi.
- `DECISIONS.md` — décisions engageantes et leur motif, pour ne pas les rejouer.

## Règles
- Seul `documentation-technique` écrit ici. Les autres agents lisent.
- Chaque évolution livrée par DEV donne lieu à une entrée dans `JOURNAL.md`.
- Quand la documentation et le code divergent, le code fait foi : DOC corrige
  la documentation, jamais l'inverse.
- Toute donnée périssable (barème, taux, identifiant) porte sa SOURCE et sa DATE.
