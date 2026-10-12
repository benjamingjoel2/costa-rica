import { ArrowLink } from "@/components/ui/ArrowLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Plate } from "@/components/ui/Plate";
import { principles } from "@/content/approach";

export function ApproachSection() {
  return (
    <section aria-labelledby="approach-title" className="frame py-24 md:py-32 lg:py-40">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Eyebrow index="05">The Selvora approach</Eyebrow>
          <h2 id="approach-title" className="mt-8 text-display-l text-forest">
            A good itinerary is mostly about <em className="italic font-normal">what you leave out.</em>
          </h2>
          <Plate image="lodge" ratio="aspect-[3/2]" sizes="(min-width: 1024px) 38vw, 100vw" className="mt-12" />
        </div>
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-24">
          <p className="text-lead text-charcoal">
            Costa Rica rewards people who travel with intention. We help you choose the places that matter to you, connect them
            sensibly and leave enough space for the trip to breathe.
          </p>
          <ol className="mt-12 space-y-0">
            {principles.map((p, i) => (
              <li key={p.title} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-charcoal/15 py-6" data-reveal>
                <span className="font-display text-2xl text-terra-ink">{i + 1}</span>
                <div>
                  <h3 className="font-display text-[1.6rem] leading-tight text-forest">{p.title}</h3>
                  <p className="mt-2 text-stone">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <ArrowLink href="/approach" className="mt-6">
            Read about our approach
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
