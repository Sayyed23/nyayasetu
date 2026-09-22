"use client";

import React, { useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import {
  Send,
  Sparkles,
  FileText,
  Search,
  Download,
  Trash2,
  Bot,
  User,
  CheckCircle2,
  ExternalLink,
  Mic,
  Languages,
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  citations?: { clause: string; page: string; quote: string }[];
  time: string;
}

export default function AskQAPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "Namaste Priya. I have indexed your Residential Tenancy Agreement (CNR: KA-BLR-TEN-2024-8841). Every answer is 100% grounded in your document text with verbatim clause citations. What would you like to verify?",
      time: "10:30 AM",
    },
    {
      id: "2",
      sender: "user",
      text: "Can the landlord deduct ₹50,000 from my deposit for wall repainting when I vacate?",
      time: "10:31 AM",
    },
    {
      id: "3",
      sender: "ai",
      text: "Under Clause 14(b) of your agreement, the landlord has included an aggressive unilateral clause claiming the right to forfeit your entire deposit for minor aesthetic touch-ups. However, under the Model Tenancy Act 2021 (§13) and Karnataka judicial precedents, normal wear and tear cannot be deducted, and any actual painting deduction requires prior 30-day notice with legitimate contractor estimates.",
      citations: [
        {
          clause: "Clause 14(b)",
          page: "Page 4, Lines 112–119",
          quote: "The Lessor retains absolute, sole, and unilateral rights to forfeit in entirety the Security Deposit quantified under Clause 14(b) without prior cure notification in the event of minor aesthetic repainting requirements...",
        },
      ],
      time: "10:31 AM",
    },
  ]);

  const [inputQuery, setInputQuery] = useState("");
  const [searchClause, setSearchClause] = useState("");

  const quickPrompts = [
    "What is the penalty if I vacate before 6 months?",
    "Can the landlord enter without 24h prior notice?",
    "Who pays for external roof leakage & plumbing repairs?",
    "What is the notice period for rent renewal?",
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputQuery,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");

    // Simulated grounded AI response
    setTimeout(() => {
      const aiReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: `Under Clause 17 & 18 of the uploaded tenancy deed, you have an initial lock-in period of 6 months. Vacating before this term forfeits rent for the remainder of the lock-in. After 6 months, you only need to provide 30 days written notice to receive a full refund of your deposit within 7 days.`,
        citations: [
          {
            clause: "Clause 17 & 18",
            page: "Page 5, Lines 130–140",
            quote: "Neither party shall be entitled to terminate this agreement during the initial lock-in duration of six (6) months from the commencement date...",
          },
        ],
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiReply]);
    }, 700);
  };

  const documentClauses = [
    { num: "1", title: "Demised Premises Identification", page: "P. 1" },
    { num: "2", title: "Tenancy Term & Effective Date", page: "P. 1" },
    { num: "5", title: "Monthly Rent & Due Date (5th)", page: "P. 2" },
    { num: "6", title: "Annual Rent Escalation (15%)", page: "P. 2", flagged: true },
    { num: "9", title: "Maintenance & Fixtures Responsibility", page: "P. 3" },
    { num: "14", title: "Security Deposit & Forfeiture Terms", page: "P. 4", flagged: true },
    { num: "17", title: "Lock-in Period (6 Months)", page: "P. 5" },
    { num: "19", title: "Default & Eviction Protocol", page: "P. 5", flagged: true },
    { num: "24", title: "Governing Law & Bengaluru Courts", page: "P. 7" },
  ];

  return (
    <DashboardShell showSubNav activeSubNav="ask">
      <main className="flex-1 flex flex-col">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col space-y-4 w-full">
          {/* Main 2-Pane Q&A Workbench */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-start">
            {/* Left Column: Clause Explorer (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-[#0f172a]/8 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#0f172a]/5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0b1c30]">
                  <FileText className="w-4 h-4 text-[#d97706]" />
                  <span>Document Index & Clauses</span>
                </div>
                <span className="text-[10px] bg-[#f1f5f9] px-2 py-0.5 rounded text-[#64748b]">24 Clauses</span>
              </div>

              {/* Clause Search Input */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#64748b] absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchClause}
                  onChange={(e) => setSearchClause(e.target.value)}
                  placeholder="Search clause by keyword..."
                  className="w-full h-9 pl-9 pr-3 rounded-xl border border-[#cbd5e1] text-xs text-[#0b1c30] placeholder:text-[#94a3b8] focus:outline-none focus:ring-1 focus:ring-[#d97706]"
                />
              </div>

              {/* Clauses Scroll List */}
              <div className="space-y-1.5 max-h-[460px] overflow-y-auto pr-1">
                {documentClauses.map((c) => (
                  <button
                    key={c.num}
                    type="button"
                    onClick={() => {
                      setInputQuery(`Tell me about Clause ${c.num}: ${c.title}`);
                    }}
                    className="w-full text-left p-2.5 rounded-xl text-xs hover:bg-[#f8f9ff] border border-transparent hover:border-[#0f172a]/5 flex items-center justify-between transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-[#eff4ff] text-[#0b1c30] font-mono font-bold flex items-center justify-center text-[10px]">
                        §{c.num}
                      </span>
                      <span className="font-semibold text-[#0b1c30] group-hover:text-[#d97706] truncate max-w-[180px]">
                        {c.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {c.flagged && (
                        <span className="w-2 h-2 rounded-full bg-[#ba1a1a]" title="Risk Flagged"></span>
                      )}
                      <span className="text-[10px] text-[#94a3b8]">{c.page}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-3 bg-[#f8f9ff] rounded-xl border border-[#0f172a]/5 text-[11px] text-[#64748b]">
                <p>💡 Tip: Click any clause section above to immediately query AI analysis grounded in that provision.</p>
              </div>
            </div>

            {/* Right Column: Q&A Chat Interactive Dialogue (8 cols) */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-[#0f172a]/8 shadow-sm flex flex-col h-[620px]">
              {/* Chat Top Header */}
              <div className="p-4 border-b border-[#0f172a]/5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#0f172a] text-white flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#d97706]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#0b1c30]">Grounded Legal Assistant</h3>
                    <p className="text-[10px] text-[#059669] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Zero Hallucination Mode • 99.4% Verbatim Grounding
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setMessages([messages[0]])}
                    className="p-1.5 rounded-lg text-[#64748b] hover:text-[#0b1c30] hover:bg-[#f1f5f9]"
                    title="Clear Chat History"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => alert("Exporting Grounded Q&A Docket (PDF)...")}
                    className="px-3 py-1.5 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-xs font-bold text-[#0b1c30] flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Export Docket</span>
                  </button>
                </div>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex items-start gap-3 ${
                      m.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        m.sender === "user" ? "bg-[#d97706] text-white" : "bg-[#0f172a] text-white"
                      }`}
                    >
                      {m.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5 text-[#d97706]" />}
                    </div>

                    <div
                      className={`max-w-[85%] rounded-2xl p-4 text-xs space-y-2 leading-relaxed ${
                        m.sender === "user"
                          ? "bg-[#0f172a] text-white rounded-tr-none"
                          : "bg-[#f8f9ff] text-[#0b1c30] border border-[#0f172a]/5 rounded-tl-none"
                      }`}
                    >
                      <p>{m.text}</p>

                      {/* Verbatim Citations Card if AI Response */}
                      {m.citations && (
                        <div className="space-y-1.5 pt-1">
                          {m.citations.map((c, i) => (
                            <div
                              key={i}
                              className="p-3 bg-white rounded-xl border border-[#cbd5e1] text-[11px] text-[#45464d] space-y-1"
                            >
                              <div className="flex items-center justify-between text-[#059669] font-bold">
                                <span>Grounded Source: {c.clause}</span>
                                <span className="text-[10px] text-[#64748b]">{c.page}</span>
                              </div>
                              <p className="font-mono text-[10px] text-[#0b1c30] bg-[#f8f9ff] p-2 rounded">
                                &quot;{c.quote}&quot;
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      <span className={`text-[9px] block text-right ${m.sender === "user" ? "text-white/60" : "text-[#94a3b8]"}`}>
                        {m.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Prompt Chips */}
              <div className="p-2.5 px-4 bg-[#f8f9ff] border-t border-[#0f172a]/5 flex items-center gap-2 overflow-x-auto">
                <span className="text-[10px] font-bold text-[#64748b] whitespace-nowrap">Suggested:</span>
                {quickPrompts.map((p, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setInputQuery(p)}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-white hover:bg-[#eff4ff] border border-[#cbd5e1] text-[#0b1c30] whitespace-nowrap transition-colors"
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* Input Bar */}
              <form onSubmit={handleSend} className="p-3 bg-white border-t border-[#0f172a]/5 flex items-center gap-2">
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Ask any question regarding your tenancy rights or agreement clauses..."
                  className="flex-1 h-11 px-4 rounded-xl border border-[#cbd5e1] text-xs text-[#0b1c30] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#d97706]/30 focus:border-[#0f172a]"
                />
                <button
                  type="button"
                  onClick={() => setInputQuery("What happens if I delay rent payment by 10 days?")}
                  className="p-2.5 rounded-xl text-[#64748b] hover:bg-[#f1f5f9]"
                  title="Voice Input Simulation"
                >
                  <Mic className="w-4 h-4" />
                </button>
                <button
                  type="submit"
                  className="h-11 px-4 rounded-xl bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5 text-[#d97706]" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </DashboardShell>
  );
}
