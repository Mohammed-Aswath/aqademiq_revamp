"use client";

import type { CSSProperties, ReactNode } from "react";
import { useApp } from "./AppProvider";

/**
 * Client button that opens the "Get the app" modal. Lets otherwise-static server
 * pages keep their exact inline-styled "Get the app" CTA while delegating the
 * click to AppProvider (the original `aq:ios` dispatch).
 */
export function GetAppButton({
  children,
  style,
  className,
}: {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}) {
  const { openGetApp } = useApp();
  return (
    <button onClick={openGetApp} style={style} className={className}>
      {children}
    </button>
  );
}

export default GetAppButton;
