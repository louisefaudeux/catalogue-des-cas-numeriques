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
  // ratio "auto" : planche de plusieurs créas fournie telle quelle (affichée pleine largeur, sans recadrage).
  creatives: { label: string; ratio: "1:1" | "16:9" | "728:90" | "9:16" | "4:5" | "4:3" | "auto"; src?: string; caption?: string }[];
}

const ids = (...l: string[]) => l.map(slugify);

const raw: CaseStudy[] = [
  // Cas réels uniquement (cas fictifs retirés le 17/11). Source : classeur « Bibliotheque_Cas_Template_DigitPro », version du 17/11/2026 (15 h 40).
  // Seul le cas Azerion est anonymisé (enseigne non nommée par le contributeur) ; les autres enseignes sont nommées (validé le 17/11).
  {
    slug: "netto",
    brand: "Netto",
    partners: ["Zenith (agence média)"],
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
      title: "Formats display web et mobile (DCO)",
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
      source: "Azira. Mesure des visites en point de vente avec un groupe de contrôle non exposé.",
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
    creatives: [],
  },
  {
    slug: "jardiland",
    brand: "Jardiland",
    partners: ["Cospirit (agence média)", "Okube (mesure)"],
    contributor: "DeepReach",
    period: "Fil rouge",
    tags: {
      pdvType: ids("GSS"), scale: slugify("Multilocal"), pdvCount: "Intégralité du parc",
      frequency: slugify("Fil rouge"),
      frequencyDetail: "2025 : 1 435 campagnes, 17 opérations",
      mainKpi: slugify("Coût par visite magasin"),
      environments: ids("Social Ads", "Display / Programmatique"),
      formats: ids("Bannière avec redirection vers catalogue enseigne", "Stories / Carrousels / Formats natifs social"),
      dataSources: ids("Donnée géolocalisée propriétaire régie"),
    },
    challenge: "Comment déployer des campagnes drive-to-store avec une granularité et une performance ultra locales ?",
    context: {
      situation: "Les campagnes nationales de digitalisation du catalogue assuraient une couverture large et cohérente du réseau. Des opportunités d'optimisation ont cependant été identifiées afin de mieux prendre en compte le potentiel de chaque point de vente, d'améliorer la précision du ciblage local et de réduire les zones de chevauchement entre magasins. Des campagnes géolocalisées existaient déjà, avec des niveaux de performance variables selon les leviers et les solutions activés, laissant encore des opportunités d'optimisation sur la précision du ciblage et l'efficacité média.",
      trigger: "La volonté d'avoir des indicateurs par magasin afin d'obtenir des résultats au point de vente et d'optimiser les performances locales.",
    },
    levers: [{
      title: "Facebook, Instagram, display programmatique",
      environments: ids("Social Ads", "Display / Programmatique"),
      data: "Géolocalisation hyperlocale, données socio-démographiques",
      howItWorks: [
        "Ciblage géolocalisé par magasin, avec des zones de chalandise définies selon la situation (choix retenu pour Jardiland : l'IRIS).",
        "Maîtrise des zones pour éviter les chevauchements et la déperdition de budget.",
        "Création de packs média mis à la disposition des magasins.",
      ],
    }],
    adjustments: "Au fil des campagnes, les performances des supports et des formats ont été analysées afin d'optimiser le plan média de chaque point de vente (prix, création, zone, plan média), après chaque campagne.",
    keyFigure: {
      value: "−63 %",
      sentence: "de coût par visite en magasin, avec une hausse de 221 % des visites en magasin.",
      source: "DeepReach. Mesure par un tiers mesureur (Okube).",
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
      { label: "Carrousel Meta, carte 1", ratio: "9:16", src: "/cases/jardiland/carrousel-meta-1.jpg" },
      { label: "Carrousel Meta, carte 2", ratio: "9:16", src: "/cases/jardiland/carrousel-meta-2.jpg" },
      { label: "Carrousel Meta, carte 3", ratio: "9:16", src: "/cases/jardiland/carrousel-meta-3.jpg" },
      { label: "Display 728×90 (mise en situation)", ratio: "4:3", src: "/cases/jardiland/display-728x90.jpg" },
    ],
  },
  {
    // Azerion. Résultats en attente (demande en cours auprès du contributeur).
    slug: "gsa-display-drive-to-store",
    brand: "Enseigne anonymisée",
    anonymous: true,
    partners: ["Publicis Media (agence média)", "Kairos (mesure)"],
    contributor: "Azerion",
    period: "Fil rouge",
    tags: {
      pdvType: ids("GSA"), scale: slugify("Multilocal"), pdvCount: "1 800 magasins",
      // KPI retenu le 17/11 : coût par visite incrémentale (CPVI), rattaché à « Coût par visite magasin ».
      frequency: slugify("Fil rouge"), mainKpi: slugify("Coût par visite magasin"),
      environments: ids("Display / Programmatique"),
      formats: ids("Bannière avec expérience intégrée", "Bannière avec redirection vers catalogue enseigne"),
      dataSources: ids("Donnée géolocalisée propriétaire régie", "Zones géographiques (IRIS, isochrones, zones de chalandise)"),
    },
    challenge: "Comment générer du trafic en magasin à partir des promotions mises en avant dans les bannières ?",
    context: {
      situation: "Réduction des volumes papier liée au Stop Pub / Oui Pub et hausse des coûts d'impression : créer des campagnes drive-to-store pour générer du trafic en magasin, dans une stratégie multilocale.",
    },
    levers: [{
      title: "Formats display web et mobile (DCO)",
      format: "Formats display web et mobile mettant en avant une sélection de produits dynamique ainsi que l'adresse du point de vente (DCO).",
      environments: ids("Display / Programmatique"),
      data: "Données géolocalisées en isochrone, triangulées domicile, travail et loisirs",
      kpis: ["Coût par visite magasin", "Ventes incrémentales", "ROI", "Coût par visite site", "Reach"],
      howItWorks: ["Ciblage de données hyperlocales en fonction des zones de chalandise validées par le client."],
    }],
    results: [],
    otherResults: ["Résultats chiffrés en attente de confirmation par le contributeur."],
    method: { type: "third_party", detail: "Mesure réalisée via Kairos." },
    lessons: ["Le fil rouge a permis de générer des uplifts en magasin grâce à une optimisation quotidienne des créations et des paramétrages."],
    nextSteps: "Extension du dispositif aux formats social ads à partir de 2027, et déploiement progressif sur le réseau franchisé après validation sur les succursales pilotes.",
    creatives: [],
  },
  {
    // Mobsuccess 1.
    slug: "feu-vert",
    brand: "Feu Vert",
    partners: [],
    contributor: "Mobsuccess",
    period: "Fil rouge annuel depuis 2024",
    tags: {
      pdvType: ids("Autre (préciser)"), scale: slugify("Multilocal"), pdvCount: "330 magasins",
      frequency: slugify("Fil rouge"), mainKpi: slugify("Autre"),
      environments: ids("Agrégateur catalogue", "Social Ads", "Display / Programmatique"),
      formats: ids("Bannière avec redirection vers catalogue enseigne", "Stories / Carrousels / Formats natifs social"),
      dataSources: ids("Zones géographiques (IRIS, isochrones, zones de chalandise)", "Data d'intention"),
      otherSpecified: { pdvType: "Centres auto", mainKpi: "Coût par lecture" },
    },
    challenge: "Comment uniformiser la communication au local d'un réseau national de 330 points de vente fractionné entre succursales et franchisés ?",
    levers: [
      { title: "Meta", environments: ids("Social Ads"), data: "Zones géographiques (IRIS)", kpis: ["Coût par vue catalogue", "Temps passé"], howItWorks: ["Diffusion de l'e-catalogue dans la zone personnalisée de chaque magasin."] },
      { title: "Display", environments: ids("Display / Programmatique"), data: "Zones géographiques (IRIS)", kpis: ["Coût par vue catalogue", "Temps passé"], howItWorks: ["Diffusion de l'e-catalogue dans la zone personnalisée de chaque magasin."] },
      { title: "Demand Gen", environments: ids("Display / Programmatique"), data: "Zones géographiques (IRIS)", kpis: ["Coût par vue catalogue", "Temps passé"], howItWorks: ["Diffusion de l'e-catalogue dans la zone personnalisée de chaque magasin."] },
    ],
    keyFigure: {
      value: "≈ 0,20 €",
      sentence: "de coût par consultation du catalogue, pour un temps passé de 30 à 60 secondes.",
      source: "Mobsuccess. Pas d'élément de comparaison avec le catalogue papier.",
    },
    results: [
      { value: "≈ 0,20 €", label: "de coût par consultation, sur l'ensemble du dispositif" },
      { value: "30 à 60 s", label: "de temps passé sur le catalogue" },
    ],
    method: { type: "campaign_metrics", detail: "Pas d'élément de comparaison avec le catalogue papier." },
    lessons: ["La digitalisation du catalogue peut prendre la forme de kits digitaux proposés via une plateforme de commande, pour rendre les magasins autonomes dans la prise de commande."],
    nextSteps: "Extension du fil rouge pour 2027. Travail sur l'animation commerciale pour augmenter les taux d'adhésion.",
    creatives: [
      { label: "Planche des créas : Meta (post catalogue), Display (300×600 et interstitiel), Demand Gen", ratio: "auto", src: "/cases/feu-vert/creas.jpg" },
    ],
  },
  {
    // Mobsuccess 2. Social Ads coché (levier Meta) : validé le 17/11.
    slug: "carrefour",
    brand: "Carrefour",
    partners: ["Aristid (flux produit)"],
    contributor: "Mobsuccess",
    period: "Fil rouge annuel depuis 2025",
    tags: {
      pdvType: ids("GSA"), scale: slugify("Multilocal"), pdvCount: "57 magasins",
      frequency: slugify("Fil rouge"), frequencyDetail: "1 à 6 opérations hebdomadaires",
      mainKpi: slugify("Reach"),
      environments: ids("Social Ads", "Display / Programmatique", "CTV"),
      formats: ids("Stories / Carrousels / Formats natifs social"),
      dataSources: ids("Zones géographiques (IRIS, isochrones, zones de chalandise)"),
    },
    challenge: "Comment remplacer le prospectus papier et maintenir la performance locale sur des centaines de magasins, avec un haut niveau de personnalisation ?",
    context: { situation: "57 magasins actifs sur 1 à 6 opérations hebdomadaires." },
    levers: [
      { title: "Meta", environments: ids("Social Ads"), data: "Zones géographiques (IRIS)", kpis: ["Reach", "CPM"], howItWorks: ["Budget calibré au magasin et bascule automatique par levier via IA pour assurer le delivery."] },
      { title: "YouTube", environments: ids("Display / Programmatique"), data: "Zones géographiques (IRIS)", kpis: ["Reach", "CPM"], howItWorks: ["Budget calibré au magasin et bascule automatique par levier via IA pour assurer le delivery."] },
      { title: "CTV", environments: ids("CTV"), data: "Zones géographiques (IRIS)", kpis: ["Reach", "CPM"], howItWorks: ["Budget calibré au magasin et bascule automatique par levier via IA pour assurer le delivery."] },
    ],
    keyFigure: {
      value: "1,5 à 2 M",
      sentence: "de personnes touchées par opération hebdomadaire sur Meta, contre 350 à 800 K sur YouTube et 140 à 200 K sur CTV.",
      source: "Mobsuccess.",
    },
    results: [
      { value: "1,5 à 2 M", label: "de personnes touchées par opération hebdomadaire, sur Meta" },
      { value: "350 à 800 K", label: "de personnes touchées par opération hebdomadaire, sur YouTube" },
      { value: "140 à 200 K", label: "de personnes touchées par opération hebdomadaire, sur CTV" },
    ],
    method: { type: "campaign_metrics" },
    lessons: ["La partie créative peut s'avérer complexe et nécessite une véritable expertise en fonction des leviers activés."],
    nextSteps: "Extension du fil rouge pour 2027 en cours de confirmation.",
    creatives: [
      { label: "Planche des créas : Meta (carrousel), YouTube (vidéo 16:9), CTV (spot TV)", ratio: "auto", src: "/cases/carrefour/creas.jpg" },
    ],
  },
  {
    // Mobsuccess 3.
    slug: "but",
    brand: "BUT",
    partners: ["Adsquare (mesure)"],
    contributor: "Mobsuccess",
    period: "Du 24 septembre au 28 octobre 2024",
    tags: {
      pdvType: ids("GSS"), scale: slugify("Multilocal"), pdvCount: "Intégralité du parc",
      frequency: slugify("Opération ponctuelle"), mainKpi: slugify("Reach"),
      environments: ids("Site/App Enseigne", "Agrégateur catalogue", "Social Ads", "Display / Programmatique"),
      formats: ids("Liseuse / catalogue feuilletable hébergé sur site/app enseigne"),
      dataSources: ids("Donnée géolocalisée propriétaire régie", "Zones géographiques (IRIS, isochrones, zones de chalandise)", "Data d'intention"),
    },
    challenge: "Comment compenser 85 % de la contactabilité papier et générer du trafic en magasin sur une opération menée sans distribution de prospectus ?",
    context: {
      situation: "BUT recherche une alternative comparable à la performance des prospectus papier. Le sujet est devenu un enjeu sociétal, avec une forte augmentation du prix du papier liée à l'inflation. Il s'agit de la première opération But Cuisines menée sans distribution de prospectus. Objectifs de l'opération : compenser 85 % de la contactabilité papier ; assurer la visibilité et la consultation des offres But Cuisines sur les zones dédiées via le catalogue ; générer du trafic en magasin.",
    },
    levers: [
      { title: "Meta", environments: ids("Social Ads"), data: "Intentionnistes cuisines et zone IRIS", kpis: ["CPC : 0,36 €"], howItWorks: [] },
      { title: "Display", environments: ids("Display / Programmatique"), data: "Visiteurs de cuisinistes concurrents et zone IRIS", kpis: ["CPC : 0,77 €"], howItWorks: [] },
      { title: "Demand Gen", environments: ids("Display / Programmatique"), data: "Intentionnistes cuisines et zone IRIS", kpis: ["CPC : 0,09 €"], howItWorks: [] },
      { title: "Agrégateurs", environments: ids("Agrégateur catalogue"), data: "Appétants catalogues et zone IRIS", kpis: ["CPC : 0,09 €"], howItWorks: [] },
    ],
    keyFigure: {
      value: "× 1,51",
      sentence: "le reach du catalogue papier, avec un coût par clic et un coût par lecture inférieurs à ceux du papier.",
      source: "Mobsuccess. Comparaison avec le catalogue papier ; visites mesurées par un tiers mesureur (Adsquare).",
    },
    results: [
      { value: "× 1,51", label: "le reach du catalogue papier" },
      { value: "−0,05 €", label: "de coût par clic par rapport au catalogue papier" },
      { value: "−1,00 €", label: "de coût par lecture par rapport au catalogue papier" },
      { value: "0,97 €", label: "de coût par visite en magasin, mesuré par un tiers" },
      { value: "+119 %", label: "d'uplift de visites en magasin, mesuré par un tiers" },
    ],
    method: {
      type: "third_party",
      detail: "Coût par visite et uplift de visites mesurés par un tiers mesureur indépendant, Adsquare. Reach, coût par clic et coût par lecture comparés au catalogue papier.",
    },
    lessons: ["L'approche omnicanale est clé pour maximiser l'impact d'un point de vente dans sa zone de chalandise. Ce cas montre la capacité à activer et centraliser plusieurs leviers pour chaque magasin au sein d'une même campagne (Meta, Display, Google, agrégateurs)."],
    creatives: [
      { label: "Planche des créas : Meta (vidéo), Display (MPU 300×250 et interstitiel)", ratio: "auto", src: "/cases/but/creas.jpg" },
    ],
  },
  {
    // Mobsuccess 4. « Trafic en dépôts » : terme de l'enseigne, conservé (17/11).
    slug: "brico-depot",
    brand: "Brico Dépôt",
    partners: ["Adsquare (mesure)"],
    contributor: "Mobsuccess",
    period: "Semaine 9, 2025",
    tags: {
      pdvType: ids("GSS"), scale: slugify("Multilocal"), pdvCount: "122 magasins",
      frequency: slugify("Opération ponctuelle"), mainKpi: slugify("Coût par visite magasin"),
      environments: ids("Site/App Enseigne", "Social Ads"),
      formats: ids("Liseuse / catalogue feuilletable hébergé sur site/app enseigne", "Bannière avec redirection vers catalogue enseigne"),
      dataSources: ids("Donnée géolocalisée propriétaire régie", "Zones géographiques (IRIS, isochrones, zones de chalandise)", "Data d'intention"),
    },
    challenge: "Comment améliorer la visibilité et la consultation des offres relayées via le catalogue sur les zones dédiées, et générer du trafic en dépôts en s'appuyant sur un mix média par magasin, piloté directement par une IA propriétaire ?",
    levers: [{
      title: "Meta",
      environments: ids("Social Ads"),
      data: "Intentionnistes bricolage (magasins de bricolage, magasins de jardinage, bricolage, propriétaires), lookalike, broad, zones IRIS",
      kpis: ["Visites", "CPV"],
      howItWorks: [],
    }],
    keyFigure: {
      value: "150 000",
      sentence: "visites en magasin mesurées, pour un coût par visite de 0,54 €.",
      source: "Mobsuccess. Mesure par un tiers mesureur indépendant (Adsquare).",
    },
    results: [
      { value: "150 000", label: "visites mesurées en magasin" },
      { value: "0,54 €", label: "de coût par visite en magasin" },
      { value: "+63 %", label: "de taux de clics par rapport à une campagne sans IA" },
      { value: "−28 %", label: "de coût par clic" },
      { value: "−69 %", label: "de coût par consultation" },
      { value: "+15 000", label: "ajouts au panier" },
    ],
    method: {
      type: "third_party",
      detail: "Visites en magasin mesurées par un tiers mesureur indépendant, Adsquare. La base de comparaison « campagne sans IA » n'est pas précisée.",
    },
    lessons: ["Le media trading et l'implémentation d'agents IA performants sont clés pour atteindre les meilleures performances possibles dans le pilotage des campagnes."],
    creatives: [
      { label: "Planche des créas : Meta, trois vidéos produits (abri, perceuse, tondeuse)", ratio: "auto", src: "/cases/brico-depot/creas.jpg" },
    ],
  },
  {
    // Nanotera. Rédaction du contributeur conservée telle quelle (17/11), sauf l'enjeu (titre) reformulé.
    // Nanotera en apporteur uniquement, pas en partenaire (17/11).
    slug: "cooperative-u",
    brand: "Coopérative U",
    partners: [],
    contributor: "Nanotera",
    period: "Menu traiteur fin d'année 2025",
    tags: {
      pdvType: ids("GSA"), scale: slugify("Multilocal"), pdvCount: "368 magasins - Région Ouest",
      frequency: slugify("Opération ponctuelle"), frequencyDetail: "Annuelle",
      mainKpi: slugify("Ventes incrémentales"),
      environments: [
        ...ids("Site/App Enseigne", "WhatsApp/Messenger/RCS", "Emailing", "Page Social (fb)"),
        ...ids("Bases Partenaires (campagnes CRM sur bases tierces opt-in)"),
        ...ids("Social Ads", "Display / Programmatique", "Search"),
        "paid-autre",
      ],
      formats: ids(
        "Liseuse / catalogue feuilletable hébergé sur site/app enseigne",
        "Bannière avec redirection vers catalogue enseigne",
        "Stories / Carrousels / Formats natifs social",
        "Catalogue intégré liste de courses",
      ),
      dataSources: ids("Flux produit (PIM / DAM / ERP)", "Zones géographiques (IRIS, isochrones, zones de chalandise)", "CRM / Programme de fidélité enseigne"),
      otherSpecified: { environments: "Webpush notification" },
    },
    challenge: "Comment augmenter les commandes du menu traiteur de fin d'année sur le site de l'enseigne ?",
    context: { situation: "Opération récurrente de fin d'année avec dispositif régional pour 1/3 du parc magasins (630 magasins)." },
    levers: [
      {
        title: "Meta (Facebook, Instagram) : 5 carrousels, 3 vidéos",
        environments: ids("Social Ads"),
        data: "Géolocalisation à l'IRIS",
        kpis: ["Impression", "Couverture", "Clic", "Répétition", "CTR", "CPM"],
        howItWorks: ["Capitaliser sur le comportement d'achat sur les réseaux sociaux ainsi que sur la géolocalisation des réseaux sociaux."],
      },
      {
        title: "Display : 9 bannières HTML5",
        environments: ids("Display / Programmatique"),
        data: "Géolocalisation à l'IRIS",
        kpis: ["Impression", "Couverture", "Clic", "Répétition", "CTR", "CPM"],
        howItWorks: ["Capitaliser sur la géolocalisation."],
      },
      {
        title: "Webpush notification : 15 bannières différentes",
        environments: ["paid-autre"],
        data: "Géolocalisation au code postal",
        kpis: ["Envoi", "Ouverture", "Clic", "Taux d'ouverture", "Taux de clic"],
        howItWorks: ["Capitaliser sur la qualité de la base de contacts et la géolocalisation."],
      },
      {
        title: "Google Performance Max : 12 bannières, 2 vidéos",
        environments: ids("Search"),
        data: "Géolocalisation au code postal et comportement de l'utilisateur",
        kpis: ["Impression", "Clic", "Taux de clic", "Conversion"],
        howItWorks: ["Capitaliser sur le comportement de l'utilisateur dans l'environnement Google ainsi que sur la géolocalisation."],
      },
    ],
    adjustments: "Tout est optimisé en direct en fonction de la diffusion.",
    keyFigure: {
      value: "4 000 000",
      sentence: "d'impressions et 2 millions de personnes touchées.",
      source: "Nanotera. Tracking campagne et site, nombre de commandes.",
    },
    results: [
      { value: "4 000 000", label: "d'impressions" },
      { value: "2 millions", label: "de personnes touchées" },
    ],
    method: { type: "campaign_metrics", detail: "Tracking campagne + site et nombre de commandes." },
    qualitative: ["Opération 2025 dont les résultats quantitatifs et les retours PDV sont très positifs, ce qui conduit à renouveler le dispositif cette année (+ de 45 000 commandes web en complément des commandes instore)."],
    lessons: ["Le mix média est une solution optimisée pour diffuser l'offre promo : cela permet d'allier couverture, impression et clic en fonction des canaux activés → optimisation budget."],
    nextSteps: "Optimisation et ajout de nouveaux canaux et formats à l'édition 2026.",
    creatives: [],
  },
];

export const CASES: CaseStudy[] = deepTypo(raw);
export const getCase = (slug: string) => CASES.find((c) => c.slug === slug);
export const displayBrand = (c: CaseStudy) => (c.anonymous ? "Enseigne anonymisée" : c.brand);

/** « Zenith (agence média) » → { name: "Zenith", role: "agence média" } ; sans parenthèse finale, pas de rôle. */
export const splitPartner = (p: string): { name: string; role?: string } => {
  const m = /^(.*?)\s*\(([^()]+)\)\s*$/.exec(p);
  return m ? { name: m[1]!, role: m[2]! } : { name: p.trim() };
};
