import React from "react";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
}

export default function Logo({ className = "h-9 w-auto", variant = "light" }: LogoProps) {
  const isDark = variant === "dark";
  const titleColor = isDark ? "#F8FAFC" : "#0F172A";
  const subtitleColor = isDark ? "#94A3B8" : "#64748B";

  return (
    <svg
      viewBox="0 0 240 60"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="NyayaSetu Logo"
    >
      <g transform="translate(6, 6)">
        {/* Bridge & Pillar Emblem Box */}
        <rect x="2" y="2" width="44" height="44" rx="10" fill="#0F172A" />
        {/* Stylized Arch Bridge + Scales of Justice */}
        <path
          d="M12 36C16 26 32 26 36 36"
          stroke="#F59E0B"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M24 10V32"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M15 16L33 16"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Left Scale Pan */}
        <path d="M15 16L12 24H18L15 16Z" fill="#38BDF8" opacity="0.9" />
        {/* Right Scale Pan */}
        <path d="M33 16L30 24H36L33 16Z" fill="#F59E0B" opacity="0.9" />
        <circle cx="24" cy="10" r="2.5" fill="#F59E0B" />
      </g>
      {/* Wordmark */}
      <text
        x="62"
        y="32"
        fontFamily="var(--font-plus-jakarta-sans), -apple-system, sans-serif"
        fontWeight="800"
        fontSize="22"
        fill={titleColor}
        letterSpacing="-0.5px"
      >
        Nyaya<tspan fill="#D97706">Setu</tspan>
      </text>
      <text
        x="63"
        y="46"
        fontFamily="var(--font-plus-jakarta-sans), -apple-system, sans-serif"
        fontWeight="600"
        fontSize="8.5"
        fill={subtitleColor}
        letterSpacing="1.5px"
      >
        LEGAL CLARITY &amp; EVIDENCE
      </text>
    </svg>
  );
}
