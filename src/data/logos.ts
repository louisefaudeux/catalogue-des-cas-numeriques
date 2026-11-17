/**
 * Logos des enseignes, des apporteurs de cas et des autres partenaires : fiches, fiche PDF et tuiles de la bibliothèque (enseigne).
 * Fichiers dans `public/logos/` : SVG de préférence, sinon PNG à fond transparent, version horizontale.
 * La clé est le nom tel qu'il est saisi dans `cases.ts` : `brand`, `contributor`, ou nom d'un partenaire sans son rôle
 * (« Zenith » pour « Zenith (agence média) »).
 * Sans entrée ici, le nom s'affiche en toutes lettres : ajouter une ligne suffit quand un logo arrive.
 */
export const LOGOS: Record<string, string> = {
  // "Netto": "/logos/netto.svg",
};

// Les textes passent par la typographie française (espaces insécables) : on compare les noms espaces normalisés.
const norm = (s: string) => s.replace(/[\u00a0\u202f]/g, " ").trim();
const BY_NAME = new Map(Object.entries(LOGOS).map(([k, v]) => [norm(k), v]));
export const logoOf = (name: string): string | undefined => BY_NAME.get(norm(name));
