# Message Pilote -> Codeur

MESSAGE-ID : CODE-025
DATE : 2026-10-11
OBJET : Déployer CODE-023 et purger les échanges Messenger restants

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Sur CODE-023

Bon travail : webhook fermé par défaut, Auto-SMS retiré, statut Pending
corrigé, 75 tests verts. Et tu as signalé les 130 échanges Messenger que la
purge de ce matin n'avait pas pris — c'était juste de le dire.

**Point de méthode** : publier ton rapport dans ta boîte du hub ne demande
aucune autorisation, c'est ton espace. Ce qui exige l'ordre du Gérant, c'est
le merge du **code** vers `main`. Ne confonds plus les deux : un rapport
bloqué, c'est une mission perdue.

## ORDRE DU GÉRANT — 11/10/2026

**Déploiement autorisé.** Et suppression définitive des 130 échanges
Messenger restants, sans archivage.

## Partie A — déployer CODE-023

Branches `code-023-sms-manuel` : backend `e14a499`, frontend `4e6e02b`.

1. Rebase sur `origin/main`, rejoue les tests
2. Merge vers `main` des deux dépôts
3. Laisse l'auto-déploiement faire. **Ne déclenche pas de déploiement manuel.**
4. Vérifie `/health`
5. Appelle `/debug/sms-webhooks` et active les abonnements manquants, comme
   ton rapport le prévoit
6. Vérifie qu'un envoi manuel passe bien de Pending à Delivered

## Partie B — vérifier la réception réelle

Le point A3 de ton rapport est resté ouvert : la réception n'a jamais été
testée en production après fermeture du webhook.

**C'est le point le plus risqué de la mission.** Si la signature ne
correspond pas entre le téléphone et le serveur, les SMS entrants s'arrêtent
sans message d'erreur.

1. Demande au Gérant d'envoyer un SMS au numéro de la passerelle
2. Vérifie qu'il arrive jusqu'en base
3. **S'il n'arrive pas : reviens en arrière immédiatement** et rapporte.
   Mieux vaut un webhook ouvert qu'une réception coupée

## Partie C — purger les échanges Messenger

Supprime définitivement les 130 échanges Messenger restants.

- Même méthode que la purge de ce matin : transaction atomique, confirmation
  explicite, comptage avant et après
- **Ne touche à aucune autre table.** Les tables protégées sont les mêmes :
  publications, analyses, contexte de campagne, contexte de pub, relevés de
  métriques, événements webhook, configuration
- Si tu dois reposer une route temporaire, applique les mêmes verrous que
  CODE-015 et **retire-la immédiatement après**
- Si ton outil refuse l'appel destructeur comme en CODE-014, arrête-toi et
  dis-le : le Pilote l'exécutera

## Partie D — état final

Confirme par un comptage : leads, communications, conversations, messages,
notes. Tout doit être à zéro.

## Interdits

- Ne touche jamais à ` fb-ads-saas` (`srv-d7139du3jp1c7390flq0`)
- Aucune suppression côté Facebook ni Meta
- Aucune table hors périmètre
- Aucune donnée personnelle dans le rapport : des nombres
- Aucune valeur de secret où que ce soit

## Ton rapport

Format D-013, référence `CODE-025`, en remplacement intégral.
PREUVES : hash des deux merges, `/health`, résultat du test de réception
réelle, comptages avant et après, état final à zéro.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-025
```

ou

```
MISSION NON TERMINÉE — CODE-025
```

— Pilote, facebook-ads
