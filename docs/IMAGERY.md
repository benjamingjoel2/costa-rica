# Imagery

## Current state

All photography comes from [Pexels](https://www.pexels.com) and is used under the
[Pexels License](https://www.pexels.com/license/), which allows free commercial use without attribution.
The photos are stored in `public/images/photos/` (resized to 2000px and compressed), and each entry in
`src/content/images.ts` keeps a `credit` link to its Pexels page.

The photos show Costa Rica's regions and wildlife in general. They are **not** pictures of specific properties, partners
or guided experiences, and the site never presents them that way.

Images are served from the site itself and optimised by `next/image`, so there is no runtime dependency on a third party.

## Before launch

- Look through every photo on the live site and swap any that don't suit the brand.
- Replace with your own commissioned photography over time.

## Changing a photo

Edit the entry in `src/content/images.ts`:

- Add the new file to `public/images/photos/` and point the entry's key, size and alt text at it.
- Describe what is actually in the photo in the alt text.
- Set `position` (CSS `object-position`) if the crop needs adjusting. Images are cropped to many ratios across the site.

No component changes are needed.
