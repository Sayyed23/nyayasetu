import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustStrip from "@/components/TrustStrip";
import HowItWorks from "@/components/HowItWorks";
import CoreFeatures from "@/components/CoreFeatures";
import DocumentTypes from "@/components/DocumentTypes";
import WorkspacePreview from "@/components/WorkspacePreview";
import MultilingualShowcase from "@/components/MultilingualShowcase";
import TrustArchitecture from "@/components/TrustArchitecture";
import PrivacySandbox from "@/components/PrivacySandbox";
import LegalLiteracy from "@/components/LegalLiteracy";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff]">
      {/* Sticky Top Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 pt-20">
        {/* Section 1: Hero with Grounded Clause Transformation */}
        <HeroSection />

        {/* Section 2: Trust & Value Strip */}
        <TrustStrip />

        {/* Section 3: 5-Step Grounded Execution Workflow */}
        <HowItWorks />

        {/* Section 4: Six Pillars Core Features */}
        <CoreFeatures />

        {/* Section 5: Common Document Archetypes */}
        <DocumentTypes />

        {/* Section 6: Live 3-Pane Analysis Workspace Preview */}
        <WorkspacePreview />

        {/* Section 7: Multilingual Indic Translation Showcase */}
        <MultilingualShowcase />

        {/* Section 8: Verification & Evidence Rigor */}
        <TrustArchitecture />

        {/* Section 9: DPDP Act 2023 Ephemeral Privacy Sandbox */}
        <PrivacySandbox />

        {/* Section 10: Legal Literacy & Statutory Knowledge Codex */}
        <LegalLiteracy />

        {/* Section 11: Final High-Impact Call to Action */}
        <CallToAction />
      </main>

      {/* Footer with Civic Disclaimer */}
      <Footer />
    </div>
  );
}
