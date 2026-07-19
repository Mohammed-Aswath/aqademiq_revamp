import type { CSSProperties } from "react";

export type SectionPillProps = {
  icon?: string;
  label: string;
  count?: number;
  open?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
};

/**
 * SectionPill — the centered, collapsible section header used on the Planner
 * ("ANYTIME (3)", "PLANNED (2)"). A recessed pill with an optional leading icon
 * and a chevron that flips with `open`. Requires Material Icons Outlined.
 */
export function SectionPill({
  icon,
  label,
  count,
  open = true,
  onClick,
  style,
}: SectionPillProps) {
  return (
    <div style={{ display: "flex", justifyContent: "center", ...style }}>
      <div
        onClick={onClick}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          background: "var(--surface-sunken)",
          borderRadius: "var(--radius-pill)",
          padding: icon ? "6px 13px 6px 7px" : "7px 15px",
          cursor: "pointer",
        }}
      >
        {icon && (
          <span
            className="material-icons-outlined"
            style={{ fontSize: 15, color: "var(--text-secondary)" }}
          >
            {icon}
          </span>
        )}
        <span
          style={{
            fontSize: 11.5,
            fontWeight: 800,
            letterSpacing: "0.05em",
            color: "var(--text-primary)",
          }}
        >
          {label}
          {count != null && ` (${count})`}
        </span>
        <span
          className="material-icons-outlined"
          style={{ fontSize: 18, color: "var(--text-primary)" }}
        >
          {open ? "expand_more" : "expand_less"}
        </span>
      </div>
    </div>
  );
}

export default SectionPill;
