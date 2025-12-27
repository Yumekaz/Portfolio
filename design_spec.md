# Portfolio Design Specification

## Overview
**Objective**: Build trust through failure documentation and architectural rigor.
**Aesthetic**: Content-first engineering document.
**Typography**: Clean, minimal — focused on readability over decoration.

---

## Structure (Final)

```
portfolio/
├── README.md               # Project readme (development focused)
├── design_spec.md          # This file
├── design_reference.html   # Original HTML reference
├── index.html              # Vite entry point
├── public/
│   ├── favicon.jpg
│   └── favicon.png
└── src/
    ├── App.tsx             # Flat section composition
    ├── index.css           # Global styles
    ├── main.tsx            # React entry
    └── sections/
        ├── Header.tsx
        ├── EngineeringNotes.tsx
        ├── CurrentWork.tsx
        └── Footer.tsx
```

---

## Content Sections

### 1. Header
- **Title**: "Building Systems from First Principles"
- **Intro**: "Building distributed systems from first principles. Documenting failure modes, constraints, and design trade-offs."
- **Identity**: "BTech CSE | Systems engineering projects with a focus on correctness, failure, and recovery"
- **Navigation**: Notes → Work → Contact

### 2. Engineering Notes (3 Cards)

| Card | Title | Project |
|------|-------|---------|
| 1 | Split-Brain Was Inevitable | Mini Redis/Cassandra |
| 2 | fsync() Is a Design Boundary, Not a Detail | Mini Redis/Cassandra |
| 3 | Signal Propagation Stops at PID 1 | Mini Docker |

Each card follows:
- Project context
- **What failed** box
- **Insight/Constraint** box

### 3. Current Work (2 Projects)

| Project | Description | Link |
|---------|-------------|------|
| Mini Redis/Cassandra | Distributed key-value store exploring replication, consistency, and failure handling | https://github.com/Yumekaz/Mini-Redis-Cassandra |
| Mini Docker | Container runtime with namespaces, cgroups, and overlay filesystems | https://github.com/Yumekaz/Mini-Docker |

**Scope**: Intentionally scoped systems built to expose failure behavior, durability boundaries, and lifecycle mechanics.

### 4. Footer
- **GitHub**: https://github.com/Yumekaz
- **Email**: mihir.swarnkar722@gmail.com (with subject: Portfolio Inquiry)
- Feedback invitation text

---

## Design Principles

1. **Content over visuals** — No animations, no gimmicks
2. **Failure-first narrative** — Document what broke and why
3. **Depth over breadth** — Two deep projects, not ten shallow ones
4. **No overclaiming** — Avoid "production-grade", "enterprise", etc.
5. **Flat structure** — No routing, no state, no abstractions

---

## What NOT to add

- ❌ Animations or transitions
- ❌ More projects (until current ones are deeper)
- ❌ Metrics or stats
- ❌ "About Me" fluff
- ❌ Tech stack badges
- ❌ Routing / SPA complexity

---

## Deployment Checklist

- [x] Structure cleaned (removed dist/, .eslintrc.cjs, vite.svg)
- [x] README rewritten (project-focused)
- [x] Real project links added
- [x] Contact info updated
- [x] Text hardened (no overclaiming, no apologies)
- [x] 3 failure cards (4th removed for focus)
- [ ] Deploy to production

---

## Rationale

1. **Pattern Matching**: Senior engineers read RFCs and design docs daily. This mimics their native environment.
2. **High Signal-to-Noise**: No wasted space. Respect the viewer's time.
3. **Process over Product**: Showing failure modes proves intellectual honesty.
