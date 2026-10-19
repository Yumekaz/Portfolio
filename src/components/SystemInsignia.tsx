import { useId } from "react";

/** Graphic signatures: metaphors for each project, never architecture claims. */
export default function SystemInsignia({
  project,
  className = "",
}: {
  project: string;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const lines = Array.from({ length: 13 }, (_, i) => i);
  return (
    <svg
      viewBox="0 0 300 300"
      className={`system-insignia insignia-${project} ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="currentColor" />
          <stop offset="1" stopColor="currentColor" stopOpacity=".12" />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#${id})`} strokeWidth="1.2">
        {project === "coordination" &&
          lines.map((i) => (
            <path
              key={i}
              d={`M150 ${22 + i * 4} L${35 + i * 5} ${250 - i * 2} L${265 - i * 5} ${250 - i * 2} Z`}
            />
          ))}
        {project === "miniRedis" &&
          lines.map((i) => (
            <g key={i}>
              <ellipse
                cx={120 - i * 2}
                cy="150"
                rx={45 + i * 5}
                ry={65 + i * 4}
              />
              <path
                d={`M${150 + i * 2} ${50 + i * 4} C${290 - i * 2} ${55 + i * 4},${290 - i * 2} ${245 - i * 4},${150 + i * 2} ${250 - i * 4}`}
              />
            </g>
          ))}
        {project === "failforge" &&
          lines.map((i) => (
            <path
              key={i}
              d={`M${146 - i * 2} ${30 + i * 7} A${120 - i * 7} ${120 - i * 7} 0 1 0 ${202 - i * 3} ${250 - i * 6}`}
            />
          ))}
        {project === "cairn" &&
          lines.map((i) => (
            <path
              key={i}
              d={`M${45 + i * 3} ${60 + i * 13} L150 ${22 + i * 15} L${255 - i * 3} ${60 + i * 13} L150 ${105 + i * 12} Z`}
            />
          ))}
        {project === "drt" &&
          lines.map((i) => (
            <path
              key={i}
              d={`M25 ${85 + i * 10} C90 ${5 + i * 10},210 ${185 + i * 4},275 ${85 + i * 10}`}
            />
          ))}
        {project === "qydrel" &&
          lines.map((i) => (
            <path
              key={i}
              d={`M150 ${20 + i * 5} L${265 - i * 3} ${225 - i * 2} L${35 + i * 3} ${225 - i * 2} Z M150 ${20 + i * 5} V${280 - i * 6} L${35 + i * 3} ${225 - i * 2}`}
            />
          ))}
        {project === "miniDocker" &&
          lines.map((i) => (
            <rect
              key={i}
              x={25 + i * 8}
              y={25 + i * 8}
              width={250 - i * 16}
              height={250 - i * 16}
              rx={3 + i * 2}
              transform={`rotate(${i * 1.8} 150 150)`}
            />
          ))}
        {project === "tinyTantrum" &&
          lines.map((i) => (
            <ellipse
              key={i}
              cx="150"
              cy="150"
              rx={120 - i * 5}
              ry={45 + i * 5}
              transform={`rotate(${i * 9} 150 150)`}
            />
          ))}
      </g>
      <circle cx="150" cy="150" r="3" fill="currentColor" />
    </svg>
  );
}
