import type { Metadata } from "next";
import { baseUrl } from "./content";

export const siteName = "ORBITAL";
export const siteDescription =
  "ORBITAL builds websites, apps, custom software and business automation, including AI receptionists, customer follow-ups and connected workflows.";

export const isIndexable =
  process.env.SITE_INDEXABLE === "true" ||
  (process.env.NODE_ENV === "production" &&
    process.env.SITE_INDEXABLE !== "false");

export function absoluteUrl(path = "/") {
  if (path === "/") return baseUrl + "/";
  return baseUrl + (path.startsWith("/") ? path : "/" + path);
}

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const canonical = absoluteUrl(path);
  const socialTitle = `${title} | ${siteName}`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: {
      index: isIndexable,
      follow: true,
      googleBot: {
        index: isIndexable,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      siteName,
      title: socialTitle,
      description,
      url: canonical,
      locale: "en_US",
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: "ORBITAL - Websites, software and automation",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [absoluteUrl("/opengraph-image")],
    },
  };
}
