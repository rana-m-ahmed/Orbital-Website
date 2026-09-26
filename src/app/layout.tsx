import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SITE } from "@/lib/site";

/* Official self-hosted webfonts. Only the hero display face is preloaded. */
const generalSans = localFont({
  src: [{ path: "../fonts/general-sans-500.woff2", weight: "500" }],
  variable: "--font-general",
  style: "normal",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const switzer = localFont({
  src: [
    { path: "../fonts/switzer-400.woff2", weight: "400" },
    { path: "../fonts/switzer-500.woff2", weight: "500" },
    { path: "../fonts/switzer-600.woff2", weight: "600" },
  ],
  variable: "--font-switzer",
  preload: false,
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
  themeColor: "#07111D",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${generalSans.variable} ${switzer.variable}`}>
      <body>{children}</body>
    </html>
  );
}
