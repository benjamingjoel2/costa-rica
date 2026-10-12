import { Plate } from "@/components/ui/Plate";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { planHref, site } from "@/config/site";

export function HomeHero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-forest-deep text-ivory">
      <Plate image="heroCanopy" priority sizes="100vw" cover className="-z-10" imgClassName="scale-[1.02]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep/90 via-forest-deep/35 to-forest-deep/10" />
      <div aria-hidden className="absolute inset-y-0 left-0 -z-10 w-2/3 bg-gradient-to-r from-forest-deep/45 to-transparent" />

      <div className="frame pb-14 pt-36 md:pb-20 lg:pb-24">
        <p className="label text-ivory/85">{site.descriptor}</p>
        <h1 id="hero-title" className="mt-6 max-w-[14ch] text-display-xl text-ivory">
          Costa Rica, <em className="font-normal italic">on your own terms.</em>
        </h1>
        <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-12 md:items-end">
          <p className="max-w-xl text-lead text-ivory/90 md:col-span-7 lg:col-span-6">
            Journeys through rainforest, cloud forest and two very different coastlines, planned around the way you like to travel.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 md:col-span-5 md:justify-end lg:col-span-6">
            <ButtonLink href={planHref} variant="ivory">
              Plan your trip
            </ButtonLink>
            <ArrowLink href="/journeys" tone="light">
              Explore the journeys
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
