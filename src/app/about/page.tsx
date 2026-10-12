import type { Metadata } from "next";
import { BoxHeading } from "@/components/kit/BoxHeading";
import { FeatureRows } from "@/components/sections/FeatureRows";
import { InfoList } from "@/components/sections/InfoList";
import { PageHero } from "@/components/sections/PageHero";
import { PhotoStatement } from "@/components/sections/PhotoStatement";
import { PlanBlock } from "@/components/sections/PlanBlock";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "About Selvora",
  description:
    "Selvora is a tailor-made travel company focused on Costa Rica: personal planning for travellers who care about where they go, how they get there and how the days unfold.",
  alternates: { canonical: "/about" },
};

// Founder and team details are intentionally omitted until real biographies
// are supplied. See docs/CONTENT.md for where to add them.

export default function AboutPage() {
  return (
    <>
      <PageHero image="macaws" kicker="One country, planned with care" title="About Selvora" short crumbs={[{ label: "About", href: "/about" }]} />
      <FeatureRows
        left={
          <>
            <BoxHeading text="A Small Country That Keeps On Unfolding" size="l" squiggle={4} />
            <div className="mt-10 max-w-md space-y-4 text-lead">
              <p>
                {site.name} plans tailor-made journeys through Costa Rica, and only Costa Rica. Focusing on one country lets us go deeper
                into its regions, seasons and places to stay.
              </p>
              <p>
                Within a few hours you can move from the cool mist of the cloud forest to dry tropical forest, from volcanic highlands to
                Pacific surf, from Afro-Caribbean kitchens to remote rainforest reached only by boat. That variety is what makes Costa
                Rica so rewarding, and what makes it easy to get wrong.
              </p>
            </div>
          </>
        }
        rows={[
          { title: "Specific, Not Generic", image: "monteverde", text: "Costa Rica is too varied to plan from a template. The right trip in March is different from the right trip in October; the right trip for a birder is different from the right trip for a family of surfers." },
          { title: "Depth Over Distance", image: "lodge", text: "We would rather you know three places well than glimpse seven. Fewer moves, longer stays and better days." },
          { title: "Honest About The Country", image: "waterfall", text: "Roads take time, rain falls, wildlife keeps its own schedule. Good planning works with all of that instead of pretending otherwise." },
          { title: "Light On The Land", image: "fronds", text: "Costa Rica's forests and coasts are the reason to come. We favour places to stay and experiences that treat them with care." },
        ]}
      />
      <PhotoStatement image="caribbean" text="Let's Plan Something Good" cta={{ label: "Tell us about your trip", href: "/plan" }} />
      <InfoList
        title="Who We Plan For"
        doodle="palm"
        text={<p>Travellers who care about the details, and who&rsquo;d rather have a trip that has been thought through.</p>}
        items={[
          { title: "First-time visitors", text: "A balanced route through the country's classic landscapes, without spending the holiday in a car." },
          { title: "Return travellers", text: "The wilder south, the Caribbean, or a slower stay somewhere you only glimpsed last time." },
          { title: "Families + groups", text: "Pace, places to stay and activities shaped around everyone travelling, children included." },
          { title: "Naturalists", text: "Days built around habitats, seasons and the hours when wildlife is most active." },
        ]}
      />
      <PlanBlock />
    </>
  );
}
