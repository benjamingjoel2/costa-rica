import type { Metadata } from "next";
import Link from "next/link";
import { ClosingInvitation } from "@/components/sections/ClosingInvitation";
import { PageIntro } from "@/components/sections/PageIntro";
import { Plate } from "@/components/ui/Plate";
import { experiences } from "@/content/experiences";
import { destinationsBySlug, journeysBySlug, pad } from "@/lib/content";

export const metadata: Metadata = {
  title: "Ways to experience Costa Rica",
  description:
    "Wildlife, rainforest and cloud forest, volcanoes and hot springs, coast, food and culture, active adventure, private guiding and slower travel: how interests shape a tailor-made Costa Rica trip.",
  alternates: { canonical: "/experiences" },
};

export default function ExperiencesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Experiences"
        crumbs={[{ label: "Experiences", href: "/experiences" }]}
        title={
          <>
            Shape the trip around <em className="italic font-normal">what you love.</em>
          </>
        }
        lede="Interests decide where a journey goes, how long it lingers and who you spend your days with. These are the threads most trips are woven from."
        aside={
          <nav aria-label="Experiences on this page" className="mt-8">
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {experiences.map((e) => (
                <li key={e.slug}>
                  <a href={`#${e.slug}`} className="underline decoration-charcoal/25 underline-offset-4 hover:decoration-terra">
                    {e.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        }
      />

      <div className="pb-8">
        {experiences.map((e, i) => {
          const dark = i % 3 === 1;
          const flip = i % 2 === 1;
          const places = destinationsBySlug(e.destinations);
          const routes = journeysBySlug(e.journeys);
          return (
            <section
              key={e.slug}
              id={e.slug}
              aria-labelledby={`${e.slug}-title`}
              className={`scroll-mt-24 ${dark ? "bg-forest text-ivory" : ""}`}
            >
              <div className="frame grid gap-10 py-20 md:py-24 lg:grid-cols-12 lg:items-center lg:gap-10">
                <div className={`lg:col-span-6 ${flip ? "lg:order-2 lg:col-start-7" : ""}`}>
                  <Plate
                    image={e.image}
                    ratio={i % 2 === 0 ? "aspect-[4/3]" : "aspect-[5/4]"}
                    sizes="(min-width: 1024px) 48vw, 100vw"
                    priority={i === 0}
                  />
                </div>
                <div className={`lg:col-span-5 ${flip ? "lg:order-1" : "lg:col-start-8"}`} data-reveal>
                  <p className={`label ${dark ? "text-ivory/70" : "text-terra-ink"}`}>{pad(i + 1)}</p>
                  <h2 id={`${e.slug}-title`} className={`mt-4 text-display-m ${dark ? "text-ivory" : "text-forest"}`}>
                    {e.title}
                  </h2>
                  <p className={`mt-3 font-display text-xl italic ${dark ? "text-sage" : "text-charcoal/80"}`}>Travel {e.phrase}</p>
                  <div className={`mt-6 space-y-4 ${dark ? "text-ivory/80" : "text-stone"}`}>
                    {e.body.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                  <dl className={`mt-8 grid gap-6 border-t pt-6 text-sm sm:grid-cols-2 ${dark ? "border-ivory/20" : "border-charcoal/15"}`}>
                    <div>
                      <dt className={`label ${dark ? "text-ivory/60" : "text-stone"}`}>Where it fits</dt>
                      <dd className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                        {places.map((p) => (
                          <Link key={p.slug} href={`/destinations/${p.slug}`} className="underline decoration-terra underline-offset-4">
                            {p.shortName}
                          </Link>
                        ))}
                      </dd>
                    </div>
                    <div>
                      <dt className={`label ${dark ? "text-ivory/60" : "text-stone"}`}>Journeys to start from</dt>
                      <dd className="mt-2 space-y-1">
                        {routes.map((r) => (
                          <Link key={r.slug} href={`/journeys/${r.slug}`} className="block underline decoration-terra underline-offset-4">
                            {r.title}
                          </Link>
                        ))}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section className="frame pb-20">
        <p className="max-w-3xl border-l-2 border-terra pl-6 text-[0.95rem] text-stone">
          Not every activity is available in every region or at every time of year, and none is included in a journey by default. We
          suggest what makes sense for your dates, your group and the places you&rsquo;re visiting.
        </p>
      </section>

      <ClosingInvitation
        title={
          <>
            Tell us what <em className="italic font-normal">draws you.</em>
          </>
        }
        text="Pick a few interests, or all of them. We'll turn them into a route with the right balance of activity and rest."
        image="waterfall"
        ctaLabel="Start planning Costa Rica"
      />
    </>
  );
}
