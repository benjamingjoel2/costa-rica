import Link from "next/link";

type ArrowLinkProps = {
  href: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
};

/** Understated text link with an extending arrow, used for secondary actions. */
export function ArrowLink({ href, children, tone = "dark", className = "" }: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 py-2 text-[0.95rem] font-semibold ${tone === "light" ? "text-ivory" : "text-forest"} ${className}`}
    >
      <span className="border-b border-current/30 pb-0.5 transition-colors group-hover:border-current">{children}</span>
      <Arrow />
    </Link>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 32 12"
      className={`h-3 w-7 shrink-0 transition-transform duration-500 ease-out-soft group-hover:translate-x-1.5 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M0 6h30M25 1l5 5-5 5" />
    </svg>
  );
}
