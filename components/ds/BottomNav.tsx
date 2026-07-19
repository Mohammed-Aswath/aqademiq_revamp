import type { CSSProperties } from "react";
import { LockBadge } from "./LockBadge";

/* The round Ada face used only in the center nav slot — ice-blue gradient bead
   with Ada's happy eyes + smile. */
function AdaNavFace({ size = 34 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background:
          "radial-gradient(circle at 36% 30%, #cbbcfd 0%, #b7a6f5 46%, var(--accent) 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        boxShadow: "inset 0 -2px 5px rgba(40,25,90,0.18)",
      }}
    >
      <svg width={size} height={size} viewBox="0 0 40 40" style={{ overflow: "visible" }}>
        <g stroke="#31237c" strokeWidth="2.4" fill="none" strokeLinecap="round">
          <path d="M 12.5 18.5 Q 15.5 14.5 18.5 18.5" />
          <path d="M 21.5 18.5 Q 24.5 14.5 27.5 18.5" />
        </g>
        <path d="M 15 23 Q 20 30.5 25 23 Q 20 25.5 15 23 Z" fill="#31237c" />
      </svg>
    </div>
  );
}

export type BottomNavProps = {
  active?: number;
  guest?: boolean;
  onSelect?: (index: number) => void;
  style?: CSSProperties;
};

/**
 * BottomNav — the floating 5-slot tab bar. Visual order: Subjects · Planner ·
 * Ada (center) · Timer · Stats. Requires Material Icons Outlined to be loaded.
 * Position it inside a phone shell (it is absolutely positioned).
 */
export function BottomNav({ active = 0, guest = false, onSelect, style }: BottomNavProps) {
  // [icon, semanticIndex] — Ada (index 4) sits in the middle visually.
  const tabs: [string | null, number][] = [
    ["menu_book", 0],
    ["calendar_today", 1],
    [null, 4],
    ["timer", 2],
    ["bar_chart", 3],
  ];
  const locked = (i: number) => guest && (i === 3 || i === 4);
  const tap = (i: number) => {
    if (!locked(i) && onSelect) onSelect(i);
  };
  return (
    <div
      style={{
        position: "absolute",
        bottom: 8,
        left: 10,
        right: 10,
        height: 56,
        background: "var(--surface-card)",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-nav)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 8px",
        ...style,
      }}
    >
      {tabs.map(([icon, i]) => {
        const isActive = active === i;
        if (!icon) {
          return (
            <div
              key={i}
              onClick={() => tap(i)}
              style={{
                position: "relative",
                flex: 1,
                display: "flex",
                justifyContent: "center",
                cursor: onSelect ? "pointer" : "default",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: isActive ? "var(--surface-ink)" : "var(--surface-card)",
                  border: isActive ? "none" : "1.5px solid var(--border-hairline)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: locked(i) ? 0.55 : 1,
                }}
              >
                <AdaNavFace size={34} />
              </div>
              {locked(i) && (
                <LockBadge style={{ position: "absolute", top: -1, right: 2 }} />
              )}
            </div>
          );
        }
        return (
          <div
            key={i}
            onClick={() => tap(i)}
            style={{
              position: "relative",
              flex: 1,
              display: "flex",
              justifyContent: "center",
              cursor: onSelect ? "pointer" : "default",
            }}
          >
            <div
              style={{
                width: 46,
                height: 40,
                borderRadius: "var(--radius-tab)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: isActive ? "var(--surface-ink)" : "transparent",
              }}
            >
              <span
                className="material-icons-outlined"
                style={{ fontSize: 24, color: isActive ? "#fff" : "var(--text-secondary)" }}
              >
                {icon}
              </span>
            </div>
            {locked(i) && (
              <LockBadge style={{ position: "absolute", top: -1, right: 2 }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default BottomNav;
