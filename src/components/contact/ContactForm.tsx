"use client";

import { useRef, useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";
import {
  HELPER_TEXT,
  HELP_TYPES,
  type ContactResponse,
} from "@/lib/contact-schema";

type Status = "idle" | "submitting" | "success" | "error";
type ErrorKind = "validation" | "rate_limit" | "server" | "network" | null;

const EMPTY = {
  name: "",
  email: "",
  company: "",
  helpType: HELP_TYPES[0] as string,
  message: "",
  website: "",
};

/**
 * §31 / §40 / §41 — the contact form.
 * Every state is designed: idle, submitting, success, validation error,
 * server error and network error. A failure never erases what was typed.
 */
export function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorKind, setErrorKind] = useState<ErrorKind>(null);
  const started = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  const set = (field: keyof typeof EMPTY) => (value: string) => {
    if (!started.current) {
      started.current = true;
      track("contact_start");
    }
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setErrorKind(null);
    setErrors({});

    const honeypot =
      (formRef.current?.elements.namedItem("company_website") as HTMLInputElement)
        ?.value ?? "";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company_website: honeypot }),
      });

      const data: ContactResponse = await response.json().catch(() => ({
        ok: false as const,
        kind: "server" as const,
      }));

      if (data.ok) {
        setStatus("success");
        track("contact_submit_success", { label: values.helpType });
        return;
      }

      setStatus("error");

      if (data.kind === "validation") {
        setErrors(data.errors);
        setErrorKind("validation");
        const first = Object.keys(data.errors)[0];
        document.getElementById(`contact-${first}`)?.focus();
      } else {
        setErrorKind(data.kind);
      }

      track("contact_submit_error", { label: data.kind });
    } catch {
      setStatus("error");
      setErrorKind("network");
      track("contact_submit_error", { label: "network" });
    }
  }

  if (status === "success") {
    return <Success />;
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      className="rounded-2xl border border-[#e0e5ea] bg-white p-7 md:p-9"
    >
      <div className="space-y-6">
        <Field
          id="contact-name"
          label="Name"
          value={values.name}
          onChange={set("name")}
          error={errors.name}
          autoComplete="name"
        />

        <Field
          id="contact-email"
          label="Email"
          type="email"
          value={values.email}
          onChange={set("email")}
          error={errors.email}
          autoComplete="email"
          hint="Any address you actually read is fine."
        />

        <Field
          id="contact-company"
          label="Company"
          optional
          value={values.company}
          onChange={set("company")}
          error={errors.company}
          autoComplete="organization"
        />

        <div>
          <label
            htmlFor="contact-helpType"
            className="block text-[0.9rem] font-medium"
          >
            What do you need help with?
          </label>
          <div className="relative mt-2.5">
            <select
              id="contact-helpType"
              name="helpType"
              value={values.helpType}
              onChange={(event) => set("helpType")(event.target.value)}
              className="w-full appearance-none rounded-xl border border-[#dde3e9] bg-white px-4 py-3 pr-10 text-[0.95rem] transition-colors hover:border-[#c8d2de]"
            >
              {HELP_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              viewBox="0 0 12 8"
              className="pointer-events-none absolute right-4 top-1/2 size-3 -translate-y-1/2 text-text-secondary-light"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m1.5 2 4.5 4 4.5-4" />
            </svg>
          </div>
        </div>

        <Field
          id="contact-message"
          label="What is happening today?"
          textarea
          value={values.message}
          onChange={set("message")}
          error={errors.message}
          hint={HELPER_TEXT[values.helpType]}
        />

        <Field
          id="contact-website"
          label="Website"
          optional
          value={values.website}
          onChange={set("website")}
          error={errors.website}
          autoComplete="url"
        />

        {/* Honeypot — hidden from people, not from bots (§40). */}
        <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
          <label htmlFor="contact-company_website">Company website</label>
          <input
            id="contact-company_website"
            name="company_website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </div>
      </div>

      {errorKind && errorKind !== "validation" ? (
        <p
          role="alert"
          className="mt-7 rounded-xl border border-[#e3c9c9] bg-[#fdf6f6] px-4 py-3.5 text-[0.9rem] leading-relaxed text-[#8a3b3b]"
        >
          {errorKind === "rate_limit"
            ? "That is a few messages in a short time. Please wait a few minutes and try again — nothing you typed has been lost."
            : errorKind === "network"
              ? "We could not reach the server. Check your connection and try again; your message is still here."
              : "Something went wrong at our end. Please try again in a moment, or email us directly."}
        </p>
      ) : null}

      {errorKind === "validation" ? (
        <p role="alert" className="mt-7 text-[0.9rem] text-[#8a3b3b]">
          Please check the highlighted fields.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-8 inline-flex w-full items-center justify-center gap-2.5 rounded-[13px] bg-midnight px-6 py-4 text-[0.95rem] font-medium text-offwhite transition-colors duration-150 hover:bg-[#141b27] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Start a project"}
        {status === "submitting" ? null : (
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
          </svg>
        )}
      </button>

      <p aria-live="polite" className="sr-only">
        {status === "submitting" ? "Sending your message." : ""}
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  type = "text",
  textarea = false,
  optional = false,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  type?: string;
  textarea?: boolean;
  optional?: boolean;
  autoComplete?: string;
}) {
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
    .filter(Boolean)
    .join(" ");

  const shared = `mt-2.5 w-full rounded-xl border bg-white px-4 py-3 text-[0.95rem] transition-colors ${
    error
      ? "border-[#c58a8a] focus-visible:outline-[#8a3b3b]"
      : "border-[#dde3e9] hover:border-[#c8d2de]"
  }`;

  return (
    <div>
      <label htmlFor={id} className="block text-[0.9rem] font-medium">
        {label}
        {optional ? (
          <span className="ml-2 font-normal text-text-secondary-light">
            optional
          </span>
        ) : null}
      </label>

      {textarea ? (
        <textarea
          id={id}
          name={id.replace("contact-", "")}
          rows={5}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={`${shared} resize-y`}
        />
      ) : (
        <input
          id={id}
          name={id.replace("contact-", "")}
          type={type}
          value={value}
          autoComplete={autoComplete}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={shared}
        />
      )}

      {hint ? (
        <p id={`${id}-hint`} className="mt-2 text-[0.85rem] leading-snug text-text-secondary-light">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={`${id}-error`} className="mt-2 text-[0.85rem] text-[#8a3b3b]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** §31 — success state, with one short signal settle. */
function Success() {
  return (
    <div
      role="status"
      className="rounded-2xl border border-[#e0e5ea] bg-white p-9 md:p-12"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 120 40"
        className="w-[160px]"
        fill="none"
      >
        <path d="M4 20h92" stroke="#dde3e9" strokeWidth="1.4" />
        <path
          d="M4 20h92"
          stroke="var(--color-blue)"
          strokeWidth="1.6"
          strokeDasharray="92"
          strokeDashoffset="92"
          style={{ animation: "orbital-dash 620ms var(--ease-orbital) forwards" }}
        />
        <circle cx="104" cy="20" r="7" fill="var(--color-blue)" opacity="0.14" />
        <path
          d="m100.5 20 2.6 2.6 5-5.6"
          stroke="var(--color-blue)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <h2 className="display-2 mt-7">Got it.</h2>
      <p className="lede mt-5 max-w-[460px] text-text-secondary-light">
        We&apos;ll review what you shared and come back with the most useful next
        step.
      </p>
    </div>
  );
}
