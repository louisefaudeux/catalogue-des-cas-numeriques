# Roadmap — Modifications lot 1g (filtres de la bibliothèque)

- [x] Filtres « Format d'expérience catalogue » et « Source(s) de données exploitées » retirés de la bibliothèque (champ `filterable` dans `FACETS`) ; tags conservés sur les fiches et dans le calcul des cas proches

# Roadmap — Modifications lot 1f (homogénéité des marges)

- [x] Écart unique de 96 px (64 px mobile) entre toutes les sections de la landing, du hero au pied de page
- [x] Largeur de lecture unique de 720 px (`--measure`, utilitaires `measure` et `prose-ed`) pour tous les textes, l'intro, les enseignements et les précautions
- [x] Cartes (module de recherche, Guide) au même rembourrage (40 px desktop) et aux mêmes titres ; barres d'accent réservées aux sections

# Roadmap — Modifications lot 1e (retours du 17/11 sur la landing)

- [x] Module de recherche remonté juste après le contexte ; « Objectif de la bibliothèque » placé dessous
- [x] Titre de l'ouverture : « Le commerce agentique… » directement, sans le mot « Ouverture »
- [x] Étiquette « En cours de validation » retirée de la section Enseignements
- [x] « Proposer un cas » en bouton dans l'en-tête (desktop et menu mobile), distinct des deux rubriques

# Roadmap — Modifications lot 1d (branding, intro, enseignements sur la landing) et textes du Word du 17/11

- [x] A. Fond #efefe7 sur tout le site, dégradé violet → mauve, filet d'en-tête, bandeau prototype discret
- [x] A. Hero : surtitre, « DIGITALISATION DU CATALOGUE » en Horizon et en dégradé, « Bibliothèque de cas » en 800, phrase d'accroche supprimée, un seul H1
- [x] A. Barres d'accent au-dessus des H2 de la landing ; navigation en 600 avec soulignement d'accent
- [x] B. Intro en 4 parties (Évolution, Déploiement, Papier et digital, Bénéfices et actifs) avec les textes du Word, lien Guide dans le chapô, pagineur « 1 / 4 » à flèches, liste à puces avec gras, hauteur du panneau = contenu
- [x] C. Section « Objectif de la bibliothèque » (2. du Word) juste avant le module de recherche, appel à contributions avec lien, précautions de lecture ; espacement régulier entre sections
- [x] D. Enseignements sur la landing : 4 étapes en intertitres, numérotation 1 à 7, accordéons, ancres #l-3-x ; carte « En discussion » retirée ; `/enseignements` redirigé
- [x] D. Ouverture « Le commerce agentique… » (4. du Word) visible après les enseignements
- [x] Vérifications : types, build, tests 10/10 (dont contenus), navigation clavier et ancres, captures desktop et mobile
- [ ] Hors lot : fiches de cas, cas Mobsuccess et retrait des cas fictifs (en attente des retours sur les fiches)

# Roadmap — Modifications lot 1c (« Le contexte » en navigation verticale)

- [x] F.1 Composant : onglets verticaux desktop (filet + barre d'accent, hauteur stable, clavier flèches/Début/Fin), accordéon mobile, lien Guide en bas du menu
- [x] F.2 Découpage en cinq parties (nature, deploiement, papier, actifs, prerequis), textes mot pour mot
- [x] F.3 Phrase de transition inchangée sous le composant, text-wrap: balance
- [x] Vérifications : build OK, tests 6/6, clavier (flèches, Début, Fin), hauteur stable et accordéon mobile testés au navigateur

# Roadmap — Modifications lot 1b (landing, grille, Ouverture)

- [x] E.1 Hero compact : hauteur réduite, H1 clamp(1.75rem, 3.4vw, 2.75rem) pleine largeur, titre court masqué dans l'en-tête sur l'accueil uniquement
- [x] E.2 Contexte : chapô + deux colonnes (1.1, 1.2) sans numéros, « Lire la suite » / « Réduire » indépendants, accordéons et chapeau séparé supprimés
- [x] E.3 Phrase de transition (ex-1.3, dernier paragraphe) puis module de recherche, marges réduites
- [x] E.4 Bloc Enseignements compact : grille 4+8, liste 1–7 sans cartes, ligne « Ouverture » vers /enseignements#ouverture
- [x] E.5 Numérotation 1–7 (rang calculé) sur accueil et /enseignements, ancres inchangées
- [x] E.6 /enseignements : Ouverture en fin de page (id ouverture, ancre gérée), 1er paragraphe ex-1.3 en tête, boutons « Explorer la bibliothèque » + Guide
- [x] Vérifications : build OK, tests 6/6, accueil et ancres (#ouverture, pliage des colonnes) testés au navigateur
