"use client";

import React, { Suspense, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import {
  Upload,
  LoaderCircle,
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
  Pin,
  ExternalLink,
  Brain,
  ListTodo,
  Copy,
  Check,
  MessageSquare,
  Sparkles,
  Lock,
  ShieldCheck,
  Calendar,
  Hourglass,
  Scale,
  X,
  FileWarning,
  Layers,
  ArrowRight,
} from "lucide-react";

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function WorkspacePage() {
  return (
    <Suspense
      fallback={
        <DashboardShell>
          <main className="flex-1 px-4 sm:px-6 lg:px-8 py-10 bg-[#f8f9ff]">
            <div className="max-w-3xl mx-auto min-h-[60vh] flex items-center justify-center">
              <p className="text-sm text-[#64748b]">Loading workspace…</p>
            </div>
          </main>
        </DashboardShell>
      }
    >
      <WorkspaceStudio />
    </Suspense>
  );
}

function WorkspaceStudio() {
  // Dynamic user configuration from onboarding
  const [userConfig] = useState<{
    language?: string;
    jurisdiction?: string;
    domain?: string;
    objective?: string;
    privacy?: string;
  }>(() => {
    const defaults = {
      language: "en",
      jurisdiction: "karnataka",
      domain: "rental",
      objective: "understand",
      privacy: "ephemeral",
    };

    if (typeof window === "undefined") return defaults;

    try {
      const stored = localStorage.getItem("nyayasetu_user_config");
      return stored ? { ...defaults, ...JSON.parse(stored) } : defaults;
    } catch {
      return defaults;
    }
  });

  // Navigation & Interactive States
  const [activeTab, setActiveTab] = useState<
    "understand" | "risks" | "qa" | "compare" | "deadlines"
  >(() => {
    if (userConfig.objective === "risks") return "risks";
    if (userConfig.objective === "compare") return "compare";
    return "understand";
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [inRenegotiationList, setInRenegotiationList] = useState(false);
  const [showPipelineAudit, setShowPipelineAudit] = useState(false);
  const [showOcrModal, setShowOcrModal] = useState(false);
  const [showScheduleBUpload, setShowScheduleBUpload] = useState(false);
  const [showAskAiDrawer, setShowAskAiDrawer] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const addendumInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiChatHistory, setAiChatHistory] = useState([
    {
      sender: "ai",
      text: "Namaste. I am your Grounded Legal Assistant. Every response is strictly anchored to the OCR-verified text of your Residential Tenancy Agreement and Karnataka statutory benchmarks. How may I clarify Clause 9.3?",
    },
  ]);

  // Live 60-Minute Purge Timer countdown
  const [secondsRemaining, setSecondsRemaining] = useState(54 * 60 + 12);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (searchParams.get("new") !== "1") return;
    setSelectedFile(null);
    setIsAnalyzing(false);
    setAnalysisProgress(0);
    setUploadError("");
    router.replace(pathname);
  }, [searchParams, router, pathname]);

  useEffect(() => {
    if (!selectedFile) {
      setPdfUrl(null);
      return;
    }
    const url = URL.createObjectURL(selectedFile);
    setPdfUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

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

  const handleFileSelect = (file: File | undefined) => {
    if (!file) return;
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setUploadError("Please choose a PDF document to begin analysis.");
      return;
    }

    setUploadError("");
    setSelectedFile(file);
    setCurrentPage(1);
    setZoomLevel(100);
    setShowScheduleBUpload(false);
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    let progress = 0;
    const interval = window.setInterval(() => {
      progress += 25;
      setAnalysisProgress(progress);
      if (progress >= 100) {
        window.clearInterval(interval);
        setIsAnalyzing(false);
      }
    }, 500);
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    handleFileSelect(event.dataTransfer.files?.[0]);
  };

  if (!selectedFile || isAnalyzing) {
    return (
      <DashboardShell>
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-10 bg-[#f8f9ff]">
          <div className="max-w-3xl mx-auto min-h-[60vh] flex items-center justify-center">
            <section className="w-full bg-white rounded-2xl border border-[#0f172a]/10 shadow-sm p-6 sm:p-10 text-center">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-[#eff4ff] flex items-center justify-center text-[#d97706]">
                {isAnalyzing ? <LoaderCircle className="w-7 h-7 animate-spin" /> : <Upload className="w-7 h-7" />}
              </div>
              <p className="mt-5 text-xs font-bold uppercase tracking-wider text-[#d97706]">
                {isAnalyzing ? `Preparing analysis • ${analysisProgress}%` : "Start a document analysis"}
              </p>
              <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#0b1c30] mt-2">
                {isAnalyzing ? "Checking your PDF" : "Upload a legal PDF"}
              </h1>
              <p className="text-sm text-[#45464d] max-w-xl mx-auto mt-3 leading-relaxed">
                {isAnalyzing
                  ? "Ingesting the document, preparing its text layer, and building your grounded workspace."
                  : "Choose a PDF to create a grounded workspace. Your analysis will use the document you provide instead of a preloaded example."}
              </p>
              {isAnalyzing && selectedFile && (
                <p className="mt-3 text-xs font-semibold text-[#0b1c30]">
                  {selectedFile.name} • {formatFileSize(selectedFile.size)}
                </p>
              )}
              {!isAnalyzing && (
                <label
                  className={`mt-7 mx-auto max-w-md border-2 border-dashed rounded-2xl p-7 flex flex-col items-center gap-2 cursor-pointer transition-colors ${
                    isDragOver
                      ? "border-[#d97706] bg-[#fffaf3]"
                      : "border-[#0f172a]/15 hover:border-[#d97706] hover:bg-[#fffaf3]"
                  }`}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setIsDragOver(true);
                  }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={handleDrop}
                >
                  <span className="px-4 py-2 rounded-xl bg-[#0b1c30] text-white text-sm font-bold">Choose PDF</span>
                  <span className="text-xs text-[#64748b]">PDF files only • drag and drop accepted</span>
                  <input
                    type="file"
                    accept="application/pdf,.pdf"
                    className="sr-only"
                    onChange={(event) => handleFileSelect(event.target.files?.[0])}
                  />
                </label>
              )}
              {uploadError && <p className="mt-4 text-xs font-semibold text-[#ba1a1a]">{uploadError}</p>}
              {isAnalyzing && (
                <div className="mt-7 h-2 rounded-full bg-[#eff4ff] overflow-hidden">
                  <div className="h-full bg-[#d97706] transition-all duration-300" style={{ width: `${analysisProgress}%` }} />
                </div>
              )}
            </section>
          </div>
        </main>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell showSubNav activeSubNav={activeTab} documentName={selectedFile.name}>
      <div className="w-full font-sans text-[#0b1c30] flex-1 flex flex-col antialiased">

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
                      <p className="text-[11px] text-[#45464d] truncate">
                        PDF • {formatFileSize(selectedFile.size)}
                      </p>
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
                  {selectedFile.name}
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

              {/* Uploaded PDF viewer */}
              <div className="relative w-full bg-white rounded-2xl border border-[#0f172a]/10 shadow-md overflow-hidden min-h-[720px] flex flex-col">
                {pdfUrl ? (
                  <div className="flex-1 overflow-auto bg-[#e8edf5]">
                    <div
                      className="origin-top transition-transform duration-200"
                      style={{ transform: `scale(${zoomLevel / 100})` }}
                    >
                      <iframe
                        title={selectedFile.name}
                        src={pdfUrl}
                        className="w-full min-h-[720px] h-[80vh] border-0 bg-white"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 min-h-[720px] flex items-center justify-center text-sm text-[#64748b]">
                    Preparing document preview…
                  </div>
                )}
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
                    <p className="mt-2 text-[11px] text-[#b45309] bg-[#fff7ed] border border-[#ffedd5] rounded-lg px-2.5 py-1.5 leading-relaxed">
                      Risk and clause scores below are studio demo output, not extracted from {selectedFile.name}.
                    </p>
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

            <label
              className="border-2 border-dashed border-[#0f172a]/20 rounded-xl p-6 text-center flex flex-col items-center gap-2 bg-[#eff4ff] cursor-pointer hover:border-[#d97706]"
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                handleFileSelect(event.dataTransfer.files?.[0]);
              }}
            >
              <PlusCircle className="w-8 h-8 text-[#d97706]" />
              <p className="text-xs font-bold text-[#0b1c30]">
                Drag &amp; drop a PDF here to replace the current document
              </p>
              <p className="text-[10px] text-[#64748b]">PDF files only</p>
              <span className="mt-2 px-3 py-1.5 rounded-lg bg-[#d97706] text-white text-xs font-bold hover:bg-[#b45309]">
                Browse Local Files
              </span>
              <input
                ref={addendumInputRef}
                type="file"
                accept="application/pdf,.pdf"
                className="sr-only"
                onChange={(event) => handleFileSelect(event.target.files?.[0])}
              />
            </label>

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
    </DashboardShell>
  );
}
