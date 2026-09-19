"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import {
  ShieldCheck,
  Check,
  Gavel,
  Scale,
  Building2,
  FileSearch,
  GitCompare,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  ScanLine,
  Lock,
  ChevronDown,
  HelpCircle,
  X,
  Sparkles,
  Timer,
  KeyRound,
  Home,
  Briefcase,
  ShoppingBag,
  Landmark,
  HeartPulse,
  Handshake,
  Languages,
  MapPin,
  Target,
  FileText,
  ShieldAlert,
  BadgeCheck,
} from "lucide-react";

/* ======================================================
   DATA
   ====================================================== */

const languages = [
  {
    id: "en",
    name: "English",
    native: "Indian Legal Standard",
    nativeScript: "Statutory acts, court filings, official notices",
    badge: "PRIMARY",
    featureIcon: ShieldCheck,
  },
  {
    id: "hi",
    name: "हिन्दी",
    native: "Hindi (Devanagari)",
    nativeScript: "नागरिक अधिकार व सरल क़ानूनी सारांश",
    badge: "TRIBUNALS",
    featureIcon: Check,
  },
  {
    id: "ta",
    name: "தமிழ்",
    native: "Tamil (தமிழ்)",
    nativeScript: "சட்ட விதிமுறைகள் மற்றும் பகுப்பாய்வு",
    badge: "MADRAS HC",
    featureIcon: Check,
  },
  {
    id: "te",
    name: "తెలుగు",
    native: "Telugu (తెలుగు)",
    nativeScript: "చట్టపరమైన పత్రాల స్పష్టమైన వివరణ",
    badge: "TELANGANA HC",
    featureIcon: Check,
  },
  {
    id: "kn",
    name: "ಕನ್ನಡ",
    native: "Kannada (ಕನ್ನಡ)",
    nativeScript: "ಕರ್ನಾಟಕ ಬಾಡಿಗೆ ಮತ್ತು ಕರಾರು ಕಾನೂನು",
    badge: "COMMERCIAL",
    featureIcon: Check,
  },
  {
    id: "bn",
    name: "বাংলা",
    native: "Bengali (বাংলা)",
    nativeScript: "আইনি বিশ্লেষণ ও ঝুঁকি নিরীক্ষা",
    badge: "CALCUTTA HC",
    featureIcon: Check,
  },
  {
    id: "mr",
    name: "मराठी",
    native: "Marathi (महाराष्ट्र)",
    nativeScript: "भाडे करार व ग्राहक हक्क कायदे",
    badge: "ACTIVE BENCH",
    featureIcon: Sparkles,
    highlight: true,
  },
  {
    id: "gu",
    name: "ગુજરાતી",
    native: "Gujarati (ગુજરાતી)",
    nativeScript: "વાણિજ્યિક કરારો અને કાનૂની સંરક્ષણ",
    badge: "GIFT CITY",
    featureIcon: Check,
  },
  {
    id: "ml",
    name: "മലയാളം",
    native: "Malayalam (മലയാളം)",
    nativeScript: "നിയമപരമായ അവകാശങ്ങളുടെ ചുരുക്കം",
    badge: "KERALA HC",
    featureIcon: Check,
  },
];

const jurisdictionOptions = [
  { value: "karnataka", label: "Karnataka (Bengaluru Urban & Districts)" },
  { value: "maharashtra", label: "Maharashtra (Mumbai, Pune & Districts)" },
  { value: "delhi", label: "Delhi NCR (NCT Delhi & DDA Bench)" },
  { value: "tamilnadu", label: "Tamil Nadu (Chennai, Coimbatore & Districts)" },
  { value: "telangana", label: "Telangana (Hyderabad, Cyberabad)" },
  { value: "westbengal", label: "West Bengal (Kolkata High Court)" },
  { value: "gujarat", label: "Gujarat (Ahmedabad, Surat)" },
  { value: "kerala", label: "Kerala (Ernakulam, Thiruvananthapuram)" },
  { value: "up", label: "Uttar Pradesh (Noida, Lucknow)" },
  { value: "punjab", label: "Punjab & Haryana (Chandigarh)" },
];

const jurisdictionChips = [
  {
    value: "karnataka",
    label: "Karnataka (Bengaluru Urban)",
    act: "Karnataka Rent Act 1999 + BNS 2023",
  },
  {
    value: "maharashtra",
    label: "Maharashtra (Mumbai / Pune)",
    act: "Maharashtra Rent Control Act 1999",
  },
  {
    value: "delhi",
    label: "Delhi NCR",
    act: "Delhi Rent Control Act + DDA Guidelines",
  },
  {
    value: "tamilnadu",
    label: "Tamil Nadu",
    act: "TNRRRL Act 2017",
  },
  {
    value: "telangana",
    label: "Telangana & AP",
    act: "Telangana Buildings Lease Act",
  },
];

