import Link from "next/link";

/**
 * ORBITAL wordmark. The "O" carries a small orbiting node that shifts 2–3px
 * on hover (§5) — the only motion the logo is allowed.
 */
export function Wordmark({
  className = "",
  label = true,
}: {
  className?: string;
  label?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="ORBITAL — home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-[22px] shrink-0 overflow-visible"
        fill="none"
      >
        <circle
          cx="12"
          cy="12"
          r="8.5"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.45"
        />
        <circle cx="12" cy="12" r="3.1" fill="currentColor" />
        <circle
          cx="20.5"
          cy="12"
          r="2.1"
          className="fill-blue transition-transform duration-[170ms] ease-[var(--ease-orbital)] group-hover:-translate-y-[3px] motion-reduce:transform-none"
        />
      </svg>
      {label ? (
        <span className="font-[family-name:var(--font-display)] text-[1.02rem] font-semibold tracking-[0.14em]">
          ORBITAL
        </span>
      ) : null}
    </Link>
  );
}
