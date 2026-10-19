import { useState, type CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { explorations } from "../data/explorations";
import { exhibits } from "../data/exhibits";
import TraceField from "./TraceField";

// An editorial arrangement, not a dependency graph or runtime topology.
const positions = [
  [13, 20],
  [46, 15],
  [78, 20],
  [24, 47],
  [54, 44],
  [86, 50],
  [12, 78],
  [45, 78],
  [76, 80],
];
export default function WorkshopConstellation({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) {
  const [active, setActive] = useState(0);
  return (
    <nav
      className="workshop-constellation"
      aria-label="Jump to an exploration"
      data-scene
    >
      <div className="constellation-heading">
        <span>THE CURIOSITY MAP</span>
        <span>09 WAYS IN ↘</span>
      </div>
      <div className="constellation-canvas">
        <TraceField variant="orbit" />
        <svg
          className="constellation-lines"
          viewBox="0 0 1000 500"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M130 100 Q270 -10 460 75 T780 100 M130 100 Q130 230 240 235 T540 220 T860 250 M240 235 Q80 300 120 390 M540 220 Q450 310 450 390 T760 400 M780 100 Q900 170 860 250 Q920 430 760 400" />
          <circle cx="540" cy="220" r="95" />
          <circle cx="540" cy="220" r="135" />
        </svg>
        {explorations.map((item, index) => (
          <a
            key={item.name}
            href={`#${exhibits[index].id}`}
            style={
              {
                "--node-x": `${positions[index][0]}%`,
                "--node-y": `${positions[index][1]}%`,
              } as CSSProperties
            }
            data-active={active === index}
            onFocus={() => setActive(index)}
            onMouseEnter={() => setActive(index)}
            onClick={(event) => {
              event.preventDefault();
              onSelect(exhibits[index].id);
            }}
          >
            <span className="constellation-node">
              <i /> {String(index + 1).padStart(2, "0")}
            </span>
            <strong>{item.name}</strong>
            <small>{item.category}</small>
            <ArrowUpRight size={16} />
          </a>
        ))}
      </div>
      <div className="constellation-caption">
        <span aria-live="polite">{explorations[active].material}</span>
        <span>SELECT A PROJECT TO OPEN ITS FIELD RECORD</span>
      </div>
    </nav>
  );
}
