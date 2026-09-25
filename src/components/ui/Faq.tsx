import { Reveal } from "./Reveal";

export type FaqItem = { q: string; a: string };

/**
 * Native disclosure — keyboard-operable and fully usable with no JavaScript,
 * so it never needs a client boundary (§36).
 */
export function Faq({
  items,
  tone = "light",
}: {
  items: FaqItem[];
  tone?: "light" | "dark";
}) {
  const border = tone === "dark" ? "border-midnight-line" : "border-[#e0e5ea]";
  const answer = tone === "dark" ? "text-slate" : "text-text-secondary-light";

  return (
    <>
      <Reveal className={`border-t ${border}`}>
        <dl>
          {items.map((item) => (
            <div key={item.q} className={`border-b ${border}`}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-6 marker:hidden [&::-webkit-details-marker]:hidden">
                  <dt className="display-4 pr-2">{item.q}</dt>
                  <span
                    aria-hidden="true"
                    className={`mt-1.5 shrink-0 transition-transform duration-200 ease-[var(--ease-orbital)] group-open:rotate-45 ${
                      tone === "dark" ? "text-slate" : "text-text-secondary-light"
                    }`}
                  >
                    <svg
                      viewBox="0 0 14 14"
                      className="size-3.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    >
                      <path d="M7 1v12M1 7h12" />
                    </svg>
                  </span>
                </summary>
                <dd className={`max-w-[620px] pb-7 pr-10 leading-relaxed ${answer}`}>
                  {item.a}
                </dd>
              </details>
            </div>
          ))}
        </dl>
      </Reveal>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />
    </>
  );
}
