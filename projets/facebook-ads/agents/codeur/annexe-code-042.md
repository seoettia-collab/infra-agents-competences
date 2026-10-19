# CODE-042 — annexe de livraison

## Bases et publication

- Hub : `29402f3903791d98f39a770df02d81e6fb1a1ef2` après fetch/reset de `origin/main`.
- Backend : `bbeffdda3460c8e346b14a4a875a1b4a247955f5`.
- Frontend : `e2c74ebe52b995e1dae43bee3acdc9aea99ce9e6`.
- Branches isolées : `code-042` dans les deux dépôts applicatifs.
- Backend livré sur main : `7be44c57fb9acad45b7358e21911d10e7028913b`, arbre `5226546ad695b617fb1ff55e34da8529ef9b7c80`.
- Frontend livré sur main : `1660718140ff5be833817cf587c7371e03ea51d8`, arbre `ea692e55786c3eaa3d21e3c74f4b70afa86caee0` ; premier commit de préparation `4447052140a2d5e22e8835c3a3f874961696931c`.
- Le clone HTTPS privé n’était pas authentifié. Sources récupérées via la connexion GitHub, chaque blob contrôlé par son SHA Git, commits de base exacts reconstruits localement ; aucun jeton ajouté à Git.
- Add/commit puis rebase local sur `origin/main`, après relecture du HEAD distant par le connecteur ; publication avec parent exact et `expected_sha`. Arbres distants strictement identiques aux arbres testés. Pas de force push.
- Fusion et déploiement expressément autorisés par CODE-042, D-024.

## 1. Formulaires réellement disponibles

Lecture Graph depuis la Page de la publicité ; aucune liste de formulaires codée en dur.
Deux formulaires actifs observés le 19 octobre :

| ID | Nom | Statut |
|---|---|---|
| 4714720915406381 | Demande de devis Mistral Pro | ACTIVE |
| 1644308539841274 | Devis Rénovation IDF - v4 Court | ACTIVE |

La route existante `/api/facebook/lead-forms` remonte ces données. Elle parcourt maintenant tous les curseurs, dédoublonne et refuse une pagination incomplète au lieu de présenter une liste partielle. Seuls les statuts explicitement ACTIVE sont proposés ; les archivés et statuts inconnus ne sont pas rendus applicables. Les erreurs sont affichées comme erreurs.

La nouvelle lecture `/api/facebook/ads/:id/lead-forms` relit la publicité, son compte, sa Page, sa creative et son formulaire courant chez Meta. Elle renvoie aussi les alternatives et l’historique persistant. Une publicité d’un autre compte, d’une autre Page ou sans Page identifiable est refusée.

Références techniques primaires :
- SDK officiel Meta, objet Page et arête leadgen_forms : https://github.com/facebook/facebook-python-business-sdk/blob/main/facebook_business/adobjects/page.py
- Objet LeadgenForm : https://github.com/facebook/facebook-python-business-sdk/blob/main/facebook_business/adobjects/leadgenform.py
- Champ lead_gen_form_id : https://developers.facebook.com/docs/marketing-api/reference/ad-creative-link-data-call-to-action-value/

## 2. Cause et affichage corrigé

Le défaut est visuel : la liste existait déjà dans le DOM. Le bouton fabriquait une `modal-overlay` / `modal-content`, classes absentes des styles du projet. Chrome mesurait une position `static`, un début à 936 px pour une fenêtre haute de 936 px : le choix se trouvait sous la zone visible. Ce constat explique pourquoi le bouton semblait ne proposer aucune liste.

Le changement réutilise les classes existantes `ads-modal-overlay ads-modal-visible` et `ads-modal-box` de Gestion Ads. La boîte est centrée au-dessus de la page, avec défilement interne sur petite fenêtre. Aucun changement CSS global.

La publicité sélectionnée et son formulaire actuel sont affichés séparément du choix. Aucun nouveau formulaire n’est choisi par défaut. Le courant est exclu des alternatives. Les noms sont échappés. Une réponse tardive pour une autre publicité est ignorée.

## 3. Application et confirmation

Le POST existant `/api/facebook/ads/:id/update-form` exige désormais :
- `confirm: CONFIRM-CHANGE-LEAD-FORM` ;
- le nouveau `form_id` ;
- `expected_form_id` et `expected_creative_id` correspondant à l’écran relu.

