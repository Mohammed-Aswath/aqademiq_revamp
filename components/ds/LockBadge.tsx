import type { CSSProperties } from "react";

export type LockBadgeProps = {
  size?: number;
  style?: CSSProperties;
};

/**
 * LockBadge — the small amber lock dot that marks features gated behind
 * onboarding / an account (guest mode). Overlay it on tabs, cards or rows.
 */
export function LockBadge({ size = 14, style }: LockBadgeProps) {
  const glyph = size * 0.58;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "var(--aq-warning)",
        border: "2px solid var(--surface-card)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        ...style,
      }}
    >
      <svg width={glyph} height={glyph} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="5" y="11" width="14" height="9" rx="2" fill="#fff" />
        <path
          d="M8 11V8a4 4 0 0 1 8 0v3"
          stroke="#fff"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default LockBadge;
