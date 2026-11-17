import { Link } from "@tanstack/react-router";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { displayBrand, type CaseStudy } from "@/data/cases";
import { logoOf } from "@/data/logos";
import { labelOf } from "@/data/taxonomy";
import { downloadCasePdf } from "@/lib/pdf";
import { cn } from "@/lib/utils";
import { EnvBadge, FacetTag, Tag } from "./ui-bits";

export function PdfIconButton({ c }: { c: CaseStudy }) {
  const [busy, setBusy] = useState(false);
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={async () => { setBusy(true); try { await downloadCasePdf(c); } finally { setBusy(false); } }}
          aria-label={`Télécharger la fiche de ce cas (PDF) : ${displayBrand(c)}`}
          className="relative z-10 inline-flex size-11 items-center justify-center rounded-md border border-border bg-card text-foreground hover:bg-accent"
        >
          {busy ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Download className="size-4" aria-hidden />}
        </button>
      </TooltipTrigger>
      <TooltipContent>Télécharger la fiche de ce cas (PDF)</TooltipContent>
    </Tooltip>
  );
}

export function CaseCard({ c, large, footnote }: { c: CaseStudy; large?: boolean; footnote?: string }) {
  const envs = c.tags.environments;
  return (
    <article className={cn("group relative flex flex-col rounded-xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(26,26,46,0.04)] transition-shadow focus-within:ring-2 focus-within:ring-ring hover:shadow-md", large && "md:p-7")}>
      <div className="flex flex-wrap items-center gap-1.5">
        {c.tags.pdvType.map((p) => <FacetTag key={p} facet="pdv">{labelOf(p)}</FacetTag>)}
        <FacetTag facet="echelle">{labelOf(c.tags.scale)}</FacetTag>
        <FacetTag facet="frequence">{labelOf(c.tags.frequency)}</FacetTag>
      </div>
      {/* Logo de l'enseigne s'il est déclaré (src/data/logos.ts), sinon son nom. */}
      {!c.anonymous && logoOf(c.brand)
        ? <img src={logoOf(c.brand)} alt={c.brand} loading="lazy" className="mt-4 h-7 w-auto max-w-[140px] object-contain object-left" />
        : <p className="mt-4 text-sm font-medium text-muted-foreground">{displayBrand(c)}</p>}
      <h3 className={cn("mt-1 line-clamp-4 font-semibold leading-snug", large ? "text-xl md:text-2xl" : "text-lg")}>
        <Link to="/cas/$slug" params={{ slug: c.slug }} className="after:absolute after:inset-0 after:rounded-xl focus:outline-none">
          {c.challenge}
        </Link>
      </h3>
      {c.keyFigure && (
        <p className="mt-4">
          <span className={cn("num block font-extrabold leading-none text-primary", large ? "text-5xl" : "text-4xl")}>{c.keyFigure.value}</span>
          <span className="mt-1 block text-sm text-muted-foreground">{c.results[0]?.label}</span>
        </p>
      )}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {envs.slice(0, 3).map((e) => <EnvBadge key={e} id={e} />)}
        {envs.length > 3 && <Tag>+{envs.length - 3}</Tag>}
      </div>
      {footnote && <p className="mt-3 text-xs text-muted-foreground">{footnote}</p>}
      <div className="mt-auto flex items-center justify-between pt-5">
        <span className="text-sm font-semibold text-primary group-hover:underline" aria-hidden>Voir le cas</span>
        <PdfIconButton c={c} />
      </div>
    </article>
  );
}

export function PdfButton({ c, variant = "default" }: { c: CaseStudy; variant?: "default" | "outline" }) {
  const [busy, setBusy] = useState(false);
  return (
    <Button variant={variant} className="h-11" disabled={busy} onClick={async () => { setBusy(true); try { await downloadCasePdf(c); } finally { setBusy(false); } }}>
      {busy ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Download className="size-4" aria-hidden />}
      Télécharger la fiche (PDF)
    </Button>
  );
}

