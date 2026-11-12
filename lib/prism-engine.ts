/**
 * Prism — a Web Audio port of the Aqademiq Adaptive SoundScape Engine
 * (originally Flutter + SoLoud; see soundengine-for-flutter.md). It plays the
 * real recorded stems as a 4-layer generative ambient bed:
 *
 *   • Pad     — always-on tonal drone loop (F# minor), faded in to ~0.6
 *   • Texture — always-on masking loop (rain / sea / hum), level from dB
 *   • Pulse   — one-shot per beat on a BPM clock (density > 1.5 → half-beats)
 *   • Spark   — stochastic one-shots, min 3s gap, random pan ±0.7, vol 0.4
 *
 * Each mode chooses its own subset of those stems (see PRISM_MODES),
 * over a master bus: biquad low-pass → algorithmic reverb (convolver IR) →
 * gain → compressor → analyser → output. Stems are the compressed MP3s under
 * /audio/prism (built from the WAV stems by scripts/build-audio.mjs).
 */

const BASE = "/audio/prism";

const PAD_URLS = {
  drone: `${BASE}/pad-drone.mp3`,
  choir: `${BASE}/pad-choir.mp3`,
} as const;
const TEX_URLS = {
  rain: `${BASE}/tex-rain.mp3`,
  sea: `${BASE}/tex-sea.mp3`,
  hum: `${BASE}/tex-hum.mp3`,
} as const;
// Pulses with weighted-pick probability (Stem.probability in the spec).
const PULSES = {
  dreams: { url: `${BASE}/pulse-dreams.mp3`, prob: 0.6 },
  eternity: { url: `${BASE}/pulse-eternity.mp3`, prob: 0.4 },
} as const;
const SPARKS = {
  kalimba: `${BASE}/spark-kalimba.mp3`,
  pluck: `${BASE}/spark-pluck.mp3`,
  rhodesBassy: `${BASE}/spark-rhodes-bassy.mp3`,
  rhodesFull: `${BASE}/spark-rhodes-full.mp3`,
  rhodesWarm: `${BASE}/spark-rhodes-warm.mp3`,
} as const;

export type PadKey = keyof typeof PAD_URLS;
export type TextureKey = keyof typeof TEX_URLS;
export type PulseKey = keyof typeof PULSES;
export type SparkKey = keyof typeof SPARKS;

export interface PrismParams {
  padKey: PadKey;
  padLevel: number; // 0-1 (the spec's fixed 0.6, now per mode)
  textureKey: TextureKey;
  /** Which pulse stems this mode draws from (empty → no rhythm). */
  pulses: PulseKey[];
  /** Which spark stems this mode draws from (empty → no sparks). */
  sparks: SparkKey[];
  masterLpfCutoff: number; // Hz
  pulseBpm: number;
  pulseVolume: number; // 0-1
  pulseDensity: number; // > 1.5 → half-beat pulses
  sparkTriggerProb: number; // 0-1 per ~1s check
  textureVolumeDb: number; // dB → linear
  padReverbWet: number; // 0-1
  masterGain: number; // 0-1
}

export type PrismModeKey = "deepwork" | "flow" | "review" | "winddown" | "nosound";

export interface PrismMode {
  label: string;
  color: string;
  /** null → "No sound" (no audio graph, silent session). */
  params: PrismParams | null;
}

/**
 * The five hero buttons, each its own arrangement of the one Focus stem set.
 * Like the app's per-mode manifests (sound_manifest.dart), a mode picks a
 * subset of pads, pulses and sparks, not just different knob settings: when
 * Deep Work, Flow and Review shared every stem and differed only in tempo and
 * a texture sitting 12 dB under the pad, they sounded the same.
 *
 * - Deep Work: "a denser texture on purpose". Drone, rain brought forward,
 *   both bass pulses on half-beats, bright and sparse kalimba/pluck sparks.
 * - Flow: "ride a good stretch". Choir pad, sea, a single melodic bass on the
 *   beat at a quicker tempo, Rhodes phrases more often.
 * - Review: "going back over notes". Drone pulled back over a steady hum,
 *   one soft slow pulse, rare plucks, darker filter.
 * - Wind-down: choir and sea, no rhythm, one warm Rhodes, very dark.
 */
