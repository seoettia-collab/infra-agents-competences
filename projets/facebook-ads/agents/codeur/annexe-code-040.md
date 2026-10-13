# CODE-040 — rangement partiel

Pré-vol initial hub : fetch, worktree isolé, reset --hard origin/main, HEAD 1c183a2 ; rôle et gouvernance lus avant mission. Après attente de connexion : nouveau fetch et reset sur 9844331a4606e0e236c24b088eca9b7df755a1a7, mission CODE-040 inchangée ; branche code-040-rapport créée sur cette base. Backend main initial 8eb4288c5165738859b245eca4781b1ee53bb8f6, arbre 69971a9bc55105f75f859edc3941d9c944326fb2 ; base locale équivalente b73c9bb. Branche backend isolée code-040.

## A — identification et comptages

Au début : 3 leads actifs, dont 2 avec id préfixé test_, form_id=test_form et raw_fields.test=true, créés le 11/10/2026 à 19:12:52 UTC. Le troisième est sans marqueur de test et date du 12/10/2026 : conservé. Aucune suppression sur un simple nom ressemblant à un test. L'identification et les preuves ne recopient ni noms, ni téléphones, ni adresses ni identifiants personnels.

DELETE /api/facebook/leads/:id a réussi pour les deux seuls leads formellement identifiés comme tests. Cette API existante effectue une suppression réversible : deleted=1 et deleted_at. Les deux leads sont ensuite présents dans GET leads-deleted, et absents des actifs. Aucune suppression physique des lignes leads : la mission interdit de modifier le comportement applicatif, et aucune route de purge étroite n'existe. Les routes de nettoyage global ont été écartées car elles touchent d'autres SMS, appels ou leads hors périmètre. Les deux tests restent récupérables dans la corbeille.

Historique initial des deux tests : 3 enregistrements sortants, soit 2 SMS et 1 appel queued. Le seul SMS à contenu explicitement préfixé Test, lié à un lead confirmé test et marqué delivered, a été effacé par DELETE /api/comms/outbound/:id. L'historique après confirme 2 enregistrements, soit 1 SMS Pending et 1 appel queued conservés ; zéro SMS au préfixe Test restant. Ces deux autres communications ne sont pas visées par l'ordre portant sur un SMS identifié. Aucun SMS/appel envoyé.

Après l'attente de connexion, la base active contient 3 leads sans marqueur de test : le lead initial conservé et 2 nouveaux leads créés le 13/10 à 14:02:56 et 14:36:33 UTC. Ils n'ont pas été touchés. Le zéro lead réel annoncé dans la mission n'est donc pas établi ; l'interdiction de supprimer les leads réels ou incertains a priorité. 0 test actif, 2 tests en corbeille, 1 SMS de test physiquement effacé. Les premières réponses de contrôle en cache ont été complétées par une vérification des identités initiales et de l'endpoint de corbeille ; les chiffres finaux sont dans leads-apres.json et corbeille.json.

## B — audit sans suppression

Comparaison GitHub main → branche, refaite après l'attente, sur les main backend bbeffdda3460c8e346b14a4a875a1b4a247955f5, frontend 88030b961537a120b46f1717dce9ed6c56c83489 et hub 9844331a4606e0e236c24b088eca9b7df755a1a7. 38 branches examinées : 30 avec ahead_by=0, donc déjà accessibles dans main ; 8 avec commits non ancestraux, conservées. Les deux anciennes branches redesign frontend sont fusionnées mais hors des branches Codeur explicitement visées ; conservées. Les 28 autres branches fusionnées peuvent être retirées après rétablissement de l'accès de gestion et recontrôle de leurs refs. code-040, mission active, n'est pas à supprimer.

Les branches non fusionnées ne sont pas déclarées redondantes sur la seule ressemblance du nom ou l'existence d'une fonctionnalité : l'absence de contenu unique n'est pas prouvée. La liste des fichiers propres à leurs comparaisons est conservée dans branches.json. Les deux branches de rapport du hub sont divergentes ; conservées elles aussi, sans effacer un ancien rapport potentiellement unique.

Aucune branche supprimée. Le connecteur sait comparer et publier des commits, mais ne propose aucune suppression de ref. Le Git CLI n'a pas d'authentification pour ces dépôts privés (lecture ls-remote échouée sans invite). Le navigateur GitHub affichait Sign in et le dépôt privé était inaccessible. Une première demande de connexion sécurisée a expiré ; après le message du Gérant demandant la connexion, nouvelle vérification toujours déconnectée et nouvelle demande browserAuth : résultat declined. Aucun nouvel essai après ce refus, aucun identifiant saisi par un autre canal, aucun secret demandé dans la conversation. La partie B reste bloquée, et non oubliée.

Branches supprimées : aucune.

