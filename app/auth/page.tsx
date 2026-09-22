"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Fingerprint,
} from "lucide-react";

export default function SimpleAuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    if (!isLogin) {
      if (!name.trim()) {
        setError("Please enter your full name.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
      }
    }

    setLoading(true);

    // Simulate instant secure auth
    setTimeout(() => {
      setLoading(false);
      login(email, name);
      setSuccessMsg(isLogin ? "Welcome back! Redirecting..." : "Account created successfully! Redirecting...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 700);
    }, 500);
  };

  const handleDigiLocker = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login("priya.narayan@citizen.digilocker.in", "Priya Narayan (Aadhaar/DigiLocker)");
      setSuccessMsg("DigiLocker identity verified! Redirecting...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 700);
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f8f9ff] text-[#0b1c30]">
      {/* Top minimal header */}
      <header className="w-full px-6 py-4 flex items-center justify-between border-b border-[#0f172a]/5 bg-white/80 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 group">
          <Logo className="h-8 w-auto transition-transform group-hover:scale-[1.02]" />
        </Link>
        <Link
          href="/"
          className="text-xs font-semibold text-[#45464d] hover:text-[#0b1c30] transition-colors"
        >
          ← Back to Home
        </Link>
      </header>

      {/* Main Centered Auth Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {/* Card Wrapper */}
          <div className="bg-white rounded-2xl p-7 sm:p-9 border border-[#0f172a]/8 shadow-[0_4px_24px_rgba(15,23,42,0.06)] relative overflow-hidden">
            {/* Decorative background aura */}
            <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#d97706]/10 rounded-full blur-2xl pointer-events-none" />

            {/* Header Text */}
            <div className="text-center mb-6">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0b1c30] tracking-tight">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-xs sm:text-sm text-[#64748b] mt-1.5">
                {isLogin
                  ? "Sign in with your email and password to access your documents"
                  : "Sign up to demystify and verify your legal documents"}
              </p>
            </div>

            {/* Segmented Switcher: Login vs Register */}
            <div className="w-full bg-[#eff4ff] p-1 rounded-xl flex items-center mb-6">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(true);
                  setError("");
                }}
                className={`w-1/2 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${isLogin
                    ? "bg-white text-[#0b1c30] shadow-sm"
                    : "text-[#64748b] hover:text-[#0b1c30]"
                  }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsLogin(false);
                  setError("");
                }}
                className={`w-1/2 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${!isLogin
                    ? "bg-white text-[#0b1c30] shadow-sm"
                    : "text-[#64748b] hover:text-[#0b1c30]"
                  }`}
              >
                Register
              </button>
            </div>

            {/* Error & Success Feedback Alerts */}
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-[#fef2f2] border border-[#fecaca] text-[#ba1a1a] text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-4 p-3 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] text-[#065f46] text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field (Only on Register) */}
              {!isLogin && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#0b1c30]" htmlFor="fullName">
                    Full Name
                  </label>
                  <div className="relative flex items-center">
                    <User className="w-4 h-4 text-[#64748b] absolute left-3.5 pointer-events-none" />
                    <input
                      id="fullName"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Priya Narayan"
                      className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-[#cbd5e1] text-sm text-[#0b1c30] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#d97706]/30 focus:border-[#0f172a] transition-all"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#0b1c30]" htmlFor="emailId">
                  Email ID
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-[#64748b] absolute left-3.5 pointer-events-none" />
                  <input
                    id="emailId"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-[#cbd5e1] text-sm text-[#0b1c30] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#d97706]/30 focus:border-[#0f172a] transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#0b1c30]" htmlFor="password">
                    Password
                  </label>
                  {isLogin && (
                    <button
                      type="button"
                      onClick={() => setError("Password reset link will be sent to your email.")}
                      className="text-xs font-semibold text-[#d97706] hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-[#64748b] absolute left-3.5 pointer-events-none" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full h-11 pl-10 pr-10 rounded-xl border border-[#cbd5e1] text-sm text-[#0b1c30] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#d97706]/30 focus:border-[#0f172a] transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-[#64748b] hover:text-[#0b1c30] p-1"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field (Only on Register) */}
              {!isLogin && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#0b1c30]" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <div className="relative flex items-center">
                    <Lock className="w-4 h-4 text-[#64748b] absolute left-3.5 pointer-events-none" />
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter your password"
                      className="w-full h-11 pl-10 pr-10 rounded-xl border border-[#cbd5e1] text-sm text-[#0b1c30] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#d97706]/30 focus:border-[#0f172a] transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 text-[#64748b] hover:text-[#0b1c30] p-1"
                      aria-label="Toggle confirm password visibility"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Remember Me Checkbox (Only on Login) */}
              {isLogin && (
                <div className="flex items-center gap-2 pt-1">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-[#cbd5e1] text-[#0f172a] focus:ring-[#d97706] cursor-pointer"
                  />
                  <label htmlFor="remember" className="text-xs text-[#45464d] cursor-pointer select-none">
                    Remember me for 30 days
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 rounded-xl bg-[#0f172a] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#1e293b] active:scale-[0.99] shadow-sm transition-all disabled:opacity-70"
                >
                  {loading ? (
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{isLogin ? "Sign In" : "Create Account"}</span>
                      <ArrowRight className="w-4 h-4 text-[#d97706]" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="relative flex py-5 items-center">
              <div className="flex-grow bg-[#e2e8f0] h-px" />
              <span className="flex-shrink mx-3 text-[11px] font-semibold uppercase tracking-wider text-[#94a3b8]">
                Or continue with
              </span>
              <div className="flex-grow bg-[#e2e8f0] h-px" />
            </div>

            {/* Alternative Quick Auth Options */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleDigiLocker}
                className="h-10 px-3 rounded-xl border border-[#cbd5e1] hover:bg-[#eff4ff] text-xs font-bold text-[#0b1c30] flex items-center justify-center gap-2 transition-colors"
              >
                <Fingerprint className="w-4 h-4 text-[#d97706]" />
                <span>DigiLocker</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                    login("priya.sen@gmail.com", "Priya Sen (Google)");
                    router.push("/workspace");
                  }, 500);
                }}
                className="h-10 px-3 rounded-xl border border-[#cbd5e1] hover:bg-[#eff4ff] text-xs font-bold text-[#0b1c30] flex items-center justify-center gap-2 transition-colors"
              >
                <span className="font-bold text-sm">G</span>
                <span>Google</span>
              </button>
            </div>

            {/* Bottom DPDP privacy hint */}
            <div className="mt-6 pt-4 border-t border-[#0f172a]/5 flex items-center justify-center gap-1.5 text-[11px] text-[#64748b]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
              <span>DPDP Act 2023 Compliant • Zero Data Retention</span>
            </div>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="w-full py-4 text-center text-xs text-[#64748b] border-t border-[#0f172a]/5 bg-white">
        © 2025 NyayaSetu Civic Intelligence Platform. All rights reserved.
      </footer>
    </div>
  );
}
