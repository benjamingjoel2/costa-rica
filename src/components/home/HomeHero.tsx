import Link from "@/i18n/Link";
import { CarouselControls } from "@/components/kit/Carousel";
import { Plate } from "@/components/ui/Plate";
import { destinations } from "@/content/destinations";
import { pad } from "@/lib/content";

import { t } from "@/i18n/server";

/** H6 region carousel: the headline on forest green, then a scrollable row of region cards. */
export function HomeHero() {
  return (
    <section aria-labelledby="hero-title" className="bg-forest pb-10 pt-28 text-white md:pb-14 md:pt-36">
      <div className="frame">
        <h1 id="hero-title" className="max-w-[14ch] text-[clamp(2.6rem,1.4rem+4.4vw,5.75rem)] font-medium leading-[1.02] tracking-[-0.045em]">
          {t("Meet Costa Rica")}
        </h1>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
          <p className="max-w-md text-lead text-white/85">{t("Tailor-made journeys through rainforest, cloud forest, volcanoes and two coastlines.")}</p>
          <CarouselControls targetId="hero-regions" className="hidden md:flex" />
        </div>
      </div>

      <ul id="hero-regions" aria-label={t("Regions")} className="scroller frame mt-8 flex scroll-px-3 gap-4 overflow-x-auto md:mt-10 md:scroll-px-8 md:gap-5">
        {destinations.map((d, i) => (
          <li key={d.slug} className="w-[72vw] shrink-0 snap-start sm:w-[19rem] lg:w-[21rem]">
            <Link href={`/destinations/${d.slug}`} className="group block">
              <Plate image={d.image} ratio="aspect-[4/5]" priority={i === 0} sizes="(min-width: 1024px) 21rem, (min-width: 640px) 19rem, 72vw" imgClassName="transition-transform duration-700 group-hover:scale-[1.03]" />
              <span className="mt-3 flex items-baseline justify-between gap-3 border-t border-white/30 pt-3">
                <span className="text-[1.3rem] font-medium leading-tight tracking-[-0.03em] group-hover:underline">{t(d.shortName)}</span>
                <span className="mono shrink-0 text-[0.7rem] text-white/70">{t(pad(i + 1))}</span>
              </span>
              <span className="label mt-1 block text-white/70">{t(d.area)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
