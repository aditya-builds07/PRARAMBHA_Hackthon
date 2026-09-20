import React, { useState } from "react";

export default function SignupPage({ onNavigate, onLoginSuccess }) {
  const [fullName, setFullName] = useState("");
  const [farmerId, setFarmerId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [village, setVillage] = useState("");
  const [district, setDistrict] = useState("");
  const [landAcres, setLandAcres] = useState("");
  const [preferredLang, setPreferredLang] = useState("mr");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Generate unique Farmer ID
  const generateNewId = () => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    const prefix = district.trim() ? district.trim().slice(0, 3).toUpperCase() : "MH";
    const newId = `MH-${prefix}-${randomNum}`;
    setFarmerId(newId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!fullName.trim() || !farmerId.trim() || !password.trim()) {
      setError("Please fill in Full Name, Farmer ID, and Password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter your password.");
      return;
    }

    setLoading(true);

    try {
      // Create user record
      const newFarmer = {
        farmer_id: farmerId.trim().toUpperCase(),
        full_name: fullName.trim(),
        email: email.trim() || `${farmerId.toLowerCase()}@krishimitra.in`,
        phone: phone.trim(),
        village: village.trim(),
        district: district.trim(),
        total_land_acres: parseFloat(landAcres) || 5.0,
        preferred_language: preferredLang,
        role: "farmer",
        created_at: new Date().toISOString(),
      };

      // Persist in local storage for offline-first support
      const existingAccounts = JSON.parse(localStorage.getItem("km_registered_accounts") || "[]");
      existingAccounts.push(newFarmer);
      localStorage.setItem("km_registered_accounts", JSON.stringify(existingAccounts));

      // Authenticate session
      const mockToken = "km_auth_reg_" + Date.now();
      localStorage.setItem("user_id", newFarmer.farmer_id);
      localStorage.setItem("farmer_id", newFarmer.farmer_id);
      localStorage.setItem("user_name", newFarmer.full_name);
      localStorage.setItem("user_email", newFarmer.email);
      localStorage.setItem("farmer_district", newFarmer.district || "Pune");
      localStorage.setItem("farmer_village", newFarmer.village || "");
      localStorage.setItem("farmer_land_acres", String(newFarmer.total_land_acres));
      localStorage.setItem("supabase_token", mockToken);

      if (onLoginSuccess) {
        onLoginSuccess({
          id: newFarmer.farmer_id,
          name: newFarmer.full_name,
          email: newFarmer.email,
          token: mockToken,
        });
      }

      setSuccessMsg(`Account created! Assigned Farmer ID: ${newFarmer.farmer_id}. Opening simulator...`);

      setTimeout(() => {
        setLoading(false);
        if (onNavigate) {
          onNavigate("dashboard");
        }
      }, 800);
    } catch (err) {
      setError(err.message || "Failed to register account. Please try again.");
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
              <span className="text-[11px] text-emerald-300/70 block">
                Agri Scenario & Decision Simulator
              </span>
            </div>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate && onNavigate("login")}
              className="flex items-center gap-1.5 text-xs text-emerald-300 hover:text-white bg-white/5 hover:bg-white/10 border border-emerald-500/30 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">login</span>
              <span>Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate && onNavigate("launch")}
              className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span className="hidden sm:inline">Launch</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Registration Form Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-xl bg-[#002D1D]/90 backdrop-blur-xl rounded-3xl border border-[#164A34] shadow-2xl p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mb-1">
              <span className="material-symbols-outlined text-[26px]">how_to_reg</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Register Farmer Account
            </h1>
            <p className="text-xs text-slate-300">
              Create your permanent Farmer ID to store land profiles, scenario forecasts & water audits
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-emerald-300">
                  Farmer Full Name *
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

              {/* Farmer ID with Auto-generator */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-emerald-300">
                    Farmer ID *
                  </label>
                  <button
                    type="button"
                    onClick={generateNewId}
                    className="text-[10px] text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
                  >
                    Generate New
                  </button>
                </div>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[18px] pointer-events-none">
                    badge
                  </span>
                  <input
                    type="text"
                    required
                    value={farmerId}
                    onChange={(e) => setFarmerId(e.target.value.toUpperCase())}
                    placeholder="MH-PUN-099"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#164A34] bg-[#002216] focus:bg-[#002B1B] focus:border-emerald-400 text-xs font-mono font-bold text-emerald-300 placeholder-slate-500 outline-none transition-all uppercase"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-emerald-300">
                  Mobile / WhatsApp
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[18px] pointer-events-none">
                    call
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98221 44520"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#164A34] bg-[#002216] focus:bg-[#002B1B] focus:border-emerald-400 text-xs font-medium text-white placeholder-slate-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-emerald-300">
                  Email Address (Optional)
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[18px] pointer-events-none">
                    mail
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="farmer@krishimitra.in"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#164A34] bg-[#002216] focus:bg-[#002B1B] focus:border-emerald-400 text-xs font-medium text-white placeholder-slate-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Village */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-emerald-300">
                  Village / Taluka
                </label>
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder="Baramati"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#164A34] bg-[#002216] focus:bg-[#002B1B] focus:border-emerald-400 text-xs font-medium text-white placeholder-slate-500 outline-none transition-all"
                />
              </div>

              {/* District */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-emerald-300">
                  District
                </label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="Pune"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#164A34] bg-[#002216] focus:bg-[#002B1B] focus:border-emerald-400 text-xs font-medium text-white placeholder-slate-500 outline-none transition-all"
                />
              </div>

              {/* Land Acres */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-emerald-300">
                  Land Size (Acres)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={landAcres}
                  onChange={(e) => setLandAcres(e.target.value)}
                  placeholder="10.0"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#164A34] bg-[#002216] focus:bg-[#002B1B] focus:border-emerald-400 text-xs font-medium text-white placeholder-slate-500 outline-none transition-all"
                />
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
                    placeholder="At least 6 characters"
                    className="w-full pl-10 pr-11 py-2.5 rounded-xl border border-[#164A34] bg-[#002216] focus:bg-[#002B1B] focus:border-emerald-400 text-xs font-medium text-white placeholder-slate-500 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-slate-400 hover:text-white cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">
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
                    placeholder="Repeat password"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#164A34] bg-[#002216] focus:bg-[#002B1B] focus:border-emerald-400 text-xs font-medium text-white placeholder-slate-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              id="submit-register-btn"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-3"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined text-base animate-spin">refresh</span>
                  <span>Registering Farmer Account...</span>
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
              Already have a Farmer ID?{" "}
              <button
                type="button"
                onClick={() => onNavigate && onNavigate("login")}
                className="font-bold text-emerald-400 hover:text-emerald-300 underline cursor-pointer ml-1"
              >
                Sign In with ID & Password
              </button>
            </span>
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
