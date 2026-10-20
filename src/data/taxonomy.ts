export type Family = "owned" | "shared" | "paid";
export type MethodType = "control_group" | "third_party" | "simple_comparison";

export interface Option {
  id: string;
  label: string;
  shortLabel: string;
  family?: Family | undefined;
}

export const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const short = (l: string) => (l.split(" (")[0] ?? l).trim();
const opt = (label: string, family?: Family): Option => ({
  id: slugify(label),
  label,
  shortLabel: short(label),
  family,
});

export const PDV_TYPES = ["GSA", "GSS", "Autre (préciser)"].map((l) => opt(l));
export const SCALES = ["Local", "Multilocal", "National"].map((l) => opt(l));
export const FREQUENCIES = ["Fil rouge", "Opération ponctuelle", "Hybride"].map((l) => opt(l));
export const KPIS = [
  "Coût par visite magasin",
  "Ventes incrémentales",
  "CTR",
  "ROI",
  "Coût par visite site",
  "Reach",
  "Autre",
].map((l) => opt(l));

export const ENVIRONMENTS: Option[] = [
  ...["Site/App Enseigne", "WhatsApp/Messenger/RCS", "Emailing", "Page Social (fb)"].map((l) => opt(l, "owned")),
  ...[
    "Agrégateur catalogue",
    "Bases Partenaires (campagnes CRM sur bases tierces opt-in)",
    "Espace Partenaires (drive, livraison, écosystèmes d'enseignes tierces)",
  ].map((l) => opt(l, "shared")),
  ...["Social Ads", "Display / Programmatique", "CTV", "DOOH", "Search", "Autre"].map((l) => ({
    ...opt(l, "paid"),
    id: l === "Autre" ? "paid-autre" : slugify(l),
  })),
];

export const FORMATS = [
  "Liseuse / catalogue feuilletable hébergé sur agrégateur",
  "Liseuse / catalogue feuilletable hébergé sur site/app enseigne",
  "Bannière avec expérience intégrée",
  "Bannière avec redirection vers catalogue enseigne",
  "Bannière avec redirection vers catalogue agrégateur",
  "Mosaïque / flux produits",
  "Stories / Carrousels / Formats natifs social",
  "Catalogue intégré liste de courses",
  "Catalogue shoppable avec ajout panier",
  "Autre (préciser)",
].map((l) => opt(l));

export const DATA_SOURCES = [
  "Flux produit (PIM / DAM / ERP)",
  "Donnée géolocalisée propriétaire régie",
  "Zones géographiques (IRIS, isochrones, zones de chalandise)",
  "CRM / Programme de fidélité enseigne",
  "Data shopper 1st party agrégateur",
  "Data tierce / data provider externe",
  "Data contextuelle",
  "Data d'intention",
  "Autre (préciser)",
].map((l) => opt(l));

export const FAMILIES: { id: Family; label: string; description: string }[] = [
  { id: "owned", label: "Owned", description: "Environnements détenus par l'enseigne" },
  { id: "shared", label: "Shared", description: "Environnements partagés avec des partenaires" },
  { id: "paid", label: "Paid", description: "Média payant" },
];

export const METHODS: Record<MethodType, { label: string; definition: string }> = {
  control_group: {
    label: "Groupe de contrôle",
    definition: "Échantillon non exposé au dispositif, qui sert de référence pour isoler son effet.",
  },
  third_party: {
    label: "Mesureur tiers",
    definition: "Société indépendante qui mesure l'effet d'une campagne, par exemple les visites en magasin.",
  },
  simple_comparison: {
    label: "Comparatif simple",
    definition:
      "Comparaison entre deux périodes, ou avec une référence (papier, année précédente), sans groupe de contrôle. Informatif, mais n'isole pas l'effet propre du dispositif.",
  },
};

export type FacetKey = "pdv" | "echelle" | "frequence" | "kpi" | "env" | "format" | "data";

export const FACETS: { key: FacetKey; label: string; options: Option[]; primary: boolean; help: string }[] = [
  { key: "pdv", label: "Type de point de vente", options: PDV_TYPES, primary: true, help: "Le format de magasins concerné : alimentaire (GSA), spécialisé (GSS) ou autre." },
  { key: "echelle", label: "Échelle du dispositif", options: SCALES, primary: true, help: "Le périmètre géographique de l'opération : un magasin, plusieurs zones ou tout le réseau." },
  { key: "frequence", label: "Fréquence du dispositif", options: FREQUENCIES, primary: true, help: "Présence continue (fil rouge), opération isolée, ou combinaison des deux." },
  { key: "kpi", label: "KPI principal", options: KPIS, primary: true, help: "L'indicateur unique retenu pour juger de la réussite du dispositif." },
  { key: "env", label: "Environnement(s) de déploiement", options: ENVIRONMENTS, primary: false, help: "Les espaces où le catalogue est diffusé, regroupés en owned, shared et paid." },
  { key: "format", label: "Format d'expérience catalogue", options: FORMATS, primary: false, help: "La forme sous laquelle le consommateur découvre le catalogue." },
  { key: "data", label: "Source(s) de données exploitées", options: DATA_SOURCES, primary: false, help: "Les données mobilisées pour cibler, personnaliser ou mesurer." },
];

const ALL = [...PDV_TYPES, ...SCALES, ...FREQUENCIES, ...KPIS, ...ENVIRONMENTS, ...FORMATS, ...DATA_SOURCES];
export const findOption = (facet: FacetKey, id: string) => FACETS.find((f) => f.key === facet)?.options.find((o) => o.id === id);
export const envById = (id: string) => ENVIRONMENTS.find((e) => e.id === id);
export const labelOf = (id: string) => ALL.find((o) => o.id === id)?.shortLabel ?? id;