const statuteSummaries: Record<string, string> = {
  karnataka:
    "Bharatiya Nyaya Sanhita (BNS) 2023 • Consumer Protection Act 2019 • Indian Contract Act 1872 • Karnataka Rent Act 1999 • High Court of Karnataka Precedent Lexicon.",
  maharashtra:
    "Bharatiya Nyaya Sanhita (BNS) 2023 • Consumer Protection Act 2019 • Maharashtra Rent Control Act 1999 • Bombay High Court Precedent Bench.",
  delhi:
    "Bharatiya Nyaya Sanhita (BNS) 2023 • Delhi Rent Control Act 1958 • DDA Master Plan 2041 Norms • High Court of Delhi Precedent Lexicon.",
  tamilnadu:
    "Bharatiya Nyaya Sanhita (BNS) 2023 • Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants Act (TNRRRL) 2017 • Madras High Court Precedents.",
  telangana:
    "Bharatiya Nyaya Sanhita (BNS) 2023 • Telangana Buildings Lease Act • Hyderabad High Court Precedent Index.",
  default:
    "Bharatiya Nyaya Sanhita (BNS) 2023 • Consumer Protection Act 2019 • Indian Contract Act 1872 • Respective State Statutes & High Court Gazette Rulings.",
};

const documentDomains = [
  {
    id: "rental",
    label: "Rental & Lease",
    desc: "11-month deeds, deposit returns, repairs, eviction notice periods",
    icon: Home,
  },
  {
    id: "employment",
    label: "Employment & Offer",
    desc: "Sec 27 non-compete voidance, bond penalties, IP transfers",
    icon: Briefcase,
  },
  {
    id: "consumer",
    label: "Consumer Contract",
    desc: "Unfair terms, unilateral cancellation, arbitration waivers",
    icon: ShoppingBag,
  },
  {
    id: "loan",
    label: "Loan & Credit Sanction",
    desc: "RBI Fair Lending benchmarks, penal interest, foreclosure terms",
    icon: Landmark,
  },
  {
    id: "insurance",
    label: "Insurance & Riders",
    desc: "IRDAI 30-day grace, room rent caps, pre-existing clauses",
    icon: HeartPulse,
  },
  {
    id: "vendor",
    label: "Vendor / Freelance SOW",
    desc: "Payment milestones, MSMEDA Act 45-day interest, indemnity caps",
    icon: Handshake,
  },
];

/* ======================================================
   STEP DEFINITIONS
   ====================================================== */
const stepDefinitions = [
  {
    num: 1,
    title: "Language & Region",
    subtitle: "Indic Dialects & State",
    icon: Languages,
  },
  {
    num: 2,
    title: "Analytical Intent",
    subtitle: "Redline vs. Clarity",
    icon: Target,
  },
  {
    num: 3,
    title: "Document Scope",
    subtitle: "Lease, Notice, Loan",
    icon: FileText,
  },
  {
    num: 4,
    title: "Privacy & Guardrails",
    subtitle: "Ephemeral RAM Mode",
    icon: ShieldAlert,
  },
];

/* ======================================================
   COMPONENT
   ====================================================== */

