<!-- BANDEAU ANTI-CACHE : relire ce fichier au hash annoncé avant d'agir. -->
# Message Pilote -> documentation-technique (ringo-toiture)

MESSAGE-ID : DOC-001
EN-REPONSE-A : -

## Objet
Reconstituer prioritairement le cadrage complet du volume 4,00 x 8,00 m, puis
intégrer FT-TOIT-2026-0155 au référentiel avec statut des données.

## Source
Source directe du Gérant Ricardo, datée du 01/09/2026, consignée sous forme de
synthèse structurée dans la mission TOIT-001 du même commit :
`projets/ringo-toiture/agents/toiture-charpente/message-pilote-toiture-charpente.md`.

## Complément prioritaire du Gérant — cadrage à restituer au Pilote

Le Gérant précise que le dessinateur doit traiter un volume 4,00 x 8,00 m avec
sol/dalle, RDC, R+1 et toiture. Cette donnée paraît incompatible avec la fiche
transmise, qui mentionne une structure porteuse existante et une intervention
limitée à la toiture. Tu connais l'historique du projet, y compris l'étude des
devis : reconstitue donc, AVANT toute mise à jour documentaire, les données
disponibles et leurs sources.

Réponds explicitement aux questions suivantes :

1. Le volume 4,00 x 8,00 m est-il un ouvrage existant à couvrir ou un bâtiment
   complet à modéliser/créer ? Citer la source, la date et le statut de chaque
   information contradictoire.
2. Quelles données déjà communiquées ou chiffrées concernent : terrain/sol,
   fondations, dalle, murs, RDC, plancher R+1, R+1, hauteurs/niveaux, accès ou
   escalier, charpente, couverture, ouvertures, lucarnes, fenêtres de toit,
   zinguerie et évacuation EP ?
3. Quelles cotes, compositions, matériaux, quantités et implantations sont
   réellement validés par le Gérant ou portés par le devis, et lesquels restent
   seulement estimés, à relever ou inconnus ?
4. Quels documents, devis, échanges ou fichiers constituent la preuve de ces
   données ? Donner les chemins exacts lorsqu'ils sont accessibles.
5. Dresser la liste courte et ordonnée des décisions/cotes encore nécessaires
   avant qu'un dessinateur puisse modéliser le bâtiment complet sans inventer.

Ne mélange pas le projet ringo-toiture avec un autre chantier. Une connaissance
issue d'un échange antérieur doit être attribuée comme telle ; elle ne devient
pas un fait vérifié sans source ou validation explicite du Gérant.

## Mission documentaire après réponse de cadrage

Après avoir livré la réponse de cadrage et seulement sur instruction ultérieure
du Pilote, mettre à jour REFERENTIEL.md et JOURNAL.md avec les intentions,
quantités, ouvrages, écarts au devis et données manquantes de FT-TOIT-2026-0155.
Étiqueter chaque donnée selon sa source et son statut : décision/intention du
Gérant, estimation, à relever, à confirmer ou point bloquant. Ne pas consigner
comme fait établi les 59 m², 47 m², 12 m², hauteurs, pentes, emprises non
mesurées, hypothèse PLU du tiers ou compatibilité finale des implantations.

## Livrable immédiat
Remplacer le fichier de sortie par un rapport DOC-001-R, EN-REPONSE-A : DOC-001,
répondant d'abord aux cinq questions de cadrage ci-dessus. Ne modifier ni
REFERENTIEL.md, ni JOURNAL.md, ni DECISIONS.md tant que le Pilote n'a pas levé
la contradiction de périmètre. Puis commit et push selon le protocole.
