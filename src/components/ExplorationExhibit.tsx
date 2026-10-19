import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Minus, Plus } from "lucide-react";
import { Exhibit } from "../data/exhibits";
import { Exploration } from "../data/explorations";
import { siteUrl } from "../lib/paths";

function MechanismDrawing({ id, step }: { id: string; step: number }) {
  if (id === "duraflow")
    return (
      <div className="workflow-drawing">
        <div className="workflow-worker">
          <span>WORKER</span>
          <strong>{["A", "—", "B"][step]}</strong>
          <small>
            {["lease held", "lease expired", "lease reclaimed"][step]}
          </small>
        </div>
        <div className="workflow-ledger">
          <span>DURABLE STATE</span>
          {["Dependency graph", "Completed steps", "Pending work"].map(
            (label, i) => (
              <div key={label}>
                <i>{i < 2 ? "✓" : "↳"}</i>
                {label}
                <b>{i < 2 ? "kept" : step === 2 ? "resume" : "queued"}</b>
              </div>
            ),
          )}
        </div>
      </div>
    );
  if (id === "wasmforge")
    return (
      <div className="browser-drawing">
        <div className="browser-chrome">
          <i />
          <i />
          <i />
          <span>LOCAL WORKSPACE</span>
        </div>
        <div className="browser-runtime">
          <div>
            <span>EDITOR</span>
            <code>
              workspace/
              <br />↳ main.py
              <br />↳ query.sql
              <br />↳ notes.ipynb
            </code>
          </div>
          <div className={step === 1 ? "drawing-selected" : ""}>
            <span>WORKER</span>
            <strong>{step === 1 ? "execute()" : "ready"}</strong>
            <small>Browser runtimes</small>
          </div>
        </div>
        <div
          className={`browser-store ${step === 2 ? "drawing-selected" : ""}`}
        >
          <span>OPFS</span>
          <strong>Files persist locally</strong>
          <small>{step === 2 ? "saved" : "browser storage"}</small>
        </div>
      </div>
    );
  if (id === "maja")
    return (
      <div className="room-drawing">
        <div className="room-person">
          <span>IDENTITY</span>
          <strong>A</strong>
          <small>authenticated</small>
        </div>
        <div className="room-boundary">
          <span>ROOM BOUNDARY</span>
          <div className="room-message">
            <i>•••</i>
            <strong>
              {["identity check", "membership", "encrypted content"][step]}
            </strong>
          </div>
          <small>Client-side message encryption</small>
        </div>
        <div className="room-person">
          <span>IDENTITY</span>
          <strong>B</strong>
          <small>participant</small>
        </div>
      </div>
    );
  if (id === "silsila")
    return (
      <div className="flight-drawing">
        <div className="flight-source">
          <span>DISRUPTED FLIGHT</span>
          <strong>{step === 0 ? "Δ" : "↗"}</strong>
          <small>{step === 2 ? "recovery options" : "schedule change"}</small>
        </div>
        <div className="flight-dependencies">
          {["Aircraft", "Crew", "Passengers"].map((label, i) => (
            <div key={label} className={step > 0 ? "drawing-selected" : ""}>
              <i>0{i + 1}</i>
              <strong>{label}</strong>
              <small>
                {step === 0
                  ? "dependency"
                  : step === 1
                    ? "affected"
                    : ["swap", "delay", "cancel"][i]}
              </small>
            </div>
          ))}
        </div>
      </div>
    );
  if (id === "skein")
    return (
      <div className="mesh-drawing">
        <svg viewBox="0 0 500 210" preserveAspectRatio="none">
          <path d="M70 100L190 50L300 150L420 90 M190 50L420 90 M70 100L300 150" />
          <path
            className="mesh-route"
            d={
              step === 0
                ? "M70 100L190 50"
                : step === 1
                  ? "M70 100L190 50L420 90"
                  : "M70 100L300 150L420 90"
            }
          />
        </svg>
        {["A", "B", "C", "D"].map((peer, i) => (
          <div key={peer} className={`mesh-peer mesh-peer-${i}`}>
            <strong>{peer}</strong>
            <span>{["sender", "relay", "store", "peer"][i]}</span>
          </div>
        ))}
        <span className="mesh-caption">
          {
            [
              "Discover nearby peers",
              "A message follows available links",
              "Connections change. Knowledge synchronizes.",
            ][step]
          }
        </span>
      </div>
    );
  return (
    <div className="gate-drawing">
      <div className="gate-input">
        <span>REQUIREMENT</span>
        <code>spec.yaml</code>
      </div>
      <div className="gate-roles">
        <div>
          <span>AUDITOR</span>
          <strong>Tests</strong>
          <small>challenge the contract</small>
        </div>
        <div>
          <span>ARCHITECT</span>
          <strong>Code</strong>
          <small>implement the contract</small>
        </div>
      </div>
      <div className={`gate-result ${step === 2 ? "drawing-selected" : ""}`}>
        <span>VALIDATION GATE</span>
        <strong>
          {step === 2 ? "Accept / reject / skip" : "Evidence before acceptance"}
        </strong>
      </div>
    </div>
  );
}

