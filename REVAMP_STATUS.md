# ORBITAL Revamp Status

Last updated: 2026-09-25  
Working branch: `revamp/orbital-premium-v1`  
Baseline commit: `b21612f0d4524aa23f8f30b1f62a9fdbcfa95672`

## Current phase

**Phase 01 — Security and production baseline**

Status: IN PROGRESS

## Phase ledger

| Phase | Status | Notes |
|---|---|---|
| 00 Baseline & governance | PASS | Revamp branch, masterplan, QA matrix and status ledger created. Baseline remains unchanged on `main`. |
| 01 Security / production baseline | IN PROGRESS | Typecheck/test scripts added; public/server env split; contact production false-success fixed; CI added. Next.js security patch + runtime CI evidence still required before PASS. |
| 02 Official brand foundation | NOT STARTED | Supplied raster assets available; original vector preferred if provided. |
| 03 Design system v2 | NOT STARTED | User visual checkpoint after completion. |
| 04 Marketing shell | NOT STARTED |  |
| 05 Static homepage | NOT STARTED | Major user visual checkpoint. |
| 06 Motion foundation | NOT STARTED | GSAP only after static design passes. |
| 07 3D foundation | NOT STARTED | R3F/Three only after motion baseline. |
| 08 Signature hero | NOT STARTED | Major user visual checkpoint. |
| 09 System journey | NOT STARTED |  |
| 10 Commercial proof | NOT STARTED |  |
| 11 Homepage completion | NOT STARTED | Full homepage checkpoint. |
| 12 Automation pages | NOT STARTED |  |
| 13 Build/integration pages | NOT STARTED |  |
| 14 Work/About/Contact | NOT STARTED |  |
| 15 Conversion infrastructure | NOT STARTED |  |
| 16 Analytics/SEO/media | NOT STARTED |  |
| 17 Final QA/launch | NOT STARTED |  |

## Phase 00 evidence

- Branch: `revamp/orbital-premium-v1`
- Baseline: `main@b21612f0d4524aa23f8f30b1f62a9fdbcfa95672`
- Governance:
  - `docs/ORBITAL_REVAMP_MASTERPLAN.md`
  - `docs/ORBITAL_QA_MATRIX.md`
  - `REVAMP_STATUS.md`

## Phase 01 work completed so far

- Added `npm run typecheck` and aggregate `npm test`.
- Added a dedicated revamp GitHub Actions validation workflow.
- Added `src/lib/env-public.ts` for browser-safe public configuration.
- Added `src/lib/env-server.ts` for server-only contact delivery configuration.
- Kept secret-bearing configuration out of the Client Component dependency graph.
- Changed contact delivery so production throws when Resend is not configured instead of silently logging and returning success.
- Development log-only fallback remains available intentionally.
- Updated canonical domain fallback/example to `https://reachorbital.tech`.
- Preserved the existing monitored Gmail address as the temporary public fallback until the final @reachorbital.tech mailbox is confirmed.

## Phase 01 remaining gates

- [ ] Upgrade `next` and `eslint-config-next` from 16.3.5 to the current security-patched 16.3.x release and regenerate the lockfile together.
- [ ] Obtain CI evidence for `npm ci`.
- [ ] Typecheck PASS.
- [ ] ESLint PASS.
- [ ] Production build PASS.
- [ ] Re-review contact/config changes after CI.

## Locked decisions

- Preserve Next.js App Router and Server Component discipline.
- Static design must pass before advanced motion.
- CSS for micro-interaction; GSAP for choreography.
- Three.js + React Three Fiber + Drei for targeted 3D only.
- Lenis remains conditional.
- No fake proof.
- WebGL is enhancement, never the only source of information.
- Use one long-lived revamp branch, not a branch maze.

## Current blockers / external inputs

- Current environment cannot run npm locally; GitHub Actions is now the execution evidence path.
- Next.js 16.3.6 is the current security patch as of 2026-09-25; the lockfile must be regenerated with the package update rather than hand-edited.
- Original vector logo files would be preferable to raster assets but are not required for Phase 01.
- Real founder/team photography and approved bios will be required before final About/Team work.
- Production delivery credentials must be supplied outside Git before launch.
- Real client proof can only be added when verified/approved.

## Next authorized action

Finish Phase 01 validation/security patching. Do not begin visual redesign until Phase 01 reaches PASS.
