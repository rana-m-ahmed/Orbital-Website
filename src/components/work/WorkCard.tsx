import Link from "next/link";
import { ProductFrame } from "@/components/primitives/ProductFrame";
import { WORK_LABEL, type WorkItem } from "@/content/work";

/**
 * §4 / §45 — a reference system is never styled so closely to a client case
 * study that a reasonable visitor could mistake it for deployed client work.
 * The label is structural, not decorative.
 */
export function WorkLabel({
  type,
  tone = "light",
}: {
  type: WorkItem["type"];
  tone?: "light" | "dark";
}) {
  const client = type === "client";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.1em] ${
        client
          ? tone === "dark"
            ? "bg-blue/16 text-blue-soft"
            : "bg-[#3158d8]/10 text-interactive-on-light"
          : tone === "dark"
            ? "border border-[#2c3646] text-slate"
            : "border border-[#d3dae1] text-text-secondary-light"
      }`}
    >
      {!client ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 12 12"
          className="size-2.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        >
          <rect x="1.2" y="1.2" width="9.6" height="9.6" rx="2" strokeDasharray="2.6 2" />
        </svg>
      ) : null}
      {WORK_LABEL[type]}
    </span>
  );
}

export function FeatureCase({ item }: { item: WorkItem }) {
  return (
    <article className="grid overflow-hidden rounded-2xl border border-[#e0e5ea] bg-white lg:grid-cols-12">
      <div className="flex flex-col justify-between gap-10 p-7 md:p-10 lg:col-span-5">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <WorkLabel type={item.type} />
            <span className="text-[0.78rem] text-text-secondary-light">
              {item.industry}
            </span>
          </div>

          <h3 className="display-3 mt-5">{item.title}</h3>

          <dl className="mt-7 space-y-5">
            <div>
              <dt className="mono-label text-text-secondary-light">
                Business problem
              </dt>
              <dd className="mt-2 text-[0.95rem] leading-relaxed text-text-secondary-light">
                {item.problem}
              </dd>
            </div>
            <div>
              <dt className="mono-label text-text-secondary-light">
                Operational change
              </dt>
              <dd className="mt-2 text-[0.95rem] leading-relaxed text-text-primary-light">
                {item.outcome}
              </dd>
            </div>
          </dl>
        </div>

        <Link
          href={`/work/${item.slug}`}
          data-track="work_case_open"
          data-track-label={item.slug}
          className="group inline-flex items-center gap-2 text-[0.92rem] font-medium text-interactive-on-light"
        >
          See the project
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
        </Link>
      </div>

      <div className="flex items-center border-t border-[#eceff3] bg-[#fafbfc] p-6 md:p-9 lg:col-span-7 lg:border-l lg:border-t-0">
        <ProductFrame variant={item.frame} title={item.title} className="w-full" />
      </div>
    </article>
  );
}

export function SecondaryCase({ item }: { item: WorkItem }) {
  return (
    <article className="flex h-full flex-col justify-between rounded-2xl border border-[#e0e5ea] bg-white p-7">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <WorkLabel type={item.type} />
          <span className="text-[0.78rem] text-text-secondary-light">
            {item.industry}
          </span>
        </div>

        <h3 className="display-4 mt-5">{item.title}</h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-text-secondary-light">
          {item.summary}
        </p>

        <div className="mt-6 space-y-2 border-t border-[#eceff3] pt-5 text-[0.86rem]">
          <p className="flex gap-3">
            <span className="w-[62px] shrink-0 text-text-secondary-light">
              Before
            </span>
            <span className="text-text-secondary-light">{item.before}</span>
          </p>
          <p className="flex gap-3">
            <span className="w-[62px] shrink-0 text-text-secondary-light">
              After
            </span>
            <span className="font-medium text-text-primary-light">
              {item.after}
            </span>
          </p>
        </div>
      </div>

      <Link
        href={`/work/${item.slug}`}
        data-track="work_case_open"
        data-track-label={item.slug}
        className="group mt-8 inline-flex items-center gap-2 text-[0.92rem] font-medium text-interactive-on-light"
      >
        See the project
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
      </Link>
    </article>
  );
}
