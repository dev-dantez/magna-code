"use client";

import PWAInstaller from "./components/PWAInstaller";
import HeroSection from "./components/home/HeroSection";
import ShowcaseSection from "./components/home/ShowcaseSection";
import ValuePropsSection from "./components/home/ValuePropsSection";
import HowItWorksSection from "./components/home/HowItWorksSection";
import TestimonialsSection from "./components/home/TestimonialsSection";
import FooterCTA from "./components/home/FooterCTA";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black">
      <HeroSection />
      <ShowcaseSection />
      <ValuePropsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FooterCTA />
      <PWAInstaller />
    </div>
  );
}
