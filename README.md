# Mihir Swarnkar — Distributed Systems Portfolio

This is the public portfolio for a distributed backend systems engineer focused
on replication, consistency, coordination, failure testing, and recovery.

The site is intentionally content-first. It presents a small set of flagship
case studies and engineering notes drawn from the actual repositories. Each
note follows the same shape:

```text
failure or problem → decision and trade-off → remaining boundary → source evidence
```

The portfolio does not claim that educational prototypes are production systems.
It links to the repository documents that support each claim and keeps limits
visible beside the result.

## Content hierarchy

- **Distributed core:** Coordination-service, Mini-Redis-Cassandra, FailForge
- **Durable systems:** Cairn, DuraFlow, Mini-Docker
- **Correctness tooling:** DRT and Qydrel
- **ML infrastructure:** TinyTantrum

The broader project shelf includes Orbits, WasmForge, MAJA, SILSILA, Skein,
AeroVoxel, BitNet Triton, and AUTOFORGE. They are supporting evidence rather
than competing with the distributed-systems narrative on the home page.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Structure

```text
src/
├── App.tsx                         # Page composition and active case study
├── index.css                       # Shared layout and reading styles
├── signature.css                   # Editorial homepage and experiment
├── lib/failureLab.ts               # Deterministic quorum model
├── data/
│   ├── projects.ts                 # Flagship project summaries and evidence maps
│   └── engineeringNotes.ts         # Failure → decision → boundary notes
└── components/
    ├── HeroSection.tsx             # Breaking-point introduction
    ├── FailureLab.tsx              # Interactive failure/recovery experiment
    ├── Sidebar.tsx                 # Case-study navigation
    ├── CaseStudyViewer.tsx         # Project proof and limits
    ├── EngineeringNotes.tsx        # Linkable engineering-note cards
    ├── ProjectDiagram.tsx          # Lightweight per-project diagrams
    ├── KernelLog.tsx               # Optional recent GitHub commit context
    └── Footer.tsx                  # Contact, LinkedIn, GitHub, resume
```

## Design rule

The visual layer should make the engineering argument easier to scan. It should
not imply production status, invent metrics, or bury the source evidence under
animation.

## The breaking-point edition

The homepage includes an interactive two-of-three quorum illustration: disconnect
replicas, attempt writes, observe rejection, and recover. It is deliberately a
frontend model; the real source projects and their limits are linked alongside it.
Run `npm run test:lab` to check its state transitions.

See [the design and verification notes](docs/FAILURE_LAB.md) for the current edition.

## Visual refresh and deployment paths

The warm editorial layout pairs self-hosted Manrope with IBM Plex Mono, retains
orange as the active signal, and keeps technical evidence and boundaries intact.
The header includes a persistent pause-animation control; device reduced-motion
settings take priority. See [the visual review](docs/VISUAL_REFRESH.md) for
design rationale and verification scope.

For a root-domain host (including the existing Vercel configuration):

```bash
npm ci
npm run build
npm run test:build
```

For GitHub Pages at `https://yumekaz.github.io/Portfolio/`:

```bash
npm run build:pages
VITE_BASE_PATH=/Portfolio/ npm run test:build
```

Both builds emit physical HTML entrypoints for `/`, `/projects/`, `/notes/`, and
`/other-work/`, so static-host reloads work. Internal links and downloads follow
Vite's configured base. `npm run deploy` explicitly builds for GitHub Pages and
publishes `dist` using the existing `gh-pages` tool; do this only when ready to
publish. The visual-refresh branch itself does not deploy the public site.
