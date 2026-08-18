import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { FilmCard } from "@/components/film-card";
import { Reveal } from "@/components/reveal";
import { PageHead, Shell } from "@/components/site-chrome";
import { categories, films } from "@/lib/catalog";

export const Route = createFileRoute("/browse")({
  head: () => ({
    meta: [
      { title: "Browse the archive — Docuverse" },
      { name: "description", content: "Search and filter every documentary in the Docuverse archive by topic, format, and year." },
      { property: "og:title", content: "Browse the archive — Docuverse" },
      { property: "og:description", content: "Every documentary in the Docuverse archive, filterable by topic and format." },
    ],
  }),
  component: Browse,
});

const kinds = ["All formats", "Feature", "Series", "Short"] as const;

function Browse() {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("all");
  const [kind, setKind] = useState<(typeof kinds)[number]>("All formats");
  const [sort, setSort] = useState<"newest" | "az">("newest");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = films.filter(
      (f) =>
        (topic === "all" || f.categorySlug === topic) &&
        (kind === "All formats" || f.kind === kind) &&
        (q === "" ||
          f.title.toLowerCase().includes(q) ||
          f.logline.toLowerCase().includes(q) ||
          f.filmmaker.toLowerCase().includes(q)),
    );
    return [...list].sort((a, b) => (sort === "az" ? a.title.localeCompare(b.title) : b.year - a.year));
  }, [query, topic, kind, sort]);

  return (
    <Shell>
      <PageHead
        kicker="Explore the archive"
        title="Every film, nothing buried."
        blurb="Eight titles, four filmmakers, five topics. Filter until you find the one you'll finish tonight."
      />

      <section className="edge py-12">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto]">
          <label className="flex items-center gap-3 border border-border bg-card px-4 py-3">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search titles, loglines, filmmakers…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </label>
          <div className="flex flex-wrap gap-3">
            <select
              value={kind}
              onChange={(e) => setKind(e.target.value as (typeof kinds)[number])}
              className="label-mono border border-border bg-card px-4 py-3"
            >
              {kinds.map((k) => (
                <option key={k}>{k}</option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as "newest" | "az")}
              className="label-mono border border-border bg-card px-4 py-3"
            >
              <option value="newest">Newest first</option>
              <option value="az">A – Z</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setTopic("all")}
            className={`label-mono border px-4 py-2.5 transition-colors ${topic === "all" ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}
          >
            All topics
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setTopic(c.slug)}
              className={`label-mono border px-4 py-2.5 transition-colors ${topic === c.slug ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <p className="label-mono mt-8 text-muted-foreground">
          {results.length} {results.length === 1 ? "film" : "films"}
        </p>

        <div className="mt-6 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((film, i) => (
            <Reveal key={film.slug} delay={(i % 4) * 80}>
              <FilmCard film={film} />
            </Reveal>
          ))}
        </div>

        {results.length === 0 && (
          <div className="border border-dashed border-border py-20 text-center">
            <p className="text-2xl">Nothing matches that yet.</p>
            <p className="label-mono mt-3 text-muted-foreground">Try clearing the filters.</p>
          </div>
        )}
      </section>

      <section className="border-t border-border bg-surface py-16">
        <div className="edge">
          <p className="label-mono text-muted-foreground">Browse by topic</p>
          <div className="mt-8 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((c) => (
              <Link
                key={c.slug}
                to="/topic/$slug"
                params={{ slug: c.slug }}
                className="group bg-surface p-6 transition-colors hover:bg-card"
              >
                <h3 className="text-2xl">{c.name}</h3>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{c.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Shell>
  );
}
