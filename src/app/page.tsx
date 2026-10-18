import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { LiveScannerDemo } from "@/components/home/LiveScannerDemo";
import { StatsSection } from "@/components/home/StatsSection";
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ComparisonTable } from "@/components/home/ComparisonTable";
import { SupportedCrops } from "@/components/home/SupportedCrops";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQSection } from "@/components/home/FAQSection";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero with 98% Accuracy headline */}
      <HeroSection />

      {/* 2. Interactive live leaf scanner demo */}
      <LiveScannerDemo />

      {/* 3. Global agronomic stats & benchmarks */}
      <StatsSection />

      {/* 4. Complete agricultural feature grid */}
      <FeaturesGrid />

      {/* 5. 3-step pathology workflow */}
      <HowItWorks />

      {/* 6. Traditional vs Lab vs AI comparison table */}
      <ComparisonTable />

      {/* 7. Supported crops catalog */}
      <SupportedCrops />

      {/* 8. Verified grower and consultant testimonials */}
      <Testimonials />

      {/* 9. Comprehensive FAQs */}
      <FAQSection />

      {/* 10. High-impact bottom CTA */}
      <CTASection />
    </div>
  );
}
