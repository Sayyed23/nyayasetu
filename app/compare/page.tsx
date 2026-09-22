"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import WorkspaceSubNav from "@/components/WorkspaceSubNav";
import Footer from "@/components/Footer";
import {
  GitCompare,
  ArrowRightLeft,
  RefreshCw,
  Download,
  FileText,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Scale,
} from "lucide-react";

export default function CompareDocumentsPage() {
  const [swapped, setSwapped] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "modified" | "added" | "removed">("all");

  const clauseComparisons = [
    {
      id: "cl-1",
      number: "Clause 14(b)",
      title: "Security Deposit Return & Repainting Deductions",
      status: "modified",
      baseline:
        "The Lessor retains absolute, sole, and unilateral rights to forfeit in entirety the Security Deposit quantified under Clause 14(b) without prior cure notification in the event of minor aesthetic repainting requirements upon vacation.",
      counter:
        "The Lessor shall refund the full Security Deposit within seven (7) banking days of vacation. Deductions for painting shall only apply if structural damage exists, subject to joint inspection and capped at ₹10,000 max with verified invoice.",
      deltaAnalysis:
        "Protects ₹1,40,000 of tenant capital by eliminating unilateral forfeiture and establishing a mandatory joint pre-vacation inspection.",
    },
    {
      id: "cl-2",
      number: "Clause 6",
      title: "Annual Rent Escalation Cap",
      status: "modified",
      baseline:
        "The monthly rent shall automatically escalate at the rate of fifteen percent (15%) per annum upon execution of any renewal deed.",
      counter:
        "Any lease renewal beyond the initial term shall be subject to mutual written agreement, with rent escalation capped at a maximum of five percent (5%) per annum.",
      deltaAnalysis:
        "Saves ₹3,800/month in Year 2 by bringing annual escalation down from 15% to 5% (aligned with Bengaluru Urban averages).",
    },
    {
      id: "cl-3",
      number: "Clause 9(c)",
      title: "Structural Seepage & Conduit Plumbing",
      status: "modified",
      baseline:
        "All internal and external wall dampness, seepage, and terrace roof waterproofing shall be maintained and rectified at the sole cost of the Lessee.",
      counter:
        "The Lessor shall remain strictly responsible for all structural repairs, concealed plumbing conduits, and external building waterproofing.",
      deltaAnalysis:
        "Prevents tenant from being held liable for high-cost building repairs under Transfer of Property Act §108.",
    },
    {
      id: "cl-4",
      number: "Clause 19(a)",
      title: "Eviction & Judicial Notice Due Process",
      status: "modified",
      baseline:
        "The Lessor may immediately enter, change door locks, and re-possess the demised premises upon seventy-two (72) hours notice without necessity of court process.",
      counter:
        "In the event of default, the Lessor must serve thirty (30) days written notice detailing the breach, allowing Lessee thirty (30) days to remedy prior to any legal termination.",
      deltaAnalysis:
        "Removes illegal self-help eviction clause and re-establishes statutory 30-day notice under Section 106 TP Act 1882.",
    },
    {
      id: "cl-5",
      number: "Clause 21",
      title: "Force Majeure & Uninhabitable Premises Rent Waiver",
      status: "added",
      baseline: "(Clause completely absent in Landlord Draft A)",
      counter:
        "In the event the premises become uninhabitable due to flood, structural hazard, or civil disruption, rent shall be immediately suspended until restoration, or tenant may terminate with zero penalty.",
      deltaAnalysis:
        "New tenant protection clause guaranteeing immediate rent suspension during severe civic flooding or structural collapse.",
    },
  ];

  const filtered = clauseComparisons.filter((c) => {
    if (selectedFilter === "modified") return c.status === "modified";
    if (selectedFilter === "added") return c.status === "added";
    if (selectedFilter === "removed") return c.status === "removed";
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
      <Header />

      <main className="flex-1 pt-20">
        <WorkspaceSubNav activeTab="compare" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Main Compare Header */}
          <div className="bg-white rounded-2xl p-6 border border-[#0f172a]/8 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-[#0f172a] text-white text-xs font-bold uppercase tracking-wider">
                  Judicial Dual-Corpus Engine
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#ecfdf5] text-[#065f46] text-xs font-bold">
                  Comparison Complete • 18 Aligned • 4 Modified • 1 Added
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0b1c30]">
                Compare Legal Documents & Redlines
              </h1>
              <p className="text-xs sm:text-sm text-[#45464d] leading-relaxed">
                Institutional side-by-side legal diffing, clause alignment, and plain-language variance detection across agreement versions and tenant counter-proposals.
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                type="button"
                onClick={() => setSwapped(!swapped)}
                className="px-3.5 py-2 rounded-xl bg-white border border-[#cbd5e1] hover:bg-[#eff4ff] text-xs font-bold text-[#0b1c30] flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <ArrowRightLeft className="w-4 h-4 text-[#d97706]" />
                <span>Swap A ⇄ B</span>
              </button>
              <button
                type="button"
                onClick={() => alert("Re-running coordinate diff scrutiny...")}
                className="px-3.5 py-2 rounded-xl bg-[#f1f5f9] hover:bg-[#e2e8f0] text-xs font-bold text-[#0b1c30] flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Re-run Diff</span>
              </button>
              <button
                type="button"
                onClick={() => alert("Exporting Comparison Redline Dossier (PDF)...")}
                className="px-4 py-2 rounded-xl bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Download className="w-4 h-4 text-[#d97706]" />
                <span>Export Dossier (PDF)</span>
              </button>
            </div>
          </div>

          {/* Dual Document Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Document A */}
            <div className="p-5 bg-white rounded-2xl border border-[#0f172a]/8 shadow-sm space-y-3 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#d97706]"></div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#d97706] uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  <span>{swapped ? "Document B (Negotiated Counter-Draft)" : "Document A (Baseline Deed)"}</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#f1f5f9] text-[#45464d]">
                  {swapped ? "Tenant Counter" : "Landlord Draft"}
                </span>
              </div>
              <h2 className="font-serif font-bold text-sm text-[#0b1c30]">
                {swapped ? "Tenant_Counter_Draft_Negotiated_v2.pdf" : "Residential_Tenancy_Agreement_Blr_2024.pdf"}
              </h2>
              <div className="flex items-center gap-3 text-[11px] text-[#64748b]">
                <span>Format: 11-Month Deed</span>
                <span>•</span>
                <span>Bengaluru Urban</span>
                <span>•</span>
                <span>Uploaded: 12 Feb 2024</span>
              </div>
            </div>

            {/* Document B */}
            <div className="p-5 bg-white rounded-2xl border border-[#0f172a]/8 shadow-sm space-y-3 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#059669]"></div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#059669] uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  <span>{swapped ? "Document A (Baseline Deed)" : "Document B (Negotiated Counter-Draft)"}</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#ecfdf5] text-[#065f46]">
                  {swapped ? "Landlord Draft" : "Tenant Counter"}
                </span>
              </div>
              <h2 className="font-serif font-bold text-sm text-[#0b1c30]">
                {swapped ? "Residential_Tenancy_Agreement_Blr_2024.pdf" : "Tenant_Counter_Draft_Negotiated_v2.pdf"}
              </h2>
              <div className="flex items-center gap-3 text-[11px] text-[#64748b]">
                <span>Status: Fully Aligned Redline</span>
                <span>•</span>
                <span>Tenant Safeguards Inserted</span>
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedFilter("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedFilter === "all" ? "bg-[#0f172a] text-white shadow-sm" : "bg-white text-[#45464d] border border-[#0f172a]/5"
              }`}
            >
              All Differences ({clauseComparisons.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter("modified")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedFilter === "modified" ? "bg-[#b45309] text-white shadow-sm" : "bg-white text-[#45464d] border border-[#0f172a]/5"
              }`}
            >
              Modified Provisions (4)
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter("added")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedFilter === "added" ? "bg-[#059669] text-white shadow-sm" : "bg-white text-[#45464d] border border-[#0f172a]/5"
              }`}
            >
              Added Provisions (1)
            </button>
          </div>

          {/* Side-by-Side Clause Alignment Rows */}
          <div className="space-y-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#0f172a]/8 shadow-sm overflow-hidden p-5 sm:p-6 space-y-4"
              >
                <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-[#0f172a]/5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold bg-[#f1f5f9] px-2.5 py-1 rounded text-[#0b1c30]">
                      {item.number}
                    </span>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-[#0b1c30]">
                      {item.title}
                    </h3>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      item.status === "modified"
                        ? "bg-[#fef3c7] text-[#b45309]"
                        : "bg-[#ecfdf5] text-[#065f46]"
                    }`}
                  >
                    {item.status === "modified" ? "Clause Modified" : "New Term Inserted"}
                  </span>
                </div>

                {/* Side-by-side Text boxes */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Left Draft A */}
                  <div className="p-4 rounded-xl bg-[#fff1f2] border border-[#fecdd3] space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#be123c] block">
                      Baseline Landlord Draft (Original)
                    </span>
                    <p className="font-mono text-xs text-[#881337] leading-relaxed">
                      {item.baseline}
                    </p>
                  </div>

                  {/* Right Draft B */}
                  <div className="p-4 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#065f46] block">
                      Tenant Counter-Proposal (Redline Amendment)
                    </span>
                    <p className="font-mono text-xs text-[#064e3b] leading-relaxed">
                      {item.counter}
                    </p>
                  </div>
                </div>

                {/* Delta Analysis Box */}
                <div className="p-3.5 rounded-xl bg-[#f8f9ff] border border-[#0f172a]/5 text-xs text-[#45464d] flex items-start gap-2.5">
                  <Scale className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-[#0b1c30]">Legal Delta Impact: </strong>
                    {item.deltaAnalysis}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
