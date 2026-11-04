import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { Container } from "@/components/site/SiteChrome";
import { GuideLink, Notice } from "@/components/site/ui-bits";
import { LESSONS_INTRO, OPENING } from "@/data/editorial";
import { DISCUSSION, LESSONS, type Lesson } from "@/data/lessons";
import { lessonAnchor } from "./index";

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

function LessonCard({ l, open, onToggle }: { l: Lesson; open: boolean; onToggle: () => void }) {
  const id = lessonAnchor(l.num);
  return (
    <li id={id} className="scroll-mt-24 rounded-xl border border-border bg-card">
      <h2>
        <button aria-expanded={open} aria-controls={`${id}-panel`} onClick={onToggle} className="flex w-full items-start gap-4 p-5 text-left md:p-6">
          <span className="num text-2xl font-extrabold text-primary">{l.num}</span>
          <span className="flex-1 text-lg font-semibold leading-snug">{l.title}</span>
          <ChevronDown className={`mt-1 size-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
        </button>
      </h2>
      {open && (
        <div id={`${id}-panel`} className="px-5 pb-6 md:px-6 md:pl-[88px]">
          <p className="prose-ed">{l.body}</p>
          <div className="mt-5 max-w-[68ch] rounded-lg border-l-4 border-warning-foreground/60 bg-warning p-4 text-warning-foreground">
            <p className="text-sm font-semibold">Point de vigilance</p>
            <p className="mt-1">{l.watchpoint}</p>
          </div>
        </div>
      )}
    </li>
  );
}

function Lessons() {
  const [open, setOpen] = useState<Record<string, boolean>>({ "3.1": true });

  // Ancre #l-<num> : ouvrir la carte correspondante (seule) et défiler jusqu'à elle.
  useEffect(() => {
    const h = window.location.hash.slice(1);
    if (!h) return;
    const target = LESSONS.find((l) => lessonAnchor(l.num) === h);
    if (!target) return;
    setOpen({ [target.num]: true });
    const el = document.getElementById(h);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }, []);

  return (
    <Container className="py-10 md:py-14">
      <h1 className="text-3xl font-semibold md:text-4xl">Les enseignements de la bibliothèque</h1>
      <div className="mt-5 max-w-3xl"><Notice>Enseignements proposés, en cours de validation par le Groupe de Travail.</Notice></div>
      <p className="prose-ed mt-6">{LESSONS_INTRO}</p>

      <ul className="mt-8 max-w-4xl space-y-4">
        {LESSONS.map((l) => (
          <Fragment key={l.num}>
            {l.num === "3.7" ? (
              <li key="disc" className="rounded-xl border-2 border-dashed border-input bg-card p-5 md:p-6">
                <span className="inline-block rounded-md border border-dashed border-warning-foreground/50 bg-warning px-2 py-0.5 text-xs font-semibold text-warning-foreground">À valider en session</span>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">En discussion</p>
                <p className="mt-1 text-lg font-semibold">{DISCUSSION.text}</p>
                <p className="mt-2 text-muted-foreground">{DISCUSSION.question}</p>
              </li>
            ) : null}
            <LessonCard l={l} open={!!open[l.num]} onToggle={() => setOpen((p) => ({ ...p, [l.num]: !p[l.num] }))} />
          </Fragment>
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
