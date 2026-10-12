import { ArrowLink } from "@/components/ui/ArrowLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { destinations } from "@/content/destinations";
import { DestinationIndex } from "./DestinationIndex";

export function ExploreCostaRica() {
  const items = destinations.map(({ slug, name, shortName, area, tagline, image }) => ({ slug, name, shortName, area, tagline, image }));
  return (
    <section aria-labelledby="explore-title" className="py-24 md:py-32">
      <div className="frame">
        <div className="mb-14 grid gap-8 lg:mb-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <Eyebrow index="03">Explore Costa Rica</Eyebrow>
            <h2 id="explore-title" className="mt-8 text-display-l text-forest">
              Seven sides of <em className="italic font-normal">one small country.</em>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-stone">
              Mountains divide Costa Rica into regions with their own weather, landscapes and character. Knowing how they differ, and
              how they connect, is the beginning of a good route.
            </p>
            <ArrowLink href="/destinations" className="mt-4">
              Destination guides
            </ArrowLink>
          </div>
        </div>
        <DestinationIndex items={items} />
      </div>
    </section>
  );
}
