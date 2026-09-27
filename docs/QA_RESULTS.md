# ORBITAL redesign QA - 27 September 2026

Validated against the local production build in Chromium. This report supersedes the previous homepage-interaction audit.

| Check | Result |
| --- | --- |
| ESLint | Pass |
| TypeScript | Pass |
| Production build | Pass |
| Playwright | 18 tests passed on the final integrated production build |
| Routes and metadata | All 15 public pages return 200, one H1 each, correct canonical URLs; invalid service route returns 404 |
| Responsive layouts | All 15 pages checked at 1440, 1280, 1024, 768, 430, 390 and 360px; no horizontal document overflow |
| Short laptop | Homepage at 1440 x 720; normal document flow, accessible CTA and no pin spacers |
| Accessibility | No automated WCAG A/AA violations from Axe on all 15 routes at 1440 and 390px |
| Navigation | Keyboard activation of example links, mobile menu, service navigation and resize pass |
| New interactions | Keyboard Desktop/Mobile switching, distinct website concepts, software approval and reset pass |
| Hero motion | Immediate next-frame mount (no 1.7-second timer); pointer image changes, native scrolling and GPU recovery pass |
| SEO | 15 unique titles/descriptions; canonicals, Open Graph images, PNG social asset and sitemap pass. Production robots: index, follow; robots.txt allows public pages and excludes API |
| Services control | Text label retained; Unicode glyph replaced by accessible SVG chevron |
| Homepage content | Seven sections; automation showcase and booking story restored alongside website and software previews; content available without controls |
| Reduced motion | No WebGL canvas; static SVG and complete content remain |
| WebGL failure | Forced GPU context loss removes canvas and restores SVG |
| JavaScript disabled | Website, workspace and client-app previews remain visible; optional controls disabled; project form submits successfully |
| Project form | Required validation, success state and private lead persistence pass |
| API security regression | Unauthenticated lead retry request rejected |

## Visual review

Full-page screenshots were captured for all 15 public routes at all seven widths. Visual review included the complete homepage at desktop and 360px, website and software detail pages, the expanded automation showcase at desktop/mobile, the restored booking story, the tablet software composition, both website concepts and the approved software state. Essential information remains outside decorative overlaps; on mobile the companion app follows the workspace in normal flow.

Full-page evidence is retained in `test-results/redesign/<width>/`: 15 routes at each of seven widths (105 screenshots). Additional evidence includes `short-laptop.png`, `no-js-home.png`, `hero-pointer.png`, `hero-scroll.png`, `automation-desktop.png`, `automation-mobile.png`, `booking-desktop.png` and `navigation.png`. Earlier website/software detail, concept and approval-state closeups are retained in the archived evidence. Isolated detail captures hide the sticky header for unobstructed inspection; full-page captures preserve it.

The preceding redesign evidence is archived in `data/qa/pre-final-integration/redesign/` and `data/qa/pre-digital-expansion/`. These local review folders are ignored by Git. Re-running Playwright clears test-results, so archive evidence first when comparing revisions.

## Performance and SEO

Measured separately after all browser tests completed, against the final production server at localhost:3008. Lighthouse 13.5.0, simulated mobile throttling, mobile 412 x 823 at DPR 1.75.

| Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- |
| 90 | 100 | 100 | 100 | 2.8 s | 160 ms | 0 |

This is one current lab run, not a median or a field performance claim. Raw JSON and HTML reports are `test-results/redesign/mobile-lighthouse.report.*`. The audit completed with no runtimeError and wrote both reports; afterward the CLI exited with Windows EPERM when deleting its temporary Chrome profile. Saved results remain valid.

The prior noindex preview measurements are archived under `data/qa/pre-final-integration/redesign/`. Production indexing is now enabled by default, with an explicit SITE_INDEXABLE=false override for previews. Unique metadata and social previews follow Google Search Central guidance: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics . An automated SEO score is not a ranking guarantee.

## Existing launch requirements, unchanged by the redesign

- Configure and verify actual email delivery to operations@reachorbital.tech. This task verifies local persistence, not delivery through unconfigured production credentials.
- Confirm the production host's private persistent lead storage and scheduled retry configuration.
- Complete the existing legal-entity, jurisdiction, hosting and retention facts before launch.
- Test real Safari, Firefox, iOS, Android and assistive technology; monitor field performance after deployment.

No client work, testimonials, production integrations or performance improvements were fabricated. Example records and figures are fictional and labelled as internal demos.
