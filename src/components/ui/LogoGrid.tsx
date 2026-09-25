import { Reveal } from "./Reveal";

/**
 * §8 / §41 — integration logo wall.
 *
 * Only official, licensed brand assets may ship here. Until those files are
 * supplied they are rendered as named tiles: a missing or unlicensed logo
 * must never collapse the layout, and an approximated logo must never be
 * drawn. Drop an <img src="/logos/<slug>.svg" alt=""> inside the tile and the
 * name becomes the caption.
 */
export function LogoGrid({
  items,
  tone = "light",
  columns = 4,
}: {
  items: string[];
  tone?: "light" | "dark";
  columns?: 3 | 4;
}) {
  const tile =
    tone === "dark"
      ? "border-midnight-line bg-[#0d131d] text-offwhite/82"
      : "border-[#e0e5ea] bg-white text-text-primary-light";

  return (
    <Reveal>
      <ul
        className={`grid gap-px overflow-hidden rounded-2xl border ${
          tone === "dark" ? "border-midnight-line" : "border-[#e0e5ea]"
        } ${
          columns === 3
            ? "grid-cols-2 sm:grid-cols-3"
            : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
        } ${tone === "dark" ? "bg-midnight-line" : "bg-[#e0e5ea]"}`}
      >
        {items.map((name) => (
          <li
            key={name}
            className={`flex min-h-[86px] items-center justify-center px-4 py-6 text-center text-[0.88rem] font-medium ${tile}`}
          >
            {name}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
