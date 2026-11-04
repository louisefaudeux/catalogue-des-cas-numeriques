import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronDown, Info, Search, SlidersHorizontal, X } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CaseCard } from "@/components/site/CaseCard";
import { Container } from "@/components/site/SiteChrome";
import { FamilyBadge, PrecautionsNote } from "@/components/site/ui-bits";
import { CASES } from "@/data/cases";
import { FACETS, FAMILIES, findOption, type FacetKey, type Option } from "@/data/taxonomy";
import { facetCount, filterCases, type Selection } from "@/lib/filters";

type Search = Partial<Record<FacetKey, string | undefined>> & { q?: string | undefined };
const KEYS = FACETS.map((f) => f.key);

export const Route = createFileRoute("/bibliotheque")({
  validateSearch: (s: Record<string, unknown>): Search => {
    const out: Search = {};
    for (const k of KEYS) if (typeof s[k] === "string" && s[k]) out[k] = s[k] as string;
    const q = s["q"]; if (typeof q === "string" && q) out.q = q;
    return out;
  },
  head: () => ({
    meta: [
      { title: "Bibliothèque de cas — Digitalisation du catalogue" },
      { name: "description", content: "Filtrez les retours d'expérience par type de point de vente, échelle, fréquence et KPI." },
      { property: "og:title", content: "Bibliothèque de cas — Digitalisation du catalogue" },
      { property: "og:description", content: "Retrouvez les dispositifs proches de votre situation." },
    ],
  }),
  component: Library,
});

const plural = (n: number) => `${n} cas`;

function SearchBar({ q, onChange, id }: { q: string; onChange: (v: string) => void; id: string }) {
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">Rechercher une enseigne, un enjeu ou un partenaire</label>
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
      <input id={id} type="search" placeholder="Rechercher une enseigne, un enjeu, un partenaire" value={q}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-md border border-input bg-card pl-10 pr-10 text-base" />
      {q && (
        <button type="button" onClick={() => onChange("")} aria-label="Effacer la recherche"
          className="absolute right-1 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground">
          <X className="size-4" aria-hidden />
        </button>
      )}
    </div>
  );
}

function Library() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/bibliotheque" });
  const order = useRef<{ k: FacetKey; id: string }[]>([]);
  const [sheet, setSheet] = useState(false);

  const sel: Selection = Object.fromEntries(KEYS.map((k) => [k, search[k]?.split(",").filter(Boolean) ?? []]));
  const activeCount = KEYS.reduce((n, k) => n + (sel[k]?.length ?? 0), 0);
  const results = filterCases(CASES, sel, search.q ?? "");

  const setFacet = (k: FacetKey, ids: string[]) =>
    navigate({ search: (p: Search) => ({ ...p, [k]: ids.length ? ids.join(",") : undefined }), replace: false });
  const toggle = (k: FacetKey, id: string) => {
    const cur = sel[k] ?? [];
    if (cur.includes(id)) { order.current = order.current.filter((o) => !(o.k === k && o.id === id)); setFacet(k, cur.filter((x) => x !== id)); }
    else { order.current.push({ k, id }); setFacet(k, [...cur, id]); }
  };
  const resetAll = () => { order.current = []; navigate({ search: (p: Search) => ({ q: p.q }) }); };
  const removeLast = () => {
    const last = order.current.pop() ?? KEYS.flatMap((k) => (sel[k] ?? []).map((id) => ({ k, id }))).pop();
    if (last) setFacet(last.k, (sel[last.k] ?? []).filter((x) => x !== last.id));
  };
  const setQuery = (v: string) => navigate({ search: (p: Search) => ({ ...p, q: v || undefined }), replace: true });

  const filters = <FilterPanel sel={sel} toggle={toggle} />;

  return (
    <Container className="py-10 md:py-14">
      <h1 className="text-3xl font-semibold md:text-4xl">Bibliothèque de cas</h1>
      <p className="mt-2 text-muted-foreground">Retrouvez les dispositifs proches de votre situation</p>
      <p aria-live="polite" className="num mt-4 inline-block rounded-full bg-foreground px-3 py-1 text-sm font-semibold text-background">{plural(results.length)}</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[300px_1fr]">
        <aside aria-label="Recherche et filtres" className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] space-y-6 overflow-y-auto pr-2">
            <SearchBar id="q" q={search.q ?? ""} onChange={setQuery} />
            {filters}
          </div>
        </aside>

        <div>
          <div className="mb-4 space-y-3 lg:hidden">
            <SearchBar id="q-mobile" q={search.q ?? ""} onChange={setQuery} />
            <Sheet open={sheet} onOpenChange={setSheet}>
              <SheetTrigger asChild>
                <Button variant="outline" className="h-11"><SlidersHorizontal className="size-4" aria-hidden /> Filtres ({activeCount})</Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex w-full flex-col p-0 sm:max-w-md">
                <SheetHeader className="border-b border-border px-4 py-4"><SheetTitle>Filtres</SheetTitle></SheetHeader>
                <div className="flex-1 overflow-y-auto px-4 py-4">{filters}</div>
                <div className="sticky bottom-0 border-t border-border bg-card p-4">
                  <Button className="h-12 w-full" onClick={() => setSheet(false)}>Voir {plural(results.length)}</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {KEYS.flatMap((k) => (sel[k] ?? []).map((id) => {
              const o = findOption(k, id);
              return o ? (
                <button key={k + id} onClick={() => toggle(k, id)} className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-primary/30 bg-accent px-3 text-sm text-accent-foreground hover:bg-primary/15">
                  {o.shortLabel} <X className="size-3.5" aria-hidden /><span className="sr-only">Retirer le filtre</span>
                </button>
              ) : null;
            }))}
            {activeCount > 0 && <button onClick={resetAll} className="min-h-9 px-2 text-sm font-medium text-primary underline underline-offset-4">Tout réinitialiser</button>}
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="ml-auto inline-flex min-h-9 items-center gap-1 text-sm text-muted-foreground"><Info className="size-4" aria-hidden /> Légende des environnements</button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs space-y-2 p-3">
                {FAMILIES.map((f) => <p key={f.id} className="flex items-center gap-2"><FamilyBadge family={f.id} /> {f.description}</p>)}
              </TooltipContent>
            </Tooltip>
          </div>

          {results.length ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((c) => <CaseCard key={c.slug} c={c} />)}
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-dashed border-input bg-card p-10 text-center">
              <h2 className="text-xl font-semibold">Aucun cas ne correspond à cette combinaison</h2>
              <p className="mt-2 text-muted-foreground">Essayez d'élargir un critère.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {activeCount > 0 && <Button variant="outline" className="h-11" onClick={removeLast}>Retirer le dernier filtre ajouté</Button>}
                <Button className="h-11" onClick={() => { resetAll(); navigate({ search: {} }); }}>Tout réinitialiser</Button>
              </div>
              <Link to="/proposer-un-cas" className="mt-6 inline-block text-sm font-medium text-primary underline underline-offset-4">Votre situation n'apparaît pas ? Proposez un cas</Link>
            </div>
          )}

          <PrecautionsNote className="mt-10" />
        </div>
      </div>
    </Container>
  );
}

