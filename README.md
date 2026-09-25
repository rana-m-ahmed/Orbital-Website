# ORBITAL

**Systems in motion.** — Automation · Software · Systems

A production Next.js implementation of *ORBITAL Premium Website Masterplan v6*.
Every structural decision below traces back to a numbered section of that plan,
and the section numbers appear as comments in the code (`§4`, `§19`, `§36`…).

---

## Running it

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
npm run build && npm run start
npm run lint
```

Node 20+ recommended. The build is clean: no TypeScript errors, no lint errors.

---

## What is here

### Routes (§36, §42)

| Route | Purpose | Signature interaction (§20) |
|---|---|---|
| `/` | Homepage, 10 chapters | Call → booking hero |
| `/automation` | Automation hub | Workflow selector |
| `/automation/ai-receptionist` | AI receptionist | Live call → booking |
| `/automation/lead-automation` | Lead automation | Lead lifecycle |
| `/automation/customer-support` | Support automation | Resolve vs hand off |
| `/automation/operations-automation` | Operations automation | Document route |
| `/software` | Custom software | Scattered work → one product |
| `/websites-apps` | Websites & apps | Product showcase |
| `/integrations` | Integrations | Recipe composer |
| `/work`, `/work/[slug]` | Proof | Project-led, no forced animation |
| `/about` | Company | Minimal motion |
| `/contact` | Conversion | Success settle only |
| `/privacy`, `/terms` | Legal | None |
| `/api/contact` | Form delivery | — |

`sitemap.xml` and `robots.txt` are generated. Every commercial route has its own
title, description, canonical, Open Graph data and `BreadcrumbList`, plus a
`Service` schema where one genuinely applies.

### The four visual primitives (§19)

- `SignalFlow` — Trigger → Route → Action → Result
- `ConversationStage` — waveform, transcript, action, handoff, completion
- `ProductFrame` / `ProductShowcase` — real interface surfaces, not icon diagrams
- `Resolver` — manual, fragmented work reorganising into one automated route

Plus three page-specific interactions built on the same language:
`ResolveOrHandoff`, `ScatterToProduct`, `RecipeComposer`, and the shared
`ProcessRoute`.

### Motion discipline (§10, §12, §13, §38)

- Every demonstration **plays once and stops** on a completion state. Nothing loops.
- Nothing animates off-screen; sequences stop scheduling when out of view.
- One dominant animation per viewport.
- Orbital Blue is used only when work is happening — not on every hover.
- Native scroll. No Lenis, no scroll hijacking, no custom cursor, no pinned scenes.
- **No animation library at all** — see the deviation note below.
- `prefers-reduced-motion` resolves each demo to its resting state and is derived
  at render time, so there is no flash of motion before it is respected.

### One deviation from the plan, and why (§34)

The plan specifies Motion for React as the single animation engine, with GSAP
and Lenis excluded. This build ships **no animation library**, which is one
step further in the same direction.

The reason is §41's fallback rule. Every approved interaction here — entrances,
state transitions, path draws, tab changes, the hero sequence — is a transition
of `transform` and `opacity` between discrete states, which CSS expresses
natively. Motion was used for the hero transcript first, and it broke the no-JS
requirement: its `initial` prop serialises `opacity: 0` into the server-rendered
HTML, so with JavaScript disabled the transcript rendered blank. Doing it in CSS
means the server output *is* the complete, readable graphic and the animation is
pure enhancement.

The result: ~0 KB of animation runtime, a hero that is fully readable before
hydration, and no second library to justify. If a future interaction genuinely
cannot be done this way — a spring-driven drag, a layout transition, an
orchestrated sequence with interruption — install Motion then, for that
component only. That is the rule §34 was protecting.

### Architecture (§36, §37, §38)

Server Components by default. Client boundaries exist only where browser state
is genuinely required: the header and mega menu, the mobile menu, the
demonstrations, the tab and scenario selectors, the recipe composer and the
contact form. Analytics uses **one delegated click listener** for the whole
shell rather than a handler per link (`data-track="…"`).

Fonts are self-hosted variable `woff2` files via `next/font/local` — no
third-party font request at runtime.

### Accessibility (§48)

- `Automation` in the header is a **menu trigger**, not a dual-purpose link:
  disclosure semantics, `aria-expanded`, Enter/Space to open, Escape to close,
  focus returned to the trigger, and the explicit `/automation` route inside the
  panel.
- Mobile menu: scroll-locked, focus-trapped, Escape closes, focus restored.
- Tabs: roving tabindex, arrow/Home/End keys, selected state exposed
  programmatically, and changing a tab never steals focus.
- Every demonstration exposes its states as readable text outside the SVG, plus
  a polite live region.
- Dedicated visible focus ring on every focusable component, tuned per surface.
- FAQs are native `<details>` — fully usable with no JavaScript.

### Colour (§14)

Brand values are unchanged; interface usage follows the accessible tokens.
On light surfaces, body text is Midnight, secondary text is `#5E6876` and
interactive text is `#3158D8`. `#9AA0A6` and `#4F78FF` are never used for
normal-size body text on Off White.

