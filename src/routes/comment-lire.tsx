import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Container } from "@/components/site/SiteChrome";
import { GuideLink } from "@/components/site/ui-bits";
import { OBJECTIVE, PRECAUTIONS } from "@/data/editorial";
import { LEXICON } from "@/data/lexicon";
import { FACETS } from "@/data/taxonomy";

export const Route = createFileRoute("/comment-lire")({
  head: () => ({
    meta: [
      { title: "Comment lire la bibliothèque — précautions et lexique" },
      { name: "description", content: "Objectif, structure d'un cas, précautions de lecture et lexique." },
      { property: "og:title", content: "Comment lire la bibliothèque" },
      { property: "og:description", content: "Objectif, structure d'un cas, précautions de lecture et lexique." },
    ],
  }),
  component: HowTo,
});

const RUBRIQUES = ["Contexte et point de départ", "Dispositif mis en place", "Résultats mesurés", "Enseignements transposables"];
const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function HowTo() {
  const [q, setQ] = useState("");
  const terms = [...LEXICON].sort((a, b) => a.term.localeCompare(b.term, "fr")).filter((t) => norm(t.term + " " + t.def).includes(norm(q)));
  const letters = [...new Set(LEXICON.map((t) => norm(t.term[0]).toUpperCase()))].sort();
  const firstOf = new Map<string, string>();
  terms.forEach((t) => { const L = norm(t.term[0]).toUpperCase(); if (!firstOf.has(L)) firstOf.set(L, t.term); });

  return (
    <Container className="py-10 md:py-14">
      <h1 className="text-3xl font-semibold md:text-4xl">Comment lire la bibliothèque</h1>

      <section className="mt-10" aria-labelledby="obj">
        <h2 id="obj" className="text-2xl font-semibold">Objectif de la bibliothèque</h2>
        <p className="prose-ed mt-4">{OBJECTIVE[0]}</p>
      </section>

      <section className="mt-14" aria-labelledby="struct">
        <h2 id="struct" className="text-2xl font-semibold">Comment est construit un cas</h2>
        <ol className="mt-6 grid gap-3 md:grid-cols-4">
          {RUBRIQUES.map((r, i) => (
            <li key={r} className="relative rounded-xl border border-border bg-card p-5">
              <span className="num text-sm font-bold text-primary">{i + 1}</span>
              <p className="mt-1 font-semibold">{r}</p>
            </li>
          ))}
        </ol>
        <p className="prose-ed mt-6">Chaque cas est qualifié par des tags. Ils servent de filtres dans la bibliothèque et calculent les cas proches d'une fiche.</p>
        <dl className="mt-4 grid gap-4 md:grid-cols-2">
          {FACETS.map((f) => (
            <div key={f.key} className="rounded-lg bg-muted p-4"><dt className="font-semibold">{f.label}</dt><dd className="mt-1 text-sm text-muted-foreground">{f.help}</dd></div>
          ))}
        </dl>
      </section>

      <section className="mt-14" aria-labelledby="prec">
        <h2 id="prec" className="text-2xl font-semibold">Précautions de lecture</h2>
        <div className="mt-4 max-w-[72ch] rounded-xl border-l-4 border-primary bg-accent p-6 text-lg leading-relaxed">{PRECAUTIONS}</div>
      </section>

      <section className="mt-14" aria-labelledby="lex">
        <h2 id="lex" className="text-2xl font-semibold">Lexique</h2>
        <label htmlFor="lexq" className="sr-only">Rechercher un terme</label>
        <input id="lexq" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher un terme"
          className="mt-4 h-12 w-full max-w-md rounded-md border border-input bg-card px-3 text-base" />
        <nav aria-label="Index alphabétique" className="mt-4 flex flex-wrap gap-1">
          {letters.map((L) => firstOf.has(L)
            ? <a key={L} href={`#lex-${L}`} className="inline-flex size-11 items-center justify-center rounded-md border border-border bg-card text-sm font-semibold hover:bg-accent">{L}</a>
            : <span key={L} aria-disabled className="inline-flex size-11 items-center justify-center rounded-md text-sm text-muted-foreground/50">{L}</span>)}
        </nav>
        <p className="sr-only" aria-live="polite">{terms.length} termes</p>
        <dl className="mt-6 max-w-3xl divide-y divide-border">
          {terms.map((t) => {
            const L = norm(t.term[0]).toUpperCase();
            return (
              <div key={t.term} id={firstOf.get(L) === t.term ? `lex-${L}` : undefined} className="scroll-mt-24 py-4 md:grid md:grid-cols-[240px_1fr] md:gap-6">
                <dt className="font-semibold">{t.term}</dt><dd className="mt-1 text-muted-foreground md:mt-0">{t.def}</dd>
              </div>
            );
          })}
          {!terms.length && <p className="py-4 text-muted-foreground">Aucun terme ne correspond.</p>}
        </dl>
        <p className="mt-4 text-sm italic text-muted-foreground">Définitions de travail proposées, à valider par le Groupe de Travail.</p>
      </section>

      <section className="mt-16 rounded-xl bg-accent p-8">
        <h2 className="text-xl font-semibold">Pour aller plus loin</h2>
        <p className="mt-3"><GuideLink /></p>
      </section>
    </Container>
  );
}
