/**
 * Logos des enseignes et des apporteurs de cas (pas des autres partenaires, choix du 17/11) : fiches, fiche PDF, tuiles (enseigne).
 * Fichiers dans `public/logos/` : SVG ou PNG à fond transparent, rognés au plus près (posés sans cartouche sur le fond de page).
 * La clé est le nom tel qu'il est saisi dans `cases.ts` (`brand` ou `contributor`) ; `ratio` = largeur / hauteur du fichier.
 * Sans entrée ici, le nom s'affiche en toutes lettres : ajouter une ligne suffit quand un logo arrive.
 */
export interface LogoAsset { src: string; ratio: number }

export const LOGOS: Record<string, LogoAsset> = {
  // Enseignes
  "Netto": { src: "/logos/netto.png", ratio: 2.25 },
  "Jardiland": { src: "/logos/jardiland.png", ratio: 2.74 },
  "Feu Vert": { src: "/logos/feu-vert.png", ratio: 4.525 },
  "Carrefour": { src: "/logos/carrefour.svg", ratio: 1.241 },
  "BUT": { src: "/logos/but.png", ratio: 1 },
  "Brico Dépôt": { src: "/logos/brico-depot.svg", ratio: 1.644 },
  "Coopérative U": { src: "/logos/cooperative-u.png", ratio: 4.339 },
  "RONA": { src: "/logos/rona.png", ratio: 4.425 },
  // Apporteurs de cas
  "Azira": { src: "/logos/azira.png", ratio: 4.991 },
  "DeepReach": { src: "/logos/deepreach.png", ratio: 5.412 },
  "Azerion": { src: "/logos/azerion.png", ratio: 5.716 },
  "Mobsuccess": { src: "/logos/mobsuccess.png", ratio: 11.43 },
  "Nanotera": { src: "/logos/nanotera.png", ratio: 8.333 },
  "Aristid": { src: "/logos/aristid.svg", ratio: 5.158 },
};

// Les textes passent par la typographie française (espaces insécables) : on compare les noms espaces normalisés.
const norm = (s: string) => s.replace(/[  ]/g, " ").trim();
const BY_NAME = new Map(Object.entries(LOGOS).map(([k, v]) => [norm(k), v]));
export const logoOf = (name: string): LogoAsset | undefined => BY_NAME.get(norm(name));

/**
 * Taille d'affichage à surface visuelle constante : un logo carré et un logo très allongé pèsent autant à l'œil.
 * Bornée par une hauteur et une largeur maximales (le logo carré plafonne en hauteur, le très allongé en largeur).
 */
export function logoSize(ratio: number, box: { area: number; maxW: number; maxH: number }) {
  let w = Math.sqrt(box.area * ratio);
  let h = Math.sqrt(box.area / ratio);
  if (h > box.maxH) { h = box.maxH; w = h * ratio; }
  if (w > box.maxW) { w = box.maxW; h = w / ratio; }
  return { width: Math.round(w), height: Math.round(h) };
}

/** Gabarits : synthèse de la fiche, tuile de la bibliothèque, fiche PDF. */
export const LOGO_BOX = {
  synthesis: { area: 48 * 130, maxW: 220, maxH: 56 },
  tile: { area: 28 * 90, maxW: 140, maxH: 36 },
  pdf: { area: 34 * 100, maxW: 160, maxH: 44 },
} as const;
