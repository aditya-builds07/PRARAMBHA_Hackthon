import React, { useState } from "react";
import { requireSupabase, getAuthRedirectUrl } from "../../services/supabase.js";

export default function ForgotPasswordPage({ onNavigate }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const cleanEmail = email.trim();
    if (!cleanEmail) return;

    if (!/\S+@\S+\.\S+/.test(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      // Redirect user back to /login so Supabase embeds it in the reset email
      const redirectTo =
        typeof window !== "undefined"
          ? `${window.location.origin}/login`
          : getAuthRedirectUrl();

      const { error: resetError } = await requireSupabase().auth.resetPasswordForEmail(
        cleanEmail,
        { redirectTo }
      );

      if (resetError) throw resetError;

      setSent(true);
    } catch (err) {
      setError(err.message || "Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#001E13] text-slate-100 flex flex-col justify-between font-sans selection:bg-emerald-500 selection:text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar */}
      <header className="relative z-10 w-full pt-6 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate && onNavigate("launch")}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#164A34] border border-[#3D8B5A] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[22px]">psychiatry</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-white tracking-tight">KRISHIMITRA</span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  v2.0
                </span>
              </div>
              <span className="text-xs text-emerald-300/80 block">Agri Scenario &amp; Decision Simulator</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate && onNavigate("login")}
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-200 hover:text-white bg-white/5 hover:bg-white/10 border border-[#164A34] hover:border-emerald-500/40 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Back to Sign In</span>
          </button>
        </div>
      </header>

      {/* Main Form */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-md bg-[#002D1D]/90 backdrop-blur-xl rounded-3xl border border-[#164A34] shadow-2xl p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mb-1">
              <span className="material-symbols-outlined text-[26px]">lock_reset</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Reset Your Password</h1>
            <p className="text-xs text-slate-300">
              Enter your registered email and we'll send a secure password reset link
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="p-3.5 bg-rose-950/70 border border-rose-700/60 text-rose-200 text-xs font-semibold rounded-2xl flex items-center gap-2.5">
              <span className="material-symbols-outlined text-base shrink-0 text-rose-400">error</span>
              <span>{error}</span>
            </div>
          )}

          {sent ? (
            <div className="p-5 bg-emerald-950/70 border border-emerald-500/50 rounded-2xl text-center space-y-3">
              <span className="material-symbols-outlined text-4xl text-emerald-400 block">mark_email_read</span>
              <h3 className="font-bold text-emerald-200 text-sm">Password Reset Email Sent!</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We've sent a secure reset link to{" "}
                <strong className="text-emerald-300">{email}</strong>.<br />
                Check your inbox (and spam folder) and click the link to set a new password.
              </p>
              <button
                type="button"
                onClick={() => onNavigate && onNavigate("login")}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span className="material-symbols-outlined text-base">login</span>
                <span>Return to Sign In</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="reset-email" className="block text-xs font-bold text-emerald-300">
                  Registered Email Address
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[18px] pointer-events-none">
                    mail
                  </span>
                  <input
                    id="reset-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="farmer@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#164A34] bg-[#002216] focus:bg-[#002B1B] focus:border-emerald-400 text-xs font-medium text-white placeholder-slate-500 outline-none transition-all"
                  />
                </div>
                <p className="text-[10px] text-slate-400">
                  Enter the email you used to register your account.
                </p>
              </div>

              <button
                type="submit"
                id="submit-reset-btn"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined text-base animate-spin">refresh</span>
                    <span>Sending Reset Link...</span>
                  </>
                ) : (
                  <>
                    <span>Send Password Reset Link</span>
                    <span className="material-symbols-outlined text-base">send</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => onNavigate && onNavigate("login")}
                className="w-full py-2 text-xs font-semibold text-slate-400 hover:text-emerald-300 transition-colors"
              >
                Back to Sign In
              </button>
            </form>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 px-4 text-center text-xs text-slate-400">
        KrishiMitra • Deterministic Decision Engine v2.0 • Made for Indian Farmers 🇮🇳
      </footer>
    </div>
  );
}
