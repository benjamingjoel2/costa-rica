import Link from "@/i18n/Link";
import { BoxHeading } from "@/components/kit/BoxHeading";
import { CarouselControls } from "@/components/kit/Carousel";
import { Plate } from "@/components/ui/Plate";
import { journeys } from "@/content/journeys";
import { pad, regionNames } from "@/lib/content";

import { t } from "@/i18n/server";
export function HomeHero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink text-white">
      <Plate image="heroCanopy" priority sizes="100vw" cover className="-z-10" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />

      <div className="frame pb-6 pt-48">
        <BoxHeading as="h1" id="hero-title" text="Meet Costa Rica" size="xl" />
        <p className="mono mt-4 max-w-md text-[0.8rem] text-white/90">{t("Tailor-made journeys through rainforest, cloud forest, volcanoes and two coastlines.")}</p>
      </div>

      <div className="frame pb-5">
        <div className="flex items-center gap-6">
          <ul id="hero-strip" className="scroller flex flex-1 gap-5 overflow-x-auto">
            {journeys.map((j, i) => (
              <li key={j.slug} className="w-[15.5rem] shrink-0 snap-start border-t border-white/40 pt-3">
                <Link href={`/journeys/${j.slug}`} className="group grid grid-cols-[6rem_1fr] gap-3">
                  <Plate image={j.image} ratio="aspect-[3/2]" sizes="6rem" imgClassName="transition-transform group-hover:scale-105" />
                  <span className="mono text-[0.72rem] leading-snug">
                    <span className="block">{t(pad(i + 1))}</span>
                    <span className="mt-3 block group-hover:underline">{t(j.title)}</span>
                    <span className="block text-white/60">{t(regionNames(j).join(", "))}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <CarouselControls targetId="hero-strip" className="hidden md:flex" />
        </div>
      </div>
    </section>
  );
}
