/**
 * Logos des enseignes et des apporteurs de cas, utilisés sur les fiches (et plus tard sur les tuiles).
 * Fichiers dans `public/logos/` : SVG de préférence, sinon PNG à fond transparent, version horizontale.
 * La clé est le nom tel qu'il est saisi dans `cases.ts` (champ `brand` ou `contributor`).
 * Sans entrée ici, le nom s'affiche en toutes lettres : ajouter une ligne suffit quand un logo arrive.
 */
export const LOGOS: Record<string, string> = {
  // "Netto": "/logos/netto.svg",
};

export const logoOf = (name: string): string | undefined => LOGOS[name];
