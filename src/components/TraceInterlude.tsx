import { ArrowUpRight } from "lucide-react";
import TraceField from "./TraceField";
import { siteUrl } from "../lib/paths";

export default function TraceInterlude() {
  return (
    <section
      className="trace-interlude"
      data-scene
      aria-labelledby="trace-interlude-title"
    >
      <div className="trace-interlude-top">
        <span>MS / A STUDY IN CONSEQUENCES</span>
        <span>BUILD → BREAK → UNDERSTAND</span>
      </div>
      <div className="trace-interlude-field">
        <TraceField variant="rift" />
      </div>
      <h2 id="trace-interlude-title">
        <span>Follow</span>
        <em>the fracture.</em>
      </h2>
      <div className="trace-interlude-bottom">
        <p>
          A stale read. A lost update.
          <br />A healthy service with the wrong identity.
          <br />
          <strong>The failure is where the story gets specific.</strong>
        </p>
        <a href={siteUrl("projects/#miniRedis")}>
          Read a real failure <ArrowUpRight size={24} />
        </a>
      </div>
      <span className="trace-interlude-caption">
        PROCEDURAL MATERIAL STUDY · NOT SYSTEM TELEMETRY
      </span>
    </section>
  );
}
