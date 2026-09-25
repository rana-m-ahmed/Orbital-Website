# ORBITAL Premium Website Revamp — Master Implementation Plan

Status: ACTIVE  
Branch: `revamp/orbital-premium-v1`  
Baseline: `main@b21612f0d4524aa23f8f30b1f62a9fdbcfa95672`

## 1. Goal

Turn ORBITAL from a technically sound but visually conservative marketing site into a premium, conversion-focused technology brand experience without sacrificing accessibility, performance, honesty, maintainability, or production reliability.

The central experience model is:

**SIGNAL → SYSTEM → RESULT**

The business model remains:

**AUTOMATE → CONNECT → BUILD**

The visual language is derived from four recurring primitives:

- **Node** — work or an event in motion
- **Orbit** — a controlled system
- **Route** — movement of data/work
- **Surface** — the product/interface people use

## 2. Locked engineering decisions

- Keep Next.js App Router, React, TypeScript, Tailwind and Zod.
- Preserve Server Components by default.
- Use CSS for micro-interactions.
- Use GSAP for orchestration and scroll choreography.
- Use Three.js + React Three Fiber + Drei only for targeted 3D experiences.
- Do not add Motion unless a future requirement cannot be served cleanly by the locked stack.
- Lenis is conditional, not default.
- WebGL is progressive enhancement and must always have a designed static fallback.
- No critical information may exist only inside canvas/WebGL.
- No fake clients, testimonials, metrics, integrations, awards or deployment claims.

## 3. Branch / change policy

- `main` remains stable.
- All work lands on `revamp/orbital-premium-v1`.
- Changes are incremental and gated.
- Each increment follows: inspect → scope → implement → read back → validate → QA → amend → update status.
- No uncontrolled full-site rewrite.
- No branch explosion unless a specific recovery need appears.

## 4. Phase plan

### Phase 00 — Baseline and governance
- Create revamp branch.
- Add masterplan, QA matrix and revamp status.
- Record baseline repository state.
- No behavior changes.

### Phase 01 — Security and production baseline
- Verify/upgrade supported Next.js patch release.
- Add `typecheck` and test scripts.
- Add environment validation.
- Fix contact delivery semantics so production can never report success if no delivery provider is configured.
- Preserve dev-only logging fallback.
- Validate real domain/email configuration path.

### Phase 02 — Official brand foundation
- Ingest supplied ORBITAL assets.
- Replace invented wordmark/symbol implementation.
- Create brand components: mark, wordmark, lockup.
- Add proper favicon/social mark sources.
- Prefer original vector source when available.

### Phase 03 — Design system v2
- Rewrite semantic color tokens from the official brand.
- Define grid, containers, spacing, surfaces and typography hierarchy.
- Rebuild buttons and focus states.
- Create Node / Orbit / Route / Surface primitives.
- Commit `docs/ORBITAL_DESIGN_SYSTEM.md`.

### Phase 04 — Marketing shell
- Rebuild header, mega menu, mobile nav, footer and shared CTA.
- Simplify primary navigation while preserving existing SEO routes.
- Preserve full keyboard/focus behavior.

### Phase 05 — Static homepage reconstruction
Rebuild homepage into:
1. Hero
2. Friction
3. System Journey
4. Live Automation
5. ORBITAL Labs
6. Product Engineering
7. Integrations
8. Trust
9. Team Preview
10. Final Orbit

No complex motion yet. Static screenshots must already feel premium.

### Phase 06 — Motion foundation
- Add GSAP and `@gsap/react`.
- Centralize reduced-motion behavior.
- Add scoped motion primitives.
- Replace generic global reveal behavior.
- Prove StrictMode/navigation cleanup.

### Phase 07 — 3D foundation
- Add Three.js, R3F and Drei.
- Create a small ORBITAL mark scene.
- Add FULL / REDUCED / STATIC quality tiers.
- Add WebGL failure fallback.
- Use demand rendering where possible.

### Phase 08 — Signature hero
- Upgrade the static hero with the real ORBITAL mark.
- Content and CTA render immediately.
- 3D enhances after first paint.
- Subtle pointer response only.
- Mobile gets a different composition, not a shrunken desktop layout.

### Phase 09 — Friction + Automate / Connect / Build
- Animate disconnected business systems into a coherent network.
- Implement the primary scroll narrative.
- Integrate the signal node only after DOM/SVG choreography passes independently.

### Phase 10 — Commercial proof
- Refactor Live Automation.
- Reframe reference systems as ORBITAL Labs / system demonstrations.
- Upgrade product surfaces to believable application UI.
- Build controlled integration-network interaction.

### Phase 11 — Homepage completion
- Trust section.
- Team preview with real people only.
- Final Orbit / conversion close.
- Metadata and homepage QA.

### Phase 12 — Automation service family
Implement a shared service-page system, then:
- `/automation`
- `/automation/ai-receptionist`
- `/automation/lead-automation`
- `/automation/operations-automation`
- `/automation/customer-support`

One signature interaction per page.

### Phase 13 — Build and integration pages
- `/software`
- `/websites-apps`
- `/integrations`

### Phase 14 — Work, About and Contact
- Split Work into Client Work and ORBITAL Labs when real client work exists.
- Rebuild case-study structure.
- Add real team/founder trust.
- Rebuild contact conversion experience.

### Phase 15 — Production conversion infrastructure
- Production email delivery.
- Distributed rate limiting if deployment requires it.
- Optional anti-spam escalation only if needed.
- Error monitoring.
- Optional scheduling loaded only on intent.

### Phase 16 — Analytics, SEO and launch media
- Connect one analytics provider.
- Validate metadata, schema, sitemap and robots.
- Add branded OG/social imagery.
- Track decisions, not decorative interactions.

### Phase 17 — Final QA and launch
- Playwright E2E.
- Axe accessibility checks.
- Reduced-motion tests.
- Visual regression.
- Chromium / Firefox / WebKit.
- Typecheck / lint / build.
- Performance and bundle audit.
- Launch checklist.

## 5. Quality gates

Every phase receives one of:

- PASS
- PASS WITH FOLLOW-UP
- BLOCKED
- FAIL

Only PASS (or an explicitly accepted follow-up) authorizes the next phase.

## 6. Visual checkpoints

User review is especially valuable after:
- Phase 03 — design system
- Phase 05 — static homepage
- Phase 08 — signature hero
- Phase 11 — complete homepage

## 7. Performance principles

- Do not make the whole site WebGL.
- Prefer one targeted, reusable experience layer.
- Lazy-load 3D.
- Limit DPR and expensive post-processing.
- Reuse geometry/materials.
- Avoid React state updates in render loops.
- Keep copy/CTA immediately available without waiting for enhancement.
- Prefer static fallback over an error/loading wall.

## 8. Accessibility principles

- Target WCAG 2.2 AA.
- Maintain visible focus.
- Preserve semantic HTML and keyboard interaction.
- Design `prefers-reduced-motion` behavior intentionally.
- Ensure every 3D/animated concept has an equivalent semantic DOM representation.

## 9. Truth / proof policy

- Reference work is always clearly labeled.
- Client work is rendered only after verified client approval.
- Metrics render only when verified.
- Testimonials render only when approved.
- Integration logos use official assets only.
- Team content uses real names, roles and photography only.

## 10. Definition of done

The revamp is complete only when branding, static design, motion, 3D, responsive behavior, accessibility, service pages, proof architecture, contact delivery, analytics, SEO, automated tests, browser QA and production configuration all pass the QA matrix.
