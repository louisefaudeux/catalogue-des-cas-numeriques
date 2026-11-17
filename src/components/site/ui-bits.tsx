import { Home, Share2, Megaphone, ImageIcon, ExternalLink, Info, Store, MapPin, Repeat } from "lucide-react";
import type { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { envById, FACETS, METHODS, type Family, type MethodType } from "@/data/taxonomy";
import { GUIDE_LABEL, GUIDE_URL, PRECAUTIONS } from "@/data/editorial";
import { cn } from "@/lib/utils";

const FAM = {
  owned: { Icon: Home, cls: "bg-owned text-owned-foreground", label: "Owned" },
  shared: { Icon: Share2, cls: "bg-shared text-shared-foreground", label: "Shared" },
  paid: { Icon: Megaphone, cls: "bg-paid text-paid-foreground", label: "Paid" },
} as const;

export function FamilyBadge({ family }: { family: Family }) {
  const f = FAM[family];
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold", f.cls)}>
      <f.Icon className="size-3.5" aria-hidden /> {f.label}
    </span>
  );
}

export function EnvBadge({ id }: { id: string }) {
  const e = envById(id);
  if (!e) return null;
  const f = FAM[e.family!];
  return (
    <span title={e.label} className={cn("inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium", f.cls)}>
      <f.Icon className="size-3.5 shrink-0" aria-hidden />
      <span className="sr-only">{f.label} : </span>
      {e.shortLabel}
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center rounded-md bg-tag px-2 py-0.5 text-xs font-medium text-tag-foreground">{children}</span>;
}

/**
 * Tags de classification des tuiles : chaque facette a son icône et son style
 * (le sens ne repose jamais sur la couleur seule). Mêmes icônes dans les filtres.
 */
export const FACET_TAG = {
  pdv: { Icon: Store, cls: "bg-accent text-accent-foreground" },
  echelle: { Icon: MapPin, cls: "bg-tag text-tag-foreground" },
  frequence: { Icon: Repeat, cls: "border border-input bg-card text-foreground" },
} as const;
export type TaggedFacet = keyof typeof FACET_TAG;

export function FacetTag({ facet, children }: { facet: TaggedFacet; children: ReactNode }) {
  const t = FACET_TAG[facet];
  const label = FACETS.find((f) => f.key === facet)?.label ?? "";
  return (
    <span title={label} className={cn("inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium", t.cls)}>
      <t.Icon className="size-3.5 shrink-0" aria-hidden />
      <span className="sr-only">{label} : </span>
      {children}
    </span>
  );
}

export function IllustrativeBadge() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span tabIndex={0} className="relative z-10 inline-flex items-center rounded-md border border-dashed border-warning-foreground/50 bg-warning px-2 py-0.5 text-xs font-semibold text-warning-foreground">
          Cas illustratif
        </span>
      </TooltipTrigger>
      <TooltipContent>Données fictives, pour tester l'interface</TooltipContent>
    </Tooltip>
  );
}

export function MethodBadge({ type }: { type: MethodType }) {
  const m = METHODS[type];
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button type="button" className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground">
          <span className="text-muted-foreground">Méthode :</span> {m.label}
          <Info className="size-3.5 text-muted-foreground" aria-hidden />
          <span className="sr-only">. {m.definition}</span>
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">{m.definition}</TooltipContent>
    </Tooltip>
  );
}

export function KeyFigure({ value, sentence, source, note, size = "lg" }: { value: string; sentence: string; source: string; note?: string; size?: "lg" | "md" }) {
  return (
    <figure>
      <p className={cn("num font-extrabold leading-none tracking-tight text-primary", size === "lg" ? "text-[56px] md:text-[72px]" : "text-5xl")}>{value}</p>
      <p className="mt-3 max-w-[52ch] text-base text-foreground md:text-lg">{sentence}</p>
      <figcaption className="mt-2 text-sm italic text-muted-foreground">
        Source : {source}
        {note && <span className="not-italic"> ({note})</span>}
      </figcaption>
    </figure>
  );
}

const RATIO: Record<string, string> = { "1:1": "1 / 1", "16:9": "16 / 9", "728:90": "728 / 90", "9:16": "9 / 16", "4:5": "4 / 5", "4:3": "4 / 3" };
export function CreativeSlot({ label, ratio, src, caption }: { label: string; ratio: string; src?: string; caption?: string }) {
  return (
    <figure className="w-full">
      {src ? (
        <img src={src} alt={caption ?? label} className="w-full rounded-lg object-cover" style={{ aspectRatio: RATIO[ratio] }} />
      ) : (
        <div role="img" aria-label={`Emplacement de visuel : ${label}, format ${ratio}. Visuel à fournir par le contributeur.`}
          className={cn("flex w-full flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-input bg-muted/50 p-2 text-center text-xs text-muted-foreground", ratio === "9:16" && "max-w-[220px]")}
          style={{ aspectRatio: RATIO[ratio], minHeight: 56 }}>
          <ImageIcon className="size-5" aria-hidden />
          <span>Visuel à fournir par le contributeur</span>
        </div>
      )}
      <figcaption className="mt-2 text-sm text-muted-foreground">{caption ?? label} · {ratio.replace(":", "×").replace("728×90", "728×90")}</figcaption>
    </figure>
  );
}

export function GuideLink({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <a href={GUIDE_URL} target="_blank" rel="noopener noreferrer" className={cn("inline-flex items-center gap-1.5 font-medium text-primary underline underline-offset-4 hover:no-underline", className)}>
      {children ?? GUIDE_LABEL}
      <ExternalLink className="size-4 shrink-0" aria-hidden />
      <span className="sr-only">(s'ouvre dans un nouvel onglet)</span>
    </a>
  );
}

/** Paragraphe « Précautions de lecture », affiché en petit texte secondaire sous un filet fin. */
export function PrecautionsNote({ className }: { className?: string }) {
  return (
    <p className={cn("border-t border-border pt-4 text-sm text-muted-foreground", className)}>
      <strong className="font-semibold text-foreground">Précautions de lecture.</strong> {PRECAUTIONS}
    </p>
  );
}

export function Notice({ children, tone = "warning" }: { children: ReactNode; tone?: "warning" | "accent" }) {
  return (
    <div role="note" className={cn("flex items-start gap-3 rounded-lg border px-4 py-3 text-sm", tone === "warning" ? "border-warning-foreground/20 bg-warning text-warning-foreground" : "border-primary/20 bg-accent text-accent-foreground")}>
      <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
      <div>{children}</div>
    </div>
  );
}
