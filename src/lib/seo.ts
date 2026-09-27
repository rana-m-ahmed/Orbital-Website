import type { Metadata } from "next";
import { baseUrl } from "./content";

export const siteDescription =
  "ORBITAL builds websites, apps, custom software and business automation, including AI receptionists, customer follow-ups and connected workflows.";
export const isIndexable =
  process.env.SITE_INDEXABLE === "true" ||
  (process.env.NODE_ENV === "production" &&
    process.env.SITE_INDEXABLE !== "false");

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const socialTitle = `${title} | ORBITAL`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "ORBITAL",
      title: socialTitle,
      description,
      url: baseUrl + (path === "/" ? "" : path),
      locale: "en_US",
      images: [
        {
          url: "/opengraph-image",
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
      images: ["/opengraph-image"],
    },
  };
}
