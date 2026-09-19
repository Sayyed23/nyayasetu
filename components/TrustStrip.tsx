import React from "react";
import { CheckCircle2, BookOpen, Languages, Shield, Info } from "lucide-react";

export default function TrustStrip() {
  const trustPoints = [
    {
      icon: CheckCircle2,
      strong: "Evidence-First:",
      text: "Pinned to clause line numbers",
      variant: "default",
    },
    {
      icon: BookOpen,
      strong: "Source-Cited:",
      text: "Verifiable document text references",
      variant: "default",
    },
    {
      icon: Languages,
      strong: "Multilingual:",
      text: "Hindi, Tamil, Bengali, Telugu & more",
      variant: "default",
    },
    {
      icon: Shield,
      strong: "Privacy-Focused:",
      text: "Ephemeral processing, zero training",
      variant: "default",
    },
    {
      icon: Info,
      strong: "Civic Intelligence:",
      text: "Informational • Not Legal Counsel",
      variant: "accent",
    },
  ];

  return (
    <section className="w-full bg-[#e5eeff] py-4 border-y border-[#0f172a]/5 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center lg:justify-between gap-3">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            const isAccent = point.variant === "accent";
            return (
              <div
                key={index}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs transition-shadow ${
                  isAccent
                    ? "bg-[#ffdcc3] text-[#2f1500] font-semibold border border-[#d97706]/20 shadow-xs"
                    : "bg-white text-[#0b1c30] border border-[#0f172a]/5 shadow-2xs"
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isAccent ? "text-[#904d00]" : "text-[#d97706]"
                  }`}
                />
                <span>
                  <strong>{point.strong}</strong> {point.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
