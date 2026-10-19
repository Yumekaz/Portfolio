export interface Exhibit {
  id: string;
  question: string;
  principle: string;
  boundary: string;
  stages: [string, string, string];
  descriptions: [string, string, string];
  stack: string[];
  artifact?: { image: string; alt: string; caption: string; source: string };
}

// Text is grounded in the linked repositories. Mechanism panels are explanatory
// models, not running instances. Artifact images are unaltered repository files.
export const exhibits: Exhibit[] = [
  {
    id: "duraflow",
    question: "What survives when the worker disappears?",
    principle: "Execution is temporary. Progress needs a durable home.",
    boundary:
      "Durable progress does not make an external side effect exactly-once. Steps still need replay-safe behavior; compensation is not an ACID rollback.",
    stages: ["Persist", "Interrupt", "Reclaim"],
    descriptions: [
      "A workflow records its dependencies and completed steps in durable storage.",
      "The worker disappears. Its lease and the workflow’s persisted state are separate facts.",
      "An expired lease permits recovery. A new worker resumes from the durable state.",
    ],
    stack: ["YAML workflows", "SQLite / PostgreSQL", "Leases + retries"],
  },
  {
    id: "orbits",
    question: "Before changing code, see what depends on it.",
    principle:
      "A map is useful when it also shows the limits of its knowledge.",
    boundary:
      "Static reachability and optional runtime traces are different kinds of evidence. A low-confidence dead-code candidate is a question to investigate, not proof that deletion is safe.",
    stages: ["Scan", "Connect", "Inspect"],
    descriptions: [
      "Extract files, imports, entry points, and relationships.",
      "Build a navigable graph with optional runtime evidence.",
      "Inspect impact and confidence before attempting a refactor.",
    ],
    stack: ["Python analysis", "D3 + canvas", "Confidence annotations"],
    artifact: {
      image: "orbits-product.png",
      alt: "Orbits repository demo: a dark codebase graph with main.py, core.py, util.py, test_core.py and an orphaned old.py.",
      caption: "Repository demo capture · example codebase",
      source:
        "https://github.com/Yumekaz/Orbits/blob/main/examples/orbits-demo.png",
    },
  },
  {
    id: "wasmforge",
    question: "How much of a development environment fits in a browser?",
    principle: "Keep the work local. Make the execution boundary visible.",
    boundary:
      "Offline use requires an initial warm load. Browser runtimes have different capabilities from native tooling; a local-folder connection or host bridge is an explicit additional boundary.",
    stages: ["Edit", "Execute", "Keep"],
    descriptions: [
      "A workspace lives beside the editor, with browser-owned storage.",
      "Python, JavaScript, TypeScript, and SQL use their respective browser runtimes and workers.",
      "OPFS and cached assets support local persistence and warmed offline use.",
    ],
    stack: ["Pyodide + workers", "OPFS", "sql.js / PGlite"],
  },
  {
    id: "maja",
    question: "A room should have a clear boundary.",
    principle:
      "Identity, room membership, and message content are separate concerns.",
    boundary:
      "The project is a same-network messenger. This portfolio does not claim an independent cryptographic audit or internet-scale messaging infrastructure.",
    stages: ["Identity", "Room", "Message"],
    descriptions: [
      "Authenticated identity establishes who is making a request.",
      "Room membership determines the conversation a participant can enter.",
      "Client-side encryption protects message content within the project’s stated model.",
    ],
    stack: [
      "Same-network use",
      "Authenticated rooms",
      "Client-side encryption",
    ],
  },
  {
    id: "silsila",
    question: "One disrupted flight. How many consequences?",
    principle:
      "A recovery choice moves through aircraft, crew, and passenger dependencies.",
    boundary:
      "This is simulation and decision support, not a live airline operations system. Scenario provenance matters, including synthetic fallback inputs.",
    stages: ["Disrupt", "Propagate", "Compare"],
    descriptions: [
      "Introduce a disruption into a hub schedule.",
      "Follow the effect through connected aircraft, crew, and passenger constraints.",
      "Compare swap, delay, and cancel alternatives across competing objectives.",
    ],
    stack: ["Dependency graphs", "Pareto tradeoffs", "Monte Carlo scenarios"],
  },
  {
    id: "skein",
    question: "Can the message travel without the internet?",
    principle:
      "Nearby devices can become a path, even when no central connection exists.",
    boundary:
      "Built on the open-source bitchat Android base, under GPL-3.0. Bluetooth reach, device behavior, and peer availability constrain delivery; no independent security audit is claimed.",
    stages: ["Discover", "Relay", "Synchronize"],
    descriptions: [
      "Bluetooth discovers nearby peers.",
      "Multi-hop forwarding and store-and-forward extend the possible delivery path.",
      "Peers reconcile message knowledge as connections change. Optional internet transports are separate.",
    ],
    stack: ["Android + BLE", "Store-and-forward", "Open-source lineage"],
  },
  {
    id: "aerovoxel",
    question: "What does a fast prediction miss about the flow?",
    principle:
      "Compare the surrogate with the simulator it is learning to approximate.",
    boundary:
      "The live tunnel uses educational 2D D2Q9 LBM. The plotted target is a force proxy, not a certified aerodynamic drag coefficient or a validated 3D wind-tunnel result.",
    stages: ["Simulate", "Predict", "Compare"],
    descriptions: [
      "Run the 2D lattice-Boltzmann model around a geometry mask.",
      "A learned surrogate estimates the force proxy from geometry.",
      "Compare held-out predictions with the LBM proxy; disagreement remains visible.",
    ],
    stack: ["D2Q9 LBM", "CPU simulation", "ML surrogate"],
    artifact: {
      image: "aerovoxel-evaluation.png",
      alt: "Original AeroVoxel held-out scatter plot comparing mlp_geom predictions against the LBM force proxy, with a diagonal reference line.",
      caption: "Repository evaluation plot · held-out force proxy",
      source:
        "https://github.com/Yumekaz/AeroVoxel/blob/main/backend/app/ml/artifacts/pred_vs_lbm.png",
    },
  },
  {
    id: "bitnet-triton",
    question: "Smaller weights. A faster kernel? Not automatically.",
    principle:
      "Compression saves representation space. Decoding and execution still cost time.",
    boundary:
      "The historical T4 benchmark did not show a general win over FP16 cuBLAS. These are synthetic ternary-weight experiments, not a full BitNet model or a new benchmark run.",
    stages: ["Pack", "Decode", "Measure"],
    descriptions: [
      "Four ternary weights are stored per byte using fixed two-bit codes.",
      "The kernel decodes values before the dot product, adding work to the execution path.",
      "The checked-in latency plot exposes the negative result rather than hiding it.",
    ],
    stack: [
      "Triton kernels",
      "Fixed 2-bit packing",
      "Historical NVIDIA T4 run",
    ],
    artifact: {
      image: "bitnet-benchmark.png",
      alt: "Original BitNet Triton T4 latency chart comparing packed ternary kernels with FP16 cuBLAS across matrix sizes. Packed kernels are slower in this recorded benchmark.",
      caption: "Historical repository benchmark · original labels retained",
      source:
        "https://github.com/Yumekaz/bitnet-1.58b-gemm-triton/blob/main/assets/benchmark_results_t4.png",
    },
  },
  {
    id: "autoforge",
    question: "Generated code is the start of the review.",
    principle:
      "Separate the requirement, the tests, the implementation, and the acceptance decision.",
    boundary:
      "Validation artifacts are useful evidence, not MISRA, ASPICE, or ASIL certification. A skipped optional tool must remain distinguishable from a passed check.",
    stages: ["Specify", "Challenge", "Package"],
    descriptions: [
      "Structured requirements provide the starting contract.",
      "An Auditor derives tests; an Architect produces code for the validation gates.",
      "Package accepted artifacts and their reports. Preserve failures, timeouts, and skipped checks.",
    ],
    stack: ["YAML requirements", "Auditor / Architect", "Validation reports"],
  },
];
