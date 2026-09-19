"use client";

import React, { useState } from "react";
import {
  UploadCloud,
  BookOpen,
  ShieldCheck,
  AlertTriangle,
  FileSearch,
  Scale,
  Link as LinkIcon,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function HeroSection() {
  const [heroLang, setHeroLang] = useState<"en" | "hi">("en");

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#f8f9ff] via-[#eff4ff]/60 to-[#f8f9ff] pt-12 pb-16 md:pt-16 md:pb-24">
      {/* Subtle architectural background aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-br from-[#dce9ff]/40 via-[#d3e4fe]/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Top Constitutional Overline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d3e4fe]/70 border border-[#0f172a]/5 shadow-xs mb-6">
          <span className="w-2 h-2 rounded-full bg-[#d97706] animate-pulse" />
          <span className="text-xs font-semibold text-[#0b1c30]">
            India&apos;s Civic Legal Intelligence Engine
          </span>
          <span className="text-[10px] font-extrabold text-[#d97706] px-2 py-0.5 rounded bg-white shadow-2xs tracking-wide">
            100% GROUNDED
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#0b1c30] tracking-tight max-w-5xl mb-6 leading-tight">
          Demystify Any Legal Document with{" "}
          <span className="text-[#d97706] underline decoration-[#fe932c]/50 decoration-4 underline-offset-8">
            Grounded Evidence
          </span>{" "}
          &amp; Plain-Language Clarity
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg text-[#45464d] max-w-3xl mb-10 leading-relaxed">
          Transform complex contracts, rent agreements, and consumer notices into
          transparent summaries, risk evaluations, and statutory cross-references in your
          native language. 100% grounded in your actual uploaded text.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14">
          <a
            href="/onboarding"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#d97706] text-white font-bold text-sm sm:text-base rounded-xl shadow-md hover:bg-[#b45309] transition-all transform hover:-translate-y-0.5"
          >
            <UploadCloud className="w-5 h-5" />
            <span>Upload a Document (PDF / Image / Doc)</span>
          </a>
          <a
            href="#legal-literacy"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white text-[#0b1c30] font-bold text-sm sm:text-base rounded-xl border border-[#0f172a]/10 shadow-xs hover:bg-[#eff4ff] transition-colors"
          >
            <BookOpen className="w-5 h-5 text-[#d97706]" />
            <span>Explore Legal Literacy &amp; Information</span>
          </a>
        </div>

        {/* Interactive Hero Visual Mockup: Side-by-Side Transformation */}
        <div className="w-full max-w-5xl text-left bg-white rounded-2xl border border-[#0f172a]/10 shadow-2xl overflow-hidden">
          {/* Window top control bar */}
          <div className="flex items-center justify-between px-5 py-3 bg-[#e5eeff] border-b border-[#0f172a]/5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#cbd5e1] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#cbd5e1] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#cbd5e1] inline-block" />
              <span className="ml-2 text-xs font-mono text-[#45464d] font-semibold">
                DOC_ID: BLR-TENANCY-AGREEMENT-2025.PDF
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0b1c30]">
              <ShieldCheck className="w-4 h-4 text-[#059669]" />
              <span>AI Verbatim Grounding Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: Raw Dense Legal Jargon */}
            <div className="p-6 bg-[#eff4ff]/60 border-b lg:border-b-0 lg:border-r border-[#0f172a]/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#45464d]">
                    Original Uploaded Excerpt
                  </span>
                  <span className="text-[11px] font-semibold bg-[#d3e4fe] px-2 py-0.5 rounded text-[#0b1c30]">
                    Page 4 • Lines 112–119
                  </span>
                </div>
                <div className="p-4 bg-white rounded-xl border border-[#0f172a]/5 font-mono text-[12.5px] leading-relaxed text-[#334155] shadow-2xs">
                  <p className="mb-2">
                    <span className="bg-[#ffdad6] text-[#ba1a1a] px-1 py-0.5 rounded font-bold">
                      &quot;IN WITNESS WHEREOF
                    </span>{" "}
                    the Lessor retains absolute, sole, and unilateral rights to forfeit in entirety
                    the Security Deposit quantified under Clause 14(b) without prior cure notification
                    in the event of minor aesthetic repainting requirements upon vacation...&quot;
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-[#d97706] text-xs font-semibold">
                    <FileSearch className="w-3.5 h-3.5" />
                    <span>Clause 14(b) - Forfeiture &amp; Vacating Penalties</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center gap-2 text-xs text-[#64748b]">
                <Scale className="w-4 h-4 text-[#d97706]" />
                <span>Raw Document Ingestion Engine • 99.4% OCR Precision</span>
              </div>
            </div>

            {/* Right: Plain-Language / Hindi Insight + Risk Flag */}
            <div className="p-6 bg-white flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#ba1a1a] uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4" />
                    <span>High Legal Risk Detected</span>
                  </div>
                  {/* Language Toggle */}
                  <div className="flex items-center gap-1 bg-[#eff4ff] p-1 rounded-lg border border-[#0f172a]/5">
                    <button
                      onClick={() => setHeroLang("en")}
                      className={`text-xs px-2.5 py-1 rounded font-semibold transition-all ${
                        heroLang === "en"
                          ? "bg-white text-[#0b1c30] shadow-xs"
                          : "text-[#64748b] hover:text-[#0b1c30]"
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => setHeroLang("hi")}
                      className={`text-xs px-2.5 py-1 rounded font-semibold transition-all ${
                        heroLang === "hi"
                          ? "bg-white text-[#0b1c30] shadow-xs"
                          : "text-[#64748b] hover:text-[#0b1c30]"
                      }`}
                    >
                      हिन्दी
                    </button>
                  </div>
                </div>

                {/* Content in Plain English */}
                {heroLang === "en" ? (
                  <div className="p-4 bg-[#fff1f2] border border-[#fecdd3] rounded-xl animate-fadeIn">
                    <h4 className="font-bold text-sm sm:text-base text-[#0b1c30] mb-1.5">
                      Unbalanced Security Deposit Forfeiture
                    </h4>
                    <p className="text-xs sm:text-sm text-[#45464d] mb-3 leading-relaxed">
                      The landlord can withhold your entire ₹1,50,000 security deposit for simple
                      paint wear without giving you a chance or 30-day notice to fix it.
                    </p>
                    {/* Statutory Cross Reference Chip */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white rounded-lg text-xs font-semibold text-[#0b1c30] shadow-2xs">
                        <Scale className="w-3.5 h-3.5 text-[#d97706]" />
                        Model Tenancy Act §19 Violation
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#e5eeff] rounded-lg text-xs font-mono text-[#0b1c30]">
                        <LinkIcon className="w-3 h-3 text-[#4f46e5]" />
                        Page 4: Line 114
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Content in Hindi */
                  <div className="p-4 bg-[#fff1f2] border border-[#fecdd3] rounded-xl animate-fadeIn">
                    <h4 className="font-bold text-sm sm:text-base text-[#0b1c30] mb-1.5">
                      सुरक्षा जमा (Security Deposit) ज़ब्त करने का असंतुलित नियम
                    </h4>
                    <p className="text-xs sm:text-sm text-[#45464d] mb-3 leading-relaxed">
                      मकान मालिक साधारण पेंट या खरोंच के लिए बिना किसी पूर्व 30-दिन की सूचना के
                      आपका पूरा ₹1,50,000 सुरक्षा डिपाजिट जब्त कर सकता है।
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white rounded-lg text-xs font-semibold text-[#0b1c30] shadow-2xs">
                        <Scale className="w-3.5 h-3.5 text-[#d97706]" />
                        मॉडल किरायेदारी अधिनियम धारा 19 का उल्लंघन
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#e5eeff] rounded-lg text-xs font-mono text-[#0b1c30]">
                        <LinkIcon className="w-3 h-3 text-[#4f46e5]" />
                        पृष्ठ 4: पंक्ति 114
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Prompt */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-[#d97706] font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Recommended Counter-Clause Generated
                </span>
                <a
                  href="#demo"
                  className="text-xs font-bold text-[#0b1c30] hover:text-[#d97706] inline-flex items-center gap-1"
                >
                  <span>Inspect in Workspace</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
