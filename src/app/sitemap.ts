import type { MetadataRoute } from "next";
import { WORK } from "@/content/work";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = [
    { path: "/", priority: 1 },
    { path: "/automation", priority: 0.9 },
    { path: "/automation/ai-receptionist", priority: 0.9 },
    { path: "/automation/lead-automation", priority: 0.9 },
    { path: "/automation/customer-support", priority: 0.8 },
    { path: "/automation/operations-automation", priority: 0.8 },
    { path: "/software", priority: 0.9 },
    { path: "/websites-apps", priority: 0.8 },
    { path: "/integrations", priority: 0.8 },
    { path: "/work", priority: 0.7 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.9 },
  ];

  return [
    ...routes.map((route) => ({
      url: `${SITE.url}${route.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: route.priority,
    })),
    ...WORK.map((item) => ({
      url: `${SITE.url}/work/${item.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
