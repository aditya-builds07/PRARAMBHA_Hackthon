import React, { useState, useRef, useEffect } from "react";
import {
  Sprout,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ArrowRight,
  ChevronDown,
  Wheat,
  Droplets,
  ShieldAlert,
  BarChart3,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  X,
  FileText,
  Sliders,
} from "lucide-react";

/**
 * =========================================================================
 * KRISHIMITRA (PRARAMBHA 2.0) — FULL-SCREEN VIDEO-FIRST LAUNCH EXPERIENCE
 * =========================================================================
 * 
 * SWAP YOUR MEDIA HERE:
 * 1. Video file: Place your MP4 in `/public/videos/hero-farm-loop.mp4`
 * 2. WebM fallback: Place `/public/videos/hero-farm-loop.webm`
 * 3. Poster Image: Place `/public/images/hero_farm_poster.jpg`
 * 4. Audio: Included in the "Watch Demo" modal and toggleable in the hero.
 */
const VIDEO_CONFIG = {
  // Primary local video path (drop your video here)
  localMp4: "/videos/hero-farm-loop.mp4",
  localWebm: "/videos/hero-farm-loop.webm",
  
  // High-availability CDN fallback loop (guarantees a live video experience immediately)
  cdnFallbackMp4: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-green-landscape-4217-large.mp4",
  
  // High-resolution poster fallback image
  posterImage: "/images/hero_farm_poster.jpg",
  
  // Optional subtitles/captions track
  captionsVtt: "/videos/captions.vtt",
};

