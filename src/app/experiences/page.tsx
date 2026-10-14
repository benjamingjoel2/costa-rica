import type { Metadata } from "next";
import Link from "next/link";
import { BoxButton } from "@/components/kit/BoxButton";
import { BoxHeading } from "@/components/kit/BoxHeading";
import { Doodle } from "@/components/kit/Doodle";
import { PageHero } from "@/components/sections/PageHero";
import { PlanBlock } from "@/components/sections/PlanBlock";
import { Plate } from "@/components/ui/Plate";
import { experiences } from "@/content/experiences";
import { destinationsBySlug, journeysBySlug } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Ways to experience Costa Rica",
  description: "Wildlife, rainforest, volcanoes and hot springs, coast, food, adventure and slower travel: how your interests shape a tailor-made Costa Rica trip.",
  path: "/experiences",
});

const doodles = ["binoculars", "leaf", "volcano", "palm", "sun", "volcano", "toucan", "sun"] as const;

export default function ExperiencesPage() {
  return (
    <>
      <PageHero image="toucan" kicker="Shape the trip around what you love" title="Ways To Travel" short crumbs={[{ label: "Experiences", href: "/experiences" }]} />

      <nav aria-label="Experiences on this page" className="frame flex flex-wrap gap-px py-6">
        {experiences.map((e) => (
          <a key={e.slug} href={`#${e.slug}`} className="mono border border-ink px-3 py-2 text-[0.75rem] hover:bg-ink hover:text-white">
            {e.title}
          </a>
        ))}
      </nav>

      {experiences.map((e, i) => {
        const tone = i % 4 === 1 ? "bg-forest text-white" : i % 4 === 3 ? "bg-sage" : "";
        return (
          <section key={e.slug} id={e.slug} aria-labelledby={`${e.slug}-title`} className={`scroll-mt-6 ${tone}`}>
            <div className="frame grid gap-8 border-t border-ink py-10 md:grid-cols-12">
              <div className={`flex flex-col justify-between gap-8 md:col-span-5 ${i % 2 ? "md:order-2 md:col-start-8" : ""}`}>
                <div>
                  <BoxHeading id={`${e.slug}-title`} text={e.title} size="m" />
                  <div className="mt-8 max-w-md space-y-3 text-lead">
                    {e.body.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </div>
                <div className="flex items-end justify-between gap-6">
                  <dl className="label space-y-3">
                    <div>
                      <dt className="opacity-70">Where it fits</dt>
                      <dd className="mt-1 flex flex-wrap gap-x-3">
                        {destinationsBySlug(e.destinations).map((d) => (
                          <Link key={d.slug} href={`/destinations/${d.slug}`} className="underline underline-offset-2">
                            {d.shortName}
                          </Link>
                        ))}
                      </dd>
                    </div>
                    <div>
                      <dt className="opacity-70">Journeys to start from</dt>
                      <dd className="mt-1 flex flex-col">
                        {journeysBySlug(e.journeys).map((j) => (
                          <Link key={j.slug} href={`/journeys/${j.slug}`} className="underline underline-offset-2">
                            {j.title}
                          </Link>
                        ))}
                      </dd>
                    </div>
                  </dl>
                  <Doodle name={doodles[i % doodles.length]} className="hidden h-24 w-24 shrink-0 sm:block" />
                </div>
              </div>
              <div className={`md:col-span-7 ${i % 2 ? "md:order-1" : ""}`}>
                <Plate image={e.image} ratio="aspect-[4/3]" sizes="(min-width: 768px) 56vw, 100vw" priority={i === 0} />
              </div>
            </div>
          </section>
        );
      })}

      <section className="frame border-t border-ink py-8">
        <p className="label max-w-2xl">
          Not every activity is available in every region or at every time of year, and none is included in a journey by default. We
          suggest what makes sense for your dates, your group and the places you&rsquo;re visiting.
        </p>
        <BoxButton href="/plan" className="mt-6" dark>
          Start planning Costa Rica
        </BoxButton>
      </section>
      <PlanBlock />
    </>
  );
}
