import Link from "@/i18n/Link";
import { Doodle } from "@/components/kit/Doodle";
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

const links = [
  [
    { label: "About", href: "/about" },
    { label: "Our approach", href: "/approach" },
    { label: "Journal", href: "/journal" },
    { label: "Contact us", href: "/plan" },
    { label: "Booking terms", href: "/terms" },
    { label: "Privacy policy", href: "/privacy" },
    { label: "Cookie policy", href: "/cookies" },
  ],
  [
    { label: "Journeys", href: "/journeys" },
    { label: "Destinations", href: "/destinations" },
    { label: "Experiences", href: "/experiences" },
    { label: "Plan your trip", href: planHref },
  ],
];

export function SiteFooter() {
  return (
    <footer className="bg-night text-white">
      <div className="frame grid md:grid-cols-2">
        <div className="relative flex min-h-[18rem] flex-col justify-between py-8 md:min-h-full md:border-r md:border-white/25 md:pr-8">
          <Doodle name="toucan" color="#D8E5D9" className="mx-auto mt-10 h-40 w-40 md:mt-32 md:h-52 md:w-52" />
          <div className="mt-10 flex items-end justify-between gap-6">
            <Link href="/" aria-label={`${site.name}, home`} className="text-[1.9rem]">
              <Logo />
            </Link>
            <p className="mono text-[0.75rem] text-white/50">©{COPYRIGHT_YEAR} {t(site.name)}</p>
          </div>
        </div>

        <div className="py-8 md:pl-6">
          {groups.map((g) => (
            <div key={g.label} className="mb-6">
              <p className="mono text-[0.8rem] text-sage">{t(g.label)}</p>
              <ul className="mt-2 border-t border-white/25">
                {destinations
                  .filter((d) => g.slugs.includes(d.slug))
                  .map((d) => (
                    <li key={d.slug} className="border-b border-white/25">
                      <Link href={`/destinations/${d.slug}`} className="block py-3 text-[2rem] font-medium leading-none tracking-[-0.05em] hover:text-sage md:text-[2.4rem]">
                        {t(d.name)}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}

          <nav aria-label={t("Footer")} className="grid grid-cols-2 gap-6 border-b border-white/25 py-8">
            {links.map((col, i) => (
              <ul key={i} className="space-y-3">
                {col.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="mono text-[0.85rem] hover:text-sage">
                      {t(l.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </nav>

          <div className="pt-8">
            <p className="mono text-[0.8rem] text-sage">{t("Ready when you are")}</p>
            <Link href={planHref} className="group mt-3 flex h-14 items-center justify-between border border-white px-4">
              <span className="mono text-[0.85rem] text-white/70">{t("Tell us about your trip")}</span>
              <span className="mono bg-white px-4 py-2 text-[0.8rem] text-ink group-hover:bg-sage">{t("Start planning")}</span>
            </Link>
            {site.contactEmail && (
              <p className="mono mt-4 text-[0.8rem] text-white/70">
                {t("Or email")}{t(" ")}
                <a href={`mailto:${site.contactEmail}`} className="text-sage underline">
                  {t(site.contactEmail)}
                </a>
              </p>
            )}
            <p className="mono mt-2 text-[0.8rem] text-white/50">
              {site.address.locality}, {t(site.address.country)}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
