# CODE-043 — texte publicitaire conservé en entier

## Bases, branches et livraison

| Dépôt | Base relue avant intervention | Livraison main / code-043 |
|---|---|---|
| Hub | cdc616a4bef0876aa005b5a88c040083917634fc | Rapport sur code-043-rapport et main |
| Backend | 7be44c57fb9acad45b7358e21911d10e7028913b | 1352e77ce71afb9fe94bf7d3b1d183bf61f84047 |
| Frontend | 1660718140ff5be833817cf587c7371e03ea51d8 | fdc415636c0fafaf7d2e18ac3afbea357ce98ade |

Pré-vol hub : fetch/reset sur origin/main avant lecture. Les dépôts privés sont relus via la connexion GitHub ; leurs commits de base et arbres sont reconstruits exactement localement. Branches isolées code-043, add/commit puis relecture de main et rebase origin/main avant publication. Arbres créés par le connecteur identiques aux arbres testés ; références avancées avec expected_sha, sans force.

- Arbre backend livré : `3e7de86e0fe1815bd9082aa0708022918fca2b4c`.
- Arbre frontend livré : `5c3383768e484e070b2fafaf6c1e7232082dc63b`.
- Backend : seul un fichier de tests est ajouté ; aucun code applicatif backend n’est modifié.
- Frontend : index.html, js/publish.js, tests/code-033-studio.test.js et tests/code-043-publish-text.test.js.

## 1. Où le code coupait le texte

### Reliquat certain dans la publication

Avant correction, `frontend/js/publish.js`, fonction `renderPublishPreview`, ligne 548 de la base :

```js
textInput.value = publishData.primaryTextShort
    || (publishData.primaryText || '').substring(0, 125);
```

L’ancien `updatePreviewLive` réinjectait dans `publishData.primaryText` :

```js
var tForFacebook = tLong || tShort;
```

**Distinction vérifiée :** avec le champ long présent dans l’ancien index, le payload conservait normalement le texte long ; l’aperçu court était toutefois coupé. Si ce champ long était absent, le repli court écrasait le payload avec les 125 premiers caractères. Reproduction locale sous Node 20.11.1 sur un texte de contrôle de 493 caractères :

| Cas | Aperçu | Payload | Dernière phrase conservée |
|---|---:|---:|---|
| Avant, champ long présent | 125 | 493 | Oui |
| Avant, repli sans champ long | 125 | 125 | Non |
| Après, champ unique | 493 | 493 | Oui |

Cette preuve n’est pas présentée comme une preuve que le repli a été emprunté lors de la création des deux publicités concernées.

### Ancienne génération : coupure automatique confirmée dans Git

`backend/services/claude-api.js`, commit `e6b6e520c685103e56df87fe0e8a2fbf774b0681`, lignes 830–913 : fonction `smartTruncate`, dérivation du texte court à 125, coupures du long à 255 et réalignement forcé du champ legacy. `substring(0, maxLen)` puis retour au dernier espace pouvaient arrêter une phrase au milieu, même en dessous de 125 caractères. Le détail exact est conservé dans `preuves-code-043/ancienne-troncature.txt`.

CODE-033 a supprimé ce traitement au commit `8c8eb4a1984b59bbeccc5c9581bff0599b3d7a0e`. Le générateur actuel passe par `studio.normalizeContent`, qui conserve le texte entier ; le test de génération longue CODE-033 continue de passer.

### Ce que l’historique permet réellement d’affirmer

L’annexe `projets/facebook-ads/agents/admin-meta/annexe-adm-001.md`, relevée le 13/10 vers 10 h 20–10 h 25 Paris, contient déjà EXACTEMENT les deux textes inachevés reproduits ci-dessous. Créatives d’alors : Salle de bain `4697592300486879`, Extension `1826767578321784`.

Le défaut préexistait donc au 19/10. La date de modification de la creative actuelle ne date pas l’apparition de la coupure. La forme des chaînes est compatible avec les anciennes limites de génération, mais l’appel individuel et le texte intégral d’origine ne sont pas établis : aucun texte complet correspondant dans l’historique de publication lu, aucune ligne UpdateCreative dans la requête ciblée de logs Render du 19/10 20:20 UTC au 20/10 09:47 UTC. Aucun auteur ni outil particulier n’est mis en cause sans preuve.

Les services actuels de publication image/Lead/vidéo et les chemins de modification de creative transmettent les chaînes reçues sans slice/substring de contenu publicitaire. Les autres sous-chaînes repérées sont des extraits de logs/aperçus ou des messages CRM ; elles ne sont pas des limites d’envoi publicitaire et restent hors périmètre.

## 2. Correction livrée

Un seul champ principal complet dans Publication : suppression du doublon court/long et de la dérivation à 125. Le texte saisi dans le Studio alimente l’aperçu, les payloads image/image uploadée/vidéo et l’historique sans coupure, y compris accents, retours à la ligne, emoji et espaces de bord. Le fallback sur un ancien objet donne priorité à sa version longue explicite. Un texte vide est refusé avec un message.

