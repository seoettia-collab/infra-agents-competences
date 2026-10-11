# Message Pilote -> Codeur

MESSAGE-ID : CODE-024
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

## ACCÈS GITHUB

Les dépôts de code sont **privés**. Le hub est public, c'est pourquoi tu peux
le lire sans authentification.

Le token se trouve dans ta compétence `acces-repos-github`. Il n'est pas
recopié ici : le hub est public, un secret écrit dedans serait lisible par
tous, et GitHub refuse ce genre de commit.

```
git config --global user.name "Ricardo ETTIA"
git config --global user.email "ricardoettiadocuments@gmail.com"

git clone https://seoettia-collab:<TOKEN>@github.com/seoettia-collab/facebook-ads-backend.git
```

Même forme d'URL pour le `push`.

Si tu n'as pas accès à cette compétence, **arrête-toi et demande le token au
Gérant** plutôt que de rendre une mission vide.

## SUR LA VERSION DE NODE

Tu rapportes tourner sous Node 24.19.0, la mission demande 20.11.1.

Si tu peux installer 20.11.1, fais-le. **Si tu ne peux pas, ne fais pas
semblant** : teste sous la version dont tu disposes, dis-le clairement dans
ton rapport, et signale toute différence de comportement.

Un test honnête sous la mauvaise version vaut mieux qu'un test annoncé sous
la bonne et jamais exécuté. Les tests du dépôt passent sous Node 22, c'est
vérifié par le Pilote.


## Partie A — sécuriser le webhook SMS *(priorité)*

**Le blocage de CODE-022 est levé.** Ton arrêt était justifié : tu n'avais pas
accès au téléphone, et fermer le webhook avant lui aurait coupé la réception.

Fait par le Pilote et le Gérant :
- un token a été généré
- il est posé dans la **Signing Key** de SMSGate sur le téléphone
- il est posé dans `SMS_GATEWAY_TOKEN` sur `srv-d6cq3hi4d50c73aa1rkg`

Les deux côtés portent donc la même valeur. **Ne la régénère pas, ne la
remplace pas, ne la consigne nulle part.**

Il te reste une seule chose à faire sur cette partie :

1. **Change le comportement par défaut** de `validateWebhookToken()` : sans
   token configuré, le webhook **refuse**. Un webhook ouvert par défaut est
   une porte, pas une commodité.
2. Teste : requête non signée → refus ; signature valide → acceptation.
3. Vérifie que les SMS entrants arrivent toujours après ton changement. Si la
   réception casse, **reviens en arrière immédiatement** et rapporte.

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
Le token est déjà posé, tu n'as pas de variable à créer.

## Interdits

- Ne touche jamais à ` fb-ads-saas` (`srv-d7139du3jp1c7390flq0`)
- Aucun appel vocal réel
- Aucun numéro de téléphone complet dans le rapport
- Aucune valeur de secret où que ce soit

## Ton rapport

Format D-013, référence `CODE-024`, en remplacement intégral.
PREUVES : comportement du webhook avant et après, confirmation que le token
est posé des deux côtés, ce qui a été retiré pour l'Auto-SMS, cause du statut
Pending, état de la base après nettoyage.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-024
```

ou

```
MISSION NON TERMINÉE — CODE-024
```

— Pilote, facebook-ads
