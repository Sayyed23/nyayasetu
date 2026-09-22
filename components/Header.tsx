"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { Upload, Languages, User, Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const pathname = usePathname();

  const isWorkspaceActive =
    pathname?.startsWith("/workspace") ||
    pathname?.startsWith("/understand") ||
    pathname?.startsWith("/risks") ||
    pathname?.startsWith("/ask") ||
    pathname?.startsWith("/compare") ||
    pathname?.startsWith("/actions") ||
    pathname?.startsWith("/multilingual");

  const isLegalInfoActive = pathname?.startsWith("/legal-info");
  const isHomeActive = pathname === "/";

  const navLinks = [
    { name: "Home", href: "/", active: isHomeActive },
    { name: "How It Works", href: "/#how-it-works", active: false },
    { name: "Features", href: "/#features", active: false },
    { name: "Workspace", href: "/workspace", active: isWorkspaceActive },
    { name: "Legal Information", href: "/legal-info", active: isLegalInfoActive },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#ffffff]/95 backdrop-blur-xl border-b border-[#0f172a]/8 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <Logo className="h-8 w-auto transition-transform group-hover:scale-[1.02]" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
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
        <div className="flex items-center gap-2.5 shrink-0">
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
              <option value="mr">ಮರಾಠಿ (Marathi)</option>
              <option value="te">తెలుగు (Telugu)</option>
              <option value="gu">ગુજરાતી (Gujarati)</option>
              <option value="kn">ಕನ್ನಡ (Kannada)</option>
            </select>
          </div>

          {/* Sign In */}
          <Link
            href="/auth"
            className="hidden sm:inline-flex px-3 py-1.5 text-xs font-semibold text-[#0b1c30] hover:bg-[#eff4ff] rounded-lg transition-colors"
          >
            Sign In
          </Link>

          {/* Primary CTA */}
          <Link
            href="/onboarding"
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#d97706] text-white text-xs font-bold rounded-lg shadow-xs hover:bg-[#b45309] transition-all transform hover:-translate-y-0.5"
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Get Started / Upload</span>
            <span className="sm:hidden">Upload</span>
          </Link>

          {/* User Icon Avatar */}
          <Link
            href="/profile"
            className="w-8 h-8 rounded-full bg-[#0f172a] text-white flex items-center justify-center shrink-0 hover:bg-[#1e293b] transition-colors"
            title="Citizen Profile"
          >
            <User className="w-4 h-4" />
          </Link>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-[#45464d] hover:text-[#0b1c30] rounded-lg"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#0f172a]/10 px-4 py-3 space-y-1 shadow-lg">
          {navLinks.map((link) => (
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
        </div>
      )}
    </header>
  );
}
