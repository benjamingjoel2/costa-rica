# Editing content

All content is typed data in `src/content/`. Pages and the sitemap update automatically.

- **Journeys** (`journeys.ts`): add an object to `journeys`. `destinations` are destination slugs. Keep journeys illustrative: no
  prices, guaranteed inclusions or named properties unless they're confirmed business facts.
- **Destinations** (`destinations.ts`): each has its own `chapters` with custom headings, so pages don't read identically.
  `pairsWith` links related regions.
- **Experiences** (`experiences.ts`): each links to destinations and journeys by slug.
- **Journal** (`journal.ts`): articles are arrays of blocks (`p`, `h2`, `list`, `image`, `aside`). There are no author or date fields
  yet. Add them to the `Article` type (and to the Article structured data) once real bylines and publication dates exist.
- **Planning principles and steps** (`approach.ts`).
- **Images** (`images.ts`): see `docs/IMAGERY.md`.

## Information deliberately left out

These weren't supplied, so nothing was invented:

- Founder or team biographies, credentials and years in business (the About page uses brand-level copy only)
- Testimonials, reviews, ratings, awards and statistics
- Prices, supplier or property partnerships, exclusive access
- Address, phone number, company registration and social media accounts

When real information exists, add it, and only then consider adding matching structured data.
