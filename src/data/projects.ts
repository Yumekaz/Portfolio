// ---------------------------------------------------------------------------
// Project data — all 8 systems projects with descriptions, technical
// highlights, and (where applicable) failure notes from the original
// engineering notes section.
// ---------------------------------------------------------------------------

export interface FailureNote {
  title: string;
  failure: string;
  insight: string;
  /** Label for the insight callout — defaults to "Insight" */
  insightLabel?: string;
}

export interface Project {
  id: string;
  name: string;
  title: string;
  description: string;
  highlights: string[];
  failureNotes?: FailureNote[];
}

const projects: Project[] = [
  {
    id: 'miniDocker',
    name: 'Mini‑Docker',
    title: 'Mini‑Docker — Container Runtime from Scratch',
    description:
      'A from‑scratch container runtime in Python built directly on Linux primitives. Mini‑Docker ' +
      'implements process isolation via Linux namespaces (PID, UTS, MNT, IPC, NET, USER), resource ' +
      'control through cgroups v2, copy‑on‑write filesystem layering using OverlayFS, virtual ' +
      'networking with veth pairs and NAT, seccomp/capability hardening, and a Unix‑socket API ' +
      'for higher‑level orchestration. It is not meant to replace Docker; it exists to ' +
      'understand what container platforms abstract away.',
    highlights: [
      'PID, UTS, MNT, IPC, NET, USER, and cgroup namespaces for process isolation',
      'Resource limits via cgroups v2 controllers (CPU, memory, PIDs)',
      'OverlayFS and chroot for copy‑on‑write filesystem layering',
      'Virtual networking: veth pairs, bridge, NAT, and port publishing',
      'Security: seccomp‑BPF filtering, capability dropping, NO_NEW_PRIVS',
      'Unix‑socket REST API for programmatic control and integration',
    ],
    failureNotes: [
      {
        title: 'Signal Propagation Stops at PID 1',
        failure:
          'Signals sent to PID 1 did not propagate to child processes. SIGTERM failed to shut ' +
          'down containers cleanly, leaving orphaned processes.',
        insight:
          'PID 1 has special semantics. Containers require an init‑like process to forward ' +
          'signals and reap children reliably.',
        insightLabel: 'Constraint',
      },
    ],
  },
  {
    id: 'miniRedis',
    name: 'Mini‑Redis‑Cassandra',
    title: 'Mini‑Redis‑Cassandra — Distributed Key‑Value Store',
    description:
      'An educational distributed key‑value database built to explore replication, partition ' +
      'behavior, sharding, and CAP trade‑offs. It implements tunable consistency levels ' +
      'such as ANY, QUORUM, and STRONG; consistent hashing with virtual nodes for balanced key ' +
      'distribution; gossip membership and replica coordination; append‑only persistence for ' +
      'durability experiments; and simulated failures to observe recovery, convergence, and ' +
      'consistency limits.',
    highlights: [
      'Tunable consistency: ANY, QUORUM, STRONG',
      'Consistent hashing with virtual nodes for load balancing',
      'Gossip‑style membership and leader election',
      'Append‑only persistence for durability and crash recovery',
      'Fault‑injection framework to explore partitions and convergence',
    ],
    failureNotes: [
      {
        title: 'Split‑Brain Was Inevitable',
        failure:
          'Short network partitions caused multiple leaders to emerge. Divergent writes were ' +
          'accepted and later overwritten during reconciliation, resulting in silent data loss.',
        insight:
          "Consensus algorithms don't fail slowly — they fail by violating guarantees. " +
          'Simplified leader election turns quorum into an illusion.',
      },
      {
        title: 'fsync() Is a Design Boundary, Not a Detail',
        failure:
          'Crash recovery took hundreds of milliseconds on modest log sizes. Buffered writes ' +
          'did not reduce latency as expected. Forcing durability serialized progress.',
        insight:
          'Persistence has real, unavoidable costs. Durability boundaries must be designed ' +
          'around, not optimized away.',
      },
    ],
  },
  {
    id: 'coordination',
    name: 'Coordination‑Service',
    title: 'Coordination‑Service — Crash‑Aware Control Plane',
    description:
      'A coordination service focused on replicated control‑plane state, quorum‑gated writes, and ' +
      'crash‑aware behavior. It builds leader/follower style replication for shared ' +
      'coordination state, implements quorum‑gated writes to avoid unsafe single‑node ' +
      'acceptance paths, tracks causal incident history to explain failures and recovery, ' +
      'and exposes live control‑plane visibility instead of treating failures as opaque logs.',
    highlights: [
      'Leader/follower replication and failover for coordination state',
      'Quorum‑gated writes to guarantee safety in the presence of partitions',
      'Causal history to trace incident chains and recovery sequences',
      'Real‑time control‑plane visibility instead of post‑mortem logs',
    ],
  },
  {
    id: 'drt',
    name: 'DRT',
    title: 'DRT — Deterministic Record/Replay Runtime',
    description:
      'DRT is a deterministic record‑and‑replay runtime for Python that opts ' +
      'threads into DRT‑managed execution. It records the scheduling and runtime ' +
      'behavior needed to reproduce difficult concurrency failures, allows replaying ' +
      'executions to make nondeterministic bugs inspectable, and focuses on debugging ' +
      'the class of bugs that disappear when you add logs.',
    highlights: [
      'Controlled scheduling for threads and synchronization primitives',
      'Recording of nondeterministic operations and context switches',
      'Replay of recorded executions with drift detection',
      'Failure bundles and trace reports for analysis',
      'Designed to turn flaky concurrency bugs into reproducible cases',
    ],
  },
  {
    id: 'qydrel',
    name: 'Qydrel',
    title: 'Qydrel — Compiler/Runtime Correctness Lab',
    description:
      'Qydrel is a compiler/runtime correctness lab focused on catching semantic ' +
      'mismatches between execution paths. It verifies bytecode, compares VM, ' +
      'GC VM, and JIT‑style execution behavior, uses fuzzing and shrinking to ' +
      'generate counterexamples, and captures regression corpuses. This project ' +
      'explores correctness testing for language runtimes instead of only building ' +
      'language features.',
    highlights: [
      'Bytecode verification and structural correctness checks',
      'AST oracle execution to establish ground‑truth semantics',
      'VM/GC VM/JIT equivalence testing',
      'Fuzzing and shrinking to find minimal failing programs',
      'Trace replay and regression corpus generation',
    ],
  },
  {
    id: 'orbits',
    name: 'Orbits',
    title: 'Orbits — Codebase Map & Cleanup Tool',
    description:
      'Orbits is a codebase visualization and cleanup tool for understanding structure, ' +
      'entrypoints, dependency flow, runtime behavior, and impact paths. It maps how ' +
      'a codebase is connected instead of showing files as isolated units, identifies ' +
      'entrypoints and dependency edges, and generates cleanup candidates and ' +
      'evidence‑backed refactoring plans.',
    highlights: [
      'Static dependency graphing across languages',
      'Runtime overlays to connect static structure to dynamic behavior',
      'Architecture diffs and cleanup plans',
      'Language coverage analysis and dead‑code confidence scoring',
      'Visual exploration and interactive visualizer',
    ],
  },
  {
    id: 'wasmForge',
    name: 'WasmForge',
    title: 'WasmForge — Local‑First Browser IDE',
    description:
      'WasmForge is a local‑first browser IDE and notebook environment that runs Python, ' +
      'JavaScript/TypeScript, SQLite, and PostgreSQL‑style workflows inside the browser. ' +
      'It runs code locally using WebAssembly and browser workers, uses local‑first ' +
      'storage through browser‑side persistence, and supports offline‑first experimentation ' +
      'without depending on a remote runtime. This hackathon product reflects an ' +
      'interest in local‑first developer infrastructure and browser‑based compute.',
    highlights: [
      'Runs Python and JS/TS with Pyodide and WebAssembly',
      'Embedded SQLite and PostgreSQL‑like workflows in the browser',
      'Local‑first storage and offline‑first design',
      'Notebook‑style environment for experimentation',
    ],
  },
  {
    id: 'autoforge',
    name: 'Autoforge',
    title: 'Autoforge — Governed AI Code Generation',
    description:
      'Autoforge is a governed GenAI pipeline for software‑defined vehicle workflows. It ' +
      'converts structured YAML specifications into traceable generated code, uses ' +
      'adversarial and test‑first validation stages, separates generation, architecture ' +
      'review, and auditing roles, and emphasizes deterministic validation gates ' +
      'instead of blind AI output trust.',
    highlights: [
      'Structured YAML‑to‑code generation with traceability',
      'Adversarial and test‑first validation gates',
      'Separation of generation, review, and audit roles',
      'Deterministic validation stages and evidence of correctness',
    ],
  },
];

export default projects;
