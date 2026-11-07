import { t } from "@/i18n/server";
type Size = "hero-xl" | "hero-l" | "xl" | "l" | "m" | "s";

const sizes: Record<Size, string> = {
  /** Hero headlines keep their original size (owner decision, 7 Nov 2026). */
  "hero-xl": "text-hero-xl",
  "hero-l": "text-hero-l",
  xl: "text-box-xl",
  l: "text-box-l",
  m: "text-box-m",
  s: "text-box-s",
};

type BoxHeadingProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  size?: Size;
  className?: string;
  id?: string;
};

/**
 * Plain-text headline (owner rule: no word sits in its own box). The name stays so
 * every page keeps working; the colour comes from the section it sits in.
 */
export function BoxHeading({ text, as: Tag = "h2", size = "l", className = "", id }: BoxHeadingProps) {
  const words = t(text).split(" ");
  return (
    <Tag id={id} className={`${sizes[size]} max-w-[22ch] text-balance font-medium leading-[1.02] tracking-[-0.04em] [overflow-wrap:anywhere] ${className}`}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`}>
          {i > 0 && " "}
          {w}
        </span>
      ))}
    </Tag>
  );
}
