import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/site/SiteChrome";
import { GuideLink, Notice } from "@/components/site/ui-bits";
import { getCase } from "@/data/cases";
import { LESSONS_INTRO, OPENING } from "@/data/editorial";
import { DISCUSSION, LESSON_FAMILIES, LESSONS, type Lesson, type LessonFamily } from "@/data/lessons";

export const Route = createFileRoute("/enseignements")({
  head: () => ({
    meta: [
      { title: "Les enseignements de la bibliothèque — Digitalisation du catalogue" },
      { name: "description", content: "Les leçons tirées des cas réunis et des échanges du Groupe de Travail." },
      { property: "og:title", content: "Les enseignements de la bibliothèque" },
      { property: "og:description", content: "Les leçons tirées des cas réunis et des échanges du Groupe de Travail." },
    ],
  }),
  component: Lessons,
});

const famLabel = (f: LessonFamily) => LESSON_FAMILIES.find((x) => x.id === f)!.label;

function LessonCard({ l }: { l: Lesson }) {
  const [open, setOpen] = useState(l.num === "3.1");
  const id = `l-${l.num.replace(".", "-")}`;
  return (
    <li className="rounded-xl border border-border bg-card">
      <h2>
        <button aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)} className="flex w-full items-start gap-4 p-5 text-left md:p-6">
          <span className="num text-2xl font-extrabold text-primary">{l.num}</span>
          <span className="flex-1">
            <span className="block text-lg font-semibold leading-snug">{l.title}</span>
            <span className="mt-2 inline-block rounded-md bg-tag px-2 py-0.5 text-xs font-medium text-tag-foreground">{famLabel(l.family)}</span>
          </span>
          <ChevronDown className={`mt-1 size-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
        </button>
      </h2>
      {open && (
        <div id={id} className="px-5 pb-6 md:px-6 md:pl-[88px]">
          <p className="prose-ed">{l.body}</p>
          <div className="mt-5 max-w-[68ch] rounded-lg border-l-4 border-warning-foreground/60 bg-warning p-4 text-warning-foreground">
            <p className="text-sm font-semibold">{/^Points/.test(l.watchpoint) ? "" : ""}Point de vigilance</p>
            <p className="mt-1">{l.watchpoint}</p>
          </div>
          {l.cases.length > 0 && (
            <p className="mt-4 text-sm">
              <span className="text-muted-foreground">Cas associés : </span>
              {l.cases.map((s, i) => (
                <span key={s}>{i > 0 && ", "}<Link to="/cas/$slug" params={{ slug: s }} className="font-medium text-primary underline underline-offset-4">{getCase(s)?.brand}</Link></span>
              ))}
            </p>
          )}
        </div>
      )}
    </li>
  );
}

function Lessons() {
  const [fam, setFam] = useState<LessonFamily | "all">("all");
  const shown = LESSONS.filter((l) => fam === "all" || l.family === fam);
  return (
    <Container className="py-10 md:py-14">
      <h1 className="text-3xl font-semibold md:text-4xl">Les enseignements de la bibliothèque</h1>
      <div className="mt-5 max-w-3xl"><Notice>Enseignements proposés, en cours de validation par le Groupe de Travail.</Notice></div>
      <p className="prose-ed mt-6">{LESSONS_INTRO}</p>

      <div role="radiogroup" aria-label="Filtrer par famille" className="mt-8 flex flex-wrap gap-2">
        {LESSON_FAMILIES.map((f) => (
          <button key={f.id} role="radio" aria-checked={fam === f.id} onClick={() => setFam(f.id)}
            className={`min-h-11 rounded-full border px-4 text-sm font-medium ${fam === f.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-accent"}`}>
            {f.label}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{shown.length} enseignements affichés</p>

      <ul className="mt-6 max-w-4xl space-y-4">
        {shown.map((l) => (
          <>
            {l.num === "3.7" && fam === "all" || (l.num === "3.7" && fam === "socle") ? (
              <li key="disc" className="rounded-xl border-2 border-dashed border-input bg-card p-5 md:p-6">
                <span className="inline-block rounded-md border border-dashed border-warning-foreground/50 bg-warning px-2 py-0.5 text-xs font-semibold text-warning-foreground">À valider en session</span>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">En discussion</p>
                <p className="mt-1 text-lg font-semibold">{DISCUSSION.text}</p>
                <p className="mt-2 text-muted-foreground">{DISCUSSION.question}</p>
              </li>
            ) : null}
            <LessonCard key={l.num} l={l} />
          </>
        ))}
      </ul>

      <section className="mt-16 max-w-4xl border-t border-border pt-10">
        <h2 className="text-2xl font-semibold">Ouverture : l'IA et l'agentic commerce</h2>
        {OPENING.map((p, i) => <p key={i} className="prose-ed mt-4">{p}</p>)}
      </section>
      <p className="mt-10"><GuideLink /></p>
    </Container>
  );
}
