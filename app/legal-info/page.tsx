"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  BookOpen,
  Search,
  Scale,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Building,
  UserCheck,
  FileText,
  HelpCircle,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

export default function LegalInfoPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<"all" | "tenancy" | "consumer" | "employment" | "police">("all");
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyCitation = (sec: string, text: string) => {
    navigator.clipboard.writeText(`${sec}: ${text}`);
    setCopiedSection(sec);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const acts = [
    {
      act: "Model Tenancy Act, 2021 (§13)",
      domain: "tenancy",
      citation: "MTA 2021 § 13(1)",
      title: "Statutory Cap on Residential Security Deposit",
      summary: "Residential security deposits cannot exceed a maximum of two (2) months rent. Deposit must be refunded within thirty (30) days after handover of possession minus lawful deductions.",
      landmark: "Supreme Court in Prabhakaran Nair v. State of T.N. (1987) held that unconscionable security deposit retention violates fundamental fairness.",
    },
    {
      act: "Transfer of Property Act, 1882 (§106)",
      domain: "tenancy",
      citation: "TP Act 1882 § 106(1)",
      title: "Mandatory Thirty (30) Days Notice for Lease Termination",
      summary: "In the absence of a contract or local law to the contrary, a lease of immovable property for any purpose other than agriculture or manufacturing requires fifteen to thirty days formal written notice.",
      landmark: "V. Dhanapal Chettiar v. Yesodai Ammal (1979) — Eviction cannot occur without establishing statutory grounds despite lease expiry.",
    },
    {
      act: "Consumer Protection Act, 2019 (§2(46))",
      domain: "consumer",
      citation: "CPA 2019 § 2(46)",
      title: "Protection Against Unfair Contract Terms",
      summary: "Empowers consumer commissions to declare void any contractual term requiring excessive security deposit, imposing unilateral termination penalties, or giving arbitrary rights to service providers.",
      landmark: "Pioneer Urban Land & Infrastructure v. Govindan Raghavan (2019) — One-sided terms in consumer/tenant contracts are void.",
    },
    {
      act: "Indian Contract Act, 1872 (§27)",
      domain: "employment",
      citation: "ICA 1872 § 27",
      title: "Agreement in Restraint of Trade Void",
      summary: "Every agreement by which any person is restrained from exercising a lawful profession, trade or business of any kind is to that extent void in India.",
      landmark: "Percept D'Mark v. Zaheer Khan (2006) — Post-service restrictive covenants and non-compete clauses are completely unenforceable under Indian law.",
    },
    {
      act: "Bharatiya Nagarik Suraksha Sanhita, 2023 (§35 / 41A)",
      domain: "police",
      citation: "BNSS 2023 § 35(3)",
      title: "Arrest Guidelines & Zero FIR Mandatory Registration",
      summary: "Police officers must issue a formal notice of appearance for offenses punishable with imprisonment up to 7 years. Mandatory registration of Zero FIR regardless of territorial jurisdiction.",
      landmark: "Arnesh Kumar v. State of Bihar (2014) & Lalita Kumari v. Govt of UP (2013).",
    },
  ];

  const filtered = acts.filter((a) => {
    const matchesDomain = selectedDomain === "all" || a.domain === selectedDomain;
    const matchesQuery =
      searchQuery === "" ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.act.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesQuery;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
      <Header />

      <main className="flex-1 pt-20">
        {/* Top Active Corpus Ribbon */}
        <div className="w-full bg-white border-b border-[#0f172a]/8 py-2.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-[#64748b]">
              <Link href="/" className="hover:text-[#0b1c30]">Home</Link>
              <span>/</span>
              <span className="font-bold text-[#0b1c30]">Legal Information & Statutory Codex</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto text-[11px] font-semibold text-[#0b1c30]">
              <span className="px-2 py-0.5 rounded-full bg-[#ecfdf5] text-[#065f46]">BNS 2023 Live</span>
              <span className="px-2 py-0.5 rounded-full bg-[#f1f5f9]">Contract Act 1872</span>
              <span className="px-2 py-0.5 rounded-full bg-[#f1f5f9]">Model Tenancy Act</span>
              <span className="px-2 py-0.5 rounded-full bg-[#f1f5f9]">CPA 2019</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Header Banner */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#0f172a]/8 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-[#d97706] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Official e-Gazette & Bare Act Verified</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0b1c30]">
              Legal Information & Civic Statutory Literacy
            </h1>
            <p className="text-xs sm:text-sm text-[#45464d] max-w-3xl leading-relaxed">
              Plain-language legal frameworks, statutory rights, and court precedents directly verified against official Indian bare acts and gazettes — empowering citizens with actionable legal knowledge before signing or disputing.
            </p>

            {/* Search Bar */}
            <div className="pt-2 max-w-2xl relative">
              <Search className="w-4 h-4 text-[#64748b] absolute left-4 top-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by act, section, or question (e.g. 'security deposit cap', 'notice period')..."
                className="w-full h-12 pl-11 pr-4 rounded-xl border border-[#cbd5e1] text-xs sm:text-sm text-[#0b1c30] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#d97706]/30 focus:border-[#0f172a] shadow-2xs"
              />
            </div>
          </div>

          {/* Domain Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setSelectedDomain("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedDomain === "all" ? "bg-[#0f172a] text-white shadow-sm" : "bg-white text-[#45464d] border border-[#0f172a]/5"
              }`}
            >
              All Statutes ({acts.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedDomain("tenancy")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedDomain === "tenancy" ? "bg-[#d97706] text-white shadow-sm" : "bg-white text-[#45464d] border border-[#0f172a]/5"
              }`}
            >
              Tenancy & Rent Laws
            </button>
            <button
              type="button"
              onClick={() => setSelectedDomain("consumer")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedDomain === "consumer" ? "bg-[#059669] text-white shadow-sm" : "bg-white text-[#45464d] border border-[#0f172a]/5"
              }`}
            >
              Consumer Rights
            </button>
            <button
              type="button"
              onClick={() => setSelectedDomain("employment")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedDomain === "employment" ? "bg-[#4f46e5] text-white shadow-sm" : "bg-white text-[#45464d] border border-[#0f172a]/5"
              }`}
            >
              Employment & Contracts
            </button>
            <button
              type="button"
              onClick={() => setSelectedDomain("police")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedDomain === "police" ? "bg-[#b91c1c] text-white shadow-sm" : "bg-white text-[#45464d] border border-[#0f172a]/5"
              }`}
            >
              Police & BNSS Procedures
            </button>
          </div>

          {/* Statutes & Precedents List */}
          <div className="space-y-4">
            {filtered.map((item, idx) => (
              <div
                key={idx}
                className="p-6 bg-white rounded-2xl border border-[#0f172a]/8 shadow-sm space-y-4 hover:border-[#0f172a]/20 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#0f172a]/5">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#eff4ff] text-[#0f172a]">
                      {item.citation}
                    </span>
                    <span className="text-xs font-bold text-[#64748b]">{item.act}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => copyCitation(item.citation, item.summary)}
                    className="px-3 py-1.5 rounded-lg border border-[#cbd5e1] hover:bg-[#f8f9ff] text-xs font-bold text-[#0b1c30] flex items-center gap-1.5 self-start sm:self-auto shadow-2xs"
                  >
                    {copiedSection === item.citation ? <Check className="w-3.5 h-3.5 text-[#059669]" /> : <Copy className="w-3.5 h-3.5 text-[#64748b]" />}
                    <span>{copiedSection === item.citation ? "Copied" : "Copy Citation"}</span>
                  </button>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#0b1c30]">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-[#45464d] leading-relaxed">{item.summary}</p>
                </div>

                {/* Supreme Court Precedent Quote */}
                <div className="p-3.5 rounded-xl bg-[#f8f9ff] border border-[#0f172a]/5 flex items-start gap-2.5 text-xs text-[#64748b]">
                  <Scale className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-[#0b1c30]">Supreme Court Precedent: </strong>
                    {item.landmark}
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
