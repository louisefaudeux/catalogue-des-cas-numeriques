# Roadmap — Dispositif : leviers fidèles au classeur (17/11)

- [x] Un levier par colonne de l'Excel : Feu Vert 3 (Meta, Display, Demand Gen), Carrefour 3 (Meta, YouTube, CTV), au lieu d'un levier fusionné
- [x] Titres de levier repris de la cellule LEVIER (Jardiland, Brico Dépôt, Netto, Azerion) ; KPI Brico Dépôt tels que saisis
- [x] Demand Gen rattaché à Display / Programmatique (Feu Vert et BUT, comme YouTube)
- [x] Plus d'intitulé « Fonctionnement » vide (BUT, Brico Dépôt) ; dans le PDF, data et KPI à la place
- [x] Tests : nombre de leviers par cas, badges de levier cohérents avec les tags du cas
- [x] « Autres résultats » et « Résultats qualitatifs » empilés en pleine largeur (un bloc seul n'occupait que la moitié) ; contrôlé sur les 16 cas, desktop et mobile

# Roadmap — Fiches de cas, retours du 17/11

- [x] Boutons « Prévisualiser » et « Imprimer » retirés ; téléchargement PDF en bas de page, juste avant « Autres cas », et sous le sommaire
- [x] « Retour à la bibliothèque » en haut de page (à la place du fil d'Ariane)
- [x] « Cas proches » renommé « Autres cas »
- [x] Tags du cas en haut, sous les acteurs (plus dans la colonne de droite) ; précisions « Autre » affichées
- [x] Acteurs différenciés : enseigne et apporteur du cas mis en avant, autres partenaires et période en dessous ; emplacement logo prêt (`src/data/logos.ts`)
- [x] Chiffre mis en avant retiré du début de la fiche et du PDF (conservé sur les tuiles de la bibliothèque) ; la fiche PDF montre jusqu'à 3 leviers et 8 résultats
- [x] Lien vers le Guide retiré de la colonne de droite
- [x] Sommaire remonté au niveau de la synthèse, avec l'ancre « Synthèse » (acteurs et tags) en première entrée
- [x] Synthèse en fiche technique : filet dégradé, filets fins, sans cadres blancs ; étiquettes blanches pour le contraste
- [x] Coopérative U : Nanotera en apporteur uniquement
- [x] Logos pour l'enseigne et l'apporteur uniquement (fiche, PDF, tuiles pour l'enseigne), posés sur le fond de page sans cartouche ; testés avec des logos factices, non commités
- [ ] Logos à recevoir : 7 enseignes, 5 apporteurs (fond transparent)

# Roadmap — Cas réels, réponses du 17/11

- [x] Feu Vert, Carrefour, BUT, Brico Dépôt et Coopérative U nommés (slugs `feu-vert`, `carrefour`, `but`, `brico-depot`, `cooperative-u`) ; seul Azerion reste anonymisé
- [x] Planches de créas Mobsuccess intégrées (`public/cases/<slug>/creas.jpg`, format « auto », lien vers la taille réelle)
- [x] Azerion : KPI principal « Coût par visite magasin » (coût par visite incrémentale), 1 800 magasins
- [x] Carrefour : Social Ads conservé ; Brico Dépôt : « trafic en dépôts » conservé
- [x] Coopérative U : rédaction de Nanotera conservée (résultats 4 000 000 d'impressions et 2 millions de personnes touchées, 45 000 commandes dans les résultats qualitatifs), titre reformulé
- [ ] Azerion : résultats chiffrés à clarifier avec le contributeur

# Roadmap — Chargement des cas réels (classeur du 17/11, 15 h 40)

- [x] 8 cas réels chargés : Netto (Azira), Jardiland (DeepReach), Azerion, 4 cas Mobsuccess, Nanotera ; les 8 cas fictifs restent jusqu'à la refonte des fiches
- [x] Enseignes non confirmées comme nommables anonymisées (aucun nom réel dans les données ni à l'écran) ; Netto et Jardiland nommés
- [x] Créas Jardiland intégrées (`public/cases/jardiland/`) ; visuels Mobsuccess non utilisés tant que les cas sont anonymisés (logos)
- [x] Nouveau type de méthode « Indicateurs de campagne » (`campaign_metrics`) pour les cas sans mesure d'effet ; format de visuel 4:3
- [x] Tests de cohérence des données : identifiants de tags valides, slugs uniques, pas de nom réel sur les cas anonymisés, chiffre clé aligné sur le premier résultat
- [ ] Azerion : résultats chiffrés en attente du contributeur
- [ ] Logos d'enseignes, refonte des fiches, retrait des cas fictifs

# Roadmap — Modifications lot 1h (vue Bibliothèque, retours du 17/11)

- [x] En-tête identique sur toutes les pages : logo et navigation, sans titre court du livrable
- [x] H1 « Bibliothèque de cas » en Horizon (dégradé, comme le hero)
- [x] Légende des environnements en carte claire (fond blanc, bordure, ombre) au lieu du violet plein
- [x] Grille des tuiles en 2 colonnes et titres limités à 4 lignes : 0 titre coupé sur 10 (contre 10 sur 10 en 3 colonnes)
- [x] Tags des tuiles différenciés par facette (icône + style + libellé accessible) : type de PDV, échelle, fréquence ; mêmes icônes devant les filtres
- [ ] Plus tard (avec les fiches) : logos d'enseignes à la place du nom en haut de tuile, chiffres d'illustration

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
