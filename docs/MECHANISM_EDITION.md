# Mechanism edition

This pass addresses the specific weaknesses in the visual review: unreadably
small diagrams, repeated generic headings, decorative exploration cards without
enough substance, and visible seams in the homepage image effect.

## Case-study explanations

`src/data/systemStories.ts` holds the four stages, takeaway, evidence facts, and
source URL for every case. `SystemStory` renders a separate spatial explanation
for each mechanism: replicas, a fault score, deployment identities, interleaved
threads, compiler witnesses, isolation layers, and checkpoint state.

These are **explanatory models**, not live backend execution or benchmark logs.
The Mini-Redis version numbers and DRT counter values are illustrative. The
existing source records substantiate the actual failure mechanisms. Evidence
counts retain their recorded scope; no independent rerun is implied.

The seven note lenses summarize their original failure/decision arguments.
Sources remain attached, and every lens links to its related case study.

## Exploration evidence

`src/data/exhibits.ts` records the question, three explanatory stages, design
principle, limitations, stack, and artifact attribution for all nine entries.
Six use purpose-built HTML/SVG diagrams; three show original repository files.
No generated image substitutes for an actual interface or scientific plot.

| Local artifact                             | Repository source                                                                                                   | Interpretation                                                                               |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `public/evidence/orbits-product.png`       | [Orbits demo capture](https://github.com/Yumekaz/Orbits/blob/main/examples/orbits-demo.png)                         | Example codebase from the repository; displayed metrics belong to that capture               |
| `public/evidence/aerovoxel-evaluation.png` | [AeroVoxel held-out plot](https://github.com/Yumekaz/AeroVoxel/blob/main/backend/app/ml/artifacts/pred_vs_lbm.png)  | Surrogate predictions versus an educational LBM force proxy, not certified drag measurements |
| `public/evidence/bitnet-benchmark.png`     | [Historical T4 plot](https://github.com/Yumekaz/bitnet-1.58b-gemm-triton/blob/main/assets/benchmark_results_t4.png) | Original benchmark with original labels; no general cuBLAS speedup or fresh run claimed      |

Repository README snapshots consulted on October 18, 2026:

| Repository    | README blob SHA                            |
| ------------- | ------------------------------------------ |
| DURAFLOW      | `9c16f9d1dd72e5838e3c3ea1c01dc793591005e7` |
| WasmForge     | `9b067adf63c1303b8e711ff3b1d1636cd0e62098` |
| SILSILA       | `9257ca9f038891fb0113bf82a87a48090b8c3be7` |
| Skein         | `3c0db628bd69089a38418777610c0ef3fff24764` |
| AeroVoxel     | `91f91eca8790e0c06f7dcc29b9ba53d99277e599` |
| BitNet Triton | `d59622c465823f2c38460916d866ba129d69ba7b` |
| AUTOFORGE     | `bd09fffff6dbb2d1d3ea75ee704a9977c8dd5740` |

Orbits was inspected at repository tree
`9e0125e3ef2e22139314e250ca0c39aba2a4952a`.
MAJA's repository was redirected and could not be read through the available
connector. Its entry therefore stays within the pre-existing portfolio
and user-provided description: same-network use, authenticated rooms, and
client-side encryption. It adds no unverified security-audit claim.

Other boundaries retained: DuraFlow does not make external effects exactly-once;
WasmForge offline use requires a warm load; Orbits confidence is not proof of
safe deletion; SILSILA is simulation; Skein credits its bitchat Android lineage;
AUTOFORGE reports validation evidence rather than automotive certification.

## Maintenance

- Explanations are intentionally local and deterministic. Do not turn a diagram
  into a claim of running the associated project in the visitor's browser.
- Use `siteUrl` for local artifact paths so GitHub Pages subpath builds work.
- Keep actual evidence visually labeled and link to its original source.
- Preserve manual controls when changing animation behavior.
- The original `design_spec.md` and earlier edition documents are historical;
  the current implementation is described by this document and FULL_PORTFOLIO.
