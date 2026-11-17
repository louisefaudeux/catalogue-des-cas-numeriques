import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { CASES } from "./cases";
import { LOGOS, logoOf, logoSize, LOGO_BOX } from "./logos";

/** Proportions réelles du fichier : en-tête PNG ou viewBox SVG. */
function fileRatio(src: string) {
  const buf = readFileSync(`public${src}`);
  if (src.endsWith(".png")) return buf.readUInt32BE(16) / buf.readUInt32BE(20);
  const vb = /viewBox="([^"]+)"/.exec(buf.toString("utf8"))![1]!.split(/\s+/).map(Number);
  return vb[2]! / vb[3]!;
}

describe("logos", () => {
  it("point to existing files whose proportions match the declared ratio", () => {
    for (const [name, l] of Object.entries(LOGOS)) expect(Math.abs(fileRatio(l.src) / l.ratio - 1), name).toBeLessThan(0.02);
  });
  it("cover every named brand and every contributor of the current cases", () => {
    for (const c of CASES) {
      if (!c.anonymous) expect(logoOf(c.brand), c.brand).toBeDefined();
      expect(logoOf(c.contributor), c.contributor).toBeDefined();
    }
  });
  it("stay within their box whatever the proportions", () => {
    for (const box of Object.values(LOGO_BOX)) for (const r of [1, 2.25, 11.43]) {
      const s = logoSize(r, box);
      expect(s.width).toBeLessThanOrEqual(box.maxW);
      expect(s.height).toBeLessThanOrEqual(box.maxH);
    }
  });
});
