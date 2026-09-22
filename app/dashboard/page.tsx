"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import { useAuth } from "@/context/AuthContext";
import {
  FileText,
  Upload,
  ShieldCheck,
  BookOpen,
  AlertTriangle,
  MessageSquare,
  GitCompare,
  CheckSquare,
  Languages,
  Scale,
  Clock,
  ArrowRight,
  Sparkles,
  Lock,
  Layers,
  BarChart3,
  FolderOpen,
  Settings,
  ChevronRight,
  Zap,
} from "lucide-react";

interface UserConfig {
  language?: string;
  jurisdiction?: string;
  domain?: string;
  objective?: string;
  privacy?: string;
}

export default function DashboardPage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [userConfig, setUserConfig] = useState<UserConfig>({});
  const [mounted, setMounted] = useState(false);
  const [lastSession, setLastSession] = useState("No previous session recorded");

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("nyayasetu_user_config");
      if (stored) setUserConfig(JSON.parse(stored));
      const storedSession = localStorage.getItem("nyayasetu_last_session");
      if (storedSession) {
        setLastSession(new Date(storedSession).toLocaleString([], {
          dateStyle: "medium",
          timeStyle: "short",
        }));
      }
      localStorage.setItem("nyayasetu_last_session", new Date().toISOString());
    } catch {
      // Ignore
    }
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push("/auth");
    }
  }, [mounted, isAuthenticated, router]);

  if (!mounted) return null;

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

  const recentDocuments = [
    {
      id: "doc-1",
      name: "Residential_Tenancy_Agreement_Blr_2024.pdf",
      type: "Tenancy Agreement",
      date: "12 Feb 2024",
      pages: 7,
      clauses: 24,
      riskLevel: "high" as const,
      risks: 3,
      status: "Analyzed",
    },
    {
      id: "doc-2",
      name: "Employment_Offer_TCS_2024.pdf",
      type: "Employment Contract",
      date: "08 Feb 2024",
      pages: 12,
      clauses: 31,
      riskLevel: "medium" as const,
      risks: 1,
      status: "Analyzed",
    },
    {
      id: "doc-3",
      name: "NDA_Startup_Draft_v2.pdf",
      type: "Non-Disclosure Agreement",
      date: "02 Feb 2024",
      pages: 4,
      clauses: 9,
      riskLevel: "low" as const,
      risks: 0,
      status: "Clean",
    },
  ];

  const quickActions = [
    {
      title: "Upload & Analyze",
      description: "Upload a new legal document for AI-powered analysis",
      icon: Upload,
      href: "/workspace",
      color: "bg-[#d97706]",
      textColor: "text-white",
      hoverColor: "hover:bg-[#b45309]",
    },
    {
      title: "Recent Analysis",
      description: "Resume your latest document review and risk findings",
      icon: Clock,
      href: "/workspace",
      color: "bg-[#0f172a]",
      textColor: "text-white",
      hoverColor: "hover:bg-[#1e293b]",
    },
    {
      title: "Legal Codex",
      description: "Browse Indian statutory acts and tenant rights",
      icon: Scale,
      href: "/legal-info",
      color: "bg-[#eff4ff]",
      textColor: "text-[#0b1c30]",
      hoverColor: "hover:bg-[#e5eeff]",
    },
    {
      title: "Profile & Settings",
      description: "Manage jurisdiction, language, and privacy preferences",
      icon: Settings,
      href: "/profile",
      color: "bg-[#eff4ff]",
      textColor: "text-[#0b1c30]",
      hoverColor: "hover:bg-[#e5eeff]",
    },
  ];

  const featureCards = [
    {
      title: "Understand",
      description: "Plain-language summaries, clause breakdowns, and obligation mapping",
      icon: BookOpen,
      href: "/understand",
      accentColor: "text-[#d97706]",
      bgAccent: "bg-[#fff7ed]",
    },
    {
      title: "Check Risks",
      description: "Clause-level risk scrutiny with statutory conflict detection",
      icon: AlertTriangle,
      href: "/risks",
      accentColor: "text-[#ba1a1a]",
      bgAccent: "bg-[#fef2f2]",
      badge: "3 Flagged",
    },
    {
      title: "Grounded Q&A",
      description: "AI assistant anchored to your document with zero hallucinations",
      icon: MessageSquare,
      href: "/ask",
      accentColor: "text-[#2563eb]",
      bgAccent: "bg-[#eff6ff]",
      badge: "AI",
    },
    {
      title: "Compare Versions",
      description: "Dual-corpus redline comparison between original and counter-drafts",
      icon: GitCompare,
      href: "/compare",
      accentColor: "text-[#7c3aed]",
      bgAccent: "bg-[#f5f3ff]",
    },
    {
      title: "Action Center",
      description: "Deadlines, obligations, and pre-signing task tracker",
      icon: CheckSquare,
      href: "/actions",
      accentColor: "text-[#059669]",
      bgAccent: "bg-[#ecfdf5]",
      badge: "5 Pending",
    },
    {
      title: "Multilingual Indic",
      description: "Translate analysis into Kannada, Hindi, Tamil, Bengali, and more",
      icon: Languages,
      href: "/multilingual",
      accentColor: "text-[#7e22ce]",
      bgAccent: "bg-[#faf5ff]",
    },
  ];

  const riskColorMap = {
    high: { bg: "bg-[#fef2f2]", text: "text-[#ba1a1a]", dot: "bg-[#ba1a1a]", label: "High Risk" },
    medium: { bg: "bg-[#fff7ed]", text: "text-[#b45309]", dot: "bg-[#d97706]", label: "Medium" },
    low: { bg: "bg-[#ecfdf5]", text: "text-[#065f46]", dot: "bg-[#059669]", label: "Clean" },
  };

  return (
    <DashboardShell>
      {/* Welcome Banner */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pt-8 pb-6 bg-gradient-to-b from-[#eff4ff] to-[#f8f9ff]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#0b1c30] tracking-tight">
                  Welcome back, {user?.name || "Citizen"}
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ecfdf5] text-[#065f46] text-[11px] font-semibold border border-[#a7f3d0]/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
                  DPDP Guard Active
                </span>
              </div>
              <p className="text-sm text-[#45464d] max-w-2xl">
                Your civic legal intelligence workspace. Upload documents, analyze clauses, and
                understand your rights — all grounded in verifiable evidence.
              </p>
              <div className="flex items-center gap-3 mt-1 text-xs text-[#64748b]">
                <span className="flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-[#d97706]" />
                  Jurisdiction: <strong className="text-[#0b1c30]">{jurisdictionLabel}</strong>
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#d97706]" />
                  Ephemeral RAM Processing
                </span>
                <span className="hidden md:flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#d97706]" />
                  Last session: <strong className="text-[#0b1c30]">{lastSession}</strong>
                </span>
              </div>
            </div>

            <Link
              href="/workspace"
              className="self-start lg:self-center inline-flex items-center gap-2 px-5 py-2.5 bg-[#d97706] text-white text-sm font-bold rounded-xl shadow-sm hover:bg-[#b45309] transition-all transform hover:-translate-y-0.5"
            >
              <Upload className="w-4 h-4" />
              <span>Upload New Document</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pb-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                href={action.href}
                className={`group p-5 rounded-2xl border border-[#0f172a]/5 shadow-xs ${action.color} ${action.textColor} ${action.hoverColor} transition-all transform hover:-translate-y-0.5 flex flex-col gap-2`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-base font-bold mt-1">{action.title}</h3>
                <p className={`text-xs leading-relaxed ${action.color === "bg-[#d97706]" ? "text-white/80" : "text-[#45464d]"}`}>
                  {action.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Recent Documents */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <FolderOpen className="w-5 h-5 text-[#d97706]" />
              <h2 className="font-editorial text-lg sm:text-xl font-bold text-[#0b1c30]">
                Recent Documents
              </h2>
            </div>
            <Link
              href="/workspace"
              className="text-xs font-bold text-[#d97706] hover:underline flex items-center gap-1"
            >
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {recentDocuments.map((doc) => {
              const riskStyle = riskColorMap[doc.riskLevel];
              return (
                <Link
                  key={doc.id}
                  href="/workspace"
                  className="group w-full bg-white rounded-2xl p-4 sm:p-5 border border-[#0f172a]/5 shadow-xs hover:shadow-md hover:border-[#d97706]/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-[#eff4ff] flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-[#d97706]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[#0b1c30] truncate group-hover:text-[#d97706] transition-colors">
                        {doc.name}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-[#64748b]">
                        <span>{doc.type}</span>
                        <span>•</span>
                        <span>{doc.pages} pages</span>
                        <span>•</span>
                        <span>{doc.clauses} clauses</span>
                        <span>•</span>
                        <span>{doc.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${riskStyle.bg} ${riskStyle.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${riskStyle.dot}`} />
                      {doc.risks > 0 ? `${doc.risks} Risks` : riskStyle.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#64748b] group-hover:text-[#d97706] transition-colors" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Tools Grid */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2.5 mb-4">
            <Zap className="w-5 h-5 text-[#d97706]" />
            <h2 className="font-editorial text-lg sm:text-xl font-bold text-[#0b1c30]">
              Analysis Tools
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featureCards.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group bg-white rounded-2xl p-5 border border-[#0f172a]/5 shadow-xs hover:shadow-md hover:border-[#d97706]/20 transition-all transform hover:-translate-y-0.5 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl ${card.bgAccent} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${card.accentColor}`} />
                    </div>
                    {card.badge && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${card.bgAccent} ${card.accentColor}`}>
                        {card.badge}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#0b1c30] group-hover:text-[#d97706] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-[#45464d] mt-1 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-[#64748b] group-hover:text-[#d97706] transition-colors mt-auto pt-1">
                    <span>Open Tool</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Session Security Strip */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-[#0f172a]/5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#0b1c30]">
                <ShieldCheck className="w-4.5 h-4.5 text-[#d97706]" />
                <span>Zero-Hallucination Evidence Grounding</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#45464d]">
                <span>•</span>
                <span>All outputs anchored to OCR-verified document text</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-[#065f46] font-semibold bg-[#ecfdf5] px-2.5 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                DPDP Act 2023 Compliant
              </span>
              <span className="font-mono text-[#64748b]">
                BCI Circular 04/2023
              </span>
            </div>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
}
