"use client";

import { AdaCube } from "@/components/ds";
import { APP_STORE_URL, APP_URL, PLAY_STORE_URL } from "@/lib/config";
import { useApp } from "./AppProvider";

/**
 * The "Get the app" modal — opened from the header/footer/hero "Get the app"
 * CTAs (via AppProvider.openGetApp). The original .dc.html modal carried a dead
 * email-capture success branch with no visible form; we render the app-store
 * content directly.
 */
export function GetAppModal() {
  const { getAppOpen, closeGetApp } = useApp();
  if (!getAppOpen) return null;

  return (
    <div
      onClick={closeGetApp}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(20,15,28,.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        backdropFilter: "blur(3px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--aq-paper)",
          borderRadius: 24,
          maxWidth: 440,
          width: "100%",
          padding: "clamp(28px,5vw,44px)",
          boxShadow: "0 24px 70px rgba(0,0,0,.4)",
          position: "relative",
        }}
      >
        <button
          onClick={closeGetApp}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            width: 34,
            height: 34,
            borderRadius: "50%",
            border: "none",
            background: "rgba(0,0,0,.05)",
            color: "#111",
            fontSize: 18,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-sans)",
          }}
        >
          ✕
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
          <AdaCube size={44} rating={4} expr="happy" />
        </div>
        <div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 27,
              fontWeight: 600,
              lineHeight: 1.15,
              margin: "0 0 10px",
              color: "#111",
            }}
          >
            Aqademiq is on your phone.
          </h3>
          <p style={{ fontSize: 15, lineHeight: 1.55, color: "#5f5f5f", margin: "0 0 20px" }}>
            The full experience, gentle haptics and all, now on iPhone and Android. And right now
            it&apos;s completely free.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <a
              href={APP_STORE_URL}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 9,
                padding: "14px 20px",
                background: "#111",
                color: "#fff",
                borderRadius: 100,
                fontWeight: 800,
                fontSize: 15,
                textDecoration: "none",
              }}
            >
              <span className="material-icons-outlined" style={{ fontSize: 19 }}>
                phone_iphone
              </span>
              Download on the App Store
            </a>
            <a
              href={PLAY_STORE_URL}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 9,
                padding: "14px 20px",
                background: "#111",
                color: "#fff",
                borderRadius: 100,
                fontWeight: 800,
                fontSize: 15,
                textDecoration: "none",
              }}
            >
              <span className="material-icons-outlined" style={{ fontSize: 19 }}>
                android
              </span>
              Get it on Google Play
            </a>
          </div>
          <p style={{ fontSize: 12.5, lineHeight: 1.5, color: "#8e8a83", margin: "14px 0 0" }}>
            Free to use today. Prefer a bigger screen?{" "}
            <a href={APP_URL} style={{ color: "#5941d6", fontWeight: 700 }}>
              Open Aqademiq on the web.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default GetAppModal;
