import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Bookmark, Play } from "lucide-react";
import { FilmCard } from "@/components/film-card";
import { Reveal } from "@/components/reveal";
import { Shell } from "@/components/site-chrome";
import { films, getFilm, getFilmmaker } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/film/$slug")({
  loader: ({ params }) => {
    const film = getFilm(params.slug);
    if (!film) throw notFound();
    return { film };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Film — Docuverse" }, { name: "robots", content: "noindex" }] };
    const t = `${loaderData.film.title} — Docuverse`;
    return {
      meta: [
        { title: t },
        { name: "description", content: loaderData.film.logline },
        { property: "og:title", content: t },
        { property: "og:description", content: loaderData.film.logline },
      ],
    };
  },
  component: FilmDetail;
});

function FilmDetail() {
  const { film } = Route.useLoaderData();
  const maker = getFilmmaker(film.filmmakerSlug);
  const { isSaved, toggleSave, progress } = useStore();
  const saved = isSaved(film.slug);
  const seen = progress[film.slug]?.chapter ?? 0;
  const related = films.filter((f) => f.slug !== film.slug && f.categorySlug === film.categorySlug).slice(0, 4);

  return (
    <Shell>
      <section className="relative">
        <img
          src={film.image}
          alt={film.title}
          className="h-[58vh] min-h-[380px] w-full object-cover"
          width={1600}
          height={1000}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/30" />
        <div className="edge absolute inset-x-0 bottom-0 pb-10">
          <p className="label-mono animate-soft-fade text-foreground/70">
            {film.kind} · {film.category} · {film.year}
          </p>
          <h1 className="animate-rise mt-3 text-5xl md:text-7xl">{film.title}</h1>
        </div>
      </section>

      <section className="edge grid gap-12 py-14 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div>
          <p className="text-xl leading-relaxed">{film.logline}</p>
          <p className="mt-6 leading-relaxed text-muted-foreground">{film.synopsis}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/watch/$slug"
              params={{ slug: film.slug }}
              className="label-mono inline-flex items-center gap-2 bg-primary px-6 py-4 text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
            >
              <Play className="h-4 w-4" fill="currentColor" />
              {seen > 0 ? `Resume chapter ${seen}` : "Start watching"}
            </Link>
            <button
              type="button"
              onClick={() => toggleSave(film.slug)}
              className="label-mono inline-flex items-center gap-2 border border-foreground/25 px-6 py-4 transition-colors hover:bg-foreground hover:text-background"
            >
              <Bookmark className="h-4 w-4" fill={saved ? "currentColor" : "none"} />
              {saved ? "Saved" : "Save for later"}
            </button>
          </div>

          <div className="mt-14">
            <p className="label-mono text-muted-foreground">Chapters</p>
            <ol className="mt-5 divide-y divide-border border-y border-border">
              {film.chapters.map((c) => (
                <li key={c.index}>
                  <Link
                    to="/watch/$slug"
                    params={{ slug: film.slug }}
                    search={{ ch: c.index }}
                    className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-5 py-5 transition-colors hover:bg-surface"
                  >
                    <span className="label-mono text-muted-foreground">
                      {String(c.index).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-lg">{c.title}</span>
                      <span className="mt-1 block text-sm text-muted-foreground">{c.summary}</span>
                    </span>
                    <span className="label-mono shrink-0 text-muted-foreground">{c.duration}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <aside className="space-y-8">
          <dl className="divide-y divide-border border-y border-border">
            {[
              ["Runtime", film.runtime],
              ["Released", String(film.year)],
              ["Format", film.kind],
              ["Topic", film.category],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between py-4">
                <dt className="label-mono text-muted-foreground">{k}</dt>
                <dd className="text-sm">{v}</dd>
              </div>
            ))}
          </dl>

          {maker && (
            <Link
              to="/filmmakers/$slug"
              params={{ slug: maker.slug }}
              className="group block border border-border bg-card p-6 transition-colors hover:bg-surface"
            >
              <p className="label-mono text-muted-foreground">Directed by</p>
              <h3 className="mt-3 text-2xl">{maker.name}</h3>
              <p className="label-mono mt-2 text-muted-foreground">{maker.based}</p>
              <p className="mt-4 font-display text-lg italic leading-snug">“{maker.quote}”</p>
            </Link>
          )}
        </aside>
      </section>

      {related.length > 0 && (
        <section className="border-t border-border bg-surface py-16">
          <div className="edge">
            <p className="label-mono text-muted-foreground">More in {film.category}</p>
            <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((f, i) => (
                <Reveal key={f.slug} delay={i * 80}>
                  <FilmCard film={f} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </Shell>
  );
}
