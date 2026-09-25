import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Space = "s" | "m" | "l" | "xl";
type Tone = "light" | "dark" | "raised";

const SPACE: Record<Space, string> = {
  s: "py-[72px]",
  m: "py-[92px] md:py-[112px]",
  l: "py-[112px] md:py-[152px]",
  xl: "py-[140px] md:py-[200px]",
};

const TONE: Record<Tone, string> = {
  light: "bg-offwhite text-text-primary-light",
  raised: "bg-white text-text-primary-light",
  dark: "on-dark bg-midnight text-offwhite",
};

/**
 * §15 — tonal chapters, not zebra striping.
 * §17 — spacing varies by importance; sections choose their own step.
 */
export function Section({
  children,
  id,
  tone = "light",
  space = "m",
  className = "",
  wide = false,
}: {
  children: ReactNode;
  id?: string;
  tone?: Tone;
  space?: Space;
  className?: string;
  wide?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative ${TONE[tone]} ${SPACE[space]} ${className}`}
    >
      <div className={wide ? "shell-wide" : "shell"}>{children}</div>
    </section>
  );
}

export function Eyebrow({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={`eyebrow ${
        tone === "dark" ? "text-slate" : "text-text-secondary-light"
      }`}
    >
      {children}
    </p>
  );
}

/**
 * §11 — the whole header block enters together, never line by line.
 */
export function SectionHeader({
  eyebrow,
  title,
  body,
  tone = "light",
  align = "left",
  className = "",
  after,
  as = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
  after?: ReactNode;
  as?: "h1" | "h2" | "h3";
}) {
  const Title = as;

  return (
    <Reveal
      className={`${align === "center" ? "mx-auto max-w-[720px] text-center" : "max-w-[720px]"} ${className}`}
    >
      {eyebrow ? (
        <p
          className={`eyebrow mb-5 ${
            tone === "dark" ? "text-slate" : "text-text-secondary-light"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}

      <Title className={as === "h1" ? "display-1" : "display-2"}>{title}</Title>

      {body ? (
        <div
          className={`lede mt-6 max-w-[580px] ${
            align === "center" ? "mx-auto" : ""
          } ${tone === "dark" ? "text-slate" : "text-text-secondary-light"}`}
        >
          {body}
        </div>
      ) : null}

      {after ? <div className="mt-9">{after}</div> : null}
    </Reveal>
  );
}
