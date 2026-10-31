import { BoxButton } from "@/components/kit/BoxButton";
import { BoxHeading } from "@/components/kit/BoxHeading";
import { Card } from "@/components/kit/Card";
import { CarouselControls } from "@/components/kit/Carousel";
import type { ImageKey } from "@/content/images";

import { t } from "@/i18n/server";
type Item = { href: string; image: ImageKey; tags: string[]; title: string; meta: string[]; summary: string };

/** Heading column beside a horizontally scrolling row of cards. */
export function CardRow({ id, title, items, more, grey = false }: { id: string; title: string; items: Item[]; more?: { label: string; href: string }; grey?: boolean }) {
  if (!items.length) return null;
  return (
    <section aria-labelledby={`${id}-title`} className={`py-14 ${grey ? "bg-paper" : ""}`}>
      <div className="frame grid gap-6 md:grid-cols-[22rem_1fr]">
        <div>
          <BoxHeading id={`${id}-title`} text={title} size="m" />
          {more && (
            <BoxButton href={more.href} className="mt-4">
              {t(more.label)}
            </BoxButton>
          )}
          {items.length > 2 && <CarouselControls targetId={`${id}-track`} className="mt-6" />}
        </div>
        <ul id={`${id}-track`} className="scroller -mr-3 flex gap-5 overflow-x-auto pr-3 md:-mr-8 md:pr-8">
          {items.map((it) => (
            <li key={it.href} className="w-[85%] shrink-0 snap-start sm:w-[24rem] lg:w-[28rem]">
              <Card {...it} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