| Dépôt | Branche | Commits absents de main | Décision et motif |
|---|---|---|---|
| facebook-ads-backend | code-012-corrections | 0 | fusion prouvée ; suppression bloquée faute de connexion GitHub de gestion |
| facebook-ads-backend | code-018-retire-purge-route | 0 | fusion prouvée ; suppression bloquée faute de connexion GitHub de gestion |
| facebook-ads-backend | code-023-communications | 6 | commits non fusionnés ; absence de travail unique non prouvée |
| facebook-ads-backend | code-023-sms-manuel | 0 | fusion prouvée ; suppression bloquée faute de connexion GitHub de gestion |
| facebook-ads-backend | code-025-purge-messenger | 0 | fusion prouvée ; suppression bloquée faute de connexion GitHub de gestion |
| facebook-ads-backend | code-025-retour-arriere | 0 | fusion prouvée ; suppression bloquée faute de connexion GitHub de gestion |
| facebook-ads-backend | code-028-sms-separes | 0 | fusion prouvée ; suppression bloquée faute de connexion GitHub de gestion |
| facebook-ads-backend | code-029-active-delivery | 0 | fusion prouvée ; suppression bloquée faute de connexion GitHub de gestion |
| facebook-ads-backend | code-030-history-metrics | 0 | fusion prouvée ; suppression bloquée faute de connexion GitHub de gestion |
| facebook-ads-backend | code-031-meta-diagnostics | 0 | fusion prouvée ; suppression bloquée faute de connexion GitHub de gestion |
| facebook-ads-backend | code-033-studio-simple | 0 | fusion prouvée ; suppression bloquée faute de connexion GitHub de gestion |
| facebook-ads-backend | code-035 | 0 | fusion prouvée ; suppression bloquée faute de connexion GitHub de gestion |
| facebook-ads-backend | code-036 | 0 | fusion prouvée ; suppression bloquée faute de connexion GitHub de gestion |
| facebook-ads-backend | code-039 | 0 | fusion prouvée ; suppression bloquée faute de connexion GitHub de gestion |
| facebook-ads-backend | dev-001-boucle-qualite | 2 | commits non fusionnés ; absence de travail unique non prouvée |
| facebook-ads-backend | dev-002-corrections-audit | 3 | commits non fusionnés ; absence de travail unique non prouvée |
| facebook-ads-backend | dev-004-meta-recommendations-readonly | 0 | fusion prouvée ; suppression bloquée faute de connexion GitHub de gestion |
| facebook-ads-backend | dev-005-opportunity-score-fallback | 0 | fusion prouvée ; suppression bloquée faute de connexion GitHub de gestion |
| facebook-ads-backend | dev-006-meta-drive-github-proxy | 0 | fusion prouvée ; suppression bloquée faute de connexion GitHub de gestion |
| facebook-ads-backend | dev-009-meta-capability-probe | 0 | fusion prouvée ; suppression bloquée faute de connexion GitHub de gestion |
| facebook-ads-backend | test-route/CODE-000 | 1 | commits non fusionnés ; absence de travail unique non prouvée |
| facebook-ads-frontend | code-012-corrections | 0 | fusion prouvée ; suppression bloquée faute de connexion GitHub de gestion |
| facebook-ads-frontend | code-023-communications | 5 | commits non fusionnés ; absence de travail unique non prouvée |
| facebook-ads-frontend | code-023-sms-manuel | 0 | fusion prouvée ; suppression bloquée faute de connexion GitHub de gestion |
| facebook-ads-frontend | code-028-sms-separes | 0 | fusion prouvée ; suppression bloquée faute de connexion GitHub de gestion |
| facebook-ads-frontend | code-030-history-metrics | 0 | fusion prouvée ; suppression bloquée faute de connexion GitHub de gestion |
| facebook-ads-frontend | code-031-meta-diagnostics | 0 | fusion prouvée ; suppression bloquée faute de connexion GitHub de gestion |
| facebook-ads-frontend | code-033-studio-simple | 0 | fusion prouvée ; suppression bloquée faute de connexion GitHub de gestion |
| facebook-ads-frontend | code-034 | 0 | fusion prouvée ; suppression bloquée faute de connexion GitHub de gestion |
| facebook-ads-frontend | code-035 | 0 | fusion prouvée ; suppression bloquée faute de connexion GitHub de gestion |
| facebook-ads-frontend | code-036 | 0 | fusion prouvée ; suppression bloquée faute de connexion GitHub de gestion |
| facebook-ads-frontend | code-037 | 0 | fusion prouvée ; suppression bloquée faute de connexion GitHub de gestion |
| facebook-ads-frontend | code-039 | 0 | fusion prouvée ; suppression bloquée faute de connexion GitHub de gestion |
| facebook-ads-frontend | dev-002-qualification-ui | 1 | commits non fusionnés ; absence de travail unique non prouvée |
| facebook-ads-frontend | redesign/sharp-flat-system | 0 | hors périmètre Codeur ; ancienne branche de refonte |
| facebook-ads-frontend | redesign/ui-kit-complete | 0 | hors périmètre Codeur ; ancienne branche de refonte |
| infra-agents-competences | code-023-rapport | 2 | commits non fusionnés ; absence de travail unique non prouvée |
| infra-agents-competences | code-026-rapport | 1 | commits non fusionnés ; absence de travail unique non prouvée |

main, saas et les branches liées au SaaS sont conservées ; aucun travail SaaS ou service fb-ads-saas n'a été sollicité.

## C — trois avertissements exacts

Seuls docs/ARCHITECTURE.md, docs/CHECKLIST.md et docs/FICHE_TECHNIQUE.md ont changé : quatre lignes de citation prescrites puis une ligne vide en tête. Comparaison binaire : contenu final égal à avertissement exact + contenu original ; docs/VOIE_B_DEV-006.md identique à la base. Aucun chiffre historique corrigé ou nouveau contenu inventé. Aucun JS applicatif modifié.

141 tests backend réussis sous Node 20.11.1, DATA_DIR temporaire et PORT 5040 ; diff --check réussi. node --check non applicable aux seuls Markdown modifiés. Add/commit local 21f4b6b, nouvelle lecture du main distant inchangé, rebase sur la base locale équivalente, publication via connecteur avec expected_sha. Arbre local/publication identique d0b6c0abbb7e63129fad0eea9ce0e9786989fdf6. Commit bbeffdda3460c8e346b14a4a875a1b4a247955f5 sur main et code-040 ; Render dep-db726gojo6nc738biqc0 live le 13/10 à 12:26:44 UTC. Aucun déploiement frontend. Aucun changement de logique, aucune écriture Meta Ads, CAPI inchangée.
