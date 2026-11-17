import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/SiteChrome";
import { ContextNav } from "@/components/site/ContextNav";
import { LessonsSection } from "@/components/site/LessonsSection";
import { RichText } from "@/components/site/RichText";
import { PrecautionsNote } from "@/components/site/ui-bits";
import { CASES } from "@/data/cases";
import {
  CONTEXT_INTRO, CONTRIBUTE, CONTRIBUTE_LINK, GUIDE_BLOCK, GUIDE_INLINE, GUIDE_URL, HERO, META_DESCRIPTION,
  OBJECTIVE, OBJECTIVE_TITLE, OPENING, OPENING_TITLE, SITE_TITLE,
} from "@/data/editorial";
import { FREQUENCIES, PDV_TYPES, SCALES, type Option } from "@/data/taxonomy";
import { filterCases } from "@/lib/filters";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: "description", content: META_DESCRIPTION },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: META_DESCRIPTION },
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

/** Titre de section de la landing, précédé de la barre d'accent. */
function SectionTitle({ id, children, className }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <>
      <span className="accent-bar" aria-hidden />
      <h2 id={id} className={`text-3xl font-bold ${className ?? ""}`}>{children}</h2>
    </>
  );
}

/** Insère un lien à la place d'un segment de texte (première occurrence). */
function withLink(text: string, segment: string, render: (s: string) => React.ReactNode) {
  const k = text.indexOf(segment);
  if (k < 0) return text;
  return <>{text.slice(0, k)}{render(segment)}{text.slice(k + segment.length)}</>;
}

const SECTION = "mt-14 md:mt-20";

function Home() {
  const [pdv, setPdv] = useState("");
  const [echelle, setEchelle] = useState("");
  const [frequence, setFrequence] = useState("");
  const navigate = useNavigate();
  const sel = { pdv: pdv ? [pdv] : [], echelle: echelle ? [echelle] : [], frequence: frequence ? [frequence] : [] };
  const n = filterCases(CASES, sel).length;

  return (
    <>
      {/* Hero */}
      <section>
        <Container className="pt-16 pb-12 md:pt-24 md:pb-16">
          <p className="text-sm font-bold uppercase tracking-[0.08em] text-muted-foreground">{HERO.eyebrow}</p>
          <h1 className="mt-5">
            <span className="font-display text-gradient block uppercase leading-none" style={{ fontSize: "clamp(1.75rem, 7.6vw, 5.5rem)" }}>
              {HERO.title}
            </span>
            <span className="sr-only"> : </span>
            <span className="mt-4 block font-heading font-extrabold leading-tight text-foreground" style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.75rem)" }}>
              {HERO.subtitle}
            </span>
          </h1>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 px-6"><Link to="/bibliotheque">Explorer la bibliothèque</Link></Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-6"><Link to="/" hash="enseignements">Lire les enseignements</Link></Button>
          </div>
        </Container>
      </section>

      {/* Le contexte */}
      <Container>
        <section aria-labelledby="contexte" id="contexte-section" className="scroll-mt-28">
          <SectionTitle id="contexte">Le contexte</SectionTitle>
          <p className="mt-4 max-w-[75ch] text-balance text-lg font-medium leading-relaxed">
            {withLink(CONTEXT_INTRO, GUIDE_INLINE, (s) => (
              <a href={GUIDE_URL} target="_blank" rel="noopener noreferrer"
                className="underline decoration-primary decoration-1 underline-offset-[3px] hover:decoration-2">
                {s}
                <ExternalLink className="ml-1 inline size-3.5 align-[-1px] text-primary" aria-hidden />
                <span className="sr-only"> (s'ouvre dans un nouvel onglet)</span>
              </a>
            ))}
          </p>
          <div className="mt-8">
            <ContextNav />
          </div>
        </section>
      </Container>

      {/* Module de recherche, remonté juste après le contexte (lot 1e) */}
      <Container className="mt-12 md:mt-14">
        <section aria-labelledby="situation" className="rounded-xl border border-border bg-card p-6 shadow-sm md:p-8">
          <h2 id="situation" className="text-2xl font-semibold">Trouvez les cas proches de votre situation</h2>
          <form className="mt-6 grid gap-4 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end" aria-labelledby="situation"
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

      {/* Objectif de la bibliothèque, sous le module de recherche */}
      <Container className={SECTION}>
        <section aria-labelledby="objectif">
          <SectionTitle id="objectif">{OBJECTIVE_TITLE}</SectionTitle>
          {OBJECTIVE.map((p, i) => <p key={i} className="prose-ed mt-4">{p}</p>)}
          <p className="prose-ed mt-4">
            {withLink(CONTRIBUTE, CONTRIBUTE_LINK, (s) => (
              <Link to="/proposer-un-cas" className="font-medium text-primary underline underline-offset-4 hover:no-underline">{s}</Link>
            ))}
          </p>
          <PrecautionsNote className="mt-6 max-w-[68ch]" />
        </section>
      </Container>

      {/* Enseignements */}
      <Container className={SECTION}>
        <section aria-labelledby="enseignements-titre" id="enseignements" className="scroll-mt-28">
          <SectionTitle id="enseignements-titre">Les enseignements de la bibliothèque</SectionTitle>
          <LessonsSection />
        </section>
      </Container>

      {/* Ouverture */}
      <Container className={SECTION}>
        <section aria-labelledby="ouverture-titre" id="ouverture" className="scroll-mt-28">
          <SectionTitle id="ouverture-titre" className="max-w-[30ch] leading-tight">{OPENING_TITLE}</SectionTitle>
          {OPENING.map((p, i) => <p key={i} className="prose-ed mt-4"><RichText text={p} /></p>)}
        </section>
      </Container>

      {/* Guide */}
      <Container className={SECTION}>
        <section aria-labelledby="guide" className="rounded-xl bg-accent p-8 md:p-10">
          <SectionTitle id="guide" className="text-2xl">Aller plus loin avec le Guide</SectionTitle>
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
