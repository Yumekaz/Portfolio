import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { siteUrl } from "../lib/paths";

const lenses = [
  {
    project: "miniRedis",
    failure: "An acknowledgement was not enough.",
    decision: "Make the whole contract explicit.",
    before: ["QUORUM write", "Lagging replica", "ANY → stale"],
    after: ["QUORUM write", "STRONG path", "Tested invariant"],
    lesson: "The read path is part of the consistency contract.",
  },
  {
    project: "failforge",
    failure: "A crash log is not a verdict.",
    decision: "Give the chaos a question.",
    before: ["Kill process", "Collect logs", "What failed?"],
    after: ["Seed + schedule", "Check history", "Minimize violation"],
    lesson:
      "Expected operation failure and correctness violation are different outcomes.",
  },
  {
    project: "cairn",
    failure: "Serving A. Recording B.",
    decision: "Commit identity after health.",
    before: ["Healthy A", "Failed B", "current = B"],
    after: ["Healthy A", "Reject B", "current = A"],
    lesson: "The control-plane record must agree with the surviving runtime.",
  },
  {
    project: "cairn",
    failure: "A lost worker looked like lost work.",
    decision: "Recover the ownership of progress.",
    before: ["Daemon exits", "Work interrupted", "Marked failed"],
    after: ["Lease expires", "Reclaim work", "Resume progress"],
    lesson:
      "An interruption describes the worker. It need not describe the workflow.",
  },
  {
    project: "drt",
    failure: "Unseen inputs break the promise.",
    decision: "Draw a boundary people can use.",
    before: ["Hidden input", "Partial record", "False confidence"],
    after: ["Opt-in APIs", "Recorded trace", "Replay + drift"],
    lesson:
      "A smaller explicit guarantee is useful; an implicit universal one is not.",
  },
  {
    project: "qydrel",
    failure: "Happy-path eligibility missed a trap.",
    decision: "Make disagreement executable.",
    before: ["Valid program", "Missed trap", "Unsafe JIT path"],
    after: ["AST oracle", "Verify + compare", "Keep regression"],
    lesson:
      "The counterexample becomes a permanent part of the correctness work.",
  },
  {
    project: "tinyTantrum",
    failure: "One number hid the conditions.",
    decision: "Publish the experiment around it.",
    before: ["Training run", "One score", "Missing context"],
    after: ["Data + seed", "Config + ablation", "Bounded result"],
    lesson:
      "Equal training steps are not necessarily equal compute. Keep that distinction visible.",
  },
];

export function noteHeadings(index: number) {
  return lenses[index];
}

export default function NoteLens({ index }: { index: number }) {
  const [repaired, setRepaired] = useState(false);
  const lens = lenses[index];
  return (
    <div className="note-lens" data-repaired={repaired}>
      <div className="note-lens-top">
        <span>THE ARGUMENT, IN THREE MOVES</span>
        <div role="group" aria-label="Compare the failure and repair">
          <button aria-pressed={!repaired} onClick={() => setRepaired(false)}>
            Failure
          </button>
          <button aria-pressed={repaired} onClick={() => setRepaired(true)}>
            Repair
          </button>
        </div>
      </div>
      <div className="note-lens-flow" aria-live="polite" aria-atomic="true">
        {(repaired ? lens.after : lens.before).map((label, i) => (
          <div key={i}>
            <small>0{i + 1}</small>
            <strong>{label}</strong>
            {i < 2 ? (
              <ArrowRight size={20} />
            ) : (
              <span className="lens-verdict">{repaired ? "↗" : "×"}</span>
            )}
          </div>
        ))}
      </div>
      <div className="note-lens-foot">
        <p>{lens.lesson}</p>
        <a href={siteUrl(`projects/#${lens.project}`)}>
          Open case study <ArrowUpRight size={16} />
        </a>
      </div>
      <span className="lens-caption">
        CONCEPTUAL SUMMARY · SOURCE RECORD BELOW
      </span>
    </div>
  );
}
