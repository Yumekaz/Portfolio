import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { Replica } from "../lib/failureLab";
import { siteUrl } from "../lib/paths";

type Props = { replicas: Replica[]; reducedMotion: boolean };

// A layered photographic sculpture, not a network topology or a live system.
// CSS composition keeps the experience available without a GPU/WebGL context.
export default function PressureScene({ replicas, reducedMotion }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
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
      data-renderer="layered-art"
      data-moving={!reducedMotion && visible && pageVisible}
      aria-hidden="true"
    >
      <div className="scene-float">
        <div className="scene-art">
          {replicas.map((replica, index) => (
            <div
              key={replica.id}
              className={`scene-piece scene-piece-${index}`}
              data-connected={replica.online}
              style={{ "--piece-delay": `${index * 70}ms` } as CSSProperties}
            >
              <img
                src={siteUrl("art/failforge.webp")}
                width="1536"
                height="1024"
                alt=""
                fetchPriority={index === 0 ? "high" : "auto"}
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
