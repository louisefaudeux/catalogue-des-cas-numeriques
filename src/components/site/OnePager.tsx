import { QRCodeSVG } from "qrcode.react";
import { displayBrand, type CaseStudy } from "@/data/cases";
import { GUIDE_URL } from "@/data/editorial";
import { labelOf, METHODS } from "@/data/taxonomy";
import { EnvBadge } from "./ui-bits";

const MORE = "… à retrouver dans la fiche en ligne";

export function OnePager({ c, date }: { c: CaseStudy; date: string }) {
  const levers = c.levers.slice(0, 2);
  const results = c.results.slice(0, 4);
  const lessons = c.lessons?.slice(0, 3);
  const truncated = c.levers.length > 2 || c.results.length > 4 || (c.lessons?.length ?? 0) > 3;
  const tags = [...c.tags.pdvType.map(labelOf), labelOf(c.tags.scale), labelOf(c.tags.frequency)];
  return (
    <div className="relative flex flex-col overflow-hidden bg-card text-card-foreground" style={{ width: 794, height: 1123, padding: 48, fontFamily: "Inter, sans-serif" }}>
      {c.status === "illustrative" && (
        <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="whitespace-nowrap text-[54px] font-extrabold text-foreground" style={{ opacity: 0.08, transform: "rotate(-35deg)" }}>
            CAS ILLUSTRATIF — DONNÉES FICTIVES
          </span>
        </div>
      )}
      <header className="flex items-center justify-between border-b-2 border-foreground pb-3 text-[12px]">
        <span className="font-semibold">Bibliothèque de cas — Digitalisation du catalogue</span>
        <span className="flex gap-1.5">{tags.map((t) => <span key={t} className="rounded border border-foreground/40 px-1.5 py-0.5">{t}</span>)}</span>
      </header>

      <section className="mt-6">
        <p className="text-[22px] font-bold">{displayBrand(c)}</p>
        <p className="text-[12px] text-muted-foreground">Partenaires : {c.partners.join(", ")} · Contributeur : {c.contributor} · {c.period}</p>
        <h1 className="mt-3 text-[24px] font-semibold leading-tight">{c.challenge}</h1>
      </section>

      {c.keyFigure && (
        <section className="mt-5 rounded-lg border-l-4 border-primary bg-accent px-5 py-4">
          <p className="num text-[52px] font-extrabold leading-none text-primary">{c.keyFigure.value}</p>
          <p className="mt-2 text-[14px]">{c.keyFigure.sentence}</p>
          <p className="mt-1 text-[11px] italic text-muted-foreground">Source : {c.keyFigure.source}{c.keyFigure.note ? ` (${c.keyFigure.note})` : ""}</p>
        </section>
      )}

      <section className="mt-5">
        <h2 className="text-[13px] font-bold uppercase tracking-wider">Le dispositif en bref</h2>
        <ol className="mt-2 space-y-2.5">
          {levers.map((l, i) => (
            <li key={i} className="text-[13px]">
              <p className="font-semibold">Levier {i + 1} · {l.title}</p>
              <p className="line-clamp-2 text-muted-foreground">{l.howItWorks.join(" ")}</p>
              <div className="mt-1 flex flex-wrap gap-1">{l.environments.map((e) => <EnvBadge key={e} id={e} />)}</div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[13px] font-bold uppercase tracking-wider">Résultats et méthode</h2>
          <span className="rounded border border-foreground/40 px-2 py-0.5 text-[11px]">Méthode : {METHODS[c.method.type].label}</span>
        </div>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {results.map((r, i) => (
            <div key={i} className="rounded-md border border-border p-2.5">
              <p className="num text-[22px] font-extrabold text-primary">{r.value}</p>
              <p className="text-[11px] leading-snug">{r.label}</p>
            </div>
          ))}
        </div>
      </section>

      {lessons?.length ? (
        <section className="mt-5">
          <h2 className="text-[13px] font-bold uppercase tracking-wider">À retenir</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[13px]">{lessons.map((l, i) => <li key={i} className="line-clamp-2">{l}</li>)}</ul>
        </section>
      ) : null}
      {truncated && <p className="mt-2 text-[11px] italic text-muted-foreground">{MORE}</p>}

      <footer className="mt-auto flex items-end justify-between gap-6 border-t border-border pt-3 text-[10px] leading-relaxed text-muted-foreground">
        <div>
          {c.keyFigure && <p>Sources des chiffres : {c.keyFigure.source}</p>}
          <p>Les résultats sont déclaratifs et validés par l'annonceur.</p>
          {c.status === "illustrative" && <p className="font-semibold text-foreground">Cas illustratif : toutes les données de cette fiche sont fictives et servent uniquement à tester l'interface.</p>}
          <p className="mt-1">Pour aller plus loin : Guide de la Digitalisation du Catalogue, Alliance Digitale, 2025</p>
          <p className="break-all">{GUIDE_URL}</p>
          <p className="mt-1">Fiche générée le {date} · Prototype — contenus provisoires</p>
        </div>
        <QRCodeSVG value={GUIDE_URL} size={64} aria-label="QR code vers le Guide" />
      </footer>
    </div>
  );
}
