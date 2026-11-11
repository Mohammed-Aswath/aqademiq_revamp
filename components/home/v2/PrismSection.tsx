import Link from "next/link";
import s from "./home.module.css";

/* Prism: a static preview of the sound modes (Home.dc.html section 9). */

const MODES = [
  { name: "Deep Work", nameColor: "#31237c", desc: "For the thing you keep putting off", descColor: "#5c5499", bg: "var(--aq-periwinkle-soft)" },
  { name: "Flow", nameColor: "#1f7d54", desc: "Ride a good stretch", descColor: "#8e8a83", bg: "#f4f3f0" },
  { name: "Review", nameColor: "#c17d18", desc: "Going back over notes", descColor: "#8e8a83", bg: "#f4f3f0" },
  { name: "Wind-down", nameColor: "#57534d", desc: "Close the day kindly", descColor: "#8e8a83", bg: "#f4f3f0" },
];

export function PrismSection() {
  return (
    <section id="prism" style={{ padding: "clamp(48px,7vh,86px) clamp(20px,6vw,60px)" }}>
      <div
        style={{
          maxWidth: 1040,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap-reverse",
          gap: "clamp(30px,5vw,64px)",
          alignItems: "center",
        }}
      >
        <div style={{ flex: 1, minWidth: 280 }} data-reveal="">
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "#8e8a83",
              fontWeight: 600,
              marginBottom: 14,
            }}
          >
            Prism · sound
          </div>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 800,
              fontSize: "clamp(1.9rem,3.6vw,2.9rem)",
              letterSpacing: "-.028em",
              lineHeight: 1.07,
              margin: "0 0 16px",
              color: "#14130f",
              textWrap: "balance",
            }}
          >
            Sound that quiets the room.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1.02rem,1.3vw,1.18rem)",
              lineHeight: 1.55,
              color: "#4a4742",
              margin: "0 0 20px",
              maxWidth: 440,
            }}
          >
            Focus soundscapes tuned for studying, not a playlist to get lost in. Press play in the cube above to
            hear one.
          </p>
          <Link className={s["aq-plink"]} href="/science#prism" style={{ fontSize: 15.5 }}>
            The science of Prism{" "}
            <span className="material-icons-outlined" aria-hidden="true" style={{ fontSize: 18 }}>
              arrow_forward
            </span>
          </Link>
        </div>
        <div style={{ flex: 1.05, minWidth: 290, display: "flex", justifyContent: "center" }} data-reveal="">
          <div
            style={{
              background: "var(--aq-periwinkle-soft)",
              borderRadius: 34,
              padding: "clamp(24px,3vw,38px)",
              width: "100%",
              maxWidth: 400,
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: 22,
                boxShadow: "0 16px 44px rgba(49,35,124,.12)",
                padding: 16,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {MODES.map((m) => (
                <div
                  key={m.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 12px",
                    borderRadius: 14,
                    background: m.bg,
                  }}
                >
                  <span style={{ fontWeight: 800, fontSize: 14, color: m.nameColor }}>{m.name}</span>
                  <span style={{ fontSize: 11, color: m.descColor, fontWeight: 600 }}>{m.desc}</span>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 12px",
                  color: "#a8a49c",
                  fontSize: 11.5,
                  fontWeight: 600,
                }}
              >
                <span className="material-icons-outlined" aria-hidden="true" style={{ fontSize: 15 }}>
                  volume_off
                </span>
                No sound · silence is a mode too
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
