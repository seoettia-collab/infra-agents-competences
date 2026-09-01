<!-- BANDEAU ANTI-CACHE : relire ce fichier sur la branche active avant d'agir. -->
# Message Pilote -> Documentation Technique

MESSAGE-ID : DOC-002
EN-REPONSE-A : DOC-001-R
DATE : 2026-09-01

## MISSION — EXTRAIRE DE LA FICHE TECHNIQUE LE PAQUET D'IDENTIFIANTS POUR META

### Décision du Gérant
Les informations nécessaires à la prochaine vérification Facebook/Meta sont normalement déjà centralisées dans la documentation technique du projet.

La collecte est donc confiée à `documentation-technique`, et non à Historique.

## Objectif
Préparer pour le Pilote un paquet compact, actuel et directement transmissible à l'agent `meta-ads`, afin qu'il puisse travailler sur le compte réel Mistral Pro Reno avec les bons identifiants et les bons points d'accès, sans demander au Gérant de rechercher manuellement ces informations.

## Source primaire obligatoire
Lire d'abord :
- `facebook-ads-backend/docs/FICHE_TECHNIQUE.md` sur `main` ;
- le référentiel technique courant du hub.

La fiche technique est la source de collecte principale. Si une donnée nécessaire est absente, ambiguë ou manifestement ancienne, la signaler et seulement alors la recouper dans le code/documentation actuelle. Si documentation et code divergent, le code fait foi.

## Données à extraire si présentes
Rassembler notamment :
- Business Manager / Business ID ;
- Ad Account ID ;
- Page ID Facebook ;
- App ID Meta ;
- Campaign ID(s), Ad Set ID(s), Ad ID(s) utiles ;
- Dataset / Pixel / Event Source ID s'ils existent réellement ;
- version Graph API ;
- URL backend de production ;
- routes backend déjà existantes qui lisent Facebook/Meta ;
- noms des variables d'environnement Meta pertinentes ;
- noms des scopes/permissions documentés ou déjà vérifiés ;
- toute autre référence nécessaire pour identifier sans ambiguïté le compte et ses objets Meta.

## Sécurité — aucune valeur secrète
Ne jamais recopier ni transmettre :
- access token ;
- app secret ;
- mot de passe ;
- cookie/session ;
- clé privée ;
- webhook secret ou autre secret d'authentification.

Si la fiche technique contient un secret, le rapport indique seulement : `SECRET PRÉSENT — NON REPRODUIT` et l'emplacement fonctionnel où il est utilisé.

## Livrable attendu
Remplacer `message-documentation-technique-pilote.md` avec :
- `MESSAGE-ID : DOC-002-R` ;
- `EN-REPONSE-A : DOC-002` ;
- section `PAQUET_META` directement transmissible à META ;
- pour chaque donnée : valeur non secrète + source + statut `CONFIRMÉ / À VÉRIFIER / ABSENT` ;
- liste courte des éventuelles données manquantes ;
- confirmation explicite : aucun secret reproduit.

Aucune modification du backend/frontend. Aucun déploiement. Cette mission est documentaire et de collecte uniquement.

## STOP COURT
`documentation-technique · DOC-002 · terminé|partiel|bloqué`
`fichier(s) modifié(s) : message-documentation-technique-pilote.md`
`commit : <hash>`
`réserves : aucune|<une ligne>`

— GPT Pilote — facebook-ads
