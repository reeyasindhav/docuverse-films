import glacier from "@/assets/film-glacier.jpg";
import surface from "@/assets/film-surface.jpg";
import memory from "@/assets/film-memory.jpg";
import stars from "@/assets/film-stars.jpg";
import forest from "@/assets/film-forest.jpg";
import city from "@/assets/film-city.jpg";
import soil from "@/assets/film-soil.jpg";
import delta from "@/assets/film-delta.jpg";

export type Chapter = {
  index: number;
  title: string;
  start: string;
  duration: string;
  summary: string;
};

export type Film = {
  slug: string;
  title: string;
  kind: "Feature" | "Series" | "Short";
  year: number;
  runtime: string;
  category: string;
  categorySlug: string;
  image: string;
  logline: string;
  synopsis: string;
  filmmaker: string;
  filmmakerSlug: string;
  chapters: Chapter[];
};

export const categories = [
  { slug: "climate", name: "Climate", blurb: "Films about a planet in motion — ice, heat, water, and the people measuring it." },
  { slug: "oceans", name: "Oceans", blurb: "Below the surface: kelp, currents, and the last unmapped places on Earth." },
  { slug: "culture", name: "Culture", blurb: "Memory, ritual, and the archives that hold a community together." },
  { slug: "science", name: "Science", blurb: "Patient observation, long nights, and the instruments that extend our senses." },
  { slug: "people-place", name: "People & Place", blurb: "Portraits of the places that make people, and the people who remake places." },
];

