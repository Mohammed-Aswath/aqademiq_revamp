import type { CSSProperties, ReactNode } from "react";

export type CardProps = {
  children: ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
};

/**
 * Card — the default white surface: soft radius, low diffuse shadow, sitting on
 * the warm paper page. The building block for almost every screen.
 */
export function Card({ children, onClick, style }: CardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "var(--surface-card)",
        borderRadius: "var(--radius-lg)",
        padding: "12px 14px",
        boxShadow: "var(--shadow-card)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default Card;
