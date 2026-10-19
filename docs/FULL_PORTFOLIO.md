# Complete portfolio edition

The current visual pass is documented in [ATLAS_EDITION.md](ATLAS_EDITION.md).
It adds the project atlas, full-width covers, scroll narratives, notebook index,
workshop map, and shared author signature. Its browser QA remains outstanding.
The implementation and browser checks below describe the preceding mechanism
edition and are retained as a historical verification record.

The visual direction extends across every existing route and entry. This is a
presentation and interaction update; repository test counts and historical
benchmarks are attributed records, not experiments rerun by the portfolio.

| Area          | Coverage         | Presentation and interaction                                                                                                                                                                                                                  |
| ------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Homepage      | Full page        | Continuous sculptural art, pressure/recovery states, working quorum lab, selected work, manifesto, journal, contact                                                                                                                           |
| Projects      | All eight cases  | Individual artwork and cover; collection navigation; four-step interactive mechanism; manual and optional timed playback; unique design/evidence headings; evidence facts and original sources; related notes; repository activity; next case |
| Field journal | All seven notes  | Paper masthead; filters and search; expandable arguments; failure/repair comparison; specific argument headings; original sources; direct hashes                                                                                              |
| Explorations  | All nine entries | Six distinct mechanism illustrations and three repository artifacts; interactive stages; expandable field records; category filters; gallery/index layouts                                                                                    |
| Shared shell  | Every route      | Header and contact footer; reading progress; responsive navigation; keyboard focus; shared motion preference; self-hosted fonts                                                                                                               |

## Motion and performance

- The homepage art remains a single continuous image. State changes rotate and
  dim the whole sculpture; the orbital field responds to replica connectivity.
  The image itself is feathered to avoid rectangular edges during rotation.
- Case studies have 32 manual stages across eight explanations. Playback starts
  only on request, advances at 6.5 seconds per stage, and pauses outside the
  viewport. Reduced motion disables timed playback while preserving navigation.
- Case entrances, note comparisons, gallery stages, and hover treatments share
  the existing motion preference. Native scrolling remains in place.
- Below-fold art and artifact images lazy-load. No runtime dependency was added.
  Scientific plots retain their original pixels and can be opened at full size.
- Obsolete small SVG diagrams, image-slice styles, and SMIL pause hooks were
  removed. New diagram classes are isolated from the homepage quorum network.
- Repository activity remains opt-in and cached; no analytics were added.

## Prior mechanism-edition verification — October 18–19, 2026

- TypeScript and Vite production builds for `/` and `/Portfolio/`.
- Static route, asset-path, and resume checks for both bases.
- Five quorum reducer tests: all connectivity combinations, guided degradation
  and recovery, stale offline replicas, repeated rejection, and reset.
- All eight case studies selected at a 320-pixel responsive frame; their final
  stages and disabled next controls verified without document overflow.
- Timed playback advanced from training to checkpoint; global pause stopped
  playback and retained manual navigation.
- All seven notes opened; all repair comparisons activated using Enter. Search,
  unmatched-result state, and reset verified.
- All nine exploration records opened and final stages selected at 320 pixels.
  Developer-tools filtering returned exactly three entries in both gallery and
  index views. The three repository images render and have full-size links.
- Homepage pressure cycle verified: 3 → 2 → 1 → 3 connected replicas; rejection
  preserves the committed version. Keyboard activation also worked at 320 pixels.
- Visual review at desktop, 390-pixel phone, and 820-pixel tablet sizes.
  Mobile menu closed with Escape. No horizontal document overflow in checked
  frames. The small iframe scrollbar reduces usable width below the frame width.
- A React 18 image-priority attribute warning was corrected. Browser-extension
  metadata errors were separate from the application.

These are Chromium and responsive-frame checks, not physical-device,
cross-browser, Lighthouse, or screen-reader certification. See
[MECHANISM_EDITION.md](MECHANISM_EDITION.md) for source and interpretation notes.

## Delivery

Local branch: `codex/portfolio-visual-refresh`. GitHub write access remains
unavailable, so no remote push, pull request, or deployment was made.
The archive contains tracked source and assets, startup instructions, and a
cumulative binary patch from original main
`f052347ef9161b7ee1c469b7919fec2a96f7f135`.