function FilterPanel({ sel, toggle }: { sel: Selection; toggle: (k: FacetKey, id: string) => void }) {
  const [more, setMore] = useState(FACETS.some((f) => !f.primary && sel[f.key]?.length));
  const primary = FACETS.filter((f) => f.primary);
  const secondary = FACETS.filter((f) => !f.primary);
  const moreCount = secondary.reduce((n, f) => n + (sel[f.key]?.length ?? 0), 0);
  return (
    <div className="space-y-6">
      {primary.map((f) => <Facet key={f.key} k={f.key} label={f.label} options={f.options} sel={sel} toggle={toggle} />)}
      <div className="border-t border-border pt-4">
        <button aria-expanded={more} onClick={() => setMore(!more)} className="flex min-h-11 w-full items-center justify-between font-semibold">
          Plus de filtres{moreCount ? ` (${moreCount})` : ""}
          <ChevronDown className={`size-4 transition-transform ${more ? "rotate-180" : ""}`} aria-hidden />
        </button>
        {more && (
          <div className="mt-3 space-y-6">
            {secondary.map((f) => f.key === "env" ? (
              <fieldset key={f.key}>
                <legend className="mb-2 text-sm font-semibold">{f.label}</legend>
                {FAMILIES.map((fam) => (
                  <div key={fam.id} className="mb-3">
                    <p className="mb-1 flex items-center gap-2 text-xs text-muted-foreground"><FamilyBadge family={fam.id} /> {fam.description}</p>
                    <OptionList k="env" options={f.options.filter((o) => o.family === fam.id)} sel={sel} toggle={toggle} />
                  </div>
                ))}
              </fieldset>
            ) : (
              <Facet key={f.key} k={f.key} label={f.label} options={f.options} sel={sel} toggle={toggle} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Facet(p: { k: FacetKey; label: string; options: Option[]; sel: Selection; toggle: (k: FacetKey, id: string) => void }) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold">{p.label}</legend>
      <OptionList {...p} />
    </fieldset>
  );
}

function OptionList({ k, options, sel, toggle }: { k: FacetKey; options: Option[]; sel: Selection; toggle: (k: FacetKey, id: string) => void }) {
  return (
    <ul className="space-y-0.5">
      {options.map((o) => {
        const checked = sel[k]?.includes(o.id) ?? false;
        const n = facetCount(CASES, sel, k, o.id);
        const disabled = n === 0 && !checked;
        return (
          <li key={o.id}>
            <label title={o.label} className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-md px-2 hover:bg-muted ${disabled ? "cursor-not-allowed opacity-50" : ""}`}>
              <input type="checkbox" className="size-[18px] accent-primary" checked={checked} aria-disabled={disabled}
                onChange={() => { if (!disabled) toggle(k, o.id); }} />
              <span className="flex-1 text-sm leading-tight">
                {o.shortLabel}
                {o.label !== o.shortLabel && <span className="block text-xs text-muted-foreground">{o.label.slice(o.shortLabel.length).trim()}</span>}
              </span>
              <span className="num text-xs text-muted-foreground" aria-label={`${n} cas`}>{n}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
