/** Tiny boxed mono chips that sit on images and cards. */
export function Tags({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <span className={`flex flex-col items-start ${className}`}>
      {items.map((t) => (
        <span key={t} className="mono -mt-px border border-ink bg-white px-1.5 py-0.5 text-[0.62rem] leading-tight text-ink">
          {t}
        </span>
      ))}
    </span>
  );
}

/** Dark rounded chip, used for kicker labels over hero images. */
export function DarkChip({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`mono inline-flex items-center gap-2 rounded-md bg-ink px-3 py-2 text-[0.7rem] text-white ${className}`}>{children}</span>;
}