export default function LaunchPage({ onNavigate = null }) {
  const videoRef = useRef(null);
  const modalVideoRef = useRef(null);

  // Safe navigation helper
  const navigateTo = (targetPage) => {
    if (typeof onNavigate === "function") {
      onNavigate(targetPage);
    } else {
      window.location.hash = targetPage;
    }
  };

  // Video State
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  // Monitor scroll for floating navigation contrast
  useEffect(() => {
    const handleScroll = () => {
      setScrolledPastHero(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle video autoplay with browser security fallback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = async () => {
      try {
        await video.play();
        setIsPlaying(true);
        setAutoplayBlocked(false);
      } catch (err) {
        console.warn("Autoplay was prevented by browser policy:", err);
        setAutoplayBlocked(true);
        setIsPlaying(false);
      }
    };

    attemptPlay();
  }, []);

  // Toggle Play / Pause
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

  // Toggle Mute / Unmute
  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  // Open Full Demo Video Modal (Option C feature)
  const openVideoModal = () => {
    setIsVideoModalOpen(true);
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Close Demo Video Modal
  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // Scroll to Feature Section smoothly
  const scrollToFeatures = () => {
    const el = document.getElementById("features-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* 1. MINIMAL FLOATING TOP NAVBAR */}
      {/* ========================================================================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolledPastHero
            ? "bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-2xl"
            : "bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button
              onClick={scrollToFeatures}
              className="hover:text-emerald-400 transition-colors"
            >
              Key Capabilities
            </button>
            <button
              onClick={() => navigateTo("comparison")}
              className="hover:text-emerald-400 transition-colors"
            >
              Scenario Comparison
            </button>
            <button
              onClick={() => navigateTo("dashboard")}
              className="hover:text-emerald-400 transition-colors"
            >
              Farm Profiles
            </button>
            <a
              href="#faq-section"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("faq-section")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:text-emerald-400 transition-colors"
            >
              FAQ
            </a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo("dashboard")}
              className="touch-target inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 sm:px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] text-sm"
              id="nav-launch-cta"
            >
              <span>Launch App</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. FULL-SCREEN VIDEO HERO SECTION (OPTION A: BACKGROUND HERO) */}
      {/* ========================================================================= */}
      <section className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden">
        {/* HTML5 Video Element */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
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
              isVideoLoaded ? "opacity-100" : "opacity-90 scale-105"
            }`}
          >
            {/* User Custom Local Video Source */}
            <source src={VIDEO_CONFIG.localMp4} type="video/mp4" />
            <source src={VIDEO_CONFIG.localWebm} type="video/webm" />
            
            {/* Public CDN Fallback Source */}
            <source src={VIDEO_CONFIG.cdnFallbackMp4} type="video/mp4" />
            
            {/* Optional Subtitles / Closed Captions */}
            <track
              kind="captions"
              src={VIDEO_CONFIG.captionsVtt}
              srcLang="en"
              label="English"
              default
            />

            {/* Static Fallback for Older Browsers */}
            <img
              src={VIDEO_CONFIG.posterImage}
              alt="Lush agricultural farmland at golden hour sunrise"
              className="w-full h-full object-cover"
            />
          </video>

          {/* Cinematic Gradient Overlays for High Contrast Text (WCAG AAA > 7:1) */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/40" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-slate-950/50 to-slate-950/80" />
          <div className="absolute inset-0 backdrop-blur-[1px]" />
        </div>

        {/* Hero Copy & Call To Actions */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-20">
          
          {/* Animated Product Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-medium mb-6 backdrop-blur-md animate-fade-in shadow-inner">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
            <span>PRARAMBHA 2.0 • Deterministic Agriculture Simulator</span>
          </div>

          {/* Main Display Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1] mb-6 drop-shadow-xl">
            Test the season <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
              before you sow it.
            </span>
          </h1>

          {/* High-Impact Value Subheadline */}
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-10 drop-shadow-md">
            Simulate crop yields, water stress, input costs, and net profit before
            committing land, water, and capital. Transparent decision-support built
            for resilient farming.
          </p>

          {/* Primary Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-12">
            <button
              onClick={() => navigateTo("dashboard")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-extrabold text-base sm:text-lg px-8 py-4 rounded-2xl shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all"
              id="hero-primary-cta"
            >
              <span>Launch Simulator</span>
              <ArrowRight className="h-5 w-5" />
            </button>

            {/* Secondary Action: Watch Full Video Demo Modal */}
            <button
              onClick={openVideoModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-500 font-semibold text-base px-6 py-4 rounded-2xl backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all"
              id="hero-watch-demo"
            >
              <div className="h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Play className="h-3 w-3 fill-emerald-400 ml-0.5" />
              </div>
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Non-Guarantee Trust Banner */}
          <p className="text-xs text-slate-400 max-w-xl mx-auto flex items-center justify-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span>Honest Decision Support • Deterministic Agronomic Rules • No Black-Box AI</span>
          </p>
        </div>

        {/* ========================================================================= */}
        {/* CORNER MEDIA CONTROLS (PLAY/PAUSE & MUTE/UNMUTE) */}
        {/* ========================================================================= */}
        <div className="absolute bottom-8 right-6 sm:right-8 z-20 flex items-center gap-2 bg-slate-950/70 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800/80 shadow-2xl">
          {/* Play / Pause Toggle */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause background video" : "Play background video"}
            className="h-10 w-10 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 flex items-center justify-center transition-colors"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4 fill-slate-200 ml-0.5" />
            )}
          </button>

          {/* Mute / Unmute Toggle */}
          <button
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video sound" : "Mute video sound"}
            className="h-10 w-10 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 flex items-center justify-center transition-colors"
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 text-slate-400" />
            ) : (
              <Volume2 className="h-4 w-4 text-emerald-400" />
            )}
          </button>

          {/* Resolution / Status Indicator */}
          <span className="hidden sm:inline-block px-2.5 text-[11px] font-mono font-medium text-slate-400 border-l border-slate-800">
            {isPlaying ? "HD 60FPS" : "PAUSED"}
          </span>
        </div>

        {/* Autoplay Blocked Recovery Overlay */}
        {autoplayBlocked && (
          <div className="absolute top-24 left-1/2 -translate-x-1/2 z-30 bg-emerald-500/90 text-slate-950 font-bold px-4 py-2 rounded-xl flex items-center gap-2 shadow-xl animate-bounce">
            <Play className="h-4 w-4 fill-slate-950" />
            <button onClick={togglePlay} className="underline">
              Tap to start video experience
            </button>
          </div>
        )}

        {/* Centered Scroll-Down Indicator */}
        <button
          onClick={scrollToFeatures}
          aria-label="Scroll down to explore features"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-400 transition-colors group cursor-pointer"
        >
          <span className="text-[11px] uppercase tracking-widest font-semibold text-slate-400 group-hover:text-emerald-400">
            Explore Features
          </span>
          <ChevronDown className="h-5 w-5 animate-bounce text-slate-400 group-hover:text-emerald-400" />
        </button>
      </section>

      {/* ========================================================================= */}
      {/* 3. KEY FEATURES & CAPABILITIES SECTION */}
      {/* ========================================================================= */}
      <section
        id="features-section"
        className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest text-emerald-400 font-extrabold mb-3">
            Core Architecture
          </h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            How KrishiMitra Protects Your Harvest
          </h3>
          <p className="text-slate-400 text-base sm:text-lg">
            Traditional farming relies on guesswork after seed is in the ground.
            KrishiMitra puts you in control with 3 scientific pillars:
          </p>
        </div>

        {/* 3 Key Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          {/* Feature 1: Deterministic Engine */}
          <div className="group relative bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-3xl p-8 transition-all hover:-translate-y-1 duration-300 shadow-xl">
            <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Sliders className="h-7 w-7" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">
              Deterministic Simulation
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Instant, reproducible calculations for yield ranges, gross revenue,
              total cultivation costs, and net ROI based on validated crop constants.
            </p>
            <ul className="text-xs text-slate-400 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Wheat, Rice, Maize, Cotton, Soybean, Sugarcane</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Planting delay & heat-stress impact penalty</span>
              </li>
            </ul>
          </div>

          {/* Feature 2: Multi-Scenario Comparison */}
          <div className="group relative bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-3xl p-8 transition-all hover:-translate-y-1 duration-300 shadow-xl">
            <div className="h-14 w-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BarChart3 className="h-7 w-7" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">
              Multi-Scenario Comparison
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Compare 2 to 4 farming strategies side-by-side. Discover whether
              drip irrigation pays for itself compared to conventional flood watering.
            </p>
            <ul className="text-xs text-slate-400 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-400" />
                <span>Side-by-side cost vs revenue vs profit charts</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-400" />
                <span>Water productivity index ($kg/m^3$) audit</span>
              </li>
            </ul>
          </div>

          {/* Feature 3: Explainable Why Panel */}
          <div className="group relative bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-3xl p-8 transition-all hover:-translate-y-1 duration-300 shadow-xl">
            <div className="h-14 w-14 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Droplets className="h-7 w-7" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">
              Explainable "Why Panel"
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Never get an unexplainable number. The attribution panel isolates
              what you can control (irrigation, sowing date) from external weather.
            </p>
            <ul className="text-xs text-slate-400 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-teal-400" />
                <span>Controllable vs external factor separation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-teal-400" />
                <span>Traceable agronomic remedies & resource checks</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quantifiable Impact Metric Bar */}
        <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/20 rounded-3xl p-8 sm:p-12 mb-20 shadow-2xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-5xl font-black text-emerald-400 mb-1">
                40%
              </p>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                Peak Water Savings with Drip
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-5xl font-black text-amber-400 mb-1">
                2 to 4
              </p>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                Simultaneous Scenario Compare
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-5xl font-black text-teal-400 mb-1">
                100%
              </p>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                Deterministic Transparency
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-5xl font-black text-white mb-1">
                6 Crops
              </p>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                Configurable Agronomic Data
              </p>
            </div>
          </div>
        </div>

        {/* Callout Action Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900/60 via-slate-900 to-slate-950 border border-emerald-500/30 p-8 sm:p-14 text-center">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Ready to simulate your next farming season?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base mb-8">
              Select your farm profile, test sowing dates, and check water stress
              in less than 60 seconds.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigateTo("dashboard")}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-8 py-4 rounded-xl shadow-xl shadow-emerald-500/20 transition-all hover:scale-105"
              >
                Start Free Simulation
              </button>
              <button
                onClick={() => navigateTo("history")}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-8 py-4 rounded-xl transition-colors"
              >
                Browse Sample Scenarios
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FAQ SECTION */}
      {/* ========================================================================= */}
      <section id="faq-section" className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-900">
        <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10">
          Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <h4 className="font-bold text-emerald-400 mb-2">
              Is this a guaranteed crop yield prediction?
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              No. KrishiMitra is a deterministic decision-support tool, not a guarantee.
              Real farming depends on unpredictable biological and climatic factors.
              The platform highlights trade-offs and risks so you can make informed choices.
            </p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <h4 className="font-bold text-emerald-400 mb-2">
              Does it work on mobile phones?
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Yes. The entire platform is engineered responsively to run smoothly
              on budget mobile smartphones (360px+), tablets, and desktop workstations.
            </p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <h4 className="font-bold text-emerald-400 mb-2">
              Can I access documentation in Marathi (मराठी)?
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Yes! We have prepared comprehensive user manuals in both English and
              Marathi (`USER_MANUAL_EN.md` and `USER_MANUAL_MR.md`) covering every single feature.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FOOTER */}
      {/* ========================================================================= */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Sprout className="h-5 w-5" />
            </div>
            <div>
              <p className="text-slate-300 font-bold">KrishiMitra (PRARAMBHA 2.0)</p>
              <p className="text-slate-400">Agri Scenario & Decision Simulator</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
            <button onClick={() => navigateTo("dashboard")} className="hover:text-emerald-400 transition-colors">
              Farms
            </button>
            <button onClick={() => navigateTo("comparison")} className="hover:text-emerald-400 transition-colors">
              Comparison
            </button>
            <button onClick={() => navigateTo("history")} className="hover:text-emerald-400 transition-colors">
              History
            </button>
            <button onClick={() => navigateTo("report")} className="hover:text-emerald-400 transition-colors">
              Dossier Report
            </button>
          </div>

          <p className="text-center sm:text-right text-slate-400">
            Decision support, not a guarantee. © {new Date().getFullYear()} KrishiMitra.
          </p>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 6. MODAL VIDEO PLAYER (OPTION C: FEATURED DEMO PLAYER) */}
      {/* ========================================================================= */}
      {isVideoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-lg p-4 animate-fade-in"
        >
          <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-sm text-white">
                  KrishiMitra Platform Demo (Product Walkthrough)
                </span>
              </div>
              <button
                onClick={closeVideoModal}
                className="h-8 w-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close demo modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Video Player in Modal with Audio Controls */}
            <div className="relative aspect-video w-full bg-black">
              <video
                ref={modalVideoRef}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
                poster={VIDEO_CONFIG.posterImage}
              >
                <source src={VIDEO_CONFIG.localMp4} type="video/mp4" />
                <source src={VIDEO_CONFIG.cdnFallbackMp4} type="video/mp4" />
                <track
                  kind="captions"
                  src={VIDEO_CONFIG.captionsVtt}
                  srcLang="en"
                  label="English"
                  default
                />
              </video>
            </div>

            {/* Modal Footer with Direct App Entry */}
            <div className="p-6 bg-slate-950/80 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-400 text-center sm:text-left">
                Experience deterministic decision simulation live on your own fields.
              </p>
              <button
                onClick={() => {
                  closeVideoModal();
                  navigateTo("dashboard");
                }}
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl shadow-lg transition-all"
              >
                <span>Enter Application</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
