import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/decouvrir", label: "Découvrir" },
  { to: "/talkbox", label: "TalkBox" },
  { to: "/letsgo", label: "Let's Go" },
] as const;

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn("flex items-center gap-2 font-display text-2xl font-semibold", className)}
    >
      <span className="grid size-8 place-items-center rounded-full bg-gradient-sun text-base text-sun-foreground">
        ☀
      </span>
      VibeTrip
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "bg-secondary text-secondary-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button asChild variant="sea">
            <Link to="/letsgo">Organiser une sortie</Link>
          </Button>
        </div>
        <button
          className="grid size-10 place-items-center rounded-full md:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-border/60 px-5 py-4 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 font-semibold"
              activeProps={{ className: "bg-secondary text-secondary-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-sea-deep text-sea-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-sea-foreground/70">
            Découvre de nouveaux lieux. Lance de belles conversations. Crée des souvenirs.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <span className="eyebrow text-sun">Explorer</span>
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sea-foreground/80 hover:text-sea-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="text-sm text-sea-foreground/70">
          <span className="eyebrow text-sun">Bon à savoir</span>
          <p className="mt-2">
            Les prix affichés sont des estimations indicatives. Aucun paiement n'est effectué sur
            VibeTrip.
          </p>
        </div>
      </div>
      <div className="border-t border-sea-foreground/10 py-5 text-center text-xs text-sea-foreground/50">
        © {new Date().getFullYear()} VibeTrip · Découvrir • Échanger • Sortir
      </div>
    </footer>
  );
}
