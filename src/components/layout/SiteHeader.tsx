"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { Arrow } from "@/components/ui/ArrowLink";
import { mainNav, planHref, site } from "@/config/site";

// Pages that open with a full-bleed image: the header starts transparent over it.
const OVERLAY_ROUTES = [/^\/$/, /^\/journeys\/[^/]+$/, /^\/destinations\/[^/]+$/];

export function SiteHeader() {
  const pathname = usePathname();
  const overlay = OVERLAY_ROUTES.some((r) => r.test(pathname));
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the menu whenever the route changes.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  }, []);

  const transparent = overlay && !scrolled && !menuOpen;
  const onDark = transparent || menuOpen;
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <a
        href="#main"
        className="label fixed left-4 top-3 z-[60] -translate-y-24 bg-forest px-4 py-3 text-ivory focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow] duration-500 ${
          menuOpen
            ? "bg-forest-deep text-ivory"
            : transparent
            ? "bg-transparent text-ivory"
            : "bg-ivory/95 text-charcoal shadow-[0_1px_0_rgba(37,41,35,0.12)] backdrop-blur-sm supports-[backdrop-filter]:bg-ivory/90"
        }`}
      >
        {transparent && (
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-forest-deep/55 to-transparent" />
        )}
        <div className="frame relative flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
          <Link href="/" className="relative z-10 -my-2 py-2" aria-label={`${site.name}, home`}>
            <Wordmark decorative className={`h-[1.6rem] w-auto lg:h-[1.85rem] ${onDark ? "text-ivory" : "text-forest"}`} />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-8 xl:gap-10">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="group relative py-2 text-[0.9rem] font-medium tracking-wide"
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-terra transition-transform duration-500 ease-out-soft ${
                        isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={planHref}
              className={`group hidden min-h-11 items-center gap-3 border px-5 text-[0.88rem] font-semibold tracking-wide transition-colors duration-300 sm:inline-flex ${
                onDark
                  ? "border-ivory/60 hover:bg-ivory hover:text-forest-deep"
                  : "border-forest bg-forest text-ivory hover:bg-forest-deep"
              }`}
            >
              Plan your trip
              <Arrow className="w-5" />
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="relative z-10 inline-flex min-h-11 items-center gap-3 px-2 text-[0.88rem] font-semibold tracking-wide lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span>{menuOpen ? "Close" : "Menu"}</span>
              <span aria-hidden className="relative block h-3 w-6">
                <span className={`absolute left-0 top-0 h-px w-6 bg-current transition-transform duration-300 ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`} />
                <span className={`absolute bottom-0 left-0 h-px w-6 bg-current transition-transform duration-300 ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={closeMenu} isActive={isActive} />
    </>
  );
}

function MobileMenu({ open, onClose, isActive }: { open: boolean; onClose: () => void; isActive: (href: string) => boolean }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panel) {
        const focusables = Array.from(panel.querySelectorAll<HTMLElement>("a, button"));
        const toggle = document.querySelector<HTMLElement>('[aria-controls="site-menu"]');
        const ring = toggle ? [toggle, ...focusables] : focusables;
        const idx = ring.indexOf(document.activeElement as HTMLElement);
        const next = e.shiftKey ? (idx <= 0 ? ring.length - 1 : idx - 1) : idx === ring.length - 1 ? 0 : idx + 1;
        e.preventDefault();
        ring[next]?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      id="site-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      hidden={!open}
      className="fixed inset-0 z-40 overflow-y-auto bg-forest-deep text-ivory lg:hidden"
    >
      <div className="frame flex min-h-full flex-col pb-10 pt-28">
        <p className="label text-ivory/60">{site.descriptor}</p>
        <nav aria-label="Main" className="mt-8">
          <ul className="space-y-1">
            {mainNav.map((item, i) => (
              <li key={item.href} className="border-b border-ivory/10">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex items-baseline justify-between py-4 font-display text-[2.4rem] leading-none"
                >
                  {item.label}
                  <span className="label text-ivory/50">0{i + 1}</span>
                </Link>
              </li>
            ))}
            <li className="border-b border-ivory/10">
              <Link href="/about" aria-current={isActive("/about") ? "page" : undefined} className="block py-4 font-display text-[2.4rem] leading-none">
                About Selvora
              </Link>
            </li>
          </ul>
        </nav>
        <div className="mt-auto pt-12">
          <Link href={planHref} className="group flex min-h-14 items-center justify-between bg-ivory px-6 font-semibold text-forest-deep">
            Plan your trip
            <Arrow />
          </Link>
          <p className="mt-5 text-sm text-ivory/70">Every journey is planned from scratch around you. Tell us what you have in mind.</p>
        </div>
      </div>
    </div>
  );
}
