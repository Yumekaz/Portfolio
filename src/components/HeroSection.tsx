import { ArrowDown, ArrowUpRight, MoveUpRight } from "lucide-react";
import type { LabAction, LabState } from "../lib/failureLab";
import PressureScene from "./PressureScene";
interface Props {
  state: LabState;
  dispatch: (action: LabAction) => void;
  reducedMotion: boolean;
}
export default function HeroSection({ state, dispatch, reducedMotion }: Props) {
  const online = state.replicas.filter((replica) => replica.online).length;
  const broken = online < 2;
  return (
    <section
      className={`pressure-hero ${broken ? "under-pressure" : ""}`}
      aria-labelledby="hero-title"
    >
      <div className="hero-top-rail">
        <span>DISTRIBUTED SYSTEMS ENGINEER</span>
        <span>MIHIR SWARNKAR / INDIA</span>
        <span>PORTFOLIO — VOL. 03</span>
      </div>
      <div className="hero-stage">
        <div className="sculpture-wrap">
          <PressureScene
            replicas={state.replicas}
            reducedMotion={reducedMotion}
          />
        </div>
        <div className="sculpture-caption">
          <span className="live-dot" />{" "}
          {online === 3
            ? "EQUILIBRIUM"
            : broken
              ? "QUORUM LOST"
              : "UNDER STRESS"}
          <span>AN INTERACTIVE STUDY</span>
        </div>
        <h1 id="hero-title">
          <span>Order</span>
          <span className="hero-under">under</span>
          <span className="hero-pressure">
            pressure<span className="pressure-period">.</span>
          </span>
        </h1>
        <div className="hero-stage-footer">
          <div className="hero-positioning">
            <p>
              I build distributed systems.
              <br />
              Then I find their breaking point.
            </p>
            <a href="#selected-work">
              Explore the work <ArrowDown size={17} />
            </a>
          </div>
          <div className="pressure-control">
            <div className="pressure-readout" aria-live="polite">
              <strong>
                {String(online).padStart(2, "0")}
                <span>/03</span>
              </strong>
              <span>{broken ? "QUORUM LOST" : "REPLICAS CONNECTED"}</span>
            </div>
            <button
              onClick={() => dispatch({ type: "scenario" })}
              className="pressure-trigger"
            >
              <span>
                {online === 3 ? "Apply" : online === 2 ? "Push" : "Restore"}
                <br />
                {online === 3 ? "pressure" : online === 2 ? "further" : "order"}
              </span>
              <MoveUpRight size={26} strokeWidth={1.3} />
            </button>
          </div>
        </div>
      </div>
      <div className="hero-bottom-rail">
        <a href="#failure-lab">
          <span>01</span> BREAK IT. SEE WHAT HOLDS. <ArrowUpRight size={14} />
        </a>
        <span>REPLICATION / CONSISTENCY / RECOVERY</span>
        <span>
          SCROLL TO EXPLORE <ArrowDown size={12} />
        </span>
      </div>
    </section>
  );
}
