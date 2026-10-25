# Message Pilote -> Codeur

MESSAGE-ID : CODE-046
DATE : 2026-10-25
OBJET : Page de formulaire dans le backend — maquette d'abord

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Sur CODE-045

Les deux points acquis sont les bons : la demande survit à une panne de SMS,
et la provenance fonctionne avec le filtre ChatGPT Ads déjà déclaré. Tu as
aussi eu raison de signaler la limite de déduplication plutôt que de
bricoler une fusion risquée.

**Décision du Gérant : l'alerte SMS est abandonnée.**

> « Dès qu'il envoie le formulaire, tous les détails atterrissent sur
> Conversions comme Messenger. On fait le suivi de la même façon. »

Le point 2 de CODE-045 est donc clos : plus de destinataire à configurer,
plus de risque que la passerelle s'envoie un SMS à elle-même. La file
d'alerte que tu as construite peut rester en place, inactive, ou être
retirée — à ton appréciation, dis ce que tu choisis.

La déduplication partielle reste une limite connue et acceptée.

## Ce qui est demandé — maquette d'abord

Une page de formulaire **servie par le backend**, qui écrit directement en
base. Pas de dépendance au dépôt du site, pas de transport intermédiaire.

**Tu livres d'abord une maquette**, le Gérant valide, tu construis ensuite.
C'est la décision D-025 : le Codeur maquette, le Pilote contrôle, le Gérant
valide.

## Le principe directeur

> « Le formulaire ne doit pas être compliqué, il doit être conversionnel. »

Chaque champ en plus fait perdre des demandes. Rien de superflu.

## Contenu

**Champs d'identité** — formulaire standard :

- Nom
- Téléphone
- Adresse ou code postal

**Les travaux** — cases à cocher, plusieurs choix possibles.

**Six choix, pas un de plus.** Liste arrêtée par le Gérant :

```
Cuisine · Salle de bain · Peinture · Rénovation · Extension · Maison
```

Seize corps d'état avaient d'abord été envisagés. Le Gérant a tranché pour
six : un prospect qui arrive sur téléphone ne lit pas seize lignes. Le reste
se qualifie au téléphone, c'est là que le vrai tri se fait.

**N'en ajoute aucun.** Le champ libre accueille ce qui n'entre pas dans ces
six.

**Un champ libre** pour préciser le projet.

Rien d'autre. Pas d'email si le Gérant ne l'a pas demandé — téléphone direct.

## Exigences

- **Mobile d'abord.** La publicité ChatGPT amènera des visiteurs sur
  téléphone.
- Les travaux cochés sont **tous conservés**, pas seulement le premier
- La provenance est capturée : paramètres d'URL de la campagne, pour
  distinguer ChatGPT Ads d'une visite directe. Le mécanisme existe depuis
  CODE-045, réutilise-le
- La demande arrive dans **Conversions**, au même endroit que les leads
  Facebook et Messenger
- Après l'envoi : une confirmation claire, avec le numéro de l'entreprise et
  le délai de rappel. Le numéro est dans le contexte métier, ne l'écris pas
  en dur
- Aucune mention d'âge, de genre ni de démographie — contrainte HOUSING

## Un point de crédibilité à traiter

Une page servie sur une adresse `onrender.com` inspire moins confiance que le
site de l'entreprise. Pour du gros œuvre à plusieurs milliers d'euros, ça
compte.

Compense par la sobriété et les éléments vérifiables : nom de l'entreprise,
zone d'intervention, garantie décennale, numéro de téléphone visible. Pas de
promesse, pas d'argument de vente — un formulaire propre et sérieux.

## Ce que tu ne fais pas

- Aucune modification du site `MistralPro-Reno` ni de sa demande de fusion
- Aucun appel à OpenAI, aucun pixel, aucune conversion
- Aucune régression sur les leads Facebook et Messenger

## Déploiement

**Pas encore.** Tu livres la maquette et tu t'arrêtes. Le Gérant valide avant
construction.

## Interdits

- Ne touche jamais à ` fb-ads-saas` (`srv-d7139du3jp1c7390flq0`)
- Aucune donnée personnelle dans le rapport
- Aucune valeur de secret

## Ton rapport

Format D-013, référence `CODE-046`.
Si le hub refuse la publication, pousse sur `code-046-rapport`.

Dépose la maquette dans :

```
projets/facebook-ads/documentation/maquettes/
```

Autonome, lisible dans un navigateur, aux couleurs existantes du dashboard.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-046
```

ou

```
MISSION NON TERMINÉE — CODE-046
```

— Pilote, facebook-ads
