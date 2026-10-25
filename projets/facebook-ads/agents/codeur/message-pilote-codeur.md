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

**3. La provenance doit être identifiable.**
Site, Facebook, et plus tard ChatGPT Ads. Le Gérant doit voir d'où vient
chaque demande, et les statistiques Facebook ne doivent pas compter des leads
du site.

L'étude signale qu'un lead du site pourrait entrer dans un filtre Facebook et
fausser les chiffres. Vérifie-le.

**4. Pas de doublon entre canaux.**
La même personne qui passe par le site puis par Facebook ne doit pas créer
deux leads. La déduplication actuelle se fait par identifiant Facebook, elle
ne couvre pas les autres canaux.

Si tu ne peux pas la traiter proprement dans ce lot, **dis-le** plutôt que de
livrer une solution approximative sur ce point.

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
