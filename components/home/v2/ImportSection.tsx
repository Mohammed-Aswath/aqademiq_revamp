"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { AdaCube, TaskCard } from "@/components/ds";
import s from "./home.module.css";

/* Import demo (Home.dc.html section 7), ported from the design's DCLogic. */

type Src = "calendar" | "reminders" | "paste";
type Item = { title: string; time?: string; tag: string; color: string };
type ImpBy = Record<Src, Item[]>;

const IMP_DEFAULT =
  "- bio lab report, due fri\n- read ch 5 (pages 80-112)\n- problem set 3\n- revise for the stats quiz\n- slides for group presentation";

const IMP_SRC = {
  calendar: [
    { title: "Chemistry lecture", time: "09:00" },
    { title: "Stats tutorial", time: "11:30" },
    { title: "Group project meeting", time: "15:00" },
  ],
  reminders: ["Problem set 3", "Read chapter 5", "Revise for the stats quiz", "Outline the history essay"],
};

const IMP_TABS: { id: Src; label: string; icon: string }[] = [
  { id: "calendar", label: "Calendar", icon: "calendar_today" },
  { id: "reminders", label: "Reminders", icon: "checklist" },
  { id: "paste", label: "Paste a list", icon: "content_paste" },
];

const VIB_LATCH = [12, 16, 8];

function buzz(p: number[]) {
  try {
    if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") navigator.vibrate(p);
  } catch {
    /* ignore */
  }
}

function parsePaste(txt: string): string[] {
  return String(txt || "")
    .split(/\r?\n/)
    .map((l) => l.replace(/^\s*(?:[-*•·>]+|\d+[.)]|\[\s?[xX]?\s?\])\s*/, "").trim())
    .filter((l) => l.length > 1)
    .map((l) => l.charAt(0).toUpperCase() + l.slice(1))
    .slice(0, 12);
}

/* The design's reduced(): the site comfort toggle or the OS preference. */
function readReduced(): boolean {
  try {
    if (document.documentElement.getAttribute("data-reduce-motion") === "true") return true;
  } catch {
    /* ignore */
  }
  return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function subscribeReduced(onChange: () => void): () => void {
  const mq = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  mq?.addEventListener("change", onChange);
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-reduce-motion"] });
  return () => {
    mq?.removeEventListener("change", onChange);
    mo.disconnect();
  };
}

const capStyle: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "#6b675f",
  fontWeight: 600,
  margin: "0 2px 2px",
};
const colStyle: CSSProperties = { display: "flex", flexDirection: "column", gap: 8 };
const rowTitle: CSSProperties = { fontWeight: 700, fontSize: 14.5 };
const calBar: CSSProperties = { width: 4, alignSelf: "stretch", borderRadius: 4, background: "#3f7be0" };
const calTime: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 12.5,
  fontWeight: 600,
  color: "#57534d",
  width: 44,
};
const remDot: CSSProperties = {
  width: 18,
  height: 18,
  borderRadius: "50%",
  border: "1.5px solid #c9c5bd",
  flexShrink: 0,
};
const listLabel: CSSProperties = {
  fontSize: 10,
  fontWeight: 800,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "#6b675f",
  marginBottom: 8,
};
/* The icon class is hashed inside the module, so `.im-tab .material-icons-outlined`
   (hide tab icons under 480px) only matches if the span carries the module key too. */
const tabIconClass = `material-icons-outlined ${s["material-icons-outlined"] ?? ""}`;

