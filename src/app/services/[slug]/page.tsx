import { pageMetadata, absoluteUrl } from "@/lib/seo";
import { notFound } from "next/navigation";
import { ServicePage, servicePageSpecs } from "@/components/ServicePage";

const seoBySlug: Record<
  string,
  { title: string; description: string; serviceType: string }
> = {
  "websites-apps": {
    title: "Business Websites & Customer Apps",
    description:
      "Design and build responsive business websites, booking journeys and customer web apps that help service businesses turn visits into useful next steps.",
    serviceType: "Business websites and customer web applications",
  },
  "ai-receptionist": {
    title: "AI Receptionist for Service Businesses",
    description:
      "AI receptionist systems for service businesses that answer approved questions, capture caller details, arrange appointments and hand off when a person is needed.",
    serviceType: "AI receptionist and customer call handling",
  },
  "ai-calling-agents": {
    title: "AI Calling Agents for Customer Follow-Ups",
    description:
      "Permission-based AI calling agents for reminders and customer follow-ups, with identification, opt-out handling and human escalation designed into the workflow.",
    serviceType: "AI calling agents and customer follow-up automation",
  },
  "workflow-automation": {
    title: "Business Workflow Automation Services",
    description:
      "Workflow automation for service businesses that connects repeatable tasks, moves information between tools and keeps exceptions visible for human review.",
    serviceType: "Business workflow automation",
  },
  "custom-software": {
    title: "Custom Software for Service Businesses",
    description:
      "Custom software for service businesses, from internal dashboards to operational tools that bring bookings, tasks and customer information into one focused system.",
    serviceType: "Custom business software development",
  },
};

export function generateStaticParams() {
  return Object.keys(servicePageSpecs).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = servicePageSpecs[slug];
  const seo = seoBySlug[slug];

  if (!s || !seo) {
    return pageMetadata("Page Not Found", "Page not found.", "/services/" + slug);
  }

  return pageMetadata(seo.title, seo.description, "/services/" + slug);
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = servicePageSpecs[slug];
  const seo = seoBySlug[slug];
  if (!s || !seo) notFound();

  const url = absoluteUrl("/services/" + slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": url + "#service",
        name: seo.title,
        serviceType: seo.serviceType,
        description: seo.description,
        url,
        provider: { "@id": absoluteUrl("/") + "#organization" },
        areaServed: "Worldwide",
      },
      {
        "@type": "BreadcrumbList",
        "@id": url + "#breadcrumbs",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: absoluteUrl("/services"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: s.name,
            item: url,
          },
        ],
      },
    ],
  };

  return (
    <>
      <ServicePage spec={s} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
