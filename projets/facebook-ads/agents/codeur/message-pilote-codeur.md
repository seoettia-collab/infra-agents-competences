# Message Pilote -> Codeur

MESSAGE-ID : CODE-040
DATE : 2026-10-13
OBJET : Ménage — leads de test, branches abandonnées, docs internes

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Sur CODE-039

Validé. Compteur corrigé, 39 conversations et 130 messages supprimés,
synchronisation bornée au 13/10, autres tables intactes.

Information pour toi : le Gérant a ensuite nettoyé la boîte de réception côté
Meta Business Suite. **Le « Message indisponible » y apparaissait aussi** —
Meta ne conserve plus le contenu de ces vieux échanges. Ce n'était donc pas un
défaut du dashboard.

## Cette mission — trois rangements

Rien d'urgent, rien de risqué. C'est de la dette accumulée.

### Partie A — leads de test en base

Deux leads de test créés lors des vérifications des 11 et 12/10 sont encore
en production, plus le SMS de test associé.

Supprime-les. Comptage avant et après. **Rien d'autre** : la base doit rester
à zéro lead réel.

Si une confirmation t'est demandée par ton outil comme en CODE-039, dis-le
plutôt que de t'arrêter sans trace.

### Partie B — branches abandonnées

Le dépôt backend porte des branches qui ne servent plus :

```
dev-001-boucle-qualite
dev-002-corrections-audit
dev-004-meta-recommendations-readonly
dev-005-opportunity-score-fallback
dev-006-meta-drive-github-proxy
dev-009-meta-capability-probe
test-route/CODE-000
```

Plus celles de tes propres missions déjà fusionnées.

**Avant de supprimer chacune** : vérifie qu'elle est bien fusionnée dans
`main` ou qu'elle ne contient rien d'unique. Une branche qui porte du travail
jamais fusionné ne se supprime pas — signale-la.

Même vérification côté frontend, et sur les branches de rapport du hub
`code-023-rapport`, `code-026-rapport`.

### Partie C — docs internes du backend

`docs/ARCHITECTURE.md`, `docs/CHECKLIST.md` et `docs/FICHE_TECHNIQUE.md` sont
figés au 23/04/2026. La CHECKLIST annonce « 99 % » et « aucun bug connu » :
des chiffres faux que personne ne doit citer.

La vraie documentation est dans le hub.

**Ne les réécris pas.** Ajoute en tête de chacun un avertissement court :

```
> ⚠ Document figé au 23/04/2026, non maintenu.
> La documentation à jour est dans le dépôt infra-agents-competences,
> projets/facebook-ads/documentation/.
> Les chiffres de ce fichier ne sont pas fiables.
```

`docs/VOIE_B_DEV-006.md` est récent (01/09) : laisse-le tel quel.

## Ce que tu ne touches pas

- La branche `saas` et ses branches liées
- Le code applicatif : cette mission ne modifie aucun comportement
- Les leads réels, s'il y en a — vérifie avant de supprimer

## Déploiement

Autorisé pour la partie C. Les parties A et B ne demandent pas de
déploiement.

## Interdits

- Ne touche jamais à ` fb-ads-saas` (`srv-d7139du3jp1c7390flq0`)
- Aucune suppression de branche non vérifiée
- Aucune donnée personnelle dans le rapport

## Ton rapport

Format D-013, référence `CODE-040`.
Si le hub refuse la publication, pousse sur `code-040-rapport`.

PREUVES : comptages avant et après pour A, liste des branches supprimées et
de celles conservées avec leur motif pour B, fichiers modifiés pour C.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-040
```

ou

```
MISSION NON TERMINÉE — CODE-040
```

— Pilote, facebook-ads
