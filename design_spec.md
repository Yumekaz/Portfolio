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

```text
System header
  └─ role + engineering-notes identity
Hero
  ├─ distributed-systems positioning
  ├─ plain-English scope boundary
  └─ replication / consistency / failure / recovery focus grid
Case studies
  ├─ Coordination-service
  ├─ Mini-Redis-Cassandra
  ├─ FailForge
  ├─ Cairn
  ├─ DRT
  ├─ Qydrel
  ├─ Mini-Docker
  └─ TinyTantrum
Engineering notes
  └─ failure → decision → boundary → source link
Footer
  └─ email, GitHub, LinkedIn, resume
```

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

- Content-first, monochrome base with orange as the active signal.
- Lightweight diagrams that show data flow or proof structure.
- Animations are limited to state changes and must not imply live production
  telemetry.
- No fake uptime, performance, user counts, or “production-ready” badges.
- Mobile layout must preserve the note text and source links before decoration.

## Verification checklist

- [x] Distributed-systems role is the first message.
- [x] Case studies lead with Coordination-service and MiniDB.
- [x] Engineering notes link to repository evidence.
- [x] Prototype boundaries remain visible.
- [x] LinkedIn, GitHub, email, and resume are reachable.
- [ ] Run the portfolio build in an existing dependency environment.
- [ ] Browser-check desktop and mobile layout before deployment.
