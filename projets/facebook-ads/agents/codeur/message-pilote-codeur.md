# Message Pilote -> Codeur

MESSAGE-ID : CODE-035
DATE : 2026-10-13
OBJET : Quatre défauts restants du Copilote — F03 à F06

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Sur CODE-034

Validé. Les six points de la maquette sont en place et vérifiés à l'écran par
le Gérant : actions en tête, bouton Ignorer, détail replié, contexte à droite,
confirmation sur les actions irréversibles. Ton verdict NON sur le contrôle en
écran étroit était honnête ; il est levé.

## Cette mission

Les quatre derniers défauts démontrés par `DIAGNOSTIC-003.md`. Chacun est
documenté avec ses lignes de code. **Lis ce fichier avant de commencer.**

---

## F03 — La plage de dates choisie est perdue

`getPeriodQueryString` produit `since=X&until=Y` en plage personnalisée
(`js/state.js` L15-28). Mais le Copilote n'extrait que `date_preset` et, en
son absence, retombe sur `last_7d` sans envoyer aucune borne
(`js/ai-recommendations.js` L1414-1422).

Conséquence : le Gérant choisit septembre, l'analyse porte sur les sept
derniers jours. Sans aucun avertissement.

**Attendu** : la plage choisie est transmise et respectée. Si une borne ne
peut pas l'être, l'écran dit sur quelle période l'analyse a réellement porté.

Le Diagnostic signale aussi que le contexte CRM est lu sur une autre fenêtre
et sans filtre de campagne. Vérifie, et si c'est le cas, aligne ou signale.

---

## F04 — Un audit en échec est noté 50 sur 100

Après un échec de lecture de la réponse, la route construit `score_config: 50`
avec un verdict partiel, puis renvoie `success: true` (`routes/ai.js`
L1327-1345). L'orchestrateur marque alors la source comme réussie
(L4053-4075).

Conséquence : un audit qui a échoué vaut 50 sur 100 et pèse jusqu'à 40 % du
score global. Un échec devient une note moyenne.

**Attendu** : un échec est un échec. Pas de score inventé, pas de source
marquée réussie. L'écran dit que l'audit n'a pas abouti, et le score global
se calcule sans lui ou ne s'affiche pas.

---

## F05 — Le filtre de statut n'a aucun effet

Le frontend envoie le statut sélectionné, y compris « en pause »
(`js/ai-recommendations.js` L1399-1421). Les routes le transmettent mais ne
le passent pas à `loadDeliveryScope`, qui n'accepte que campagne, période et
temps (`routes/ai.js` L48-50, L4021-4044 ; `ai-delivery-scope.js` L68-81).

Conséquence : l'analyse porte toujours sur les publicités en diffusion, quel
que soit le filtre. Et le rapport affiche quand même le statut sélectionné —
donc il annonce un périmètre qu'il n'a pas analysé.

**Attendu** : décision D-022 du Gérant — **l'IA n'analyse que les publicités
en diffusion, sans exception.** Le filtre ne doit donc pas laisser croire le
contraire.

Deux options, choisis la plus simple : retirer les choix « toutes » et « en
pause » de ce filtre, ou les conserver pour l'affichage en indiquant
clairement que l'analyse porte toujours sur les pubs en diffusion.

**Ne rends pas les pubs en pause analysables.** C'est interdit par D-022.

---

## F06 — Les compteurs automatique et manuel comptent le mauvais champ

Le bouton « Tout appliquer » lit `executable_auto` (`routes/ai.js` L4261-4263,
frontend L1534-1540). Mais `guardReport` recalcule `auto_count` avec
`execution === 'auto'` (`ai-delivery-scope.js` L171-174).

Conséquence : une action marquée `executable_auto` mais sans champ `execution`
est comptée comme manuelle alors que le bouton l'exécutera.

**Attendu** : un seul champ fait foi pour « cette action est exécutable
automatiquement ». Compteurs et bouton lisent le même.

---

## Ce que tu ne touches pas

- Les acquis : exclusion des pubs en pause, protection 72 heures, ancienneté
  depuis la reprise, absence distinguée du zéro, rapport historique verrouillé
- Les garde-fous : mode réduction, HOUSING, D5
- La refonte de l'écran que tu viens de livrer
- Le Studio Pub

## Vérification attendue

Relance une analyse réelle et confirme : la période affichée correspond à la
période choisie, les compteurs correspondent aux boutons, et le filtre ne
promet plus un périmètre qu'il n'analyse pas.

## Déploiement

Autorisé. Livraison continue, D-024.

## Interdits

- Ne touche jamais à ` fb-ads-saas` (`srv-d7139du3jp1c7390flq0`)
- Aucune action réelle sur les publicités
- Aucune valeur de secret

## Ton rapport

Format D-013, référence `CODE-035`.
Si le hub refuse la publication, pousse sur `code-035-rapport`.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-035
```

ou

```
MISSION NON TERMINÉE — CODE-035
```

— Pilote, facebook-ads
