"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/kit/Logo";
import { planHref, site } from "@/config/site";
import { useLocale, useT } from "@/i18n/client";
import Link from "@/i18n/Link";
import { localeNames, locales, localizeHref, stripLocale } from "@/i18n/locales";

type Region = { slug: string; shortName: string; area: string };

const navItems = [
  { label: "About", href: "/about" },
  { label: "Journeys", href: "/journeys" },
  { label: "Destinations", href: "/destinations" },
  { label: "Experiences", href: "/experiences" },
  { label: "Our approach", href: "/approach" },
  { label: "Journal", href: "/journal" },
  { label: "Contact us", href: "/plan" },
];

export function SiteHeader({ regions: destinations }: { regions: Region[] }) {
  const t = useT();
  const pathname = stripLocale(usePathname());
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const menuButton = useRef<HTMLButtonElement>(null);

  // Close any open panel when the route changes.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButton.current?.focus();
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <a href="#main" className="mono fixed left-3 top-3 z-[70] -translate-y-24 bg-ink px-4 py-3 text-sm text-white focus:translate-y-0">
        {t("Skip to content")}
      </a>
      <header className="absolute inset-x-0 top-0 z-50 border-b border-ink/10 bg-white text-ink">
        <div className="frame flex h-16 items-center justify-between gap-6 md:h-[4.75rem]">
          <Link href="/" aria-label={t(`${site.name}, home`)} className="flex shrink-0 items-center text-[1.2rem] md:text-[1.4rem]">
            <Logo compact className="md:hidden" />
            <Logo className="hidden md:flex" />
          </Link>
          <nav aria-label={t("Main")} className="hidden xl:block">
            <ul className="flex gap-6">
              {navItems
                .filter((item) => item.href !== "/plan")
                .map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={`mono block border-b py-1.5 text-[0.78rem] transition-colors ${isActive(item.href) ? "border-ink" : "border-transparent hover:border-ink"}`}
                    >
                      {t(item.label)}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
          <div className="flex items-center gap-4">
            <LangSwitch pathname={pathname} className="hidden md:flex" />
            <MenuButton refEl={menuButton} open={menuOpen} onClick={() => setMenuOpen((o) => !o)} className={menuOpen ? "" : "xl:hidden"} />
            <PlanButton />
          </div>
        </div>
      </header>
      <MenuPanel regions={destinations} pathname={pathname} open={menuOpen} onClose={closeMenu} isActive={isActive} />
    </>
  );
}

function MenuButton({ open, onClick, className = "", refEl }: { open: boolean; onClick: () => void; className?: string; refEl: React.RefObject<HTMLButtonElement | null> }) {
  const t = useT();
  return (
    <button
      ref={refEl}
      type="button"
      aria-expanded={open}
      aria-controls="site-menu"
      onClick={onClick}
      className={`mono flex h-11 items-center justify-center gap-3 text-[0.78rem] ${className}`}
    >
      <span className="max-[420px]:sr-only">{open ? t("Close") : t("Menu")}</span>
      <span aria-hidden className="flex w-5 flex-col items-end gap-[3px]">
        <span className={`h-[1.5px] bg-current transition-all ${open ? "w-5 translate-y-[2.25px] rotate-45" : "w-5"}`} />
        <span className={`h-[1.5px] bg-current transition-all ${open ? "w-5 -translate-y-[2.25px] -rotate-45" : "w-3"}`} />
      </span>
    </button>
  );
}

function PlanButton({ className = "" }: { className?: string }) {
  const t = useT();
  return (
    <Link href={planHref} className={`mono flex h-11 items-center justify-center rounded-[2px] bg-ink px-4 text-[0.78rem] text-white transition-colors hover:bg-forest ${className}`}>
      {t("Plan trip")}
    </Link>
  );
}

function MenuPanel({ regions: destinations, pathname, open, onClose, isActive }: { regions: Region[]; pathname: string; open: boolean; onClose: () => void; isActive: (href: string) => boolean }) {
  const t = useT();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div id="site-menu" ref={panelRef} role="dialog" aria-modal="true" aria-label={t("Site menu")} hidden={!open} className="fixed inset-0 z-40 overflow-y-auto bg-white">
      <div className="frame grid min-h-full gap-12 pb-12 pt-32 md:grid-cols-2 md:pt-40">
        <nav aria-label={t("Menu")}>
          <ul className="flex flex-col items-start">
            {[{ label: "Home", href: "/" }, ...navItems].map((item) => (
              <li key={item.href} className="-mt-px">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="block py-1 text-[2.4rem] font-medium leading-none tracking-[-0.045em] hover:text-forest hover:underline md:text-[3.5rem]"
                >
                  {t(item.label)}
                </Link>
              </li>
            ))}
          </ul>
          <LangSwitch pathname={pathname} className="mt-8" />
        </nav>
        <div className="md:border-l md:border-ink md:pl-6">
          <p className="label text-stone">{t("Regions")}</p>
          <ul className="mt-3 border-t border-ink">
            {destinations.map((d) => (
              <li key={d.slug} className="border-b border-ink">
                <Link href={`/destinations/${d.slug}`} className="flex items-baseline justify-between gap-4 py-3 text-2xl font-medium tracking-[-0.04em] hover:text-forest">
                  {t(d.shortName)}
                  <span className="label text-stone">{t(d.area)}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href={planHref} className="mono mt-8 flex h-14 items-center justify-between bg-ink px-5 text-white hover:bg-forest">
            {t("Plan your trip")} <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

/** EN · FR · DE · ES: the same page in each language. */
function LangSwitch({ pathname, className = "" }: { pathname: string; className?: string }) {
  const t = useT();
  const locale = useLocale();
  return (
    <div role="group" aria-label={t("Language")} className={`mono flex h-11 items-center text-[0.75rem] ${className}`}>
      {locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span aria-hidden className="px-0.5 text-stone">·</span>}
          <NextLink
            href={localizeHref(l, pathname)}
            prefetch={false}
            hrefLang={l}
            lang={l}
            title={localeNames[l]}
            aria-current={l === locale ? "true" : undefined}
            className={`flex h-9 min-w-8 items-center justify-center px-1 hover:underline ${l === locale ? "underline decoration-2 underline-offset-4" : "text-stone"}`}
          >
            {l.toUpperCase()}
          </NextLink>
        </span>
      ))}
    </div>
  );
}
