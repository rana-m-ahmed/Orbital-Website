# Revamp status

Branch: `revamp/orbital-premium-v1`

## Implementation

- Foundations: complete — official identity, licensed local fonts, tokens, navigation, buttons, footer.
- Homepage: complete — six sections, business examples, Labs carousel, process and enquiry invitation.
- Interactions: complete — accessible disclosures/tabs, native carousel, deferred 3D and static fallback.
- Inner pages: complete — preserved routes, editorial Work/About, updated service previews, contact, legal and 404 styling.
- Reliability: complete — honest delivery semantics, no enquiry-content logging, server-only validation, brand social images and icons.

## Validation

TypeScript, lint, production build, 5 delivery unit tests and 34 cross-browser checks passed. Two WebGL lifecycle tests are intentionally skipped outside Chromium. Final targeted fallback/context-loss checks also passed. Responsive review covered 320–1920 px with no overflow.

The local mobile Lighthouse measurement reports LCP 3.5 s (the 2.5 s target remains unmet) and CLS 0. Full conditions, loading measurements and limitations are recorded in `docs/QA_RESULTS.md`.

## Launch prerequisites

1. Supply the verified production URL, public email and Resend sender/inbox configuration through environment settings.
2. Verify a real enquiry reaches the intended inbox. Local tests intentionally do not send email.
3. Review the existing draft legal copy for the actual business.
4. Match rate-limit storage to hosting topology; the current store is per process and trusts proxy-supplied IP headers.
5. Enable HTTPS enforcement only on the real HTTPS deployment.

No production deployment, merge, invented client proof or third-party analytics installation has been performed.
