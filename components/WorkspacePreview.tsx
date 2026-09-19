"use client";

import React, { useState } from "react";
import {
  FileText,
  LineChart,
  Gavel,
  Bot,
  Paperclip,
  ArrowUp,
  ExternalLink,
} from "lucide-react";

export default function WorkspacePreview() {
  const [checklist, setChecklist] = useState({
    stampDuty: true,
    hikeNegotiate: false,
    inventoryAnnexure: false,
  });

  const [chatQuestion, setChatQuestion] = useState(
    "What happens if the AC breaks down?"
  );

  return (
    <section className="w-full py-16 md:py-24 bg-[#eff4ff]/60 border-y border-[#0f172a]/5" id="demo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#d97706] font-extrabold block mb-2">
              Interactive Preview
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl text-[#0b1c30]">
              What the NyayaSetu Analysis Workspace Looks Like
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#45464d] font-mono hidden sm:inline">
              Sample: Bengaluru Urban Lease
            </span>
            <span className="px-3 py-1 bg-white border border-[#0f172a]/5 rounded-full text-xs font-semibold text-[#d97706] flex items-center gap-1.5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#d97706] animate-ping" />
              Live Simulation
            </span>
          </div>
        </div>

        {/* Main Workspace Frame */}
        <div className="w-full bg-white rounded-2xl border border-[#0f172a]/10 shadow-xl overflow-hidden">
          {/* Header Ribbon inside Workspace */}
          <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-[#e5eeff] border-b border-[#0f172a]/5 gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#0b1c30] shadow-xs">
                <FileText className="w-5 h-5 text-[#d97706]" />
              </div>
              <div>
                <h3 className="font-editorial font-bold text-sm sm:text-base text-[#0b1c30] leading-tight">
                  Residential Tenancy Agreement — Bengaluru Urban District
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#45464d] mt-1">
                  <span>11 Months Duration</span>
                  <span>•</span>
                  <span>e-Stamped Karnataka ₹100</span>
                  <span>•</span>
                  <span className="text-[#d97706] font-semibold font-mono">
                    CNR: KA-BLR-TEN-2025-0982
                  </span>
                </div>
              </div>
            </div>

            {/* Risk Score Meter */}
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="text-xs text-[#64748b]">Overall Risk Status</span>
                <span className="text-xs sm:text-sm text-[#d97706] font-bold">
                  Moderate Risk (3 Action Points)
                </span>
              </div>
              <div className="relative w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-2xs">
                <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#e2e8f0]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                  />
                  <path
                    className="text-[#d97706]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="68, 100"
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  />
                </svg>
                <span className="absolute text-[10px] font-bold text-[#0b1c30]">68%</span>
              </div>
            </div>
          </div>

          {/* 3-Pane Body Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#0f172a]/5">
            {/* PANE 1: SUMMARY & TIMELINE (3 cols) */}
            <div className="lg:col-span-3 p-5 bg-[#eff4ff]/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0b1c30]">
                    Key Facts Extracted
                  </span>
                  <LineChart className="w-4 h-4 text-[#64748b]" />
                </div>

                {/* Fact List */}
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded-xl border border-[#0f172a]/5 shadow-2xs">
                    <span className="text-[11px] text-[#64748b] block">Monthly Rent</span>
                    <span className="text-sm font-bold text-[#0b1c30]">₹42,000 / month</span>
                    <span className="text-[11px] text-[#45464d] block mt-0.5">
                      Due on or before 5th of each month
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-[#0f172a]/5 shadow-2xs">
                    <span className="text-[11px] text-[#64748b] block">Security Deposit</span>
                    <span className="text-sm font-bold text-[#0b1c30]">₹2,50,000</span>
                    <span className="text-[11px] text-[#d97706] font-semibold block mt-0.5">
                      ~6x rent (Bengaluru norm: 4-6x)
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-[#0f172a]/5 shadow-2xs">
                    <span className="text-[11px] text-[#64748b] block">Notice Period</span>
                    <span className="text-sm font-bold text-[#0b1c30]">2 Months Notice</span>
                    <span className="text-[11px] text-[#45464d] block mt-0.5">
                      Lock-in period: 6 months minimum
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-[#0f172a]/5 shadow-2xs">
                    <span className="text-[11px] text-[#64748b] block">Lease Commencement</span>
                    <span className="text-sm font-bold text-[#0b1c30]">1st November 2025</span>
                    <span className="text-[11px] text-[#45464d] block mt-0.5">
                      Expiry: 30th September 2026
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Checklist Widget */}
              <div className="mt-5 pt-4 border-t border-slate-200/70">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0b1c30] block mb-2.5">
                  Pre-Signing Checklist
                </span>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center gap-2 text-[#0b1c30] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.stampDuty}
                      onChange={(e) =>
                        setChecklist({ ...checklist, stampDuty: e.target.checked })
                      }
                      className="rounded accent-[#d97706] cursor-pointer"
                    />
                    <span className={checklist.stampDuty ? "line-through text-[#64748b]" : ""}>
                      Verify Stamp Duty via KOSH-2
                    </span>
                  </label>
                  <label className="flex items-center gap-2 text-[#0b1c30] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.hikeNegotiate}
                      onChange={(e) =>
                        setChecklist({ ...checklist, hikeNegotiate: e.target.checked })
                      }
                      className="rounded accent-[#d97706] cursor-pointer"
                    />
                    <span className={checklist.hikeNegotiate ? "line-through text-[#64748b]" : ""}>
                      Negotiate 15% Rent Hike (Cl. 9.3)
                    </span>
                  </label>
                  <label className="flex items-center gap-2 text-[#0b1c30] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.inventoryAnnexure}
                      onChange={(e) =>
                        setChecklist({
                          ...checklist,
                          inventoryAnnexure: e.target.checked,
                        })
                      }
                      className="rounded accent-[#d97706] cursor-pointer"
                    />
                    <span
                      className={checklist.inventoryAnnexure ? "line-through text-[#64748b]" : ""}
                    >
                      Demand Signed Inventory Annexure
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* PANE 2: ACTIVE CLAUSE SCRUTINY (5 cols) */}
            <div className="lg:col-span-5 p-5 bg-white flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0b1c30]">
                    Document Reader &amp; Clause Scrutiny
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-[#eff4ff] text-xs font-mono font-semibold text-[#45464d]">
                    Page 3 of 7
                  </span>
                </div>

                {/* Unfolded Active Clause Card */}
                <div className="p-4 bg-[#eff4ff]/60 border border-[#d97706]/30 rounded-xl shadow-2xs mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#0b1c30]">
                      Clause 9.3 • Rent Escalation on Renewal
                    </span>
                    <span className="px-2 py-0.5 bg-[#ffdcc3] text-[#2f1500] rounded text-[11px] font-bold">
                      Unreasonable Escalation
                    </span>
                  </div>

                  {/* Highlighted Quote */}
                  <blockquote className="font-mono text-xs bg-white border border-[#0f172a]/5 p-3 rounded-lg leading-relaxed text-[#0b1c30] shadow-2xs">
                    &quot;The Lessor expressly reserves the unrestricted discretion to{" "}
                    <mark className="bg-[#fe932c]/30 text-[#0b1c30] px-1 py-0.5 rounded font-semibold">
                      increase the rent by fifteen percent (15%)
                    </mark>{" "}
                    upon the expiration of eleven months without any obligation to serve written
                    justification or 60 days advance notice to Lessee...&quot;
                  </blockquote>

                  {/* Grounded Risk Flag Explanation */}
                  <div className="mt-3 p-3 bg-white rounded-lg border border-[#0f172a]/5">
                    <div className="flex items-center gap-1.5 text-[#d97706] font-bold text-xs mb-1">
                      <Gavel className="w-3.5 h-3.5" />
                      <span>Statutory &amp; Market Evaluation</span>
                    </div>
                    <p className="text-xs text-[#45464d] leading-relaxed">
                      Standard Bengaluru residential escalations range between{" "}
                      <strong>5% to 8%</strong>. Clause 9.3 lacks mandatory 90-day notice provisions
                      under standard Karnataka Rent Control principles.
                    </p>
                  </div>
                </div>

                {/* Secondary clause item (Passive) */}
                <div className="p-3 bg-[#eff4ff]/30 rounded-lg border border-[#0f172a]/5 hover:border-[#d97706]/40 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#0b1c30]">
                      Clause 12.1 • Structural Repairs vs Minor Maintenance
                    </span>
                    <span className="text-[#64748b] font-mono">Page 4: Line 82</span>
                  </div>
                  <p className="text-xs text-[#45464d] mt-1 line-clamp-1">
                    Tenant is burdened with seepage repairs exceeding ₹5,000 without lessor
                    deduction consent.
                  </p>
                </div>
              </div>

              {/* Precedent Link footer */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#64748b]">
                <span>Grounding Model: Gemini 2.5 Pro Verbatim</span>
                <a
                  href="#legal-literacy"
                  className="text-[#d97706] font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>Karnataka Tenancy Codex</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* PANE 3: GROUNDED Q&A ASSISTANT DIALOG (4 cols) */}
            <div className="lg:col-span-4 p-5 bg-[#eff4ff]/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5">
                    <Bot className="w-4 h-4 text-[#d97706]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0b1c30]">
                      Document AI Assistant
                    </span>
                  </div>
                  <span className="text-[11px] bg-white border border-[#0f172a]/5 px-2 py-0.5 rounded text-[#d97706] font-bold shadow-2xs">
                    Strict Citations Only
                  </span>
                </div>

                {/* Chat Stream */}
                <div className="space-y-3">
                  {/* User Question */}
                  <div className="flex justify-end">
                    <div className="bg-[#0f172a] text-white p-3 rounded-2xl rounded-tr-xs max-w-[85%] text-xs leading-relaxed shadow-xs">
                      Can the landlord evict me without 30 days written notice if I fail to pay
                      rent by the 10th?
                    </div>
                  </div>

                  {/* AI Response with Verbatim Grounding */}
                  <div className="flex justify-start">
                    <div className="bg-white text-[#0b1c30] p-3.5 rounded-2xl rounded-tl-xs max-w-[95%] border border-[#0f172a]/5 shadow-2xs text-xs space-y-2">
                      <p className="leading-relaxed">
                        <strong>No.</strong> According to <strong>Clause 11.2</strong> of your
                        uploaded agreement, the Lessor must provide a mandatory{" "}
                        <span className="bg-[#ffdcc3] text-[#2f1500] px-1 rounded font-semibold">
                          15-day Grace &amp; Cure Notice
                        </span>{" "}
                        before initiating eviction proceedings.
                      </p>

                      {/* Exact Citation Chip */}
                      <div className="p-2 bg-[#eff4ff] rounded-lg font-mono text-[11px] text-[#45464d] flex items-center justify-between border border-[#0f172a]/5">
                        <span className="flex items-center gap-1">
                          <Paperclip className="w-3.5 h-3.5 text-[#d97706]" />
                          <span>[Page 3, Paragraph 2, Line 41]</span>
                        </span>
                        <button className="text-[#d97706] font-bold hover:underline">Jump</button>
                      </div>

                      <p className="text-[11px] text-[#64748b] leading-relaxed">
                        Furthermore, under Section 106 of the Transfer of Property Act 1882, any
                        tenancy termination requires at least 15 days written notice ending with the
                        tenancy month.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input Box */}
              <div className="mt-5 pt-3">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={chatQuestion}
                    onChange={(e) => setChatQuestion(e.target.value)}
                    placeholder="Ask anything about this document..."
                    className="w-full pl-3.5 pr-10 py-2.5 bg-white border border-[#0f172a]/10 text-xs text-[#0b1c30] rounded-xl shadow-2xs focus:outline-none focus:border-[#d97706]"
                  />
                  <button
                    onClick={() => {
                      alert(`Question submitted: "${chatQuestion}"\nAnswer grounded from document text.`);
                    }}
                    className="absolute right-2.5 w-7 h-7 bg-[#d97706] text-white rounded-lg flex items-center justify-center hover:bg-[#b45309] transition-colors"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
