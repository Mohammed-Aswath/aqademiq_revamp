import type { CSSProperties, ReactNode } from "react";

export type OptionRowProps = {
  icon?: string;
  label: string;
  sub?: string;
  active?: boolean;
  right?: ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
};

/**
 * OptionRow — a selectable row inside picker sheets and menus. Optional leading
 * icon, a label + optional sub-label, and a trailing check when `active` (or a
 * custom `right` node). Requires Material Icons Outlined for the icon.
 */
export function OptionRow({
  icon,
  label,
  sub,
  active = false,
  right,
  onClick,
  style,
}: OptionRowProps) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 6px",
        borderRadius: "var(--radius-md)",
        background: active ? "var(--accent-soft)" : "transparent",
        cursor: "pointer",
        ...style,
      }}
    >
      {icon && (
        <span
          className="material-icons-outlined"
          style={{
            fontSize: 19,
            color: active ? "var(--accent)" : "var(--text-secondary)",
          }}
        >
          {icon}
        </span>
      )}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 13.5,
            fontWeight: active ? 800 : 600,
            color: active ? "var(--accent)" : "var(--text-primary)",
          }}
        >
          {label}
        </div>
        {sub && (
          <div
            style={{
              fontSize: 10.5,
              color: "var(--text-dim)",
              fontWeight: 600,
              marginTop: 1,
            }}
          >
            {sub}
          </div>
        )}
      </div>
      {right ||
        (active && (
          <span
            style={{ fontSize: 14, color: "var(--accent)", fontWeight: 800 }}
          >
            ✓
          </span>
        ))}
    </div>
  );
}

export default OptionRow;
