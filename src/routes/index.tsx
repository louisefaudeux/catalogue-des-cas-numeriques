import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useId, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/SiteChrome";
import { GuideLink } from "@/components/site/ui-bits";
import { CASES } from "@/data/cases";
import { BASELINE, CONTEXT_INTRO, CONTEXT_SECTIONS, GUIDE_BLOCK, GUIDE_URL, SITE_TITLE } from "@/data/editorial";
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
        <Container className="py-16 md:py-24">
          <h1 className="font-display max-w-3xl text-3xl leading-tight tracking-tight md:text-5xl">{SITE_TITLE}</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground md:text-xl">{BASELINE}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 px-6"><Link to="/bibliotheque">Explorer la bibliothèque</Link></Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-6"><Link to="/enseignements">Lire les enseignements</Link></Button>
          </div>
        </Container>
      </section>

      <Container className="mt-16 md:mt-20">
        <section aria-labelledby="contexte" className="prose-ed mx-auto max-w-[68ch]">
          <h2 id="contexte" className="text-3xl font-semibold">Le contexte</h2>
          <p className="mt-4 text-lg font-medium">{CONTEXT_INTRO}</p>
          <p className="mt-3 text-muted-foreground">{CONTEXT_SECTIONS[0]?.paragraphs[0]}</p>
          <p className="mt-3 text-sm"><GuideLink /></p>
          <Accordion type="multiple" className="mt-6 border-t border-border">
            {CONTEXT_SECTIONS.map((s) => (
              <AccordionItem key={s.id} value={s.id}>
                <AccordionTrigger className="py-5 text-left text-lg font-semibold">{s.title}</AccordionTrigger>
                <AccordionContent className="space-y-4 text-base leading-relaxed">
                  {s.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </Container>

      <Container className="mt-16 md:mt-20">
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

      <Container className="mt-16 md:mt-20">
        <section aria-labelledby="enseignements-accueil" className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <h2 id="enseignements-accueil" className="text-3xl font-semibold">Les enseignements de la bibliothèque</h2>
            <span className="inline-block rounded-md border border-warning-foreground/20 bg-warning px-2 py-0.5 text-xs font-semibold text-warning-foreground">En cours de validation</span>
          </div>
          <p className="prose-ed mt-4">{LESSONS.length} enseignements tirés des cas réunis et des échanges du Groupe de Travail.</p>
          <ol className="mt-6 space-y-2">
            {LESSONS.map((l) => (
              <li key={l.num}>
                <Link to="/enseignements" hash={lessonAnchor(l.num)}
                  className="flex items-baseline gap-4 rounded-lg border border-border bg-card p-4 hover:bg-accent">
                  <span className="num text-lg font-extrabold text-primary">{l.num}</span>
                  <span className="font-medium leading-snug">{l.title}</span>
                </Link>
              </li>
            ))}
          </ol>
          <Button asChild size="lg" className="mt-6 h-12 px-6"><Link to="/enseignements">Lire les enseignements</Link></Button>
        </section>
      </Container>

      <Container className="mt-16 md:mt-20">
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
