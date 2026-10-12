import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Eyebrow } from "@/components/ui/Eyebrow";

type LegalPageProps = {
  title: string;
  href: string;
  children: React.ReactNode;
};

/** Shared layout for policy pages, with a visible notice that the text is a draft awaiting review. */
export function LegalPage({ title, href, children }: LegalPageProps) {
  return (
    <div className="frame pb-24 pt-32 md:pb-32 md:pt-40">
      <Breadcrumbs items={[{ label: title, href }]} className="mb-12" />
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <header className="lg:col-span-4">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mt-8 text-display-l text-forest">{title}</h1>
        </header>
        <div className="lg:col-span-7 lg:col-start-6">
          <div role="note" className="mb-12 border-l-2 border-terra bg-paper px-6 py-5 text-[0.95rem]">
            <p className="label text-terra-ink">Draft for review</p>
            <p className="mt-2">
              This page is a working draft. It must be reviewed and completed with the operating company&rsquo;s legal details and
              professional advice before the site is used to take inquiries.
            </p>
          </div>
          <div className="prose-selvora">{children}</div>
        </div>
      </div>
    </div>
  );
}
