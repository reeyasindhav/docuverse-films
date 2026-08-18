import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Play } from "lucide-react";
import { useState } from "react";
import { Shell } from "@/components/site-chrome";
import { FilmCard } from "@/components/film-card";
import { Reveal } from "@/components/reveal";
import { categories, films, getFilm, getWatchlist } from "@/lib/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Docuverse — Watch the world unfold" },
      {
        name: "description",
        content:
          "Documentaries with depth. Discover cinematic non-fiction organised by theme, filmmaker, and chapter.",
      },
      { property: "og:title", content: "Docuverse — Watch the world unfold" },
      {
        property: "og:description",
        content: "A streaming platform built exclusively for documentary lovers.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [filter, setFilter] = useState("all");
  const featured = getFilm("the-last-glacier")!;
  const collection = getWatchlist("feel-small")!;
  const grid = (filter === "all" ? films : films.filter((f) => f.categorySlug === filter)).slice(0, 4);

  return (
    <Shell>
      {/* Hero */}
      <section className="edge grid gap-12 py-14 md:py-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div className="flex flex-col justify-between">
          <div>
            <p className="label-mono animate-soft-fade text-muted-foreground">A home for real stories</p>
            <h1 className="animate-rise mt-6 text-[clamp(3rem,8vw,5.5rem)] leading-[0.95]">
              Watch
              <br />
              <em className="font-display italic text-primary">the world</em>
              <br />
              unfold.
            </h1>
          </div>
          <div className="animate-rise mt-12 border-t border-border pt-6 [animation-delay:200ms]">
            <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto]">
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                Documentaries with depth. Discover films that stay with you, from the people who made them.
              </p>
              <p className="label-mono leading-relaxed text-muted-foreground">
                Est. 2024
                <br />
                Independently
                <br />
                curated
              </p>
            </div>
          </div>
        </div>

        <Link
          to="/film/$slug"
          params={{ slug: featured.slug }}
          className="group animate-reveal relative block overflow-hidden bg-secondary"
        >
          <img
            src={featured.image}
            alt={featured.title}
            width={1600}
            height={1000}
            className="h-[52vh] min-h-[340px] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] lg:h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
            <div className="min-w-0">
              <p className="label-mono text-white/80">Featured film · New release</p>
              <h2 className="mt-2 truncate text-3xl text-white md:text-4xl">{featured.title}</h2>
            </div>
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-500 group-hover:scale-110">
              <Play className="h-5 w-5" fill="currentColor" />
            </span>
          </div>
        </Link>
      </section>

      {/* Archive */}
      <section className="border-y border-border bg-surface py-16 md:py-24">
        <div className="edge">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="label-mono text-muted-foreground">Explore the archive</p>
                <h2 className="mt-3 text-4xl md:text-5xl">Find your next story</h2>
              </div>
              <Link to="/browse" className="label-mono rule-link inline-flex items-center gap-2">
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-10 flex flex-wrap gap-2">
              <FilterChip active={filter === "all"} onClick={() => setFilter("all")} label="All films" />
              {categories.map((c) => (
                <FilterChip
                  key={c.slug}
                  active={filter === c.slug}
                  onClick={() => setFilter(c.slug)}
                  label={c.name}
                />
              ))}
            </div>
          </Reveal>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {grid.map((film, i) => (
              <Reveal key={film.slug} delay={i * 90}>
                <FilmCard film={film} />
              </Reveal>
            ))}
            {grid.length === 0 && (
              <p className="label-mono text-muted-foreground">No films in this topic yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* Curated watchlist */}
      <section className="edge grid gap-12 py-20 md:py-28 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="label-mono text-muted-foreground">Curated watchlist</p>
          <h2 className="mt-4 max-w-md text-4xl leading-[1.05] md:text-5xl">
            For when you need to feel <em className="italic text-primary">small.</em>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">{collection.blurb}</p>
          <Link
            to="/watchlists/$slug"
            params={{ slug: collection.slug }}
            className="label-mono rule-link mt-8 inline-flex items-center gap-2"
          >
            Explore collection <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative h-[420px]">
            <img
              src={getFilm("cathedral-of-trees")!.image}
              alt="Cathedral of Trees"
              loading="lazy"
              className="absolute left-0 top-0 h-64 w-[62%] object-cover"
            />
            <img
              src={getFilm("listening-to-the-stars")!.image}
              alt="Listening to the Stars"
              loading="lazy"
              className="absolute bottom-0 right-0 h-64 w-[62%] object-cover"
            />
          </div>
        </Reveal>
      </section>
    </Shell>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`label-mono border px-4 py-2.5 transition-colors ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}
