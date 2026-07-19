import type { CSSProperties, ReactNode } from "react";

export type ChipProps = {
  children: ReactNode;
  active?: boolean;
  color?: string;
  onClick?: () => void;
  style?: CSSProperties;
};

/**
 * Chip — a small filter/selection pill. `active` fills it with the accent tint
 * and colors the border + label. Optionally recolor with `color`.
 */
export function Chip({ children, active = false, color, onClick, style }: ChipProps) {
  const c = color || "var(--accent)";
  return (
    <span
      onClick={onClick}
      style={{
        padding: "5px 12px",
        borderRadius: "var(--radius-pill)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        fontWeight: 600,
        border: `1.5px solid ${active ? c : "var(--border-hairline)"}`,
        background: active
          ? color
            ? color + "18"
            : "var(--accent-soft)"
          : "var(--surface-card)",
        color: active ? c : "var(--text-secondary)",
        display: "inline-flex",
        alignItems: "center",
        cursor: "pointer",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export default Chip;