export const PRISM_MODES: Record<PrismModeKey, PrismMode> = {
  deepwork: {
    label: "Deep Work",
    color: "#6b5cf0",
    params: { padKey: "drone", padLevel: 0.45, textureKey: "rain", pulses: ["dreams", "eternity"], sparks: ["kalimba", "pluck"], masterLpfCutoff: 18000, pulseBpm: 77, pulseVolume: 0.8, pulseDensity: 2, sparkTriggerProb: 0.3, textureVolumeDb: -10, padReverbWet: 0.3, masterGain: 1.0 },
  },
  flow: {
    label: "Flow",
    color: "#2a9d6b",
    params: { padKey: "choir", padLevel: 0.55, textureKey: "sea", pulses: ["dreams"], sparks: ["rhodesFull", "rhodesWarm", "rhodesBassy"], masterLpfCutoff: 12000, pulseBpm: 84, pulseVolume: 0.6, pulseDensity: 1, sparkTriggerProb: 0.6, textureVolumeDb: -15, padReverbWet: 0.45, masterGain: 1.0 },
  },
  review: {
    label: "Review",
    color: "#e8a430",
    params: { padKey: "drone", padLevel: 0.35, textureKey: "hum", pulses: ["dreams"], sparks: ["pluck"], masterLpfCutoff: 3500, pulseBpm: 64, pulseVolume: 0.4, pulseDensity: 1, sparkTriggerProb: 0.12, textureVolumeDb: -9, padReverbWet: 0.55, masterGain: 0.95 },
  },
  winddown: {
    label: "Wind-down",
    color: "#777777",
    params: { padKey: "choir", padLevel: 0.6, textureKey: "sea", pulses: [], sparks: ["rhodesWarm"], masterLpfCutoff: 700, pulseBpm: 60, pulseVolume: 0.0, pulseDensity: 1, sparkTriggerProb: 0.06, textureVolumeDb: -18, padReverbWet: 0.55, masterGain: 0.8 },
  },
  nosound: { label: "No sound", color: "#9aa3b2", params: null },
};

export const PRISM_MODE_KEYS = Object.keys(PRISM_MODES) as PrismModeKey[];

const ALL_URLS = [
  ...Object.values(PAD_URLS),
  ...Object.values(TEX_URLS),
  ...Object.values(PULSES).map((p) => p.url),
  ...Object.values(SPARKS),
];

const SPARK_LEVEL = 0.4; // spec: fixed 0.4
const SPARK_PAN = 0.7; // spec: ±0.7
const SPARK_MIN_GAP = 3000; // spec: 3s
const MASTER_TRIM = 0.7; // headroom so summed layers don't clip pre-compressor

const dbToLinear = (db: number) => Math.pow(10, db / 20);

type WindowWithWebkit = Window &
  typeof globalThis & { webkitAudioContext?: typeof AudioContext };

export class PrismEngine {
  ctx?: AudioContext;
  private buffers = new Map<string, AudioBuffer>();
  private loadPromise?: Promise<void>;

  // master bus
  private lpf?: BiquadFilterNode;
  private wetGain?: GainNode;
  private outGain?: GainNode;
  private analyser?: AnalyserNode;
  private freqData?: Uint8Array<ArrayBuffer>;

  // layers
  private padGain?: GainNode;
  private texGain?: GainNode;
  private oneShotBus?: GainNode;
  private padSrc?: AudioBufferSourceNode;
  private texSrc?: AudioBufferSourceNode;

  private params?: PrismParams;
  private bpmTimer: number | null = null;
  private sparkTimer: number | null = null;
  private lastSpark = 0;

  // ── graph ──────────────────────────────────────────────────────────
  private ensureCtx(): AudioContext {
    if (this.ctx) return this.ctx;
    const AC = window.AudioContext || (window as WindowWithWebkit).webkitAudioContext;
    const ctx = new AC();
    this.ctx = ctx;

    this.lpf = ctx.createBiquadFilter();
    this.lpf.type = "lowpass";
    this.lpf.frequency.value = 8000;
    this.lpf.Q.value = 0.7;

    const dryGain = ctx.createGain();
    dryGain.gain.value = 1;
    this.wetGain = ctx.createGain();
    this.wetGain.gain.value = 0.4;
    const convolver = ctx.createConvolver();
    convolver.buffer = this.makeIR(ctx, 2.4, 2.2);

    const mix = ctx.createGain();
    this.outGain = ctx.createGain();
    this.outGain.gain.value = 0.0001;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -8;
    comp.ratio.value = 4;
    comp.attack.value = 0.01;
    comp.release.value = 0.25;
    this.analyser = ctx.createAnalyser();
    this.analyser.fftSize = 256;
    this.freqData = new Uint8Array(this.analyser.frequencyBinCount);

    // layer gains → lpf
    this.padGain = ctx.createGain();
    this.padGain.gain.value = 0;
    this.texGain = ctx.createGain();
    this.texGain.gain.value = 0;
    this.oneShotBus = ctx.createGain();
    this.oneShotBus.gain.value = 1;
    this.padGain.connect(this.lpf);
    this.texGain.connect(this.lpf);
    this.oneShotBus.connect(this.lpf);

    // lpf → dry + wet → mix → out → comp → analyser → destination
    this.lpf.connect(dryGain);
    this.lpf.connect(convolver);
    convolver.connect(this.wetGain);
    dryGain.connect(mix);
    this.wetGain.connect(mix);
    mix.connect(this.outGain);
    this.outGain.connect(comp);
    comp.connect(this.analyser);
    this.analyser.connect(ctx.destination);

    return ctx;
  }

