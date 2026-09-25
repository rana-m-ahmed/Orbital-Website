# ORBITAL Revamp QA Matrix

This file is the acceptance matrix for every implementation increment.

## A. Architecture
- [ ] Server Components remain default where browser state is unnecessary.
- [ ] Client boundaries are deliberate and local.
- [ ] No duplicated animation/runtime frameworks are introduced without justification.
- [ ] Shared behavior is extracted only when reuse is real.
- [ ] No route or content architecture regressions.

## B. Brand
- [ ] Official ORBITAL assets are used where available.
- [ ] No substitute/invented brand mark remains in production UI.
- [ ] Node / Orbit / Route / Surface language is coherent.
- [ ] Blue is functional, not decorative noise.
- [ ] Static screenshots still feel premium without animation.

## C. UX / Conversion
- [ ] Visitor can understand what ORBITAL does quickly.
- [ ] Each commercial page has one clear primary action.
- [ ] Motion explains state/value rather than existing for spectacle.
- [ ] Trust information appears before conversion where appropriate.
- [ ] No unnecessary friction in the enquiry flow.

## D. Accessibility
- [ ] Keyboard navigation works.
- [ ] Focus is visible and logically restored.
- [ ] Semantic headings remain ordered.
- [ ] Interactive controls expose accessible names/states.
- [ ] `prefers-reduced-motion` remains fully usable.
- [ ] Canvas/WebGL contains no unique critical information.
- [ ] Contrast and target sizing meet the project accessibility baseline.

## E. Responsive
- [ ] 375px
- [ ] 390px
- [ ] 430px
- [ ] 768px
- [ ] 1024px
- [ ] 1366px
- [ ] 1440px
- [ ] 1920px
- [ ] No desktop-only interaction is merely shrunk onto mobile.

## F. Motion
- [ ] GSAP timelines are scoped and cleaned up.
- [ ] No duplicate ScrollTriggers after navigation/StrictMode.
- [ ] No perpetual high-cost movement behind reading.
- [ ] One dominant motion event per viewport/scene.
- [ ] Reduced-motion mode resolves to useful static states.
- [ ] Scroll remains understandable and controllable.

## G. 3D / WebGL
- [ ] Enhancement is lazy-loaded.
- [ ] Static fallback is designed.
- [ ] WebGL context failure is handled.
- [ ] DPR is bounded.
- [ ] Expensive post-processing is justified.
- [ ] Scene stops/reduces rendering while idle where practical.
- [ ] Mobile/low-power quality path exists.
- [ ] No memory/resource leak across navigation.

## H. Performance
- [ ] No unnecessary initial JS.
- [ ] Images are responsive/compressed.
- [ ] 3D assets are compressed and small.
- [ ] Fonts are self-hosted and limited.
- [ ] Large dependencies are dynamically imported where appropriate.
- [ ] Core Web Vitals are measured before launch.
- [ ] Bundle growth is reviewed in every major visual phase.

## I. Security / Production
- [ ] Supported Next.js patch release.
- [ ] Server-only secrets are never exposed.
- [ ] Production contact submission cannot falsely succeed without delivery.
- [ ] Validation remains server-side.
- [ ] Rate limiting appropriate to deployment.
- [ ] CSP/security headers remain valid after third-party additions.
- [ ] No secrets committed to Git.

## J. SEO
- [ ] Unique commercial page title/description.
- [ ] Canonical URL.
- [ ] Open Graph / social media metadata.
- [ ] Structured data only where truthful.
- [ ] Sitemap.
- [ ] Robots.
- [ ] No placeholder domain/email in production.

## K. Honesty
- [ ] No fake client logo.
- [ ] No fabricated testimonial.
- [ ] No invented production metric.
- [ ] No implied deployment where only a demo exists.
- [ ] Lab/reference work is clearly labeled.
- [ ] Technology/integration claims are supportable.

## L. Automated validation
Target final commands:
```bash
npm run typecheck
npm run lint
npm run build
npm run test:e2e
```

Final browser matrix:
- Chromium
- Firefox
- WebKit

Final special-mode tests:
- reduced motion
- WebGL unavailable
- slow network
- keyboard-only
