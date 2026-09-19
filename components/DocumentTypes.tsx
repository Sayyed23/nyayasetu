import React from "react";
import {
  Building2,
  Award,
  ShoppingCart,
  Landmark,
  ShieldCheck,
  Briefcase,
} from "lucide-react";

export default function DocumentTypes() {
  const documentTypes = [
    {
      icon: Building2,
      title: "Rental & Lease Agreements",
      statute: "Model Tenancy Act / Rent Control",
      description:
        "Flags unreasonable lock-ins, deposit retention clauses, unilateral rent escalations, and illegal eviction provisions.",
      tags: ["11-Month Leases", "Commercial Retail", "Co-living PGs"],
    },
    {
      icon: Award,
      title: "Employment & Freelance",
      statute: "Indian Contract Act §27",
      description:
        "Detects unconstitutional post-termination non-competes, aggressive IP assignment for personal projects, and extended clawbacks.",
      tags: ["Offer Letters", "Consulting SOWs", "ESOP Grant Deeds"],
    },
    {
      icon: ShoppingCart,
      title: "Consumer Terms & Notices",
      statute: "Consumer Protection Act 2019",
      description:
        "Surfaces binding unilateral arbitration clauses, cancellation forfeiture, warranty waivers, and privacy surrender terms.",
      tags: ["E-Commerce T&Cs", "EdTech Subscriptions", "Gym Memberships"],
    },
    {
      icon: Landmark,
      title: "Loan & Credit Agreements",
      statute: "RBI Fair Lending Framework",
      description:
        "Exposes hidden prepayment penalties, floating benchmark reset anomalies, compound default interest, and third-party recovery permissions.",
      tags: ["Home Loan Sanction", "Personal Credit Lines", "NBFC Micro-loans"],
    },
    {
      icon: ShieldCheck,
      title: "Insurance Policies & Riders",
      statute: "IRDAI Consumer Mandates",
      description:
        "Highlights pre-existing disease (PED) exclusions, waiting period traps, sub-limits on room rent, and short claim intimation deadlines.",
      tags: ["Family Health Floaters", "Term Life Riders", "Vehicle Comprehensive"],
    },
    {
      icon: Briefcase,
      title: "Vendor MSAs & SOWs",
      statute: "B2B Commercial Law",
      description:
        "Detects uncapped indemnities, scope creep terms, asymmetric termination for convenience, and inconvenient foreign court jurisdictions.",
      tags: ["Master Service Agrmts", "Agency Retainers", "Supply Agreements"],
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-[#f8f9ff]" id="document-types">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-[#d97706] font-extrabold block mb-2">
            Versatile Ingestion
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl text-[#0b1c30] mb-4">
            Built for the Agreements Everyday Citizens &amp; Founders Sign
          </h2>
          <p className="text-sm sm:text-base text-[#45464d]">
            Optimized knowledge models calibrated for high-frequency civic, tenancy,
            commercial, and financial documents in India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documentTypes.map((doc, idx) => {
            const Icon = doc.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-white rounded-2xl border border-[#0f172a]/5 shadow-xs hover:shadow-md hover:border-[#d97706]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#d97706] shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#0b1c30] leading-snug">
                        {doc.title}
                      </h3>
                      <span className="text-xs text-[#d97706] font-semibold block">
                        {doc.statute}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-[#45464d] leading-relaxed mb-4">
                    {doc.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {doc.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#eff4ff] text-[#45464d]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
