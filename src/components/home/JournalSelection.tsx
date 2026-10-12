import Link from "next/link";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Plate } from "@/components/ui/Plate";
import { articles } from "@/content/journal";

export function JournalSelection() {
  const [lead, ...others] = articles;
  const side = others.slice(0, 3);
  return (
    <section aria-labelledby="journal-title" className="frame py-24 md:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow index="07">The journal</Eyebrow>
          <h2 id="journal-title" className="mt-8 text-display-l text-forest">
            Notes for planning well.
          </h2>
        </div>
        <ArrowLink href="/journal">Read the journal</ArrowLink>
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
        <article className="group relative lg:col-span-7">
          <div className="overflow-hidden">
            <Plate image={lead.image} ratio="aspect-[3/2]" sizes="(min-width: 1024px) 55vw, 100vw" imgClassName="transition-transform duration-[1400ms] ease-out-soft group-hover:scale-[1.03]" />
          </div>
          <p className="label mt-6 text-terra-ink">{lead.category}</p>
          <h3 className="mt-3 text-display-m text-forest">
            <Link href={`/journal/${lead.slug}`} className="after:absolute after:inset-0">
              {lead.title}
            </Link>
          </h3>
          <p className="mt-4 max-w-xl text-stone">{lead.dek}</p>
        </article>

        <ul className="lg:col-span-5">
          {side.map((a) => (
            <li key={a.slug} className="border-t border-charcoal/15 py-7 first:border-t-0 first:pt-0 lg:first:border-t lg:first:pt-7">
              <article className="group relative grid grid-cols-[1fr_7rem] gap-6 sm:grid-cols-[1fr_9rem]">
                <div>
                  <p className="label text-terra-ink">{a.category}</p>
                  <h3 className="mt-2 font-display text-[1.6rem] leading-tight text-forest group-hover:underline group-hover:decoration-terra group-hover:underline-offset-4">
                    <Link href={`/journal/${a.slug}`} className="after:absolute after:inset-0">
                      {a.title}
                    </Link>
                  </h3>
                </div>
                <Plate image={a.image} ratio="aspect-square" sizes="9rem" />
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
