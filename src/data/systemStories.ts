export interface StoryStep {
  label: string;
  title: string;
  body: string;
  signal: string;
}
export interface SystemStory {
  title: string;
  deck: string;
  steps: StoryStep[];
  takeaway: string;
  decisionsTitle: string;
  evidenceTitle: string;
  facts: { value: string; label: string }[];
  source: string;
  sourceLabel: string;
}
// Explanatory sequences derived from the existing case studies. Example values
// illustrate the mechanism; they are not execution logs or new benchmark results.
export const systemStories: Record<string, SystemStory> = {
  coordination: {
    title: "Who is allowed to change the truth?",
    deck: "Follow a control-plane operation through leadership, replication, and failover.",
    steps: [
      {
        label: "Propose",
        title: "One leader receives the operation.",
        body: "A client asks the control plane to change metadata. Receiving a request does not make it committed history.",
        signal: "REQUEST RECEIVED",
      },
      {
        label: "Replicate",
        title: "Agreement comes before acknowledgement.",
        body: "The operation follows a quorum-gated replication path. The history becomes useful because the commitment boundary is explicit.",
        signal: "QUORUM GATE",
      },
      {
        label: "Fence",
        title: "A former leader must lose authority.",
        body: "A disconnected or superseded leader cannot keep acting as the current authority. Failover fencing protects that boundary.",
        signal: "OLD AUTHORITY FENCED",
      },
      {
        label: "Inspect",
        title: "Keep the reason, not just the result.",
        body: "Committed history, follower lag, leases, and causal incidents remain inspectable. The repository tests these paths; this sequence is an explanation, not a consensus proof.",
        signal: "HISTORY IS INSPECTABLE",
      },
    ],
    takeaway:
      "A control plane needs an explainable history of who could act, and when.",
    decisionsTitle: "Leadership is only one part of coordination.",
    evidenceTitle: "What survived the fault campaign.",
    facts: [
      {
        value: "306",
        label: "passing tests recorded in the portfolio evidence snapshot",
      },
      {
        value: "Seed 42",
        label: "the documented FailForge certification campaign",
      },
      {
        value: "Local",
        label: "prototype scope; no complete consensus proof claimed",
      },
    ],
    source:
      "https://github.com/Yumekaz/Coordination-service/blob/main/docs/postmortems/2026-07-failforge-seed42-cert.md",
    sourceLabel: "Read the certification record",
  },
  miniRedis: {
    title: "The write succeeded. The read was wrong.",
    deck: "A four-step explanation of the read-after-write failure. Values are illustrative.",
    steps: [
      {
        label: "Write",
        title: "A new value enters the cluster.",
        body: "Start with three replicas at version 1. A client asks to write version 2. One replica is lagging.",
        signal: "WRITE v2",
      },
      {
        label: "Acknowledge",
        title: "Two acknowledgements are enough to write.",
        body: "Replicas A and B now have version 2. The QUORUM write can succeed while replica C still holds version 1.",
        signal: "2 OF 3 ACKNOWLEDGED",
      },
      {
        label: "Read stale",
        title: "ANY can choose the replica that missed it.",
        body: "The original bare GET path could answer from a local ANY read. A successful write did not force that read to observe the new value.",
        signal: "READ RETURNS v1",
      },
      {
        label: "Repair contract",
        title: "Specify the read path as well as the write.",
        body: "The documented repair used a leader-backed STRONG path for the tested invariant, rejected impossible quorums, and separated prepare from commit.",
        signal: "EXPLICIT READ / WRITE CONTRACT",
      },
    ],
    takeaway:
      "“Quorum” describes an operation. Consistency depends on the complete protocol.",
    decisionsTitle: "Four boundaries the failure made visible.",
    evidenceTitle: "From 23 violations to five clean reruns.",
    facts: [
      {
        value: "23",
        label: "initial violations reported in the seed-42 postmortem",
      },
      {
        value: "5",
        label: "consecutive zero-error reruns recorded after fixes",
      },
      {
        value: "Bounded",
        label: "no claim of full Raft safety or globally linearizable reads",
      },
    ],
    source:
      "https://github.com/Yumekaz/Mini-Redis-Cassandra/blob/main/docs/postmortems/2026-07-failforge-seed42-raw.md",
    sourceLabel: "Inspect the seed-42 postmortem",
  },
  failforge: {
    title: "Turn a bad run into a smaller explanation.",
    deck: "The useful output is a reproducible violation, not a dramatic wall of logs.",
    steps: [
      {
        label: "Schedule",
        title: "Give the experiment an address.",
        body: "A seed or explicit timeline fixes the workload and fault schedule so the same campaign can be examined again.",
        signal: "SEEDED FAULT PLAN",
      },
      {
        label: "Inject",
        title: "Change the conditions deliberately.",
        body: "Process, network, filesystem, and clock faults exercise the system through its adapters. Expected operation failures are not automatically correctness violations.",
        signal: "FAULTS APPLIED",
      },
      {
        label: "Check",
        title: "Ask a precise question of the history.",
        body: "Checkers examine invariants such as read-after-acknowledged-write, lock exclusivity, and leader uniqueness.",
        signal: "INVARIANT CHECKED",
      },
      {
        label: "Minimize",
        title: "Remove everything the failure does not need.",
        body: "DDMin-style minimization reduces the schedule and workload while retaining the violation. The result is a more manageable explanation to replay.",
        signal: "SMALLER REPRODUCER",
      },
    ],
    takeaway:
      "A failure is useful when someone else can reproduce and explain it.",
    decisionsTitle: "Make the experiment reproducible at every layer.",
    evidenceTitle: "The adapters connect the story to real systems.",
    facts: [
      { value: "Seeded", label: "fault schedules and workload reproduction" },
      {
        value: "Checked",
        label: "histories evaluated against explicit invariants",
      },
      { value: "Minimized", label: "DDMin-style reduction of failing runs" },
    ],
    source: "https://github.com/Yumekaz/FAILFORGE/blob/main/README.md",
    sourceLabel: "Read the framework and its limits",
  },
  cairn: {
    title: "Healthy traffic. Dishonest metadata.",
    deck: "A deployment can fail safely at runtime and still corrupt the control plane’s story.",
    steps: [
      {
        label: "Prepare",
        title: "Keep the working identity while preparing a candidate.",
        body: "The healthy deployment remains current. A candidate has not earned that identity simply by being created.",
        signal: "CURRENT: A / CANDIDATE: B",
      },
      {
        label: "Fail health",
        title: "The candidate fails its health gate.",
        body: "The old workload keeps serving. In the recorded bug, control-plane metadata could nevertheless point at the failed candidate.",
        signal: "RUNTIME SAFE / METADATA AT RISK",
      },
      {
        label: "Preserve",
        title: "Failure must preserve the previous identity.",
        body: "PrepareCandidate, AfterSuccess, and AfterFailure rules make the metadata transition explicit across deploy and redeploy paths.",
        signal: "FAILED B NEVER BECOMES CURRENT",
      },
      {
        label: "Recover",
        title: "Interruption is a different state from failure.",
        body: "Durable workflow steps and lease reclaim allow interrupted work to resume. Reconciliation must not race an active, recoverable deployment.",
        signal: "RESUMABLE WORK REMAINS VISIBLE",
      },
    ],
    takeaway:
      "Protect what is serving—and protect the metadata that says what is serving.",
    decisionsTitle: "Recovery crosses three systems.",
    evidenceTitle: "Two postmortems, two different failure boundaries.",
    facts: [
      {
        value: "Identity",
        label: "only a successful candidate becomes current",
      },
      {
        value: "Leases",
        label: "interrupted workflow ownership can be reclaimed",
      },
      { value: "1 host", label: "deliberate scope of the control-plane model" },
    ],
    source:
      "https://github.com/Yumekaz/Cairn/blob/main/docs/postmortems/2026-07-failed-deploy-metadata.md",
    sourceLabel: "Read the metadata failure record",
  },
  drt: {
    title: "Two increments. One lost update.",
    deck: "An illustrative interleaving shows why the schedule is part of the evidence.",
    steps: [
      {
        label: "Read A",
        title: "Thread A reads zero.",
        body: "A read-modify-write operation begins by observing the shared value. The increment has not been committed yet.",
        signal: "A READS 0",
      },
      {
        label: "Read B",
        title: "Thread B also reads zero.",
        body: "A scheduling point lets B run before A writes. Both threads now plan to store the same result.",
        signal: "B READS 0",
      },
      {
        label: "Write both",
        title: "Both write one. One increment disappears.",
        body: "The final value is 1 where the example expected 2. Changing timing on the next run can hide this interleaving.",
        signal: "EXPECTED 2 / OBSERVED 1",
      },
      {
        label: "Replay",
        title: "Keep the order that exposed the bug.",
        body: "DRT records opted-in scheduling and nondeterminism. Replay and drift checks keep the trace useful; arbitrary uninstrumented threads are outside that guarantee.",
        signal: "A.read → B.read → A.write → B.write",
      },
    ],
    takeaway:
      "A reproducible schedule is a better debugging artifact than “it failed once.”",
    decisionsTitle: "Explicit control makes replay honest.",
    evidenceTitle: "The lost-update case is the evidence.",
    facts: [
      {
        value: "Opt-in",
        label: "threads and synchronization under DRT control",
      },
      {
        value: "Replay",
        label: "event logs with truncation and drift detection",
      },
      { value: "Shrink", label: "schedule minimization and failure bundles" },
    ],
    source:
      "https://github.com/Yumekaz/DRT/blob/main/docs/CASE_STUDY_LOST_UPDATE.md",
    sourceLabel: "Read the lost-update case study",
  },
  qydrel: {
    title: "A faster answer is useless if it changes meaning.",
    deck: "Follow a program through the oracle, verifier, backend comparison, and regression corpus.",
    steps: [
      {
        label: "Define",
        title: "Keep an independent account of meaning.",
        body: "The AST oracle provides a reference result for supported programs. The language stays deliberately small enough for its semantics to be inspected.",
        signal: "INDEPENDENT AST ORACLE",
      },
      {
        label: "Verify",
        title: "Reject invalid bytecode before execution.",
        body: "Verification is its own boundary. Programs reaching execution should satisfy the verifier’s structural requirements.",
        signal: "BYTECODE VERIFIED",
      },
      {
        label: "Compare",
        title: "Compare backends, not just outputs in isolation.",
        body: "VM, GC-VM, and optimized paths can be compared against the oracle and through instruction traces. Disagreement becomes a concrete investigation.",
        signal: "BACKEND AGREEMENT CHECK",
      },
      {
        label: "Preserve",
        title: "A smaller counterexample belongs in the museum.",
        body: "Metamorphic fuzzing and AST-aware shrinking reduce failures. Minimized regressions preserve the lesson, including the documented undefined-local JIT eligibility bug.",
        signal: "REGRESSION RETAINED",
      },
    ],
    takeaway:
      "Optimization comes after a result can be checked against independent semantics.",
    decisionsTitle: "Correctness has several independent witnesses.",
    evidenceTitle: "Coverage is measured—and incomplete.",
    facts: [
      {
        value: "281",
        label: "oracle comparisons in the recorded evidence snapshot",
      },
      { value: "241", label: "metamorphic variants in that snapshot" },
      {
        value: "26 / 34",
        label: "observed opcodes; coverage is not completeness",
      },
    ],
    source:
      "https://github.com/Yumekaz/Qydrel/blob/main/docs/evidence-report.md",
    sourceLabel: "Open the evidence report",
  },
  miniDocker: {
    title: "A container is a stack of boundaries.",
    deck: "Inspect what each kernel primitive contributes—and what none of them promises alone.",
    steps: [
      {
        label: "Isolate views",
        title: "Namespaces change what a process sees.",
        body: "PID, mount, network, UTS, IPC, user, and cgroup paths separate views of kernel resources.",
        signal: "NAMESPACES",
      },
      {
        label: "Limit resources",
        title: "A separate view is not a resource budget.",
        body: "Cgroups v2 apply resource controls. OverlayFS and virtual networking supply other parts of the runtime environment.",
        signal: "CGROUPS / FILESYSTEM / NETWORK",
      },
      {
        label: "Reduce power",
        title: "Constrain the privileges that remain.",
        body: "Seccomp-BPF, capability reduction, and NO_NEW_PRIVS are hardening mechanisms. Combining them still does not establish an audited hostile multi-tenant sandbox.",
        signal: "PRIVILEGE BOUNDARY",
      },
      {
        label: "Own lifecycle",
        title: "PID 1 must handle more than starting.",
        body: "Signal forwarding, child reaping, and shutdown behavior matter. A process that starts successfully can still have an incorrect lifecycle.",
        signal: "SIGNALS / REAPING / SHUTDOWN",
      },
    ],
    takeaway:
      "Isolation, resource control, privilege, and lifecycle are separate engineering jobs.",
    decisionsTitle: "The kernel primitives behind the runtime.",
    evidenceTitle: "The security model states what remains outside scope.",
    facts: [
      { value: "Views", label: "namespaces and filesystem layering" },
      { value: "Budgets", label: "cgroups v2 resource controls" },
      { value: "Lifecycle", label: "signals, PID 1 semantics, and cleanup" },
    ],
    source:
      "https://github.com/Yumekaz/Mini-Docker/blob/main/docs/SECURITY-MODEL.md",
    sourceLabel: "Read the security model",
  },
  tinyTantrum: {
    title: "Save the experiment, not just the weights.",
    deck: "An interrupted run needs enough state to resume the same experiment.",
    steps: [
      {
        label: "Train",
        title: "The run has more state than its model.",
        body: "Optimizer state, random generators, configuration, and step position all influence what happens next.",
        signal: "MODEL + OPTIMIZER + RNG + CONFIG + STEP",
      },
      {
        label: "Checkpoint",
        title: "Capture the state together.",
        body: "Atomic checkpoints bundle the experiment state so recovery does not combine pieces from different moments.",
        signal: "ATOMIC CHECKPOINT",
      },
      {
        label: "Resume",
        title: "Interruption should be visible and recoverable.",
        body: "Interrupted-resume verification checks the recovery path. Reproducibility still depends on the recorded environment and dataset.",
        signal: "RECOVERY PATH VERIFIED IN REPOSITORY",
      },
      {
        label: "Evaluate",
        title: "Change one assumption and measure again.",
        body: "Independent evaluation, multiple seeds, and context/position ablations test the experiment. The release record reports worse validation loss without learned positions under its stated setup.",
        signal: "EVALUATE / ABLATE / REPORT",
      },
    ],
    takeaway:
      "The useful contribution is a repeatable experiment with a visible boundary.",
    decisionsTitle: "Reproducibility is designed into the training loop.",
    evidenceTitle: "The release record keeps the setup with the result.",
    facts: [
      { value: "Atomic", label: "checkpoint writes for experiment state" },
      { value: "Multi-seed", label: "checks across recorded training runs" },
      {
        value: "Ablations",
        label: "context and positional-information experiments",
      },
    ],
    source:
      "https://github.com/Yumekaz/TinyTantrum/blob/main/results/release_report.md",
    sourceLabel: "Read the release record",
  },
};
