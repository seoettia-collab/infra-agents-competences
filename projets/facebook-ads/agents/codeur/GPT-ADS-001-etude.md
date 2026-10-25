GPT-ADS-001 | 2026-10-25 | v1.0
VERDICT : OK — Étude terminée ; intégration réalisable sans n8n, raccordement non livré.

| N° | Point demandé | OK / NON | Ce qu’on a vu (1 ligne) | Ce qu’il faut (1 ligne) |
|---|---|---|---|---|
| 1 | Formulaire multichoix du site | OK | PR nº 1 ouverte, non fusionnée ; cinq travaux et trois champs présents, ancienne URL n8n dans le code. | Remplacer cette URL par une réception directe du Dashboard. |
| 2 | Enregistrement et provenance | NON | SQLite/CRM réutilisables ; aucune route de réception de ce formulaire, ni clé de soumission persistante. | Valider côté serveur, enregistrer demande + provenance et dédoublonner les reprises. |
| 3 | Alerte SMS après enregistrement | NON | SMSGate principal, Twilio disponible dans le code ; route actuelle destinée au prospect. | Alerte gérant séparée, destinataire configuré, file durable indépendante du résultat SMS. |
| 4 | Suivi jusqu’au devis/chantier | OK | Fiche, notes, statuts et « devis signé » existants ; pas de raccordement OpenAI Ads. | Réutiliser le CRM ; ajouter « devis envoyé » et corriger sa synthèse des signatures. |
| — | Campagnes, dépenses, conversions OpenAI | NON | API officielle documentée ; aucun compte accessible retourné par le connecteur. | Compte/droits et clé Ads côté serveur ; mesure publicitaire en lot distinct autorisé. |

DÉFAUTS À CORRIGER
1. La PR envoie vers une URL n8n alors que le Gérant confirme l’absence de n8n dans le système.
2. Réutiliser la route SMS prospect pour une alerte gérant fausserait le statut « contacté » ; automatismes historiques à exclure des nouvelles demandes.
3. Anti-doublon serveur, conservation durable et provenance publicitaire restent à construire.
4. Numéro public du site et destinataire d’alerte à distinguer ; accès OpenAI Ads non établi.

NON FAIT
Aucun code applicatif modifié, aucune fusion/déploiement, aucun formulaire envoyé, aucun SMS ni activation publicitaire ; étude uniquement.

FICHIERS
projets/facebook-ads/agents/codeur/GPT-ADS-001-etude.md
projets/facebook-ads/agents/codeur/annexe-gpt-ads-001.md
projets/facebook-ads/agents/codeur/preuves-gpt-ads-001.json

MISSION TERMINÉE — GPT-ADS-001 / OK (étude) / projets/facebook-ads/agents/codeur/GPT-ADS-001-etude.md
