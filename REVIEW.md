# Reviewing this repo

Thanks for taking a look. This is the ORBITAL marketing site — a Next.js app
built against a written design and engineering plan. This file is for you, the
reviewer: how to run it, what is deliberate, and where the useful things are.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Node 20+. No environment variables are needed to run or review it — the contact
form works without any, and writes the enquiry to the server log instead of
emailing it.

Before opening a pull request:

```bash
npm run build      # must pass
npm run lint       # must be clean
```

Both are clean on `main` today, so anything they report is from the change.

---

## Where things are

```
src/app/(marketing)/   every page — the homepage is page.tsx
src/components/
  shell/               header, mega menu, mobile nav, footer, final CTA
  primitives/          the demos and interactive graphics
  ui/                  buttons, sections, tabs, FAQ, reveal, page hero
src/content/           work, integrations, process — the copy lives here
src/lib/               site config, SEO, analytics, validation, sequence hook
src/app/globals.css    design tokens, type scale, motion, reduced motion
```

Most content changes are `src/content/*` or the page file itself — not the
components.

`README.md` has the full architecture write-up. Code comments reference `§`
section numbers from the original plan, so `§19` in a comment means section 19
of that document.

---

## Things that look like bugs but are not

Please check these before filing them:

- **The demos play once and stop.** Nothing loops. A finished demo resting on
  "Appointment booked ✓" is the intended end state — there is a Replay control.
- **Blue is rationed.** It marks work happening — a call answered, a lead
  routed, a task completed. It is deliberately absent from ordinary hovers,
  buttons and dividers. Adding it back removes its meaning.
- **One big animation per screen.** If you add a second, something else has to
  become still.
- **Integration logos are plain named tiles.** Real brand logos go in only when
  licensed assets are supplied. Please do not approximate or redraw one.
- **Every project is labelled "Reference system".** There is no client work yet,
  so nothing is presented as a client deployment. No logos, no testimonials, no
  performance metrics until they are real and approved.
- **The About page has no team section.** It renders only once real people and
  real photography exist. Stock portraits are not an option here.
- **No animation library.** Every transition is CSS. `README.md` explains why
  (Motion's `initial` prop broke the no-JavaScript fallback).

---

## What is genuinely worth your attention

- **Copy.** Does a non-technical business owner understand what ORBITAL does
  from the first screen, with no motion at all?
- **The demos.** Do they explain the business value, or just look busy?
- **Mobile.** 360–430px. Value proposition first, CTA early, copy before the
  demo.
- **Keyboard.** Tab through the header: the Automation trigger should open with
  Enter, close with Escape, and return focus. Tabs use arrow keys. Every
  focusable thing should show a visible ring.
- **Reduced motion.** Turn it on in your OS. Every demo should already be at its
  finished state, with all the information present.
- **Contrast.** Body text on light surfaces is `#5E6876`, links are `#3158D8`.
  `#9AA0A6` and `#4F78FF` must never be used for normal-size text on the light
  background.

---

## Working on it

```bash
git checkout -b your-change
# ...
git commit -m "Short description of the change"
git push -u origin your-change
```

Then open a pull request rather than pushing to `main`, so the change can be
looked at and the site is never briefly broken.

If something here seems wrong rather than just different, say so — the rules
above are decisions, not laws.
