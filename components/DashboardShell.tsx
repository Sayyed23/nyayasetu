"use client";

import React from "react";
import Header from "@/components/Header";
import WorkspaceSubNav from "@/components/WorkspaceSubNav";
import Footer from "@/components/Footer";

interface DashboardShellProps {
  children: React.ReactNode;
  /** Which sub-nav pill to highlight. If omitted, sub-nav is hidden. */
  activeSubNav?: "studio" | "understand" | "risks" | "ask" | "compare" | "actions" | "multilingual" | "qa" | "deadlines";
  /** Whether to show the WorkspaceSubNav bar. Defaults to false. */
  showSubNav?: boolean;
  documentName?: string;
}

/**
 * Shared layout shell for all authenticated pages.
 * Renders the sticky Header, an optional WorkspaceSubNav,
 * the page content, and the Footer.
 */
export default function DashboardShell({
  children,
  activeSubNav,
  showSubNav = false,
  documentName,
}: DashboardShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
      <Header />

      <main className="flex-1 pt-16 flex flex-col">
        {showSubNav && <WorkspaceSubNav activeTab={activeSubNav} documentName={documentName} />}
        {children}
      </main>

      <Footer />
    </div>
  );
}
