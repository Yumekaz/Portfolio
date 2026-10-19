# Engineering atlas edition — October 19, 2026

This pass addresses the difference between a strong opening and an equally
considered complete portfolio: distinctive interior covers, narrative pacing,
recognisable graphic motifs, and varied editorial layouts.

## What changed

- **Homepage:** a procedural trace study connects the selected work to its
  failure stories. Gallery images respond subtly to native scroll position.
- **Project collection:** an eight-entry atlas previews each system on hover or
  keyboard focus. Every entry links directly to its case study.
- **All eight case studies:** full-width, individually composed covers with
  project-specific SVG insignia. The collection rail now starts below the cover
  so the opening has the full viewport width.
- **Mechanism narratives:** at least 1200 × 800 CSS pixels, four sections drive
  a sticky diagram as the reader scrolls. A step-by-step alternative remains
  available. Smaller or reduced-motion displays start in manual mode. There is
  no scroll interception, wheel handler, or forced scroll speed.
- **All seven notes:** a functional, annotated notebook index; varied image
  treatments; larger article headings; existing search, filters, failure/repair
  comparisons, original sources, and evidence boundaries remain available.
- **All nine explorations:** a navigable curiosity map opens the selected field
  record and clears a conflicting category filter. The map is an editorial
  arrangement, not a dependency graph. Gallery spreads vary in scale; tablet
  and phone layouts stack them for reading.
- **Every route:** a large author signature and procedural trace field in the
  footer. Existing contact, social, and résumé destinations remain intact.

`atlas.css` contains this edition's composition rules. `CaseCover`,
`ProjectAtlas`, `SystemInsignia`, `JournalIndex`, `WorkshopConstellation`, and
`TraceInterlude` own the new surfaces. `SystemStory` owns the two explanation
modes. The existing source data remains authoritative for technical claims.

## Motion and resource use

`useChoreography` updates only intersecting scenes, through one scheduled frame
per native scroll update. The decorative canvas runs at a maximum of 30 frames
per second, caps device-pixel resolution at 1.5, uses fewer lines on small
surfaces, and stops when offscreen, when the document is hidden, or when motion
is reduced. Observers, event listeners, and scheduled frames are cleaned up.

The shared motion toggle and the operating-system preference preserve static
artwork and manual controls. Reduced motion disables timed playback and the
scroll-driven diagram mode. Procedural traces and SVG insignia are explicitly
visual studies; they are not measured telemetry or architectural proof.

No runtime dependency or image-generation service was added. Existing WebP
artwork and attributed repository artifacts are reused. Notes and workshop
map navigation move keyboard focus to the selected record after it is revealed.

## Verification for this edition

- Strict TypeScript compilation and Vite production builds pass.
- The root and `/Portfolio/` builds pass the four-route, asset-path, and résumé
  checks.
- All five existing quorum-model tests pass, including every connectivity
  combination and rejection preserving committed state.
- Server-render smoke checks cover all eight cases in manual and scroll modes,
  all seven note deep links, all nine exploration deep links, and atlas links.
  They check unique IDs, accessible button names, and existing control targets.
  This is markup validation, not an interaction test in a browser.
- Reviewed responsive CSS, effect cleanup, keyboard destinations, hidden-record
  handling, and motion preference branches in source.

**Fresh visual/browser QA is outstanding.** The managed Sites workflow requires
the `control-browser` skill, which is unavailable in this environment. No
alternative browser path was used. Prior screenshots and responsive-frame
checks describe the mechanism edition; they do not certify these new layouts.
Do not describe this edition as cross-browser tested, pixel-verified, or an
Awwwards-level result on the strength of build and markup checks alone.

The next browser review should check every cover at 320, 390, 820, and 1440 CSS
pixels; short desktop viewports; all scroll-story transitions; switching
navigation modes; filtering before following map links; keyboard focus; and
motion opt-out while a scene is active.

## Delivery

Implemented on local branch `codex/portfolio-visual-refresh`. GitHub writes were
unavailable in this session, so this pass is delivered as updated source and a
cumulative binary patch, with no remote push or deployment claimed.
