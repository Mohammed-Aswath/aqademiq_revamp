// Build compressed web audio assets for the Prism hero engine from the raw WAV
// stems. Trims the multi-minute pad drones to short loop segments and encodes
// everything to small MP3s under public/audio/prism/. Run: node scripts/build-audio.mjs
import { execFileSync } from "node:child_process";
import { mkdirSync, statSync } from "node:fs";
import ffmpegPath from "ffmpeg-static";

const SRC = "assets/audio/stems/focus_mode";
const OUT = "public/audio/prism";
mkdirSync(OUT, { recursive: true });

// [output, source, {ss, t, mono, kbps}]
const JOBS = [
  // Pads — trim ~26s from a stable middle section (stereo, richer bitrate).
  ["pad-drone.mp3", "pads/572778__deadrobotmusic__fubfmf-slow-f-sharp-minor.wav", { ss: 60, t: 26, kbps: 160 }],
  ["pad-choir.mp3", "pads/808032__deadrobotmusic__ambient-f-sharp-minor-ethereal-choir-pad-1.wav", { ss: 40, t: 26, kbps: 160 }],
  // Textures — masking loops (stereo).
  ["tex-rain.mp3", "textures/mixkit-light-rain-loop-2393.wav", { kbps: 128 }],
  ["tex-sea.mp3", "textures/mixkit-windy-sea-loop-1200.wav", { kbps: 128 }],
  ["tex-hum.mp3", "textures/mixkit-space-ship-hum-2136.wav", { ss: 4, t: 26, kbps: 128 }],
  // Pulses — short one-shots (mono; they get summed centrally).
  ["pulse-dreams.mp3", "pulses/Cymatics - Dreams Synth Bass - E.wav", { mono: true, kbps: 160 }],
  ["pulse-eternity.mp3", "pulses/Cymatics - Eternity 808 - E.wav", { mono: true, kbps: 160 }],
  // Sparks — short one-shots (mono; panned per trigger).
  ["spark-kalimba.mp3", "sparks/kalimba-hit-note-high-f_F_minor.wav", { mono: true, kbps: 160 }],
  ["spark-pluck.mp3", "sparks/pluck-shot-c-key.wav", { mono: true, kbps: 160 }],
  ["spark-rhodes-bassy.mp3", "sparks/rhodes-piano-one-shots-bassy_F.wav", { mono: true, kbps: 160 }],
  ["spark-rhodes-full.mp3", "sparks/rhodes-piano-one-shots-full_F.wav", { mono: true, kbps: 160 }],
  ["spark-rhodes-warm.mp3", "sparks/rhodes-piano-one-shots-warm-fat_F.wav", { mono: true, kbps: 160 }],
];

let total = 0;
for (const [out, src, o] of JOBS) {
  const args = ["-y", "-hide_banner", "-loglevel", "error"];
  if (o.ss != null) args.push("-ss", String(o.ss));
  args.push("-i", `${SRC}/${src}`);
  if (o.t != null) args.push("-t", String(o.t));
  if (o.mono) args.push("-ac", "1");
  args.push("-codec:a", "libmp3lame", "-b:a", `${o.kbps}k`, `${OUT}/${out}`);
  execFileSync(ffmpegPath, args, { stdio: ["ignore", "ignore", "inherit"] });
  const kb = statSync(`${OUT}/${out}`).size / 1024;
  total += kb;
  console.log(out.padEnd(22), kb.toFixed(1) + " KB");
}
console.log("— total".padEnd(22), (total / 1024).toFixed(2) + " MB");
