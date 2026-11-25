import { createFileRoute } from "@tanstack/react-router";
import { Copy, Heart, Shuffle } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  QUESTION_CATEGORIES,
  QUESTIONS,
  type Question,
  type QuestionCategory,
} from "@/data/vibetrip";
import { useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/talkbox")({
  head: () => ({
    meta: [
      { title: "TalkBox — Des questions pour lancer la discussion | VibeTrip" },
      {
        name: "description",
        content:
          "Psychologie, sciences, voyages, société, philosophie, loisirs : tire une question au hasard et lance la conversation.",
      },
      {
        property: "og:title",
        content: "TalkBox — Une bonne question ouvre toutes les conversations",
      },
      {
        property: "og:description",
        content:
          "Choisis une catégorie ou tire une question au hasard pour lancer une belle discussion.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TalkBox,
});

type Filter = QuestionCategory | "Tout" | "Favoris";

function TalkBox() {
  const [filter, setFilter] = useState<Filter>("Tout");
  const [current, setCurrent] = useState<Question>(QUESTIONS[0]!);
  const [spin, setSpin] = useState(0);
  const { favorites, toggle, isFavorite } = useFavorites("questions");

  const list = useMemo(() => {
    if (filter === "Tout") return QUESTIONS;
    if (filter === "Favoris") return QUESTIONS.filter((q) => favorites.includes(q.id));
    return QUESTIONS.filter((q) => q.category === filter);
  }, [filter, favorites]);

  const draw = () => {
    const pool = (list.length ? list : QUESTIONS).filter((q) => q.id !== current.id);
    const next = pool[Math.floor(Math.random() * pool.length)] ?? current;
    setCurrent(next);
    setSpin((s) => s + 1);
  };

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Question copiée");
    } catch {
      toast.error("Impossible de copier la question");
    }
  };

  return (
    <>
      <section className="relative overflow-hidden bg-sea-deep text-sea-foreground">
        <div className="pointer-events-none absolute -left-24 top-10 size-96 rounded-full bg-gradient-sun opacity-20 blur-3xl" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2">
          <div>
            <p className="eyebrow text-sun">TalkBox • Échanger</p>
            <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight md:text-6xl">
              Une bonne question ouvre toutes les conversations.
            </h1>
            <p className="mt-5 max-w-md text-sea-foreground/80">
              Choisis une catégorie ou lance une question aléatoire, puis laisse la discussion
              t'emmener ailleurs.
            </p>
          </div>
          <div className="[perspective:1000px]">
            <div
              key={spin}
              className="animate-card-flip rounded-[2rem] bg-card p-8 text-card-foreground shadow-lift md:p-10"
            >
              <span className="eyebrow text-primary">{current.category}</span>
              <p className="mt-5 min-h-[7rem] font-display text-3xl font-semibold leading-snug">
                {current.text}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button variant="sun" size="xl" onClick={draw}>
                  <Shuffle /> Question aléatoire
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-12 rounded-full"
                  aria-label={
                    isFavorite(current.id) ? "Retirer des favoris" : "Ajouter aux favoris"
                  }
                  aria-pressed={isFavorite(current.id)}
                  onClick={() => toggle(current.id)}
                >
                  <Heart className={cn(isFavorite(current.id) && "fill-coral text-coral")} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-12 rounded-full"
                  aria-label="Copier la question"
                  onClick={() => copy(current.text)}
                >
                  <Copy />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <p className="eyebrow text-primary">Toutes les questions</p>
        <h2 className="mt-3 text-4xl font-semibold">Explore par catégorie.</h2>
        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Catégorie">
          {(["Tout", ...QUESTION_CATEGORIES, "Favoris"] as Filter[]).map((c) => (
            <Button
              key={c}
              variant="chip"
              size="sm"
              className="rounded-full"
              data-active={filter === c}
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
            >
              {c === "Favoris" && <Heart className={filter === c ? "fill-current" : ""} />}
              {c === "Favoris" ? `Favoris (${favorites.length})` : c}
            </Button>
          ))}
        </div>

        {list.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
            Aucune question dans cette sélection pour le moment. Ajoute des favoris avec le cœur.
          </div>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((q, i) => (
              <article
                key={q.id}
                className="group flex animate-rise flex-col rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-soft"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-primary">{q.category}</span>
                  <button
                    onClick={() => toggle(q.id)}
                    aria-label={isFavorite(q.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
                    aria-pressed={isFavorite(q.id)}
                    className="grid size-9 place-items-center rounded-full transition-colors hover:bg-muted"
                  >
                    <Heart className={cn("size-4", isFavorite(q.id) && "fill-coral text-coral")} />
                  </button>
                </div>
                <p className="mt-4 flex-1 font-display text-xl leading-snug">{q.text}</p>
                <button
                  onClick={() => {
                    setCurrent(q);
                    setSpin((s) => s + 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="mt-5 self-start text-sm font-bold text-primary hover:underline"
                >
                  Poser cette question →
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
