# Message Pilote -> Codeur

MESSAGE-ID : CODE-033
DATE : 2026-10-13
OBJET : Simplifier le Studio Pub — retirer l'imagerie, caler les champs sur Meta

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Pourquoi

Le Studio Pub a été construit par ajouts successifs. Il génère des images que
le Gérant n'utilise pas, propose trente thèmes dont six servent, et affiche
des champs dont rien ne prouve qu'ils correspondent aux formats de Meta.

Décision du Gérant du 13/10/2026 :

> L'image doit être uploadée et les textes faits avec le Studio Pub, c'est
> tout.

Référence à lire avant de commencer :
`projets/facebook-ads/documentation/REFERENCE-CREAS.md`

## Partie A — vérifier les formats réels de Meta *(à faire en premier)*

Le Studio Pub affiche aujourd'hui : accroche 40 caractères, texte principal
court 125, texte principal long 255, description 30.

**Rien ne prouve que ces limites sont justes.** Avant de corriger quoi que ce
soit, lis la documentation officielle de Meta sur les publicités image en Lead
Ads et établis :

- les champs réels d'une publicité image Lead Ads
- la limite de caractères réelle de chacun
- la liste des boutons d'appel à l'action disponibles pour cet objectif

Deux points à trancher en particulier :

1. **Meta n'accepte qu'un seul texte principal par publicité.** Le Studio Pub
   en produit deux, court et long. Lequel part réellement ? À quoi sert
   l'autre ?
2. Les **accroches multiples** — jusqu'à cinq — correspondent-elles à quelque
   chose chez Meta, ou est-ce une invention du dashboard ?

Consigne tes constats dans le rapport. Si une limite affichée est fausse,
corrige-la.

## Partie B — retirer l'imagerie

1. **Supprime la génération d'image** et tout ce qui l'alimente.
2. **Supprime le panneau « Options visuelles »** en entier : type de projet,
   pièce, surface, type de logement, éléments travaillés, style, ambiance,
   caméra, décoration. Vingt champs qui produisaient des consignes
   contradictoires.
3. **Supprime le bouton « Générer tout (texte + image) »**. Il ne reste que
   « Générer le contenu ».
4. **Conserve le téléversement d'image** et **conserve l'aperçu**. Ce sont
   les deux seules fonctions visuelles qui restent.

## Partie C — réduire les thèmes

Trente thèmes aujourd'hui, six retenus :

```
Salle de bain · Cuisine · Extension · Surélévation · Toiture · Ravalement
```

Motif, tiré du terrain : une publicité « rénovation complète » ne convertit
pas. Une publicité « salle de bain » convertit, et le client demande ensuite
le reste.

**Supprime aussi le champ « Type de projet »** — tous types de biens,
appartement, studio, maison individuelle. Il ne sert à rien.

## Partie D — produire le prompt d'image

Nouvelle fonction : à partir du thème choisi et du contexte métier déjà
enregistré dans le dashboard, le Studio Pub produit **un prompt d'image
complet**, que le Gérant copie pour le générer ailleurs.

Le prompt suit la trame en huit sections de `REFERENCE-CREAS.md` : format,
rôle, sujet, cadrage, lumière, textes intégrés, contraintes, mention IA.

Les invariants de marque de cette référence sont **toujours présents** dans
le prompt produit : format 4:5, bandeaux noirs, bas en deux lignes, mention
« Image générée par IA — à titre indicatif », aucune personne.

Un bouton pour copier le prompt suffit. Pas d'appel à un modèle d'image.

## Ce que tu ne touches pas

- Le contexte métier enregistré : c'est lui qui nourrit la génération
- Les garde-fous : HOUSING, D5, mode réduction
- L'IA Reco, le Rédacteur IA, les autres vues
- L'aperçu de publicité

## Déploiement

Autorisé. Livraison continue, D-024.

## Interdits

- Ne touche jamais à ` fb-ads-saas` (`srv-d7139du3jp1c7390flq0`)
- Aucune action réelle sur les publicités
- Aucune valeur de secret
- **Ne mets aucun délai de chantier** dans les textes ou prompts générés :
  c'est un engagement que le Gérant n'a pas validé

## Ton rapport

Format D-013, référence `CODE-033`.
Si le hub refuse la publication, pousse sur `code-033-rapport`.

PREUVES : les limites réelles de Meta constatées, ce qui a été supprimé, et
un exemple de prompt produit par la nouvelle fonction.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-033
```

ou

```
MISSION NON TERMINÉE — CODE-033
```

— Pilote, facebook-ads