  /** Exponentially-decaying stereo noise impulse — an algorithmic reverb tail. */
  private makeIR(ctx: AudioContext, seconds: number, decay: number): AudioBuffer {
    const rate = ctx.sampleRate;
    const len = Math.floor(rate * seconds);
    const buf = ctx.createBuffer(2, len, rate);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) {
        d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
      }
    }
    return buf;
  }

  /** Fetch + decode every stem once (idempotent). Needs the ctx (user gesture). */
  load(): Promise<void> {
    if (this.loadPromise) return this.loadPromise;
    const ctx = this.ensureCtx();
    this.loadPromise = (async () => {
      await Promise.all(
        ALL_URLS.map(async (url) => {
          const res = await fetch(url);
          const arr = await res.arrayBuffer();
          const buf = await ctx.decodeAudioData(arr);
          this.buffers.set(url, buf);
        }),
      );
    })();
    return this.loadPromise;
  }

  get isLoaded(): boolean {
    return this.buffers.size === ALL_URLS.length;
  }
  get state(): AudioContextState | undefined {
    return this.ctx?.state;
  }

  private ramp(node: GainNode, target: number, seconds: number) {
    const t = this.ctx!.currentTime;
    node.gain.cancelScheduledValues(t);
    node.gain.setValueAtTime(Math.max(node.gain.value, 0.0001), t);
    node.gain.linearRampToValueAtTime(Math.max(target, 0.0001), t + seconds);
  }

  private startLoopSource(url: string, gain: GainNode): AudioBufferSourceNode {
    const src = this.ctx!.createBufferSource();
    src.buffer = this.buffers.get(url)!;
    src.loop = true;
    src.connect(gain);
    src.start();
    return src;
  }

  // ── lifecycle ──────────────────────────────────────────────────────
  async start(params: PrismParams) {
    this.ensureCtx();
    await this.load();
    if (this.ctx!.state === "suspended") await this.ctx!.resume();
    this.params = params;

    // pad + texture loops, 3s fade-in
    this.padSrc = this.startLoopSource(PAD_URLS[params.padKey], this.padGain!);
    this.texSrc = this.startLoopSource(TEX_URLS[params.textureKey], this.texGain!);
    this.ramp(this.padGain!, params.padLevel, 3);
    this.ramp(this.texGain!, dbToLinear(params.textureVolumeDb), 3);

    this.applyDsp(params, 3);
    this.startClocks();
  }

  private applyDsp(p: PrismParams, seconds: number) {
    const t = this.ctx!.currentTime;
    this.lpf!.frequency.cancelScheduledValues(t);
    this.lpf!.frequency.setValueAtTime(this.lpf!.frequency.value, t);
    this.lpf!.frequency.linearRampToValueAtTime(
      Math.min(Math.max(p.masterLpfCutoff, 200), 20000),
      t + seconds,
    );
    this.ramp(this.wetGain!, Math.min(Math.max(p.padReverbWet, 0), 1), seconds);
    this.ramp(this.outGain!, MASTER_TRIM * Math.min(Math.max(p.masterGain, 0), 1), seconds);
  }

  private startClocks() {
    this.stopClocks();
    this.scheduleBpm();
    this.sparkTimer = window.setInterval(() => this.tryTriggerSpark(), 1000);
  }
  private stopClocks() {
    if (this.bpmTimer) {
      clearInterval(this.bpmTimer);
      this.bpmTimer = null;
    }
    if (this.sparkTimer) {
      clearInterval(this.sparkTimer);
      this.sparkTimer = null;
    }
  }
  private scheduleBpm() {
    if (this.bpmTimer) clearInterval(this.bpmTimer);
    const bpm = this.params?.pulseBpm ?? 77;
    const intervalMs = Math.round(60000 / bpm);
    this.bpmTimer = window.setInterval(() => {
      this.triggerPulse();
      if ((this.params?.pulseDensity ?? 1) > 1.5) {
        window.setTimeout(() => this.triggerPulse(), intervalMs / 2);
      }
    }, intervalMs);
  }

  private triggerPulse() {
    const p = this.params;
    if (!p || p.pulseVolume <= 0.001 || !p.pulses.length || !this.ctx || this.ctx.state !== "running") return;
    // weighted pick among this mode's pulses
    const pool = p.pulses.map((k) => PULSES[k]);
    let roll = Math.random() * pool.reduce((s, x) => s + x.prob, 0);
    let pick: string = pool[0].url;
    for (const x of pool) {
      roll -= x.prob;
      if (roll <= 0) {
        pick = x.url;
        break;
      }
    }
    const buf = this.buffers.get(pick);
    if (!buf) return;
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const g = this.ctx.createGain();
    g.gain.value = Math.min(Math.max(p.pulseVolume, 0), 1);
    src.connect(g);
    g.connect(this.oneShotBus!);
    src.start();
  }

  private tryTriggerSpark() {
    const p = this.params;
    if (!p || !p.sparks.length || !this.ctx || this.ctx.state !== "running") return;
    const now = performance.now();
    if (now - this.lastSpark < SPARK_MIN_GAP) return;
    if (Math.random() > p.sparkTriggerProb) return;
    this.lastSpark = now;
    const url = SPARKS[p.sparks[Math.floor(Math.random() * p.sparks.length)]];
    const buf = this.buffers.get(url);
    if (!buf) return;
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const g = this.ctx.createGain();
    g.gain.value = SPARK_LEVEL;
    const pan = this.ctx.createStereoPanner();
    pan.pan.value = (Math.random() * 2 - 1) * SPARK_PAN;
    src.connect(g);
    g.connect(pan);
    pan.connect(this.oneShotBus!);
    src.start();
  }

  /** Switch mode: retune DSP, crossfade pad/texture if the stem changed. */
  setMode(params: PrismParams) {
    if (!this.ctx) return;
    const prev = this.params;
    this.params = params;
    this.applyDsp(params, 4);

    if (prev && Math.abs(prev.pulseBpm - params.pulseBpm) > 1) this.scheduleBpm();

    if (prev?.padKey !== params.padKey) this.swapLoop("pad", PAD_URLS[params.padKey], params.padLevel);
    else this.ramp(this.padGain!, params.padLevel, 2);

    const texTarget = dbToLinear(params.textureVolumeDb);
    if (prev?.textureKey !== params.textureKey)
      this.swapLoop("tex", TEX_URLS[params.textureKey], texTarget);
    else this.ramp(this.texGain!, texTarget, 2);
  }

  private swapLoop(which: "pad" | "tex", url: string, target: number) {
    const gain = which === "pad" ? this.padGain! : this.texGain!;
    const oldSrc = which === "pad" ? this.padSrc : this.texSrc;
    this.ramp(gain, 0, 0.4);
    window.setTimeout(() => {
      try {
        oldSrc?.stop();
      } catch {}
      const src = this.startLoopSource(url, gain);
      if (which === "pad") this.padSrc = src;
      else this.texSrc = src;
      this.ramp(gain, target, 1.6);
    }, 450);
  }

  setMasterGain(value: number, seconds: number) {
    if (this.outGain) this.ramp(this.outGain, MASTER_TRIM * value, seconds);
  }

  pause() {
    this.stopClocks();
    if (this.outGain) this.ramp(this.outGain, 0, 0.3);
    const ctx = this.ctx;
    window.setTimeout(() => {
      if (ctx && ctx.state === "running") ctx.suspend();
    }, 360);
  }

  async resume() {
    if (!this.ctx || !this.params) return;
    if (this.ctx.state === "suspended") await this.ctx.resume();
    this.setMasterGain(this.params.masterGain, 0.4);
    this.startClocks();
  }

  stop() {
    this.stopClocks();
    if (this.outGain) this.ramp(this.outGain, 0, 0.7);
    const ctx = this.ctx;
    window.setTimeout(() => {
      if (ctx && ctx.state === "running") ctx.suspend();
    }, 750);
  }

  readAmp(): number | null {
    if (!this.analyser || !this.freqData) return null;
    this.analyser.getByteFrequencyData(this.freqData);
    let s = 0;
    for (let i = 0; i < 24; i++) s += this.freqData[i];
    return s / 24 / 255;
  }

  close() {
    this.stopClocks();
    try {
      this.padSrc?.stop();
      this.texSrc?.stop();
    } catch {}
    try {
      this.ctx?.close();
    } catch {}
    this.ctx = undefined;
  }
}
