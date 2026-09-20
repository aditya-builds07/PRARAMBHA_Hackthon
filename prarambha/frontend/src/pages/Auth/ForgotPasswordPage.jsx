import React, { useState } from "react";

export default function ForgotPasswordPage({ onNavigate }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] flex flex-col justify-center items-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl border border-[#D0DEC0] shadow-lg p-6 sm:p-8 space-y-6 animate-fadeIn">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#164A34] border border-[#3D8B5A] flex items-center justify-center text-white text-2xl mx-auto shadow-md">
            <span className="material-symbols-outlined text-[28px]">lock_reset</span>
          </div>
          <h1 className="text-xl font-extrabold text-[#164A34] tracking-tight">
            Reset Password
          </h1>
          <p className="text-xs text-[#596A61]">
            Enter your registered email to receive password recovery instructions
          </p>
        </div>

        {sent ? (
          <div className="p-4 bg-[#EBF3ED] border border-[#D0DEC0] rounded-2xl text-center space-y-3">
            <span className="material-symbols-outlined text-3xl text-[#164A34]">mark_email_read</span>
            <h3 className="font-bold text-[#164A34] text-sm">Recovery Link Sent!</h3>
            <p className="text-xs text-[#596A61]">
              We have sent instructions to <strong>{email}</strong>. Check your inbox to reset your password.
            </p>
            <button
              type="button"
              onClick={() => onNavigate && onNavigate("login")}
              className="w-full py-2.5 bg-[#164A34] text-white text-xs font-bold rounded-xl"
            >
              Return to Sign In
            </button>
          </div>
        ) : (
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#164A34] hover:bg-[#196C3E] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <span>Sending link...</span>
              ) : (
                <>
                  <span>Send Reset Instructions</span>
                  <span className="material-symbols-outlined text-base">send</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => onNavigate && onNavigate("login")}
              className="w-full py-2 text-xs font-semibold text-[#596A61] hover:text-[#164A34]"
            >
              Back to Sign In
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
