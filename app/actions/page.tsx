"use client";

import React, { useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import {
  CheckSquare,
  Clock,
  AlertTriangle,
  FileCheck,
  Download,
  Calendar,
  Send,
  Building,
  UserCheck,
  CheckCircle2,
  FileText,
  Scale,
  ExternalLink,
} from "lucide-react";

export default function ActionCenterPage() {
  const [tasks, setTasks] = useState([
    {
      id: "t-1",
      title: "Send Pre-Execution Amendment for Clause 14(b) (Deposit Forfeiture)",
      category: "Pre-Signing",
      priority: "critical",
      dueDate: "Before Signing (15 Feb 2024)",
      completed: false,
      description: "Transmit negotiated counter-draft capping repainting charges to actual verified painter receipts.",
    },
    {
      id: "t-2",
      title: "Request Joint Move-in Inventory & Fixture Condition Addendum",
      category: "Move-In",
      priority: "high",
      dueDate: "Day of Possession (1st March 2024)",
      completed: false,
      description: "Sign attached itemized list of electrical geysers, AC units, and woodwork condition.",
    },
    {
      id: "t-3",
      title: "First Month Rent & Deposit NEFT Transfer Verification",
      category: "Financial",
      priority: "standard",
      dueDate: "5th March 2024",
      completed: true,
      description: "Obtain stamped e-receipt from landlord for ₹38,000 rent to claim HRA tax exemption.",
    },
    {
      id: "t-4",
      title: "30-Day Mandatory Notice Reminder Prior to 11-Month Expiry",
      category: "Notice",
      priority: "high",
      dueDate: "15th Dec 2024",
      completed: false,
      description: "Serve formal written notice via registered email if intending to vacate upon 11-month conclusion.",
    },
  ]);

  const [activeNoticeModal, setActiveNoticeModal] = useState<string | null>(null);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const pendingCount = tasks.filter((t) => !t.completed).length;

  return (
    <DashboardShell showSubNav activeSubNav="actions">
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Action Center Header */}
          <div className="bg-white rounded-2xl p-6 border border-[#0f172a]/8 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-[#0f172a] text-white text-xs font-bold uppercase tracking-wider">
                  Institutional Execution Dossier
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#fef3c7] text-[#b45309] text-xs font-bold">
                  {pendingCount} Critical Actions Pending
                </span>
                <span className="text-xs text-[#64748b]">CNR: KA-BLR-TEN-2024-8841</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0b1c30]">
                Action Center & Legal Execution Plan
              </h1>
              <p className="text-xs sm:text-sm text-[#45464d] leading-relaxed">
                Track enforceable obligations, critical statutory deadlines, high-risk counter-actions, and prepare advocate-ready briefing dockets directly grounded in contractual clauses.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => alert("Compiling Advocate Briefing Docket (PDF)...")}
                className="px-4 py-2 rounded-xl bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Download className="w-4 h-4 text-[#d97706]" />
                <span>Advocate Briefing Docket</span>
              </button>
            </div>
          </div>

          {/* Key Metric Tiles */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-2xl border border-[#0f172a]/8 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b]">Contract Protection Score</span>
              <p className="text-xl font-bold text-[#d97706] mt-1">7.2 / 10</p>
              <span className="text-[11px] text-[#ba1a1a] font-semibold">Elevated Tenant Risk</span>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#0f172a]/8 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b]">Pending Action Items</span>
              <p className="text-xl font-bold text-[#0b1c30] mt-1">{pendingCount}</p>
              <span className="text-[11px] text-[#059669]">2 Pre-Signing</span>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#0f172a]/8 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b]">Next Statutory Deadline</span>
              <p className="text-xl font-bold text-[#0b1c30] mt-1">15 Feb 2024</p>
              <span className="text-[11px] text-[#64748b]">Clause 14(b) Amendment</span>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#0f172a]/8 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b]">Notice Period Window</span>
              <p className="text-xl font-bold text-[#0b1c30] mt-1">30 Days</p>
              <span className="text-[11px] text-[#059669]">Formal Written Notice</span>
            </div>
          </div>

          {/* Action Checklist */}
          <div className="bg-white rounded-2xl p-6 border border-[#0f172a]/8 shadow-sm space-y-4">
            <h2 className="font-serif font-bold text-base text-[#0b1c30] flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-[#d97706]" />
              <span>Contractual Execution Roadmap & Checklist</span>
            </h2>

            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                    task.completed
                      ? "bg-[#f8f9ff] border-[#e2e8f0] opacity-75"
                      : "bg-white border-[#cbd5e1] hover:border-[#0f172a]/30 shadow-2xs"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => {}} // Handled by outer div
                      className="mt-1 w-4 h-4 rounded text-[#0f172a] focus:ring-[#d97706] cursor-pointer"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-xs font-bold ${
                            task.completed ? "line-through text-[#64748b]" : "text-[#0b1c30]"
                          }`}
                        >
                          {task.title}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#f1f5f9] text-[#64748b] font-semibold">
                          {task.category}
                        </span>
                        {task.priority === "critical" && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#fee2e2] text-[#b91c1c] font-bold">
                            Critical
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#64748b]">{task.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-[#64748b] flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#d97706]" />
                      <span>{task.dueDate}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Remedies & Notice Generator Toolkit */}
          <div className="bg-white rounded-2xl p-6 border border-[#0f172a]/8 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-[#0b1c30] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#d97706]" />
              <span>Instant Legal Notice & Communication Generators</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#f8f9ff] border border-[#0f172a]/5 space-y-2 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-xs text-[#0b1c30]">Deposit Refund Demand Notice</h4>
                  <p className="text-xs text-[#64748b] mt-1">
                    Formal statutory demand letter under Model Tenancy Act §13 requesting deposit release within 7 days.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => alert("Generated 30-Day Formal Deposit Refund Demand Notice (PDF). Ready to send.")}
                  className="w-full py-2 rounded-lg bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold transition-colors"
                >
                  Generate Notice
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#f8f9ff] border border-[#0f172a]/5 space-y-2 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-xs text-[#0b1c30]">30-Day Intent to Vacate Notice</h4>
                  <p className="text-xs text-[#64748b] mt-1">
                    Legally valid move-out notice asserting full deposit return and scheduling joint move-out inspection.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => alert("Generated 30-Day Vacation Notice. Ready for dispatch.")}
                  className="w-full py-2 rounded-lg bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold transition-colors"
                >
                  Generate Notice
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#f8f9ff] border border-[#0f172a]/5 space-y-2 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-xs text-[#0b1c30]">Structural Repair Rectification Notice</h4>
                  <p className="text-xs text-[#64748b] mt-1">
                    Notice holding landlord accountable for roof seepage and concealed plumbing under TP Act §108.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => alert("Generated Structural Seepage Rectification Notice.")}
                  className="w-full py-2 rounded-lg bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold transition-colors"
                >
                  Generate Notice
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DashboardShell>
  );
}
