import Link from "next/link";
import { Plate } from "@/components/ui/Plate";
import type { Destination } from "@/content/types";

/** Portrait links to destination guides. */
export function DestinationLinks({ destinations, title }: { destinations: Destination[]; title: string }) {
  if (!destinations.length) return null;
  return (
    <section aria-labelledby="destination-links" className="bg-paper">
      <div className="frame py-20 md:py-28">
        <h2 id="destination-links" className="text-display-m text-forest">
          {title}
        </h2>
        <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {destinations.map((d) => (
            <li key={d.slug}>
              <Link href={`/destinations/${d.slug}`} className="group block">
                <div className="overflow-hidden">
                  <Plate image={d.image} ratio="aspect-[3/4]" sizes="(min-width: 1024px) 22vw, 45vw" imgClassName="transition-transform duration-[1200ms] ease-out-soft group-hover:scale-[1.04]" />
                </div>
                <p className="label mt-4 text-stone">{d.area}</p>
                <p className="mt-1 font-display text-2xl leading-tight text-forest group-hover:underline group-hover:decoration-terra group-hover:underline-offset-4">{d.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
