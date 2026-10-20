/** French typography: non-breaking spaces before high punctuation, %, € and inside « ». */
export const typo = (s: string) =>
  s
    .replace(/ ([%:;?!€»])/g, "\u00a0$1")
    .replace(/« /g, "«\u00a0")
    .replace(/(\d) (\d{3})/g, "$1\u202f$2");

export function deepTypo<T>(v: T): T {
  if (typeof v === "string") return typo(v) as T;
  if (Array.isArray(v)) return v.map(deepTypo) as T;
  if (v && typeof v === "object") {
    const o: Record<string, unknown> = {};
    for (const [k, val] of Object.entries(v)) o[k] = k === "slug" ? val : deepTypo(val);
    return o as T;
  }
  return v;
}

export const nf = new Intl.NumberFormat("fr-FR");
