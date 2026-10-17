# The breaking-point edition

## Design

The homepage now leads with “Built for the breaking point.” Oversized Manrope,
warm paper, vermilion, and a dark olive experiment give the portfolio a clearer
identity. The failure lab replaces the abstract project map. Visitors can change
replica availability, attempt writes, inspect the outcome, and follow a link to
the actual Mini-Redis-Cassandra case study.

Selected work is presented as three editorial stories, each with a different
engineering question and an evidence panel. The existing eight case studies,
field notes, source links, and technical boundaries remain intact.

## The model

`src/lib/failureLab.ts` is a deterministic reducer with three replicas and a fixed
two-of-three write threshold. An accepted write advances the committed version
and all connected replicas. An unavailable replica retains its old version.
Rejected writes do not change any replica version or committed state.
Reconnection immediately catches a replica up to the committed version.

The main action walks through losing one replica, losing quorum, and restoring
the cluster; each step also attempts a write. Individual replica buttons,
independent write attempts, a three-event history, and reset allow exploration.

This is an explanatory frontend model, not a running backend or a consensus
protocol. There is no leader election, transport latency, persistence, partial
commit, or realistic recovery scheduling. The visible model label and recovery
note make that boundary explicit. Its behavior does not certify another project.

## Motion and access

- Lightweight signal-path animation, headline entrance, scroll reveals, and
  transitions between replica states; no additional animation dependency.
- Keyboard-operable buttons, visible focus, descriptive action names, and live
  updates for outcomes and recent writes.
- Existing persistent motion pause and device reduced-motion support cover the
  new CSS animations too.
- Phone layouts put the experiment action first and stack the diagram below it.
- Headings, source links, navigation, and full case-study routes remain semantic.

## Verification

- Five model tests: all eight connectivity masks; full degrade/reject/recover
  sequence; stale replica catch-up; repeated rejection without state loss; reset.
- TypeScript and production builds at `/` and `/Portfolio/`.
- Static entrypoint/asset/resume checks for both deployment bases.
- Cloud browser: desktop lab sequence, keyboard activation, reset, source-case
  navigation, animation pause, and pause persistence across routes.
- Responsive iframe checks at 320px, 390px, 820px, and 1024px; visible layout and
  horizontal-overflow checks, with the main experiment also exercised at 390px.
- Mobile navigation opens and closes with Escape.
- No application errors observed in the browser console; browser-extension
  metadata errors were unrelated to the site.

Responsive frames are not physical-device tests. A full screen-reader audit,
Lighthouse run, or cross-browser device matrix was not performed.

## Delivery

The source remains on `codex/portfolio-visual-refresh`. There is no deployment or
remote PR: the connected GitHub integration previously rejected repository writes
with 403. The downloadable package includes the complete source and a patch from
original main `f052347ef9161b7ee1c469b7919fec2a96f7f135`.
