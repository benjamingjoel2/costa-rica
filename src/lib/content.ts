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
