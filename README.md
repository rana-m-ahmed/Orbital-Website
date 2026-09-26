# ORBITAL

Automation · Software · Systems

A bespoke Next.js marketing website using the original ORBITAL identity, General Sans and Switzer, a floating navigation system, a progressively enhanced Three.js hero, interactive workflow demonstrations and a native-scroll Labs carousel.

## Run locally

Use Node 22.18+ (the delivery unit tests use native TypeScript support).

```sh
npm ci
npm run dev
```

On Windows PowerShell with restricted script execution, use `npm.cmd` / `npx.cmd`.
Copy `.env.example` to `.env.local` only when configuring real local delivery. An unconfigured form returns an error; it never pretends to deliver an enquiry.

## Validate

```sh
npm test
npm run build
npx playwright install chromium firefox webkit
npm run test:e2e
```

The browser suite starts an isolated production server on port 3100. To use an already-running build, set `TEST_BASE_URL` to its origin. Run against a local test server without real email credentials: the API suite deliberately checks missing-configuration behavior. UI delivery success is mocked; provider acceptance is covered by unit tests. No test sends email.

`node scripts/capture.mjs` writes responsive screenshots to `artifacts/` using the local development server. Set `CAPTURE_BASE_URL` to capture a production preview instead.

## Architecture

- Server-rendered pages and shared layouts preserve every existing route and work slug.
- `Header`, workflow demos, carousel and contact form are small client boundaries.
- The hero imports Three.js/React Three Fiber only on eligible desktop screens, after initial content is visible. Mobile, reduced motion, unavailable WebGL, rendering failures and context loss retain a static composition using the official symbol silhouette.
- Native scrolling; no scroll interception, autoplay carousel, or recurring animation.
- General Sans and Switzer are locally hosted official webfonts. Their foundry licenses are stored beside the fonts.
- Reference projects retain their existing content type and are visibly labeled concept demonstrations.
- Contact validation runs on the server. The client imports only option labels, not Zod. Missing configuration, network failures, provider rejection and missing acceptance IDs cannot produce success.
- Analytics retains the existing provider-agnostic event API; no tracking vendor is installed.

See `docs/DESIGN_SYSTEM.md` for the visual system and `REVAMP_STATUS.md` for validation and launch requirements.

## Production configuration

Configure `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CONTACT_EMAIL`, `RESEND_API_KEY`, `CONTACT_INBOX`, and a verified `CONTACT_FROM`. Rebuild after changing public values. `NEXT_PUBLIC_LINKEDIN_URL` is optional; unverified profiles are omitted. Set `ORBITAL_ENFORCE_HTTPS=true` only on an HTTPS deployment; it remains off for HTTP local previews.

The existing rate limiter is in-memory and assumes a trusted reverse proxy sets client-IP headers. Multi-instance hosting requires a shared rate-limit store. Verify real delivery, domain metadata and the draft legal content before public launch. Deployment is not part of the local redesign.
