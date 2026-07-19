import type { CSSProperties } from "react";

export type ProgressDotsProps = {
  total?: number;
  active?: number;
  style?: CSSProperties;
};

/**
 * ProgressDots — the onboarding progress indicator. The active step is a wide
 * accent bar; the rest are short grey dots.
 */
export function ProgressDots({ total = 5, active = 0, style }: ProgressDotsProps) {
  return (
    <div style={{ display: "flex", gap: 5, ...style }}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          style={{
            height: 4,
            borderRadius: 2,
            background: i === active ? "var(--accent)" : "#e0e0e0",
            width: i === active ? 22 : 6,
            transition: "width 0.25s var(--ease-standard, ease), background 0.25s",
          }}
        />
      ))}
    </div>
  );
}

export default ProgressDots;
