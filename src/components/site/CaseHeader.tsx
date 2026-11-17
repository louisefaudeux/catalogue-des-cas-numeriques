import { Store } from "lucide-react";
import type { ReactNode } from "react";
import { displayBrand, splitPartner, type CaseStudy } from "@/data/cases";
import { logoOf } from "@/data/logos";
import { FACETS, labelOf, type FacetKey } from "@/data/taxonomy";
import { cn } from "@/lib/utils";
import { EnvBadge, FacetTag, Tag } from "./ui-bits";

const facetLabel = (k: FacetKey) => FACETS.find((f) => f.key === k)?.label ?? k;
const sentenceCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const LABEL = "text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground";
// Sur le fond de page, les étiquettes grises manquent de contraste : fond blanc et filet léger dans la synthèse.
const CHIP = "bg-card text-foreground ring-1 ring-line";

/**
 * Logo de l'enseigne ou de l'apporteur, posé directement sur le fond de page (pas de cartouche) : hauteur fixe,
 * largeur selon le format du logo. Le nom reste écrit à côté : le logo est décoratif (alt vide).
 */
function Logo({ src }: { src: string }) {
  return <img src={src} alt="" className="h-12 w-auto max-w-[160px] shrink-0 object-contain" />;
}

/** Enseigne ou apporteur du cas : logo si déclaré dans `src/data/logos.ts`, sinon le nom seul. */
function Actor({ role, name, anonymous, className }: { role: string; name: string; anonymous?: boolean; className?: string }) {
  const logo = anonymous ? undefined : logoOf(name);
  return (
    <div className={cn("flex min-w-0 items-center gap-4 py-5", className)}>
      {logo && <Logo src={logo} />}
      {anonymous && (
        <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground" aria-hidden>
          <Store className="size-6" />
        </span>
      )}
      <div className="min-w-0">
        <p className={LABEL}>{role}</p>
        <p className={cn("mt-1.5 text-2xl font-semibold leading-tight", anonymous && "text-muted-foreground")}>{name}</p>
      </div>
    </div>
  );
}

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className={LABEL}>{label}</dt>
      <dd className="mt-2 flex flex-wrap items-center gap-1.5">{children}</dd>
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-2 py-3 sm:grid-cols-[248px_1fr] sm:items-baseline sm:gap-x-6">
      <dt className={LABEL}>{label}</dt>
      <dd className="flex flex-wrap items-center gap-1.5">{children}</dd>
    </div>
  );
}

/**
 * Synthèse du cas, en tête de fiche : acteurs (enseigne et apporteur mis en avant, autres partenaires et période dessous ; logos pour l'enseigne et l'apporteur seulement)
 * puis tags de classification. Mise en page de fiche technique : filets, pas de cadre, sur le fond de page.
 */
export function CaseSynthesis({ c, className }: { c: CaseStudy; className?: string }) {
  const partners = c.partners.map(splitPartner);
  const other = c.tags.otherSpecified ?? {};
  const withOther = (id: string, key: string) => (other[key] && /^autre/.test(id) ? `Autre : ${other[key]}` : labelOf(id));
  return (
    <section id="synthese" aria-labelledby="synthese-t" className={cn("scroll-mt-28", className)}>
      <h2 id="synthese-t" className="sr-only">Synthèse</h2>
      <div aria-hidden className="h-[3px] w-full rounded-full" style={{ background: "var(--accent-gradient)" }} />

      <div className="grid sm:grid-cols-2">
        <Actor role="Enseigne" name={displayBrand(c)} anonymous={!!c.anonymous} className="sm:pr-6" />
        <Actor role="Apporteur du cas" name={c.contributor} className="border-t border-line sm:border-l sm:border-t-0 sm:pl-6" />
      </div>

      <dl className="flex flex-wrap gap-x-12 gap-y-3 border-t border-line py-4 text-sm">
        {partners.length > 0 && (
          <div>
            <dt className={LABEL}>Autres partenaires</dt>
            <dd className="mt-2 flex flex-wrap gap-x-8 gap-y-3">
              {partners.map((p) => {
                return (
                  <span key={p.name} className="leading-tight">
                    <span className="block font-semibold">{p.name}</span>
                    {p.role && <span className="block text-xs text-muted-foreground">{sentenceCase(p.role)}</span>}
                  </span>
                );
              })}
            </dd>
          </div>
        )}
        <div>
          <dt className={LABEL}>Période</dt>
          <dd className="mt-1.5">{sentenceCase(c.period)}</dd>
        </div>
      </dl>

      <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line py-5 md:grid-cols-4">
        <Cell label="Type de PDV">{c.tags.pdvType.map((p) => <FacetTag key={p} facet="pdv">{withOther(p, "pdvType")}</FacetTag>)}</Cell>
        <Cell label="Échelle"><FacetTag facet="echelle" className={CHIP}>{labelOf(c.tags.scale)}</FacetTag></Cell>
        <Cell label="Fréquence">
          <FacetTag facet="frequence">{labelOf(c.tags.frequency)}</FacetTag>
          {c.tags.frequencyDetail && <span className="w-full text-xs text-muted-foreground">{c.tags.frequencyDetail}</span>}
        </Cell>
        <Cell label="Nombre de PDV"><span className="text-sm">{c.tags.pdvCount}</span></Cell>
      </dl>

      <dl className="divide-y divide-line border-t border-line">
        <Row label={facetLabel("kpi")}><Tag className={CHIP}>{withOther(c.tags.mainKpi, "mainKpi")}</Tag></Row>
        <Row label={facetLabel("env")}>
          {c.tags.environments.map((e) => <EnvBadge key={e} id={e} />)}
          {other["environments"] && <span className="text-xs text-muted-foreground">Autre : {other["environments"]}</span>}
        </Row>
        <Row label={facetLabel("format")}>{c.tags.formats.map((f) => <Tag key={f} className={CHIP}>{labelOf(f)}</Tag>)}</Row>
        <Row label={facetLabel("data")}>{c.tags.dataSources.map((d) => <Tag key={d} className={CHIP}>{labelOf(d)}</Tag>)}</Row>
      </dl>
    </section>
  );
}
