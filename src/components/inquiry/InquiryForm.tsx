"use client";

import { useT } from "@/i18n/client";

import Link from "@/i18n/Link";
import { useSearchParams } from "next/navigation";
import { useId, useRef, useState } from "react";
import {
  budgetOptions,
  durationOptions,
  emptyInquiry,
  interestOptions,
  stayOptions,
  validateInquiry,
  type InquiryErrors,
  type InquiryInput,
} from "@/lib/inquiry";

type Status = "idle" | "submitting" | "sent" | "not_configured" | "failed";

type InquiryFormProps = {
  /** Map of slug → readable name for journeys and destinations, used to prefill a starting point. */
  journeyNames: Record<string, string>;
  destinationNames: Record<string, string>;
  contactEmail: string | null;
};

const FIELD_ORDER: (keyof InquiryInput)[] = ["name", "email", "dates", "duration", "adults", "children", "budget", "interests", "stay", "message"];

export function InquiryForm({ journeyNames, destinationNames, contactEmail }: InquiryFormProps) {
  const t = useT();
  const params = useSearchParams();
  const fromJourney = journeyNames[params.get("journey") ?? ""];
  const fromDestination = destinationNames[params.get("destination") ?? ""];
  const startingPoint = fromJourney ? `${t("Journey:")} ${fromJourney}` : fromDestination ? `${t("Destination:")} ${fromDestination}` : "";

  const [values, setValues] = useState<InquiryInput>(() => emptyInquiry(startingPoint));
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  const set = <K extends keyof InquiryInput>(key: K, value: InquiryInput[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleInterest = (interest: string) =>
    set("interests", values.interests.includes(interest) ? values.interests.filter((i) => i !== interest) : [...values.interests, interest]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateInquiry(values);
    setErrors(found);
    if (Object.keys(found).length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: InquiryErrors };
      if (res.ok && data.ok) setStatus("sent");
      else if (data.error === "not_configured") setStatus("not_configured");
      else if (data.error === "invalid" && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        requestAnimationFrame(() => summaryRef.current?.focus());
        return;
      } else setStatus("failed");
    } catch {
      setStatus("failed");
    }
    requestAnimationFrame(() => {
      resultRef.current?.focus();
      resultRef.current?.scrollIntoView({ block: "center" });
    });
  }

  if (status === "sent") {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="bg-forest p-8 text-ivory outline-none md:p-12">
        <p className="label text-ivory/70">{t("Inquiry received")}</p>
        <h2 className="mt-4 text-display-m text-ivory">{t("Thank you, ")}{t(values.name.split(" ")[0])}.</h2>
        <p className="mt-4 max-w-lg text-ivory/85">
          {t("Your inquiry has reached us. We’ll reply to ")}<strong className="font-semibold">{t(values.email)}</strong>{t(" to start planning. In the meantime, the journal has a few notes that may help.")}
        </p>
        <Link href="/journal" className="mt-8 inline-block border-b border-terra pb-1 font-semibold">
          {t("Read the journal")}
        </Link>
      </div>
    );
  }

  const errorList = FIELD_ORDER.filter((k) => errors[k]);
  const mailto = contactEmail ? buildMailto(contactEmail, values) : null;

  return (
    <form noValidate onSubmit={onSubmit} aria-describedby={id("intro")} className="space-y-14">
      <p id={id("intro")} className="sr-only">
        {t("Fields marked required must be completed. Everything else is optional.")}
      </p>

      {errorList.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="border-l-2 border-terra bg-paper p-6 outline-none">
          <p className="font-semibold text-terra-ink">{t("Please check ")}{errorList.length === 1 ? t("one detail") : t("{n} details").replace("{n}", String(errorList.length))}:</p>
          <ul className="mt-3 space-y-1 text-sm">
            {errorList.map((k) => (
              <li key={k}>
                <a href={`#${id(k)}`} className="underline underline-offset-4">
                  {t(errors[k])}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {(status === "not_configured" || status === "failed") && (
        <div ref={resultRef} tabIndex={-1} role="alert" className="border-l-2 border-terra bg-paper p-6 outline-none">
          <p className="font-semibold text-terra-ink">
            {t(status === "not_configured" ? "Your inquiry has not been sent." : "Something went wrong, and your inquiry has not been sent.")}
          </p>
          <p className="mt-2 text-sm text-charcoal/85">
            {t(status === "not_configured"
              ? "Online inquiries aren't connected yet on this site, so we couldn't receive your details."
              : "Please try again in a moment. Your answers are still here.")}{t(" ")}
            {mailto ? (
              <>
                {t("You can also")}{t(" ")}
                <a href={mailto} className="font-semibold underline underline-offset-4">
                  {t("send the same details by email")}
                </a>{t(" ")}
                {t("to ")}{t(contactEmail)}.
              </>
            ) : status === "not_configured" ? (
              "Please check back soon."
            ) : null}
          </p>
        </div>
      )}

      {values.journey && (
        <div className="flex flex-wrap items-center justify-between gap-4 bg-sage px-5 py-4">
          <p className="text-sm">
            <span className="label mr-3 text-forest">{t("Starting point")}</span>
            {values.journey}
          </p>
          <button type="button" onClick={() => set("journey", "")} className="text-sm underline underline-offset-4">
            {t("Remove")}
          </button>
        </div>
      )}

      {/* Honeypot: hidden from people and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>{t("Leave this field empty")}</label>
        <input id={id("website")} name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set("website", e.target.value)} />
      </div>

      <Fieldset index="1" legend="About you" hint="So we know who we're writing to.">
        <div className="grid gap-6 md:grid-cols-2">
          <TextField id={id("name")} label="Full name" required autoComplete="name" value={values.name} error={errors.name} onChange={(v) => set("name", v)} />
          <TextField id={id("email")} label="Email address" type="email" required autoComplete="email" value={values.email} error={errors.email} onChange={(v) => set("email", v)} />
        </div>
      </Fieldset>

      <Fieldset index="2" legend="Your trip" hint="Dates and group size shape everything from the route to where you stay.">
        <div className="grid gap-6 md:grid-cols-2">
          <TextField
            id={id("dates")}
            label="When are you travelling?"
            required
            placeholder="e.g. Late February 2027"
            hint="Approximate dates, a month or &ldquo;flexible&rdquo; are all fine."
            value={values.dates}
            error={errors.dates}
            onChange={(v) => set("dates", v)}
          />
          <SelectField id={id("duration")} label="How long for?" required options={durationOptions} value={values.duration} error={errors.duration} onChange={(v) => set("duration", v)} />
          <TextField id={id("adults")} label="Adults" type="number" required min={1} max={30} inputMode="numeric" value={values.adults} error={errors.adults} onChange={(v) => set("adults", v)} />
          <TextField
            id={id("children")}
            label="Children"
            type="number"
            min={0}
            max={30}
            inputMode="numeric"
            hint="If any, tell us their ages below."
            value={values.children}
            error={errors.children}
            onChange={(v) => set("children", v)}
          />
        </div>
      </Fieldset>

      <Fieldset index="3" legend="What you're looking for" hint="All optional, and all useful. There are no wrong answers.">
        <div className="space-y-10">
          <fieldset>
            <legend className="mb-1 font-semibold">{t("Interests")}</legend>
            <p className="mb-4 text-sm text-stone">{t("Choose as many as you like.")}</p>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map((o) => (
                <Chip key={o} type="checkbox" name="interests" label={o} checked={values.interests.includes(o)} onChange={() => toggleInterest(o)} />
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-1 font-semibold">{t("Preferred places to stay")}</legend>
            <p className="mb-4 text-sm text-stone">{t("A rough preference helps us start in the right place.")}</p>
            <div className="flex flex-wrap gap-2">
              {stayOptions.map((o) => (
                <Chip key={o} type="radio" name={id("stay")} label={o} checked={values.stay === o} onChange={() => set("stay", o)} />
              ))}
            </div>
          </fieldset>

          <SelectField
            id={id("budget")}
            label="Approximate budget"
            hint="Per person, excluding international flights. It helps us suggest what's realistic."
            options={budgetOptions}
            value={values.budget}
            error={errors.budget}
            onChange={(v) => set("budget", v)}
          />

          <div>
            <label htmlFor={id("message")} className="font-semibold">
              {t("Anything else we should know?")}
            </label>
            <p id={`${id("message")}-hint`} className="mt-1 text-sm text-stone">
              {t("Places you’d love to see, a special occasion, children’s ages, mobility needs, things you’d rather avoid.")}
            </p>
            <textarea
              id={id("message")}
              rows={6}
              value={values.message}
              onChange={(e) => set("message", e.target.value)}
              aria-describedby={`${id("message")}-hint${errors.message ? ` ${id("message")}-error` : ""}`}
              aria-invalid={errors.message ? true : undefined}
              className={inputClass(Boolean(errors.message))}
            />
            {errors.message && <FieldError id={`${id("message")}-error`}>{t(errors.message)}</FieldError>}
          </div>
        </div>
      </Fieldset>

      <div className="flex flex-col gap-5 border-t border-charcoal/15 pt-10 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex min-h-13 items-center justify-center gap-4 bg-forest px-8 py-4 font-semibold text-ivory transition-colors hover:bg-forest-deep disabled:cursor-wait disabled:opacity-70"
        >
          {t(status === "submitting" ? "Sending your inquiry…" : "Send my inquiry")}
        </button>
        <p className="text-sm text-stone">
          {t("We use these details only to reply to your inquiry. See our")}{t(" ")}
          <Link href="/privacy" className="underline underline-offset-4">
            {t("privacy policy")}
          </Link>
          .
        </p>
      </div>
      <p aria-live="polite" className="sr-only">
        {t(status === "submitting" ? "Sending your inquiry" : "")}
      </p>
    </form>
  );
}

function buildMailto(email: string, v: InquiryInput) {
  const lines = [
    `Name: ${v.name}`,
    `Email: ${v.email}`,
    v.journey && `Starting point: ${v.journey}`,
    `Dates: ${v.dates}`,
    `Length: ${v.duration}`,
    `Travellers: ${v.adults} adults, ${v.children || 0} children`,
    v.budget && `Budget: ${v.budget}`,
    v.interests.length > 0 && `Interests: ${v.interests.join(", ")}`,
    v.stay && `Places to stay: ${v.stay}`,
    v.message && `\n${v.message}`,
  ].filter(Boolean);
  return `mailto:${email}?subject=${encodeURIComponent("Trip inquiry")}&body=${encodeURIComponent(lines.join("\n"))}`;
}

function inputClass(invalid: boolean) {
  return `mt-3 block w-full border-0 border-b bg-transparent px-0 py-3 text-lg text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-0 focus-visible:outline-none ${
    invalid ? "border-terra" : "border-charcoal/30 focus:border-forest"
  } transition-colors focus:border-b-2`;
}

function Fieldset({ index, legend, hint, children }: { index: string; legend: string; hint: string; children: React.ReactNode }) {
  const t = useT();
  const headingId = useId();
  return (
    <div role="group" aria-labelledby={headingId} className="grid gap-6 md:grid-cols-[10rem_1fr] md:gap-10">
      <div>
        <p className="label text-terra-ink">{t("Step ")}{t(index)}</p>
        <h2 id={headingId} className="mt-2 font-display text-[1.75rem] leading-tight text-forest">
          {t(legend)}
        </h2>
        <p className="mt-2 text-sm text-stone">{t(hint)}</p>
      </div>
      <div>{children}</div>
    </div>
  );
}

type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  min?: number;
  max?: number;
};

function TextField({ id, label, value, onChange, error, hint, required, type = "text", ...rest }: TextFieldProps) {
  const t = useT();
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={id} className="font-semibold">
        {t(label)}
        {required && <span className="ml-2 text-sm font-normal text-stone">{t("(required)")}</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-stone">
          {t(hint)}
        </p>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={inputClass(Boolean(error))}
        {...rest}
      />
      {error && <FieldError id={`${id}-error`}>{t(error)}</FieldError>}
    </div>
  );
}

function SelectField({
  id,
  label,
  options,
  value,
  onChange,
  error,
  hint,
  required,
}: {
  id: string;
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
  hint?: string;
  required?: boolean;
}) {
  const t = useT();
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={id} className="font-semibold">
        {t(label)}
        {required && <span className="ml-2 text-sm font-normal text-stone">{t("(required)")}</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-stone">
          {t(hint)}
        </p>
      )}
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`${inputClass(Boolean(error))} appearance-none pr-8`}
        >
          <option value="">{t("Choose one")}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {t(o)}
            </option>
          ))}
        </select>
        <svg aria-hidden viewBox="0 0 12 8" className="pointer-events-none absolute right-1 top-1/2 mt-1.5 h-2 w-3 text-forest" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M1 1l5 5 5-5" />
        </svg>
      </div>
      {error && <FieldError id={`${id}-error`}>{t(error)}</FieldError>}
    </div>
  );
}

function Chip({ type, name, label, checked, onChange }: { type: "checkbox" | "radio"; name: string; label: string; checked: boolean; onChange: () => void }) {
  const t = useT();
  return (
    <label className="cursor-pointer">
      <input type={type} name={name} value={label} checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="inline-flex min-h-11 items-center gap-2 border border-charcoal/25 px-4 py-2 text-[0.95rem] transition-colors peer-checked:border-forest peer-checked:bg-forest peer-checked:text-ivory peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-terra hover:border-forest">
        {t(label)}
      </span>
    </label>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-2 text-sm font-medium text-terra-ink">
      {children}
    </p>
  );
}
