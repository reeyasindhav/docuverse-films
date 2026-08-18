import { Link } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import type { Film } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export function FilmCard({ film }: { film: Film }) {
  const { isSaved, toggleSave } = useStore();
  const saved = isSaved(film.slug);

  return (
    <article className="group">
      <div className="relative overflow-hidden bg-secondary">
        <Link to="/film/$slug" params={{ slug: film.slug }} className="block">
          <img
            src={film.image}
            alt={film.title}
            loading="lazy"
            className="aspect-[3/4] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
          />
          <span className="label-mono absolute bottom-3 left-3 bg-ink px-2.5 py-1.5 text-ink-foreground">
            {film.kind}
          </span>
        </Link>
        <button
          type="button"
          aria-label={saved ? `Remove ${film.title} from watchlist` : `Save ${film.title}`}
          onClick={() => toggleSave(film.slug)}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/85 text-foreground backdrop-blur transition-colors hover:bg-background"
        >
          <Bookmark className="h-4 w-4" fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <h3 className="mt-4 text-xl">
        <Link to="/film/$slug" params={{ slug: film.slug }} className="rule-link inline-block">
          {film.title}
        </Link>
      </h3>
      <p className="label-mono mt-2 text-muted-foreground">
        {film.runtime} · {film.year} · {film.category}
      </p>
    </article>
  );
}
