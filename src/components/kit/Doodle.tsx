type DoodleName = "palm" | "volcano" | "toucan" | "binoculars" | "leaf" | "sun";

/** Hand-drawn line illustrations, the playful counterpoint to the boxed type. */
export function Doodle({ name, className = "", color = "currentColor" }: { name: DoodleName; className?: string; color?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 200 200" className={className} fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

const paths: Record<DoodleName, React.ReactNode> = {
  palm: (
    <>
      <path d="M104 186c-6-40-2-82 8-118" />
      <path d="M96 186c-4-38 0-80 10-118" />
      <path d="M110 70c-20-22-52-26-78-10 22-2 44 4 58 18" />
      <path d="M110 70c-8-30-30-48-58-50 20 10 34 28 40 48" />
      <path d="M112 68c10-28 34-44 60-42-22 8-38 24-46 44" />
      <path d="M112 70c26-14 56-10 76 10-24-6-46-4-64 6" />
      <path d="M110 72c4 20 0 40-14 56 2-20 2-38-4-52" />
      <circle cx="100" cy="82" r="8" />
      <circle cx="118" cy="84" r="8" />
      <path d="M40 186h124" />
    </>
  ),
  volcano: (
    <>
      <path d="M14 182l58-98c6-8 14-10 22-4l10 8 10-8c8-6 16-4 22 4l52 98z" />
      <path d="M72 84c10 10 22 12 32 4 10 8 22 6 32-4" />
      <path d="M94 62c-14-2-20-14-12-24 4-12 18-14 26-6 8-10 26-8 28 6 12 2 14 18 2 24-6 6-18 4-22-2-6 6-16 6-22 2z" />
      <path d="M56 140l14-6M128 128l16 8M96 160l10-4" />
    </>
  ),
  toucan: (
    <>
      <path d="M70 70c0-24 18-40 40-40 20 0 34 14 34 34v40c0 30-20 54-48 60l-20 4 6-28c-12-18-12-44-12-70z" />
      <path d="M144 52c22-6 44 0 50 12-8 10-28 14-50 14" />
      <path d="M144 66h44" />
      <circle cx="118" cy="56" r="6" />
      <path d="M78 96c18 4 34 2 50-6" />
      <path d="M70 168l-22 22M86 170l-8 22" />
      <path d="M40 150c30 6 60 6 92-2" />
    </>
  ),
  binoculars: (
    <>
      <circle cx="56" cy="128" r="36" />
      <circle cx="144" cy="128" r="36" />
      <circle cx="56" cy="128" r="16" />
      <circle cx="144" cy="128" r="16" />
      <path d="M40 96l14-46h26l8 44M160 96l-14-46h-26l-8 44" />
      <path d="M86 104h28M80 64h40" />
    </>
  ),
  leaf: (
    <>
      <path d="M100 186V96" />
      <path d="M100 96C60 98 26 76 22 40c34-10 64-6 78 14 14-20 44-24 78-14-4 36-38 58-78 56z" />
      <path d="M100 54v42M60 50l12 30M140 50l-12 30M36 64l30 18M164 64l-30 18" />
    </>
  ),
  sun: (
    <>
      <circle cx="100" cy="100" r="34" />
      <path d="M100 20v24M100 156v24M20 100h24M156 100h24M44 44l16 16M140 140l16 16M44 156l16-16M140 60l16-16" />
      <path d="M86 96c2 4 6 4 8 0M106 96c2 4 6 4 8 0M88 114c8 6 16 6 24 0" />
    </>
  ),
};
