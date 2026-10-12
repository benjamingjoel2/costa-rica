import Link from "next/link";
import { Arrow, ArrowLink } from "@/components/ui/ArrowLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Plate } from "@/components/ui/Plate";
import { journeys } from "@/content/journeys";
import { pad, regionNames } from "@/lib/content";

export function SignatureJourneys() {
  const [lead, ...rest] = journeys;
  return (
    <section aria-labelledby="journeys-title" className="bg-paper py-24 md:py-32">
      <div className="frame">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow index="02">Signature journeys</Eyebrow>
            <h2 id="journeys-title" className="mt-8 text-display-l text-forest">
              Five ways through Costa Rica. <em className="italic font-normal">None of them fixed.</em>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-stone">
              These routes are starting points, not packages. Each one is rebuilt around your dates, your interests and the pace you
              enjoy.
            </p>
            <ArrowLink href="/journeys" className="mt-4">
              All journeys
            </ArrowLink>
          </div>
        </div>

        {/* Lead journey */}
        <article className="group relative mt-16 grid gap-8 md:mt-20 lg:grid-cols-12 lg:gap-10" data-reveal>
          <div className="overflow-hidden lg:col-span-7">
            <Plate
              image={lead.image}
              ratio="aspect-[4/3]"
              sizes="(min-width: 1024px) 55vw, 100vw"
              imgClassName="transition-transform duration-[1400ms] ease-out-soft group-hover:scale-[1.03]"
            />
          </div>
          <div className="flex flex-col justify-end lg:col-span-5 lg:pb-4">
            <p className="label text-terra-ink">{pad(1)} &middot; {lead.kicker}</p>
            <h3 className="mt-5 text-display-m text-forest">
              <Link href={`/journeys/${lead.slug}`} className="after:absolute after:inset-0">
                {lead.title}
              </Link>
            </h3>
            <p className="mt-5 max-w-md text-stone">{lead.summary}</p>
            <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-charcoal/15 pt-6 text-sm">
              <div>
                <dt className="label text-stone">Regions</dt>
                <dd className="mt-2">{regionNames(lead).join(", ")}</dd>
              </div>
              <div>
                <dt className="label text-stone">As a guide</dt>
                <dd className="mt-2">{lead.suggestedLength}</dd>
              </div>
            </dl>
            <span className="mt-8 inline-flex items-center gap-3 font-semibold text-forest">
              Explore this journey <Arrow />
            </span>
          </div>
        </article>

        {/* The rest, as an editorial ledger */}
        <ol className="mt-20 border-t border-charcoal/20" start={2}>
          {rest.map((j, i) => (
            <li key={j.slug} className="border-b border-charcoal/20">
              <article className="group relative grid grid-cols-[auto_1fr] gap-x-5 gap-y-4 py-8 md:grid-cols-12 md:items-center md:gap-x-8 md:py-10">
                <span className="label pt-2 text-terra-ink md:col-span-1 md:pt-0">{pad(i + 2)}</span>
                <div className="md:col-span-5">
                  <h3 className="text-display-s text-forest transition-transform duration-500 ease-out-soft group-hover:translate-x-1">
                    <Link href={`/journeys/${j.slug}`} className="after:absolute after:inset-0">
                      {j.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-[0.95rem] text-stone">{j.summary}</p>
                </div>
                <p className="col-start-2 text-sm text-stone md:col-span-3 md:col-start-auto">
                  <span className="label block text-charcoal/70">{regionNames(j).join(" · ")}</span>
                  <span className="mt-1 block">{j.suggestedLength}</span>
                </p>
                <div className="col-span-2 overflow-hidden md:col-span-3">
                  <Plate
                    image={j.image}
                    ratio="aspect-[16/10]"
                    sizes="(min-width: 768px) 22vw, 100vw"
                    imgClassName="transition-transform duration-[1200ms] ease-out-soft group-hover:scale-105"
                  />
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
