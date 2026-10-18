# Complete portfolio edition

## Scope

The approved homepage direction now extends across every existing route and
every entry. The homepage, engineering data, source links, and evidence
boundaries remain intact. This is a presentation and interaction update;
project claims have not been independently rerun or expanded.

| Area | Complete coverage | Interaction and presentation |
| --- | --- | --- |
| Projects | All eight case studies | Individual artwork and editorial cover; numbered collection index; chapter navigation; architecture enlargement; design decisions; failure records where supplied; evidence; related notes; repository activity; next case |
| Field journal | All seven notes | Paper-stack masthead; topic filters; full-text search; expandable reading; failure/decision/boundary sections; original sources; direct note hashes |
| Explorations | All nine existing entries | Nine original SVG studies; category filters; gallery and compact index; original descriptions and repository links |
| Shared shell | Every route | Header, contact footer, responsive navigation, keyboard focus, motion preference, self-hosted fonts |

The collection uses charcoal, paper, amber, sage, and vermilion. Notes have a
warm editorial treatment; explorations use a darker green workshop identity.
Each area belongs to the same portfolio while having a distinct layout.

## Motion and loading

- Case-cover entrances, scroll reveals, image hover, layered card movement,
  note expansion, and a slow rotating workshop study.
- The existing global pause control and system reduced-motion preference apply
  to the new surfaces. Native scrolling remains in place.
- Responsive 768/1536-pixel WebP artwork with explicit dimensions; below-fold
  images lazy-load. Eight full-size and eight small images total about 1.30 MiB.
- Exploration art is local SVG. No runtime dependency was added.
- Repository activity is fetched only when expanded and cached for one hour.
  Failure and empty states keep the source repository link available.
- Old inner-page styles and the unused RouteHeader component were removed.

## Verification — October 18, 2026

- TypeScript and Vite production builds passed for `/` and `/Portfolio/`.
- Static route, asset-path, and resume checks passed for both bases.
- All five existing failure-lab model tests passed.
- Browser review selected all eight cases and checked the correct title,
  loaded artwork, and evidence content. Back/forward navigation and the
  final-to-first next-case transition passed.
- Notes: topic filtering, expanded arguments, unmatched search, reset, and a
  direct note hash followed by reload passed.
- Explorations: category filtering and gallery/index switching retained the
  selected category and correct entries.
- Repository activity successfully loaded three recent Cairn commits.
- Responsive frame checks at 320, 390, and 820 pixels; desktop review around
  1348 pixels. No horizontal document overflow in the checked frames.
  Architecture enlargement scrolled inside its own viewport at 320 pixels.
- Mobile navigation opened and closed with Escape. Workshop rotation changed
  from `workshop-orbit` to `none` with the pause control.
- No application console error was observed in the reviewed session; browser
  extension metadata errors were unrelated to the application.

These were Chromium and responsive-frame checks, not physical-device or
cross-browser certification. No Lighthouse score or screen-reader audit is
claimed. Sculptures and SVG studies are expressive art; the existing
architecture diagrams and repository documents explain the actual systems.

## Delivery

Local branch: `codex/portfolio-visual-refresh`. GitHub write access remains
unavailable, so no remote push, pull request, or deployment was made.
The source archive includes tracked source and assets, startup instructions,
and the cumulative binary patch from original main
`f052347ef9161b7ee1c469b7919fec2a96f7f135`.
