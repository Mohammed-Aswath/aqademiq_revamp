import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

export type ButtonProps = {
  children: ReactNode;
  variant?: "solid" | "ghost";
  block?: boolean;
  disabled?: boolean;
  style?: CSSProperties;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "style" | "children">;

/**
 * Button — Aqademiq's pill button. Two looks: `solid` (ink-black fill, white
 * text) and `ghost` (white fill, hairline border). Extra-bold by default.
 */
export function Button({
  children,
  variant = "solid",
  block = true,
  disabled = false,
  onClick,
  style,
  ...rest
}: ButtonProps) {
  const ghost = variant === "ghost";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: block ? "100%" : "auto",
        padding: "13px 16px",
        background: ghost ? "var(--surface-card)" : "var(--surface-ink)",
        border: ghost ? "1.5px solid var(--border-hairline)" : "none",
        borderRadius: "var(--radius-pill)",
        color: ghost ? "var(--text-primary)" : "var(--text-on-ink)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-lg)",
        fontWeight: 800,
        letterSpacing: "0.01em",
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.45 : 1,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
