"use client";

import React, { useState } from "react";
import {
  Clock,
  Ban,
  Lock,
  Trash2,
  ShieldCheck,
  CloudCheck,
  Cpu,
  Hourglass,
  FileX2,
} from "lucide-react";

export default function PrivacySandbox() {
  const [wiped, setWiped] = useState(false);

  const handleWipe = () => {
    setWiped(true);
    setTimeout(() => {
      setWiped(false);
    }, 4000);
  };

  return (
    <section className="w-full py-16 md:py-24 bg-[#f8f9ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left: Text & Features */}
          <div className="lg:w-1/2">
            <span className="text-xs uppercase tracking-widest text-[#d97706] font-extrabold block mb-2">
              DPDP Act 2023 Conformance
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl text-[#0b1c30] mb-4">
              Your Documents Are Ephemeral. Never Trained On. Shredded by Default.
            </h2>
            <p className="text-sm sm:text-base text-[#45464d] mb-8 leading-relaxed">
              We understand that leases, financial sanctions, and employment offers contain
              sensitive personal and financial identifiers. Our system guarantees zero data retention.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#d97706] shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0b1c30]">
                    Automatic 60-Minute Memory Shred
                  </h4>
                  <p className="text-xs text-[#45464d] mt-0.5 leading-relaxed">
                    All OCR vectors, temporary document parses, and extracted tables are
                    automatically purged from volatile RAM within 60 minutes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#d97706] shrink-0 mt-0.5">
                  <Ban className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0b1c30]">
                    Zero Model Retraining Policy
                  </h4>
                  <p className="text-xs text-[#45464d] mt-0.5 leading-relaxed">
                    Your contracts are never stored in public corpus pools, nor are they used to
                    fine-tune third-party or foundational LLMs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#d97706] shrink-0 mt-0.5">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0b1c30]">
                    AES-256 Client-Side Enclave
                  </h4>
                  <p className="text-xs text-[#45464d] mt-0.5 leading-relaxed">
                    Encrypted in transit over TLS 1.3 and at rest with hardware-level cryptographic
                    isolation within MeitY-empaneled data centers in India.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#d97706] shrink-0 mt-0.5">
                  <Trash2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0b1c30]">
                    Instant 1-Click Permanent Purge
                  </h4>
                  <p className="text-xs text-[#45464d] mt-0.5 leading-relaxed">
                    Hit the purge button anytime to instantly wipe every active session artifact
                    and generate a cryptographic deletion receipt.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Privacy Shield Bento Box */}
          <div className="lg:w-1/2 w-full">
            <div className="bg-[#e5eeff] p-7 sm:p-8 rounded-2xl border border-[#0f172a]/10 shadow-md relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-[#d97706]" />
                  <span className="font-editorial font-bold text-base text-[#0b1c30]">
                    Privacy Sandbox Live Status
                  </span>
                </div>
                <span className="px-2.5 py-1 bg-white text-[#0b1c30] rounded-md font-mono text-xs font-bold shadow-2xs">
                  DPDP SEC 4(1) PASS
                </span>
              </div>

              {/* Visual Security Pipeline Steps */}
              <div className="space-y-3 font-mono text-xs text-[#45464d]">
                <div className="p-3 bg-white rounded-xl flex items-center justify-between shadow-2xs border border-[#0f172a]/5">
                  <span className="flex items-center gap-2">
                    <CloudCheck className="w-4 h-4 text-[#d97706]" />
                    <span>1. Ingestion via TLS 1.3 Enclave</span>
                  </span>
                  <span className="text-[#d97706] font-bold">256-bit SHA</span>
                </div>

                <div className="p-3 bg-white rounded-xl flex items-center justify-between shadow-2xs border border-[#0f172a]/5">
                  <span className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#d97706]" />
                    <span>2. RAM-Only Parsing Session</span>
                  </span>
                  <span className="text-[#059669] font-bold">No Disk Write</span>
                </div>

                <div className="p-3 bg-white rounded-xl flex items-center justify-between shadow-2xs border border-[#0f172a]/5">
                  <span className="flex items-center gap-2">
                    <Hourglass className="w-4 h-4 text-[#d97706]" />
                    <span>3. Time-to-Live (TTL) Shredder</span>
                  </span>
                  <span className="text-[#0b1c30] font-bold">
                    {wiped ? "Purged" : "59m 42s Remaining"}
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl flex items-center justify-between shadow-2xs border border-[#0f172a]/5">
                  <span className="flex items-center gap-2">
                    <FileX2 className="w-4 h-4 text-[#d97706]" />
                    <span>4. Zero Long-Term Embedding Store</span>
                  </span>
                  <span className="text-[#059669] font-bold">Verified Zero</span>
                </div>
              </div>

              {/* Purge Simulator Button */}
              <div className="mt-6 pt-4 bg-white p-4 rounded-xl border border-[#0f172a]/5 flex items-center justify-between gap-4">
                <div>
                  <span className="font-bold text-xs text-[#0b1c30] block">
                    User Sovereignty Test
                  </span>
                  <span className="text-[11px] text-[#64748b]">
                    {wiped
                      ? "✓ Session memory wiped! Receipt token: SHA256-98X2"
                      : "Simulate instant file vaporization"}
                  </span>
                </div>
                <button
                  onClick={handleWipe}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all shrink-0 ${
                    wiped
                      ? "bg-[#059669] text-white"
                      : "bg-[#ba1a1a] text-white hover:bg-[#991b1b]"
                  }`}
                >
                  {wiped ? "Purged!" : "Wipe Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
