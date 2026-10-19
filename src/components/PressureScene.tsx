import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { Replica } from "../lib/failureLab";
import { siteUrl } from "../lib/paths";

type Props = { replicas: Replica[]; reducedMotion: boolean };

// One continuous artwork. Replica state changes its surrounding field, never
// tears the photograph into slices. No GPU context is required.
export default function PressureScene({ replicas, reducedMotion }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const online = replicas.filter((replica) => replica.online).length;
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    observer.observe(element);
    const visibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  return (
    <div
      ref={host}
      className="pressure-scene"
      data-renderer="continuous-art"
      data-online={online}
      data-moving={!reducedMotion && visible && pageVisible}
      aria-hidden="true"
    >
      <div className="scene-float">
        <div className="scene-art continuous-sculpture">
          <img
            src={siteUrl("art/failforge.webp")}
            width="1536"
            height="1024"
            alt=""
            {...{ fetchpriority: "high" }}
            draggable="false"
          />
          <div className="sculpture-field" />
        </div>
        <div className="pressure-orbits">
          {replicas.map((replica, index) => (
            <div
              className={`pressure-orbit orbit-${index}`}
              data-connected={replica.online}
              key={replica.id}
              style={{ "--orbit-index": index } as CSSProperties}
            >
              <i />
              <span>{replica.id.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
