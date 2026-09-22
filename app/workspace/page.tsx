"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import WorkspaceSubNav from "@/components/WorkspaceSubNav";
import Footer from "@/components/Footer";
import {
  FileText,
  Download,
  PlusCircle,
  GitBranch,
  CheckCircle2,
  Gavel,
  SlidersHorizontal,
  ChevronRight,
  ChevronLeft,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Landmark,
  Pin,
  ExternalLink,
  BookOpen,
  Flag,
  Brain,
  GitCompare,
  ListTodo,
  Copy,
  Check,
  MessageSquare,
  Sparkles,
  AlertTriangle,
  Lock,
  Globe,
  User,
  ShieldCheck,
  Calendar,
  Hourglass,
  Scale,
  X,
  FileWarning,
  Layers,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function WorkspacePage() {
  // Navigation & Interactive States
  const [activeTab, setActiveTab] = useState<
    "understand" | "risks" | "qa" | "compare" | "deadlines"
  >("understand");
  const [currentPage, setCurrentPage] = useState(3);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [inRenegotiationList, setInRenegotiationList] = useState(false);
  const [showPipelineAudit, setShowPipelineAudit] = useState(false);
  const [showOcrModal, setShowOcrModal] = useState(false);
  const [showScheduleBUpload, setShowScheduleBUpload] = useState(false);
  const [showAskAiDrawer, setShowAskAiDrawer] = useState(false);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiChatHistory, setAiChatHistory] = useState([
    {
      sender: "ai",
      text: "Namaste. I am your Grounded Legal Assistant. Every response is strictly anchored to the OCR-verified text of your Residential Tenancy Agreement and Karnataka statutory benchmarks. How may I clarify Clause 9.3?",
    },
  ]);

  // Live 60-Minute Purge Timer countdown
  const [secondsRemaining, setSecondsRemaining] = useState(54 * 60 + 12);

  // Dynamic user configuration from onboarding
  const [userConfig, setUserConfig] = useState<{
    language?: string;
    jurisdiction?: string;
    domain?: string;
    objective?: string;
    privacy?: string;
  }>({
    language: "en",
    jurisdiction: "karnataka",
    domain: "rental",
    objective: "understand",
    privacy: "ephemeral",
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("nyayasetu_user_config");
      if (stored) {
        const parsed = JSON.parse(stored);
        setUserConfig(parsed);
        if (parsed.objective === "risks") {
          setActiveTab("risks");
        } else if (parsed.objective === "compare") {
          setActiveTab("compare");
        }
      }
    } catch {
      // Ignore
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}m ${s < 10 ? "0" : ""}${s}s`;
  };

  const jurisdictionLabel =
    userConfig.jurisdiction === "delhi"
      ? "Delhi (DDA & DRC Act)"
      : userConfig.jurisdiction === "maharashtra"
      ? "Maharashtra (MRC Act 1999)"
      : userConfig.jurisdiction === "tamilnadu"
      ? "Tamil Nadu (TNRRRL Act 2017)"
      : userConfig.jurisdiction === "telangana"
      ? "Telangana (Hyd Urban Baseline)"
      : userConfig.jurisdiction === "national"
      ? "National (Model Tenancy Act 2021)"
      : "Karnataka (Bengaluru Urban)";

  const statutoryActName =
    userConfig.jurisdiction === "delhi"
      ? "Delhi Rent Act 1958"
      : userConfig.jurisdiction === "maharashtra"
      ? "MH Rent Control 1999"
      : userConfig.jurisdiction === "tamilnadu"
      ? "TNRRRL Act 2017"
      : userConfig.jurisdiction === "telangana"
      ? "Telangana Buildings Act"
      : userConfig.jurisdiction === "national"
      ? "Model Tenancy Act 2021"
      : "KA Rent Act 1999";

  const languageLabel =
    userConfig.language === "hi"
      ? "EN & Hindi Stamp"
      : userConfig.language === "kn"
      ? "EN & Kannada Stamp"
      : userConfig.language === "ta"
      ? "EN & Tamil Stamp"
      : userConfig.language === "te"
      ? "EN & Telugu Stamp"
      : userConfig.language === "mr"
      ? "EN & Marathi Stamp"
      : "EN & Kannada Stamp";

  const counterProposalText =
    "“Escalation shall not exceed 6% upon mutual written renewal after 11 months. Security deposit of INR 2,50,000 shall be refunded within 14 banking days of vacant possession, subject only to deductions for actual verified structural damage excluding reasonable wear and tear.”";

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(
      "Escalation shall not exceed 6% upon mutual written renewal after 11 months. Security deposit of INR 2,50,000 shall be refunded within 14 banking days of vacant possession, subject only to deductions for actual verified structural damage excluding reasonable wear and tear."
    );
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 3000);
  };

  const handleSendAiMessage = () => {
    if (!aiQuestion.trim()) return;
    const userMsg = aiQuestion.trim();
    setAiChatHistory((prev) => [...prev, { sender: "user", text: userMsg }]);
    setAiQuestion("");

    setTimeout(() => {
      setAiChatHistory((prev) => [
        ...prev,
        {
          sender: "ai",
          text: `Regarding Clause 9.3 in Section 3 (Lines 14-23): Under Karnataka tenancy norms and Section 13 of the Model Tenancy Act, unilateral 15% escalation clauses are legally disputable if contested before a Rent Tribunal. Furthermore, withholding deposits for ordinary wear & tear contradicts Supreme Court precedent in 'P.C. Cheriyan v. M.T. George' (1975). We recommend using the provided counter-proposal.`,
        },
      ]);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] font-sans text-[#0b1c30] flex flex-col antialiased">
      {/* ─────────────────────────────────────────────────────────────
          1. SHARED TOP HEADER & WORKSPACE SUB-NAV
          ───────────────────────────────────────────────────────────── */}
      <Header />

      {/* ─────────────────────────────────────────────────────────────
          MAIN APP CONTENT (offset by fixed header)
          ───────────────────────────────────────────────────────────── */}
      <main className="w-full pt-16 flex-1 flex flex-col">
        <WorkspaceSubNav activeTab={activeTab} />

        {/* TOP CONTEXT SECTION */}
        <section className="w-full px-4 sm:px-6 lg:px-8 pt-6 pb-4 bg-[#f8f9ff]">
          <div className="max-w-7xl mx-auto flex flex-col gap-4">
            {/* Header & Action Row */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex flex-col gap-1 min-w-0">
                {/* Page Title & Badges */}
                <div className="flex flex-wrap items-center gap-2.5 mt-1">
                  <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#0b1c30] tracking-tight">
                    Document Evidence Studio
                  </h1>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#eff4ff] text-[#0b1c30] text-xs font-semibold shadow-xs border border-[#0f172a]/5">
                    <span className="w-2 h-2 rounded-full bg-[#d97706] animate-pulse"></span>
                    <span>Active OCR Grounding Linked</span>
                  </div>
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#45464d] text-[11px] font-semibold">
                    <ShieldCheck className="w-3 h-3 text-[#d97706]" />
                    <span>100% Verifiable Source Spans</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#45464d] max-w-3xl leading-relaxed">
                  Grounded evidence extraction, clause-level risk scrutiny, and plain-language
                  civic translation mapped directly against statutory tenancy frameworks.
                </p>
              </div>

              {/* High-Level Command Buttons */}
              <div className="flex items-center gap-2.5 self-start lg:self-center shrink-0">
                <button
                  type="button"
                  onClick={() => setShowScheduleBUpload(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#e5eeff] hover:bg-[#dce9ff] text-[#0b1c30] text-xs font-semibold transition-all shadow-xs"
                >
                  <PlusCircle className="w-4 h-4 text-[#d97706]" />
                  <span>Add Addendum / New Doc</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert("Legal Dossier PDF/JSON generation complete. Download will begin.");
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0b1c30] hover:bg-[#1f2937] text-white text-xs font-semibold transition-all shadow-sm"
                >
                  <Download className="w-4 h-4 text-[#d97706]" />
                  <span>Export Legal Dossier (PDF/JSON)</span>
                </button>
              </div>
            </div>

            {/* Real-Time Pipeline Inspection Stepper */}
            <div className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-[#0f172a]/5 shadow-xs">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-9 h-9 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#d97706]">
                    <GitBranch className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm text-[#0b1c30] font-bold block">
                      Civic Verification Pipeline
                    </span>
                    <span className="text-[11px] text-[#45464d]">
                      5 of 5 ingestion stages validated
                    </span>
                  </div>
                </div>

                {/* Pipeline Steps Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 flex-1 max-w-4xl">
                  {/* Step 1 */}
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#eff4ff]">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-[#0b1c30] font-bold truncate leading-tight">
                        1. Ingest
                      </p>
                      <p className="text-[11px] text-[#45464d] truncate">PDF • 1.8 MB</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#eff4ff]">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-[#0b1c30] font-bold truncate leading-tight">
                        2. OCR &amp; Vision
                      </p>
                      <p className="text-[11px] text-[#45464d] truncate">99.4% Dual Engine</p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#eff4ff]">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-[#0b1c30] font-bold truncate leading-tight">
                        3. Language
                      </p>
                      <p className="text-[11px] text-[#45464d] truncate">{languageLabel}</p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#eff4ff]">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-[#0b1c30] font-bold truncate leading-tight">
                        4. Segmentation
                      </p>
                      <p className="text-[11px] text-[#45464d] truncate">24 Clauses Bound</p>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#fff7ed] border border-[#ffedd5]">
                    <Gavel className="w-4 h-4 text-[#d97706] shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-[#d97706] font-bold truncate leading-tight">
                        5. Statutory Match
                      </p>
                      <p className="text-[11px] text-[#b45309] truncate">{statutoryActName}</p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowPipelineAudit(true)}
                  className="text-[#45464d] hover:text-[#0b1c30] text-xs font-semibold shrink-0 flex items-center gap-1.5 self-end lg:self-center transition-colors"
                >
                  <span>Pipeline Audit</span>
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Document Metadata Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              <div className="p-3.5 rounded-xl bg-white border border-[#0f172a]/5 shadow-xs flex flex-col">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#64748b]">
                  Document Type
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#0b1c30] truncate mt-0.5">
                  11-Month Tenancy Deed
                </span>
                <span className="text-[11px] text-[#64748b] truncate">
                  {jurisdictionLabel} standard
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#0f172a]/5 shadow-xs flex flex-col">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#64748b]">
                  Stamp Duty (KSA 1957)
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#0b1c30] truncate mt-0.5">
                  ₹500 e-Stamp Stamp
                </span>
                <span className="text-[11px] text-[#d97706] font-medium truncate">
                  Cert: IN-KA-BLR-70912
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#0f172a]/5 shadow-xs flex flex-col">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#64748b]">
                  Coverage &amp; Clauses
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#0b1c30] truncate mt-0.5">
                  7 Pages • 24 Clauses
                </span>
                <span className="text-[11px] text-[#64748b] truncate">
                  7 Defined Term Bindings
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#0f172a]/5 shadow-xs flex flex-col">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#64748b]">
                  Risk Profile
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a] animate-ping"></span>
                  <span className="text-xs sm:text-sm font-bold text-[#ba1a1a]">
                    3 Critical Flags
                  </span>
                </div>
                <span className="text-[11px] text-[#64748b] truncate">Requires renegotiation</span>
              </div>

              <div className="col-span-2 md:col-span-4 lg:col-span-1 p-3.5 rounded-xl bg-[#eff4ff] border border-[#0f172a]/5 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-[#d97706] tracking-wider">
                    RAM Enclave
                  </span>
                  <Lock className="w-3.5 h-3.5 text-[#d97706]" />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-[#0b1c30] font-mono">Auto-purge in:</span>
                  <span className="text-sm font-mono font-bold text-[#d97706]">
                    {formatTimer(secondsRemaining)}
                  </span>
                </div>
              </div>
            </div>

            {/* Segmented Interactive Mode Selector */}
            <div className="w-full bg-[#eff4ff] p-1.5 rounded-2xl flex flex-wrap items-center gap-1.5 border border-[#0f172a]/5 shadow-inner">
              <button
                type="button"
                onClick={() => setActiveTab("understand")}
                className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === "understand"
                    ? "bg-white text-[#0b1c30] shadow-sm ring-1 ring-[#0f172a]/5"
                    : "text-[#45464d] hover:text-[#0b1c30] hover:bg-white/50"
                }`}
              >
                <BookOpen className="w-4 h-4 text-[#d97706]" />
                <span>Understand</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("risks")}
                className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === "risks"
                    ? "bg-white text-[#ba1a1a] shadow-sm ring-1 ring-[#0f172a]/5"
                    : "text-[#45464d] hover:text-[#0b1c30] hover:bg-white/50"
                }`}
              >
                <Flag className="w-4 h-4 text-[#ba1a1a]" />
                <span>Check Risks</span>
                <span className="px-1.5 py-0.2 bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold rounded-full">
                  3
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("qa");
                  setShowAskAiDrawer(true);
                }}
                className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === "qa"
                    ? "bg-white text-[#0b1c30] shadow-sm ring-1 ring-[#0f172a]/5"
                    : "text-[#45464d] hover:text-[#0b1c30] hover:bg-white/50"
                }`}
              >
                <Brain className="w-4 h-4 text-[#d97706]" />
                <span>Grounded Q&amp;A</span>
                <span className="px-1.5 py-0.2 bg-[#e5eeff] text-[#0b1c30] text-[10px] font-bold rounded-full">
                  AI
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("compare")}
                className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === "compare"
                    ? "bg-white text-[#0b1c30] shadow-sm ring-1 ring-[#0f172a]/5"
                    : "text-[#45464d] hover:text-[#0b1c30] hover:bg-white/50"
                }`}
              >
                <GitCompare className="w-4 h-4 text-[#45464d]" />
                <span>Compare Versions</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("deadlines")}
                className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === "deadlines"
                    ? "bg-white text-[#059669] shadow-sm ring-1 ring-[#0f172a]/5"
                    : "text-[#45464d] hover:text-[#0b1c30] hover:bg-white/50"
                }`}
              >
                <ListTodo className="w-4 h-4 text-[#059669]" />
                <span>Action &amp; Deadlines</span>
                <span className="px-1.5 py-0.2 bg-[#ffdcc3] text-[#904d00] text-[10px] font-bold rounded-full">
                  5
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SPLIT PANE DOCUMENT WORKSPACE HERO AREA
            ───────────────────────────────────────────────────────────── */}
        <section className="w-full px-4 sm:px-6 lg:px-8 pb-10 bg-[#f8f9ff] flex-1">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* ──────────────────────────────────────────
                LEFT PANE: DOCUMENT VIEWER & SOURCE SPANS (6 COLS)
                ────────────────────────────────────────── */}
            <div className="lg:col-span-6 flex flex-col gap-3">
              {/* Viewer Control Bar */}
              <div className="w-full bg-white px-4 py-2.5 rounded-xl border border-[#0f172a]/5 shadow-xs flex items-center justify-between">
                {/* Page Navigator */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-7 h-7 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] flex items-center justify-center text-[#0b1c30] transition-colors disabled:opacity-40"
                    title="Previous Page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-[#0b1c30] px-1">
                    Page {currentPage} of 7
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.min(7, p + 1))}
                    disabled={currentPage === 7}
                    className="w-7 h-7 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] flex items-center justify-center text-[#0b1c30] transition-colors disabled:opacity-40"
                    title="Next Page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Magnification Controls */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.max(75, z - 10))}
                    className="p-1 rounded-lg hover:bg-[#eff4ff] text-[#45464d] hover:text-[#0b1c30]"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono text-[#45464d] px-1">{zoomLevel}%</span>
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.min(150, z + 10))}
                    className="p-1 rounded-lg hover:bg-[#eff4ff] text-[#45464d] hover:text-[#0b1c30]"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <div className="h-4 w-[1px] bg-slate-200 mx-1"></div>
                  <button
                    type="button"
                    onClick={() => setZoomLevel(100)}
                    className="px-2 py-1 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0b1c30] text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Fit Width</span>
                  </button>
                </div>

                {/* Grounding Badge */}
                <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#eff4ff] text-[#45464d] text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d97706]"></span>
                  <span>OCR: 99.4%</span>
                </div>
              </div>

              {/* Rendered Legal Contract Document Page Sheet */}
              <div className="relative w-full bg-white rounded-2xl border border-[#0f172a]/10 shadow-md p-6 sm:p-8 flex flex-col gap-6 select-text">
                {/* Simulated Karnataka e-Stamp Header */}
                <div className="w-full bg-[#eff4ff] rounded-xl p-3.5 flex flex-col gap-2 relative overflow-hidden border border-[#0f172a]/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Landmark className="w-6 h-6 text-[#d97706] shrink-0" />
                      <div>
                        <p className="text-xs uppercase font-extrabold text-[#0b1c30] tracking-wider">
                          Government of Karnataka • e-Stamp Certificate
                        </p>
                        <p className="text-[10px] text-[#45464d] font-mono">
                          Certificate No: IN-KA89301298410292W • Date: 12-FEB-2024
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded bg-white font-mono text-[11px] font-bold text-[#d97706] shadow-xs border border-amber-200">
                      ₹500 NON-JUDICIAL
                    </span>
                  </div>
                </div>

                {/* Contract Body Document Text */}
                <div className="relative flex flex-col gap-5 pt-1">
                  {/* Document Title Header */}
                  <div className="text-center pb-2 border-b border-slate-100">
                    <h2 className="font-editorial text-xl sm:text-2xl text-[#0b1c30] uppercase tracking-wide font-bold">
                      Residential Tenancy Agreement
                    </h2>
                    <p className="text-xs text-[#45464d] italic mt-0.5">
                      Between Lessor: Sri K. Raghavan &amp; Lessee: Smt. Ananya Sen
                    </p>
                  </div>

                  {/* Standard Clause 8 */}
                  <div className="flex flex-col gap-1.5 text-[#45464d]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0b1c30] uppercase tracking-wide">
                        Clause 8 • Maintenance &amp; Electricity Charges
                      </span>
                      <span className="text-[11px] text-[#76777d] font-mono">[P3: L1-L13]</span>
                    </div>
                    <p className="font-editorial text-xs sm:text-[13px] leading-relaxed text-[#0b1c30]/90">
                      8.1 The Tenant shall regularly discharge recurring monthly consumption charges
                      for electricity and BESCOM services directly to the designated power provider
                      in accordance with meter serial number 481-B29. Monthly society maintenance of
                      ₹4,500 shall be remitted concurrently with the monthly lease consideration on
                      or before the fifth calendar day of each operating billing cycle.
                    </p>
                  </div>

                  {/* ACTIVE HIGHLIGHTED SOURCE SPAN: Clause 9.3 */}
                  <div
                    id="clause-source-9-3"
                    className="relative p-4 sm:p-5 rounded-xl bg-[#fffbeb] ring-2 ring-[#d97706] shadow-sm transition-all"
                  >
                    {/* Source Pin Badge */}
                    <div className="absolute -top-3 left-4 px-2.5 py-0.5 rounded-full bg-[#d97706] text-white text-[10px] uppercase font-bold tracking-wider shadow-xs flex items-center gap-1">
                      <Pin className="w-3 h-3" />
                      <span>Active Anchor • Page 3, Lines 14-23</span>
                    </div>

                    <div className="flex items-center justify-between mt-1 mb-2">
                      <span className="text-xs font-bold text-[#0b1c30] uppercase tracking-wide">
                        Clause 9.3 • Rent Escalation &amp; Deposit Forfeiture
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold">
                        HIGH ASYMMETRY
                      </span>
                    </div>

                    {/* Verbatim High Precision Quote */}
                    <p className="font-editorial text-xs sm:text-[13.5px] leading-relaxed font-medium text-[#0b1c30]">
                      “9.3 Unreasonable Escalation &amp; Security Deposit Forfeiture: The lessor reserves
                      the unrestricted discretion to increase rent by fifteen percent (15%) upon
                      expiration of eleven months without any obligation to negotiate, and withhold
                      full security deposit (₹2,50,000) for ordinary wear and tear, cosmetic
                      repainting, or any tenant vacating notice delivered under sixty (60) days.”
                    </p>

                    <div className="mt-3 pt-2 border-t border-amber-200/50 flex flex-wrap items-center justify-between text-[#45464d] text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-[#d97706]" />
                        <span>Confidence: 99.8% • Bounding Box [x:42, y:318, w:512, h:74]</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowOcrModal(true)}
                        className="text-[#d97706] font-semibold hover:underline flex items-center gap-1 mt-1 sm:mt-0"
                      >
                        <span>Inspect OCR Layer</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Clause 10 */}
                  <div className="flex flex-col gap-1.5 text-[#45464d] opacity-75">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0b1c30] uppercase tracking-wide">
                        Clause 10 • Right of Entry &amp; Quiet Enjoyment
                      </span>
                      <span className="text-[11px] text-[#76777d] font-mono">[P3: L24-L35]</span>
                    </div>
                    <p className="font-editorial text-xs sm:text-[13px] leading-relaxed text-[#0b1c30]/90">
                      10.1 The Lessor or their authorized proxy representative shall reserve
                      unrestricted ingress and inspection privileges over the demised premises upon
                      delivering a verbal or written notification of minimum twenty-four (24)
                      statutory hours during daylight working intervals.
                    </p>
                  </div>

                  {/* Document Footer Verification Details */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[#64748b] text-xs">
                    <span className="italic">Lessee Initials: [A.S.]</span>
                    <span className="font-mono">Page 3 of 7 — BLR/RES/2024/709</span>
                    <span className="italic">Lessor Initials: [K.R.]</span>
                  </div>
                </div>

                {/* Floating Source Navigator on Left Edge (Desktop) */}
                <div className="hidden xl:flex flex-col gap-1 absolute -left-12 top-20 bg-white p-1 rounded-xl shadow-md border border-[#0f172a]/5">
                  {[1, 2, 3, 4, 5].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setCurrentPage(p)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                        currentPage === p
                          ? "bg-[#0b1c30] text-white ring-2 ring-[#d97706]"
                          : "bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0b1c30]"
                      }`}
                      title={`Jump to Page ${p}`}
                    >
                      P{p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ──────────────────────────────────────────
                RIGHT PANE: GROUNDED LEGAL INTELLIGENCE (6 COLS)
                ────────────────────────────────────────── */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              {/* SECTION A: Document Intelligence & Risk Summary Card */}
              <div className="w-full bg-white rounded-2xl p-5 sm:p-6 border border-[#0f172a]/5 shadow-xs flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-[#d97706] text-white text-[10px] font-bold uppercase tracking-wider">
                        Analysis Matrix
                      </span>
                      <span className="text-xs text-[#45464d] font-mono">
                        {jurisdictionLabel} Baseline
                      </span>
                    </div>
                    <h3 className="font-editorial text-lg sm:text-xl font-bold text-[#0b1c30] mt-1">
                      {activeTab === "risks"
                        ? "Executive Risk Scrutiny & Vulnerability Index"
                        : activeTab === "qa"
                        ? "Grounded Evidence Q&A Assistant"
                        : activeTab === "compare"
                        ? "Dual-Corpus Redline & Version Variance"
                        : activeTab === "deadlines"
                        ? "Statutory Deadlines & Asymmetry Obligations"
                        : "Executive Risk & Evidence Scrutiny"}
                    </h3>
                  </div>

                  {/* Risk Gauge Pill */}
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase font-bold text-[#64748b]">
                      Severity Rating
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-xl font-bold text-[#ba1a1a]">7.4</span>
                      <span className="text-xs text-[#64748b]">/ 10</span>
                      <span className="px-2 py-0.5 rounded bg-[#ffdad6] text-[#ba1a1a] text-[11px] font-bold ml-1">
                        Moderate-High
                      </span>
                    </div>
                  </div>
                </div>

                {/* Risk Indicators Grid */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-xl bg-[#eff4ff] flex flex-col">
                    <span className="text-[11px] text-[#45464d]">Financial Risk</span>
                    <span className="text-xs sm:text-sm text-[#ba1a1a] font-bold mt-0.5">
                      High (8.2)
                    </span>
                    <span className="text-[10px] text-[#64748b] mt-0.5 truncate">
                      15% surge &amp; wear retention
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#eff4ff] flex flex-col">
                    <span className="text-[11px] text-[#45464d]">Termination</span>
                    <span className="text-xs sm:text-sm text-[#d97706] font-bold mt-0.5">
                      Asymmetric
                    </span>
                    <span className="text-[10px] text-[#64748b] mt-0.5 truncate">
                      60d tenant vs 15d lessor
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#eff4ff] flex flex-col">
                    <span className="text-[11px] text-[#45464d]">Stamp Status</span>
                    <span className="text-xs sm:text-sm text-[#059669] font-bold mt-0.5">
                      Verified
                    </span>
                    <span className="text-[10px] text-[#64748b] mt-0.5 truncate">
                      KSA 1957 ₹500 validated
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#0b1c30] leading-relaxed">
                  <strong>Key Summary:</strong> The agreement enforces unilateral rent increases
                  exceeding {jurisdictionLabel} municipal benchmarks (typical 5-8%). It introduces a punitive
                  security deposit forfeiture term contrary to statutory tenant protection precedents.
                </p>
              </div>

              {/* SECTION B: Active Clause Deep Dive (Clause 9.3) */}
              <div className="w-full bg-white rounded-2xl border border-[#0f172a]/5 shadow-md p-5 sm:p-6 flex flex-col gap-4">
                {/* Clause Header & Pin Action */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#0b1c30] font-bold text-sm">
                      §
                    </span>
                    <div>
                      <h4 className="font-editorial text-base sm:text-lg font-bold text-[#0b1c30]">
                        Clause 9.3 Deep-Dive
                      </h4>
                      <p className="text-xs text-[#45464d]">
                        Rent Escalation &amp; Deposit Recovery Mechanics
                      </p>
                    </div>
                  </div>

                  <a
                    href="#clause-source-9-3"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0b1c30] text-xs font-semibold transition-colors shadow-xs"
                  >
                    <Pin className="w-3.5 h-3.5 text-[#d97706]" />
                    <span>Jump to P3, L14</span>
                  </a>
                </div>

                {/* Verbatim Quote Box */}
                <div className="p-3.5 rounded-xl bg-[#eff4ff] flex flex-col gap-1">
                  <span className="text-[10px] uppercase font-bold text-[#64748b] tracking-wider">
                    Verbatim Source Extract
                  </span>
                  <blockquote className="font-editorial text-xs sm:text-[13px] italic text-[#0b1c30] leading-relaxed">
                    “The lessor reserves the unrestricted discretion to increase rent by fifteen
                    percent (15%) upon expiration of eleven months without any obligation to
                    negotiate, and withhold full security deposit (₹2,50,000) for ordinary wear and
                    tear...”
                  </blockquote>
                </div>

                {/* Plain-Language Civic Translation */}
                <div className="p-3.5 rounded-xl bg-[#fffbeb] border border-amber-200/50 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#d97706]" />
                    <span className="text-xs sm:text-sm font-bold text-[#0b1c30]">
                      In Plain Citizen Terms:
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#0b1c30] leading-relaxed">
                    The owner is granting themselves permission to automatically raise your monthly
                    rent by <strong>15% every 11 months</strong> without your consent.
                    Furthermore, they can legally refuse to return your entire{" "}
                    <strong>₹2,50,000 security deposit</strong> for minor paint marks, daylight
                    fading, or normal apartment usage.
                  </p>
                </div>

                {/* Statutory Framework Conflict Alert Box */}
                <div className="p-3.5 rounded-xl bg-[#ffdad6] text-[#ba1a1a] flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Gavel className="w-4 h-4 text-[#ba1a1a]" />
                    <span className="text-xs sm:text-sm font-bold">
                      Statutory Framework Conflict
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#93000a]">
                    <strong>Model Tenancy Framework &amp; Urban Precedents:</strong> Rental
                    escalation in urban residential corridors is typically standard at{" "}
                    <strong>5% to 8%</strong> per annum. Under settled tenancy jurisprudence,
                    security deposits cannot be forfeited for{" "}
                    <em>“reasonable wear and tear caused by ordinary human habitation”</em>.
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-semibold text-[#93000a]">
                    <span className="underline cursor-pointer hover:text-black">
                      View Section 13, Model Tenancy Act
                    </span>
                    <span>•</span>
                    <span className="underline cursor-pointer hover:text-black">
                      Karnataka High Court Precedent: ILR 2018 KAR 401
                    </span>
                  </div>
                </div>

                {/* Suggested Counter-Proposal Draft (Copy Ready) */}
                <div className="p-4 rounded-xl bg-white border border-[#0f172a]/10 shadow-xs flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-extrabold tracking-wider text-[#d97706]">
                      Suggested Counter-Proposal (Copy for Landlord)
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyDraft}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#0b1c30] hover:text-[#d97706] transition-colors"
                    >
                      {copiedDraft ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#d97706]" />
                          <span>Copy Draft</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-3 rounded-lg bg-[#eff4ff] font-mono text-xs leading-relaxed text-[#0b1c30] select-all border border-[#0f172a]/5">
                    {counterProposalText}
                  </div>
                </div>

                {/* Clause Action Triggers */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setAiQuestion(
                        "How can I convince my landlord to replace Clause 9.3 with the statutory 6% cap and wear & tear protection?"
                      );
                      setShowAskAiDrawer(true);
                    }}
                    className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0b1c30] text-white hover:bg-[#1f2937] text-xs sm:text-sm font-bold transition-all shadow-xs"
                  >
                    <MessageSquare className="w-4 h-4 text-[#d97706]" />
                    <span>Ask AI on Clause 9.3</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInRenegotiationList(!inRenegotiationList)}
                    className={`flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
                      inRenegotiationList
                        ? "bg-[#ecfdf5] text-[#065f46] border border-[#a7f3d0]"
                        : "bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0b1c30]"
                    }`}
                  >
                    {inRenegotiationList ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Added to Renegotiation (Item #1)</span>
                      </>
                    ) : (
                      <>
                        <ListTodo className="w-4 h-4 text-[#d97706]" />
                        <span>Add to Renegotiation List</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* SECTION C: Dynamic Tracker & Mode Inspector */}
              <div className="w-full bg-white rounded-2xl border border-[#0f172a]/5 shadow-xs p-5 sm:p-6 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-editorial text-base sm:text-lg font-bold text-[#0b1c30]">
                    {activeTab === "compare"
                      ? "Dual-Corpus Variance & Alignment Scrutiny"
                      : activeTab === "deadlines"
                      ? "Critical Deadlines & Enforceability Tracker"
                      : "Critical Deadlines & Obligations Tracker"}
                  </h4>
                  {activeTab === "compare" && (
                    <Link
                      href="/compare"
                      className="text-xs font-bold text-[#d97706] hover:underline flex items-center gap-1"
                    >
                      <span>Full Redline Engine</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                  {activeTab === "deadlines" && (
                    <Link
                      href="/actions"
                      className="text-xs font-bold text-[#059669] hover:underline flex items-center gap-1"
                    >
                      <span>Action Center Docket</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>

                {activeTab === "compare" ? (
                  <div className="flex flex-col gap-2.5 mt-1">
                    <div className="p-3.5 rounded-xl bg-[#fef2f2] border border-[#fecaca] flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#991b1b]">Original Clause 9.3</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#fee2e2] text-[#991b1b] font-bold">Unilateral 15% Spike</span>
                      </div>
                      <p className="text-xs font-mono text-[#7f1d1d]">
                        “Lessor reserves unrestricted discretion to increase rent by 15% upon 11 months...”
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#065f46]">Proposed Counter-Draft</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#d1fae5] text-[#065f46] font-bold">Statutory 6% Cap</span>
                      </div>
                      <p className="text-xs font-mono text-[#064e3b]">
                        “Escalation shall not exceed 6% upon mutual written renewal after 11 months...”
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2.5 mt-1">
                    {/* Asymmetric Notice Item */}
                    <div className="p-3 rounded-xl bg-[#eff4ff] flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0">
                          <Hourglass className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#0b1c30]">Vacating Notice Asymmetry</p>
                          <p className="text-[11px] text-[#45464d]">
                            Tenant must serve 60 Days • Landlord only required 15 Days
                          </p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold shrink-0">
                        4x Imbalance
                      </span>
                    </div>

                    {/* Rent Due Date Item */}
                    <div className="p-3 rounded-xl bg-[#eff4ff] flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#e5eeff] text-[#0b1c30] flex items-center justify-center shrink-0">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#0b1c30]">
                            Monthly Consideration Date
                          </p>
                          <p className="text-[11px] text-[#45464d]">
                            Payable by 5th of each month (Grace period: 3 calendar days)
                          </p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-[#e5eeff] text-[#0b1c30] text-[10px] font-bold shrink-0">
                        Regular
                      </span>
                    </div>

                    {/* Deposit Refund Item */}
                    <div className="p-3 rounded-xl bg-[#eff4ff] flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 text-[#d97706] flex items-center justify-center shrink-0">
                          <Scale className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#0b1c30]">Deposit Refund Deadline</p>
                          <p className="text-[11px] text-[#45464d]">
                            Undefined in executed text • Model Act mandates refund within 30 days
                          </p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-[#ffdcc3] text-[#904d00] text-[10px] font-bold shrink-0">
                        Silent Clause
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            EVIDENCE INTEGRITY SAFEGUARD & INCOMPLETE EVIDENCE FLAG BAR
            ───────────────────────────────────────────────────────────── */}
        <section className="w-full px-4 sm:px-6 lg:px-8 pb-6 bg-[#f8f9ff]">
          <div className="max-w-7xl mx-auto flex flex-col gap-3">
            {/* Incomplete Evidence Safeguard Banner */}
            <div className="w-full rounded-2xl bg-[#eff4ff] border border-[#d97706]/30 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#d97706] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <FileWarning className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wide text-[#d97706]">
                      Insufficient Evidence Detected
                    </span>
                    <span className="px-2 py-0.2 rounded-full bg-[#ffdcc3] text-[#904d00] text-[10px] font-bold">
                      Clause 14 Reference
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#0b1c30] mt-0.5">
                    Clause 14 explicitly references{" "}
                    <strong>“Schedule B — Inventory of Fixtures &amp; Electrical Appliances”</strong>,
                    but Schedule B was not appended to the scanned PDF upload.
                  </p>
                  <p className="text-[11px] text-[#45464d] mt-0.5">
                    <strong>Recommendation:</strong> Do not sign or execute until the physical
                    condition list of geysers, fans, and woodwork is countersigned.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
                <button
                  type="button"
                  onClick={() => setShowScheduleBUpload(true)}
                  className="px-4 py-2 rounded-xl bg-white text-[#0b1c30] hover:bg-[#e5eeff] text-xs font-bold transition-colors shadow-xs border border-[#0f172a]/10"
                >
                  Upload Schedule B
                </button>
              </div>
            </div>

            {/* Zero-Hallucination Evidence Bottom Dock */}
            <div className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-[#0f172a]/5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-[#0b1c30] text-xs sm:text-sm font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#d97706]" />
                  <span>Zero-Hallucination Evidence Grounding Active</span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-[#45464d] text-xs">
                  <span>•</span>
                  <span>All 24 clauses mapped verbatim to OCR bounding coordinates</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-[#64748b]">
                  BCI Circular 04/2023 Verified
                </span>
                <button
                  type="button"
                  onClick={() => alert("Audit Citations report ready for inspection.")}
                  className="px-3 py-1 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0b1c30] text-xs font-semibold transition-colors"
                >
                  Audit Citations
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ─────────────────────────────────────────────────────────────
          FOOTER
          ───────────────────────────────────────────────────────────── */}
      <Footer />

      {/* ─────────────────────────────────────────────────────────────
          MODAL 1: PIPELINE AUDIT DETAILS
          ───────────────────────────────────────────────────────────── */}
      {showPipelineAudit && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-[#0f172a]/10 flex flex-col gap-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-[#d97706]" />
                <h3 className="font-editorial text-lg font-bold text-[#0b1c30]">
                  Civic Verification Pipeline Audit Log
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPipelineAudit(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-[#64748b]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto text-xs">
              <div className="p-3 bg-[#eff4ff] rounded-xl flex items-start justify-between">
                <div>
                  <p className="font-bold text-[#0b1c30]">Stage 1: Document Ingestion</p>
                  <p className="text-[#45464d] text-[11px]">
                    SHA-256 Checksum: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                  </p>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">
                  PASS
                </span>
              </div>

              <div className="p-3 bg-[#eff4ff] rounded-xl flex items-start justify-between">
                <div>
                  <p className="font-bold text-[#0b1c30]">Stage 2: Vision &amp; OCR Engine</p>
                  <p className="text-[#45464d] text-[11px]">
                    Tesseract-Indic + Vision Transformer: 99.4% confidence score across 7 pages.
                  </p>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">
                  PASS
                </span>
              </div>

              <div className="p-3 bg-[#eff4ff] rounded-xl flex items-start justify-between">
                <div>
                  <p className="font-bold text-[#0b1c30]">Stage 3: Language &amp; Stamp Alignment</p>
                  <p className="text-[#45464d] text-[11px]">
                    English Deed with Kannada bilingual state government stamp header verified.
                  </p>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">
                  PASS
                </span>
              </div>

              <div className="p-3 bg-[#eff4ff] rounded-xl flex items-start justify-between">
                <div>
                  <p className="font-bold text-[#0b1c30]">Stage 4: Clause Segmentation</p>
                  <p className="text-[#45464d] text-[11px]">
                    24 clauses bound with spatial bounding boxes. Clause 9.3 flagged for high risk.
                  </p>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">
                  PASS
                </span>
              </div>

              <div className="p-3 bg-[#eff4ff] rounded-xl flex items-start justify-between">
                <div>
                  <p className="font-bold text-[#0b1c30]">Stage 5: Statutory Benchmark Matching</p>
                  <p className="text-[#45464d] text-[11px]">
                    Checked against Karnataka Rent Act 1999 &amp; Model Tenancy Act 2021.
                  </p>
                </div>
                <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded">
                  FLAGGED (3 CONFLICTS)
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowPipelineAudit(false)}
                className="px-4 py-2 rounded-xl bg-[#0b1c30] text-white text-xs font-bold hover:bg-[#1f2937]"
              >
                Close Audit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL 2: INSPECT OCR LAYER
          ───────────────────────────────────────────────────────────── */}
      {showOcrModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-[#0f172a]/10 flex flex-col gap-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#d97706]" />
                <h3 className="font-editorial text-lg font-bold text-[#0b1c30]">
                  OCR Bounding Layer Coordinates
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowOcrModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-[#64748b]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-2 text-xs">
              <p className="text-[#45464d]">
                Bounding coordinates verified by NyayaSetu Dual-Engine Vision OCR:
              </p>
              <div className="p-3 bg-[#eff4ff] rounded-xl font-mono text-[11px] text-[#0b1c30] flex flex-col gap-1">
                <div>Page: 3 (Index: 2)</div>
                <div>Clause Target: 9.3</div>
                <div>Bounding Box: [x: 42.18, y: 318.44, w: 512.60, h: 74.20]</div>
                <div>Confidence Score: 99.82%</div>
                <div>Language: English (Latin-Indic charset)</div>
                <div>Token Count: 48 tokens</div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowOcrModal(false)}
                className="px-4 py-2 rounded-xl bg-[#0b1c30] text-white text-xs font-bold hover:bg-[#1f2937]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL 3: UPLOAD SCHEDULE B
          ───────────────────────────────────────────────────────────── */}
      {showScheduleBUpload && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#0f172a]/10 flex flex-col gap-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileWarning className="w-5 h-5 text-[#d97706]" />
                <h3 className="font-editorial text-lg font-bold text-[#0b1c30]">
                  Attach Missing Schedule B
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowScheduleBUpload(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-[#64748b]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#45464d]">
              Upload the Inventory of Fixtures &amp; Fittings referenced in Clause 14 to complete
              the evidence chain and ensure full deposit protection.
            </p>

            <div className="border-2 border-dashed border-[#0f172a]/20 rounded-xl p-6 text-center flex flex-col items-center gap-2 bg-[#eff4ff]">
              <PlusCircle className="w-8 h-8 text-[#d97706]" />
              <p className="text-xs font-bold text-[#0b1c30]">
                Drag &amp; drop Schedule B PDF or photo here
              </p>
              <p className="text-[10px] text-[#64748b]">PDF, JPG, PNG up to 25MB</p>
              <button
                type="button"
                onClick={() => {
                  alert("File selected. Simulating automatic OCR integration.");
                  setShowScheduleBUpload(false);
                }}
                className="mt-2 px-3 py-1.5 rounded-lg bg-[#d97706] text-white text-xs font-bold hover:bg-[#b45309]"
              >
                Browse Local Files
              </button>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowScheduleBUpload(false)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#45464d] hover:text-[#0b1c30]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          DRAWER: GROUNDED AI Q&A ASSISTANT
          ───────────────────────────────────────────────────────────── */}
      {showAskAiDrawer && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-white shadow-2xl border-l border-[#0f172a]/10 flex flex-col animate-in slide-in-from-right duration-200">
          <div className="h-16 px-5 border-b border-slate-100 flex items-center justify-between bg-[#eff4ff]">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-[#d97706]" />
              <div>
                <h3 className="font-editorial text-sm font-bold text-[#0b1c30]">
                  Grounded Legal AI Assistant
                </h3>
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Anchored to Document PDF
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowAskAiDrawer(false)}
              className="p-1 rounded-lg hover:bg-white text-[#64748b]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 text-xs">
            {aiChatHistory.map((chat, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl max-w-[90%] leading-relaxed ${
                  chat.sender === "user"
                    ? "bg-[#0b1c30] text-white self-end"
                    : "bg-[#eff4ff] text-[#0b1c30] self-start border border-[#0f172a]/5"
                }`}
              >
                {chat.text}
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-slate-100 bg-white flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask about Clause 9.3 or statutory rights..."
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendAiMessage()}
                className="flex-1 px-3 py-2 rounded-xl bg-[#eff4ff] border border-[#0f172a]/10 text-xs text-[#0b1c30] focus:outline-none focus:ring-1 focus:ring-[#d97706]"
              />
              <button
                type="button"
                onClick={handleSendAiMessage}
                className="p-2 rounded-xl bg-[#d97706] text-white hover:bg-[#b45309] transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <span className="text-[10px] text-[#64748b] text-center">
              Zero Model Retraining • Ephemeral Session RAM
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
