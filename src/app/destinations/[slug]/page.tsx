import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BoxHeading } from "@/components/kit/BoxHeading";
import { DarkChip } from "@/components/kit/Tag";
import { CardRow } from "@/components/sections/CardRow";
import { FeatureRows } from "@/components/sections/FeatureRows";
import { InfoList } from "@/components/sections/InfoList";
import { PageHero } from "@/components/sections/PageHero";
import { PhotoStatement } from "@/components/sections/PhotoStatement";
import { PlanBlock } from "@/components/sections/PlanBlock";
import { destinations, getDestination } from "@/content/destinations";
import { images, type ImageKey } from "@/content/images";
import { journeysForDestination } from "@/content/journeys";
import { destinationCard, destinationsBySlug, journeyCard } from "@/lib/content";

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

  const pairs = destinationsBySlug(d.pairsWith);
  const routes = journeysForDestination(d.slug);
  const rowImages: ImageKey[] = [d.secondaryImage, ...pairs.map((p) => p.image), d.image];
  const planHref = `/plan?destination=${d.slug}`;

  return (
    <>
      <PageHero
        image={d.image}
        kicker={d.area}
        title={d.name}
        crumbs={[
          { label: "Destinations", href: "/destinations" },
          { label: d.shortName, href: `/destinations/${d.slug}` },
        ]}
        facts={[
          { label: "Region", value: d.area },
          { label: "Landscapes", value: d.landscapes.slice(0, 2).join(", ") },
          { label: "Pairs well with", value: pairs.map((p) => p.shortName).join(", ") },
        ]}
        cta={{ label: "Include in my trip", href: planHref }}
      />

      <FeatureRows
        left={
          <>
            <BoxHeading text={`Welcome To ${d.shortName}`} size="l" />
            <ul className="mt-4 flex flex-col items-start gap-1.5">
              {d.landscapes.map((l) => (
                <li key={l}>
                  <DarkChip>
                    <span aria-hidden>✦</span> {l}
                  </DarkChip>
                </li>
              ))}
            </ul>
            <p className="mt-10 max-w-md text-lead">{d.lede}</p>
          </>
        }
        rows={d.chapters.map((c, i) => ({
          title: c.heading,
          image: rowImages[i % rowImages.length],
          text: c.body.join(" "),
          cta: i === d.chapters.length - 1 ? { label: "Plan a visit", href: planHref } : undefined,
        }))}
      />

      <PhotoStatement image={d.secondaryImage} text={`Discover ${d.shortName} Your Way`} cta={{ label: "Start planning", href: planHref }} />

      <InfoList
        title="Is It Right For You?"
        squiggle={3}
        doodle={d.slug === "caribbean" || d.slug === "nicoya" ? "palm" : d.slug === "osa" || d.slug === "manuel-antonio" ? "binoculars" : "volcano"}
        text={<p>{d.tagline} {d.summary}</p>}
        items={[
          { title: "Who it suits", text: d.suits },
          { title: "Fitting it in", text: d.fit },
          { title: "Weather + seasons", text: d.season },
          { title: "Things to do", text: d.experiences.join(" · ") + ". Availability varies by season and conditions." },
        ]}
      />

      <CardRow id="routes" title="Journeys Through Here" items={routes.map(journeyCard)} more={{ label: "All journeys", href: "/journeys" }} grey />
      <CardRow id="nearby" title="Nearby And Often Combined" items={pairs.map(destinationCard)} more={{ label: "All regions", href: "/destinations" }} />
      <PlanBlock />
    </>
  );
}
