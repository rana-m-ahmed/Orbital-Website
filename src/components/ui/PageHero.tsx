import type { ReactNode } from "react";
import { PrimaryButton, SecondaryButton } from "./Button";

/**
 * Shared hero frame. Deliberately configurable rather than fixed: §51 requires
 * that pages are not copies of one template, so each page chooses its own
 * layout, tone and signature visual.
 */
export function PageHero({
  eyebrow,
  title,
  body,
  tone = "light",
  layout = "split",
  visual,
  primary,
  secondary,
  breadcrumb,
}: {
  eyebrow: string;
  title: string;
  body: string;
  tone?: "light" | "dark";
  layout?: "split" | "stacked" | "wide";
  visual?: ReactNode;
  primary?: { label: string; href: string; event?: string };
  secondary?: { label: string; href: string };
  breadcrumb?: ReactNode;
}) {
  const dark = tone === "dark";

  const copy = (
    <>
      {breadcrumb}
      <p className={`eyebrow ${dark ? "text-slate" : "text-text-secondary-light"}`}>
        {eyebrow}
      </p>
      <h1
        className={
          layout === "stacked" ? "display-1 mt-6 max-w-[16ch]" : "display-1 mt-6"
        }
      >
        {title}
      </h1>
      <p
        className={`lede mt-7 max-w-[560px] ${
          dark ? "text-slate" : "text-text-secondary-light"
        }`}
      >
        {body}
      </p>

      {primary ? (
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <PrimaryButton
            href={primary.href}
            tone={tone}
            event="service_cta"
            eventLabel={primary.event}
          >
            {primary.label}
          </PrimaryButton>
          {secondary ? (
            <SecondaryButton href={secondary.href} tone={tone}>
              {secondary.label}
            </SecondaryButton>
          ) : null}
        </div>
      ) : null}
    </>
  );

  return (
    <section
      className={`relative overflow-hidden pb-[84px] pt-[128px] md:pb-[108px] md:pt-[168px] ${
        dark ? "on-dark bg-midnight text-offwhite" : "bg-offwhite"
      }`}
    >
      {dark ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[-22%] size-[680px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(79,120,255,0.12),transparent_62%)]"
        />
      ) : null}

      <div className="shell relative">
        {layout === "split" ? (
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">{copy}</div>
            {visual ? <div className="lg:col-span-6">{visual}</div> : null}
          </div>
        ) : (
          <>
            <div className={layout === "stacked" ? "max-w-[760px]" : ""}>{copy}</div>
            {visual ? <div className="mt-16">{visual}</div> : null}
          </>
        )}
      </div>
    </section>
  );
}

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-7">
      <ol className="flex flex-wrap items-center gap-2 text-[0.8rem]">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {item.href ? (
              <a href={item.href} className="text-slate transition-colors hover:text-current">
                {item.label}
              </a>
            ) : (
              <span className="text-current/70">{item.label}</span>
            )}
            {index < items.length - 1 ? (
              <span aria-hidden="true" className="text-current/35">
                /
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
