import { AdaCube } from "@/components/ds";
import { GetAppButton } from "@/components/site/GetAppButton";
import { APP_URL } from "@/lib/config";

/*
 * Final CTA (Home.dc.html section 15). Static apart from the "Get the app"
 * button; Ada breathes via the global [data-breathe] rule, which the
 * reduce-motion settings already switch off.
 */

export function CtaSection() {
  return (
    <section
      style={{
        padding: "clamp(64px,10vh,130px) clamp(20px,6vw,60px)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: "44%",
          width: 520,
          height: 520,
          transform: "translate(-50%,-50%)",
          background: "radial-gradient(circle,rgba(107,92,240,.1),transparent 64%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ maxWidth: 720, margin: "0 auto", position: "relative" }} data-reveal="">
        <div data-breathe="true" style={{ display: "inline-block", marginBottom: 26 }}>
          {/* The design puts a drop-shadow style on this x-import, but its
              runtime drops it, so the approved render is unshadowed. */}
          <AdaCube size={82} rating={4} expr="happy" />
        </div>
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 800,
            fontSize: "clamp(2.1rem,4.6vw,3.6rem)",
            letterSpacing: "-.03em",
            lineHeight: 1.04,
            margin: "0 0 20px",
            color: "#14130f",
            textWrap: "balance",
          }}
        >
          Starting is the hard part. We&apos;ll take it from here.
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(1.05rem,1.35vw,1.24rem)",
            lineHeight: 1.5,
            color: "#4a4742",
            maxWidth: 480,
            margin: "0 auto 30px",
            fontWeight: 500,
          }}
        >
          Free to start, right in your browser.
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center",
            marginBottom: 16,
          }}
        >
          <a
            href={APP_URL}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              padding: "17px 34px",
              background: "#111",
              color: "#fff",
              borderRadius: 100,
              fontWeight: 800,
              fontSize: 17,
            }}
          >
            Start studying free
          </a>
          <GetAppButton
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "17px 30px",
              background: "transparent",
              color: "#14130f",
              border: "1.5px solid rgba(20,19,15,.18)",
              borderRadius: 100,
              fontWeight: 700,
              fontSize: 16,
              fontFamily: "var(--font-sans)",
              cursor: "pointer",
            }}
          >
            Get the app
          </GetAppButton>
        </div>
        <div style={{ fontSize: 13.5, color: "#6b675f", fontWeight: 600 }}>
          Free on iPhone, Android, and the web
        </div>
      </div>
    </section>
  );
}
