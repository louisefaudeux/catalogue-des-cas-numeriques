import type { CaseStudy } from "@/data/cases";
import { FACETS, type FacetKey } from "@/data/taxonomy";

export type Selection = Partial<Record<FacetKey, string[]>>;

export const caseValues = (c: CaseStudy, k: FacetKey): string[] => {
  switch (k) {
    case "pdv": return c.tags.pdvType;
    case "echelle": return [c.tags.scale];
    case "frequence": return [c.tags.frequency];
    case "kpi": return [c.tags.mainKpi];
    case "env": return c.tags.environments;
    case "format": return c.tags.formats;
    case "data": return c.tags.dataSources;
  }
};

/** OR within a facet, AND between facets. */
export const matches = (c: CaseStudy, sel: Selection, except?: FacetKey) =>
  FACETS.every(({ key }) => {
    if (key === except) return true;
    const v = sel[key];
    if (!v?.length) return true;
    return caseValues(c, key).some((x) => v.includes(x));
  });

export const matchesQuery = (c: CaseStudy, q: string) => {
  if (!q.trim()) return true;
  const n = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const hay = n([c.anonymous ? "" : c.brand, c.challenge, ...c.partners, c.contributor].join(" "));
  return n(q).split(/\s+/).every((w) => hay.includes(w));
};

export const facetCount = (cases: CaseStudy[], sel: Selection, key: FacetKey, optionId: string) =>
  cases.filter((c) => matches(c, sel, key) && caseValues(c, key).includes(optionId)).length;

export const filterCases = (cases: CaseStudy[], sel: Selection, q = "", documentedOnly = false) =>
  cases.filter((c) => matches(c, sel) && matchesQuery(c, q) && (!documentedOnly || c.status === "documented"));

export const sortCases = (cases: CaseStudy[], sort: "reco" | "az") =>
  [...cases].sort((a, b) =>
    sort === "reco" && a.status !== b.status
      ? a.status === "documented" ? -1 : 1
      : a.brand.localeCompare(b.brand, "fr", { numeric: true }),
  );

const W: Partial<Record<FacetKey, number>> = { pdv: 2, echelle: 2 };
export const proximity = (a: CaseStudy, b: CaseStudy) => {
  let score = 0;
  const shared: string[] = [];
  for (const { key } of FACETS) {
    const common = caseValues(a, key).filter((x) => caseValues(b, key).includes(x));
    score += common.length * (W[key] ?? 1);
    shared.push(...common);
  }
  return { score, shared };
};

export const similarCases = (c: CaseStudy, all: CaseStudy[], n = 3) =>
  all
    .filter((x) => x.slug !== c.slug)
    .map((x) => ({ c: x, ...proximity(c, x) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n);
