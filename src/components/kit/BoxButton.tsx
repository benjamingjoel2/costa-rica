import Link from "@/i18n/Link";

type BoxButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Kept for callers; every button is now the same solid style. */
  dark?: boolean;
};

/** One solid button: mono label with a small arrow inside it. */
export function BoxButton({ href, children, className = "" }: BoxButtonProps) {
  return (
    <Link href={href} className={`group mono inline-flex min-h-12 items-center gap-3 self-start rounded-[2px] bg-ink px-5 text-[0.85rem] text-white transition-colors hover:bg-forest ${className}`}>
      {children}
      <ArrowGlyph />
    </Link>
  );
}

/** The arrow used inside buttons. */
export function ArrowGlyph({ dir = "right" }: { dir?: "left" | "right" }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className={`h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 ${dir === "left" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}

/** Round arrow, used only on its own for carousel previous/next controls. */
export function CircleArrowIcon({ className = "", dir = "right" }: { className?: string; dir?: "left" | "right" }) {
  return (
    <span
      aria-hidden
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink transition-transform duration-300 group-hover:translate-x-1 ${className}`}
    >
      <svg viewBox="0 0 16 16" className={`h-3.5 w-3.5 ${dir === "left" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M2 8h11M9 4l4 4-4 4" />
      </svg>
    </span>
  );
}
