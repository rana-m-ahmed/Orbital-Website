# ORBITAL implementation

Current presentation: the user-approved whole-site studio redesign replaces the earlier chapter-based homepage. See HOMEPAGE_PLAN_AUDIT.md and QA_RESULTS.md for current design decisions and evidence. Configuration and lead-delivery notes below still apply.

Built from the supplied v3 plan and production prompt. The empty working tree was treated as intentional; deleted legacy files were not restored.

## Run

Use Node 22 or later and npm. On Windows PowerShell, use `npm.cmd` if script execution is restricted.

```sh
npm install
npm run dev
```

Preview: http://localhost:3000. Production: `npm run build` followed by `npm start`.

## Configuration

Copy `.env.example` to `.env.local` and configure your deployment environment separately.

- Canonical domain: `https://reachorbital.tech`.
- Lead recipient: `operations@reachorbital.tech`.
- `LEAD_STORAGE_DIR`: absolute private directory on a persistent volume. Required in production. This implementation is for a long-running Node host with durable storage; ephemeral serverless disk is unsuitable.
- `RESEND_API_KEY` and `LEAD_EMAIL_FROM`: configure a Resend account and verify the sending domain. No credentials are included in the repository.
- `CRON_SECRET`: random server-only secret. Schedule an authenticated POST to `/api/leads/retry` to retry saved, undelivered requests. Never expose this endpoint's secret to client code.
- `SITE_INDEXABLE`: production builds are indexable by default; set false for previews and staging. Development defaults to noindex. Metadata and robots are generated at build time.

The form validates on both client and server, applies a honeypot and process-local rate limiting, saves each lead in a private file with a filesystem sync, and only then attempts email delivery. Provider errors do not destroy saved leads. The retry endpoint processes up to 25 pending requests with provider idempotency keys. Rate limiting at the trusted hosting proxy is also required for public deployment, especially with multiple replicas. Restrict and back up the lead volume; agree a retention policy and purge expired records.

## Creative decisions

- Hero uses geometry traced from the supplied logo, extruded with beveled edges. The desktop scene mounts on the next animation frame, with no timed delay. A 2.2-second handoff settles into the silhouette. Pointer tilt and scroll depth render on demand; rendering pauses offscreen and in hidden tabs. Mobile, reduced motion, Save-Data and unavailable/lost WebGL retain the matching SVG.
- Homepage combines a substantial automation showcase and the restored call-to-booking sequence with interactive website and software demonstrations, three process steps and the project CTA. All offerings and explanations remain visible without selecting a control.
- Websites, apps and automation examples use fictional internal-demo records. No clients, results, testimonials or integrations are claimed. No pinned sections, carousel or horizontal navigation is used.
- Shared typography uses Instrument Sans for headings and Geist for body and controls. SVG illustrations and branded mockups remain original artwork.
- Every public page has a unique title and description, canonical URL, Open Graph and Twitter metadata. The generated 1200 x 630 social image, sitemap, production indexing and Organization structured data are included. SEO checks do not guarantee rankings.
- Insights is omitted because no editorial inventory was provided.
- No analytics, replay, booking vendor or CRM is activated without configuration.
- The plan references exact form fields and legal/brand details in v2, which was not supplied. The implementation uses a short qualification form and documents remaining factual launch inputs.

## Launch inputs still needed

Email provider credentials and verified sender; production host and persistent lead storage; legal entity and jurisdiction; data retention policy; approved legal copy; any actual client work or team material; optional booking/analytics decisions. The privacy and terms pages state the current implementation honestly and must receive those factual updates before launch.

## Verification

`npm run lint`, `npm run typecheck`, `npm run build`, and `npm test`.

Playwright starts or reuses a local development server. It checks canonical routes, invalid routes, seven viewport widths, interaction state, runtime errors, natural scrolling, reduced motion, static HTML, no-JavaScript submission, automated accessibility and durable lead capture. Screenshots are written to the ignored `test-results` directory. Automated checks do not replace real Safari, Android, screen-reader and post-launch field performance testing.
