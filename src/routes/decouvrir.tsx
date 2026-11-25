import { createFileRoute } from "@tanstack/react-router";
import { Heart, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { DestinationCard } from "@/components/site/DestinationCard";
import { Button } from "@/components/ui/button";
import { ACTIVITIES, CITIES, DESTINATIONS, type Activity, type City } from "@/data/vibetrip";
import { useFavorites } from "@/hooks/use-favorites";

const OG_IMAGE = "https://files.cdn-files-a.com/uploads/12465420/800_6aea2c750916e.jpg";

export const Route = createFileRoute("/decouvrir")({
  head: () => ({
    meta: [
      { title: "Blue Escape — Plages et criques à découvrir | VibeTrip" },
      {
        name: "description",
        content:
          "Plages, criques et coins secrets d'Alger, Béjaïa, Oran, Annaba et Jijel, filtrés par ville et par activité.",
      },
      { property: "og:title", content: "Blue Escape — Plages et criques à découvrir" },
      {
        property: "og:description",
        content: "Filtre par ville ou par activité et enregistre tes destinations favorites.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
  }),
  component: Discover,
});

function Discover() {
  const [city, setCity] = useState<City | "Toutes">("Toutes");
  const [activity, setActivity] = useState<Activity | "Toutes">("Toutes");
  const [query, setQuery] = useState("");
  const [onlyFavs, setOnlyFavs] = useState(false);
  const { favorites, toggle, isFavorite } = useFavorites("destinations");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DESTINATIONS.filter(
      (d) =>
        (city === "Toutes" || d.city === city) &&
        (activity === "Toutes" || d.tags.includes(activity)) &&
        (!onlyFavs || favorites.includes(d.id)) &&
        (!q || `${d.name} ${d.city} ${d.summary}`.toLowerCase().includes(q)),
    );
  }, [city, activity, query, onlyFavs, favorites]);

  const reset = () => {
    setCity("Toutes");
    setActivity("Toutes");
    setQuery("");
    setOnlyFavs(false);
  };

  return (
    <>
      <section className="bg-gradient-sea text-sea-foreground">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-20">
          <p className="eyebrow text-sun">Blue Escape • Découvrir</p>
          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-tight md:text-6xl">
            Plages, criques et coins secrets à explorer.
          </h1>
          <p className="mt-5 max-w-xl text-sea-foreground/80">
            Filtre par ville ou par activité, enregistre tes destinations favorites et prépare ta
            prochaine sortie.
          </p>
          <label className="mt-8 flex max-w-md items-center gap-3 rounded-full bg-card px-5 py-3 text-foreground shadow-lift">
            <Search className="size-5 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher une plage, une ville…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </label>
        </div>
      </section>

      <section className="sticky top-16 z-30 border-b border-border bg-background/90 backdrop-blur-lg">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-4">
          <FilterRow
            label="Ville"
            options={["Toutes", ...CITIES]}
            value={city}
            onChange={(v) => setCity(v as City | "Toutes")}
          />
          <div className="flex flex-wrap items-center gap-3">
            <FilterRow
              label="Activité"
              options={["Toutes", ...ACTIVITIES]}
              value={activity}
              onChange={(v) => setActivity(v as Activity | "Toutes")}
            />
            <Button
              variant="chip"
              size="sm"
              data-active={onlyFavs}
              aria-pressed={onlyFavs}
              onClick={() => setOnlyFavs((v) => !v)}
              className="rounded-full"
            >
              <Heart className={onlyFavs ? "fill-current" : ""} /> Favoris ({favorites.length})
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <p className="mb-6 text-sm font-semibold text-muted-foreground">
          {results.length} destination{results.length > 1 ? "s" : ""}
        </p>
        {results.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center">
            <p className="font-display text-2xl">
              Aucune destination ne correspond à ta recherche.
            </p>
            <p className="mt-2 text-muted-foreground">Essaie un autre filtre ou vide le champ.</p>
            <Button variant="sea" className="mt-6" onClick={reset}>
              Réinitialiser les filtres
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((d, i) => (
              <DestinationCard
                key={d.id}
                destination={d}
                favorite={isFavorite(d.id)}
                onToggleFavorite={() => toggle(d.id)}
                style={{ animationDelay: `${i * 60}ms` }}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function FilterRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label={label}>
      <span className="eyebrow mr-1 w-16 text-muted-foreground">{label}</span>
      {options.map((o) => (
        <Button
          key={o}
          variant="chip"
          size="sm"
          className="rounded-full"
          data-active={value === o}
          aria-pressed={value === o}
          onClick={() => onChange(o)}
        >
          {o}
        </Button>
      ))}
    </div>
  );
}
