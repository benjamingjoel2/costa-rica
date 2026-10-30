import { BoxHeading } from "@/components/kit/BoxHeading";
import { DarkChip } from "@/components/kit/Tag";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

/** Shared layout for the policy pages. */
export function LegalPage({ title, href, children }: { title: string; href: string; children: React.ReactNode }) {
  return (
    <div className="frame grid gap-10 pb-16 pt-40 md:grid-cols-2 md:pt-48">
      <header>
        <Breadcrumbs items={[{ label: title, href }]} className="mb-6" />
        <DarkChip>Legal</DarkChip>
        <BoxHeading as="h1" text={title} size="l" className="mt-1.5" />
      </header>
      <div className="md:border-l md:border-ink md:pl-6">
        <div className="prose-selvora">{children}</div>
      </div>
    </div>
  );
}