export function ImportSection() {
  const [imp, setImp] = useState<Src>("paste");
  const [impText, setImpText] = useState(IMP_DEFAULT);
  const [impBy, setImpBy] = useState<ImpBy>({ calendar: [], reminders: [], paste: [] });
  const [impShown, setImpShown] = useState(true);
  const [impLast, setImpLast] = useState<Src | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const red = useSyncExternalStore(subscribeReduced, readReduced, () => false);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  function doImport() {
    const src = imp;
    const by: ImpBy = { ...impBy };
    if (src === "calendar")
      by.calendar = IMP_SRC.calendar.map((e) => ({ title: e.title, time: e.time, tag: "From calendar", color: "#3f7be0" }));
    else if (src === "reminders")
      by.reminders = IMP_SRC.reminders.map((t) => ({ title: t, tag: "From Reminders", color: "#e8a430" }));
    else {
      const rows = parsePaste(impText);
      if (!rows.length) return;
      by.paste = rows.map((t) => ({ title: t, tag: "Pasted", color: "#6b5cf0" }));
    }
    buzz(VIB_LATCH);
    if (timer.current) clearTimeout(timer.current);
    setImpBy(by);
    setImpShown(false);
    setImpLast(src);
    timer.current = setTimeout(() => {
      timer.current = null;
      setImpShown(true);
    }, 40);
  }

  const vis = (src: Src, i: number): CSSProperties | undefined =>
    red || impLast !== src
      ? undefined
      : {
          transition: `opacity .45s ${i * 0.08}s,transform .45s ${i * 0.08}s`,
          ...(impShown ? { opacity: 1, transform: "none" } : { opacity: 0, transform: "translateY(8px)" }),
        };
  const anyAll = [
    ...impBy.reminders.map((t, i) => ({ ...t, vis: vis("reminders", i) })),
    ...impBy.paste.map((t, i) => ({ ...t, vis: vis("paste", i) })),
  ];
  const impAny = anyAll.slice(0, 6);
  const impPlanned = impBy.calendar.map((t, i) => ({ ...t, vis: vis("calendar", i) }));
  const pasteN = parsePaste(impText).length;
  let impCta: string;
  if (imp === "calendar") impCta = "Import 3 events";
  else if (imp === "reminders") impCta = "Import 4 reminders";
  else impCta = pasteN ? `Turn ${pasteN} line${pasteN > 1 ? "s" : ""} into tasks` : "Paste a list first";
  const impEmpty = anyAll.length === 0 && impPlanned.length === 0;
  const impDone = anyAll.length + impPlanned.length > 0;
  const impNoteVis: CSSProperties | undefined =
    red || !impLast ? undefined : { transition: "opacity .5s .3s", opacity: impShown ? 1 : 0 };

  return (
    <section id="import" style={{ padding: "clamp(56px,8vh,100px) clamp(20px,6vw,60px)" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        <div
          style={{ textAlign: "center", maxWidth: 700, margin: "0 auto clamp(30px,4vw,48px)" }}
          data-reveal=""
        >
          <div className={s["aq-eyerow"]}>
            <span className={s.e}>Import</span>
            <span className={s["aq-new"]}>New</span>
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
            Bring the plan you already have.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1.02rem,1.3vw,1.18rem)",
              lineHeight: 1.55,
              color: "#4a4742",
              margin: "0 auto",
              maxWidth: 540,
            }}
          >
            Import from your calendar or reminders, or paste a list from anywhere. No retyping before you can
            start.
          </p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "stretch" }} data-reveal="">
          <div
            style={{
              flex: "1 1 400px",
              minWidth: 0,
              background: "#fff",
              borderRadius: 28,
              padding: "clamp(18px,2.5vw,26px)",
              boxShadow: "0 16px 44px rgba(49,35,124,.08)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div
              role="tablist"
              aria-label="Import from"
              style={{ display: "flex", gap: 4, padding: 4, borderRadius: 100, background: "#f4f3f0" }}
            >
              {IMP_TABS.map((t) => {
                const on = imp === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    className={s["im-tab"]}
                    role="tab"
                    data-on={on ? "true" : "false"}
                    aria-selected={on}
                    onClick={() => setImp(t.id)}
                  >
                    <span className={tabIconClass} aria-hidden="true" style={{ fontSize: 17 }}>
                      {t.icon}
                    </span>
                    {t.label}
                  </button>
                );
              })}
            </div>

            {imp === "calendar" && (
              <div style={colStyle}>
                <div style={capStyle}>Your calendar · Tuesday</div>
                {IMP_SRC.calendar.map((e) => (
                  <div key={e.title} className={s["im-row"]}>
                    <span style={calBar} />
                    <span style={calTime}>{e.time}</span>
                    <span style={rowTitle}>{e.title}</span>
                  </div>
                ))}
              </div>
            )}

            {imp === "reminders" && (
              <div style={colStyle}>
                <div style={capStyle}>Your reminders · School</div>
                {IMP_SRC.reminders.map((t) => (
                  <div key={t} className={s["im-row"]}>
                    <span style={remDot} />
                    <span style={rowTitle}>{t}</span>
                  </div>
                ))}
              </div>
            )}

            {imp === "paste" && (
              <div style={colStyle}>
                <label htmlFor="aqImpText" style={capStyle}>
                  Paste anything · one task per line
                </label>
                <textarea
                  id="aqImpText"
                  className={s["im-area"]}
                  value={impText}
                  onChange={(e) => setImpText(e.target.value)}
                  spellCheck={false}
                />
              </div>
            )}

            <button
              type="button"
              onClick={doImport}
              style={{
                marginTop: "auto",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                height: 50,
                border: "none",
                borderRadius: 100,
                background: "#111",
                color: "#fff",
                fontFamily: "var(--font-sans)",
                fontWeight: 800,
                fontSize: 15.5,
                cursor: "pointer",
              }}
            >
              <span className="material-icons-outlined" aria-hidden="true" style={{ fontSize: 19 }}>
                move_to_inbox
              </span>
              {impCta}
            </button>
          </div>

          <div
            style={{
              flex: "1 1 340px",
              minWidth: 0,
              background: "var(--aq-periwinkle-soft)",
              borderRadius: 28,
              padding: "clamp(18px,2.5vw,26px)",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              aria-live="polite"
              style={{
                background: "#fff",
                borderRadius: 24,
                boxShadow: "0 16px 44px rgba(49,35,124,.12)",
                padding: "20px 18px",
                width: "100%",
                maxWidth: 340,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 16,
                }}
              >
                <span style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 18, color: "#14130f" }}>
                  Today
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#6b675f", fontWeight: 600 }}>
                  Tue 14
                </span>
              </div>
              {impEmpty && (
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    gap: 12,
                    padding: "30px 10px",
                  }}
                >
                  <AdaCube size={56} rating={3} expr="smile" />
                  <div style={{ fontWeight: 800, fontSize: 16, color: "#14130f" }}>An empty planner</div>
                  <div style={{ fontSize: 13.5, lineHeight: 1.5, color: "#57534d", maxWidth: 220 }}>
                    Import something on the left and watch it land here.
                  </div>
                </div>
              )}
              {anyAll.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <div style={listLabel}>{`Anytime (${anyAll.length})`}</div>
                  <div style={colStyle}>
                    {impAny.map((it, i) => (
                      <div key={`${i}-${it.title}`} style={it.vis}>
                        <TaskCard title={it.title} tag={it.tag} color={it.color} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {impPlanned.length > 0 && (
                <div>
                  <div style={listLabel}>Planned</div>
                  <div style={colStyle}>
                    {impPlanned.map((it, i) => (
                      <div key={`${i}-${it.title}`} style={it.vis}>
                        <TaskCard title={it.title} tag={it.tag} time={it.time} bar color={it.color} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {anyAll.length > 6 && (
                <div
                  style={{ fontSize: 12.5, color: "#57534d", fontWeight: 600, marginTop: 10, textAlign: "center" }}
                >
                  {`+${anyAll.length - 6} more in Anytime`}
                </div>
              )}
              {impDone && (
                <div style={impNoteVis}>
                  <div
                    style={{
                      marginTop: 14,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: "#f4f3f0",
                      borderRadius: 14,
                      padding: "10px 12px",
                      fontSize: 12.5,
                      lineHeight: 1.45,
                      color: "#45423d",
                      fontWeight: 600,
                    }}
                  >
                    <AdaCube size={22} rating={4} expr="happy" style={{ flexShrink: 0 }} />
                    Ready to start. Or hand the pile to Ada to make it smaller.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: 28 }}>
          <Link className={s["aq-plink"]} href="/how-it-works#import" style={{ fontSize: 15.5 }}>
            How Import works{" "}
            <span className="material-icons-outlined" aria-hidden="true" style={{ fontSize: 18 }}>
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
