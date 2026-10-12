import { getDestination } from "@/content/destinations";
import { getJourney } from "@/content/journeys";
import type { Destination, Journey } from "@/content/types";

/** Resolve slugs to entries, dropping any that don't exist. */
export function destinationsBySlug(slugs: string[]): Destination[] {
  return slugs.map(getDestination).filter((d): d is Destination => Boolean(d));
}

export function journeysBySlug(slugs: string[]): Journey[] {
  return slugs.map(getJourney).filter((j): j is Journey => Boolean(j));
}

export function regionNames(journey: Journey) {
  return destinationsBySlug(journey.destinations).map((d) => d.shortName);
}

export function pad(n: number) {
  return String(n).padStart(2, "0");
}

import { readingMinutes } from "@/content/journal";
import type { Article } from "@/content/types";

/** Card props shared by every carousel. */
export function journeyCard(j: Journey) {
  return {
    href: `/journeys/${j.slug}`,
    image: j.image,
    tags: ["Journey", j.pace],
    title: j.title,
    meta: [j.suggestedLength, ...regionNames(j)],
    summary: j.summary,
  };
}

export function destinationCard(d: Destination) {
  return {
    href: `/destinations/${d.slug}`,
    image: d.image,
    tags: ["Region", d.area],
    title: d.name,
    meta: d.landscapes.slice(0, 3),
    summary: d.tagline,
  };
}

export function articleCard(a: Article) {
  return {
    href: `/journal/${a.slug}`,
    image: a.image,
    tags: [a.category],
    title: a.title,
    meta: [`${readingMinutes(a)} min read`, "Selvora journal"],
    summary: a.dek,
  };
}
