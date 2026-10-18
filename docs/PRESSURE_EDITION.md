# Order under pressure

This records the homepage edition. The subsequent end-to-end interior redesign
is documented in [FULL_PORTFOLIO.md](FULL_PORTFOLIO.md).

## What changed

The homepage is a dramatic, image-led introduction to systems engineering:
a dark sculptural hero, large staggered type, a warm interactive lab, three
bespoke project artworks, an oversized vermilion statement, a field journal,
and a larger contact section. Project source evidence and data are unchanged.

The hero and lab now share one reducer. Apply pressure disconnects one replica
and commits a write; pushing further loses quorum and rejects the write;
restoring order reconnects the replicas and accepts the next write. Direct
replica controls, independent writes, and reset still work.

The chrome sculpture is an image composition with three clipped layers driven
by those replica states. It deliberately remains a metaphor. We prototyped a
WebGL scene but removed that dependency after the review browser could not
create a WebGL context. The delivered scene uses CSS, works without WebGL,
and has no rendering-engine download or continuous JavaScript render loop.

## Motion and assets

- Slow sculpture drift; state-driven layer separation; headline entrances;
  scroll reveals; project-image hover; directional link feedback.
- Native document scrolling and semantic links/buttons.
- Persistent pause control and system reduced-motion preference. The sculpture
  stops drifting when offscreen or the document is hidden.
- Three full-size WebP illustrations (410 KB combined), three small responsive
  variants (116 KB combined). Hero uses one cached 167 KB image across layers.
  Project images lazy-load with explicit dimensions and responsive sources.
- Self-hosted fonts; no new runtime dependency.
- Removed unused CSS from the previous homepage.

## Verification on October 18, 2026

- Five model tests passed, including every connectivity combination, rejection
  invariants, stale replicas, recovery, and reset.
- TypeScript and Vite production build passed.
- Static entrypoint, base-path, asset, and resume checks passed for root hosting
  and GitHub Pages under /Portfolio/.
- Browser: hero pressure -> lost quorum -> recovery; lab outcome/history;
  pause control; retained pause across route navigation; project navigation.
- Visual review: desktop hero/project gallery/case-study route; responsive
  frames at 320, 390, and 820 pixels; no horizontal document overflow in those
  frames. These are frame-based checks, not physical-device tests.
- The final implementation requires no WebGL. The earlier prototype's WebGL
  errors do not apply to the delivered code. No site errors observed after
  replacement; extension metadata errors were unrelated to the application.

No Lighthouse score, screen-reader audit, or cross-browser certification is
claimed. The frontend model is still not a consensus implementation or a live
backend. Generated sculpture images are not evidence of project behavior.

## Delivery

The branch is codex/portfolio-visual-refresh. GitHub writes were rejected by
the connected integration, so no remote push, PR, or deployment was made.
The source archive contains all tracked source and assets plus a cumulative
patch from original main f052347ef9161b7ee1c469b7919fec2a96f7f135.
