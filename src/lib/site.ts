export const SITE = {
  name: "ORBITAL",
  descriptor: "Automation · Software · Systems",
  tagline: "Systems in motion.",
  description:
    "ORBITAL is an automation-first technology company. We remove repetitive work, connect the tools you already use, and build custom software when existing tools are not enough.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://orbital.example.com",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@orbital.systems",
  linkedin: "https://www.linkedin.com/company/orbital",
  primaryCta: "Start a project",
} as const;

export type NavChild = {
  label: string;
  href: string;
  blurb: string;
};

export const AUTOMATION_CHILDREN: NavChild[] = [
  {
    label: "AI Receptionist",
    href: "/automation/ai-receptionist",
    blurb: "Answer every call.",
  },
  {
    label: "Lead Automation",
    href: "/automation/lead-automation",
    blurb: "Follow up faster.",
  },
  {
    label: "Customer Support",
    href: "/automation/customer-support",
    blurb: "Resolve or hand off.",
  },
  {
    label: "Operations Automation",
    href: "/automation/operations-automation",
    blurb: "Remove repetitive admin.",
  },
];

export type NavItem = {
  label: string;
  href: string;
  menu?: boolean;
};

/* §5 — top-level navigation. Integrations is deliberately NOT top level (§6). */
export const NAV: NavItem[] = [
  { label: "Automation", href: "/automation", menu: true },
  { label: "Software", href: "/software" },
  { label: "Websites & Apps", href: "/websites-apps" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
];

/**
 * §5 — at the very top of a page the header is transparent and matches the
 * hero. Once sticky it uses one universal Midnight treatment everywhere, so
 * this map only ever describes the first viewport.
 */
const DARK_HERO_ROUTES = [
  "/",
  "/automation",
  "/automation/ai-receptionist",
  "/automation/customer-support",
  "/software",
  "/websites-apps",
  "/work",
];

export function heroToneFor(pathname: string): "light" | "dark" {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path.startsWith("/work/")) return "dark";
  return DARK_HERO_ROUTES.includes(path) ? "dark" : "light";
}

export const FOOTER_NAV = [
  {
    title: "Automation",
    links: AUTOMATION_CHILDREN.map(({ label, href }) => ({ label, href })),
  },
  {
    title: "Build",
    links: [
      { label: "Software", href: "/software" },
      { label: "Websites & Apps", href: "/websites-apps" },
      { label: "Integrations", href: "/integrations" },
      { label: "Work", href: "/work" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "LinkedIn", href: SITE.linkedin },
    ],
  },
] as const;
