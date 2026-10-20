import { describe, expect, it } from "vitest";
import { CASES } from "@/data/cases";
import { facetCount, filterCases, similarCases } from "./filters";

describe("filters", () => {
  it("library holds 10 cases, 2 documented", () => {
    expect(CASES).toHaveLength(10);
    expect(CASES.filter((c) => c.status === "documented").map((c) => c.slug)).toEqual(["netto", "jardiland"]);
  });
  it("OR within a facet", () => {
    expect(filterCases(CASES, { pdv: ["gsa", "gss"] }).length).toBe(9);
  });
  it("AND between facets", () => {
    expect(filterCases(CASES, { pdv: ["gsa"], frequence: ["fil-rouge"] }).map((c) => c.slug).sort()).toEqual(
      ["illustratif-6", "illustratif-7", "netto"],
    );
  });
  it("facet counts ignore the facet's own selection", () => {
    expect(facetCount(CASES, { pdv: ["gsa"] }, "pdv", "gss")).toBe(5);
  });
  it("similar cases exclude the case itself", () => {
    const s = similarCases(CASES[0]!, CASES);
    expect(s).toHaveLength(3);
    expect(s.some((x) => x.c.slug === "netto")).toBe(false);
  });
});
