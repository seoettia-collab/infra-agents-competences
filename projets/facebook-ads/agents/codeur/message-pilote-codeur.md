# Message Pilote -> Codeur

MESSAGE-ID : CODE-020
DATE : 2026-10-11
OBJET : Sécuriser le webhook SMS entrant et nettoyer les variables orphelines

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Sur CODE-019

Audit complet et utile. La réponse sur le renommage est claire : pas de
renommage sans domaine personnalisé préalable. Le Gérant valide, le sujet est
reporté.

## Ce qui est demandé

### Partie A — le webhook SMS *(priorité, bloquant pour la relance)*

`SMS_GATEWAY_TOKEN` est absente du service de production. Conséquence relevée
par ton audit : la validation du webhook devient permissive, les requêtes sont
acceptées sans secret.

La campagne va redémarrer et la base vient d'être vidée. Un faux SMS entrant
injecterait des données dans une base propre.

1. **Lis d'abord le code** de validation : que se passe-t-il exactement quand
   la variable est absente ? Rejet, acceptation, avertissement ?
2. **Décide du bon comportement** : à mon sens, l'absence de secret doit
   entraîner un **refus**, pas une tolérance. Un webhook ouvert par défaut est
   une porte, pas une commodité. Si tu vois une raison technique de faire
   autrement, dis-la dans ton rapport plutôt que de l'appliquer.
3. **Génère un token** et pose-le sur le service de production
   `srv-d6cq3hi4d50c73aa1rkg` uniquement.
4. **Vérifie côté passerelle SMS** que l'envoi utilise bien ce token, sinon
   les SMS entrants cesseront d'arriver. C'est le risque principal de cette
   partie : un webhook sécurisé mais plus alimenté.
5. Teste : sans token → refus ; avec le bon token → acceptation.

**Ne consigne jamais la valeur du token**, ni dans le code, ni dans le
rapport, ni dans un log.

### Partie B — variables orphelines

Supprimer sur `srv-d6cq3hi4d50c73aa1rkg` : `PURGE_ENABLED`,
`ALLOWED_ORIGINS`, `FB_APP_ID`.

Avant chaque suppression, vérifie une dernière fois qu'aucune lecture ne
subsiste dans le code. Si l'une d'elles est utilisée quelque part, garde-la et
signale-le.

Si le connecteur ne sait pas supprimer une variable isolée, dis-le et liste
les noms pour que le Gérant les retire à la main.

### Hors périmètre, à ne pas traiter

Le site vitrine, le SaaS gelé et Mistral Devis sont d'autres projets. Ton
audit les a documentés, c'est suffisant. **N'y touche pas.**

## Interdits

- Ne touche qu'au service `srv-d6cq3hi4d50c73aa1rkg`
- Aucun renommage de service
- Aucune valeur de secret dans le code, le rapport ou les logs
- Si la partie A risque de couper la réception des SMS, **arrête-toi et
  rapporte** plutôt que de déployer

## Ton rapport

Format D-013, référence `CODE-020`, en remplacement intégral.
PREUVES : comportement du code avant et après, résultat des deux tests,
variables effectivement supprimées, et confirmation que la passerelle SMS
transmet bien le token.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-020
```

ou

```
MISSION NON TERMINÉE — CODE-020
```

— Pilote, facebook-ads
