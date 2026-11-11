"use client";

import { useSyncExternalStore } from "react";

/** The design's reduced(): the site comfort toggle or the OS preference. */
function readReduced(): boolean {
  try {
    if (document.documentElement.getAttribute("data-reduce-motion") === "true") return true;
  } catch {}
  return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}

function subscribe(onChange: () => void): () => void {
  const mq = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  mq?.addEventListener("change", onChange);
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-reduce-motion"],
  });
  return () => {
    mq?.removeEventListener("change", onChange);
    mo.disconnect();
  };
}

/**
 * Live reduce-motion flag, re-read on every render like the design's
 * renderVals() did. False on the server.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, readReduced, () => false);
}

export { readReduced };
