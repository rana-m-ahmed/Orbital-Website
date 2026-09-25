"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export type ServiceNavItem = { label: string; id: string };

/**
 * §8 — service context navigation for deep automation pages.
 * 40px tall, sticky below the 64px global header (≈104px total footprint).
 * Mobile gets a non-sticky horizontally scrollable rail — never a
 * double-sticky interface.
 */
export function ServiceNav({
  parent,
  page,
  items,
}: {
  parent: { label: string; href: string };
  page: string;
  items: ServiceNavItem[];
}) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="On this page"
      className="relative z-40 border-b border-[#e0e5ea] bg-offwhite/92 backdrop-blur-[10px] md:sticky md:top-16"
    >
      <div className="shell flex h-auto items-center gap-6 py-2.5 md:h-10 md:py-0">
        <p className="hidden shrink-0 text-[0.8rem] text-text-secondary-light md:block">
          <Link href={parent.href} className="transition-colors hover:text-midnight">
            {parent.label}
          </Link>
          <span aria-hidden="true" className="px-2 text-[#c3cbd4]">
            /
          </span>
          <span className="text-text-primary-light">{page}</span>
        </p>

        <ul className="no-scrollbar -mx-1 flex flex-1 items-center gap-1 overflow-x-auto md:justify-end">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "true" : undefined}
                className={`inline-block whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[0.82rem] font-medium transition-colors ${
                  active === item.id
                    ? "text-text-primary-light"
                    : "text-text-secondary-light hover:text-text-primary-light"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
