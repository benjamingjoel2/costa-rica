import Link from "next/link";
import { Arrow } from "@/components/ui/ArrowLink";
import { Plate } from "@/components/ui/Plate";
import type { Journey } from "@/content/types";
import { regionNames } from "@/lib/content";

/** A compact row of journey links, used at the foot of detail pages. */
export function RelatedJourneys({ journeys, title = "Journeys that pass through here" }: { journeys: Journey[]; title?: string }) {
  if (!journeys.length) return null;
  return (
    <section aria-labelledby="related-journeys" className="frame py-20 md:py-28">
      <h2 id="related-journeys" className="text-display-m text-forest">
        {title}
      </h2>
      <ul className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {journeys.map((j) => (
          <li key={j.slug}>
            <article className="group relative">
              <div className="overflow-hidden">
                <Plate image={j.image} ratio="aspect-[4/3]" sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw" imgClassName="transition-transform duration-[1200ms] ease-out-soft group-hover:scale-[1.04]" />
              </div>
              <p className="label mt-5 text-stone">{regionNames(j).join(" · ")}</p>
              <h3 className="mt-2 flex items-center justify-between gap-4 font-display text-[1.75rem] leading-tight text-forest">
                <Link href={`/journeys/${j.slug}`} className="after:absolute after:inset-0">
                  {j.title}
                </Link>
                <Arrow />
              </h3>
              <p className="mt-2 text-[0.95rem] text-stone">{j.summary}</p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
