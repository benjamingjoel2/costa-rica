import Link from "@/i18n/Link";

type BoxButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Dark filled variant, used for the main planning action. */
  dark?: boolean;
};

/** Mono label in a box with a circular arrow beside it. */
export function BoxButton({ href, children, className = "", dark = false }: BoxButtonProps) {
  return (
    <Link href={href} className={`group inline-flex items-stretch ${className}`}>
      <span
        className={`mono flex min-h-12 items-center border px-5 text-[0.9rem] transition-colors ${
          dark ? "border-ink bg-ink text-white group-hover:bg-forest" : "border-ink bg-white text-ink group-hover:bg-ink group-hover:text-white"
        }`}
      >
        {children}
      </span>
      <CircleArrowIcon className={dark ? "bg-ink text-white" : "bg-white text-ink"} />
    </Link>
  );
}

export function CircleArrowIcon({ className = "", dir = "right" }: { className?: string; dir?: "left" | "right" }) {
  return (
    <span
      aria-hidden
      className={`-ml-px flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink transition-transform duration-300 group-hover:translate-x-1 ${className}`}
    >
      <svg viewBox="0 0 16 16" className={`h-3.5 w-3.5 ${dir === "left" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M2 8h11M9 4l4 4-4 4" />
      </svg>
    </span>
  );
}
