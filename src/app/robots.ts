import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/content";
import { isIndexable } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: isIndexable ? "/" : undefined,
      disallow: isIndexable ? "/api/" : "/",
    },
    sitemap: baseUrl + "/sitemap.xml",
    host: baseUrl,
  };
}
