# GPT Ads Manager — suivi centralisé

Date : 2026-10-27.
Instruction du Gérant : conversation Facebook marketing unique, pilotage et agents internes ; aucun message à transporter vers une autre conversation.
Recentrage explicite du Gérant : sujet courant = plugin ChatGPT Ads Manager d'OpenAI, distinct de Meta Ads/ADM-003.

## État contrôlé

- Plugin ChatGPT Ads Manager accessible ; aucun compte publicitaire accessible lors du contrôle officiel du 27/10.
- Parcours onboarding : aucune entreprise existante retournée ; création d'une nouvelle entreprise éligible. Aucun compte créé.
- Aperçu officiel : site https://www.mistralpro-reno.fr/ accessible ; France et EUR acceptés.
- Logo proposé par l'aperçu : https://www.mistralpro-reno.fr/images/apple-touch-icon.png ; aucune approbation de ce candidat exact, aucun upload effectué dans cette reprise.
- Paramètres repris du résumé Gérant : Mistral Pro Reno, site ci-dessus, France, euro, Europe/Paris.
- Acceptation finale des conditions publicitaires et politique de confidentialité non obtenue ; aucune facturation ni diffusion engagée.

## Réception des demandes GPT Ads — travail séparé du plugin

- CODE-045 : socle réception/Conversions livré, production contrôlée version code-045.
- CODE-046 : maquette seulement au début de la reprise.
- Implémentation préparée dans backend PR draft #3 : https://github.com/seoettia-collab/facebook-ads-backend/pull/3
- HEAD candidat : 91aaafafa181f86e8c1d22f1b79f44461e686a0d.
- Page prévue /devis-travaux ; six choix exacts Cuisine, Salle de bain, Peinture, Rénovation, Extension, Maison ; prénom, téléphone, code postal, précision facultative.
- Enregistrement transactionnel, provenance, reçu et UUID persistants, absence de passage automatique à contacté ; compatibilité anciens UUID conservée.
- 182 tests Node 20.11.1 réussis par l'agent ; candidat non fusionné, non déployé.
- QA visuelle réelle non effectuée : navigateur headless local indisponible, téléchargement échoué ; ne pas déclarer validé.
- Production : alert_configured=false ; aucun SMS de recette envoyé. Destinataire et SIM doivent être distincts ; aucune configuration modifiée.
- Nouvelle demande du Gérant rétablit l'objectif SMS malgré l'abandon indiqué dans l'ancienne mission CODE-046.
- Aucun n8n.

## Suite à réaliser ici

1. Finaliser le compte ChatGPT Ads Manager par son parcours officiel, sans confondre avec les comptes Meta.
2. Conserver la proposition de logo exacte à faire approuver ; présenter le récapitulatif final avant acceptation des conditions.
3. Contrôler puis déployer le candidat formulaire quand ce lot reprend, effectuer une recette dédiée et vérifier la fiche Conversions précise et l'idempotence.
4. Résoudre la configuration d'alerte et tester le SMS sans inventer de destinataire ni envoyer vers la SIM émettrice.
5. Sous-domaine devis.mistralpro-reno.fr, suivi de conversion ChatGPT et pilotage des campagnes depuis le Dashboard non livrés/non vérifiés.
6. Budget et lancement publicitaire restent à valider explicitement.
