"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { images } from "@/content/images";
import type { Destination } from "@/content/types";
import { Arrow } from "@/components/ui/ArrowLink";

type Item = Pick<Destination, "slug" | "name" | "shortName" | "area" | "tagline" | "image">;

/**
 * Desktop: an index of regions with a sticky image that follows hover and focus.
 * Small screens: a horizontally scrolling strip of portrait photographs.
 */
export function DestinationIndex({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <>
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-10">
        <ul className="lg:col-span-6">
          {items.map((d, i) => (
            <li key={d.slug} className="border-b border-charcoal/15 first:border-t">
              <Link
                href={`/destinations/${d.slug}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-5"
              >
                <span className={`label transition-colors ${i === active ? "text-terra-ink" : "text-stone"}`}>{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className={`block font-display text-[2.35rem] leading-tight transition-colors duration-300 ${i === active ? "text-forest" : "text-charcoal/55"}`}>
                    {d.shortName}
                  </span>
                  <span
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out-soft ${i === active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <span className="overflow-hidden text-[0.95rem] text-stone">{d.tagline}</span>
                  </span>
                </span>
                <span className="label text-stone">{d.area}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="lg:col-span-6">
          <div className="sticky top-28">
            <div className="relative aspect-[4/5] overflow-hidden bg-sage">
              {items.map((d, i) => (
                <Image
                  key={d.slug}
                  src={images[d.image].src}
                  alt={i === active ? images[d.image].alt : ""}
                  aria-hidden={i !== active || undefined}
                  fill
                  sizes="45vw"
                  className={`object-cover transition-opacity duration-700 ease-out-soft ${i === active ? "opacity-100" : "opacity-0"}`}
                  style={images[d.image].position ? { objectPosition: images[d.image].position } : undefined}
                />
              ))}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-deep/80 to-transparent p-8 pt-24 text-ivory">
                <p className="label text-ivory/75">{current.area}</p>
                <p className="mt-2 font-display text-3xl">{current.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ul className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-4 md:-mx-10 md:scroll-px-10 md:px-10 lg:hidden" aria-label="Destinations">
        {items.map((d) => (
          <li key={d.slug} className="w-[72%] shrink-0 snap-start sm:w-[44%]">
            <Link href={`/destinations/${d.slug}`} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden bg-sage">
                <Image
                  src={images[d.image].src}
                  alt={images[d.image].alt}
                  fill
                  sizes="(min-width: 640px) 44vw, 72vw"
                  className="object-cover"
                  style={images[d.image].position ? { objectPosition: images[d.image].position } : undefined}
                />
              </div>
              <p className="label mt-4 text-stone">{d.area}</p>
              <p className="mt-1 flex items-center justify-between font-display text-2xl text-forest">
                {d.shortName} <Arrow />
              </p>
              <p className="mt-1 text-sm text-stone">{d.tagline}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
