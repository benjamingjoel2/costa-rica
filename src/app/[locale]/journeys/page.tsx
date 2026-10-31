import type { Metadata } from "next";
import { BoxHeading } from "@/components/kit/BoxHeading";
import { FeatureRows } from "@/components/sections/FeatureRows";
import { PageHero } from "@/components/sections/PageHero";
import { PhotoStatement } from "@/components/sections/PhotoStatement";
import { PlanBlock } from "@/components/sections/PlanBlock";
import { journeys } from "@/content/journeys";
import { regionNames } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

import { t, setLocale } from "@/i18n/server";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  setLocale((await params).locale);
  return pageMetadata({
    title: "Tailor-made Costa Rica journeys",
    description: "Sample Costa Rica itineraries to start from: rainforest and Pacific, volcanoes and cloud forest, Osa, Nicoya and a wildlife route, each adapted to you.",
    path: "/journeys",
  });
}

export default async function JourneysPage({ params }: { params: Promise<{ locale: string }> }) {
  setLocale((await params).locale);
  return (
    <>
      <PageHero
        image="osa"
        kicker="Five routes, none of them fixed"
        title="Our Journeys"
        short
        crumbs={[{ label: "Journeys", href: "/journeys" }]}
      />
      <FeatureRows
        left={
          <>
            <BoxHeading text="Routes To Begin A Conversation" size="l" squiggle={3} />
            <p className="mt-10 max-w-md text-lead">
              {t("These journeys show how Costa Rica can fit together. None of them is a package: each is a starting point that we reshape around your dates, your interests and the pace you enjoy.")}
            </p>
          </>
        }
        rows={journeys.map((j) => ({
          title: j.title,
          image: j.image,
          text: `${j.suggestedLength} · ${regionNames(j).join(", ")} · ${j.pace} pace. ${j.summary}`,
          cta: { label: "See the route", href: `/journeys/${j.slug}` },
        }))}
      />
      <PhotoStatement image="coffee" text="None Of These Quite Right?" cta={{ label: "Tell us what you have in mind", href: "/plan" }} />
      <PlanBlock />
    </>
  );
}