export const films: Film[] = [
  {
    slug: "the-last-glacier",
    title: "The Last Glacier",
    kind: "Feature",
    year: 2024,
    runtime: "1h 42m",
    category: "Climate",
    categorySlug: "climate",
    image: glacier,
    logline: "A field scientist returns to a valley her mother mapped, and finds the ice gone.",
    synopsis:
      "Shot across four seasons in a single high valley, The Last Glacier follows glaciologist Ana Vidal as she repeats a survey her mother first completed in 1979. Where there was ice, there is now a plain of cracked silt. The film moves at the pace of measurement — long takes, hand-written notebooks, and the slow arithmetic of loss.",
    filmmaker: "Ana Vidal",
    filmmakerSlug: "ana-vidal",
    chapters: [
      { index: 1, title: "The Return", start: "00:00", duration: "14m", summary: "Ana arrives at the valley floor with her mother's field notebooks." },
      { index: 2, title: "Baseline, 1979", start: "14:12", duration: "21m", summary: "Archival footage of the original survey and the crew who made it." },
      { index: 3, title: "Meltwater", start: "35:40", duration: "26m", summary: "A season of measurement in the melt channels below the terminus." },
      { index: 4, title: "Silt Plain", start: "61:20", duration: "18m", summary: "What is left behind, and what grows in it." },
      { index: 5, title: "A Second Notebook", start: "79:00", duration: "23m", summary: "Ana closes the survey and begins one for whoever comes next." },
    ],
  },
  {
    slug: "below-the-surface",
    title: "Below the Surface",
    kind: "Series",
    year: 2023,
    runtime: "6 episodes",
    category: "Oceans",
    categorySlug: "oceans",
    image: surface,
    logline: "Six dives into the kelp forests that quietly hold the Pacific together.",
    synopsis:
      "A six-part series filmed entirely on a single stretch of coastline. Each episode descends a little further, from the canopy to the holdfast, tracing how a forest without soil sustains an entire coast.",
    filmmaker: "Marco Ibarra",
    filmmakerSlug: "marco-ibarra",
    chapters: [
      { index: 1, title: "Canopy", start: "00:00", duration: "42m", summary: "The surface layer, and the otters that farm it." },
      { index: 2, title: "Midwater", start: "00:00", duration: "44m", summary: "Light collapses; the column fills with drifting life." },
      { index: 3, title: "Holdfast", start: "00:00", duration: "39m", summary: "The anchor, and the hundred species living inside it." },
      { index: 4, title: "The Warm Year", start: "00:00", duration: "46m", summary: "A marine heatwave arrives and the forest thins." },
      { index: 5, title: "Urchin Barrens", start: "00:00", duration: "41m", summary: "What replaces a forest when the forest goes." },
      { index: 6, title: "Regrowth", start: "00:00", duration: "48m", summary: "A restoration crew replants by hand, frond by frond." },
    ],
  },
  {
    slug: "the-memory-keepers",
    title: "The Memory Keepers",
    kind: "Feature",
    year: 2024,
    runtime: "1h 20m",
    category: "Culture",
    categorySlug: "culture",
    image: memory,
    logline: "Inside a darkroom where volunteers rescue a century of a city's negatives.",
    synopsis:
      "In a basement lit only by safelight, a small crew of retired printers work through 400,000 abandoned negatives. Every frame they save is a family that gets its face back.",
    filmmaker: "Iris Kwon",
    filmmakerSlug: "iris-kwon",
    chapters: [
      { index: 1, title: "Safelight", start: "00:00", duration: "16m", summary: "The basement, the boxes, and the volunteers." },
      { index: 2, title: "Four Hundred Thousand", start: "16:04", duration: "22m", summary: "The scale of the archive becomes clear." },
      { index: 3, title: "Named", start: "38:10", duration: "24m", summary: "A face is identified after sixty years." },
      { index: 4, title: "What We Keep", start: "62:00", duration: "18m", summary: "The archive finds a permanent home." },
    ],
  },
  {
    slug: "listening-to-the-stars",
    title: "Listening to the Stars",
    kind: "Short",
    year: 2025,
    runtime: "48 min",
    category: "Science",
    categorySlug: "science",
    image: stars,
    logline: "One night shift at a mountain observatory, told in real time.",
    synopsis:
      "No narration, no score. A single night at 2,800 metres, from dome-open to dawn, with the two astronomers on shift and the sound of the drive motors.",
    filmmaker: "Priya Raghavan",
    filmmakerSlug: "priya-raghavan",
    chapters: [
      { index: 1, title: "Dome Open", start: "00:00", duration: "11m", summary: "Sunset checks and the first slew." },
      { index: 2, title: "First Light", start: "11:20", duration: "15m", summary: "Calibration frames and a long exposure begins." },
      { index: 3, title: "The Long Exposure", start: "26:30", duration: "13m", summary: "Four hours compressed; the shift talks." },
      { index: 4, title: "Dawn", start: "39:40", duration: "9m", summary: "Data closes out as the sky turns." },
    ],
  },
  {
    slug: "cathedral-of-trees",
    title: "Cathedral of Trees",
    kind: "Feature",
    year: 2023,
    runtime: "1h 34m",
    category: "People & Place",
    categorySlug: "people-place",
    image: forest,
    logline: "A community buys back the old-growth forest that once employed it.",
    synopsis:
      "After the mill closed, a coastal town spent eleven years raising the money to purchase the forest above it. The film covers the final year of the campaign and the first year of stewardship.",
    filmmaker: "Ana Vidal",
    filmmakerSlug: "ana-vidal",
    chapters: [
      { index: 1, title: "The Mill", start: "00:00", duration: "19m", summary: "What the town was built on." },
      { index: 2, title: "Eleven Years", start: "19:00", duration: "27m", summary: "The campaign, told through its meeting minutes." },
      { index: 3, title: "Deed", start: "46:00", duration: "22m", summary: "The purchase closes." },
      { index: 4, title: "Stewards", start: "68:00", duration: "26m", summary: "A first season of caring for it." },
    ],
  },
  {
    slug: "night-market",
    title: "Night Market",
    kind: "Series",
    year: 2025,
    runtime: "4 episodes",
    category: "Culture",
    categorySlug: "culture",
    image: city,
    logline: "Four vendors, four nights, one street that never fully closes.",
    synopsis:
      "Filmed over a single monsoon season, Night Market moves between four stalls and the families that have run them for three generations.",
    filmmaker: "Iris Kwon",
    filmmakerSlug: "iris-kwon",
    chapters: [
      { index: 1, title: "Setup", start: "00:00", duration: "38m", summary: "4pm to 7pm on the street." },
      { index: 2, title: "Rush", start: "00:00", duration: "36m", summary: "The peak hours, unbroken." },
      { index: 3, title: "Rain", start: "00:00", duration: "40m", summary: "A monsoon night with no customers." },
      { index: 4, title: "Close", start: "00:00", duration: "35m", summary: "3am, and the accounting." },
    ],
  },
  {
    slug: "what-the-soil-remembers",
    title: "What the Soil Remembers",
    kind: "Feature",
    year: 2024,
    runtime: "1h 28m",
    category: "Climate",
    categorySlug: "climate",
    image: soil,
    logline: "Three generations of a farm learn to read their own ground again.",
    synopsis:
      "A dryland farm on its fourth failed season turns to soil biology, and to the practices its grandparents abandoned. Patient, unhurried, and closely observed.",
    filmmaker: "Marco Ibarra",
    filmmakerSlug: "marco-ibarra",
    chapters: [
      { index: 1, title: "Fourth Season", start: "00:00", duration: "20m", summary: "A harvest that does not come." },
      { index: 2, title: "Under a Microscope", start: "20:00", duration: "23m", summary: "What is living in a handful of dirt." },
      { index: 3, title: "Cover", start: "43:00", duration: "24m", summary: "A first year of cover cropping." },
      { index: 4, title: "Green", start: "67:00", duration: "21m", summary: "The ground answers." },
    ],
  },
  {
    slug: "the-delta-count",
    title: "The Delta Count",
    kind: "Short",
    year: 2025,
    runtime: "36 min",
    category: "Science",
    categorySlug: "science",
    image: delta,
    logline: "An annual aerial survey of a river that refuses to stay in one place.",
    synopsis:
      "Every August, a two-person crew flies the same transect over an Arctic delta. Thirty-six minutes of maps, math, and a landscape rewriting itself.",
    filmmaker: "Priya Raghavan",
    filmmakerSlug: "priya-raghavan",
    chapters: [
      { index: 1, title: "Transect", start: "00:00", duration: "12m", summary: "Flight planning and the first pass." },
      { index: 2, title: "Braid", start: "12:00", duration: "13m", summary: "Where the channel moved since last year." },
      { index: 3, title: "The Count", start: "25:00", duration: "11m", summary: "Numbers, entered by hand at 800 feet." },
    ],
  },
];

