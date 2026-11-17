import { deepTypo } from "@/lib/typo";

/*
 * Textes éditoriaux. Source : Word « Edito – Bibliothèque Cas Digit Catalogues »,
 * version relue et acceptée le 17 novembre 2026. Textes repris mot pour mot.
 * Mise en forme légère dans les chaînes : **gras** et *italique* (rendus par RichText).
 */

export const GUIDE_URL =
  "https://www.alliancedigitale.org/publication/le-catalogue-se-reinvente-sortie-de-notre-guide-de-la-digitalisation-des-catalogues/";
export const GUIDE_LABEL = "Guide de la Digitalisation du Catalogue (Alliance Digitale, 2025)";
/** Segment du chapô de l'intro qui porte le lien vers le Guide. */
export const GUIDE_INLINE = "Guide de la Digitalisation du Catalogue";
export const SITE_TITLE = "Digitalisation du catalogue : la bibliothèque de cas";
export const VERSION_DATE = "21 octobre 2026";

/** Hero de la landing. */
export const HERO = {
  eyebrow: "Groupe de Travail Digitalisation du Catalogue",
  title: "Digitalisation du catalogue",
  subtitle: "Bibliothèque de cas",
};
export const META_DESCRIPTION = deepTypo(
  "La première bibliothèque multi-acteurs consacrée à la digitalisation du catalogue : des dispositifs déployés par des enseignes, documentés selon une grille commune.",
);

/** Chapô de la section « Le contexte » (1. Intro du Word). */
export const CONTEXT_INTRO = deepTypo(
  "Depuis la publication du Guide de la Digitalisation du Catalogue en 2025, le marché a évolué. Le catalogue de demain est déjà dans les usages : 75 % des Français consultent des catalogues et des prospectus en version numérique (Arcep, 2025) et 56 % visiteraient un point de vente après avoir consulté une promotion digitale (Bonial, 2025).",
);

/** Un bloc de texte : un paragraphe, ou une liste à puces. */
export type ContextBlock = string | { list: string[] };

export interface ContextSection {
  id: string;
  navLabel: string;
  title: string;
  paragraphs: ContextBlock[];
}

/** Parties de la section « Le contexte » (navigation verticale). 1.1 → parties 1 et 2, 1.2 → parties 3 et 4. */
export const contextSections: ContextSection[] = deepTypo([
  {
    id: "nature",
    navLabel: "Évolution",
    title: "Du document diffusé au dispositif piloté",
    paragraphs: [
      "Le catalogue promotionnel structure depuis longtemps la promotion en magasin : il porte le calendrier des temps forts, la mise en avant des offres et du prix, et sert de support de préparation des achats. Sa digitalisation a d'abord consisté à le mettre en ligne au format PDF. Elle change aujourd'hui de nature : on passe d'un document diffusé à un dispositif piloté, activé dans plusieurs environnements et alimenté par la donnée.",
    ],
  },
  {
    id: "deploiement",
    navLabel: "Déploiement",
    title: "Du test au déploiement",
    paragraphs: [
      "Ce n'est plus un sujet d'expérimentation : c'est un sujet de déploiement. Les dispositifs s'installent désormais davantage dans la durée : moins de logique de test et davantage de fil rouge, qui permet d'ajouter de nouvelles briques ; des enseignes dont les dispositifs se diversifient avec, pour le catalogue digital, la conviction que la mesure et la donnée en libèrent le plein potentiel. Cette dynamique s'inscrit dans une croissance globale du digital dans les stratégies de trafic en magasin, avec un drive-to-store digital qui atteint **2,1 Md€ en 2025 (+33,4 % vs 2024)** (Baromètre Drive-to-Store 2026, Alliance Digitale / France Pub, 20 octobre 2026).",
    ],
  },
  {
    id: "papier",
    navLabel: "Papier et digital",
    title: "Du remplacement du papier à la composition d'un mix",
    paragraphs: [
      "L'enjeu n'est plus d'opposer catalogue papier et catalogue digital, mais de tirer parti de leur complémentarité. Un changement de paradigme et une nouvelle approche qui doivent permettre de détecter les zones à forte appétence digitale, tout en maintenant une présence papier pertinente là où elle reste génératrice de trafic.",
    ],
  },
  {
    id: "actifs",
    navLabel: "Bénéfices et actifs",
    title: "Des bénéfices qui se déclinent en actifs",
    paragraphs: [
      "Le digital y apporte ses propres bénéfices, cités par les enseignes, tels que la traçabilité, la personnalisation et la réactivité (questionnaire auprès de 19 enseignes GSA et GSS, Guide de la Digitalisation du Catalogue, Alliance Digitale, 2025). Ces bénéfices se déclinent en actifs que l'enseigne peut combiner :",
      {
        list: [
          "**La donnée d'abord** (géolocalisée, shopper, produit) : elle permet de reproduire la couverture locale du papier, d'adapter l'offre à chaque point de vente et de tenir compte du stock.",
          "**La déclinaison créative ensuite** : un même catalogue peut être décliné à l'échelle de chaque point de vente ou de chaque audience.",
          "**La personnalisation de l'expérience client** : magasin préféré, alertes, liste de courses, lien avec le programme de fidélité.",
          "**Enfin le découpage local et national** : piloter à l'échelle du réseau, exécuter à celle de la zone de chalandise.",
        ],
      },
      "L'enjeu est donc de trouver **le bon équilibre entre diffusion papier et activation digitale**, en fonction des réalités de chaque territoire.",
    ],
  },
]);

