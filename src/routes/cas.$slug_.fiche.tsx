import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Printer } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { OnePager } from "@/components/site/OnePager";
import { displayBrand, getCase } from "@/data/cases";
import { todayFr } from "@/lib/pdf";
import { PdfButton } from "./cas.$slug";

export const Route = createFileRoute("/cas/$slug_/fiche")({
  validateSearch: (s: Record<string, unknown>): { imprimer?: 1 } => (s.imprimer ? { imprimer: 1 } : {}),
  loader: ({ params }) => {
    if (!getCase(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    const c = loaderData && getCase(loaderData.slug);
    const t = c ? `Fiche à télécharger — ${displayBrand(c)}` : "Fiche introuvable";
    return { meta: [{ title: t }, { name: "description", content: "Fiche d'une page à partager." }, { property: "og:title", content: t }, { property: "og:description", content: "Fiche d'une page à partager." }] };
  },
  component: Fiche,
});

const print = () => {
  document.body.classList.add("print-onepager");
  window.print();
  setTimeout(() => document.body.classList.remove("print-onepager"), 500);
};

function Fiche() {
  const { slug } = Route.useLoaderData();
  const { imprimer } = Route.useSearch();
  const c = getCase(slug)!;
  const [date, setDate] = useState("");
  const [scale, setScale] = useState(0.6);
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setDate(todayFr());
    const fit = () => wrap.current && setScale(Math.min(1, (wrap.current.clientWidth - 16) / 794, (window.innerHeight - 200) / 1123 > 0.5 ? (window.innerHeight - 200) / 1123 : 0.5));
    fit();
    window.addEventListener("resize", fit);
    if (imprimer) setTimeout(print, 400);
    return () => window.removeEventListener("resize", fit);
  }, [imprimer]);

  return (
    <div className="bg-muted py-6">
      <div className="no-print mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-4">
        <h1 className="text-xl font-semibold">Fiche à télécharger — {displayBrand(c)}</h1>
        <div className="flex flex-wrap gap-2">
          <PdfButton c={c} />
          <Button variant="outline" className="h-11" onClick={print}><Printer className="size-4" aria-hidden /> Imprimer</Button>
          <Button asChild variant="ghost" className="h-11"><Link to="/cas/$slug" params={{ slug }}><ArrowLeft className="size-4" aria-hidden /> Retour au cas</Link></Button>
        </div>
      </div>
      <div ref={wrap} className="mx-auto mt-6 flex max-w-[1200px] justify-center px-2">
        <div style={{ width: 794 * scale, height: 1123 * scale }} className="shadow-xl">
          <div className="onepager-print origin-top-left" style={{ transform: `scale(${scale})`, width: 794 }}>
            <OnePager c={c} date={date} />
          </div>
        </div>
      </div>
    </div>
  );
}
