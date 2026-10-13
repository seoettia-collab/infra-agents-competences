# RÉFÉRENCE — comment Mistral Pro Reno exploite Meta

Établi le 13/10/2026 par le Pilote.
Sources : ARCH-002-R, ARCH-003-R, DIAG-004, ADM-001, CODE-031, CODE-033.

Ce document répond à une seule question : **qu'est-ce qu'on utilise chez Meta,
qu'est-ce qu'on n'utilise pas, et pourquoi.** Il évite de rejouer des débats
déjà tranchés.

---

## 1. Ce qui est établi, et qu'il ne faut pas rejouer

### L'algorithme de Meta n'est accessible à personne

Ni par l'API, ni par le serveur MCP, ni par un agent. Les poids, les décisions
internes de diffusion et les signaux latents ne sont pas exposés.

Vérifié deux fois : ARCH-002-R en août, DIAG-004 en octobre.

**Conséquence** : aucun outil ne permettra « d'entrer dans Meta ». Ce qu'on
peut obtenir, ce sont ses diagnostics, pas son moteur.

### Un modèle d'IA de Meta ne connaît pas mieux Meta Ads

Muse Spark est un modèle généraliste. Appartenir à Meta ne donne aucun accès
privilégié au compte publicitaire, aucune donnée d'entraînement propriétaire
sur les Ads, aucun signal d'enchère.

**Conséquence** : changer de moteur IA serait un changement de fournisseur,
pas un gain. Décision prise en août, confirmée depuis.

### L'agent META conseille, il n'a aucun accès

Le poste `meta-ads` travaille sur les chiffres qu'on lui fournit. Il n'a
jamais vu le compte.

**Conséquence** : quand il évoque une créa passée ou une donnée du compte, il
invente. C'est arrivé plusieurs fois. Ses conseils de rédaction valent ; ses
affirmations factuelles sur le compte, non.

---

## 2. Ce qu'on utilise aujourd'hui

| Surface | Usage | Qui |
|---|---|---|
| **Marketing API, Graph v25.0** | Lecture du compte : campagnes, ensembles, publicités, insights, formulaires. Publication de publicités. Actions sur les statuts et budgets | backend du dashboard |
| **Recommandations natives Meta** | Diagnostics du compte affichés dans le bloc « Vu par Meta » | backend, depuis CODE-031 |
| **Serveur MCP officiel** | Administration du compte, lecture libre, écriture sur ordre écrit | poste `admin-meta`, depuis le 13/10 |
| **Lead Ads** | Formulaire natif, le prospect ne quitte pas Facebook | compte publicitaire |
| **Advantage+** | Meta pilote ciblage, placements et répartition du budget | campagne, depuis le 12/10 |

---

## 3. Ce qu'on n'utilise pas, et pourquoi

| Surface | Pourquoi |
|---|---|
| **API Conversions (CAPI)** | Interdite par la décision D5. C'est par là que passerait le renvoi d'événements de qualité à Meta. À rouvrir si D5 est amendée |
| **Pixel** | Pas de site instrumenté. Interdit par D5 |
| **Catalogue, plateforme de commerce** | Mistral Pro Reno n'a ni catalogue produit ni boutique |
| **Tests A/B et lift studies natifs** | Volume insuffisant pour qu'ils produisent un résultat exploitable |
| **Interface en ligne de commande publicités** | Recoupe le serveur MCP, sans l'apport conversationnel |
| **Opportunity Score** | Non accessible sur ce compte. Vérifié en octobre, à re-tester plus tard |

---

## 4. Les contraintes permanentes du compte

### Catégorie spéciale HOUSING

Obligatoire pour le secteur. Elle interdit, sans exception :

- tout ciblage par âge, genre ou caractéristique démographique
- toute analyse démographique, **même descriptive**, dans les textes produits
  par l'IA
- un rayon géographique en dessous du minimum imposé

Elle limite aussi les options d'Advantage+.

**Ce n'est pas une préférence, c'est une obligation légale.** Aucune
recommandation de Meta ne la lève.

### Budget contraint

32 € par jour. Toutes les décisions en découlent :

- deux publicités maximum, pas six
- une campagne, pas deux
- ne jamais proposer d'augmenter le budget sans demande explicite

### Phase d'apprentissage

Une publicité en diffusion depuis moins de 72 heures ne se touche pas. Toute
modification relance l'apprentissage de Meta à zéro.

---

## 5. Meta recommande ce que nos règles interdisent

Ce n'est pas un cas limite, c'est le cas courant. Meta optimise pour la
dépense et l'adoption de ses automatisations ; Mistral optimise pour la
rentabilité d'un artisan au budget contraint.

| Ce que Meta recommande | Règle heurtée |
|---|---|
| Augmenter les budgets, lever les contraintes | Mode réduction de budget |
| Configurer la CAPI, installer un pixel | Décision D5 |
| Élargir ou affiner le ciblage | HOUSING |

**Comportement imposé** : la recommandation est affichée, marquée « en conflit
avec vos règles », non actionnable, et n'entre pas dans le contexte de l'IA.
Elle n'est jamais supprimée silencieusement — un conflit affiché prouve que
les garde-fous fonctionnent.

---

## 6. Ce que Meta ne permet pas

- **Désactiver les commentaires** sur une publicité. On ne peut que les
  masquer, par le filtre de grossièretés et une liste de mots sur la Page
- **Supprimer des conversations Messenger** par l'API. La boîte de réception
  de la Page se gère à la main
- **Renommer un service sans changer son adresse** — sans rapport avec Meta,
  mais même logique : vérifier avant de promettre

---

## 7. Répartition des rôles — décision du Gérant

> Meta pilote Facebook. META conseille le dashboard. Le Gérant valide.

Le budget, l'optimisation et les publicités se décident **dans le dashboard**,
pas déléguées à un conseil extérieur sans accès au compte.

---

## 8. Ce qui reste ouvert

| Sujet | État |
|---|---|
| Boucle de qualité des leads | Spécifiée en août (ARCH-001), jamais construite. Attend trois à quatre semaines de qualification manuelle |
| Décision D5 sur la CAPI | À trancher avant toute boucle de qualité |
| Opportunity Score | Non accessible, à re-tester quand le compte aura de l'historique |
| Limites de caractères officielles | Non confirmées. 40, 125 et 30 sont des recommandations d'affichage, pas des plafonds techniques |