export default function OnboardingPage() {
  // === State ===
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [bilingualEnabled, setBilingualEnabled] = useState(true);
  const [selectedJurisdiction, setSelectedJurisdiction] = useState("karnataka");
  const [selectedObjective, setSelectedObjective] = useState("understand");
  const [selectedDomain, setSelectedDomain] = useState("rental");
  const [selectedPrivacy, setSelectedPrivacy] = useState("ephemeral");
  const [privacyAck, setPrivacyAck] = useState(true);
  const [statutoryConsent, setStatutoryConsent] = useState(true);
  const [initialized, setInitialized] = useState(false);

  // === Derived data ===
  const currentStatuteSummary =
    statuteSummaries[selectedJurisdiction] || statuteSummaries.default;

  const selectedLangObj = useMemo(
    () => languages.find((l) => l.id === selectedLanguage) || languages[0],
    [selectedLanguage]
  );

  const selectedDomainObj = useMemo(
    () => documentDomains.find((d) => d.id === selectedDomain) || documentDomains[0],
    [selectedDomain]
  );

  // === Handlers ===
  const handleInitialize = () => {
    if (!privacyAck || !statutoryConsent) {
      alert(
        "Please accept both the privacy acknowledgment and the statutory consent to proceed."
      );
      return;
    }
    setInitialized(true);
  };

  const handleChipClick = (value: string) => {
    setSelectedJurisdiction(value);
  };

  // === Progress ===
  const completedSteps = 3; // Steps 1-3 are "completed" by default in the Stitch design
  const progressPercent = Math.round((completedSteps / 4) * 100);

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans">
      {/* ============================================== 
          HEADER BAR
          ============================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-[#0f172a]/5 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <Logo className="h-9 w-auto" />
            </Link>

            <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-slate-200">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#eff4ff] text-[11px] font-mono text-[#45464d]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
                IN-DEL-01 (MUMBAI CLOUD)
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#eff4ff] text-[10px] font-mono font-semibold text-[#45464d]">
                SOC 2 TYPE II
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#eff4ff] text-[10px] font-mono font-semibold text-[#45464d]">
                DPDPA 2023
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                alert(
                  "NyayaSetu Legal Ops Guide:\n1. Choose language\n2. Select court jurisdiction\n3. Select analytical intent\n4. Choose document scope\n5. Configure privacy sandbox\n6. Accept statutory disclaimer."
                )
              }
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#eff4ff] text-[#45464d] hover:text-[#0b1c30] text-xs font-semibold transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-[#d97706]" />
              <span>Legal Ops Guide</span>
            </button>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#64748b] hover:text-[#ba1a1a] hover:bg-[#fff1f2] transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Exit Flow</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ============================================== 
          MAIN CONTAINER
          ============================================== */}
      <main className="flex-1 pt-24 pb-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        {/* ─── Progression Header Strip ─── */}
        <div className="w-full bg-white rounded-2xl shadow-md p-6 lg:p-7">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#0f172a] text-white flex items-center justify-center shadow-sm">
                <ScanLine className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#d97706]/15 text-[#d97706] text-[11px] font-bold uppercase tracking-wider">
                    Guided Configuration
                  </span>
                  <span className="text-[#76777d] text-[11px]">•</span>
                  <span className="text-[#45464d] text-[11px]">
                    Citizen Setup &amp; Personalization
                  </span>
                </div>
                <h1 className="font-editorial text-xl sm:text-2xl lg:text-[28px] font-bold text-[#0b1c30] tracking-tight mt-1">
                  Configure Your Legal Intelligence Workspace
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <span className="block text-[10px] uppercase font-bold text-[#64748b]">
                  Setup Status
                </span>
                <span className="text-sm font-semibold text-[#0b1c30]">
                  Step {completedSteps} of 4 Completed
                </span>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#d97706] relative">
                <svg className="w-11 h-11 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#e5eeff]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path
                    className="text-[#d97706]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray={`${progressPercent}, 100`}
                    strokeLinecap="round"
                    strokeWidth="3"
                  />
                </svg>
                <span className="absolute text-xs font-bold text-[#0b1c30]">
                  {progressPercent}%
                </span>
              </div>
            </div>
          </div>

          {/* Stepper Pills */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-4 border-t border-slate-100">
            {stepDefinitions.map((step) => {
              const isActive = step.num === 4;
              const StepIcon = step.icon;
              return (
                <div
                  key={step.num}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl transition-all ${
                    isActive
                      ? "bg-[#d97706]/10 text-[#d97706]"
                      : "bg-[#e5eeff] text-[#0b1c30]"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      isActive
                        ? "bg-[#d97706] text-white"
                        : "bg-[#0f172a] text-white"
                    }`}
                  >
                    {step.num}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] font-bold truncate">
                      {step.title}
                    </span>
                    <span className="text-[10px] text-[#45464d] leading-none truncate">
                      {step.subtitle}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── MAIN WORKFLOW GRID ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ──────────────────────────────────────
              LEFT 8-COLUMN: ALL 6 STEPS 
              ────────────────────────────────────── */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* ============================================== 
                STEP 1: INDIC LANGUAGE & SCRIPT SELECTION
                ============================================== */}
            <section className="bg-white p-6 sm:p-7 rounded-2xl border border-[#0f172a]/5 shadow-xs flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#d97706]">
                      Step 01
                    </span>
                    <span className="text-[#76777d] text-[11px]">•</span>
                    <span className="text-[#45464d] text-[11px]">
                      Indic Constitutional Localization
                    </span>
                  </div>
                  <h2 className="font-editorial text-lg sm:text-xl font-bold text-[#0b1c30] mt-1">
                    Choose Your Primary Insight Language
                  </h2>
                  <p className="text-xs text-[#45464d] mt-0.5 max-w-2xl">
                    All statutory clause breakdowns, plain-language summaries,
                    and precedent cross-references will generate in your chosen
                    script.
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 bg-[#eff4ff] px-3 py-1.5 rounded-lg shrink-0 self-start">
                  <Languages className="w-4 h-4 text-[#d97706]" />
                  <span className="text-xs font-semibold text-[#0b1c30]">
                    9 Constitutional Scripts
                  </span>
                </div>
              </div>

              {/* Bilingual Toggle */}
              <div className="p-4 rounded-xl bg-[#e5eeff] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-[#0b1c30] shadow-sm shrink-0">
                    <GitCompare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-sm text-[#0b1c30] block">
                      Side-by-Side Bilingual Render
                    </span>
                    <span className="text-xs text-[#45464d]">
                      Show verbatim English clause on the left and the localized
                      Indic translation on the right.
                    </span>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={bilingualEnabled}
                    onChange={(e) => setBilingualEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#d97706]" />
                  <span className="ml-2 text-xs font-semibold text-[#0b1c30]">
                    {bilingualEnabled ? "Active" : "Off"}
                  </span>
                </label>
              </div>

              {/* Language Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {languages.map((lang) => {
                  const isSelected = selectedLanguage === lang.id;
                  return (
                    <button
                      key={lang.id}
                      type="button"
                      onClick={() => setSelectedLanguage(lang.id)}
                      className={`text-left p-3.5 rounded-xl transition-all flex flex-col justify-between ${
                        isSelected
                          ? "bg-[#dce9ff] shadow-sm border border-[#d97706]/30"
                          : "bg-[#eff4ff] border border-transparent hover:bg-[#e5eeff]"
                      }`}
                    >
                      <div className="flex items-start justify-between w-full mb-1">
                        <span className="font-bold text-base text-[#0b1c30] tracking-tight">
                          {lang.name}
                        </span>
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                            isSelected
                              ? "bg-[#d97706] text-white shadow-xs"
                              : "bg-[#dce9ff] text-[#45464d] opacity-0 group-hover:opacity-100"
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <span className="text-xs text-[#45464d] block">
                        {lang.native}
                      </span>
                      <span className="text-[11px] text-[#45464d] block mt-1 opacity-75">
                        {lang.nativeScript}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* ============================================== 
                STEP 2: LEGAL JURISDICTION & STATE STATUTE
                ============================================== */}
            <section className="bg-white p-6 sm:p-7 rounded-2xl border border-[#0f172a]/5 shadow-xs flex flex-col gap-5">
              <div className="pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#d97706]">
                    Step 02
                  </span>
                  <span className="text-[#76777d] text-[11px]">•</span>
                  <span className="text-[#45464d] text-[11px]">
                    Statutory Cross-Verification
                  </span>
                </div>
                <h2 className="font-editorial text-lg sm:text-xl font-bold text-[#0b1c30] mt-1">
                  Define Your Applicable Legal Jurisdiction
                </h2>
                <p className="text-xs text-[#45464d] mt-0.5 max-w-2xl">
                  Indian property, tenant protections, consumer claims, and
                  labor ordinances vary by state. Selecting your jurisdiction
                  loads exact local gazettes and high court precedents.
                </p>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Country (Locked) */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#45464d] flex items-center gap-1.5">
                    <span>Country &amp; Apex Constitution</span>
                    <BadgeCheck className="w-3.5 h-3.5 text-[#d97706]" />
                  </label>
                  <div className="p-3 bg-[#eff4ff] rounded-xl flex items-center justify-between border border-[#0f172a]/5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Building2 className="w-4 h-4 text-[#d97706] shrink-0" />
                      <span className="text-xs font-bold text-[#0b1c30] truncate">
                        India (Bharat) — Union Framework
                      </span>
                    </div>
                    <Lock className="w-4 h-4 text-[#94a3b8] shrink-0" />
                  </div>
                </div>

                {/* State Selector */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#45464d]">
                    State / Union Territory Jurisdiction
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#45464d] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={selectedJurisdiction}
                      onChange={(e) =>
                        setSelectedJurisdiction(e.target.value)
                      }
                      className="w-full p-3 pl-10 pr-10 bg-[#eff4ff] rounded-xl border border-[#0f172a]/5 text-xs font-bold text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#d97706]/30 appearance-none cursor-pointer"
                    >
                      {jurisdictionOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#45464d] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Quick Select Chips */}
              <div>
                <span className="text-[10px] uppercase font-bold text-[#64748b] block tracking-wider mb-2">
                  Quick Select Major Judicial Jurisdictions:
                </span>
                <div className="flex flex-wrap gap-2">
                  {jurisdictionChips.map((chip) => {
                    const isActive = selectedJurisdiction === chip.value;
                    return (
                      <button
                        key={chip.value}
                        type="button"
                        onClick={() => handleChipClick(chip.value)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                          isActive
                            ? "bg-[#0f172a] text-white shadow-xs"
                            : "bg-[#e5eeff] text-[#0b1c30] hover:bg-[#dce9ff]"
                        }`}
                      >
                        {isActive && (
                          <Check className="w-3.5 h-3.5" />
                        )}
                        <span>{chip.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Statutory Corpus */}
              <div className="p-4 rounded-xl bg-[#eff4ff] flex items-start gap-3 border border-[#0f172a]/5">
                <div className="w-8 h-8 rounded-full bg-[#d97706] text-white flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-bold uppercase text-[#d97706] block tracking-wider">
                    Active Statutory Corpus Mounted
                  </span>
                  <p className="text-xs text-[#45464d] mt-1 leading-relaxed">
                    {currentStatuteSummary}
                  </p>
                </div>
              </div>
            </section>

            {/* ============================================== 
                STEP 3: ANALYTICAL INTENT & PURPOSE
                ============================================== */}
            <section className="bg-white p-6 sm:p-7 rounded-2xl border border-[#0f172a]/5 shadow-xs flex flex-col gap-5">
              <div className="pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#d97706]">
                    Step 03
                  </span>
                  <span className="text-[#76777d] text-[11px]">•</span>
                  <span className="text-[#45464d] text-[11px]">
                    Cognitive Focus
                  </span>
                </div>
                <h2 className="font-editorial text-lg sm:text-xl font-bold text-[#0b1c30] mt-1">
                  What is Your Primary Analytical Objective?
                </h2>
                <p className="text-xs text-[#45464d] mt-0.5 max-w-2xl">
                  Configures the AI engine&apos;s reasoning depth, risk
                  sensitivity score thresholds, and executive briefing formats.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Understand & Audit */}
                <div
                  onClick={() => setSelectedObjective("understand")}
                  className={`p-5 rounded-2xl cursor-pointer transition-all border flex flex-col justify-between relative ${
                    selectedObjective === "understand"
                      ? "bg-[#dce9ff] border-[#d97706]/30 shadow-sm"
                      : "bg-[#eff4ff] border-transparent hover:bg-[#e5eeff]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#0f172a] text-white flex items-center justify-center shadow-xs">
                        <FileSearch className="w-5 h-5" />
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#d97706] text-white text-[10px] uppercase font-bold">
                        Most Popular
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-[#0b1c30] mb-1.5">
                      Understand a Document
                    </h3>
                    <p className="text-xs text-[#45464d] leading-relaxed">
                      Demystify dense legal wording, uncover hidden penalty
                      clauses, inspect lock-ins, and produce a citizen
                      plain-language checklist.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-bold text-[#d97706]">
                    {selectedObjective === "understand" ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Active Objective</span>
                      </>
                    ) : (
                      <span className="text-[#45464d]">Select this mode</span>
                    )}
                  </div>
                </div>

                {/* Compare Two Drafts */}
                <div
                  onClick={() => setSelectedObjective("compare")}
                  className={`p-5 rounded-2xl cursor-pointer transition-all border flex flex-col justify-between relative ${
                    selectedObjective === "compare"
                      ? "bg-[#dce9ff] border-[#d97706]/30 shadow-sm"
                      : "bg-[#eff4ff] border-transparent hover:bg-[#e5eeff]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#e5eeff] text-[#0b1c30] flex items-center justify-center">
                        <GitCompare className="w-5 h-5" />
                      </div>
                      <span className="text-[#45464d] text-[11px]">
                        Redline Diff
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-[#0b1c30] mb-1.5">
                      Compare Two Documents
                    </h3>
                    <p className="text-xs text-[#45464d] leading-relaxed">
                      Side-by-side clause discrepancy tracking to isolate
                      modified indemnities, altered deposit returns, or deleted
                      liabilities.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-bold">
                    {selectedObjective === "compare" ? (
                      <span className="text-[#d97706] flex items-center gap-1.5">
                        <Check className="w-4 h-4" />
                        Active Objective
                      </span>
                    ) : (
                      <span className="text-[#45464d]">Select this mode</span>
                    )}
                  </div>
                </div>

                {/* Statutory Literacy */}
                <div
                  onClick={() => setSelectedObjective("literacy")}
                  className={`p-5 rounded-2xl cursor-pointer transition-all border flex flex-col justify-between relative ${
                    selectedObjective === "literacy"
                      ? "bg-[#dce9ff] border-[#d97706]/30 shadow-sm"
                      : "bg-[#eff4ff] border-transparent hover:bg-[#e5eeff]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#e5eeff] text-[#0b1c30] flex items-center justify-center">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <span className="text-[#45464d] text-[11px]">
                        Direct Corpus
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-[#0b1c30] mb-1.5">
                      Statutory Legal Literacy
                    </h3>
                    <p className="text-xs text-[#45464d] leading-relaxed">
                      Query constitutional precedents, tenant security caps, or
                      unfair commercial practices directly without uploading any
                      document.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-bold">
                    {selectedObjective === "literacy" ? (
                      <span className="text-[#d97706] flex items-center gap-1.5">
                        <Check className="w-4 h-4" />
                        Active Objective
                      </span>
                    ) : (
                      <span className="text-[#45464d]">Select this mode</span>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================== 
                STEP 4: DOCUMENT SCOPE / DOMAIN SPECIALIZATION
                ============================================== */}
            <section className="bg-white p-6 sm:p-7 rounded-2xl border border-[#0f172a]/5 shadow-xs flex flex-col gap-5">
              <div className="pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#d97706]">
                    Step 04
                  </span>
                  <span className="text-[#76777d] text-[11px]">•</span>
                  <span className="text-[#45464d] text-[11px]">
                    Domain Verification Benchmarks
                  </span>
                </div>
                <h2 className="font-editorial text-lg sm:text-xl font-bold text-[#0b1c30] mt-1">
                  What Document Are You Analyzing Today?
                </h2>
                <p className="text-xs text-[#45464d] mt-0.5 max-w-2xl">
                  Loads context-specific Indian high court risk templates,
                  standard contractual ratios, and penalty limits.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {documentDomains.map((domain) => {
                  const isActive = selectedDomain === domain.id;
                  const DomainIcon = domain.icon;
                  return (
                    <button
                      key={domain.id}
                      type="button"
                      onClick={() => setSelectedDomain(domain.id)}
                      className={`text-left p-4 rounded-xl transition-all flex items-start gap-3 border ${
                        isActive
                          ? "bg-[#dce9ff] border-[#d97706]/30 shadow-sm"
                          : "bg-[#eff4ff] border-transparent hover:bg-[#e5eeff]"
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          isActive
                            ? "bg-[#0f172a] text-white"
                            : "bg-[#e5eeff] text-[#0b1c30]"
                        }`}
                      >
                        <DomainIcon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-sm text-[#0b1c30] block truncate">
                          {domain.label}
                        </span>
                        <span className="text-[11px] text-[#45464d] block mt-0.5 leading-relaxed">
                          {domain.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* ============================================== 
                STEP 5: PRIVACY SANDBOX & EPHEMERAL MODE
                ============================================== */}
            <section className="bg-white p-6 sm:p-7 rounded-2xl border border-[#0f172a]/5 shadow-xs flex flex-col gap-5">
              <div className="pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#d97706]">
                    Step 05
                  </span>
                  <span className="text-[#76777d] text-[11px]">•</span>
                  <span className="text-[#45464d] text-[11px]">
                    Data Sovereign Protection
                  </span>
                </div>
                <h2 className="font-editorial text-lg sm:text-xl font-bold text-[#0b1c30] mt-1">
                  Choose Your Document Privacy Sandbox
                </h2>
                <p className="text-xs text-[#45464d] mt-0.5 max-w-2xl">
                  NyayaSetu is engineered under India&apos;s Digital Personal
                  Data Protection (DPDP) Act 2023. We never train public models
                  on citizen documents.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Ephemeral RAM */}
                <div
                  onClick={() => setSelectedPrivacy("ephemeral")}
                  className={`p-5 rounded-xl cursor-pointer transition-all border relative ${
                    selectedPrivacy === "ephemeral"
                      ? "bg-[#dce9ff] border-[#d97706]/30 shadow-sm"
                      : "bg-[#eff4ff] border-transparent hover:bg-[#e5eeff]"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Timer className="w-5 h-5 text-[#d97706]" />
                      <span className="font-bold text-sm text-[#0b1c30]">
                        Strict Ephemeral RAM
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#d97706] text-white text-[10px] uppercase font-bold">
                      Recommended
                    </span>
                  </div>
                  <p className="text-xs text-[#45464d] leading-relaxed mb-3">
                    Document parsed in transient volatile memory. Purged
                    permanently after 60 minutes or browser tab closure. A
                    SHA-256 cryptographic shredding receipt is generated.
                  </p>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#d97706]">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Zero model retention &amp; automatic RAM flush</span>
                  </div>
                </div>

                {/* Client Encrypted Vault */}
                <div
                  onClick={() => setSelectedPrivacy("vault")}
                  className={`p-5 rounded-xl cursor-pointer transition-all border relative ${
                    selectedPrivacy === "vault"
                      ? "bg-[#dce9ff] border-[#d97706]/30 shadow-sm"
                      : "bg-[#eff4ff] border-transparent hover:bg-[#e5eeff]"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-[#0b1c30]" />
                      <span className="font-bold text-sm text-[#0b1c30]">
                        Client Encrypted Vault
                      </span>
                    </div>
                    <span className="text-[#45464d] text-[11px]">Opt-in</span>
                  </div>
                  <p className="text-xs text-[#45464d] leading-relaxed mb-3">
                    Retains encrypted snapshots locally with zero server
                    visibility. Allows cross-document comparisons over multiple
                    sessions using your private PIN.
                  </p>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#45464d]">
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>Encrypted with citizen-held salt</span>
                  </div>
                </div>
              </div>

              {/* Privacy Acknowledgment */}
              <div className="flex items-start gap-2.5 p-4 rounded-lg bg-[#e5eeff]">
                <input
                  type="checkbox"
                  checked={privacyAck}
                  onChange={(e) => setPrivacyAck(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-[#d97706] accent-[#d97706] cursor-pointer"
                />
                <span className="text-xs text-[#45464d] leading-relaxed">
                  I acknowledge that documents are processed strictly under
                  ephemeral security boundaries and will never be shared with
                  third parties, advertiser brokers, or external AI model
                  training datasets.
                </span>
              </div>
            </section>

            {/* ============================================== 
                STEP 6: MANDATORY CIVIC LEGAL DISCLAIMER
                ============================================== */}
            <section className="bg-white p-6 sm:p-7 rounded-2xl border border-[#0f172a]/5 shadow-xs flex flex-col gap-5">
              {/* Gavel Callout */}
              <div className="flex items-start gap-4 p-5 rounded-xl bg-[#d97706]/10">
                <div className="w-10 h-10 rounded-full bg-[#d97706] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Gavel className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#0b1c30]">
                    Informational Legal Technology — Not Legal Advice
                  </h3>
                  <p className="text-xs text-[#45464d] mt-1.5 leading-relaxed">
                    NyayaSetu is an AI-powered civic legal technology engine
                    designed to extract evidence, clarify ambiguous clauses, and
                    cite Indian statutory texts. It does not provide legal
                    representation, formulate formal advocate opinions, or
                    replace a qualified Advocate registered with the Bar Council
                    of India (BCI). Always consult licensed legal counsel for
                    contentious courtroom disputes or formal filings.
                  </p>
                </div>
              </div>

              {/* Mandatory Consent */}
              <div className="flex items-start gap-2.5 bg-[#eff4ff] p-4 rounded-lg">
                <input
                  type="checkbox"
                  checked={statutoryConsent}
                  onChange={(e) => setStatutoryConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-[#d97706] accent-[#d97706] cursor-pointer"
                />
                <label className="text-xs text-[#0b1c30] cursor-pointer select-none leading-relaxed">
                  <strong>Mandatory Safeguard Acknowledgment:</strong> I
                  understand that NyayaSetu provides evidence-backed
                  informational clarity for civic empowerment and does not
                  substitute licensed legal counsel under the Advocates Act
                  1961.
                </label>
              </div>
            </section>
          </div>

          {/* ──────────────────────────────────────
              RIGHT 4-COLUMN: SESSION SUMMARY & CTA
              ────────────────────────────────────── */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#0f172a]/5 shadow-md flex flex-col gap-5 sticky top-28">
              {/* Header */}
              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-5 h-5 text-[#d97706]" />
                  <span className="font-editorial font-bold text-base text-[#0b1c30]">
                    Session Manifesto
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#e5eeff] text-[11px] font-semibold text-[#0b1c30]">
                  Active Profile
                </span>
              </div>

              {/* Live Summary Fields */}
              <div className="flex flex-col gap-2.5">
                {/* Language */}
                <div className="p-2.5 rounded-lg bg-[#eff4ff] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Languages className="w-4 h-4 text-[#45464d]" />
                    <span className="text-[10px] uppercase font-bold text-[#64748b]">
                      Language:
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#0b1c30] text-right truncate max-w-[170px]">
                    {selectedLangObj.name}
                    {bilingualEnabled ? " + Bilingual" : ""}
                  </span>
                </div>

                {/* Jurisdiction */}
                <div className="p-2.5 rounded-lg bg-[#eff4ff] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gavel className="w-4 h-4 text-[#45464d]" />
                    <span className="text-[10px] uppercase font-bold text-[#64748b]">
                      Jurisdiction:
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#0b1c30] text-right truncate max-w-[170px]">
                    {jurisdictionOptions.find(
                      (j) => j.value === selectedJurisdiction
                    )?.label.split(" (")[0] || selectedJurisdiction}
                  </span>
                </div>

                {/* Objective */}
                <div className="p-2.5 rounded-lg bg-[#eff4ff] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-[#45464d]" />
                    <span className="text-[10px] uppercase font-bold text-[#64748b]">
                      Objective:
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#0b1c30] text-right truncate max-w-[170px]">
                    {selectedObjective === "understand"
                      ? "Understand & Audit"
                      : selectedObjective === "compare"
                      ? "Compare Drafts"
                      : "Statutory Literacy"}
                  </span>
                </div>

                {/* Document Scope */}
                <div className="p-2.5 rounded-lg bg-[#eff4ff] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#45464d]" />
                    <span className="text-[10px] uppercase font-bold text-[#64748b]">
                      Document Scope:
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#0b1c30] text-right truncate max-w-[170px]">
                    {selectedDomainObj.label}
                  </span>
                </div>

                {/* Privacy Mode */}
                <div className="p-2.5 rounded-lg bg-[#eff4ff] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#45464d]" />
                    <span className="text-[10px] uppercase font-bold text-[#64748b]">
                      Data Retention:
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#d97706] text-right">
                    {selectedPrivacy === "ephemeral"
                      ? "60-Min Ephemeral RAM"
                      : "Local AES-256 Vault"}
                  </span>
                </div>
              </div>

              {/* Primary CTA */}
              {initialized ? (
                <div className="p-4 bg-[#ecfdf5] border border-[#a7f3d0] rounded-xl text-center">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#065f46] mb-1">
                    <Check className="w-4 h-4" />
                    <span>Workspace Successfully Initialized!</span>
                  </div>
                  <p className="text-[11px] text-[#065f46] mb-3">
                    Configured for{" "}
                    {jurisdictionOptions.find(
                      (j) => j.value === selectedJurisdiction
                    )?.label || selectedJurisdiction}{" "}
                    in {selectedLangObj.name}.
                  </p>
                  <Link
                    href="/workspace"
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 bg-[#065f46] text-white font-bold text-xs rounded-lg hover:bg-[#047857] transition-colors shadow-sm"
                  >
                    <span>Enter Analysis Workbench</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={handleInitialize}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#d97706] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:bg-[#b45309] transition-all transform hover:-translate-y-0.5 active:scale-[0.98]"
                  >
                    <span>Launch Grounded Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    className="w-full py-2 px-4 text-[#45464d] hover:text-[#0b1c30] text-xs font-medium transition-colors text-center"
                  >
                    Save Configuration as Default
                  </button>
                </div>
              )}

              {/* Trust Evidence Micro-Checklist */}
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-1.5 text-[11px] text-[#64748b]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#d97706]" />
                  <span>ISO 27001 Cryptographic Sandbox Active</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-[#d97706]" />
                  <span>
                    Cross-examined against Bharatiya Nyaya Sanhita 2023
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#d97706]" />
                  <span>DPDP Act 2023 Statutory Privacy Compliance</span>
                </div>
              </div>
            </div>

            {/* Constitutional Seal Card */}
            <div className="bg-[#eff4ff] p-4 rounded-xl flex items-center gap-3 border border-[#0f172a]/5">
              <Logo className="h-10 w-auto shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-[#64748b] tracking-wider block">
                  NyayaSetu Civic Lexicon
                </span>
                <p className="text-[11px] text-[#0b1c30] leading-tight mt-0.5">
                  Empowering citizens across 22 Scheduled Languages with
                  evidence-grounded legal parity.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Onboarding Footer ─── */}
        <div className="w-full pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#64748b] border-t border-slate-200/60">
          <div className="flex flex-wrap items-center gap-3">
            <a href="#" className="hover:text-[#0b1c30] transition-colors">
              Privacy Charter
            </a>
            <span>•</span>
            <a href="#" className="hover:text-[#0b1c30] transition-colors">
              Terms of Verification
            </a>
            <span>•</span>
            <a href="#" className="hover:text-[#0b1c30] transition-colors">
              BCI Non-Advocacy Compliance
            </a>
            <span>•</span>
            <a href="#" className="hover:text-[#0b1c30] transition-colors">
              Citizen Redressal Desk
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#d97706]" />
            <span>
              NyayaSetu Cryptographic Engine • Bharat Civic Intelligence
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
