import { Squiggle } from "./Squiggle";

type Size = "xl" | "l" | "m" | "s";

const sizes: Record<Size, string> = {
  xl: "text-box-xl",
  l: "text-box-l",
  m: "text-box-m",
  s: "text-box-s",
};

type BoxHeadingProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  size?: Size;
  /** Index of the word to underline with the hand-drawn squiggle. */
  squiggle?: number;
  className?: string;
  id?: string;
};

/**
 * Headline in which every word sits in its own bordered white box. A few boxes
 * get rounded corners, chosen deterministically from the word so layouts are stable.
 */
export function BoxHeading({ text, as: Tag = "h2", size = "l", squiggle, className = "", id }: BoxHeadingProps) {
  const words = text.split(" ");
  return (
    <Tag id={id} className={`${sizes[size]} font-medium leading-none tracking-[-0.055em] ${className}`}>
      <span className="inline-flex flex-wrap pl-px pt-px">
        {words.map((w, i) => (
          <span key={`${w}-${i}`} className={`boxword relative ${rounded(w, i)}`}>
            {w}
            {squiggle === i && <Squiggle className="pointer-events-none absolute -bottom-[0.22em] -left-[0.1em] w-[115%]" />}
          </span>
        ))}
      </span>
    </Tag>
  );
}

function rounded(word: string, i: number) {
  const n = (word.length * 7 + i * 3) % 5;
  if (n === 0) return "rounded-[0.16em]";
  if (n === 3) return "rounded-tr-[0.16em] rounded-br-[0.16em]";
  return "";
}
