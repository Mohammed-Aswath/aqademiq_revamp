import type { CSSProperties, ReactNode } from "react";

export type SectionLabelProps = {
  children: ReactNode;
  style?: CSSProperties;
};

/**
 * SectionLabel — the tiny, dim, extra-bold uppercase eyebrow that sits above
 * form fields and list sections.
 */
export function SectionLabel({ children, style }: SectionLabelProps) {
  return (
    <div
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: 9,
        fontWeight: 800,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--text-dim)",
        marginBottom: 7,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default SectionLabel;
