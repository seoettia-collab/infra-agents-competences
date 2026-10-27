# ADM-003 — Reprise centralisée du 27 octobre 2026

Source : backend de production existant, lectures authentifiées des routes `GET /api/ai/publish/leadgen-forms` et `GET /api/facebook/ads?limit=100`.
Relevé : 27/10/2026 à 20:29:53 UTC (21:29:53 Europe/Paris).
Compte unique act_1485808979635813 ; Page 921876644351567 ; aucun prospect lu ; aucune mutation Meta.
8 formulaires retournés au total dont les 3 actifs demandés ; pas de page suivante d'annonces signalée (7 annonces publiées).

| Formulaire | Création UTC | Statut | Champs exacts | Utilisation publiée actuelle |
|---|---|---|---|---|
| 29280659928195002 — Demande de devis Mistral Pro | 22/10/2026 18:01:29 | ACTIVE | votre_projet_en_2_mots_?, full_name, phone_number, email | Aucun des 7 objets retournés |
| 4714720915406381 — Demande de devis Mistral Pro (v1) | 19/10/2026 19:39:48 | ACTIVE | full_name, phone_number, email, company_name | Extension maison en IDF, PAUSED |
| 1644308539841274 — Devis Rénovation IDF - v4 Court | 24/04/2026 19:39:15 | ACTIVE | quel_type_de_projet_avez-vous_?, _code_postal_, phone_number, email, full_name, inbox_url | Salle de bain ACTIVE et cinq autres annonces PAUSED |

La publicité Salle de bain `120248281347920417` utilise actuellement `1644308539841274` et la création `1433746288177863`.
La publicité Extension `120248878541540417` est en pause et utilise `4714720915406381`.
Il serait faux de considérer deux formulaires comme sans rattachement : seul `29280659928195002` n'apparaît dans aucune des 7 annonces retournées ; le formulaire v1 reste rattaché à Extension en pause.
Les nouveaux formulaires n'ont pas les mêmes champs : celui du 22/10 inclut une question libre sur le projet mais aucun code postal ; celui du 19/10 comporte company_name.
L'ancien formulaire rattaché à Salle de bain contient bien le code postal et le type de projet. Cela ne prouve pas que leurs réponses sont correctement reçues ou affichées dans le Dashboard ; aucune donnée de lead n'a été lue.
Créateur et duplication automatique : non établis par les données actuelles disponibles.
Écran de remerciement et téléphone : pas exposés par la route en production au relevé ; correctif de lecture en cours de contrôle, sans mutation Meta.
Les règles documentaires des points 4/5/7/8 ci-dessous restent celles vérifiées le 25/10 ; aucune modification ni archivage n'a été exécuté.
Preuve complète : `preuves-adm-003/constats.json`.

---

## Archive du relevé du 25 octobre — ne pas utiliser comme état actuel

# ADM-003 — formulaires de prospects, complément du 25 octobre 2026

Mission, fiche et gouvernance relues au commit `f92397b794110267c76cdec46bc60a29bfccb0c4`. Compte unique : `act_1485808979635813`. Lecture seule ; aucune donnée personnelle de prospect dans les preuves.

## 1. Inventaire : sources et limites

Les noms et IDs suivants viennent de la mission du Pilote. Le connecteur Meta n'expose pas les questions, écrans de fin ou associations formulaire/publicité. La lecture de l'interface a été tentée, mais la connexion n'a pas abouti. Aucun aperçu de formulaire n'a été lu pendant ADM-003.

| ID | Nom indiqué par le Pilote | Statut / création actuels | Champs exacts actuels | Publicités utilisatrices actuelles |
|---|---|---|---|---|
| 29280659928195002 | Demande de devis Mistral Pro | Non vérifiés | Non vérifiés | Non vérifiées |
| 4714720915406381 | Demande de devis Mistral Pro (v1) | Non vérifiés | Non vérifiés | Non vérifiées |
| 1644308539841274 | Devis Rénovation IDF - v4 Court | Non vérifiés | Non vérifiés | Non vérifiées |

Le Pilote indique que le formulaire en service collecte `full_name`, `email`, `phone_number`, `company_name`, sans code postal ni projet. C'est un constat transmis, pas une relecture indépendante des champs par ID.

Repère historique uniquement : `agents/codeur/preuves-code-042/api-formulaires.json`, relevé du 19/10/2026 à 20:23:16 UTC, décrivait `4714720915406381` ACTIVE, créé le 19/10/2026 à 19:39:48 UTC, et `1644308539841274` ACTIVE, créé le 24/04/2026 à 19:39:15 UTC. Le premier portait alors le nom sans suffixe « (v1) ». Salle de bain y utilisait `1644308539841274`, avec une autre création publicitaire que celle observée aujourd'hui. Ce relevé ne prouve aucun statut, nom ou rattachement actuel. Il ne listait pas `29280659928195002` ; cela ne permet pas d'en déduire sa date de création.

## 2. Publicités : observation directe Meta

Lecture du 25/10/2026, niveau publicité, objets live, limite 100 : sept objets retournés, sans pagination signalée. Les objets live comprennent les annonces publiées en pause.

