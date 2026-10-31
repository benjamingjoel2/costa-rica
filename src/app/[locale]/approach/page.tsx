import type { Metadata } from "next";
import { BoxButton } from "@/components/kit/BoxButton";
import { BoxHeading } from "@/components/kit/BoxHeading";
import { Doodle } from "@/components/kit/Doodle";
import { InfoList } from "@/components/sections/InfoList";
import { PageHero } from "@/components/sections/PageHero";
import { PhotoStatement } from "@/components/sections/PhotoStatement";
import { PlanBlock } from "@/components/sections/PlanBlock";
import { planningSteps, principles } from "@/content/approach";
import { pad } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

import { t, setLocale } from "@/i18n/server";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  setLocale((await params).locale);
  return pageMetadata({
    title: "Our approach to planning",
    description: "How Selvora plans tailor-made Costa Rica trips: what you want, balancing places and travel time, choosing where to stay and building a realistic itinerary.",
    path: "/approach",
  });
}

const proposalContents = [
  "A suggested route with the reasoning behind it",
  "Places to stay, chosen for you, with alternatives where useful",
  "Experiences and guiding matched to your interests",
  "How you'll travel between regions, and how long it takes",
  "Practical notes on seasons, packing and pace",
];

const faqs = [
  { q: "Do you sell fixed packages?", a: "No. The journeys on this site are examples of how a trip might fit together. Every itinerary we propose is designed for the people travelling." },
  { q: "Can I book online?", a: "There's no online booking. Planning begins with an inquiry, and nothing is confirmed until you've agreed a proposal and are ready to go ahead." },
  { q: "How far ahead should I get in touch?", a: "As early as you can, particularly for December to April and holiday periods, when the most sought-after places to stay fill up. Shorter notice is still worth asking about." },
  { q: "How much does a trip cost?", a: "It depends on the length of the trip, the season, where you stay and how you travel between regions. Sharing a budget range with your inquiry helps us suggest what's realistic, and costs are set out clearly in your proposal." },
  { q: "Can you plan for families or a special occasion?", a: "Tell us who's travelling, including children's ages, and what the trip is for. Pace, places to stay and activities all change with the group." },
];

export default async function ApproachPage({ params }: { params: Promise<{ locale: string }> }) {
  setLocale((await params).locale);
  return (
    <>
      <PageHero image="hotSprings" kicker="Planning that starts with you" title="Our Approach" short crumbs={[{ label: "Our approach", href: "/approach" }]} />

      <InfoList
        title="What Guides Every Plan"
        squiggle={2}
        doodle="leaf"
        text={
          <p>
            {t("A tailor-made trip isn’t a list of famous places. It’s a set of choices about where to go, how to move between them and how to spend each day, made with you rather than for you.")}
          </p>
        }
        items={principles.map((p) => ({ title: p.title, text: p.text }))}
      />

      <section id="process" aria-labelledby="process-title" className="bg-forest text-white">
        <div className="frame py-12">
          <BoxHeading id="process-title" text="How Planning Works" size="l" squiggle={2} />
          <p className="mono mt-4 max-w-lg text-[0.8rem] text-white/85">{t("There is no online checkout and no fixed catalogue. Every journey begins with an inquiry.")}</p>
          <ol className="mt-12 grid gap-px md:grid-cols-4">
            {planningSteps.map((s, i) => (
              <li key={s.title} className="bg-white p-5 text-ink" data-reveal>
                <p className="mono text-[0.75rem]">{t(pad(i + 1))}</p>
                <h3 className="mt-6 text-[1.7rem] font-medium leading-[1.02] tracking-[-0.05em]">{t(s.title)}</h3>
                <p className="label mt-4 border-t border-ink pt-3">{t(s.text)}</p>
              </li>
            ))}
          </ol>
          <BoxButton href="/plan" className="mt-8">
            {t("Tell us about your trip")}
          </BoxButton>
        </div>
      </section>

      <InfoList
        title="What You Receive"
        doodle="sun"
        text={
          <p>
            {t("Your proposal is a considered plan, written for you. We explain why we’ve suggested each place, so it’s easy to see what to change. What you won’t receive is a generic package with your name on it, or pressure to decide before you’re ready.")}
          </p>
        }
        items={proposalContents.map((c, i) => ({ title: `Included ${pad(i + 1)}`, text: c }))}
      />

      <PhotoStatement image="trail" text="Ready When You Are" cta={{ label: "Start planning", href: "/plan" }} />

      <section aria-labelledby="faq-title" className="bg-paper">
        <div className="frame grid gap-10 py-14 md:grid-cols-2">
          <div>
            <BoxHeading id="faq-title" text="Common Questions" size="m" />
            <Doodle name="toucan" className="mt-10 hidden h-40 w-40 md:block" />
          </div>
          <div className="md:border-l md:border-ink md:pl-5">
            {faqs.map((f) => (
              <details key={f.q} className="group border-t border-ink last:border-b">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-[1.35rem] font-medium tracking-[-0.04em] [&::-webkit-details-marker]:hidden">
                  {t(f.q)}
                  <span aria-hidden className="mono flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink text-lg group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="label pb-5 pr-10">{t(f.a)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <PlanBlock />
    </>
  );
}
