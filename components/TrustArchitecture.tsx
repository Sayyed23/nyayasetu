import React from "react";
import {
  FileCode2,
  MapPin,
  Scale,
  AlertOctagon,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";

export default function TrustArchitecture() {
  const pillars = [
    {
      icon: FileCode2,
      title: "Original Text Sole Source",
      description:
        "The platform is mathematically prevented from inventing details. If a clause does not specify utility billing, NyayaSetu never assumes who pays it.",
    },
    {
      icon: MapPin,
      title: "Interactive Line Anchors",
      description:
        "Every analytical card provides a direct hyperlink into the original scanned document, instantly scrolling and highlighting the exact sentence.",
    },
    {
      icon: Scale,
      title: "Statutory Cross-Audit",
      description:
        "Clauses are validated against the Bharatiya Nyaya Sanhita (BNS), Consumer Protection Act 2019, RERA, and the Indian Contract Act 1872.",
    },
    {
      icon: AlertOctagon,
      title: "Insufficient Evidence Mode",
      description:
        "When files miss mandatory annexures or schedules, NyayaSetu explicitly marks them as unproven instead of providing a confident guess.",
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-[#eff4ff]/60 border-y border-[#0f172a]/5" id="trust-and-security">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-[#d97706] font-extrabold block mb-2">
            Verification Rigor
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl text-[#0b1c30] mb-4">
            Why You Can Trust NyayaSetu Without Reservation
          </h2>
          <p className="text-sm sm:text-base text-[#45464d] leading-relaxed">
            Conventional chatbots hallucinate statutory precedents. NyayaSetu operates on a
            closed-circuit evidentiary framework where every deduction must prove its pedigree.
          </p>
        </div>

        {/* 4 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-[#0f172a]/5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#d97706] mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-[#0b1c30] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#45464d] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Real Banner Example of Insufficient Evidence Warning */}
        <div className="p-6 bg-white rounded-2xl border border-[#d97706]/20 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-[#ffdcc3] flex items-center justify-center text-[#904d00] shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-[#d97706] font-bold block">
                Standard Safeguard In Action
              </span>
              <h4 className="font-bold text-base text-[#0b1c30]">
                &quot;Insufficient Evidence in Uploaded File&quot;
              </h4>
              <p className="text-xs sm:text-sm text-[#45464d] mt-1 leading-relaxed">
                The uploaded agreement references <em>&quot;Schedule B - Landlord Inventory &amp; Fixtures List&quot;</em>,
                but Schedule B was not scanned. NyayaSetu warns:{" "}
                <strong className="text-[#0b1c30]">
                  &quot;Fixture repair liabilities cannot be determined until Schedule B is attached.&quot;
                </strong>
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#eff4ff] border border-[#0f172a]/5 text-xs font-mono font-semibold text-[#0b1c30]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
              Verification Guard: ACTIVE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
