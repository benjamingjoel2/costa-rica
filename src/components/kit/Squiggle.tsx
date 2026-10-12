/** Hand-drawn terracotta underline that sits beneath a boxed word. */
export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 180 34" className={className} fill="none">
      <path
        d="M4 22c8-14 20-16 18-4-2 10-14 12-10 2 6-14 26-8 36 0 10 7 18 6 28-2 12-9 22-4 32 2 10 6 20 6 30-1 9-6 20-6 34 2"
        stroke="#B46E4B"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
