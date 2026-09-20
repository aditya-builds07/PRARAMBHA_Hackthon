import React, { useState } from "react";

export default function LoginPage({ onNavigate, onLoginSuccess }) {
  const [userId, setUserId] = useState("MH-PUN-042");
  const [password, setPassword] = useState("farmer2026");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!userId.trim() || !password.trim()) {
      setError("Please provide both your Farmer/User ID and Password.");
      return;
    }

    setLoading(true);

    try {
      // Simulate authenticating the Farmer ID and password
      const mockToken = "km_auth_" + Date.now();
      const farmerName = userId.includes("OFFICER")
        ? "Dr. Rajesh Kulkarni (Agri Officer)"
        : "Shivaji Patil (Baramati Farm)";

      localStorage.setItem("user_id", userId.trim());
      localStorage.setItem("farmer_id", userId.trim());
      localStorage.setItem("user_name", farmerName);
      localStorage.setItem("supabase_token", mockToken);
      localStorage.setItem("user_email", userId.includes("@") ? userId : `${userId.toLowerCase()}@krishimitra.in`);

      if (onLoginSuccess) {
        onLoginSuccess({
          id: userId.trim(),
          name: farmerName,
          token: mockToken,
        });
      }

      setSuccessMsg(`Welcome back, ${farmerName}! Redirecting to simulator...`);

      setTimeout(() => {
        setLoading(false);
        if (onNavigate) {
          onNavigate("dashboard");
        }
      }, 700);
    } catch (err) {
      setError(err.message || "Failed to sign in. Please verify your ID and password.");
      setLoading(false);
    }
  };

  const handleQuickFill = (presetId, presetPassword) => {
    setUserId(presetId);
    setPassword(presetPassword);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#001E13] text-slate-100 flex flex-col justify-between font-sans selection:bg-emerald-500 selection:text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar with Brand & Back Button */}
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
                <span className="font-extrabold text-lg text-white tracking-tight">
                  KRISHIMITRA
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  v2.0
                </span>
              </div>
              <span className="text-[11px] text-emerald-300/70 block">
                Agri Scenario & Decision Simulator
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate && onNavigate("launch")}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Back to Launch</span>
          </button>
        </div>
      </header>

      {/* Main Login Form Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-md bg-[#002D1D]/90 backdrop-blur-xl rounded-3xl border border-[#164A34] shadow-2xl p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mb-1">
              <span className="material-symbols-outlined text-[26px]">badge</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Sign In to Your Account
            </h1>
            <p className="text-xs text-slate-300">
              Enter your Farmer ID or User ID along with your password
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="p-3.5 bg-rose-950/70 border border-rose-700/60 text-rose-200 text-xs font-semibold rounded-2xl flex items-center gap-2.5 animate-fadeIn">
              <span className="material-symbols-outlined text-base shrink-0 text-rose-400">error</span>
              <span>{error}</span>
            </div>
          )}

          {/* Success Alert */}
          {successMsg && (
            <div className="p-3.5 bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-semibold rounded-2xl flex items-center gap-2.5 animate-fadeIn">
              <span className="material-symbols-outlined text-base shrink-0 text-emerald-400">check_circle</span>
              <span>{successMsg}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ID Input */}
            <div className="space-y-1.5">
              <label htmlFor="login-id" className="block text-xs font-bold text-emerald-300">
                Farmer ID / User ID / Email
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[18px] pointer-events-none">
                  badge
                </span>
                <input
                  id="login-id"
                  type="text"
                  required
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="e.g. MH-PUN-042 or farmer@krishimitra.in"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#164A34] bg-[#002216] focus:bg-[#002B1B] focus:border-emerald-400 text-xs font-medium text-white placeholder-slate-500 outline-none transition-all"
                />
              </div>
              <p className="text-[10px] text-slate-400">
                Supports Farmer Registration ID, Aadhaar ID, or registered email.
              </p>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="login-password" className="block text-xs font-bold text-emerald-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate("forgot-password")}
                  className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[18px] pointer-events-none">
                  lock
                </span>
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-[#164A34] bg-[#002216] focus:bg-[#002B1B] focus:border-emerald-400 text-xs font-medium text-white placeholder-slate-500 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-white cursor-pointer"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2 pt-1">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded bg-[#002216] border-[#164A34] text-emerald-500 focus:ring-emerald-400 cursor-pointer"
              />
              <label htmlFor="remember-me" className="text-xs text-slate-300 cursor-pointer select-none">
                Remember this ID on this device (offline ready)
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              id="submit-login-btn"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined text-base animate-spin">refresh</span>
                  <span>Verifying ID & Password...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Simulator</span>
                  <span className="material-symbols-outlined text-base">login</span>
                </>
              )}
            </button>
          </form>

          {/* One-Click Demo Credentials */}
          <div className="pt-3 border-t border-[#164A34] space-y-2.5">
            <div className="text-center">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                Quick Test Credentials (1-Click Fill)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                id="quick-farmer-login"
                onClick={() => handleQuickFill("MH-PUN-042", "farmer2026")}
                className="p-2.5 rounded-xl bg-[#002216] hover:bg-[#164A34] border border-[#164A34] text-left transition-colors cursor-pointer group"
              >
                <div className="text-[10px] font-bold text-emerald-400 group-hover:text-emerald-300">
                  Farmer Account
                </div>
                <div className="text-[11px] font-mono text-white truncate">
                  ID: MH-PUN-042
                </div>
                <div className="text-[9px] text-slate-400">
                  Pass: farmer2026
                </div>
              </button>

              <button
                type="button"
                id="quick-officer-login"
                onClick={() => handleQuickFill("AGRI-OFFICER-01", "officer2026")}
                className="p-2.5 rounded-xl bg-[#002216] hover:bg-[#164A34] border border-[#164A34] text-left transition-colors cursor-pointer group"
              >
                <div className="text-[10px] font-bold text-teal-400 group-hover:text-teal-300">
                  Agri Officer
                </div>
                <div className="text-[11px] font-mono text-white truncate">
                  ID: AGRI-OFFICER-01
                </div>
                <div className="text-[9px] text-slate-400">
                  Pass: officer2026
                </div>
              </button>
            </div>
          </div>

          {/* Guest / Direct Entry */}
          <div className="pt-2 text-center space-y-2">
            <button
              type="button"
              onClick={() => onNavigate && onNavigate("dashboard")}
              className="text-xs text-slate-300 hover:text-emerald-300 transition-colors underline cursor-pointer"
            >
              Skip sign-in & enter simulator as Guest
            </button>
            <p className="text-[11px] text-slate-400">
              Need a new ID?{" "}
              <button
                type="button"
                onClick={() => onNavigate && onNavigate("signup")}
                className="font-bold text-emerald-400 hover:underline cursor-pointer"
              >
                Register Farm ID
              </button>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 px-4 text-center text-xs text-slate-400">
        KrishiMitra • Deterministic Decision Engine v2.0 • Offline Native
      </footer>
    </div>
  );
}