export type Filmmaker = {
  slug: string;
  name: string;
  based: string;
  focus: string;
  bio: string;
  quote: string;
  portrait: string;
};

export const filmmakers: Filmmaker[] = [
  {
    slug: "ana-vidal",
    name: "Ana Vidal",
    based: "Patagonia, AR",
    focus: "Climate & landscape",
    bio: "A glaciologist turned director, Ana makes films at the pace of fieldwork. She shoots on long lenses, works with two-person crews, and refuses drone footage on principle.",
    quote: "A measurement repeated for forty years is already a story. My job is not to add anything to it.",
    portrait: glacier,
  },
  {
    slug: "marco-ibarra",
    name: "Marco Ibarra",
    based: "Monterey, US",
    focus: "Oceans & agriculture",
    bio: "Marco spent a decade as an underwater camera operator before directing. His work returns obsessively to systems — kelp, soil, watersheds — and the people maintaining them.",
    quote: "Everything I film is a forest. Some of them are underwater, and one of them is dirt.",
    portrait: surface,
  },
  {
    slug: "iris-kwon",
    name: "Iris Kwon",
    based: "Seoul, KR",
    focus: "Archives & city life",
    bio: "Iris works almost exclusively at night and in basements. Her films are about the labour of remembering: printers, vendors, archivists, and the hours they keep.",
    quote: "An archive is just a lot of people agreeing not to forget on a schedule.",
    portrait: memory,
  },
  {
    slug: "priya-raghavan",
    name: "Priya Raghavan",
    based: "Bengaluru, IN",
    focus: "Science & observation",
    bio: "Priya's films have no narration and rarely any music. She embeds with research crews and films their full shift, then cuts almost nothing out.",
    quote: "Boredom is data. If you cut the waiting, you have cut the science.",
    portrait: stars,
  },
];

export type Watchlist = {
  slug: string;
  title: string;
  curator: string;
  blurb: string;
  filmSlugs: string[];
};

export const watchlists: Watchlist[] = [
  {
    slug: "feel-small",
    title: "For when you need to feel small",
    curator: "Docuverse Editorial",
    blurb: "A quiet collection of films about vast landscapes, deep time, and the forces that shape us.",
    filmSlugs: ["cathedral-of-trees", "listening-to-the-stars", "the-delta-count", "the-last-glacier"],
  },
  {
    slug: "hands-at-work",
    title: "Hands at work",
    curator: "Iris Kwon",
    blurb: "Films about labour done carefully: printers, farmers, vendors, and night crews.",
    filmSlugs: ["the-memory-keepers", "night-market", "what-the-soil-remembers"],
  },
  {
    slug: "one-place-only",
    title: "One place, all year",
    curator: "Marco Ibarra",
    blurb: "Every film here stays in a single location for its full running time.",
    filmSlugs: ["below-the-surface", "the-last-glacier", "cathedral-of-trees"],
  },
  {
    slug: "no-narration",
    title: "No narration",
    curator: "Priya Raghavan",
    blurb: "Observational work with no voiceover, no score, and very little cutting.",
    filmSlugs: ["listening-to-the-stars", "the-delta-count", "night-market"],
  },
];

export const getFilm = (slug: string) => films.find((f) => f.slug === slug);
export const getFilmmaker = (slug: string) => filmmakers.find((f) => f.slug === slug);
export const getWatchlist = (slug: string) => watchlists.find((w) => w.slug === slug);
export const filmsBy = (filmmakerSlug: string) => films.filter((f) => f.filmmakerSlug === filmmakerSlug);
export const filmsIn = (categorySlug: string) => films.filter((f) => f.categorySlug === categorySlug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
