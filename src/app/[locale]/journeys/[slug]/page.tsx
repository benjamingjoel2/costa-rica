import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BoxButton } from "@/components/kit/BoxButton";
import { BoxHeading } from "@/components/kit/BoxHeading";
import { DarkChip } from "@/components/kit/Tag";
import { CardRow } from "@/components/sections/CardRow";
import { FeatureRows } from "@/components/sections/FeatureRows";
import { InfoList } from "@/components/sections/InfoList";
import { PageHero } from "@/components/sections/PageHero";
import { PhotoStatement } from "@/components/sections/PhotoStatement";
import { PlanBlock } from "@/components/sections/PlanBlock";
import { JsonLd } from "@/components/ui/JsonLd";
import { absoluteUrl } from "@/config/site";
import { getJourney, journeys } from "@/content/journeys";
import { images } from "@/content/images";
import { destinationCard, destinationsBySlug, journeyCard, regionNames } from "@/lib/content";
import { organizationId, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return journeys.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const journey = getJourney(slug);
  if (!journey) return {};
  return pageMetadata({
    // Kept short so search results show it in full.
    title: journey.title.includes("Costa Rica") ? `${journey.title} itinerary` : `${journey.title}: Costa Rica itinerary`,
    description: journey.seoDescription,
    path: `/journeys/${journey.slug}`,
    image: images[journey.image],
  });
}

export default async function JourneyPage({ params }: Props) {
  const { slug } = await params;
  const journey = getJourney(slug);
  if (!journey) notFound();

  const regions = destinationsBySlug(journey.destinations);
  const others = journeys.filter((j) => j.slug !== journey.slug);
  const adaptHref = `/plan?journey=${journey.slug}`;
  const stageImages = [journey.image, journey.secondaryImage, ...regions.map((r) => r.image), ...regions.map((r) => r.secondaryImage)];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          name: journey.title,
          description: journey.seoDescription,
          url: absoluteUrl(`/journeys/${journey.slug}`),
          image: absoluteUrl(images[journey.image].src),
          touristType: journey.idealFor,
          provider: { "@id": organizationId },
          itinerary: {
            "@type": "ItemList",
            itemListElement: regions.map((r, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: { "@type": "TouristDestination", name: r.name, url: absoluteUrl(`/destinations/${r.slug}`) },
            })),
          },
        }}
      />
      <PageHero
        image={journey.image}
        kicker={journey.kicker}
        title={journey.title}
        crumbs={[
          { label: "Journeys", href: "/journeys" },
          { label: journey.title, href: `/journeys/${journey.slug}` },
        ]}
        facts={[
          { label: "Regions", value: regionNames(journey).join(", ") },
          { label: "Suggested length", value: journey.suggestedLength },
          { label: "Pace", value: journey.pace },
        ]}
        cta={{ label: "Plan this journey", href: adaptHref }}
      />

      <FeatureRows
        left={
          <>
            <BoxHeading text={`The Shape Of ${journey.title}`} size="l" />
            <ul className="mt-4 flex flex-col items-start gap-1.5">
              {journey.idealFor.map((t) => (
                <li key={t}>
                  <DarkChip>
                    <span aria-hidden>✦</span> Ideal for {t.toLowerCase()}
                  </DarkChip>
                </li>
              ))}
            </ul>
            <div className="mt-10 max-w-md space-y-4 text-lead">
              {journey.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p className="label border-l-2 border-terra pl-3">
                An illustrative route, not a bookable package. Stays, timings and transport are chosen with you and confirmed only in
                your own proposal.
              </p>
            </div>
          </>
        }
        rows={journey.stages.map((s, i) => ({
          title: `${s.place}: ${s.title}`,
          image: stageImages[i % stageImages.length],
          text: `Suggested: ${s.stay}. ${s.body}`,
          cta: regions[i] ? { label: `About ${regions[i].shortName}`, href: `/destinations/${regions[i].slug}` } : undefined,
        }))}
      />

      <PhotoStatement image={journey.secondaryImage} text="Make It Your Own" cta={{ label: "Adapt this journey", href: adaptHref }} />

      <InfoList
        title="Good To Know"
        squiggle={2}
        doodle="palm"
        text={
          <>
            <p>{journey.stays.intro}</p>
            <p className="label mt-4">Typical stays: {journey.stays.styles.join(" · ")}</p>
          </>
        }
        items={[
          { title: "Experiences along the way", text: journey.experiences.join(" · ") + ". Nothing is included by default; we choose with you." },
          ...journey.considerations.map((c, i) => ({ title: ["Getting around", "Before you go", "Timing"][i] ?? "Note", text: c })),
        ]}
      />

      <div className="frame pb-8">
        <BoxButton href={adaptHref} dark>
          Start planning this journey
        </BoxButton>
      </div>

      <CardRow id="regions" title="The Regions On This Route" items={regions.map(destinationCard)} more={{ label: "All regions", href: "/destinations" }} grey />
      <CardRow id="more-journeys" title="More Journeys" items={others.map(journeyCard)} more={{ label: "All journeys", href: "/journeys" }} />
      <PlanBlock />
    </>
  );
}
