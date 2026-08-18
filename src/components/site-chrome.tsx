import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/lib/store";

const nav = [
  { to: "/browse", label: "Browse" },
  { to: "/watchlists", label: "Watchlists" },
  { to: "/filmmakers", label: "Filmmakers" },
] as const;

export function SiteHeader() {
  const { user } = useStore();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="edge grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-4 md:grid-cols-[1fr_auto_1fr]">
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center bg-primary font-display text-sm text-primary-foreground">
            D/
          </span>
          <span className="label-mono truncate">Docuverse</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="label-mono rule-link text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "label-mono rule-link text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            aria-label="Search films"
            onClick={() => navigate({ to: "/browse" })}
            className="hidden h-9 w-9 place-items-center text-muted-foreground transition-colors hover:text-foreground sm:grid"
          >
            <Search className="h-4 w-4" />
          </button>
          {user ? (
            <Link
              to="/dashboard"
              className="label-mono border border-foreground/25 px-4 py-2.5 transition-colors hover:bg-foreground hover:text-background"
            >
              {user.name}
            </Link>
          ) : (
            <Link
              to="/signin"
              className="label-mono border border-foreground/25 px-4 py-2.5 transition-colors hover:bg-foreground hover:text-background"
            >
              Sign in
            </Link>
          )}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="edge flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="label-mono py-3">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="edge grid gap-6 py-10 md:grid-cols-3 md:items-center">
        <p className="label-mono text-muted-foreground">© 2024 Docuverse</p>
        <p className="label-mono text-center text-muted-foreground">Stories worth staying for.</p>
        <div className="flex gap-6 md:justify-end">
          <Link to="/about" className="label-mono rule-link text-muted-foreground hover:text-foreground">
            About
          </Link>
          <Link to="/filmmakers" className="label-mono rule-link text-muted-foreground hover:text-foreground">
            Filmmakers
          </Link>
          <Link to="/watchlists" className="label-mono rule-link text-muted-foreground hover:text-foreground">
            Journal
          </Link>
        </div>
      </div>
    </footer>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHead({ kicker, title, blurb }: { kicker: string; title: string; blurb?: string }) {
  return (
    <div className="edge border-b border-border py-16 md:py-20">
      <p className="label-mono animate-soft-fade text-muted-foreground">{kicker}</p>
      <h1 className="animate-rise mt-4 max-w-3xl text-4xl leading-[1.05] md:text-6xl">{title}</h1>
      {blurb && <p className="animate-rise mt-6 max-w-xl text-muted-foreground [animation-delay:120ms]">{blurb}</p>}
    </div>
  );
}
