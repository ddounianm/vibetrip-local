import { Link } from "@tanstack/react-router";
import { Heart, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Destination } from "@/data/vibetrip";
import { cn } from "@/lib/utils";

type Props = {
  destination: Destination;
  favorite?: boolean;
  onToggleFavorite?: () => void;
  style?: React.CSSProperties;
};

export function DestinationCard({ destination: d, favorite, onToggleFavorite, style }: Props) {
  return (
    <Dialog>
      <article
        style={style}
        className="group animate-rise overflow-hidden rounded-3xl bg-card shadow-soft transition-shadow hover:shadow-lift"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={d.image}
            alt={`${d.name} — ${d.city}`}
            loading="lazy"
            width={800}
            height={600}
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-card/90 px-3 py-1 text-xs font-bold text-foreground backdrop-blur">
            <MapPin className="size-3" /> {d.city}
          </span>
          {onToggleFavorite && (
            <button
              onClick={onToggleFavorite}
              aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
              aria-pressed={favorite}
              className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-card/90 backdrop-blur transition-transform hover:scale-110"
            >
              <Heart
                className={cn("size-5", favorite ? "fill-coral text-coral" : "text-foreground")}
              />
            </button>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold">{d.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {d.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground"
              >
                {t}
              </span>
            ))}
          </div>
          <DialogTrigger asChild>
            <Button variant="link" className="mt-3 h-auto px-0 font-bold">
              Consulter les détails →
            </Button>
          </DialogTrigger>
        </div>
      </article>
      <DialogContent className="max-w-lg overflow-hidden rounded-3xl p-0">
        <img src={d.image} alt={d.name} className="aspect-video w-full object-cover" />
        <div className="space-y-4 p-6 pt-2">
          <span className="eyebrow text-primary">{d.city}</span>
          <DialogTitle className="font-display text-2xl">{d.name}</DialogTitle>
          <DialogDescription className="leading-relaxed">{d.details}</DialogDescription>
          <div className="flex flex-wrap gap-2">
            {d.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground"
              >
                {t}
              </span>
            ))}
          </div>
          <Button asChild variant="sun" size="xl" className="w-full">
            <Link to="/letsgo">Organiser une sortie ici</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
