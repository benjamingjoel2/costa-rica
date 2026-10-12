import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClosingInvitation } from "@/components/sections/ClosingInvitation";
import { DestinationLinks } from "@/components/sections/DestinationLinks";
import { DetailHero } from "@/components/sections/DetailHero";
import { RelatedJourneys } from "@/components/sections/RelatedJourneys";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Plate } from "@/components/ui/Plate";
import { getJourney, journeys } from "@/content/journeys";
import { images } from "@/content/images";
import { destinationsBySlug, pad, regionNames } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return journeys.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const journey = getJourney(slug);
  if (!journey) return {};
  return {
    title: `${journey.title}: a tailor-made Costa Rica journey`,
    description: journey.seoDescription,
    alternates: { canonical: `/journeys/${journey.slug}` },
    openGraph: { title: journey.title, description: journey.seoDescription, images: [{ url: images[journey.image].src, alt: images[journey.image].alt }] },
  };
}

export default async function JourneyPage({ params }: Props) {
  const { slug } = await params;
  const journey = getJourney(slug);
  if (!journey) notFound();

  const regions = destinationsBySlug(journey.destinations);
  const others = journeys.filter((j) => j.slug !== journey.slug && j.destinations.some((d) => journey.destinations.includes(d))).slice(0, 3);
  const adaptHref = `/plan?journey=${journey.slug}`;

  return (
    <>
      <DetailHero
        image={journey.image}
        label={`Journey · ${regionNames(journey).join(" · ")}`}
        title={journey.title}
        standfirst={journey.summary}
        crumbs={[
          { label: "Journeys", href: "/journeys" },
          { label: journey.title, href: `/journeys/${journey.slug}` },
        ]}
      />

      {/* At a glance */}
      <section aria-label="At a glance" className="border-b border-charcoal/10 bg-paper">
        <dl className="frame grid grid-cols-2 gap-x-6 gap-y-8 py-10 md:grid-cols-4">
          <Fact term="Regions" value={regionNames(journey).join(", ")} />
          <Fact term="Suggested length" value={journey.suggestedLength} note="A planning guide, not a fixed schedule" />
          <Fact term="Pace" value={journey.pace} />
          <Fact term="Suits" value={journey.idealFor.slice(0, 3).join(", ")} />
        </dl>
      </section>

      {/* Introduction */}
      <section className="frame py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Eyebrow>{journey.kicker}</Eyebrow>
            <div className="mt-8 space-y-6">
              {journey.intro.map((p, i) => (
                <p key={i} className={i === 0 ? "font-display text-[1.75rem] leading-snug text-forest md:text-[2.1rem]" : "max-w-2xl text-stone"}>
                  {p}
                </p>
              ))}
            </div>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="border-l-2 border-terra pl-6">
              <p className="label text-terra-ink">An illustrative route</p>
              <p className="mt-3 text-[0.95rem] text-charcoal/85">
                This is a suggested shape for a trip, not a bookable package. Places to stay, timings and transport are chosen with
                you and confirmed only in your own proposal.
              </p>
            </div>
            <div className="mt-10">
              <p className="label text-stone">Ideal for</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {journey.idealFor.map((t) => (
                  <li key={t} className="border border-charcoal/20 px-3 py-1.5 text-sm">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* The shape of the journey */}
      <section aria-labelledby="route-title" className="bg-forest text-ivory">
        <div className="frame py-20 md:py-28">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow tone="light">The shape of the journey</Eyebrow>
              <h2 id="route-title" className="mt-8 text-display-l text-ivory">
                A suggested route, <em className="italic font-normal">stage by stage.</em>
              </h2>
            </div>
            <p className="text-ivory/75 lg:col-span-4 lg:col-start-9">
              Nights shown are suggestions to give a sense of pace. We adjust them to your dates and to what you want more, or less,
              of.
            </p>
          </div>
          <ol className="mt-16 border-t border-ivory/15">
            {journey.stages.map((s, i) => (
              <li key={s.title} className="grid gap-4 border-b border-ivory/15 py-10 md:grid-cols-12 md:gap-8" data-reveal>
                <p className="label text-ivory/60 md:col-span-2 md:pt-3">Stage {pad(i + 1)}</p>
                <div className="md:col-span-3">
                  <p className="font-display text-[2rem] leading-tight">{s.place}</p>
                  <p className="mt-1 text-sm text-sage">Suggested: {s.stay}</p>
                </div>
                <div className="md:col-span-6 md:col-start-7">
                  <h3 className="font-display text-[1.6rem] italic leading-tight">{s.title}</h3>
                  <p className="mt-3 text-ivory/80">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Experiences and stays */}
      <section className="frame py-20 md:py-28">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Plate image={journey.secondaryImage} ratio="aspect-[4/5]" sizes="(min-width: 1024px) 38vw, 100vw" />
          </div>
          <div className="space-y-16 lg:col-span-6 lg:col-start-7">
            <div>
              <h2 className="text-display-m text-forest">Experiences along the way</h2>
              <p className="mt-4 text-stone">A selection of what this route can include. We choose with you, and nothing is included by default.</p>
              <ul className="mt-8 border-t border-charcoal/15">
                {journey.experiences.map((e) => (
                  <li key={e} className="border-b border-charcoal/15 py-4 font-display text-[1.45rem] leading-snug text-charcoal">
                    {e}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-display-m text-forest">Where you might stay</h2>
              <p className="mt-4 text-stone">{journey.stays.intro}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {journey.stays.styles.map((s) => (
                  <li key={s} className="bg-sage px-3 py-1.5 text-sm text-forest-deep">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-display-m text-forest">Good to know</h2>
              <ul className="prose-selvora mt-6">
                {journey.considerations.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap items-center gap-6 border-t border-charcoal/15 pt-10">
              <ButtonLink href={adaptHref}>Adapt this journey</ButtonLink>
              <p className="text-sm text-stone">Tell us what you&rsquo;d change. We&rsquo;ll start from there.</p>
            </div>
          </div>
        </div>
      </section>

      <DestinationLinks destinations={regions} title="The regions on this route" />
      <RelatedJourneys journeys={others} title="Journeys with something in common" />

      <ClosingInvitation
        title={
          <>
            Make it <em className="italic font-normal">your own.</em>
          </>
        }
        text={`Use ${journey.title} as a starting point, or as a reference for something quite different. Either way, we'll shape it around you.`}
        image={journey.secondaryImage}
        ctaLabel="Start planning this journey"
        ctaHref={adaptHref}
      />
    </>
  );
}

function Fact({ term, value, note }: { term: string; value: string; note?: string }) {
  return (
    <div>
      <dt className="label text-stone">{term}</dt>
      <dd className="mt-2 font-display text-[1.35rem] leading-snug text-forest">{value}</dd>
      {note && <dd className="mt-1 text-xs text-stone">{note}</dd>}
    </div>
  );
}
