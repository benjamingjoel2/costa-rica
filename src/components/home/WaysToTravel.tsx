import { BoxButton } from "@/components/kit/BoxButton";
import { BoxHeading } from "@/components/kit/BoxHeading";
import { Card } from "@/components/kit/Card";
import { CarouselControls } from "@/components/kit/Carousel";
import { experiences } from "@/content/experiences";
import { destinationsBySlug } from "@/lib/content";

export function WaysToTravel() {
  return (
    <section aria-labelledby="ways-title" className="py-10">
      <div className="frame grid gap-6 md:grid-cols-[22rem_1fr]">
        <div>
          <BoxHeading id="ways-title" text="Ways To Travel" size="m" />
          <BoxButton href="/experiences" className="mt-4">
            View all
          </BoxButton>
          <CarouselControls targetId="ways-track" className="mt-6" />
        </div>
        <ul id="ways-track" className="scroller -mr-3 flex gap-5 overflow-x-auto pr-3 md:-mr-8 md:pr-8">
          {experiences.map((e) => (
            <li key={e.slug} className="w-[85%] shrink-0 snap-start sm:w-[24rem] lg:w-[28rem]">
              <Card
                href={`/experiences#${e.slug}`}
                image={e.image}
                tags={["Experience", ...destinationsBySlug(e.destinations).slice(0, 1).map((d) => d.shortName)]}
                title={e.title}
                meta={destinationsBySlug(e.destinations).map((d) => d.shortName)}
                summary={e.summary}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
