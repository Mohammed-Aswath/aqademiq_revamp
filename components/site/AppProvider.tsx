"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/**
 * App-wide client context. Replaces the original site's two ad-hoc globals:
 *   • the `aq:ios` CustomEvent that opened the "Get the app" modal, and
 *   • the SiteFooter-owned comfort toggles (reduce-motion / readable-font).
 *
 * Comfort state is the source of truth for the footer buttons; the actual
 * <html> attributes are applied pre-paint by the inline script in layout.tsx
 * (see ComfortScript) so there is no flash on load. Here we only mirror that
 * state into React and persist changes.
 */

type AppContextValue = {
  getAppOpen: boolean;
  openGetApp: () => void;
  closeGetApp: () => void;
  reduce: boolean;
  dyslexia: boolean;
  toggleReduce: () => void;
  toggleDyslexia: () => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within <AppProvider>");
  return ctx;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [getAppOpen, setGetAppOpen] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [dyslexia, setDyslexia] = useState(false);

  // Mirror the attributes the no-flash script already applied to <html>.
  useEffect(() => {
    const de = document.documentElement;
    setReduce(de.getAttribute("data-reduce-motion") === "true");
    setDyslexia(de.getAttribute("data-dyslexia") === "true");
  }, []);

  // Back-compat: any leftover `aq:ios` dispatch still opens the modal.
  useEffect(() => {
    const onIos = () => setGetAppOpen(true);
    window.addEventListener("aq:ios", onIos);
    return () => window.removeEventListener("aq:ios", onIos);
  }, []);

  const openGetApp = useCallback(() => setGetAppOpen(true), []);
  const closeGetApp = useCallback(() => setGetAppOpen(false), []);

  const toggleReduce = useCallback(() => {
    setReduce((prev) => {
      const v = !prev;
      document.documentElement.setAttribute(
        "data-reduce-motion",
        v ? "true" : "false",
      );
      try {
        localStorage.setItem("aq-reduce", v ? "1" : "0");
      } catch {}
      return v;
    });
  }, []);

  const toggleDyslexia = useCallback(() => {
    setDyslexia((prev) => {
      const v = !prev;
      document.documentElement.setAttribute(
        "data-dyslexia",
        v ? "true" : "false",
      );
      try {
        localStorage.setItem("aq-dyslexia", v ? "1" : "0");
      } catch {}
      return v;
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        getAppOpen,
        openGetApp,
        closeGetApp,
        reduce,
        dyslexia,
        toggleReduce,
        toggleDyslexia,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

/**
 * Inline, render-blocking script string that applies saved comfort settings to
 * <html> before first paint (no FOUC). Injected via dangerouslySetInnerHTML in
 * the root layout <head>.
 */
export const COMFORT_NO_FLASH_SCRIPT = `(function(){try{var d=document.documentElement;if(localStorage.getItem('aq-reduce')==='1')d.setAttribute('data-reduce-motion','true');if(localStorage.getItem('aq-dyslexia')==='1')d.setAttribute('data-dyslexia','true');}catch(e){}})();`;
