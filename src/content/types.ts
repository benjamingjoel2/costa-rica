import type { ImageKey } from "./images";

export type Destination = {
  slug: string;
  name: string;
  /** Short label for navigation, lists and breadcrumbs. */
  shortName: string;
  area: string;
  tagline: string;
  summary: string;
  lede: string;
  image: ImageKey;
  secondaryImage: ImageKey;
  chapters: { heading: string; body: string[] }[];
  landscapes: string[];
  experiences: string[];
  suits: string;
  fit: string;
  season: string;
  pairsWith: string[];
  seoDescription: string;
};

export type JourneyStage = {
  place: string;
  /** Suggested time, always presented as a planning guide rather than a fixed schedule. */
  stay: string;
  title: string;
  body: string;
};

export type Journey = {
  slug: string;
  title: string;
  /** A one-line description of what kind of trip this is. */
  kicker: string;
  summary: string;
  intro: string[];
  destinations: string[];
  image: ImageKey;
  secondaryImage: ImageKey;
  suggestedLength: string;
  pace: string;
  idealFor: string[];
  stages: JourneyStage[];
  experiences: string[];
  stays: { intro: string; styles: string[] };
  considerations: string[];
  seoDescription: string;
};

export type Experience = {
  slug: string;
  title: string;
  /** The italic phrase used in typographic lists. */
  phrase: string;
  summary: string;
  body: string[];
  image: ImageKey;
  destinations: string[];
  journeys: string[];
};

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; image: ImageKey; caption?: string }
  | { type: "aside"; title: string; text: string };

export type Article = {
  slug: string;
  title: string;
  category: "Planning" | "Destinations" | "Nature" | "Seasons";
  dek: string;
  image: ImageKey;
  body: ArticleBlock[];
  relatedJourneys: string[];
  relatedDestinations: string[];
  seoDescription: string;
};
