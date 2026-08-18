import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type User = { name: string; email: string };

type Progress = Record<string, { chapter: number; updated: number }>;

type Store = {
  user: User | null;
  ready: boolean;
  signIn: (email: string, name?: string) => void;
  signOut: () => void;
  saved: string[];
  toggleSave: (slug: string) => void;
  isSaved: (slug: string) => boolean;
  progress: Progress;
  setProgress: (slug: string, chapter: number) => void;
};

const StoreContext = createContext<Store | null>(null);

const KEY = "docuverse.state.v1";

type Persisted = { user: User | null; saved: string[]; progress: Progress };

const empty: Persisted = { user: null, saved: [], progress: {} };

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(empty);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...empty, ...(JSON.parse(raw) as Persisted) });
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(KEY, JSON.stringify(state));
  }, [state, ready]);

  const signIn = useCallback((email: string, name?: string) => {
    setState((s) => ({ ...s, user: { email, name: name || email.split("@")[0] } }));
  }, []);

  const signOut = useCallback(() => setState((s) => ({ ...s, user: null })), []);

  const toggleSave = useCallback((slug: string) => {
    setState((s) => ({
      ...s,
      saved: s.saved.includes(slug) ? s.saved.filter((x) => x !== slug) : [slug, ...s.saved],
    }));
  }, []);

  const setProgress = useCallback((slug: string, chapter: number) => {
    setState((s) => ({ ...s, progress: { ...s.progress, [slug]: { chapter, updated: Date.now() } } }));
  }, []);

  const value = useMemo<Store>(
    () => ({
      user: state.user,
      ready,
      signIn,
      signOut,
      saved: state.saved,
      toggleSave,
      isSaved: (slug) => state.saved.includes(slug),
      progress: state.progress,
      setProgress,
    }),
    [state, ready, signIn, signOut, toggleSave, setProgress],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
