# ORBITAL revamp validation

Recorded 26 September 2026 on branch `revamp/orbital-premium-v1`.

## Result

The redesign is implemented and available as a local production preview. Functional, build and automated accessibility checks pass. The mobile LCP target is not yet met in the documented local Lighthouse test. Production launch remains pending verified configuration and a real delivery test.

## Checks performed

| Check | Result |
| --- | --- |
| Locked dependency installation | `npm ci` passed |
| TypeScript and ESLint | Passed |
| Production build | Passed; all existing routes and three work slugs retained |
| Contact delivery unit tests | 5 passed |
| Chromium, Firefox and WebKit browser suite | 34 passed, 2 intentionally skipped |
| Final targeted Chromium regression checks | 3 passed: reduced motion/WebGL unavailable, no JavaScript, WebGL context loss |
| Automated accessibility | Core eight routes passed axe WCAG checks in all three browsers |
| Responsive screenshot matrix | 19 route/viewport combinations; no horizontal overflow |
| Social artwork | HTTP 200, visually reviewed at 1200 × 630 |
| Git whitespace check | Passed |

The two skips are the explicit WebGL context-loss test in Firefox and WebKit; Chromium covers that lifecycle. Static fallback is tested across all browsers. Automated accessibility checks do not establish complete WCAG conformance.

The browser suite covers every marketing route at mobile width, desktop and mobile navigation, Escape/focus behavior, tabs, keyboard carousel controls, integration selections, form error recovery and success, API validation, missing delivery configuration, burst rate limiting, branded 404, reduced motion and essential content without JavaScript. Provider success/failure behavior is tested with injected transport responses; no test sends actual email.

## Visual review

Homepage reviewed at 320, 390, 768, 1440 and 1920 px. Work, About, Contact, Software, Websites & Apps, Integrations and Automation captured at 390 and 1440 px. Reviewed the original-symbol static artwork, enhanced desktop 3D scene, navigation, typography, service compositions, interface previews, carousel, contact and footer. Screenshots and the overflow report are in ignored `artifacts/`.

Reproduce against a running production preview:

```powershell
$env:CAPTURE_BASE_URL='http://localhost:3001'
node scripts/capture.mjs
$env:TEST_BASE_URL='http://localhost:3001'
npm.cmd run test:e2e
```

## Mobile performance measurement

Lighthouse 13.5.0, Chromium 153 on Windows, local `next start` production server over HTTP. Mobile emulation: 412 × 823, DPR 1.75, simulated 150 ms RTT / 1,638.4 Kbps throughput / 4× CPU slowdown. Browser cache reset by Lighthouse. No parallel browser suite ran during this measurement. This is a lab measurement, not field data or a guarantee for a deployed origin.

| Metric | Final measured result | Target |
| --- | --- | --- |
| LCP | 3.5 s | ≤ 2.5 s — not met |
| CLS | 0 | ≤ 0.1 — met |
| First contentful paint | 2.1 s | Recorded |
| Total blocking time | 580 ms | Recorded |
| Performance score | 72 / 100 | Recorded |
| Accessibility / best practices / SEO | 100 / 100 each | Automated audit only |

Measured transferred resources: 347 KB total, including 161 KB JavaScript, 82 KB fonts, 41 KB images and 18 KB CSS (rounded, includes transfer overhead). Mobile does not request the desktop Three.js enhancement. The original PNGs remain intact; the display mask uses a 29 KB WebP. Local fonts avoid third-party requests. The contact client no longer imports the Zod validator.

The LCP element is the hero headline. Remaining investigation should focus on font/render scheduling and main-thread hydration on the actual hosting environment. Earlier local runs varied in CPU blocking, so no stronger performance claim is made. Re-run on the final HTTPS origin and assess field data when available.

```powershell
$env:TEST_BASE_URL='http://localhost:3001'
node scripts/audit-performance.mjs
```

The complete final machine-readable report is `artifacts/lighthouse-mobile.json` (ignored).

## Before public launch

- Configure the verified production URL and email sender/inbox; rebuild public metadata.
- Complete a real enquiry delivery test with the verified provider configuration.
- Review the draft legal content for the actual business.
- Confirm trusted proxy IP handling and use shared rate-limit storage if deploying multiple instances.
- Enable HTTPS enforcement on the real HTTPS origin.
- Resolve/re-measure the LCP shortfall before claiming the performance target is satisfied.

No production deployment or merge was performed.
