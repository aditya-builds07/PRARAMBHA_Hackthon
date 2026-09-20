import React, { useState } from "react";

export default function SignupPage({ onNavigate, onLoginSuccess }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!fullName || !email || !password) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const mockToken = "km_session_new_" + Date.now();
      localStorage.setItem("supabase_token", mockToken);
      localStorage.setItem("user_email", email);
      localStorage.setItem("user_name", fullName);

      if (onLoginSuccess) {
        onLoginSuccess({ email, name: fullName, token: mockToken });
      }

      setTimeout(() => {
        setLoading(false);
        if (onNavigate) onNavigate("dashboard");
      }, 400);
    } catch (err) {
      setError(err.message || "Failed to create account. Please try again.");
      setLoading(false);
    }
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
            Create Your Farm Account • PRARAMBHA 2.0
          </p>
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
              Full Name *
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Shivaji Patil"
              className="w-full px-4 py-2.5 rounded-xl border border-[#D0DEC0] bg-[#FAF9F5] focus:bg-white focus:border-[#164A34] text-xs font-medium outline-none transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-[#164A34]">
              Email Address *
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
            <label className="block text-xs font-bold text-[#164A34]">
              Mobile Phone Number (Optional)
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98221 44520"
              className="w-full px-4 py-2.5 rounded-xl border border-[#D0DEC0] bg-[#FAF9F5] focus:bg-white focus:border-[#164A34] text-xs font-medium outline-none transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-[#164A34]">
              Create Password *
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
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
                <span>Creating your account...</span>
              </>
            ) : (
              <>
                <span>Create Account & Start Planning</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        <div className="pt-2 border-t border-[#EBF3ED] text-center">
          <p className="text-xs text-[#596A61]">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => onNavigate && onNavigate("login")}
              className="font-bold text-[#164A34] hover:underline cursor-pointer"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
