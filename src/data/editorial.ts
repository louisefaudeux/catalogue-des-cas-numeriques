import { deepTypo } from "@/lib/typo";

export const GUIDE_URL =
  "https://www.alliancedigitale.org/publication/le-catalogue-se-reinvente-sortie-de-notre-guide-de-la-digitalisation-des-catalogues/";
export const GUIDE_LABEL = "Guide de la Digitalisation du Catalogue (Alliance Digitale, 2025)";
export const SITE_TITLE = "Digitalisation du catalogue : la bibliothèque de cas";
export const BASELINE = "Des retours d'expérience d'enseignes, pour composer son mix.";
export const VERSION_DATE = "21 octobre 2026";

export const CONTEXT_INTRO = deepTypo(
  "Depuis la publication du Guide de la Digitalisation du Catalogue (Alliance Digitale, 2025), le marché a évolué.",
);

export const CONTEXT_SECTIONS = deepTypo([
  {
    id: "1-1",
    title: "Du test au déploiement",
    paragraphs: [
      "Le catalogue promotionnel structure depuis longtemps la promotion en magasin : il porte le calendrier des temps forts, la mise en avant des offres et du prix, et sert de support de préparation des courses. Sa digitalisation a d'abord consisté à le mettre en ligne. Elle change aujourd'hui de nature : on passe d'un document diffusé à un dispositif piloté, activé dans plusieurs environnements et alimenté par la donnée.",
      "Ce n'est plus un sujet d'expérimentation : c'est un sujet de déploiement. Les membres du Groupe de Travail observent des dispositifs qui s'installent dans la durée : moins de logique de test et davantage de fil rouge, qui permet d'ajouter de nouvelles briques ; des acteurs engagés dont les dispositifs gagnent en sophistication ; des enseignes qui avaient abandonné le print et/ou le catalogue et y reviennent, avec, pour le catalogue digital, la conviction qu'un PDF sans analytique correspond au niveau zéro de la digitalisation. Le drive-to-store digital, dont relèvent la plupart des cas de cette bibliothèque, atteint 2,1 Md€ (+33,4 % vs 2024) (Baromètre Drive-to-Store 2026, Alliance Digitale / France Pub, 20 octobre 2026).",
    ],
  },
  {
    id: "1-2",
    title: "Du remplacement du papier à la composition d'un mix",
    paragraphs: [
      "Cette montée en puissance ne signe pas la fin du papier, qui se recompose sous l'effet du coût du papier, de la pression réglementaire et sociétale et de la recherche de ciblage. Sur les neuf premiers mois de 2025, les recettes publicitaires des imprimés sans adresse s'élèvent à 239 M€ (−9,6 % par rapport à 2024) : le prospectus imprimé recule de 14,6 % (182 M€), le prospectus digital progresse de 11,6 % (56 M€) sans compenser ce recul (France Pub / IREP, communiqué BUMP, neuf premiers mois 2025). Le papier conserve un rôle de couverture ; la question n'est donc plus de remplacer un média, mais de composer le bon mix.",
      "Le digital y apporte des bénéfices que le papier ne permet pas de la même façon, tels que la traçabilité, la personnalisation et la réactivité. Ces bénéfices se déclinent en actifs que l'enseigne peut combiner. La donnée d'abord (géolocalisée, shopper, produit) : elle permet de reproduire la couverture locale du papier, d'adapter l'offre à chaque point de vente et de tenir compte du stock. La déclinaison créative ensuite : un même catalogue peut être décliné à l'échelle de chaque point de vente ou de chaque audience. La personnalisation de l'expérience client : magasin préféré, alertes, liste de courses, lien avec le programme de fidélité. Enfin le découpage local et national : piloter à l'échelle du réseau, exécuter à celle de la zone de chalandise. Ces actifs s'activent dans trois environnements, owned, paid et shared, et c'est leur combinaison, plus que le choix d'un canal, qui compose le mix.",
      "Passer d'une logique de distribution de masse à une logique de diffusion ciblée et personnalisée n'est pas seulement un changement technologique : il fait évoluer les process, les organisations et la relation avec les partenaires. Exploiter ces actifs suppose aussi des prérequis : une donnée structurée en amont, une expérience pensée pour le mobile et accessible, une mesure reliée aux outils de l'enseigne. Les enseignements de cette bibliothèque détaillent ces prérequis.",
    ],
  },
]);

