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
    // These two files are deliberate imperative escape hatches — a Web Audio +
    // IntersectionObserver session controller (HomeClient) and a pre-paint DOM
    // sync for the comfort toggles (AppProvider). React's experimental Compiler
    // rules flag their (correct) effect-driven setState / ref mutation / DOM
    // reads, none of which happen during render. Relax just those advisories
    // here rather than restructuring verified, working imperative code.
    files: [
      "components/home/HomeClient.tsx",
      "components/site/AppProvider.tsx",
      // Home V2 sections that carry HomeClient's imperative controllers over.
      "components/home/v2/HeroSection.tsx",
      "components/home/v2/MeltSection.tsx",
      "components/home/v2/AdaSection.tsx",
    ],
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/immutability": "off",
      "react-hooks/purity": "off",
    },
  },
]);

export default eslintConfig;
