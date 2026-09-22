"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";
import { useAuth } from "@/context/AuthContext";
import {
  Upload,
  Languages,
  User,
  Menu,
  X,
  ShieldCheck,
  ChevronDown,
  LogOut,
  Settings,
  FileText,
  Scale,
  LayoutDashboard,
} from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [workspaceDropdownOpen, setWorkspaceDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");

  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const workspaceDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
      if (workspaceDropdownRef.current && !workspaceDropdownRef.current.contains(event.target as Node)) {
        setWorkspaceDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdowns on route change
  const prevPathname = useRef(pathname);
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      setUserDropdownOpen(false);
      setWorkspaceDropdownOpen(false);
      setMobileMenuOpen(false);
    }
  }, [pathname]);

  // Public Landing / Information links
  const publicNavLinks = [
    { name: "Home", href: "/", active: pathname === "/" },
    { name: "How It Works", href: "/#how-it-works", active: false },
    { name: "Features", href: "/#features", active: false },
    { name: "Legal Information", href: "/legal-info", active: pathname?.startsWith("/legal-info") },
  ];

  // Authenticated primary navigation (clean 4-link layout)
  const authNavLinks = [
    {
      name: "Dashboard",
      href: "/dashboard",
      active: pathname === "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Workspace",
      href: "/workspace",
      active:
        pathname === "/workspace" ||
        pathname?.startsWith("/understand") ||
        pathname?.startsWith("/risks") ||
        pathname?.startsWith("/ask") ||
        pathname?.startsWith("/compare") ||
        pathname?.startsWith("/actions") ||
        pathname?.startsWith("/multilingual"),
      icon: FileText,
    },
    {
      name: "Legal Codex",
      href: "/legal-info",
      active: pathname?.startsWith("/legal-info"),
      icon: Scale,
    },
    {
      name: "Profile",
      href: "/profile",
      active: pathname?.startsWith("/profile"),
      icon: User,
    },
  ];

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    router.push("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#ffffff]/95 backdrop-blur-xl border-b border-[#0f172a]/8 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        {/* Brand Logo & Context */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2 group">
            <Logo className="h-8 w-auto transition-transform group-hover:scale-[1.02]" />
          </Link>
          {isAuthenticated && (
            <span className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#ecfdf5] text-[#065f46] border border-[#a7f3d0]/60">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
              DPDP Sandbox
            </span>
          )}
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {isAuthenticated
            ? authNavLinks.map((link) => {
                const Icon = link.icon;
                if (link.name === "Workspace") {
                  return (
                    <div key={link.name} className="relative" ref={workspaceDropdownRef}>
                      <div className="flex items-center">
                        <Link
                          href={link.href}
                          className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-l-lg transition-all ${
                            link.active
                              ? "bg-[#0f172a] text-white shadow-xs font-bold"
                              : "text-[#45464d] hover:text-[#0b1c30] hover:bg-[#eff4ff]"
                          }`}
                        >
                          <Icon className={`w-3.5 h-3.5 ${link.active ? "text-[#d97706]" : "text-[#64748b]"}`} />
                          <span>{link.name}</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => setWorkspaceDropdownOpen(!workspaceDropdownOpen)}
                          className={`px-1 py-1.5 text-xs rounded-r-lg transition-all flex items-center justify-center ${
                            link.active
                              ? "bg-[#0f172a] text-white shadow-xs"
                              : "text-[#45464d] hover:text-[#0b1c30] hover:bg-[#eff4ff]"
                          }`}
                          aria-expanded={workspaceDropdownOpen}
                          aria-label="Toggle Workspace dropdown menu"
                        >
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${
                              workspaceDropdownOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>

                      {/* Workspace Navigation Dropdown */}
                      {workspaceDropdownOpen && (
                        <div className="absolute left-0 mt-2 w-56 bg-white rounded-2xl border border-[#0f172a]/10 shadow-[0_10px_30px_rgba(15,23,42,0.12)] py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                          <div className="px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#64748b]">
                            Studio Navigation
                          </div>
                          <Link
                            href="/workspace"
                            className="flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-[#0b1c30] hover:bg-[#eff4ff] transition-colors"
                          >
                            <span>Understand (Studio)</span>
                            <span className="text-[10px] font-bold text-[#d97706] bg-[#fffbeb] px-1.5 py-0.5 rounded">Active</span>
                          </Link>
                          <Link
                            href="/risks"
                            className="flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-[#0b1c30] hover:bg-[#eff4ff] transition-colors"
                          >
                            <span>Check Risks</span>
                            <span className="text-[10px] font-bold text-[#ba1a1a] bg-[#fee2e2] px-1.5 py-0.5 rounded">3 High</span>
                          </Link>
                          <Link
                            href="/ask"
                            className="flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-[#0b1c30] hover:bg-[#eff4ff] transition-colors"
                          >
                            <span>Ask Grounded Q&A</span>
                            <span className="text-[10px] font-bold text-[#1d4ed8] bg-[#dbeafe] px-1.5 py-0.5 rounded">Live</span>
                          </Link>
                          <Link
                            href="/compare"
                            className="flex items-center px-3.5 py-2 text-xs font-semibold text-[#0b1c30] hover:bg-[#eff4ff] transition-colors"
                          >
                            <span>Compare Versions</span>
                          </Link>
                          <Link
                            href="/actions"
                            className="flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-[#0b1c30] hover:bg-[#eff4ff] transition-colors"
                          >
                            <span>Action Center</span>
                            <span className="text-[10px] font-bold text-[#b45309] bg-[#fef3c7] px-1.5 py-0.5 rounded">5 Pending</span>
                          </Link>
                          <Link
                            href="/multilingual"
                            className="flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-[#0b1c30] hover:bg-[#eff4ff] transition-colors"
                          >
                            <span>Multilingual Indic</span>
                            <span className="text-[10px] font-bold text-[#7e22ce] bg-[#f3e8ff] px-1.5 py-0.5 rounded">ಕನ್ನಡ/हिन्दी</span>
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      link.active
                        ? "bg-[#0f172a] text-white shadow-xs font-bold"
                        : "text-[#45464d] hover:text-[#0b1c30] hover:bg-[#eff4ff]"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${link.active ? "text-[#d97706]" : "text-[#64748b]"}`} />
                    <span>{link.name}</span>
                  </Link>
                );
              })
            : publicNavLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    link.active
                      ? "bg-[#eff4ff] text-[#0b1c30] font-bold"
                      : "text-[#45464d] hover:text-[#0b1c30] hover:bg-[#eff4ff]/60"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Language Selector */}
          <div className="relative flex items-center bg-[#eff4ff] px-2.5 py-1 rounded-lg border border-[#0f172a]/5 text-xs font-semibold text-[#0b1c30]">
            <Languages className="w-3.5 h-3.5 text-[#45464d] mr-1.5 shrink-0" />
            <select
              aria-label="Select Regional Language"
              value={currentLang}
              onChange={(e) => setCurrentLang(e.target.value)}
              className="bg-transparent text-xs font-semibold text-[#0b1c30] focus:outline-none cursor-pointer pr-1"
            >
              <option value="en">English (India)</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="ta">தமிழ் (Tamil)</option>
              <option value="bn">বাংলা (Bengali)</option>
              <option value="mr">मराठी (Marathi)</option>
              <option value="te">తెలుగు (Telugu)</option>
              <option value="gu">ગુજરાતી (Gujarati)</option>
              <option value="kn">ಕನ್ನಡ (Kannada)</option>
            </select>
          </div>

          {/* If NOT Authenticated: Sign In & Upload / Get Started CTA */}
          {!isAuthenticated ? (
            <>
              <Link
                href="/auth"
                className="hidden sm:inline-flex px-3 py-1.5 text-xs font-semibold text-[#0b1c30] hover:bg-[#eff4ff] rounded-lg transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/onboarding"
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#d97706] text-white text-xs font-bold rounded-lg shadow-xs hover:bg-[#b45309] transition-all transform hover:-translate-y-0.5"
              >
                <Upload className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Get Started / Upload</span>
                <span className="sm:hidden">Upload</span>
              </Link>
            </>
          ) : (
            /* If AUTHENTICATED: Clean New Document CTA + User Account Menu */
            <>
              <Link
                href="/workspace"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#d97706] text-white text-xs font-bold rounded-lg shadow-xs hover:bg-[#b45309] transition-all transform hover:-translate-y-0.5"
                title="Upload another document or start a new analysis"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>New Analysis</span>
              </Link>

              {/* User Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1 pl-1.5 sm:pr-2.5 rounded-full sm:rounded-xl bg-[#eff4ff] hover:bg-[#e0eaff] border border-[#0f172a]/8 transition-all focus:outline-none"
                  aria-expanded={userDropdownOpen}
                  aria-label="User profile menu"
                >
                  <div className="w-7 h-7 rounded-full bg-[#0f172a] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {user?.avatarText || "PN"}
                  </div>
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs font-bold text-[#0b1c30] leading-none truncate max-w-[100px]">
                      {user?.name || "Priya Narayan"}
                    </span>
                    <span className="text-[10px] text-[#64748b] leading-none mt-0.5">
                      Verified
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#64748b] hidden sm:block transition-transform duration-200 ${
                      userDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu Modal */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-[#0f172a]/10 shadow-[0_10px_30px_rgba(15,23,42,0.12)] py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    {/* User summary */}
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-xs font-bold text-[#0b1c30] truncate">
                        {user?.name || "Priya Narayan"}
                      </p>
                      <p className="text-[11px] text-[#64748b] truncate mt-0.5">
                        {user?.email || "priya.narayan@citizen.nyayasetu.in"}
                      </p>
                      <div className="mt-2 flex items-center gap-1.5 text-[10px] font-semibold text-[#065f46] bg-[#ecfdf5] px-2 py-0.5 rounded-md w-fit">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Aadhaar / DPDP Guard Active</span>
                      </div>
                    </div>

                    {/* Quick navigation links */}
                    <div className="py-1">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#0b1c30] hover:bg-[#eff4ff] transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-[#d97706]" />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        href="/profile"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#0b1c30] hover:bg-[#eff4ff] transition-colors"
                      >
                        <User className="w-4 h-4 text-[#64748b]" />
                        <span>Citizen Profile & KYC</span>
                      </Link>
                      <Link
                        href="/profile"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#0b1c30] hover:bg-[#eff4ff] transition-colors"
                      >
                        <Settings className="w-4 h-4 text-[#64748b]" />
                        <span>Jurisdiction & Dialects</span>
                      </Link>
                      <Link
                        href="/legal-info"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#0b1c30] hover:bg-[#eff4ff] transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4 text-[#64748b]" />
                        <span>Statutory Legal Codex</span>
                      </Link>
                    </div>

                    {/* Actions divider */}
                    <div className="border-t border-slate-100 pt-1">
                      <Link
                        href="/workspace"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#d97706] hover:bg-[#fffbeb] transition-colors"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Upload New Document</span>
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#ba1a1a] hover:bg-[#fef2f2] transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-[#45464d] hover:text-[#0b1c30] rounded-lg"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-[#0b1c30]" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#0f172a]/10 px-4 py-3 space-y-1 shadow-lg">
          {isAuthenticated ? (
            <>
              <div className="pb-2 mb-2 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#0f172a] text-white text-xs font-bold flex items-center justify-center">
                    {user?.avatarText || "PN"}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0b1c30]">{user?.name || "Priya Narayan"}</p>
                    <p className="text-[10px] text-[#64748b]">{user?.email || "Citizen Enclave Active"}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-xs font-bold text-[#ba1a1a] px-2 py-1 bg-[#fef2f2] rounded-md"
                >
                  Sign Out
                </button>
              </div>

              <div className="grid grid-cols-2 gap-1.5 py-1">
                {authNavLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg ${
                        link.active
                          ? "bg-[#0f172a] text-white font-bold"
                          : "text-[#45464d] hover:text-[#0b1c30] hover:bg-[#eff4ff]"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 text-[#d97706]" />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-semibold text-[#0b1c30] hover:underline flex items-center gap-1"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Profile & Settings</span>
                </Link>
                <Link
                  href="/workspace"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-bold text-[#d97706] hover:underline flex items-center gap-1"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>New Document</span>
                </Link>
              </div>
            </>
          ) : (
            <>
              {publicNavLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 text-xs font-semibold rounded-lg ${
                    link.active
                      ? "bg-[#eff4ff] text-[#0b1c30] font-bold"
                      : "text-[#45464d] hover:text-[#0b1c30] hover:bg-[#eff4ff]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-[#64748b]">12+ Indic Languages</span>
                <Link
                  href="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-bold text-[#d97706] hover:underline"
                >
                  Sign In →
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
}
