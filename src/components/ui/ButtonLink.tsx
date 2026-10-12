import Link from "next/link";
import { Arrow } from "./ArrowLink";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "forest" | "ivory" | "outline-light" | "outline-dark";
  className?: string;
};

const styles: Record<NonNullable<ButtonLinkProps["variant"]>, string> = {
  forest: "bg-forest text-ivory hover:bg-forest-deep",
  ivory: "bg-ivory text-forest-deep hover:bg-white",
  "outline-light": "border border-ivory/60 text-ivory hover:bg-ivory hover:text-forest-deep",
  "outline-dark": "border border-charcoal/40 text-charcoal hover:border-forest hover:bg-forest hover:text-ivory",
};

/** Primary call to action. Square-edged and quiet, with an arrow that moves on hover. */
export function ButtonLink({ href, children, variant = "forest", className = "" }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-12 items-center justify-center gap-4 px-6 py-3 text-[0.95rem] font-semibold tracking-wide transition-colors duration-300 ${styles[variant]} ${className}`}
    >
      {children}
      <Arrow className="w-6" />
    </Link>
  );
}
