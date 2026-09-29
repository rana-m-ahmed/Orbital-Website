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
- `RESEND_API_KEY`, `LEAD_EMAIL_FROM` and `LEAD_EMAIL_TO` are all required for project enquiries. Configure Resend, verify the sending domain and use `operations@reachorbital.tech` as the recipient. No credentials are included in the repository.
- `SITE_INDEXABLE`: production builds are indexable by default; set false for previews and staging. Development defaults to noindex. Metadata and robots are generated at build time.

The form validates on both client and server, applies a honeypot and process-local rate limiting, and awaits Resend's HTTPS API before reporting success. Delivery uses a per-request idempotency key and an eight-second timeout. Missing configuration, provider rejection, malformed responses, network failures and timeouts all fail closed. Enquiries are not persisted by the application; Resend and the receiving mailbox may retain them under their applicable policies. Rate limiting at the trusted hosting proxy is also required for public deployment, especially with multiple replicas.

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

Email provider credentials and verified sender; legal entity and jurisdiction; data retention policy; approved legal copy; any actual client work or team material; optional booking/analytics decisions. The privacy and terms pages state the current implementation honestly and must receive those factual updates before launch.

## Verification

`npm run lint`, `npm run typecheck`, `npm run build`, and `npm test`.

The unit suite mocks Resend and covers request construction plus every delivery outcome without sending real email. Playwright starts or reuses a local development server and checks canonical routes, invalid routes, seven viewport widths, interaction state, runtime errors, natural scrolling, reduced motion, static HTML, native form validation and automated accessibility. Screenshots are written to the ignored `test-results` directory. Automated checks do not replace a labelled production delivery test, real Safari, Android, screen-reader and post-launch field performance testing.
