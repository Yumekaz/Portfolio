# Mihir Swarnkar — Distributed Systems Portfolio

This is the public portfolio for a distributed backend systems engineer focused
on replication, consistency, coordination, failure testing, and recovery.

The visual direction is **Order under pressure**: sculptural imagery, oversized
type, and a working failure experiment. It presents a small set of flagship
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

The explorations gallery includes DuraFlow, Orbits, WasmForge, MAJA, SILSILA,
Skein, AeroVoxel, BitNet Triton, and AUTOFORGE. Each has its own visual study,
description, category, and repository link.

## Complete portfolio edition

The visual direction extends across every route:

- **Eight case studies:** individual sculptural covers, chapter navigation,
  architecture diagrams with an enlarge control, decisions, failure records
  where available, evidence, related notes, and next-project navigation.
- **Seven field notes:** a searchable, filterable journal with expandable
  arguments, persistent deep links, and the original source evidence.
- **Nine explorations:** unique SVG studies, category filters, and gallery/index
  views with the full original descriptions and repository links.

Responsive layouts, keyboard controls, and the shared animation pause setting
apply throughout. See [the complete implementation and verification record](docs/FULL_PORTFOLIO.md).

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
├── signature.css                   # Quorum experiment structure
├── pressure.css                    # Current art direction and responsive styles
├── interior.css                    # Case studies, field journal, explorations
├── lib/failureLab.ts               # Deterministic quorum model
├── data/
│   ├── projects.ts                 # Flagship project summaries and evidence maps
│   ├── engineeringNotes.ts         # Failure → decision → boundary notes
│   ├── projectPresentation.ts      # Case artwork and editorial presentation
│   └── explorations.ts             # Broader project collection
└── components/
    ├── HeroSection.tsx             # Order under pressure introduction
    ├── PressureScene.tsx           # Layered artwork driven by replica state
    ├── FailureLab.tsx              # Interactive failure/recovery experiment
    ├── Sidebar.tsx                 # Case-study navigation
    ├── CaseStudyViewer.tsx         # Project proof and limits
    ├── EngineeringNotes.tsx        # Searchable journal and expanded reading
    ├── OtherWork.tsx               # Filterable exploration gallery/index
    ├── ExplorationArt.tsx          # Nine code-native visual studies
    ├── Artwork.tsx                 # Responsive sculptural images
    ├── ProjectDiagram.tsx          # Lightweight per-project diagrams
    ├── KernelLog.tsx               # Optional recent GitHub commit context
    └── Footer.tsx                  # Contact, LinkedIn, GitHub, resume
```

## Design rule

The visual layer should make the engineering argument easier to scan. It should
not imply production status, invent metrics, or bury the source evidence under
animation.

## Order under pressure

The homepage includes an interactive two-of-three quorum illustration: disconnect
replicas, attempt writes, observe rejection, and recover. It is deliberately a
frontend model; the real source projects and their limits are linked alongside it.
Run `npm run test:lab` to check its state transitions.

The hero and lab share this state. Three custom sculptural studies introduce
coordination, storage, and failure testing; a large vermilion manifesto and
field journal complete the homepage. Motion can be paused, and the artwork
works without WebGL.

See [the homepage design notes](docs/PRESSURE_EDITION.md),
[the complete portfolio update](docs/FULL_PORTFOLIO.md), and
[artwork provenance](docs/ART_DIRECTION.md). The model contract remains in
[the failure lab notes](docs/FAILURE_LAB.md).

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
