# Message Pilote -> Codeur

MESSAGE-ID : CODE-029
DATE : 2026-10-13
OBJET : IA Reco — n'analyser que les publicités en diffusion

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Le défaut constaté

La campagne a été relancée le 12/10. Deux publicités en diffusion :
« Extension maison en IDF » et « Salle de bain clé en main ».

Le Copilote a produit ce matin, en recommandation **urgente** :

> « Pauser Ad Salle de bain clé en main — 42 jours sans lead généré malgré
> diffusion mature »

**C'est faux, et dangereux.** Cette publicité a été remise en ligne la veille.
Les 42 jours viennent de l'ancienne version, en pause depuis le 01/09. Et
c'est actuellement la **meilleure** des deux : 222 impressions et 7 clics,
contre 64 impressions et 0 clic pour l'extension. Meta lui envoie 85 % du
budget.

Suivre cette recommandation aurait coupé la seule publicité qui fonctionne.

## Décision du Gérant — 13/10/2026

**L'IA Reco n'analyse que les publicités en diffusion.**

Une publicité en pause n'est pas son sujet. Elle peut recommander d'en mettre
une en pause ; elle ne commente pas celles qui le sont déjà.

## Ce qui est demandé

### Partie A — restreindre le périmètre d'analyse

1. Les données envoyées à l'IA pour l'analyse de performance et l'audit ne
   contiennent plus que les publicités **effectivement en diffusion**.
2. Les publicités en pause, archivées ou supprimées sont **exclues du
   contexte**, pas seulement filtrées à l'affichage.
3. Vérifie les deux chemins : l'analyse de performance et l'audit de
   configuration. Les deux alimentent le Copilote.

Attention au statut à utiliser : c'est l'état **effectif** de diffusion qui
compte, pas le statut configuré. Une publicité peut être marquée active sans
diffuser.

### Partie B — ancienneté comptée depuis la remise en diffusion

Le « 42 jours sans lead » vient d'un calcul sur toute la vie de la publicité,
pause comprise.

Une publicité remise en ligne doit être traitée comme **neuve** : l'ancienneté
et les compteurs d'absence de résultat se comptent depuis la reprise de
diffusion, pas depuis la création.

### Partie C — garde-fou sur l'apprentissage

Ajoute dans les règles de l'IA : **aucune recommandation de pause ni de
changement de budget** sur une publicité en diffusion depuis moins de 72
heures. C'est la phase d'apprentissage de Meta ; toute modification la
relance à zéro.

Elle peut la mentionner comme étant en apprentissage. Elle ne peut pas
proposer d'y toucher.

## Ce que tu ne touches pas

- La rédaction assistée, le Studio Pub, le Rédacteur IA
- Le moteur IA lui-même : on change ce qu'on lui donne et ce qu'on lui
  interdit, pas de qui il s'agit
- Les garde-fous existants : mode réduction de budget, HOUSING, D5

## Vérification attendue

Après correction, relance une analyse et confirme que la recommandation
fautive ne réapparaît pas.

## Déploiement

Autorisé pour cette mission.

## Interdits

- Ne touche jamais à ` fb-ads-saas` (`srv-d7139du3jp1c7390flq0`)
- Aucune action réelle sur les publicités : on corrige l'analyse, pas le compte
- Aucune valeur de secret

## Ton rapport

Format D-013, référence `CODE-029`, en remplacement intégral.
Si le hub refuse la publication, pousse sur `code-029-rapport`.

PREUVES : les deux chemins corrigés, le résultat de la nouvelle analyse, et
la confirmation que la recommandation fautive a disparu.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-029
```

ou

```
MISSION NON TERMINÉE — CODE-029
```

— Pilote, facebook-ads