/** Section « Objectif de la bibliothèque » (2. du Word), placée juste avant le module de recherche. */
export const OBJECTIVE_TITLE = "Objectif de la bibliothèque";
export const OBJECTIVE = deepTypo([
  "Cette bibliothèque prolonge le Guide de la Digitalisation du Catalogue (Alliance Digitale, 2025), qui posait le cadre des principaux enjeux des enseignes en matière d'activation, de mesure, de donnée et de création. Elle est la première bibliothèque multi-acteurs consacrée à la digitalisation du catalogue : elle réunit des dispositifs déployés par des enseignes, documentés selon une grille commune par les acteurs de l'écosystème média qui les ont accompagnées. Elle répond à une question simple : qu'a-t-on mis en place, avec quels résultats, et qu'est-ce qui peut être transposé à sa propre situation ?",
  "Elle s'adresse aux décideurs enseignes, quels que soient leur taille, leur secteur ou leur maturité. Chaque cas est qualifié par des tags pour retrouver rapidement les situations proches de la sienne. L'ambition est opérationnelle : repartir avec des repères pour agir plus qu'avec une vision.",
]);

/** Appel à contributions ; le segment « Proposer un cas » devient le lien vers la page. */
export const CONTRIBUTE = deepTypo(
  "Cette première version a vocation à s'enrichir : si vous avez un cas ou un retour d'expérience à partager, proposez-le depuis la page « Proposer un cas ».",
);
export const CONTRIBUTE_LINK = "Proposer un cas";

export const PRECAUTIONS = deepTypo(
  "Les résultats sont déclaratifs et validés par les annonceurs. Les méthodes de mesure diffèrent d'un cas à l'autre et sont précisées lorsque cela a été possible. Les cas illustrent des dispositifs réels ; ils ne constituent pas un benchmark et ne se comparent pas terme à terme.",
);

export const LESSONS_INTRO = deepTypo(
  "Les enseignements ci-dessous sont tirés des cas réunis. Organisés selon les étapes d'un dispositif, de la donnée à la mesure et à l'optimisation, ils se lisent comme des leçons à retenir plus que comme des prescriptions : chaque enseigne les adaptera à son réseau, à sa maturité et à ses moyens.",
);

/** Ouverture (4. du Word). */
export const OPENING_TITLE = deepTypo(
  "Le commerce agentique : une évolution du commerce, pas une simple révolution technologique",
);
export const OPENING = deepTypo([
  "Une nouvelle étape s'ouvre : celle du **commerce agentique**. Aujourd'hui, le consommateur ne cherche plus systématiquement une offre ; il peut être accompagné par des agents intelligents capables de comprendre son intention, de comparer les alternatives et de recommander la solution la plus pertinente au bon moment.",
  "Cette transformation intervient alors que le retail media poursuit sa forte croissance. Selon le rapport *The Future of Commerce Media 2025* de WARC, les investissements mondiaux en retail media atteignent **174,9 milliards de dollars en 2025** et devraient dépasser les dépenses publicitaires combinées de la télévision linéaire et connectée dès 2026.",
  "En parallèle, le marché adressable du **commerce agentique est déjà estimé à 136 milliards de dollars en 2025** et pourrait atteindre **1 700 milliards de dollars d'ici 2030** (Edgar, Dunn & Company, repris par WARC), signe que les agents IA s'installent progressivement au cœur des parcours d'achat.",
  "Dans ce contexte, le catalogue digital n'est plus seulement un support de communication. Il devient un **flux de données vivant**, exploitable par les moteurs de recherche, les plateformes retail media et les assistants conversationnels. On passe progressivement d'une logique d'exposition à une logique de recommandation.",
  "Le défi pour les marques change donc de nature. Il ne s'agit plus seulement d'être visible, mais d'être **compréhensible, qualifiable et recommandable** par les algorithmes. La qualité des données produit, l'enrichissement des contenus, les avis, la disponibilité ou encore les signaux de confiance deviennent des actifs stratégiques.",
  "Mais le véritable enjeu dépasse la technologie. Il concerne la place de la marque dans la décision d'achat.",
  "Le risque n'est pas la disparition des marques. Le risque est leur **banalisation**. Dans un commerce de plus en plus guidé par la recommandation algorithmique, la valeur d'une marque ne reposera plus uniquement sur sa notoriété ou son storytelling, mais aussi sur sa capacité à être choisie par ces nouveaux intermédiaires numériques.",
  "**Hier, les marques devaient être vues. Aujourd'hui, elles doivent être trouvées. Demain, elles devront être recommandées.**",
]);

export const GUIDE_BLOCK = deepTypo(
  "Cette bibliothèque prolonge le Guide de la Digitalisation du Catalogue publié par Alliance Digitale en 2025. Il pose le cadre : état du marché, besoins des consommateurs et des enseignes, leviers d'activation, formats, mesure, usage de la donnée et création.",
);
