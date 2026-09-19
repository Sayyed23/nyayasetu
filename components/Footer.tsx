import React from "react";
import Logo from "./Logo";
import { ShieldCheck, Gavel } from "lucide-react";

export default function Footer() {
  const indicLanguages = [
    "हिन्दी",
    "English",
    "தமிழ்",
    "বাংলা",
    "मराठी",
    "తెలుగు",
    "ગુજરાતી",
    "ಕನ್ನಡ",
    "മലയാളം",
    "ਪੰਜਾਬੀ",
    "ଓଡ଼ିଆ",
    "+ 11 More",
  ];

  return (
    <footer className="w-full bg-[#e5eeff]/50 border-t border-[#0f172a]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4 pr-4">
            <a href="#" className="inline-block">
              <Logo className="h-10 w-auto" />
            </a>
            <p className="text-xs sm:text-sm text-[#45464d] leading-relaxed max-w-md">
              Bridging statutory complexity and citizen access through verified multi-language legal
              comprehension, evidentiary structure analysis, and constitutional literacy across
              India.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0b1c30]">
              <ShieldCheck className="w-4 h-4 text-[#059669]" />
              <span>256-bit Ephemeral Memory • Zero Model Retention</span>
            </div>
          </div>

          {/* Col 1: Document Analysis */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0b1c30] mb-1">
              Document Analysis
            </span>
            <a
              href="#document-types"
              className="text-xs text-[#45464d] hover:text-[#0b1c30] transition-colors"
            >
              Rental &amp; Lease Scrutiny
            </a>
            <a
              href="#document-types"
              className="text-xs text-[#45464d] hover:text-[#0b1c30] transition-colors"
            >
              Bilingual Contract Review
            </a>
            <a
              href="#document-types"
              className="text-xs text-[#45464d] hover:text-[#0b1c30] transition-colors"
            >
              Employment Offer Audit
            </a>
            <a
              href="#document-types"
              className="text-xs text-[#45464d] hover:text-[#0b1c30] transition-colors"
            >
              Consumer Terms Analysis
            </a>
          </div>

          {/* Col 2: Legal Information */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0b1c30] mb-1">
              Legal Information
            </span>
            <a
              href="#legal-literacy"
              className="text-xs text-[#45464d] hover:text-[#0b1c30] transition-colors"
            >
              Bhartiya Nyaya Sanhita (BNS)
            </a>
            <a
              href="#legal-literacy"
              className="text-xs text-[#45464d] hover:text-[#0b1c30] transition-colors"
            >
              Consumer Rights Codex
            </a>
            <a
              href="#legal-literacy"
              className="text-xs text-[#45464d] hover:text-[#0b1c30] transition-colors"
            >
              RTI Filing Blueprints
            </a>
            <a
              href="#legal-literacy"
              className="text-xs text-[#45464d] hover:text-[#0b1c30] transition-colors"
            >
              e-Courts Case Tracker Guide
            </a>
          </div>

          {/* Col 3: Security & Statutes */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0b1c30] mb-1">
              Security &amp; Statutes
            </span>
            <a
              href="#trust-and-security"
              className="text-xs text-[#45464d] hover:text-[#0b1c30] transition-colors"
            >
              DPDP Act 2023 Compliance
            </a>
            <a
              href="#trust-and-security"
              className="text-xs text-[#45464d] hover:text-[#0b1c30] transition-colors"
            >
              Ephemeral Vault Protocol
            </a>
            <a
              href="#trust-and-security"
              className="text-xs text-[#45464d] hover:text-[#0b1c30] transition-colors"
            >
              Judicial Citation Lexicon
            </a>
            <a
              href="#trust-and-security"
              className="text-xs text-[#45464d] hover:text-[#0b1c30] transition-colors"
            >
              Bar Council Guidelines Note
            </a>
          </div>
        </div>

        {/* Not Legal Advice Banner */}
        <div className="w-full bg-white p-5 rounded-2xl border border-[#0f172a]/5 mb-10 flex flex-col md:flex-row items-start md:items-center gap-4 shadow-xs">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#ffdcc3] text-[#904d00] shrink-0">
            <Gavel className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <span className="text-xs font-bold text-[#0b1c30] uppercase tracking-wide block mb-0.5">
              Not Legal Advice
            </span>
            <p className="text-xs text-[#45464d] leading-relaxed">
              NyayaSetu is an AI-powered legal clarity and evidence extraction platform for
              informational and civic literacy purposes only. It does not provide legal opinions or
              representation. Consult qualified legal counsel for professional representation in
              court or formal proceedings.
            </p>
          </div>
        </div>

        {/* Bottom Bar: Languages & Copyright */}
        <div className="pt-6 border-t border-slate-200/60 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-[#64748b]">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5">
            <span className="font-semibold text-[#0b1c30]">Supported Indic Frameworks:</span>
            {indicLanguages.map((lang, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-white border border-[#0f172a]/5 rounded text-[11px] font-semibold text-[#0b1c30]"
              >
                {lang}
              </span>
            ))}
          </div>

          <div className="text-center lg:text-right">
            <span>
              &copy; {new Date().getFullYear()} NyayaSetu Civic Intelligence Platform. Bharat. All
              rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
