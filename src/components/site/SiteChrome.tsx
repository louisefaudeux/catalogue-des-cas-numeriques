import { Link, useRouterState } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { VERSION_DATE } from "@/data/editorial";
import { Logo } from "./Logo";
import { GuideLink } from "./ui-bits";

// Les enseignements vivent sur la landing (section #enseignements) depuis le lot 1d.
const NAV = [
  { to: "/bibliotheque", hash: undefined, label: "Bibliothèque" },
  { to: "/", hash: "enseignements", label: "Enseignements" },
  { to: "/proposer-un-cas", hash: undefined, label: "Proposer un cas" },
] as const;

const NAV_LINK =
  "inline-flex h-11 items-center px-3 text-sm font-semibold text-foreground decoration-primary decoration-2 underline-offset-[6px] hover:underline";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  // Sur l'accueil, le titre court du livrable répète le H1 : on le masque.
  const isHome = useRouterState({ select: (s) => s.location.pathname === "/" });
  return (
    <>
      <a href="#contenu" className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Aller au contenu
      </a>
      <div className="no-print flex h-7 items-center justify-center bg-proto px-4 text-center text-xs font-medium text-proto-foreground">Prototype — contenus provisoires</div>
      <header className="no-print sticky top-0 z-40 border-b border-line bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-4 md:px-6">
          <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="Alliance Digitale — Bibliothèque de cas, retour à l'accueil">
            <Logo className="h-8 md:h-10" />
            {!isHome && (
              <>
                <span aria-hidden className="h-8 w-px shrink-0 bg-border" />
                <span className="font-display max-w-[420px] text-[11px] leading-snug tracking-wide md:text-[13px]">
                  Bibliothèque de cas<span className="hidden text-muted-foreground sm:inline"> — Digitalisation du catalogue</span>
                </span>
              </>
            )}
          </Link>
          <nav aria-label="Navigation principale" className="hidden md:block">
            <ul className="flex gap-1">
              {NAV.map((n) => (
                <li key={n.label}>
                  <Link to={n.to} {...(n.hash ? { hash: n.hash } : {})} className={NAV_LINK}
                    activeOptions={{ includeHash: true }}
                    activeProps={{ className: "underline", "aria-current": "page" }}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="inline-flex size-11 items-center justify-center rounded-md border border-border md:hidden" aria-label="Ouvrir le menu">
                <Menu className="size-5" aria-hidden />
              </button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader><SheetTitle>Menu</SheetTitle></SheetHeader>
              <nav aria-label="Navigation mobile" className="px-4">
                <ul className="flex flex-col gap-1">
                  {NAV.map((n) => (
                    <li key={n.label}>
                      <Link to={n.to} {...(n.hash ? { hash: n.hash } : {})} onClick={() => setOpen(false)} className="flex h-12 items-center rounded-md px-3 font-semibold hover:bg-accent">{n.label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="no-print mt-24 border-t border-border bg-card">
      <div className="mx-auto grid max-w-[1200px] gap-4 px-4 py-10 text-sm text-muted-foreground md:grid-cols-2 md:px-6">
        <div>
          <Logo className="h-9" />
          <p className="mt-3 font-medium text-foreground">Groupe de Travail Digitalisation du Catalogue — Alliance Digitale</p>
          <p>Prototype de travail non public — version du {VERSION_DATE}</p>
        </div>
        <div className="md:text-right"><GuideLink /></div>
      </div>
    </footer>
  );
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-4 md:px-6 ${className}`}>{children}</div>;
}
