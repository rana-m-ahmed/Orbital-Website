import { AnalyticsDelegate } from "@/components/shell/AnalyticsDelegate";
import { Footer } from "@/components/shell/Footer";
import { Header } from "@/components/shell/Header";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="bg-offwhite pb-[132px] pt-[164px]">
          <div className="shell max-w-[680px]">
            <p className="eyebrow text-text-secondary-light">404</p>
            <h1 className="display-1 mt-6">This route does not exist.</h1>
            <p className="lede mt-7 text-text-secondary-light">
              The page you were looking for has moved or was never here. The
              places people usually want are below.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <PrimaryButton href="/">Back to the homepage</PrimaryButton>
              <SecondaryButton href="/automation">See what we automate</SecondaryButton>
            </div>

            <ul className="mt-14 grid gap-4 border-t border-[#e0e5ea] pt-10 sm:grid-cols-2">
              {[
                ["AI Receptionist", "/automation/ai-receptionist"],
                ["Lead Automation", "/automation/lead-automation"],
                ["Custom software", "/software"],
                ["Integrations", "/integrations"],
                ["Work", "/work"],
                ["Start a project", "/contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-[0.98rem] font-medium text-interactive-on-light"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
      <AnalyticsDelegate />
    </>
  );
}
