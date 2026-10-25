# Message Pilote -> Codeur

MESSAGE-ID : CODE-045
DATE : 2026-10-25
OBJET : Recevoir les demandes du formulaire du site dans Conversions

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Sur CODE-044

Validé. Aperçu mobile réaliste, numéro ajouté depuis le contexte métier,
aucune publicité modifiée. Le Gérant a republié lui-même.

## La demande du Gérant

> « Dans Conversions, il me faut pouvoir recevoir des prospects de mon
> formulaire. »

Aujourd'hui, le dashboard ne reçoit que les leads Facebook. Les demandes
faites depuis le site `mistralpro-reno.fr` n'y arrivent pas.

## Lis d'abord l'étude

```
projets/facebook-ads/documentation/ETUDE-GPT-ADS.md
```

Le Diagnostic a établi l'état de l'existant et relevé quatre pièges. Ils sont
repris ci-dessous, mais l'étude contient les détails et les références.

## Ce qui est demandé

Une demande faite sur le site arrive dans Conversions, au même endroit que les
leads Facebook, et le Gérant reçoit un SMS d'alerte.

Champs à conserver : **prénom, téléphone, code postal, tous les travaux
choisis** — le formulaire permet plusieurs choix — et la précision libre si
elle existe.

## Les quatre pièges — relevés par le Diagnostic

**1. La demande est enregistrée AVANT le SMS.**
Si l'envoi du SMS échoue, la demande doit rester en base et rester visible.
Un prospect ne se perd jamais parce qu'un SMS n'est pas parti. Et un échec
d'envoi ne doit pas faire resoumettre la demande.

**2. L'alerte au Gérant n'est pas un SMS au prospect.**
Ce sont deux choses différentes. L'étude signale qu'une alerte passée par la
route des prospects marquerait le lead « contacté » alors que le Gérant ne
l'a pas appelé. **Ce serait un faux statut, et c'est inacceptable** : il
rappellerait moins vite quelqu'un qu'il croit avoir contacté.

**3. La provenance doit être identifiable — point élargi par le Gérant.**

Le Gérant a précisé son objectif : **GPT Ads sera un quatrième canal**, à
côté de Messenger, SMS et Leads Facebook. Avec le même traitement : réception,
suivi, contact, devis.

Différence technique : ChatGPT n'a pas de formulaire natif comme Facebook. Une
publicité ChatGPT enverra le prospect **vers le site**, et c'est le formulaire
du site qui collectera. La chaîne sera donc :

```
publicité ChatGPT -> site -> formulaire -> dashboard
```

Conséquence pour ce lot : la provenance ne doit pas être un simple
« site / Facebook ». Il faut pouvoir distinguer **un visiteur venu de ChatGPT
Ads d'un visiteur venu directement sur le site**, sinon le Gérant ne saura
jamais quel canal paie.

Prévois cette distinction dès maintenant : si le formulaire reçoit une marque
d'origine — paramètre d'URL ou équivalent — elle doit être conservée et
visible dans Conversions. OpenAI documente un modèle de paramètres pour ses
campagnes ; il suffit que le dashboard sache les recevoir.

**Tu n'as rien à construire côté ChatGPT dans ce lot.** Tu prépares seulement
le dashboard à recevoir et distinguer l'origine.

Les statistiques Facebook ne doivent compter aucun lead du site, quelle que
soit son origine.

L'étude signale qu'un lead du site pourrait entrer dans un filtre Facebook et
fausser les chiffres. Vérifie-le.

**4. Pas de doublon de prospect — mais aucune demande perdue.**

Précision du Gérant, importante : **l'anti-doublon ne rejette pas la
nouvelle demande.** Il la rattache au prospect existant.

Une même personne peut revenir avec **un autre projet** — une salle de bain
cette année, une cuisine l'an prochain. Ce n'est pas un doublon, c'est un
nouveau projet. Et elle peut revenir par un autre canal.

Attendu :

- un seul prospect dans la liste, pas deux fiches pour la même personne
- **chaque demande conservée** dans sa fiche, avec sa date, son projet et sa
  provenance
- l'historique lisible : qui a demandé quoi, quand, et par quel canal

Rejeter une demande au motif qu'elle ressemble à une précédente ferait perdre
un vrai projet. C'est le défaut à éviter.

La déduplication actuelle se fait par identifiant Facebook et ne couvre pas
les autres canaux.

Si tu ne peux pas traiter ce point proprement dans ce lot, **dis-le** plutôt
que de livrer une solution approximative — mais dans ce cas, livre au
minimum la conservation de toutes les demandes, quitte à laisser deux fiches.

## Ce qui n'est pas dans ce lot

- **Rien qui concerne OpenAI ou ChatGPT Ads.** Autre sujet, autre moment.
- n8n : l'étude indique que la demande de fusion du site y envoie les données.
  Cette destination n'est pas retenue. La demande doit aller au dashboard.
- Le pixel, les conversions, le suivi publicitaire

## Ce que tu ne touches pas

- La réception des leads Facebook : **aucune régression** n'est acceptable,
  elle produit des leads tous les jours
- Les garde-fous : HOUSING, D5, mode réduction, protection 72 heures
- L'IA Reco, le Studio Pub

## Ce lot ne suffit pas à recevoir les demandes

À dire clairement pour éviter un malentendu : ce lot **prépare la réception
dans le dashboard**. Tant que le formulaire du site n'est pas raccordé, aucune
demande n'arrivera réellement.

Le raccordement du site, le test réel de réception et du SMS viendront après,
dans un autre lot.

## Le formulaire du site

Une demande de fusion existe, en brouillon :

```
https://github.com/seoettia-collab/MistralPro-Reno/pull/1
```

Lis-la pour connaître les champs. **Ne la fusionne pas.** Si le site doit être
modifié pour envoyer au dashboard, décris ce qu'il faut changer et attends.

## Déploiement

Autorisé côté dashboard. **Aucune modification du site sans ordre.**

## Interdits

- Ne touche jamais à ` fb-ads-saas` (`srv-d7139du3jp1c7390flq0`)
- Aucun SMS réel vers un prospect pendant les tests
- Aucune donnée personnelle dans le rapport
- Aucune valeur de secret

## Ton rapport

Format D-013, référence `CODE-045`.
Si le hub refuse la publication, pousse sur `code-045-rapport`.

PREUVES : comment la demande survit à un échec de SMS, comment l'alerte
Gérant se distingue du SMS prospect, où la provenance est stockée, et ce que
tu as pu ou non traiter sur les doublons.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-045
```

ou

```
MISSION NON TERMINÉE — CODE-045
```

— Pilote, facebook-ads
