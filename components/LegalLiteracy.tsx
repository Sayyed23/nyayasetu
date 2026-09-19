"use client";

import React, { useState } from "react";
import { Search, Landmark, ArrowRight } from "lucide-react";

export default function LegalLiteracy() {
  const [query, setQuery] = useState(
    "What are tenant rights when landlord refuses to return deposit in Karnataka?"
  );
  const [jurisdiction, setJurisdiction] = useState("karnataka");

  const answers: Record<string, { title: string; act: string; text: string }> = {
    karnataka: {
      title: "Statutory Answer • Karnataka RERA / Model Tenancy Guidelines",
      act: "Karnataka Rent Act 1999",
      text: "Under Karnataka law, landlords must refund the security deposit within 30 days of the tenant vacating the premises and handing over peaceful possession. Any deduction for damages must be backed by genuine itemized receipts.",
    },
    delhi: {
      title: "Statutory Answer • Delhi Rent Control Framework",
      act: "Delhi Rent Control Act 1958",
      text: "In Delhi NCT, standard tenancy disputes fall under DRC and civil jurisdiction. Unlawful deposit retention allows tenants to file a summary recovery suit under Order 37 of CPC or approach the Rent Controller.",
    },
    maharashtra: {
      title: "Statutory Answer • Maharashtra Rent Control Act",
      act: "Maharashtra Rent Control Act 1999",
      text: "Leave and License agreements registered under Section 55 mandate return of the security deposit upon handover. Withholding attracts interest penalties and competence jurisdiction under the Competent Authority.",
    },
    central: {
      title: "Statutory Answer • Model Tenancy Act / Consumer Protection",
      act: "Consumer Protection Act 2019",
      text: "At the national level, unfair trade practices and deficiency in service include arbitrary deposit forfeiture. Redressal can be sought online through the National Consumer Helpline or E-Daakhil.",
    },
  };

  const currentAnswer = answers[jurisdiction] || answers.karnataka;

  return (
    <section className="w-full py-16 md:py-24 bg-[#eff4ff]/60 border-y border-[#0f172a]/5" id="legal-literacy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#d97706] font-extrabold block mb-2">
            Civic Encyclopedia
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl text-[#0b1c30] mb-4">
            NyayaSetu Statutory Knowledge Codex
          </h2>
          <p className="text-sm sm:text-base text-[#45464d] leading-relaxed">
            Don&apos;t have a document to upload? Search our comprehensive legal literacy
            library to explore your citizen rights under Indian statutory laws.
          </p>
        </div>

        {/* Interactive Search Preview Box */}
        <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl border border-[#0f172a]/10 shadow-lg p-6 sm:p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
            {/* Search input */}
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask any statutory question (e.g., notice period, deposit return)..."
                className="w-full pl-12 pr-4 py-3 bg-[#eff4ff] rounded-xl text-sm text-[#0b1c30] font-medium focus:outline-none focus:ring-2 focus:ring-[#d97706]/30 border border-[#0f172a]/5"
              />
            </div>

            {/* Jurisdiction Dropdown */}
            <div className="w-full md:w-auto shrink-0">
              <select
                aria-label="Select State Jurisdiction"
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
                className="w-full md:w-auto px-4 py-3 bg-[#eff4ff] rounded-xl text-xs sm:text-sm font-semibold text-[#0b1c30] focus:outline-none border border-[#0f172a]/5 cursor-pointer"
              >
                <option value="karnataka">Karnataka (Bengaluru)</option>
                <option value="delhi">Delhi NCT</option>
                <option value="maharashtra">Maharashtra (Mumbai/Pune)</option>
                <option value="central">All India / Central Framework</option>
              </select>
            </div>
          </div>

          {/* Grounded Answer Snippet Box */}
          <div className="p-5 bg-[#eff4ff]/60 rounded-xl border border-[#0f172a]/5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#0b1c30] uppercase">
                <Landmark className="w-4 h-4 text-[#d97706]" />
                <span>{currentAnswer.title}</span>
              </div>
              <span className="text-xs bg-white border border-[#0f172a]/5 px-2.5 py-0.5 rounded font-mono text-[#64748b] font-semibold">
                {currentAnswer.act}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#0b1c30] leading-relaxed mb-4">
              {currentAnswer.text}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200/60 text-xs">
              <span className="text-[#64748b] font-medium">Recommended Legal Forums:</span>
              <span className="px-2.5 py-1 rounded bg-white text-[#0b1c30] font-semibold border border-[#0f172a]/5 shadow-2xs">
                District Consumer Disputes Redressal Commission
              </span>
              <span className="px-2.5 py-1 rounded bg-white text-[#0b1c30] font-semibold border border-[#0f172a]/5 shadow-2xs">
                Small Causes Court
              </span>
            </div>
          </div>
        </div>

        {/* Quick Browse Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-[#0f172a]/5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase font-extrabold text-[#d97706] block mb-2">
                Criminal &amp; Penal Code
              </span>
              <h4 className="font-editorial font-bold text-base text-[#0b1c30] mb-2">
                Bhartiya Nyaya Sanhita (BNS) 2023
              </h4>
              <p className="text-xs text-[#45464d] leading-relaxed mb-4">
                Quick comparison matrix mapping old IPC sections (420, 302, 376) to new BNS
                provisions with changes in bail requirements.
              </p>
            </div>
            <a
              href="#demo"
              className="text-xs font-bold text-[#d97706] hover:underline inline-flex items-center gap-1"
            >
              <span>Explore BNS Guide</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#0f172a]/5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase font-extrabold text-[#d97706] block mb-2">
                Consumer Empowerment
              </span>
              <h4 className="font-editorial font-bold text-base text-[#0b1c30] mb-2">
                E-Daakhil Filing Blueprints
              </h4>
              <p className="text-xs text-[#45464d] leading-relaxed mb-4">
                Step-by-step guides for filing online consumer complaints without paying high
                advocate fees for defective products or services.
              </p>
            </div>
            <a
              href="#demo"
              className="text-xs font-bold text-[#d97706] hover:underline inline-flex items-center gap-1"
            >
              <span>View Filing Blueprint</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#0f172a]/5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase font-extrabold text-[#d97706] block mb-2">
                Civic Transparency
              </span>
              <h4 className="font-editorial font-bold text-base text-[#0b1c30] mb-2">
                RTI Application Generator
              </h4>
              <p className="text-xs text-[#45464d] leading-relaxed mb-4">
                Draft precise Right to Information requests to municipal corporations (BBMP, BMC,
                MCD) for road repairs and property khata records.
              </p>
            </div>
            <a
              href="#demo"
              className="text-xs font-bold text-[#d97706] hover:underline inline-flex items-center gap-1"
            >
              <span>Generate RTI Draft</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
