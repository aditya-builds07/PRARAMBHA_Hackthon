import React, { useState, useEffect, useRef } from "react";
import { requireSupabase } from "../../services/supabase.js";

export default function LoginPage({ onNavigate, onLoginSuccess }) {
  const [loginMethod, setLoginMethod]     = useState("password"); // 'password' | 'link'

  // Password login
  const [userId, setUserId]               = useState("");
  const [password, setPassword]           = useState("");
  const [showPassword, setShowPassword]   = useState(false);

  // Email Magic Link login
  const [linkEmail, setLinkEmail]         = useState("");
  const [linkSent, setLinkSent]           = useState(false);
  const [linkCountdown, setLinkCountdown] = useState(0);
  const [linkOtpCode, setLinkOtpCode]     = useState("");

  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const verifiedRef = useRef(false);

  // Link resend countdown
  useEffect(() => {
    if (linkCountdown <= 0) return;
    const t = setTimeout(() => setLinkCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [linkCountdown]);

  // Auto-detect login link click
  useEffect(() => {
    let mounted = true;
    const client = requireSupabase();
    if (!client) return;

    const handleSession = (session) => {
      if (!mounted || !session?.user || verifiedRef.current) return;
      verifiedRef.current = true;
      if (onLoginSuccess) {
        onLoginSuccess({
          id:    session.user.id,
          name:  session.user.user_metadata?.full_name || session.user.email,
          email: session.user.email,
          token: session.access_token,
        });
      }
      setSuccessMsg(`Welcome, ${session.user.user_metadata?.full_name || session.user.email}! Opening simulator...`);
      setTimeout(() => {
        setLoading(false);
        if (onNavigate) onNavigate("dashboard");
      }, 600);
    };

    client.auth.getSession().then(({ data }) => {
      const isOtpReturn = typeof window !== "undefined" && window.location.search.includes("otp=true");
      if (data?.session && (isOtpReturn || (loginMethod === "link" && linkSent))) {
        handleSession(data.session);
      }
    });

    const { data: listener } = client.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        handleSession(session);
      }
    });

    return () => {
      mounted = false;
      listener?.subscription?.unsubscribe?.();
    };
  }, [loginMethod, linkSent]);

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

  // ── Email Magic Link: Send ──────────────────────────────────
  const handleMagicLinkSend = async (e) => {
    e.preventDefault();
    setError(null);
    const cleanEmail = linkEmail.trim();
    if (!cleanEmail || !/\S+@\S+\.\S+/.test(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const emailRedirectTo = typeof window !== "undefined"
        ? `${window.location.origin}/login?otp=true`
        : undefined;

      const { error: otpError } = await requireSupabase().auth.signInWithOtp({
        email: cleanEmail,
        options: {
          shouldCreateUser: false,
          emailRedirectTo,
        },
      });
      if (otpError) throw otpError;
      setLinkSent(true);
      setLinkCountdown(60);
      setSuccessMsg(`Sign-in link sent to ${cleanEmail}. Click the link in your email to sign in!`);
    } catch (err) {
      setError(err.message || "Failed to send sign-in link. Please check your email.");
    } finally {
      setLoading(false);
    }
  };

  // ── Email Magic Link: Manual OTP Code Verification ──────────
  const handleLinkOtpVerify = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const cleanCode = linkOtpCode.replace(/\D/g, "").trim();
    if (!cleanCode || cleanCode.length !== 6) {
      setError("Please enter the 6-digit verification code from your email.");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      let verifyRes = await requireSupabase().auth.verifyOtp({
        email: linkEmail.trim(),
        token: cleanCode,
        type: "email",
      });

      if (verifyRes.error) {
        verifyRes = await requireSupabase().auth.verifyOtp({
          email: linkEmail.trim(),
          token: cleanCode,
          type: "magiclink",
        });
      }

      if (verifyRes.error) throw verifyRes.error;
      if (!verifyRes.data?.session) {
        throw new Error("Code verified, but session could not be established. Please try signing in.");
      }

      if (onLoginSuccess) {
        onLoginSuccess({
          id:    verifyRes.data.session.user.id,
          name:  verifyRes.data.session.user.user_metadata?.full_name || verifyRes.data.session.user.email,
          email: verifyRes.data.session.user.email,
          token: verifyRes.data.session.access_token,
        });
      }
      setSuccessMsg("Welcome! Opening simulator...");
      setTimeout(() => { setLoading(false); if (onNavigate) onNavigate("dashboard"); }, 500);
    } catch (err) {
      console.error("[Login] OTP verify error:", err);
      setError(err.message || "Invalid or expired verification code. Please check your email.");
      setLoading(false);
    }
  };

  // ── Email Magic Link: Check Status ──────────────────────────
  const handleCheckLoginStatus = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: sessionErr } = await requireSupabase().auth.getSession();
      if (sessionErr) throw sessionErr;
      if (data?.session?.user) {
        if (onLoginSuccess) {
          onLoginSuccess({
            id:    data.session.user.id,
            name:  data.session.user.user_metadata?.full_name || data.session.user.email,
            email: data.session.user.email,
            token: data.session.access_token,
          });
        }
        setSuccessMsg("Welcome! Opening simulator...");
        setTimeout(() => { setLoading(false); if (onNavigate) onNavigate("dashboard"); }, 500);
      } else {
        setError("Sign-in link not clicked yet. Please click the link in your email.");
      }
    } catch (err) {
      setError(err.message || "Could not check sign-in status. Please try clicking the link in your email.");
    } finally {
      setLoading(false);
    }
  };

  // ── Email Magic Link: Resend ────────────────────────────────
  const handleMagicLinkResend = async () => {
    if (linkCountdown > 0) return;
    setError(null);
    setLinkCountdown(60);
    try {
      const emailRedirectTo = typeof window !== "undefined"
        ? `${window.location.origin}/login?otp=true`
        : undefined;

      const { error: resendError } = await requireSupabase().auth.signInWithOtp({
        email: linkEmail.trim(),
        options: {
          shouldCreateUser: false,
          emailRedirectTo,
        },
      });
      if (resendError) throw resendError;
      setSuccessMsg(`New sign-in link sent to ${linkEmail.trim()}. Check your inbox and spam.`);
      setTimeout(() => setSuccessMsg(null), 5000);
    } catch (err) {
      setError(err.message || "Failed to resend sign-in link.");
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
            <button type="button" onClick={() => { setLoginMethod("link"); setError(null); setSuccessMsg(null); }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                loginMethod === "link"
                  ? "bg-emerald-500 text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-emerald-300"
              }`}>
              <span className="material-symbols-outlined text-sm">mark_email_read</span>
              <span>Email Sign-In Link</span>
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

          {/* ══ EMAIL SIGN-IN LINK LOGIN ══ */}
          {loginMethod === "link" && !linkSent && (
            <form onSubmit={handleMagicLinkSend} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="link-login-email" className="block text-xs font-bold text-emerald-300">Registered Email Address</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[18px] pointer-events-none">mail</span>
                  <input id="link-login-email" type="email" required value={linkEmail} onChange={(e) => setLinkEmail(e.target.value)}
                    placeholder="farmer@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#164A34] bg-[#002216] focus:bg-[#002B1B] focus:border-emerald-400 text-xs font-medium text-white placeholder-slate-500 outline-none transition-all" />
                </div>
                <p className="text-[10px] text-slate-400">We will send an instant sign-in link to this email address.</p>
              </div>

              <button type="submit" id="submit-magic-link-btn" disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">
                {loading ? (
                  <><span className="material-symbols-outlined text-base animate-spin">refresh</span><span>Sending Sign-In Link...</span></>
                ) : (
                  <><span>Send Sign-In Link</span><span className="material-symbols-outlined text-base">send</span></>
                )}
              </button>
            </form>
          )}

          {loginMethod === "link" && linkSent && (
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-b from-[#003824] to-[#002719] border border-emerald-500/40 rounded-2xl space-y-3 text-center">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <span className="material-symbols-outlined text-[28px] animate-pulse">mark_email_read</span>
                </div>
                <h3 className="text-base font-bold text-white">Check Your Email</h3>
                <p className="text-xs text-slate-300">
                  We sent a sign-in link to <strong className="text-emerald-300">{linkEmail}</strong>
                </p>
                <p className="text-[11px] text-slate-400">
                  Click the <strong>&ldquo;Sign In&rdquo;</strong> button in that email. You will be logged in automatically!
                </p>

                <div className="pt-2 flex items-center justify-center gap-2 text-xs text-emerald-300 font-medium">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span>Waiting for you to click the link...</span>
                </div>
              </div>

              {/* OPTION 1: 6-Digit Code (Fastest if email opened on mobile) */}
              <form onSubmit={handleLinkOtpVerify} className="p-4 bg-gradient-to-b from-[#003824] to-[#002719] border border-emerald-500/40 rounded-2xl space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-emerald-300">
                      Enter 6-Digit Code from Email
                    </label>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      Fastest
                    </span>
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    value={linkOtpCode}
                    onChange={(e) => setLinkOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="123456"
                    className="w-full text-center text-2xl font-black tracking-[0.4em] py-2.5 px-3 rounded-xl border-2 border-[#164A34] bg-[#001E13] focus:border-emerald-400 text-white placeholder-slate-600 outline-none transition-all"
                  />
                  <p className="text-[10px] text-slate-400 text-center">
                    Enter the code if you opened the email on your phone.
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={loading || linkOtpCode.replace(/\D/g, "").length !== 6}
                  className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-sm">verified_user</span>
                  <span>Verify Code &amp; Sign In</span>
                </button>
              </form>

              {/* OPTION 2: Auto-detect Link Click on this PC */}
              <button
                type="button"
                onClick={handleCheckLoginStatus}
                disabled={loading}
                className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-[#164A34] text-slate-300 hover:text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-base">sync</span>
                <span>Already Clicked Link on this PC? Check Status</span>
              </button>

              {linkEmail.toLowerCase().includes("@gmail.com") && (
                <a
                  href="https://mail.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-[#164A34] hover:border-emerald-500/40 text-emerald-200 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base text-red-400">mail</span>
                  <span>Open Gmail on this PC ↗</span>
                </a>
              )}

              <div className="flex items-center justify-between pt-1">
                <button type="button" onClick={() => { setLinkSent(false); setError(null); }}
                  className="text-xs font-semibold text-slate-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer">
                  <span className="material-symbols-outlined text-sm">arrow_back</span><span>Change Email</span>
                </button>
                <button type="button" onClick={handleMagicLinkResend} disabled={linkCountdown > 0}
                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-200 disabled:text-slate-500 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer">
                  <span className="material-symbols-outlined text-sm">send</span>
                  <span>{linkCountdown > 0 ? `Resend in ${linkCountdown}s` : "Resend Sign-In Link"}</span>
                </button>
              </div>
            </div>
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
