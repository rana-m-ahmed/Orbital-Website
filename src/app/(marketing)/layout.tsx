import { AnalyticsDelegate } from "@/components/shell/AnalyticsDelegate";
import { Footer } from "@/components/shell/Footer";
import { Header } from "@/components/shell/Header";
import { SITE } from "@/lib/site";

/**
 * §36 — the shared marketing layout owns the header, footer, metadata
 * defaults and the analytics shell. Everything below stays a Server
 * Component unless it genuinely needs browser state.
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    slogan: SITE.tagline,
    email: SITE.email,
    sameAs: [SITE.linkedin],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-midnight focus:px-4 focus:py-3 focus:text-sm focus:text-offwhite"
      >
        Skip to content
      </a>

      <Header />
      <main id="main">{children}</main>
      <Footer />
      <AnalyticsDelegate />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
