export interface EngineeringNote {
  id: string;
  title: string;
  project: string;
  category: string;
  failure: string;
  decision: string;
  boundary: string;
  sourceLabel: string;
  sourceUrl: string;
}

// These notes are derived from checked-in design docs and postmortems. They are
// intentionally written as small engineering arguments, not marketing claims.
const engineeringNotes: EngineeringNote[] = [
  {
    id: 'quorum-is-not-freshness',
    title: 'A quorum write does not make an arbitrary read fresh',
    project: 'Mini-Redis-Cassandra + FailForge',
    category: 'Consistency',
    failure:
      'A seed-42 campaign found stale and corrupt reads after acknowledged writes. The first configuration used QUORUM writes while bare GET requests could use a local ANY read, so a lagging replica could legally answer with an older value.',
    decision:
      'The repair made the read/write contract explicit: reject impossible quorum writes, return an error when a quorum cannot be formed, use a leader-backed STRONG path for the tested invariant, and separate prepare from commit before exposing replicated values.',
    boundary:
      'This is a concrete consistency lesson, not a claim of full Raft safety or globally linearizable reads.',
    sourceLabel: 'Read the seed-42 postmortem',
    sourceUrl: 'https://github.com/Yumekaz/Mini-Redis-Cassandra/blob/main/docs/postmortems/2026-07-failforge-seed42-raw.md',
  },
  {
    id: 'failure-testing-needs-a-model',
    title: 'Chaos testing is only useful when the invariant is explicit',
    project: 'FailForge',
    category: 'Failure testing',
    failure:
      'Randomly killing processes can create dramatic logs without telling you whether the system violated a user-visible guarantee. A failure campaign needs a workload, a fault schedule, and a checker that can distinguish an expected operation failure from a correctness violation.',
    decision:
      'FailForge converts a seed into reproducible process, network, filesystem, and clock faults, then evaluates execution history with checkers such as read-after-acknowledged-write, lock exclusivity, and no-two-leaders. Failed schedules can be minimized into smaller explanations.',
    boundary:
      'It is a local, cooperative HTTP/HTTP2 testing lab; it is not a production chaos platform, raw packet interceptor, or formal verifier.',
    sourceLabel: 'Read the framework README',
    sourceUrl: 'https://github.com/Yumekaz/FAILFORGE/blob/main/README.md',
  },
  {
    id: 'metadata-commit-boundary',
    title: 'A safe deploy protects metadata as well as runtime traffic',
    project: 'Cairn',
    category: 'Recovery',
    failure:
      'Cairn correctly kept a healthy container serving after a failed candidate deploy, but the control-plane metadata still pointed at the failed deployment. The runtime was safe while the database told a lie.',
    decision:
      'Candidate deployments now retain the previous identity and become current only after health success. Pure PrepareCandidate, AfterSuccess, and AfterFailure rules are shared across normal deploys and environment-triggered redeploys.',
    boundary:
      'Cairn is deliberately single-node. The proof covers local crash and deployment semantics, not highly available control-plane replication.',
    sourceLabel: 'Read the postmortem',
    sourceUrl: 'https://github.com/Yumekaz/Cairn/blob/main/docs/postmortems/2026-07-failed-deploy-metadata.md',
  },
  {
    id: 'interrupted-work-is-not-failure',
    title: 'An interrupted workflow is not automatically a failed workflow',
    project: 'Cairn + DuraFlow',
    category: 'Durability',
    failure:
      'Killing the control daemon during a migration or container-start step could previously be interpreted as a real deploy failure. Reconciliation could also race with a candidate that was still recoverable.',
    decision:
      'The recovery path distinguishes cancellation from failure, leaves interrupted work resumable, skips reconciliation while any deploy is active, and lets DuraFlow reclaim expired worker leases. Startup makes incomplete work visible instead of silently discarding it.',
    boundary:
      'Some candidate container identity is reconstructed from deterministic names, and orphan cleanup remains a residual risk documented by the project.',
    sourceLabel: 'Read the crash-recovery proof',
    sourceUrl: 'https://github.com/Yumekaz/Cairn/blob/main/docs/postmortems/2026-07-mid-deploy-crash-recovery.md',
  },
  {
    id: 'explicit-determinism',
    title: 'An explicit boundary is better than a silent determinism lie',
    project: 'DRT',
    category: 'Correctness',
    failure:
      'Transparent interception of every Python source of nondeterminism would look convenient, but missing one import, file read, or timing source would produce a replay that appeared valid while silently omitting part of the execution.',
    decision:
      'DRT requires users to opt into managed threads, synchronization, and nondeterministic APIs. That creates more upfront work, but the guarantee is legible: code outside the API boundary is not promised to replay deterministically.',
    boundary:
      'The runtime is cooperative and userspace-only. It does not transparently control arbitrary threading programs, processes, or distributed clocks.',
    sourceLabel: 'Read the design tradeoffs',
    sourceUrl: 'https://github.com/Yumekaz/DRT/blob/main/DESIGN.md',
  },
  {
    id: 'proof-before-optimization',
    title: 'A fast backend is not correct until it survives comparison',
    project: 'Qydrel',
    category: 'Runtime correctness',
    failure:
      'A narrow JIT path can mishandle a valid program that reads an undefined local if verifier eligibility is based only on the happy path. The bug is not a benchmark problem; it is a semantic safety problem.',
    decision:
      'Qydrel keeps an independent AST oracle, verifies possible traps before JIT eligibility, compares VM and GC-VM behavior, replays traces, and preserves the minimized case in a bug museum with an executable proof gate.',
    boundary:
      'The evidence report is observed execution coverage, not a proof that every language case or opcode combination has been tested.',
    sourceLabel: 'Read the evidence report',
    sourceUrl: 'https://github.com/Yumekaz/Qydrel/blob/main/docs/evidence-report.md',
  },
  {
    id: 'reproducibility-is-a-feature',
    title: 'Reproducibility includes the limits of the result',
    project: 'TinyTantrum',
    category: 'ML infrastructure',
    failure:
      'A single validation number can look more authoritative than it is if the dataset, seed, training budget, environment, and evaluation procedure are not preserved alongside it.',
    decision:
      'TinyTantrum records dataset hashing, configuration, checkpoint metadata, independent evaluation, a second seed, controlled ablations, and provenance limits. It reports that the context experiment controls steps rather than equal compute, instead of hiding the confounder.',
    boundary:
      'This is a reproducible character-level GPT laboratory, not a novel architecture or a claim of state-of-the-art language modeling.',
    sourceLabel: 'Read the release record',
    sourceUrl: 'https://github.com/Yumekaz/TinyTantrum/blob/main/results/release_report.md',
  },
];

export default engineeringNotes;
