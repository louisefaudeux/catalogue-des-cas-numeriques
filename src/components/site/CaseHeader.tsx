import { Store } from "lucide-react";
import type { ReactNode } from "react";
import { displayBrand, splitPartner, type CaseStudy } from "@/data/cases";
import { logoOf } from "@/data/logos";
import { FACETS, labelOf, type FacetKey } from "@/data/taxonomy";
import { cn } from "@/lib/utils";
import { EnvBadge, FacetTag, Tag } from "./ui-bits";

const facetLabel = (k: FacetKey) => FACETS.find((f) => f.key === k)?.label ?? k;
const sentenceCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Une des deux parties mises en avant : l'enseigne ou l'apporteur du cas. Logo si fourni (`src/data/logos.ts`), sinon le nom seul. */
function Actor({ role, name, anonymous }: { role: string; name: string; anonymous?: boolean }) {
  const logo = anonymous ? undefined : logoOf(name);
  return (
    <div className="flex min-w-0 items-center gap-4 p-5">
      {logo && (
        <span className="flex h-14 w-28 shrink-0 items-center justify-center rounded-lg border border-line bg-white p-2">
          <img src={logo} alt="" className="max-h-full max-w-full object-contain" />
        </span>
      )}
      {anonymous && (
        <span className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground" aria-hidden>
          <Store className="size-6" />
        </span>
      )}
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{role}</p>
        <p className={cn("mt-1 text-xl font-semibold leading-tight", anonymous && "text-muted-foreground")}>{name}</p>
      </div>
    </div>
  );
}

/** Acteurs du cas : enseigne et apporteur valorisés, autres partenaires et période en dessous. */
export function CaseActors({ c, className }: { c: CaseStudy; className?: string }) {
  const partners = c.partners.map(splitPartner);
  return (
    <section aria-label="Acteurs du cas" className={cn("rounded-xl border border-line bg-card", className)}>
      <div className="grid divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        <Actor role="Enseigne" name={displayBrand(c)} anonymous={!!c.anonymous} />
        <Actor role="Apporteur du cas" name={c.contributor} />
      </div>
      <dl className="grid gap-x-6 gap-y-2 border-t border-line px-5 py-4 text-sm sm:grid-cols-[160px_1fr]">
        {partners.length > 0 && (
          <>
            <dt className="text-muted-foreground">Autres partenaires</dt>
            <dd>
              {partners.map((p, i) => (
                <span key={p.name}>
                  {i > 0 && <span className="px-2 text-muted-foreground" aria-hidden>·</span>}
                  <span className="font-semibold">{p.name}</span>
                  {p.role && <span className="text-muted-foreground"> ({p.role})</span>}
                </span>
              ))}
            </dd>
          </>
        )}
        <dt className="text-muted-foreground">Période</dt>
        <dd>{sentenceCase(c.period)}</dd>
      </dl>
    </section>
  );
}

function Item({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="mt-1.5 flex flex-wrap items-center gap-1.5">{children}</dd>
    </div>
  );
}

/** Tags de classification du cas, sous les acteurs. Les valeurs « Autre » affichent la précision du contributeur. */
export function CaseTags({ c, className }: { c: CaseStudy; className?: string }) {
  const other = c.tags.otherSpecified ?? {};
  const withOther = (id: string, key: string) => (other[key] && /^autre/.test(id) ? `Autre : ${other[key]}` : labelOf(id));
  const row = "grid gap-1.5 sm:grid-cols-[220px_1fr] sm:items-baseline sm:gap-x-6";
  return (
    <section aria-labelledby="tags-cas" className={cn("rounded-xl border border-line bg-card p-5", className)}>
      <h2 id="tags-cas" className="sr-only">Tags du cas</h2>
      <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
        <Item label={facetLabel("pdv")}>{c.tags.pdvType.map((p) => <FacetTag key={p} facet="pdv">{withOther(p, "pdvType")}</FacetTag>)}</Item>
        <Item label={facetLabel("echelle")}><FacetTag facet="echelle">{labelOf(c.tags.scale)}</FacetTag></Item>
        <Item label={facetLabel("frequence")}>
          <FacetTag facet="frequence">{labelOf(c.tags.frequency)}</FacetTag>
          {c.tags.frequencyDetail && <span className="text-xs text-muted-foreground">{c.tags.frequencyDetail}</span>}
        </Item>
        <Item label="Nombre de points de vente"><span className="text-sm">{c.tags.pdvCount}</span></Item>
      </dl>
      <dl className="mt-5 space-y-3 border-t border-line pt-5">
        <div className={row}><dt className="text-xs font-medium text-muted-foreground">{facetLabel("kpi")}</dt>
          <dd><Tag>{withOther(c.tags.mainKpi, "mainKpi")}</Tag></dd></div>
        <div className={row}><dt className="text-xs font-medium text-muted-foreground">{facetLabel("env")}</dt>
          <dd className="flex flex-wrap items-center gap-1.5">
            {c.tags.environments.map((e) => <EnvBadge key={e} id={e} />)}
            {other["environments"] && <span className="text-xs text-muted-foreground">Autre : {other["environments"]}</span>}
          </dd></div>
        <div className={row}><dt className="text-xs font-medium text-muted-foreground">{facetLabel("format")}</dt>
          <dd className="flex flex-wrap gap-1.5">{c.tags.formats.map((f) => <Tag key={f}>{labelOf(f)}</Tag>)}</dd></div>
        <div className={row}><dt className="text-xs font-medium text-muted-foreground">{facetLabel("data")}</dt>
          <dd className="flex flex-wrap gap-1.5">{c.tags.dataSources.map((d) => <Tag key={d}>{labelOf(d)}</Tag>)}</dd></div>
      </dl>
    </section>
  );
}
