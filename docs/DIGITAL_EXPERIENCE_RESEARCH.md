# Websites, apps and software: interaction research

User direction: give websites and apps an equal place beside custom software and automation, with interactive demonstrations rather than more static cards. Preserve the existing hero artwork and navigation design.

## References researched

- Aceternity UI, Container Scroll Animation: https://ui.aceternity.com/components/container-scroll-animation
  - Adopted the presentation pattern of a large perspective product surface settling as it enters view.
  - Original local implementation uses a passive scroll listener, IntersectionObserver and requestAnimationFrame. It does not pin, replace scrolling or add a dependency.
- Aceternity UI, Compare: https://ui.aceternity.com/components/compare
  - Considered direct manipulation of example states. Chose explicit Desktop/Mobile buttons instead of a drag-only comparison so both states are keyboard accessible.
- Motion, useReducedMotion: https://motion.dev/docs/react-use-reduced-motion
  - Applied its accessibility principle: remove spatial animation for reduced motion. The existing stack uses native matchMedia and CSS rather than importing Motion.
- GSAP, matchMedia: https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/
  - Reviewed breakpoint/reduced-motion cleanup. Local reveal listeners, observer and animation frame are cleaned up on unmount; preference changes reset the transform.

These are design and interaction references, not imported components or copied source code. The implementations and SVG artwork are bespoke. No vendor code, external runtime, stock assets or new package was added.

## What was implemented

- Homepage: hero, website experience, software experience, automation feature, process and CTA. All three service areas are linked above the headline.
- Website experience: full browser composition with an original fictional interior-design concept; Desktop/Mobile changes the layout through container queries. The example button switches between original courtyard and studio illustrations.
- Software experience: one team workspace and a companion customer app. Approving the homepage changes the task state, progress, customer message and next milestone. Reset restores the initial state. Changes remain local.
- Websites & Apps service route added to navigation and sitemap. Services, Work and Custom Software now use the new experiences. About and project-interest copy include the broader offering.
- The project form continues to submit the existing Custom Software value for software, website and app enquiries. Server validation, storage and email handling are unchanged.
- All demos are labelled internal; names, brands, records and project progress are fictional. No claims of delivered client work or production integrations.
- No-JavaScript users see full static previews and all service descriptions/links; optional demo controls remain disabled. Mobile stacks the workspace and phone. Reduced motion removes scroll perspective and transitions.

## Verification

See QA_RESULTS.md for final tests and measurements. Screenshot evidence remains under test-results/redesign. The preceding redesign evidence is archived in data/qa/pre-digital-expansion.
