import React, { useState } from "react";

export default function LoginPage({ onNavigate, onLoginSuccess }) {
  const [email, setEmail] = useState("shivaji.patil@krishimitra.in");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Simulate/perform sign in request
      if (!email || !password) {
        setError("Please enter both email and password.");
        setLoading(false);
        return;
      }

      // Store dummy/token for authentication session
      const mockToken = "km_session_" + Date.now();
      localStorage.setItem("supabase_token", mockToken);
      localStorage.setItem("user_email", email);

      if (onLoginSuccess) {
        onLoginSuccess({ email, token: mockToken });
      }

      setTimeout(() => {
        setLoading(false);
        if (onNavigate) onNavigate("dashboard");
      }, 400);
    } catch (err) {
      setError(err.message || "Failed to sign in. Please check your credentials.");
      setLoading(false);
    }
  };

  const handleDemoSignIn = () => {
    setEmail("shivaji.patil@krishimitra.in");
    setPassword("farmer2026");
    const mockToken = "km_session_demo_shivaji";
    localStorage.setItem("supabase_token", mockToken);
    localStorage.setItem("user_email", "shivaji.patil@krishimitra.in");
    if (onLoginSuccess) onLoginSuccess({ email: "shivaji.patil@krishimitra.in", token: mockToken });
    if (onNavigate) onNavigate("dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] flex flex-col justify-center items-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl border border-[#D0DEC0] shadow-lg p-6 sm:p-8 space-y-6 animate-fadeIn">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#164A34] border border-[#3D8B5A] flex items-center justify-center text-white text-2xl mx-auto shadow-md">
            <span className="material-symbols-outlined text-[28px]">psychiatry</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#164A34] tracking-tight">
            KrishiMitra
          </h1>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#596A61]">
            Plan Before You Plant • PRARAMBHA 2.0
          </p>
        </div>

        {/* Title */}
        <div className="border-b border-[#EBF3ED] pb-3 text-center">
          <h2 className="text-lg font-bold text-[#1E2924]">Sign In to Your Farm Account</h2>
          <p className="text-xs text-[#596A61] mt-0.5">Access saved farm scenarios, water audits, and reports</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl flex items-center gap-2">
            <span className="material-symbols-outlined text-base shrink-0">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-bold text-[#164A34]">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="farmer@krishimitra.in"
              className="w-full px-4 py-2.5 rounded-xl border border-[#D0DEC0] bg-[#FAF9F5] focus:bg-white focus:border-[#164A34] text-xs font-medium outline-none transition-colors"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-bold text-[#164A34]">
                Password
              </label>
              <button
                type="button"
                onClick={() => onNavigate && onNavigate("forgot-password")}
                className="text-[11px] font-semibold text-[#164A34] hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-[#D0DEC0] bg-[#FAF9F5] focus:bg-white focus:border-[#164A34] text-xs font-medium outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#164A34] hover:bg-[#196C3E] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined text-base animate-spin">refresh</span>
                <span>Signing you in...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <span className="material-symbols-outlined text-base">login</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Access */}
        <div className="pt-2 border-t border-[#EBF3ED] text-center space-y-3">
          <button
            type="button"
            onClick={handleDemoSignIn}
            className="w-full py-2.5 bg-[#EBF3ED] hover:bg-[#D0DEC0] text-[#164A34] text-xs font-bold rounded-xl border border-[#3D8B5A]/30 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">account_circle</span>
            <span>Quick Demo Sign In (Shivaji Patil Farm)</span>
          </button>

          <p className="text-xs text-[#596A61]">
            Don't have a farm account?{" "}
            <button
              type="button"
              onClick={() => onNavigate && onNavigate("signup")}
              className="font-bold text-[#164A34] hover:underline cursor-pointer"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
