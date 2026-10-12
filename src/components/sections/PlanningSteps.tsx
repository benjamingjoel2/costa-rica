import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { planningSteps } from "@/content/approach";
import { planHref } from "@/config/site";

type PlanningStepsProps = {
  index?: string;
  headingId?: string;
  showCta?: boolean;
};

/** The four stages of planning, shown as a ruled timeline. */
export function PlanningSteps({ index, headingId = "process-title", showCta = true }: PlanningStepsProps) {
  return (
    <section id="process" aria-labelledby={headingId} className="bg-sage">
      <div className="frame py-24 md:py-32">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow index={index}>How planning works</Eyebrow>
            <h2 id={headingId} className="mt-8 text-display-l text-forest">
              Four steps, <em className="italic font-normal">one conversation.</em>
            </h2>
          </div>
          <p className="text-charcoal/80 lg:col-span-4 lg:col-start-9">
            There is no online checkout and no fixed catalogue. Every Selvora journey begins with an inquiry and is designed from
            there.
          </p>
        </div>

        <ol className="relative mt-16 grid gap-0 md:mt-20 md:grid-cols-4 md:gap-8">
          <span aria-hidden className="absolute left-[1.15rem] top-3 bottom-3 w-px bg-forest/25 md:inset-x-0 md:bottom-auto md:left-0 md:top-[1.4rem] md:h-px md:w-auto" />
          {planningSteps.map((s, i) => (
            <li key={s.title} className="relative grid grid-cols-[2.5rem_1fr] gap-5 pb-10 md:block md:pb-0" data-reveal style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}>
              <span className="relative z-10 flex h-[2.4rem] w-[2.4rem] items-center justify-center rounded-full border border-forest/40 bg-sage font-display text-xl text-forest md:h-[2.8rem] md:w-[2.8rem]">
                {i + 1}
              </span>
              <div className="md:mt-8">
                <h3 className="font-display text-[1.65rem] leading-tight text-forest">{s.title}</h3>
                <p className="mt-3 text-[0.98rem] text-charcoal/80">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>

        {showCta && (
          <div className="mt-16 flex flex-wrap items-center gap-6 border-t border-forest/20 pt-10">
            <ButtonLink href={planHref}>Tell us about your trip</ButtonLink>
            <p className="text-sm text-charcoal/75">It takes about five minutes, and rough ideas are welcome.</p>
          </div>
        )}
      </div>
    </section>
  );
}
