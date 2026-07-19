/* Periwinkle "melting ice" ramp — index 0 = melted & pale (worst) → 4 = crisp,
   vivid & frozen (best). Drives Ada's avatar, the mood scale and the focus timer. */

export type Tone = { border: string; body: string; ink: string };

export const CUBE_TONES: Tone[] = [
  { border: "#a79fc4", body: "#eae8f2", ink: "#938eac" }, // 0 Rough
  { border: "#9286d2", body: "#e4ddf3", ink: "#787299" }, // 1 Tired
  { border: "#7d70d9", body: "#dcd3f7", ink: "#5c5499" }, // 2 OK
  { border: "#6a5ce4", body: "#d2c5fa", ink: "#41358f" }, // 3 Good
  { border: "#5a44f1", body: "#cbbcfd", ink: "#31237c" }, // 4 Great
];
