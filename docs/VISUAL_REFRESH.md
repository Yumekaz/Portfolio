# Portfolio visual refresh

This records the first pass. The current homepage and its verification are
described in [the breaking-point edition](FAILURE_LAB.md).

Based on `main` commit `f052347ef9161b7ee1c469b7919fec2a96f7f135`.

## Review

The original published homepage was visually dense: small monospace body text,
hard black dividers, and little separation between the introduction and evidence.
The published GitHub Pages site was older than the checked-out `main`, which
already separated projects, notes, and supporting work into routes. This change
retains that latest route structure and the existing technical content.

1. **Homepage — improved:** clear name and role, larger headline, warm paper and
   orange palette, an interactive flagship-system map, and distinct work and
   notebook sections. The map is an illustration of project relationships,
   not production telemetry.
2. **Case studies — improved:** a project index, calmer reading typography,
   project-specific diagrams, and visible problem/decision/evidence boundaries.
3. **Field notes — improved:** readable failure/decision/boundary sections,
   individual deep links, and unchanged original source URLs.
4. **Mobile navigation — verified:** the disclosure opens, links to the notes
   route, and resets closed after navigation. It supports Escape dismissal.
5. **Motion — verified in-browser:** the pause control changes state, persists
   across navigation, and disables CSS motion. Device reduced-motion settings
   also take priority. SVG SMIL diagrams have explicit pause/resume handling.

## Visual evidence

Screenshots of the published homepage and updated browser preview accompany
the conversation. The published baseline predates current main; it is not
a claim that the deployed site and the source checkout were identical.

## What changed

- Self-hosted Manrope and IBM Plex Mono; no external font requests.
- Responsive header, mobile navigation, clear contact links, and resume download.
- Headline entrance, scroll reveals, hover feedback, slow diagram motion, and
  persistent animation controls without adding a motion library.
- Existing SVG architecture diagrams and all source-backed project data retained.
- Base-aware internal links and physical HTML entrypoints for all four routes.
- GitHub Pages build uses `/Portfolio/`; root hosting remains the default.
- Recent GitHub commits are labeled “recent” rather than “live” because cached
  results can be up to one hour old.

## Validation

- `npm run build`: TypeScript and production bundle passed.
- `npm run test:build`: four route entrypoints, assets, and resume checked.
- `npm run build:pages`: TypeScript and `/Portfolio/` production bundle passed.
- `VITE_BASE_PATH=/Portfolio/ npm run test:build`: prefixed assets checked.
- Browser: desktop homepage/work/notes, interactive map, case-study selection,
  motion toggle persistence, and mobile navigation exercised.
- Responsive frames: 390px and 320px; homepage did not overflow horizontally.
  Notes also checked at 390px. This is browser viewport testing, not testing on
  physical phones or every mobile browser.
- No changes to the project evidence data or engineering-note source data.

## Limits

No public deployment or merge was performed. Source-project test counts are
retained repository evidence, not revalidated by this visual work. Full WCAG
certification, screen-reader testing, Lighthouse benchmarking, and physical
Safari/Android device testing were not performed. The existing optional commit
feed still depends on GitHub API availability/rate limits.
