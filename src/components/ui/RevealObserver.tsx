"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Adds `data-visible` to elements marked `data-reveal` as they enter the
 * viewport. One observer for the whole site keeps client JS minimal; the CSS
 * in globals.css only hides content once the `js` class is present and never
 * when reduced motion is requested.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-visible])"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.setAttribute("data-visible", ""));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
