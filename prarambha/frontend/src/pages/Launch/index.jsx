import React, { useState, useRef, useEffect } from "react";
import {
  Sprout,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

/**
 * =========================================================================
 * KRISHIMITRA (PRARAMBHA 2.0) — FULL-SCREEN VIDEO LAUNCH HERO
 * =========================================================================
 * 
 * Clean 100vh full-screen video experience without below-the-fold clutter.
 * Media swap locations:
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

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  // Handle video autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().then(() => {
      setIsPlaying(true);
      setAutoplayBlocked(false);
    }).catch((err) => {
      console.warn("Autoplay was prevented by browser policy:", err);
      setAutoplayBlocked(true);
      setIsPlaying(false);
    });
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
      setAutoplayBlocked(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  return (
    <div className="relative h-screen w-full bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white overflow-hidden flex flex-col justify-between">
      
      {/* ========================================================================= */}
      {/* 1. TOP NAVBAR (CLEAN & MINIMAL — NO REDUNDANT LAUNCH BUTTON) */}
      {/* ========================================================================= */}
      <header className="relative z-20 w-full pt-5 pb-3 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-transparent">
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
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. FULL-SCREEN BACKGROUND VIDEO & HERO CONTENT */}
      {/* ========================================================================= */}
      <main className="relative flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted={isMuted}
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
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-medium mb-6 backdrop-blur-md shadow-inner">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>PRARAMBHA 2.0 • Deterministic Agriculture Simulator</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1] mb-6 drop-shadow-xl">
            Test the season <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
              before you sow it.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed mb-8 drop-shadow-md">
            Simulate crop yields, water stress, input costs, and net profit before
            committing land, water, and capital. Transparent decision-support built
            for resilient farming.
          </p>

          {/* Primary Call to Action Button */}
          <div className="flex items-center justify-center mb-8">
            <button
              onClick={() => navigateTo("dashboard")}
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-extrabold text-base sm:text-lg px-8 py-4 rounded-2xl shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer"
              id="hero-primary-cta"
            >
              <span>Launch Simulator</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          {/* Non-Guarantee Trust Note */}
          <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span>Honest Decision Support • Deterministic Agronomic Rules • No Black-Box AI</span>
          </p>
        </div>

        {/* Autoplay Blocked Fallback Badge */}
        {autoplayBlocked && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 bg-emerald-500/90 text-slate-950 font-bold px-4 py-2 rounded-xl flex items-center gap-2 shadow-xl animate-bounce">
            <Play className="h-4 w-4 fill-slate-950" />
            <button onClick={togglePlay} className="underline">
              Tap to start video experience
            </button>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* 3. BOTTOM BAR WITH CORNER CONTROLS (NO OVERFLOW / NO SCROLL) */}
      {/* ========================================================================= */}
      <footer className="relative z-20 w-full py-4 px-6 sm:px-8 flex items-center justify-between text-xs text-slate-400 bg-gradient-to-t from-slate-950/90 to-transparent">
        <span className="hidden sm:inline-block">
          KrishiMitra (PRARAMBHA 2.0) • Decision support, not a guarantee.
        </span>

        {/* Media Controls Dock */}
        <div className="ml-auto flex items-center gap-2 bg-slate-950/70 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800/80 shadow-2xl">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause background video" : "Play background video"}
            className="h-9 w-9 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 flex items-center justify-center transition-colors cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="h-3.5 w-3.5" />
            ) : (
              <Play className="h-3.5 w-3.5 fill-slate-200 ml-0.5" />
            )}
          </button>

          <button
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video sound" : "Mute video sound"}
            className="h-9 w-9 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 flex items-center justify-center transition-colors cursor-pointer"
          >
            {isMuted ? (
              <VolumeX className="h-3.5 w-3.5 text-slate-400" />
            ) : (
              <Volume2 className="h-3.5 w-3.5 text-emerald-400" />
            )}
          </button>

          <span className="hidden sm:inline-block px-2 text-[10px] font-mono font-medium text-slate-400 border-l border-slate-800">
            {isPlaying ? "HD 60FPS" : "PAUSED"}
          </span>
        </div>
      </footer>

    </div>
  );
}
