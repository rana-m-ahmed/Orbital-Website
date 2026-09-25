import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import type { OrbitalEvent } from "@/lib/analytics";

/**
 * §32 — button system.
 * Rectangular, radius 12–14px. No animated dot. Arrow moves 3–4px on hover.
 * Orbital Blue stays the signal accent, so it is not the default fill (§14).
 *
 * These are server components: analytics is attached by a single delegated
 * listener reading `data-track` (§38 — no listener per node).
 */

export type Tone = "light" | "dark";

type BaseProps = {
  children: ReactNode;
  href: string;
  tone?: Tone;
  event?: OrbitalEvent;
  eventLabel?: string;
  className?: string;
  arrow?: boolean;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

const base =
  "group inline-flex items-center gap-2.5 rounded-[13px] font-medium transition-[background-color,color,border-color,box-shadow] duration-150 ease-[var(--ease-orbital)]";

const sizing = "px-6 py-3.5 text-[0.95rem] leading-none";

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={`size-4 shrink-0 transition-transform duration-150 ease-[var(--ease-orbital)] group-hover:translate-x-[3px] group-focus-visible:translate-x-[3px] ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

export function PrimaryButton({
  children,
  href,
  tone = "light",
  event,
  eventLabel,
  className = "",
  arrow = true,
  ...rest
}: BaseProps) {
  const toneClasses =
    tone === "light"
      ? "bg-midnight text-offwhite hover:bg-[#141b27]"
      : "bg-offwhite text-midnight hover:bg-white";

  return (
    <Link
      href={href}
      data-track={event}
      data-track-label={eventLabel}
      className={`${base} ${sizing} ${toneClasses} ${className}`}
      {...rest}
    >
      {children}
      {arrow ? <Arrow /> : null}
    </Link>
  );
}

export function SecondaryButton({
  children,
  href,
  tone = "light",
  event,
  eventLabel,
  className = "",
  arrow = true,
  ...rest
}: BaseProps) {
  const toneClasses =
    tone === "light"
      ? "border border-[#cfd6de] text-midnight hover:border-midnight hover:bg-[#e9edf1]"
      : "border border-[#2a3444] text-offwhite hover:border-[#48566c] hover:bg-[#121a27]";

  return (
    <Link
      href={href}
      data-track={event}
      data-track-label={eventLabel}
      className={`${base} ${sizing} bg-transparent ${toneClasses} ${className}`}
      {...rest}
    >
      {children}
      {arrow ? <Arrow /> : null}
    </Link>
  );
}

/**
 * Text link — a thin blue route line grows on hover. No moving dot.
 * Uses the accessible dark blue on light surfaces (§14).
 */
export function TextLink({
  children,
  href,
  tone = "light",
  event,
  eventLabel,
  className = "",
  ...rest
}: BaseProps) {
  const toneClasses =
    tone === "light" ? "text-interactive-on-light" : "text-blue-soft";
  const ruleTone = tone === "light" ? "bg-interactive-on-light" : "bg-blue";

  return (
    <Link
      href={href}
      data-track={event}
      data-track-label={eventLabel}
      className={`group inline-flex flex-col items-start gap-1.5 text-[0.95rem] font-medium ${toneClasses} ${className}`}
      {...rest}
    >
      <span className="inline-flex items-center gap-2">
        {children}
        <Arrow className="size-3.5" />
      </span>
      <span
        aria-hidden="true"
        className={`h-px w-4 origin-left rounded-full transition-[width] duration-150 ease-[var(--ease-orbital)] group-hover:w-6 group-focus-visible:w-6 ${ruleTone}`}
      />
    </Link>
  );
}
