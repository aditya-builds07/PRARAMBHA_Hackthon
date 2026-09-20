import React, { useState, useRef, useEffect } from "react";
import {
  Sprout,
  ArrowRight,
  Play,
  LogIn,
} from "lucide-react";

/**
 * =========================================================================
 * KRISHIMITRA (PRARAMBHA 2.0) — FULL-SCREEN VIDEO LAUNCH HERO
 * =========================================================================
 * 
 * Minimal 100vh full-screen video experience.
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

  return (
    <div className="relative h-screen w-full bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white overflow-hidden flex flex-col justify-between">
      
      {/* ========================================================================= */}
      {/* 1. TOP NAVBAR */}
      {/* ========================================================================= */}
      <header className="relative z-20 w-full pt-6 pb-3 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-transparent">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Identity */}
          <div
            onClick={() => navigateTo("dashboard")}
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

          {/* Farmer Login Button */}
          <button
            type="button"
            id="launch-farmer-login-btn"
            onClick={() => navigateTo("login")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-emerald-500/25 text-white hover:text-emerald-300 border border-white/20 hover:border-emerald-400/50 text-xs font-bold backdrop-blur-md transition-all cursor-pointer shadow-sm hover:scale-105"
          >
            <LogIn className="h-4 w-4" />
            <span>Farmer Login</span>
          </button>
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
              onClick={() => navigateTo("dashboard")}
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

    </div>
  );
}
