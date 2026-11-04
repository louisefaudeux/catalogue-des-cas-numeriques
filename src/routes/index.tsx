import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/SiteChrome";
import { GuideLink } from "@/components/site/ui-bits";
import { CASES } from "@/data/cases";
import { BASELINE, CONTEXT_INTRO, CONTEXT_SECTIONS, CONTEXT_TRANSITION, GUIDE_BLOCK, GUIDE_URL, SITE_TITLE } from "@/data/editorial";
import { LESSONS, lessonAnchor } from "@/data/lessons";
import { FREQUENCIES, PDV_TYPES, SCALES, type Option } from "@/data/taxonomy";
import { filterCases } from "@/lib/filters";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: "description", content: BASELINE },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: BASELINE },
    ],
  }),
  component: Home,
});

function Picker({ label, options, value, onChange }: { label: string; options: Option[]; value: string; onChange: (v: string) => void }) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}
        className="h-12 rounded-md border border-input bg-card px-3 text-base focus-visible:outline-2 focus-visible:outline-ring">
        <option value="">Indifférent</option>
        {options.map((o) => <option key={o.id} value={o.id}>{o.shortLabel}</option>)}
      </select>
    </div>
  );
}

function ContextColumn({ section }: { section: (typeof CONTEXT_SECTIONS)[number] }) {
  const [open, setOpen] = useState(false);
  const [first, ...rest] = section.paragraphs;
  const panelId = `${section.id}-suite`;
  return (
    <div>
      <h3 className="text-xl font-semibold">{section.title}</h3>
      <p className="mt-3 leading-relaxed">{first}</p>
      <div id={panelId} hidden={!open}>
        {rest.map((p, i) => <p key={i} className="mt-4 leading-relaxed">{p}</p>)}
      </div>
      {rest.length > 0 && (
        <button type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((v) => !v)}
          className="mt-3 font-medium text-primary underline underline-offset-4 hover:no-underline">
          {open ? "Réduire" : "Lire la suite"}
        </button>
      )}
    </div>
  );
}

function Home() {
  const [pdv, setPdv] = useState("");
  const [echelle, setEchelle] = useState("");
  const [frequence, setFrequence] = useState("");
  const navigate = useNavigate();
  const sel = { pdv: pdv ? [pdv] : [], echelle: echelle ? [echelle] : [], frequence: frequence ? [frequence] : [] };
  const n = filterCases(CASES, sel).length;

  return (
    <>
      <section className="border-b border-border bg-accent/60">
        <Container className="py-8 md:py-12">
          <h1 className="font-display max-w-none leading-[1.1] tracking-tight" style={{ fontSize: "clamp(1.75rem, 3.4vw, 2.75rem)" }}>{SITE_TITLE}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">{BASELINE}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 px-6"><Link to="/bibliotheque">Explorer la bibliothèque</Link></Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-6"><Link to="/enseignements">Lire les enseignements</Link></Button>
          </div>
        </Container>
      </section>

      <Container className="mt-10 md:mt-14">
        <section aria-labelledby="contexte">
          <h2 id="contexte" className="text-3xl font-semibold">Le contexte</h2>
          <p className="mt-4 max-w-[68ch] text-lg font-medium leading-relaxed">{CONTEXT_INTRO}</p>
          <div className="mt-8 grid items-start gap-8 md:grid-cols-2 md:gap-10">
            {CONTEXT_SECTIONS.map((s) => <ContextColumn key={s.id} section={s} />)}
          </div>
          <p className="mt-6 text-sm"><GuideLink /></p>
          <p className="mt-10 max-w-[68ch] text-lg font-medium leading-relaxed">{CONTEXT_TRANSITION}</p>
        </section>
      </Container>

      <Container className="mt-8 md:mt-10">
        <section aria-labelledby="situation" className="rounded-xl border border-border bg-card p-6 shadow-sm md:p-8">
          <h2 id="situation" className="text-2xl font-semibold">Trouvez les cas proches de votre situation</h2>
          <form className="mt-6 grid gap-4 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end"
            onSubmit={(e) => { e.preventDefault(); if (n) navigate({ to: "/bibliotheque", search: { pdv: pdv || undefined, echelle: echelle || undefined, frequence: frequence || undefined } }); }}>
            <Picker label="Type de point de vente" options={PDV_TYPES} value={pdv} onChange={setPdv} />
            <Picker label="Échelle du dispositif" options={SCALES} value={echelle} onChange={setEchelle} />
            <Picker label="Fréquence" options={FREQUENCIES} value={frequence} onChange={setFrequence} />
            <Button type="submit" size="lg" className="h-12 px-6" disabled={!n}>Voir les {n} cas</Button>
          </form>
          <p aria-live="polite" className="mt-4 text-sm text-muted-foreground">
            {n ? <><strong className="num text-foreground">{n}</strong> {n > 1 ? "cas correspondent" : "cas correspond"} à votre situation.</>
              : "Aucun cas ne correspond à cette combinaison. Essayez d'élargir un critère."}
          </p>
        </section>
      </Container>

      <Container className="mt-10 md:mt-14">
        <section aria-labelledby="enseignements-accueil" className="grid gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <div className="flex flex-wrap items-center gap-3">
              <h2 id="enseignements-accueil" className="text-3xl font-semibold">Les enseignements de la bibliothèque</h2>
              <span className="inline-block rounded-md border border-warning-foreground/20 bg-warning px-2 py-0.5 text-xs font-semibold text-warning-foreground">En cours de validation</span>
            </div>
            <p className="prose-ed mt-4">{LESSONS.length} enseignements tirés des cas réunis et des échanges du Groupe de Travail.</p>
            <Button asChild size="lg" className="mt-6 h-12 px-6"><Link to="/enseignements">Lire les enseignements</Link></Button>
          </div>
          <div className="md:col-span-8">
            <ol className="divide-y divide-border border-y border-border">
              {LESSONS.map((l, i) => (
                <li key={l.num}>
                  <Link to="/enseignements" hash={lessonAnchor(l.num)}
                    className="flex min-h-11 items-baseline gap-4 py-2.5 hover:bg-accent/60">
                    <span className="num w-6 shrink-0 text-lg font-extrabold text-primary">{i + 1}</span>
                    <span className="font-medium leading-snug">{l.title}</span>
                  </Link>
                </li>
              ))}
            </ol>
            <div className="mt-0 flex min-h-11 items-baseline gap-4 border-t border-dashed border-input py-2.5">
              <span className="w-6 shrink-0" aria-hidden />
              <p>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ouverture</span>
                <span aria-hidden className="mx-2 text-muted-foreground">—</span>
                <Link to="/enseignements" hash="ouverture" className="font-medium text-primary underline underline-offset-4 hover:no-underline">
                  L'IA et l'agentic commerce
                </Link>
              </p>
            </div>
          </div>
        </section>
      </Container>

      <Container className="mt-10 md:mt-14">
        <section className="rounded-xl bg-accent p-8 md:p-10">
          <h2 className="text-2xl font-semibold">Aller plus loin avec le Guide</h2>
          <p className="prose-ed mt-3">{GUIDE_BLOCK}</p>
          <Button asChild className="mt-6 h-12 px-6">
            <a href={GUIDE_URL} target="_blank" rel="noopener noreferrer">
              Consulter le Guide 2025<span className="sr-only"> (s'ouvre dans un nouvel onglet)</span>
            </a>
          </Button>
        </section>
      </Container>
    </>
  );
}
