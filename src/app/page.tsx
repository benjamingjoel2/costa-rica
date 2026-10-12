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

export const metadata: Metadata = {
  title: { absolute: `${site.name} | Tailor-made Costa Rica journeys` },
  description:
    "Private, tailor-made Costa Rica trips planned around you: rainforest and cloud forest, volcanoes, wildlife, the Pacific and Caribbean coasts, and exceptional places to stay.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Organization", "@id": absoluteUrl("/#organization"), name: site.name, url: absoluteUrl("/"), description: site.description },
            { "@type": "WebSite", "@id": absoluteUrl("/#website"), name: site.name, url: absoluteUrl("/"), publisher: { "@id": absoluteUrl("/#organization") } },
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