### Honesty rules (§4, §45, §51)

- No client logos, testimonials or production metrics anywhere.
- Every project is typed `client` or `reference`, and reference systems are
  labelled wherever they appear and styled distinctly from client work.
- Reporting screenshots say "demonstration data" on the page.
- Integration logos render as **named tiles** until licensed brand assets are
  supplied — an approximated logo is never drawn, and a missing one cannot
  collapse the layout (§41).
- The About page's team section renders only once real people and real
  photography are added.

### Contact form (§40, §41)

Zod validation on the server, in-memory rate limiting, a honeypot that returns
an ordinary success so bots learn nothing, control-character sanitisation, and
server-only credentials. Designed states: idle, submitting, success, validation
error, server error, network error — and **a failure never erases what was
typed**.

Delivery goes to one monitored inbox through Resend. With `RESEND_API_KEY`
unset the enquiry is written to the server log instead, so a misconfigured
deploy is loud rather than silent. A CRM intake can be added later without
making delivery depend on it.

### Security (§40)

`next.config.ts` sets a Content-Security-Policy, HSTS, `nosniff`, `DENY`
framing, a Referrer-Policy and a Permissions-Policy, and disables
`x-powered-by`.

---

## Before launch — what this build deliberately does not invent

1. **Licensed integration logos.** Drop SVGs into `public/logos/` and render
   them inside `LogoGrid`.
2. **Real client work.** Add entries to `src/content/work.ts` with
   `type: "client"`. The homepage headline, the Work page and every label
   switch automatically once client work exists (`hasClientWork`).
3. **Verified metrics and approved testimonials.** Gated behind
   `metricsVerified` and `testimonialApproved` per project — nothing renders
   until those are true.
4. **Team photography.** Populate `TEAM` in `src/app/(marketing)/about/page.tsx`.
5. **Legal review.** `/privacy` and `/terms` are plain-language starting points
   and say so on the page.
6. **An analytics vendor.** `src/lib/analytics.ts` emits the §44 event list to
   `dataLayer`, Plausible or GTAG if present, and is a no-op otherwise. Add the
   vendor's host to the CSP when you add the vendor.
7. **The real domain and inbox.** Set `NEXT_PUBLIC_SITE_URL`,
   `NEXT_PUBLIC_CONTACT_EMAIL`, `CONTACT_INBOX` and `RESEND_API_KEY`.
8. **Rate-limit store.** The in-memory limiter protects a single instance.
   Behind several instances, swap the store in `src/lib/rate-limit.ts` for
   Redis or Upstash — the function signature stays the same.

---

## Project structure

```
src/
  app/
    (marketing)/          header + footer + metadata defaults + analytics shell
      page.tsx            homepage — 10 chapters
      automation/…        hub + four deep pages
      software/  websites-apps/  integrations/  work/  about/  contact/
      privacy/  terms/
    api/contact/route.ts  validated, rate-limited form delivery
    layout.tsx            fonts + global metadata
    globals.css           design tokens, type scale, motion, reduced motion
    sitemap.ts  robots.ts  not-found.tsx
  components/
    shell/                Header, MegaMenu, MobileNav, ServiceNav, Footer, FinalCta
    primitives/           the four visual primitives + page-specific interactions
    ui/                   Button, Section, Tabs, Faq, LogoGrid, Reveal, PageHero…
    work/  contact/  home/
  content/                work, integrations, process — structured, typed content
  lib/                    site config, SEO, analytics, sequence hook, validation
  fonts/                  self-hosted Sora + Inter variable woff2
```

---

## Tone

> The page should be still enough that motion feels meaningful.
> Every impressive interaction must make the business easier to understand.
> Progressive enhancement first.

**ORBITAL** — Systems in motion.
