# Message Pilote -> Diagnostic

MESSAGE-ID : DIAG-004
DATE : 2026-10-13
OBJET : Serveur MCP publicités de Meta — ce qu'il apporte réellement

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Sur DIAG-003

Bon travail. Six défauts démontrés, preuves à l'appui, aucun gonflement.
F01 et F02 sont déjà en correction. L'accès au code était justifié.

## Mission de recherche — hors de ton périmètre habituel

Celle-ci n'est pas un diagnostic de code. C'est une recherche documentaire sur
un outil de Meta, et une seule question compte :

> **Le serveur MCP publicités apporte-t-il quelque chose que notre dashboard
> ne peut pas déjà obtenir par la Marketing API ?**

Le Gérant envisage de le brancher. Avant d'engager quoi que ce soit, il faut
savoir si le gain est réel.

## Source principale

```
https://developers.facebook.com/documentation/ads-commerce/ads-ai-connectors/ads-mcp-server/ads-mcp-server-get-started
```

Et la documentation liée, notamment la page « Outils disponibles » qui liste
l'inventaire complet par catégorie, et
`https://www.facebook.com/business/help/1456422242197840` pour la mise en
place sans application Meta.

## Les cinq points

**1. Les deux chemins d'accès.**
La documentation en décrit deux : avec une application Meta à créer, ou sans.
Lequel convient à une entreprise qui veut juste brancher un agent sur son
compte ? Quelles étapes, quels prérequis pour chacun ?

**2. L'inventaire réel des outils.**
Sept catégories annoncées. Liste ce que chacune expose concrètement.
Distingue ce qui **lit** de ce qui **écrit**.

**3. La question centrale — le recoupement avec la Marketing API.**
Notre backend lit déjà le compte par la Graph API v25.0 : campagnes, ensembles,
publicités, insights, formulaires.

Pour chaque catégorie du MCP, dis : **déjà accessible** par la Marketing API,
ou **nouveau**.

Regarde en particulier les catégories « Signaux et ensembles de données » et
« Historiques d'activité » : ce sont celles qui pourraient apporter ce que
nous n'avons pas.

**4. Ce qu'il n'apporte pas.**
Le Gérant pensait qu'un agent pourrait entrer dans le fonctionnement interne
de Meta — algorithme d'enchères, signaux de diffusion. **Confirme ou infirme
par la documentation**, pas par supposition. Si ce n'est pas exposé, dis-le
clairement.

**5. Les autorisations demandées.**
Sept permissions sont requises, dont `ads_management` et `catalog_management`.
Pour chacune : ce qu'elle permet, et ce qu'un agent pourrait faire de
destructeur avec.

## Ton verdict

Une phrase, tranchée : **le MCP apporte un gain réel, ou il double ce que
nous avons déjà ?**

Ne cherche pas à faire plaisir. Si la réponse est « il double », dis-le.

## Ce que tu ne fais pas

- Aucune installation, aucune connexion, aucun token
- Aucune recommandation technique sur comment l'intégrer
- N'invente rien : si la documentation ne dit pas, écris qu'elle ne dit pas

---

## Partie 2 — ce que Meta expose et que nous n'utilisons pas

Demande ajoutée par le Gérant le 13/10/2026.

La documentation Meta pour les développeurs liste plusieurs familles, visibles
dans son sommaire :

- API Marketing
- API Conversions
- Gateway API Conversions et Signals Gateway
- Catalogue
- Plateforme de commerce
- Connecteurs d'IA pour les publicités : interface en ligne de commande, et
  serveur MCP publicités

**Notre backend n'utilise que l'API Marketing**, en lecture, par la Graph API
v25.0.

Pour chaque famille, réponds en une ligne :

| Famille | Ce qu'elle permet | Utile pour nous ? | Pourquoi |

Le critère d'utilité, et lui seul : **est-ce que ça aide à obtenir plus de
chantiers, ou à mieux savoir lesquels viennent de la publicité ?**

Écarte sans hésiter ce qui ne nous concerne pas. Mistral Pro Reno est une
entreprise de rénovation en Île-de-France : pas de boutique en ligne, pas de
catalogue produit, pas de vente à distance. Si une famille est faite pour le
commerce, dis-le en une ligne et passe.

Deux points méritent un regard attentif :

- **L'API Conversions** : c'est par là que passerait le renvoi d'événements de
  qualité à Meta. Une décision interne, D5, l'interdit aujourd'hui. Décris ce
  qu'elle permettrait, sans recommander de l'activer.
- **L'interface en ligne de commande publicités** : à quoi sert-elle, et
  recoupe-t-elle le serveur MCP ?

Trois à cinq éléments retenus au maximum. **Ne liste pas tout ce qui existe,
retiens ce qui sert.**

## Où écrire

```
projets/facebook-ads/documentation/ETUDE-MCP-META.md
```

Une section pour le MCP, une section pour la partie 2.

Si le hub refuse l'écriture, pousse sur `diag-004-rapport`.

## Ton rapport

Format D-013, référence `DIAG-004`. Une page au plus.

## Ta réponse à l'écran

```
MISSION TERMINÉE — DIAG-004
```

ou

```
MISSION NON TERMINÉE — DIAG-004
```

— Pilote, facebook-ads
