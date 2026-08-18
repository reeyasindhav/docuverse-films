import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { FilmCard } from "@/components/film-card";
import { Reveal } from "@/components/reveal";
import { Shell } from "@/components/site-chrome";
import { categories, filmsIn, getCategory } from "@/lib/catalog";

export const Route = createFileRoute("/topic/$slug")({
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Topic — Docuverse" }, { name: "robots", content: "noindex" }] };
    const t = `${loaderData.category.name} documentaries — Docuverse`;
    return {
      meta: [
        { title: t },
        { name: "description", content: loaderData.category.blurb },
        { property: "og:title", content: t },
        { property: "og:description", content: loaderData.category.blurb },
      ],
    };
  },
  component: Topic,
});

function Topic() {
  const { category } = Route.useLoaderData();
  const list = filmsIn(category.slug);
  const hero = list[0];

  return (
    <Shell>
      <section className="relative border-b border-border">
        {hero && (
          <div className="absolute inset-0">
            <img src={hero.image} alt="" className="h-full w-full object-cover opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background" />
          </div>
        )}
        <div className="edge relative py-24 md:py-32">
          <p className="label-mono animate-soft-fade text-muted-foreground">Topic · {list.length} films</p>
          <h1 className="animate-rise mt-4 text-5xl md:text-7xl">{category.name}</h1>
          <p className="animate-rise mt-6 max-w-lg text-muted-foreground [animation-delay:120ms]">
            {category.blurb}
          </p>
        </div>
      </section>

      <section className="edge py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((film, i) => (
            <Reveal key={film.slug} delay={i * 80}>
              <FilmCard film={film} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface py-14">
        <div className="edge flex flex-wrap gap-3">
          <span className="label-mono py-2.5 text-muted-foreground">Other topics</span>
          {categories
            .filter((c) => c.slug !== category.slug)
            .map((c) => (
              <Link
                key={c.slug}
                to="/topic/$slug"
                params={{ slug: c.slug }}
                className="label-mono border border-border px-4 py-2.5 transition-colors hover:border-foreground/40"
              >
                {c.name}
              </Link>
            ))}
        </div>
      </section>
    </Shell>
  );
}