Le serveur relit Meta, vérifie le compte et la Page, la présence du nouveau formulaire parmi les actifs de cette Page et l’absence de changement concurrent. Il refuse le formulaire déjà rattaché et les valeurs invalides avant toute écriture Meta. Le clonage existant ne remplace que le formulaire présent ; textes, médias, CTA, paramètres d’assets et autres champs sont conservés. L’association à la publicité n’envoie que `creative`. Aucun budget, ciblage ou statut n’est modifié.

Une dernière relecture de la creative a lieu avant association pour éviter d’écraser un changement intervenu pendant sa préparation. Deux appels simultanés sont bloqués. La réponse Meta d’association doit confirmer `success: true`.

L’avertissement sur la relance de l’apprentissage, le coût possible de plusieurs jours et le contexte des sept leads en six jours se trouve AVANT la case de consentement et le bouton de validation. Le chiffre est présenté comme le constat au moment de la demande, pas comme une mesure courante. Le bouton reste désactivé tant qu’un autre formulaire n’est pas choisi et que la case n’est pas cochée. Une erreur réseau laisse le bouton bloqué jusqu’à réouverture et relecture.

## 4. Trace durable et consultation

SQLite du disque persistant existant, table dédiée `ad_form_changes`. Champs : ID d’audit, horodatage UTC, fin, publicité ID/nom, ancien formulaire ID/nom, nouveau formulaire ID/nom, ancienne/nouvelle creative et état. Pas de données de lead.

Une ligne `pending` doit être écrite AVANT tout appel d’écriture Meta : si SQLite échoue, aucune action Meta. Après confirmation Meta, la ligne passe à `applied`. En cas de résultat incertain, elle reste `pending` ou devient `uncertain`. Une nouvelle application est alors bloquée ; l’écran dit de vérifier chez Meta. Un index unique interdit deux changements non résolus sur une même publicité. Aucun succès n’est inventé après erreur.

Où consulter : Gestion Ads → bouton 📝 de la publicité → « Historique des changements de cette publicité ». Cinquante dernières entrées, heure de Paris, états explicites. Les anciens logs mémoire ne sont pas migrés ni présentés comme un historique durable. Aucune entrée de production fictive n’a été créée.

## Vérification et limites

- Node 20.11.1 : backend 148/148, frontend 55/55 ; dont 7 et 5 nouveaux tests CODE-042.
- Syntaxe de chaque JavaScript modifié : OK. `git diff --check` : OK.
- Backend isolé avec DATA_DIR temporaire et PORT 19442 ; appels Meta des tests remplacés par des doubles locaux.
- Tests : pagination multi-pages et refus de liste incomplète, compte/Page, courant archivé, refus sans consentement, version périmée, formulaire identique ou indisponible, audit avant l’écriture et relecture depuis une connexion SQLite indépendante, double clic, timeout et blocage de répétition, clone préservant les autres champs, route refusant une confirmation absente.
- Frontend : avertissement avant consentement, vrai conteneur modal, état initial désactivé, choix+case exigés, payload attendu, erreur réseau, historique et états incertains, liste vide et réponses tardives.
- Aucun appel réel de changement de formulaire, création/suppression de formulaire ou modification de champs collectés. Le Gérant reste seul à choisir quand appliquer.
- La preuve d’application réussie et de conservation après redémarrage est locale/simulée, conformément à l’interdiction de changer une publicité pendant la mission.
- Aucun code IA Reco, Studio Pub, Conversions, HOUSING, D5, réduction ou protection 72h modifié. Aucun envoi de communication. SaaS et son service Render intacts.

## Mise en production

Backend Render : `srv-d6cq3hi4d50c73aa1rkg`, déploiement automatique `dep-dbb7mamk1f9s73c972s0`, commit `7be44c57fb9acad45b7358e21911d10e7028913b`, état live, fin 2026-10-19 20:20:07 UTC. Aucune seconde demande de déploiement.

Contrôles de la version servie et de l’écran : voir les preuves `api-formulaires.json`, `ui-avant.json`, `ui-apres.json`, `ads-avant.json`, `ads-apres.json`, `tests.json` et `deploiement.json`.
