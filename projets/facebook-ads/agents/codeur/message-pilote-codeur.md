# Message Pilote -> Codeur

MESSAGE-ID : CODE-031
DATE : 2026-10-13
OBJET : Lire les diagnostics natifs de Meta et les donner à l'IA

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Sur CODE-030

Validé. Historique verrouillé, absence distinguée du zéro, 111 tests verts,
vérification sur analyse réelle. Travail propre.

## Pourquoi cette mission

Aujourd'hui, l'IA reçoit des chiffres bruts et doit en déduire une
recommandation. C'est de là que viennent ses erreurs de jugement.

Or **Meta produit déjà ses propres diagnostics** sur le compte : score
d'opportunité, recommandations, anomalies. Si l'IA les reçoit, elle n'a plus
à deviner : elle reçoit un constat établi par Meta lui-même.

C'est le chantier spécifié en août et jamais construit.

## Partie A — lire les recommandations de Meta

Marketing API, documentation officielle « Opportunity Score and
Recommendations », mise à jour du 27/08/2026.

1. `GET /act_<AD_ACCOUNT_ID>/recommendations` — recommandations du compte,
   avec pour chacune : le type, les objets concernés, l'horodatage, le gain
   estimé, le texte descriptif et le lien profond vers Ads Manager.
2. Ne retiens que le stade **mid-flight**, celui qui porte sur des objets en
   diffusion.
3. Le score d'opportunité est un champ du compte publicitaire, retourné par
   la requête au niveau portefeuille d'entreprise. **S'il n'est pas
   accessible, ce n'est pas bloquant** : les recommandations seules portent
   l'essentiel. Dis-le et continue.

## Partie B — filtrer ce qui nous concerne

Meta documente une quarantaine de types de recommandations. La plupart sont
sans objet pour une entreprise de rénovation en Lead Ads : catalogue,
boutique, site marchand, partenaires de messagerie.

Liste blanche à retenir : fatigue créative, fragmentation des ensembles,
optimisation de la qualité des leads, contraintes de budget, placements
automatiques, audience Advantage+.

Les autres sont **masqués mais comptés** : « 9 autres suggestions Meta non
pertinentes pour votre configuration ». Compter plutôt que cacher — le Gérant
doit savoir qu'un filtre existe.

## Partie C — règle de conflit, à ne pas manquer

Meta recommandera des choses que nos règles interdisent. Ce n'est pas un cas
limite, c'est le cas courant :

| Recommandation Meta | Règle heurtée |
|---|---|
| Budget limitant les performances, augmenter les budgets | Mode réduction de budget |
| Configuration CAPI, pixel, signaux | Décision D5 |
| Recommandations touchant au ciblage | HOUSING |

Comportement attendu :

- la recommandation est **affichée**, marquée « en conflit avec vos règles »,
  avec la règle nommée
- elle est **non actionnable**
- elle **n'entre pas** dans le contexte envoyé à l'IA
- elle **n'est jamais supprimée silencieusement** — un conflit affiché prouve
  que les garde-fous fonctionnent

## Partie D — donner le reste à l'IA

Les recommandations pertinentes et non conflictuelles entrent dans le contexte
de l'IA **comme faits attribués à Meta**, jamais comme instructions.

Les interdits actuels — HOUSING, D5, mode réduction — doivent être réaffirmés
**en tête de prompt, au-dessus des données Meta**. Sinon ces textes
réintroduisent par la bande ce que les règles interdisent.

L'IA doit pouvoir dire d'où vient un constat : de nous, de Meta, ou des deux.
Une convergence des deux est en soi une information forte.

## Partie E — affichage

Un bloc **« Vu par Meta »**, dans la vue IA Reco existante, **sous** le
diagnostic Mistral. Pas de nouvel onglet, pas de nouvelle vue.

Trois lignes maximum par entrée : quoi, gain estimé annoncé par Meta, lien
vers Ads Manager. Le texte de Meta est repris tel quel et attribué — traduire
est acceptable, réinterpréter non.

Chaque bloc porte la source et l'heure de lecture. Les recommandations
expirent : une entrée périmée disparaît ou est marquée.

Trois états explicites, jamais un blanc :
- aucune recommandation → « Meta ne signale rien à ce jour »
- donnée inaccessible → « Diagnostics Meta indisponibles — dernière lecture :
  <date> »
- **l'indisponibilité de Meta ne dégrade jamais l'Audit Mistral**

## Interdits

- **Lecture seule côté Meta.** Aucune application de recommandation par API,
  aucun branchement sur `execute-action`
- Aucune connexion au serveur MCP : autre chantier
- Aucune activation CAPI
- Ne touche jamais à ` fb-ads-saas` (`srv-d7139du3jp1c7390flq0`)
- Aucune valeur de secret

## Déploiement

Autorisé, derrière un interrupteur permettant de revenir en arrière sans
redéploiement.

## Ton rapport

Format D-013, référence `CODE-031`.
PREUVES : ce que le compte renvoie réellement — nombre de recommandations,
types reçus, score d'opportunité accessible ou non. **Si le compte ne renvoie
rien, dis-le** : c'est une information en soi.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-031
```

ou

```
MISSION NON TERMINÉE — CODE-031
```

— Pilote, facebook-ads