/** Phrase de transition entre le contexte et le module de recherche (ex-dernier paragraphe du 1.3). */
export const CONTEXT_TRANSITION = deepTypo(
  "C'est pour documenter cette recomposition par des exemples concrets que le Groupe de Travail a constitué cette bibliothèque.",
);

/** Premier paragraphe de l'ancien panneau 1.3, repris mot pour mot en tête de l'Ouverture. */
export const OPENING_INTRO = deepTypo(
  "La place de l'IA dans les dispositifs de digitalisation du catalogue est appelée à se renforcer. Elle peut enrichir plusieurs étapes : la donnée (enrichissement, détection d'anomalies), l'activation (ciblage, médiaplanning, composition du mix), la création (personnalisation et production de déclinaisons à grande échelle) et la mesure (tableaux de bord, automatisation des rapports, recommandations). Les premiers gains observés portent sur la productivité et sur ce qui n'était pas réalisable manuellement.",
);

export const OBJECTIVE = deepTypo([
  "Cette bibliothèque prolonge le Guide de la Digitalisation du Catalogue, qui posait le cadre autour de quatre enjeux enseignes : ciblage et couverture, contenu et attention, process et réactivité, mesure et pilotage. Elle réunit des retours d'expérience d'annonceurs, documentés selon une même grille, pour répondre à une question simple : qu'a-t-on mis en place, avec quels résultats, et qu'est-ce qui peut être transposé à sa propre situation ?",
  "Elle s'adresse aux décideurs enseignes, quels que soient leur taille, leur secteur (GSA, GSS) ou leur maturité. Chaque cas suit la même structure (contexte et point de départ, dispositif mis en place, résultats mesurés, enseignements transposables, conditions de transposabilité) et est qualifié par des tags (type de point de vente, échelle, fréquence, environnement, format, data) pour retrouver rapidement les situations proches de la sienne. L'ambition est opérationnelle : repartir avec des repères pour agir plus qu'avec une vision.",
]);

export const PRECAUTIONS = deepTypo(
  "Les résultats sont déclaratifs et validés par les annonceurs. Les méthodes de mesure diffèrent d'un cas à l'autre, de l'incrémentalité au comparatif avant/après, et sont précisées lorsque cela a été possible. Les cas illustrent des dispositifs réels ; ils ne constituent pas un benchmark et ne se comparent pas terme à terme.",
);

export const LESSONS_INTRO = deepTypo(
  "Les enseignements ci-dessous sont tirés des cas réunis et des échanges du Groupe de Travail. Organisés selon les actifs du mix, ils se lisent comme des leçons à retenir plus que comme des prescriptions : chaque enseigne les adaptera à son réseau, à sa maturité et à ses moyens.",
);

export const OPENING = deepTypo([
  "Les usages de l'IA gagneront à être distingués selon la couche concernée (outils internes des régies et des enseignes, accompagnement des clients, appropriation par les points de vente) et selon l'échelle, locale ou nationale. Côté points de vente, la capacité à produire ses propres supports pose une question de cohérence de l'image nationale.",
  "À plus long terme, la question dépasse les usages opérationnels : comment intégrer l'expérience catalogue à l'agentic commerce, où un agent d'IA devient l'intermédiaire entre l'enseigne et le consommateur et lui propose l'offre promotionnelle plutôt qu'il ne la consulte lui-même ? Ce sujet, encore prospectif, pourra faire l'objet de travaux futurs.",
]);

export const GUIDE_BLOCK = deepTypo(
  "Cette bibliothèque prolonge le Guide de la Digitalisation du Catalogue publié par Alliance Digitale en 2025. Il pose le cadre : état du marché, besoins des consommateurs et des enseignes, leviers d'activation, formats, mesure, usage de la donnée et création.",
);
