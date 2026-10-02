import React, { useState, useEffect } from "react";
import { getAuthRedirectUrl, requireSupabase } from "../../services/supabase.js";

const INDIAN_STATES = [
  "Maharashtra", "Karnataka", "Gujarat", "Madhya Pradesh", "Punjab",
  "Haryana", "Rajasthan", "Uttar Pradesh", "Andhra Pradesh", "Telangana",
  "Tamil Nadu", "Bihar", "West Bengal", "Other",
];

export default function SignupPage({ onNavigate, onLoginSuccess }) {
  // ── Form fields ─────────────────────────────────────────────
  const [fullName, setFullName]           = useState("");
  const [email, setEmail]                 = useState("");
  const [phone, setPhone]                 = useState("");
  const [taluka, setTaluka]               = useState("");
  const [district, setDistrict]           = useState("");
  const [state, setState]                 = useState("Maharashtra");
  const country                           = "India";
  const [landAcres, setLandAcres]         = useState("5.0");
  const [preferredLang, setPreferredLang] = useState("mr");
  const [password, setPassword]           = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword]   = useState(false);

  // ── Verification method ─────────────────────────────────────
  const [verifyMethod, setVerifyMethod] = useState("email"); // 'email' | 'otp'

  // ── OTP step ────────────────────────────────────────────────
  const [step, setStep]                     = useState("form"); // 'form' | 'otp-verify'
  const [otpCode, setOtpCode]               = useState("");
  const [pendingEmail, setPendingEmail]     = useState("");
  const [otpCountdown, setOtpCountdown]     = useState(0);

  // ── UI state ────────────────────────────────────────────────
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // OTP resend countdown timer
  useEffect(() => {
    if (otpCountdown <= 0) return;
    const t = setTimeout(() => setOtpCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [otpCountdown]);

  // ── Build farmer profile ─────────────────────────────────────
  const buildProfile = (cleanName) => {
    const stateCode   = (state || "MH").replace(/[^a-zA-Z]/g, "").slice(0, 2).toUpperCase() || "MH";
    const distCode    = (district.trim() || "AGR").replace(/[^a-zA-Z]/g, "").slice(0, 3).toUpperCase() || "AGR";
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    return {
      farmer_id:         `${stateCode}-${distCode}-${randomSuffix}`,
      full_name:          cleanName,
      phone:              phone.trim(),
      village:            taluka.trim(),
      taluka:             taluka.trim(),
      district:           district.trim(),
      state:              state.trim() || "Maharashtra",
      country,
      total_land_acres:   parseFloat(landAcres) || 5.0,
      preferred_language: preferredLang,
      role:               "farmer",
    };
  };

  // ── Step 1: Form submit ──────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const cleanName  = fullName.trim();
    const cleanEmail = email.trim();

    if (!cleanName || !cleanEmail) {
      setError("Please fill in Full Name and Email Address.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Password required only for Email Link mode
    if (verifyMethod === "email") {
      const pw = password.trim();
      if (!pw || pw.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
      if (pw !== confirmPassword.trim()) {
        setError("Passwords do not match. Please re-enter.");
        return;
      }
    }

    setLoading(true);
    const profile = buildProfile(cleanName);

    try {
      if (verifyMethod === "email") {
        // ── Email confirmation link flow ──
        const { data, error: signUpError } = await requireSupabase().auth.signUp({
          email: cleanEmail,
          password: password.trim(),
          options: {
            data: profile,
            emailRedirectTo: getAuthRedirectUrl(),
          },
        });
        if (signUpError) throw signUpError;

        // Only auto-login if Supabase returns a live session (email confirm disabled)
        if (data.session && onLoginSuccess) {
          onLoginSuccess({
            id:    data.user.id,
            name:  profile.full_name,
            email: cleanEmail,
            token: data.session.access_token,
          });
        }

        if (data.session) {
          setSuccessMsg(`Welcome to KrishiMitra, ${cleanName}! Opening simulator...`);
          setTimeout(() => { setLoading(false); if (onNavigate) onNavigate("dashboard"); }, 2000);
        } else {
          setSuccessMsg(
            `✅ Account created! A confirmation email was sent to ${cleanEmail}. ` +
            `Please click the link in your inbox to activate your account, then sign in.`
          );
          setTimeout(() => { setLoading(false); if (onNavigate) onNavigate("login"); }, 3500);
        }
      } else {
        // ── OTP (passwordless) flow ──
        const { error: otpError } = await requireSupabase().auth.signInWithOtp({
          email: cleanEmail,
          options: {
            shouldCreateUser: true,
            data: profile,
          },
        });
        if (otpError) throw otpError;

        setPendingEmail(cleanEmail);
        setOtpCountdown(60);
        setOtpCode("");
        setStep("otp-verify");
        setLoading(false);
      }
    } catch (err) {
      setError(err.message || "Registration failed. Please check your details.");
      setLoading(false);
    }
  };

  // ── Step 2: Verify OTP ───────────────────────────────────────
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
        email: pendingEmail,
        token: code,
        type:  "email",
      });
      if (verifyError) throw verifyError;
      if (!data.session) throw new Error("OTP verified but no session returned. Please try again.");

      if (onLoginSuccess) {
        onLoginSuccess({
          id:    data.user.id,
          name:  data.user.user_metadata?.full_name || fullName.trim(),
          email: data.user.email,
          token: data.session.access_token,
        });
      }
      setSuccessMsg("✅ OTP verified! Welcome to KrishiMitra. Opening simulator...");
      setTimeout(() => { setLoading(false); if (onNavigate) onNavigate("dashboard"); }, 1500);
    } catch (err) {
      setError(err.message || "Invalid or expired OTP. Please check your email and try again.");
      setLoading(false);
    }
  };

  // ── Resend OTP ───────────────────────────────────────────────
  const handleResendOtp = async () => {
    if (otpCountdown > 0) return;
    setError(null);
    setOtpCountdown(60);
    try {
      const { error: resendError } = await requireSupabase().auth.signInWithOtp({
        email: pendingEmail,
        options: { shouldCreateUser: false },
      });
      if (resendError) throw resendError;
    } catch (err) {
      setError(err.message || "Failed to resend OTP.");
    }
  };

  // ════════════════════════════════════════════════════════════
  // RENDER
  // ════════════════════════════════════════════════════════════
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
              <span className="text-xs text-emerald-300/80 block">Agri Scenario &amp; Decision Simulator</span>
            </div>
          </button>

          <div className="flex items-center gap-4">
            <button type="button" onClick={() => onNavigate && onNavigate("login")}
              className="flex items-center gap-1.5 text-xs font-semibold text-emerald-200 hover:text-white bg-white/5 hover:bg-white/10 border border-[#164A34] hover:border-emerald-500/40 px-3.5 py-2 rounded-xl transition-all cursor-pointer">
              <span className="material-symbols-outlined text-sm">login</span>
              <span>Sign In</span>
            </button>
            <button type="button" onClick={() => onNavigate && onNavigate("launch")}
              className="flex items-center gap-1.5 text-xs font-semibold text-emerald-200 hover:text-white bg-white/5 hover:bg-white/10 border border-[#164A34] hover:border-emerald-500/40 px-3.5 py-2 rounded-xl transition-all cursor-pointer">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-2xl bg-[#002D1D]/90 backdrop-blur-xl rounded-3xl border border-[#164A34] shadow-2xl p-6 sm:p-8 space-y-6">

          {/* ── OTP VERIFY STEP ── */}
          {step === "otp-verify" ? (
            <>
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mb-1">
                  <span className="material-symbols-outlined text-[30px]">phonelink_lock</span>
                </div>
                <h1 className="text-2xl font-black text-white tracking-tight">Enter Your OTP</h1>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We sent a 6-digit code to<br />
                  <span className="font-bold text-emerald-300">{pendingEmail}</span>
                </p>
              </div>

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

              <form onSubmit={handleOtpVerify} className="space-y-5">
                {/* OTP Input */}
                <div className="space-y-2">
                  <label htmlFor="otp-input" className="block text-xs font-bold text-emerald-300 text-center">
                    6-Digit OTP Code
                  </label>
                  <input
                    id="otp-input"
                    type="text"
                    inputMode="numeric"
                    pattern="\d{6}"
                    maxLength={6}
                    required
                    autoFocus
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="000000"
                    className="w-full text-center text-3xl font-black tracking-[0.6em] py-4 px-4 rounded-2xl border-2 border-[#164A34] bg-[#002216] focus:bg-[#002B1B] focus:border-emerald-400 text-white placeholder-slate-600 outline-none transition-all"
                  />
                  <p className="text-[10px] text-slate-400 text-center">
                    Check your inbox (and spam folder). Code expires in 10 minutes.
                  </p>
                </div>

                {/* Verify Button */}
                <button type="submit" id="submit-otp-verify-btn" disabled={loading || otpCode.length !== 6}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">
                  {loading ? (
                    <><span className="material-symbols-outlined text-base animate-spin">refresh</span><span>Verifying OTP...</span></>
                  ) : (
                    <><span className="material-symbols-outlined text-base">verified_user</span><span>Verify &amp; Sign In</span></>
                  )}
                </button>

                {/* Resend + Back */}
                <div className="flex items-center justify-between pt-1">
                  <button type="button" onClick={() => { setStep("form"); setError(null); setSuccessMsg(null); }}
                    className="text-xs font-semibold text-slate-400 hover:text-emerald-300 flex items-center gap-1 transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    <span>Change Email</span>
                  </button>
                  <button type="button" onClick={handleResendOtp} disabled={otpCountdown > 0}
                    className="text-xs font-semibold text-emerald-400 hover:text-emerald-200 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">send</span>
                    <span>{otpCountdown > 0 ? `Resend in ${otpCountdown}s` : "Resend OTP"}</span>
                  </button>
                </div>
              </form>
            </>
          ) : (
            /* ── REGISTRATION FORM STEP ── */
            <>
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mb-1">
                  <span className="material-symbols-outlined text-[26px]">how_to_reg</span>
                </div>
                <h1 className="text-2xl font-black text-white tracking-tight">Create Your Farmer Account</h1>
                <p className="text-xs text-slate-300">Register to simulate crop seasons, save farm profiles &amp; predict risks</p>
              </div>

              {/* ── VERIFICATION METHOD SELECTOR ── */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-400 block">Choose Verification Method</span>
                <div className="grid grid-cols-2 gap-3">
                  {/* OTP Option */}
                  <button
                    type="button"
                    onClick={() => setVerifyMethod("otp")}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                      verifyMethod === "otp"
                        ? "border-emerald-400 bg-emerald-500/10 shadow-lg shadow-emerald-500/20"
                        : "border-[#164A34] bg-[#002216] hover:border-emerald-600/60 hover:bg-emerald-900/10"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      verifyMethod === "otp" ? "bg-emerald-500/20" : "bg-[#164A34]"
                    }`}>
                      <span className={`material-symbols-outlined text-[22px] ${verifyMethod === "otp" ? "text-emerald-300" : "text-slate-400"}`}>
                        phonelink_lock
                      </span>
                    </div>
                    <div>
                      <p className={`text-xs font-extrabold ${verifyMethod === "otp" ? "text-emerald-300" : "text-slate-300"}`}>
                        OTP Code
                      </p>
                      <p className="text-[10px] text-slate-400 leading-tight">
                        6-digit code sent to your email. No password needed.
                      </p>
                    </div>
                    {verifyMethod === "otp" && (
                      <span className="material-symbols-outlined text-emerald-400 text-base self-start">check_circle</span>
                    )}
                  </button>

                  {/* Email Link Option */}
                  <button
                    type="button"
                    onClick={() => setVerifyMethod("email")}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                      verifyMethod === "email"
                        ? "border-emerald-400 bg-emerald-500/10 shadow-lg shadow-emerald-500/20"
                        : "border-[#164A34] bg-[#002216] hover:border-emerald-600/60 hover:bg-emerald-900/10"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      verifyMethod === "email" ? "bg-emerald-500/20" : "bg-[#164A34]"
                    }`}>
                      <span className={`material-symbols-outlined text-[22px] ${verifyMethod === "email" ? "text-emerald-300" : "text-slate-400"}`}>
                        mark_email_read
                      </span>
                    </div>
                    <div>
                      <p className={`text-xs font-extrabold ${verifyMethod === "email" ? "text-emerald-300" : "text-slate-300"}`}>
                        Email Link
                      </p>
                      <p className="text-[10px] text-slate-400 leading-tight">
                        Confirmation link sent to email. Set a password.
                      </p>
                    </div>
                    {verifyMethod === "email" && (
                      <span className="material-symbols-outlined text-emerald-400 text-base self-start">check_circle</span>
                    )}
                  </button>
                </div>
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

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* SECTION 1: Account Details */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-emerald-400 block border-b border-[#164A34] pb-1">
                    1. Account &amp; Login Details
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-emerald-300">Full Name *</label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[18px] pointer-events-none">person</span>
                        <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Shivaji Patil"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#164A34] bg-[#002216] focus:bg-[#002B1B] focus:border-emerald-400 text-xs font-medium text-white placeholder-slate-500 outline-none transition-all" />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-emerald-300">Email Address *</label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[18px] pointer-events-none">mail</span>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                          placeholder="farmer@example.com"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#164A34] bg-[#002216] focus:bg-[#002B1B] focus:border-emerald-400 text-xs font-medium text-white placeholder-slate-500 outline-none transition-all" />
                      </div>
                    </div>
                  </div>

                  {/* Password fields — only for email mode */}
                  {verifyMethod === "email" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-emerald-300">Password *</label>
                        <div className="relative flex items-center">
                          <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[18px] pointer-events-none">lock</span>
                          <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)}
                            placeholder="Minimum 6 characters"
                            className="w-full pl-10 pr-11 py-2.5 rounded-xl border border-[#164A34] bg-[#002216] focus:bg-[#002B1B] focus:border-emerald-400 text-xs font-medium text-white placeholder-slate-500 outline-none transition-all" />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer">
                            <span className="material-symbols-outlined text-[20px]">{showPassword ? "visibility_off" : "visibility"}</span>
                          </button>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-emerald-300">Confirm Password *</label>
                        <div className="relative flex items-center">
                          <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[18px] pointer-events-none">lock_reset</span>
                          <input type={showPassword ? "text" : "password"} required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Re-enter password"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#164A34] bg-[#002216] focus:bg-[#002B1B] focus:border-emerald-400 text-xs font-medium text-white placeholder-slate-500 outline-none transition-all" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* OTP mode hint */}
                  {verifyMethod === "otp" && (
                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-900/20 border border-emerald-700/30">
                      <span className="material-symbols-outlined text-emerald-400 text-base shrink-0 mt-0.5">info</span>
                      <p className="text-[11px] text-emerald-200 leading-relaxed">
                        <strong>Passwordless OTP:</strong> A 6-digit code will be sent to your email. No password required — you can always log in using an OTP code.
                      </p>
                    </div>
                  )}
                </div>

                {/* SECTION 2: Location & Farm Profile */}
                <div className="space-y-3 pt-1">
                  <span className="text-xs font-bold text-emerald-400 block border-b border-[#164A34] pb-1">
                    2. Location &amp; Farm Profile
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Taluka */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-emerald-300">Taluka / Village</label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3 text-slate-400 text-[16px] pointer-events-none">location_on</span>
                        <input type="text" value={taluka} onChange={(e) => setTaluka(e.target.value)} placeholder="e.g. Warnanagar"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#164A34] bg-[#002216] focus:bg-[#002B1B] focus:border-emerald-400 text-xs font-medium text-white placeholder-slate-500 outline-none transition-all" />
                      </div>
                    </div>

                    {/* District */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-emerald-300">District</label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3 text-slate-400 text-[16px] pointer-events-none">map</span>
                        <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} placeholder="e.g. Kolhapur"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#164A34] bg-[#002216] focus:bg-[#002B1B] focus:border-emerald-400 text-xs font-medium text-white placeholder-slate-500 outline-none transition-all" />
                      </div>
                    </div>

                    {/* State */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-emerald-300">State</label>
                      <select value={state} onChange={(e) => setState(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-[#164A34] bg-[#002216] focus:bg-[#002B1B] focus:border-emerald-400 text-xs font-medium text-white outline-none transition-all cursor-pointer">
                        {INDIAN_STATES.map((st) => (
                          <option key={st} value={st} className="bg-[#002216] text-white">{st}</option>
                        ))}
                      </select>
                    </div>

                    {/* Country (readonly) */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-emerald-300">Country</label>
                        <span className="text-[10px] text-emerald-400/80 font-medium">Default</span>
                      </div>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3 text-emerald-400 text-[16px] pointer-events-none">public</span>
                        <input type="text" readOnly aria-readonly="true" value="India"
                          className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-[#164A34] bg-[#001A10] text-xs font-medium text-emerald-200 outline-none cursor-not-allowed" />
                        <span className="material-symbols-outlined absolute right-3 text-slate-500 text-[16px] pointer-events-none" aria-hidden="true">lock</span>
                      </div>
                    </div>

                    {/* Land Acres */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-emerald-300">Total Land (Acres)</label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3 text-slate-400 text-[16px] pointer-events-none">agriculture</span>
                        <input type="number" step="0.5" min="0.5" value={landAcres} onChange={(e) => setLandAcres(e.target.value)} placeholder="5.0"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#164A34] bg-[#002216] focus:bg-[#002B1B] focus:border-emerald-400 text-xs font-medium text-white placeholder-slate-500 outline-none transition-all" />
                      </div>
                    </div>

                    {/* Phone (optional) */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-emerald-300">Phone (Optional)</label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3 text-slate-400 text-[16px] pointer-events-none">call</span>
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98221 44520"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#164A34] bg-[#002216] focus:bg-[#002B1B] focus:border-emerald-400 text-xs font-medium text-white placeholder-slate-500 outline-none transition-all" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button type="submit" id="submit-register-btn" disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2">
                  {loading ? (
                    <><span className="material-symbols-outlined text-base animate-spin">refresh</span><span>Creating Account...</span></>
                  ) : verifyMethod === "otp" ? (
                    <><span>Send OTP &amp; Continue</span><span className="material-symbols-outlined text-base">phonelink_lock</span></>
                  ) : (
                    <><span>Create Account &amp; Start Simulator</span><span className="material-symbols-outlined text-base">arrow_forward</span></>
                  )}
                </button>
              </form>

              <div className="pt-3 flex items-center justify-center text-xs border-t border-[#164A34]">
                <span className="text-slate-300">
                  Already have an account?{" "}
                  <button type="button" onClick={() => onNavigate && onNavigate("login")}
                    className="font-bold text-emerald-400 hover:text-emerald-300 underline cursor-pointer ml-1">
                    Sign In
                  </button>
                </span>
              </div>
            </>
          )}
        </div>
      </main>

      <footer className="relative z-10 py-4 px-4 text-center text-xs text-slate-400">
        KrishiMitra • Deterministic Decision Engine v2.0 • Made for Indian Farmers 🇮🇳
      </footer>
    </div>
  );
}
