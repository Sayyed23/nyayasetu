"use client";

import React, { useState } from "react";
import Logo from "./Logo";
import { Upload, Languages, User, Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");

  const navLinks = [
    { name: "How It Works", href: "#how-it-works" },
    { name: "Core Features", href: "#features" },
    { name: "Document Types", href: "#document-types" },
    { name: "Workspace", href: "/workspace" },
    { name: "Legal Literacy", href: "#legal-literacy" },
    { name: "Trust & Security", href: "#trust-and-security" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#ffffff]/90 backdrop-blur-xl border-b border-[#0f172a]/5 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0 group">
          <Logo className="h-10 w-auto transition-transform group-hover:scale-[1.02]" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-2 text-sm font-semibold text-[#45464d] hover:text-[#0b1c30] hover:bg-[#eff4ff] rounded-lg transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Selector */}
          <div className="relative flex items-center bg-[#eff4ff] px-2.5 py-1.5 rounded-lg border border-[#0f172a]/5 text-xs font-semibold text-[#0b1c30]">
            <Languages className="w-4 h-4 text-[#45464d] mr-1.5 shrink-0" />
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

          {/* Sign In */}
          <a
            href="#demo"
            className="hidden sm:inline-flex px-3.5 py-2 text-sm font-semibold text-[#0b1c30] hover:bg-[#eff4ff] rounded-lg transition-colors"
          >
            Sign In
          </a>

          {/* Primary CTA */}
          <a
            href="/onboarding"
            className="flex items-center gap-2 px-4 py-2 bg-[#d97706] text-white text-sm font-bold rounded-lg shadow-sm hover:bg-[#b45309] transition-all transform hover:-translate-y-0.5"
          >
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Get Started / Upload</span>
            <span className="sm:hidden">Upload</span>
          </a>

          {/* User Icon Avatar */}
          <div className="w-8 h-8 rounded-full bg-[#0f172a] text-white flex items-center justify-center shrink-0">
            <User className="w-4 h-4" />
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-[#45464d] hover:text-[#0b1c30] rounded-lg"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-[#0f172a]/10 px-4 py-4 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-[#45464d] hover:text-[#0b1c30] hover:bg-[#eff4ff] rounded-lg"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-[#64748b]">12+ Indic Languages Supported</span>
            <a
              href="#demo"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-bold text-[#d97706] hover:underline"
            >
              Sign In →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
