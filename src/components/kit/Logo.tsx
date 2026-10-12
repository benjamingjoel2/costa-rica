import { site } from "@/config/site";

/** The Selvora logotype: the name stacked over "Costa Rica", underlined, in a box. */
export function Logo({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={`flex flex-col items-center justify-center font-medium leading-[0.92] tracking-[-0.03em] ${className}`} aria-label={site.name}>
      <span className="underline decoration-[0.06em] underline-offset-[0.12em]">SELVORA</span>
      {!compact && <span className="mt-1 text-[0.42em] tracking-[0.12em] underline decoration-[0.12em] underline-offset-[0.25em]">COSTA RICA</span>}
    </span>
  );
}
