import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, MessageCircle, Sun } from "lucide-react";

import hero from "@/assets/hero-cove.jpg";
import { DestinationCard } from "@/components/site/DestinationCard";
import { Button } from "@/components/ui/button";
import { DESTINATIONS, UNIVERSE_IMAGES } from "@/data/vibetrip";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VibeTrip — Et si ta prochaine aventure commençait ici ?" },
      {
        name: "description",
        content:
          "Découvre des plages et criques d'Algérie, lance des conversations passionnantes et organise des sorties inoubliables.",
      },
      { property: "og:title", content: "VibeTrip — Et si ta prochaine aventure commençait ici ?" },
      {
        property: "og:description",
        content:
          "Destinations, conversations et sorties : tout ce qu'il faut pour profiter de l'été.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const UNIVERSES = [
  {
    to: "/decouvrir",
    eyebrow: "Découvrir",
    title: "Blue Escape",
    text: "Plages, criques cachées et destinations méditerranéennes à explorer, avec filtres par ville et par activité.",
    cta: "Explorer les destinations",
    image: UNIVERSE_IMAGES.discover,
    icon: Compass,
  },
  {
    to: "/talkbox",
    eyebrow: "Échanger",
    title: "TalkBox",
    text: "Des questions classées par catégorie pour lancer des discussions passionnantes et faire de nouvelles rencontres.",
    cta: "Lancer une conversation",
    image: UNIVERSE_IMAGES.talk,
    icon: MessageCircle,
  },
  {
    to: "/letsgo",
    eyebrow: "Sortir",
    title: "Let's Go",
    text: "Choisis une activité, un nombre de participants et un budget pour organiser une sortie inoubliable.",
    cta: "Organiser une sortie",
    image: UNIVERSE_IMAGES.go,
    icon: Sun,
  },
] as const;

const FEATURED = ["aiguades", "cap-de-garde", "tichy"];

function Index() {
  const featured = DESTINATIONS.filter((d) => FEATURED.includes(d.id));
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[calc(100vh-4rem)] items-end overflow-hidden">
        <img
          src={hero}
          alt="Crique turquoise entre falaises sur la côte méditerranéenne"
          width={1920}
          height={1088}
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-veil" />
        <div className="mx-auto w-full max-w-6xl px-5 pb-20 pt-40 text-sea-foreground">
          <p className="eyebrow animate-rise text-sun">Découvrir • Échanger • Sortir</p>
          <h1
            className="mt-5 max-w-3xl animate-rise text-balance text-5xl font-semibold leading-[1.02] md:text-7xl"
            style={{ animationDelay: "80ms" }}
          >
            Et si ta prochaine aventure commençait <em className="text-sun">ici</em> ?
          </h1>
          <p
            className="mt-6 max-w-xl animate-rise text-lg text-sea-foreground/85"
            style={{ animationDelay: "160ms" }}
          >
            Découvre de nouveaux endroits, lance des conversations passionnantes et organise des
            sorties inoubliables.
          </p>
          <div
            className="mt-9 flex animate-rise flex-wrap gap-3"
            style={{ animationDelay: "240ms" }}
          >
            <Button asChild variant="sun" size="xl">
              <Link to="/decouvrir">
                Découvrir les destinations <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link to="/letsgo">Organiser une sortie</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Universes */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <p className="eyebrow text-primary">Les trois univers</p>
        <h2 className="mt-3 max-w-2xl text-balance text-4xl font-semibold md:text-5xl">
          Tout ce qu'il faut pour profiter de l'été.
        </h2>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Découvre de belles destinations, lance des conversations qui comptent et prépare tes
          sorties en quelques clics.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {UNIVERSES.map((u, i) => (
            <Link
              key={u.to}
              to={u.to}
              className="group relative isolate flex min-h-[26rem] animate-rise flex-col justify-end overflow-hidden rounded-3xl p-7 text-sea-foreground shadow-soft transition-shadow hover:shadow-lift"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <img
                src={u.image}
                alt={u.title}
                loading="lazy"
                width={800}
                height={1000}
                className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 -z-10 bg-veil" />
              <u.icon className="mb-auto size-9 rounded-full bg-sea-foreground/15 p-2 backdrop-blur" />
              <span className="eyebrow text-sun">{u.eyebrow}</span>
              <h3 className="mt-2 text-3xl font-semibold">{u.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-sea-foreground/85">{u.text}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold">
                {u.cta}{" "}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured destinations */}
      <section className="bg-sand py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-primary">Blue Escape</p>
              <h2 className="mt-3 text-4xl font-semibold md:text-5xl">
                Quelques idées pour commencer.
              </h2>
            </div>
            <Button asChild variant="sea">
              <Link to="/decouvrir">
                Voir toutes les destinations <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featured.map((d, i) => (
              <DestinationCard
                key={d.id}
                destination={d}
                style={{ animationDelay: `${i * 90}ms` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-sea px-8 py-16 text-center text-sea-foreground md:px-16">
          <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-gradient-sun opacity-30 blur-3xl" />
          <p className="eyebrow text-sun">VibeTrip</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-balance text-3xl font-semibold md:text-5xl">
            Découvre de nouveaux lieux. Lance de belles conversations. Crée des souvenirs.
          </h2>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button asChild variant="sun" size="xl">
              <Link to="/decouvrir">Découvrir les destinations</Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link to="/letsgo">Organiser une sortie</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
