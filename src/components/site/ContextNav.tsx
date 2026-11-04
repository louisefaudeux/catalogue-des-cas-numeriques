import { useId, useRef, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { contextSections } from "@/data/editorial";
import { cn } from "@/lib/utils";
import { GuideLink } from "./ui-bits";

/**
 * Section « Le contexte » : onglets verticaux sur desktop, accordéon sur mobile.
 * Pilotée uniquement par contextSections (2 à 7 parties sans changement de code).
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

  const nextLink = (i: number, onNext: () => void) =>
    i < last ? (
      <button type="button" onClick={onNext}
        className="mt-6 font-medium text-primary underline underline-offset-4 hover:no-underline">
        Suivant : {contextSections[i + 1]?.navLabel}
      </button>
    ) : null;

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
          <p className="mt-6 pl-4 text-sm"><GuideLink /></p>
        </div>
        <div className="grid md:col-span-8">
          {contextSections.map((s, i) => (
            <section key={s.id} role="tabpanel" id={panelId(s.id)} aria-labelledby={tabId(s.id)}
              inert={i !== active}
              className={cn("col-start-1 row-start-1", i !== active && "invisible")}>
              <h3 className="text-[22px] font-bold">{s.title}</h3>
              {s.paragraphs.map((p, j) => (
                <p key={j} className="mt-4 max-w-[68ch] text-[17px] leading-[1.7]">{p}</p>
              ))}
              {nextLink(i, () => select(i + 1, true))}
            </section>
          ))}
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
                {s.paragraphs.map((p, j) => (
                  <p key={j} className="mt-3 text-[17px] leading-[1.7]">{p}</p>
                ))}
                {nextLink(i, () => setOpenItem(contextSections[i + 1]?.id ?? ""))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="mt-6 text-sm"><GuideLink /></p>
      </div>
    </>
  );
}
