import { Reveal } from "./Reveal";

/** Shared shell for Privacy and Terms — quiet, readable, no motion. */
export function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: { heading: string; body: string[] }[];
}) {
  return (
    <section className="bg-offwhite pb-[112px] pt-[128px] md:pt-[168px]">
      <div className="shell">
        <div className="max-w-[720px]">
          <h1 className="display-1">{title}</h1>
          <p className="mt-6 text-[0.92rem] text-text-secondary-light">{updated}</p>

          <p className="mt-10 rounded-xl border border-[#dde3e9] bg-white px-5 py-4 text-[0.9rem] leading-relaxed text-text-secondary-light">
            This document is a plain-language starting point prepared with the
            site. It is not legal advice and must be reviewed by a qualified
            adviser before launch.
          </p>

          <Reveal className="mt-14 space-y-12">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="display-3">{section.heading}</h2>
                <div className="mt-4 space-y-4">
                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="leading-relaxed text-text-secondary-light"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
