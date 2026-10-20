import { slugify, type MethodType } from "./taxonomy";
import { deepTypo } from "@/lib/typo";

export interface Lever {
  title: string;
  format?: string;
  environments: string[];
  data?: string;
  kpis?: string[];
  howItWorks: string[];
}

export interface CaseStudy {
  slug: string;
  status: "documented" | "illustrative";
  brand: string;
  anonymous?: boolean;
  partners: string[];
  contributor: string;
  period: string;
  tags: {
    pdvType: string[];
    scale: string;
    pdvCount: string;
    frequency: string;
    frequencyDetail?: string;
    mainKpi: string;
    environments: string[];
    formats: string[];
    dataSources: string[];
    otherSpecified?: Record<string, string>;
  };
  challenge: string;
  context?: { situation?: string; trigger?: string; constraints?: string };
  levers: Lever[];
  adjustments?: string;
  keyFigure?: { value: string; sentence: string; source: string; note?: string };
  results: { value: string; label: string }[];
  otherResults?: string[];
  method: { type: MethodType; detail?: string };
  qualitative?: string[];
  lessons?: string[];
  nextSteps?: string;
  creatives: { label: string; ratio: "1:1" | "16:9" | "728:90" | "9:16" | "4:5"; src?: string; caption?: string }[];
}

const ids = (...l: string[]) => l.map(slugify);
const FICT = { partners: ["Partenaire illustratif"], contributor: "Membre contributeur (illustratif)" };
const FSRC = "Données fictives, pour test de l'interface.";

