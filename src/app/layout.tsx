import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SITE } from "@/lib/site";

/* Self-hosted variable fonts (§39): one file per family, no third-party request. */
const sora = localFont({
  src: "../fonts/sora-variable.woff2",
  variable: "--font-sora",
  weight: "400 700",
  style: "normal",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const inter = localFont({
  src: "../fonts/inter-variable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  style: "normal",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Business Automation, Software & Systems`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en",
    url: SITE.url,
    title: `${SITE.name} — Business Automation, Software & Systems`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Business Automation, Software & Systems`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#090D14",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
