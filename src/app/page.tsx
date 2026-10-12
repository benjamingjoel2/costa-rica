import type { Metadata } from "next";
import { ApproachSection } from "@/components/home/ApproachSection";
import { ExperiencesLedger } from "@/components/home/ExperiencesLedger";
import { ExploreCostaRica } from "@/components/home/ExploreCostaRica";
import { HomeHero } from "@/components/home/HomeHero";
import { Introduction } from "@/components/home/Introduction";
import { JournalSelection } from "@/components/home/JournalSelection";
import { PlaceLine } from "@/components/home/PlaceLine";
import { SignatureJourneys } from "@/components/home/SignatureJourneys";
import { ClosingInvitation } from "@/components/sections/ClosingInvitation";
import { PlanningSteps } from "@/components/sections/PlanningSteps";
import { JsonLd } from "@/components/ui/JsonLd";
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
            { "@type": "Organization", "@id": absoluteUrl("/#organization"), name: site.name, url: absoluteUrl("/"), description: site.description, logo: absoluteUrl("/brand/selvora-monogram.svg") },
            { "@type": "WebSite", "@id": absoluteUrl("/#website"), name: site.name, url: absoluteUrl("/"), publisher: { "@id": absoluteUrl("/#organization") } },
          ],
        }}
      />
      <HomeHero />
      <PlaceLine />
      <Introduction />
      <SignatureJourneys />
      <ExploreCostaRica />
      <ExperiencesLedger />
      <ApproachSection />
      <PlanningSteps index="06" headingId="home-process-title" />
      <JournalSelection />
      <ClosingInvitation
        title={
          <>
            Tell us what you <em className="italic font-normal">have in mind.</em>
          </>
        }
        text="Dates, a list of ideas or a half-formed plan: any of them is a good place to start. We'll take it from there."
        image="nicoya"
        ctaLabel="Start planning"
        secondary={{ label: "Or browse the journeys", href: "/journeys" }}
      />
    </>
  );
}
