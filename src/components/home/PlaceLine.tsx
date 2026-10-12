import Link from "next/link";
import { destinations } from "@/content/destinations";

/** A quiet dateline of regions beneath the hero. */
export function PlaceLine() {
  return (
    <nav aria-label="Regions" className="border-b border-charcoal/10 bg-ivory">
      <ul className="frame flex gap-x-7 gap-y-2 overflow-x-auto py-5 [scrollbar-width:none] md:flex-wrap md:justify-between md:overflow-visible">
        {destinations.map((d) => (
          <li key={d.slug} className="shrink-0">
            <Link href={`/destinations/${d.slug}`} className="label text-stone transition-colors hover:text-forest">
              {d.shortName}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