const raw: CaseStudy[] = [
  {
    slug: "netto",
    status: "documented",
    brand: "Netto",
    partners: ["Azira", "Zenith"],
    contributor: "Azira",
    period: "Fil rouge annuel",
    tags: {
      pdvType: ids("GSA"), scale: slugify("National"), pdvCount: "Intégralité du parc",
      frequency: slugify("Fil rouge"), mainKpi: slugify("ROI"),
      environments: ids("Display / Programmatique"),
      formats: ids("Mosaïque / flux produits"),
      dataSources: ids("Donnée géolocalisée propriétaire régie"),
    },
    challenge: "Comment mettre en place une stratégie de digitalisation des prospectus en fil rouge efficace ?",
    context: {
      situation: "Embarquer les points de vente dans la digitalisation des prospectus, dans un contexte de stratégie digitale à 360°.",
    },
    levers: [{
      title: "Display géolocalisé avec sélection de produits dynamique (DCO)",
      format: "Formats display web et mobile mettant en avant une sélection de produits dynamique ainsi que l'adresse du point de vente (DCO).",
      environments: ids("Display / Programmatique"),
      data: "Donnée géolocalisée propriétaire régie",
      kpis: ["CPV", "CPIV", "ROI"],
      howItWorks: [
        "Ciblage des profils les plus pertinents au sein des zones de chalandise de l'enseigne, grâce aux données de déplacement analysées.",
        "Affichage de publicités géolocalisées.",
        "Mesure de la visite en point de vente et calcul du retour sur investissement généré.",
      ],
    }],
    keyFigure: {
      value: "+35 %",
      sentence: "de ROI par rapport à l'année précédente, sur un dispositif en fil rouge couvrant l'intégralité du parc.",
      source: "Netto × Azira × Zenith. Mesure des visites en point de vente avec un groupe de contrôle non exposé.",
    },
    results: [
      { value: "+35 %", label: "de ROI vs N-1" },
      { value: "6 000+", label: "campagnes par an" },
    ],
    method: { type: "control_group", detail: "Mesure des visites en point de vente auprès des profils exposés à la campagne et d'un groupe de contrôle non exposé." },
    qualitative: ["Adhésion des équipes locales au digital."],
    lessons: [
      "La digitalisation du prospectus s'inscrit dans une démarche de transformation digitale.",
      "Une stratégie de fil rouge permet de tirer des enseignements à long terme et d'optimiser la performance.",
    ],
    creatives: [{ label: "Visuel à ajouter", ratio: "16:9" }],
  },
  {
    slug: "jardiland",
    status: "documented",
    brand: "Jardiland",
    partners: ["Cospirit"],
    contributor: "DeepReach",
    period: "Fil rouge, année 2025",
    tags: {
      pdvType: ids("GSS"), scale: slugify("Multilocal"), pdvCount: "Intégralité du parc",
      frequency: slugify("Fil rouge"),
      frequencyDetail: "2025 : 1 435 campagnes, 17 opérations",
      mainKpi: slugify("Coût par visite magasin"),
      environments: ids("Display / Programmatique", "Social Ads"),
      formats: ids("Stories / Carrousels / Formats natifs social", "Autre (préciser)"),
      dataSources: ids("Zones géographiques (IRIS, isochrones, zones de chalandise)", "Donnée géolocalisée propriétaire régie", "Autre (préciser)"),
      otherSpecified: { formats: "Bannière d'amplification (image statique)", dataSources: "Données socio-démographiques" },
    },
    challenge: "Comment déployer des campagnes drive-to-store avec une granularité et une performance ultra locales ?",
    context: {
      situation: "Les campagnes nationales de digitalisation du catalogue assuraient une couverture large et cohérente du réseau. Des opportunités d'optimisation ont cependant été identifiées afin de mieux prendre en compte le potentiel de chaque point de vente, d'améliorer la précision du ciblage local et de réduire les zones de chevauchement entre magasins. Des campagnes géolocalisées existaient déjà, avec des niveaux de performance variables selon les leviers et les solutions activés, laissant encore des opportunités d'optimisation sur la précision du ciblage et l'efficacité média.",
      trigger: "La volonté d'avoir des indicateurs par magasin afin d'obtenir des résultats au point de vente et d'optimiser les performances locales.",
      constraints: "Réseau mixte de franchisés et de magasins intégrés, avec des niveaux d'engagement différents en marketing digital. Besoin d'une forte réactivité pour la mise en place des campagnes et de flexibilité pour leur lancement, magasin par magasin : certaines campagnes ne sont activées que par une partie du réseau, ce qui exige une forte agilité pour modifier rapidement les paramètres de lancement. Attention au respect des zones de territorialité des magasins.",
    },
    levers: [{
      title: "Ciblage géolocalisé par magasin (zones IRIS)",
      environments: ids("Social Ads", "Display / Programmatique"),
      data: "Géolocalisation hyperlocale, données socio-démographiques",
      howItWorks: [
        "Définition des zones de chalandise en fonction de la situation (choix retenu pour Jardiland : l'IRIS).",
        "Maîtrise des zones pour éviter les chevauchements entre magasins et la déperdition de budget.",
        "Création de packs média mis à la disposition des magasins.",
        "Diffusion sur Facebook, Instagram et en display programmatique.",
      ],
    }],
    adjustments: "Au fil des campagnes, les performances des supports et des formats ont été analysées afin d'optimiser le plan média de chaque point de vente (prix, création, zone, plan média), après chaque campagne.",
    keyFigure: {
      value: "−63 %",
      sentence: "de coût par visite en magasin, avec une hausse de 221 % des visites en magasin.",
      source: "Jardiland × DeepReach. Mesure par un tiers mesureur (Okube).",
      note: "Base de comparaison à préciser",
    },
    results: [
      { value: "−63 %", label: "de coût par visite (CPV)" },
      { value: "+221 %", label: "de visites en magasin" },
      { value: "+36 %", label: "d'impressions vs N-1" },
      { value: "÷ 3", label: "sur le CPM" },
      { value: "× 7", label: "d'audience par rapport au tract, en 2025" },
    ],
    otherResults: ["Forte augmentation des audiences.", "ROAS en forte augmentation dès 2024."],
    method: { type: "third_party", detail: "Mesure réalisée par un tiers mesureur : Okube." },
    creatives: [
      { label: "Carrousel Meta", ratio: "1:1" },
      { label: "Display 728×90", ratio: "728:90" },
    ],
  },
  {
    slug: "illustratif-1", status: "illustrative", brand: "Enseigne illustrative n° 1", ...FICT, period: "Opération saisonnière de six semaines",
    tags: {
      pdvType: ids("GSS"), scale: slugify("National"), pdvCount: "Plus de 250 magasins", frequency: slugify("Opération ponctuelle"),
      mainKpi: slugify("Ventes incrémentales"), environments: ids("Display / Programmatique", "Social Ads", "Emailing"),
      formats: ids("Catalogue shoppable avec ajout panier", "Bannière avec redirection vers catalogue enseigne"),
      dataSources: ids("Flux produit (PIM / DAM / ERP)", "CRM / Programme de fidélité enseigne"),
    },
    challenge: "Comment soutenir une opération saisonnière de grande ampleur sans distribution papier ?",
    context: { situation: "L'enseigne a renoncé à la distribution papier pour son principal temps fort de l'année.", trigger: "Il fallait conserver le niveau de ventes de l'opération sans le support imprimé." },
    levers: [
      { title: "Catalogue shoppable relayé en display et en social", environments: ids("Display / Programmatique", "Social Ads"), data: "Flux produit", howItWorks: ["Catalogue alimenté par le flux produit, avec ajout au panier.", "Bannières renvoyant vers le catalogue de l'enseigne."] },
      { title: "Relance des clients encartés par emailing", environments: ids("Emailing"), data: "CRM / Programme de fidélité", howItWorks: ["Envoi aux clients encartés à l'ouverture de l'opération puis à mi-parcours."] },
    ],
    adjustments: "Le rythme des envois a été réduit après la deuxième semaine pour limiter la lassitude.",
    keyFigure: { value: "+18 %", sentence: "de ventes incrémentales sur la période de l'opération.", source: FSRC },
    results: [{ value: "+18 %", label: "de ventes incrémentales" }, { value: "× 1,6", label: "de paniers en ligne" }],
    method: { type: "control_group", detail: "Comparaison avec un groupe de clients non exposés." },
    qualitative: ["Meilleure lisibilité de l'opération en magasin."],
    lessons: ["Un temps fort se prépare en amont avec le flux produit.", "La relance CRM prolonge l'effet de l'opération."],
    nextSteps: "Étendre le dispositif aux deux autres temps forts de l'année.",
    creatives: [{ label: "Bannière display", ratio: "16:9" }, { label: "Story social", ratio: "9:16" }],
  },
  {
    slug: "illustratif-2", status: "illustrative", brand: "Enseigne illustrative n° 2", ...FICT, period: "Fil rouge et temps forts locaux",
    tags: {
      pdvType: ids("GSA"), scale: slugify("Local"), pdvCount: "12 magasins", frequency: slugify("Hybride"), mainKpi: slugify("Coût par visite site"),
      environments: ids("Site/App Enseigne", "WhatsApp/Messenger/RCS", "Agrégateur catalogue"),
      formats: ids("Liseuse / catalogue feuilletable hébergé sur site/app enseigne", "Catalogue intégré liste de courses"),
      dataSources: ids("CRM / Programme de fidélité enseigne", "Data shopper 1st party agrégateur"),
    },
    challenge: "Comment faire exister le catalogue dans un petit réseau de proximité avec peu de moyens ?",
    context: { situation: "Un réseau de douze magasins de proximité, sans équipe digitale dédiée.", constraints: "Budget limité et production réalisée par l'équipe marketing existante." },
    levers: [{ title: "Catalogue sur le site et alerte par messagerie", environments: ids("Site/App Enseigne", "WhatsApp/Messenger/RCS"), howItWorks: ["Mise en ligne du catalogue avec ajout à la liste de courses.", "Alerte envoyée aux clients inscrits à chaque nouveau catalogue."] }],
    keyFigure: { value: "−42 %", sentence: "de coût par visite sur le site de l'enseigne.", source: FSRC },
    results: [{ value: "−42 %", label: "de coût par visite site" }, { value: "3 200", label: "inscrits aux alertes" }],
    method: { type: "simple_comparison", detail: "Comparaison avec la période précédente." },
    lessons: ["Un petit réseau peut démarrer avec des outils simples et un rythme régulier."],
    creatives: [{ label: "Message d'alerte", ratio: "9:16" }],
  },
  {
    slug: "illustratif-3", status: "illustrative", brand: "Enseigne illustrative n° 3", anonymous: true, ...FICT, period: "Fil rouge annuel",
    tags: {
      pdvType: ids("GSS"), scale: slugify("National"), pdvCount: "Intégralité du parc", frequency: slugify("Fil rouge"), mainKpi: slugify("CTR"),
      environments: ids("Agrégateur catalogue", "Bases Partenaires (campagnes CRM sur bases tierces opt-in)", "Emailing"),
      formats: ids("Liseuse / catalogue feuilletable hébergé sur agrégateur", "Stories / Carrousels / Formats natifs social"),
      dataSources: ids("Data shopper 1st party agrégateur", "CRM / Programme de fidélité enseigne"),
    },
    challenge: "Comment fidéliser une clientèle saisonnière grâce à un catalogue consulté dans une application ?",
    context: { situation: "Une clientèle qui fréquente l'enseigne surtout à certaines périodes de l'année." },
    levers: [{ title: "Présence continue sur agrégateur et bases partenaires", environments: ids("Agrégateur catalogue", "Bases Partenaires (campagnes CRM sur bases tierces opt-in)"), howItWorks: ["Catalogue publié à chaque parution.", "Campagnes sur bases partenaires entre deux saisons."] }],
    keyFigure: { value: "× 2,3", sentence: "de taux de clic par rapport à la campagne précédente.", source: FSRC },
    results: [{ value: "× 2,3", label: "de taux de clic" }, { value: "+14 %", label: "de lecteurs réguliers" }],
    method: { type: "simple_comparison" },
    lessons: ["La continuité entre les saisons entretient l'habitude de consultation."],
    nextSteps: "Relier les données de consultation au programme de fidélité.",
    creatives: [{ label: "Carrousel", ratio: "1:1" }],
  },
  {
    slug: "illustratif-4", status: "illustrative", brand: "Enseigne illustrative n° 4", ...FICT, period: "Fil rouge avec temps forts régionaux",
    tags: {
      pdvType: ids("Autre (préciser)"), scale: slugify("Multilocal"), pdvCount: "40 % du parc", frequency: slugify("Hybride"), mainKpi: slugify("Coût par visite magasin"),
      environments: ids("Display / Programmatique", "DOOH"), formats: ids("Bannière avec expérience intégrée"),
      dataSources: ids("Zones géographiques (IRIS, isochrones, zones de chalandise)", "Data contextuelle"),
      otherSpecified: { pdvType: "Enseigne de services" },
    },
    challenge: "Comment structurer une communication locale cohérente entre succursales et franchisés ?",
    context: { situation: "Un réseau mixte où chaque franchisé communiquait jusque-là avec ses propres supports.", trigger: "Un besoin d'harmoniser l'image sans perdre la pertinence locale." },
    levers: [{ title: "Bannières à expérience intégrée et affichage digital de proximité", environments: ids("Display / Programmatique", "DOOH"), data: "Zones géographiques, data contextuelle", howItWorks: ["Gabarits communs déclinés par zone.", "Écrans de proximité activés aux heures de forte affluence."] }],
    adjustments: "Les zones ont été redécoupées après le premier mois pour éviter les chevauchements.",
    keyFigure: { value: "−35 %", sentence: "de coût par visite en magasin.", source: FSRC },
    results: [{ value: "−35 %", label: "de coût par visite" }, { value: "92 %", label: "des points de vente engagés" }],
    method: { type: "third_party" },
    qualitative: ["Adhésion des franchisés aux gabarits communs."],
    lessons: ["Des gabarits partagés facilitent l'adhésion du réseau.", "L'étanchéité des zones se pose dès le départ."],
    creatives: [{ label: "Écran extérieur", ratio: "9:16" }],
  },
  {
    slug: "illustratif-5", status: "illustrative", brand: "Enseigne illustrative n° 5", ...FICT, period: "Opération de trois semaines",
    tags: {
      pdvType: ids("GSS"), scale: slugify("National"), pdvCount: "Intégralité du parc", frequency: slugify("Opération ponctuelle"), mainKpi: slugify("Reach"),
      environments: ids("CTV", "Display / Programmatique", "Search"), formats: ids("Bannière avec redirection vers catalogue enseigne"),
      dataSources: ids("Data contextuelle", "Data d'intention"),
    },
    challenge: "Comment couvrir un réseau national sur une opération ponctuelle de forte visibilité ?",
    levers: [{ title: "Télévision connectée et display contextuel", environments: ids("CTV", "Display / Programmatique", "Search"), howItWorks: ["Spot en télévision connectée en début d'opération.", "Display et search pour relayer vers le catalogue."] }],
    keyFigure: { value: "4,2 M", sentence: "de contacts uniques en trois semaines.", source: FSRC },
    results: [{ value: "4,2 M", label: "de contacts uniques" }, { value: "3,1", label: "de répétition moyenne" }],
    method: { type: "simple_comparison" },
    creatives: [{ label: "Spot vidéo", ratio: "16:9" }],
  },
  {
    slug: "illustratif-6", status: "illustrative", brand: "Enseigne illustrative n° 6", ...FICT, period: "Fil rouge hebdomadaire",
    tags: {
      pdvType: ids("GSA"), scale: slugify("Multilocal"), pdvCount: "Environ 80 magasins", frequency: slugify("Fil rouge"), mainKpi: slugify("ROI"),
      environments: ids("Social Ads", "Display / Programmatique", "Espace Partenaires (drive, livraison, écosystèmes d'enseignes tierces)"),
      formats: ids("Mosaïque / flux produits", "Stories / Carrousels / Formats natifs social"),
      dataSources: ids("Flux produit (PIM / DAM / ERP)", "Zones géographiques (IRIS, isochrones, zones de chalandise)", "Donnée géolocalisée propriétaire régie"),
    },
    challenge: "Comment piloter la performance locale d'un grand parc à partir d'un même socle de données ?",
    context: { situation: "Chaque magasin disposait de ses propres données, sans vision consolidée." },
    levers: [
      { title: "Mosaïque produits par magasin", environments: ids("Display / Programmatique", "Social Ads"), data: "Flux produit, zones géographiques", howItWorks: ["Offres du magasin affichées dans sa zone.", "Mise à jour hebdomadaire à partir du flux."] },
      { title: "Présence sur les espaces partenaires", environments: ids("Espace Partenaires (drive, livraison, écosystèmes d'enseignes tierces)"), howItWorks: ["Relais du catalogue sur les services de livraison."] },
    ],
    adjustments: "Le budget a été réparti selon le potentiel de chaque zone à partir du troisième mois.",
    keyFigure: { value: "+27 %", sentence: "de ROI par rapport à l'année précédente.", source: FSRC },
    results: [{ value: "+27 %", label: "de ROI vs N-1" }, { value: "80", label: "tableaux de bord magasin" }, { value: "−12 %", label: "de coût par visite" }],
    method: { type: "control_group" },
    qualitative: ["Un reporting partagé entre le siège et les magasins."],
    lessons: ["Un socle de données commun rend le pilotage local possible.", "Le budget suit le potentiel des zones."],
    nextSteps: "Ajouter la donnée de stock pour retirer les produits en rupture.",
    creatives: [{ label: "Mosaïque produits", ratio: "4:5" }],
  },
  {
    slug: "illustratif-7", status: "illustrative", brand: "Enseigne illustrative n° 7", ...FICT, period: "Fil rouge calé sur les parutions",
    tags: {
      pdvType: ids("GSA"), scale: slugify("National"), pdvCount: "Intégralité du parc", frequency: slugify("Fil rouge"), mainKpi: slugify("Coût par visite magasin"),
      environments: ids("Display / Programmatique", "Agrégateur catalogue"),
      formats: ids("Liseuse / catalogue feuilletable hébergé sur agrégateur", "Bannière avec redirection vers catalogue agrégateur"),
      dataSources: ids("Donnée géolocalisée propriétaire régie", "Flux produit (PIM / DAM / ERP)"),
    },
    challenge: "Comment garder une présence régulière sur un réseau étendu avec des budgets contraints ?",
    context: { constraints: "Un budget média stable mais limité au regard de la taille du réseau." },
    levers: [{ title: "Display géolocalisé renvoyant vers l'agrégateur", environments: ids("Display / Programmatique", "Agrégateur catalogue"), howItWorks: ["Bannières diffusées autour des magasins.", "Redirection vers le catalogue hébergé sur agrégateur."] }],
    keyFigure: { value: "−31 %", sentence: "de coût par visite en magasin par rapport à la campagne de référence.", source: FSRC },
    results: [{ value: "−31 %", label: "de coût par visite" }, { value: "52", label: "parutions couvertes" }],
    method: { type: "third_party" },
    creatives: [{ label: "Bannière", ratio: "728:90" }],
  },
  {
    slug: "illustratif-8", status: "illustrative", brand: "Enseigne illustrative n° 8", ...FICT, period: "Opération d'un mois",
    tags: {
      pdvType: ids("GSS"), scale: slugify("Multilocal"), pdvCount: "60 % du parc", frequency: slugify("Opération ponctuelle"), mainKpi: slugify("Ventes incrémentales"),
      environments: ids("Page Social (fb)", "Social Ads", "Search"), formats: ids("Stories / Carrousels / Formats natifs social"),
      dataSources: ids("Data tierce / data provider externe", "Data d'intention"),
    },
    challenge: "Comment relier une opération catalogue à des ventes mesurables sur un réseau de spécialistes ?",
    levers: [{ title: "Carrousels sociaux et search local", environments: ids("Page Social (fb)", "Social Ads", "Search"), howItWorks: ["Carrousels publiés et sponsorisés autour des magasins participants.", "Search pour capter les recherches liées à l'opération."] }],
    keyFigure: { value: "+12 %", sentence: "de ventes incrémentales.", source: FSRC },
    results: [{ value: "+12 %", label: "de ventes incrémentales" }],
    method: { type: "control_group", detail: "Magasins témoins non exposés." },
    lessons: ["Définir le groupe témoin avant le lancement conditionne la lecture des résultats."],
    nextSteps: "Reconduire l'opération avec un périmètre plus large.",
    creatives: [{ label: "Carrousel", ratio: "1:1" }],
  },
];

export const CASES: CaseStudy[] = deepTypo(raw);
export const getCase = (slug: string) => CASES.find((c) => c.slug === slug);
export const displayBrand = (c: CaseStudy) => (c.anonymous ? "Enseigne anonymisée" : c.brand);
