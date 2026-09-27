# Final integration: automation, websites and software

Latest correction: automation has equal prominence again. Homepage order is hero, automation showcase (reception, follow-ups and connected records), restored three-state booking story, interactive website preview, interactive software/client-app preview, process and CTA. This intentionally supersedes the prior six-section composition to restore the requested older automation material.

Services uses the same expanded automation showcase alongside websites and software. No new backend or form-value changes. The Services glyph is replaced by a real SVG chevron. Site headings consistently use Instrument Sans and body/controls Geist; the additional Georgia display styling is removed. Hero enhancement has no timed delay and responds more strongly to pointer and native scrolling, with reduced-motion/GPU fallbacks preserved.

Production SEO is centralized in src/lib/seo.ts: unique page metadata, social previews, canonicals and indexing defaults. robots.txt allows public pages and excludes API routes; explicit SITE_INDEXABLE=false still protects preview deployments. The sitemap and Organization schema are preserved. Full validation is in QA_RESULTS.md.

---

# Current update: websites, apps and software

The latest user request broadens the presentation beyond automation. The current six homepage sections are: hero, interactive website preview, software workspace and client app, automation feature, process, and conversion. The former four-card services grid and repeated gallery are replaced on the homepage. Essential offerings remain visible without selecting tabs.

A Websites & Apps service page is now included in navigation and sitemap. Services, Work and Custom Software feature the same interactive demonstrations; About and enquiry copy reflect the wider scope. This intentionally updates the earlier no-new-routes boundary in response to the latest request. Backend lead handling is unchanged.

Research, interaction decisions and implementation details: DIGITAL_EXPERIENCE_RESEARCH.md. Current validation: QA_RESULTS.md.

---

## Previous redesign audit (historical context)

# ORBITAL whole-site design audit

The user-approved simpler, visual website plan supersedes the previous homepage-only refinement. The v3 master plan supplies branding and quality criteria; its long chapter order and selector-driven interactions are intentionally replaced.

## Homepage: six sections

1. Hero: supplied SVG/3D geometry and single handoff retained, plain-language description and direct service anchor.
2. Services: four visible illustrated offerings; no tabs or hidden descriptions.
3. Booking story: three readable states in normal flow on a navy background.
4. Examples: one large booking interface and two aligned enquiry/dashboard previews; visible internal-demo labels and existing destination links.
5. Process: three illustrated steps, with testing, documentation and human handoffs explained.
6. Conversion: one project CTA and the existing contact email.

## v3 chapter coverage and intentional adaptations

| Chapter | Final implementation |
| --- | --- |
| 13.01 Navigation | Current navbar design and actual branding retained; readable links and native mobile menu. |
| 13.02 Hero | Existing logo SVG, beveled WebGL scene, fallback and capability gates retained. Copy explains tasks directly. |
| 13.03 Recognition | Six-option selector removed. The four service descriptions name familiar everyday problems immediately. |
| 13.04 Workflow | Six-stage pinned board replaced by a visible three-stage call-to-booking story. No pinning or scroll interception. |
| 13.05 Outcomes | Separate slogan interlude removed; each example explains its practical result. |
| 13.06 Services | Four fully visible illustrated offerings replace family selection. |
| 13.07 Playground | Carousel removed. Essential examples are visible in the gallery and on existing demo routes. |
| 13.08 Work | Booking, enquiry and dashboard previews; native vertical flow at every width; two existing demo pages retained. |
| 13.09 Before/after | Toggle removed. Starting situation and resulting next step are explained on demo pages. |
| 13.10 Process | Three understandable stages with brief, prototype and handover artwork. |
| 13.11 Reliability | Practical capabilities and testing/handoff copy replace technical matrix and tool endorsements. |
| 13.12 Trust | Concrete testing, documentation and walkthrough practices; no invented proof. |
| 13.13 Brand close | Redundant slogan section removed; actual brand artwork appears on About and in the footer. |
| 13.14 Conversion | Existing project route and lead handling; simple invitation and contact email. |
| 13.15 Footer | Large wordmark, email and readable legal navigation; repeated tagline removed. |

## Whole-site delivery

- Services index: four illustrated offers. Each detail page has its own service visual, three capabilities, one example and a CTA.
- Work index: two internal examples. Detail pages show one scenario rather than multi-option diagrams.
- How we work: three visible stages and deliverables.
- About: service-business focus, supplied brand artwork and concrete working practices.
- Project form: existing fields and action preserved; legible hints, error text, consent and success state.
- Privacy and terms: readable document layout and direct titles; substantive content and outstanding factual notices retained.
- Shared styling rebuilt in globals.css, with retained navigation styling isolated in navigation.css. Superseded homepage CSS and interactive components removed.

## Cross-cutting requirements

- Warm light backgrounds, navy feature stage, restrained blue, consistent gutters and aligned layouts.
- Body text 18px desktop / 16px mobile; supporting labels at least 14px. Larger interface layouts replace schematic fragments.
- Primary content is server-rendered semantic HTML. No content selector, scroll pin, marquee, autoplay or extra WebGL scene.
- Reduced motion disables transitions and the WebGL enhancement; SVG and content remain. Native links and details remain usable without JavaScript.
- Hero and all mock interfaces are illustrations. Customer names, appointments and figures are fictional, labelled internal demos.
- No routes, public APIs, production domain, email destination, lead persistence or delivery configuration changed.
- No fabricated customers, results, testimonials, integrations or company history.

See QA_RESULTS.md for measured results and retained screenshot locations. The latest redesign is the current implementation; earlier implementation notes describe superseded presentation choices.
