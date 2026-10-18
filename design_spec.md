# Portfolio Design Specification

## Objective

Position Mihir for distributed backend systems roles by making the engineering
evidence easy to scan, inspect, and challenge.

The site should answer four questions quickly:

1. What kind of engineer is this?
2. What distributed-systems problems has he actually built?
3. What failed, and what decision followed?
4. Where can I inspect the source evidence and limits?

## Positioning

**Distributed backend systems engineer focused on replication, consistency,
coordination, failure testing, and recovery.**

Runtime systems, compiler correctness, and ML infrastructure appear as adjacent
work. They support the main story; they do not compete with it for the headline.

## Page structure

1. Dark hero: “Order under pressure,” layered chrome sculpture, pressure control.
2. Warm paper experiment: a two-of-three quorum rule visitors can test.
3. Three large project stories with distinct sculptural artwork.
4. Vermilion manifesto: “The happy path is only half the design.”
5. Field journal leading to full engineering notes.
6. Large contact section with email, GitHub, LinkedIn, and resume.

Separate routes preserve the eight complete case studies, source evidence,
engineering notes, and broader project shelf.

## Case-study contract

Every case study must contain:

- a three-to-five sentence plain-English summary;
- the problem and system boundary;
- the important implementation decisions;
- at least one failure, trade-off, or non-goal;
- a proof or evidence statement with its provenance;
- a direct source-repository link.

“Implemented” is not itself evidence. A test count, postmortem, benchmark,
design document, demo, or release record must be named when available. Claims
that were not independently run during portfolio work must remain labelled as
repository evidence.

## Engineering-note contract

Notes are not generic blog posts or feature descriptions. Each card contains:

1. **Failure:** what broke or what guarantee was at risk.
2. **Decision:** what changed and why that trade-off was accepted.
3. **Boundary:** what the result still does not prove.
4. **Source:** a direct link to the repository document or postmortem.

Initial notes are sourced from MiniDB, FailForge, Cairn, DuraFlow, DRT, Qydrel,
and TinyTantrum.

## Visual language

- Near-black, warm paper, polished metal, amber glass, and vermilion.
- Oversized Manrope, with IBM Plex Mono for small annotations.
- Layered artwork in the hero moves with replica connectivity. It is a visual
  metaphor; the accessible experiment states the actual simplified rule.
- Generated imagery is labelled as sculptural studies, never system diagrams.
  Precise SVG diagrams remain inside the case studies.
- Native scrolling, restrained entrance/reveal motion, image hover response,
  and a persistent pause control. Device reduced-motion preferences take priority.
- No invented metrics, production claims, or decorative telemetry.
- Mobile layouts retain every case-study link, source boundary, and control.

## Verification

The current edition's completed checks and their scope are recorded in
[docs/PRESSURE_EDITION.md](docs/PRESSURE_EDITION.md). Earlier visual review
notes are historical; the current implementation takes precedence.
