import { BoxButton } from "@/components/kit/BoxButton";
import { BoxHeading } from "@/components/kit/BoxHeading";
import { DarkChip } from "@/components/kit/Tag";

import { t } from "@/i18n/server";
export default function NotFound() {
  return (
    <section className="frame flex min-h-[85svh] flex-col justify-center pb-16 pt-40">
      <DarkChip>{t("Page not found")}</DarkChip>
      <BoxHeading as="h1" text="This Path Doesn't Lead Anywhere" size="hero-l" className="mt-1.5" />
      <div className="mt-10 flex flex-wrap gap-4">
        <BoxButton href="/journeys">{t("Explore the journeys")}</BoxButton>
        <BoxButton href="/destinations">{t("Destinations")}</BoxButton>
        <BoxButton href="/plan" dark>
          {t("Plan your trip")}
        </BoxButton>
      </div>
    </section>
  );
}
