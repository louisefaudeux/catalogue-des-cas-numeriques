import { useRouterState } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { LESSONS_INTRO } from "@/data/editorial";
import { LESSONS, LESSON_STEPS, lessonAnchor, type Lesson } from "@/data/lessons";
import { cn } from "@/lib/utils";

function LessonItem({ l, rank, open, onToggle }: { l: Lesson; rank: number; open: boolean; onToggle: () => void }) {
  const id = lessonAnchor(l.num);
  return (
    <li id={id} className="scroll-mt-28">
      <h4>
        <button type="button" aria-expanded={open} aria-controls={`${id}-panel`} onClick={onToggle}
          className="flex min-h-14 w-full items-center gap-4 py-3 text-left hover:text-primary">
          <span className="num w-6 shrink-0 text-lg font-extrabold text-primary">{rank}</span>
          <span className="flex-1 text-base font-semibold leading-snug md:text-lg">{l.title}</span>
          <ChevronDown className={cn("size-5 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")} aria-hidden />
        </button>
      </h4>
      <div id={`${id}-panel`} hidden={!open} className="pb-6 pl-10">
        <p className="prose-ed">{l.body}</p>
        <div className="mt-5 rounded-lg border-l-4 border-warning-foreground/60 bg-warning p-4 text-warning-foreground">
          <p className="text-sm font-semibold">Point de vigilance</p>
          <p className="mt-1">{l.watchpoint}</p>
        </div>
      </div>
    </li>
  );
}

/**
 * Enseignements sur la landing : quatre étapes en intertitres, accordéons, numérotation continue 1 à 7.
 * Une ancre #l-3-x ouvre l'enseignement concerné et y fait défiler.
 */
export function LessonsSection() {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const hash = useRouterState({ select: (s) => s.location.hash });

  useEffect(() => {
    const h = hash.replace(/^#/, "");
    if (!h) return;
    const target = LESSONS.find((l) => lessonAnchor(l.num) === h);
    if (!target) return;
    setOpen((p) => ({ ...p, [target.num]: true }));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    requestAnimationFrame(() => document.getElementById(h)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }));
  }, [hash]);

  let rank = 0;
  return (
    <>
      <p className="prose-ed mt-4">{LESSONS_INTRO}</p>
      <div className="measure mt-8 space-y-10">
        {LESSON_STEPS.map((step) => {
          const items = LESSONS.filter((l) => l.family === step.id);
          if (!items.length) return null;
          return (
            <section key={step.id} aria-labelledby={`etape-${step.id}`}>
              <h3 id={`etape-${step.id}`} className="border-b border-border pb-2 text-[13px] font-bold uppercase tracking-[0.08em] text-primary">
                {step.label}
              </h3>
              <ol className="divide-y divide-border border-b border-border">
                {items.map((l) => {
                  rank += 1;
                  return (
                    <LessonItem key={l.num} l={l} rank={rank} open={!!open[l.num]}
                      onToggle={() => setOpen((p) => ({ ...p, [l.num]: !p[l.num] }))} />
                  );
                })}
              </ol>
            </section>
          );
        })}
      </div>
    </>
  );
}
