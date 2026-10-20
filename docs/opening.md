# Order under pressure — opening signature

## Design

A custom titanium ring with three independent arcs and a vermilion inner rim settles into alignment. Outlined ORDER typography, the MS signature, and a red central signal introduce the existing engineering-atlas identity. Two shutters separate to reveal the portfolio. The hero lettering waits for this handoff.

## Behavior

- Available on the first arrival to every route, once per tab session.
- 780 ms assembly after the emblem is ready, then a 540 ms reveal; preparation is capped at 1,800 ms.
- Enter portfolio and Escape skip immediately. The footer has Replay opening.
- OS reduced motion and the portfolio motion switch bypass it. Browser back/forward restoration also bypasses it.
- The page behind the dialog is inert; focus and scrolling are restored on exit. Existing deep links retain their destination.
- Only the emblem, display font, and current route's lead image participate in readiness. Missing or stalled resources cannot trap a visitor.
- No simulated percentage, external dependency, canvas render loop, or persistent animation is added.

## Artwork

Built-in ImageGen mode, generated specifically for this portfolio. Selected image was converted to a 768 × 768 transparent WebP (52,888 bytes).

Asset: `/workspace/sites/yumekaz-engineering-portfolio/public/art/order-emblem.webp`

Original generation: `/workspace/scratch/a0c529edbdb4/generated_images/exec-4154084a-1d9e-47ca-9219-33cc4d1cd40b.png`

### Generation prompt

Use case: stylized-concept. Asset type: transparent 3D sculpture for a bespoke engineering portfolio opening animation, displayed around 250px wide on dark olive charcoal. Create ONE front-facing circular machined metal torus, divided into exactly THREE equal 120-degree arc pieces by narrow clean radial air gaps at EXACTLY 12 o'clock, 4 o'clock, and 8 o'clock. The three pieces are aligned as a complete circular ring, not exploded. Orthographic straight-on camera, no perspective tilt: ring center exactly at canvas center, circular symmetric outer silhouette. Each arc is thick, sculptural, beautifully rounded and beveled; the outside face is satin brushed titanium with warm ivory studio highlights and graphite reflections. The inner rim has a restrained vermilion-red enamel inlay with a subtle warm reflection on the metal, not neon. Central hole completely empty and transparent. True transparent background everywhere outside and inside ring, no floor, no cast shadow outside the object, no backdrop, no text, letters, numbers, marks, logos, or extra objects. Square canvas 1024x1024, ring outer diameter about 750 pixels leaving generous equal transparent padding. Large center opening about 390px diameter. Premium industrial product photography, realistic nuanced metal, crisp optical edges, strong legibility at thumbnail scale. EXACTLY three separate arcs; radial cut gap lines at top center and bottom-right and bottom-left must align through exact center, with an air gap about 12px between arc ends. This precise arrangement will let the three arcs animate independently by sector masks.

## Verification

TypeScript, production build, static-route asset checks, and ten lifecycle/timing tests. Browser visual QA was unavailable in the managed environment; live timing and layout still need device review.

