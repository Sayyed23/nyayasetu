"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import WorkspaceSubNav from "@/components/WorkspaceSubNav";
import Footer from "@/components/Footer";
import {
  FileText,
  ShieldCheck,
  AlertTriangle,
  Download,
  Share2,
  Languages,
  Zap,
  Layers,
  CheckCircle2,
  Calendar,
  Building,
  UserCheck,
  Scale,
  Sparkles,
  ChevronRight,
  Info,
  Check,
} from "lucide-react";

export default function UnderstandPage() {
  const [activeTab, setActiveTab] = useState<"tldr" | "sections" | "obligations">("tldr");
  const [targetLang, setTargetLang] = useState("kannada");

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
      <Header />

      <main className="flex-1 pt-20">
        {/* Shared Document Workbench Subnav */}
        <WorkspaceSubNav activeTab="understand" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Document Header Banner */}
          <div className="bg-white rounded-2xl p-6 border border-[#0f172a]/8 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-[#ecfdf5] text-[#065f46] text-xs font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified OCR Grounded
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#f1f5f9] text-[#45464d] text-xs font-mono">
                  SHA-256: 7f89c…e92a
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#fef2f2] text-[#ba1a1a] text-xs font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  1 Critical Risk Flagged
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0b1c30]">
                Residential Tenancy Agreement — Bengaluru Urban
              </h1>
              <div className="text-xs text-[#64748b] flex items-center gap-3 flex-wrap">
                <span>Type: <strong>11-Month Tenancy Deed</strong></span>
                <span>•</span>
                <span>Jurisdiction: <strong>Karnataka (Bengaluru Urban)</strong></span>
                <span>•</span>
                <span>Source: <strong>Formal Legal English (e-Stamp)</strong></span>
                <span>•</span>
                <span>7 Pages (24 Clauses Structured)</span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 flex-wrap">
              <button
                type="button"
                onClick={() => alert("Switching document...")}
                className="px-4 py-2 rounded-xl bg-[#f1f5f9] hover:bg-[#e2e8f0] text-xs font-bold text-[#0b1c30] transition-colors"
              >
                Switch Document
              </button>
              <button
                type="button"
                onClick={() => alert("Exporting Executive Plain Language Summary Docket (PDF)...")}
                className="px-4 py-2 rounded-xl bg-[#d97706] hover:bg-[#b45309] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Export Brief (PDF)</span>
              </button>
            </div>
          </div>

          {/* Mode Controls: TL;DR vs Section-wise vs Key Obligations */}
          <div className="bg-white rounded-2xl p-4 border border-[#0f172a]/8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-1 bg-[#f1f5f9] p-1 rounded-xl w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setActiveTab("tldr")}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  activeTab === "tldr"
                    ? "bg-white text-[#0b1c30] shadow-sm"
                    : "text-[#64748b] hover:text-[#0b1c30]"
                }`}
              >
                <Zap className="w-4 h-4 text-[#d97706]" />
                <span>TL;DR Executive Summary</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("sections")}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  activeTab === "sections"
                    ? "bg-white text-[#0b1c30] shadow-sm"
                    : "text-[#64748b] hover:text-[#0b1c30]"
                }`}
              >
                <Layers className="w-4 h-4 text-[#d97706]" />
                <span>Section-wise Breakdown</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("obligations")}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  activeTab === "obligations"
                    ? "bg-white text-[#0b1c30] shadow-sm"
                    : "text-[#64748b] hover:text-[#0b1c30]"
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-[#d97706]" />
                <span>Key Obligations</span>
              </button>
            </div>

            {/* Quick Vernacular Output Selector */}
            <div className="flex items-center gap-2 text-xs">
              <Languages className="w-4 h-4 text-[#d97706]" />
              <span className="font-semibold text-[#64748b]">Plain Language:</span>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="bg-[#f1f5f9] border border-[#0f172a]/5 rounded-lg px-2.5 py-1.5 text-xs font-bold text-[#0b1c30] focus:outline-none"
              >
                <option value="kannada">ಕನ್ನಡ (Kannada)</option>
                <option value="hindi">हिन्दी (Hindi)</option>
                <option value="english">Simple English</option>
                <option value="tamil">தமிழ் (Tamil)</option>
                <option value="marathi">मराठी (Marathi)</option>
              </select>
            </div>
          </div>

          {/* TAB 1: TL;DR EXECUTIVE SUMMARY */}
          {activeTab === "tldr" && (
            <div className="space-y-6 animate-fade-in">
              {/* Key Snapshot Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="bg-white p-4 rounded-xl border border-[#0f172a]/8 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b]">Monthly Rent</span>
                  <p className="text-lg font-bold text-[#0b1c30] mt-1">₹38,000</p>
                  <span className="text-[10px] text-[#059669]">Due by 5th monthly</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#0f172a]/8 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b]">Security Deposit</span>
                  <p className="text-lg font-bold text-[#0b1c30] mt-1">₹1,50,000</p>
                  <span className="text-[10px] text-[#ba1a1a] font-semibold">Flagged Clause 14(b)</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#0f172a]/8 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b]">Lock-in Period</span>
                  <p className="text-lg font-bold text-[#0b1c30] mt-1">6 Months</p>
                  <span className="text-[10px] text-[#64748b]">Both parties bound</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#0f172a]/8 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b]">Notice Period</span>
                  <p className="text-lg font-bold text-[#0b1c30] mt-1">1 Month</p>
                  <span className="text-[10px] text-[#64748b]">30 days written notice</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#0f172a]/8 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b]">Annual Escalation</span>
                  <p className="text-lg font-bold text-[#ba1a1a] mt-1">15% Hike</p>
                  <span className="text-[10px] text-[#ba1a1a]">Unusually high (Market: 5%)</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#0f172a]/8 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b]">Agreement Tenure</span>
                  <p className="text-lg font-bold text-[#0b1c30] mt-1">11 Months</p>
                  <span className="text-[10px] text-[#64748b]">Feb 2024 – Jan 2025</span>
                </div>
              </div>

              {/* Citizen Plain Language Synthesis */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#0f172a]/8 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-[#d97706]">
                  <Sparkles className="w-5 h-5" />
                  <h2 className="font-serif font-bold text-lg text-[#0b1c30]">
                    Plain-Language Legal Summary
                  </h2>
                </div>
                <div className="text-xs sm:text-sm text-[#45464d] leading-relaxed space-y-3">
                  <p>
                    This is an 11-month standard residential tenancy agreement between the landlord (Mr. R. Raghavan)
                    and tenant (Ms. Priya Narayan) for a flat in Indiranagar, Bengaluru. You pay ₹38,000 per month
                    plus maintenance.
                  </p>
                  <p className="p-3 bg-[#fffbeb] rounded-xl border border-[#fde68a] text-[#92400e]">
                    <strong>Critical Attention Item:</strong> Under Clause 14(b), the landlord claims the unilateral right
                    to forfeit your entire ₹1,50,000 security deposit if minor aesthetic repainting is required when moving
                    out. Under Karnataka rent law principles, ordinary wear and tear cannot justify deposit forfeiture.
                  </p>
                  <p>
                    You are locked in for 6 months. If you vacate before 6 months, you forfeit deposit equivalent to the
                    unexpired lock-in period. After 6 months, either party may terminate with 30 days written notice.
                  </p>
                </div>
              </div>

              {/* Dual-Column Clause Transformation Showcase */}
              <div className="bg-white rounded-2xl p-6 border border-[#0f172a]/8 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-base text-[#0b1c30] flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[#d97706]" />
                  <span>Key Clauses: Original Legalese vs. Plain Translation</span>
                </h3>

                <div className="space-y-4">
                  {/* Clause 1 */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 rounded-xl bg-[#f8f9ff] border border-[#0f172a]/5">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#ba1a1a]">
                        Raw Contract Text (Clause 14b)
                      </span>
                      <p className="text-xs font-mono text-[#0b1c30] bg-white p-3 rounded-lg border border-[#cbd5e1] leading-relaxed">
                        &quot;The Lessor shall retain sole and unilateral discretion to forfeit the entirety of the Security
                        Deposit quantified herein in the event of minor aesthetic repainting or touch-up requirements
                        upon the vacation of demised premises.&quot;
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#059669]">
                        Citizen Plain Meaning ({targetLang === "kannada" ? "ಕನ್ನಡ" : "Plain English"})
                      </span>
                      <p className="text-xs text-[#0b1c30] bg-[#ecfdf5] p-3 rounded-lg border border-[#a7f3d0] leading-relaxed">
                        {targetLang === "kannada"
                          ? "ಮನೆ ಖಾಲಿ ಮಾಡುವಾಗ ಸಣ್ಣ ಪುಟ್ಟ ಬಣ್ಣ ಬಳಿಯುವ ಖರ್ಚಿಗೆ ಮಾಲೀಕರು ನಿಮ್ಮ ₹1,50,000 ಸಂಪೂರ್ಣ ಠೇವಣಿ ಮುಟ್ಟುಗೋಲು ಹಾಕಿಕೊಳ್ಳುವ ಹಕ್ಕನ್ನು ಕಾಯ್ದಿರಿಸಿಕೊಂಡಿದ್ದಾರೆ. (ಇದು ಕಾನೂನುಬಾಹಿರ)."
                          : "The landlord claims they can keep all ₹1,50,000 of your deposit just for minor repainting touch-ups when you leave, without giving you a chance to fix it."}
                      </p>
                    </div>
                  </div>

                  {/* Clause 2 */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 rounded-xl bg-[#f8f9ff] border border-[#0f172a]/5">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b]">
                        Raw Contract Text (Clause 6)
                      </span>
                      <p className="text-xs font-mono text-[#0b1c30] bg-white p-3 rounded-lg border border-[#cbd5e1] leading-relaxed">
                        &quot;The monthly rent shall automatically escalate at the rate of fifteen percent (15%) per annum
                        upon the execution of any subsequent term or extension deed.&quot;
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#059669]">
                        Citizen Plain Meaning ({targetLang === "kannada" ? "ಕನ್ನಡ" : "Plain English"})
                      </span>
                      <p className="text-xs text-[#0b1c30] bg-[#ecfdf5] p-3 rounded-lg border border-[#a7f3d0] leading-relaxed">
                        {targetLang === "kannada"
                          ? "11 ತಿಂಗಳ ನಂತರ ಒಪ್ಪಂದ ನವೀಕರಿಸಿದರೆ, ಬಾಡಿಗೆ ಶೇಕಡಾ 15% ಹೆಚ್ಚಾಗುತ್ತದೆ (₹38,000 ರಿಂದ ₹43,700 ಕ್ಕೆ). ಬೆಂಗಳೂರು ಮಾರುಕಟ್ಟೆ ದರ 5-8% ಮಾತ್ರ."
                          : "If you renew the lease after 11 months, rent jumps 15% (from ₹38,000 to ₹43,700). The typical market benchmark in Bengaluru is only 5% to 8%."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SECTION-WISE BREAKDOWN */}
          {activeTab === "sections" && (
            <div className="space-y-4 animate-fade-in">
              {[
                {
                  title: "1. Demised Premises & Term of Lease",
                  clauses: "Clause 1 to 4",
                  summary: "Describes 3BHK flat in Indiranagar, 11-month validity starting 1st Feb 2024.",
                  status: "Standard / Safe",
                },
                {
                  title: "2. Rent, Escalation & Maintenance Dues",
                  clauses: "Clause 5 to 8",
                  summary: "₹38,000 monthly rent, 15% escalation on renewal. Maintenance paid directly to RWA.",
                  status: "Unusual Escalation (15%)",
                },
                {
                  title: "3. Security Deposit & Forfeiture Protocol",
                  clauses: "Clause 14(a) to 14(d)",
                  summary: "₹1,50,000 refundable deposit, with unfair unilateral repainting forfeiture clause.",
                  status: "High Legal Risk",
                },
                {
                  title: "4. Lock-in Period & Early Termination",
                  clauses: "Clause 17 & 18",
                  summary: "6-month initial lock-in. 30 days written notice required after lock-in.",
                  status: "Standard / Mutual",
                },
                {
                  title: "5. Dispute Resolution & Jurisdiction",
                  clauses: "Clause 22 to 24",
                  summary: "Courts of competent jurisdiction in Bengaluru Urban have exclusive jurisdiction.",
                  status: "Standard / Safe",
                },
              ].map((section, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-[#0f172a]/8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif font-bold text-sm text-[#0b1c30]">{section.title}</h4>
                      <span className="text-[11px] font-mono text-[#64748b] bg-[#f1f5f9] px-2 py-0.5 rounded">
                        {section.clauses}
                      </span>
                    </div>
                    <p className="text-xs text-[#45464d]">{section.summary}</p>
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full shrink-0 ${
                      section.status.includes("High")
                        ? "bg-[#fee2e2] text-[#b91c1c]"
                        : section.status.includes("Unusual")
                        ? "bg-[#fef3c7] text-[#b45309]"
                        : "bg-[#ecfdf5] text-[#065f46]"
                    }`}
                  >
                    {section.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: KEY OPERATIONAL OBLIGATIONS */}
          {activeTab === "obligations" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              {/* Tenant Duties */}
              <div className="bg-white rounded-2xl p-6 border border-[#0f172a]/8 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-base text-[#0b1c30] flex items-center gap-2 pb-2 border-b border-[#0f172a]/5">
                  <UserCheck className="w-5 h-5 text-[#d97706]" />
                  <span>Tenant Mandatory Obligations</span>
                </h3>
                <ul className="space-y-2.5 text-xs text-[#45464d]">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                    <span>Pay ₹38,000 rent into Landlord Bank Account on or before 5th of each calendar month.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                    <span>Maintain electrical and sanitary fixtures in proper working order during tenancy.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                    <span>Deliver 30 calendar days written notice prior to vacating premises after 6 months.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                    <span>Prohibit illegal sub-letting or commercial use without express written consent.</span>
                  </li>
                </ul>
              </div>

              {/* Landlord Duties */}
              <div className="bg-white rounded-2xl p-6 border border-[#0f172a]/8 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-base text-[#0b1c30] flex items-center gap-2 pb-2 border-b border-[#0f172a]/5">
                  <Building className="w-5 h-5 text-[#0f172a]" />
                  <span>Landlord Legal Obligations</span>
                </h3>
                <ul className="space-y-2.5 text-xs text-[#45464d]">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                    <span>Provide Quiet Enjoyment of the demised premises without unannounced inspections.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                    <span>Bear major structural repairs, exterior leakage, and municipal property tax charges.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                    <span>Refund full security deposit within 7 working days of keys handover.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                    <span>Provide valid statutory receipts for monthly rent received for HRA claims.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
