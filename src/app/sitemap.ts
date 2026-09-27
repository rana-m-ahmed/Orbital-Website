import type { MetadataRoute } from "next";
import { services, examples } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

const publicRoutes = [
  "/",
  "/services",
  "/work",
  "/how-we-work",
  "/about",
  "/start-project",
  ...services.map((service) => `/services/${service.slug}`),
  ...examples.map((example) => `/work/${example.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: absoluteUrl(route),
  }));
}
