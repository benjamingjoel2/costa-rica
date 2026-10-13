import { parseInquiry, validateInquiry } from "@/lib/inquiry";

// Inquiry endpoint. It validates the submission and forwards it as JSON to the
// webhook in INQUIRY_WEBHOOK_URL (Zapier, Make, Formspree, a CRM or your own
// service). It only reports success when that webhook accepts the inquiry.
// With no webhook configured it answers 503, and the form says so honestly.

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const input = parseInquiry(raw);

  // Honeypot filled in: almost certainly automated. Accept quietly and drop it.
  if (input.website) return Response.json({ ok: true });

  const errors = validateInquiry(input);
  if (Object.keys(errors).length) return Response.json({ ok: false, error: "invalid", errors }, { status: 422 });

  const webhook = process.env.INQUIRY_WEBHOOK_URL;
  if (!webhook) return Response.json({ ok: false, error: "not_configured" }, { status: 503 });

  const { website: _honeypot, ...fields } = input;
  void _honeypot;
  const payload = {
    type: "trip_inquiry",
    receivedAt: new Date().toISOString(),
    source: request.headers.get("referer") ?? null,
    ...fields,
    adults: Number(fields.adults),
    children: Number(fields.children || 0),
  };

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.INQUIRY_WEBHOOK_SECRET ? { Authorization: `Bearer ${process.env.INQUIRY_WEBHOOK_SECRET}` } : {}),
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error(`Inquiry webhook responded ${res.status}`);
      return Response.json({ ok: false, error: "delivery_failed" }, { status: 502 });
    }
  } catch (error) {
    console.error("Inquiry webhook request failed", error);
    return Response.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
