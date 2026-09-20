import React, { useState, useRef, useEffect } from "react";
import {
  Sprout,
  ArrowRight,
  Play,
  LogIn,
  UserPlus,
  X,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

/**
 * =========================================================================
 * KRISHIMITRA (PRARAMBHA 2.0) — FULL-SCREEN VIDEO LAUNCH HERO
 * =========================================================================
 * 
 * Minimal 100vh full-screen video experience with Auth Gate.
 * Media locations:
 * - Local MP4: `/public/videos/hero-farm-loop.mp4`
 * - WebM: `/public/videos/hero-farm-loop.webm`
 * - Poster Image: `/public/images/hero_farm_poster.jpg`
 */
const VIDEO_CONFIG = {
  localMp4: "/videos/hero-farm-loop.mp4",
  localWebm: "/videos/hero-farm-loop.webm",
  cdnFallbackMp4: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-green-landscape-4217-large.mp4",
  posterImage: "/images/hero_farm_poster.jpg",
};

export default function LaunchPage({ onNavigate = null }) {
  const videoRef = useRef(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const navigateTo = (targetPage) => {
    if (typeof onNavigate === "function") {
      onNavigate(targetPage);
    } else {
      window.location.hash = targetPage;
    }
  };

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  // Handle video autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().then(() => {
      setAutoplayBlocked(false);
    }).catch((err) => {
      console.warn("Autoplay was prevented by browser policy:", err);
      setAutoplayBlocked(true);
    });
  }, []);

  const handleStartVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setAutoplayBlocked(false);
    }
  };

  // Launch Simulator click handler — prompts for Sign In or Registration if not authenticated
  const handleLaunchClick = () => {
    const activeFarmerId = typeof window !== "undefined"
      ? (localStorage.getItem("farmer_id") || localStorage.getItem("user_id"))
      : null;

    if (activeFarmerId) {
      // Already authenticated, enter web application
      navigateTo("dashboard");
    } else {
      // Not yet authenticated, ask for Sign In or Registration
      setShowAuthModal(true);
    }
  };

  // Quick Demo entry handler
  const handleDemoEntry = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("farmer_id", "MH-PUN-042");
      localStorage.setItem("user_id", "MH-PUN-042");
      localStorage.setItem("user_name", "Shivaji Patil");
      localStorage.setItem("user_email", "shivaji.patil@krishimitra.in");
      localStorage.setItem("supabase_token", "km_demo_session_" + Date.now());
    }
    setShowAuthModal(false);
    navigateTo("dashboard");
  };

  return (
    <div className="relative h-screen w-full bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white overflow-hidden flex flex-col justify-between">
      
      {/* ========================================================================= */}
      {/* 1. TOP NAVBAR */}
      {/* ========================================================================= */}
      <header className="relative z-20 w-full pt-6 pb-3 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-transparent">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Identity */}
          <div
            onClick={handleLaunchClick}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Sprout className="h-6 w-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white">
                  KRISHIMITRA
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  v2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Agri Scenario & Decision Simulator
              </p>
            </div>
          </div>

          {/* Top Right Auth Actions */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              id="launch-farmer-login-btn"
              onClick={() => navigateTo("login")}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-emerald-500/25 text-white hover:text-emerald-300 border border-white/20 hover:border-emerald-400/50 text-xs font-bold backdrop-blur-md transition-all cursor-pointer shadow-sm hover:scale-105"
            >
              <LogIn className="h-4 w-4" />
              <span>Farmer Login</span>
            </button>
            <button
              type="button"
              id="launch-farmer-register-btn"
              onClick={() => navigateTo("signup")}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 hover:text-white border border-emerald-500/40 text-xs font-bold backdrop-blur-md transition-all cursor-pointer shadow-sm hover:scale-105"
            >
              <UserPlus className="h-4 w-4" />
              <span>Register</span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. FULL-SCREEN BACKGROUND VIDEO & CENTER HERO */}
      {/* ========================================================================= */}
      <main className="relative flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={VIDEO_CONFIG.posterImage}
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              isVideoLoaded ? "opacity-100" : "opacity-90"
            }`}
          >
            <source src={VIDEO_CONFIG.localMp4} type="video/mp4" />
            <source src={VIDEO_CONFIG.localWebm} type="video/webm" />
            <source src={VIDEO_CONFIG.cdnFallbackMp4} type="video/mp4" />
            <img
              src={VIDEO_CONFIG.posterImage}
              alt="Farmland background"
              className="w-full h-full object-cover"
            />
          </video>

          {/* Contrast scrim overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/40" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-slate-950/50 to-slate-950/80" />
        </div>

        {/* Hero Text & Centered CTA */}
        <div className="max-w-4xl mx-auto py-8">
          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1] mb-6 drop-shadow-xl">
            Test the season <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
              before you sow it.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed mb-10 drop-shadow-md">
            Simulate crop yields, water stress, input costs, and net profit before
            committing land, water, and capital. Transparent decision-support built
            for resilient farming.
          </p>

          {/* Primary Call to Action Button */}
          <div className="flex items-center justify-center">
            <button
              onClick={handleLaunchClick}
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-extrabold text-base sm:text-lg px-8 py-4 rounded-2xl shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer"
              id="hero-primary-cta"
            >
              <span>Launch Simulator</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Autoplay Blocked Fallback Badge */}
        {autoplayBlocked && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 bg-emerald-500/90 text-slate-950 font-bold px-4 py-2 rounded-xl flex items-center gap-2 shadow-xl animate-bounce">
            <Play className="h-4 w-4 fill-slate-950" />
            <button onClick={handleStartVideo} className="underline">
              Tap to start video experience
            </button>
          </div>
        )}
      </main>

      {/* Spacer to balance vertical flex centering */}
      <div className="h-6 w-full pointer-events-none" />

      {/* ========================================================================= */}
      {/* 3. AUTHENTICATION MODAL: ASK FOR SIGN IN OR REGISTRATION */}
      {/* ========================================================================= */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#002B1B] text-white border border-[#164A34] rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 animate-scaleUp">
            {/* Close Button */}
            <button
              type="button"
              id="close-auth-modal-btn"
              onClick={() => setShowAuthModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Header */}
            <div className="text-center space-y-2 pt-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mb-1">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white">
                Sign In or Register
              </h2>
              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                To run agricultural simulations and access farm decision tools, please authenticate with your Farmer ID or create a new registration.
              </p>
            </div>

            {/* Action Cards: Sign In vs Register */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {/* Option 1: Sign In */}
              <div
                onClick={() => {
                  setShowAuthModal(false);
                  navigateTo("login");
                }}
                id="modal-sign-in-option"
                className="p-4 rounded-2xl bg-[#001E13] hover:bg-[#003822] border border-[#164A34] hover:border-emerald-400/60 transition-all cursor-pointer flex flex-col justify-between group shadow-md"
              >
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                    <LogIn className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors">
                      Farmer Sign In
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">
                      Use existing Farmer ID & Password to access your saved scenarios.
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-xs font-bold text-emerald-400">
                  <span>Sign In</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Option 2: Register */}
              <div
                onClick={() => {
                  setShowAuthModal(false);
                  navigateTo("signup");
                }}
                id="modal-register-option"
                className="p-4 rounded-2xl bg-[#001E13] hover:bg-[#003822] border border-[#164A34] hover:border-emerald-400/60 transition-all cursor-pointer flex flex-col justify-between group shadow-md"
              >
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:scale-105 transition-transform">
                    <UserPlus className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white group-hover:text-teal-300 transition-colors">
                      New Registration
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">
                      Generate a new Farmer ID with your village, district & land acreage.
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-xs font-bold text-teal-400">
                  <span>Register Free</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Quick Demo Access Option */}
            <div className="pt-2 border-t border-[#164A34] text-center space-y-2">
              <button
                type="button"
                id="modal-quick-demo-btn"
                onClick={handleDemoEntry}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 hover:text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="h-4 w-4 text-amber-300" />
                <span>Instant Demo Access (Shivaji Patil Farm • MH-PUN-042)</span>
              </button>

              <button
                type="button"
                onClick={() => setShowAuthModal(false)}
                className="text-[11px] text-slate-400 hover:text-slate-300 underline cursor-pointer"
              >
                Cancel and return to launch page
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
