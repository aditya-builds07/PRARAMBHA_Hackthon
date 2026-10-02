import React, { useState, useEffect } from "react";
import { requireSupabase } from "../../services/supabase.js";

export default function LoginPage({ onNavigate, onLoginSuccess }) {
  const [loginMethod, setLoginMethod]     = useState("password"); // 'password' | 'otp'

  // Password login
  const [userId, setUserId]               = useState("");
  const [password, setPassword]           = useState("");
  const [showPassword, setShowPassword]   = useState(false);

  // OTP login
  const [otpEmail, setOtpEmail]           = useState("");
  const [otpStep, setOtpStep]             = useState("email"); // 'email' | 'verify'
  const [otpCode, setOtpCode]             = useState("");
  const [otpCountdown, setOtpCountdown]   = useState(0);

  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // OTP resend countdown
  useEffect(() => {
    if (otpCountdown <= 0) return;
    const t = setTimeout(() => setOtpCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [otpCountdown]);

  // ── Password Login ──────────────────────────────────────────
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!userId.trim() || !password.trim()) {
      setError("Please provide both your Email and Password.");
      return;
    }
    setLoading(true);
    try {
      const input = userId.trim();
      const enteredPassword = password.trim();
      const effectiveEmail = input.includes("@")
        ? input
        : `${input.toLowerCase().replace(/[^a-z0-9]/g, "")}@farmer.prarambha.local`;

      let { data, error: signInError } = await requireSupabase().auth.signInWithPassword({
        email: effectiveEmail,
        password: enteredPassword,
      });
      if (signInError && !input.includes("@")) {
        const retry = await requireSupabase().auth.signInWithPassword({
          email: input, password: enteredPassword,
        });
        if (!retry.error) { data = retry.data; signInError = null; }
      }
      if (signInError) throw signInError;
      if (!data.user || !data.session) throw new Error("Sign-in did not return an active session.");

      if (onLoginSuccess) {
        onLoginSuccess({
          id:    data.user.id,
          name:  data.user.user_metadata?.full_name || data.user.email,
          email: data.user.email,
          token: data.session.access_token,
        });
      }
      setSuccessMsg(`Welcome back, ${data.user.user_metadata?.full_name || data.user.email}! Opening simulator...`);
      setTimeout(() => { setLoading(false); if (onNavigate) onNavigate("dashboard"); }, 600);
    } catch (err) {
      setError(err.message || "Failed to sign in. Please verify your email and password.");
      setLoading(false);
    }
  };

  // ── OTP: Send Code ──────────────────────────────────────────
  const handleOtpSend = async (e) => {
    e.preventDefault();
    setError(null);
    const cleanEmail = otpEmail.trim();
    if (!cleanEmail || !/\S+@\S+\.\S+/.test(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const { error: otpError } = await requireSupabase().auth.signInWithOtp({
        email: cleanEmail,
        options: { shouldCreateUser: false },
      });
      if (otpError) throw otpError;
      setOtpStep("verify");
      setOtpCountdown(60);
      setOtpCode("");
    } catch (err) {
      setError(err.message || "Failed to send OTP. Please check your email.");
    } finally {
      setLoading(false);
    }
  };

  // ── OTP: Verify Code ────────────────────────────────────────
  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setError(null);
    const code = otpCode.trim();
    if (!code || code.length !== 6 || !/^\d{6}$/.test(code)) {
      setError("Please enter the 6-digit numeric OTP from your email.");
      return;
    }
    setLoading(true);
    try {
      const { data, error: verifyError } = await requireSupabase().auth.verifyOtp({
        email: otpEmail.trim(),
        token: code,
        type: "email",
      });
      if (verifyError) throw verifyError;
      if (!data.session) throw new Error("OTP verified but no session returned. Please try again.");

      if (onLoginSuccess) {
        onLoginSuccess({
          id:    data.user.id,
          name:  data.user.user_metadata?.full_name || data.user.email,
          email: data.user.email,
          token: data.session.access_token,
        });
      }
      setSuccessMsg(`Welcome, ${data.user.user_metadata?.full_name || data.user.email}! Opening simulator...`);
      setTimeout(() => { setLoading(false); if (onNavigate) onNavigate("dashboard"); }, 600);
    } catch (err) {
      setError(err.message || "Invalid or expired OTP. Please try again.");
      setLoading(false);
    }
  };

  // ── OTP: Resend ─────────────────────────────────────────────
  const handleOtpResend = async () => {
    if (otpCountdown > 0) return;
    setError(null);
    setOtpCountdown(60);
    try {
      const { error: resendError } = await requireSupabase().auth.signInWithOtp({
        email: otpEmail.trim(),
        options: { shouldCreateUser: false },
      });
      if (resendError) throw resendError;
    } catch (err) {
      setError(err.message || "Failed to resend OTP.");
    }
  };

  return (
    <div className="min-h-screen bg-[#001E13] text-slate-100 flex flex-col justify-between font-sans selection:bg-emerald-500 selection:text-white relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 w-full pt-6 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button type="button" onClick={() => onNavigate && onNavigate("launch")}
            className="flex items-center gap-3 text-left group cursor-pointer">
            <div className="w-10 h-10 rounded-2xl bg-[#164A34] border border-[#3D8B5A] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[22px]">psychiatry</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-white tracking-tight">KRISHIMITRA</span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">v2.0</span>
              </div>
              <span className="text-[11px] text-emerald-300/70 block">Agri Scenario &amp; Decision Simulator</span>
            </div>
          </button>
          <button type="button" onClick={() => onNavigate && onNavigate("launch")}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-2 rounded-xl transition-all cursor-pointer">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Back to Launch</span>
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-md bg-[#002D1D]/90 backdrop-blur-xl rounded-3xl border border-[#164A34] shadow-2xl p-6 sm:p-8 space-y-6">

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mb-1">
              <span className="material-symbols-outlined text-[26px]">login</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Sign In to KrishiMitra</h1>
            <p className="text-xs text-slate-300">Access your dashboard and crop simulator</p>
          </div>

          {/* ── LOGIN METHOD TOGGLE ── */}
          <div className="flex items-center bg-[#001A10] border border-[#164A34] rounded-2xl p-1 gap-1">
            <button type="button" onClick={() => { setLoginMethod("password"); setError(null); setSuccessMsg(null); }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                loginMethod === "password"
                  ? "bg-emerald-500 text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-emerald-300"
              }`}>
              <span className="material-symbols-outlined text-sm">lock</span>
              <span>Password</span>
            </button>
            <button type="button" onClick={() => { setLoginMethod("otp"); setOtpStep("email"); setError(null); setSuccessMsg(null); }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                loginMethod === "otp"
                  ? "bg-emerald-500 text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-emerald-300"
              }`}>
              <span className="material-symbols-outlined text-sm">phonelink_lock</span>
              <span>OTP Code</span>
            </button>
          </div>

          {/* Alerts */}
          {error && (
            <div className="p-3.5 bg-rose-950/70 border border-rose-700/60 text-rose-200 text-xs font-semibold rounded-2xl flex items-center gap-2.5">
              <span className="material-symbols-outlined text-base shrink-0 text-rose-400">error</span>
              <span>{error}</span>
            </div>
          )}
          {successMsg && (
            <div className="p-3.5 bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-semibold rounded-2xl flex items-center gap-2.5">
              <span className="material-symbols-outlined text-base shrink-0 text-emerald-400">check_circle</span>
              <span>{successMsg}</span>
            </div>
          )}

          {/* ══ PASSWORD LOGIN ══ */}
          {loginMethod === "password" && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="login-id" className="block text-xs font-bold text-emerald-300">Email Address</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[18px] pointer-events-none">mail</span>
                  <input id="login-id" type="email" required value={userId} onChange={(e) => setUserId(e.target.value)}
                    placeholder="farmer@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#164A34] bg-[#002216] focus:bg-[#002B1B] focus:border-emerald-400 text-xs font-medium text-white placeholder-slate-500 outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label htmlFor="login-password" className="block text-xs font-bold text-emerald-300">Password</label>
                  <button type="button" onClick={() => onNavigate && onNavigate("forgot-password")}
                    className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 hover:underline cursor-pointer">
                    Forgot password?
                  </button>
                </div>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[18px] pointer-events-none">lock</span>
                  <input id="login-password" type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-11 py-3 rounded-xl border border-[#164A34] bg-[#002216] focus:bg-[#002B1B] focus:border-emerald-400 text-xs font-medium text-white placeholder-slate-500 outline-none transition-all" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-slate-400 hover:text-white cursor-pointer" title={showPassword ? "Hide" : "Show"}>
                    <span className="material-symbols-outlined text-[18px]">{showPassword ? "visibility_off" : "visibility"}</span>
                  </button>
                </div>
              </div>

              <button type="submit" id="submit-login-btn" disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2">
                {loading ? (
                  <><span className="material-symbols-outlined text-base animate-spin">refresh</span><span>Verifying...</span></>
                ) : (
                  <><span>Sign In to Simulator</span><span className="material-symbols-outlined text-base">login</span></>
                )}
              </button>
            </form>
          )}

          {/* ══ OTP LOGIN ══ */}
          {loginMethod === "otp" && otpStep === "email" && (
            <form onSubmit={handleOtpSend} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="otp-login-email" className="block text-xs font-bold text-emerald-300">Registered Email Address</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[18px] pointer-events-none">mail</span>
                  <input id="otp-login-email" type="email" required value={otpEmail} onChange={(e) => setOtpEmail(e.target.value)}
                    placeholder="farmer@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#164A34] bg-[#002216] focus:bg-[#002B1B] focus:border-emerald-400 text-xs font-medium text-white placeholder-slate-500 outline-none transition-all" />
                </div>
                <p className="text-[10px] text-slate-400">A 6-digit OTP will be sent to this email.</p>
              </div>

              <button type="submit" id="submit-otp-send-btn" disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">
                {loading ? (
                  <><span className="material-symbols-outlined text-base animate-spin">refresh</span><span>Sending OTP...</span></>
                ) : (
                  <><span>Send OTP Code</span><span className="material-symbols-outlined text-base">send</span></>
                )}
              </button>
            </form>
          )}

          {loginMethod === "otp" && otpStep === "verify" && (
            <form onSubmit={handleOtpVerify} className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs text-slate-300 text-center">
                  OTP sent to <strong className="text-emerald-300">{otpEmail}</strong>
                </p>
                <label htmlFor="otp-login-code" className="block text-xs font-bold text-emerald-300 text-center">6-Digit OTP Code</label>
                <input id="otp-login-code" type="text" inputMode="numeric" pattern="\d{6}" maxLength={6}
                  required autoFocus value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="000000"
                  className="w-full text-center text-3xl font-black tracking-[0.6em] py-4 px-4 rounded-2xl border-2 border-[#164A34] bg-[#002216] focus:bg-[#002B1B] focus:border-emerald-400 text-white placeholder-slate-600 outline-none transition-all" />
                <p className="text-[10px] text-slate-400 text-center">Check inbox and spam. Code expires in 10 minutes.</p>
              </div>

              <button type="submit" id="submit-otp-verify-btn" disabled={loading || otpCode.length !== 6}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">
                {loading ? (
                  <><span className="material-symbols-outlined text-base animate-spin">refresh</span><span>Verifying OTP...</span></>
                ) : (
                  <><span className="material-symbols-outlined text-base">verified_user</span><span>Verify &amp; Sign In</span></>
                )}
              </button>

              <div className="flex items-center justify-between pt-1">
                <button type="button" onClick={() => { setOtpStep("email"); setError(null); }}
                  className="text-xs font-semibold text-slate-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer">
                  <span className="material-symbols-outlined text-sm">arrow_back</span><span>Change Email</span>
                </button>
                <button type="button" onClick={handleOtpResend} disabled={otpCountdown > 0}
                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-200 disabled:text-slate-500 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer">
                  <span className="material-symbols-outlined text-sm">send</span>
                  <span>{otpCountdown > 0 ? `Resend in ${otpCountdown}s` : "Resend OTP"}</span>
                </button>
              </div>
            </form>
          )}

          {/* Register link */}
          <div className="pt-3 border-t border-[#164A34] text-center">
            <p className="text-xs text-slate-300">
              Don't have an account yet?{" "}
              <button type="button" onClick={() => onNavigate && onNavigate("signup")}
                className="font-bold text-emerald-400 hover:text-emerald-300 underline cursor-pointer ml-1">
                Register New Account
              </button>
            </p>
          </div>
        </div>
      </main>

      <footer className="relative z-10 py-4 px-4 text-center text-xs text-slate-400">
        KrishiMitra • Deterministic Decision Engine v2.0 • Offline Native
      </footer>
    </div>
  );
}