Les compteurs ne présentent plus 125 ou 255 comme des plafonds techniques. Les repères éditoriaux restent informatifs ; l’affichage chez Meta dépend du placement. Si Graph refuse une véritable limite technique, son erreur remonte et le texte reste inchangé : aucune réduction ni nouvelle tentative automatique avec une version raccourcie.

Les références officielles distinguent les recommandations de texte des exigences techniques ; aucun plafond technique non établi n’a été inventé :
- https://www.facebook.com/business/help/908491205873167
- https://www.facebook.com/business/ads-guide/update/image/facebook-feed/link-clicks
- https://developers.facebook.com/docs/marketing-api/reference/ad-creative-link-data

## 3. Textes réellement enregistrés chez Meta

Lecture par notre backend, Graph v25.0, sans mutation. **Il n’y a plus deux publicités actives au contrôle : une seule ACTIVE, Extension étant PAUSED.** Le relevé des sept publicités et leurs statuts est joint. Les deux publicités de la mission ont néanmoins été contrôlées individuellement.

### Salle de bain — ACTIVE / effective_status ACTIVE

- Publicité : `120248281347920417` — Ad - Salle de bain clé en main.
- Creative actuelle : `1135265525510950`.
- Titre : `Salle de bain clé en main`.
- Message complet retourné, 118 caractères ; aucun texte absent n’est reconstitué :

```text
Votre salle de bain est vieillissante ? On s'occupe de tout : plomberie, carrelage, sanitaires. 1 seul artisan, pas de
```

### Extension — PAUSED / effective_status PAUSED

- Publicité : `120248878541540417` — Ad - Extension maison en IDF.
- Creative actuelle : `1130229799713439`.
- Titre : `Extension maison en IDF`.
- Message complet retourné, 122 caractères :

```text
Votre maison devient trop petite ? Gagnez des m² avec une extension ou surélévation clé en main en Île-de-France. Étude de
```

La route de lecture expose le message de `object_story_spec.link_data.message`, sans troncature. Elle ne réexpose pas séparément creative.body ; son égalité actuelle avec message n’est donc pas revendiquée comme une nouvelle mesure de cette mission. L’ancien relevé ADM-001 comporte body, identique aux textes ci-dessus.

## Ce qu’il faudrait republier pour corriger l’existant

1. **Salle de bain : priorité à faire décider par le Gérant.** Faire valider son texte complet, puis remplacer la creative `1135265525510950` de l’ad `120248281347920417` par une creative avec ce texte intégral. Conserver le formulaire choisi en CODE-042, le média, le CTA et les autres paramètres. Le Gérant décide du moment compte tenu de l’apprentissage en cours ; aucune dérogation aux garde-fous n’est ajoutée.
2. **Extension : correction avant réutilisation éventuelle.** Faire valider le texte complet, puis remplacer la creative `1130229799713439` de l’ad `120248878541540417`. Conserver son statut PAUSED. La mission ne demande pas de la réactiver.

La correction du code ne complète pas rétroactivement les textes stockés chez Meta. Le Codeur n’a réécrit, modifié ni republié aucune publicité. Le texte original complet n’a pas été retrouvé ; sa suite n’est pas inventée.

## Tests et déploiement

- Node 20.11.1 : **151/151 backend**, **61/61 frontend** ; 3 et 6 nouveaux tests CODE-043.
- Syntaxe de chaque JavaScript modifié : OK ; git diff --check : OK.
- Backend isolé : DATA_DIR temporaire et PORT 19443. Appels Meta des essais remplacés par des doubles locaux.
- Contrôles : intégrité au-delà de 125/255, affichage mobile/desktop, ancien champ court ignoré, ancien objet long prioritaire, rechargement de l’aperçu, payloads image/vidéo, historique complet, refus Meta explicite sans réduction ni nouvelle tentative, textes reçus par les modifications image/vidéo complets.
- Test CODE-033 ajusté pour attendre le texte intégral avec son espace final, conformément au nouveau contrat ; les garde-fous de génération restent testés.
- Render : service `srv-d6cq3hi4d50c73aa1rkg`, déploiement `dep-dbbjmcg473hc73dlc6og`, live le 20/10 à 09:59:10 UTC ; seul ajout de tests backend.
- Version frontend servie : js/publish.js contrôlé identique au fichier testé, SHA256 `cc32d60c3d730dcdbf286a7312c519ee7fa89ebe4bf5b35dc1663635933f86f0`.
- Chrome : Publication chargée, champ complet unique sans maxlength, ancien champ long absent. Aucune saisie de publicité réelle et aucun bouton Publier utilisé. Les payloads complets sont vérifiés localement, pas par une écriture Meta de production.
- Après livraison : relecture des deux publicités, creative, statut et texte identiques à l’avant ; preuves jointes.
- Choix des formulaires CODE-042, IA Reco, Conversions, HOUSING, D5, réduction, 72 h et SaaS inchangés. Aucun budget, ciblage ou statut modifié.
