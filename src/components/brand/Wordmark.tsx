import { site } from "@/config/site";
import { WORDMARK_DOT, WORDMARK_PATH, WORDMARK_VIEWBOX } from "./wordmark-paths";

type WordmarkProps = {
  className?: string;
  /** Hide from assistive tech when a visible text label sits alongside. */
  decorative?: boolean;
};

/**
 * The Selvora wordmark: the name set in Cormorant Garamond with a terracotta
 * point. Inherits its colour from `currentColor` so it works on light and dark.
 */
export function Wordmark({ className, decorative = false }: WordmarkProps) {
  return (
    <svg
      viewBox={WORDMARK_VIEWBOX}
      className={className}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : site.name}
      focusable="false"
    >
      <path d={WORDMARK_PATH} fill="currentColor" />
      <circle cx={WORDMARK_DOT.cx} cy={WORDMARK_DOT.cy} r={WORDMARK_DOT.r} className="fill-terra" />
    </svg>
  );
}
