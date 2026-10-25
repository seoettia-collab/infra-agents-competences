# Message Pilote -> Diagnostic

MESSAGE-ID : DIAG-008
DATE : 2026-10-25
OBJET : Étude d'intégration d'un module GPT Ads — référence Gérant GPT-ADS-001

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Sur DIAG-007

Bon travail, et courageux : tu as rapporté que la mention « généré par IA »
peut faire baisser la confiance, alors que le Gérant l'a imposée. Et tu as
refusé de classer les formats faute de données. C'est ce qu'on attend.

## Directive du Gérant — GPT-ADS-001

> Étudier l'ajout d'un module « GPT Ads » dans l'application Facebook
> Dashboard, en réutilisant les fonctions existantes de gestion des prospects
> et de SMS.

Parcours souhaité :

1. Le client remplit le formulaire du site Mistral Pro Reno : salle de bain,
   cuisine, peinture, rénovation complète ou autres travaux, plusieurs choix
   possibles
2. La demande est enregistrée dans le Dashboard avec prénom, téléphone, code
   postal et travaux choisis
3. Une alerte SMS est envoyée au Gérant après enregistrement
4. Le prospect est suivi jusqu'au devis et au chantier signé

**Étude uniquement.** Aucune modification de production, aucun SMS réel,
aucune activation publicitaire.

## Ce que le Pilote a déjà vérifié — ne le refais pas

- L'Ads Manager d'OpenAI existe : bêta ouverte le 05/05/2026 sur
  `ads.openai.com`, sans minimum de dépense
- Une API existe : `api.ads.openai.com`, clé générée depuis les réglages de
  l'Ads Manager. Campagnes, groupes, publicités, rapports
- Un pixel et une API de conversions existent
- **ChatGPT Ads s'est étendu à 26 nouveaux pays le 21/10/2026**

## Les cinq points

**1. La France est-elle éligible ? — question décisive.**
L'extension du 21/10 inclut-elle la France ? Sans éligibilité, le volet
publicitaire de l'étude est théorique. **Traite ce point en premier et
dis-le clairement.**

**2. L'état de l'existant côté dashboard.**
Ce qui est déjà en place et réutilisable pour le parcours décrit :
enregistrement d'un prospect, champs disponibles, suivi jusqu'au devis.
Nomme les routes et les tables, ne décris pas en général.

**3. Le circuit SMS.**
Distingue l'alerte au Gérant du SMS au prospect. Le projet utilise SMSGate
pour les SMS et Twilio pour la voix. Que faut-il pour une alerte au Gérant à
l'enregistrement d'une demande, et qu'est-ce qui existe déjà ?

Point à traiter : **que devient la demande si le SMS échoue ?** Elle doit être
conservée. Vérifie si c'est le cas aujourd'hui pour les leads Facebook.

**4. Le formulaire du site.**
Un formulaire est préparé dans ce dépôt, demande de fusion n° 1 :

```
https://github.com/seoettia-collab/MistralPro-Reno/pull/1
```

Lis-la. Que fait ce formulaire, quels champs, où envoie-t-il ses données,
qu'est-ce qui manque pour qu'il alimente le dashboard ?

Et : **comment identifier la provenance** d'une demande — site, ChatGPT Ads,
Facebook — et **éviter les doublons** si la même personne passe par deux
canaux.

**5. L'API publicitaire d'OpenAI — ce qu'elle permet vraiment.**
Campagnes, dépenses, conversions : qu'est-ce qui est lisible, qu'est-ce qui
est modifiable. **Et ses limites**, qui sont le vrai sujet : ce qu'elle ne
permet pas, ce qui est encore en développement, ce qui demande une
autorisation particulière.

## Le livrable

Comme demandé par le Gérant :

- **état de l'existant** — ce qui fonctionne aujourd'hui
- **éléments réutilisables** — ce qu'on ne refait pas
- **accès manquants** — ce qu'il faut obtenir, et auprès de qui
- **premier lot de réalisation précis** — le plus petit ensemble qui produise
  quelque chose d'utile, pas un plan complet

## Règles de jugement

- Cite tes sources avec leur date pour tout ce qui concerne OpenAI
- Pour le code, cite le fichier
- `[SÛR]` ou `[À VÉRIFIER]` sur chaque constat
- **Si la France n'est pas éligible, dis-le en tête** et traite le reste
  comme une préparation, pas comme un projet lançable

## Ce que tu ne fais pas

- Aucune modification de code, aucune branche, aucun commit sur un dépôt de
  code
- Aucun SMS réel, aucune création de compte publicitaire
- Aucune solution technique détaillée : tu dis ce qui est possible et ce qui
  manque, le « comment » appartient au `codeur`

## Où écrire

```
projets/facebook-ads/documentation/ETUDE-GPT-ADS.md
```

Si le hub refuse l'écriture, pousse sur `diag-008-rapport`.

## Ton rapport

Format D-013, référence `DIAG-008`. Une page au plus.

## Ta réponse à l'écran

```
MISSION TERMINÉE — DIAG-008
```

ou

```
MISSION NON TERMINÉE — DIAG-008
```

— Pilote, facebook-ads
