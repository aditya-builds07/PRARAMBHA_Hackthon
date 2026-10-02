import React, { useState, useEffect, useRef } from "react";
import { requireSupabase } from "../../services/supabase.js";

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

  // ── OTP & Magic Link step ───────────────────────────────────
  const [step, setStep]                       = useState("form"); // 'form' | 'otp-verify'
  const [otpCode, setOtpCode]                 = useState("");
  const [pendingEmail, setPendingEmail]       = useState("");
  const [pendingPassword, setPendingPassword] = useState("");
  const [pendingProfile, setPendingProfile]   = useState(null);
  const [otpCountdown, setOtpCountdown]       = useState(0);

  // ── UI state ────────────────────────────────────────────────
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const verifiedRef = useRef(false);

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

  // ── Finalize session and set user password ───────────────────
  const completeSessionVerification = async (currentSession) => {
    if (!currentSession?.user || verifiedRef.current) return;
    verifiedRef.current = true;
    setLoading(true);

    let savedAuth = null;
    try {
      const raw = sessionStorage.getItem("krishimitra_pending_signup");
      if (raw) savedAuth = JSON.parse(raw);
    } catch {}

    const pwToSet = pendingPassword || savedAuth?.password;
    const profileToSet = pendingProfile || savedAuth?.profile;

    try {
      if (pwToSet) {
        const { error: updateError } = await requireSupabase().auth.updateUser({
          password: pwToSet,
          data: {
            ...(profileToSet || {}),
            email_verified: true,
          },
        });
        if (updateError) {
          console.warn("[Signup] updateUser password note:", updateError.message);
        }
      }

      try {
        sessionStorage.removeItem("krishimitra_pending_signup");
      } catch {}

      if (onLoginSuccess) {
        onLoginSuccess({
          id:    currentSession.user.id,
          name:  profileToSet?.full_name || currentSession.user.user_metadata?.full_name || fullName.trim() || currentSession.user.email,
          email: currentSession.user.email,
          token: currentSession.access_token,
        });
      }

      setSuccessMsg("🎉 Email verified via sign-in link! Account activated successfully. Opening dashboard...");
      setTimeout(() => {
        setLoading(false);
        if (onNavigate) onNavigate("dashboard");
      }, 1000);
    } catch (err) {
      console.error("[Signup] Error finalizing session verification:", err);
      setError(err.message || "Failed to finalize account setup. Please try signing in.");
      setLoading(false);
      verifiedRef.current = false;
    }
  };

  // ── Listen for Magic Link clicks & session changes ───────────
  useEffect(() => {
    let mounted = true;
    const supabaseClient = requireSupabase();
    if (!supabaseClient) return;

    // Check if session already established upon landing (e.g. from confirmation link redirect)
    supabaseClient.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      const session = data?.session;
      const isRedirected = typeof window !== "undefined" && (
        window.location.search.includes("verified=true") ||
        window.location.hash.includes("access_token")
      );
      if (session?.user && (isRedirected || step === "otp-verify")) {
        completeSessionVerification(session);
      }
    });

    // Real-time listener: triggers if user clicks the link in another or same browser tab
    const { data: listener } = supabaseClient.auth.onAuthStateChange(async (event, nextSession) => {
      if (!mounted) return;
      if (
        (event === "SIGNED_IN" || event === "EMAIL_CONFIRMED" || event === "USER_UPDATED") &&
        nextSession?.user
      ) {
        await completeSessionVerification(nextSession);
      }
    });

    return () => {
      mounted = false;
      listener?.subscription?.unsubscribe?.();
    };
  }, [pendingPassword, pendingProfile, step]);

  // ── Step 1: Submit Form -> Send Verification Link / OTP via Supabase ────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const cleanName  = fullName.trim();
    const cleanEmail = email.trim();
    const pw         = password.trim();

    if (!cleanName || !cleanEmail) {
      setError("Please fill in Full Name and Email Address.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!pw || pw.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (pw !== confirmPassword.trim()) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }

    setLoading(true);
    const profile = buildProfile(cleanName);

    try {
      const emailRedirectTo = typeof window !== "undefined"
        ? `${window.location.origin}/signup?verified=true`
        : undefined;

      // Save credentials in session storage for link click resumption
      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem("krishimitra_pending_signup", JSON.stringify({
            email: cleanEmail,
            password: pw,
            profile,
          }));
        } catch {}
      }

      // Send verification link / OTP directly to user's Gmail inbox via Supabase Auth
      const { error: otpError } = await requireSupabase().auth.signInWithOtp({
        email: cleanEmail,
        options: {
          shouldCreateUser: true,
          data: profile,
          emailRedirectTo,
        },
      });

      if (otpError) {
        if (otpError.message?.toLowerCase().includes("rate limit")) {
          throw new Error("Email send rate limit reached. Please wait 60 seconds before trying again.");
        }
        throw otpError;
      }

      setPendingEmail(cleanEmail);
      setPendingPassword(pw);
      setPendingProfile(profile);
      setOtpCountdown(60);
      setOtpCode("");
      setStep("otp-verify");
      setLoading(false);
      setSuccessMsg(`We sent a verification email to ${cleanEmail}. Click the sign-in link in your email to verify instantly, or enter the code below.`);
    } catch (err) {
      setError(err.message || "Failed to send verification email. Please check your email.");
      setLoading(false);
    }
  };

  // ── Step 2A: Manual OTP Code Verification ────────────────────
  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    const code = otpCode.trim();

    if (!code || code.length !== 6 || !/^\d{6}$/.test(code)) {
      setError("Please enter the 6-digit numeric verification code.");
      return;
    }

    setLoading(true);
    try {
      // 1. Verify 6-digit OTP token directly with Supabase Auth
      const { data: verifyData, error: verifyError } = await requireSupabase().auth.verifyOtp({
        email: pendingEmail,
        token: code,
        type: "email",
      });

      if (verifyError) throw verifyError;
      if (!verifyData?.session) throw new Error("Verification successful, but session could not be established. Please try again.");

      // 2. Finalize session setup with password and profile
      await completeSessionVerification(verifyData.session);
    } catch (err) {
      setError(err.message || "Invalid or expired verification code. Please check your email and try again.");
      setLoading(false);
    }
  };

  // ── Step 2B: Manual "Check Link Verification" Button ──────────
  const handleCheckEmailLinkStatus = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: sessionErr } = await requireSupabase().auth.getSession();
      if (sessionErr) throw sessionErr;
      if (data?.session?.user) {
        await completeSessionVerification(data.session);
      } else {
        setError("Sign-in link not detected yet. Please open your email and click the 'Sign In' link to verify.");
      }
    } catch (err) {
      setError(err.message || "Could not check verification status. Please click the link in your email.");
    } finally {
      setLoading(false);
    }
  };

  // ── Resend Verification Email / OTP ──────────────────────────
  const handleResendOtp = async () => {
    if (otpCountdown > 0) return;
    setError(null);
    setOtpCountdown(60);
    try {
      const emailRedirectTo = typeof window !== "undefined"
        ? `${window.location.origin}/signup?verified=true`
        : undefined;

      const { error: resendErr } = await requireSupabase().auth.signInWithOtp({
        email: pendingEmail,
        options: {
          shouldCreateUser: true,
          data: pendingProfile,
          emailRedirectTo,
        },
      });
      if (resendErr) throw resendErr;
      setSuccessMsg(`New verification email sent to ${pendingEmail}. Check your inbox and spam folder.`);
      setTimeout(() => setSuccessMsg(null), 5000);
    } catch (err) {
      setError(err.message || "Failed to resend verification email. Please wait a moment.");
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

          {/* ── STEP 2: EMAIL VERIFICATION & AUTHENTICATION ── */}
          {step === "otp-verify" ? (
            <>
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mb-1">
                  <span className="material-symbols-outlined text-[30px]">mail</span>
                </div>
                <h1 className="text-2xl font-black text-white tracking-tight">Verify Your Account</h1>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We sent an email verification &amp; sign-in link to<br />
                  <span className="font-bold text-emerald-300 text-sm">{pendingEmail}</span>
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

              {/* PRIMARY ACTION: Click Sign-In Link in Email */}
              <div className="p-4 bg-emerald-950/50 border border-emerald-500/30 rounded-2xl space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-lg">touch_app</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">
                      Option 1 (Fastest): Click Link in Your Email
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Check your Gmail inbox for the email from <strong>KrishiMitra</strong> and click the <strong>&ldquo;Sign In&rdquo; / &ldquo;Log In&rdquo;</strong> button.
                      This page will automatically detect the click and complete your registration!
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-emerald-800/40">
                  <div className="flex items-center gap-2 text-xs text-emerald-300/90 font-medium">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span>Waiting for email link click...</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCheckEmailLinkStatus}
                    disabled={loading}
                    className="w-full sm:w-auto px-3.5 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-sm">sync</span>
                    <span>Already Clicked? Check Status</span>
                  </button>
                </div>
              </div>

              {/* DIVIDER */}
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-[#164A34]"></div>
                <span className="flex-shrink mx-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  OR ENTER 6-DIGIT CODE
                </span>
                <div className="flex-grow border-t border-[#164A34]"></div>
              </div>

              {/* OPTION 2: 6-Digit Code */}
              <form onSubmit={handleOtpVerify} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="otp-input" className="block text-xs font-bold text-emerald-300 text-center">
                    Option 2: 6-Digit Verification Code (if shown in your email)
                  </label>
                  <input
                    id="otp-input"
                    type="text"
                    inputMode="numeric"
                    pattern="\d{6}"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="000000"
                    className="w-full text-center text-3xl font-black tracking-[0.6em] py-3.5 px-4 rounded-2xl border-2 border-[#164A34] bg-[#002216] focus:bg-[#002B1B] focus:border-emerald-400 text-white placeholder-slate-600 outline-none transition-all"
                  />
                  <p className="text-[10px] text-slate-400 text-center">
                    If your email contains a 6-digit code, enter it above and click verify.
                  </p>
                </div>

                {/* Verify Button */}
                <button
                  type="submit"
                  id="submit-otp-verify-btn"
                  disabled={loading || otpCode.length !== 6}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <><span className="material-symbols-outlined text-base animate-spin">refresh</span><span>Verifying...</span></>
                  ) : (
                    <><span className="material-symbols-outlined text-base">verified_user</span><span>Verify Code &amp; Start Simulator</span></>
                  )}
                </button>

                {/* Resend + Back */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setStep("form");
                      setError(null);
                      setSuccessMsg(null);
                      try { sessionStorage.removeItem("krishimitra_pending_signup"); } catch {}
                    }}
                    className="text-xs font-semibold text-slate-400 hover:text-emerald-300 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    <span>Change Details</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={otpCountdown > 0}
                    className="text-xs font-semibold text-emerald-400 hover:text-emerald-200 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">send</span>
                    <span>{otpCountdown > 0 ? `Resend in ${otpCountdown}s` : "Resend Email Link"}</span>
                  </button>
                </div>
              </form>
            </>
          ) : (
            /* ── STEP 1: REGISTRATION FORM ── */
            <>
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mb-1">
                  <span className="material-symbols-outlined text-[26px]">how_to_reg</span>
                </div>
                <h1 className="text-2xl font-black text-white tracking-tight">Create Your Farmer Account</h1>
                <p className="text-xs text-slate-300">Enter your details below. You will receive an OTP code to verify your account.</p>
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

                  {/* Password fields */}
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

                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-[11px] text-emerald-300">
                    <span className="material-symbols-outlined text-sm text-emerald-400">verified</span>
                    <span>An OTP verification code will be sent to your email to authenticate your account before login.</span>
                  </div>
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
                    <><span className="material-symbols-outlined text-base animate-spin">refresh</span><span>Sending Verification Code...</span></>
                  ) : (
                    <><span>Verify Email &amp; Create Account</span><span className="material-symbols-outlined text-base">arrow_forward</span></>
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
