type EyebrowProps = {
  children: React.ReactNode;
  index?: string;
  tone?: "light" | "dark";
  className?: string;
};

/** Small uppercase section label with an optional index number and terracotta rule. */
export function Eyebrow({ children, index, tone = "dark", className = "" }: EyebrowProps) {
  return (
    <p className={`label flex items-center gap-3 ${tone === "light" ? "text-ivory/80" : "text-stone"} ${className}`}>
      {index && <span className={tone === "light" ? "text-ivory" : "text-terra-ink"}>{index}</span>}
      <span aria-hidden className="h-px w-8 bg-terra" />
      <span>{children}</span>
    </p>
  );
}
