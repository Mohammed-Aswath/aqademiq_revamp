import { RevealController } from "@/components/site/RevealController";
import { HeroSection } from "@/components/home/v2/HeroSection";
import { WhatsNewSection } from "@/components/home/v2/WhatsNewSection";
import { FreezeSection } from "@/components/home/v2/FreezeSection";
import { MeltSection } from "@/components/home/v2/MeltSection";
import { AmbientSection } from "@/components/home/v2/AmbientSection";
import { PlanSection } from "@/components/home/v2/PlanSection";
import { ImportSection } from "@/components/home/v2/ImportSection";
import { AdaSection } from "@/components/home/v2/AdaSection";
import { PrismSection } from "@/components/home/v2/PrismSection";
import { HapticsSection } from "@/components/home/v2/HapticsSection";
import { CoreSection } from "@/components/home/v2/CoreSection";
import { NoStreakSection } from "@/components/home/v2/NoStreakSection";
import { StoriesSection } from "@/components/home/v2/StoriesSection";
import { FaqSection } from "@/components/home/v2/FaqSection";
import { CtaSection } from "@/components/home/v2/CtaSection";

/**
 * Home, V2. One component per design section, in the design's order. Each
 * section owns its own state; none shares any with another (the design has no
 * cross-section coupling), so interactive sections are separate client islands
 * and the static ones stay server-rendered.
 */
export default function HomePage() {
  return (
    <div style={{ background: "var(--aq-paper)", overflowX: "clip" }}>
      <RevealController threshold={0.12} rootMargin="-6%" />
      <HeroSection />
      <WhatsNewSection />
      <FreezeSection />
      <MeltSection />
      <AmbientSection />
      <PlanSection />
      <ImportSection />
      <AdaSection />
      <PrismSection />
      <HapticsSection />
      <CoreSection />
      <NoStreakSection />
      <StoriesSection />
      <FaqSection />
      <CtaSection />
    </div>
  );
}
