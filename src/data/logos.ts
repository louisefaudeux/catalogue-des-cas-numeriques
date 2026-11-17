/**
 * Logos des enseignes et des apporteurs de cas (pas des autres partenaires, choix du 17/11) : fiches, fiche PDF, tuiles (enseigne).
 * Fichiers dans `public/logos/` : SVG de préférence, sinon PNG à fond transparent (posés sans cartouche sur le fond de page), version horizontale.
 * La clé est le nom tel qu'il est saisi dans `cases.ts` (`brand` ou `contributor`).
 * Sans entrée ici, le nom s'affiche en toutes lettres : ajouter une ligne suffit quand un logo arrive.
 */
export const LOGOS: Record<string, string> = {
  // "Netto": "/logos/netto.svg",
};

// Les textes passent par la typographie française (espaces insécables) : on compare les noms espaces normalisés.
const norm = (s: string) => s.replace(/[\u00a0\u202f]/g, " ").trim();
const BY_NAME = new Map(Object.entries(LOGOS).map(([k, v]) => [norm(k), v]));
export const logoOf = (name: string): string | undefined => BY_NAME.get(norm(name));
