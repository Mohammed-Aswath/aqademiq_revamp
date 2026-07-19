import type { CSSProperties } from "react";
import { AdaCube, type AdaExpr } from "./AdaCube";
import { CUBE_TONES } from "./tones";

export type IceTimerProps = {
  progress?: number;
  size?: number;
  expr?: AdaExpr;
  drip?: boolean;
  frost?: boolean;
  style?: CSSProperties;
};

/**
 * IceTimer — the focus session gauge. A thin progress ring depletes while Ada
 * melts from a crisp cube toward a puddle. Pause "freezes" it (pass frost).
 */
export function IceTimer({
  progress = 0,
  size = 184,
  expr = "happy",
  drip = false,
  frost = false,
  style,
}: IceTimerProps) {
  const stroke = 7;
  const r = (size - stroke) / 2 - 1;
  const c = 2 * Math.PI * r;
  const p = Math.min(Math.max(progress, 0), 1);
  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      <svg
        width={size}
        height={size}
        style={{ position: "absolute", transform: "rotate(-90deg)" }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--surface-sunken)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={frost ? "var(--aq-frost)" : "var(--accent)"}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * p}
          style={{ transition: "stroke-dashoffset 0.9s linear" }}
        />
      </svg>
      <AdaCube size={size * 0.6} tone={CUBE_TONES[4]} melt={p} expr={expr} bubbles={3} />
      {drip &&
        p > 0.08 &&
        [0, 1].map((i) => (
          <div
            key={i}
            className="aq-drip"
            style={{
              position: "absolute",
              bottom: size * 0.27 - i * 4,
              left: `${49 + i * 7}%`,
              width: 5,
              height: 8,
              borderRadius: "50% 50% 60% 60%",
              background: "var(--aq-drip)",
              animation: `aqDrip ${1.6 + i * 0.4}s ${i * 0.6}s infinite ease-in`,
            }}
          />
        ))}
      {frost && (
        <div
          style={{
            position: "absolute",
            width: size,
            height: size,
            borderRadius: "50%",
            boxShadow: "inset 0 0 20px rgba(159,214,239,0.65)",
            animation: "aqShimmer 2.2s infinite",
          }}
        />
      )}
    </div>
  );
}

export default IceTimer;
