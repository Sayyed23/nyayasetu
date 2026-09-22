"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import WorkspaceSubNav from "@/components/WorkspaceSubNav";
import Footer from "@/components/Footer";
import {
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Scale,
  FileText,
  Download,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function CheckRisksPage() {
  const [filter, setFilter] = useState<"all" | "high" | "unusual" | "omitted">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>("risk-1");

  const copyClause = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const risks = [
    {
      id: "risk-1",
      severity: "high",
      title: "Unilateral Security Deposit Forfeiture for Aesthetic Repainting",
      clauseRef: "Clause 14(b) • Page 4, Lines 112–119",
      groundedQuote:
        "The Lessor retains absolute, sole, and unilateral rights to forfeit in entirety the Security Deposit quantified under Clause 14(b) without prior cure notification in the event of minor aesthetic repainting requirements upon vacation...",
      statutoryViolation:
        "Model Tenancy Act 2021 (§13) & Karnataka Rent Control doctrine: Security deposits cannot be forfeited for fair wear and tear. A mandatory 30-day notice with verified bill estimates is legally required.",
      mitigationAction:
        "Replace with standard joint inspection protocol and cap repainting deductions to actual painters invoice or maximum 1 month rent.",
      counterClause:
        "The Lessor shall return the Security Deposit within seven (7) banking days of handover of possession. In the event of aesthetic paint wear, Lessor shall provide reasonable estimates and give Lessee fifteen (15) days to cure or approve reasonable paint touch-up expenses not exceeding ₹10,000.",
    },
    {
      id: "risk-2",
      severity: "high",
      title: "Uncapped Automatic 15% Annual Rent Escalation",
      clauseRef: "Clause 6 • Page 2, Lines 48–53",
      groundedQuote:
        "The monthly rent shall automatically escalate at the rate of fifteen percent (15%) per annum upon execution of any renewal deed...",
      statutoryViolation:
        "Commercial overreach: Average residential escalation in Bengaluru Urban is 5% to 8% per year. 15% escalation creates an unbalanced financial burden on the lessee.",
      mitigationAction:
        "Cap annual escalation strictly at 5% to 7% or link to prevailing RBI Retail Inflation Index.",
      counterClause:
        "Any lease renewal beyond the initial eleven (11) months shall be subject to mutual agreement, with rent escalation capped at a maximum of five percent (5%) per annum.",
    },
    {
      id: "risk-3",
      severity: "high",
      title: "Waiver of Judicial Notice Prior to Eviction / Lockout",
      clauseRef: "Clause 19 • Page 5, Lines 142–148",
      groundedQuote:
        "The Lessor may immediately enter, change door locks, and re-possess the demised premises upon seventy-two (72) hours notice without necessity of court process...",
      statutoryViolation:
        "Void Ab Initio under Section 23 of the Indian Contract Act, 1872 & Section 106 of the Transfer of Property Act, 1882. No agreement can override statutory judicial due process for tenancy eviction.",
      mitigationAction:
        "Delete waiver clause in its entirety and specify statutory 30-day notice with cure period.",
      counterClause:
        "In the event of any alleged breach of agreement, Lessor shall serve thirty (30) days formal written notice specifying the breach, during which Lessee shall have right to cure before any termination proceedings.",
    },
    {
      id: "risk-4",
      severity: "unusual",
      title: "Tenant Liable for Structural Seepage & Waterproofing Repairs",
      clauseRef: "Clause 9(c) • Page 3, Lines 88–94",
      groundedQuote:
        "All internal and external wall dampness, seepage, and terrace roof waterproofing shall be maintained and rectified at the sole cost of the Lessee...",
      statutoryViolation:
        "Deviation from Standard Tenancy Practice: Under Section 108(m) of the Transfer of Property Act 1882, major structural repairs are the inherent obligation of the landlord.",
      mitigationAction:
        "Shift structural and seepage maintenance explicitly to the Lessor.",
      counterClause:
        "The Lessor shall be exclusively responsible for all structural repairs, plumbing blockages within conduits, and external roof/wall dampness and waterproofing.",
    },
    {
      id: "risk-5",
      severity: "omitted",
      title: "Absence of Force Majeure / Uninhabitable Premises Rent Abatement",
      clauseRef: "Omitted Statutory Protection",
      groundedQuote: "No clause exists in the deed governing tenant rights during building structural hazard, fire, or urban flooding.",
      statutoryViolation:
        "Section 108(e) Transfer of Property Act 1882: If the premises become wholly or substantially unfit for occupation due to fire, flood, or violence, the lease is voidable at the option of the lessee.",
      mitigationAction:
        "Insert comprehensive Force Majeure & Rent Suspension provision.",
      counterClause:
        "If the demised premises become uninhabitable due to flood, structural fault, or act of God, rent shall be immediately suspended until full restoration, or Lessee may terminate lease with zero penalty and immediate full deposit refund.",
    },
  ];

  const filtered = risks.filter((r) => {
    if (filter === "high") return r.severity === "high";
    if (filter === "unusual") return r.severity === "unusual";
    if (filter === "omitted") return r.severity === "omitted";
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
      <Header />

      <main className="flex-1 pt-20">
        <WorkspaceSubNav activeTab="risks" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Header Diagnostic Box */}
          <div className="bg-white rounded-2xl p-6 border border-[#0f172a]/8 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#fef2f2] text-[#b91c1c] text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Elevated Risk Detected (6.8 / 10)
                </span>
                <span className="text-xs text-[#64748b]">100% Clause Coordinate Matching</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0b1c30]">
                Legal Risk Scrutiny & Ambiguity Scan
              </h1>
              <p className="text-xs sm:text-sm text-[#45464d] leading-relaxed">
                Automated cross-referencing of contractual clauses against Indian statutory precedents, Model Tenancy Act 2021, and Transfer of Property Act 1882.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => alert("Re-running automated statutory scrutiny...")}
                className="px-4 py-2 rounded-xl bg-[#f1f5f9] hover:bg-[#e2e8f0] text-xs font-bold text-[#0b1c30] transition-colors"
              >
                Re-Scan Scrutiny
              </button>
              <button
                type="button"
                onClick={() => alert("Exporting Risk Audit Dossier (PDF)...")}
                className="px-4 py-2 rounded-xl bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Download className="w-4 h-4 text-[#d97706]" />
                <span>Export Risk Dossier (PDF)</span>
              </button>
            </div>
          </div>

          {/* Filter Segmented Control */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === "all" ? "bg-[#0f172a] text-white shadow-sm" : "bg-white text-[#45464d] border border-[#0f172a]/5 hover:bg-[#eff4ff]"
              }`}
            >
              All Identified Flags ({risks.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("high")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === "high" ? "bg-[#b91c1c] text-white shadow-sm" : "bg-white text-[#45464d] border border-[#0f172a]/5 hover:bg-[#eff4ff]"
              }`}
            >
              High Legal Risk (3)
            </button>
            <button
              type="button"
              onClick={() => setFilter("unusual")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === "unusual" ? "bg-[#b45309] text-white shadow-sm" : "bg-white text-[#45464d] border border-[#0f172a]/5 hover:bg-[#eff4ff]"
              }`}
            >
              Unusual Market Deviation (1)
            </button>
            <button
              type="button"
              onClick={() => setFilter("omitted")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === "omitted" ? "bg-[#4f46e5] text-white shadow-sm" : "bg-white text-[#45464d] border border-[#0f172a]/5 hover:bg-[#eff4ff]"
              }`}
            >
              Omitted Statutory Terms (1)
            </button>
          </div>

          {/* Risks Cards List */}
          <div className="space-y-4">
            {filtered.map((item) => {
              const isExpanded = expandedId === item.id;
              const isHigh = item.severity === "high";
              const isUnusual = item.severity === "unusual";

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl border shadow-sm transition-all overflow-hidden ${
                    isHigh
                      ? "border-[#fca5a5]/60 hover:border-[#ef4444]"
                      : isUnusual
                      ? "border-[#fde68a] hover:border-[#f59e0b]"
                      : "border-[#c7d2fe] hover:border-[#6366f1]"
                  }`}
                >
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="p-5 sm:p-6 cursor-pointer flex items-start justify-between gap-4 select-none"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                            isHigh
                              ? "bg-[#fee2e2] text-[#b91c1c]"
                              : isUnusual
                              ? "bg-[#fef3c7] text-[#b45309]"
                              : "bg-[#e0e7ff] text-[#3730a3]"
                          }`}
                        >
                          {isHigh ? "High Legal Risk" : isUnusual ? "Market Deviation" : "Omitted Safeguard"}
                        </span>
                        <span className="text-xs font-mono font-semibold text-[#64748b]">
                          {item.clauseRef}
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-base sm:text-lg text-[#0b1c30]">
                        {item.title}
                      </h3>
                    </div>

                    <button
                      type="button"
                      className="p-1 rounded-lg text-[#64748b] hover:text-[#0b1c30] hover:bg-[#f1f5f9]"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Expanded Diagnostic Section */}
                  {isExpanded && (
                    <div className="px-5 sm:px-6 pb-6 pt-2 space-y-4 border-t border-[#0f172a]/5 animate-fade-in text-xs text-[#45464d]">
                      {/* Grounded Quote */}
                      <div className="space-y-1">
                        <span className="font-bold text-[#0b1c30] uppercase tracking-wider text-[10px]">
                          Original Agreement Clause Excerpt:
                        </span>
                        <div className="p-3.5 rounded-xl bg-[#f8f9ff] border border-[#cbd5e1] font-mono text-[#0b1c30] leading-relaxed">
                          &quot;{item.groundedQuote}&quot;
                        </div>
                      </div>

                      {/* Statutory Conflict */}
                      <div className="p-3.5 rounded-xl bg-[#fffbeb] border border-[#fde68a] text-[#92400e] space-y-1">
                        <span className="font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                          <Scale className="w-3.5 h-3.5" />
                          <span>Statutory Precedent Conflict</span>
                        </span>
                        <p className="leading-relaxed">{item.statutoryViolation}</p>
                      </div>

                      {/* Recommended Mitigation & Copyable Counter-Clause */}
                      <div className="p-4 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#065f46] uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Recommended Counter-Amendment</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => copyClause(item.id, item.counterClause)}
                            className="px-2.5 py-1 rounded bg-white text-[#065f46] border border-[#a7f3d0] font-bold text-xs flex items-center gap-1 shadow-2xs hover:bg-[#f0fdf4]"
                          >
                            {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-[#059669]" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedId === item.id ? "Copied" : "Copy Proposed Text"}</span>
                          </button>
                        </div>
                        <p className="font-mono text-[#065f46] text-xs bg-white p-3 rounded-lg border border-[#a7f3d0]/60 leading-relaxed">
                          &quot;{item.counterClause}&quot;
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
