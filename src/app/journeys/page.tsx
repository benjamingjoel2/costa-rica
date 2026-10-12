import type { Metadata } from "next";
import Link from "next/link";
import { ClosingInvitation } from "@/components/sections/ClosingInvitation";
import { PageIntro } from "@/components/sections/PageIntro";
import { Arrow } from "@/components/ui/ArrowLink";
import { Plate } from "@/components/ui/Plate";
import { journeys } from "@/content/journeys";
import { pad, regionNames } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tailor-made Costa Rica journeys",
  description:
    "Illustrative Costa Rica itineraries to start from: rainforest and Pacific coast, volcanoes and cloud forest, the Osa Peninsula, Nicoya and a wildlife route. Each one adapted to you.",
  alternates: { canonical: "/journeys" },
};

export default function JourneysPage() {
  return (
    <>
      <PageIntro
        eyebrow="Journeys"
        crumbs={[{ label: "Journeys", href: "/journeys" }]}
        title={
          <>
            Routes to begin <em className="italic font-normal">a conversation.</em>
          </>
        }
        lede="Five journeys that show how Costa Rica can fit together. None of them is a package: each is a starting point that we reshape around your dates, interests and pace."
      />

      <div className="frame pb-24 md:pb-32">
        <ol className="space-y-24 md:space-y-32">
          {journeys.map((j, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={j.slug}>
                <article className="group relative grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10" data-reveal>
                  <div className={`overflow-hidden lg:col-span-7 ${flip ? "lg:order-2 lg:col-start-6" : ""}`}>
                    <Plate
                      image={j.image}
                      ratio={i % 3 === 2 ? "aspect-[16/10]" : "aspect-[4/3]"}
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      priority={i === 0}
                      imgClassName="transition-transform duration-[1400ms] ease-out-soft group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className={`lg:col-span-4 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-9"}`}>
                    <p className="label text-terra-ink">
                      {pad(i + 1)} &middot; {regionNames(j).join(" · ")}
                    </p>
                    <h2 className="mt-5 text-display-m text-forest">
                      <Link href={`/journeys/${j.slug}`} className="after:absolute after:inset-0">
                        {j.title}
                      </Link>
                    </h2>
                    <p className="mt-3 font-display text-xl italic text-charcoal/80">{j.kicker}</p>
                    <p className="mt-5 text-stone">{j.summary}</p>
                    <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-charcoal/15 pt-6 text-sm">
                      <div>
                        <dt className="label text-stone">As a guide</dt>
                        <dd className="mt-2">{j.suggestedLength}</dd>
                      </div>
                      <div>
                        <dt className="label text-stone">Pace</dt>
                        <dd className="mt-2">{j.pace}</dd>
                      </div>
                    </dl>
                    <span className="mt-8 inline-flex items-center gap-3 font-semibold text-forest">
                      See the route <Arrow />
                    </span>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>

      <ClosingInvitation
        title={
          <>
            None of these <em className="italic font-normal">quite right?</em>
          </>
        }
        text="Most of the trips we plan don't look like any of the routes above. Tell us what you're hoping for and we'll suggest a shape that fits."
        image="coffee"
        ctaLabel="Tell us what you have in mind"
      />
    </>
  );
}
