import type { Metadata } from "next";
import { ClosingInvitation } from "@/components/sections/ClosingInvitation";
import { PageIntro } from "@/components/sections/PageIntro";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Plate } from "@/components/ui/Plate";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "About Selvora",
  description:
    "Selvora is a tailor-made travel company focused on Costa Rica: personal planning for travellers who care about where they go, how they get there and how the days unfold.",
  alternates: { canonical: "/about" },
};

// Founder and team details are intentionally omitted until real biographies
// are supplied. See docs/CONTENT.md for where to add them.

const beliefs = [
  {
    title: "Specific, not generic",
    text: "Costa Rica is too varied to plan from a template. The right trip in March is different from the right trip in October; the right trip for a birder is different from the right trip for a family of surfers.",
  },
  {
    title: "Depth over distance",
    text: "We would rather you know three places well than glimpse seven. Fewer moves, longer stays and better days.",
  },
  {
    title: "Honest about the country",
    text: "Roads take time, rain falls, wildlife keeps its own schedule. Good planning works with all of that instead of pretending otherwise.",
  },
  {
    title: "Light on the land",
    text: "Costa Rica's forests and coasts are the reason to come. We favour places to stay and experiences that treat them with care.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow={`About ${site.name}`}
        crumbs={[{ label: "About", href: "/about" }]}
        title={
          <>
            One country, <em className="italic font-normal">planned with care.</em>
          </>
        }
        lede={`${site.name} plans tailor-made journeys through Costa Rica, and only Costa Rica. Focusing on one country lets us go deeper into its regions, seasons and places to stay.`}
      />

      <section className="frame pb-24 md:pb-32">
        <div className="grid gap-6 md:grid-cols-12">
          <Plate image="osa" ratio="aspect-[4/3]" sizes="(min-width: 768px) 58vw, 100vw" className="md:col-span-7" priority />
          <Plate image="waterfall" ratio="aspect-[3/4]" sizes="(min-width: 768px) 38vw, 100vw" className="md:col-span-4 md:col-start-9 md:mt-24" />
        </div>
      </section>

      <section aria-labelledby="why-title" className="frame pb-24 md:pb-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Eyebrow>Why Costa Rica</Eyebrow>
            <h2 id="why-title" className="mt-8 text-display-l text-forest">
              A small country that <em className="italic font-normal">keeps on unfolding.</em>
            </h2>
          </div>
          <div className="space-y-6 text-lead text-charcoal/85 lg:col-span-6 lg:col-start-7 lg:pt-4">
            <p>
              Within a few hours you can move from the cool mist of the cloud forest to dry tropical forest, from volcanic highlands to
              Pacific surf, from Afro-Caribbean kitchens to remote rainforest reached only by boat.
            </p>
            <p>
              That variety is what makes Costa Rica so rewarding, and what makes it easy to get wrong. Too many stops, the wrong coast for
              the season, a long drive where a short flight would do: small decisions shape the whole trip.
            </p>
            <p>
              {site.name} exists to make those decisions well, with you, so that the country can do what it does best.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="beliefs-title" className="bg-forest text-ivory">
        <div className="frame py-24 md:py-32">
          <Eyebrow tone="light">What we believe</Eyebrow>
          <h2 id="beliefs-title" className="mt-8 max-w-3xl text-display-l text-ivory">
            The kind of travel <em className="italic font-normal">we want to plan.</em>
          </h2>
          <ul className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {beliefs.map((b) => (
              <li key={b.title} className="border-t border-ivory/20 pt-6" data-reveal>
                <h3 className="font-display text-[1.9rem] leading-tight">{b.title}</h3>
                <p className="mt-3 max-w-lg text-ivory/80">{b.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="who-title" className="frame py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Eyebrow>Who we plan for</Eyebrow>
            <h2 id="who-title" className="mt-8 text-display-m text-forest">
              Travellers who care about the details.
            </h2>
          </div>
          <div className="space-y-5 text-stone lg:col-span-6 lg:col-start-7">
            <p>
              Couples and families, first-time visitors and people returning for a second or third time, keen naturalists and those who
              simply want somewhere beautiful to slow down. What they share is a preference for a trip that has been thought through.
            </p>
            <p>
              If you&rsquo;d like to see how that works in practice, our approach page explains the planning process step by step.
            </p>
            <ArrowLink href="/approach">How planning works</ArrowLink>
          </div>
        </div>
      </section>

      <ClosingInvitation
        title={
          <>
            Let&rsquo;s plan <em className="italic font-normal">something good.</em>
          </>
        }
        text="Tell us about the trip you have in mind, and we'll come back to you with ideas."
        image="heroCanopy"
      />
    </>
  );
}
