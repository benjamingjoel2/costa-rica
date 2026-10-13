"use client";

import { useRef } from "react";
import { CircleArrowIcon } from "./BoxButton";

/** A horizontally scrolling row with previous/next circle buttons. */
export function CarouselControls({ targetId, className = "" }: { targetId: string; className?: string }) {
  const scroll = (dir: number) => {
    const el = document.getElementById(targetId);
    el?.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };
  return (
    <div className={`flex gap-1 ${className}`}>
      <button type="button" className="group" onClick={() => scroll(-1)} aria-label="Previous" aria-controls={targetId}>
        <CircleArrowIcon dir="left" className="h-9 w-9 bg-white text-ink" />
      </button>
      <button type="button" className="group" onClick={() => scroll(1)} aria-label="Next" aria-controls={targetId}>
        <CircleArrowIcon className="h-9 w-9 bg-white text-ink" />
      </button>
    </div>
  );
}

/** Scroll container paired with CarouselControls via id. */
export function CarouselTrack({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLUListElement>(null);
  return (
    <ul id={id} ref={ref} className={`scroller flex gap-5 overflow-x-auto ${className}`}>
      {children}
    </ul>
  );
}
