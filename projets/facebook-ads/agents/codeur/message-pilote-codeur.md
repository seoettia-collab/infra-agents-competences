# Message Pilote -> Codeur

MESSAGE-ID : CODE-022
DATE : 2026-10-11
OBJET : Sécuriser le webhook, supprimer l'Auto-SMS, corriger le statut d'envoi

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Sur CODE-021

Rapport précis et utile. Trois constats retenus :

- SMS sortant : fonctionne, nouveau Device ID validé
- SMS entrant : **pas cassé, filtré** — webhook reçu, puis ignoré faute de
  lead correspondant. Comportement normal sur base vide
- Webhook ouvert : `SMS_GATEWAY_TOKEN` absente, toute requête passe

## Partie A — sécuriser le webhook SMS *(priorité)*

`validateWebhookToken()` accepte toute requête quand aucun token n'est
configuré. La campagne va redémarrer sur une base propre : n'importe qui
connaissant l'adresse peut y injecter de faux SMS.

1. **Change le comportement par défaut** : sans token configuré, le webhook
   **refuse**. Un webhook ouvert par défaut est une porte, pas une commodité.
2. **Génère un token**, pose-le dans `SMS_GATEWAY_TOKEN` sur
   `srv-d6cq3hi4d50c73aa1rkg` uniquement.
3. **Configure le même token côté SMSGate**, dans Settings → Webhooks →
   signing. Sans ça, les SMS entrants cesseront d'arriver.
4. Teste : sans token → refus ; bon token → acceptation.

Ne consigne la valeur du token nulle part : ni code, ni rapport, ni log.

Si tu ne peux pas accéder aux réglages de l'application sur le téléphone du
Gérant, **arrête-toi avant l'étape 1** et dis-le : il faut que le téléphone
soit configuré d'abord, sinon on coupe la réception.

## Partie B — supprimer l'envoi automatique de SMS

Décision du Gérant du 11/10/2026 : **plus d'envoi automatique de SMS.** Motif :
les destinataires repèrent les réponses automatiques, et c'est contre-productif
en rénovation.

- Supprime le déclenchement automatique à la création d'un lead
- Supprime le bouton `Auto-SMS ON/OFF` du dashboard et la variable
  `AUTO_SMS_ENABLED` devenue inutile
- **Ne touche à rien d'autre** : la rédaction assistée, l'envoi manuel et le
  Rédacteur IA restent en place. Le Gérant n'a demandé que la suppression de
  l'envoi automatique

## Partie C — statut d'envoi bloqué sur « Pending »

SMSGate confirme `Delivered`, la base reste à `Pending`. Le Gérant ne peut
donc pas savoir si un SMS est arrivé.

Trouve pourquoi le statut final ne remonte pas, corrige si c'est à notre
portée. Si la cause est côté passerelle, dis-le sans tenter de contourner.

## Partie D — nettoyage

Supprime les deux leads de test et le SMS de test créés pour CODE-021. La
base doit revenir à zéro.

## Déploiement

Tu livres les branches testées et tu t'arrêtes. Le Gérant déploiera.
Exception : la pose du token en variable d'environnement, qui fait partie de
la partie A.

## Interdits

- Ne touche jamais à ` fb-ads-saas` (`srv-d7139du3jp1c7390flq0`)
- Aucun appel vocal réel
- Aucun numéro de téléphone complet dans le rapport
- Aucune valeur de secret où que ce soit

## Ton rapport

Format D-013, référence `CODE-022`, en remplacement intégral.
PREUVES : comportement du webhook avant et après, confirmation que le token
est posé des deux côtés, ce qui a été retiré pour l'Auto-SMS, cause du statut
Pending, état de la base après nettoyage.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-022
```

ou

```
MISSION NON TERMINÉE — CODE-022
```

— Pilote, facebook-ads
