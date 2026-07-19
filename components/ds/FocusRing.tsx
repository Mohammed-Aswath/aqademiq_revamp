import type { CSSProperties } from "react";

export type FocusRingProps = {
  mins?: number;
  maxMins?: number;
  size?: number;
  style?: CSSProperties;
};

/**
 * FocusRing — the timer *setup* dial: a 60-tick ring with a filled arc showing
 * the chosen duration, minute markers, and a big serif numeral in the center.
 */
export function FocusRing({
  mins = 15,
  maxMins = 60,
  size = 168,
  style,
}: FocusRingProps) {
  const cx = size / 2,
    cy = size / 2;
  const TRACK_R = 58;
  const pct = mins / maxMins;
  const TICK_N = 60;
  const ticks = Array.from({ length: TICK_N }, (_, i) => {
    const frac = i / TICK_N;
    const angle = frac * 2 * Math.PI - Math.PI / 2;
    const major = i % 15 === 0;
    const rO = TRACK_R + 11,
      rI = rO - (major ? 9 : 5);
    return {
      x1: cx + Math.cos(angle) * rO,
      y1: cy + Math.sin(angle) * rO,
      x2: cx + Math.cos(angle) * rI,
      y2: cy + Math.sin(angle) * rI,
      on: frac < pct,
      major,
    };
  });
  const endAngle = pct * 2 * Math.PI - Math.PI / 2;
  const ex = cx + Math.cos(endAngle) * TRACK_R;
  const ey = cy + Math.sin(endAngle) * TRACK_R;
  const sx = cx,
    sy = cy - TRACK_R;
  const large = pct > 0.5 ? 1 : 0;
  const sans = "var(--font-sans)";
  const labels: [string, number, number][] = [
    ["15", cx + TRACK_R - 3, cy],
    ["30", cx, cy + TRACK_R - 3],
    ["45", cx - TRACK_R + 3, cy],
    ["60", cx, cy - TRACK_R + 3],
  ];
  return (
    <div style={{ position: "relative", width: size, height: size, ...style }}>
      <svg width={size} height={size}>
        <circle
          cx={cx}
          cy={cy}
          r={TRACK_R}
          fill="none"
          stroke="var(--accent-soft)"
          strokeWidth={10}
        />
        {pct > 0.01 && (
          <path
            d={`M${sx},${sy} A${TRACK_R},${TRACK_R} 0 ${large} 1 ${ex},${ey}`}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={10}
            strokeLinecap="round"
          />
        )}
        {ticks.map((t, i) => (
          <line
            key={i}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke={t.on ? "var(--accent)" : "#dedede"}
            strokeWidth={t.major ? 2 : 1}
            strokeLinecap="round"
          />
        ))}
        {pct > 0.01 && <circle cx={ex} cy={ey} r={7} fill="var(--accent)" />}
        {labels.map(([l, x, y]) => (
          <text
            key={l}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="9"
            fontFamily={sans}
            fill="var(--text-dim)"
            fontWeight="700"
          >
            {l}
          </text>
        ))}
      </svg>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-numeral)",
            fontSize: 46,
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: -2,
            color: "var(--text-primary)",
          }}
        >
          {mins}
        </div>
        <div
          style={{
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: "0.14em",
            color: "var(--text-secondary)",
          }}
        >
          MINS
        </div>
      </div>
    </div>
  );
}

export default FocusRing;
