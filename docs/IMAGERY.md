# Imagery

## Current state

All photography comes from [Unsplash](https://unsplash.com) and is used under the
[Unsplash License](https://unsplash.com/license), which allows free commercial use without attribution.
Each entry in `src/content/images.ts` keeps a `credit` link to its Unsplash page.

The photos show Costa Rica's regions and wildlife in general. They are **not** pictures of specific properties, partners
or guided experiences, and the site never presents them that way.

Images are loaded from Unsplash's download endpoint and optimised by `next/image`. The allowed hosts are set in
`images.remotePatterns` in `next.config.ts`.

## Before launch

- Look through every photo on the live site and swap any that don't suit the brand.
- Consider downloading the final selection into `public/images/` so the site no longer depends on Unsplash at runtime. Then
  change each `src` in `images.ts` to the local path.
- Replace with your own commissioned photography over time.

## Changing a photo

Edit the entry in `src/content/images.ts`:

- `unsplash("<photo id>", "<alt text>")` uses an Unsplash photo. The id is the last part of the photo page URL.
- Describe what is actually in the photo in the alt text.
- Set `position` (CSS `object-position`) if the crop needs adjusting. Images are cropped to many ratios across the site.

No component changes are needed.
