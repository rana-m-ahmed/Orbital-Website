import type { MetadataRoute } from "next";
import { services, examples, baseUrl } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/services",
    "/work",
    "/how-we-work",
    "/about",
    "/start-project",
    "/privacy",
    "/terms",
    ...services.map((s) => "/services/" + s.slug),
    ...examples.map((p) => "/work/" + p.slug),
  ].map((route) => ({
    url: baseUrl + route,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
