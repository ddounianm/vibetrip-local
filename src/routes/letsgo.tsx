import { createFileRoute } from "@tanstack/react-router";
import { Check, Clock, Mail, MapPin, Minus, Plus, Users, Wallet } from "lucide-react";
import { useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ALL_OUTINGS, EXPERIENCES, QUICK_OUTINGS, type Outing } from "@/data/vibetrip";
import {
  MAX_PARTICIPANTS,
  MIN_PARTICIPANTS,
  clampParticipants,
  estimatePlan,
  formatDZD,
} from "@/lib/plan";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/letsgo")({
  head: () => ({
    meta: [
      { title: "Let's Go — Organise ta sortie en trois étapes | VibeTrip" },
      {
        name: "description",
        content:
          "Plage, paddle, kayak, quad ou randonnée : choisis une activité, le nombre de participants et ton budget pour une estimation.",
      },
      { property: "og:title", content: "Let's Go — Prépare ta sortie en trois étapes" },
      {
        property: "og:description",
        content:
          "Choisis une activité, indique le nombre de participants et ton budget par personne.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LetsGo,
});

function LetsGo() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [participants, setParticipants] = useState(4);
  const [budget, setBudget] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const plannerRef = useRef<HTMLDivElement>(null);

  const selected: Outing | undefined = ALL_OUTINGS.find((o) => o.id === selectedId);
  const budgetValue = budget ? Number(budget) : null;
  const estimate = useMemo(
    () => (selected ? estimatePlan(selected.pricePerPerson, participants, budgetValue) : null),
    [selected, participants, budgetValue],
  );

  const pickExperience = (id: string) => {
    setSelectedId(id);
    plannerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const mailto = useMemo(() => {
    if (!selected || !estimate) return "";
    const lines = [
      `Salut ${firstName || ""},`.trim(),
      "",
      "Voici ton plan de sortie VibeTrip :",
      `• Activité : ${selected.name}${selected.region ? ` (${selected.region})` : ""}`,
      selected.duration ? `• Durée estimée : ${selected.duration}` : "",
      `• Participants : ${participants}`,
      `• Estimation : ${formatDZD(estimate.perPerson)} / personne`,
      `• Total indicatif : ${formatDZD(estimate.total)}`,
      budgetValue ? `• Ton budget : ${formatDZD(budgetValue)} / personne` : "",
      "",
      "Estimations indicatives, à confirmer auprès des prestataires.",
    ].filter(Boolean);
    return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(
      `Mon plan VibeTrip : ${selected.name}`,
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
  }, [selected, estimate, participants, budgetValue, firstName, email]);

  return (
    <>
      <section className="bg-sand">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-20">
          <p className="eyebrow text-primary">Let's Go • Organiser une sortie</p>
          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-tight md:text-6xl">
            Prépare ta sortie en trois étapes.
          </h1>
          <p className="mt-5 max-w-xl text-muted-foreground">
            Choisis une activité, indique le nombre de participants et ton budget par personne. Les
            estimations affichées sont indicatives.
          </p>
        </div>
      </section>

      <section
        ref={plannerRef}
        className="mx-auto grid max-w-6xl scroll-mt-20 gap-8 px-5 py-14 lg:grid-cols-[1fr_380px]"
      >
        <div className="space-y-10">
          {/* Step 1 */}
          <Step n={1} title="Choisis une activité">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {QUICK_OUTINGS.map((o) => (
                <button
                  key={o.id}
                  onClick={() => setSelectedId(o.id)}
                  aria-pressed={selectedId === o.id}
                  className={cn(
                    "flex items-center justify-between rounded-2xl border-2 bg-card p-4 text-left transition-all hover:border-primary/50",
                    selectedId === o.id ? "border-primary shadow-soft" : "border-border",
                  )}
                >
                  <span>
                    <span className="block font-bold">{o.name}</span>
                    <span className="text-sm text-muted-foreground">
                      ≈ {formatDZD(o.pricePerPerson)} / pers.
                    </span>
                  </span>
                  {selectedId === o.id && <Check className="size-5 text-primary" />}
                </button>
              ))}
            </div>
            {selected && !QUICK_OUTINGS.includes(selected) && (
              <p className="mt-4 rounded-2xl bg-secondary px-4 py-3 text-sm font-semibold text-secondary-foreground">
                Expérience sélectionnée : {selected.name}
              </p>
            )}
            <a
              href="#experiences"
              className="mt-4 inline-block text-sm font-bold text-primary hover:underline"
            >
              Ou choisis une nouvelle expérience plus bas ↓
            </a>
          </Step>

          {/* Step 2 */}
          <Step n={2} title="Combien de participants ?">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="size-12 rounded-full"
                aria-label="Retirer un participant"
                disabled={participants <= MIN_PARTICIPANTS}
                onClick={() => setParticipants((p) => clampParticipants(p - 1))}
              >
                <Minus />
              </Button>
              <output
                aria-live="polite"
                className="w-16 text-center font-display text-5xl font-semibold"
              >
                {participants}
              </output>
              <Button
                variant="outline"
                size="icon"
                className="size-12 rounded-full"
                aria-label="Ajouter un participant"
                disabled={participants >= MAX_PARTICIPANTS}
                onClick={() => setParticipants((p) => clampParticipants(p + 1))}
              >
                <Plus />
              </Button>
              <span className="text-sm text-muted-foreground">
                personnes (max. {MAX_PARTICIPANTS})
              </span>
            </div>
          </Step>

          {/* Step 3 */}
          <Step n={3} title="Ton budget par personne">
            <div className="max-w-xs">
              <Label htmlFor="budget" className="sr-only">
                Budget par personne en dinars
              </Label>
              <div className="flex items-center gap-2 rounded-2xl border-2 border-border bg-card px-4 focus-within:border-primary">
                <Wallet className="size-5 text-muted-foreground" />
                <input
                  id="budget"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={100}
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="ex. 2000"
                  className="h-14 w-full bg-transparent text-lg font-semibold outline-none"
                />
                <span className="font-bold text-muted-foreground">DA</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Le budget sert uniquement à comparer avec l'estimation. Aucun paiement n'est
                effectué sur VibeTrip.
              </p>
            </div>
          </Step>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-[2rem] bg-gradient-sea text-sea-foreground shadow-lift">
            <div className="p-7">
              <p className="eyebrow text-sun">Estimation</p>
              {selected && estimate ? (
                <>
                  <p className="mt-3 font-display text-2xl font-semibold">{selected.name}</p>
                  <p className="mt-6 font-display text-5xl font-semibold">
                    {formatDZD(estimate.total)}
                  </p>
                  <p className="mt-1 text-sm text-sea-foreground/75">
                    Total indicatif · {formatDZD(estimate.perPerson)} par personne
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm">
                    <Users className="size-4" /> {participants} participant
                    {participants > 1 ? "s" : ""}
                  </div>
                  {estimate.withinBudget != null && (
                    <p
                      className={cn(
                        "mt-4 rounded-xl px-4 py-3 text-sm font-semibold",
                        estimate.withinBudget
                          ? "bg-success text-sea-foreground"
                          : "bg-coral text-sea-foreground",
                      )}
                    >
                      {estimate.withinBudget
                        ? `Dans ton budget — il te reste ≈ ${formatDZD(estimate.budgetGap!)} par personne.`
                        : `Au-dessus de ton budget de ≈ ${formatDZD(-estimate.budgetGap!)} par personne.`}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <p className="mt-6 font-display text-5xl font-semibold">—</p>
                  <p className="mt-2 text-sm text-sea-foreground/75">
                    Choisis une activité pour découvrir une estimation.
                  </p>
                </>
              )}
            </div>
            <div className="space-y-3 bg-card p-7 text-card-foreground">
              <p className="flex items-center gap-2 font-bold">
                <Mail className="size-4" /> Recevoir ce plan par email
              </p>
              <div className="grid gap-2">
                <Label htmlFor="firstname">Prénom</Label>
                <Input
                  id="firstname"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button
                asChild={!!selected}
                variant="sun"
                size="xl"
                className="w-full"
                disabled={!selected}
              >
                {selected ? <a href={mailto}>Recevoir mon plan</a> : <span>Recevoir mon plan</span>}
              </Button>
              <p className="text-xs text-muted-foreground">
                Ouvre ton application mail avec le plan prêt à envoyer.
              </p>
            </div>
          </div>
        </aside>
      </section>

      {/* Experiences */}
      <section id="experiences" className="scroll-mt-20 bg-sand py-20">
        <div className="mx-auto max-w-6xl px-5">
          <p className="eyebrow text-primary">Nouvelles expériences</p>
          <h2 className="mt-3 text-4xl font-semibold md:text-5xl">
            Nautique, aventure et randonnée.
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Kayak, plongée sous-marine, quad et randonnées dans les plus beaux sites d'Algérie. Les
            prix et durées sont des estimations indicatives à confirmer auprès des prestataires.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {EXPERIENCES.map((x) => (
              <article
                key={x.id}
                className={cn(
                  "group flex flex-col overflow-hidden rounded-3xl bg-card shadow-soft transition-shadow hover:shadow-lift",
                  selectedId === x.id && "ring-4 ring-primary",
                )}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={x.image}
                    alt={`${x.name} — ${x.place}`}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3 flex gap-2">
                    <span className="rounded-full bg-card/90 px-3 py-1 text-xs font-bold backdrop-blur">
                      {x.kind}
                    </span>
                    {x.level && (
                      <span className="rounded-full bg-sun px-3 py-1 text-xs font-bold text-sun-foreground">
                        {x.level}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-semibold">{x.name}</h3>
                  <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                    <MapPin className="size-3" /> {x.region}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {x.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="size-4" /> {x.duration}
                    </span>
                    <span className="font-bold">≈ {formatDZD(x.pricePerPerson)}</span>
                  </div>
                  <Button
                    variant="sea"
                    className="mt-4 w-full"
                    onClick={() => pickExperience(x.id)}
                  >
                    {selectedId === x.id ? "Sélectionnée ✓" : "Organiser cette sortie"}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-full bg-gradient-sun font-display text-lg font-semibold text-sun-foreground">
          {n}
        </span>
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
      {children}
    </div>
  );
}
