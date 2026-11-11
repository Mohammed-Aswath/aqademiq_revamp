import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    // Deliberate imperative escape hatches: the Web Audio + IntersectionObserver
    // controller behind the Home hero, and a pre-paint DOM sync for
    // the comfort toggles (AppProvider). React's experimental Compiler
    // rules flag their (correct) effect-driven setState / ref mutation / DOM
    // reads, none of which happen during render. Relax just those advisories
    // here rather than restructuring verified, working imperative code.
    files: [
      "components/site/AppProvider.tsx",
      "components/home/v2/HeroSection.tsx",
    ],
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/immutability": "off",
      "react-hooks/purity": "off",
    },
  },
]);

export default eslintConfig;
