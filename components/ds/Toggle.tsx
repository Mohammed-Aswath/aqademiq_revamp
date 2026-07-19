import type { CSSProperties } from "react";

export type ToggleProps = {
  on?: boolean;
  onChange?: (value: boolean) => void;
  style?: CSSProperties;
};

/**
 * Toggle — the iOS-style pill switch. On = accent track, off = neutral track,
 * with a floating white knob.
 */
export function Toggle({ on = false, onChange, style }: ToggleProps) {
  return (
    <div
      role="switch"
      aria-checked={on}
      onClick={() => onChange && onChange(!on)}
      style={{
        width: 46,
        height: 27,
        borderRadius: "var(--radius-pill)",
        background: on ? "var(--accent)" : "var(--text-dim)",
        flexShrink: 0,
        padding: 3,
        display: "flex",
        justifyContent: on ? "flex-end" : "flex-start",
        cursor: "pointer",
        transition: "background 0.2s var(--ease-standard, ease)",
        ...style,
      }}
    >
      <div
        style={{
          width: 21,
          height: 21,
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
        }}
      />
    </div>
  );
}

export default Toggle;