| Publicité | ID | Statut / statut effectif | Création actuelle | Formulaire actuel |
|---|---|---|---|---|
| Salle de bain clé en main | 120248281347920417 | ACTIVE / ACTIVE | 1105700332173829 | Non exposé |
| Extension maison en IDF | 120248878541540417 | PAUSED / PAUSED | 1130229799713439 | Non exposé |

La mission cite deux publicités actives ; Extension est en pause au moment de la lecture. Les cinq autres publicités retournées sont en pause ; leurs IDs sont dans la preuve JSON. Un formulaire ACTIVE n'est pas nécessairement utilisé par une annonce ACTIVE. Contrôler aussi les publicités en pause avant de déclarer un ancien formulaire inutilisé.

## 3. Origine des doublons

Journal demandé du 01/10/2026 à 00:00 UTC au 26/10/2026 à 00:00 UTC, limite 1 000 : 135 événements retournés. Aucune occurrence des trois IDs, aucun événement explicite de création de formulaire repéré. Des changements de créations publicitaires ne prouvent pas une duplication de formulaire.

Cette lecture ne couvre pas avril et ne remplace pas un journal de Page ou de formulaires. Elle ne permet d'établir ni créateur ni date de création. Le Gérant explique avoir créé un formulaire pour ajouter son téléphone au remerciement ; c'est son explication, compatible avec la procédure Meta, sans preuve de duplication automatique. Deux noms proches ou un suffixe « v1 » ne suffisent pas à la démontrer.

## 4 et 7. Peut-on corriger le formulaire publié ?

Selon [Meta — Modifier une publicité à formulaire instantané](https://www.facebook.com/business/help/1025066254239352), un formulaire publié ne peut pas être édité. Un brouillon peut l'être. Pour un formulaire publié, Meta prévoit une duplication, la modification de la copie puis son enregistrement comme nouveau formulaire.

Il faut donc une nouvelle version pour réunir nom, téléphone, code postal et type de projet, sans `company_name`, avec le téléphone de l'entreprise sur l'écran final. Ajouter ou retirer ces champs directement sur le formulaire publié en service n'est pas possible. Vérifier l'écran final de la nouvelle version avant toute décision de publication et de rattachement. Aucune création ou duplication exécutée.

## 5. Apprentissage et coût

[Meta — Modifications significatives et phase d'apprentissage](https://www.facebook.com/business/help/316478108955072) distingue les modifications significatives des autres : un changement de création publicitaire est significatif. [Meta — À propos de la phase d'apprentissage](https://www.facebook.com/business/help/112167992830700) situe l'apprentissage au niveau de l'ensemble ; la diffusion peut devenir moins stable après une modification significative.

Le compte rendu CODE-042 décrit un changement de formulaire par remplacement de création publicitaire. Pour ce parcours, prévoir une reprise d'apprentissage de l'ensemble : c'est une déduction fondée sur le changement de création, pas une modification exécutée pendant ADM-003. L'affirmation « toute modification remet toute la campagne à zéro » est trop générale. Aucun nombre de jours perdus ni surcoût en euros ne peut être garanti à partir des preuves disponibles.

## 6. Téléphone de remerciement

[Meta — Ajouter un message de fin aux prospects](https://www.facebook.com/business/help/314132612401196) décrit le bouton « Call business », qui permet de renseigner un numéro appelable depuis un mobile. Un numéro écrit dans le texte et le numéro associé au bouton sont deux éléments distincts à contrôler.

La présence réelle et la valeur du téléphone dans le formulaire actuel restent **non vérifiées**. Le souhait du Gérant ne prouve pas que le bon formulaire est rattaché à l'annonce. Lire l'aperçu final de chaque formulaire, le texte et la destination du bouton, sans remplir ni soumettre de demande.

## 8. Anciens formulaires et demandes conservées

[Meta — Archiver un formulaire instantané](https://www.facebook.com/business/help/1775418956032234) décrit l'archivage dans la bibliothèque : le formulaire sort de la liste habituelle de sélection ; le filtre des formulaires archivés permet de le retrouver et de le réactiver. Cette réversibilité est documentée. La source ne permet pas de promettre que l'archivage arrête une annonce encore rattachée ou constitue une sauvegarde permanente des demandes.

[Meta — À propos des prospects expirés](https://www.facebook.com/business/help/1526849577619206) limite leur téléchargement à 90 jours après soumission. Un total historique visible ne signifie pas que les données restent téléchargeables. L'archivage n'étend pas ce délai.

Proposition à faire autoriser dans une mission ultérieure : conserver un seul formulaire pour les nouvelles demandes, puis archiver les anciens plutôt que les supprimer, après vérification de tous leurs usages et de la conservation effective des leads dans le CRM ou un export sécurisé. Vérifier aussi la prise en charge des nouveaux et anciens IDs par le circuit de réception avant bascule. Les deux formulaires qualifiés d'inutilisés par la mission ne sont pas encore identifiés comme tels par une vérification actuelle exhaustive. Aucun archivage, désactivation, suppression ou téléchargement de prospects effectué.

## Accès restant nécessaire

La connexion au compte Meta géré n'a pas abouti, puis Facebook a refusé les informations de connexion. Aucun secret ni identifiant de connexion conservé dans les preuves. Il reste à obtenir une session de lecture autorisée de Meta Business Suite pour terminer les points 1, 2, 3, 6 et les vérifications préalables du point 8. Aucun accès tiers ne doit être ajouté ; aucun test par modification ou soumission.
