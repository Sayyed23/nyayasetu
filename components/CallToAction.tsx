import React from "react";
import { UploadCloud, BookOpen, Zap, CreditCard, Lock, Scale } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="w-full py-16 md:py-24 bg-[#f8f9ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#131b2e] p-8 sm:p-14 text-center text-white shadow-2xl">
          {/* Background decorative ambient radial */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#d97706]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white mb-6 border border-white/10 shadow-xs">
              <Scale className="w-4 h-4 text-[#d97706]" />
              <span className="text-xs font-semibold">Civic Empowerment Engine</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl mb-6 leading-tight">
              Never Sign a Document You Don&apos;t Fully Understand.
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mb-10 leading-relaxed">
              Join over 45,000 Indian citizens, tenants, freelancers, and small business owners
              protecting their rights with grounded, zero-hallucination legal clarity.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
              <a
                href="#demo"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#d97706] text-white font-bold text-sm sm:text-base rounded-xl shadow-lg hover:bg-[#b45309] transition-all transform hover:-translate-y-0.5"
              >
                <UploadCloud className="w-5 h-5" />
                <span>Upload Document for Free</span>
              </a>
              <a
                href="#legal-literacy"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 bg-white/10 text-white font-bold text-sm sm:text-base rounded-xl border border-white/15 hover:bg-white/15 transition-colors"
              >
                <BookOpen className="w-5 h-5 text-[#d97706]" />
                <span>Browse Legal Literacy Library</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#d97706]" />
                <span>Instant 10-second processing</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-[#d97706]" />
                <span>No credit card required</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#d97706]" />
                <span>100% ephemeral memory</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
