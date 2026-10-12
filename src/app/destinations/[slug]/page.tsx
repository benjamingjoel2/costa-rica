import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClosingInvitation } from "@/components/sections/ClosingInvitation";
import { DestinationLinks } from "@/components/sections/DestinationLinks";
import { DetailHero } from "@/components/sections/DetailHero";
import { RelatedJourneys } from "@/components/sections/RelatedJourneys";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Plate } from "@/components/ui/Plate";
import { destinations, getDestination } from "@/content/destinations";
import { images } from "@/content/images";
import { journeysForDestination } from "@/content/journeys";
import { destinationsBySlug } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) return {};
  return {
    title: `${d.name}: Costa Rica destination guide`,
    description: d.seoDescription,
    alternates: { canonical: `/destinations/${d.slug}` },
    openGraph: { title: d.name, description: d.seoDescription, images: [{ url: images[d.image].src, alt: images[d.image].alt }] },
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) notFound();

  const [first, second, ...more] = d.chapters;
  const pairs = destinationsBySlug(d.pairsWith);

  return (
    <>
      <DetailHero
        image={d.image}
        label={`Destination · ${d.area}`}
        title={d.name}
        standfirst={d.tagline}
        crumbs={[
          { label: "Destinations", href: "/destinations" },
          { label: d.shortName, href: `/destinations/${d.slug}` },
        ]}
      />

      {/* Lede and at-a-glance */}
      <section className="frame py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <p className="font-display text-[1.75rem] leading-snug text-forest md:text-[2.2rem] lg:col-span-7">{d.lede}</p>
          <aside className="lg:col-span-4 lg:col-start-9">
            <dl className="divide-y divide-charcoal/15 border-y border-charcoal/15">
              <div className="py-5">
                <dt className="label text-stone">Landscapes</dt>
                <dd className="mt-2">{d.landscapes.join(" · ")}</dd>
              </div>
              <div className="py-5">
                <dt className="label text-stone">Pairs well with</dt>
                <dd className="mt-2 flex flex-wrap gap-x-4">
                  {pairs.map((p) => (
                    <Link key={p.slug} href={`/destinations/${p.slug}`} className="underline decoration-terra underline-offset-4 hover:text-forest">
                      {p.shortName}
                    </Link>
                  ))}
                </dd>
              </div>
              <div className="py-5">
                <dt className="label text-stone">Weather and seasons</dt>
                <dd className="mt-2 text-[0.95rem] text-charcoal/85">{d.season}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      {/* First chapter beside a portrait image */}
      {first && (
        <section className="frame pb-20 md:pb-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className="lg:col-span-5">
              <Plate image={d.secondaryImage} ratio="aspect-[4/5]" sizes="(min-width: 1024px) 38vw, 100vw" />
            </div>
            <div className="lg:col-span-6 lg:col-start-7" data-reveal>
              <Eyebrow index="01">What makes it special</Eyebrow>
              <h2 className="mt-6 text-display-m text-forest">{first.heading}</h2>
              <div className="mt-6 space-y-5 text-stone">
                {first.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Second chapter as a quiet sage band */}
      {second && (
        <section className="bg-sage">
          <div className="frame grid gap-8 py-20 md:py-28 lg:grid-cols-12 lg:gap-10" data-reveal>
            <div className="lg:col-span-4">
              <Eyebrow index="02">{d.shortName}</Eyebrow>
              <h2 className="mt-6 text-display-m text-forest">{second.heading}</h2>
            </div>
            <div className="space-y-5 text-lead text-charcoal/85 lg:col-span-7 lg:col-start-6">
              {second.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Remaining chapters, experiences, who it suits */}
      <section className="frame py-20 md:py-28">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-14 lg:col-span-7">
            {more.map((c, i) => (
              <div key={c.heading} data-reveal>
                <Eyebrow index={String(i + 3).padStart(2, "0")}>{d.shortName}</Eyebrow>
                <h2 className="mt-6 text-display-m text-forest">{c.heading}</h2>
                <div className="mt-6 space-y-5 text-stone">
                  {c.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
            <div data-reveal>
              <h2 className="text-display-s text-forest">Who it suits</h2>
              <p className="mt-4 text-stone">{d.suits}</p>
              <h2 className="mt-12 text-display-s text-forest">Fitting it into a wider journey</h2>
              <p className="mt-4 text-stone">{d.fit}</p>
            </div>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="bg-forest p-8 text-ivory lg:sticky lg:top-28">
              <p className="label text-ivory/70">Things to do here</p>
              <ul className="mt-6 space-y-3">
                {d.experiences.map((e) => (
                  <li key={e} className="border-b border-ivory/15 pb-3 font-display text-[1.35rem] leading-snug">
                    {e}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-ivory/70">
                Availability varies by season and conditions. We&rsquo;ll suggest what suits your dates.
              </p>
              <Link href={`/plan?destination=${d.slug}`} className="group mt-8 flex min-h-12 items-center justify-between bg-ivory px-5 font-semibold text-forest-deep">
                Include {d.shortName} in my trip
                <span aria-hidden className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <RelatedJourneys journeys={journeysForDestination(d.slug)} />
      <DestinationLinks destinations={pairs} title="Nearby, and often combined" />

      <ClosingInvitation
        title={
          <>
            Find your way <em className="italic font-normal">here.</em>
          </>
        }
        text="Tell us when you're thinking of travelling and what draws you here. We'll suggest how to fit it into a route that works."
        image={d.secondaryImage}
        ctaHref={`/plan?destination=${d.slug}`}
      />
    </>
  );
}
