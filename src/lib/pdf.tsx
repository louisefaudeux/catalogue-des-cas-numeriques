import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { OnePager } from "@/components/site/OnePager";
import type { CaseStudy } from "@/data/cases";

export const todayFr = () => new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
export const pdfName = (slug: string) => `Fiche-cas_${slug}_2026-10.pdf`;

/** Renders the same OnePager used by the preview offscreen, then captures it to an A4 PDF. */
export async function downloadCasePdf(c: CaseStudy) {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import("html2canvas-pro"), import("jspdf")]);
  const host = document.createElement("div");
  host.style.cssText = "position:fixed;left:-10000px;top:0;";
  document.body.appendChild(host);
  const root = createRoot(host);
  flushSync(() => root.render(<TooltipProvider><OnePager c={c} date={todayFr()} /></TooltipProvider>));
  try {
    await document.fonts.ready;
    const canvas = await html2canvas(host.firstElementChild as HTMLElement, { scale: 2.5, backgroundColor: "#ffffff" });
    const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
    pdf.addImage(canvas.toDataURL("image/jpeg", 0.92), "JPEG", 0, 0, 210, 297);
    pdf.save(pdfName(c.slug));
  } finally {
    root.unmount();
    host.remove();
  }
}
