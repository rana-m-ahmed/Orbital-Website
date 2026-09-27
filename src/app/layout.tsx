import type { Metadata } from "next";
import { Instrument_Sans, Geist, Geist_Mono } from "next/font/google";
import { Header, Footer } from "@/components/Shell";
import { isIndexable, siteDescription } from "@/lib/seo";
import { baseUrl } from "@/lib/content";
import "./globals.css";
import "./digital.css";
const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const mono = Geist_Mono({
  preload: false,
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "ORBITAL — Systems that keep your business moving",
    template: "%s | ORBITAL",
  },
  description: siteDescription,
  robots: { index: isIndexable, follow: true },
  openGraph: {
    type: "website",
    siteName: "ORBITAL",
    title: "ORBITAL — Systems that keep your business moving",
    description: siteDescription,
  },
  icons: { icon: "/brand/orbital-icon.png" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${instrument.variable} ${geist.variable} ${mono.variable}`}
      >
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ORBITAL",
              url: baseUrl,
              email: "operations@reachorbital.tech",
              logo: baseUrl + "/brand/orbital-symbol.png",
            }).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
