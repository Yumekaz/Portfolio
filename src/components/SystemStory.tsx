import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";
import { systemStories } from "../data/systemStories";

function Replicas({
  step,
  coordination,
}: {
  step: number;
  coordination: boolean;
}) {
  const states = coordination
    ? [
        ["PROPOSED", "FOLLOWER", "FOLLOWER"],
        ["COMMITTED", "ACK", "ACK"],
        ["FENCED", "NEW TERM", "FOLLOWER"],
        ["HISTORY", "REJOIN", "LAG VISIBLE"],
      ][step]
    : [
        ["v2 pending", "v1", "v1"],
        ["v2 · ACK", "v2 · ACK", "v1 · lagging"],
        ["v2", "v2", "v1 · returned"],
        ["STRONG read", "quorum path", "not selected"],
      ][step];
  return (
    <div className={`replica-theatre phase-${step}`}>
      <svg
        viewBox="0 0 600 350"
        preserveAspectRatio="none"
        className="story-replica-wires"
        aria-hidden="true"
      >
        <path d="M300 72 L120 245 M300 72 L480 245 M120 245 L480 245" />
        <path
          className="active-wire"
          d={
            step === 2 ? "M480 245 Q520 95 300 72" : "M120 245 L300 72 L480 245"
          }
        />
      </svg>
      {states.map((state, i) => (
        <div
          key={i}
          className={`replica-orbit replica-position-${i} ${step === 2 && i === (coordination ? 0 : 2) ? "node-alert" : ""}`}
        >
          <div className="replica-sphere">
            <span>{["A", "B", "C"][i]}</span>
          </div>
          <strong>{state}</strong>
          <small>
            {coordination
              ? ["Authority", "Follower", "Follower"][i]
              : `Replica ${["A", "B", "C"][i]}`}
          </small>
        </div>
      ))}
      <div className="network-center">
        <span>{coordination ? "CONTROL PLANE" : "EXAMPLE VALUE"}</span>
        <strong>
          {coordination
            ? ["propose", "commit", "fence", "inspect"][step]
            : ["1 → 2", "2 / 3", "stale", "explicit"][step]}
        </strong>
      </div>
    </div>
  );
}
function Faults({ step }: { step: number }) {
  const lanes = ["Workload", "Network", "Process", "Checker"];
  return (
    <div className={`fault-score phase-${step}`}>
      <div className="score-title">
        <span>EXPLANATORY FAULT SCORE</span>
        <strong>seed → history → reproducer</strong>
      </div>
      {lanes.map((lane, i) => (
        <div className="score-lane" key={lane}>
          <span>{lane}</span>
          <div>
            {Array.from({ length: 8 }, (_, j) => (
              <i
                key={j}
                className={`${j === i + 2 ? "fault-mark" : ""} ${step === 3 && j !== i + 2 && j !== 0 ? "score-removed" : ""} ${step >= 1 && j <= step + 3 ? "score-active" : ""}`}
              >
                {j === i + 2 ? ["W", "×", "↓", "!"][i] : ""}
              </i>
            ))}
          </div>
        </div>
      ))}
      <p>
        {
          [
            "A fixed schedule gives the run an identity.",
            "Faults perturb the workload deliberately.",
            "A checker distinguishes failure from violation.",
            "Keep only the events needed to explain the violation.",
          ][step]
        }
      </p>
    </div>
  );
}
function Deploy({ step }: { step: number }) {
  return (
    <div className={`deploy-theatre phase-${step}`}>
      <div className="deploy-columns">
        <div className="deploy-runtime">
          <span>RUNTIME</span>
          <strong>A</strong>
          <p>Healthy · serving</p>
          <i className="service-pulse" />
        </div>
        <div
          className={`deploy-candidate ${step === 1 ? "candidate-failed" : ""}`}
        >
          <span>CANDIDATE</span>
          <strong>B</strong>
          <p>
            {
              [
                "Preparing",
                "Health gate failed",
                "Rejected",
                "Interrupted work",
              ][step]
            }
          </p>
        </div>
      </div>
      <div className="metadata-ledger">
        <span>CONTROL-PLANE RECORD</span>
        <strong>
          current = <em>{step === 1 ? "B?" : "A"}</em>
        </strong>
        <p>
          {
            [
              "Keep the previous identity.",
              "The recorded bug: metadata could point at failure.",
              "AfterFailure preserves the working identity.",
              "A worker lease can expire while work remains resumable.",
            ][step]
          }
        </p>
      </div>
    </div>
  );
}
function Threads({ step }: { step: number }) {
  const events = [
    { who: "A", action: "read", value: "0" },
    { who: "B", action: "read", value: "0" },
    { who: "A", action: "write", value: "1" },
    { who: "B", action: "write", value: "1" },
  ];
  return (
    <div className={`thread-theatre phase-${step}`}>
      <div className="thread-heading">
        <span>ILLUSTRATIVE SHARED COUNTER</span>
        <strong>
          {step < 2 ? "0" : "1"}
          <small> / expected {step < 2 ? "—" : "2"}</small>
        </strong>
      </div>
      <div className="thread-lanes">
        <span>THREAD A</span>
        <span>THREAD B</span>
      </div>
      <div className="thread-events">
        {events.map((event, i) => (
          <div
            key={i}
            className={`thread-event thread-${event.who} ${i <= (step === 0 ? 0 : step === 1 ? 1 : 3) ? "event-visible" : ""}`}
          >
            <small>{String(i + 1).padStart(2, "0")}</small>
            <strong>
              {event.action}({event.value})
            </strong>
            {step === 3 && <span>retained</span>}
          </div>
        ))}
      </div>
      <div className="thread-verdict">
        {step === 3
          ? "Same schedule. Same lost update."
          : step === 2
            ? "Two writes. Only one increment."
            : "The scheduler chooses who runs next."}
      </div>
    </div>
  );
}
function Compiler({ step }: { step: number }) {
  return (
    <div className={`compiler-theatre phase-${step}`}>
      <div className="program-chip">
        <span>ONE PROGRAM</span>
        <code>source → AST → bytecode</code>
      </div>
      <div className="compiler-branches">
        {["AST oracle", "VM", "GC-VM"].map((name, i) => (
          <div key={name} className={step >= i ? "compiler-active" : ""}>
            <span>{name}</span>
            <strong>
              {step === 0
                ? i === 0
                  ? "meaning"
                  : "—"
                : step === 1
                  ? i === 0
                    ? "reference"
                    : "verify"
                  : step === 2
                    ? "compare"
                    : "regression"}
            </strong>
            <i>{step >= 2 ? <Check size={19} /> : <span>0{i + 1}</span>}</i>
          </div>
        ))}
      </div>
      <div className="compiler-corpus">
        <span>
          {
            [
              "REFERENCE SEMANTICS",
              "STRUCTURAL GATE",
              "DIFFERENTIAL CHECK",
              "BUG MUSEUM",
            ][step]
          }
        </span>
        <p>
          {
            [
              "An independent reference, not another optimized backend.",
              "Invalid bytecode should not reach execution.",
              "A mismatch is evidence to investigate.",
              "Fuzz → shrink → preserve a minimized regression.",
            ][step]
          }
        </p>
      </div>
    </div>
  );
}
function Runtime({ step }: { step: number }) {
  const layers = [
    "Namespaces",
    "Cgroups v2",
    "Privilege controls",
    "Process lifecycle",
  ];
  return (
    <div className="runtime-theatre">
      <div className="runtime-stack">
        {layers.map((name, i) => (
          <div
            key={name}
            className={`runtime-layer ${i === step ? "layer-selected" : ""}`}
            style={{ "--layer": i } as CSSProperties}
          >
            <span>0{i + 1}</span>
            <strong>{name}</strong>
            <i>{i === step ? "INSPECTING" : "LINUX"}</i>
          </div>
        ))}
      </div>
      <p className="runtime-caveat">
        A composed runtime, not an audited hostile multi-tenant sandbox.
      </p>
    </div>
  );
}
function Checkpoint({ step }: { step: number }) {
  return (
    <div className={`checkpoint-theatre phase-${step}`}>
      <div className="checkpoint-heading">
        <span>EXPERIMENT STATE</span>
        <strong>
          {["running", "checkpoint", "resumed", "evaluated"][step]}
        </strong>
      </div>
      <div className="checkpoint-parts">
        {["Model", "Optimizer", "RNG", "Config", "Step"].map((part, i) => (
          <div key={part} style={{ "--part": i } as CSSProperties}>
            <span>0{i + 1}</span>
            <strong>{part}</strong>
            <i>
              {step === 0
                ? "live"
                : step === 1
                  ? "saved"
                  : step === 2
                    ? "restored"
                    : "recorded"}
            </i>
          </div>
        ))}
      </div>
      <div className="checkpoint-track">
        <span>TRAIN</span>
        <i />
        <span>INTERRUPT</span>
        <i />
        <span>RESUME</span>
      </div>
      <p>
        {step === 3
          ? "Keep the dataset, environment, and ablation conditions with the result."
          : "Weights alone do not capture the complete experiment."}
      </p>
    </div>
  );
}
export function StoryVisual({
  project,
  step,
}: {
  project: string;
  step: number;
}) {
  if (project === "coordination" || project === "miniRedis")
    return <Replicas step={step} coordination={project === "coordination"} />;
  if (project === "failforge") return <Faults step={step} />;
  if (project === "cairn") return <Deploy step={step} />;
  if (project === "drt") return <Threads step={step} />;
  if (project === "qydrel") return <Compiler step={step} />;
  if (project === "miniDocker") return <Runtime step={step} />;
  return <Checkpoint step={step} />;
}
export default function SystemStory({
  project,
  reducedMotion = false,
}: {
  project: string;
  reducedMotion?: boolean;
}) {
  const story = systemStories[project];
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (reducedMotion) setPlaying(false);
  }, [reducedMotion]);
  useEffect(() => {
    if (!playing || !inView || reducedMotion) return;
    const timer = window.setTimeout(() => {
      if (document.hidden) {
        setPlaying(false);
        return;
      }
      if (step === story.steps.length - 1) setPlaying(false);
      else setStep((value) => value + 1);
    }, 6500);
    return () => clearTimeout(timer);
  }, [playing, inView, step, story.steps.length, reducedMotion]);
  const select = (value: number) => {
    setStep(value);
    setPlaying(false);
  };
  return (
    <div
      className="system-story"
      ref={host}
      data-visible={inView}
      data-playing={playing && inView && !reducedMotion}
    >
      <div className="story-introduction">
        <p className="eyebrow">02 / FOLLOW THE MECHANISM</p>
        <h3>{story.title}</h3>
        <p>{story.deck}</p>
      </div>
      <div className="story-instrument">
        <div className="instrument-topline">
          <span>
            <i /> EXPLANATORY MODEL
          </span>
          <span>
            STEP {step + 1} / {story.steps.length}
          </span>
        </div>
        <div
          className="story-theatre"
          role="img"
          aria-label={`${story.steps[step].title} ${story.steps[step].signal}`}
        >
          <StoryVisual project={project} step={step} />
        </div>
        <div className="story-signal" key={`signal-${step}`}>
          <span>↳</span>
          {story.steps[step].signal}
        </div>
        <div className="story-transport">
          <button
            aria-label="Previous step"
            disabled={step === 0}
            onClick={() => select(step - 1)}
          >
            <ArrowLeft size={18} />
          </button>
          <button
            className="story-play"
            disabled={reducedMotion}
            onClick={() => {
              if (step === story.steps.length - 1) setStep(0);
              setPlaying((v) => !v);
            }}
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}{" "}
            {reducedMotion
              ? "Manual steps"
              : playing
                ? "Pause sequence"
                : "Play sequence"}
          </button>
          <button aria-label="Restart sequence" onClick={() => select(0)}>
            <RotateCcw size={16} />
          </button>
          <button
            aria-label="Next step"
            disabled={step === story.steps.length - 1}
            onClick={() => select(step + 1)}
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
      <div
        className="story-steps"
        role="group"
        aria-label="Choose an explanation step"
      >
        {story.steps.map((item, i) => (
          <button
            key={item.label}
            aria-pressed={step === i}
            onClick={() => select(i)}
          >
            <span>0{i + 1}</span>
            {item.label}
            <i />
          </button>
        ))}
      </div>
      <div className="story-explanation" aria-live="polite" aria-atomic="true">
        <span className="story-step-number">0{step + 1}</span>
        <div key={step}>
          <h4>{story.steps[step].title}</h4>
          <p>{story.steps[step].body}</p>
        </div>
      </div>
      <div className="story-takeaway">
        <span>THE LESSON</span>
        <p>{story.takeaway}</p>
        <a href={story.source} target="_blank" rel="noopener noreferrer">
          {story.sourceLabel}
          <ArrowUpRight size={17} />
        </a>
      </div>
    </div>
  );
}
