import { BoxButton } from "@/components/kit/BoxButton";
import { BoxHeading } from "@/components/kit/BoxHeading";
import { Plate } from "@/components/ui/Plate";
import type { ImageKey } from "@/content/images";

import { t } from "@/i18n/server";
/** Full-bleed photograph with a large boxed statement and button at its foot. */
export function PhotoStatement({ image, text, cta }: { image: ImageKey; text: string; cta?: { label: string; href: string } }) {
  return (
    <section className="relative isolate flex min-h-[90vh] flex-col justify-end overflow-hidden">
      <Plate image={image} sizes="100vw" cover className="-z-10" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="frame pb-8">
        <BoxHeading text={text} size="xl" className="max-w-6xl" />
        {cta && <BoxButton href={cta.href} className="mt-2">{t(cta.label)}</BoxButton>}
      </div>
    </section>
  );
}
