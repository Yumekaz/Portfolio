// Public case-study data is deliberately smaller than the full project shelf.
// The portfolio leads with distributed backend work, then shows the correctness
// and runtime projects that support that direction.

export interface FailureNote {
  title: string;
  failure: string;
  insight: string;
  insightLabel?: string;
}

export type ProjectStatus = 'Active' | 'Shipped' | 'Hackathon';

export interface Project {
  id: string;
  name: string;
  title: string;
  focus: string;
  description: string;
  highlights: string[];
  proof: string;
  sourcePath: string;
  failureNotes?: FailureNote[];
  githubUrl: string;
  language: string;
  status: ProjectStatus;
}

const projects: Project[] = [
  {
    id: 'coordination',
    name: 'Coordination-service',
    title: 'Coordination-service — Replicated Control Plane',
    focus: 'Distributed coordination',
    description:
      'A coordination engine for hierarchical metadata, sessions, leases, watches, committed operation history, and replicated control-plane state. The system makes leadership, follower lag, recovery, and causal incidents visible instead of hiding them behind a generic key-value API. Its boundaries are explicit: it is a serious local prototype, not a complete consensus proof or a drop-in ZooKeeper replacement.',
    highlights: [
      'Leader/follower replication with quorum-gated operations and failover fencing',
      'Session-backed leases, one-shot watches, and hierarchical metadata',
      'Committed history, causal incident tracing, and a live control-plane visualizer',
      'Cluster tests covering partitions, rejoin, leader crashes, snapshots, and reconfiguration',
    ],
    proof:
      'The repository records 306 passing tests and a FailForge seed-42 certification with zero checker violations; these are repository evidence, not an independent runtime audit in this portfolio build.',
    sourcePath: 'README.md · docs/postmortems/2026-07-failforge-seed42-cert.md',
    githubUrl: 'https://github.com/Yumekaz/Coordination-service',
    language: 'Python',
    status: 'Active',
  },
  {
    id: 'miniRedis',
    name: 'Mini-Redis-Cassandra',
    title: 'Mini-Redis-Cassandra — Consistency Under Failure',
    focus: 'Distributed storage',
    description:
      'An educational distributed key-value store used to explore sharding, replication, membership, and tunable read/write guarantees. Its most valuable artifact is the failure loop: FailForge exposed stale and corrupt reads, the postmortem identified several interacting causes, and the fixes made the consistency boundary explicit. It intentionally does not claim full Raft safety or globally linearizable reads.',
    highlights: [
      'Consistent hashing with virtual nodes and replica ownership',
      'Gossip membership and simplified term-based leader coordination',
      'Tunable ANY, QUORUM, ALL, and STRONG consistency modes',
      'AOF persistence, snapshots, repair paths, and failure-oriented tests',
    ],
    proof:
      'The checked-in seed-42 postmortem reports 23 initial read-after-write violations, concrete root causes, and five consecutive zero-error reruns after the residual fixes.',
    sourcePath: 'docs/DESIGN_DECISIONS.md · docs/postmortems/2026-07-failforge-seed42-raw.md',
    failureNotes: [
      {
        title: 'A quorum write does not make an arbitrary read fresh',
        failure:
          'FailForge found stale or corrupt reads after acknowledged writes. The first configuration used QUORUM writes but allowed bare GET requests to use a local ANY read, so a lagging replica could legally return an older value.',
        insight:
          'Consistency is a property of the complete read/write protocol, not a label attached to one operation. The fix paired the write and read paths, rejected impossible quorum writes, and failed closed when a quorum could not be formed.',
        insightLabel: 'Constraint',
      },
      {
        title: 'The persistence boundary is part of the correctness model',
        failure:
          'The failure campaign also exposed values becoming visible before the client-visible commit path was complete, plus connection-pool interleaving that could produce values absent from the successful operation history.',
        insight:
          'Replication needs a clear prepare/commit boundary and transport ownership rules. Otherwise a system can appear durable while its history says the write never succeeded.',
      },
    ],
    githubUrl: 'https://github.com/Yumekaz/Mini-Redis-Cassandra',
    language: 'Python',
    status: 'Active',
  },
  {
    id: 'failforge',
    name: 'FailForge',
    title: 'FailForge — Deterministic Distributed Failure Testing',
    focus: 'Failure testing',
    description:
      'A local failure-testing lab for distributed key-value stores and coordination engines. FailForge turns a seed or scripted timeline into process, network, filesystem, and clock faults, then checks execution histories against explicit invariants. When a run fails, delta debugging reduces the schedule and workload to a smaller explanation.',
    highlights: [
      'Seeded partitions, crashes, delays, duplication, corruption, clock skew, and disk faults',
      'Invariant checkers for read-after-write, lock exclusivity, and leader uniqueness',
      'Process-group lifecycle management and reproducible fault schedules',
      'Timeline dashboards, reports, and DDMin-style failure minimization',
    ],
    proof:
      'The repository documents first-party adapters for MiniDB and Coordination-service, including a coordination seed-42 certification with zero checker violations and honest single-host limits.',
    sourcePath: 'README.md · failforge_minidb.yml · failforge_coordination.yml',
    githubUrl: 'https://github.com/Yumekaz/FAILFORGE',
    language: 'Go',
    status: 'Active',
  },
  {
    id: 'cairn',
    name: 'Cairn',
    title: 'Cairn — Stateful Deployment Recovery on One Host',
    focus: 'Durable control plane',
    description:
      'A CLI-first, single-node Linux PaaS that deploys stateful services through Mini-Docker and durable DuraFlow workflows. The interesting problem is not dashboard polish; it is keeping runtime state and control-plane metadata truthful when a candidate deploy fails or the daemon dies halfway through a step. The design explicitly defers multi-node orchestration, TLS termination, and distributed metadata.',
    highlights: [
      'Success-only deployment identity so failed candidates cannot become current',
      'Durable workflow steps with worker lease reclaim after daemon interruption',
      'Health-gated deploys, rollback safety, backups, restore, and reconciliation',
      'Runtime adapter boundary between Cairn and Mini-Docker',
    ],
    proof:
      'Checked-in postmortems describe a metadata correctness bug, its pure-rule fix, and a mid-deploy kill/restart proof with explicit residual failure modes.',
    sourcePath: 'docs/design/CAIRN_SINGLE_NODE.md · docs/postmortems/',
    githubUrl: 'https://github.com/Yumekaz/Cairn',
    language: 'Go',
    status: 'Active',
  },
  {
    id: 'drt',
    name: 'DRT',
    title: 'DRT — Deterministic Concurrency Testing',
    focus: 'Correctness tooling',
    description:
      'A record-and-replay runtime for Python code that explicitly opts into DRT-managed threads, synchronization primitives, and nondeterministic APIs. It turns a fragile concurrency failure into a trace, replay, failure bundle, and potentially a minimized schedule. The explicit API is a deliberate honesty boundary: arbitrary threading programs are not silently claimed to be controllable.',
    highlights: [
      'Cooperative scheduler with controlled synchronization points',
      'Binary event logs with truncation detection and replay drift checks',
      'Seeded schedule exploration, failure bundles, trace reports, and minimization',
      'Pytest integration plus a documented lost-update case study',
    ],
    proof:
      'DESIGN.md records the API, scheduler, log, nondeterminism, and fail-fast tradeoffs; the case study shows how one lost-update bug becomes replayable evidence.',
    sourcePath: 'DESIGN.md · docs/CASE_STUDY_LOST_UPDATE.md',
    githubUrl: 'https://github.com/Yumekaz/DRT',
    language: 'Python',
    status: 'Active',
  },
  {
    id: 'qydrel',
    name: 'Qydrel',
    title: 'Qydrel — Compiler and Runtime Correctness Lab',
    focus: 'Semantic correctness',
    description:
      'A small Rust language and runtime built around an audit loop rather than language breadth. Programs can be checked by an independent AST oracle, verified before execution, compared across VM backends, replayed through traces, fuzzed with metamorphic variants, and preserved as minimized regressions. The narrow JIT and small language are intentional so the invariants stay inspectable.',
    highlights: [
      'AST oracle, bytecode verifier, VM/GC-VM/optimized backend comparison',
      'Trace replay, VM-vs-GC instruction diffs, and deterministic fuzzing',
      'AST-aware shrinking and a checked-in bug museum',
      'Reviewer-facing evidence reports with coverage and backend matrices',
    ],
    proof:
      'The evidence snapshot reports 281 oracle comparisons, 241 metamorphic variants, 26 of 34 observed opcodes, and a fixed undefined-local JIT eligibility regression.',
    sourcePath: 'docs/evidence-report.md · docs/bug-museum.md',
    githubUrl: 'https://github.com/Yumekaz/Qydrel',
    language: 'Rust',
    status: 'Active',
  },
  {
    id: 'miniDocker',
    name: 'Mini-Docker',
    title: 'Mini-Docker — Linux Runtime Primitives',
    focus: 'Runtime systems',
    description:
      'A from-scratch Linux container runtime in Python using namespaces, cgroups v2, OverlayFS, virtual networking, seccomp, capabilities, and a Unix-socket daemon. It is useful here as the execution layer beneath Cairn, while remaining honest that it is not an audited hostile multi-tenant sandbox or a Docker replacement.',
    highlights: [
      'PID, UTS, mount, IPC, network, user, and cgroup isolation paths',
      'Resource controls, OverlayFS layering, veth networking, and port publishing',
      'Seccomp-BPF, capability reduction, and NO_NEW_PRIVS hardening',
      'Lifecycle, metadata, logs, restart, rootless, and daemon API surfaces',
    ],
    proof:
      'The architecture document records the data flow and design choices; the README explicitly lists the remaining hardening work and security boundaries.',
    sourcePath: 'docs/ARCHITECTURE.md · docs/SECURITY-MODEL.md',
    failureNotes: [
      {
        title: 'PID 1 is a lifecycle boundary',
        failure:
          'A container process running as PID 1 does not automatically behave like a normal child process. Signals may not reach the intended workload and orphaned children may remain after shutdown.',
        insight:
          'Container lifecycle needs an init-like responsibility for signal forwarding and child reaping. Isolation is not only namespaces and mounts; process semantics matter too.',
        insightLabel: 'Constraint',
      },
    ],
    githubUrl: 'https://github.com/Yumekaz/Mini-Docker',
    language: 'Python',
    status: 'Active',
  },
  {
    id: 'tinyTantrum',
    name: 'TinyTantrum',
    title: 'TinyTantrum — Reproducible GPT Laboratory',
    focus: 'ML infrastructure',
    description:
      'A from-scratch character-level GPT laboratory that treats training as an inspectable experiment. It includes checkpoint recovery, independent evaluation, multi-seed checks, controlled context and positional ablations, and an interpretability report. It is not presented as a novel architecture or state-of-the-art language model; the contribution is the reproducible engineering loop.',
    highlights: [
      'Hand-built tokenizer, attention, transformer blocks, and training path',
      'Atomic checkpoints containing model, optimizer, RNG, configuration, and step state',
      'Independent evaluation, interrupted-resume verification, and multi-seed evidence',
      'Controlled context-length and positional-information ablations',
    ],
    proof:
      'The checked-in release record includes dataset hashing, environment limits, independent validation, and an ablation where removing learned positions worsened validation loss under the stated setup.',
    sourcePath: 'results/benchmark.md · results/reproducibility.json · results/release_report.md',
    githubUrl: 'https://github.com/Yumekaz/TinyTantrum',
    language: 'Python',
    status: 'Shipped',
  },
];

export default projects;
