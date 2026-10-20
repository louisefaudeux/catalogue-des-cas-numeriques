import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/SiteChrome";
import { Notice } from "@/components/site/ui-bits";

export const Route = createFileRoute("/proposer-un-cas")({
  head: () => ({
    meta: [
      { title: "Proposer un cas — Bibliothèque de cas" },
      { name: "description", content: "Contribuez à la bibliothèque avec un retour d'expérience documenté." },
      { property: "og:title", content: "Proposer un cas" },
      { property: "og:description", content: "Contribuez à la bibliothèque avec un retour d'expérience documenté." },
    ],
  }),
  component: Propose,
});

const STEPS = [
  "Télécharger le template.",
  "Le compléter, en précisant la source et la méthode de chaque résultat.",
  "Le renvoyer à [adresse à définir].",
];
const REQUIRED = ["Identité du cas", "Tags de classification", "Enjeu central", "Dispositif mis en place", "Résultats mesurés, avec la méthode de mesure"];
const OPTIONAL = ["Contexte", "Ajustements", "Résultats qualitatifs", "Enseignements", "Prochaines étapes", "Visuels"];

function Propose() {
  return (
    <Container className="py-10 md:py-14">
      <h1 className="text-3xl font-semibold md:text-4xl">Proposer un cas</h1>
      <p className="prose-ed mt-4 text-lg">
        Votre retour d'expérience est documenté selon une grille commune et mis en regard d'autres cas. Il est possible d'anonymiser l'enseigne.
      </p>

      <ol className="mt-10 grid gap-4 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <li key={i} className="rounded-xl border border-border bg-card p-6">
            <span className="num flex size-9 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground" aria-hidden>{i + 1}</span>
            <p className="mt-4 font-medium"><span className="sr-only">Étape {i + 1} : </span>{s}</p>
          </li>
        ))}
      </ol>

      <Button asChild size="lg" className="mt-8 h-12 px-6">
        <a href="/downloads/Template_cas_bibliotheque.xlsx" download><Download className="size-4" aria-hidden /> Télécharger le template (Excel)</a>
      </Button>

      <section className="mt-14 grid gap-8 md:grid-cols-2">
        <h2 className="text-2xl font-semibold md:col-span-2">Ce qui est attendu</h2>
        <div><h3 className="font-semibold">Champs obligatoires</h3><ul className="mt-2 list-disc space-y-1 pl-5">{REQUIRED.map((r) => <li key={r}>{r}</li>)}</ul></div>
        <div><h3 className="font-semibold">Champs facultatifs</h3><ul className="mt-2 list-disc space-y-1 pl-5">{OPTIONAL.map((r) => <li key={r}>{r}</li>)}</ul></div>
      </section>

      <div className="mt-10 max-w-3xl">
        <Notice tone="accent">
          <p className="font-semibold">Bon à savoir</p>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>Les résultats sont validés par l'annonceur avant publication.</li>
            <li>La source de chaque chiffre est indiquée.</li>
            <li>Les visuels peuvent être ajoutés.</li>
          </ul>
        </Notice>
      </div>
    </Container>
  );
}
