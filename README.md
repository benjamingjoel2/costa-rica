# Selvora

Website for **Selvora**, a tailor-made travel company focused on Costa Rica. It's an inquiry-led site with no online checkout.
Its job is to explain the offer, inspire through editorial content and turn visitors into qualified trip inquiries.

Built with Next.js 16 (App Router, Cache Components), React 19, TypeScript and Tailwind CSS 4. It has no other runtime dependencies.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build && npm start
npm run lint
```

## What's here

| Route | Purpose |
| --- | --- |
| `/` | Homepage: hero, introduction, signature journeys, destination index, experiences, approach, planning steps, journal, closing CTA |
| `/journeys`, `/journeys/[slug]` | Five illustrative journeys and a reusable journey template |
| `/destinations`, `/destinations/[slug]` | Seven regional guides and a reusable destination template |
| `/experiences` | Travel interests, linked to destinations and journeys |
| `/approach` | Planning principles, process, what a proposal contains, FAQs |
| `/about` | Brand perspective (no invented team or history) |
| `/journal`, `/journal/[slug]` | Editorial listing and article template, with 5 articles |
| `/plan` | Inquiry form; accepts `?journey=<slug>` or `?destination=<slug>` to prefill a starting point |
| `/privacy`, `/terms` | Draft policies, clearly marked for legal review |
| `/api/inquiry` | Validates inquiries and forwards them to a webhook |
| `/sitemap.xml`, `/robots.txt` | SEO foundations |

### Where things live

- `src/config/site.ts`: brand name, descriptor, URL, contact email, social links and navigation. Change the brand here.
- `src/content/`: all content as typed data (`journeys.ts`, `destinations.ts`, `experiences.ts`, `journal.ts`, `approach.ts`) plus the image manifest (`images.ts`).
- `src/components/`: `brand/` (wordmark), `layout/` (header, footer), `home/` (homepage sections), `sections/` (shared page sections), `inquiry/`, `legal/`, `ui/` (primitives).
- `src/lib/inquiry.ts`: inquiry fields and validation shared by the form and the API route.
- `docs/`: brand, imagery and content notes.

## Setup still required before launch

1. **Inquiry delivery.** Set `INQUIRY_WEBHOOK_URL` (and optionally `INQUIRY_WEBHOOK_SECRET`); see `.env.example`. The route POSTs JSON such as
   `{ type, receivedAt, source, name, email, dates, duration, adults, children, budget, interests[], stay, message, journey }`.
   Until it's set, submissions return `503` and the form says plainly that the inquiry **was not sent**. It never shows a false success.
   If you'd rather send email directly (Resend, Postmark, etc.), replace the `fetch` in `src/app/api/inquiry/route.ts`. The validation and the client stay as they are.
2. **Site URL and search engines.** Set `NEXT_PUBLIC_SITE_URL` so canonical URLs, the sitemap and OG tags point at the real domain (update it when you add a custom domain, then redeploy). Then verify the site in Google Search Console and Bing Webmaster Tools: choose the "HTML tag" method, put the code in `GOOGLE_SITE_VERIFICATION` / `BING_SITE_VERIFICATION`, redeploy, and submit `/sitemap.xml`. Page titles and descriptions are set per page through `pageMetadata()` in `src/lib/seo.ts`; keep titles under about 60 characters and descriptions under about 160.
3. **Contact details.** The public address is selvora@tourground.com (`site.contactEmail` in `src/config/site.ts`). By owner decision the site shows no phone number, WhatsApp, social accounts, licence numbers, team section or testimonials. A business address (a premium coworking space in San José) still has to be chosen and added to `src/config/site.ts`, the footer, the legal pages and the JSON-LD.
4. **Photography.** The site uses free Pexels photos stored in `public/images/photos/`. Replace them with your own photography over time (see `docs/IMAGERY.md`).
5. **Legal pages.** Booking terms (`/terms`), privacy policy (`/privacy`) and cookie policy (`/cookies`) are complete, with no gaps, but a lawyer should review them before launch.
6. **Analytics.** None is installed. If you add it, update the privacy and cookie policies and ask for consent first.
7. **Content review.** Destination facts are kept general and well established, but have a Costa Rica specialist review them before launch.
