import { ArrowLeft, ArrowRight } from "lucide-react";
import { useId, useRef, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { contextSections, type ContextBlock } from "@/data/editorial";
import { cn } from "@/lib/utils";
import { RichText } from "./RichText";

/** Paragraphes et listes d'une partie du contexte. */
function Blocks({ blocks, size = "md" }: { blocks: ContextBlock[]; size?: "md" | "sm" }) {
  const gap = size === "md" ? "mt-4" : "mt-3";
  return (
    <>
      {blocks.map((b, j) =>
        typeof b === "string" ? (
          <p key={j} className={cn(gap, "max-w-[68ch] text-[17px] leading-[1.7]")}><RichText text={b} /></p>
        ) : (
          <ul key={j} className={cn(gap, "max-w-[68ch] list-disc space-y-2 pl-6 text-[17px] leading-[1.7] marker:text-primary")}>
            {b.list.map((item, k) => <li key={k}><RichText text={item} /></li>)}
          </ul>
        ),
      )}
    </>
  );
}

/** Pagineur « 1 / N » avec flèches précédent / suivant. */
function Pager({ index, onGo }: { index: number; onGo: (i: number) => void }) {
  const last = contextSections.length - 1;
  const prev = contextSections[index - 1];
  const next = contextSections[index + 1];
  const btn =
    "inline-flex size-10 items-center justify-center rounded-full border border-input bg-card text-foreground transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40";
  return (
    <div className="mt-8 flex items-center gap-3">
      <span className="num text-sm text-muted-foreground" aria-hidden>{index + 1} / {last + 1}</span>
      <button type="button" className={btn} disabled={!prev} onClick={() => onGo(index - 1)}
        aria-label={prev ? `Partie précédente : ${prev.navLabel}` : "Partie précédente"}>
        <ArrowLeft className="size-4" aria-hidden />
      </button>
      <button type="button" className={btn} disabled={!next} onClick={() => onGo(index + 1)}
        aria-label={next ? `Partie suivante : ${next.navLabel}` : "Partie suivante"}>
        <ArrowRight className="size-4" aria-hidden />
      </button>
    </div>
  );
}

/**
 * Section « Le contexte » : onglets verticaux sur desktop, accordéon sur mobile.
 * Pilotée uniquement par contextSections (2 à 7 parties sans changement de code).
 * Le panneau prend la hauteur de son contenu (au minimum celle du menu, par la grille).
 */
export function ContextNav() {
  const [active, setActive] = useState(0);
  const [openItem, setOpenItem] = useState(contextSections[0]?.id ?? "");
  const baseId = useId();
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const last = contextSections.length - 1;
  const tabId = (id: string) => `${baseId}-tab-${id}`;
  const panelId = (id: string) => `${baseId}-panel-${id}`;

  const select = (i: number, focus = false) => {
    setActive(i);
    if (focus) tabsRef.current[i]?.focus();
  };

  const onTabKeyDown = (e: React.KeyboardEvent) => {
    let next: number | null = null;
    if (e.key === "ArrowDown") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowUp") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next !== null) {
      e.preventDefault();
      select(next, true);
    }
  };

  return (
    <>
      {/* Desktop : onglets verticaux */}
      <div className="hidden md:grid md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <div role="tablist" aria-orientation="vertical" aria-label="Parties du contexte"
            className="border-l border-border" onKeyDown={onTabKeyDown}>
            {contextSections.map((s, i) => (
              <button key={s.id} role="tab" id={tabId(s.id)} aria-selected={i === active} aria-controls={panelId(s.id)}
                tabIndex={i === active ? 0 : -1}
                ref={(el) => { tabsRef.current[i] = el; }}
                onClick={() => select(i)}
                className={cn(
                  "-ml-px flex min-h-11 w-full items-center border-l-[3px] py-2 pl-4 text-left leading-snug",
                  i === active
                    ? "border-primary font-bold text-foreground"
                    : "border-transparent font-semibold text-muted-foreground hover:text-foreground",
                )}>
                {s.navLabel}
              </button>
            ))}
          </div>
        </div>
        <div className="md:col-span-8">
          {contextSections.map((s, i) => (
            <section key={s.id} role="tabpanel" id={panelId(s.id)} aria-labelledby={tabId(s.id)} hidden={i !== active}>
              <h3 className="text-[22px] font-bold">{s.title}</h3>
              <Blocks blocks={s.paragraphs} />
            </section>
          ))}
          <Pager index={active} onGo={(i) => select(i)} />
        </div>
      </div>

      {/* Mobile : accordéon, une seule partie ouverte */}
      <div className="md:hidden">
        <Accordion type="single" value={openItem} onValueChange={(v) => v && setOpenItem(v)}>
          {contextSections.map((s, i) => (
            <AccordionItem key={s.id} value={s.id}>
              <AccordionTrigger className="min-h-11 py-3 text-left text-base font-semibold">{s.navLabel}</AccordionTrigger>
              <AccordionContent>
                <h3 className="text-lg font-bold">{s.title}</h3>
                <Blocks blocks={s.paragraphs} size="sm" />
                <Pager index={i} onGo={(k) => setOpenItem(contextSections[k]?.id ?? "")} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
}
