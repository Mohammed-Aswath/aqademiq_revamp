"use client";

import { useReveal, type RevealOptions } from "@/lib/useReveal";

/**
 * Drop-in client island that activates scroll-reveal for a server-rendered
 * page. Renders nothing; place it once anywhere in the page tree.
 */
export function RevealController(props: RevealOptions) {
  useReveal(props);
  return null;
}

export default RevealController;
