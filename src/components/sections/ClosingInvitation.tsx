import { ArrowLink } from "@/components/ui/ArrowLink";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Plate } from "@/components/ui/Plate";
import type { ImageKey } from "@/content/images";
import { planHref } from "@/config/site";

type ClosingInvitationProps = {
  title: React.ReactNode;
  text: string;
  image?: ImageKey;
  ctaLabel?: string;
  ctaHref?: string;
  secondary?: { label: string; href: string };
};

/** The full-bleed closing call to action used at the end of most pages. */
export function ClosingInvitation({
  title,
  text,
  image = "nicoya",
  ctaLabel = "Plan your trip",
  ctaHref = planHref,
  secondary,
}: ClosingInvitationProps) {
  return (
    <section aria-labelledby="closing-title" className="relative isolate overflow-hidden bg-forest-deep text-ivory">
      <Plate image={image} sizes="100vw" decorative cover className="-z-10" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-forest-deep/60" />
      <div className="frame flex min-h-[36rem] flex-col justify-center py-24 md:min-h-[42rem]">
        <div className="max-w-3xl" data-reveal>
          <h2 id="closing-title" className="text-display-l text-ivory">
            {title}
          </h2>
          <p className="mt-6 max-w-xl text-lead text-ivory/85">{text}</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink href={ctaHref} variant="ivory">
              {ctaLabel}
            </ButtonLink>
            {secondary && (
              <ArrowLink href={secondary.href} tone="light">
                {secondary.label}
              </ArrowLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
