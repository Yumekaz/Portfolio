import {
  ArrowRight,
  ArrowUpRight,
  Check,
  RotateCcw,
  Unplug,
  X,
} from "lucide-react";
import type { LabState, LabAction } from "../lib/failureLab";
import { siteUrl } from "../lib/paths";

export default function FailureLab({
  state,
  dispatch,
}: {
  state: LabState;
  dispatch: (action: LabAction) => void;
}) {
  const online = state.replicas.filter((replica) => replica.online).length;
  const blocked = online < 2;
  const recovered = online === 3 && state.hasFault;
  const status = blocked
    ? "Quorum lost"
    : online === 2
      ? "Degraded · available"
      : recovered
        ? "Recovered"
        : "All replicas connected";
  const title = blocked
    ? "Knowing when to stop."
    : online === 2
      ? "One down. Still writing."
      : recovered
        ? "Back in agreement."
        : "Go ahead. Break something.";
  const explanation = blocked
    ? `${online === 0 ? "No replicas are connected." : "One replica cannot form a majority."} New writes are rejected; the last committed version stays intact.`
    : online === 2
      ? "Two acknowledgements are enough. A disconnected replica misses new writes, but the cluster can still accept them."
      : recovered
        ? "The replicas have caught up with the committed version. The cluster can accept writes again."
        : "Three replicas. A write needs two acknowledgements. Take a replica offline and see where the guarantee holds.";
  const nextAction =
    online === 3
      ? "Take one offline"
      : online === 2
        ? "Take another offline"
        : "Recover the cluster";
  return (
    <section
      className={`failure-lab ${blocked ? "lab-blocked" : ""}`}
      id="failure-lab"
      aria-labelledby="lab-title"
    >
      <div className="lab-chapter" data-reveal>
        <p className="eyebrow">01 / CAUSE & CONSEQUENCE</p>
        <h2>
          Pull a thread.
          <br />
          <span>See what holds.</span>
        </h2>
        <p>
          The sculpture is a metaphor.
          <br />
          This experiment shows the rule behind it:
          <br />
          <strong>two acknowledgements out of three.</strong>
        </p>
      </div>
      <div className="lab-topline">
        <span className="eyebrow">
          <span className="lab-led" /> THE PRESSURE TEST
        </span>
        <span className="lab-model-label">
          INTERACTIVE MODEL / 2 OF 3 QUORUM
        </span>
        <button
          className="lab-reset"
          onClick={() => dispatch({ type: "reset" })}
          aria-label="Reset the failure lab"
        >
          <RotateCcw size={14} />
          <span>Reset</span>
        </button>
      </div>
      <div className="lab-body">
        <div className="lab-network">
          <div className="lab-network-label">
            <span>01 / WRITE PATH</span>
            <span className="lab-state">{status}</span>
          </div>
          <div className="replica-network">
            <div className="quorum-gate">
              <span className="gate-label">REPLICAS ONLINE</span>
              <strong key={online}>
                {online}
                <span>/3</span>
              </strong>
              <span className="gate-threshold">
                {blocked ? "below threshold" : "quorum available"}
              </span>
            </div>
            <svg
              className="replica-wires"
              viewBox="0 0 240 240"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {state.replicas.map((replica, index) => (
                <g
                  key={replica.id}
                  className={replica.online ? "wire-connected" : "wire-offline"}
                >
                  <path
                    d={`M0 120 H100 Q120 120 120 ${index === 0 ? 100 : index === 2 ? 140 : 120} V${40 + index * 80} H240`}
                  />
                  {replica.online && (
                    <path
                      className="wire-packet"
                      d={`M0 120 H100 Q120 120 120 ${index === 0 ? 100 : index === 2 ? 140 : 120} V${40 + index * 80} H240`}
                    />
                  )}
                </g>
              ))}
            </svg>
            <div className="replica-nodes">
              {state.replicas.map((replica) => (
                <button
                  key={replica.id}
                  className={`replica-node ${replica.online ? "is-online" : "is-offline"}`}
                  onClick={() => dispatch({ type: "toggle", id: replica.id })}
                  aria-label={`${replica.online ? "Disconnect" : "Reconnect"} replica ${replica.id}`}
                >
                  <span className="replica-letter">{replica.id}</span>
                  <span className="replica-info">
                    <strong>Replica {replica.id}</strong>
                    <span>
                      {replica.online ? "Connected" : "Offline"}{" "}
                      <span className="replica-version">
                        / v{replica.version}
                      </span>
                    </span>
                  </span>
                  {replica.online ? (
                    <span className="replica-indicator" />
                  ) : (
                    <X size={15} />
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="lab-network-footer">
            <span>
              COMMITTED <strong>v{state.version}</strong>
            </span>
            <span>Click a replica to disconnect / reconnect</span>
          </div>
        </div>
        <div className="lab-observation">
          <p className="eyebrow">02 / OBSERVE THE CONSEQUENCE</p>
          <div className="lab-live" aria-live="polite" aria-atomic="true">
            <h2 id="lab-title">{title}</h2>
            <p>{explanation}</p>
          </div>
          <button
            className="lab-primary"
            onClick={() => dispatch({ type: "scenario" })}
          >
            <Unplug size={16} />
            {nextAction}
            <ArrowRight size={18} />
          </button>
          <div className="lab-secondary-row">
            <span>Each step attempts a write.</span>
            <button onClick={() => dispatch({ type: "write" })}>
              Send a write <ArrowUpRight size={14} />
            </button>
          </div>
          <div
            className="lab-history"
            aria-label="Recent write attempts"
            aria-live="polite"
          >
            {state.history.length === 0 ? (
              <div className="lab-empty">
                <span>READY</span>
                <span>Waiting for your first experiment.</span>
              </div>
            ) : (
              state.history.map((event) => (
                <div
                  className={`lab-event ${event.accepted ? "accepted" : "rejected"}`}
                  key={event.sequence}
                >
                  <span className="event-index">
                    {String(event.sequence).padStart(2, "0")}
                  </span>
                  {event.accepted ? <Check size={13} /> : <X size={13} />}
                  <span>
                    {event.accepted
                      ? `Write committed · v${event.version}`
                      : "Write rejected"}
                  </span>
                  <span>{event.acknowledgements}/3 ACK</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="lab-bottomline">
        <p>
          Illustrative model. Recovery is instant here; real consensus is more
          complicated.
        </p>
        <a href={siteUrl("projects/#miniRedis")}>
          Inspect the real trade-offs <ArrowUpRight size={15} />
        </a>
      </div>
    </section>
  );
}
