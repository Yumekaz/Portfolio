// Original vector studies. Expressive artwork, not engineering diagrams.
export default function ExplorationArt({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 600 400"
      className={`exploration-art art-study-${index}`}
      aria-hidden="true"
      focusable="false"
    >
      <g
        className="art-study-grid"
        stroke="currentColor"
        opacity=".08"
        fill="none"
      >
        {[100, 200, 300, 400, 500].map((x) => (
          <path key={x} d={`M${x} 0V400`} />
        ))}
        {[100, 200, 300].map((y) => (
          <path key={y} d={`M0 ${y}H600`} />
        ))}
      </g>
      <g
        className="art-study-form"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      >
        {index === 0 && (
          <>
            {Array.from({ length: 20 }, (_, i) => (
              <path
                key={i}
                d={`M70 ${80 + i * 9} C180 ${80 + i * 9},170 ${310 - i * 3},300 ${310 - i * 3} S420 ${80 + i * 9},530 ${80 + i * 9}`}
                opacity={0.3 + i * 0.035}
              />
            ))}
            <circle
              cx="300"
              cy="250"
              r="30"
              className="study-solid"
              stroke="none"
            />
          </>
        )}
        {index === 1 && (
          <g transform="translate(300 200)">
            {Array.from({ length: 16 }, (_, i) => (
              <ellipse
                key={i}
                rx="185"
                ry="55"
                transform={`rotate(${i * 11.25})`}
                opacity=".6"
              />
            ))}
            <circle r="23" className="study-solid" stroke="none" />
          </g>
        )}
        {index === 2 && (
          <>
            {Array.from({ length: 14 }, (_, i) => (
              <rect
                key={i}
                x={130 + i * 10}
                y={70 + i * 5}
                width={270 - i * 7}
                height={240 - i * 7}
                rx="3"
                opacity={0.25 + i * 0.05}
              />
            ))}
            <path
              className="study-accent"
              d="M250 155L210 200L250 245M350 155L390 200L350 245M320 145L280 255"
              strokeWidth="7"
            />
          </>
        )}
        {index === 3 && (
          <>
            {[185, 415].map((x, j) => (
              <g key={x}>
                {Array.from({ length: 10 }, (_, i) => (
                  <circle
                    key={i}
                    cx={x}
                    cy="200"
                    r={22 + i * 11}
                    opacity={1 - i * 0.08}
                  />
                ))}
                <circle
                  cx={x}
                  cy="200"
                  r="18"
                  className={j ? "study-paper" : "study-solid"}
                  stroke="none"
                />
              </g>
            ))}
            <path
              d="M207 200H393"
              strokeDasharray="3 8"
              className="study-accent"
            />
          </>
        )}
        {index === 4 && (
          <>
            {Array.from({ length: 15 }, (_, i) => (
              <path
                key={i}
                d={`M60 ${320 - i * 5} Q${270 + i * 8} ${-110 + i * 15} 540 ${140 + i * 11}`}
                opacity={0.3 + i * 0.04}
              />
            ))}
            <circle
              cx="342"
              cy="112"
              r="16"
              className="study-solid"
              stroke="none"
            />
            <path d="M65 325H535" strokeDasharray="2 8" />
          </>
        )}
        {index === 5 && (
          <>
            {Array.from({ length: 7 }, (_, row) =>
              Array.from({ length: 9 }, (_, col) => {
                const x = 130 + col * 43,
                  y = 70 + row * 43;
                return (
                  <g key={`${row}-${col}`}>
                    <path
                      d={`M${x} ${y}l43 0m-43 0l21.5 43m-21.5-43l-21.5 43`}
                      opacity=".25"
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r={(row + col) % 5 === 0 ? 7 : 2.5}
                      className={(row + col) % 5 === 0 ? "study-solid" : ""}
                      fill="currentColor"
                      stroke="none"
                    />
                  </g>
                );
              }),
            )}
          </>
        )}
        {index === 6 && (
          <>
            {Array.from({ length: 25 }, (_, i) => (
              <path
                key={i}
                d={`M35 ${40 + i * 13} C190 ${40 + i * 13},210 ${i < 13 ? 80 - i * 4 : 320 + (i - 13) * 4},300 ${i < 13 ? 80 - i * 4 : 320 + (i - 13) * 4} S410 ${40 + i * 13},565 ${40 + i * 13}`}
                opacity=".65"
              />
            ))}
            <ellipse
              cx="300"
              cy="200"
              rx="62"
              ry="76"
              className="study-solid"
              stroke="none"
            />
          </>
        )}
        {index === 7 && (
          <g transform="translate(300 200) rotate(-30)">
            {Array.from({ length: 9 }, (_, row) =>
              Array.from({ length: 9 }, (_, col) => (
                <rect
                  key={`${row}-${col}`}
                  x={col * 25 - 108}
                  y={row * 25 - 108}
                  width="18"
                  height="18"
                  className={(row * 3 + col) % 4 === 0 ? "study-solid" : ""}
                  fill={(row * 3 + col) % 4 === 0 ? undefined : "none"}
                  opacity={0.35 + row * 0.07}
                />
              )),
            )}
          </g>
        )}
        {index === 8 && (
          <g transform="translate(300 200)">
            {Array.from({ length: 16 }, (_, i) => (
              <rect
                key={i}
                x="-110"
                y="-110"
                width="220"
                height="220"
                transform={`rotate(${i * 5.625})`}
                opacity=".4"
              />
            ))}
            <path
              className="study-accent"
              strokeWidth="8"
              d="M-35 0L-6 29L45-30"
            />
          </g>
        )}
      </g>
    </svg>
  );
}
