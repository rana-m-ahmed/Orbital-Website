# ORBITAL design system

## Identity

Original supplied PNG sources are preserved in `public/brand`. The header and footer use the official lockup; app icons derive from the official symbol. The static hero uses its exact alpha silhouette. The dimensional hero is a sculptural interpretation, not a replacement brand asset.

## Color and type

- Midnight: #07111D; blue: #2F5BFF; off-white: #F5F7FA.
- Headings: General Sans Medium, tight spacing and deliberate wrapping.
- Body/UI: Switzer 400, 500 and 600. Body paragraphs stay readable, while compact labels remain secondary.
- Contrast corrections are checked with axe against actual rendered backgrounds.

## Composition

Desktop shell: maximum 1392px including 64px gutters, reducing to 36px and 24px. Homepage sections use editorial rows, a workflow studio, a wide carousel and an open process grid. Shared service components retain their distinct workflow interactions. Work and About use their own editorial compositions.

The floating header stays off-white for consistent logo contrast. The Services panel is a disclosure; the mobile sheet is non-modal navigation with Escape/outside-click dismissal. The primary button uses a blue capsule and white arrow compartment. Secondary and text actions remain quieter.

## Motion and fallbacks

Use CSS for feedback and native scroll snapping for the carousel. Motion never gates core text visibility. Reduced motion removes transitions and settles the demonstrations. The 3D canvas uses demand rendering, capped DPR and an isolated dynamic import. It stops rendering outside the viewport. The scene has no continuous rotation and requires no loading screen.

## Content

Lead with business outcomes in plain language. No invented proof, unverified social links, fictional team profiles, or performance guarantees. All current Labs projects are concept demonstrations. The contact action is “Let’s talk”; no technical brief is required.
