import type { Metadata } from "next";
import { BoxHeading } from "@/components/kit/BoxHeading";
import { FeatureRows } from "@/components/sections/FeatureRows";
import { PageHero } from "@/components/sections/PageHero";
import { PhotoStatement } from "@/components/sections/PhotoStatement";
import { PlanBlock } from "@/components/sections/PlanBlock";
import { destinations } from "@/content/destinations";
import { pageMetadata } from "@/lib/seo";

import { t, setLocale } from "@/i18n/server";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  setLocale((await params).locale);
  return pageMetadata({
    title: "Costa Rica destination guides",
    description: "Arenal, Monteverde, Guanacaste, Nicoya, the Central Pacific, Osa and the Caribbean coast: how Costa Rica's regions differ and how they fit together.",
    path: "/destinations",
  });
}

export default async function DestinationsPage({ params }: { params: Promise<{ locale: string }> }) {
  setLocale((await params).locale);
  return (
    <>
      <PageHero image="arenal" kicker="Seven regions, one small country" title="Our Destinations" short crumbs={[{ label: "Destinations", href: "/destinations" }]} />
      <FeatureRows
        left={
          <>
            <BoxHeading text="Where To Go And Why" size="l" squiggle={2} />
            <p className="mt-10 max-w-md text-lead">
              {t("Costa Rica’s mountains split it into regions with their own weather, wildlife and way of life. These guides explain what each is like, who it suits and how it fits into a wider journey.")}
            </p>
          </>
        }
        rows={destinations.map((d) => ({
          title: d.name,
          image: d.image,
          text: `${d.area}. ${d.tagline} ${d.summary}`,
          cta: { label: "Explore", href: `/destinations/${d.slug}` },
        }))}
      />
      <PhotoStatement image="river" text="Not Sure Which Regions Suit You?" cta={{ label: "Find your route", href: "/plan" }} />
      <PlanBlock />
    </>
  );
}
