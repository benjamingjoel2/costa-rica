import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { destinations } from "@/content/destinations";
import { mainNav, planHref, site } from "@/config/site";

const COPYRIGHT_YEAR = 2026;

export function SiteFooter() {
  return (
    <footer className="bg-forest-deep text-ivory">
      <div className="frame pb-10 pt-20 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" aria-label={`${site.name}, home`} className="inline-block">
              <Wordmark decorative className="h-12 w-auto text-ivory md:h-16" />
            </Link>
            <p className="mt-8 max-w-sm text-ivory/75">
              {site.descriptor}. Personal planning for rainforest and cloud forest, volcanoes, wildlife and two very different coastlines.
            </p>
            <Link
              href={planHref}
              className="mt-8 inline-flex min-h-11 items-center border-b border-terra pb-1 font-display text-2xl text-ivory transition-colors hover:text-sage"
            >
              Start planning your trip
            </Link>
            {site.contactEmail && (
              <p className="mt-6 text-sm text-ivory/75">
                Or write to us at{" "}
                <a href={`mailto:${site.contactEmail}`} className="underline decoration-terra underline-offset-4 hover:text-ivory">
                  {site.contactEmail}
                </a>
              </p>
            )}
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            <FooterColumn
              title="Explore"
              links={[...mainNav.map((n) => ({ label: n.label, href: n.href })), { label: "About Selvora", href: "/about" }]}
            />
            <FooterColumn title="Destinations" links={destinations.map((d) => ({ label: d.shortName, href: `/destinations/${d.slug}` }))} />
            <FooterColumn
              title="Plan"
              links={[
                { label: "Plan your trip", href: planHref },
                { label: "How planning works", href: "/approach#process" },
                ...site.social.map((s) => ({ label: s.label, href: s.href })),
              ]}
            />
          </nav>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-ivory/15 pt-6 text-sm text-ivory/60 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {COPYRIGHT_YEAR} {site.name}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy" className="hover:text-ivory">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-ivory">
                Terms and conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="label font-sans text-ivory/50">{title}</h2>
      <ul className="mt-5 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[0.95rem] text-ivory/85 transition-colors hover:text-ivory">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
