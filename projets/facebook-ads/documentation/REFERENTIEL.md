# Référentiel — Marketing Dashboard Mistral Pro Reno

Révision : 29 octobre 2026. Phase : production et utilisation.
Synthèse documentaire, pas audit en temps réel des services ou des comptes publicitaires.

## Périmètre

Application existante d'acquisition Meta Ads et ChatGPT Ads, centralisation des prospects dans Conversions et suivi commercial.
Le Pilote existant coordonne les agents avec son skill. L'assistant de Ricardo l'aide à comprendre, répondre et poser ses questions.

## État établi et limites

| Fonction | Preuve disponible | Limite |
|---|---|---|
| Meta Ads et CRM | Code `main`, décisions et livraisons datées | L'état des campagnes et les résultats doivent être relus dans le compte |
| Formulaire de devis | Formulaire backend et version sur domaine officiel documentés comme déployés | Pas de recette réelle complète demande → Conversions → SMS reçue confirmée dans les dernières preuves |
| Réception site | Transaction SQLite, reçu UUID, demandes et file d'alerte présents dans le code | Un reçu prouve le stockage, pas la remise du SMS |
| Rapprochement | Rejeu d'UUID dédoublonné ; rattachement conditionnel au lead | Déduplication multicanale générale non livrée |
| Alerte interne | Worker SMSGate et état d'alerte par demande | Configuration expéditeur/destinataire et réception réelle à valider |
| ChatGPT Ads natif | Quatre lectures compte/campagnes/résultats, accès direct Dashboard livré le 29/10 | Création, modification, pause et optimisation natives non implémentées |
| Connexion desktop Ads | Accès Dashboard existant ; pas de connexion supplémentaire depuis le dernier lot | Clé Dashboard existante distincte d'une authentification propriétaire forte |
| Mobile et Push | Circuits dédiés, sessions et files documentés | Accès et notifications à contrôler séparément |
| Mesure OpenAI | Provenance déclarée conservée | Pas de source/événement de conversion OpenAI configuré selon le dernier état documenté |

## Campagne ChatGPT Ads — dernier état documenté

Le suivi du 28/10 décrit une campagne « Extensions et rénovation énergétique — IDF », une annonce active et approuvée, objectif clics, budget quotidien moyen 15 EUR, fin le 4 novembre 2026 à 20 h 40, heure de Paris.
Ce sont des faits datés, pas des paramètres à recréer ni une autorisation d'augmentation ou de prolongation.
Les résultats retournés sur une fenêtre antérieure au lancement ne prouvent pas la diffusion ou les dépenses actuelles.
Identifiants et preuves : [suivi centralisé](SUIVI-GPT-ADS-CENTRALISE.md).

## Priorités d'exploitation

1. Valider une demande réelle jusqu'à son apparition dans Conversions et l'alerte effectivement reçue.
2. Contrôler les premières impressions, clics et dépenses sur une période pertinente.
3. Configurer et vérifier le suivi de conversion OpenAI dans le périmètre autorisé.
4. Relier dépenses, demandes qualifiées, devis et chantiers pour juger la rentabilité.
5. Développer les commandes natives Ads selon les priorités validées.

La collecte conserve le prospect avant toute alerte, ne le marque pas « contacté » et distingue origine déclarée et attribution.
Une donnée absente ne doit pas devenir zéro.

## Décisions et maintenance

- Conserver les contraintes métier et les autorisations budgétaires ; voir [gouvernance](../gouvernance/gouvernance-projet.md).
- Meta pixel/CAPI : décision D5 historique spécifique ; ne pas la transposer au suivi OpenAI.
- Ne pas réactiver des SMS automatiques aux prospects sur la base d'une ancienne description. D-017 les supprime ; l'alerte interne des demandes site est un autre circuit.
- `saas` : branche séparée, gelée et hors périmètre.
- Sauvegarde/restauration SQLite et dépendance à un téléphone SMSGate restent des points de vigilance à vérifier avant intervention.
- Les diagnostics, études, inventaires de septembre/octobre et anciennes notices sont des références datées ; ne pas reprendre leurs nombres de routes/tests comme actuels.
- Le projet a repris depuis le 12 octobre ; l'ancienne mention « à l'arrêt depuis septembre » est retirée.
- [Audit documentaire du 29/10](AUDIT-DOCUMENTAIRE-2026-10-29.md) : couverture, contradictions et classement des sources.
