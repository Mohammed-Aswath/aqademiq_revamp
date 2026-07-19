import type { CSSProperties } from "react";

export type TagChipProps = {
  label: string;
  color?: string;
  active?: boolean;
  dashed?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
};

/**
 * TagChip — a colored, dot-led tag pill for task types and subjects. `dashed`
 * turns it into the "add custom" affordance (no dot, dashed outline).
 */
export function TagChip({
  label,
  color = "var(--accent)",
  active = false,
  dashed = false,
  onClick,
  style,
}: TagChipProps) {
  return (
    <span
      onClick={onClick}
      style={{
        padding: "5px 11px",
        borderRadius: "var(--radius-pill)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        fontWeight: 600,
        border: dashed
          ? `1.5px dashed ${color}`
          : `1.5px solid ${active ? color : "var(--border-hairline)"}`,
        background: active ? color + "18" : "var(--surface-card)",
        color: dashed ? color : active ? color : "var(--text-secondary)",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        cursor: "pointer",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {!dashed && (
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: color,
            flexShrink: 0,
          }}
        />
      )}
      {label}
    </span>
  );
}

export default TagChip;
