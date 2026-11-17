import { describe, expect, it } from "vitest";
import { CASES, splitPartner } from "@/data/cases";
import { DATA_SOURCES, ENVIRONMENTS, FACETS, FORMATS, FREQUENCIES, KPIS, LIBRARY_FILTERS, METHODS, PDV_TYPES, SCALES } from "@/data/taxonomy";
import { caseValues, facetCount, filterCases, similarCases } from "./filters";

const ids = (l: { id: string }[]) => new Set(l.map((o) => o.id));

describe("filters", () => {
  it("OR within a facet: GSA or GSS returns the union", () => {
    const gsa = filterCases(CASES, { pdv: ["gsa"] }).length;
    const gss = filterCases(CASES, { pdv: ["gss"] }).length;
    const both = filterCases(CASES, { pdv: ["gsa", "gss"] }).length;
    expect(both).toBe(gsa + gss); // un cas n'a qu'un type de PDV
  });
  it("AND between facets: every result matches both facets", () => {
    const res = filterCases(CASES, { pdv: ["gsa"], frequence: ["fil-rouge"] });
    expect(res.length).toBeGreaterThan(0);
    expect(res.every((c) => c.tags.pdvType.includes("gsa") && c.tags.frequency === "fil-rouge")).toBe(true);
  });
  it("facet counts ignore the facet's own selection", () => {
    expect(facetCount(CASES, { pdv: ["gsa"] }, "pdv", "gss")).toBe(filterCases(CASES, { pdv: ["gss"] }).length);
  });
  it("library filters exclude catalogue format and data sources (tags kept on cases)", () => {
    expect(LIBRARY_FILTERS.map((f) => f.key)).toEqual(["pdv", "echelle", "frequence", "kpi", "env"]);
    expect(FACETS.map((f) => f.key)).toContain("format");
  });
  it("similar cases exclude the case itself", () => {
    const s = similarCases(CASES[0]!, CASES);
    expect(s).toHaveLength(3);
    expect(s.some((x) => x.c.slug === CASES[0]!.slug)).toBe(false);
  });
});

describe("case data", () => {
  it("has unique slugs", () => {
    const slugs = CASES.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
  it("uses only tag ids that exist in the taxonomy", () => {
    const valid = {
      pdv: ids(PDV_TYPES), echelle: ids(SCALES), frequence: ids(FREQUENCIES), kpi: ids(KPIS),
      env: ids(ENVIRONMENTS), format: ids(FORMATS), data: ids(DATA_SOURCES),
    } as const;
    for (const c of CASES) {
      for (const k of Object.keys(valid) as (keyof typeof valid)[]) {
        for (const v of caseValues(c, k)) expect(valid[k].has(v), `${c.slug} : ${k} = ${v}`).toBe(true);
      }
      for (const l of c.levers) for (const e of l.environments) expect(valid.env.has(e), `${c.slug} : levier ${e}`).toBe(true);
      expect(METHODS[c.method.type], c.slug).toBeDefined();
    }
  });
  it("keeps anonymised cases free of real brand names", () => {
    for (const c of CASES.filter((x) => x.anonymous && x.status === "documented")) {
      expect(c.brand).toBe("Enseigne anonymisée");
    }
  });
  it("splits partners into a name and an optional role", () => {
    expect(splitPartner("Zenith (agence média)")).toEqual({ name: "Zenith", role: "agence média" });
    expect(splitPartner("Nanotera")).toEqual({ name: "Nanotera" });
    for (const c of CASES) for (const p of c.partners) expect(splitPartner(p).name.length, `${c.slug} : ${p}`).toBeGreaterThan(1);
  });
  it("keeps the key figure aligned with the first result shown on cards", () => {
    for (const c of CASES.filter((x) => x.keyFigure)) expect(c.results[0]?.value, c.slug).toBe(c.keyFigure!.value);
  });
});
