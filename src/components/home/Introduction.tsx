import { ArrowLink } from "@/components/ui/ArrowLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Plate } from "@/components/ui/Plate";

export function Introduction() {
  return (
    <section aria-labelledby="intro-title" className="frame py-24 md:py-32 lg:py-40">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7 lg:pr-10" data-reveal>
          <Eyebrow index="01">Selvora</Eyebrow>
          <h2 id="intro-title" className="mt-8 text-display-m text-forest">
            Small on the map, generous in every other way. We plan journeys through Costa Rica one traveller at a time.
          </h2>
          <div className="mt-10 grid gap-6 text-stone md:grid-cols-2 md:gap-10">
            <p>
              In a single trip you can walk through cloud forest in the morning chill, watch scarlet macaws over a Pacific beach and
              eat rice and beans cooked in coconut on the Caribbean. The difficulty is choosing, and deciding how to fit it together.
            </p>
            <p>
              That&rsquo;s the work we do. We start with what you want from the trip, then shape a route, a pace and places to stay
              around it, so the days feel full without feeling rushed.
            </p>
          </div>
          <ArrowLink href="/approach" className="mt-10">
            How we plan a journey
          </ArrowLink>
        </div>
        <div className="relative lg:col-span-5">
          <Plate image="fronds" ratio="aspect-[4/5]" sizes="(min-width: 1024px) 38vw, 90vw" className="ml-auto w-[82%] lg:w-full" />
          <div className="absolute -bottom-10 left-0 w-[52%] border-8 border-ivory md:-bottom-14 lg:-left-16" data-reveal>
            <Plate image="bridge" ratio="aspect-[4/3]" sizes="(min-width: 1024px) 20vw, 45vw" />
          </div>
        </div>
      </div>
    </section>
  );
}
