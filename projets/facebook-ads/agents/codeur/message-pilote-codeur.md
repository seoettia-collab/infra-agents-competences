# Message Pilote -> Codeur

MESSAGE-ID : CODE-041
DATE : 2026-10-14
OBJET : Ville depuis le code postal, bouton Messenger trompeur, double initialisation

---

Lis ta fiche puis la gouvernance. Format de rapport : D-013.

## Sur CODE-040

Pris en compte. Leads de test supprimés, docs figées marquées, branches non
supprimées faute de droits. Le Pilote s'en occupera.

## Le contexte — la campagne produit

Trois leads en vingt-quatre heures, tous issus de la publicité « Salle de bain
clé en main ». Le dashboard sert maintenant tous les jours, et ses défauts
d'usage coûtent du temps réel.

Les trois points ci-dessous viennent de l'usage du Gérant, pas d'un audit.

## Partie A — afficher la ville à partir du code postal *(demande du Gérant)*

Dans la fiche d'un lead, le bloc « Projet & demande » affiche aujourd'hui
`Code Postal : 78450`. Un code postal seul ne dit rien.

Le Gérant veut voir la ville, pour savoir immédiatement si c'est dans sa zone,
et pour pouvoir la nommer quand il appelle le prospect.

Attendu : `78450 — Villepreux`, ou la ville sur une ligne dessous.

Contraintes :

- **Hors ligne de préférence.** Une table des codes postaux français tient dans
  le dépôt. Pas de dépendance à un service extérieur qui peut tomber.
- Un code postal peut couvrir plusieurs communes. Affiche la principale, ou
  les deux ou trois premières séparées par une barre oblique.
- Si le code est inconnu ou absent, affiche le code seul. **Jamais une ville
  fausse.**
- La ville est un affichage, pas une donnée à stocker dans le lead.

## Partie B — le bouton Messenger propose une action impossible

Le bouton Messenger s'affiche sur tous les leads. Quand on clique sur un lead
venu du formulaire, il répond « Pas de conversation Messenger associée à ce
lead ».

Le Gérant a cru que ses leads venaient de Messenger. Un bouton ne doit pas
proposer une action qui n'existe pas.

Attendu : le bouton n'apparaît que si une conversation Messenger est
réellement rattachée au lead. Sinon, il disparaît ou il est désactivé avec la
mention visible, pas au clic.

## Partie C — tout s'initialise deux fois

Les journaux du navigateur montrent chaque initialisation en double :

```
[Conversions] Init onglet          ×2
[Cockpit] Données période chargées ×2
[AdsManager] Initialisation        ×2
[AdsManager] Stratégie détectée    ×2
[Copilot] Dernier rapport restauré ×2
[API] Intraday chargé              ×2
```

Conséquence : deux fois plus d'appels à l'API, écran plus lent, et risque de
double exécution sur des actions.

Trouve la cause — écouteur attaché deux fois, script chargé deux fois,
initialisation appelée par deux chemins — et corrige.

## Ce que tu ne touches pas

- Les garde-fous : HOUSING, D5, mode réduction, protection 72 heures
- L'IA Reco et le Studio Pub que tu viens de livrer
- Le rapprochement lead/conversation lui-même : on corrige l'affichage du
  bouton, pas la logique de rapprochement

## Déploiement

Autorisé. Livraison continue, D-024.

## Interdits

- Ne touche jamais à ` fb-ads-saas` (`srv-d7139du3jp1c7390flq0`)
- Aucune donnée personnelle de lead dans le rapport
- Aucune valeur de secret

## Ton rapport

Format D-013, référence `CODE-041`.
Si le hub refuse la publication, pousse sur `code-041-rapport`.

PREUVES : la source de la table des codes postaux, la cause de la double
initialisation, et la confirmation que les journaux ne montrent plus de
doublon.

## Ta réponse à l'écran

```
MISSION TERMINÉE — CODE-041
```

ou

```
MISSION NON TERMINÉE — CODE-041
```

— Pilote, facebook-ads
