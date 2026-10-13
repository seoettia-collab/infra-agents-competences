# DIAG-006 — Studio Pub et Meta — 2026-10-13

## Pré-vol et méthode

- [SÛR] Hub après fetch/pull : 87caa5a545b9412123606d6359cd39c9b157db45 ; mission DIAG-006.
- [SÛR] Backend main : e6b6e520c685103e56df87fe0e8a2fbf774b0681 ; frontend main : c9f0d821a6df43810d04fb16d3d4e3163a01788b.
- [SÛR] Six fichiers relus aux hashes immuables ; SHA de fichiers identiques aux lectures initiales de main.
- [SÛR] Inventaires backend/frontend consultés ; code en lecture seule ; aucune mutation Meta, génération payante, modification de code ou solution technique.

## 1. Documentation officielle et champs réels

Sources consultées le 13/10/2026 par HTTP direct ; plusieurs ouvertures par moteur de recherche échouent.

| Repère | Page officielle | Résultat |
|---|---|---|
| M1 | https://developers.facebook.com/docs/marketing-api/reference/ad-creative-link-data/ | HTTP 200 ; champs et types lisibles |
| M2 | https://developers.facebook.com/docs/marketing-api/guides/lead-ads/create/ | HTTP 200 ; exemple image Lead avec description/message/link et formulaire |
| M3 | https://www.facebook.com/business/ads-guide/update/image/facebook-feed?locale=en_US | HTTP 200 ; recommandations texte 50–150, titre 27 |
| M4 | https://www.facebook.com/business/ads-guide/update/image/instagram-feed | HTTP 200 ; recommandations texte 125, titre 40 |
| M5 | https://www.facebook.com/business/ads-guide/update/image/facebook-marketplace?locale=en_US | HTTP 200 ; recommandations texte 125, titre 40, description 30 |
| M6 | https://www.facebook.com/business/ads-guide/image/facebook-feed/lead-generation | HTTP 404 direct ; variante update/lead-generation également 404 |

| Champ réel | Nom API, dans object_story_spec | Maximum technique démontré | Recommandation d'affichage |
|---|---|---|---|
| Titre | link_data.name | [À VÉRIFIER] Aucun chiffre dans M1 | [SÛR] Feed 27 ; Instagram Feed 40 |
| Texte principal | link_data.message | [À VÉRIFIER] Aucun chiffre dans M1/M2 | [SÛR] Feed 50–150 ; Instagram Feed 125 |
| Description du lien | link_data.description | [À VÉRIFIER] Aucun chiffre dans M1 | [SÛR] Marketplace 30 ; non listée sur M3/M4 |
| Lien | link_data.link ; call_to_action.value.link selon payload | [À VÉRIFIER] Aucun chiffre établi | [SÛR] URL, pas un texte publicitaire |
| Bouton | link_data.call_to_action.type | [SÛR] Valeur de type CTA, pas un libellé libre | [À VÉRIFIER] Compatibilité de chaque type avec Lead Ads/placement |
| Formulaire natif | link_data.call_to_action.value.lead_gen_form_id | [SÛR] Identifiant, pas du texte marketing | [SÛR] Liaison au formulaire existant montrée par M2 |

- [SÛR] Les champs ci-dessus existent dans M1/M2 ; la description n'est pas utilisée pour Instagram selon M1.
- [SÛR] M3–M5 distinguent recommandations textuelles et exigences techniques : aucun plafond Meta universel 40/125/255/30 n'est établi.
- [À VÉRIFIER] Plafonds techniques exacts du compte, combinaison Lead Ads/placements et coupures réelles : aucune vérification Ads Manager ou API réalisée.
- [SÛR] Aucun refus pour dépassement de ces nombres n'a été observé ; ne pas transformer une recommandation d'affichage en règle de rejet.

## 2. Recoupement Studio Pub / Meta

| Champ du Studio Pub | Existe chez Meta ? | Limite correcte ? |
|---|---|---|
| Accroches, jusqu'à 5 × 40 | [SÛR] Variantes locales du titre name ; un seul titre choisi est envoyé | [SÛR] 40 est local, pas un plafond universel ; Feed recommande 27 |
| Texte principal court, 125 | [SÛR] Variante locale de message, aucun champ court distinct | [SÛR] Concorde avec certaines recommandations, pas un maximum universel |
| Texte principal long, 255 | [SÛR] Variante locale du même message, aucun champ long distinct | [SÛR] 255 imposé localement ; plafond Meta non démontré |
| Description, 30 | [SÛR] Champ description réel, mais omis en publication image Lead | [SÛR] 30 recommandé sur Marketplace ; pas un maximum universel établi |
| Call-to-action | [SÛR] Type CTA réel, mais choix remplacé par GET_QUOTE en image Lead | [À VÉRIFIER] Compatibilité des six valeurs de la liste |
| Options visuelles | [SÛR] Aucun champ Meta homonyme ; paramètres image | [SÛR] Aucune limite rédactionnelle Meta pertinente |
| Lien / formulaire | [SÛR] Non générés par generateAdContent ; renseignés à la publication ou par défaut backend | [SÛR] Données de destination, pas un manque de génération |

