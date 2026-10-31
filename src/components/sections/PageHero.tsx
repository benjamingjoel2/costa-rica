import Link from "@/i18n/Link";
import { BoxHeading } from "@/components/kit/BoxHeading";
import { CircleArrowIcon } from "@/components/kit/BoxButton";
import { DarkChip } from "@/components/kit/Tag";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Plate } from "@/components/ui/Plate";
import type { ImageKey } from "@/content/images";

import { t } from "@/i18n/server";
type PageHeroProps = {
  image: ImageKey;
  kicker: string;
  title: string;
  crumbs: { label: string; href: string }[];
  facts?: { label: string; value: string }[];
  cta?: { label: string; href: string };
  short?: boolean;
};

/** Full-bleed photo hero with a dark kicker chip, boxed title and an optional facts bar. */
export function PageHero({ image, kicker, title, crumbs, facts, cta, short = false }: PageHeroProps) {
  return (
    <header className={`relative isolate flex flex-col justify-end overflow-hidden bg-ink text-white ${short ? "min-h-[78svh]" : "min-h-[100svh]"}`}>
      <Plate image={image} priority sizes="100vw" cover className="-z-10" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/15 to-black/20" />
      <div className="frame pb-8 pt-48">
        <Breadcrumbs items={crumbs} tone="light" className="mb-6 hidden md:block" />
        <DarkChip>{t(kicker)}</DarkChip>
        <BoxHeading as="h1" text={title} size="xl" className="mt-1.5" />
        {(facts || cta) && (
          <div className="mt-6 flex flex-col gap-px md:flex-row">
            {facts?.map((f) => (
              <div key={f.label} className="flex-1 bg-white px-4 py-2.5 text-ink">
                <p className="label text-[0.65rem]">{t(f.label)}</p>
                <p className="mt-1 text-[1.05rem] font-medium tracking-[-0.03em]">{t(f.value)}</p>
              </div>
            ))}
            {cta && (
              <Link href={cta.href} className="group flex items-stretch md:ml-px">
                <span className="mono flex flex-1 items-center justify-center bg-ink px-10 py-4 text-[0.9rem] text-white group-hover:bg-forest">{t(cta.label)}</span>
                <CircleArrowIcon className="h-auto w-14 border-ink bg-ink text-white" />
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
