import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd, breadcrumbSchema, pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Start a Project",
  description:
    "Tell ORBITAL what is slowing your team down. You do not need to know the technical solution — describing the problem is enough to start.",
  path: "/contact",
});

const NEXT = [
  "We review what you shared.",
  "We clarify anything important.",
  "We recommend the most useful next step.",
];

/** §31 — Contact. No heavy animation; one signal settle on success. */
export default function ContactPage() {
  return (
    <>
      <section className="bg-offwhite pb-[112px] pt-[128px] md:pt-[168px]">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="eyebrow text-text-secondary-light">Start a project</p>
                <h1 className="display-1 mt-6">What should work better?</h1>
                <p className="lede mt-7 max-w-[460px] text-text-secondary-light">
                  You do not need to know the technical solution. Describe what is
                  happening today and we&apos;ll work out whether it should be
                  automated, connected or built.
                </p>

                <div className="mt-12 border-t border-[#e0e5ea] pt-8">
                  <h2 className="mono-label text-text-secondary-light">
                    What happens next
                  </h2>
                  <ol className="mt-5 space-y-4">
                    {NEXT.map((step, index) => (
                      <li key={step} className="flex gap-4">
                        <span className="mono-label mt-1 w-5 shrink-0 text-text-secondary-light">
                          0{index + 1}
                        </span>
                        <span className="text-[0.98rem]">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="mt-10 border-t border-[#e0e5ea] pt-8">
                  <h2 className="mono-label text-text-secondary-light">
                    Prefer email?
                  </h2>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="mt-3 inline-block text-[0.98rem] font-medium text-interactive-on-light"
                  >
                    {SITE.email}
                  </a>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal large>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
    </>
  );
}
