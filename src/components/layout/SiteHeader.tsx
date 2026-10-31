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

const box = "border border-ink bg-white text-ink";

export function SiteHeader({ regions: destinations }: { regions: Region[] }) {
  const t = useT();
  const pathname = stripLocale(usePathname());
  const [menuOpen, setMenuOpen] = useState(false);
  const [regionsOpen, setRegionsOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const menuButton = useRef<HTMLButtonElement>(null);

  // Close any open panel when the route changes.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
    setRegionsOpen(false);
  }

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButton.current?.focus();
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const currentRegion = destinations.find((d) => pathname === `/destinations/${d.slug}`);

  return (
    <>
      <a href="#main" className="mono fixed left-3 top-3 z-[70] -translate-y-24 bg-ink px-4 py-3 text-sm text-white focus:translate-y-0">
        {t("Skip to content")}
      </a>
      <header className="pointer-events-none absolute inset-x-0 top-0 z-50">
        <div className="frame flex items-start justify-between gap-4 pt-3 md:pt-8">
          {/* Logo + region picker + nav, as a grid of boxes */}
          <div className="pointer-events-auto flex w-full md:w-auto">
            <Link href="/" aria-label={t(`${site.name}, home`)} className={`${box} flex h-12 shrink-0 items-center px-3 text-[1.15rem] md:h-[5.4rem] md:px-5 md:text-[1.55rem]`}>
              <Logo compact className="md:hidden" />
              <Logo className="hidden md:flex" />
            </Link>
            <div className="hidden flex-col md:flex">
              <RegionPicker regions={destinations} open={regionsOpen} setOpen={setRegionsOpen} label={currentRegion ? currentRegion.shortName : t("Pick a region")} />
              <nav aria-label={t("Main")} className="-mt-px hidden lg:block">
                <ul className="flex">
                  {navItems.map((item) => (
                    <li key={item.href} className="-ml-px">
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={`mono flex h-[2.75rem] items-center border border-ink px-3 text-[0.8rem] transition-colors xl:px-3.5 ${
                          isActive(item.href) ? "bg-ink text-white underline underline-offset-2" : "bg-white text-ink hover:bg-ink hover:text-white"
                        }`}
                      >
                        {t(item.label)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            {/* Mobile: menu + plan beside the logo */}
            <div className="-ml-px flex flex-1 md:hidden">
              <MenuButton refEl={menuButton} open={menuOpen} onClick={() => setMenuOpen((o) => !o)} className="flex-1" />
              <PlanButton className="-ml-px flex-1" />
            </div>
          </div>

          <div className="pointer-events-auto hidden md:flex">
            <LangSwitch pathname={pathname} className="mr-3" />
            <MenuButton refEl={menuButton} open={menuOpen} onClick={() => setMenuOpen((o) => !o)} />
            <PlanButton className="-ml-px" />
          </div>
        </div>
        {/* Mobile region picker row */}
        <div className="frame pointer-events-auto -mt-px md:hidden">
          <RegionPicker regions={destinations} open={regionsOpen} setOpen={setRegionsOpen} label={currentRegion ? currentRegion.shortName : t("Pick a region")} full />
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
      className={`${box} mono flex h-12 items-center justify-center gap-3 px-4 text-[0.8rem] hover:bg-ink hover:text-white md:h-11 ${className}`}
    >
      {open ? t("Close") : t("Menu")}
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
    <Link href={planHref} className={`${box} mono flex h-12 items-center justify-center gap-3 px-4 text-[0.8rem] hover:bg-ink hover:text-white md:h-11 ${className}`}>
      {t("Plan trip")}
      <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M2 8h11M9 4l4 4-4 4" />
      </svg>
    </Link>
  );
}

function RegionPicker({ regions: destinations, open, setOpen, label, full = false }: { regions: Region[]; open: boolean; setOpen: (v: boolean) => void; label: string; full?: boolean }) {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  return (
    <div ref={ref} className={`relative -ml-px ${full ? "ml-0" : ""}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="region-list"
        onClick={() => setOpen(!open)}
        className={`${box} mono flex h-11 items-center justify-between gap-6 px-3 text-[0.8rem] hover:bg-ink hover:text-white ${full ? "w-full justify-center" : "md:min-w-[10.5rem]"}`}
      >
        {t(label)}
        <svg aria-hidden viewBox="0 0 12 16" className="h-3.5 w-3" fill="currentColor">
          <path d="M6 0a6 6 0 00-6 6c0 4.5 6 10 6 10s6-5.5 6-10a6 6 0 00-6-6zm0 8.2A2.2 2.2 0 116 3.8a2.2 2.2 0 010 4.4z" />
        </svg>
      </button>
      {open && (
        <ul id="region-list" className={`absolute left-0 top-full z-10 -mt-px border border-ink bg-white ${full ? "w-full" : "min-w-full"}`}>
          {destinations.map((d) => (
            <li key={d.slug} className="border-b border-ink/15 last:border-0">
              <Link href={`/destinations/${d.slug}`} className="mono block whitespace-nowrap px-3 py-2.5 text-[0.8rem] hover:bg-ink hover:text-white">
                {t(d.shortName)}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/destinations" className="mono block bg-ink px-3 py-2.5 text-[0.8rem] text-white hover:bg-forest">
              {t("All regions →")}
            </Link>
          </li>
        </ul>
      )}
    </div>
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
                  className="boxword block text-[2.6rem] font-medium tracking-[-0.055em] hover:bg-ink hover:text-white md:text-[4rem]"
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
    <div role="group" aria-label={t("Language")} className={`${box} mono flex h-11 items-center px-1.5 text-[0.75rem] ${className}`}>
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
            className={`flex h-9 min-w-9 items-center justify-center px-1 hover:bg-ink hover:text-white ${l === locale ? "underline decoration-2 underline-offset-4" : ""}`}
          >
            {l.toUpperCase()}
          </NextLink>
        </span>
      ))}
    </div>
  );
}
