import { BoxButton } from "@/components/kit/BoxButton";
import { BoxHeading } from "@/components/kit/BoxHeading";
import { Plate } from "@/components/ui/Plate";
import type { ImageKey } from "@/content/images";

import { t } from "@/i18n/server";
export type FeatureRow = { title: string; image: ImageKey; text: string; cta?: { label: string; href: string } };

/** Two columns split by a vertical rule: an introduction on the left, ruled feature rows on the right. */
export function FeatureRows({ left, rows, id }: { left: React.ReactNode; rows: FeatureRow[]; id?: string }) {
  return (
    <section id={id} className="frame grid gap-10 py-8 md:grid-cols-2">
      <div>{left}</div>
      <ul className="md:border-l md:border-ink md:pl-5">
        {rows.map((r, i) => (
          <li key={r.title} className={`grid gap-5 py-6 sm:grid-cols-2 ${i > 0 ? "border-t border-ink" : "pt-0"}`} data-reveal>
            <div className="flex flex-col justify-between gap-6">
              <BoxHeading as="h3" text={r.title} size="s" />
              {r.cta && <BoxButton href={r.cta.href}>{t(r.cta.label)}</BoxButton>}
            </div>
            <div>
              <Plate image={r.image} ratio="aspect-[8/5]" sizes="(min-width: 768px) 24vw, 100vw" />
              <p className="label mt-4">{t(r.text)}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
