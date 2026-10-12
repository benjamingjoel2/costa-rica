import type { Metadata } from "next";
import { ClosingInvitation } from "@/components/sections/ClosingInvitation";
import { PageIntro } from "@/components/sections/PageIntro";
import { PlanningSteps } from "@/components/sections/PlanningSteps";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Plate } from "@/components/ui/Plate";
import { principles } from "@/content/approach";

export const metadata: Metadata = {
  title: "Our approach to planning",
  description:
    "How Selvora plans tailor-made Costa Rica trips: understanding what you want, balancing places and travel time, choosing places to stay and building a realistic itinerary.",
  alternates: { canonical: "/approach" },
};

const proposalContents = [
  "A suggested route with the reasoning behind it",
  "Places to stay, chosen for you, with alternatives where useful",
  "Experiences and guiding matched to your interests",
  "How you'll travel between regions, and how long it takes",
  "Practical notes on seasons, packing and pace",
];

const faqs = [
  {
    q: "Do you sell fixed packages?",
    a: "No. The journeys on this site are examples of how a trip might fit together. Every itinerary we propose is designed for the people travelling.",
  },
  {
    q: "Can I book online?",
    a: "There's no online booking. Planning begins with an inquiry, and nothing is confirmed until you've agreed a proposal and are ready to go ahead.",
  },
  {
    q: "How far ahead should I get in touch?",
    a: "As early as you can, particularly for December to April and holiday periods, when the most sought-after places to stay fill up. Shorter notice is still worth asking about.",
  },
  {
    q: "How much does a trip cost?",
    a: "It depends on the length of the trip, the season, where you stay and how you travel between regions. Sharing a budget range with your inquiry helps us suggest what's realistic, and costs are set out clearly in your proposal.",
  },
  {
    q: "Can you plan for families, or for a special occasion?",
    a: "Tell us who's travelling, including children's ages, and what the trip is for. Pace, places to stay and activities all change with the group.",
  },
];

export default function ApproachPage() {
  return (
    <>
      <PageIntro
        eyebrow="Our approach"
        crumbs={[{ label: "Our approach", href: "/approach" }]}
        title={
          <>
            Planning that starts <em className="italic font-normal">with you.</em>
          </>
        }
        lede="A tailor-made trip isn't a list of famous places. It's a set of choices about where to go, how to move between them and how to spend each day, made with you rather than for you."
      />

      <section className="frame pb-20 md:pb-28">
        <Plate image="hotSprings" ratio="aspect-[21/9]" sizes="100vw" priority />
      </section>

      <section aria-labelledby="principles-title" className="frame pb-24 md:pb-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Eyebrow>Principles</Eyebrow>
            <h2 id="principles-title" className="mt-8 text-display-l text-forest">
              What guides <em className="italic font-normal">every plan.</em>
            </h2>
          </div>
          <ol className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {principles.map((p, i) => (
              <li key={p.title} className="border-t border-charcoal/20 pt-6" data-reveal>
                <span className="font-display text-4xl text-terra-ink">{i + 1}</span>
                <h3 className="mt-4 font-display text-[1.7rem] leading-tight text-forest">{p.title}</h3>
                <p className="mt-3 text-stone">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <PlanningSteps headingId="approach-process-title" />

      <section aria-labelledby="proposal-title" className="frame py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-5">
            <Plate image="coffee" ratio="aspect-[4/5]" sizes="(min-width: 1024px) 38vw, 100vw" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Eyebrow>Your proposal</Eyebrow>
            <h2 id="proposal-title" className="mt-8 text-display-m text-forest">
              What you receive, and what you don&rsquo;t.
            </h2>
            <p className="mt-6 text-stone">
              Your proposal is a considered plan, written for you. We explain why we&rsquo;ve suggested each place, so it&rsquo;s easy to
              see what to change. It typically covers:
            </p>
            <ul className="prose-selvora mt-6">
              {proposalContents.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <p className="mt-8 text-stone">
              What you won&rsquo;t receive is a generic package with your name on it, or pressure to decide before you&rsquo;re ready.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="bg-paper">
        <div className="frame grid gap-12 py-24 md:py-32 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Eyebrow>Questions</Eyebrow>
            <h2 id="faq-title" className="mt-8 text-display-m text-forest">
              Common questions
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            {faqs.map((f) => (
              <details key={f.q} className="group border-t border-charcoal/20 last:border-b">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-[1.5rem] leading-snug text-forest [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden className="relative h-4 w-4 shrink-0">
                    <span className="absolute left-0 top-1/2 h-px w-4 bg-current" />
                    <span className="absolute left-1/2 top-0 h-4 w-px bg-current transition-transform duration-300 group-open:scale-y-0" />
                  </span>
                </summary>
                <p className="pb-6 pr-10 text-stone">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ClosingInvitation
        title={
          <>
            Ready when <em className="italic font-normal">you are.</em>
          </>
        }
        text="Start with a few details about your trip. There's no obligation, and rough ideas are welcome."
        image="trail"
        ctaLabel="Tell us about your trip"
      />
    </>
  );
}
