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
| `/sitemap.xml`, `/robots.txt`, `/og.jpg` | SEO foundations |

### Where things live

- `src/config/site.ts`: brand name, descriptor, URL, contact email, social links and navigation. Change the brand here.
- `src/content/`: all content as typed data (`journeys.ts`, `destinations.ts`, `experiences.ts`, `journal.ts`, `approach.ts`) plus the image manifest (`images.ts`).
- `src/components/`: `brand/` (wordmark), `layout/` (header, footer), `home/` (homepage sections), `sections/` (shared page sections), `inquiry/`, `legal/`, `ui/` (primitives).
- `src/lib/inquiry.ts`: inquiry fields and validation shared by the form and the API route.
- `scripts/plates/`: generator for the illustrated image plates and the social card.
- `docs/`: brand, imagery and content notes.

## Setup still required before launch

1. **Inquiry delivery.** Set `INQUIRY_WEBHOOK_URL` (and optionally `INQUIRY_WEBHOOK_SECRET`); see `.env.example`. The route POSTs JSON such as
   `{ type, receivedAt, source, name, email, dates, duration, adults, children, budget, interests[], stay, message, journey }`.
   Until it's set, submissions return `503` and the form says plainly that the inquiry **was not sent**. It never shows a false success.
   If you'd rather send email directly (Resend, Postmark, etc.), replace the `fetch` in `src/app/api/inquiry/route.ts`. The validation and the client stay as they are.
2. **Site URL.** Set `NEXT_PUBLIC_SITE_URL` so canonical URLs, the sitemap and OG tags point at the real domain.
3. **Contact details.** Set `NEXT_PUBLIC_CONTACT_EMAIL` if you want a public address shown. No phone number, address or social accounts are shown until real ones are added (`site.social` in `src/config/site.ts`).
4. **Photography.** The site currently uses original illustrated plates. See `docs/IMAGERY.md` to swap in licensed photography.
5. **Legal pages.** `/privacy` and `/terms` are drafts with bracketed gaps and a visible "Draft for review" notice. Complete them with legal advice, then remove the notice in `src/components/legal/LegalPage.tsx`.
6. **About/team.** Add real founder or team information when available (see `docs/CONTENT.md`).
7. **Analytics.** None is installed. If you add it, update the privacy policy and consider consent requirements.
8. **Content review.** Destination facts are kept general and well established, but have a Costa Rica specialist review them before launch.
