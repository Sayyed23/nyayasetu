"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  AlertTriangle,
  MessageSquare,
  GitCompare,
  CheckSquare,
  Languages,
  Clock,
  ShieldCheck,
  FileText,
} from "lucide-react";

interface WorkspaceSubNavProps {
  activeTab?: "studio" | "understand" | "risks" | "ask" | "compare" | "actions" | "multilingual" | "qa" | "deadlines";
  documentName?: string;
}

export default function WorkspaceSubNav({ activeTab, documentName }: WorkspaceSubNavProps) {
  const pathname = usePathname();

  const current =
    activeTab ||
    (pathname?.includes("/understand")
      ? "understand"
      : pathname?.includes("/risks")
      ? "risks"
      : pathname?.includes("/ask")
      ? "ask"
      : pathname?.includes("/compare")
      ? "compare"
      : pathname?.includes("/actions")
      ? "actions"
      : pathname?.includes("/multilingual")
      ? "multilingual"
      : "understand");

  const navItems = [
    {
      id: "understand",
      label: "Understand",
      href: "/workspace",
      icon: BookOpen,
      badge: null,
    },
    {
      id: "risks",
      label: "Check Risks",
      href: "/risks",
      icon: AlertTriangle,
      badge: "3 High • 2 Unusual",
      badgeClass: "bg-[#fee2e2] text-[#b91c1c]",
    },
    {
      id: "ask",
      label: "Ask Grounded Q&A",
      href: "/ask",
      icon: MessageSquare,
      badge: "Live",
      badgeClass: "bg-[#dbeafe] text-[#1d4ed8]",
    },
    {
      id: "compare",
      label: "Compare Versions",
      href: "/compare",
      icon: GitCompare,
      badge: null,
    },
    {
      id: "actions",
      label: "Action Center",
      href: "/actions",
      icon: CheckSquare,
      badge: "5 Pending",
      badgeClass: "bg-[#fef3c7] text-[#b45309]",
    },
    {
      id: "multilingual",
      label: "Multilingual Indic",
      href: "/multilingual",
      icon: Languages,
      badge: "ಕನ್ನಡ / हिन्दी",
      badgeClass: "bg-[#f3e8ff] text-[#7e22ce]",
    },
  ];

  return (
    <div className="w-full bg-[#f8f9ff] border-b border-[#0f172a]/10">
      {/* Top telemetry & metadata strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-2.5 text-xs text-[#64748b]">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-[#0b1c30] transition-colors rounded-sm focus-visible:ring-2 focus-visible:ring-[#d97706] focus-visible:outline-none">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/workspace" className={`transition-colors rounded-sm focus-visible:ring-2 focus-visible:ring-[#d97706] focus-visible:outline-none ${pathname === "/workspace" && !activeTab ? "font-bold text-[#0b1c30]" : "hover:text-[#0b1c30]"}`}>
            Workspace
          </Link>
          <span aria-hidden="true">/</span>
          {documentName && (
            <span className="font-semibold text-[#0b1c30] flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-[#d97706]" aria-hidden="true" />
              {documentName}
            </span>
          )}
          {pathname !== "/workspace" && (
            <>
              <span aria-hidden="true">/</span>
              <span className="text-[#d97706] font-bold capitalize">
                {current === "ask" ? "Grounded Q&A" : current === "multilingual" ? "Multilingual Indic" : current === "actions" ? "Action Center" : current}
              </span>
            </>
          )}
          {pathname === "/workspace" && (
            <>
              <span aria-hidden="true">/</span>
              <span className="text-[#d97706] font-bold">
                {activeTab === "risks"
                  ? "Risks Matrix"
                  : activeTab === "qa"
                  ? "Grounded Q&A"
                  : activeTab === "compare"
                  ? "Version Compare"
                  : activeTab === "deadlines"
                  ? "Action & Deadlines"
                  : "Studio Mode"}
              </span>
            </>
          )}
        </nav>

        {/* Live session status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full border border-[#0f172a]/5 shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-[#d97706]" />
            <span>Session TTL: <strong className="text-[#0b1c30]">48m 10s</strong></span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#ecfdf5] text-[#065f46] px-2.5 py-1 rounded-full font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
            <span>Zero Retraining Guard Active</span>
          </div>
        </div>
      </div>

      {/* Subnav Pills Tab Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3">
        <nav aria-label="Workspace sub-navigation" className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = current === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-[#d97706] focus-visible:ring-offset-2 focus-visible:outline-none ${
                  isActive
                    ? "bg-[#0f172a] text-white shadow-sm"
                    : "bg-white text-[#45464d] hover:bg-[#eff4ff] hover:text-[#0b1c30] border border-[#0f172a]/5"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#d97706]" : "text-[#64748b]"}`} aria-hidden="true" />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive ? "bg-white/20 text-white" : item.badgeClass
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
