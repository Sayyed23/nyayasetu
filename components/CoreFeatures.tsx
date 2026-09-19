import React from "react";
import {
  FileText,
  ShieldAlert,
  MessageSquareQuote,
  GitCompare,
  Languages,
  CheckCircle,
} from "lucide-react";

export default function CoreFeatures() {
  const features = [
    {
      icon: FileText,
      iconBg: "bg-[#eff4ff] text-[#d97706]",
      title: "Understand in Plain Language",
      description:
        'Convert archaic legal jargon like "mutatis mutandis", "indemnify and hold harmless", and "pari passu" into clear, unambiguous statements describing who owes what, to whom, and under what exact conditions.',
      footerLabel: "Includes Executive Briefing",
      footerBadge: "1-Page Digest",
    },
    {
      icon: ShieldAlert,
      iconBg: "bg-[#fff1f2] text-[#ba1a1a]",
      title: "Deep Risk Scrutiny",
      description:
        "Evaluates agreements against unfair Indian contract practices: one-sided lock-ins, unlimited damages, waiver of statutory right to consumer forums, and void post-employment non-competes under Section 27 of ICA 1872.",
      footerLabel: "Severity Stratification",
      footerBadge: "High / Med / Low",
    },
    {
      icon: MessageSquareQuote,
      iconBg: "bg-[#eff4ff] text-[#d97706]",
      title: "Grounded Q&A Engine",
      description:
        'Query your contract like a personal paralegal: "Can I leave before 11 months?", "Who pays maintenance when the lift breaks?", or "What is my notice period?" Every single answer highlights exact lines in your file.',
      footerLabel: "Click-to-Citation Link",
      footerBadge: "Instant Jump",
    },
    {
      icon: GitCompare,
      iconBg: "bg-[#eff4ff] text-[#d97706]",
      title: "Clause-by-Clause Diffing",
      description:
        "Track subtle word switches. Compare renewal agreements to originals to detect hidden 5% escalations, expanded indemnity clauses, or quietly removed refund rights before signing.",
      footerLabel: "Semantic Delta Visualizer",
      footerBadge: "Side-by-Side",
    },
    {
      icon: Languages,
      iconBg: "bg-[#eff4ff] text-[#d97706]",
      title: "Native Indic Explanations",
      description:
        "Legal justice requires linguistic accessibility. Read clause consequences in हिन्दी, தமிழ், বাংলা, मराठी, ಕನ್ನಡ, and 7 other languages with verified legal terminology mappings.",
      footerLabel: "12+ Constitutional Languages",
      footerBadge: "High Accuracy",
    },
    {
      icon: CheckCircle,
      iconBg: "bg-[#eff4ff] text-[#d97706]",
      title: "Negotiation Action Center",
      description:
        "Get customized, polite negotiation emails and counter-proposals ready to copy and paste. Know exactly what to request before putting ink on paper or paying token money.",
      footerLabel: "Pre-Drafted Objections",
      footerBadge: "1-Click Copy",
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-[#eff4ff]/60 border-y border-[#0f172a]/5" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#d97706] font-extrabold block mb-2">
              Engineered for Indian Civic Context
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl text-[#0b1c30]">
              Six Pillars of Civic Legal Empowerment
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#45464d] max-w-md">
            Designed specifically to address asymmetrical bargaining power in tenant
            agreements, contractor contracts, and consumer terms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-[#0f172a]/5 shadow-xs hover:shadow-md hover:border-[#d97706]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${feature.iconBg}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-editorial font-bold text-lg text-[#0b1c30] mb-2.5">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#45464d] leading-relaxed mb-6">
                    {feature.description}
                  </p>
                </div>

                <div className="p-3 bg-[#eff4ff] rounded-xl flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#0b1c30]">
                    {feature.footerLabel}
                  </span>
                  <span className="text-[#d97706] font-mono font-bold">
                    {feature.footerBadge}
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
