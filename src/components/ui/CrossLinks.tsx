import Link from "next/link";
import { Reveal } from "./Reveal";

/**
 * §43 — destination-specific link labels, never "Learn more".
 * Every service page ends with the routes a visitor is most likely to want
 * next, so nobody has to backtrack through the navigation.
 */
export function CrossLinks({
  links,
  tone = "light",
  title = "Where to go next",
}: {
  links: { label: string; href: string; detail: string }[];
  tone?: "light" | "dark";
  title?: string;
}) {
  const dark = tone === "dark";

  return (
    <Reveal>
      <h2 className={`mono-label ${dark ? "text-slate" : "text-text-secondary-light"}`}>
        {title}
      </h2>
      <ul
        className={`mt-6 grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-3 ${
          dark
            ? "border-midnight-line bg-midnight-line"
            : "border-[#e0e5ea] bg-[#e0e5ea]"
        }`}
      >
        {links.map((link) => (
          <li key={link.href} className={dark ? "bg-midnight" : "bg-white"}>
            <Link
              href={link.href}
              className={`group flex h-full flex-col justify-between gap-6 p-6 transition-colors ${
                dark ? "hover:bg-[#101823]" : "hover:bg-[#fafbfc]"
              }`}
            >
              <div>
                <p className="display-4">{link.label}</p>
                <p
                  className={`mt-2 text-[0.9rem] leading-snug ${
                    dark ? "text-slate" : "text-text-secondary-light"
                  }`}
                >
                  {link.detail}
                </p>
              </div>
              <span
                className={`inline-flex items-center gap-2 text-[0.88rem] font-medium ${
                  dark ? "text-blue-soft" : "text-interactive-on-light"
                }`}
              >
                Go
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="size-3.5 transition-transform duration-150 group-hover:translate-x-[3px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
