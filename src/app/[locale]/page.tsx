import { setLocale } from "@/i18n/server";
import type { Metadata } from "next";
import { DiscoverJourneys } from "@/components/home/DiscoverJourneys";
import { ExploreRegions } from "@/components/home/ExploreRegions";
import { HomeHero } from "@/components/home/HomeHero";
import { LatestJournal } from "@/components/home/LatestJournal";
import { WaysToTravel } from "@/components/home/WaysToTravel";
import { WildSide } from "@/components/home/WildSide";
import { PlanBlock } from "@/components/sections/PlanBlock";
import { JsonLd } from "@/components/ui/JsonLd";
import { Plate } from "@/components/ui/Plate";
import { absoluteUrl, site } from "@/config/site";
import { organizationId, pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  setLocale((await params).locale);
  return pageMetadata({
    title: `${site.name} | Tailor-made Costa Rica journeys`,
    absoluteTitle: true,
    description: "Private, tailor-made Costa Rica trips planned around you: rainforest, cloud forest, volcanoes, wildlife and both coasts, with exceptional places to stay.",
    path: "/",
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  setLocale((await params).locale);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "TravelAgency",
              "@id": organizationId,
              name: site.name,
              url: absoluteUrl("/"),
              description: site.description,
              image: absoluteUrl(site.ogImage),
              logo: absoluteUrl("/icon.svg"),
              areaServed: { "@type": "Country", name: "Costa Rica" },
              address: { "@type": "PostalAddress", addressLocality: site.address.locality, addressCountry: site.address.countryCode },
              ...(site.contactEmail && { email: site.contactEmail }),
            },
            { "@type": "WebSite", "@id": absoluteUrl("/#website"), name: site.name, url: absoluteUrl("/"), inLanguage: "en", publisher: { "@id": organizationId } },
          ],
        }}
      />
      <HomeHero />
      <div className="relative h-[70vh] min-h-[28rem] md:h-[94vh]">
        <Plate image="monteverde" sizes="100vw" cover />
      </div>
      <ExploreRegions />
      <DiscoverJourneys />
      <WildSide />
      <WaysToTravel />
      <LatestJournal />
      <PlanBlock />
    </>
  );
}
