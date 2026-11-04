import { deepTypo } from "@/lib/typo";

export type LessonFamily = "donnee" | "creative" | "local" | "experience" | "socle";
export const LESSON_FAMILIES: { id: LessonFamily | "all"; label: string }[] = [
  { id: "all", label: "Tous" },
  { id: "donnee", label: "Donnée" },
  { id: "creative", label: "Déclinaison créative" },
  { id: "local", label: "Découpage local et national" },
  { id: "experience", label: "Expérience client" },
  { id: "socle", label: "Socle transverse" },
];

export interface Lesson {
  num: string;
  title: string;
  family: LessonFamily;
  body: string;
  watchpoint: string;
  cases: string[];
}

const split = (t: string) => {
  const m = t.match(/^(.*?)\s*Points? de vigilance : (.*)$/s)!;
  const w = m[2] ?? "";
  return { body: m[1] ?? "", watchpoint: w.charAt(0).toUpperCase() + w.slice(1) };
};

const raw: Omit<Lesson, "body" | "watchpoint">[] & { text: string }[] = [
  { num: "3.1", title: "Installer la récurrence avant d'optimiser", family: "socle", cases: ["netto"],
    text: "Les dispositifs documentés reposent sur une présence régulière, hebdomadaire ou calée sur le rythme des catalogues, plutôt que sur des opérations ponctuelles. La fréquence construit la mémorisation et l'habitude de consultation chez le shopper, ainsi que l'adhésion du réseau (magasins, adhérents) à la démarche, avant même que les optimisations de création ou de ciblage ne produisent leur effet. Cette régularité gagne à être calée sur le calendrier commercial : alertes à la sortie de chaque catalogue, temps forts magasin. Elle permet ensuite d'ajouter des briques progressivement (nouveaux formats, nouvelles audiences) et d'apprendre en continu grâce aux tests. Point de vigilance : la récurrence suppose un budget et une organisation stables, et, avec les partenaires, une collaboration inscrite dans la durée plutôt que dans l'opération isolée." },
  { num: "3.2", title: "Partir de la donnée locale et soigner sa qualité", family: "donnee", cases: ["netto", "jardiland"],
    text: "Le prospectus papier assurait une couverture locale quasi exhaustive par zone de chalandise. Le digital reproduit cette logique grâce à la donnée géolocalisée, propriétaire ou géographique, et, selon les cas, à la donnée shopper first-party (programme de fidélité, magasin préféré). La qualité de cette donnée est le premier prérequis de transposabilité d'un dispositif : précision de la géolocalisation, exhaustivité et fraîcheur du flux produit (prix, disponibilité par point de vente), structuration en amont pour alimenter plusieurs formats sans tout reconstruire. Points de vigilance : une donnée abondante mais mal structurée ne se transforme pas en personnalisation ; la donnée de géolocalisation et la donnée first-party reposent en outre sur un cadre de consentement à respecter ; une enseigne de maturité encore limitée gagne à démarrer sur un périmètre restreint et fiable." },
  { num: "3.3", title: "Industrialiser la déclinaison créative", family: "creative", cases: [],
    text: "Personnaliser par point de vente ou par audience multiplie le nombre de créations à produire. Sans industrialisation (gabarits, DCO, studio créatif intégré, tests A/B en continu), la personnalisation ne passe pas à l'échelle d'un réseau. Les dispositifs documentés s'appuient sur des créations dynamiques, contextualisées par l'adresse du magasin, ses offres ou sa zone, produites à partir de gabarits. L'IA générative accélère la production, avec des gains de productivité réels, même si son industrialisation reste en cours. Pour un petit réseau, la même logique passe par des gabarits simples, déclinés par zone ou par audience plutôt que par magasin. Point de vigilance : le volume ne doit pas se faire au détriment de la cohérence de l'image de l'enseigne, d'où l'intérêt de gabarits et de règles de validation partagés entre le national et le local." },
  { num: "3.4", title: "Piloter au centre, personnaliser l'exécution localement", family: "local", cases: ["netto", "jardiland"],
    text: "Sur les réseaux étendus (succursales, franchisés, adhérents), il faut tenir deux échelles à la fois. Ce qui relève de la stratégie, du budget, des audiences et du reporting se pilote au niveau central ; ce qui relève de l'exécution (adresse, offres du magasin, zone de chalandise) se personnalise au niveau du point de vente. Les dispositifs qui tentent de tout personnaliser à la main ne passent pas à l'échelle ; ceux qui centralisent tout perdent en pertinence locale. Pour un petit réseau, ce pilotage peut rester léger : quelques règles communes et un reporting partagé suffisent. Point de vigilance : sur les réseaux mixtes, intégrés et franchisés, les règles de répartition des budgets et l'étanchéité des zones doivent être posées dès le départ." },
  { num: "3.5", title: "Concevoir l'expérience pour le mobile et l'accessibilité dès l'origine", family: "experience", cases: [],
    text: "Selon les membres du Groupe de Travail, le mobile concentre une grande part des consultations et reste insuffisamment pris en compte : un catalogue conçu pour le papier puis simplement mis en ligne y fonctionne mal. La conception même du support est à repenser : format, lisibilité, navigation, rapidité d'affichage. L'accessibilité numérique ajoute une exigence supplémentaire, à la fois contrainte de production et enjeu de conformité, qui concerne d'abord les enseignes les plus visibles. Une donnée structurée en amont permet de produire, à partir d'une même source, des formats variés et accessibles. Point de vigilance : l'accessibilité se traite mieux dès le cahier des charges que corrigée après coup." },
  { num: "3.6", title: "Exploiter la réactivité du digital pour garder l'offre à jour", family: "socle", cases: [],
    text: "Là où le papier fige l'offre au bouclage, le digital permet de la faire évoluer en continu : corriger un prix ou une mention, retirer un produit en rupture, ajouter une opération locale, adapter le message au contexte du point de vente, le tout dans des délais bien plus courts que le cycle d'impression et de distribution. Cette réactivité suppose toutefois des process adaptés : circuits de validation courts, donnée produit et stock fiables et à jour, gabarits prêts à l'emploi. Point de vigilance : une réactivité sans cadre expose à des incohérences (prix, mentions légales, disponibilité), d'où l'intérêt de règles de validation claires." },
  { num: "3.7", title: "Définir la mesure avant de lancer et la relier aux outils de l'enseigne", family: "socle", cases: ["netto", "jardiland"],
    text: "Les cas mobilisent des niveaux de mesure différents : indicateurs d'engagement (pages lues, temps de consultation), visites en magasin comparées entre périodes avec et sans campagne, modèles d'incrémentalité avec groupe de contrôle ou test géographique. Chaque niveau répond à une question différente, et seuls les derniers isolent l'effet propre du dispositif. Partir de l'objectif de l'enseigne (trafic en magasin, couverture, fidélisation) pour choisir le levier, les KPI et la méthode, puis fixer en amont le groupe de contrôle, conditionne la crédibilité des résultats. Relier les données de diffusion aux outils de l'enseigne (CDP, CRM, analytics) permet de dépasser l'engagement pour rattacher le catalogue aux ventes et à la segmentation. Point de vigilance : l'incrémentalité exige volume, durée et périmètre suffisants ; un comparatif simple reste un point de départ acceptable pour une enseigne qui débute, à condition d'en préciser les limites." },
] as never;

export const LESSONS: Lesson[] = deepTypo(
  (raw as unknown as (Omit<Lesson, "body" | "watchpoint"> & { text: string })[]).map(({ text, ...l }) => ({ ...l, ...split(text) })),
);

export const DISCUSSION = deepTypo({
  text: "Décloisonner les équipes internes (e-commerce, digital, print, contenu) autour d'un même dispositif.",
  question: "Reconnaissez-vous dans vos cas le décloisonnement entre équipes comme une condition de réussite ?",
});
