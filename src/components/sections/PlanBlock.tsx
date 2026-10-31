import Link from "@/i18n/Link";
import { BoxButton } from "@/components/kit/BoxButton";
import { BoxHeading } from "@/components/kit/BoxHeading";
import { planHref, site } from "@/config/site";

const rows = [
  { label: "Tailor-made journeys", value: "Start planning", href: planHref },
  { label: "How planning works", value: "Our approach", href: "/approach" },
  { label: "Not sure where to go", value: "Destination guides", href: "/destinations" },
  { label: "Planning advice", value: "Read the journal", href: "/journal" },
];

/** The closing block on most pages, modelled on a contact section with ruled rows. */
export function PlanBlock({ title = "Plan Your Trip" }: { title?: string }) {
  return (
    <section aria-labelledby="plan-title" className="frame grid gap-10 py-16 md:grid-cols-2">
      <div>
        <BoxHeading id="plan-title" text={title} size="m" />
        <BoxButton href={planHref} className="mt-4">
          Reach us
        </BoxButton>
      </div>
      <div className="md:border-l md:border-ink md:pl-6">
        <div className="flex flex-wrap items-start justify-between gap-4 border-t border-ink pt-3">
          <p className="text-[1.9rem] font-medium leading-[1.05] tracking-[-0.05em]">
            Tell us where, when and
            <br /> what you love.
          </p>
          <p className="text-[1.9rem] font-medium leading-[1.05] tracking-[-0.05em]">Costa Rica</p>
        </div>
        <ul className="mt-8">
          {[...rows, ...(site.contactEmail ? [{ label: "Email", value: site.contactEmail, href: `mailto:${site.contactEmail}` }] : [])].map((r) => (
            <li key={r.label} className="flex items-center justify-between gap-4 border-t border-ink py-4">
              <span className="mono text-[0.9rem]">{r.label}</span>
              <Link href={r.href} className="mono text-[0.8rem] text-forest underline underline-offset-2 hover:text-terra-ink">
                {r.value}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
