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
├── index.css                       # Small global animation/style layer
├── data/
│   ├── projects.ts                 # Flagship project summaries and evidence maps
│   └── engineeringNotes.ts         # Failure → decision → boundary notes
└── components/
    ├── HeroSection.tsx             # Role positioning and systems focus
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
