import { BoxHeading } from "@/components/kit/BoxHeading";
import { DarkChip } from "@/components/kit/Tag";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

/** Shared layout for policy pages, with a visible notice that the text is a draft awaiting review. */
export function LegalPage({ title, href, children }: { title: string; href: string; children: React.ReactNode }) {
  return (
    <div className="frame grid gap-10 pb-16 pt-40 md:grid-cols-2 md:pt-48">
      <header>
        <Breadcrumbs items={[{ label: title, href }]} className="mb-6" />
        <DarkChip>Legal</DarkChip>
        <BoxHeading as="h1" text={title} size="l" className="mt-1.5" />
      </header>
      <div className="md:border-l md:border-ink md:pl-6">
        <div role="note" className="mb-10 border border-ink bg-paper p-5">
          <p className="label">Draft for review</p>
          <p className="mt-2">
            This page is a working draft. It must be reviewed and completed with the operating company&rsquo;s legal details and
            professional advice before the site is used to take inquiries.
          </p>
        </div>
        <div className="prose-selvora">{children}</div>
      </div>
    </div>
  );
}
