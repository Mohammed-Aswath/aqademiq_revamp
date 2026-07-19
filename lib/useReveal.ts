"use client";

import { useEffect } from "react";

export type RevealOptions = {
  /** IntersectionObserver threshold (default 0.12, matching Home). */
  threshold?: number;
  /** Bottom root-margin, e.g. "-6%" (default), "-5%", "-4%". */
  rootMargin?: string;
  /** Reveal elements already within this fraction of the viewport on mount. */
  earlyRatio?: number;
  /** Safety timeout (ms) after which any still-hidden element is revealed. */
  safetyMs?: number;
};

function prefersReducedMotion(): boolean {
  const de = document.documentElement;
  if (de.getAttribute("data-reduce-motion") === "true") return true;
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

/**
 * SSR-safe port of the per-page IntersectionObserver scroll-reveal that every
 * .dc.html ran in componentDidMount. Observes all `[data-reveal]` elements in
 * the document and sets `data-shown="true"` as they scroll into view; reveals
 * everything immediately when reduce-motion is on.
 */
export function useReveal({
  threshold = 0.12,
  rootMargin = "-6%",
  earlyRatio = 1.15,
  safetyMs = 1800,
}: RevealOptions = {}) {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (nodes.length === 0) return;

    if (prefersReducedMotion()) {
      nodes.forEach((el) => el.setAttribute("data-shown", "true"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).setAttribute("data-shown", "true");
            io.unobserve(e.target);
          }
        });
      },
      { threshold, rootMargin: `0px 0px ${rootMargin} 0px` },
    );

    nodes.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * earlyRatio) {
        el.setAttribute("data-shown", "true");
      } else {
        io.observe(el);
      }
    });

    const t = window.setTimeout(() => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])")
        .forEach((el) => el.setAttribute("data-shown", "true"));
    }, safetyMs);

    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, [threshold, rootMargin, earlyRatio, safetyMs]);
}
