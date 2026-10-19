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
Skein, AeroVoxel, BitNet Triton, and AUTOFORGE. Each has an interactive mechanism
explanation, a field record, and repository links. Orbits, AeroVoxel, and BitNet
also show original repository artifacts with source attribution.

## Engineering atlas edition

The visual direction extends across every route:

- **Eight case studies:** a browsable project atlas, full-width individual
  covers and SVG insignia, chapter navigation, scroll-driven or manual
  four-step system explanations, decisions, failure records
  where available, evidence, related notes, and next-project navigation.
- **Seven field notes:** an annotated notebook index and searchable, filterable
  journal with expandable
  arguments, keyboard-operable failure/repair comparisons, persistent deep links,
  and the original source evidence.
- **Nine explorations:** a navigable project map, varied editorial spreads,
  six bespoke mechanism illustrations, three actual
  repository artifacts, interactive stages, expandable field records,
  category filters, and gallery/index views.

Responsive layouts, keyboard controls, and the shared animation pause setting
apply throughout. Case studies follow the narrative on larger screens and have
manual controls at every size. Timed playback is opt-in. Procedural trace studies
connect the homepage and shared footer to the atlas identity.

See [the current atlas edition and verification limits](docs/ATLAS_EDITION.md),
[the complete implementation record](docs/FULL_PORTFOLIO.md), and
[the mechanism edition source record](docs/MECHANISM_EDITION.md). Fresh browser
review of the atlas layouts is outstanding; successful builds are not visual QA.

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

| Area                      | Main files                                                             |
| ------------------------- | ---------------------------------------------------------------------- |
| Routing and shared motion | `App.tsx`, `hooks/useMotionPreference.ts`, `hooks/useChoreography.ts`  |
| Visual system             | `pressure.css`, `interior.css`, `craft.css`, `atlas.css`               |
| Project atlas and covers  | `ProjectAtlas.tsx`, `CaseCover.tsx`, `SystemInsignia.tsx`              |
| Mechanisms and evidence   | `SystemStory.tsx`, `CaseStudyViewer.tsx`, `data/systemStories.ts`      |
| Notes                     | `EngineeringNotes.tsx`, `JournalIndex.tsx`, `NoteLens.tsx`             |
| Explorations              | `OtherWork.tsx`, `WorkshopConstellation.tsx`, `ExplorationExhibit.tsx` |
| Procedural artwork        | `TraceField.tsx`, `TraceInterlude.tsx`                                 |
| Shared experiment         | `HeroSection.tsx`, `FailureLab.tsx`, `lib/failureLab.ts`               |

Paths above are relative to `src/`; component files live in `src/components/`.

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
