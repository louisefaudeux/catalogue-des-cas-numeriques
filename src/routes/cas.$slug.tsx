import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Eye, Printer } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CaseCard, PdfButton } from "@/components/site/CaseCard";
import { Container } from "@/components/site/SiteChrome";
import { CreativeSlot, EnvBadge, GuideLink, KeyFigure, MethodBadge, Notice, PrecautionsNote, Tag } from "@/components/site/ui-bits";
import { CASES, displayBrand, getCase } from "@/data/cases";
import { FACETS, labelOf } from "@/data/taxonomy";
import { caseValues, similarCases } from "@/lib/filters";

export const Route = createFileRoute("/cas/$slug")({
  loader: ({ params }) => {
    const c = getCase(params.slug);
    if (!c) throw notFound();
    return { slug: c.slug };
  },
  head: ({ loaderData }) => {
    const c = loaderData && getCase(loaderData.slug);
    if (!c) return { meta: [{ title: "Cas introuvable" }] };
    const t = `${displayBrand(c)} — ${c.challenge}`;
    return { meta: [{ title: t }, { name: "description", content: c.keyFigure?.sentence ?? c.challenge }, { property: "og:title", content: t }, { property: "og:description", content: c.challenge }] };
  },
  component: CasePage,
});

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-t`} className="scroll-mt-28 border-t border-border pt-10">
      <h2 id={`${id}-t`} className="text-2xl font-semibold">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function CasePage() {
  const { slug } = Route.useLoaderData();
  const c = getCase(slug)!;
  const ctx = c.context ?? {};
  const ctxParts = [["Situation de départ", ctx.situation], ["Déclencheur", ctx.trigger], ["Contraintes opérationnelles", ctx.constraints]].filter(([, v]) => v) as [string, string][];

  const sections = [
    c.keyFigure && { id: "chiffre-cle", title: "Chiffre clé" },
    ctxParts.length && { id: "contexte", title: "Contexte et point de départ" },
    { id: "dispositif", title: "Le dispositif mis en place" },
    c.adjustments && { id: "ajustements", title: "Ce qui a été ajusté en cours de route" },
    { id: "resultats", title: "Les résultats mesurés" },
    c.lessons?.length && { id: "enseignements", title: "Les enseignements transposables" },
    c.nextSteps && { id: "prochaines-etapes", title: "Les prochaines étapes" },
    c.creatives.length && { id: "creas", title: "Créas" },
    { id: "cas-proches", title: "Cas proches" },
  ].filter(Boolean) as { id: string; title: string }[];

  const [active, setActive] = useState(sections[0]?.id ?? "");
  useEffect(() => {
    const obs = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-30% 0px -60% 0px" });
    sections.forEach((s) => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [slug]);

  const eyebrow = [displayBrand(c), ...c.tags.pdvType.map(labelOf), labelOf(c.tags.scale), labelOf(c.tags.frequency)].join(" · ");
  const similar = similarCases(c, CASES);

  return (
    <Container className="py-8 md:py-12">
      <nav aria-label="Fil d'Ariane" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap gap-1.5">
          <li><Link to="/bibliotheque" className="underline underline-offset-4 hover:text-foreground">Bibliothèque</Link></li>
          <li aria-hidden>›</li>
          <li aria-current="page" className="text-foreground">{displayBrand(c)}</li>
        </ol>
      </nav>

      <header className="mt-6 max-w-[860px]">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight md:text-[44px]">{c.challenge}</h1>
        <p className="mt-4 text-muted-foreground">
          Enseigne : {displayBrand(c)}. Partenaires : {c.partners.join(", ")}. Contributeur : {c.contributor}. Période : {c.period.charAt(0).toLowerCase() + c.period.slice(1)}.
        </p>
        {c.status === "illustrative" && <div className="mt-5"><Notice>Cas illustratif — données fictives, pour test de l'interface</Notice></div>}
        <div className="mt-6 flex flex-wrap gap-3">
          <PdfButton c={c} />
          <Button asChild variant="outline" className="h-11"><Link to="/cas/$slug/fiche" params={{ slug }}><Eye className="size-4" aria-hidden /> Prévisualiser</Link></Button>
          <Button asChild variant="outline" className="h-11"><Link to="/cas/$slug/fiche" params={{ slug }} search={{ imprimer: 1 }}><Printer className="size-4" aria-hidden /> Imprimer</Link></Button>
          <Button asChild variant="ghost" className="h-11"><Link to="/bibliotheque"><ArrowLeft className="size-4" aria-hidden /> Retour à la bibliothèque</Link></Button>
        </div>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,720px)_280px] lg:justify-between">
        <div className="space-y-12">
          {c.keyFigure && (
            <section id="chiffre-cle" aria-label="Chiffre clé" className="scroll-mt-28 rounded-xl border border-border bg-card p-6 md:p-8">
              <KeyFigure {...c.keyFigure} />
              <div className="mt-5"><MethodBadge type={c.method.type} /></div>
            </section>
          )}

          {ctxParts.length > 0 && (
            <Section id="contexte" title="Contexte et point de départ">
              <div className="space-y-5">
                {ctxParts.map(([t, v]) => (
                  <div key={t}>{ctxParts.length > 1 && <h3 className="font-semibold">{t}</h3>}<p className="prose-ed mt-1">{v}</p></div>
                ))}
              </div>
            </Section>
          )}

          <Section id="dispositif" title="Le dispositif mis en place">
            <ol className="relative space-y-8 border-l-2 border-border pl-8">
              {c.levers.map((l, i) => (
                <li key={i} className="relative">
                  <span className="num absolute -left-[45px] flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground" aria-hidden>{i + 1}</span>
                  <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Levier {i + 1}</p>
                  <h3 className="mt-1 text-lg font-semibold">{l.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">{l.environments.map((e) => <EnvBadge key={e} id={e} />)}</div>
                  <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-[140px_1fr]">
                    {l.format && <><dt className="font-medium text-muted-foreground">Format</dt><dd>{l.format}</dd></>}
                    {l.data && <><dt className="font-medium text-muted-foreground">Data activée</dt><dd>{l.data}</dd></>}
                    {l.kpis?.length ? <><dt className="font-medium text-muted-foreground">KPI suivis</dt><dd className="flex flex-wrap gap-1">{l.kpis.map((k) => <Tag key={k}>{k}</Tag>)}</dd></> : null}
                  </dl>
                  <h4 className="mt-4 text-sm font-semibold">Fonctionnement</h4>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5">{l.howItWorks.map((h, j) => <li key={j}>{h}</li>)}</ul>
                </li>
              ))}
            </ol>
          </Section>

          {c.adjustments && <Section id="ajustements" title="Ce qui a été ajusté en cours de route"><p className="prose-ed">{c.adjustments}</p></Section>}

          <Section id="resultats" title="Les résultats mesurés">
            <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {c.results.map((r, i) => (
                <li key={i} className="rounded-lg border border-border bg-card p-4">
                  <p className="num text-3xl font-extrabold text-primary">{r.value}</p>
                  <p className="mt-1 text-sm">{r.label}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-lg bg-muted p-5">
              <h3 className="font-semibold">Méthode de mesure</h3>
              <div className="mt-2"><MethodBadge type={c.method.type} /></div>
              {c.method.detail && <p className="mt-3 text-sm">{c.method.detail}</p>}
            </div>
            {(c.otherResults?.length || c.qualitative?.length) ? (
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {c.otherResults?.length ? <div><h3 className="font-semibold">Autres résultats</h3><ul className="mt-2 list-disc space-y-1 pl-5">{c.otherResults.map((o, i) => <li key={i}>{o}</li>)}</ul></div> : null}
                {c.qualitative?.length ? <div><h3 className="font-semibold">Résultats qualitatifs</h3><ul className="mt-2 list-disc space-y-1 pl-5">{c.qualitative.map((o, i) => <li key={i}>{o}</li>)}</ul></div> : null}
              </div>
            ) : null}
          </Section>

          {c.lessons?.length ? (
            <Section id="enseignements" title="Les enseignements transposables">
              <ol className="list-decimal space-y-3 border-l-4 border-primary bg-accent/50 py-5 pl-10 pr-5">{c.lessons.map((l, i) => <li key={i} className="font-medium">{l}</li>)}</ol>
            </Section>
          ) : null}

          {c.nextSteps && <Section id="prochaines-etapes" title="Les prochaines étapes"><p className="prose-ed">{c.nextSteps}</p></Section>}

          {c.creatives.length > 0 && (
            <Section id="creas" title="Créas">
              <div className="grid gap-6 sm:grid-cols-2">{c.creatives.map((cr, i) => <div key={i} className={cr.ratio === "728:90" ? "sm:col-span-2" : ""}><CreativeSlot {...cr} /></div>)}</div>
            </Section>
          )}

          <Section id="cas-proches" title="Cas proches">
            <div className="grid gap-5 md:grid-cols-3">
              {similar.map(({ c: s, shared }) => (
                <CaseCard key={s.slug} c={s} footnote={`Point commun : ${[...new Set(shared)].slice(0, 4).map(labelOf).join(", ") || "aucun"}`} />
              ))}
            </div>
          </Section>

          <section className="rounded-xl bg-accent p-6 md:p-8">
            <div className="flex flex-wrap gap-3">
              <PdfButton c={c} />
              <Button asChild variant="outline" className="h-11"><Link to="/bibliotheque">Retour à la bibliothèque</Link></Button>
            </div>
            <p className="mt-5"><GuideLink>Retrouver le cadre dans le Guide 2025</GuideLink></p>
          </section>
          <PrecautionsNote />
        </div>

        <aside aria-label="Sommaire et informations du cas" className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            <nav aria-label="Sommaire">
              <p className="text-sm font-semibold">Sommaire</p>
              <ul className="mt-2 space-y-0.5 border-l border-border">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} aria-current={active === s.id ? "true" : undefined}
                      className={`-ml-px block border-l-2 py-1.5 pl-3 text-sm ${active === s.id ? "border-primary font-medium text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="text-sm font-semibold">Tags du cas</p>
              <dl className="mt-2 space-y-2 text-sm">
                {FACETS.map((f) => (
                  <div key={f.key}><dt className="text-xs text-muted-foreground">{f.label}</dt>
                    <dd className="mt-0.5 flex flex-wrap gap-1">{f.key === "env" ? caseValues(c, f.key).map((v) => <EnvBadge key={v} id={v} />) : caseValues(c, f.key).map((v) => <Tag key={v}>{labelOf(v)}</Tag>)}</dd></div>
                ))}
                <div><dt className="text-xs text-muted-foreground">Nombre de PDV</dt><dd>{c.tags.pdvCount}</dd></div>
                {c.tags.frequencyDetail && <div><dt className="text-xs text-muted-foreground">Détail de fréquence</dt><dd>{c.tags.frequencyDetail}</dd></div>}
                {c.tags.otherSpecified && Object.values(c.tags.otherSpecified).map((v) => <div key={v}><dt className="text-xs text-muted-foreground">Précision « Autre »</dt><dd>{v}</dd></div>)}
              </dl>
            </div>
            <PdfButton c={c} variant="outline" />
            <p className="text-sm"><GuideLink /></p>
          </div>
        </aside>
      </div>
    </Container>
  );
}
