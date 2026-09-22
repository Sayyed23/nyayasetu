"use client";

import React, { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import {
  User,
  Shield,
  ShieldCheck,
  Languages,
  Gavel,
  Scale,
  MemoryStick as Memory,
  Timer,
  Lock,
  RefreshCw,
  Trash2,
  Copy,
  Check,
  Bell,
  HelpCircle,
  Key,
  Smartphone,
  Laptop,
  AlertTriangle,
  Download,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Info,
  CheckCircle2,
  FileText,
  Building,
} from "lucide-react";

export default function ProfileSettingsPage() {
  const [activeTab, setActiveTab] = useState("section-profile");
  const [copiedProof, setCopiedProof] = useState(false);
  const [purgeSuccess, setPurgeSuccess] = useState(false);
  const [showPurgeModal, setShowPurgeModal] = useState(false);

  // Profile fields state
  const [firstName, setFirstName] = useState("Ananya");
  const [lastName, setLastName] = useState("Sen");
  const [email, setEmail] = useState("ananya.sen@citizen.nyayasetu.in");
  const [interfaceLang, setInterfaceLang] = useState("en");
  const [vocabLevel, setVocabLevel] = useState("citizen");
  const [dualModeLang, setDualModeLang] = useState("kannada");
  const [preserveCanonicalTerms, setPreserveCanonicalTerms] = useState(true);
  const [selectedJurisdiction, setSelectedJurisdiction] = useState("karnataka");
  const [ephemeralTTL, setEphemeralTTL] = useState("60");
  const [ephemeralMode, setEphemeralMode] = useState(true);
  const [detectionMode, setDetectionMode] = useState("auto");
  const [savedAlert, setSavedAlert] = useState(false);

  const copySessionProof = () => {
    navigator.clipboard.writeText("e4a7..91f8::DPDP2023-VERIFIED::SHA256-IN-GOV-HSM");
    setCopiedProof(true);
    setTimeout(() => setCopiedProof(false), 2000);
  };

  const handlePurgeEnclave = () => {
    setShowPurgeModal(false);
    setPurgeSuccess(true);
    setTimeout(() => setPurgeSuccess(false), 4000);
  };

  const handleSaveSettings = () => {
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2500);
  };

  const navItems = [
    { id: "section-profile", label: "Profile & Citizen UID", icon: User },
    { id: "section-account", label: "Account & Security Auth", icon: Lock },
    { id: "section-languages", label: "Indic Dialect & Plain Language", icon: Languages },
    { id: "section-jurisdiction", label: "Jurisdiction & State Corpus", icon: Gavel },
    { id: "section-document-enclave", label: "DPDP Ephemeral RAM Enclave", icon: Memory },
    { id: "section-privacy-security", label: "Zero-Retraining Charter", icon: ShieldCheck },
    { id: "section-notifications", label: "Statutory Alert Channels", icon: Bell },
    { id: "section-legal-trust", label: "Advocates Act & Trust Limits", icon: Scale },
    { id: "section-help", label: "Help & Statutory Redressal", icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
      {/* 1. TOP GLOBAL NAVIGATION */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-[#0f172a]/5 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="h-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <Logo className="h-9 w-auto transition-transform group-hover:scale-[1.02]" />
            </Link>
            <div className="hidden sm:flex flex-col border-l border-[#0f172a]/10 pl-3">
              <span className="text-sm font-bold tracking-tight text-[#0b1c30]">NyayaSetu</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b]">
                Legal Intelligence Settings
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-[#45464d]">
              <Link href="/workspace" className="px-3 py-1.5 rounded-lg hover:bg-[#eff4ff] hover:text-[#0b1c30] transition-colors">
                Workspace
              </Link>
              <Link href="/legal-info" className="px-3 py-1.5 rounded-lg hover:bg-[#eff4ff] hover:text-[#0b1c30] transition-colors">
                Legal Codex
              </Link>
              <Link href="/auth" className="px-3 py-1.5 rounded-lg hover:bg-[#eff4ff] hover:text-[#0b1c30] transition-colors">
                Switch Account
              </Link>
            </nav>

            <div className="flex items-center gap-2 bg-[#eff4ff] px-2.5 py-1 rounded-full text-xs font-semibold text-[#059669]">
              <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse"></span>
              <span className="hidden sm:inline">Ephemeral RAM Active</span>
            </div>

            <div className="w-8 h-8 rounded-full bg-[#0f172a] text-white flex items-center justify-center font-bold text-xs">
              AS
            </div>
          </div>
        </div>

        {/* Sub-Header Breadcrumb */}
        <div className="w-full bg-[#f1f5f9]/80 border-t border-[#0f172a]/5 px-4 sm:px-6 lg:px-8 py-1.5 text-xs text-[#64748b]">
          <div className="max-w-7xl mx-auto flex items-center gap-1.5">
            <Link href="/" className="hover:text-[#0b1c30]">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#94a3b8]" />
            <span className="hover:text-[#0b1c30]">Settings</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#94a3b8]" />
            <span className="text-[#0b1c30] font-bold">Profile & Account Preferences</span>
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Notification Alert if Settings Saved */}
          {savedAlert && (
            <div className="mb-6 p-4 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] text-[#065f46] text-xs font-bold flex items-center justify-between shadow-sm animate-fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                <span>Governance preferences updated and synchronized with ephemeral RAM enclave.</span>
              </div>
              <span className="text-[10px] text-[#059669]/70">Zero external logs written</span>
            </div>
          )}

          {/* Purge Alert */}
          {purgeSuccess && (
            <div className="mb-6 p-4 rounded-xl bg-[#fef2f2] border border-[#fecaca] text-[#ba1a1a] text-xs font-bold flex items-center gap-2 shadow-sm animate-fade-in">
              <Trash2 className="w-4 h-4 text-[#ba1a1a]" />
              <span>All volatile document memory purged. Working cryptographic keys re-generated successfully.</span>
            </div>
          )}

          {/* Page Context Sub-Header */}
          <div className="w-full bg-white rounded-2xl p-6 sm:p-7 border border-[#0f172a]/8 shadow-sm mb-8 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
            <div className="max-w-3xl space-y-2">
              <div className="flex items-center gap-2 text-[#d97706] text-xs font-bold uppercase tracking-wider">
                <Shield className="w-4 h-4" />
                <span>Statutory Governance Enclave • Act 22 of 2023 Compliant</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0b1c30] tracking-tight">
                Citizen Profile & Platform Governance Settings
              </h1>
              <p className="text-xs sm:text-sm text-[#45464d] leading-relaxed">
                Manage your verified citizen identity, Indic legal dialect engines, regional jurisdiction corpus
                mounting, and DPDP Act 2023 zero-retention cryptographic RAM boundaries.
              </p>
            </div>

            {/* Live Session Sandbox Token Badge */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3.5 bg-[#f8f9ff] rounded-xl border border-[#0f172a]/5 shrink-0">
              <div className="w-10 h-10 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#d97706] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse"></span>
                  <span className="text-xs font-bold text-[#0b1c30]">Ephemeral Air-Gapped Sandbox Active</span>
                </div>
                <span className="text-[11px] text-[#64748b] font-mono mt-0.5">
                  RAM Proof: <strong className="text-[#0b1c30]">e4a7..91f8::DPDP2023</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={copySessionProof}
                className="ml-auto px-3 py-1.5 rounded-lg bg-white border border-[#cbd5e1] hover:bg-[#eff4ff] text-xs font-bold text-[#0b1c30] flex items-center gap-1 shadow-2xs transition-all"
              >
                {copiedProof ? <Check className="w-3.5 h-3.5 text-[#059669]" /> : <Copy className="w-3.5 h-3.5 text-[#64748b]" />}
                <span>{copiedProof ? "Copied" : "Copy Proof"}</span>
              </button>
            </div>
          </div>

          {/* Master 2-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sticky Navigation Rail (3 columns) */}
            <aside className="lg:col-span-3 sticky top-36 space-y-4">
              <div className="bg-white rounded-2xl p-4 border border-[#0f172a]/8 shadow-sm space-y-1">
                <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">
                  Settings Navigation
                </div>
                <nav className="space-y-0.5">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={() => setActiveTab(item.id)}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                          isActive
                            ? "bg-[#0f172a] text-white shadow-sm"
                            : "text-[#45464d] hover:bg-[#f8f9ff] hover:text-[#0b1c30]"
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? "text-[#d97706]" : "text-[#64748b]"}`} />
                        <span>{item.label}</span>
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Ephemeral Session Health Widget */}
              <div className="p-4 bg-white rounded-2xl border border-[#0f172a]/8 shadow-sm space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0b1c30] uppercase tracking-wider">RAM Integrity</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#ecfdf5] text-[#065f46] text-[10px] font-bold">
                    100% Volatile
                  </span>
                </div>
                <p className="text-[11px] text-[#64748b] leading-relaxed">
                  Zero disk persistence. Current cryptographic working keys will be automatically cleared upon session TTL expiry.
                </p>
                <div className="w-full bg-[#f1f5f9] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#d97706] h-1.5 rounded-full w-5/6"></div>
                </div>
                <div className="flex justify-between items-center text-[10px] text-[#64748b] font-mono">
                  <span>Inactivity timer</span>
                  <span className="text-[#0b1c30] font-bold">51m 42s left</span>
                </div>
              </div>
            </aside>

            {/* Main Configuration Canvas (9 columns) */}
            <div className="lg:col-span-9 space-y-8">
              {/* CARD 1: User Profile Header Card */}
              <section id="section-profile" className="bg-white rounded-2xl border border-[#0f172a]/8 shadow-sm overflow-hidden scroll-mt-36">
                <div className="p-6 sm:p-7 bg-gradient-to-r from-[#eff4ff] via-white to-[#f8f9ff] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-[#0f172a]/5">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#0f172a] text-white flex items-center justify-center font-bold text-xl shadow-md ring-4 ring-white">
                      AS
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0b1c30]">{firstName} {lastName}</h2>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ecfdf5] text-[#065f46] text-xs font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          DigiLocker Verified
                        </span>
                      </div>
                      <div className="text-xs text-[#64748b] flex items-center gap-3 flex-wrap">
                        <span>{email}</span>
                        <span>•</span>
                        <span>Bengaluru Urban, Karnataka</span>
                      </div>
                      <div className="text-[11px] font-mono text-[#64748b] pt-0.5">
                        Citizen UID: <span className="text-[#0b1c30] font-bold bg-white px-2 py-0.5 rounded border border-[#0f172a]/10">NS-BLR-2024-8841-IND</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
                    <span className="px-2.5 py-1 rounded-md bg-[#fffbeb] text-[#92400e] text-xs font-bold uppercase tracking-wider">
                      Civic Public Tier • Free
                    </span>
                    <span className="text-[11px] text-[#64748b]">Member since Nov 2023</span>
                    <button
                      type="button"
                      onClick={() => alert("Connecting to State Legal Aid Services (NALSA / DLSA) portal...")}
                      className="px-3.5 py-1.5 rounded-lg bg-[#0f172a] text-white text-xs font-bold hover:bg-[#1e293b] flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <Scale className="w-3.5 h-3.5 text-[#d97706]" />
                      <span>Connect Legal Aid (NALSA)</span>
                    </button>
                  </div>
                </div>
              </section>

              {/* CARD 2: Citizen Account & Authentication */}
              <section id="section-account" className="bg-white rounded-2xl border border-[#0f172a]/8 shadow-sm p-6 sm:p-7 space-y-6 scroll-mt-36">
                <div className="flex items-center justify-between pb-3 border-b border-[#0f172a]/5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#0b1c30]">
                      <User className="w-5 h-5 text-[#d97706]" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-lg text-[#0b1c30]">Citizen Account & Identity</h3>
                      <p className="text-xs text-[#64748b]">Manage personal details and verification parameters</p>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded bg-[#f1f5f9] text-[#0b1c30] font-semibold">
                    Aadhaar Linked via UIDAI e-KYC
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0b1c30]">First Given Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-[#cbd5e1] text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#d97706]/30 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0b1c30]">Family / Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-[#cbd5e1] text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#d97706]/30 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0b1c30]">Primary Civic Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-[#cbd5e1] text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#d97706]/30 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0b1c30]">Registered Mobile (OTP Bound)</label>
                    <input
                      type="text"
                      defaultValue="+91 98450 •••••"
                      disabled
                      className="w-full h-11 px-3.5 rounded-xl border border-[#cbd5e1] bg-[#f8f9ff] text-sm text-[#64748b] cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* 2FA and Session Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#f8f9ff] border border-[#0f172a]/5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0b1c30] flex items-center gap-1.5">
                        <Smartphone className="w-4 h-4 text-[#d97706]" />
                        Two-Factor Authentication
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#ecfdf5] text-[#065f46] text-[10px] font-bold">
                        Enforced
                      </span>
                    </div>
                    <p className="text-xs text-[#64748b]">
                      Enforced via Aadhaar OTP and hardware passkeys for all unredacted document scrutiny actions.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#f8f9ff] border border-[#0f172a]/5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0b1c30] flex items-center gap-1.5">
                        <Laptop className="w-4 h-4 text-[#0f172a]" />
                        Active Login Session
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#059669]"></span>
                    </div>
                    <p className="text-xs text-[#64748b]">
                      1 active desktop instance • Chrome 128 (Windows) • Bengaluru IP: 103.21.72.19
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={handleSaveSettings}
                    className="px-5 py-2.5 rounded-xl bg-[#0f172a] text-white text-xs font-bold hover:bg-[#1e293b] transition-all shadow-sm"
                  >
                    Save Account Changes
                  </button>
                </div>
              </section>

              {/* CARD 3: Indic Dialect & Legal Simplification */}
              <section id="section-languages" className="bg-white rounded-2xl border border-[#0f172a]/8 shadow-sm p-6 sm:p-7 space-y-6 scroll-mt-36">
                <div className="flex items-center justify-between pb-3 border-b border-[#0f172a]/5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#d97706]">
                      <Languages className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-lg text-[#0b1c30]">Indic Dialect & Plain Language</h3>
                      <p className="text-xs text-[#64748b]">Set vocabulary simplification level and regional vernacular glossaries</p>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded bg-[#eff4ff] text-[#0b1c30] font-semibold">
                    8 Scheduled Languages
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0b1c30]">1. Platform Interface Language</label>
                    <select
                      value={interfaceLang}
                      onChange={(e) => setInterfaceLang(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-[#cbd5e1] text-xs font-semibold text-[#0b1c30] bg-white focus:ring-2 focus:ring-[#d97706]/30 focus:outline-none"
                    >
                      <option value="en">English (India) • Official Legal Standard</option>
                      <option value="hi">हिंदी (Hindi • Central India)</option>
                      <option value="kn">ಕನ್ನಡ (Kannada • Karnataka Bench)</option>
                      <option value="ta">தமிழ் (Tamil • Madras Bench)</option>
                      <option value="te">తెలుగు (Telugu • Telangana & AP)</option>
                      <option value="mr">मराठी (Marathi • Bombay Bench)</option>
                      <option value="bn">বাংলা (Bengali • Calcutta Bench)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0b1c30]">2. Simplification Vocabulary Level</label>
                    <select
                      value={vocabLevel}
                      onChange={(e) => setVocabLevel(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-[#cbd5e1] text-xs font-semibold text-[#0b1c30] bg-white focus:ring-2 focus:ring-[#d97706]/30 focus:outline-none"
                    >
                      <option value="citizen">Citizen Plain Language (Conversational)</option>
                      <option value="semitech">Semi-Technical (Para-Legal / Law Student)</option>
                      <option value="formal">Formal Statutory Verbatim (Advocates)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0b1c30]">3. Scrutiny Dual-Mode Language</label>
                    <select
                      value={dualModeLang}
                      onChange={(e) => setDualModeLang(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-[#cbd5e1] text-xs font-semibold text-[#0b1c30] bg-white focus:ring-2 focus:ring-[#d97706]/30 focus:outline-none"
                    >
                      <option value="kannada">Dual-Mode: English + Kannada (ಕನ್ನಡ)</option>
                      <option value="hindi">Dual-Mode: English + Hindi (हिंदी)</option>
                      <option value="tamil">Dual-Mode: English + Tamil (தமிழ்)</option>
                      <option value="english">Monolingual English Only</option>
                    </select>
                  </div>
                </div>

                {/* Live Vocabulary Mapping Sample */}
                <div className="p-4 rounded-xl bg-[#f8f9ff] border border-[#0f172a]/5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-[#0b1c30] uppercase tracking-wider">Live Vocabulary Mapping Sample (Tenancy Deed)</span>
                    <span className="text-[#d97706]">Engine: Indic-Nyaya-v4</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div className="p-3 bg-white rounded-lg border border-[#cbd5e1]">
                      <span className="text-[11px] font-bold text-[#ba1a1a]">Raw Deed Legalese:</span>
                      <p className="text-xs text-[#45464d] italic mt-1">
                        &quot;The Lessee shall indemnify and hold harmless the Lessor against all distraints, forfeitures, and statutory encumbrances arising ex-delicto.&quot;
                      </p>
                    </div>
                    <div className="p-3 bg-[#eff4ff] rounded-lg border border-[#0f172a]/5">
                      <span className="text-[11px] font-bold text-[#d97706]">Citizen Plain-Language Output:</span>
                      <p className="text-xs text-[#0b1c30] mt-1 font-medium">
                        &quot;ನಿಮ್ಮಿಂದ (ಬಾಡಿಗೆದಾರರಿಂದ) ಯಾವುದೇ ಕಾನೂನು ತೊಂದರೆ ಅಥವಾ ದಂಡ ಬಂದರೆ, ಅದಕ್ಕೆ ಮಾಲೀಕರು ಜವಾಬ್ದಾರರಲ್ಲ; ನೀವೇ ಭರಿಸಬೇಕು.&quot;
                        <span className="block text-[#64748b] text-[11px] mt-1">
                          (You compensate the owner for any fines caused directly by your tenancy).
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Canonical Terminology Preservation Toggle */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-[#f8f9ff] border border-[#0f172a]/5">
                  <div className="space-y-0.5 pr-4">
                    <div className="text-xs font-bold text-[#0b1c30] flex items-center gap-2">
                      <span>Preserve Canonical Statutory Terminology alongside vernacular translation</span>
                      <span className="px-2 py-0.5 rounded bg-[#fffbeb] text-[#92400e] text-[10px] font-bold">
                        Recommended
                      </span>
                    </div>
                    <p className="text-xs text-[#64748b]">
                      Maintains original English phrases (e.g. &quot;Mesne Profits&quot;, &quot;Force Majeure&quot;) in footnotes to prevent distortion during court presentation.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preserveCanonicalTerms}
                    onChange={(e) => setPreserveCanonicalTerms(e.target.checked)}
                    className="w-5 h-5 rounded border-[#cbd5e1] text-[#0f172a] focus:ring-[#d97706] cursor-pointer"
                  />
                </div>
              </section>

              {/* CARD 4: Jurisdiction Preferences & Mounted Corpus */}
              <section id="section-jurisdiction" className="bg-white rounded-2xl border border-[#0f172a]/8 shadow-sm p-6 sm:p-7 space-y-6 scroll-mt-36">
                <div className="flex items-center justify-between pb-3 border-b border-[#0f172a]/5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#d97706]">
                      <Gavel className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-lg text-[#0b1c30]">Jurisdiction & Regional Corpus</h3>
                      <p className="text-xs text-[#64748b]">Bind legal scrutiny to specific High Court benches and local state acts</p>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded bg-[#eff4ff] text-[#0b1c30] font-semibold">
                    Active: Karnataka Bench
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0b1c30]">Sovereign Central Corpus</label>
                    <div className="h-11 px-3.5 rounded-xl border border-[#cbd5e1] bg-[#f8f9ff] text-xs font-semibold text-[#0b1c30] flex items-center justify-between">
                      <span>India (Central Bare Acts)</span>
                      <span className="text-[10px] text-[#059669] font-bold">Pre-Mounted ✓</span>
                    </div>
                    <p className="text-[11px] text-[#64748b]">
                      Bharatiya Nyaya Sanhita 2023, Contract Act 1872, Transfer of Property Act 1882.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0b1c30]">Primary State / UT Legal Corpus</label>
                    <select
                      value={selectedJurisdiction}
                      onChange={(e) => setSelectedJurisdiction(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-[#cbd5e1] text-xs font-semibold text-[#0b1c30] bg-white focus:ring-2 focus:ring-[#d97706]/30 focus:outline-none"
                    >
                      <option value="karnataka">Karnataka (High Court of Karnataka • Bengaluru Urban)</option>
                      <option value="delhi">Delhi (High Court of Delhi • NCT Region)</option>
                      <option value="maharashtra">Maharashtra (Bombay High Court • Mumbai/Pune)</option>
                      <option value="tamilnadu">Tamil Nadu (Madras High Court • Chennai)</option>
                      <option value="telangana">Telangana (High Court of Telangana • Hyderabad)</option>
                      <option value="westbengal">West Bengal (Calcutta High Court • Kolkata)</option>
                    </select>
                    <p className="text-[11px] text-[#64748b]">
                      Mounts local rent control acts, stamp duty rates, and municipal dispute rules.
                    </p>
                  </div>
                </div>

                {/* Mounted Acts Badges */}
                <div className="p-4 rounded-xl bg-[#f8f9ff] border border-[#0f172a]/5 space-y-2">
                  <span className="text-xs font-bold text-[#0b1c30] uppercase tracking-wider block">
                    Actively Mounted Regional Acts in Session Memory:
                  </span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      "Karnataka Rent Act, 1999",
                      "Model Tenancy Act 2021 (Karnataka)",
                      "Sakala Services Act, 2011",
                      "K-RERA Rules 2017",
                      "Karnataka Stamp Act, 1957",
                    ].map((act) => (
                      <span
                        key={act}
                        className="px-2.5 py-1 rounded-lg bg-white border border-[#cbd5e1] text-xs font-semibold text-[#0b1c30] flex items-center gap-1.5 shadow-2xs"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
                        <span>{act}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </section>

              {/* CARD 5: DPDP Ephemeral RAM Enclave */}
              <section id="section-document-enclave" className="bg-white rounded-2xl border border-[#0f172a]/8 shadow-sm p-6 sm:p-7 space-y-6 scroll-mt-36">
                <div className="flex items-center justify-between pb-3 border-b border-[#0f172a]/5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#d97706]">
                      <Memory className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-lg text-[#0b1c30]">DPDP Act 2023 Ephemeral RAM Enclave</h3>
                      <p className="text-xs text-[#64748b]">Zero-retention architecture safeguarding your evidentiary sovereignty</p>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-md bg-[#ecfdf5] text-[#065f46] font-bold">
                    Zero-Persistence Mode
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#f8f9ff] border border-[#0f172a]/5 space-y-2">
                    <label className="text-xs font-bold text-[#0b1c30] block">RAM Session Lifetime (TTL)</label>
                    <select
                      value={ephemeralTTL}
                      onChange={(e) => setEphemeralTTL(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-[#cbd5e1] text-xs font-semibold text-[#0b1c30] bg-white focus:ring-2 focus:ring-[#d97706]/30 focus:outline-none"
                    >
                      <option value="15">15 Minutes (Strict Security Mode)</option>
                      <option value="30">30 Minutes (Standard Review Mode)</option>
                      <option value="60">60 Minutes (Deep Analysis Mode)</option>
                      <option value="120">120 Minutes (Chamber Session Mode)</option>
                    </select>
                    <p className="text-[11px] text-[#64748b]">
                      Documents are deleted from RAM after this inactivity period.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#fef2f2] border border-[#fecaca] space-y-2 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#ba1a1a] block">Manual Emergency RAM Flush</span>
                      <p className="text-[11px] text-[#7f1d1d] mt-1">
                        Immediately purges all OCR vectors, text caches, and temporary cryptographic keys from memory.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPurgeModal(true)}
                      className="w-full h-10 rounded-lg bg-[#ba1a1a] text-white text-xs font-bold hover:bg-[#991b1b] flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Purge All Enclave Data Now</span>
                    </button>
                  </div>
                </div>
              </section>

              {/* CARD 6: Advocates Act & Zero-Retraining Charter */}
              <section id="section-privacy-security" className="bg-white rounded-2xl border border-[#0f172a]/8 shadow-sm p-6 sm:p-7 space-y-4 scroll-mt-36">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#d97706]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#0b1c30]">Zero Model Retraining Charter</h3>
                    <p className="text-xs text-[#64748b]">Statutory commitment under DPDP Act 2023 Section 6</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-[#45464d] leading-relaxed">
                  <div className="p-3.5 bg-[#f8f9ff] rounded-xl border border-[#0f172a]/5 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                    <p>
                      <strong>No LLM Fine-Tuning:</strong> Documents uploaded to NyayaSetu are NEVER used to train, evaluate, or fine-tune public or proprietary AI models.
                    </p>
                  </div>
                  <div className="p-3.5 bg-[#f8f9ff] rounded-xl border border-[#0f172a]/5 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                    <p>
                      <strong>Advocates Act 1961 Compliance:</strong> NyayaSetu is an educational legal literacy tool. We strictly uphold lawyer-client privilege and do not solicit or practice law under Sections 29 & 30.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* EMERGENCY PURGE CONFIRMATION MODAL */}
      {showPurgeModal && (
        <div className="fixed inset-0 z-50 bg-[#0f172a]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#0f172a]/10 space-y-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#fee2e2] text-[#ba1a1a] flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#0b1c30]">Confirm Memory Purge</h3>
                <p className="text-xs text-[#64748b]">Volatile Enclave Destruction</p>
              </div>
            </div>
            <p className="text-xs text-[#45464d] leading-relaxed">
              Are you sure you want to flush all active RAM session data? Any unsaved Q&A drafts or redline comparisons will be instantly overwritten with zero possibility of recovery.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowPurgeModal(false)}
                className="px-4 py-2 rounded-lg border border-[#cbd5e1] text-xs font-bold text-[#0b1c30] hover:bg-[#f8f9ff]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePurgeEnclave}
                className="px-4 py-2 rounded-lg bg-[#ba1a1a] text-white text-xs font-bold hover:bg-[#991b1b] flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Yes, Purge Immediately</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. MINIMAL FOOTER */}
      <footer className="w-full bg-white border-t border-[#0f172a]/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#64748b]">
          <p>© 2025 NyayaSetu Civic Intelligence Platform • DPDP Act 2023 Compliant</p>
          <div className="flex items-center gap-4">
            <Link href="/auth" className="hover:text-[#0b1c30]">Authentication</Link>
            <span className="text-[#cbd5e1]">•</span>
            <Link href="/workspace" className="hover:text-[#0b1c30]">Workspace</Link>
            <span className="text-[#cbd5e1]">•</span>
            <Link href="/legal-info" className="hover:text-[#0b1c30]">Statutory Codex</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
