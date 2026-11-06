import Link from "@/i18n/Link";
import { Logo } from "@/components/kit/Logo";
import { destinations } from "@/content/destinations";
import { planHref, site } from "@/config/site";

import { t } from "@/i18n/server";
const COPYRIGHT_YEAR = 2026;

// Regions grouped the way travellers usually think about the country.
const groups = [
  { label: "The north + mountains", slugs: ["arenal", "monteverde", "guanacaste"] },
  { label: "The Pacific coast", slugs: ["nicoya", "manuel-antonio", "osa"] },
  { label: "The Caribbean", slugs: ["caribbean"] },
];

const siteLinks = [
  { label: "Journeys", href: "/journeys" },
  { label: "Destinations", href: "/destinations" },
  { label: "Experiences", href: "/experiences" },
  { label: "Our approach", href: "/approach" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
  { label: "Plan your trip", href: planHref },
];

const legal = [
  { label: "Booking terms", href: "/terms" },
  { label: "Privacy policy", href: "/privacy" },
  { label: "Cookie policy", href: "/cookies" },
];

/** Compact footer: brand, one line, email and address once, link columns, one thin base line. */
export function SiteFooter() {
  return (
    <footer className="bg-night pt-14 text-white">
      <div className="frame grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
        <div className="col-span-2 max-w-sm lg:col-span-1">
          <Link href="/" aria-label={`${site.name}, home`} className="inline-flex text-[1.5rem]">
            <Logo className="items-start" />
          </Link>
          <p className="mt-4 text-[0.95rem] text-white/70">{t(site.descriptor)}</p>
          {site.contactEmail && (
            <p className="mt-3 text-[0.9rem]">
              <a href={`mailto:${site.contactEmail}`} className="underline underline-offset-2 hover:text-sage">
                {t(site.contactEmail)}
              </a>
            </p>
          )}
          <p className="mt-2 text-[0.85rem] text-white/60">{site.address.line}</p>
        </div>

        {groups.map((g) => (
          <nav key={g.label} aria-label={t(g.label)}>
            <p className="mono mb-3 text-[0.72rem] text-sage">{t(g.label)}</p>
            <ul className="space-y-2">
              {destinations
                .filter((d) => g.slugs.includes(d.slug))
                .map((d) => (
                  <li key={d.slug}>
                    <Link href={`/destinations/${d.slug}`} className="text-[0.95rem] hover:text-sage">
                      {t(d.shortName)}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        ))}

        <nav aria-label={t("Footer")}>
          <p className="mono mb-3 text-[0.72rem] text-sage">{t(site.name)}</p>
          <ul className="space-y-2">
            {siteLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-[0.95rem] hover:text-sage">
                  {t(l.label)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="frame mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-white/20 py-5 text-[0.72rem] text-white/60">
        <p className="mono">
          © {COPYRIGHT_YEAR} {t(site.name)}
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {legal.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="mono hover:text-white">
                {t(l.label)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
