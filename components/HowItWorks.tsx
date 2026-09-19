import React from "react";
import {
  UploadCloud,
  FileCheck2,
  HelpCircle,
  GitCompare,
  CheckSquare,
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: UploadCloud,
      title: "Upload Document",
      description:
        "Drag & drop PDFs, scans, photos of agreements, or court notices. High-precision bilingual OCR digitizes Devanagari & Latin text instantly.",
      badge: "Support: PDF, JPEG, DOCX",
      highlight: false,
    },
    {
      number: "02",
      icon: FileCheck2,
      title: "Extract Key Clauses",
      description:
        "Automated parsing flags high liabilities, unilateral termination rights, non-refundable deposits, and indemnification loopholes.",
      badge: "Risk-Scored Extraction",
      highlight: false,
    },
    {
      number: "03",
      icon: HelpCircle,
      title: "Ask with Citations",
      description:
        "Ask natural questions in simple words. Receive precise answers where every single statement points to an exact page, paragraph, and line.",
      badge: "Zero Hallucination Mode",
      highlight: false,
    },
    {
      number: "04",
      icon: GitCompare,
      title: "Compare Versions",
      description:
        "Diff previous drafts or vendor revisions. Uncover sly modifications, newly inserted indemnities, or silently removed liability caps.",
      badge: "Redline & Shift Analytics",
      highlight: false,
    },
    {
      number: "05",
      icon: CheckSquare,
      title: "Action Checklist",
      description:
        "Receive a concrete pre-signature task list: stamp duty verification, specific objection draft emails, and key statutory timelines.",
      badge: "Negotiation Ready",
      highlight: true,
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-[#f8f9ff]" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-[#d97706] font-extrabold block mb-2">
            Grounded Execution
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl text-[#0b1c30] mb-4">
            How NyayaSetu Turns Inscrutable Legalese into Actionable Control
          </h2>
          <p className="text-sm sm:text-base text-[#45464d] leading-relaxed">
            Every step is strictly tied to the raw pages of your upload with verifiable
            citations. No hallucinated legal precedents or imagined clauses.
          </p>
        </div>

        {/* 5-Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="group bg-white p-5 rounded-2xl border border-[#0f172a]/5 shadow-xs hover:shadow-md hover:border-[#d97706]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                        step.highlight
                          ? "bg-[#d97706] text-white"
                          : "bg-[#eff4ff] text-[#0b1c30]"
                      }`}
                    >
                      {step.number}
                    </span>
                    <Icon className="w-5 h-5 text-[#d97706]" />
                  </div>
                  <h3 className="font-bold text-base text-[#0b1c30] mb-2 group-hover:text-[#d97706] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#45464d] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-5 pt-2">
                  <span
                    className={`inline-block text-[11px] font-mono px-2.5 py-1 rounded-md ${
                      step.highlight
                        ? "bg-[#ffdcc3] text-[#2f1500] font-bold"
                        : "bg-[#eff4ff] text-[#45464d]"
                    }`}
                  >
                    {step.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
