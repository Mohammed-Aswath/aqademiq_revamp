import type { CSSProperties } from "react";

export type TaskCardProps = {
  title: string;
  dur?: string;
  time?: string;
  tag?: string;
  color?: string;
  bar?: boolean;
  done?: boolean;
  dim?: boolean;
  onToggle?: () => void;
  style?: CSSProperties;
};

/**
 * TaskCard — a task row on the Planner. Optional colored left bar (for timed
 * tasks), a subject/type tag with a color dot, a duration, and a tap-to-complete
 * circle on the right.
 */
export function TaskCard({
  title,
  dur,
  time,
  tag,
  color = "var(--accent)",
  bar = false,
  done = false,
  dim = false,
  onToggle,
  style,
}: TaskCardProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        gap: 11,
        background: "var(--surface-card)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-card)",
        padding: "11px 13px",
        opacity: dim ? 0.5 : 1,
        ...style,
      }}
    >
      {bar && (
        <div
          style={{ width: 4, borderRadius: 4, background: color, flexShrink: 0 }}
        />
      )}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 800,
            lineHeight: 1.25,
            color: "var(--text-primary)",
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 4,
            flexWrap: "wrap",
          }}
        >
          {time && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                color: "var(--text-primary)",
              }}
            >
              {time}
            </span>
          )}
          {tag && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                fontSize: 9.5,
                fontWeight: 800,
                color,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: color,
                }}
              />
              {tag}
            </span>
          )}
          {dur && (
            <span
              style={{
                fontSize: 10.5,
                color: "var(--text-dim)",
                fontWeight: 600,
              }}
            >
              {dur}
            </span>
          )}
        </div>
      </div>
      <div
        onClick={onToggle}
        style={{
          alignSelf: "center",
          width: 22,
          height: 22,
          borderRadius: "50%",
          border: `2px solid ${done ? "var(--accent)" : "#d6d3ce"}`,
          background: done ? "var(--accent)" : "transparent",
          flexShrink: 0,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {done && (
          <span style={{ color: "#fff", fontSize: 11, fontWeight: 800 }}>✓</span>
        )}
      </div>
    </div>
  );
}

export default TaskCard;
