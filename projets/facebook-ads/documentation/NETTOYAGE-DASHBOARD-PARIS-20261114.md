# Préparation du Dashboard pour Paris — 14 novembre 2026

## Instruction du Gérant

Nettoyer la liste active des prospects déjà traités, rendre la campagne Paris visible et isoler ses résultats avant de décider du lancement. Windsor consulté par un agent spécialisé. Aucune activation publicitaire autorisée dans ce lot.

## État Meta constaté via Windsor

- Compte Mistral Pro Reno, campagne Paris `120249390739080417` en pause, sans budget configuré.
- Ancienne campagne IDF `120239096216380417` active, budget déclaré 30 EUR/jour. Ce statut ne prouve pas une diffusion de ses annonces.

## Modifications livrées

- Backend initial `33f94ad41cd4c00a440916a76b500dd72bb636f2`, conservé comme ancêtre du merge concurrent `3db9c13e55b707babe38e714a5d441ce4b4d189c`.
- Frontend principal `d17bbe6f1edc65797609b67b74412c869ec1528d`, badge visible `d5d19f19acadd273d01daf004c8e75d6b2444ec2`, analyse précédente réinitialisée `4b70b7855e1d20d9b33dd96e1c4d103fbfb6e43a`.
- Sélection persistante de campagne, Paris par défaut. Résultats et comparaison de périodes filtrés, caches distincts, réponses d'une ancienne sélection ignorées.
- Liste des campagnes incluant celles en pause sans activité. Actions de pause et budget dirigées vers leur sélection explicite.
- Aucun ajout des totaux CRM globaux aux résultats d'une seule campagne. Ratios sans dénominateur affichés avec un tiret. Une erreur API reste indisponible.
- Suppression du rendu des petites courbes simulées à partir des totaux. Pagination filtrée des prospects corrigée, sélection native par changement de case.
- Score et variations précédentes vidés au changement de campagne ou quand la comparaison manque.

## Archivage exécuté et vérifié

44 prospects actifs, déclarés traités par le Gérant, archivés par la route existante PATCH `/api/facebook/leads/:id/archive`. Aucun changement de statut commercial, effacement ou envoi client. Les identifiants ont été utilisés uniquement en mémoire.

Première phase partiellement interrompue sur HTTP 502 pendant deux déploiements Render successifs. Reprise après lecture fraîche, limitée aux anciennes fiches encore actives et créées avant le nettoyage.

| Contrôle | Résultat |
|---|---:|
| Prospects du lot archivés | 44 |
| Archives préexistantes | 1 |
| Fiches actives finales | 0 |
| Fiches archivées finales | 45 |
| Total avant et après reprise | 45 / 45 |

## Contrôles

8 tests de régression synthétiques réussis, vérification syntaxique des JavaScript modifiés. Tests couvrant campagne/caches, géographie et séries quotidiennes, campagne sans activité, erreurs Meta, exclusion CRM global, comparaison de périodes et analyse précédente.

Lecture production campagne Paris sur 30 jours réussie : dépenses 0.00, prospects 0, impressions 0, CTR et fréquence null. Le frontend sert la nouvelle sélection Paris. Contrôle navigateur principal confirme les KPI à zéro, ratios avec tirets, budget non défini et liste active des prospects vide. Vérification navigateur finale du score après le dernier déploiement à compléter par le Pilote.

## Suite

Campagne Paris maintenue en pause. Créatif, ciblage final et budget à finaliser avant le GO du Gérant. Aucune programmation de lancement créée. Les anciennes données restent consultables via les archives et la sélection de campagne.
