import React, { useState } from "react";
import { getAuthRedirectUrl, requireSupabase } from "../../services/supabase.js";

const INDIAN_STATES = [
  "Maharashtra",
  "Karnataka",
  "Gujarat",
  "Madhya Pradesh",
  "Punjab",
  "Haryana",
  "Rajasthan",
  "Uttar Pradesh",
  "Andhra Pradesh",
  "Telangana",
  "Tamil Nadu",
  "Bihar",
  "West Bengal",
  "Other",
];

export default function SignupPage({ onNavigate, onLoginSuccess }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [taluka, setTaluka] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("Maharashtra");
  const country = "India";
  const [landAcres, setLandAcres] = useState("5.0");
  const [preferredLang, setPreferredLang] = useState("mr");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const cleanName = fullName.trim();
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanName || !cleanEmail || !cleanPassword) {
      setError("Please fill in Full Name, Email Address, and Password.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(cleanEmail)) {
      setError("Please enter a valid email address (e.g. farmer@example.com).");
      return;
    }

    if (cleanPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (cleanPassword !== confirmPassword.trim()) {
      setError("Passwords do not match. Please re-enter your password.");
      return;
    }

    setLoading(true);

    try {
      // Auto-generate backend reference ID without requiring farmer manual input
      const stateCode = (state || "MH").replace(/[^a-zA-Z]/g, "").slice(0, 2).toUpperCase() || "MH";
      const distCode = (district.trim() || "AGR").replace(/[^a-zA-Z]/g, "").slice(0, 3).toUpperCase() || "AGR";
      const randomSuffix = Math.floor(100 + Math.random() * 900);
      const autoFarmerId = `${stateCode}-${distCode}-${randomSuffix}`;

      const profile = {
        farmer_id: autoFarmerId,
        full_name: cleanName,
        phone: phone.trim(),
        village: taluka.trim(),
        taluka: taluka.trim(),
        district: district.trim(),
        state: state.trim() || "Maharashtra",
        country: country,
        total_land_acres: parseFloat(landAcres) || 5.0,
        preferred_language: preferredLang,
        role: "farmer",
      };

      const { data, error: signUpError } = await requireSupabase().auth.signUp({
        email: cleanEmail,
        password: cleanPassword,
        options: {
          data: profile,
          emailRedirectTo: getAuthRedirectUrl(),
        },
      });

      if (signUpError) throw signUpError;

      // Only log in immediately if Supabase returned a live session.
      // When email confirmation is enabled, data.session will be null —
      // do NOT call onLoginSuccess in that case; the user must confirm first.
      if (data.session && onLoginSuccess) {
        onLoginSuccess({
          id: data.user.id,
          name: profile.full_name,
          email: cleanEmail,
          token: data.session.access_token,
        });
      }

      if (data.session) {
        setSuccessMsg(`Welcome to KrishiMitra, ${cleanName}! Your account is ready. Opening simulator...`);
      } else {
        setSuccessMsg(
          `✅ Registration successful! A confirmation email has been sent to ${cleanEmail}. Please check your inbox (and spam folder) and click the link to activate your account before signing in.`
        );
      }

      setTimeout(() => {
        setLoading(false);
        if (data.session && onNavigate) {
          onNavigate("dashboard");
        } else if (!data.session && onNavigate) {
          // Always redirect to login after registration if confirmation is needed
          onNavigate("login");
        }
      }, 2500);
    } catch (err) {
      setError(err.message || "Failed to register account. Please check your details and try again.");
      setLoading(false);
    }
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
              {/* Issue 2 Fix: increased from text-[11px] to text-xs (12px) */}
              <span className="text-xs text-emerald-300/80 block">
                Agri Scenario & Decision Simulator
              </span>
            </div>
          </button>

          {/* Issue 8 Fix: increased gap from gap-2 (8px) to gap-4 sm:gap-5 (16-20px) */}
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Issue 1 Fix: unified top-nav button styling */}
            <button
              type="button"
              onClick={() => onNavigate && onNavigate("login")}
              className="flex items-center gap-1.5 text-xs font-semibold text-emerald-200 hover:text-white bg-white/5 hover:bg-white/10 border border-[#164A34] hover:border-emerald-500/40 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">login</span>
              <span>Sign In</span>
            </button>
            {/* Issue 1 & 4 Fix: unified button style + changed label from 'Launch' to 'Back to Home' matching arrow_back */}
            <button
              type="button"
              onClick={() => onNavigate && onNavigate("launch")}
              className="flex items-center gap-1.5 text-xs font-semibold text-emerald-200 hover:text-white bg-white/5 hover:bg-white/10 border border-[#164A34] hover:border-emerald-500/40 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Registration Form Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-2xl bg-[#002D1D]/90 backdrop-blur-xl rounded-3xl border border-[#164A34] shadow-2xl p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mb-1">
              <span className="material-symbols-outlined text-[26px]">how_to_reg</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Create Your Farmer Account
            </h1>
            <p className="text-xs text-slate-300">
              Register with your email to simulate crop seasons, save farm profiles & predict risks
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* SECTION 1: Personal & Login Credentials */}
            <div className="space-y-3">
              {/* Issue 3 Fix: removed all-caps uppercase, used title case */}
              <span className="text-xs font-bold text-emerald-400 block border-b border-[#164A34] pb-1">
                1. Account & Login Details
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-emerald-300">
                    Full Name *
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[18px] pointer-events-none">
                      person
                    </span>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Shivaji Patil"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#164A34] bg-[#002216] focus:bg-[#002B1B] focus:border-emerald-400 text-xs font-medium text-white placeholder-slate-500 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-emerald-300">
                    Email Address (Login ID) *
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[18px] pointer-events-none">
                      mail
                    </span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="farmer@example.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#164A34] bg-[#002216] focus:bg-[#002B1B] focus:border-emerald-400 text-xs font-medium text-white placeholder-slate-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-emerald-300">
                    Password *
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[18px] pointer-events-none">
                      lock
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full pl-10 pr-11 py-2.5 rounded-xl border border-[#164A34] bg-[#002216] focus:bg-[#002B1B] focus:border-emerald-400 text-xs font-medium text-white placeholder-slate-500 outline-none transition-all"
                    />
                    {/* Issue 7 Fix: Increased hit area, added hover bg, and added aria-label */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-emerald-300">
                    Confirm Password *
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[18px] pointer-events-none">
                      lock_reset
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#164A34] bg-[#002216] focus:bg-[#002B1B] focus:border-emerald-400 text-xs font-medium text-white placeholder-slate-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2: Location & Farm Profile */}
            <div className="space-y-3 pt-2">
              {/* Issue 3 Fix: removed all-caps uppercase, used title case */}
              <span className="text-xs font-bold text-emerald-400 block border-b border-[#164A34] pb-1">
                2. Location & Farm Profile
              </span>

              {/* Issue 5 Fix: Replaced cramped 3-column layout with consistent 2-column layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Taluka / Village */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-emerald-300">
                    Taluka / Village
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-slate-400 text-[16px] pointer-events-none">
                      location_on
                    </span>
                    <input
                      type="text"
                      value={taluka}
                      onChange={(e) => setTaluka(e.target.value)}
                      placeholder="e.g. Warnanagar"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#164A34] bg-[#002216] focus:bg-[#002B1B] focus:border-emerald-400 text-xs font-medium text-white placeholder-slate-500 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* District */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-emerald-300">
                    District
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-slate-400 text-[16px] pointer-events-none">
                      map
                    </span>
                    <input
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      placeholder="e.g. Kolhapur"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#164A34] bg-[#002216] focus:bg-[#002B1B] focus:border-emerald-400 text-xs font-medium text-white placeholder-slate-500 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* State */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-emerald-300">
                    State
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#164A34] bg-[#002216] focus:bg-[#002B1B] focus:border-emerald-400 text-xs font-medium text-white outline-none transition-all cursor-pointer"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st} className="bg-[#002216] text-white">
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Issue 6 Fix: Standardized Country with lock signifier, Fixed badge, and aria-readonly */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-emerald-300">
                      Country
                    </label>
                    <span className="text-[10px] text-emerald-400/80 font-medium">Default</span>
                  </div>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-emerald-400 text-[16px] pointer-events-none">
                      public
                    </span>
                    <input
                      type="text"
                      readOnly
                      aria-readonly="true"
                      value="India"
                      className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-[#164A34] bg-[#001A10] text-xs font-medium text-emerald-200 outline-none cursor-not-allowed select-none"
                    />
                    <span className="material-symbols-outlined absolute right-3 text-slate-500 text-[16px] pointer-events-none" aria-hidden="true">
                      lock
                    </span>
                  </div>
                </div>

                {/* Total Land Acres */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-emerald-300">
                    Total Land (Acres)
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-slate-400 text-[16px] pointer-events-none">
                      agriculture
                    </span>
                    <input
                      type="number"
                      step="0.5"
                      min="0.5"
                      value={landAcres}
                      onChange={(e) => setLandAcres(e.target.value)}
                      placeholder="5.0"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#164A34] bg-[#002216] focus:bg-[#002B1B] focus:border-emerald-400 text-xs font-medium text-white placeholder-slate-500 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Mobile / WhatsApp (Optional) */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-emerald-300">
                    Phone (Optional)
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-slate-400 text-[16px] pointer-events-none">
                      call
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98221 44520"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#164A34] bg-[#002216] focus:bg-[#002B1B] focus:border-emerald-400 text-xs font-medium text-white placeholder-slate-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              id="submit-register-btn"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined text-base animate-spin">refresh</span>
                  <span>Creating Your Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account & Start Simulator</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="pt-3 flex items-center justify-center text-xs border-t border-[#164A34]">
            <span className="text-slate-300">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => onNavigate && onNavigate("login")}
                className="font-bold text-emerald-400 hover:text-emerald-300 underline cursor-pointer ml-1"
              >
                Sign In with Email & Password
              </button>
            </span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 px-4 text-center text-xs text-slate-400">
        KrishiMitra • Deterministic Decision Engine v2.0 • Made for Indian Farmers 🇮🇳
      </footer>
    </div>
  );
}