function Mechanism({ exhibit, step }: { exhibit: Exhibit; step: number }) {
  return (
    <div
      className={`exhibit-mechanism mechanism-${exhibit.id} phase-${step}`}
      aria-hidden="true"
    >
      <div className="mechanism-drawing">
        <MechanismDrawing id={exhibit.id} step={step} />
      </div>
      <div className="mechanism-chain">
        {exhibit.stages.map((label, i) => (
          <div key={label} className={i === step ? "mechanism-selected" : ""}>
            <span>0{i + 1}</span>
            <strong>{label}</strong>
            <i>{i === step ? "↗" : "·"}</i>
          </div>
        ))}
      </div>
      <div className="mechanism-floor" />
    </div>
  );
}
export default function ExplorationExhibit({
  item,
  exhibit,
  index,
}: {
  item: Exploration;
  exhibit: Exhibit;
  index: number;
}) {
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(
    () => window.location.hash === `#${exhibit.id}`,
  );
  useEffect(() => {
    const reveal = () => {
      if (window.location.hash === `#${exhibit.id}`) setOpen(true);
    };
    window.addEventListener("hashchange", reveal);
    return () => window.removeEventListener("hashchange", reveal);
  }, [exhibit.id]);
  return (
    <>
      <div
        className={`exhibit-visual ${exhibit.artifact ? "exhibit-real-artifact" : ""}`}
      >
        <div className="exhibit-topline">
          <span>
            {String(index + 1).padStart(2, "0")} /{" "}
            {exhibit.artifact ? "REPOSITORY ARTIFACT" : "MECHANISM STUDY"}
          </span>
          <span>{item.category}</span>
        </div>
        {exhibit.artifact ? (
          <a
            className="artifact-image-link"
            href={siteUrl(`evidence/${exhibit.artifact.image}`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View full ${item.name} artifact`}
          >
            <img
              src={siteUrl(`evidence/${exhibit.artifact.image}`)}
              alt={exhibit.artifact.alt}
              loading="lazy"
              decoding="async"
            />
            <span>
              View full artifact <ArrowUpRight size={16} />
            </span>
          </a>
        ) : (
          <Mechanism exhibit={exhibit} step={step} />
        )}
        <div className="exhibit-caption">
          {exhibit.artifact?.caption ??
            "Illustrative sequence · select a stage below"}
        </div>
      </div>
      <div className="exploration-copy">
        <p className="eyebrow">{item.category}</p>
        <h2>
          {item.name}
          <span aria-hidden="true">↗</span>
        </h2>
        <p className="exhibit-question">{exhibit.question}</p>
        <div
          className="exhibit-stage-controls"
          role="group"
          aria-label={`${item.name} explanation stages`}
        >
          {exhibit.stages.map((label, i) => (
            <button
              key={label}
              aria-pressed={step === i}
              onClick={() => setStep(i)}
            >
              <span>0{i + 1}</span>
              {label}
            </button>
          ))}
        </div>
        <p className="exhibit-stage-copy" aria-live="polite" aria-atomic="true">
          {exhibit.descriptions[step]}
        </p>
        <button
          className="exhibit-detail-toggle"
          aria-expanded={open}
          aria-controls={`${exhibit.id}-detail`}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close field record" : "Open field record"}
          {open ? <Minus size={17} /> : <Plus size={17} />}
        </button>
      </div>
      <div
        className="exhibit-detail"
        id={`${exhibit.id}-detail`}
        hidden={!open}
      >
        <div>
          <p className="eyebrow">THE DESIGN QUESTION</p>
          <h3>{exhibit.principle}</h3>
          <p>{item.description}</p>
        </div>
        <div>
          <p className="eyebrow">WHAT THE RESULT MEANS</p>
          <p>{exhibit.boundary}</p>
          <div className="exhibit-stack">
            {exhibit.stack.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        </div>
        <div className="exhibit-links">
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            Inspect repository <ArrowUpRight size={17} />
          </a>
          {exhibit.artifact && (
            <a
              href={exhibit.artifact.source}
              target="_blank"
              rel="noopener noreferrer"
            >
              Artifact source <ArrowRight size={17} />
            </a>
          )}
        </div>
      </div>
    </>
  );
}
