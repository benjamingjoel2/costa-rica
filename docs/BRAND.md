# Selvora brand system

## Name

Use **Selvora** consistently. The name's etymology is unverified, so don't attribute a meaning to it. The brand is carried by its
visual language and writing. The name and descriptor live in `src/config/site.ts`.

- Descriptor: *Tailor-made Costa Rica journeys*
- Lead line: *Costa Rica, on your own terms.*

## Wordmark

"Selvora" set in Cormorant Garamond SemiBold with slight positive tracking, finished with a terracotta point. It's outlined to SVG
paths, so it renders identically everywhere.

- Component: `src/components/brand/Wordmark.tsx` (inherits `currentColor`; the point stays terracotta)
- Files: `public/brand/selvora-wordmark-{forest,ivory,charcoal}.svg`
- Monogram for avatars and favicons: `public/brand/selvora-monogram.svg` (an ivory "S" with a terracotta point on forest green)

Keep clear space of at least the height of the "e" around the mark. Don't recolour the point, add icons, or set the name in another
typeface.

## Colour

| Token | Hex | Use |
| --- | --- | --- |
| `ivory` | #F3EFE5 | Default background |
| `paper` | #EBE5D7 | Alternate light section |
| `sage` | #D8E5D9 | Quiet highlight sections, chips |
| `forest` | #173D32 | Primary brand colour, dark sections, buttons |
| `forest-deep` | #0F2A22 | Footer, overlays, menu |
| `charcoal` | #252923 | Body text |
| `stone` | #5F645A | Secondary text (AA on ivory) |
| `terra` | #B46E4B | Accent only: rules, the wordmark point, focus rings |
| `terra-ink` | #8F4E30 | Terracotta for small text (AA on ivory) |

Terracotta is never used as a large background.

## Typography

- **Cormorant Garamond** (display): headlines with a confident scale, italic for emphasis phrases.
- **Manrope** (sans): body, navigation, labels and interface.
- Labels are small, uppercase and widely tracked, often preceded by a short terracotta rule and an index number.

Both are loaded through `next/font` (self-hosted at build time, no layout shift).

## Voice

Confident, warm, informed and specific. Talk about real landscapes, seasons and trade-offs. Avoid superlatives, clichés ("trip of a
lifetime", "paradise") and any unverified claim: no invented testimonials, awards, statistics, partners or team members.