### Écarts démontrés et hiérarchie

1. [SÛR] Description abandonnée en image Lead : publishFullAd ne la transmet pas à createLeadAdCreative ; link_data ne contient pas description (backend services/facebook-publish.js:410–461 et 352–372).
2. [SÛR] CTA choisi ignoré en image Lead : ctaType est reçu, mais le creative impose GET_QUOTE (même fichier:416, 452–461 et 365–369).
3. [SÛR] Maxima locaux uniformes : maxlength et smartTruncate imposent 40/125/255/30 ; les recommandations officielles varient selon placement (frontend js/ai-creation.js:655–742 ; backend services/claude-api.js:733–760 et 844–884 ; M3–M5).
4. [SÛR] Chemin direct du formulaire compact : preparePublishData cherche .gen-description-input alors que le champ rendu est .gen-desc-input ; la description peut devenir vide avant le backend (frontend js/publish.js:381–388 ; js/ai-creation.js:740–742). L'omission finale en Lead reste certaine même après saisie dans l'aperçu.

[SÛR] Classement par fidélité du contenu transmis ; aucun incident de refus Meta démontré et aucun jugement rédactionnel.

## 3. Deux textes : rôle et version envoyée

- [SÛR] generateAdContent produit deux variantes, coupe localement à 125/255 et réaligne primary_text legacy sur le long (services/claude-api.js:733–760 et 844–884).
- [SÛR] L'écran conserve gen-main-text-short et gen-main-text (js/ai-creation.js:704–726).
- [SÛR] preparePublishData conserve les deux localement mais affecte primaryText au long en priorité, court en repli (js/publish.js:359–364 et 421–433).
- [SÛR] updatePreviewLive applique long || court aux deux aperçus mobile et desktop ; le court n'est donc pas une version mobile publiée séparément (js/publish.js:118–167).
- [SÛR] Le passage à l'étape suivante reprend le textarea long dans selectedVariantData ; le parcours legacy envoie ce primary_text (js/ai-creation.js:947–995 et 2325–2332).
- [SÛR] Chemin effectif : primaryText frontend → routes/ai.js → publishFullAd → link_data.message (js/publish.js:796–813 et 834–839 ; routes/ai.js:2259–2287 et 2362–2377 ; services/facebook-publish.js:452–461 et 363).
- [SÛR] Ni primaryTextShort ni primaryTextLong n'est un champ autonome envoyé à Meta ; un seul message et un seul titre dans ce creative simple.
- [SÛR] Les accroches supplémentaires restent des variantes locales ; aucune liste de cinq titres n'est transmise sur ce chemin.
- [À VÉRIFIER] Payload et rendu de production : conclusion statique sur main, sans publication réelle.

## 4. Options visuelles : où elles vont

| Option | Clés du panneau | Destination |
|---|---|---|
| Projet | int_project / ext_project | [SÛR] Sujet du prompt image |
| Pièce | int_piece | [SÛR] Pièce à représenter |
| Surface | int_surface / ext_surface | [SÛR] Dimensions image |
| Logement / bâtiment / étages | int_type_logement / ext_type_logement / ext_building / ext_etages | [SÛR] Type et dimensions image |
| Éléments travaillés | int_element | [SÛR] Éléments à montrer |
| Style | int_style / ext_style | [SÛR] Style image |
| Ambiance | int_ambiance / ext_ambiance | [SÛR] Éclairage image |
| Caméra | int_camera / ext_camera | [SÛR] Angle image |
| Décoration / abords | int_deco / ext_abords | [SÛR] Objets et abords image |

- [SÛR] collectVisualOptions → generate-image → buildPromptFromVisualOptions ; aucun de ces objets ne devient un champ textuel de link_data (js/ai-creation.js:560–587 et 1425–1441 ; routes/ai.js:263–286 ; services/image-api.js:212–322).
- [SÛR] Exception : customPrompt non vide prime sur ce builder, pour OpenAI comme Runway ; IMAGE_PROMPT_MODE=studio_only prime aussi (services/image-api.js:311–322, 517–519 et 719–724).
- [SÛR] Le frontend prépare normalement un customPrompt avant envoi : la présence de visualOptions dans la requête ne prouve pas que les sélections influencent l'image (js/ai-creation.js:1380–1441).
- [SÛR] Le projectType du brief marketing entre aussi dans generateAdContent, mais il est distinct des clés int_project/ext_project du panneau (routes/ai.js:172–220).
- [À VÉRIFIER] Effet visuel réel des sélections selon customPrompt et configuration runtime ; aucune génération effectuée.

## Verdict et limites

- [SÛR] NON : champs fondamentaux cohérents avec Meta, mais description/CTA affichés ne sont pas fidèlement transmis en image Lead.
- [SÛR] Deux versions rédactionnelles locales ne sont pas deux champs Meta requis.
- [À VÉRIFIER] Aucun plafond technique exact garanti ; page spécifique Lead Ads indisponible, aucune vérification du compte.
- [SÛR] Aucun changement de code, déploiement, mutation Meta ou proposition de refonte.
