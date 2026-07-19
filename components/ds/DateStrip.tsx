import type { CSSProperties } from "react";

export type DateStripProps = {
  days?: [string, number][];
  selected?: number;
  today?: number;
  style?: CSSProperties;
};

/**
 * DateStrip — the horizontal week selector. The selected day gets a recessed
 * pill + underline tick; today (when not selected) is marked in the accent.
 */
export function DateStrip({
  days = [
    ["M", 1],
    ["T", 2],
    ["W", 3],
    ["T", 4],
    ["F", 5],
    ["S", 6],
    ["S", 7],
  ],
  selected = 2,
  today = 2,
  style,
}: DateStripProps) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", ...style }}>
      {days.map(([d, n], i) => {
        const sel = i === selected,
          isToday = i === today;
        return (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              width: 34,
              padding: "5px 0",
              borderRadius: "var(--radius-tab)",
              background: sel ? "var(--surface-sunken)" : "transparent",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: isToday && !sel ? "var(--accent)" : "var(--text-dim)",
              }}
            >
              {n}
            </span>
            <span
              style={{
                fontSize: 19,
                fontWeight: 800,
                fontFamily: "var(--font-sans)",
                color: sel
                  ? "var(--text-primary)"
                  : isToday
                    ? "var(--accent)"
                    : "var(--text-dim)",
              }}
            >
              {d}
            </span>
            {sel && (
              <div
                style={{ width: 14, height: 3, borderRadius: 2, background: "#c4c1bb" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default DateStrip;
