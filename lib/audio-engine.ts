/**
 * Framework-free Web Audio engine for the Home "Focus Sample" hero. A faithful
 * port of the original DCLogic audio graph: a pink-noise source through a
 * lowpass (its cutoff wobbled by an LFO), plus three triangle-wave pads voicing
 * a per-mode chord, summed into a master gain → analyser → destination.
 *
 * The React component owns the session state machine, the bloom element, and
 * the tick loop; this class owns only the audio graph.
 */

export type ModeKey = "deepwork" | "flow" | "review" | "winddown" | "nosound";

export interface Mode {
  label: string;
  color: string;
  cut: number;
  chord: number[];
  noise: number;
  lfo: number;
}

export const MODES: Record<ModeKey, Mode> = {
  deepwork: { label: "Deep Work", color: "#6b5cf0", cut: 520, chord: [110, 146.83, 164.81], noise: 0.55, lfo: 0.06 },
  flow: { label: "Flow", color: "#2a9d6b", cut: 780, chord: [130.81, 196, 246.94], noise: 0.38, lfo: 0.09 },
  review: { label: "Review", color: "#e8a430", cut: 960, chord: [164.81, 220, 261.63], noise: 0.3, lfo: 0.13 },
  winddown: { label: "Wind-down", color: "#777777", cut: 360, chord: [98, 130.81, 146.83], noise: 0.46, lfo: 0.05 },
  nosound: { label: "No sound", color: "#9aa3b2", cut: 0, chord: [], noise: 0, lfo: 0 },
};

export const MODE_KEYS = Object.keys(MODES) as ModeKey[];

type WindowWithWebkit = Window &
  typeof globalThis & { webkitAudioContext?: typeof AudioContext };

export class AudioEngine {
  ctx?: AudioContext;
  private master?: GainNode;
  private analyser?: AnalyserNode;
  private freqData?: Uint8Array<ArrayBuffer>;
  private noiseSrc?: AudioBufferSourceNode;
  private noiseGain?: GainNode;
  private lp?: BiquadFilterNode;
  private lfo?: OscillatorNode;
  private lfoGain?: GainNode;
  private pads?: { o: OscillatorNode; g: GainNode }[];

  private makeNoise(ctx: AudioContext): AudioBuffer {
    const len = ctx.sampleRate * 2,
      buf = ctx.createBuffer(1, len, ctx.sampleRate),
      d = buf.getChannelData(0);
    let b0 = 0,
      b1 = 0,
      b2 = 0,
      b3 = 0,
      b4 = 0,
      b5 = 0,
      b6 = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + w * 0.0555179;
      b1 = 0.99332 * b1 + w * 0.0750759;
      b2 = 0.969 * b2 + w * 0.153852;
      b3 = 0.8665 * b3 + w * 0.3104856;
      b4 = 0.55 * b4 + w * 0.5329522;
      b5 = -0.7616 * b5 - w * 0.016898;
      d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11;
      b6 = w * 0.115926;
    }
    return buf;
  }

  /** Build the audio graph once and start the always-on sources (gains at 0). */
  init(mode: ModeKey) {
    if (this.ctx) return;
    const AC = window.AudioContext || (window as WindowWithWebkit).webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    this.ctx = ctx;
    this.master = ctx.createGain();
    this.master.gain.value = 0;
    this.analyser = ctx.createAnalyser();
    this.analyser.fftSize = 256;
    this.master.connect(this.analyser);
    this.analyser.connect(ctx.destination);
    this.freqData = new Uint8Array(this.analyser.frequencyBinCount);
    this.noiseSrc = ctx.createBufferSource();
    this.noiseSrc.buffer = this.makeNoise(ctx);
    this.noiseSrc.loop = true;
    this.noiseGain = ctx.createGain();
    this.noiseGain.gain.value = 0;
    this.lp = ctx.createBiquadFilter();
    this.lp.type = "lowpass";
    this.lp.frequency.value = 500;
    this.lp.Q.value = 0.8;
    this.noiseSrc.connect(this.noiseGain);
    this.noiseGain.connect(this.lp);
    this.lp.connect(this.master);
    this.lfo = ctx.createOscillator();
    this.lfo.frequency.value = 0.06;
    this.lfoGain = ctx.createGain();
    this.lfoGain.gain.value = 130;
    this.lfo.connect(this.lfoGain);
    this.lfoGain.connect(this.lp.frequency);
    this.pads = [0, 1, 2].map(() => {
      const o = ctx.createOscillator();
      o.type = "triangle";
      const g = ctx.createGain();
      g.gain.value = 0;
      o.connect(g);
      g.connect(this.master!);
      return { o, g };
    });
    try {
      this.noiseSrc.start();
      this.lfo.start();
      this.pads.forEach((p) => p.o.start());
    } catch {}
    this.applyMode(mode, 0.05);
  }

  /** Retune the graph to a mode. Does not touch the master gain. */
  applyMode(mode: ModeKey, ramp?: number) {
    if (!this.ctx) return;
    const m = MODES[mode];
    const t = this.ctx.currentTime;
    ramp = ramp || 0.4;
    this.lp!.frequency.setTargetAtTime(m.cut || 400, t, 0.25);
    this.lfo!.frequency.setTargetAtTime(m.lfo || 0.06, t, 0.4);
    this.noiseGain!.gain.setTargetAtTime((m.noise || 0) * 0.5, t, ramp);
    this.pads!.forEach((p, i) => {
      const f = m.chord[i];
      if (f) {
        p.o.frequency.setTargetAtTime(f * (1 + (i - 1) * 0.005), t, 0.4);
        p.g.gain.setTargetAtTime(0.05, t, ramp);
      } else {
        p.g.gain.setTargetAtTime(0, t, ramp);
      }
    });
  }

  setMasterGain(value: number, ramp: number) {
    if (this.ctx && this.master) {
      this.master.gain.setTargetAtTime(value, this.ctx.currentTime, ramp);
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === "suspended") this.ctx.resume();
  }

  suspend() {
    if (this.ctx && this.ctx.state === "running") this.ctx.suspend();
  }

  get state(): AudioContextState | undefined {
    return this.ctx?.state;
  }

  /** Average energy of the low bins (0..1), or null if no analyser is ready. */
  readAmp(): number | null {
    if (!this.analyser || !this.freqData) return null;
    this.analyser.getByteFrequencyData(this.freqData);
    let s = 0;
    for (let i = 0; i < 24; i++) s += this.freqData[i];
    return s / 24 / 255;
  }

  close() {
    try {
      this.ctx?.close();
    } catch {}
    this.ctx = undefined;
  }
}
