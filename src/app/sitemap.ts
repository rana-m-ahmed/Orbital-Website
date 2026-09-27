import type { MetadataRoute } from "next";
import { services, examples } from "@/lib/content";
import { insights } from "@/lib/insights";
import { absoluteUrl } from "@/lib/seo";

const publicRoutes = [
  "/",
  "/services",
  "/work",
  "/insights",
  "/how-we-work",
  "/about",
  "/start-project",
  ...services.map((service) => `/services/${service.slug}`),
  ...examples.map((example) => `/work/${example.slug}`),
  ...insights.map((insight) => `/insights/${insight.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: absoluteUrl(route),
  }));
}
