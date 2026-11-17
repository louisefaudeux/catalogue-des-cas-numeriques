import { describe, expect, it } from "vitest";
import { contextSections, OPENING, OBJECTIVE } from "@/data/editorial";
import { LESSONS, LESSON_STEPS } from "@/data/lessons";

const texts = (): string[] => [
  ...contextSections.flatMap((s) => s.paragraphs.flatMap((b) => (typeof b === "string" ? [b] : b.list))),
  ...OPENING,
  ...OBJECTIVE,
];

describe("Contenus éditoriaux", () => {
  it("garde sept enseignements, chacun avec un texte et un point de vigilance", () => {
    expect(LESSONS).toHaveLength(7);
    for (const l of LESSONS) {
      expect(l.body.length).toBeGreaterThan(50);
      expect(l.watchpoint.length).toBeGreaterThan(20);
    }
  });

  it("range chaque enseignement dans une des quatre étapes, dans l'ordre des étapes", () => {
    const order = LESSON_STEPS.map((s) => s.id);
    const ranks = LESSONS.map((l) => order.indexOf(l.family));
    expect(ranks.every((r) => r >= 0)).toBe(true);
    expect([...ranks].sort((a, b) => a - b)).toEqual(ranks);
    expect(LESSONS.at(-1)?.title).toMatch(/récurrence/);
  });

  it("n'a pas de marqueur de mise en forme orphelin", () => {
    for (const t of texts()) {
      expect((t.match(/\*\*/g) ?? []).length % 2).toBe(0);
    }
  });

  it("garde des identifiants de parties uniques pour l'intro", () => {
    const ids = contextSections.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(contextSections.length).toBeGreaterThanOrEqual(2);
  });
});
