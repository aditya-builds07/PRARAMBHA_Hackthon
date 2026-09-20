# KrishiMitra Stitch — Exact HTML Reference

This file contains the exact `code.html` sources extracted from the supplied Stitch ZIP. Treat these as visual references; convert them into React components rather than pasting standalone HTML into production.


---

## `krishimitra_logo/code.html`

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 60" fill="none">
  <g transform="translate(10, 8)">
    <rect width="44" height="44" rx="14" fill="#164A34" />
    <path d="M22 10C22 10 14 16 14 26C14 31 18 35 22 35C26 35 30 31 30 26C30 16 22 10 22 10Z" fill="#3D8B5A"/>
    <path d="M22 18V34M22 24L26 21M22 28L18 25" stroke="#F8F6F0" stroke-width="2" stroke-linecap="round"/>
    <circle cx="32" cy="14" r="3.5" fill="#4C9BB8"/>
  </g>
  <text x="64" y="32" font-family="'Plus Jakarta Sans', sans-serif" font-size="22" font-weight="700" fill="#164A34" letter-spacing="-0.5">Krishi<tspan fill="#3D8B5A">Mitra</tspan></text>
  <text x="65" y="46" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="500" fill="#596A61" letter-spacing="0.5">PLAN BEFORE YOU PLANT</text>
</svg>
```

---

## `krishimitra_landing_page/code.html`

```html
<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"><meta content="web_standard" name="shell-type"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"><link href="https://fonts.googleapis.com" rel="preconnect"><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "secondary-fixed-dim": "#88d8a0", "on-tertiary-fixed": "#001f29", "tertiary-fixed-dim": "#84d1f0", "on-tertiary-fixed-variant": "#004d62", "on-secondary-fixed": "#00210e", "on-primary": "#ffffff", "on-surface-variant": "#404943", "tertiary-fixed": "#baeaff", "surface-container-low": "#f5f3ed", "error-container": "#ffdad6", "primary-fixed-dim": "#9dd2b5", "inverse-surface": "#30312d", "inverse-on-surface": "#f3f1eb", "tertiary-container": "#00475a", "on-error": "#ffffff", "secondary-fixed": "#a4f4ba", "primary-fixed": "#b9efd0", "primary-container": "#164a34", "on-primary-fixed": "#002113", "outline": "#717973", "background": "#fbf9f3", "on-surface": "#1b1c18", "surface": "#fbf9f3", "on-tertiary-container": "#6ab7d5", "tertiary": "#002f3d", "surface-container-lowest": "#ffffff", "surface-variant": "#e4e2dd", "secondary-container": "#a1f1b7", "on-secondary-container": "#1f7042", "error": "#ba1a1a", "outline-variant": "#c0c9c1", "surface-tint": "#366850", "on-error-container": "#93000a", "on-secondary-fixed-variant": "#00522b", "primary": "#003320", "on-background": "#1b1c18", "on-primary-fixed-variant": "#1d5039", "surface-dim": "#dcdad4", "surface-container": "#f0eee8", "on-primary-container": "#85b99c", "secondary": "#196c3e", "surface-bright": "#fbf9f3", "inverse-primary": "#9dd2b5", "surface-container-highest": "#e4e2dd", "surface-container-high": "#eae8e2", "on-secondary": "#ffffff", "on-tertiary": "#ffffff" }, "borderRadius": { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" }, "spacing": { "space-xl": "2.5rem", "space-md": "1rem", "gutter-mobile": "1rem", "gutter": "1.5rem", "margin-mobile": "1rem", "margin": "3rem", "space-sm": "0.5rem", "space-xs": "0.25rem", "space-lg": "1.5rem" }, "fontFamily": { "title-md": ["Plus Jakarta Sans"], "body-md": ["Plus Jakarta Sans"], "headline-md": ["Plus Jakarta Sans"], "headline-sm": ["Plus Jakarta Sans"], "title-lg": ["Plus Jakarta Sans"], "headline-lg": ["Plus Jakarta Sans"], "body-lg": ["Plus Jakarta Sans"], "label-md": ["Plus Jakarta Sans"], "body-sm": ["Plus Jakarta Sans"], "display-lg-mobile": ["Plus Jakarta Sans"], "label-sm": ["Plus Jakarta Sans"], "label-lg": ["Plus Jakarta Sans"], "headline-lg-mobile": ["Plus Jakarta Sans"], "display-lg": ["Plus Jakarta Sans"] }, "fontSize": { "title-md": ["16px", { "lineHeight": "24px", "fontWeight": "600" }], "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }], "headline-md": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600" }], "headline-sm": ["20px", { "lineHeight": "28px", "fontWeight": "600" }], "title-lg": ["18px", { "lineHeight": "26px", "fontWeight": "600" }], "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700" }], "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }], "label-md": ["12px", { "lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "600" }], "body-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }], "display-lg-mobile": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700" }], "label-sm": ["11px", { "lineHeight": "14px", "letterSpacing": "0.02em", "fontWeight": "500" }], "label-lg": ["14px", { "lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "600" }], "headline-lg-mobile": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600" }], "display-lg": ["44px", { "lineHeight": "52px", "letterSpacing": "-0.02em", "fontWeight": "700" }] } } } };</script></head><body class="bg-background font-body-md text-on-surface antialiased" style="background: radial-gradient(at 0% 0%, rgba(34, 197, 94, 0.15) 0px, transparent 50%) fixed, radial-gradient(at 100% 0%, rgba(16, 185, 129, 0.18) 0px, transparent 50%), radial-gradient(rgba(132, 204, 22, 0.08) 0px, transparent 50%), radial-gradient(at 80% 100%, rgba(16, 185, 129, 0.12) 0px, transparent 50%), rgb(244, 247, 244);"><header class="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]" style="backdrop-filter: blur(20px) saturate(180%); background-color: rgba(255, 255, 255, 0.78); border-bottom: 1px solid rgba(255, 255, 255, 0.8); box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 24px -1px, rgba(255, 255, 255, 0.9) 0px 1px 1px 0px inset;"><div class="h-16 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between"><div class="flex items-center gap-3"><img alt="Brand logo. - Primary color: #164a34
- Font: plusJakartaSans
- Mode: light
- Roundness: rounded-md
" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1UwvheEflVQETpVODXud1bKJQLTG3Z9V091WAQuRWb3OjkfynIYN40ImZHKnidhICqNkNrqFqpWKzSfZlgxI5J_M82iY6odlXGtsZTTc8HXdVBAz6ryKsSz-P5wU6ZoKTCO5D247hagw2iNx0PZZfjdthMC8zjpWAGLJh7xg4qo3i9LZdCn7j6gGxugjmJTrMiBN0EKKxLQuSsUMZx2F7LChrzofAoNzJDssH-iE5FNMrlgSgXlD6etBto"><span class="font-title-lg text-primary tracking-tight">KrishiMitra</span></div><nav class="hidden md:flex items-center gap-8" data-active-classes="text-primary font-title-md"><a aria-current="page" class="transition-colors text-primary font-title-md" data-path="home" href="#">Home</a><a class="font-body-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="features" href="#">Features</a><a class="font-body-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="agronomy-solutions" href="#">Agronomy Solutions</a><a class="font-body-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="pricing-plans" href="#">Pricing</a></nav><div class="flex items-center gap-4"><div class="flex items-center bg-surface-container px-2 py-1 rounded-lg"><span class="material-symbols-outlined text-[18px] text-on-surface-variant mr-1">translate</span><select class="bg-transparent font-label-md text-on-surface outline-none cursor-pointer pr-1"><option value="en">English</option><option value="hi">हिंदी</option><option value="mr">मराठी</option></select></div><a class="font-label-lg text-primary hover:text-secondary transition-colors" data-path="login" href="#">Sign In</a><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main class="w-full pt-16 bg-transparent min-h-[calc(100vh-16rem)]"><div class="flex flex-col w-full">
<!-- Hero Section with Aerial Agri Vista Backdrop -->
<section class="relative w-full overflow-hidden bg-primary">
<!-- Visual Image Layer -->
<div class="absolute inset-0 z-0">
<img alt="Panoramic aerial view of Indian agricultural landscape" class="w-full h-full object-cover object-center scale-105 transform duration-1000 ease-out" src="https://lh3.googleusercontent.com/aida/AEtjO1XYoROS-GE82iBXYItBc3r-DRupzmzsIH3mpf51-Gx3EjtX7eW2mgPoAML_BTQxxw9yO4iFmB-I7mNBTOKKDQfoGl2Csmi3MZzVbLySLdNeNt_EEH5q0FdssaR0oJYAZBZf1IgN_pDGtKEzx8a5UTiygffX9zbOhkvN-OVxQmuXl6t3sHqq5Y8wWKEafxRwk1HMVlJNldgBGQx9lNRVzwjR0_cMXQHwnTtXkp53vcCc5U0S4PclbtZzig">
<div class="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40"></div>
<div class="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent"></div>
</div>
<!-- Hero Content Container -->
<div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-28 lg:pt-32 lg:pb-36 flex flex-col justify-center">
<!-- Trust Overline Pill -->
<div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest/15 backdrop-blur-md self-start mb-6 shadow-sm">
<span class="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"></span>
<span class="font-label-md text-surface-bright tracking-wide uppercase">Precision Crop Intelligence 2025</span>
</div>
<!-- Main Headline & Subtitle -->
<div class="max-w-3xl space-y-6">
<h1 class="font-display-lg text-on-primary tracking-tight text-balance">
          Plan before you plant.
        </h1>
<p class="font-body-lg text-primary-fixed-dim/95 max-w-2xl text-balance">
          Compare crop plans, understand seasonal risk, and make confident agronomic decisions with AI-guided predictive modeling built for Indian farming.
        </p>
</div>
<!-- CTAs & Micro-Trust Marker -->
<div class="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
<button class="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-secondary hover:bg-secondary-container hover:text-on-secondary-container text-on-primary font-title-md transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]">
<span class="">Create a Crop Plan</span>
<span class="material-symbols-outlined text-[20px]">arrow_forward</span>
</button>
<button class="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 backdrop-blur-md text-on-primary font-title-md transition-all duration-200 shadow-sm">
<span class="material-symbols-outlined text-[20px] text-secondary-fixed">play_circle</span>
<span class="">Explore Interactive Demo</span>
</button>
</div>
<!-- Micro Trust Badges Row -->
<div class="mt-12 flex flex-wrap items-center gap-6 pt-6 font-label-md text-surface-container-high/90">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary-fixed text-[18px]">verified</span>
<span class="">Built for Indian farmers</span>
</div>
<span class="inline-block w-1.5 h-1.5 rounded-full bg-outline-variant/60"></span>
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary-fixed text-[18px]">language</span>
<span class="">Multi-lingual Support</span>
</div>
<span class="inline-block w-1.5 h-1.5 rounded-full bg-outline-variant/60"></span>
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary-fixed text-[18px]">offline_pin</span>
<span class="">Offline sync ready</span>
</div>
</div>
</div>
</section>
<!-- Key Value Pillars Section (Negative Offset Floating Cards) -->
<section class="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 -mt-16 w-full">
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
<!-- Benefit Card 1: Profit Estimation -->
<div style="background-color: rgba(255, 255, 255, 0.82); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.85); box-shadow: 0 10px 30px -5px rgba(22, 74, 52, 0.05), inset 0 1px 2px rgba(255, 255, 255, 0.95);" class="rounded-xl p-8 hover:shadow-xl transition-shadow duration-300 relative flex flex-col justify-between group">
<div>
<div class="w-14 h-14 rounded-xl bg-surface-container-low flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-on-secondary transition-colors duration-200">
<span class="material-symbols-outlined text-[30px]">payments</span>
</div>
<span class="font-label-sm text-secondary uppercase tracking-wider font-semibold">Financial Predictability</span>
<h3 class="font-headline-sm text-on-surface mt-1 mb-3">Estimate Net Profit</h3>
<p class="font-body-md text-on-surface-variant">
            Pre-calculate field yields, projected APMC mandi pricing curves, fertilizer inputs, and exact ROI before sowing a single seed.
          </p>
</div>
<div class="mt-8 pt-4 flex items-center justify-between text-secondary font-title-md">
<span class="font-label-md text-on-surface-variant">Avg. Accuracy</span>
<span class="font-title-md text-secondary">94.2% Mandi Match</span>
</div>
</div>
<!-- Benefit Card 2: Save Water -->
<div style="background-color: rgba(255, 255, 255, 0.82); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.85); box-shadow: 0 10px 30px -5px rgba(22, 74, 52, 0.05), inset 0 1px 2px rgba(255, 255, 255, 0.95);" class="rounded-xl p-8 hover:shadow-xl transition-shadow duration-300 relative flex flex-col justify-between group">
<div>
<div class="w-14 h-14 rounded-xl bg-surface-container-low flex items-center justify-center text-tertiary-container group-hover:bg-tertiary group-hover:text-on-tertiary transition-colors duration-200 mb-6">
<span class="material-symbols-outlined text-[30px]">water_drop</span>
</div>
<span class="font-label-sm text-tertiary-container uppercase tracking-wider font-semibold">Irrigation Optimisation</span>
<h3 class="font-headline-sm text-on-surface mt-1 mb-3">Conserve Critical Water</h3>
<p class="font-body-md text-on-surface-variant">
            Precise aquifer intelligence comparing conventional flood versus micro-drip consumption metrics measured in cubic meters (m³).
          </p>
</div>
<div class="mt-8 pt-4 flex items-center justify-between font-title-md">
<span class="font-label-md text-on-surface-variant">Borewell Life</span>
<span class="font-title-md text-on-tertiary-container">+35% Extension</span>
</div>
</div>
<!-- Benefit Card 3: Reduce Risk -->
<div style="background-color: rgba(255, 255, 255, 0.82); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.85); box-shadow: 0 10px 30px -5px rgba(22, 74, 52, 0.05), inset 0 1px 2px rgba(255, 255, 255, 0.95);" class="rounded-xl p-8 hover:shadow-xl transition-shadow duration-300 relative flex flex-col justify-between group">
<div>
<div class="w-14 h-14 rounded-xl bg-surface-container-low flex items-center justify-center text-on-secondary-container group-hover:bg-primary-container group-hover:text-on-primary transition-colors duration-200 mb-6">
<span class="material-symbols-outlined text-[30px]">shield</span>
</div>
<span class="font-label-sm text-secondary uppercase tracking-wider font-semibold">Risk Mitigation</span>
<h3 class="font-headline-sm text-on-surface mt-1 mb-3">Shield Sowing Decisions</h3>
<p class="font-body-md text-on-surface-variant">
            Simulate delayed monsoon onsets, sudden hailstorm windows, and sudden pest alerts tailored specifically to your pin-code soil zone.
          </p>
</div>
<div class="mt-8 pt-4 flex items-center justify-between font-title-md">
<span class="font-label-md text-on-surface-variant">Weather Simulation</span>
<span class="font-title-md text-secondary">14-Day Micro-Forecast</span>
</div>
</div>
</div>
</section>
<!-- Interactive Dashboard Simulation Section -->
<section class="w-full max-w-7xl mx-auto px-6 lg:px-12 py-24">
<div class="text-center max-w-3xl mx-auto mb-14">
<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md mb-3">
<span class="material-symbols-outlined text-[16px]">visibility</span>
        Live Model Preview
      </div>
<h2 class="font-headline-lg text-on-surface tracking-tight">Real-time Agronomic Clarity</h2>
<p class="font-body-lg text-on-surface-variant mt-2">
        See how our simulation engine visualizes inputs, yields, and water budgets before capital is committed to the soil.
      </p>
</div>
<!-- Dashboard Simulation Card -->
<div style="background-color: rgba(255, 255, 255, 0.82); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.85); box-shadow: 0 10px 30px -5px rgba(22, 74, 52, 0.05), inset 0 1px 2px rgba(255, 255, 255, 0.95);" class="rounded-2xl overflow-hidden p-6 lg:p-10">
<!-- Simulated App Header -->
<div class="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 gap-4 bg-surface-container-low/50 -m-6 -mt-6 p-6 lg:-m-10 lg:-mt-10 lg:p-8">
<div class="flex items-center gap-4">
<div class="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center font-headline-sm">
            SP
          </div>
<div>
<div class="flex items-center gap-2">
<h4 class="font-title-lg text-on-surface">Shivaji Patil — Plot 4B (Kharif Plan)</h4>
<span class="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm font-semibold">Active Model</span>
</div>
<p class="font-body-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
<span class="material-symbols-outlined text-[16px]">location_on</span>
              Nashik Rural, Maharashtra · 5.2 Acres · Medium Black Clay Soil
            </p>
</div>
</div>
<!-- Quick Switcher Scenario -->
<div class="flex items-center gap-2 bg-surface-container px-3 py-1.5 rounded-xl self-start md:self-auto">
<span class="font-label-sm text-on-surface-variant">Scenario:</span>
<span class="font-label-md text-primary font-semibold">Soybean + Tur Intercrop (Option B)</span>
<span class="material-symbols-outlined text-[18px] text-on-surface-variant">expand_more</span>
</div>
</div>
<!-- Dashboard Visual Matrix -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
<!-- Key Metrics Quad -->
<div class="lg:col-span-8 space-y-6">
<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
<!-- Metric 1 -->
<div class="bg-surface-container-low rounded-xl p-5 relative overflow-hidden">
<span class="font-label-md text-on-surface-variant">Net Estimated Profit</span>
<div class="font-headline-lg text-primary mt-2">₹1,84,500</div>
<div class="flex items-center gap-1.5 mt-2 font-label-sm text-secondary">
<span class="material-symbols-outlined text-[16px]">trending_up</span>
<span class="">+22% vs. Sole Cotton</span>
</div>
</div>
<!-- Metric 2 -->
<div class="bg-surface-container-low rounded-xl p-5 relative overflow-hidden">
<span class="font-label-md text-on-surface-variant">Water Demand</span>
<div class="font-headline-lg text-tertiary-container mt-2">6,200 m³</div>
<div class="flex items-center gap-1.5 mt-2 font-label-sm text-tertiary-container">
<span class="material-symbols-outlined text-[16px]">water_drop</span>
<span class="">Sufficient in Borewell #1</span>
</div>
</div>
<!-- Metric 3 -->
<div class="bg-surface-container-low rounded-xl p-5 relative overflow-hidden">
<span class="font-label-md text-on-surface-variant">Confidence Index</span>
<div class="font-headline-lg text-secondary mt-2">89 / 100</div>
<div class="flex items-center gap-1.5 mt-2 font-label-sm text-secondary">
<span class="material-symbols-outlined text-[16px]">verified</span>
<span class="">High Climate Resilience</span>
</div>
</div>
</div>
<!-- Soil Moisture & Water Glance Bar -->
<div class="bg-surface-container-low/80 rounded-xl p-6">
<div class="flex items-center justify-between mb-4">
<div>
<h5 class="font-title-md text-on-surface">120-Day Soil Moisture &amp; Irrigation Window</h5>
<p class="font-body-sm text-on-surface-variant">Predicted critical stress weeks and drip schedules</p>
</div>
<span class="px-2.5 py-1 bg-surface-container rounded-lg font-label-sm text-primary font-medium">Optimal Window: July 08 - July 14</span>
</div>
<!-- Minimal SVG Sparkline / Timeline -->
<div class="w-full bg-surface-container-lowest rounded-xl p-4">
<svg class="w-full h-24 text-secondary" fill="none" preserveAspectRatio="none" viewBox="0 0 600 100">
<path d="M0,80 Q75,30 150,45 T300,20 T450,60 T600,35" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="3"></path>
<path d="M0,80 Q75,30 150,45 T300,20 T450,60 T600,35 L600,100 L0,100 Z" fill="currentColor" fill-opacity="0.08"></path>
<circle cx="150" cy="45" fill="#164a34" r="5" stroke="#ffffff" stroke-width="2"></circle>
<circle cx="300" cy="20" fill="#164a34" r="5" stroke="#ffffff" stroke-width="2"></circle>
<circle cx="450" cy="60" fill="#ba1a1a" r="5" stroke="#ffffff" stroke-width="2"></circle>
</svg>
<div class="flex justify-between text-on-surface-variant font-label-sm mt-3 pt-2">
<span class="">Sowing (Day 0)</span>
<span class="">Vegetative (Day 35)</span>
<span class="">Pod Formation (Day 75)</span>
<span class="">Harvest Window (Day 115)</span>
</div>
</div>
</div>
</div>
<!-- Agronomic Advisor Sidebar Panel -->
<div class="lg:col-span-4 bg-surface-container-low rounded-xl p-6 flex flex-col justify-between h-full">
<div>
<div class="flex items-center gap-2 mb-4">
<span class="material-symbols-outlined text-secondary text-[22px]">psychology</span>
<h5 class="font-title-md text-on-surface">AI Agronomy Recommendation</h5>
</div>
<div class="space-y-4">
<div class="p-3.5 rounded-lg bg-surface-container-lowest shadow-sm">
<div class="flex items-center gap-2 text-secondary font-title-sm">
<span class="material-symbols-outlined text-[18px]">eco</span>
<span class="">Input Optimization</span>
</div>
<p class="font-body-sm text-on-surface-variant mt-1">
                  Replace DAP with SSP + Bio-NPK consortium to preserve soil pH and save ₹1,650/acre.
                </p>
</div>
<div class="p-3.5 rounded-lg bg-surface-container-lowest shadow-sm">
<div class="flex items-center gap-2 text-on-surface font-title-sm">
<span class="material-symbols-outlined text-[18px]">wb_cloudy</span>
<span class="">Monsoon Buffer</span>
</div>
<p class="font-body-sm text-on-surface-variant mt-1">
                  Delay planting by 5 days; Western Ghats rain corridor indicates delayed cluster arrival.
                </p>
</div>
<div class="p-3.5 rounded-lg bg-surface-container-lowest shadow-sm">
<div class="flex items-center gap-2 text-tertiary-container font-title-sm">
<span class="material-symbols-outlined text-[18px]">currency_rupee</span>
<span class="">Forward Price Lock</span>
</div>
<p class="font-body-sm text-on-surface-variant mt-1">
                  NCDEX soybean October contract sits at ₹4,850/qtl. Favorable window to hedge 40% yield.
                </p>
</div>
</div>
</div>
<div class="mt-6 pt-4">
<button class="w-full py-3 bg-primary hover:bg-primary-container text-on-primary rounded-lg font-title-md transition-colors flex items-center justify-center gap-2">
<span class="">Adopt This Plan</span>
<span class="material-symbols-outlined text-[18px]">check_circle</span>
</button>
</div>
</div>
</div>
</div>
</section>
<!-- How It Works 4-Step Flow -->
<section class="w-full bg-transparent py-24">
<div class="max-w-7xl mx-auto px-6 lg:px-12">
<!-- Section Header -->
<div class="max-w-2xl mb-16">
<span class="font-label-md uppercase tracking-wider text-secondary font-semibold">Straightforward Process</span>
<h2 class="font-headline-lg text-on-surface mt-2 tracking-tight">Four simple steps to guaranteed planting certainty</h2>
<p class="font-body-md text-on-surface-variant mt-3">
          No complex laboratory testing or tedious data entry required. Our geo-spatial engine fetches local conditions automatically.
        </p>
</div>
<!-- Step Cards Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
<!-- Step 01 -->
<div style="background-color: rgba(255, 255, 255, 0.82); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.85); box-shadow: 0 10px 30px -5px rgba(22, 74, 52, 0.05), inset 0 1px 2px rgba(255, 255, 255, 0.95);" class="rounded-xl p-7 flex flex-col justify-between relative hover:-translate-y-1 transition-transform duration-200">
<div>
<div class="flex items-center justify-between mb-6">
<span class="font-headline-md text-secondary-fixed-dim/80 font-bold">01</span>
<div class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
<span class="material-symbols-outlined text-[20px]">map</span>
</div>
</div>
<h4 class="font-title-lg text-on-surface mb-2">Add Your Farm</h4>
<p class="font-body-sm text-on-surface-variant">
              Specify your village, survey number or drop a pin. We pull historical rainfall, soil taxonomy, and water table records.
            </p>
</div>
<div class="mt-8 pt-4">
<span class="font-label-sm text-secondary font-medium flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">bolt</span> Automated Soil Profiling
            </span>
</div>
</div>
<!-- Step 02 -->
<div style="background-color: rgba(255, 255, 255, 0.82); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.85); box-shadow: 0 10px 30px -5px rgba(22, 74, 52, 0.05), inset 0 1px 2px rgba(255, 255, 255, 0.95);" class="rounded-xl p-7 flex flex-col justify-between relative hover:-translate-y-1 transition-transform duration-200">
<div>
<div class="flex items-center justify-between mb-6">
<span class="font-headline-md text-secondary-fixed-dim/80 font-bold">02</span>
<div class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
<span class="material-symbols-outlined text-[20px]">tune</span>
</div>
</div>
<h4 class="font-title-lg text-on-surface mb-2">Create Plan</h4>
<p class="font-body-sm text-on-surface-variant">
              Choose your prospective crops (cash crops, pulses, or horticulture) and specify available capital, seed budget, and irrigation source.
            </p>
</div>
<div class="mt-8 pt-4">
<span class="font-label-sm text-secondary font-medium flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">bolt</span> Dynamic Cost Estimator
            </span>
</div>
</div>
<!-- Step 03 -->
<div style="background-color: rgba(255, 255, 255, 0.82); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.85); box-shadow: 0 10px 30px -5px rgba(22, 74, 52, 0.05), inset 0 1px 2px rgba(255, 255, 255, 0.95);" class="rounded-xl p-7 flex flex-col justify-between relative hover:-translate-y-1 transition-transform duration-200">
<div>
<div class="flex items-center justify-between mb-6">
<span class="font-headline-md text-secondary-fixed-dim/80 font-bold">03</span>
<div class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
<span class="material-symbols-outlined text-[20px]">analytics</span>
</div>
</div>
<h4 class="font-title-lg text-on-surface mb-2">See Estimates</h4>
<p class="font-body-sm text-on-surface-variant">
              Inspect comprehensive yield curves, water consumption quotas, labor needs, and harvest date pricing predictions.
            </p>
</div>
<div class="mt-8 pt-4">
<span class="font-label-sm text-secondary font-medium flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">bolt</span> 94% Harvest Fidelity
            </span>
</div>
</div>
<!-- Step 04 -->
<div style="background-color: rgba(255, 255, 255, 0.82); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.85); box-shadow: 0 10px 30px -5px rgba(22, 74, 52, 0.05), inset 0 1px 2px rgba(255, 255, 255, 0.95);" class="rounded-xl p-7 flex flex-col justify-between relative hover:-translate-y-1 transition-transform duration-200">
<div>
<div class="flex items-center justify-between mb-6">
<span class="font-headline-md text-secondary-fixed-dim/80 font-bold">04</span>
<div class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
<span class="material-symbols-outlined text-[20px]">compare_arrows</span>
</div>
</div>
<h4 class="font-title-lg text-on-surface mb-2">Compare Options</h4>
<p class="font-body-sm text-on-surface-variant">
              Compare 3 distinct scenarios side-by-side: conservative, high-yield, or drought-resilient before purchasing seeds.
            </p>
</div>
<div class="mt-8 pt-4">
<span class="font-label-sm text-secondary font-medium flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">bolt</span> Informed Sowing
            </span>
</div>
</div>
</div>
</div>
</section>
<!-- Trust & Farmer Governance Section -->
<section class="max-w-7xl mx-auto px-6 lg:px-12 py-20 w-full">
<div class="bg-primary text-on-primary rounded-2xl p-8 lg:p-14 relative overflow-hidden shadow-xl">
<!-- Ambient Decorative background shapes -->
<div class="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-secondary/15 blur-3xl pointer-events-none"></div>
<div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
<div class="lg:col-span-7 space-y-4">
<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-lowest/15 text-secondary-fixed font-label-md">
<span class="material-symbols-outlined text-[16px]">gavel</span>
            Farmer Autonomy First
          </div>
<h2 class="font-headline-lg text-on-primary tracking-tight">
            Transparent estimates. Your final decision stays in your hands.
          </h2>
<p class="font-body-md text-primary-fixed-dim max-w-xl">
            KrishiMitra sells no chemicals, seeds, or fertilizers. We don't take commissions from dealers. Our recommendations are uncompromised, objective, and solely optimized for your household's net prosperity.
          </p>
</div>
<!-- Verified Impact Stats Column -->
<div class="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
<div class="bg-surface-container-lowest/10 backdrop-blur-md rounded-xl p-5">
<div class="font-headline-lg text-secondary-fixed">₹42,000</div>
<div class="font-label-md text-surface-bright mt-1">Avg. input saved/acre</div>
<p class="font-body-sm text-surface-container-high/80 mt-1">Reduced over-fertilization</p>
</div>
<div class="bg-surface-container-lowest/10 backdrop-blur-md rounded-xl p-5">
<div class="font-headline-lg text-tertiary-fixed">35%</div>
<div class="font-label-md text-surface-bright mt-1">Water conserved</div>
<p class="font-body-sm text-surface-container-high/80 mt-1">Per seasonal irrigation cycle</p>
</div>
<div class="sm:col-span-2 bg-surface-container-lowest/10 backdrop-blur-md rounded-xl p-5 flex items-center justify-between">
<div>
<div class="font-headline-md text-on-primary">18,000+</div>
<div class="font-label-md text-surface-bright">Crop plans successfully modeled</div>
</div>
<div class="flex -space-x-2">
<div class="w-9 h-9 rounded-full bg-secondary flex items-center justify-center font-label-sm text-on-secondary">MH</div>
<div class="w-9 h-9 rounded-full bg-tertiary-container flex items-center justify-center font-label-sm text-on-tertiary">KA</div>
<div class="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center font-label-sm text-primary">MP</div>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- Regional Language Strip & Action Banner -->
<section class="max-w-7xl mx-auto px-6 lg:px-12 pb-24 w-full">
<div class="bg-surface-container rounded-2xl p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
<div class="space-y-3 max-w-xl text-center md:text-left">
<h3 class="font-headline-md text-on-surface">Ready to plan your next Kharif or Rabi season?</h3>
<p class="font-body-md text-on-surface-variant">
          Sign up with your mobile number in seconds. Fully translated and voiced in your mother tongue.
        </p>
<div class="flex items-center justify-center md:justify-start gap-2 pt-2">
<button class="px-3 py-1.5 rounded-lg bg-surface-container-lowest text-primary font-label-md shadow-sm">English</button>
<button class="px-3 py-1.5 rounded-lg hover:bg-surface-container-lowest text-on-surface-variant font-label-md transition-colors">हिंदी (Hindi)</button>
<button class="px-3 py-1.5 rounded-lg hover:bg-surface-container-lowest text-on-surface-variant font-label-md transition-colors">मराठी (Marathi)</button>
</div>
</div>
<div class="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
<button class="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-title-md transition-all duration-200 shadow-md flex items-center justify-center gap-2">
<span class="">Get Started Free</span>
<span class="material-symbols-outlined text-[20px]">chevron_right</span>
</button>
<button class="w-full sm:w-auto px-6 py-4 rounded-xl bg-surface-container-lowest hover:bg-surface-container-high text-on-surface font-title-md transition-all duration-200">
          Consult Agronomist
        </button>
</div>
</div>
</section>
</div></main><footer class="w-full bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] py-12"><div class="max-w-7xl mx-auto px-6 lg:px-12"><div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8"><div class="space-y-3"><div class="flex items-center gap-2"><img alt="Brand logo. - Primary color: #164a34
- Font: plusJakartaSans
- Mode: light
- Roundness: rounded-md
" class="h-6 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1UwvheEflVQETpVODXud1bKJQLTG3Z9V091WAQuRWb3OjkfynIYN40ImZHKnidhICqNkNrqFqpWKzSfZlgxI5J_M82iY6odlXGtsZTTc8HXdVBAz6ryKsSz-P5wU6ZoKTCO5D247hagw2iNx0PZZfjdthMC8zjpWAGLJh7xg4qo3i9LZdCn7j6gGxugjmJTrMiBN0EKKxLQuSsUMZx2F7LChrzofAoNzJDssH-iE5FNMrlgSgXlD6etBto"><span class="font-title-md text-primary">KrishiMitra</span></div><p class="font-body-sm text-on-surface-variant">Precision agronomic intelligence and deliberate planning for progressive Indian farmers.</p></div><div><h4 class="font-title-md text-on-surface mb-3">Platform</h4><ul class="space-y-2"><li class="font-body-sm text-on-surface-variant">Soil Health Registry</li><li class="font-body-sm text-on-surface-variant">Crop Cycle Modeling</li><li class="font-body-sm text-on-surface-variant">Weather Risk Matrix</li></ul></div><div><h4 class="font-title-md text-on-surface mb-3">Resources</h4><ul class="space-y-2"><li class="font-body-sm text-on-surface-variant">Farming Handbook</li><li class="font-body-sm text-on-surface-variant">Subsidies &amp; Schemes</li><li class="font-body-sm text-on-surface-variant">Advisory Network</li></ul></div><div><h4 class="font-title-md text-on-surface mb-3">Languages</h4><div class="flex flex-wrap gap-2"><span class="px-2 py-1 bg-surface-container rounded font-label-sm text-on-surface-variant">English</span><span class="px-2 py-1 bg-surface-container rounded font-label-sm text-on-surface-variant">हिंदी (Hindi)</span><span class="px-2 py-1 bg-surface-container rounded font-label-sm text-on-surface-variant">मराठी (Marathi)</span></div></div></div><div class="pt-6 flex flex-col sm:flex-row items-center justify-between font-label-sm text-on-surface-variant"><p class="">© 2025 KrishiMitra Technologies. Rooted in Precision.</p><div class="flex gap-6 mt-4 sm:mt-0"><span class="">Privacy Policy</span><span class="">Terms of Advisory</span><span class="">Support</span></div></div></div></footer>

</body></html>
```

---

## `krishimitra_farm_dashboard/code.html`

```html
<!DOCTYPE html><html lang="en" style=""><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"><meta content="web_dashboard" name="shell-type"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"><link href="https://fonts.googleapis.com" rel="preconnect"><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "secondary-fixed-dim": "#88d8a0", "on-tertiary-fixed": "#001f29", "tertiary-fixed-dim": "#84d1f0", "on-tertiary-fixed-variant": "#004d62", "on-secondary-fixed": "#00210e", "on-primary": "#ffffff", "on-surface-variant": "#404943", "tertiary-fixed": "#baeaff", "surface-container-low": "#f5f3ed", "error-container": "#ffdad6", "primary-fixed-dim": "#9dd2b5", "inverse-surface": "#30312d", "inverse-on-surface": "#f3f1eb", "tertiary-container": "#00475a", "on-error": "#ffffff", "secondary-fixed": "#a4f4ba", "primary-fixed": "#b9efd0", "primary-container": "#164a34", "on-primary-fixed": "#002113", "outline": "#717973", "background": "#fbf9f3", "on-surface": "#1b1c18", "surface": "#fbf9f3", "on-tertiary-container": "#6ab7d5", "tertiary": "#002f3d", "surface-container-lowest": "#ffffff", "surface-variant": "#e4e2dd", "secondary-container": "#a1f1b7", "on-secondary-container": "#1f7042", "error": "#ba1a1a", "outline-variant": "#c0c9c1", "surface-tint": "#366850", "on-error-container": "#93000a", "on-secondary-fixed-variant": "#00522b", "primary": "#003320", "on-background": "#1b1c18", "on-primary-fixed-variant": "#1d5039", "surface-dim": "#dcdad4", "surface-container": "#f0eee8", "on-primary-container": "#85b99c", "secondary": "#196c3e", "surface-bright": "#fbf9f3", "inverse-primary": "#9dd2b5", "surface-container-highest": "#e4e2dd", "surface-container-high": "#eae8e2", "on-secondary": "#ffffff", "on-tertiary": "#ffffff" }, "borderRadius": { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" }, "spacing": { "space-xl": "2.5rem", "space-md": "1rem", "gutter-mobile": "1rem", "gutter": "1.5rem", "margin-mobile": "1rem", "margin": "3rem", "space-sm": "0.5rem", "space-xs": "0.25rem", "space-lg": "1.5rem" }, "fontFamily": { "title-md": ["Plus Jakarta Sans"], "body-md": ["Plus Jakarta Sans"], "headline-md": ["Plus Jakarta Sans"], "headline-sm": ["Plus Jakarta Sans"], "title-lg": ["Plus Jakarta Sans"], "headline-lg": ["Plus Jakarta Sans"], "body-lg": ["Plus Jakarta Sans"], "label-md": ["Plus Jakarta Sans"], "body-sm": ["Plus Jakarta Sans"], "display-lg-mobile": ["Plus Jakarta Sans"], "label-sm": ["Plus Jakarta Sans"], "label-lg": ["Plus Jakarta Sans"], "headline-lg-mobile": ["Plus Jakarta Sans"], "display-lg": ["Plus Jakarta Sans"] }, "fontSize": { "title-md": ["16px", { "lineHeight": "24px", "fontWeight": "600" }], "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }], "headline-md": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600" }], "headline-sm": ["20px", { "lineHeight": "28px", "fontWeight": "600" }], "title-lg": ["18px", { "lineHeight": "26px", "fontWeight": "600" }], "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700" }], "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }], "label-md": ["12px", { "lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "600" }], "body-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }], "display-lg-mobile": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700" }], "label-sm": ["11px", { "lineHeight": "14px", "letterSpacing": "0.02em", "fontWeight": "500" }], "label-lg": ["14px", { "lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "600" }], "headline-lg-mobile": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600" }], "display-lg": ["44px", { "lineHeight": "52px", "letterSpacing": "-0.02em", "fontWeight": "700" }] } } } };</script></head><body class="bg-background font-body-md text-on-surface antialiased" style="background: radial-gradient(at 0% 0%, rgba(34, 197, 94, 0.15) 0px, transparent 50%) fixed, radial-gradient(at 100% 0%, rgba(16, 185, 129, 0.18) 0px, transparent 50%), radial-gradient(rgba(132, 204, 22, 0.08) 0px, transparent 50%), radial-gradient(at 80% 100%, rgba(16, 185, 129, 0.12) 0px, transparent 50%), rgb(244, 247, 244);"><aside class="fixed left-0 top-0 h-full w-64 bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between pt-5 pb-6" style="backdrop-filter: blur(20px) saturate(180%); background-color: rgba(255, 255, 255, 0.78); border-right: 1px solid rgba(255, 255, 255, 0.8); box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 24px -1px, rgba(255, 255, 255, 0.9) 0px 1px 1px 0px inset;"><div class="flex flex-col gap-6"><div class="px-6 flex items-center gap-3"><img alt="Brand logo. - Primary color: #164a34
- Font: plusJakartaSans
- Mode: light
- Roundness: rounded-md
" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1UwvheEflVQETpVODXud1bKJQLTG3Z9V091WAQuRWb3OjkfynIYN40ImZHKnidhICqNkNrqFqpWKzSfZlgxI5J_M82iY6odlXGtsZTTc8HXdVBAz6ryKsSz-P5wU6ZoKTCO5D247hagw2iNx0PZZfjdthMC8zjpWAGLJh7xg4qo3i9LZdCn7j6gGxugjmJTrMiBN0EKKxLQuSsUMZx2F7LChrzofAoNzJDssH-iE5FNMrlgSgXlD6etBto"><div class="flex flex-col"><span class="font-title-lg text-primary tracking-tight leading-none">KrishiMitra</span><span class="font-label-sm text-secondary">Agri-Advisory OS</span></div></div><nav class="flex flex-col px-3 space-y-1" data-active-classes="bg-primary-container text-on-primary-container font-title-md"><a aria-current="page" class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all bg-primary-container text-on-primary-container font-title-md" data-path="dashboard" href="#"><span class="material-symbols-outlined text-[20px]">space_dashboard</span><span class="">Dashboard</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="my-farms" href="#"><span class="material-symbols-outlined text-[20px]">agriculture</span><span class="">My Farms</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="plans" href="#"><span class="material-symbols-outlined text-[20px]">calendar_month</span><span class="">Plans</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="compare" href="#"><span class="material-symbols-outlined text-[20px]">balance</span><span class="">Compare</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="recommendations" href="#"><span class="material-symbols-outlined text-[20px]">psychology_alt</span><span class="">Recommendations</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="resource-check" href="#"><span class="material-symbols-outlined text-[20px]">water_voc</span><span class="">Resource Check</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="reports" href="#"><span class="material-symbols-outlined text-[20px]">query_stats</span><span class="">Reports</span></a></nav></div><div class="px-4"><div class="p-3 bg-surface-container rounded-xl flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div><div class="flex flex-col min-w-0 flex-1"><span class="font-label-lg text-on-surface truncate">Ramesh Deshmukh</span><span class="font-label-sm text-on-surface-variant truncate">Shivaji Nagar Farm #2</span></div><span class="material-symbols-outlined text-on-surface-variant text-[18px]">unfold_more</span></div></div></aside><div class="pl-64"><header class="fixed top-0 left-64 right-0 h-16 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-8" style="backdrop-filter: blur(20px) saturate(180%); background-color: rgba(255, 255, 255, 0.78); border-bottom: 1px solid rgba(255, 255, 255, 0.8); box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 24px -1px, rgba(255, 255, 255, 0.9) 0px 1px 1px 0px inset;"><div class="flex items-center gap-3"><img alt="Brand logo. - Primary color: #164a34
- Font: plusJakartaSans
- Mode: light
- Roundness: rounded-md
" class="h-7 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1UwvheEflVQETpVODXud1bKJQLTG3Z9V091WAQuRWb3OjkfynIYN40ImZHKnidhICqNkNrqFqpWKzSfZlgxI5J_M82iY6odlXGtsZTTc8HXdVBAz6ryKsSz-P5wU6ZoKTCO5D247hagw2iNx0PZZfjdthMC8zjpWAGLJh7xg4qo3i9LZdCn7j6gGxugjmJTrMiBN0EKKxLQuSsUMZx2F7LChrzofAoNzJDssH-iE5FNMrlgSgXlD6etBto"><span class="font-title-md text-on-surface hidden sm:inline">KrishiMitra Management</span></div><div class="flex items-center gap-4"><div class="flex items-center bg-surface-container px-2 py-1 rounded-lg"><span class="material-symbols-outlined text-[18px] text-on-surface-variant mr-1">translate</span><select class="bg-transparent font-label-md text-on-surface outline-none cursor-pointer pr-1"><option value="en">English</option><option value="hi">हिंदी</option><option value="mr">मराठी</option></select></div><button class="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-low rounded-lg font-label-md text-on-surface hover:bg-surface-container-high transition-colors"><span class="material-symbols-outlined text-[18px] text-secondary">wb_sunny</span><span class="">Nashik 28°C · Soil Wet</span></button><button class="p-2 text-on-surface-variant hover:text-on-surface transition-colors"><span class="material-symbols-outlined text-[22px]">notifications</span></button><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></header><main class="relative pt-16 w-full min-h-screen bg-transparent"><div class="flex flex-col w-full">
<!-- Panoramic Hero Section -->
<div class="relative w-full overflow-hidden bg-surface-container-low shadow-sm">
<!-- Image Backdrop using placeholder token image -->
<div class="relative h-64 sm:h-72 md:h-80 w-full overflow-hidden">
<div class="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105" style="background-image: url('https://lh3.googleusercontent.com/aida/AEtjO1XYoROS-GE82iBXYItBc3r-DRupzmzsIH3mpf51-Gx3EjtX7eW2mgPoAML_BTQxxw9yO4iFmB-I7mNBTOKKDQfoGl2Csmi3MZzVbLySLdNeNt_EEH5q0FdssaR0oJYAZBZf1IgN_pDGtKEzx8a5UTiygffX9zbOhkvN-OVxQmuXl6t3sHqq5Y8wWKEafxRwk1HMVlJNldgBGQx9lNRVzwjR0_cMXQHwnTtXkp53vcCc5U0S4PclbtZzig')"></div>
<!-- Soft ambient multi-layer gradients for text readability and warm rustic glow -->
<div class="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
<div class="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent"></div>
</div>
<!-- Content Overlaid in Panoramic Section -->
<div class="max-w-[1280px] mx-auto px-6 md:px-12 -mt-36 sm:-mt-40 relative z-10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
<div class="flex flex-col gap-2.5">
<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-sm w-fit text-primary font-label-md">
<span class="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
<span class="">Kharif Season 2025 · Soil: Black Cotton · Canal &amp; Well Water</span>
</div>
<h1 class="font-display-lg text-display-lg text-primary tracking-tight">
          Good morning, Shivaji
        </h1>
<div class="flex items-center gap-2 font-body-md text-on-surface-variant">
<span class="material-symbols-outlined text-[18px] text-secondary">pin_drop</span>
<span class="">Shivaji Patil Farm · Hingoli, Maharashtra · 8.5 acres</span>
</div>
</div>
<div class="flex items-center gap-3">
<button class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-title-md shadow-md hover:bg-primary-container hover:shadow-lg transition-all transform active:scale-95 cursor-pointer">
<span class="material-symbols-outlined text-[20px]">add</span>
<span class="">Create New Plan</span>
</button>
</div>
</div>
</div>
<!-- Main Canvas Container -->
<div class="max-w-[1280px] w-full mx-auto px-6 md:px-12 py-8 flex flex-col gap-10">
<!-- 3 High Priority Executive Metric Cards -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6"><!-- Metric 1: Profit with Mini Sparkline Trend -->
<div class="relative bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col justify-between overflow-hidden group hover:shadow-md transition-all" style="background-color: rgba(255, 255, 255, 0.88); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.9); box-shadow: rgba(22, 74, 52, 0.05) 0px 10px 30px -5px;">
  <div class="absolute top-0 left-0 w-1.5 h-full bg-secondary"></div>
  <div class="flex items-center justify-between gap-2 mb-3">
    <span class="font-label-lg text-on-surface-variant uppercase tracking-wider">Best Estimated Profit</span>
    <span class="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm font-semibold">
      Drip Wheat Plan
    </span>
  </div>
  <div class="flex items-end justify-between gap-4">
    <div>
      <div class="font-display-lg text-display-lg text-primary tracking-tight font-bold leading-none">
        ₹1,84,500
      </div>
      <div class="flex items-center gap-1.5 mt-2 font-body-sm text-secondary font-medium">
        <span class="material-symbols-outlined text-[18px]">trending_up</span>
        <span class="font-semibold">+₹38,200 (+26.1%)</span>
        <span class="text-on-surface-variant text-[12px]">vs Baseline</span>
      </div>
    </div>
    <!-- Mini SVG Sparkline for 6-Month Profit Trajectory -->
    <div class="w-24 h-12 shrink-0">
      <svg viewBox="0 0 100 45" class="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="metricSparkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#196c3e" stop-opacity="0.35"></stop>
            <stop offset="100%" stop-color="#196c3e" stop-opacity="0.0"></stop>
          </linearGradient>
        </defs>
        <path d="M 0 38 Q 20 35, 40 28 T 75 14 T 100 6 L 100 45 L 0 45 Z" fill="url(#metricSparkGrad)"></path>
        <path d="M 0 38 Q 20 35, 40 28 T 75 14 T 100 6" fill="none" stroke="#196c3e" stroke-width="2.5" stroke-linecap="round"></path>
        <circle cx="100" cy="6" r="3.5" fill="#196c3e" stroke="#ffffff" stroke-width="2"></circle>
      </svg>
    </div>
  </div>
  <div class="mt-3 pt-2.5 border-t border-surface-container flex items-center justify-between text-[11px] text-on-surface-variant">
    <span class="">Projected ROI: <strong class="text-primary font-semibold">2.42x</strong></span>
    <span class="text-secondary font-medium">89% Confidence Score</span>
  </div>
</div>

<!-- Metric 2: Water Reserve with Radial Arc Progress -->
<div class="relative bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col justify-between overflow-hidden group hover:shadow-md transition-all" style="background-color: rgba(255, 255, 255, 0.88); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.9); box-shadow: rgba(22, 74, 52, 0.05) 0px 10px 30px -5px;">
  <div class="absolute top-0 left-0 w-1.5 h-full bg-tertiary-container"></div>
  <div class="flex items-center justify-between gap-2 mb-3">
    <span class="font-label-lg text-on-surface-variant uppercase tracking-wider">Water Available</span>
    <span class="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm font-semibold">
      Canal + 2 Wells
    </span>
  </div>
  <div class="flex items-center justify-between gap-2">
    <div>
      <div class="flex items-baseline gap-1.5 leading-none">
        <span class="font-display-lg text-display-lg text-primary tracking-tight font-bold">6,200</span>
        <span class="font-title-md text-on-surface-variant">m³</span>
      </div>
      <p class="font-body-sm text-on-surface-variant mt-2">
        <strong class="text-on-surface">3,450 m³</strong> plan quota · <span class="text-secondary font-medium">2,750 m³ surplus</span>
      </p>
    </div>
    <!-- Circular SVG Progress Ring Gauge -->
    <div class="w-14 h-14 shrink-0 relative flex items-center justify-center">
      <svg class="w-full h-full transform -rotate-90" viewBox="0 0 42 42">
        <circle cx="21" cy="21" r="16" fill="none" stroke="#eae8e2" stroke-width="4"></circle>
        <circle cx="21" cy="21" r="16" fill="none" stroke="#00475a" stroke-width="4" stroke-linecap="round" stroke-dasharray="100.53" stroke-dashoffset="45.24"></circle>
      </svg>
      <span class="absolute text-[11px] font-bold text-tertiary-container">55%</span>
    </div>
  </div>
  <div class="mt-3 pt-2.5 border-t border-surface-container flex items-center justify-between text-[11px] text-on-surface-variant">
    <span class="">Daily Depletion: <strong class="text-primary font-semibold">18 m³/day</strong></span>
    <span class="text-secondary font-medium">High Buffer Safety</span>
  </div>
</div>

<!-- Metric 3: Soil Nitrogen & Resilience Gauge -->
<div class="relative bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col justify-between overflow-hidden group hover:shadow-md transition-all" style="background-color: rgba(255, 255, 255, 0.88); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.9); box-shadow: rgba(22, 74, 52, 0.05) 0px 10px 30px -5px;">
  <div class="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
  <div class="flex items-center justify-between gap-2 mb-3">
    <span class="font-label-lg text-on-surface-variant uppercase tracking-wider">Soil Health &amp; Risk</span>
    <span class="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm font-semibold flex items-center gap-1">
      <span class="material-symbols-outlined text-[14px]">verified</span>
      Score 92/100
    </span>
  </div>
  <div class="flex items-center justify-between gap-2">
    <div>
      <div class="font-headline-lg text-headline-lg text-primary font-bold">
        Optimal N-P-K
      </div>
      <div class="flex items-center gap-1.5 mt-2 font-body-sm text-on-surface-variant">
        <span class="material-symbols-outlined text-[18px] text-secondary">shield</span>
        <span class="">Low Weather &amp; Heat Risk</span>
      </div>
    </div>
    <!-- Multi-tier Bar Gauge -->
    <div class="flex flex-col gap-1.5 w-20 shrink-0">
      <div class="flex items-center justify-between text-[10px] text-on-surface-variant font-medium">
        <span class="">N-Index</span>
        <span class="text-primary font-bold">84%</span>
      </div>
      <div class="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
        <div class="h-full bg-secondary rounded-full" style="width: 84%;"></div>
      </div>
      <div class="flex items-center justify-between text-[10px] text-on-surface-variant font-medium">
        <span class="">Moisture</span>
        <span class="text-tertiary-container font-bold">72%</span>
      </div>
      <div class="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
        <div class="h-full bg-tertiary-container rounded-full" style="width: 72%;"></div>
      </div>
    </div>
  </div>
  <div class="mt-3 pt-2.5 border-t border-surface-container flex items-center justify-between text-[11px] text-on-surface-variant">
    <span class="">Organic Carbon: <strong class="text-primary font-semibold">0.78% (Good)</strong></span>
    <span class="text-secondary font-medium">Field Ready</span>
  </div>
</div></div>
<!-- Featured Next Step Advisory Insight Card -->
<div class="relative rounded-3xl bg-surface-container-low p-7 sm:p-9 shadow-sm overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6" style="background-color: rgba(255, 255, 255, 0.82); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.85); box-shadow: rgba(22, 74, 52, 0.05) 0px 10px 30px -5px, rgba(255, 255, 255, 0.95) 0px 1px 2px inset;">
<div class="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-secondary-fixed/30 filter blur-3xl pointer-events-none"></div>
<div class="flex items-start gap-4 z-10 max-w-2xl">
<div class="w-12 h-12 rounded-2xl bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-sm">
<span class="material-symbols-outlined text-[26px]">lightbulb</span>
</div>
<div class="flex flex-col gap-2">
<div class="flex items-center gap-2">
<span class="font-label-sm uppercase tracking-wider px-2 py-0.5 rounded bg-surface-container-high text-primary font-bold">
              Key Strategic Insight
            </span>
<span class="font-label-md text-on-surface-variant">Hingoli Sub-basin advisory</span>
</div>
<h2 class="font-headline-md text-headline-md text-primary">
            Drip irrigation can save ~1,200 m³ water while improving expected yield by 14%.
          </h2>
<p class="font-body-md text-on-surface-variant leading-relaxed">
            Hingoli reservoir levels indicate dry spell risk in mid-season. Adopting drip now preserves ₹26,000 in input investments and protects high-stage flowering.
          </p>
</div>
</div>
<div class="shrink-0 z-10 self-stretch sm:self-auto flex items-center">
<button class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-on-primary font-title-md shadow hover:bg-primary-container transition-all cursor-pointer">
<span class="">View Plan &amp; Apply</span>
<span class="material-symbols-outlined text-[20px]">arrow_forward</span>
</button>
</div>
</div><!-- High-Fidelity KrishiTelemetry Visual Analytics Grid -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
  <!-- Chart 1: Soil Moisture & Root-Zone Dynamics (Area SVG Chart) -->
  <div class="bg-surface-container-lowest rounded-2xl p-6 sm:p-7 shadow-sm flex flex-col justify-between transition-all hover:shadow-md" style="background-color: rgba(255, 255, 255, 0.88); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.9); box-shadow: rgba(22, 74, 52, 0.05) 0px 10px 30px -5px;">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
      <div>
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-secondary"></span>
          <h3 class="font-title-lg text-title-lg text-primary font-bold">Soil Moisture &amp; Ground Sensor Telemetry</h3>
        </div>
        <p class="font-body-sm text-on-surface-variant mt-0.5">Continuous 30-Day Root-zone VWC% at Dual Depths</p>
      </div>
      <div class="flex items-center gap-3 self-start sm:self-auto">
        <div class="flex items-center gap-1.5 text-[12px] text-on-surface-variant">
          <span class="w-3 h-1 bg-secondary rounded-full"></span>
          <span class="">20cm Surface</span>
        </div>
        <div class="flex items-center gap-1.5 text-[12px] text-on-surface-variant">
          <span class="w-3 h-1 bg-tertiary-container rounded-full"></span>
          <span class="">40cm Deep Root</span>
        </div>
      </div>
    </div>

    <!-- Telemetry SVG Area Canvas -->
    <div class="relative w-full pt-2 pb-1">
      <svg viewBox="0 0 520 220" class="w-full h-auto overflow-visible select-none">
        <defs>
          <!-- 20cm Gradient -->
          <linearGradient id="gradMoisture20" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#196c3e" stop-opacity="0.38"></stop>
            <stop offset="70%" stop-color="#196c3e" stop-opacity="0.08"></stop>
            <stop offset="100%" stop-color="#196c3e" stop-opacity="0.0"></stop>
          </linearGradient>
          <!-- 40cm Gradient -->
          <linearGradient id="gradMoisture40" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#00475a" stop-opacity="0.22"></stop>
            <stop offset="100%" stop-color="#00475a" stop-opacity="0.0"></stop>
          </linearGradient>
        </defs>

        <!-- Horizontal Axis Gridlines -->
        <line x1="40" y1="30" x2="500" y2="30" stroke="#eae8e2" stroke-dasharray="3 3" stroke-width="1"></line>
        <line x1="40" y1="75" x2="500" y2="75" stroke="#eae8e2" stroke-dasharray="3 3" stroke-width="1"></line>
        <line x1="40" y1="120" x2="500" y2="120" stroke="#eae8e2" stroke-dasharray="3 3" stroke-width="1"></line>
        <line x1="40" y1="165" x2="500" y2="165" stroke="#eae8e2" stroke-dasharray="3 3" stroke-width="1"></line>

        <!-- Safety Threshold Band (Optimal Moisture Range) -->
        <rect x="40" y="60" width="460" height="75" fill="#a1f1b7" fill-opacity="0.14" rx="4"></rect>
        <text x="495" y="72" font-size="10" text-anchor="end" fill="#196c3e" font-weight="600">Optimal Moisture Zone (32% - 48%)</text>
        <line x1="40" y1="135" x2="500" y2="135" stroke="#ba1a1a" stroke-dasharray="4 4" stroke-width="1.2" stroke-opacity="0.65"></line>
        <text x="495" y="148" font-size="9.5" text-anchor="end" fill="#ba1a1a" font-weight="500">Wilting Stress Threshold (24%)</text>

        <!-- Y-Axis Labels -->
        <text x="32" y="33" font-size="10" text-anchor="end" fill="#717973">60%</text>
        <text x="32" y="78" font-size="10" text-anchor="end" fill="#717973">45%</text>
        <text x="32" y="123" font-size="10" text-anchor="end" fill="#717973">30%</text>
        <text x="32" y="168" font-size="10" text-anchor="end" fill="#717973">15%</text>

        <!-- 40cm Deep Root Area & Line -->
        <path d="M 40 102 C 90 98, 140 106, 190 90 C 240 76, 290 85, 340 78 C 390 70, 440 74, 500 68 L 500 190 L 40 190 Z" fill="url(#gradMoisture40)"></path>
        <path d="M 40 102 C 90 98, 140 106, 190 90 C 240 76, 290 85, 340 78 C 390 70, 440 74, 500 68" fill="none" stroke="#00475a" stroke-width="2.2" stroke-dasharray="6 4"></path>

        <!-- 20cm Surface Root Area & Line -->
        <path d="M 40 130 C 75 110, 110 65, 150 72 C 190 78, 220 115, 260 92 C 300 68, 335 52, 380 62 C 425 72, 460 55, 500 48 L 500 190 L 40 190 Z" fill="url(#gradMoisture20)"></path>
        <path d="M 40 130 C 75 110, 110 65, 150 72 C 190 78, 220 115, 260 92 C 300 68, 335 52, 380 62 C 425 72, 460 55, 500 48" fill="none" stroke="#196c3e" stroke-width="2.8" stroke-linecap="round"></path>

        <!-- Active Sensor Data Point Annotation (Today) -->
        <line x1="380" y1="25" x2="380" y2="190" stroke="#164a34" stroke-width="1.2" stroke-dasharray="3 3" stroke-opacity="0.4"></line>
        <circle cx="380" cy="62" r="5" fill="#196c3e" stroke="#ffffff" stroke-width="2.5"></circle>
        <circle cx="380" cy="78" r="4" fill="#00475a" stroke="#ffffff" stroke-width="2"></circle>

        <!-- Interactive Metric Badge on Pin -->
        <g transform="translate(350, 18)">
          <rect x="0" y="0" width="62" height="22" rx="6" fill="#003320" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))"></rect>
          <text x="31" y="15" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">43.8% VWC</text>
        </g>

        <!-- X-Axis Days Labels -->
        <text x="40" y="205" font-size="10" fill="#717973" text-anchor="center">Day 1</text>
        <text x="130" y="205" font-size="10" fill="#717973" text-anchor="middle">Day 7</text>
        <text x="245" y="205" font-size="10" fill="#717973" text-anchor="middle">Day 14 (Irrig.)</text>
        <text x="380" y="205" font-size="10" fill="#164a34" font-weight="bold" text-anchor="middle">Today</text>
        <text x="495" y="205" font-size="10" fill="#717973" text-anchor="end">Day 30 (Proj.)</text>
      </svg>
    </div>

    <!-- Bottom Insight Micro-strip -->
    <div class="pt-3 mt-2 border-t border-surface-container flex flex-wrap items-center justify-between text-body-sm text-on-surface-variant gap-2">
      <div class="flex items-center gap-1.5">
        <span class="material-symbols-outlined text-[18px] text-secondary">water_drop</span>
        <span class="">Next optimal drip cycle in <strong class="text-primary font-bold">52 hours</strong> (0.8 bar pressure)</span>
      </div>
      <span class="font-label-sm font-semibold px-2 py-0.5 rounded bg-surface-container text-primary">Sensor Node SN-402 OK</span>
    </div>
  </div>

  <!-- Chart 2: Monthly Water Consumption vs Quota (Grouped Bar Chart) -->
  <div class="bg-surface-container-lowest rounded-2xl p-6 sm:p-7 shadow-sm flex flex-col justify-between transition-all hover:shadow-md" style="background-color: rgba(255, 255, 255, 0.88); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.9); box-shadow: rgba(22, 74, 52, 0.05) 0px 10px 30px -5px;">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
      <div>
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-tertiary-container"></span>
          <h3 class="font-title-lg text-title-lg text-primary font-bold">Monthly Water Consumption vs. Quota</h3>
        </div>
        <p class="font-body-sm text-on-surface-variant mt-0.5">6-Month Comparison: Drip Allocation vs Actual Inflow (m³)</p>
      </div>
      <div class="flex items-center gap-3 self-start sm:self-auto">
        <div class="flex items-center gap-1.5 text-[12px] text-on-surface-variant">
          <span class="w-3 h-3 bg-tertiary-container rounded-sm"></span>
          <span class="">Actual Usage</span>
        </div>
        <div class="flex items-center gap-1.5 text-[12px] text-on-surface-variant">
          <span class="w-3 h-3 bg-surface-container-high rounded-sm border border-outline-variant"></span>
          <span class="">Quota Cap</span>
        </div>
      </div>
    </div>

    <!-- Bar Chart SVG Canvas -->
    <div class="relative w-full pt-2 pb-1">
      <svg viewBox="0 0 520 220" class="w-full h-auto overflow-visible select-none">
        <defs>
          <linearGradient id="actualBarGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#00475a"></stop>
            <stop offset="100%" stop-color="#164a34"></stop>
          </linearGradient>
          <linearGradient id="savedBarGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#196c3e"></stop>
            <stop offset="100%" stop-color="#88d8a0"></stop>
          </linearGradient>
        </defs>

        <!-- Horizontal Guideline grids -->
        <line x1="35" y1="30" x2="505" y2="30" stroke="#eae8e2" stroke-dasharray="3 3"></line>
        <line x1="35" y1="75" x2="505" y2="75" stroke="#eae8e2" stroke-dasharray="3 3"></line>
        <line x1="35" y1="120" x2="505" y2="120" stroke="#eae8e2" stroke-dasharray="3 3"></line>
        <line x1="35" y1="165" x2="505" y2="165" stroke="#eae8e2" stroke-dasharray="3 3"></line>

        <!-- Y-Axis Labels (m³) -->
        <text x="28" y="33" font-size="10" text-anchor="end" fill="#717973">1,200</text>
        <text x="28" y="78" font-size="10" text-anchor="end" fill="#717973">900</text>
        <text x="28" y="123" font-size="10" text-anchor="end" fill="#717973">600</text>
        <text x="28" y="168" font-size="10" text-anchor="end" fill="#717973">300</text>

        <!-- Month 1: Nov -->
        <g transform="translate(50, 0)">
          <rect x="0" y="80" width="26" height="100" rx="5" fill="#eae8e2"></rect>
          <rect x="18" y="105" width="24" height="75" rx="5" fill="url(#actualBarGrad)"></rect>
          <text x="20" y="198" font-size="11" fill="#717973" text-anchor="middle">Nov</text>
          <text x="30" y="100" font-size="10" fill="#00475a" font-weight="bold" text-anchor="middle">520</text>
        </g>

        <!-- Month 2: Dec -->
        <g transform="translate(125, 0)">
          <rect x="0" y="65" width="26" height="115" rx="5" fill="#eae8e2"></rect>
          <rect x="18" y="90" width="24" height="90" rx="5" fill="url(#actualBarGrad)"></rect>
          <text x="20" y="198" font-size="11" fill="#717973" text-anchor="middle">Dec</text>
          <text x="30" y="85" font-size="10" fill="#00475a" font-weight="bold" text-anchor="middle">680</text>
        </g>

        <!-- Month 3: Jan -->
        <g transform="translate(200, 0)">
          <rect x="0" y="50" width="26" height="130" rx="5" fill="#eae8e2"></rect>
          <rect x="18" y="82" width="24" height="98" rx="5" fill="url(#actualBarGrad)"></rect>
          <text x="20" y="198" font-size="11" fill="#717973" text-anchor="middle">Jan</text>
          <text x="30" y="77" font-size="10" fill="#00475a" font-weight="bold" text-anchor="middle">740</text>
        </g>

        <!-- Month 4: Feb (Current) -->
        <g transform="translate(275, 0)">
          <rect x="0" y="42" width="26" height="138" rx="5" fill="#eae8e2"></rect>
          <rect x="18" y="95" width="24" height="85" rx="5" fill="url(#savedBarGrad)"></rect>
          <text x="20" y="198" font-size="11" fill="#164a34" font-weight="bold" text-anchor="middle">Feb</text>
          <text x="30" y="90" font-size="10" fill="#196c3e" font-weight="bold" text-anchor="middle">580</text>
          <rect x="7" y="20" width="50" height="18" rx="4" fill="#a1f1b7"></rect>
          <text x="32" y="33" font-size="9" fill="#1f7042" font-weight="bold" text-anchor="middle">-28% Drip</text>
        </g>

        <!-- Month 5: Mar (Forecast) -->
        <g transform="translate(355, 0)">
          <rect x="0" y="35" width="26" height="145" rx="5" fill="#eae8e2" stroke="#c0c9c1" stroke-dasharray="3 2"></rect>
          <rect x="18" y="110" width="24" height="70" rx="5" fill="url(#savedBarGrad)" opacity="0.85"></rect>
          <text x="20" y="198" font-size="11" fill="#717973" text-anchor="middle">Mar*</text>
          <text x="30" y="105" font-size="10" fill="#196c3e" font-weight="bold" text-anchor="middle">490</text>
        </g>

        <!-- Month 6: Apr (Harvest) -->
        <g transform="translate(435, 0)">
          <rect x="0" y="60" width="26" height="120" rx="5" fill="#eae8e2" stroke="#c0c9c1" stroke-dasharray="3 2"></rect>
          <rect x="18" y="135" width="24" height="45" rx="5" fill="url(#savedBarGrad)" opacity="0.85"></rect>
          <text x="20" y="198" font-size="11" fill="#717973" text-anchor="middle">Apr*</text>
          <text x="30" y="130" font-size="10" fill="#196c3e" font-weight="bold" text-anchor="middle">320</text>
        </g>
      </svg>
    </div>

    <!-- Bottom Conservation Badge -->
    <div class="pt-3 mt-2 border-t border-surface-container flex flex-wrap items-center justify-between text-body-sm text-on-surface-variant gap-2">
      <div class="flex items-center gap-1.5">
        <span class="material-symbols-outlined text-[18px] text-secondary">eco</span>
        <span class="">Cumulative water conserved: <strong class="text-secondary font-bold">1,230 m³</strong> (35.6% saved)</span>
      </div>
      <span class="font-label-sm text-on-surface-variant font-medium">*Projected with Drip System</span>
    </div>
  </div>
</div>

<!-- Chart 3: Season Yield Projection & Benchmark Comparison (Full-Width High Density SVG Line Chart) -->
<div class="bg-surface-container-lowest rounded-2xl p-6 sm:p-7 shadow-sm flex flex-col justify-between transition-all hover:shadow-md" style="background-color: rgba(255, 255, 255, 0.88); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.9); box-shadow: rgba(22, 74, 52, 0.05) 0px 10px 30px -5px;">
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
    <div>
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-[24px] text-primary">ssid_chart</span>
        <h3 class="font-title-lg text-title-lg text-primary font-bold">Wheat Yield Growth Curve &amp; Benchmark Projections</h3>
      </div>
      <p class="font-body-sm text-on-surface-variant mt-0.5">
        Current season growth timeline against 5-Year Farm History &amp; Hingoli District Top 10% benchmark
      </p>
    </div>
    <!-- Legend items -->
    <div class="flex flex-wrap items-center gap-4 text-[12px] font-medium">
      <div class="flex items-center gap-1.5">
        <span class="w-4 h-1 bg-primary rounded-full"></span>
        <span class="text-primary font-bold">Current Plan (Drip Fertigation)</span>
      </div>
      <div class="flex items-center gap-1.5">
        <span class="w-4 h-1 bg-secondary rounded-full"></span>
        <span class="text-secondary font-semibold">District Top 10% Benchmark</span>
      </div>
      <div class="flex items-center gap-1.5">
        <span class="w-4 h-1 bg-outline-variant rounded-full border-b border-dashed border-outline"></span>
        <span class="text-on-surface-variant">5-Yr Farm Historical Avg</span>
      </div>
    </div>
  </div>

  <!-- Full Width SVG Multi-Line Chart Canvas -->
  <div class="relative w-full pt-3 pb-2 overflow-hidden">
    <svg viewBox="0 0 1000 280" class="w-full h-auto select-none overflow-visible">
      <defs>
        <linearGradient id="projAreaGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#003320" stop-opacity="0.18"></stop>
          <stop offset="100%" stop-color="#003320" stop-opacity="0.0"></stop>
        </linearGradient>
      </defs>

      <!-- Horizontal Grids with Quintals/Acre labels -->
      <line x1="60" y1="30" x2="960" y2="30" stroke="#eae8e2" stroke-dasharray="3 3"></line>
      <text x="50" y="34" font-size="11" text-anchor="end" fill="#717973">25 Q/ac</text>

      <line x1="60" y1="85" x2="960" y2="85" stroke="#eae8e2" stroke-dasharray="3 3"></line>
      <text x="50" y="89" font-size="11" text-anchor="end" fill="#717973">20 Q/ac</text>

      <line x1="60" y1="140" x2="960" y2="140" stroke="#eae8e2" stroke-dasharray="3 3"></line>
      <text x="50" y="144" font-size="11" text-anchor="end" fill="#717973">15 Q/ac</text>

      <line x1="60" y1="195" x2="960" y2="195" stroke="#eae8e2" stroke-dasharray="3 3"></line>
      <text x="50" y="199" font-size="11" text-anchor="end" fill="#717973">10 Q/ac</text>

      <line x1="60" y1="250" x2="960" y2="250" stroke="#eae8e2"></line>
      <text x="50" y="254" font-size="11" text-anchor="end" fill="#717973">0</text>

      <!-- Phenological Stage Vertical Markers -->
      <line x1="230" y1="25" x2="230" y2="250" stroke="#f0eee8" stroke-width="1.5"></line>
      <line x1="460" y1="25" x2="460" y2="250" stroke="#f0eee8" stroke-width="1.5"></line>
      <line x1="690" y1="25" x2="690" y2="250" stroke="#f0eee8" stroke-width="1.5"></line>

      <!-- Line 3: 5-Yr Farm Historical Average (Dashed Grey Line) -->
      <path d="M 60 250 C 140 240, 230 215, 330 190 C 440 165, 550 145, 680 125 C 780 115, 870 112, 960 110" fill="none" stroke="#717973" stroke-width="2" stroke-dasharray="5 4" opacity="0.7"></path>
      <circle cx="960" cy="110" r="3.5" fill="#717973"></circle>
      <text x="960" y="98" font-size="10" fill="#717973" font-weight="500" text-anchor="end">17.2 Q (Past Avg)</text>

      <!-- Line 2: District Top 10% Benchmark (Emerald Green) -->
      <path d="M 60 250 C 140 232, 230 195, 330 160 C 440 120, 550 92, 680 72 C 780 58, 870 54, 960 52" fill="none" stroke="#196c3e" stroke-width="2.5" stroke-dasharray="6 3" opacity="0.85"></path>
      <circle cx="960" cy="52" r="4" fill="#196c3e"></circle>
      <text x="960" y="42" font-size="11" fill="#196c3e" font-weight="bold" text-anchor="end">22.8 Q (Top 10%)</text>

      <!-- Line 1: Current Season Projected (Forest Green, Shaded Area) -->
      <path d="M 60 250 C 140 235, 230 198, 330 152 C 440 112, 550 82, 680 62 C 780 50, 870 45, 960 42 L 960 250 L 60 250 Z" fill="url(#projAreaGlow)"></path>
      <path d="M 60 250 C 140 235, 230 198, 330 152 C 440 112, 550 82, 680 62 C 780 50, 870 45, 960 42" fill="none" stroke="#003320" stroke-width="3.5" stroke-linecap="round"></path>

      <!-- Current Stage Indicator (Day 42 Tillering Phase) -->
      <line x1="380" y1="25" x2="380" y2="250" stroke="#196c3e" stroke-width="1.5" stroke-dasharray="4 4"></line>
      <circle cx="380" cy="132" r="6" fill="#196c3e" stroke="#ffffff" stroke-width="3"></circle>

      <!-- Annotation Pill for Active Stage -->
      <g transform="translate(325, 75)">
        <rect x="0" y="0" width="110" height="44" rx="8" fill="#003320" filter="drop-shadow(0 3px 6px rgba(0,0,0,0.18))"></rect>
        <text x="55" y="18" fill="#a4f4ba" font-size="10" font-weight="bold" text-anchor="middle">CURRENT STAGE</text>
        <text x="55" y="33" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Tillering: +16.2%</text>
      </g>

      <!-- Peak Harvest Forecast Badge at End -->
      <circle cx="960" cy="42" r="5.5" fill="#003320" stroke="#ffffff" stroke-width="2.5"></circle>
      <g transform="translate(875, 12)">
        <rect x="0" y="0" width="85" height="24" rx="6" fill="#164a34"></rect>
        <text x="42" y="16" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">★ 23.5 Q/acre</text>
      </g>

      <!-- X-Axis Stage Labels -->
      <text x="60" y="270" font-size="11" fill="#717973" text-anchor="start">Vegetative (0-25d)</text>
      <text x="230" y="270" font-size="11" fill="#717973" text-anchor="middle">Tillering (25-45d)</text>
      <text x="460" y="270" font-size="11" fill="#717973" text-anchor="middle">Jointing &amp; Booting (45-70d)</text>
      <text x="690" y="270" font-size="11" fill="#717973" text-anchor="middle">Flowering &amp; Grain Filling (70-95d)</text>
      <text x="960" y="270" font-size="11" fill="#164a34" font-weight="bold" text-anchor="end">Maturity / Harvest (110d)</text>
    </svg>
  </div>

  <!-- Bottom Summary KPI Cards -->
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 mt-2 border-t border-surface-container">
    <div class="flex items-center gap-3 p-2 rounded-xl bg-surface-container-low">
      <div class="w-9 h-9 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
        <span class="material-symbols-outlined text-[20px]">award_star</span>
      </div>
      <div>
        <span class="text-[11px] text-on-surface-variant block uppercase font-medium">Projected Harvest</span>
        <strong class="font-title-md text-primary text-[15px]">199.7 Quintals total</strong>
      </div>
    </div>
    <div class="flex items-center gap-3 p-2 rounded-xl bg-surface-container-low">
      <div class="w-9 h-9 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center justify-center shrink-0">
        <span class="material-symbols-outlined text-[20px]">price_check</span>
      </div>
      <div>
        <span class="text-[11px] text-on-surface-variant block uppercase font-medium">Expected MSP Value</span>
        <strong class="font-title-md text-primary text-[15px]">₹2,275 / Q (Govt MSP)</strong>
      </div>
    </div>
    <div class="flex items-center gap-3 p-2 rounded-xl bg-surface-container-low">
      <div class="w-9 h-9 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
        <span class="material-symbols-outlined text-[20px]">verified</span>
      </div>
      <div>
        <span class="text-[11px] text-on-surface-variant block uppercase font-medium">Risk Mitigation Status</span>
        <strong class="font-title-md text-secondary text-[15px]">Insured under PMFBY</strong>
      </div>
    </div>
  </div>
</div>
<!-- Latest Crop Plans Comparison & Details -->
<div class="flex flex-col gap-5">
<div class="flex items-center justify-between">
<div>
<h2 class="font-headline-sm text-headline-sm text-primary">Available Crop Plans</h2>
<p class="font-body-sm text-on-surface-variant">Comparative model based on 8.5 acres black soil characteristics</p>
</div>
<button class="font-label-lg text-secondary hover:text-primary transition-colors flex items-center gap-1">
<span class="">Compare Side-by-Side</span>
<span class="material-symbols-outlined text-[18px]">compare_arrows</span>
</button>
</div>
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
<!-- Card A: Baseline Wheat Plan -->
<div class="bg-surface-container-lowest rounded-2xl p-7 shadow-sm flex flex-col justify-between gap-6 hover:shadow-md transition-all" style="background-color: rgba(255, 255, 255, 0.82); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.85); box-shadow: rgba(22, 74, 52, 0.05) 0px 10px 30px -5px, rgba(255, 255, 255, 0.95) 0px 1px 2px inset;">
<div class="flex items-start justify-between gap-4">
<div class="flex items-center gap-4">
<div class="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center text-outline">
<span class="material-symbols-outlined text-[32px]">grass</span>
</div>
<div>
<h3 class="font-title-lg text-title-lg text-on-surface">Baseline Wheat Plan</h3>
<p class="font-body-sm text-on-surface-variant">Flood Irrigation · Traditional Furrow</p>
</div>
</div>
<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container text-outline font-label-md">
<span class="w-2 h-2 rounded-full bg-outline"></span>
              Moderate Risk
            </span>
</div>
<div class="grid grid-cols-3 gap-4 py-4 bg-surface-container-low rounded-xl px-4">
<div>
<span class="font-label-sm text-on-surface-variant block">Est. Profit</span>
<span class="font-headline-sm text-headline-sm text-primary mt-0.5 block">₹1,46,300</span>
</div>
<div>
<span class="font-label-sm text-on-surface-variant block">Expected Yield</span>
<span class="font-title-md text-title-md text-on-surface mt-0.5 block">18.5 – 20.0 Q</span>
</div>
<div>
<span class="font-label-sm text-on-surface-variant block">Water Needed</span>
<span class="font-title-md text-title-md text-on-surface mt-0.5 block">4,650 m³</span>
</div>
</div>
<div class="flex items-center justify-between pt-2">
<span class="font-body-sm text-on-surface-variant flex items-center gap-1.5">
<span class="material-symbols-outlined text-[18px] text-outline">info</span>
              Higher evaporation loss during March
            </span>
<button class="px-5 py-2.5 rounded-xl bg-surface-container text-on-surface font-title-md hover:bg-surface-container-high transition-colors cursor-pointer">
              Open Plan
            </button>
</div>
</div>
<!-- Card B: Drip Irrigation Plan (Recommended) -->
<div class="bg-surface-container-lowest rounded-2xl p-7 shadow-md flex flex-col justify-between gap-6 relative overflow-hidden group hover:shadow-lg transition-all" style="background-color: rgba(255, 255, 255, 0.82); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.85); box-shadow: rgba(22, 74, 52, 0.05) 0px 10px 30px -5px, rgba(255, 255, 255, 0.95) 0px 1px 2px inset;">
<div class="absolute top-0 right-0 w-28 h-28 bg-secondary-container/20 rounded-bl-full pointer-events-none"></div>
<div class="flex items-start justify-between gap-4 z-10">
<div class="flex items-center gap-4">
<div class="w-14 h-14 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-sm">
<span class="material-symbols-outlined text-[32px]">water_voc</span>
</div>
<div>
<div class="flex items-center gap-2">
<h3 class="font-title-lg text-title-lg text-primary">Drip Irrigation Plan</h3>
<span class="px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-label-sm">Recommended</span>
</div>
<p class="font-body-sm text-on-surface-variant">Micro-sprinklers + Inline Fertigation</p>
</div>
</div>
<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
              Low Risk
            </span>
</div>
<div class="grid grid-cols-3 gap-4 py-4 bg-primary-fixed/25 rounded-xl px-4 z-10">
<div>
<span class="font-label-sm text-on-surface-variant block">Est. Profit</span>
<span class="font-headline-sm text-headline-sm text-primary mt-0.5 block font-bold">₹1,84,500</span>
</div>
<div>
<span class="font-label-sm text-on-surface-variant block">Expected Yield</span>
<span class="font-title-md text-title-md text-primary mt-0.5 block font-bold">21.0 – 23.5 Q</span>
</div>
<div>
<span class="font-label-sm text-on-surface-variant block">Water Needed</span>
<span class="font-title-md text-title-md text-primary mt-0.5 block font-bold">3,450 m³</span>
</div>
</div>
<div class="flex items-center justify-between pt-2 z-10">
<span class="font-body-sm text-secondary flex items-center gap-1.5 font-medium">
<span class="material-symbols-outlined text-[18px]">check_circle</span>
              Saves 1,200 m³ water + 14% yield
            </span>
<button class="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-title-md shadow-sm hover:bg-primary-container transition-all cursor-pointer">
              Open Plan
            </button>
</div>
</div>
</div>
</div>
<!-- Quick Farm Resources & Readiness Glance Bar -->
<div class="bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col gap-4" style="background-color: rgba(255, 255, 255, 0.82); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.85); box-shadow: rgba(22, 74, 52, 0.05) 0px 10px 30px -5px, rgba(255, 255, 255, 0.95) 0px 1px 2px inset;">
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary text-[22px]">inventory_2</span>
<h2 class="font-title-lg text-title-lg text-primary">Farm Resources &amp; Readiness</h2>
</div>
<a class="font-label-lg text-secondary hover:underline flex items-center gap-1" href="#">
<span class="">Run Comprehensive Resource Check</span>
<span class="material-symbols-outlined text-[18px]">chevron_right</span>
</a>
</div>
<div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
<!-- Resource 1: Budget -->
<div class="p-4 rounded-xl bg-surface-container-low flex flex-col gap-1">
<div class="flex items-center justify-between">
<span class="font-label-sm text-on-surface-variant uppercase">Capital &amp; Budget</span>
<span class="material-symbols-outlined text-secondary text-[16px]">check_circle</span>
</div>
<span class="font-title-md text-title-md text-on-surface mt-1">₹85,000</span>
<span class="font-body-sm text-secondary">₹80,000 req. · Sufficient</span>
</div>
<!-- Resource 2: Water -->
<div class="p-4 rounded-xl bg-surface-container-low flex flex-col gap-1">
<div class="flex items-center justify-between">
<span class="font-label-sm text-on-surface-variant uppercase">Stored Water</span>
<span class="material-symbols-outlined text-secondary text-[16px]">check_circle</span>
</div>
<span class="font-title-md text-title-md text-on-surface mt-1">6,200 m³</span>
<span class="font-body-sm text-secondary">Surplus +2,750 m³</span>
</div>
<!-- Resource 3: Seeds -->
<div class="p-4 rounded-xl bg-surface-container-low flex flex-col gap-1">
<div class="flex items-center justify-between">
<span class="font-label-sm text-on-surface-variant uppercase">Certified Seed</span>
<span class="material-symbols-outlined text-secondary text-[16px]">check_circle</span>
</div>
<span class="font-title-md text-title-md text-on-surface mt-1 truncate">Sonalika HD-2967</span>
<span class="font-body-sm text-on-surface-variant">In Stock · 180 kg</span>
</div>
<!-- Resource 4: Fertilizer -->
<div class="p-4 rounded-xl bg-surface-container-low flex flex-col gap-1">
<div class="flex items-center justify-between">
<span class="font-label-sm text-on-surface-variant uppercase">Nutrients</span>
<span class="material-symbols-outlined text-on-surface-variant text-[16px]">pending</span>
</div>
<span class="font-title-md text-title-md text-on-surface mt-1">DAP &amp; Urea</span>
<span class="font-body-sm text-on-surface-variant">Arranging 2 bags DAP</span>
</div>
</div>
</div>
<!-- Active Seasonal Field Timeline Bar -->
<div class="bg-surface-container-low rounded-2xl p-6 flex flex-col gap-4 mb-8" style="background-color: rgba(255, 255, 255, 0.82); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.85); box-shadow: rgba(22, 74, 52, 0.05) 0px 10px 30px -5px, rgba(255, 255, 255, 0.95) 0px 1px 2px inset;">
<div class="flex items-center justify-between">
<span class="font-title-md text-primary">Kharif Schedule Status</span>
<span class="font-label-md text-on-surface-variant">Stage 2 of 5: Pre-Sowing Moisture Priming</span>
</div>
<div class="relative w-full flex items-center justify-between pt-2">
<div class="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-surface-variant"></div>
<div class="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-secondary w-1/3"></div>
<!-- Stage 1 -->
<div class="relative z-10 flex flex-col items-center gap-1.5 bg-surface-container-low px-2">
<div class="w-7 h-7 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow">
<span class="material-symbols-outlined text-[16px]">check</span>
</div>
<span class="font-label-sm text-on-surface font-semibold">Tillage</span>
</div>
<!-- Stage 2 -->
<div class="relative z-10 flex flex-col items-center gap-1.5 bg-surface-container-low px-2">
<div class="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center shadow ring-4 ring-secondary-container">
<span class="material-symbols-outlined text-[16px]">water_drop</span>
</div>
<span class="font-label-sm text-primary font-bold">Soil Prep</span>
</div>
<!-- Stage 3 -->
<div class="relative z-10 flex flex-col items-center gap-1.5 bg-surface-container-low px-2">
<div class="w-7 h-7 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center">
<span class="material-symbols-outlined text-[16px]">potted_plant</span>
</div>
<span class="font-label-sm text-on-surface-variant">Sowing</span>
</div>
<!-- Stage 4 -->
<div class="relative z-10 flex flex-col items-center gap-1.5 bg-surface-container-low px-2">
<div class="w-7 h-7 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center">
<span class="material-symbols-outlined text-[16px]">science</span>
</div>
<span class="font-label-sm text-on-surface-variant">Fertigation</span>
</div>
<!-- Stage 5 -->
<div class="relative z-10 flex flex-col items-center gap-1.5 bg-surface-container-low px-2">
<div class="w-7 h-7 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center">
<span class="material-symbols-outlined text-[16px]">agriculture</span>
</div>
<span class="font-label-sm text-on-surface-variant">Harvest</span>
</div>
</div>
</div>
</div>
</div></main></div>

</body></html>
```

---

## `krishimitra_plan_results/code.html`

```html
<!DOCTYPE html><html lang="en" style=""><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"><meta content="web_dashboard" name="shell-type"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"><link href="https://fonts.googleapis.com" rel="preconnect"><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "secondary-fixed-dim": "#88d8a0", "on-tertiary-fixed": "#001f29", "tertiary-fixed-dim": "#84d1f0", "on-tertiary-fixed-variant": "#004d62", "on-secondary-fixed": "#00210e", "on-primary": "#ffffff", "on-surface-variant": "#404943", "tertiary-fixed": "#baeaff", "surface-container-low": "#f5f3ed", "error-container": "#ffdad6", "primary-fixed-dim": "#9dd2b5", "inverse-surface": "#30312d", "inverse-on-surface": "#f3f1eb", "tertiary-container": "#00475a", "on-error": "#ffffff", "secondary-fixed": "#a4f4ba", "primary-fixed": "#b9efd0", "primary-container": "#164a34", "on-primary-fixed": "#002113", "outline": "#717973", "background": "#fbf9f3", "on-surface": "#1b1c18", "surface": "#fbf9f3", "on-tertiary-container": "#6ab7d5", "tertiary": "#002f3d", "surface-container-lowest": "#ffffff", "surface-variant": "#e4e2dd", "secondary-container": "#a1f1b7", "on-secondary-container": "#1f7042", "error": "#ba1a1a", "outline-variant": "#c0c9c1", "surface-tint": "#366850", "on-error-container": "#93000a", "on-secondary-fixed-variant": "#00522b", "primary": "#003320", "on-background": "#1b1c18", "on-primary-fixed-variant": "#1d5039", "surface-dim": "#dcdad4", "surface-container": "#f0eee8", "on-primary-container": "#85b99c", "secondary": "#196c3e", "surface-bright": "#fbf9f3", "inverse-primary": "#9dd2b5", "surface-container-highest": "#e4e2dd", "surface-container-high": "#eae8e2", "on-secondary": "#ffffff", "on-tertiary": "#ffffff" }, "borderRadius": { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" }, "spacing": { "space-xl": "2.5rem", "space-md": "1rem", "gutter-mobile": "1rem", "gutter": "1.5rem", "margin-mobile": "1rem", "margin": "3rem", "space-sm": "0.5rem", "space-xs": "0.25rem", "space-lg": "1.5rem" }, "fontFamily": { "title-md": ["Plus Jakarta Sans"], "body-md": ["Plus Jakarta Sans"], "headline-md": ["Plus Jakarta Sans"], "headline-sm": ["Plus Jakarta Sans"], "title-lg": ["Plus Jakarta Sans"], "headline-lg": ["Plus Jakarta Sans"], "body-lg": ["Plus Jakarta Sans"], "label-md": ["Plus Jakarta Sans"], "body-sm": ["Plus Jakarta Sans"], "display-lg-mobile": ["Plus Jakarta Sans"], "label-sm": ["Plus Jakarta Sans"], "label-lg": ["Plus Jakarta Sans"], "headline-lg-mobile": ["Plus Jakarta Sans"], "display-lg": ["Plus Jakarta Sans"] }, "fontSize": { "title-md": ["16px", { "lineHeight": "24px", "fontWeight": "600" }], "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }], "headline-md": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600" }], "headline-sm": ["20px", { "lineHeight": "28px", "fontWeight": "600" }], "title-lg": ["18px", { "lineHeight": "26px", "fontWeight": "600" }], "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700" }], "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }], "label-md": ["12px", { "lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "600" }], "body-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }], "display-lg-mobile": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700" }], "label-sm": ["11px", { "lineHeight": "14px", "letterSpacing": "0.02em", "fontWeight": "500" }], "label-lg": ["14px", { "lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "600" }], "headline-lg-mobile": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600" }], "display-lg": ["44px", { "lineHeight": "52px", "letterSpacing": "-0.02em", "fontWeight": "700" }] } } } };</script></head><body class="bg-background font-body-md text-on-surface antialiased" style="background: radial-gradient(at 0% 0%, rgba(34, 197, 94, 0.15) 0px, transparent 50%) fixed, radial-gradient(at 100% 0%, rgba(16, 185, 129, 0.18) 0px, transparent 50%), radial-gradient(rgba(132, 204, 22, 0.08) 0px, transparent 50%), radial-gradient(at 80% 100%, rgba(16, 185, 129, 0.12) 0px, transparent 50%), rgb(244, 247, 244);"><aside class="fixed left-0 top-0 h-full w-64 bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between pt-5 pb-6" style="backdrop-filter: blur(20px) saturate(180%); background-color: rgba(255, 255, 255, 0.78); border-right: 1px solid rgba(255, 255, 255, 0.8); box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 24px -1px, rgba(255, 255, 255, 0.9) 0px 1px 1px 0px inset;"><div class="flex flex-col gap-6"><div class="px-6 flex items-center gap-3"><img alt="Brand logo. - Primary color: #164a34
- Font: plusJakartaSans
- Mode: light
- Roundness: rounded-md
" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1UwvheEflVQETpVODXud1bKJQLTG3Z9V091WAQuRWb3OjkfynIYN40ImZHKnidhICqNkNrqFqpWKzSfZlgxI5J_M82iY6odlXGtsZTTc8HXdVBAz6ryKsSz-P5wU6ZoKTCO5D247hagw2iNx0PZZfjdthMC8zjpWAGLJh7xg4qo3i9LZdCn7j6gGxugjmJTrMiBN0EKKxLQuSsUMZx2F7LChrzofAoNzJDssH-iE5FNMrlgSgXlD6etBto"><div class="flex flex-col"><span class="font-title-lg text-primary tracking-tight leading-none">KrishiMitra</span><span class="font-label-sm text-secondary">Agri-Advisory OS</span></div></div><nav class="flex flex-col px-3 space-y-1" data-active-classes="bg-primary-container text-on-primary-container font-title-md"><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="dashboard" href="#"><span class="material-symbols-outlined text-[20px]">space_dashboard</span><span class="">Dashboard</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="my-farms" href="#"><span class="material-symbols-outlined text-[20px]">agriculture</span><span class="">My Farms</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="plans" href="#"><span class="material-symbols-outlined text-[20px]">calendar_month</span><span class="">Plans</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="compare" href="#"><span class="material-symbols-outlined text-[20px]">balance</span><span class="">Compare</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="recommendations" href="#"><span class="material-symbols-outlined text-[20px]">psychology_alt</span><span class="">Recommendations</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="resource-check" href="#"><span class="material-symbols-outlined text-[20px]">water_voc</span><span class="">Resource Check</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="reports" href="#"><span class="material-symbols-outlined text-[20px]">query_stats</span><span class="">Reports</span></a></nav></div><div class="px-4"><div class="p-3 bg-surface-container rounded-xl flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div><div class="flex flex-col min-w-0 flex-1"><span class="font-label-lg text-on-surface truncate">Ramesh Deshmukh</span><span class="font-label-sm text-on-surface-variant truncate">Shivaji Nagar Farm #2</span></div><span class="material-symbols-outlined text-on-surface-variant text-[18px]">unfold_more</span></div></div></aside><div class="pl-64"><header class="fixed top-0 left-64 right-0 h-16 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-8" style="backdrop-filter: blur(20px) saturate(180%); background-color: rgba(255, 255, 255, 0.78); border-bottom: 1px solid rgba(255, 255, 255, 0.8); box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 24px -1px, rgba(255, 255, 255, 0.9) 0px 1px 1px 0px inset;"><div class="flex items-center gap-3"><img alt="Brand logo. - Primary color: #164a34
- Font: plusJakartaSans
- Mode: light
- Roundness: rounded-md
" class="h-7 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1UwvheEflVQETpVODXud1bKJQLTG3Z9V091WAQuRWb3OjkfynIYN40ImZHKnidhICqNkNrqFqpWKzSfZlgxI5J_M82iY6odlXGtsZTTc8HXdVBAz6ryKsSz-P5wU6ZoKTCO5D247hagw2iNx0PZZfjdthMC8zjpWAGLJh7xg4qo3i9LZdCn7j6gGxugjmJTrMiBN0EKKxLQuSsUMZx2F7LChrzofAoNzJDssH-iE5FNMrlgSgXlD6etBto"><span class="font-title-md text-on-surface hidden sm:inline">KrishiMitra Management</span></div><div class="flex items-center gap-4"><div class="flex items-center bg-surface-container px-2 py-1 rounded-lg"><span class="material-symbols-outlined text-[18px] text-on-surface-variant mr-1">translate</span><select class="bg-transparent font-label-md text-on-surface outline-none cursor-pointer pr-1"><option value="en">English</option><option value="hi">हिंदी</option><option value="mr">मराठी</option></select></div><button class="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-low rounded-lg font-label-md text-on-surface hover:bg-surface-container-high transition-colors"><span class="material-symbols-outlined text-[18px] text-secondary">wb_sunny</span><span class="">Nashik 28°C · Soil Wet</span></button><button class="p-2 text-on-surface-variant hover:text-on-surface transition-colors"><span class="material-symbols-outlined text-[22px]">notifications</span></button><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></header><main class="relative pt-16 w-full min-h-screen"><div class="flex flex-col w-full">
<!-- Top Visual Result Header / Agricultural Landscape Banner -->
<div class="relative w-full overflow-hidden bg-surface-container-high rounded-3xl p-6 md:p-10 text-on-surface shadow-sm mb-8" style="background-color: rgba(255, 255, 255, 0.78); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.85); box-shadow: rgba(22, 74, 52, 0.05) 0px 10px 30px -5px, rgba(255, 255, 255, 0.95) 0px 1px 2px inset;">
<!-- Background Image Scrim & Aerial Farm Texture -->
<div class="absolute inset-0 w-full h-full bg-cover bg-center opacity-30 mix-blend-multiply pointer-events-none scale-105 transition-transform duration-1000" data-alt="Stunning cinematic aerial panorama of lush green terraced farmlands in Hingoli Maharashtra at golden dawn, with winding irrigation canals, organic black soil fields, sugarcane and wheat patches under soft atmospheric morning light, high detail agricultural editorial photography." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAvFZIizt6PJ7wAcX8ezma4aKHYYjdEhtd6JFmbnFmMpTko5tCj7hZcybxj6pHYkUP9SN_myJ5SM7T62fffy3UaW2AtOrEDOAKMNCMOrEqf49X1UmAFILSRqgGetDMu0Dw2A_LJ4DeJJY_1BNBslNSZmXsCd97MDF9YXdbvLFqrTZo5n3ObQLPMl71_nr4HTKnBSEFm2vMB-x2kNwScj-6xeXYoCCKCwjpv1sOhXK6usUdLBTWRdim0pA')">
</div>
<div class="absolute inset-0 bg-gradient-to-r from-surface-container-low/95 via-surface-container-low/85 to-transparent"></div>
<div class="relative z-10 max-w-5xl flex flex-col gap-5">
<!-- Breadcrumb & Status Chips -->
<div class="flex flex-wrap items-center gap-2.5">
<div class="flex items-center gap-1.5 font-label-md text-on-surface-variant bg-surface-container-lowest/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">
<span class="">Plans</span>
<span class="material-symbols-outlined text-[14px]">chevron_right</span>
<span class="">Shivaji Patil Farm</span>
<span class="material-symbols-outlined text-[14px]">chevron_right</span>
<span class="text-primary font-semibold">Kharif-Rabi 2025 · Drip Wheat (Optimized)</span>
</div>
<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full font-label-sm bg-secondary-container text-on-secondary-container font-semibold tracking-wide uppercase">
<span class="material-symbols-outlined text-[14px]">verified</span>
          Optimal Viability · Low Risk
        </span>
<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm bg-tertiary-fixed text-on-tertiary-fixed font-medium">
<span class="material-symbols-outlined text-[14px]">water_drop</span>
          Drip Precision Active
        </span>
</div>
<!-- Main Headline & Narrative -->
<div class="space-y-2">
<h1 class="font-headline-lg text-primary tracking-tight text-balance">
          This plan looks highly promising.
        </h1>
<p class="font-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
          Based on <strong class="text-on-surface font-semibold">8.5 acres</strong> deep black cotton soil in Hingoli, Maharashtra with reliable canal allocation and <span class="text-primary font-medium">2 open recharge wells</span>. Optimized for micro-sprinkler and drip line efficiency.
        </p>
</div>
<!-- Quick Action Toolbar / Top Bar Links -->
<div class="flex flex-wrap items-center gap-3 pt-2">
<button class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary font-label-lg shadow-sm hover:bg-primary-container transition-all" onclick="document.getElementById('reportsModal').classList.toggle('hidden')">
<span class="material-symbols-outlined text-[18px]">download</span>
          Download Printable Plan
        </button>
<button class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-lowest text-on-surface font-label-lg shadow-sm hover:bg-surface-container transition-colors">
<span class="material-symbols-outlined text-[18px] text-secondary">balance</span>
          Compare Plans
        </button>
<button class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-lowest text-on-surface font-label-lg shadow-sm hover:bg-surface-container transition-colors">
<span class="material-symbols-outlined text-[18px] text-primary">psychology_alt</span>
          Recommendations <span class="w-5 h-5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold flex items-center justify-center">3</span>
</button>
<button class="inline-flex items-center gap-1.5 px-3 py-2 text-on-surface-variant hover:text-primary font-label-md transition-colors">
<span class="material-symbols-outlined text-[18px]">info</span>
          Why did it change?
        </button>
</div>
</div>
</div>
<!-- 3 Primary Hero Metric Cards -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
<!-- Metric 1: Profit -->
<div class="relative bg-surface-container-lowest rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden group" style="background-color: rgba(255, 255, 255, 0.78); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.85); box-shadow: rgba(22, 74, 52, 0.05) 0px 10px 30px -5px, rgba(255, 255, 255, 0.95) 0px 1px 2px inset;">
<div class="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-secondary-container/30 blur-2xl group-hover:bg-secondary-container/50 transition-all pointer-events-none"></div>
<div>
<div class="flex items-center justify-between mb-3">
<span class="font-label-md uppercase tracking-wider text-on-surface-variant font-semibold">Estimated Profit</span>
<span class="p-2 rounded-xl bg-surface-container text-secondary flex items-center justify-center">
<span class="material-symbols-outlined text-[20px]">payments</span>
</span>
</div>
<div class="flex items-baseline gap-2 mb-2">
<span class="font-display-lg text-primary font-bold tracking-tight">₹1,84,500</span>
</div>
<div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-secondary-container text-on-secondary-container font-label-sm font-semibold mb-3">
<span class="material-symbols-outlined text-[15px]">trending_up</span>
          +₹38,200 vs baseline (+26%)
        </div>
</div>
<div class="pt-3 flex items-center justify-between font-label-sm text-on-surface-variant bg-surface-container-low px-3 py-2 rounded-xl">
<span class="">Net after input &amp; drip amort.</span>
<span class="text-secondary font-semibold">₹21,705 / acre</span>
</div>
</div>
<!-- Metric 2: Yield -->
<div class="relative bg-surface-container-lowest rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden group" style="background-color: rgba(255, 255, 255, 0.78); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.85); box-shadow: rgba(22, 74, 52, 0.05) 0px 10px 30px -5px, rgba(255, 255, 255, 0.95) 0px 1px 2px inset;">
<div class="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-primary-fixed/20 blur-2xl group-hover:bg-primary-fixed/40 transition-all pointer-events-none"></div>
<div>
<div class="flex items-center justify-between mb-3">
<span class="font-label-md uppercase tracking-wider text-on-surface-variant font-semibold">Estimated Yield</span>
<span class="p-2 rounded-xl bg-surface-container text-primary flex items-center justify-center">
<span class="material-symbols-outlined text-[20px]">grain</span>
</span>
</div>
<div class="flex items-baseline gap-2 mb-2">
<span class="font-display-lg text-on-surface font-bold tracking-tight">21.2</span>
<span class="font-title-lg text-on-surface-variant">Quintals / ac</span>
</div>
<div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary-fixed text-on-primary-fixed font-label-sm font-semibold mb-3">
<span class="material-symbols-outlined text-[15px]">check_circle</span>
          Above regional avg (18.2 Q)
        </div>
</div>
<div class="pt-3 flex items-center justify-between font-label-sm text-on-surface-variant bg-surface-container-low px-3 py-2 rounded-xl">
<span class="">Confidence Range</span>
<span class="font-semibold text-on-surface">20.5 – 22.0 Quintals</span>
</div>
</div>
<!-- Metric 3: Water Needed -->
<div class="relative bg-surface-container-lowest rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden group" style="background-color: rgba(255, 255, 255, 0.78); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.85); box-shadow: rgba(22, 74, 52, 0.05) 0px 10px 30px -5px, rgba(255, 255, 255, 0.95) 0px 1px 2px inset;">
<div class="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-tertiary-fixed-dim/20 blur-2xl group-hover:bg-tertiary-fixed-dim/40 transition-all pointer-events-none"></div>
<div>
<div class="flex items-center justify-between mb-3">
<span class="font-label-md uppercase tracking-wider text-on-surface-variant font-semibold">Water Needed</span>
<span class="p-2 rounded-xl bg-surface-container text-tertiary flex items-center justify-center">
<span class="material-symbols-outlined text-[20px]">water_voc</span>
</span>
</div>
<div class="flex items-baseline gap-2 mb-2">
<span class="font-display-lg text-on-surface font-bold tracking-tight">3,450</span>
<span class="font-title-lg text-on-surface-variant">m³ total</span>
</div>
<div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed font-label-sm font-semibold mb-3">
<span class="material-symbols-outlined text-[15px]">shield</span>
          2,750 m³ surplus buffer
        </div>
</div>
<div class="pt-3 flex items-center justify-between font-label-sm text-on-surface-variant bg-surface-container-low px-3 py-2 rounded-xl">
<span class="">Efficiency vs Flood</span>
<span class="text-tertiary font-semibold">44% Water Saved</span>
</div>
</div>
</div>
<!-- Decision Score & Confidence Meter Section -->
<div class="bg-surface-container-lowest rounded-3xl p-7 md:p-8 shadow-sm mb-8" style="background-color: rgba(255, 255, 255, 0.78); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.85); box-shadow: rgba(22, 74, 52, 0.05) 0px 10px 30px -5px, rgba(255, 255, 255, 0.95) 0px 1px 2px inset;">
<div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
<div class="flex items-start md:items-center gap-4">
<div class="w-14 h-14 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center font-headline-md font-bold shrink-0">
          89
        </div>
<div>
<div class="flex items-center gap-2">
<h2 class="font-headline-sm text-primary tracking-tight">Decision Score: 89 / 100</h2>
<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm font-semibold">
              Optimal
            </span>
</div>
<p class="font-body-sm text-on-surface-variant">Agronomist Validated · Calculated using satellite soil moisture, local weather anomalies, and cost buffers.</p>
</div>
</div>
<div class="text-left md:text-right shrink-0">
<span class="font-label-sm text-on-surface-variant block uppercase tracking-wider">Viability Rating</span>
<span class="font-title-md text-secondary font-semibold flex items-center md:justify-end gap-1">
<span class="material-symbols-outlined text-[18px]">workspace_premium</span>
          Grade A1 Investment
        </span>
</div>
</div>
<!-- Segmented Horizontal Scale Visualizer -->
<div class="w-full mb-3">
<div class="grid grid-cols-4 gap-1.5 w-full h-3 rounded-full overflow-hidden bg-surface-container">
<!-- Risky 0-40 -->
<div class="h-full bg-error-container/70 relative">
<span class="sr-only">0-40 Risky</span>
</div>
<!-- Moderate 40-70 -->
<div class="h-full bg-surface-variant relative">
<span class="sr-only">40-70 Moderate</span>
</div>
<!-- Favorable 70-85 -->
<div class="h-full bg-primary-fixed relative">
<span class="sr-only">70-85 Favorable</span>
</div>
<!-- Optimal 85-100 -->
<div class="h-full bg-secondary relative">
<span class="sr-only">85-100 Optimal</span>
</div>
</div>
<!-- Pointer bar indicator positioned at 89% -->
<div class="relative w-full h-6">
<div class="absolute -top-1 transform -translate-x-1/2 flex flex-col items-center" style="left: 89%;">
<div class="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-primary"></div>
<span class="font-label-sm text-primary font-bold whitespace-nowrap pt-0.5">89 Current Plan</span>
</div>
</div>
<!-- Labels Below Scale -->
<div class="grid grid-cols-4 text-center font-label-xs text-on-surface-variant mt-1">
<span class="text-left font-label-sm">0 – 40 Risky</span>
<span class="font-label-sm">40 – 70 Moderate</span>
<span class="font-label-sm">70 – 85 Favorable</span>
<span class="text-right font-label-sm font-semibold text-secondary">85 – 100 Optimal</span>
</div>
</div>
<!-- Explanation Banner -->
<div class="mt-6 pt-6 border-t-0 bg-surface-container-low/60 rounded-2xl p-5"><div class="flex flex-col md:flex-row items-center justify-between gap-6"><div class="flex flex-col gap-1 max-w-sm"><div class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-[20px]">radar</span><h3 class="font-title-md text-primary font-bold">5-Axis Agronomic Performance Index</h3></div><p class="font-body-sm text-on-surface-variant">Holistic multidimensional comparison evaluating this drip-optimized plan against the Marathwada regional average.</p><div class="flex items-center gap-4 mt-3 text-[12px] font-label-md"><span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-secondary"></span><strong class="text-primary">KrishiMitra Plan (89 Avg)</strong></span><span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-outline-variant"></span><span class="text-on-surface-variant">Regional Baseline (61 Avg)</span></span></div></div><div class="relative flex items-center justify-center"><svg class="w-64 h-64 overflow-visible" viewBox="-150 -150 300 300"><polygon points="0,-110 104,-34 64,89 -64,89 -104,-34" fill="none" stroke="#c0c9c1" stroke-dasharray="3 3" stroke-width="1"></polygon><polygon points="0,-82 78,-25 48,66 -48,66 -78,-25" fill="none" stroke="#c0c9c1" stroke-dasharray="3 3" stroke-width="1"></polygon><polygon points="0,-55 52,-17 32,44 -32,44 -52,-17" fill="none" stroke="#c0c9c1" stroke-dasharray="3 3" stroke-width="1"></polygon><polygon points="0,-27 26,-8 16,22 -16,22 -26,-8" fill="none" stroke="#c0c9c1" stroke-dasharray="3 3" stroke-width="1"></polygon><line x1="0" y1="0" x2="0" y2="-110" stroke="#c0c9c1" stroke-width="1"></line><line x1="0" y1="0" x2="104" y2="-34" stroke="#c0c9c1" stroke-width="1"></line><line x1="0" y1="0" x2="64" y2="89" stroke="#c0c9c1" stroke-width="1"></line><line x1="0" y1="0" x2="-64" y2="89" stroke="#c0c9c1" stroke-width="1"></line><line x1="0" y1="0" x2="-104" y2="-34" stroke="#c0c9c1" stroke-width="1"></line><polygon points="0,-66 65,-21 40,55 -38,53 -62,-20" fill="#c0c9c1" fill-opacity="0.3" stroke="#717973" stroke-width="1.5"></polygon><polygon points="0,-101 96,-31 59,82 -60,83 -94,-31" fill="#196c3e" fill-opacity="0.35" stroke="#196c3e" stroke-width="2.5"></polygon><circle cx="0" cy="-101" r="4" fill="#003320"></circle><circle cx="96" cy="-31" r="4" fill="#003320"></circle><circle cx="59" cy="82" r="4" fill="#003320"></circle><circle cx="-60" cy="83" r="4" fill="#003320"></circle><circle cx="-94" cy="-31" r="4" fill="#003320"></circle><text x="0" y="-120" text-anchor="middle" class="font-label-sm font-semibold" fill="#1b1c18" font-size="11">Water Efficiency (92%)</text><text x="116" y="-32" text-anchor="start" class="font-label-sm font-semibold" fill="#1b1c18" font-size="11">Net Margin (93%)</text><text x="75" y="108" text-anchor="start" class="font-label-sm font-semibold" fill="#1b1c18" font-size="11">Soil Conservation (90%)</text><text x="-75" y="108" text-anchor="end" class="font-label-sm font-semibold" fill="#1b1c18" font-size="11">Resilience (91%)</text><text x="-116" y="-32" text-anchor="end" class="font-label-sm font-semibold" fill="#1b1c18" font-size="11">Market Timing (88%)</text></svg></div></div></div><div class="mt-4 p-4 rounded-2xl bg-surface-container-low flex items-start gap-3 text-on-surface">
<span class="material-symbols-outlined text-secondary text-[22px] shrink-0 mt-0.5">verified_user</span>
<p class="font-body-sm leading-relaxed">
<strong class="font-semibold text-primary">Key Recommendation Driver:</strong> High score anchored by a guaranteed irrigation safety buffer (<span class="font-semibold text-tertiary">2,750 m³ surplus</span> across canal + open wells) and low pest vulnerability during the February flowering window due to recommended Nov 02 sowing.
      </p>
</div>
</div>
<!-- Dynamic Section Tabs for Deep Dive Breakdown -->
<div class="mb-8" id="planBreakdownContainer">
<div class="flex items-center justify-between mb-5 flex-wrap gap-3">
<div>
<h2 class="font-headline-md text-primary tracking-tight">Comprehensive Plan Breakdown</h2>
<p class="font-body-sm text-on-surface-variant">Explore quantitative data across financials, hydrology, risk models, and baseline assumptions.</p>
</div>
<!-- Tab Controls -->
<div class="flex items-center p-1 bg-surface-container rounded-2xl">
<button class="tab-btn px-4 py-2 rounded-xl font-label-md text-on-primary bg-primary shadow-sm transition-all flex items-center gap-1.5" id="tab-btn-money" onclick="switchTab('money')">
<span class="material-symbols-outlined text-[16px]">account_balance_wallet</span>
          Money
        </button>
<button class="tab-btn px-4 py-2 rounded-xl font-label-md text-on-surface-variant hover:text-on-surface transition-all flex items-center gap-1.5" id="tab-btn-water" onclick="switchTab('water')">
<span class="material-symbols-outlined text-[16px]">water_voc</span>
          Water &amp; Soil
        </button>
<button class="tab-btn px-4 py-2 rounded-xl font-label-md text-on-surface-variant hover:text-on-surface transition-all flex items-center gap-1.5" id="tab-btn-risk" onclick="switchTab('risk')">
<span class="material-symbols-outlined text-[16px]">security</span>
          Risk Vectors
        </button>
<button class="tab-btn px-4 py-2 rounded-xl font-label-md text-on-surface-variant hover:text-on-surface transition-all flex items-center gap-1.5" id="tab-btn-assumptions" onclick="switchTab('assumptions')">
<span class="material-symbols-outlined text-[16px]">tune</span>
          Assumptions
        </button>
</div>
</div>
<!-- TAB 1: MONEY BREAKDOWN -->
<div class="tab-pane block" id="tab-content-money">
<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
<!-- Left: Summary Metrics & ROI -->
<div class="lg:col-span-4 flex flex-col gap-6">
<div class="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col justify-between">
<div>
<span class="font-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Net Profitability</span>
<div class="flex items-baseline gap-2 mt-2">
<span class="font-headline-lg text-secondary font-bold">₹1,84,500</span>
</div>
<p class="font-body-sm text-on-surface-variant mt-1">Calculated after seed, organic inputs, fertigation, harvesting, and mandi transport deductions.</p>
</div>
<div class="mt-6 pt-5 bg-surface-container-low rounded-2xl p-4 flex items-center justify-between">
<div>
<span class="font-label-sm text-on-surface-variant block">Projected Return (ROI)</span>
<span class="font-headline-md text-primary font-bold">217%</span>
</div>
<div class="text-right">
<span class="font-label-sm text-on-surface-variant block">Break-even Yield</span>
<span class="font-title-lg text-on-surface font-semibold">11.2 Q / ac</span>
</div>
</div>
</div>
<!-- Quick Cashflow Timeline Pill -->
<div class="bg-surface-container-lowest rounded-3xl p-6 shadow-sm">
<h3 class="font-title-md text-primary mb-3 flex items-center gap-2">
<span class="material-symbols-outlined text-[18px] text-secondary">date_range</span>
              Cashflow Milestones
            </h3>
<div class="space-y-3 font-body-sm">
<div class="flex justify-between items-center text-on-surface">
<span class="text-on-surface-variant">Sowing Outlay (Nov)</span>
<span class="font-semibold text-error">₹38,000</span>
</div>
<div class="flex justify-between items-center text-on-surface">
<span class="text-on-surface-variant">Fertigation &amp; Weed (Dec-Jan)</span>
<span class="font-semibold text-error">₹27,000</span>
</div>
<div class="flex justify-between items-center text-on-surface">
<span class="text-on-surface-variant">Harvest &amp; Prep (Mar)</span>
<span class="font-semibold text-error">₹20,000</span>
</div>
<div class="pt-2 flex justify-between items-center font-title-sm text-secondary border-t-0 bg-secondary-container/40 p-2.5 rounded-xl">
<span class="">Total Expected Mandi Realization</span>
<span class="font-bold">₹2,69,500</span>
</div>
</div><div class="mt-4 pt-4 border-t-0 bg-surface-container-low/50 rounded-2xl p-3.5"><div class="flex items-center justify-between mb-2"><span class="font-label-sm font-semibold text-primary">Monthly Outlay vs Mandi Realization</span><span class="font-label-sm text-secondary font-bold">+₹1.84L Net</span></div><svg class="w-full h-32 overflow-visible" viewBox="0 0 280 110"><line x1="25" y1="85" x2="270" y2="85" stroke="#c0c9c1" stroke-width="1"></line><rect x="40" y="47" width="18" height="38" rx="4" fill="#ffdad6"></rect><text x="49" y="42" text-anchor="middle" font-size="9" font-weight="600" fill="#ba1a1a">-38k</text><text x="49" y="98" text-anchor="middle" font-size="9" fill="#404943">Nov</text><rect x="100" y="58" width="18" height="27" rx="4" fill="#ffdad6"></rect><text x="109" y="53" text-anchor="middle" font-size="9" font-weight="600" fill="#ba1a1a">-27k</text><text x="109" y="98" text-anchor="middle" font-size="9" fill="#404943">Dec-Jan</text><rect x="160" y="65" width="18" height="20" rx="4" fill="#ffdad6"></rect><text x="169" y="60" text-anchor="middle" font-size="9" font-weight="600" fill="#ba1a1a">-20k</text><text x="169" y="98" text-anchor="middle" font-size="9" fill="#404943">Feb</text><rect x="220" y="12" width="22" height="73" rx="4" fill="#196c3e"></rect><text x="231" y="8" text-anchor="middle" font-size="9" font-weight="700" fill="#196c3e">+270k</text><text x="231" y="98" text-anchor="middle" font-size="9" font-weight="600" fill="#196c3e">Mar</text><path d="M 49 47 L 109 58 L 169 65 L 231 12" fill="none" stroke="#003320" stroke-width="2" stroke-dasharray="3 3"></path><circle cx="49" cy="47" r="3" fill="#003320"></circle><circle cx="109" cy="58" r="3" fill="#003320"></circle><circle cx="169" cy="65" r="3" fill="#003320"></circle><circle cx="231" cy="12" r="3" fill="#003320"></circle></svg><div class="flex items-center justify-between text-[11px] font-label-sm text-on-surface-variant pt-1"><span class="">Cumulative Capital Invested: ₹85,000</span><span class="text-secondary font-semibold">Mandi Harvest Peak (Mar 05)</span></div></div>
</div>
</div>
<!-- Right: Detailed Cost vs Revenue Stack & SVG Bar Breakdown -->
<div class="lg:col-span-8 bg-surface-container-lowest rounded-3xl p-7 shadow-sm flex flex-col justify-between">
<div>
<div class="flex items-center justify-between mb-4">
<h3 class="font-title-lg text-primary font-semibold">Expense vs Revenue Breakdown</h3>
<span class="font-label-sm px-2.5 py-1 bg-surface-container rounded-lg text-on-surface-variant">8.5 Acres Total</span>
</div>
<!-- Visual Bar Segment -->
<div class="space-y-2 mb-6">
<div class="flex justify-between font-label-sm text-on-surface-variant">
<span class="">Input Costs (₹85,000)</span>
<span class="font-semibold text-secondary">Net Margin 68.5% (₹1,84,500)</span>
</div>
<div class="w-full h-5 rounded-full overflow-hidden flex bg-surface-container">
<div class="h-full bg-error-container" style="width: 31.5%;" title="Total Cost ₹85,000"></div>
<div class="h-full bg-secondary" style="width: 68.5%;" title="Net Margin ₹1,84,500"></div>
</div>
<div class="flex items-center justify-between font-label-xs text-on-surface-variant pt-1">
<span class="">Gross Revenue: ₹2,69,500 (@ ₹2,450/Q avg + quality premium)</span>
<span class="">Net Gain: ₹1,84,500</span>
</div>
</div>
<!-- Cost Items Table / Data Rows -->
<div class="space-y-3 pt-2">
<h4 class="font-title-md text-on-surface">Input Itemization</h4>
<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
<div class="p-3.5 rounded-2xl bg-surface-container-low flex items-center justify-between">
<div class="flex items-center gap-3">
<span class="w-9 h-9 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary">
<span class="material-symbols-outlined text-[18px]">yard</span>
</span>
<div>
<span class="font-title-sm text-on-surface block">Certified Wheat Seeds</span>
<span class="font-label-sm text-on-surface-variant">Sonalika HD-2967 (340 kg)</span>
</div>
</div>
<span class="font-title-md text-on-surface font-semibold">₹14,200</span>
</div>
<div class="p-3.5 rounded-2xl bg-surface-container-low flex items-center justify-between">
<div class="flex items-center gap-3">
<span class="w-9 h-9 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary">
<span class="material-symbols-outlined text-[18px]">compost</span>
</span>
<div>
<span class="font-title-sm text-on-surface block">Organic Nutrients &amp; Bio</span>
<span class="font-label-sm text-on-surface-variant">Vermi-compost + Trichoderma</span>
</div>
</div>
<span class="font-title-md text-on-surface font-semibold">₹18,800</span>
</div>
<div class="p-3.5 rounded-2xl bg-surface-container-low flex items-center justify-between">
<div class="flex items-center gap-3">
<span class="w-9 h-9 rounded-xl bg-surface-container-lowest flex items-center justify-center text-tertiary">
<span class="material-symbols-outlined text-[18px]">water_ph</span>
</span>
<div>
<span class="font-title-sm text-on-surface block">Drip Fertigation &amp; Labor</span>
<span class="font-label-sm text-on-surface-variant">Schedule monitoring &amp; lines</span>
</div>
</div>
<span class="font-title-md text-on-surface font-semibold">₹32,000</span>
</div>
<div class="p-3.5 rounded-2xl bg-surface-container-low flex items-center justify-between">
<div class="flex items-center gap-3">
<span class="w-9 h-9 rounded-xl bg-surface-container-lowest flex items-center justify-center text-on-surface">
<span class="material-symbols-outlined text-[18px]">local_shipping</span>
</span>
<div>
<span class="font-title-sm text-on-surface block">Tillage, Prep &amp; APMC Logistics</span>
<span class="font-label-sm text-on-surface-variant">Rotavator + Hingoli transport</span>
</div>
</div>
<span class="font-title-md text-on-surface font-semibold">₹20,000</span>
</div>
</div>
</div>
</div>
<!-- Bottom Metric Insight -->
<div class="mt-6 pt-4 flex items-center justify-between font-label-md text-on-surface-variant">
<span class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-secondary text-[16px]">price_check</span>
              Guaranteed MSP protection floor: ₹2,275/Q
            </span>
<span class="text-primary font-semibold">Net profit ratio: ₹2.17 per rupee spent</span>
</div>
</div>
</div>
</div>
<!-- TAB 2: WATER BREAKDOWN -->
<div class="tab-pane hidden" id="tab-content-water">
<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
<!-- Water Balance Donut & Reserves -->
<div class="lg:col-span-5 bg-surface-container-lowest rounded-3xl p-7 shadow-sm flex flex-col justify-between">
<div>
<div class="flex items-center justify-between mb-4">
<h3 class="font-title-lg text-primary font-semibold">Hydrological Balance</h3>
<span class="px-2.5 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded-lg font-label-sm font-semibold">Surplus: +2,750 m³</span>
</div>
<!-- Inline SVG Gauge / Donut Graphic -->
<div class="flex flex-col items-center justify-center my-4"><div class="relative flex items-center justify-center"><svg class="w-52 h-52 transform -rotate-90" viewBox="0 0 160 160"><circle cx="80" cy="80" r="68" fill="none" stroke="#f0eee8" stroke-width="8"></circle><circle cx="80" cy="80" r="68" fill="none" stroke="#00475a" stroke-width="8" stroke-dasharray="427" stroke-dashoffset="190" stroke-linecap="round"></circle><circle cx="80" cy="80" r="54" fill="none" stroke="#f0eee8" stroke-width="8"></circle><circle cx="80" cy="80" r="54" fill="none" stroke="#196c3e" stroke-width="8" stroke-dasharray="339" stroke-dashoffset="75" stroke-linecap="round"></circle><circle cx="80" cy="80" r="40" fill="none" stroke="#f0eee8" stroke-width="8"></circle><circle cx="80" cy="80" r="40" fill="none" stroke="#85b99c" stroke-width="8" stroke-dasharray="251" stroke-dashoffset="95" stroke-linecap="round"></circle></svg><div class="absolute flex flex-col items-center justify-center text-center"><span class="font-headline-md font-bold text-primary">3-Ring</span><span class="font-label-sm text-on-surface-variant font-medium">Resource Gauge</span></div></div><div class="grid grid-cols-3 gap-2 w-full mt-3 pt-3 border-t-0 bg-surface-container-low/70 p-2.5 rounded-xl text-center"><div class="flex flex-col items-center"><span class="flex items-center gap-1 font-label-sm text-on-surface"><span class="w-2 h-2 rounded-full bg-tertiary-container"></span>Water</span><span class="font-label-md font-bold text-tertiary">55.6%</span><span class="text-[11px] text-on-surface-variant">3,450 m³</span></div><div class="flex flex-col items-center"><span class="flex items-center gap-1 font-label-sm text-on-surface"><span class="w-2 h-2 rounded-full bg-secondary"></span>Nutrient</span><span class="font-label-md font-bold text-secondary">78.0%</span><span class="text-[11px] text-on-surface-variant">Drip Fed</span></div><div class="flex flex-col items-center"><span class="flex items-center gap-1 font-label-sm text-on-surface"><span class="w-2 h-2 rounded-full bg-on-primary-container"></span>Labour</span><span class="font-label-md font-bold text-primary">62.0%</span><span class="text-[11px] text-on-surface-variant">142 Hours</span></div></div></div>
<div class="space-y-2">
<div class="flex items-center justify-between font-label-sm">
<span class="flex items-center gap-1.5 text-on-surface">
<span class="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
                  Required Consumption
                </span>
<span class="font-semibold text-on-surface">3,450 m³</span>
</div>
<div class="flex items-center justify-between font-label-sm">
<span class="flex items-center gap-1.5 text-on-surface">
<span class="w-2.5 h-2.5 rounded-full bg-surface-variant"></span>
                  Safe Reserve Surplus
                </span>
<span class="font-semibold text-secondary">2,750 m³ (44.4%)</span>
</div>
<div class="flex items-center justify-between font-label-sm pt-2 text-on-surface-variant">
<span class="">Total Farm Capacity</span>
<span class="font-bold text-primary">6,200 m³</span>
</div>
</div>
</div>
<div class="mt-6 p-3.5 bg-surface-container-low rounded-2xl flex items-center gap-3">
<span class="material-symbols-outlined text-tertiary text-[24px]">water_lux</span>
<div class="text-on-surface">
<span class="font-label-sm font-semibold block">20-Day Drought Resilience</span>
<span class="font-body-sm text-on-surface-variant">Surplus water provides buffer against unseasonal dry spells during grain fill.</span>
</div>
</div>
</div>
<!-- Water Sources and Productivity Index -->
<div class="lg:col-span-7 bg-surface-container-lowest rounded-3xl p-7 shadow-sm flex flex-col justify-between">
<div>
<h3 class="font-title-lg text-primary font-semibold mb-4">Source Allocation &amp; Productivity</h3>
<div class="space-y-4 mb-6">
<!-- Canal Source -->
<div class="p-4 rounded-2xl bg-surface-container-low flex flex-col gap-2">
<div class="flex justify-between items-center">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-tertiary">waves</span>
<span class="font-title-sm text-on-surface">Upper Penganga Canal Allocation</span>
</div>
<span class="font-title-sm text-primary font-bold">4,000 m³</span>
</div>
<div class="w-full bg-surface-container h-2 rounded-full overflow-hidden">
<div class="bg-tertiary h-full rounded-full" style="width: 64.5%;"></div>
</div>
<span class="font-label-sm text-on-surface-variant">64.5% of total allocation · Available via rotational sluice every 12 days</span>
</div>
<!-- Open Wells -->
<div class="p-4 rounded-2xl bg-surface-container-low flex flex-col gap-2">
<div class="flex justify-between items-center">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary">water</span>
<span class="font-title-sm text-on-surface">2 Open Farm Recharge Wells</span>
</div>
<span class="font-title-sm text-primary font-bold">2,200 m³</span>
</div>
<div class="w-full bg-surface-container h-2 rounded-full overflow-hidden">
<div class="bg-secondary h-full rounded-full" style="width: 35.5%;"></div>
</div>
<span class="font-label-sm text-on-surface-variant">35.5% · Deep table replenishment with solar lift pumps</span>
</div>
</div>
<!-- Agricultural Water Productivity KPI -->
<div class="grid grid-cols-2 gap-4">
<div class="p-4 rounded-2xl bg-surface-container-high/60">
<span class="font-label-sm text-on-surface-variant block">Water Productivity Index</span>
<span class="font-headline-sm text-primary font-bold mt-1">6.14 kg / m³</span>
<span class="font-label-sm text-secondary font-medium block mt-1">+57% vs Hingoli avg (3.9 kg/m³)</span>
</div>
<div class="p-4 rounded-2xl bg-surface-container-high/60">
<span class="font-label-sm text-on-surface-variant block">Soil Moisture Retentive Class</span>
<span class="font-headline-sm text-primary font-bold mt-1">High (Vertisols)</span>
<span class="font-label-sm text-on-surface-variant block mt-1">Deep Black Cotton with 48% clay</span>
</div>
</div>
</div>
<div class="mt-6 pt-4 flex items-center justify-between font-label-md text-on-surface-variant">
<span class="">Drip Fertigation Frequency: 2 runs / week (45 min/run)</span>
<span class="text-tertiary font-semibold">Zero runoff detected</span>
</div>
</div>
</div>
</div>
<!-- TAB 3: RISK BREAKDOWN -->
<div class="tab-pane hidden" id="tab-content-risk">
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
<!-- Risk Card 1 -->
<div class="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col justify-between">
<div>
<div class="flex items-center justify-between mb-4">
<span class="p-2 rounded-xl bg-secondary-container text-on-secondary-container">
<span class="material-symbols-outlined text-[20px]">water_drop</span>
</span>
<span class="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm font-semibold">Low Risk</span>
</div>
<h3 class="font-title-md text-primary font-bold mb-1">Water Scarcity Risk</h3>
<p class="font-body-sm text-on-surface-variant leading-relaxed mb-4">
              Irrigation surplus is at 44.4%. High water table coupled with canal rotation ensures uninterrupted root-zone wetting through tillering.
            </p>
</div>
<div class="pt-3 font-label-sm text-secondary font-semibold bg-surface-container-low px-3 py-2 rounded-xl">
            Buffer: +2,750 m³ safety net
          </div>
</div>
<!-- Risk Card 2 -->
<div class="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col justify-between">
<div>
<div class="flex items-center justify-between mb-4">
<span class="p-2 rounded-xl bg-surface-container text-on-surface">
<span class="material-symbols-outlined text-[20px]">cloud_sync</span>
</span>
<span class="px-2 py-0.5 rounded-full bg-surface-variant text-on-surface-variant font-label-sm font-semibold">Mod-Low</span>
</div>
<h3 class="font-title-md text-primary font-bold mb-1">Weather &amp; Heatwaves</h3>
<p class="font-body-sm text-on-surface-variant leading-relaxed mb-4">
              Terminal heat in mid-March mitigated by planting on Nov 02. Sonalika HD-2967 matures in 115 days, safely avoiding 38°C spikes.
            </p>
</div>
<div class="pt-3 font-label-sm text-on-surface font-semibold bg-surface-container-low px-3 py-2 rounded-xl">
            Window: Harvest by Feb 28
          </div>
</div>
<!-- Risk Card 3 -->
<div class="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col justify-between">
<div>
<div class="flex items-center justify-between mb-4">
<span class="p-2 rounded-xl bg-secondary-container text-on-secondary-container">
<span class="material-symbols-outlined text-[20px]">calendar_today</span>
</span>
<span class="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm font-semibold">Minimal</span>
</div>
<h3 class="font-title-md text-primary font-bold mb-1">Planting Window</h3>
<p class="font-body-sm text-on-surface-variant leading-relaxed mb-4">
              Ideal sowing span is Oct 25 – Nov 08. Field preparation and moisture levels are primed to enter field right on schedule.
            </p>
</div>
<div class="pt-3 font-label-sm text-secondary font-semibold bg-surface-container-low px-3 py-2 rounded-xl">
            Target Sowing: Nov 02, 2025
          </div>
</div>
<!-- Risk Card 4 -->
<div class="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col justify-between">
<div>
<div class="flex items-center justify-between mb-4">
<span class="p-2 rounded-xl bg-secondary-container text-on-secondary-container">
<span class="material-symbols-outlined text-[20px]">trending_up</span>
</span>
<span class="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm font-semibold">Very Low</span>
</div>
<h3 class="font-title-md text-primary font-bold mb-1">Financial Downside</h3>
<p class="font-body-sm text-on-surface-variant leading-relaxed mb-4">
              Break-even threshold requires only 11.2 Q/ac (baseline yield is 21.2 Q/ac). Protected by Indian MSP floor ₹2,275.
            </p>
</div>
<div class="pt-3 font-label-sm text-secondary font-semibold bg-surface-container-low px-3 py-2 rounded-xl">
            Downside Cushion: 47% Yield Fall
          </div>
</div>
</div>
</div>
<!-- TAB 4: ASSUMPTIONS USED -->
<div class="tab-pane hidden" id="tab-content-assumptions">
<div class="bg-surface-container-lowest rounded-3xl p-7 shadow-sm">
<div class="flex items-center justify-between mb-6">
<div>
<h3 class="font-title-lg text-primary font-semibold">Agronomic Engine Modeling Parameters</h3>
<p class="font-body-sm text-on-surface-variant">Parameters fed into KrishiMitra's crop growth algorithm and simulation engines.</p>
</div>
<button class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container text-on-surface font-label-sm hover:bg-surface-variant transition-colors">
<span class="material-symbols-outlined text-[16px]">edit</span>
            Modify Inputs
          </button>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
<div class="p-4 rounded-2xl bg-surface-container-low">
<span class="font-label-sm text-on-surface-variant uppercase tracking-wider block">Sowing Date Window</span>
<span class="font-title-md text-on-surface font-bold mt-1 block">Nov 02, 2025</span>
<span class="font-body-sm text-on-surface-variant mt-1 block">Calibrated for peak Rabi emergence</span>
</div>
<div class="p-4 rounded-2xl bg-surface-container-low">
<span class="font-label-sm text-on-surface-variant uppercase tracking-wider block">Wheat Variety</span>
<span class="font-title-md text-on-surface font-bold mt-1 block">HD-2967 (Pusa)</span>
<span class="font-body-sm text-on-surface-variant mt-1 block">Rust-resistant &amp; heat tolerant</span>
</div>
<div class="p-4 rounded-2xl bg-surface-container-low">
<span class="font-label-sm text-on-surface-variant uppercase tracking-wider block">Weather Data Feed</span>
<span class="font-title-md text-on-surface font-bold mt-1 block">IMD 2025 Kharif-Rabi</span>
<span class="font-body-sm text-on-surface-variant mt-1 block">Regional Hingoli micro-station model</span>
</div>
<div class="p-4 rounded-2xl bg-surface-container-low">
<span class="font-label-sm text-on-surface-variant uppercase tracking-wider block">APMC Price Model</span>
<span class="font-title-md text-on-surface font-bold mt-1 block">₹2,450 / Quintal</span>
<span class="font-body-sm text-on-surface-variant mt-1 block">3-year weighted average (APMC Hingoli)</span>
</div>
</div>
<div class="mt-6 pt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
<div class="flex items-center gap-3 text-on-surface" style="background-color: rgba(255, 255, 255, 0.78); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.85); box-shadow: rgba(22, 74, 52, 0.05) 0px 10px 30px -5px, rgba(255, 255, 255, 0.95) 0px 1px 2px inset;">
<span class="material-symbols-outlined text-secondary">layers</span>
<div>
<span class="font-label-sm text-on-surface-variant block">Soil Depth &amp; pH</span>
<span class="font-title-sm font-semibold">120 cm Deep / pH 7.8</span>
</div>
</div>
<div class="flex items-center gap-3 text-on-surface" style="background-color: rgba(255, 255, 255, 0.78); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.85); box-shadow: rgba(22, 74, 52, 0.05) 0px 10px 30px -5px, rgba(255, 255, 255, 0.95) 0px 1px 2px inset;">
<span class="material-symbols-outlined text-secondary">power</span>
<div>
<span class="font-label-sm text-on-surface-variant block">Pump Electricity Uptime</span>
<span class="font-title-sm font-semibold">8 hrs solar + 4 hrs grid/day</span>
</div>
</div>
<div class="flex items-center gap-3 text-on-surface" style="background-color: rgba(255, 255, 255, 0.78); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.85); box-shadow: rgba(22, 74, 52, 0.05) 0px 10px 30px -5px, rgba(255, 255, 255, 0.95) 0px 1px 2px inset;">
<span class="material-symbols-outlined text-secondary">eco</span>
<div>
<span class="font-label-sm text-on-surface-variant block">Preceding Crop Residue</span>
<span class="font-title-sm font-semibold">Soybean Stubble (Green Compost)</span>
</div>
</div>
</div>
</div>
</div>
</div>
<!-- Crop Lifecycle Roadmap / Step Milestones Bar -->
<div class="bg-surface-container-lowest rounded-3xl p-7 md:p-8 shadow-sm mb-8" style="background-color: rgba(255, 255, 255, 0.78); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.85); box-shadow: 0 10px 30px -5px rgba(22, 74, 52, 0.05), inset 0 1px 2px rgba(255, 255, 255, 0.95);">
<div class="flex items-center justify-between mb-6">
<div>
<h3 class="font-headline-sm text-primary tracking-tight">Planting-to-Harvest Action Plan</h3>
<p class="font-body-sm text-on-surface-variant">Recommended agronomic milestones for Sonalika HD-2967 wheat on 8.5 acres.</p>
</div>
<span class="inline-flex items-center gap-1 text-secondary font-label-md font-semibold bg-secondary-container px-3 py-1.5 rounded-xl">
<span class="material-symbols-outlined text-[16px]">hourglass_top</span>
        Total Duration: 118 Days
      </span>
</div>
<!-- Timeline Grid -->
<div class="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
<!-- Step 1 -->
<div class="p-4 rounded-2xl bg-surface-container-low flex flex-col justify-between">
<div>
<div class="flex items-center justify-between mb-3">
<span class="w-7 h-7 rounded-full bg-primary text-on-primary font-label-sm flex items-center justify-center font-bold">1</span>
<span class="font-label-sm text-on-surface-variant">Oct 25 – Nov 02</span>
</div>
<span class="font-title-sm text-primary font-bold block">Field Prep &amp; Sowing</span>
<p class="font-body-sm text-on-surface-variant mt-1">Deep rotavator tillage, basal organic manure, certified seed drilling with drip alignment.</p>
</div>
<span class="font-label-sm text-secondary font-medium mt-3 block">Ready to Initiate</span>
</div>
<!-- Step 2 -->
<div class="p-4 rounded-2xl bg-surface-container-low flex flex-col justify-between">
<div>
<div class="flex items-center justify-between mb-3">
<span class="w-7 h-7 rounded-full bg-surface-container text-on-surface font-label-sm flex items-center justify-center font-bold">2</span>
<span class="font-label-sm text-on-surface-variant">Nov 20 – Dec 05</span>
</div>
<span class="font-title-sm text-on-surface font-bold block">Crown Root &amp; Tillering</span>
<p class="font-body-sm text-on-surface-variant mt-1">First drip fertigation cycle (N-P-K bio cocktail). Moisture sensor calibration check.</p>
</div>
<span class="font-label-sm text-on-surface-variant mt-3 block">Stage 2 · In 24 Days</span>
</div>
<!-- Step 3 -->
<div class="p-4 rounded-2xl bg-surface-container-low flex flex-col justify-between">
<div>
<div class="flex items-center justify-between mb-3">
<span class="w-7 h-7 rounded-full bg-surface-container text-on-surface font-label-sm flex items-center justify-center font-bold">3</span>
<span class="font-label-sm text-on-surface-variant">Dec 20 – Jan 10</span>
</div>
<span class="font-title-sm text-on-surface font-bold block">Jointing &amp; Canopy</span>
<p class="font-body-sm text-on-surface-variant mt-1">Foliar micronutrient spray, yellow rust preventive inspection, canal rotation #2.</p>
</div>
<span class="font-label-sm text-on-surface-variant mt-3 block">Critical Water Window</span>
</div>
<!-- Step 4 -->
<div class="p-4 rounded-2xl bg-surface-container-low flex flex-col justify-between">
<div>
<div class="flex items-center justify-between mb-3">
<span class="w-7 h-7 rounded-full bg-surface-container text-on-surface font-label-sm flex items-center justify-center font-bold">4</span>
<span class="font-label-sm text-on-surface-variant">Jan 25 – Feb 15</span>
</div>
<span class="font-title-sm text-on-surface font-bold block">Flowering &amp; Grain Fill</span>
<p class="font-body-sm text-on-surface-variant mt-1">Maintain consistent root moisture using well reserves to safeguard quintal density.</p>
</div>
<span class="font-label-sm text-tertiary font-medium mt-3 block">Heat Shielding Active</span>
</div>
<!-- Step 5 -->
<div class="p-4 rounded-2xl bg-surface-container-low flex flex-col justify-between">
<div>
<div class="flex items-center justify-between mb-3">
<span class="w-7 h-7 rounded-full bg-secondary text-on-secondary font-label-sm flex items-center justify-center font-bold">5</span>
<span class="font-label-sm text-on-surface-variant">Feb 25 – Mar 05</span>
</div>
<span class="font-title-sm text-secondary font-bold block">Harvest &amp; Mandi Sale</span>
<p class="font-body-sm text-on-surface-variant mt-1">Combine harvesting, moisture dry-down to 12%, dispatch to APMC Hingoli yard.</p>
</div>
<span class="font-label-sm text-secondary font-medium mt-3 block">Est. ₹2.69L Revenue</span>
</div>
</div>
</div>
<!-- Primary Bottom Action Bar -->
<div class="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 mb-8" style="background-color: rgba(255, 255, 255, 0.78); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.85); box-shadow: rgba(22, 74, 52, 0.05) 0px 10px 30px -5px, rgba(255, 255, 255, 0.95) 0px 1px 2px inset;">
<div class="flex items-center gap-3 text-on-surface">
<span class="w-10 h-10 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary">
<span class="material-symbols-outlined text-[22px]">thumb_up</span>
</span>
<div>
<span class="font-title-md font-bold block">Satisfied with this advisory plan?</span>
<span class="font-body-sm text-on-surface-variant">You can lock this as your primary operational schedule or evaluate alternative crops.</span>
</div>
</div>
<div class="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
<button class="px-5 py-3 rounded-2xl bg-surface-container text-on-surface font-label-lg hover:bg-surface-container-high transition-colors">
        Edit Parameters
      </button>
<button class="px-5 py-3 rounded-2xl bg-secondary text-on-secondary font-label-lg shadow-sm hover:bg-secondary/90 transition-all flex items-center gap-2">
<span class="material-symbols-outlined text-[20px]">check</span>
        Adopt This Plan
      </button>
</div>
</div>
<!-- Mandatory Legal / Agronomic Disclaimer Banner -->
<div class="p-5 rounded-2xl bg-surface-container-low flex items-start gap-3.5 mb-10 text-on-surface-variant">
<span class="material-symbols-outlined text-[20px] text-outline shrink-0 mt-0.5">info</span>
<p class="font-label-sm leading-relaxed">
<strong>Disclaimer:</strong> Estimated outcome based on entered farm conditions, geo-spatial soil records, and regional rainfall models. Yield and market rates are indicative and not guaranteed. Final performance depends on precise adherence to sowing timelines, certified input application, local microclimate deviations, and prevailing mandi auction conditions.
    </p>
</div>
<!-- Download Printable Report Modal Sheet (Toggleable) -->
<div class="hidden fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 backdrop-blur-sm p-4" id="reportsModal">
<div class="bg-surface-container-lowest rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2.5">
<span class="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
<span class="material-symbols-outlined text-[20px]">description</span>
</span>
<div>
<h4 class="font-title-lg text-primary font-bold">Export Plan Dossier</h4>
<span class="font-label-sm text-on-surface-variant">PDF Document · Marathi &amp; English</span>
</div>
</div>
<button class="p-2 text-on-surface-variant hover:text-on-surface" onclick="document.getElementById('reportsModal').classList.add('hidden')">
<span class="material-symbols-outlined text-[20px]">close</span>
</button>
</div>
<div class="space-y-3 font-body-sm text-on-surface">
<label class="flex items-center gap-3 p-3 rounded-2xl bg-surface-container-low cursor-pointer">
<input checked="" class="accent-primary w-4 h-4 rounded" type="checkbox">
<span class="">Full 8-page agronomist report with daily fertigation calendar</span>
</label>
<label class="flex items-center gap-3 p-3 rounded-2xl bg-surface-container-low cursor-pointer">
<input checked="" class="accent-primary w-4 h-4 rounded" type="checkbox">
<span class="">Water balance log and pump schedule summary for farm labor</span>
</label>
<label class="flex items-center gap-3 p-3 rounded-2xl bg-surface-container-low cursor-pointer">
<input checked="" class="accent-primary w-4 h-4 rounded" type="checkbox">
<span class="">Financial bank-loan summary sheet (KCC verified format)</span>
</label>
</div>
<div class="flex items-center justify-end gap-3 pt-2">
<button class="px-4 py-2.5 rounded-xl font-label-md text-on-surface-variant hover:text-on-surface" onclick="document.getElementById('reportsModal').classList.add('hidden')">
          Cancel
        </button>
<button class="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-label-md font-semibold shadow-sm flex items-center gap-2" onclick="document.getElementById('reportsModal').classList.add('hidden'); alert('Dossier generated successfully. Downloading PDF...');">
<span class="material-symbols-outlined text-[18px]">file_download</span>
          Generate &amp; Download PDF
        </button>
</div>
</div>
</div>
</div>
<script>
  function switchTab(tabId) {
    const tabs = ['money', 'water', 'risk', 'assumptions'];
    tabs.forEach(t => {
      const pane = document.getElementById('tab-content-' + t);
      const btn = document.getElementById('tab-btn-' + t);
      if (t === tabId) {
        pane.classList.remove('hidden');
        pane.classList.add('block');
        btn.classList.remove('text-on-surface-variant', 'hover:text-on-surface');
        btn.classList.add('bg-primary', 'text-on-primary', 'shadow-sm');
      } else {
        pane.classList.add('hidden');
        pane.classList.remove('block');
        btn.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
        btn.classList.add('text-on-surface-variant', 'hover:text-on-surface');
      }
    });
  }
</script></main></div>

</body></html>
```

---

## `krishimitra_compare_plans/code.html`

```html
<!DOCTYPE html><html lang="en" style=""><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"><meta content="web_dashboard" name="shell-type"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"><link href="https://fonts.googleapis.com" rel="preconnect"><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "secondary-fixed-dim": "#88d8a0", "on-tertiary-fixed": "#001f29", "tertiary-fixed-dim": "#84d1f0", "on-tertiary-fixed-variant": "#004d62", "on-secondary-fixed": "#00210e", "on-primary": "#ffffff", "on-surface-variant": "#404943", "tertiary-fixed": "#baeaff", "surface-container-low": "#f5f3ed", "error-container": "#ffdad6", "primary-fixed-dim": "#9dd2b5", "inverse-surface": "#30312d", "inverse-on-surface": "#f3f1eb", "tertiary-container": "#00475a", "on-error": "#ffffff", "secondary-fixed": "#a4f4ba", "primary-fixed": "#b9efd0", "primary-container": "#164a34", "on-primary-fixed": "#002113", "outline": "#717973", "background": "#fbf9f3", "on-surface": "#1b1c18", "surface": "#fbf9f3", "on-tertiary-container": "#6ab7d5", "tertiary": "#002f3d", "surface-container-lowest": "#ffffff", "surface-variant": "#e4e2dd", "secondary-container": "#a1f1b7", "on-secondary-container": "#1f7042", "error": "#ba1a1a", "outline-variant": "#c0c9c1", "surface-tint": "#366850", "on-error-container": "#93000a", "on-secondary-fixed-variant": "#00522b", "primary": "#003320", "on-background": "#1b1c18", "on-primary-fixed-variant": "#1d5039", "surface-dim": "#dcdad4", "surface-container": "#f0eee8", "on-primary-container": "#85b99c", "secondary": "#196c3e", "surface-bright": "#fbf9f3", "inverse-primary": "#9dd2b5", "surface-container-highest": "#e4e2dd", "surface-container-high": "#eae8e2", "on-secondary": "#ffffff", "on-tertiary": "#ffffff" }, "borderRadius": { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" }, "spacing": { "space-xl": "2.5rem", "space-md": "1rem", "gutter-mobile": "1rem", "gutter": "1.5rem", "margin-mobile": "1rem", "margin": "3rem", "space-sm": "0.5rem", "space-xs": "0.25rem", "space-lg": "1.5rem" }, "fontFamily": { "title-md": ["Plus Jakarta Sans"], "body-md": ["Plus Jakarta Sans"], "headline-md": ["Plus Jakarta Sans"], "headline-sm": ["Plus Jakarta Sans"], "title-lg": ["Plus Jakarta Sans"], "headline-lg": ["Plus Jakarta Sans"], "body-lg": ["Plus Jakarta Sans"], "label-md": ["Plus Jakarta Sans"], "body-sm": ["Plus Jakarta Sans"], "display-lg-mobile": ["Plus Jakarta Sans"], "label-sm": ["Plus Jakarta Sans"], "label-lg": ["Plus Jakarta Sans"], "headline-lg-mobile": ["Plus Jakarta Sans"], "display-lg": ["Plus Jakarta Sans"] }, "fontSize": { "title-md": ["16px", { "lineHeight": "24px", "fontWeight": "600" }], "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }], "headline-md": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600" }], "headline-sm": ["20px", { "lineHeight": "28px", "fontWeight": "600" }], "title-lg": ["18px", { "lineHeight": "26px", "fontWeight": "600" }], "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700" }], "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }], "label-md": ["12px", { "lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "600" }], "body-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }], "display-lg-mobile": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700" }], "label-sm": ["11px", { "lineHeight": "14px", "letterSpacing": "0.02em", "fontWeight": "500" }], "label-lg": ["14px", { "lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "600" }], "headline-lg-mobile": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600" }], "display-lg": ["44px", { "lineHeight": "52px", "letterSpacing": "-0.02em", "fontWeight": "700" }] } } } };</script></head><body class="bg-background font-body-md text-on-surface antialiased" style="background: radial-gradient(at 0% 0%, rgba(34, 197, 94, 0.15) 0px, transparent 50%) fixed, radial-gradient(at 100% 0%, rgba(16, 185, 129, 0.18) 0px, transparent 50%), radial-gradient(rgba(132, 204, 22, 0.08) 0px, transparent 50%), radial-gradient(at 80% 100%, rgba(16, 185, 129, 0.12) 0px, transparent 50%), rgb(244, 247, 244); min-height: 100vh;"><aside class="fixed left-0 top-0 h-full w-64 bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between pt-5 pb-6" style="backdrop-filter: blur(20px) saturate(180%); background-color: rgba(255, 255, 255, 0.78); border-right: 1px solid rgba(255, 255, 255, 0.8); box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 24px -1px, rgba(255, 255, 255, 0.9) 0px 1px 1px 0px inset;"><div class="flex flex-col gap-6"><div class="px-6 flex items-center gap-3"><img alt="Brand logo. - Primary color: #164a34
- Font: plusJakartaSans
- Mode: light
- Roundness: rounded-md
" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1UwvheEflVQETpVODXud1bKJQLTG3Z9V091WAQuRWb3OjkfynIYN40ImZHKnidhICqNkNrqFqpWKzSfZlgxI5J_M82iY6odlXGtsZTTc8HXdVBAz6ryKsSz-P5wU6ZoKTCO5D247hagw2iNx0PZZfjdthMC8zjpWAGLJh7xg4qo3i9LZdCn7j6gGxugjmJTrMiBN0EKKxLQuSsUMZx2F7LChrzofAoNzJDssH-iE5FNMrlgSgXlD6etBto"><div class="flex flex-col"><span class="font-title-lg text-primary tracking-tight leading-none">KrishiMitra</span><span class="font-label-sm text-secondary">Agri-Advisory OS</span></div></div><nav class="flex flex-col px-3 space-y-1" data-active-classes="bg-primary-container text-on-primary-container font-title-md"><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="dashboard" href="#"><span class="material-symbols-outlined text-[20px]">space_dashboard</span><span class="">Dashboard</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="my-farms" href="#"><span class="material-symbols-outlined text-[20px]">agriculture</span><span class="">My Farms</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="plans" href="#"><span class="material-symbols-outlined text-[20px]">calendar_month</span><span class="">Plans</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="compare" href="#"><span class="material-symbols-outlined text-[20px]">balance</span><span class="">Compare</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="recommendations" href="#"><span class="material-symbols-outlined text-[20px]">psychology_alt</span><span class="">Recommendations</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="resource-check" href="#"><span class="material-symbols-outlined text-[20px]">water_voc</span><span class="">Resource Check</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="reports" href="#"><span class="material-symbols-outlined text-[20px]">query_stats</span><span class="">Reports</span></a></nav></div><div class="px-4"><div class="p-3 bg-surface-container rounded-xl flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div><div class="flex flex-col min-w-0 flex-1"><span class="font-label-lg text-on-surface truncate">Ramesh Deshmukh</span><span class="font-label-sm text-on-surface-variant truncate">Shivaji Nagar Farm #2</span></div><span class="material-symbols-outlined text-on-surface-variant text-[18px]">unfold_more</span></div></div></aside><div class="pl-64"><header class="fixed top-0 left-64 right-0 h-16 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-8" style="backdrop-filter: blur(20px) saturate(180%); background-color: rgba(255, 255, 255, 0.78); border-bottom: 1px solid rgba(255, 255, 255, 0.8); box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 24px -1px, rgba(255, 255, 255, 0.9) 0px 1px 1px 0px inset;"><div class="flex items-center gap-3"><img alt="Brand logo. - Primary color: #164a34
- Font: plusJakartaSans
- Mode: light
- Roundness: rounded-md
" class="h-7 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1UwvheEflVQETpVODXud1bKJQLTG3Z9V091WAQuRWb3OjkfynIYN40ImZHKnidhICqNkNrqFqpWKzSfZlgxI5J_M82iY6odlXGtsZTTc8HXdVBAz6ryKsSz-P5wU6ZoKTCO5D247hagw2iNx0PZZfjdthMC8zjpWAGLJh7xg4qo3i9LZdCn7j6gGxugjmJTrMiBN0EKKxLQuSsUMZx2F7LChrzofAoNzJDssH-iE5FNMrlgSgXlD6etBto"><span class="font-title-md text-on-surface hidden sm:inline">KrishiMitra Management</span></div><div class="flex items-center gap-4"><div class="flex items-center bg-surface-container px-2 py-1 rounded-lg"><span class="material-symbols-outlined text-[18px] text-on-surface-variant mr-1">translate</span><select class="bg-transparent font-label-md text-on-surface outline-none cursor-pointer pr-1"><option value="en">English</option><option value="hi">हिंदी</option><option value="mr">मराठी</option></select></div><button class="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-low rounded-lg font-label-md text-on-surface hover:bg-surface-container-high transition-colors"><span class="material-symbols-outlined text-[18px] text-secondary">wb_sunny</span><span class="">Nashik 28°C · Soil Wet</span></button><button class="p-2 text-on-surface-variant hover:text-on-surface transition-colors"><span class="material-symbols-outlined text-[22px]">notifications</span></button><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></header><main class="relative pt-16 w-full min-h-screen bg-surface" style="background: transparent;"><div class="flex flex-col w-full">
<!-- Visual Hero Strip with Context -->
<div class="relative w-full px-6 lg:px-10 pt-6 pb-8 bg-surface-container-low/60 border-b border-outline-variant/30" style="background-color: rgba(255, 255, 255, 0.55); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(255, 255, 255, 0.7); box-shadow: rgba(22, 74, 52, 0.03) 0px 4px 20px -2px;">
<div class="max-w-7xl mx-auto flex flex-col gap-6">
<!-- Breadcrumb & Top Bar -->
<div class="flex flex-wrap items-center justify-between gap-4">
<nav class="flex items-center gap-2 font-label-md text-on-surface-variant">
<a class="hover:text-primary transition-colors flex items-center gap-1" href="#">
<span class="material-symbols-outlined text-[16px]">calendar_month</span>
<span class="">Plans</span>
</a>
<span class="text-outline-variant">/</span>
<span class="text-on-surface">Shivaji Patil Farm</span>
<span class="text-outline-variant">/</span>
<span class="font-semibold text-primary">Compare Crop Plans (Kharif-Rabi 2025)</span>
</nav>
<div class="flex items-center gap-3">
<button class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-highest/60 hover:bg-surface-container-highest text-on-surface font-label-md transition-all">
<span class="material-symbols-outlined text-[18px]">restart_alt</span>
<span class="">Reset Selection</span>
</button>
<button class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-container-lowest hover:bg-surface text-primary font-label-md shadow-sm transition-all">
<span class="material-symbols-outlined text-[18px] text-secondary">picture_as_pdf</span>
<span class="">Export Comparison PDF</span>
</button>
<button class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-container text-on-primary font-label-md shadow-md hover:bg-primary transition-all">
<span class="material-symbols-outlined text-[18px]">add</span>
<span class="">Create New Scenario</span>
</button>
</div>
</div>
<!-- Main Headline + Farm Geography Context Pill -->
<div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
<div class="flex flex-col gap-2 max-w-3xl">
<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container w-fit font-label-sm">
<span class="material-symbols-outlined text-[16px]">balance</span>
<span class="">Multi-Criteria Agronomic Trade-Off Analysis</span>
</div>
<h1 class="font-headline-lg text-primary tracking-tight">Compare your plans</h1>
<p class="font-body-md text-on-surface-variant leading-relaxed">
            Objective side-by-side trade-offs across financial return, water resilience, and climate exposure. Select up to 4 scenarios to evaluate before committing capital.
          </p>
</div>
<!-- Geo & Soil Badge Bar -->
<div class="p-3.5 bg-surface-container-lowest rounded-2xl shadow-sm flex items-center gap-3 self-start lg:self-auto">
<div class="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
<span class="material-symbols-outlined text-[22px]">nature_people</span>
</div>
<div class="flex flex-col">
<span class="font-label-sm text-on-surface-variant uppercase tracking-wider">Target Parcel</span>
<span class="font-label-lg text-on-surface">Shivaji Patil Farm · Hingoli, MH</span>
<span class="font-body-sm text-outline text-[12px]">8.5 Acres · Deep Black Cotton Soil · Canal + 2 Open Wells</span>
</div>
</div>
</div>
</div>
</div>
<!-- Page Body Content -->
<div class="w-full px-6 lg:px-10 py-8">
<div class="max-w-7xl mx-auto flex flex-col gap-10">
<!-- SECTION 1: Top 3 Summary Comparison Highlights -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
<!-- Metric Highlight 1: Profit Range -->
<div class="relative overflow-hidden bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col justify-between" style="background-color: rgba(255, 255, 255, 0.78); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.85); box-shadow: rgba(22, 74, 52, 0.05) 0px 10px 30px -5px, rgba(255, 255, 255, 0.95) 0px 1px 2px inset;">
<div class="absolute top-0 right-0 w-32 h-32 bg-secondary-container/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none"></div>
<div class="flex items-center justify-between mb-4">
<div class="flex items-center gap-2.5">
<div class="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
<span class="material-symbols-outlined text-[20px]">currency_rupee</span>
</div>
<span class="font-label-md text-on-surface-variant uppercase tracking-wider">Estimated Profit</span>
</div>
<span class="px-2 py-0.5 rounded-full font-label-sm bg-secondary-container/30 text-on-secondary-container">3 Scenarios</span>
</div>
<div class="flex flex-col gap-1 my-2">
<div class="flex items-baseline gap-2">
<span class="font-headline-lg text-primary tracking-tight">₹1,46,300</span>
<span class="font-body-md text-outline">to</span>
<span class="font-headline-lg text-primary tracking-tight">₹1,84,500</span>
</div>
<p class="font-body-sm text-outline">Projected net margin after all operational &amp; amortized inputs</p>
</div>
<div class="mt-4 pt-3 border-t border-surface-container flex items-center gap-2 text-secondary font-label-sm">
<span class="material-symbols-outlined text-[18px]">trending_up</span>
<span class="font-medium">+₹38,200 upside with drip optimization vs baseline</span>
</div>
</div>
<!-- Metric Highlight 2: Water Range -->
<div class="relative overflow-hidden bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col justify-between" style="background-color: rgba(255, 255, 255, 0.78); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.85); box-shadow: rgba(22, 74, 52, 0.05) 0px 10px 30px -5px, rgba(255, 255, 255, 0.95) 0px 1px 2px inset;">
<div class="absolute top-0 right-0 w-32 h-32 bg-tertiary-fixed/15 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none"></div>
<div class="flex items-center justify-between mb-4">
<div class="flex items-center gap-2.5">
<div class="w-8 h-8 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary">
<span class="material-symbols-outlined text-[20px]">water_drop</span>
</div>
<span class="font-label-md text-on-surface-variant uppercase tracking-wider">Water Needed</span>
</div>
<span class="px-2 py-0.5 rounded-full font-label-sm bg-surface-container text-on-surface-variant">Capacity: 6,200 m³</span>
</div>
<div class="flex flex-col gap-1 my-2">
<div class="flex items-baseline gap-2">
<span class="font-headline-lg text-primary tracking-tight">2,150 m³</span>
<span class="font-body-md text-outline">to</span>
<span class="font-headline-lg text-primary tracking-tight">4,650 m³</span>
</div>
<p class="font-body-sm text-outline">Demand draws between 34% and 75% of local farm water reserve</p>
</div>
<div class="mt-4 pt-3 border-t border-surface-container flex items-center gap-2 text-tertiary font-label-sm">
<span class="material-symbols-outlined text-[18px]">water_ec</span>
<span class="font-medium">Max 2,500 m³ water conserved (53% savings with Chana)</span>
</div>
</div>
<!-- Metric Highlight 3: Overall Risk -->
<div class="relative overflow-hidden bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col justify-between" style="background-color: rgba(255, 255, 255, 0.78); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.85); box-shadow: rgba(22, 74, 52, 0.05) 0px 10px 30px -5px, rgba(255, 255, 255, 0.95) 0px 1px 2px inset;">
<div class="absolute top-0 right-0 w-32 h-32 bg-surface-container-high rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none"></div>
<div class="flex items-center justify-between mb-4">
<div class="flex items-center gap-2.5">
<div class="w-8 h-8 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary-container">
<span class="material-symbols-outlined text-[20px]">shield_with_heart</span>
</div>
<span class="font-label-md text-on-surface-variant uppercase tracking-wider">Overall Risk Range</span>
</div>
<span class="px-2 py-0.5 rounded-full font-label-sm bg-surface-container text-on-surface-variant">Climate &amp; Yield</span>
</div>
<div class="flex flex-col gap-1 my-2">
<div class="flex items-baseline gap-2">
<span class="font-headline-lg text-primary tracking-tight">Low</span>
<span class="font-body-md text-outline">vs</span>
<span class="font-headline-lg text-primary tracking-tight">Moderate Risk</span>
</div>
<p class="font-body-sm text-outline">Sensitivity to late canal release &amp; heat spike at flowering</p>
</div>
<div class="mt-4 pt-3 border-t border-surface-container flex items-center gap-2 text-on-surface-variant font-label-sm">
<span class="material-symbols-outlined text-[18px]">verified_user</span>
<span class="font-medium">2 of 3 options retain &gt;45% contingency moisture cushion</span>
</div>
</div>
</div>
<!-- SECTION 2: Side-by-side Plan Cards (3 distinct plans) -->
<div class="flex flex-col gap-4">
<div class="flex items-center justify-between">
<div>
<h2 class="font-headline-sm text-primary">Evaluated Plans Side-by-Side</h2>
<p class="font-body-sm text-on-surface-variant">Each option is calibrated specifically for Hingoli soil profiles and Rabi seasonal outlook.</p>
</div>
<div class="hidden sm:flex items-center gap-2 text-outline font-label-sm">
<span class="w-2.5 h-2.5 rounded-full bg-secondary"></span> Selected for Implementation
          </div>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
<!-- PLAN A: Baseline Furrow Wheat Plan -->
<div class="bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col justify-between relative" style="background-color: rgba(255, 255, 255, 0.78); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.85); box-shadow: rgba(22, 74, 52, 0.05) 0px 10px 30px -5px, rgba(255, 255, 255, 0.95) 0px 1px 2px inset;">
<!-- Left Accent Strip -->
<div class="absolute left-0 top-6 bottom-6 w-1 rounded-r-full bg-outline-variant"></div>
<div class="flex flex-col gap-4">
<!-- Top Pill & Baseline Label -->
<div class="flex items-center justify-between">
<span class="px-2.5 py-1 rounded-lg bg-surface-container-high text-on-surface-variant font-label-sm uppercase tracking-wider font-semibold">
                  BASELINE
                </span>
<span class="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm">
                  Lowest Upfront Outlay
                </span>
</div>
<!-- Title & Variety -->
<div>
<h3 class="font-title-lg text-primary">Baseline Furrow Wheat</h3>
<p class="font-body-sm text-on-surface-variant mt-0.5">Sonalika HD-2967 · Traditional Flood Furrow</p>
</div>
<!-- Key Metrics Grid -->
<div class="grid grid-cols-2 gap-3 py-3 border-y border-surface-container">
<div class="flex flex-col">
<span class="font-label-sm text-outline">Net Profit</span>
<span class="font-title-lg text-primary">₹1,46,300</span>
<span class="font-label-sm text-on-surface-variant">ROI: 172%</span>
</div>
<div class="flex flex-col">
<span class="font-label-sm text-outline">Expected Yield</span>
<span class="font-title-lg text-primary">19.1 Q/ac</span>
<span class="font-label-sm text-outline">18.5 - 20.0 range</span>
</div>
<div class="flex flex-col">
<span class="font-label-sm text-outline">Water Needed</span>
<span class="font-title-lg text-primary">4,650 m³</span>
<span class="font-label-sm text-error">75% of reserve</span>
</div>
<div class="flex flex-col">
<span class="font-label-sm text-outline">Decision Score</span>
<div class="flex items-baseline gap-1">
<span class="font-title-lg text-primary">68</span>
<span class="font-label-sm text-outline">/100</span>
</div>
<span class="font-label-sm text-outline">Moderate Risk</span>
</div>
</div>
<!-- Operational Attributes -->
<div class="space-y-2.5 text-on-surface-variant">
<div class="flex items-center justify-between font-body-sm">
<span class="flex items-center gap-2">
<span class="material-symbols-outlined text-[18px] text-outline">payments</span>
<span class="">Input Cost Outlay</span>
</span>
<span class="font-medium text-on-surface">₹68,000</span>
</div>
<div class="flex items-center justify-between font-body-sm">
<span class="flex items-center gap-2">
<span class="material-symbols-outlined text-[18px] text-outline">group</span>
<span class="">Labor Overhead</span>
</span>
<span class="font-medium text-on-surface">High (Manual)</span>
</div>
<div class="flex items-center justify-between font-body-sm">
<span class="flex items-center gap-2">
<span class="material-symbols-outlined text-[18px] text-outline">cyclone</span>
<span class="">Climate Sensitivity</span>
</span>
<span class="font-medium text-on-surface">Rain/Canal Lag Sensitive</span>
</div>
</div>
</div>
<!-- Actions -->
<div class="flex items-center gap-2 mt-6 pt-4 border-t border-surface-container">
<button class="flex-1 py-2.5 px-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md transition-colors text-center">
                View Details
              </button>
<button class="py-2.5 px-3 rounded-xl bg-transparent hover:bg-surface-container-low text-primary font-label-md transition-colors">
                Set as Target
              </button>
</div>
</div>
<!-- PLAN B: Drip Precision Wheat Plan (Recommended / Target) -->
<div class="bg-surface-container-lowest rounded-2xl p-6 shadow-md flex flex-col justify-between relative ring-2 ring-secondary/30" style="background-color: rgba(255, 255, 255, 0.85); backdrop-filter: blur(20px); border: 1.5px solid rgba(25, 108, 62, 0.35); box-shadow: rgba(22, 74, 52, 0.12) 0px 16px 36px -6px, rgba(255, 255, 255, 0.98) 0px 1px 2px inset;">
<!-- Left Accent Strip -->
<div class="absolute left-0 top-6 bottom-6 w-1 rounded-r-full bg-secondary"></div>
<div class="flex flex-col gap-4">
<!-- Top Pill & Badge -->
<div class="flex items-center justify-between">
<span class="px-2.5 py-1 rounded-lg bg-primary-container text-on-primary font-label-sm uppercase tracking-wider font-semibold">
                  RECOMMENDED
                </span>
<span class="px-2.5 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm font-semibold">
                  Highest Net Profit
                </span>
</div>
<!-- Title & Variety -->
<div>
<h3 class="font-title-lg text-primary flex items-center gap-1.5">
<span class="">Drip Precision Wheat</span>
<span class="material-symbols-outlined text-[18px] text-secondary">verified</span>
</h3>
<p class="font-body-sm text-on-surface-variant mt-0.5">Sonalika HD-2967 · Micro-sprinkler + Inline Drip</p>
</div>
<!-- Key Metrics Grid -->
<div class="grid grid-cols-2 gap-3 py-3 border-y border-surface-container">
<div class="flex flex-col">
<span class="font-label-sm text-outline">Net Profit</span>
<span class="font-title-lg text-secondary font-bold">₹1,84,500</span>
<span class="font-label-sm text-secondary font-medium">+₹38,200 · ROI: 217%</span>
</div>
<div class="flex flex-col">
<span class="font-label-sm text-outline">Expected Yield</span>
<span class="font-title-lg text-primary">21.2 Q/ac</span>
<span class="font-label-sm text-outline">21.0 - 23.5 range</span>
</div>
<div class="flex flex-col">
<span class="font-label-sm text-outline">Water Needed</span>
<span class="font-title-lg text-primary">3,450 m³</span>
<span class="font-label-sm text-secondary">55% (2,750 m³ buffer)</span>
</div>
<div class="flex flex-col">
<span class="font-label-sm text-outline">Decision Score</span>
<div class="flex items-baseline gap-1">
<span class="font-title-lg text-secondary font-bold">89</span>
<span class="font-label-sm text-outline">/100</span>
</div>
<span class="font-label-sm text-secondary font-medium">Low Risk</span>
</div>
</div>
<!-- Operational Attributes -->
<div class="space-y-2.5 text-on-surface-variant">
<div class="flex items-center justify-between font-body-sm">
<span class="flex items-center gap-2">
<span class="material-symbols-outlined text-[18px] text-secondary">payments</span>
<span class="">Input Cost Outlay</span>
</span>
<span class="font-medium text-on-surface">₹85,000 (inc. drip fert.)</span>
</div>
<div class="flex items-center justify-between font-body-sm">
<span class="flex items-center gap-2">
<span class="material-symbols-outlined text-[18px] text-secondary">group</span>
<span class="">Labor Overhead</span>
</span>
<span class="font-medium text-on-surface">Low (Automated Checks)</span>
</div>
<div class="flex items-center justify-between font-body-sm">
<span class="flex items-center gap-2">
<span class="material-symbols-outlined text-[18px] text-secondary">cyclone</span>
<span class="">Climate Sensitivity</span>
</span>
<span class="font-medium text-secondary">High Buffer &amp; Fertigation</span>
</div>
</div>
</div>
<!-- Actions -->
<div class="flex items-center gap-2 mt-6 pt-4 border-t border-surface-container">
<button class="flex-1 py-2.5 px-3 rounded-xl bg-primary-container text-on-primary hover:bg-primary font-label-md transition-colors text-center shadow-sm">
                Adopt This Plan
              </button>
<button class="py-2.5 px-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md transition-colors">
                Full Results
              </button>
</div>
</div>
<!-- PLAN C: Gram / Chickpea Low-Water Plan -->
<div class="bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col justify-between relative" style="background-color: rgba(255, 255, 255, 0.78); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.85); box-shadow: rgba(22, 74, 52, 0.05) 0px 10px 30px -5px, rgba(255, 255, 255, 0.95) 0px 1px 2px inset;">
<!-- Left Accent Strip -->
<div class="absolute left-0 top-6 bottom-6 w-1 rounded-r-full bg-tertiary-container"></div>
<div class="flex flex-col gap-4">
<!-- Top Pill & Badge -->
<div class="flex items-center justify-between">
<span class="px-2.5 py-1 rounded-lg bg-surface-container-high text-on-surface-variant font-label-sm uppercase tracking-wider font-semibold">
                  LOW WATER ALTERNATIVE
                </span>
<span class="px-2.5 py-1 rounded-full bg-tertiary-fixed/30 text-on-tertiary-fixed-variant font-label-sm font-semibold">
                  Lowest Water &amp; Risk
                </span>
</div>
<!-- Title & Variety -->
<div>
<h3 class="font-title-lg text-primary">Gram / Desi Chickpea</h3>
<p class="font-body-sm text-on-surface-variant mt-0.5">Vijay Desi Chana · 2 Protective Runs Only</p>
</div>
<!-- Key Metrics Grid -->
<div class="grid grid-cols-2 gap-3 py-3 border-y border-surface-container">
<div class="flex flex-col">
<span class="font-label-sm text-outline">Net Profit</span>
<span class="font-title-lg text-primary">₹1,58,200</span>
<span class="font-label-sm text-on-surface-variant">+₹11,900 · ROI: 243%</span>
</div>
<div class="flex flex-col">
<span class="font-label-sm text-outline">Expected Yield</span>
<span class="font-title-lg text-primary">12.2 Q/ac</span>
<span class="font-label-sm text-outline">₹5,800/Q Mandi rate</span>
</div>
<div class="flex flex-col">
<span class="font-label-sm text-outline">Water Needed</span>
<span class="font-title-lg text-tertiary">2,150 m³</span>
<span class="font-label-sm text-tertiary font-medium">Only 34% (4,050 surplus)</span>
</div>
<div class="flex flex-col">
<span class="font-label-sm text-outline">Decision Score</span>
<div class="flex items-baseline gap-1">
<span class="font-title-lg text-primary">84</span>
<span class="font-label-sm text-outline">/100</span>
</div>
<span class="font-label-sm text-secondary">Ultra-Low Risk</span>
</div>
</div>
<!-- Operational Attributes -->
<div class="space-y-2.5 text-on-surface-variant">
<div class="flex items-center justify-between font-body-sm">
<span class="flex items-center gap-2">
<span class="material-symbols-outlined text-[18px] text-outline">payments</span>
<span class="">Input Cost Outlay</span>
</span>
<span class="font-medium text-on-surface">₹52,000 (Zero N Synth)</span>
</div>
<div class="flex items-center justify-between font-body-sm">
<span class="flex items-center gap-2">
<span class="material-symbols-outlined text-[18px] text-outline">group</span>
<span class="">Labor Overhead</span>
</span>
<span class="font-medium text-on-surface">Moderate</span>
</div>
<div class="flex items-center justify-between font-body-sm">
<span class="flex items-center gap-2">
<span class="material-symbols-outlined text-[18px] text-outline">cyclone</span>
<span class="">Climate Sensitivity</span>
</span>
<span class="font-medium text-on-surface">Drought Hardy &amp; Pulse N-Fix</span>
</div>
</div>
</div>
<!-- Actions -->
<div class="flex items-center gap-2 mt-6 pt-4 border-t border-surface-container">
<button class="flex-1 py-2.5 px-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md transition-colors text-center">
                View Details
              </button>
<button class="py-2.5 px-3 rounded-xl bg-transparent hover:bg-surface-container-low text-primary font-label-md transition-colors">
                Evaluate Plan
              </button>
</div>
</div>
</div>
</div>
<!-- SECTION 3: Comparative Visual Chart Section -->
<div class="bg-surface-container-lowest rounded-2xl p-6 lg:p-8 shadow-sm flex flex-col gap-6" style="background-color: rgba(255, 255, 255, 0.78); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.85); box-shadow: rgba(22, 74, 52, 0.05) 0px 10px 30px -5px, rgba(255, 255, 255, 0.95) 0px 1px 2px inset;">
<div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
<div>
<div class="flex items-center gap-2">
<h2 class="font-headline-sm text-primary">Trade-Off Bar Spectrum</h2>
<span class="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm">No Single "Best" Plan</span>
</div>
<p class="font-body-sm text-on-surface-variant">Realized performance across conflicting agronomic priorities.</p>
</div>
<!-- Metric Tabs / Filter Pills -->
<div class="flex flex-wrap items-center gap-1.5 p-1 bg-surface-container rounded-xl">
<button class="px-3 py-1.5 rounded-lg bg-surface-container-lowest shadow-xs text-primary font-label-md">All Metrics</button>
<button class="px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface font-label-md transition-colors">Financial Return</button>
<button class="px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface font-label-md transition-colors">Water Stress</button>
<button class="px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface font-label-md transition-colors">Risk Exposure</button>
<button class="px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface font-label-md transition-colors">Cash Outlay</button>
</div>
</div>
<!-- Comparative Horizontal Bars -->
<div class="p-5 rounded-2xl bg-surface-container-low/60 border border-outline-variant/30 flex flex-col gap-4"><div class="flex flex-wrap items-center justify-between gap-2"><div class="flex items-center gap-2"><span class="material-symbols-outlined text-[20px] text-secondary">bar_chart</span><h3 class="font-title-md text-primary">Normalized Multi-Metric Cluster Benchmark</h3></div><div class="flex items-center gap-4 text-[12px] font-medium"><span class="inline-flex items-center gap-1.5 text-on-surface-variant"><span class="w-3 h-3 rounded-sm bg-outline/60 inline-block"></span>Baseline Furrow</span><span class="inline-flex items-center gap-1.5 text-primary font-semibold"><span class="w-3 h-3 rounded-sm bg-secondary inline-block"></span>Drip Wheat (Target)</span><span class="inline-flex items-center gap-1.5 text-on-surface-variant"><span class="w-3 h-3 rounded-sm bg-tertiary-container inline-block"></span>Desi Chickpea</span></div></div><div class="w-full overflow-x-auto"><div class="min-w-[620px] pt-2"><svg class="w-full h-56" viewBox="0 0 760 210" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="50" y1="160" x2="730" y2="160" stroke="#c0c9c1" stroke-width="1.5"></line><line x1="50" y1="125" x2="730" y2="125" stroke="#eae8e2" stroke-dasharray="4 4"></line><line x1="50" y1="90" x2="730" y2="90" stroke="#eae8e2" stroke-dasharray="4 4"></line><line x1="50" y1="55" x2="730" y2="55" stroke="#eae8e2" stroke-dasharray="4 4"></line><line x1="50" y1="20" x2="730" y2="20" stroke="#eae8e2" stroke-dasharray="4 4"></line><text x="40" y="164" text-anchor="end" font-size="11" fill="#717973" font-family="Plus Jakarta Sans">0</text><text x="40" y="129" text-anchor="end" font-size="11" fill="#717973" font-family="Plus Jakarta Sans">25</text><text x="40" y="94" text-anchor="end" font-size="11" fill="#717973" font-family="Plus Jakarta Sans">50</text><text x="40" y="59" text-anchor="end" font-size="11" fill="#717973" font-family="Plus Jakarta Sans">75</text><text x="40" y="24" text-anchor="end" font-size="11" fill="#717973" font-family="Plus Jakarta Sans">100</text><g transform="translate(85,0)"><rect x="0" y="57" width="28" height="103" rx="4" fill="#717973" fill-opacity="0.6"></rect><text x="14" y="51" text-anchor="middle" font-size="11" font-weight="600" fill="#1b1c18" font-family="Plus Jakarta Sans">₹1.46L</text><rect x="34" y="33" width="28" height="127" rx="4" fill="#196c3e"></rect><text x="48" y="27" text-anchor="middle" font-size="11" font-weight="700" fill="#196c3e" font-family="Plus Jakarta Sans">₹1.85L</text><rect x="68" y="51" width="28" height="109" rx="4" fill="#00475a"></rect><text x="82" y="45" text-anchor="middle" font-size="11" font-weight="600" fill="#00475a" font-family="Plus Jakarta Sans">₹1.58L</text><text x="48" y="182" text-anchor="middle" font-size="12" font-weight="600" fill="#003320" font-family="Plus Jakarta Sans">Net Profit (₹L)</text><text x="48" y="197" text-anchor="middle" font-size="10" fill="#717973" font-family="Plus Jakarta Sans">Higher is better</text></g><g transform="translate(255,0)"><rect x="0" y="38" width="28" height="122" rx="4" fill="#ba1a1a" fill-opacity="0.65"></rect><text x="14" y="32" text-anchor="middle" font-size="11" font-weight="600" fill="#ba1a1a" font-family="Plus Jakarta Sans">4.65k</text><rect x="34" y="69" width="28" height="91" rx="4" fill="#196c3e"></rect><text x="48" y="63" text-anchor="middle" font-size="11" font-weight="700" fill="#196c3e" font-family="Plus Jakarta Sans">3.45k</text><rect x="68" y="104" width="28" height="56" rx="4" fill="#00475a"></rect><text x="82" y="98" text-anchor="middle" font-size="11" font-weight="700" fill="#00475a" font-family="Plus Jakarta Sans">2.15k</text><text x="48" y="182" text-anchor="middle" font-size="12" font-weight="600" fill="#003320" font-family="Plus Jakarta Sans">Water Used (k m³)</text><text x="48" y="197" text-anchor="middle" font-size="10" fill="#717973" font-family="Plus Jakarta Sans">Lower is better</text></g><g transform="translate(425,0)"><rect x="0" y="58" width="28" height="102" rx="4" fill="#717973" fill-opacity="0.6"></rect><text x="14" y="52" text-anchor="middle" font-size="11" font-weight="600" fill="#1b1c18" font-family="Plus Jakarta Sans">₹68k</text><rect x="34" y="38" width="28" height="122" rx="4" fill="#196c3e"></rect><text x="48" y="32" text-anchor="middle" font-size="11" font-weight="700" fill="#196c3e" font-family="Plus Jakarta Sans">₹85k</text><rect x="68" y="82" width="28" height="78" rx="4" fill="#00475a"></rect><text x="82" y="76" text-anchor="middle" font-size="11" font-weight="700" fill="#00475a" font-family="Plus Jakarta Sans">₹52k</text><text x="48" y="182" text-anchor="middle" font-size="12" font-weight="600" fill="#003320" font-family="Plus Jakarta Sans">Capital Needed (₹k)</text><text x="48" y="197" text-anchor="middle" font-size="10" fill="#717973" font-family="Plus Jakarta Sans">Upfront outlay</text></g><g transform="translate(595,0)"><rect x="0" y="46" width="28" height="114" rx="4" fill="#717973" fill-opacity="0.6"></rect><text x="14" y="40" text-anchor="middle" font-size="11" font-weight="600" fill="#1b1c18" font-family="Plus Jakarta Sans">42 d</text><rect x="34" y="92" width="28" height="68" rx="4" fill="#196c3e"></rect><text x="48" y="86" text-anchor="middle" font-size="11" font-weight="700" fill="#196c3e" font-family="Plus Jakarta Sans">24 d</text><rect x="68" y="76" width="28" height="84" rx="4" fill="#00475a"></rect><text x="82" y="70" text-anchor="middle" font-size="11" font-weight="600" fill="#00475a" font-family="Plus Jakarta Sans">30 d</text><text x="48" y="182" text-anchor="middle" font-size="12" font-weight="600" fill="#003320" font-family="Plus Jakarta Sans">Labor Input (Days)</text><text x="48" y="197" text-anchor="middle" font-size="10" fill="#717973" font-family="Plus Jakarta Sans">Human effort required</text></g></svg></div></div></div><div class="flex flex-col gap-8 pt-2">
<!-- Metric 1: Net Profit Realization -->
<div class="flex flex-col gap-2">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[18px] text-secondary">monetization_on</span>
<span class="font-title-md text-primary">Net Profit Realization</span>
<span class="text-outline-variant">·</span>
<span class="font-label-sm text-secondary font-medium">Trade-off: Precision Wheat generates ₹38.2k higher income</span>
</div>
<span class="font-label-sm text-outline">Target ceiling: ₹2,00,000</span>
</div>
<!-- Bar Rows -->
<div class="space-y-2">
<!-- Plan A -->
<div class="flex items-center gap-3">
<span class="w-36 text-right font-label-md text-on-surface-variant truncate">Baseline Furrow</span>
<div class="flex-1 h-6 bg-surface-container rounded-full overflow-hidden flex items-center p-0.5">
<div class="h-full rounded-full bg-outline/60 flex items-center justify-end pr-2 transition-all duration-500" style="width: 73.15%;">
<span class="font-label-sm text-surface text-[11px] font-semibold">₹1,46,300</span>
</div>
</div>
<span class="w-28 font-label-sm text-outline text-right">ROI 172%</span>
</div>
<!-- Plan B -->
<div class="flex items-center gap-3">
<span class="w-36 text-right font-label-md text-primary font-semibold truncate">Drip Wheat (Target)</span>
<div class="flex-1 h-6 bg-surface-container rounded-full overflow-hidden flex items-center p-0.5">
<div class="h-full rounded-full bg-secondary flex items-center justify-between px-2.5 transition-all duration-500" style="width: 92.25%;">
<span class="font-label-sm text-surface text-[11px] font-semibold">Highest Net Profit</span>
<span class="font-label-sm text-surface text-[11px] font-bold">₹1,84,500</span>
</div>
</div>
<span class="w-28 font-label-sm text-secondary font-semibold text-right">ROI 217%</span>
</div>
<!-- Plan C -->
<div class="flex items-center gap-3">
<span class="w-36 text-right font-label-md text-on-surface-variant truncate">Desi Chickpea</span>
<div class="flex-1 h-6 bg-surface-container rounded-full overflow-hidden flex items-center p-0.5">
<div class="h-full rounded-full bg-tertiary-container flex items-center justify-end pr-2 transition-all duration-500" style="width: 79.1%;">
<span class="font-label-sm text-surface text-[11px] font-semibold">₹1,58,200</span>
</div>
</div>
<span class="w-28 font-label-sm text-primary font-semibold text-right">Highest ROI 243%</span>
</div>
</div>
</div>
<!-- Metric 2: Water Consumption vs Farm Reserve -->
<div class="flex flex-col gap-2">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[18px] text-tertiary">water_drop</span>
<span class="font-title-md text-primary">Water Consumption (6,200 m³ Farm Water Reserve)</span>
<span class="text-outline-variant">·</span>
<span class="font-label-sm text-tertiary font-medium">Trade-off: Chickpea conserves 53% water (4,050 m³ surplus)</span>
</div>
<span class="font-label-sm text-outline">Lower bar = safer reserve</span>
</div>
<!-- Bar Rows -->
<div class="space-y-2">
<!-- Plan A -->
<div class="flex items-center gap-3">
<span class="w-36 text-right font-label-md text-on-surface-variant truncate">Baseline Furrow</span>
<div class="flex-1 h-6 bg-surface-container rounded-full overflow-hidden flex items-center p-0.5">
<div class="h-full rounded-full bg-error/70 flex items-center justify-end pr-2 transition-all duration-500" style="width: 75%;">
<span class="font-label-sm text-surface text-[11px] font-semibold">4,650 m³ (75% reserve drawn)</span>
</div>
</div>
<span class="w-28 font-label-sm text-error text-right">1,550 m³ buffer</span>
</div>
<!-- Plan B -->
<div class="flex items-center gap-3">
<span class="w-36 text-right font-label-md text-primary font-semibold truncate">Drip Wheat (Target)</span>
<div class="flex-1 h-6 bg-surface-container rounded-full overflow-hidden flex items-center p-0.5">
<div class="h-full rounded-full bg-secondary-fixed-dim flex items-center justify-end pr-2 transition-all duration-500" style="width: 55.6%;">
<span class="font-label-sm text-on-secondary-fixed text-[11px] font-semibold">3,450 m³ (55%)</span>
</div>
</div>
<span class="w-28 font-label-sm text-on-surface text-right">2,750 m³ buffer</span>
</div>
<!-- Plan C -->
<div class="flex items-center gap-3">
<span class="w-36 text-right font-label-md text-on-surface-variant truncate">Desi Chickpea</span>
<div class="flex-1 h-6 bg-surface-container rounded-full overflow-hidden flex items-center p-0.5">
<div class="h-full rounded-full bg-tertiary flex items-center justify-between px-2.5 transition-all duration-500" style="width: 34.6%;">
<span class="font-label-sm text-on-tertiary text-[11px] font-semibold">Lowest Water Use</span>
<span class="font-label-sm text-on-tertiary text-[11px] font-bold">2,150 m³</span>
</div>
</div>
<span class="w-28 font-label-sm text-tertiary font-semibold text-right">4,050 m³ surplus</span>
</div>
</div>
</div>
<!-- Metric 3: Climate & Delay Risk Factor -->
<div class="flex flex-col gap-2">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[18px] text-outline">thermostat</span>
<span class="font-title-md text-primary">Climate &amp; Sowing Delay Risk Score</span>
<span class="text-outline-variant">·</span>
<span class="font-label-sm text-outline">Lower score indicates higher resilience to winter heat waves</span>
</div>
<span class="font-label-sm text-outline">Scale: 0 (Ultra safe) to 100</span>
</div>
<!-- Bar Rows -->
<div class="space-y-2">
<!-- Plan A -->
<div class="flex items-center gap-3">
<span class="w-36 text-right font-label-md text-on-surface-variant truncate">Baseline Furrow</span>
<div class="flex-1 h-6 bg-surface-container rounded-full overflow-hidden flex items-center p-0.5">
<div class="h-full rounded-full bg-error/60 flex items-center justify-end pr-2 transition-all duration-500" style="width: 42%;">
<span class="font-label-sm text-surface text-[11px] font-semibold">42 / 100</span>
</div>
</div>
<span class="w-28 font-label-sm text-error text-right">Moderate Risk</span>
</div>
<!-- Plan B -->
<div class="flex items-center gap-3">
<span class="w-36 text-right font-label-md text-primary font-semibold truncate">Drip Wheat (Target)</span>
<div class="flex-1 h-6 bg-surface-container rounded-full overflow-hidden flex items-center p-0.5">
<div class="h-full rounded-full bg-secondary-fixed-dim flex items-center justify-end pr-2 transition-all duration-500" style="width: 15%;">
<span class="font-label-sm text-on-secondary-fixed text-[11px] font-semibold">15</span>
</div>
</div>
<span class="w-28 font-label-sm text-secondary font-semibold text-right">Low Risk</span>
</div>
<!-- Plan C -->
<div class="flex items-center gap-3">
<span class="w-36 text-right font-label-md text-on-surface-variant truncate">Desi Chickpea</span>
<div class="flex-1 h-6 bg-surface-container rounded-full overflow-hidden flex items-center p-0.5">
<div class="h-full rounded-full bg-tertiary-container flex items-center justify-between px-2 transition-all duration-500" style="width: 11%;">
<span class="font-label-sm text-surface text-[11px] font-bold">11</span>
</div>
</div>
<span class="w-28 font-label-sm text-tertiary font-semibold text-right">Lowest Risk</span>
</div>
</div>
</div>
<!-- Metric 4: Upfront Cash Outlay -->
<div class="flex flex-col gap-2">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[18px] text-outline">credit_card</span>
<span class="font-title-md text-primary">Upfront Cash Outlay Required</span>
<span class="text-outline-variant">·</span>
<span class="font-label-sm text-outline">Seed, chemical inputs, labor staging, and irrigation fittings</span>
</div>
<span class="font-label-sm text-outline">Lower bar = less debt exposure</span>
</div>
<!-- Bar Rows -->
<div class="space-y-2">
<!-- Plan A -->
<div class="flex items-center gap-3">
<span class="w-36 text-right font-label-md text-on-surface-variant truncate">Baseline Furrow</span>
<div class="flex-1 h-6 bg-surface-container rounded-full overflow-hidden flex items-center p-0.5">
<div class="h-full rounded-full bg-outline/50 flex items-center justify-end pr-2 transition-all duration-500" style="width: 68%;">
<span class="font-label-sm text-surface text-[11px] font-semibold">₹68,000</span>
</div>
</div>
<span class="w-28 font-label-sm text-outline text-right">Moderate Outlay</span>
</div>
<!-- Plan B -->
<div class="flex items-center gap-3">
<span class="w-36 text-right font-label-md text-primary font-semibold truncate">Drip Wheat (Target)</span>
<div class="flex-1 h-6 bg-surface-container rounded-full overflow-hidden flex items-center p-0.5">
<div class="h-full rounded-full bg-primary-container flex items-center justify-end pr-2 transition-all duration-500" style="width: 85%;">
<span class="font-label-sm text-on-primary text-[11px] font-semibold">₹85,000</span>
</div>
</div>
<span class="w-28 font-label-sm text-on-surface text-right">Highest Outlay</span>
</div>
<!-- Plan C -->
<div class="flex items-center gap-3">
<span class="w-36 text-right font-label-md text-on-surface-variant truncate">Desi Chickpea</span>
<div class="flex-1 h-6 bg-surface-container rounded-full overflow-hidden flex items-center p-0.5">
<div class="h-full rounded-full bg-secondary flex items-center justify-between px-2.5 transition-all duration-500" style="width: 52%;">
<span class="font-label-sm text-surface text-[11px] font-semibold">Lowest Input Cost</span>
<span class="font-label-sm text-surface text-[11px] font-bold">₹52,000</span>
</div>
</div>
<span class="w-28 font-label-sm text-secondary font-semibold text-right">Save ₹33k Outlay</span>
</div>
</div>
</div>
</div>
</div>
<!-- SECTION 4: Objective Trade-Off Detailed Matrix Table -->
<div class="bg-surface-container-lowest rounded-2xl p-6 lg:p-8 shadow-sm flex flex-col gap-5" style="background-color: rgba(255, 255, 255, 0.78); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.85); box-shadow: rgba(22, 74, 52, 0.05) 0px 10px 30px -5px, rgba(255, 255, 255, 0.95) 0px 1px 2px inset;">
<div class="flex items-center justify-between"><div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 w-full"><div class="flex flex-col gap-1.5 max-w-xl"><div class="flex items-center gap-2"><h2 class="font-headline-sm text-primary">In-Depth Agronomic Matrix</h2><span class="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm">5 Criteria Compared</span></div><p class="font-body-sm text-on-surface-variant">Cross-referencing soil chemistry, harvest timing, and economic sensitivity parameters with holistic multi-axis radar positioning.</p><div class="flex flex-wrap items-center gap-4 mt-2 text-[12px] font-medium"><span class="inline-flex items-center gap-1.5 text-on-surface-variant"><span class="w-2.5 h-2.5 rounded-full bg-outline/60"></span>Plan A: Furrow Wheat</span><span class="inline-flex items-center gap-1.5 text-secondary font-semibold"><span class="w-2.5 h-2.5 rounded-full bg-secondary"></span>Plan B: Drip Precision (Target)</span><span class="inline-flex items-center gap-1.5 text-tertiary font-semibold"><span class="w-2.5 h-2.5 rounded-full bg-tertiary-container"></span>Plan C: Desi Chickpea</span></div></div><div class="flex items-center gap-3 p-3 rounded-2xl bg-surface-container-low/70 border border-outline-variant/30 self-start lg:self-auto shrink-0"><svg class="w-48 h-44" viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="110,28 178,74 152,148 68,148 42,74" stroke="#eae8e2" stroke-width="1.5" fill="#fbf9f3" fill-opacity="0.6"></polygon><polygon points="110,50 156,82 138,134 82,134 64,82" stroke="#e4e2dd" stroke-dasharray="3 3" fill="none"></polygon><line x1="110" y1="100" x2="110" y2="28" stroke="#dcdad4" stroke-width="1"></line><line x1="110" y1="100" x2="178" y2="74" stroke="#dcdad4" stroke-width="1"></line><line x1="110" y1="100" x2="152" y2="148" stroke="#dcdad4" stroke-width="1"></line><line x1="110" y1="100" x2="68" y2="148" stroke="#dcdad4" stroke-width="1"></line><line x1="110" y1="100" x2="42" y2="74" stroke="#dcdad4" stroke-width="1"></line><polygon points="110,48 152,82 135,138 88,124 62,88" stroke="#717973" stroke-width="1.5" fill="#717973" fill-opacity="0.12"></polygon><polygon points="110,34 172,76 142,135 78,138 52,78" stroke="#196c3e" stroke-width="2.2" fill="#196c3e" fill-opacity="0.2"></polygon><polygon points="110,45 138,90 148,145 69,146 46,75" stroke="#00475a" stroke-width="1.8" fill="#00475a" fill-opacity="0.15" stroke-dasharray="4 2"></polygon><text x="110" y="20" text-anchor="middle" font-size="9" font-weight="600" fill="#196c3e" font-family="Plus Jakarta Sans">Profit (92%)</text><text x="186" y="78" text-anchor="start" font-size="9" font-weight="600" fill="#003320" font-family="Plus Jakarta Sans">Feasibility</text><text x="160" y="162" text-anchor="start" font-size="9" font-weight="600" fill="#00475a" font-family="Plus Jakarta Sans">Soil (+N)</text><text x="60" y="162" text-anchor="end" font-size="9" font-weight="600" fill="#00475a" font-family="Plus Jakarta Sans">Water Sav.</text><text x="34" y="78" text-anchor="end" font-size="9" font-weight="600" fill="#196c3e" font-family="Plus Jakarta Sans">Low Risk</text></svg><div class="flex flex-col gap-1 pr-2"><span class="font-label-sm uppercase tracking-wider text-outline text-[10px]">Radar Fit Score</span><span class="font-title-md text-secondary font-bold">89 / 100</span><span class="font-body-sm text-outline text-[11px] leading-tight">Drip Wheat leads across 4 of 5 vectors</span></div></div></div></div>
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse">
<thead>
<tr class="bg-surface-container-low text-on-surface-variant font-label-md">
<th class="py-3 px-4 rounded-l-xl">Evaluation Parameter</th>
<th class="py-3 px-4">Plan A: Baseline Furrow</th>
<th class="py-3 px-4 bg-secondary-container/20 text-on-secondary-container font-bold">Plan B: Drip Precision (Target)</th>
<th class="py-3 px-4 rounded-r-xl">Plan C: Desi Chickpea</th>
</tr>
</thead>
<tbody class="divide-y divide-surface-container font-body-sm text-on-surface">
<!-- Row 1 -->
<tr class="hover:bg-surface-container-low/40 transition-colors">
<td class="py-4 px-4 font-semibold text-primary">Sowing Window Flexibility</td>
<td class="py-4 px-4 text-on-surface-variant">Narrow (Nov 5 - Nov 20). Delays cut yield by 1.2 Q/wk.</td>
<td class="py-4 px-4 bg-secondary-container/10 text-on-surface font-medium">Moderate (Nov 5 - Dec 02). Microclimate controls mitigate early heat.</td>
<td class="py-4 px-4 text-secondary font-semibold">Wide (Oct 25 - Dec 10). Highly adaptive to dry conditions.</td>
</tr>
<!-- Row 2 -->
<tr class="hover:bg-surface-container-low/40 transition-colors">
<td class="py-4 px-4 font-semibold text-primary">Moisture Deficit Tolerance</td>
<td class="py-4 px-4 text-error">Poor. Deep cracks in Black Cotton soil cause root shear.</td>
<td class="py-4 px-4 bg-secondary-container/10 text-on-surface font-medium">High. Uniform lateral drip lines sustain root moisture seal.</td>
<td class="py-4 px-4 text-secondary font-semibold">Exceptional. Deep taproot extracts subsoil moisture.</td>
</tr>
<!-- Row 3 -->
<tr class="hover:bg-surface-container-low/40 transition-colors">
<td class="py-4 px-4 font-semibold text-primary">Mandi Price &amp; MSP Buffer</td>
<td class="py-4 px-4 text-on-surface-variant">MSP ₹2,275/Q. Mandi price stable around ₹2,320.</td>
<td class="py-4 px-4 bg-secondary-container/10 text-on-surface font-medium">Grade A grains secure +₹90 premium at APMC yard.</td>
<td class="py-4 px-4 text-on-surface font-medium">MSP ₹5,440/Q. Spot price volatility (₹5,200 - ₹6,400).</td>
</tr>
<!-- Row 4 -->
<tr class="hover:bg-surface-container-low/40 transition-colors">
<td class="py-4 px-4 font-semibold text-primary">Break-even Yield Threshold</td>
<td class="py-4 px-4 text-on-surface-variant">12.4 Quintals / Acre</td>
<td class="py-4 px-4 bg-secondary-container/10 text-on-surface font-medium">11.2 Quintals / Acre</td>
<td class="py-4 px-4 text-secondary font-semibold">6.1 Quintals / Acre (Lowest failure risk)</td>
</tr>
<!-- Row 5 -->
<tr class="hover:bg-surface-container-low/40 transition-colors">
<td class="py-4 px-4 font-semibold text-primary">Soil Health Impact</td>
<td class="py-4 px-4 text-on-surface-variant">Heavy nitrogen drawdown (120 kg N/ac). High fertilizer runoff.</td>
<td class="py-4 px-4 bg-secondary-container/10 text-on-surface font-medium">35% less fertilizer via fertigation; preserves soil microbiome.</td>
<td class="py-4 px-4 text-secondary font-semibold">Positive! Atmospheric N-fixation (+32 kg N/ac residual benefit).</td>
</tr>
</tbody>
</table>
</div>
</div>
<!-- SECTION 5: Transparent Advisory & Decision Autonomy Callout -->
<div class="relative overflow-hidden rounded-2xl bg-surface-container-low p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center gap-6" style="background-color: rgba(255, 255, 255, 0.78); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.85); box-shadow: rgba(22, 74, 52, 0.05) 0px 10px 30px -5px, rgba(255, 255, 255, 0.95) 0px 1px 2px inset;">
<div class="w-12 h-12 rounded-2xl bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
<span class="material-symbols-outlined text-[28px]">psychology_alt</span>
</div>
<div class="flex flex-col gap-1.5 flex-1">
<div class="flex items-center gap-2">
<h4 class="font-title-lg text-primary">Agronomist Recommendation Note</h4>
<span class="px-2 py-0.5 rounded-md bg-secondary-container/50 text-on-secondary-container font-label-sm font-semibold">Farmer Autonomy First</span>
</div>
<p class="font-body-md text-on-surface-variant">
            No plan is unilaterally superior. If water tables decline below 18m before November, the <strong class="text-primary font-semibold">Chickpea Plan</strong> provides superior security and lowers your debt exposure. If canal irrigation is confirmed on schedule, the <strong class="text-primary font-semibold">Drip Wheat Plan</strong> maximizes household disposable income by ₹38,200.
          </p>
<span class="font-label-sm text-outline mt-1">
            * Estimated outcomes derived from historical Hingoli mandi trends, IMD Kharif receding forecasts, and farmer input costs. Actual yields subject to microclimatic variations.
          </span>
</div>
<div class="flex items-center gap-3 shrink-0 self-stretch md:self-auto justify-end">
<button class="px-5 py-3 rounded-xl bg-primary-container text-on-primary hover:bg-primary font-label-lg shadow-sm transition-all flex items-center gap-2">
<span class="material-symbols-outlined text-[18px]">check_circle</span>
<span class="">Confirm Drip Plan</span>
</button>
</div>
</div>
</div>
</div>
</div></main></div>

</body></html>
```

---

## `krishimitra_why_did_it_change/code.html`

```html
<!DOCTYPE html><html lang="en" style=""><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"><meta content="web_dashboard" name="shell-type"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"><link href="https://fonts.googleapis.com" rel="preconnect"><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "secondary-fixed-dim": "#88d8a0", "on-tertiary-fixed": "#001f29", "tertiary-fixed-dim": "#84d1f0", "on-tertiary-fixed-variant": "#004d62", "on-secondary-fixed": "#00210e", "on-primary": "#ffffff", "on-surface-variant": "#404943", "tertiary-fixed": "#baeaff", "surface-container-low": "#f5f3ed", "error-container": "#ffdad6", "primary-fixed-dim": "#9dd2b5", "inverse-surface": "#30312d", "inverse-on-surface": "#f3f1eb", "tertiary-container": "#00475a", "on-error": "#ffffff", "secondary-fixed": "#a4f4ba", "primary-fixed": "#b9efd0", "primary-container": "#164a34", "on-primary-fixed": "#002113", "outline": "#717973", "background": "#fbf9f3", "on-surface": "#1b1c18", "surface": "#fbf9f3", "on-tertiary-container": "#6ab7d5", "tertiary": "#002f3d", "surface-container-lowest": "#ffffff", "surface-variant": "#e4e2dd", "secondary-container": "#a1f1b7", "on-secondary-container": "#1f7042", "error": "#ba1a1a", "outline-variant": "#c0c9c1", "surface-tint": "#366850", "on-error-container": "#93000a", "on-secondary-fixed-variant": "#00522b", "primary": "#003320", "on-background": "#1b1c18", "on-primary-fixed-variant": "#1d5039", "surface-dim": "#dcdad4", "surface-container": "#f0eee8", "on-primary-container": "#85b99c", "secondary": "#196c3e", "surface-bright": "#fbf9f3", "inverse-primary": "#9dd2b5", "surface-container-highest": "#e4e2dd", "surface-container-high": "#eae8e2", "on-secondary": "#ffffff", "on-tertiary": "#ffffff" }, "borderRadius": { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" }, "spacing": { "space-xl": "2.5rem", "space-md": "1rem", "gutter-mobile": "1rem", "gutter": "1.5rem", "margin-mobile": "1rem", "margin": "3rem", "space-sm": "0.5rem", "space-xs": "0.25rem", "space-lg": "1.5rem" }, "fontFamily": { "title-md": ["Plus Jakarta Sans"], "body-md": ["Plus Jakarta Sans"], "headline-md": ["Plus Jakarta Sans"], "headline-sm": ["Plus Jakarta Sans"], "title-lg": ["Plus Jakarta Sans"], "headline-lg": ["Plus Jakarta Sans"], "body-lg": ["Plus Jakarta Sans"], "label-md": ["Plus Jakarta Sans"], "body-sm": ["Plus Jakarta Sans"], "display-lg-mobile": ["Plus Jakarta Sans"], "label-sm": ["Plus Jakarta Sans"], "label-lg": ["Plus Jakarta Sans"], "headline-lg-mobile": ["Plus Jakarta Sans"], "display-lg": ["Plus Jakarta Sans"] }, "fontSize": { "title-md": ["16px", { "lineHeight": "24px", "fontWeight": "600" }], "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }], "headline-md": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600" }], "headline-sm": ["20px", { "lineHeight": "28px", "fontWeight": "600" }], "title-lg": ["18px", { "lineHeight": "26px", "fontWeight": "600" }], "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700" }], "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }], "label-md": ["12px", { "lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "600" }], "body-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }], "display-lg-mobile": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700" }], "label-sm": ["11px", { "lineHeight": "14px", "letterSpacing": "0.02em", "fontWeight": "500" }], "label-lg": ["14px", { "lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "600" }], "headline-lg-mobile": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600" }], "display-lg": ["44px", { "lineHeight": "52px", "letterSpacing": "-0.02em", "fontWeight": "700" }] } } } };</script></head><body class="bg-background font-body-md text-on-surface antialiased"><aside class="fixed left-0 top-0 h-full w-64 bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between pt-5 pb-6"><div class="flex flex-col gap-6"><div class="px-6 flex items-center gap-3"><img alt="Brand logo. - Primary color: #164a34
- Font: plusJakartaSans
- Mode: light
- Roundness: rounded-md
" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1UwvheEflVQETpVODXud1bKJQLTG3Z9V091WAQuRWb3OjkfynIYN40ImZHKnidhICqNkNrqFqpWKzSfZlgxI5J_M82iY6odlXGtsZTTc8HXdVBAz6ryKsSz-P5wU6ZoKTCO5D247hagw2iNx0PZZfjdthMC8zjpWAGLJh7xg4qo3i9LZdCn7j6gGxugjmJTrMiBN0EKKxLQuSsUMZx2F7LChrzofAoNzJDssH-iE5FNMrlgSgXlD6etBto"><div class="flex flex-col"><span class="font-title-lg text-primary tracking-tight leading-none">KrishiMitra</span><span class="font-label-sm text-secondary">Agri-Advisory OS</span></div></div><nav class="flex flex-col px-3 space-y-1" data-active-classes="bg-primary-container text-on-primary-container font-title-md"><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="dashboard" href="#"><span class="material-symbols-outlined text-[20px]">space_dashboard</span><span class="">Dashboard</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="my-farms" href="#"><span class="material-symbols-outlined text-[20px]">agriculture</span><span class="">My Farms</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="plans" href="#"><span class="material-symbols-outlined text-[20px]">calendar_month</span><span class="">Plans</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="compare" href="#"><span class="material-symbols-outlined text-[20px]">balance</span><span class="">Compare</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="recommendations" href="#"><span class="material-symbols-outlined text-[20px]">psychology_alt</span><span class="">Recommendations</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="resource-check" href="#"><span class="material-symbols-outlined text-[20px]">water_voc</span><span class="">Resource Check</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="reports" href="#"><span class="material-symbols-outlined text-[20px]">query_stats</span><span class="">Reports</span></a></nav></div><div class="px-4"><div class="p-3 bg-surface-container rounded-xl flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div><div class="flex flex-col min-w-0 flex-1"><span class="font-label-lg text-on-surface truncate">Ramesh Deshmukh</span><span class="font-label-sm text-on-surface-variant truncate">Shivaji Nagar Farm #2</span></div><span class="material-symbols-outlined text-on-surface-variant text-[18px]">unfold_more</span></div></div></aside><div class="pl-64"><header class="fixed top-0 left-64 right-0 h-16 shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-8 bg-surface"><div class="flex items-center gap-3"><img alt="Brand logo. - Primary color: #164a34
- Font: plusJakartaSans
- Mode: light
- Roundness: rounded-md
" class="h-7 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1UwvheEflVQETpVODXud1bKJQLTG3Z9V091WAQuRWb3OjkfynIYN40ImZHKnidhICqNkNrqFqpWKzSfZlgxI5J_M82iY6odlXGtsZTTc8HXdVBAz6ryKsSz-P5wU6ZoKTCO5D247hagw2iNx0PZZfjdthMC8zjpWAGLJh7xg4qo3i9LZdCn7j6gGxugjmJTrMiBN0EKKxLQuSsUMZx2F7LChrzofAoNzJDssH-iE5FNMrlgSgXlD6etBto"><span class="font-title-md text-on-surface hidden sm:inline">KrishiMitra Management</span></div><div class="flex items-center gap-4"><div class="flex items-center bg-surface-container px-2 py-1 rounded-lg"><span class="material-symbols-outlined text-[18px] text-on-surface-variant mr-1">translate</span><select class="bg-transparent font-label-md text-on-surface outline-none cursor-pointer pr-1"><option value="en">English</option><option value="hi">हिंदी</option><option value="mr">मराठी</option></select></div><button class="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-low rounded-lg font-label-md text-on-surface hover:bg-surface-container-high transition-colors"><span class="material-symbols-outlined text-[18px] text-secondary">wb_sunny</span><span class="">Nashik 28°C · Soil Wet</span></button><button class="p-2 text-on-surface-variant hover:text-on-surface transition-colors"><span class="material-symbols-outlined text-[22px]">notifications</span></button><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></header><main class="relative pt-16 w-full min-h-screen bg-transparent"><div class="flex flex-col w-full">
<!-- Subtle Ambient Glow Gradient (strictly contained) -->
<div class="relative w-full overflow-hidden">


<div class="max-w-[1280px] mx-auto px-6 lg:px-12 py-8 flex flex-col gap-10">
<!-- Breadcrumb & Top Utility Header -->
<section class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
<div class="flex flex-col gap-2">
<!-- Breadcrumb navigation -->
<nav aria-label="Breadcrumb" class="flex items-center gap-2 text-on-surface-variant font-label-md">
<a class="hover:text-primary transition-colors flex items-center gap-1" href="#">
<span class="material-symbols-outlined text-[16px]">calendar_month</span>
<span class="">Plans</span>
</a>
<span class="material-symbols-outlined text-[14px] text-outline-variant">chevron_right</span>
<span class="hover:text-primary transition-colors">Shivaji Patil Farm</span>
<span class="material-symbols-outlined text-[14px] text-outline-variant">chevron_right</span>
<span class="hover:text-primary transition-colors">Kharif-Rabi 2025</span>
<span class="material-symbols-outlined text-[14px] text-outline-variant">chevron_right</span>
<span class="text-primary font-title-md bg-secondary-container/50 px-2 py-0.5 rounded text-on-secondary-container">Why Did It Change?</span>
</nav>
<div class="flex items-baseline gap-3">
<span class="font-label-sm uppercase tracking-wider text-secondary font-title-md">Agronomic Differential Analysis</span>
<span class="inline-block w-1.5 h-1.5 rounded-full bg-secondary"></span>
<span class="font-label-sm text-on-surface-variant">Plot #4 · 8.5 Acres · Deep Black Cotton Soil</span>
</div>
<h1 class="font-headline-lg text-primary tracking-tight">Why is this plan different from your baseline?</h1>
<p class="font-body-md text-on-surface-variant max-w-3xl leading-relaxed">
            A transparent agronomic breakdown comparing your <span class="font-title-md text-on-surface">Baseline Furrow Wheat</span> against the proposed <span class="font-title-md text-secondary">Drip Precision Wheat</span> plan on 8.5 acres in Hingoli.
          </p>
</div>
<!-- Quick Top Action Controls -->
<div class="flex flex-wrap items-center gap-2.5 self-start md:self-center">
<button class="px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg transition-all flex items-center gap-2 shadow-sm">
<span class="material-symbols-outlined text-[18px]">arrow_back</span>
<span class="">Back to Plan Results</span>
</button>
<button class="px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg transition-all flex items-center gap-2 shadow-sm">
<span class="material-symbols-outlined text-[18px]">balance</span>
<span class="">Compare Plans</span>
</button>
<button class="px-4 py-2.5 rounded-xl bg-primary text-on-primary font-label-lg transition-all hover:bg-primary/90 flex items-center gap-2 shadow-md">
<span class="material-symbols-outlined text-[18px]">download_for_offline</span>
<span class="">Export Summary PDF</span>
</button>
</div>
</section>
<!-- 1. TOP COMPARISON STORYTELLING BANNER -->
<section class="relative rounded-3xl bg-surface-container-lowest p-6 lg:p-8 shadow-md transition-all">
<!-- Accent top border indicator via pseudo container -->
<div class="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8 relative z-10">
<!-- Baseline Card -->
<div class="flex-1 rounded-2xl bg-surface-container-low p-6 flex flex-col justify-between">
<div class="flex items-center justify-between pb-4">
<div class="flex items-center gap-2.5">
<span class="w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant font-label-md">01</span>
<div>
<span class="font-label-sm uppercase tracking-wider text-outline font-title-md">Previous Practice</span>
<h3 class="font-title-lg text-on-surface">Baseline Furrow Wheat</h3>
</div>
</div>
<span class="px-2.5 py-1 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm">Traditional Flood</span>
</div>
<div class="grid grid-cols-2 gap-4 py-4">
<div class="flex flex-col">
<span class="font-label-sm text-on-surface-variant">Net Household Profit</span>
<span class="font-headline-md text-on-surface font-title-md">₹1,46,300</span>
<span class="font-label-sm text-outline">₹17,211 / acre</span>
</div>
<div class="flex flex-col">
<span class="font-label-sm text-on-surface-variant">Water Consumption</span>
<span class="font-headline-md text-on-surface font-title-md">4,650 m³</span>
<span class="font-label-sm text-error font-title-md">High Evaporation</span>
</div>
<div class="flex flex-col">
<span class="font-label-sm text-on-surface-variant">Grain Yield Rate</span>
<span class="font-title-lg text-on-surface">19.1 Q/ac</span>
<span class="font-label-sm text-outline">162.3 Quintals gross</span>
</div>
<div class="flex flex-col">
<span class="font-label-sm text-on-surface-variant">Confidence &amp; Risk</span>
<div class="flex items-center gap-1.5">
<span class="font-title-lg text-on-surface">68 / 100</span>
<span class="inline-block w-2 h-2 rounded-full bg-outline"></span>
</div>
<span class="font-label-sm text-error font-title-md">Moderate Climate Risk</span>
</div>
</div>
<div class="pt-3 flex items-center gap-2 text-on-surface-variant font-label-sm">
<span class="material-symbols-outlined text-[16px] text-outline">history</span>
<span class="">Based on Kharif 2023 &amp; 2024 flood records in Hingoli block</span>
</div>
</div>
<!-- Transition Bridge Visual -->
<div class="flex lg:flex-col items-center justify-center gap-3 py-2 lg:py-0 px-2">
<div class="hidden lg:block w-0.5 h-10 bg-outline-variant"></div>
<div class="px-3 py-2 rounded-xl bg-secondary text-on-secondary shadow-md flex items-center gap-2 text-center">
<span class="material-symbols-outlined text-[20px]">trending_up</span>
<span class="font-label-md font-title-md whitespace-nowrap">+₹38,200 (+26%)</span>
</div>
<div class="flex flex-col items-center text-center">
<span class="font-label-sm text-secondary font-title-md">-1,200 m³ Water</span>
<span class="font-label-sm text-secondary font-title-md">+2.1 Q/ac Yield</span>
</div>
<div class="hidden lg:block w-0.5 h-10 bg-outline-variant"></div>
</div>
<!-- Target Plan Card -->
<div class="flex-1 rounded-2xl bg-primary-container text-on-primary p-6 flex flex-col justify-between shadow-xl relative overflow-hidden">
<div class="absolute -right-8 -bottom-8 w-44 h-44 bg-secondary/20 rounded-full blur-2xl pointer-events-none"></div>
<div class="flex items-center justify-between pb-4 relative z-10">
<div class="flex items-center gap-2.5">
<span class="w-7 h-7 rounded-full bg-on-primary-container/20 text-on-primary flex items-center justify-center font-label-md font-title-md">02</span>
<div>
<span class="font-label-sm uppercase tracking-wider text-on-primary-container font-title-md">Optimized Recommendation</span>
<h3 class="font-title-lg text-on-primary">Drip Precision Wheat</h3>
</div>
</div>
<span class="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm font-title-md flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">verified</span>
<span class="">Optimal Strategy</span>
</span>
</div>
<div class="grid grid-cols-2 gap-4 py-4 relative z-10">
<div class="flex flex-col">
<span class="font-label-sm text-on-primary-container">Projected Net Profit</span>
<span class="font-headline-md text-on-primary font-title-md">₹1,84,500</span>
<span class="font-label-sm text-secondary-fixed font-title-md">₹21,705 / acre (+₹4,494/ac)</span>
</div>
<div class="flex flex-col">
<span class="font-label-sm text-on-primary-container">Target Water Needed</span>
<span class="font-headline-md text-on-primary font-title-md">3,450 m³</span>
<span class="font-label-sm text-secondary-fixed font-title-md">26% Conserved to Well</span>
</div>
<div class="flex flex-col">
<span class="font-label-sm text-on-primary-container">Anticipated Yield</span>
<span class="font-title-lg text-on-primary">21.2 Q/ac</span>
<span class="font-label-sm text-on-primary-container">180.2 Quintals gross</span>
</div>
<div class="flex flex-col">
<span class="font-label-sm text-on-primary-container">Decision Robustness</span>
<div class="flex items-center gap-1.5">
<span class="font-title-lg text-on-primary">89 / 100</span>
<span class="inline-block w-2 h-2 rounded-full bg-secondary-fixed"></span>
</div>
<span class="font-label-sm text-secondary-fixed font-title-md">Resilient / Low Risk</span>
</div>
</div>
<div class="pt-3 flex items-center justify-between text-on-primary-container font-label-sm relative z-10">
<span class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px] text-secondary-fixed">eco</span>
<span class="">Aligned with Maharashtra Climate Smart Agri (PoCRA)</span>
</span>
<span class="font-label-sm text-on-primary">Nov 02 Sowing</span>
</div>
</div>
</div>
</section>
<!-- 2. DRIVER SUMMARY METRIC CHIPS -->
<section class="flex flex-col gap-3">
<div class="flex items-center justify-between">
<span class="font-title-md text-on-surface">Primary Drivers of the ₹38,200 Difference</span>
<span class="font-label-sm text-on-surface-variant">5 Cumulative Factors Modeled</span>
</div>
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
<!-- Chip 1: Water -->
<div class="rounded-2xl bg-surface-container-lowest p-4 flex flex-col gap-1 shadow-sm hover:shadow-md transition-all cursor-default">
<div class="flex items-center justify-between">
<span class="p-1.5 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
<span class="material-symbols-outlined text-[18px]">water_drop</span>
</span>
<span class="font-label-sm text-secondary font-title-md">+₹21,400</span>
</div>
<span class="font-label-md text-on-surface font-title-md mt-1">Water Management</span>
<span class="font-label-sm text-on-surface-variant line-clamp-2">Micro-drip saves 1,200 m³ &amp; protects critical root moisture</span>
</div>
<!-- Chip 2: Climate/Heat -->
<div class="rounded-2xl bg-surface-container-lowest p-4 flex flex-col gap-1 shadow-sm hover:shadow-md transition-all cursor-default">
<div class="flex items-center justify-between">
<span class="p-1.5 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
<span class="material-symbols-outlined text-[18px]">wb_sunny</span>
</span>
<span class="font-label-sm text-secondary font-title-md">+₹9,600</span>
</div>
<span class="font-label-md text-on-surface font-title-md mt-1">Sowing Calendar</span>
<span class="font-label-sm text-on-surface-variant line-clamp-2">16-day advance dodges February terminal heat spikes &gt;34°C</span>
</div>
<!-- Chip 3: Fertilizer -->
<div class="rounded-2xl bg-surface-container-lowest p-4 flex flex-col gap-1 shadow-sm hover:shadow-md transition-all cursor-default">
<div class="flex items-center justify-between">
<span class="p-1.5 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
<span class="material-symbols-outlined text-[18px]">grain</span>
</span>
<span class="font-label-sm text-secondary font-title-md">+₹11,200</span>
</div>
<span class="font-label-md text-on-surface font-title-md mt-1">Fertigation Efficiency</span>
<span class="font-label-sm text-on-surface-variant line-clamp-2">Split soluble fertigation slashes leaching losses by 35%</span>
</div>
<!-- Chip 4: Upfront Outlay -->
<div class="rounded-2xl bg-surface-container-lowest p-4 flex flex-col gap-1 shadow-sm hover:shadow-md transition-all cursor-default">
<div class="flex items-center justify-between">
<span class="p-1.5 rounded-lg bg-error-container text-on-error-container flex items-center justify-center">
<span class="material-symbols-outlined text-[18px]">credit_card</span>
</span>
<span class="font-label-sm text-error font-title-md">-₹17,000</span>
</div>
<span class="font-label-md text-on-surface font-title-md mt-1">Higher Staging Outlay</span>
<span class="font-label-sm text-on-surface-variant line-clamp-2">Working capital for drip inline maintenance &amp; certified seeds</span>
</div>
<!-- Chip 5: Total Net -->
<div class="rounded-2xl bg-primary-container text-on-primary p-4 flex flex-col gap-1 shadow-md hover:shadow-lg transition-all cursor-default">
<div class="flex items-center justify-between">
<span class="p-1.5 rounded-lg bg-secondary text-on-secondary flex items-center justify-center">
<span class="material-symbols-outlined text-[18px]">payments</span>
</span>
<span class="font-label-sm text-secondary-fixed font-title-md">ROI +217%</span>
</div>
<span class="font-label-md text-on-primary font-title-md mt-1">Net Gain Variance</span>
<span class="font-label-sm text-on-primary-container font-title-md">+₹38,200 household margin</span>
</div>
</div>
</section>
<!-- 3. LARGE ILLUSTRATED FACTOR REASON CARDS -->
<section class="flex flex-col gap-6">
<div class="flex items-center justify-between">
<div>
<h2 class="font-headline-md text-primary tracking-tight">The 4 Key Transformational Pillars</h2>
<p class="font-body-sm text-on-surface-variant">Detailed agronomic causality showing why the recommendation deviates from your routine.</p>
</div>
<span class="font-label-sm text-on-surface-variant hidden md:inline">Field Tested in Marathwada Agro-Climatic Zone</span>
</div>
<div class="flex flex-col gap-6">
<!-- Card 1: Irrigation Method & Water Availability -->
<article class="rounded-3xl bg-surface-container-lowest p-6 lg:p-8 shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row gap-8 items-start relative overflow-hidden">
<!-- Left accent bar -->
<div class="absolute left-0 top-0 bottom-0 w-2 bg-secondary"></div>
<!-- Left: Agronomic Breakdown (3-part structure) -->
<div class="flex-1 flex flex-col gap-6">
<!-- Header -->
<div class="flex flex-wrap items-center justify-between gap-3">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
<span class="material-symbols-outlined text-[24px]">water</span>
</div>
<div>
<span class="font-label-sm text-outline uppercase tracking-wider font-title-md">Pillar 01 · Irrigation Architecture</span>
<h3 class="font-title-lg text-on-surface">Shift from Flood Furrow to Micro-Drip + Inline Sprinkler</h3>
</div>
</div>
<span class="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md font-title-md flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px]">add_circle</span>
<span class="">Major Positive Driver · +₹21,400</span>
</span>
</div>
<!-- 3-Part Column Grid -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
<!-- Part 1: What Changed -->
<div class="flex flex-col gap-2 p-4 rounded-2xl bg-surface-container-low">
<div class="flex items-center gap-2 text-on-surface font-title-md">
<span class="material-symbols-outlined text-[18px] text-secondary">change_circle</span>
<span class="">What Changed</span>
</div>
<p class="font-body-sm text-on-surface-variant leading-relaxed">
                    Furrow irrigation leads to <span class="text-on-surface font-title-md">38% deep percolation</span> below root depth and heavy surface evaporation in Hingoli's dense black cotton soil. Drip delivers a metered 3,450 m³ directly to active feeder root zones.
                  </p>
</div>
<!-- Part 2: How It Affected Estimate -->
<div class="flex flex-col gap-2 p-4 rounded-2xl bg-surface-container-low">
<div class="flex items-center gap-2 text-on-surface font-title-md">
<span class="material-symbols-outlined text-[18px] text-tertiary-container">analytics</span>
<span class="">Agronomic Consequence</span>
</div>
<p class="font-body-sm text-on-surface-variant leading-relaxed">
                    Total seasonal water demand drops by <span class="text-secondary font-title-md">1,200 m³</span>, leaving a secure 2,750 m³ buffer in your 2 open wells. Eliminates severe moisture stress during early crown root initiation (CRI) and tillering phases.
                  </p>
</div>
<!-- Part 3: Next Steps -->
<div class="flex flex-col gap-2 p-4 rounded-2xl bg-surface-container">
<div class="flex items-center gap-2 text-on-surface font-title-md">
<span class="material-symbols-outlined text-[18px] text-primary">task_alt</span>
<span class="">What You Can Do Next</span>
</div>
<p class="font-body-sm text-on-surface leading-relaxed">
                    Confirm lateral spacing at <span class="font-title-md">1.2m</span> with 2.4 LPH emitters. Verify open well pump discharge rate with local technician before Nov 02.
                  </p>
</div>
</div>
<!-- Inline Key Metrics -->
<div class="flex flex-wrap items-center gap-6 pt-2 border-t border-surface-container">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary text-[20px]">water_drop</span>
<span class="font-title-md text-on-surface">1,200 m³</span>
<span class="font-body-sm text-on-surface-variant">Groundwater conserved</span>
</div>
<div class="w-1 h-1 rounded-full bg-outline-variant"></div>
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary text-[20px]">speed</span>
<span class="font-title-md text-on-surface">89%</span>
<span class="font-body-sm text-on-surface-variant">Application efficiency (vs 54% flood)</span>
</div>
<div class="w-1 h-1 rounded-full bg-outline-variant"></div>
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-tertiary-container text-[20px]">waves</span>
<span class="font-title-md text-on-surface">4.2 bar</span>
<span class="font-body-sm text-on-surface-variant">Optimal manifold operating pressure</span>
</div>
</div>
</div>
<!-- Right: Rich Inline Visual / Chart Representation -->
<div class="w-full lg:w-72 flex-shrink-0 flex flex-col gap-3 p-5 rounded-2xl bg-surface-container-low">
<span class="font-label-sm text-outline uppercase tracking-wider font-title-md">Water Utilization Profile</span>
<!-- Mini comparison bar chart SVG -->
<div class="w-full h-36 flex flex-col justify-end gap-3 pt-2">
<div class="flex items-center justify-between text-label-sm font-label-sm">
<span class="text-on-surface-variant">Flood Furrow</span>
<span class="text-on-surface font-title-md">4,650 m³</span>
</div>
<div class="w-full h-3.5 bg-surface-container-highest rounded-full overflow-hidden flex">
<div class="h-full bg-outline" style="width: 100%"></div>
</div>
<div class="flex items-center justify-between text-label-sm font-label-sm pt-2">
<span class="text-secondary font-title-md">Precision Drip</span>
<span class="text-secondary font-title-md">3,450 m³ (-26%)</span>
</div>
<div class="w-full h-3.5 bg-surface-container-highest rounded-full overflow-hidden flex">
<div class="h-full bg-secondary" style="width: 74%"></div>
</div>
</div>
<!-- Contextual callout note -->
<div class="mt-2 p-2.5 rounded-xl bg-surface-container text-label-sm text-on-surface-variant flex items-start gap-2">
<span class="material-symbols-outlined text-[16px] text-secondary flex-shrink-0 mt-0.5">info</span>
<span class="">Leaves sufficient reserve in Hingoli well to support an additional 2-acre summer moong catch crop.</span>
</div>
</div>
</article>
<!-- Card 2: Sowing Window & Terminal Heat Shielding -->
<article class="rounded-3xl bg-surface-container-lowest p-6 lg:p-8 shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row gap-8 items-start relative overflow-hidden">
<div class="absolute left-0 top-0 bottom-0 w-2 bg-secondary-fixed-dim"></div>
<div class="flex-1 flex flex-col gap-6">
<div class="flex flex-wrap items-center justify-between gap-3">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
<span class="material-symbols-outlined text-[24px]">thermostat</span>
</div>
<div>
<span class="font-label-sm text-outline uppercase tracking-wider font-title-md">Pillar 02 · Phenological Window</span>
<h3 class="font-title-lg text-on-surface">Calibrated Sowing Window (Nov 02 vs Nov 18)</h3>
</div>
</div>
<span class="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md font-title-md flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px]">shield</span>
<span class="">Climate Buffer Driver · +₹9,600</span>
</span>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
<div class="flex flex-col gap-2 p-4 rounded-2xl bg-surface-container-low">
<div class="flex items-center gap-2 text-on-surface font-title-md">
<span class="material-symbols-outlined text-[18px] text-secondary">schedule</span>
<span class="">What Changed</span>
</div>
<p class="font-body-sm text-on-surface-variant leading-relaxed">
                    Baseline assumed late sowing on Nov 18 waiting for canal rotations. The revised plan advances sowing to <span class="font-title-md text-on-surface">Nov 02</span>, utilizing stored open well water for land preparation and germination.
                  </p>
</div>
<div class="flex flex-col gap-2 p-4 rounded-2xl bg-surface-container-low">
<div class="flex items-center gap-2 text-on-surface font-title-md">
<span class="material-symbols-outlined text-[18px] text-tertiary-container">trending_up</span>
<span class="">Agronomic Consequence</span>
</div>
<p class="font-body-sm text-on-surface-variant leading-relaxed">
                    A 16-day advance shifts grain milk &amp; dough stages away from late February heat spikes (&gt;34°C). Yield forecast rises by <span class="text-secondary font-title-md">+1.4 Q/ac</span> purely by avoiding pinched, shriveled wheat kernels.
                  </p>
</div>
<div class="flex flex-col gap-2 p-4 rounded-2xl bg-surface-container">
<div class="flex items-center gap-2 text-on-surface font-title-md">
<span class="material-symbols-outlined text-[18px] text-primary">task_alt</span>
<span class="">What You Can Do Next</span>
</div>
<p class="font-body-sm text-on-surface leading-relaxed">
                    Schedule seedbed primary tilling and rotavation by <span class="font-title-md">Oct 28</span> to lock in subsoil residual moisture before seed drill operation.
                  </p>
</div>
</div>
<!-- Inline Key Metrics -->
<div class="flex flex-wrap items-center gap-6 pt-2 border-t border-surface-container">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary text-[20px]">calendar_today</span>
<span class="font-title-md text-on-surface">16 Days Gained</span>
<span class="font-body-sm text-on-surface-variant">Early vegetative root establishment</span>
</div>
<div class="w-1 h-1 rounded-full bg-outline-variant"></div>
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary text-[20px]">verified_user</span>
<span class="font-title-md text-on-surface">11% vs 42%</span>
<span class="font-body-sm text-on-surface-variant">Terminal heat stress probability reduced</span>
</div>
</div>
</div>
<!-- Right: Sowing timeline diagram -->
<div class="w-full lg:w-72 flex-shrink-0 flex flex-col gap-3 p-5 rounded-2xl bg-surface-container-low">
<span class="font-label-sm text-outline uppercase tracking-wider font-title-md">Grain Filling Heat Window</span>
<div class="relative py-2 flex flex-col gap-3">
<!-- Timeline diagram -->
<div class="flex flex-col gap-1.5">
<div class="flex justify-between text-label-sm">
<span class="text-on-surface-variant">Baseline (Late)</span>
<span class="text-error font-title-md">Feb 24 - Mar 08 (34°-37°C)</span>
</div>
<div class="w-full h-2.5 bg-surface-container-highest rounded-full relative">
<div class="absolute right-0 w-2/5 h-full bg-error rounded-full"></div>
</div>
<span class="text-label-sm text-error">Severe heat shriveling danger</span>
</div>
<div class="flex flex-col gap-1.5 pt-2">
<div class="flex justify-between text-label-sm">
<span class="text-secondary font-title-md">Drip Plan (Early)</span>
<span class="text-secondary font-title-md">Feb 08 - Feb 20 (27°-29°C)</span>
</div>
<div class="w-full h-2.5 bg-surface-container-highest rounded-full relative">
<div class="absolute left-1/4 w-1/3 h-full bg-secondary rounded-full"></div>
</div>
<span class="text-label-sm text-secondary">Optimal plump grain fill</span>
</div>
</div>
<div class="mt-2 p-2.5 rounded-xl bg-surface-container text-label-sm text-on-surface-variant">
<span class="">Certified GW-322 wheat variety responds optimally to early November soil temperatures (20°-22°C).</span>
</div>
</div>
</article>
<!-- Card 3: Nutrient Delivery & Fertigation Precision -->
<article class="rounded-3xl bg-surface-container-lowest p-6 lg:p-8 shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row gap-8 items-start relative overflow-hidden">
<div class="absolute left-0 top-0 bottom-0 w-2 bg-primary"></div>
<div class="flex-1 flex flex-col gap-6">
<div class="flex flex-wrap items-center justify-between gap-3">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
<span class="material-symbols-outlined text-[24px]">science</span>
</div>
<div>
<span class="font-label-sm text-outline uppercase tracking-wider font-title-md">Pillar 03 · Nutrient Dynamics</span>
<h3 class="font-title-lg text-on-surface">Soluble Fertigation vs Broadcast Synthetic Urea</h3>
</div>
</div>
<span class="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md font-title-md flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px]">psychology</span>
<span class="">Nutrient Uptake Driver · +₹11,200</span>
</span>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
<div class="flex flex-col gap-2 p-4 rounded-2xl bg-surface-container-low">
<div class="flex items-center gap-2 text-on-surface font-title-md">
<span class="material-symbols-outlined text-[18px] text-secondary">autorenew</span>
<span class="">What Changed</span>
</div>
<p class="font-body-sm text-on-surface-variant leading-relaxed">
                    Replaced heavy broadcast urea &amp; DAP applications with split micro-dosing of water-soluble fertilizers (19:19:19 &amp; 0:52:34) across <span class="font-title-md text-on-surface">4 specific vegetative stages</span>.
                  </p>
</div>
<div class="flex flex-col gap-2 p-4 rounded-2xl bg-surface-container-low">
<div class="flex items-center gap-2 text-on-surface font-title-md">
<span class="material-symbols-outlined text-[18px] text-tertiary-container">query_stats</span>
<span class="">Agronomic Consequence</span>
</div>
<p class="font-body-sm text-on-surface-variant leading-relaxed">
                    Nitrogen volatilization and leaching drop by <span class="text-secondary font-title-md">35%</span>. Active root absorption matches spike emergence timing, producing +14% productive tillers per running meter.
                  </p>
</div>
<div class="flex flex-col gap-2 p-4 rounded-2xl bg-surface-container">
<div class="flex items-center gap-2 text-on-surface font-title-md">
<span class="material-symbols-outlined text-[18px] text-primary">task_alt</span>
<span class="">What You Can Do Next</span>
</div>
<p class="font-body-sm text-on-surface leading-relaxed">
                    Procure soluble <span class="font-title-md">Grade 19:19:19</span> and bio-NPK consortia 10 days prior to first crown root irrigation (CRI at Day 21).
                  </p>
</div>
</div>
<!-- Inline Key Metrics -->
<div class="flex flex-wrap items-center gap-6 pt-2 border-t border-surface-container">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary text-[20px]">recycling</span>
<span class="font-title-md text-on-surface">35% Less Chemical Wastage</span>
<span class="font-body-sm text-on-surface-variant">Prevented nitrate groundwater leaching</span>
</div>
<div class="w-1 h-1 rounded-full bg-outline-variant"></div>
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary text-[20px]">fitness_center</span>
<span class="font-title-md text-on-surface">+2.1 Q/ac</span>
<span class="font-body-sm text-on-surface-variant">Proven test weight (1,000 grain weight: 41.5g)</span>
</div>
</div>
</div>
<!-- Right: Nutrient Efficiency Radial / Graphic -->
<div class="w-full lg:w-72 flex-shrink-0 flex flex-col gap-3 p-5 rounded-2xl bg-surface-container-low">
<span class="font-label-sm text-outline uppercase tracking-wider font-title-md">Fertilizer Absorption Ratio</span>
<div class="flex items-center justify-center py-3">
<div class="relative w-28 h-28 flex items-center justify-center">
<!-- Inline Circular Chart SVG -->
<svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
<path class="text-surface-container-highest" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3.5"></path>
<path class="text-secondary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-dasharray="78, 100" stroke-linecap="round" stroke-width="3.5"></path>
</svg>
<div class="absolute flex flex-col items-center justify-center">
<span class="font-headline-sm text-on-surface font-title-md">78%</span>
<span class="font-label-sm text-outline">Uptake</span>
</div>
</div>
</div>
<div class="text-center font-label-sm text-on-surface-variant">
                Broadcast conventional uptake sits at only <span class="text-on-surface font-title-md">43%</span> due to volatilization in dry weather.
              </div>
</div>
</article>
<!-- Card 4: Upfront Cash Outlay & Equipment Amortization -->
<article class="rounded-3xl bg-surface-container-lowest p-6 lg:p-8 shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row gap-8 items-start relative overflow-hidden">
<div class="absolute left-0 top-0 bottom-0 w-2 bg-error"></div>
<div class="flex-1 flex flex-col gap-6">
<div class="flex flex-wrap items-center justify-between gap-3">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-xl bg-error-container text-on-error-container flex items-center justify-center">
<span class="material-symbols-outlined text-[24px]">price_change</span>
</div>
<div>
<span class="font-label-sm text-outline uppercase tracking-wider font-title-md">Pillar 04 · Financial Outlay &amp; Working Capital</span>
<h3 class="font-title-lg text-on-surface">Higher Initial Operating &amp; Staging Cost</h3>
</div>
</div>
<span class="px-3 py-1 rounded-full bg-error-container text-on-error-container font-label-md font-title-md flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px]">warning</span>
<span class="">Input Cost Trade-Off · -₹17,000 Upfront</span>
</span>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
<div class="flex flex-col gap-2 p-4 rounded-2xl bg-surface-container-low">
<div class="flex items-center gap-2 text-on-surface font-title-md">
<span class="material-symbols-outlined text-[18px] text-error">receipt_long</span>
<span class="">What Changed</span>
</div>
<p class="font-body-sm text-on-surface-variant leading-relaxed">
                    Total initial input outlay rises from <span class="font-title-md text-on-surface">₹68,000 to ₹85,000</span>. This covers drip lateral flushing/gaskets, certified seed purchase, and specialized water-soluble fertilizers.
                  </p>
</div>
<div class="flex flex-col gap-2 p-4 rounded-2xl bg-surface-container-low">
<div class="flex items-center gap-2 text-on-surface font-title-md">
<span class="material-symbols-outlined text-[18px] text-secondary">account_balance_wallet</span>
<span class="">Agronomic Consequence</span>
</div>
<p class="font-body-sm text-on-surface-variant leading-relaxed">
                    Requires <span class="text-error font-title-md">₹17,000 more cash</span> in November. However, projected harvest gross jumps by <span class="text-secondary font-title-md">+₹55,200</span>, generating an attractive ₹2.17 return per extra rupee invested.
                  </p>
</div>
<div class="flex flex-col gap-2 p-4 rounded-2xl bg-surface-container">
<div class="flex items-center gap-2 text-on-surface font-title-md">
<span class="material-symbols-outlined text-[18px] text-primary">task_alt</span>
<span class="">What You Can Do Next</span>
</div>
<p class="font-body-sm text-on-surface leading-relaxed">
                    Claim <span class="font-title-md">MahaDBT Drip Maintenance Subsidy</span> (eligible for up to ₹8,500) or deploy zero-interest Kisan Credit Card (KCC) seasonal tranche before Oct 30.
                  </p>
</div>
</div>
<!-- Inline Key Metrics -->
<div class="flex flex-wrap items-center gap-6 pt-2 border-t border-surface-container">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-error text-[20px]">arrow_outward</span>
<span class="font-title-md text-on-surface">₹17,000</span>
<span class="font-body-sm text-on-surface-variant">Additional upfront capital required</span>
</div>
<div class="w-1 h-1 rounded-full bg-outline-variant"></div>
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary text-[20px]">currency_rupee</span>
<span class="font-title-md text-secondary">₹2.17 Recovered</span>
<span class="font-body-sm text-on-surface-variant">Per additional ₹1 spent in input staging</span>
</div>
</div>
</div>
<!-- Right: Capital Balance Card -->
<div class="w-full lg:w-72 flex-shrink-0 flex flex-col gap-3 p-5 rounded-2xl bg-surface-container-low">
<span class="font-label-sm text-outline uppercase tracking-wider font-title-md">Cash Flow Comparison</span>
<div class="space-y-3 pt-1">
<div class="flex justify-between items-center text-body-sm">
<span class="text-on-surface-variant">Baseline Cost</span>
<span class="font-title-md text-on-surface">₹68,000</span>
</div>
<div class="flex justify-between items-center text-body-sm">
<span class="text-on-surface-variant">Drip Plan Cost</span>
<span class="font-title-md text-on-surface">₹85,000</span>
</div>
<div class="flex justify-between items-center text-body-sm pt-2 border-t border-surface-container-highest">
<span class="font-title-md text-error">Additional Outlay</span>
<span class="font-title-md text-error">₹17,000</span>
</div>
<div class="flex justify-between items-center text-body-sm">
<span class="font-title-md text-secondary">Expected Extra Revenue</span>
<span class="font-title-md text-secondary">+₹55,200</span>
</div>
</div>
<div class="mt-2 p-2.5 rounded-xl bg-secondary-container/60 text-label-sm text-on-secondary-container">
<span class="font-title-md">Net Surplus: +₹38,200</span> after fully recouping the additional upfront costs.
              </div>
</div>
</article>
</div>
</section>
<!-- 4. SENSITIVITY "WHAT-IF" SIMULATION TOGGLES -->
<section class="rounded-3xl bg-surface-container p-6 lg:p-8 shadow-sm">
<div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6">
<div class="flex flex-col gap-1">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary text-[22px]">tune</span>
<h2 class="font-headline-md text-primary tracking-tight">Interactive Scenario Stress Test</h2>
</div>
<p class="font-body-sm text-on-surface-variant">
              What happens if Hingoli weather or markets deviate? See how each strategy holds up under unexpected farm conditions.
            </p>
</div>
<span class="font-label-sm bg-surface-container-lowest px-3 py-1.5 rounded-full text-on-surface-variant font-title-md shadow-sm">
            Live Algorithmic Simulator
          </span>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-5">
<!-- Scenario 1 -->
<div class="rounded-2xl bg-surface-container-lowest p-5 flex flex-col justify-between gap-4 shadow-sm hover:shadow-md transition-all">
<div class="flex flex-col gap-2">
<div class="flex items-center justify-between">
<span class="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm font-title-md">Water Delay</span>
<span class="material-symbols-outlined text-[18px] text-outline">sync_problem</span>
</div>
<h4 class="font-title-md text-on-surface">What if canal water release is delayed by 10 days?</h4>
<p class="font-body-sm text-on-surface-variant leading-relaxed">
                Canal schedules in Marathwada frequently shift due to upstream storage regulation.
              </p>
</div>
<div class="p-3 rounded-xl bg-surface-container-low flex flex-col gap-2">
<div class="flex items-center justify-between text-label-sm">
<span class="text-secondary font-title-md">Drip Plan</span>
<span class="font-title-md text-secondary">Retains 82% profit buffer</span>
</div>
<div class="flex items-center justify-between text-label-sm">
<span class="text-error font-title-md">Furrow Plan</span>
<span class="font-title-md text-error">Loses -₹24,000 profit</span>
</div>
<span class="font-label-sm text-on-surface-variant text-[11px] pt-1">
                Precision drip runs on well storage without canal dependency.
              </span>
</div>
</div>
<!-- Scenario 2 -->
<div class="rounded-2xl bg-surface-container-lowest p-5 flex flex-col justify-between gap-4 shadow-sm hover:shadow-md transition-all">
<div class="flex flex-col gap-2">
<div class="flex items-center justify-between">
<span class="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm font-title-md">Price Shock</span>
<span class="material-symbols-outlined text-[18px] text-outline">trending_down</span>
</div>
<h4 class="font-title-md text-on-surface">What if market price drops to MSP floor (₹2,275/Q)?</h4>
<p class="font-body-sm text-on-surface-variant leading-relaxed">
                Assuming local APMC wholesale rates slide from current ₹2,480 to statutory MSP.
              </p>
</div>
<div class="p-3 rounded-xl bg-surface-container-low flex flex-col gap-2">
<div class="flex items-center justify-between text-label-sm">
<span class="text-secondary font-title-md">Drip Plan</span>
<span class="font-title-md text-secondary">₹1,48,200 net margin</span>
</div>
<div class="flex items-center justify-between text-label-sm">
<span class="text-outline font-title-md">Furrow Plan</span>
<span class="font-title-md text-on-surface">₹1,14,000 net margin</span>
</div>
<span class="font-label-sm text-on-surface-variant text-[11px] pt-1">
                Higher yield volume (+2.1 Q/ac) shields baseline income comfortably.
              </span>
</div>
</div>
<!-- Scenario 3 -->
<div class="rounded-2xl bg-surface-container-lowest p-5 flex flex-col justify-between gap-4 shadow-sm hover:shadow-md transition-all">
<div class="flex flex-col gap-2">
<div class="flex items-center justify-between">
<span class="px-2.5 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm font-title-md">Unseasonal Rain</span>
<span class="material-symbols-outlined text-[18px] text-outline">thunderstorm</span>
</div>
<h4 class="font-title-md text-on-surface">What if November experiences unseasonal rain?</h4>
<p class="font-body-sm text-on-surface-variant leading-relaxed">
                Deep black cotton soil easily waterlogs, suffocating shallow wheat crown roots.
              </p>
</div>
<div class="p-3 rounded-xl bg-surface-container-low flex flex-col gap-2">
<div class="flex items-center justify-between text-label-sm">
<span class="text-secondary font-title-md">Raised Bed Drip</span>
<span class="font-title-md text-secondary">Drainage safe &amp; aerated</span>
</div>
<div class="flex items-center justify-between text-label-sm">
<span class="text-error font-title-md">Furrow Flatbed</span>
<span class="font-title-md text-error">18% root rot risk</span>
</div>
<span class="font-label-sm text-on-surface-variant text-[11px] pt-1">
                Broad bed furrows (BBF) facilitate rapid gravitational run-off.
              </span>
</div>
</div>
</div>
</section>
<!-- 5. AGRI-PHOTO CONTEXT & VISUAL STORY SECTION -->
<section class="grid grid-cols-1 lg:grid-cols-3 gap-6">
<!-- Photo 1: Deep Black Cotton Landscape of Hingoli -->
<div class="rounded-3xl bg-surface-container-lowest overflow-hidden shadow-sm flex flex-col">
<div class="relative h-48 w-full">
<img class="w-full h-full object-cover" data-alt="Vast high-angle view of lush green wheat and farmland in Hingoli Maharashtra, rolling black soil terrain with small irrigation canals, warm natural sunlight during golden hour, editorial agricultural photography." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvqp7S-chbELEdW1dMRR5USmofBtoKY9R1RIXFNp9Xm5KtmhDfzNyIgBsgYDN0FZwxsMPmmAnCiYug6py8hxBePef9I6i-xYqaTQ4BdYx2oNf7JkrtSSDvKgsU9q5096A-H7PIdwX6YDyVmcHEvcFXBom3vD8WztdZ5pcC-ehh2xIm2TNIStyuJkQRNifuD4GiMBF8w4svp1mHQRMv8LtgjEhlQ8RIYjih3CXGuBWJnCWHj11iPnX65w">
<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
<span class="absolute bottom-3 left-4 font-label-md text-on-primary font-title-md">Hingoli District Soil Baseline</span>
</div>
<div class="p-5 flex flex-col gap-2">
<span class="font-title-md text-on-surface">Deep Regur (Black Cotton) Soil Profile</span>
<p class="font-body-sm text-on-surface-variant leading-relaxed">
              High clay content (52%) allows superior water retention but risks root suffocation under traditional flooding. Precision drip keeps oxygen and moisture balanced.
            </p>
</div>
</div>
<!-- Photo 2: Micro Drip Irrigation Close-up -->
<div class="rounded-3xl bg-surface-container-lowest overflow-hidden shadow-sm flex flex-col">
<div class="relative h-48 w-full">
<img class="w-full h-full object-cover" data-alt="Close up photograph of clean modern black drip irrigation tubing along freshly prepared raised bed soil with crisp healthy young green wheat sprouts, moisture ring visible around emitter, bright crisp morning light." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUBYd_sB4dkyLLB-woPNnoGoRxkBXn0VTgU4GHp8rhORk-RXT5sjAUg7qEpE5v7DOKDRMOm95nKeRB6tYo4RC1PPj43ZEj92Qj5eCbVIIJnJ2gbzaEV8LZLlIQf__HVVS5hVcugIzlSD2k__p1Z574FMYeZ1Fzeup4IqJePSK7Qtzaw74TQ4ApigAJdIERjbPIk54f2aS0fhoMt_1aAHQABYDLF5syfKtQsEYRmhaGzdfcjKsNo8ybew">
<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
<span class="absolute bottom-3 left-4 font-label-md text-on-primary font-title-md">Precision Delivery</span>
</div>
<div class="p-5 flex flex-col gap-2">
<span class="font-title-md text-on-surface">Measured Root Zone Dosing</span>
<p class="font-body-sm text-on-surface-variant leading-relaxed">
              Water and dissolved nutrients reach 15-20cm active feeder roots without surface ponding or weed proliferation between crop lines.
            </p>
</div>
</div>
<!-- Photo 3: Farmer Inspecting Grain Quality -->
<div class="rounded-3xl bg-surface-container-lowest overflow-hidden shadow-sm flex flex-col">
<div class="relative h-48 w-full">
<img class="w-full h-full object-cover" data-alt="An Indian farmer in white khadi shirt inspecting healthy plump golden wheat spikes in a flourishing green field at sunset, confident expression, authentic rural Maharashtra setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCe2HsZlk0OWaiNYIgnl68llSAkdX4RBKWegTE-N5C40VHfN_XMMNKVzjO4TR3XB3K6SlFPRgyojQyEpBSo9gpm0D9vFKiJHoetg9du_zMJI6GEqRxl8_nkFw1-u-9JKQcUxvX3sTrSnl32lLWC37tkLHiDDYHYssa7cojPnFKoY8rKGxghHvWhI8kYQ0ZDG-pWA7q7nzSn-ToMw5TIhzh4BxoeULfDVPpQ0HbI6aEJScXG2SZYjHeK1w">
<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
<span class="absolute bottom-3 left-4 font-label-md text-on-primary font-title-md">Grain Quality Standard</span>
</div>
<div class="p-5 flex flex-col gap-2">
<span class="font-title-md text-on-surface">Higher APMC Market Realization</span>
<p class="font-body-sm text-on-surface-variant leading-relaxed">
              Eliminating terminal heat shriveling produces Grade-A golden wheat berries, commanding a ₹60-80 premium per quintal over standard flood harvest.
            </p>
</div>
</div>
</section>
<!-- 6. ACTIONABLE NEXT STEPS & FARMER AUTONOMY FOOTER -->
<footer class="rounded-3xl bg-primary-container text-on-primary p-6 lg:p-10 shadow-xl flex flex-col gap-8 relative overflow-hidden">

<div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10 border-b border-on-primary-container/20 pb-8">
<div class="flex flex-col gap-2 max-w-2xl">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary-fixed text-[24px]">verified</span>
<span class="font-title-lg text-on-primary">Decision Autonomy Guarantee</span>
</div>
<p class="font-body-md text-on-primary-container leading-relaxed">
              KrishiMitra explains the agronomic science and meteorological calculations behind each rupee. You know your land, finances, and labor best: <span class="text-on-primary font-title-md">every farm decision remains 100% your own.</span>
</p>
</div>
<!-- Primary Call to Action Controls -->
<div class="flex flex-wrap items-center gap-3">
<button class="px-6 py-3.5 rounded-xl bg-surface-container-low text-on-surface font-title-md hover:bg-surface-container-highest transition-all flex items-center gap-2 shadow-sm">
<span class="material-symbols-outlined text-[20px]">tune</span>
<span class="">Adjust Variables</span>
</button>
<button class="px-6 py-3.5 rounded-xl bg-secondary-fixed text-on-secondary-fixed font-title-md hover:bg-secondary-fixed/90 transition-all flex items-center gap-2 shadow-lg">
<span class="material-symbols-outlined text-[20px]">check_circle</span>
<span class="">Adopt Drip Wheat Plan</span>
</button>
</div>
</div>
<!-- Secondary Consultation & Governance Bar -->
<div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-on-primary-container font-label-sm relative z-10">
<div class="flex items-center gap-4 flex-wrap">
<a class="hover:text-on-primary flex items-center gap-1.5 transition-colors" href="#">
<span class="material-symbols-outlined text-[16px]">support_agent</span>
<span class="">Consult Local Hingoli KVK Agronomist</span>
</a>
<span class="text-on-primary-container/50">·</span>
<a class="hover:text-on-primary flex items-center gap-1.5 transition-colors" href="#">
<span class="material-symbols-outlined text-[16px]">account_balance</span>
<span class="">Check MahaDBT PMKSY Subsidy Status</span>
</a>
<span class="text-on-primary-container/50">·</span>
<a class="hover:text-on-primary flex items-center gap-1.5 transition-colors" href="#">
<span class="material-symbols-outlined text-[16px]">share</span>
<span class="">Share with Farm Partner</span>
</a>
</div>
<div class="flex items-center gap-1 text-[11px] text-on-primary-container/80">
<span class="material-symbols-outlined text-[14px]">info</span>
<span class="">Calculated using IMD Hingoli Agro-Met models, APMC market feeds &amp; Shivaji Patil Soil Card #2024-MH-712.</span>
</div>
</div>
</footer>
</div>
</div>
</div>
<script>
  // Simple reactive micro-interaction for quick plan toggling
  document.addEventListener('DOMContentLoaded', () => {
    const simulationCards = document.querySelectorAll('section article');
    simulationCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.classList.add('scale-[1.005]');
      });
      card.addEventListener('mouseleave', () => {
        card.classList.remove('scale-[1.005]');
      });
    });
  });
</script></main></div>

</body></html>
```

---

## `krishimitra_recommendations/code.html`

```html
<!DOCTYPE html><html lang="en" style=""><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"><meta content="web_dashboard" name="shell-type"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"><link href="https://fonts.googleapis.com" rel="preconnect"><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "secondary-fixed-dim": "#88d8a0", "on-tertiary-fixed": "#001f29", "tertiary-fixed-dim": "#84d1f0", "on-tertiary-fixed-variant": "#004d62", "on-secondary-fixed": "#00210e", "on-primary": "#ffffff", "on-surface-variant": "#404943", "tertiary-fixed": "#baeaff", "surface-container-low": "#f5f3ed", "error-container": "#ffdad6", "primary-fixed-dim": "#9dd2b5", "inverse-surface": "#30312d", "inverse-on-surface": "#f3f1eb", "tertiary-container": "#00475a", "on-error": "#ffffff", "secondary-fixed": "#a4f4ba", "primary-fixed": "#b9efd0", "primary-container": "#164a34", "on-primary-fixed": "#002113", "outline": "#717973", "background": "#fbf9f3", "on-surface": "#1b1c18", "surface": "#fbf9f3", "on-tertiary-container": "#6ab7d5", "tertiary": "#002f3d", "surface-container-lowest": "#ffffff", "surface-variant": "#e4e2dd", "secondary-container": "#a1f1b7", "on-secondary-container": "#1f7042", "error": "#ba1a1a", "outline-variant": "#c0c9c1", "surface-tint": "#366850", "on-error-container": "#93000a", "on-secondary-fixed-variant": "#00522b", "primary": "#003320", "on-background": "#1b1c18", "on-primary-fixed-variant": "#1d5039", "surface-dim": "#dcdad4", "surface-container": "#f0eee8", "on-primary-container": "#85b99c", "secondary": "#196c3e", "surface-bright": "#fbf9f3", "inverse-primary": "#9dd2b5", "surface-container-highest": "#e4e2dd", "surface-container-high": "#eae8e2", "on-secondary": "#ffffff", "on-tertiary": "#ffffff" }, "borderRadius": { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" }, "spacing": { "space-xl": "2.5rem", "space-md": "1rem", "gutter-mobile": "1rem", "gutter": "1.5rem", "margin-mobile": "1rem", "margin": "3rem", "space-sm": "0.5rem", "space-xs": "0.25rem", "space-lg": "1.5rem" }, "fontFamily": { "title-md": ["Plus Jakarta Sans"], "body-md": ["Plus Jakarta Sans"], "headline-md": ["Plus Jakarta Sans"], "headline-sm": ["Plus Jakarta Sans"], "title-lg": ["Plus Jakarta Sans"], "headline-lg": ["Plus Jakarta Sans"], "body-lg": ["Plus Jakarta Sans"], "label-md": ["Plus Jakarta Sans"], "body-sm": ["Plus Jakarta Sans"], "display-lg-mobile": ["Plus Jakarta Sans"], "label-sm": ["Plus Jakarta Sans"], "label-lg": ["Plus Jakarta Sans"], "headline-lg-mobile": ["Plus Jakarta Sans"], "display-lg": ["Plus Jakarta Sans"] }, "fontSize": { "title-md": ["16px", { "lineHeight": "24px", "fontWeight": "600" }], "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }], "headline-md": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600" }], "headline-sm": ["20px", { "lineHeight": "28px", "fontWeight": "600" }], "title-lg": ["18px", { "lineHeight": "26px", "fontWeight": "600" }], "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700" }], "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }], "label-md": ["12px", { "lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "600" }], "body-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }], "display-lg-mobile": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700" }], "label-sm": ["11px", { "lineHeight": "14px", "letterSpacing": "0.02em", "fontWeight": "500" }], "label-lg": ["14px", { "lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "600" }], "headline-lg-mobile": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600" }], "display-lg": ["44px", { "lineHeight": "52px", "letterSpacing": "-0.02em", "fontWeight": "700" }] } } } };</script></head><body class="bg-background font-body-md text-on-surface antialiased"><aside class="fixed left-0 top-0 h-full w-64 bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between pt-5 pb-6"><div class="flex flex-col gap-6"><div class="px-6 flex items-center gap-3"><img alt="Brand logo. - Primary color: #164a34
- Font: plusJakartaSans
- Mode: light
- Roundness: rounded-md
" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1UwvheEflVQETpVODXud1bKJQLTG3Z9V091WAQuRWb3OjkfynIYN40ImZHKnidhICqNkNrqFqpWKzSfZlgxI5J_M82iY6odlXGtsZTTc8HXdVBAz6ryKsSz-P5wU6ZoKTCO5D247hagw2iNx0PZZfjdthMC8zjpWAGLJh7xg4qo3i9LZdCn7j6gGxugjmJTrMiBN0EKKxLQuSsUMZx2F7LChrzofAoNzJDssH-iE5FNMrlgSgXlD6etBto"><div class="flex flex-col"><span class="font-title-lg text-primary tracking-tight leading-none">KrishiMitra</span><span class="font-label-sm text-secondary">Agri-Advisory OS</span></div></div><nav class="flex flex-col px-3 space-y-1" data-active-classes="bg-primary-container text-on-primary-container font-title-md"><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="dashboard" href="#"><span class="material-symbols-outlined text-[20px]">space_dashboard</span><span class="">Dashboard</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="my-farms" href="#"><span class="material-symbols-outlined text-[20px]">agriculture</span><span class="">My Farms</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="plans" href="#"><span class="material-symbols-outlined text-[20px]">calendar_month</span><span class="">Plans</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="compare" href="#"><span class="material-symbols-outlined text-[20px]">balance</span><span class="">Compare</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="recommendations" href="#"><span class="material-symbols-outlined text-[20px]">psychology_alt</span><span class="">Recommendations</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="resource-check" href="#"><span class="material-symbols-outlined text-[20px]">water_voc</span><span class="">Resource Check</span></a><a class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="reports" href="#"><span class="material-symbols-outlined text-[20px]">query_stats</span><span class="">Reports</span></a></nav></div><div class="px-4"><div class="p-3 bg-surface-container rounded-xl flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div><div class="flex flex-col min-w-0 flex-1"><span class="font-label-lg text-on-surface truncate">Ramesh Deshmukh</span><span class="font-label-sm text-on-surface-variant truncate">Shivaji Nagar Farm #2</span></div><span class="material-symbols-outlined text-on-surface-variant text-[18px]">unfold_more</span></div></div></aside><div class="pl-64"><header class="fixed top-0 left-64 right-0 h-16 bg-surface/90 shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-8"><div class="flex items-center gap-3"><img alt="Brand logo. - Primary color: #164a34
- Font: plusJakartaSans
- Mode: light
- Roundness: rounded-md
" class="h-7 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1UwvheEflVQETpVODXud1bKJQLTG3Z9V091WAQuRWb3OjkfynIYN40ImZHKnidhICqNkNrqFqpWKzSfZlgxI5J_M82iY6odlXGtsZTTc8HXdVBAz6ryKsSz-P5wU6ZoKTCO5D247hagw2iNx0PZZfjdthMC8zjpWAGLJh7xg4qo3i9LZdCn7j6gGxugjmJTrMiBN0EKKxLQuSsUMZx2F7LChrzofAoNzJDssH-iE5FNMrlgSgXlD6etBto"><span class="font-title-md text-on-surface hidden sm:inline">KrishiMitra Management</span></div><div class="flex items-center gap-4"><div class="flex items-center bg-surface-container px-2 py-1 rounded-lg"><span class="material-symbols-outlined text-[18px] text-on-surface-variant mr-1">translate</span><select class="bg-transparent font-label-md text-on-surface outline-none cursor-pointer pr-1"><option value="en">English</option><option value="hi">हिंदी</option><option value="mr">मराठी</option></select></div><button class="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-low rounded-lg font-label-md text-on-surface hover:bg-surface-container-high transition-colors"><span class="material-symbols-outlined text-[18px] text-secondary">wb_sunny</span><span class="">Nashik 28°C · Soil Wet</span></button><button class="p-2 text-on-surface-variant hover:text-on-surface transition-colors"><span class="material-symbols-outlined text-[22px]">notifications</span></button><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></header><main class="relative pt-16 w-full min-h-screen bg-surface"><div class="flex flex-col w-full">
<!-- Subtle decorative ambient elements -->
<div class="relative w-full overflow-hidden">


<!-- Main Container -->
<div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
<!-- Breadcrumbs & Plan Context Meta -->
<div class="flex flex-wrap items-center justify-between gap-4">
<nav aria-label="Breadcrumb" class="flex items-center space-x-2 text-on-surface-variant font-label-md">
<a class="hover:text-primary transition-colors" href="#">Plans</a>
<span class="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
<a class="hover:text-primary transition-colors" href="#">Shivaji Patil Farm</a>
<span class="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
<span class="text-on-surface-variant font-label-md">Kharif-Rabi 2025</span>
<span class="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
<span class="text-primary font-label-md font-semibold">Agronomic Advisory &amp; Recommendations</span>
</nav>
<div class="flex items-center gap-2">
<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
            Active Target: Drip Precision Wheat (Optimized)
          </span>
<span class="hidden sm:inline-block text-outline text-label-sm">|</span>
<span class="hidden sm:inline-flex items-center gap-1 text-on-surface-variant font-label-sm">
<span class="material-symbols-outlined text-[16px] text-outline">tune</span>
            Compared against Baseline Furrow
          </span>
</div>
</div>
<!-- Header & Summary Hero Banner -->
<section class="relative bg-surface-container-lowest rounded-2xl p-6 lg:p-8 shadow-sm overflow-hidden">
<div class="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
<div class="max-w-3xl space-y-3">
<div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-surface-container text-primary font-label-sm">
<span class="material-symbols-outlined text-[16px] text-secondary">psychology_alt</span>
<span class="">Autonomous Agronomic Intelligence Engine</span>
</div>
<h1 class="font-display-lg text-primary tracking-tight">Agronomic Recommendations &amp; Advisory</h1>
<p class="font-body-md text-on-surface-variant leading-relaxed">
              Personalized, field-tested guidance synthesized from Hingoli microclimate data, satellite soil moisture, and your farm's 6,200 m³ water capacity. Built on clear, practical actions to maximize profit, conserve water, and mitigate climate shocks.
            </p>
</div>
<!-- Farm Key Spec Badge -->
<div class="flex lg:flex-col items-center lg:items-end justify-between gap-3 p-4 rounded-xl bg-surface-container-low shrink-0">
<div class="text-left lg:text-right">
<span class="font-label-sm text-on-surface-variant uppercase tracking-wider block">Farm Specification</span>
<span class="font-title-md text-primary block">8.5 Acres · Deep Regur (Black Cotton)</span>
<span class="font-label-sm text-secondary font-medium">Hingoli Taluka, Maharashtra</span>
</div>
<div class="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[20px]">terrain</span>
</div>
</div>
</div>
<!-- 3 Quick-Metric Status & Impact Cards -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6">
<!-- Metric 1: Urgent Actions -->
<div class="relative bg-surface-container-low p-5 rounded-xl flex items-start gap-4 transition-all duration-300 hover:shadow-md">
<div class="w-12 h-12 rounded-xl bg-error-container text-on-error-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[24px]">crisis_alert</span>
</div>
<div class="space-y-1">
<div class="flex items-center gap-2">
<span class="font-headline-md text-on-surface tracking-tight">2 Items</span>
<span class="px-2 py-0.5 rounded-full bg-error text-on-error font-label-sm">Urgent</span>
</div>
<span class="font-title-md text-on-surface block">Critical Actions Pending</span>
<p class="font-body-sm text-on-surface-variant">Decisions requiring resolution prior to sowing kickoff on Nov 02.</p>
</div>
</div>
<!-- Metric 2: Potential Profit -->
<div class="relative bg-surface-container-low p-5 rounded-xl flex items-start gap-4 transition-all duration-300 hover:shadow-md">
<div class="w-12 h-12 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[24px]">trending_up</span>
</div>
<div class="space-y-1">
<div class="flex items-center gap-2">
<span class="font-headline-md text-secondary tracking-tight">+₹24,800</span>
<span class="px-2 py-0.5 rounded-full bg-secondary/15 text-primary font-label-sm">+18.4%</span>
</div>
<span class="font-title-md text-on-surface block">Potential Value Unlock</span>
<p class="font-body-sm text-on-surface-variant">Combined net return upside if all 5 operational optimizations are adopted.</p>
</div>
</div>
<!-- Metric 3: Water Security -->
<div class="relative bg-surface-container-low p-5 rounded-xl flex items-start gap-4 transition-all duration-300 hover:shadow-md">
<div class="w-12 h-12 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[24px]">water_ec</span>
</div>
<div class="space-y-1">
<div class="flex items-center gap-2">
<span class="font-headline-md text-tertiary tracking-tight">+420 m³</span>
<span class="px-2 py-0.5 rounded-full bg-tertiary/10 text-tertiary font-label-sm">Safe Margin</span>
</div>
<span class="font-title-md text-on-surface block">Water Security Impact</span>
<p class="font-body-sm text-on-surface-variant">Additional contingency reserve gained against late-season canal cutoffs.</p>
</div>
</div>
</div>
<!-- Filter / Category Tabs -->
<div class="flex flex-wrap items-center gap-2 mt-8 pt-6">
<button class="category-tab px-4 py-2 rounded-xl font-label-lg transition-all duration-200 bg-primary text-on-primary shadow-sm flex items-center gap-2" id="tab-all" onclick="filterCards('all')">
<span class="">All Recommendations</span>
<span class="px-1.5 py-0.2 rounded-full bg-surface/20 text-on-primary font-label-sm">7</span>
</button>
<button class="category-tab px-4 py-2 rounded-xl font-label-lg transition-all duration-200 bg-surface-container text-on-surface hover:bg-surface-container-high flex items-center gap-2" id="tab-attention" onclick="filterCards('attention')">
<span class="w-2 h-2 rounded-full bg-error"></span>
<span class="">Needs Attention</span>
<span class="px-1.5 py-0.2 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm">2</span>
</button>
<button class="category-tab px-4 py-2 rounded-xl font-label-lg transition-all duration-200 bg-surface-container text-on-surface hover:bg-surface-container-high flex items-center gap-2" id="tab-improve" onclick="filterCards('improve')">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
<span class="">Can Improve</span>
<span class="px-1.5 py-0.2 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm">3</span>
</button>
<button class="category-tab px-4 py-2 rounded-xl font-label-lg transition-all duration-200 bg-surface-container text-on-surface hover:bg-surface-container-high flex items-center gap-2" id="tab-advice" onclick="filterCards('advice')">
<span class="w-2 h-2 rounded-full bg-tertiary"></span>
<span class="">Helpful Advice</span>
<span class="px-1.5 py-0.2 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm">2</span>
</button>
<div class="ml-auto flex items-center gap-2 text-on-surface-variant font-label-sm">
<span class="material-symbols-outlined text-[18px]">verified</span>
<span class="">Synthesized 4 hours ago via Hingoli IMD Radar</span>
</div>
</div>
</section>
<!-- SECTION 1: Needs Attention (Urgent Pre-Sowing Decisions) -->
<section class="recommendation-section space-y-4" id="section-attention">
<div class="flex items-center justify-between">
<div class="flex items-center gap-3">
<div class="w-3 h-7 bg-error rounded-full"></div>
<div>
<h2 class="font-headline-md text-on-surface">Needs Attention</h2>
<p class="font-body-sm text-on-surface-variant">Urgent agronomic bottlenecks that threaten initial germination &amp; late grain-filling buffer.</p>
</div>
</div>
<span class="px-3 py-1 rounded-full bg-error-container text-on-error-container font-label-sm font-semibold">2 Critical Deadlines</span>
</div>
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
<!-- Card 1: Water Buffer -->
<article class="recommendation-card group relative bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-lg">
<!-- Left priority indicator -->
<div class="absolute left-0 top-6 bottom-6 w-1.5 bg-error rounded-r-full"></div>
<div class="space-y-4 pl-3">
<div class="flex flex-wrap items-center justify-between gap-2">
<div class="flex items-center gap-2">
<span class="px-2.5 py-1 rounded-md bg-error text-on-error font-label-sm uppercase tracking-wider font-semibold">High Priority</span>
<span class="px-2.5 py-1 rounded-md bg-surface-container text-on-surface-variant font-label-sm">Before Oct 28</span>
</div>
<span class="inline-flex items-center gap-1 text-on-surface-variant font-label-sm">
<span class="material-symbols-outlined text-[16px] text-error">timer</span>
<span class="">5 Days Remaining</span>
</span>
</div>
<div>
<h3 class="font-title-lg text-primary tracking-tight">Arrange 420 m³ Additional Open-Well Contingency Buffer</h3>
<p class="font-body-sm text-on-surface-variant mt-0.5">Hydrological vulnerability detected in Secondary Open Well #2</p>
</div>
<!-- 3 Structured Fields -->
<div class="space-y-3 pt-2">
<div class="p-3.5 rounded-xl bg-surface-container-low space-y-1">
<div class="flex items-center gap-2 text-on-surface font-label-md">
<span class="material-symbols-outlined text-[18px] text-error">warning</span>
<span class="">The Issue</span>
</div>
<p class="font-body-sm text-on-surface-variant leading-relaxed">
                    Secondary open well #2 shows 18% lower recharge rate post-monsoon than the 5-year average. Field runoff sensors indicate partial siltation at the inlet junction.
                  </p>
</div>
<div class="p-3.5 rounded-xl bg-surface-container-low space-y-1">
<div class="flex items-center gap-2 text-on-surface font-label-md">
<span class="material-symbols-outlined text-[18px] text-primary">analytics</span>
<span class="">Why It Matters</span>
</div>
<p class="font-body-sm text-on-surface-variant leading-relaxed">
                    If February canal rotation is delayed by &gt;7 days, late grain-filling stage could suffer a 1.8 Quintal/acre pinch loss, wiping out high-test wheat kernel premiums.
                  </p>
</div>
<div class="p-3.5 rounded-xl bg-surface-container-low space-y-1">
<div class="flex items-center gap-2 text-on-surface font-label-md">
<span class="material-symbols-outlined text-[18px] text-secondary">task_alt</span>
<span class="">Suggested Action</span>
</div>
<p class="font-body-sm text-on-surface-variant leading-relaxed">
                    Desilt canal feeder ditch before Oct 28 or coordinate micro-storage swap with neighboring plot #5 (Pawar Farm) via existing 2.5-inch underground lateral.
                  </p>
</div>
</div>
</div>
<!-- Bottom Impact & CTAs -->
<div class="mt-6 pt-4 pl-3 space-y-4">
<div class="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-lg bg-error-container/40">
<div class="flex items-center gap-2 text-on-error-container font-label-md">
<span class="material-symbols-outlined text-[18px]">verified_user</span>
<span class="">Impact: Secures ₹16,200 harvest value</span>
</div>
<span class="font-label-sm text-error font-semibold">Buffer needed: 420 m³</span>
</div>
<div class="flex flex-col sm:flex-row items-center gap-3">
<button class="w-full sm:flex-1 py-3 px-4 rounded-xl bg-primary text-on-primary font-label-lg hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center gap-2" onclick="applySingleRecommendation('rec-well-buffer', this)">
<span class="material-symbols-outlined text-[18px]">check_circle</span>
<span class="">Apply to Active Plan</span>
</button>
<button class="w-full sm:w-auto py-3 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg transition-colors flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-[18px]">share_location</span>
<span class="">Coordinate Plot #5</span>
</button>
</div>
</div>
</article>
<!-- Card 2: Seed & Bio-Fungicide Pre-order -->
<article class="recommendation-card group relative bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-lg">
<!-- Left priority indicator -->
<div class="absolute left-0 top-6 bottom-6 w-1.5 bg-error rounded-r-full"></div>
<div class="space-y-4 pl-3">
<div class="flex flex-wrap items-center justify-between gap-2">
<div class="flex items-center gap-2">
<span class="px-2.5 py-1 rounded-md bg-error text-on-error font-label-sm uppercase tracking-wider font-semibold">Time-Sensitive</span>
<span class="px-2.5 py-1 rounded-md bg-surface-container text-on-surface-variant font-label-sm">Before Oct 29</span>
</div>
<span class="inline-flex items-center gap-1 text-on-surface-variant font-label-sm">
<span class="material-symbols-outlined text-[16px] text-error">inventory</span>
<span class="">Stock Running Low</span>
</span>
</div>
<div>
<h3 class="font-title-lg text-primary tracking-tight">Pre-Order Certified Sonalika HD-2967 Seed &amp; Seed Treatment Bio-Fungicide</h3>
<p class="font-body-sm text-on-surface-variant mt-0.5">Biological pathogen shield for black cotton soil</p>
</div>
<!-- 3 Structured Fields -->
<div class="space-y-3 pt-2">
<div class="p-3.5 rounded-xl bg-surface-container-low space-y-1">
<div class="flex items-center gap-2 text-on-surface font-label-md">
<span class="material-symbols-outlined text-[18px] text-error">warning</span>
<span class="">The Issue</span>
</div>
<p class="font-body-sm text-on-surface-variant leading-relaxed">
                    Local APMC certified seed stock is reporting high early demand; untreated seed carries 22% risk of loose smut and foot rot in heavy regur clay conditions.
                  </p>
</div>
<div class="p-3.5 rounded-xl bg-surface-container-low space-y-1">
<div class="flex items-center gap-2 text-on-surface font-label-md">
<span class="material-symbols-outlined text-[18px] text-primary">analytics</span>
<span class="">Why It Matters</span>
</div>
<p class="font-body-sm text-on-surface-variant leading-relaxed">
                    Germination rate drops drastically from 92% to 74% if uncertified farm-saved seed is used without Trichoderma treatment, requiring costly re-sowing.
                  </p>
</div>
<div class="p-3.5 rounded-xl bg-surface-container-low space-y-1">
<div class="flex items-center gap-2 text-on-surface font-label-md">
<span class="material-symbols-outlined text-[18px] text-secondary">task_alt</span>
<span class="">Suggested Action</span>
</div>
<p class="font-body-sm text-on-surface-variant leading-relaxed">
                    Procure 340 kg certified seed from Hingoli Taluka Krishi Kendra and treat with Trichoderma viride (5g/kg seed) 24 hours prior to sowing on Nov 02.
                  </p>
</div>
</div>
</div>
<!-- Bottom Impact & CTAs -->
<div class="mt-6 pt-4 pl-3 space-y-4">
<div class="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-lg bg-surface-container-high">
<div class="flex items-center gap-2 text-on-surface font-label-md">
<span class="material-symbols-outlined text-[18px] text-secondary">verified</span>
<span class="">Assures 94% germination fidelity</span>
</div>
<span class="font-label-sm text-on-surface-variant font-medium">Estimated Input: ₹14,200</span>
</div>
<div class="flex flex-col sm:flex-row items-center gap-3">
<button class="w-full sm:flex-1 py-3 px-4 rounded-xl bg-primary text-on-primary font-label-lg hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center gap-2" onclick="applySingleRecommendation('rec-seed-procure', this)">
<span class="material-symbols-outlined text-[18px]">check_circle</span>
<span class="">Apply to Active Plan</span>
</button>
<button class="w-full sm:w-auto py-3 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg transition-colors flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-[18px]">storefront</span>
<span class="">Locate Kendra Dealer</span>
</button>
</div>
</div>
</article>
</div>
</section>
<!-- SECTION 2: Can Improve (Efficiency, Margin & Resource Optimization) -->
<section class="recommendation-section space-y-4" id="section-improve">
<div class="flex items-center justify-between">
<div class="flex items-center gap-3">
<div class="w-3 h-7 bg-secondary rounded-full"></div>
<div>
<h2 class="font-headline-md text-on-surface">Can Improve</h2>
<p class="font-body-sm text-on-surface-variant">High-leverage upgrades to cut fertilizer waste, leverage winter temperatures, and streamline drip lines.</p>
</div>
</div>
<span class="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm font-semibold">3 Optimizations</span>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
<!-- Card 3: Split Fertigation -->
<article class="recommendation-card group relative bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-lg">
<div class="absolute left-0 top-6 bottom-6 w-1.5 bg-secondary rounded-r-full"></div>
<div class="space-y-4 pl-3">
<div class="flex items-center justify-between">
<span class="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm font-medium">Input Efficiency</span>
<span class="material-symbols-outlined text-[20px] text-secondary">compost</span>
</div>
<div>
<h3 class="font-title-lg text-primary tracking-tight">Transition to Split Fertigation with 19:19:19 &amp; Bio-NPK</h3>
<p class="font-body-sm text-on-surface-variant mt-0.5">Eliminates dry urea leaching</p>
</div>
<!-- 3 Structured Fields -->
<div class="space-y-2.5 text-body-sm">
<div class="p-3 rounded-xl bg-surface-container-low">
<span class="font-label-sm text-on-surface font-semibold block mb-0.5">The Issue</span>
<p class="text-on-surface-variant text-body-sm">Granular urea broadcasting causes 35% atmospheric volatilization and nitrate runoff in warm dry conditions.</p>
</div>
<div class="p-3 rounded-xl bg-surface-container-low">
<span class="font-label-sm text-on-surface font-semibold block mb-0.5">Why It Matters</span>
<p class="text-on-surface-variant text-body-sm">Direct root-zone fertigation delivers nutrients during critical Crown Root Initiation (CRI) with 78% absorption efficiency.</p>
</div>
<div class="p-3 rounded-xl bg-surface-container-low">
<span class="font-label-sm text-on-surface font-semibold block mb-0.5">Suggested Action</span>
<p class="text-on-surface-variant text-body-sm">Install Venturi injector on drip main line and stage water-soluble dosing across Day 21, Day 45, and Day 70.</p>
</div>
</div>
</div>
<div class="mt-6 pt-4 pl-3 space-y-4">
<!-- Inline Data visualization: Fertilizer Savings -->
<div class="p-3 rounded-xl bg-surface-container flex items-center justify-between">
<div class="flex items-center gap-2.5">
<!-- Micro circular chart -->
<svg class="w-8 h-8 text-secondary" viewBox="0 0 36 36">
<path class="text-outline-variant" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3.8"></path>
<path class="text-secondary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-dasharray="35, 100" stroke-linecap="round" stroke-width="3.8"></path>
</svg>
<div>
<span class="font-label-md text-on-surface block leading-tight">+₹11,200 Margin Gain</span>
<span class="font-label-sm text-on-surface-variant">-35% synthetic chemical load</span>
</div>
</div>
</div>
<button class="w-full py-2.5 px-4 rounded-xl bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label-lg transition-all flex items-center justify-center gap-2" onclick="applySingleRecommendation('rec-fertigation', this)">
<span class="material-symbols-outlined text-[18px]">add_circle</span>
<span class="">Use in New Plan</span>
</button>
</div>
</article>
<!-- Card 4: Sowing Window Shift -->
<article class="recommendation-card group relative bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-lg">
<div class="absolute left-0 top-6 bottom-6 w-1.5 bg-secondary rounded-r-full"></div>
<div class="space-y-4 pl-3">
<div class="flex items-center justify-between">
<span class="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm font-medium">Climate Timing</span>
<span class="material-symbols-outlined text-[20px] text-secondary">calendar_today</span>
</div>
<div>
<h3 class="font-title-lg text-primary tracking-tight">Shift Sowing Window 14 Days Earlier to November 02</h3>
<p class="font-body-sm text-on-surface-variant mt-0.5">Beat late-season Marathwada heat waves</p>
</div>
<!-- 3 Structured Fields -->
<div class="space-y-2.5 text-body-sm">
<div class="p-3 rounded-xl bg-surface-container-low">
<span class="font-label-sm text-on-surface font-semibold block mb-0.5">The Issue</span>
<p class="text-on-surface-variant text-body-sm">Traditional sowing around Nov 18 exposes late flowering to sudden regional temperature spikes (&gt;34°C in mid-February).</p>
</div>
<div class="p-3 rounded-xl bg-surface-container-low">
<span class="font-label-sm text-on-surface font-semibold block mb-0.5">Why It Matters</span>
<p class="text-on-surface-variant text-body-sm">Sowing on Nov 02 aligns grain filling with optimal 20-22°C temperatures, preventing pinched, shriveled wheat kernels.</p>
</div>
<div class="p-3 rounded-xl bg-surface-container-low">
<span class="font-label-sm text-on-surface font-semibold block mb-0.5">Suggested Action</span>
<p class="text-on-surface-variant text-body-sm">Complete disc harrowing and field prep by Oct 28 so first soaking irrigation is delivered on Nov 01 morning.</p>
</div>
</div>
</div>
<div class="mt-6 pt-4 pl-3 space-y-4">
<!-- Inline Data visualization: Yield bump -->
<div class="p-3 rounded-xl bg-surface-container flex items-center justify-between">
<div class="flex items-center gap-2.5">
<div class="w-8 h-8 rounded-lg bg-surface-container-highest text-secondary flex items-center justify-center font-bold text-label-md">
                    +2.1
                  </div>
<div>
<span class="font-label-md text-on-surface block leading-tight">+2.1 Q/acre Yield Upside</span>
<span class="font-label-sm text-on-surface-variant">16 days vegetative buffer</span>
</div>
</div>
</div>
<button class="w-full py-2.5 px-4 rounded-xl bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label-lg transition-all flex items-center justify-center gap-2" onclick="applySingleRecommendation('rec-sowing-date', this)">
<span class="material-symbols-outlined text-[18px]">add_circle</span>
<span class="">Use in New Plan</span>
</button>
</div>
</article>
<!-- Card 5: BBF Raised Beds -->
<article class="recommendation-card group relative bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-lg">
<div class="absolute left-0 top-6 bottom-6 w-1.5 bg-secondary rounded-r-full"></div>
<div class="space-y-4 pl-3">
<div class="flex items-center justify-between">
<span class="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm font-medium">Soil Health</span>
<span class="material-symbols-outlined text-[20px] text-secondary">grid_view</span>
</div>
<div>
<h3 class="font-title-lg text-primary tracking-tight">Adopt Broad Bed &amp; Furrow (BBF) for Drip Lateral Laying</h3>
<p class="font-body-sm text-on-surface-variant mt-0.5">Prevents waterlogging in heavy regur soil</p>
</div>
<!-- 3 Structured Fields -->
<div class="space-y-2.5 text-body-sm">
<div class="p-3 rounded-xl bg-surface-container-low">
<span class="font-label-sm text-on-surface font-semibold block mb-0.5">The Issue</span>
<p class="text-on-surface-variant text-body-sm">Flat sowing in heavy clay risks severe root suffocation and collar rot if unseasonal winter showers hit Hingoli.</p>
</div>
<div class="p-3 rounded-xl bg-surface-container-low">
<span class="font-label-sm text-on-surface font-semibold block mb-0.5">Why It Matters</span>
<p class="text-on-surface-variant text-body-sm">BBF raised beds provide natural gravitational drainage while keeping drip lines centered directly in the active root zone.</p>
</div>
<div class="p-3 rounded-xl bg-surface-container-low">
<span class="font-label-sm text-on-surface font-semibold block mb-0.5">Suggested Action</span>
<p class="text-on-surface-variant text-body-sm">Set tractor rotavator bed former to 120cm bed width with 30cm furrows before unrolling 16mm inline drip tubing.</p>
</div>
</div>
</div>
<div class="mt-6 pt-4 pl-3 space-y-4">
<!-- Inline Data visualization: Aeration -->
<div class="p-3 rounded-xl bg-surface-container flex items-center justify-between">
<div class="flex items-center gap-2.5">
<div class="w-8 h-8 rounded-lg bg-surface-container-highest text-secondary flex items-center justify-center font-bold text-label-md">
                    +8%
                  </div>
<div>
<span class="font-label-md text-on-surface block leading-tight">+8% Root Aeration Score</span>
<span class="font-label-sm text-on-surface-variant">100% surface drainage safety</span>
</div>
</div>
</div>
<button class="w-full py-2.5 px-4 rounded-xl bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label-lg transition-all flex items-center justify-center gap-2" onclick="applySingleRecommendation('rec-bbf-beds', this)">
<span class="material-symbols-outlined text-[18px]">add_circle</span>
<span class="">Use in New Plan</span>
</button>
</div>
</article>
</div>
</section>
<!-- SECTION 3: Helpful Advice & Agronomic Best Practices -->
<section class="recommendation-section space-y-4" id="section-advice">
<div class="flex items-center justify-between">
<div class="flex items-center gap-3">
<div class="w-3 h-7 bg-tertiary rounded-full"></div>
<div>
<h2 class="font-headline-md text-on-surface">Helpful Advice &amp; Agronomic Best Practices</h2>
<p class="font-body-sm text-on-surface-variant">Institutional subsidies, government support schemes, and localized KVK extension services.</p>
</div>
</div>
<span class="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm font-semibold">2 Enablers</span>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
<!-- Card 6: MahaDBT Subsidies -->
<article class="recommendation-card group relative bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-lg">
<div class="absolute left-0 top-6 bottom-6 w-1.5 bg-tertiary rounded-r-full"></div>
<div class="space-y-4 pl-3">
<div class="flex items-center justify-between">
<span class="px-2.5 py-1 rounded-md bg-tertiary-fixed text-on-tertiary-fixed font-label-sm font-semibold">Govt Scheme · PMKSY</span>
<span class="font-label-sm text-on-surface-variant">MahaDBT Portal #2025</span>
</div>
<div>
<h3 class="font-title-lg text-primary tracking-tight">Apply for MahaDBT Micro-Irrigation Drip Subsidy</h3>
<p class="font-body-sm text-on-surface-variant mt-0.5">Component: Pradhan Mantri Krishi Sinchayee Yojana</p>
</div>
<!-- Editorial Guidance Narrative -->
<div class="space-y-3 pt-2">
<div class="p-3.5 rounded-xl bg-surface-container-low space-y-1">
<div class="flex items-center gap-2 text-on-surface font-label-md">
<span class="material-symbols-outlined text-[18px] text-tertiary">description</span>
<span class="">Guidance &amp; Eligibility</span>
</div>
<p class="font-body-sm text-on-surface-variant leading-relaxed">
                    Hingoli district farmers with &lt;10 acres holding are eligible for up to 55-80% direct DBT reimbursement on inline drip lateral replacement and hydrocyclone sand filter units.
                  </p>
</div>
<div class="p-3.5 rounded-xl bg-surface-container-low space-y-1">
<div class="flex items-center gap-2 text-on-surface font-label-md">
<span class="material-symbols-outlined text-[18px] text-secondary">flag</span>
<span class="">Action Required</span>
</div>
<p class="font-body-sm text-on-surface-variant leading-relaxed">
                    Generate the pre-filled subsidy dossier directly from your KrishiMitra farm profile to submit at the Shivaji Nagar Gram Panchayat Maha e-Seva Kendra before Nov 10.
                  </p>
</div>
</div>
</div>
<div class="mt-6 pt-4 pl-3 space-y-4">
<div class="flex items-center justify-between p-3 rounded-xl bg-tertiary-fixed/30 text-on-tertiary-fixed">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[20px] text-tertiary">payments</span>
<span class="font-label-md font-semibold">Max Benefit: Up to ₹38,500 Cashback</span>
</div>
<span class="font-label-sm text-on-surface-variant">7/12 &amp; 8A verified</span>
</div>
<button class="w-full py-3 px-4 rounded-xl bg-tertiary text-on-tertiary font-label-lg hover:bg-tertiary-container transition-all flex items-center justify-center gap-2" onclick="downloadDossier(this)">
<span class="material-symbols-outlined text-[18px]">download</span>
<span class="">Download Subsidy Dossier (PDF)</span>
</button>
</div>
</article>
<!-- Card 7: KVK Pest Advisory -->
<article class="recommendation-card group relative bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-lg">
<div class="absolute left-0 top-6 bottom-6 w-1.5 bg-primary rounded-r-full"></div>
<div class="space-y-4 pl-3">
<div class="flex items-center justify-between">
<span class="px-2.5 py-1 rounded-md bg-secondary-container text-on-secondary-container font-label-sm font-semibold">KVK Extension Link</span>
<span class="font-label-sm text-on-surface-variant">ICAR-Hingoli Station</span>
</div>
<div>
<h3 class="font-title-lg text-primary tracking-tight">Connect with Local Hingoli Krishi Vigyan Kendra Agronomist</h3>
<p class="font-body-sm text-on-surface-variant mt-0.5">Real-time localized pest bulletins &amp; fungal warnings</p>
</div>
<!-- Editorial Guidance Narrative -->
<div class="space-y-3 pt-2">
<div class="p-3.5 rounded-xl bg-surface-container-low space-y-1">
<div class="flex items-center gap-2 text-on-surface font-label-md">
<span class="material-symbols-outlined text-[18px] text-primary">sensors</span>
<span class="">Early Warning Network</span>
</div>
<p class="font-body-sm text-on-surface-variant leading-relaxed">
                    Automated SMS &amp; WhatsApp pest telemetry for Yellow Rust (Puccinia striiformis) and aphid flight traps will activate across the Hingoli sub-zone starting December 05.
                  </p>
</div>
<div class="p-3.5 rounded-xl bg-surface-container-low space-y-1">
<div class="flex items-center gap-2 text-on-surface font-label-md">
<span class="material-symbols-outlined text-[18px] text-secondary">notification_add</span>
<span class="">Action Required</span>
</div>
<p class="font-body-sm text-on-surface-variant leading-relaxed">
                    Opt-in to bind your KrishiMitra telemetry stream with the KVK Hingoli WhatsApp Farmer Advisory Group for proactive bi-weekly scouting guidance.
                  </p>
</div>
</div>
</div>
<div class="mt-6 pt-4 pl-3 space-y-4">
<div class="flex items-center justify-between p-3 rounded-xl bg-surface-container">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[20px] text-secondary">security</span>
<span class="font-label-md text-on-surface">5-day early warning before threshold infestation</span>
</div>
<span class="font-label-sm text-secondary font-medium">Free Service</span>
</div>
<button class="w-full py-3 px-4 rounded-xl bg-primary text-on-primary font-label-lg hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center gap-2" onclick="optInAlerts(this)">
<span class="material-symbols-outlined text-[18px]">cell_tower</span>
<span class="">Opt into Local KVK Alerts</span>
</button>
</div>
</article>
</div>
</section>
<!-- Inset Visual Element: Visual Agronomic Calendar & Soil Status -->
<section class="bg-surface-container-low rounded-2xl p-6 lg:p-8 space-y-6">
<div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
<div>
<span class="font-label-sm text-secondary font-semibold uppercase tracking-wider block">Agronomic Simulation</span>
<h3 class="font-title-lg text-primary">Wheat Lifecycle Stage vs Resource Stress Projection</h3>
<p class="font-body-sm text-on-surface-variant">Simulated under Drip Precision Wheat scenario with adopted recommendations</p>
</div>
<div class="flex items-center gap-4 text-label-sm text-on-surface-variant">
<span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-secondary"></span> Optimal Window</span>
<span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-tertiary"></span> Critical Irrigation</span>
<span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-error"></span> Heat Stress Risk</span>
</div>
</div>
<!-- Stage Timeline Visualization -->
<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
<!-- Stage 1 -->
<div class="p-3.5 rounded-xl bg-surface-container-lowest space-y-2">
<div class="flex items-center justify-between text-label-sm">
<span class="font-semibold text-primary">Sowing</span>
<span class="text-secondary">Nov 02</span>
</div>
<div class="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-secondary w-full"></div>
</div>
<p class="font-label-sm text-on-surface-variant">Basal Fertigation + Seed Treatment</p>
</div>
<!-- Stage 2 -->
<div class="p-3.5 rounded-xl bg-surface-container-lowest space-y-2">
<div class="flex items-center justify-between text-label-sm">
<span class="font-semibold text-primary">CRI (Day 21)</span>
<span class="text-tertiary">Nov 23</span>
</div>
<div class="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-tertiary w-full"></div>
</div>
<p class="font-label-sm text-on-surface-variant">Crown Root Initiation drip pulse</p>
</div>
<!-- Stage 3 -->
<div class="p-3.5 rounded-xl bg-surface-container-lowest space-y-2">
<div class="flex items-center justify-between text-label-sm">
<span class="font-semibold text-primary">Tillering</span>
<span class="text-secondary">Dec 15</span>
</div>
<div class="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-secondary w-full"></div>
</div>
<p class="font-label-sm text-on-surface-variant">19:19:19 Bio-NPK 2nd stage</p>
</div>
<!-- Stage 4 -->
<div class="p-3.5 rounded-xl bg-surface-container-lowest space-y-2">
<div class="flex items-center justify-between text-label-sm">
<span class="font-semibold text-primary">Booting</span>
<span class="text-tertiary">Jan 10</span>
</div>
<div class="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-tertiary w-full"></div>
</div>
<p class="font-label-sm text-on-surface-variant">Spikelet development moisture</p>
</div>
<!-- Stage 5 -->
<div class="p-3.5 rounded-xl bg-surface-container-lowest space-y-2">
<div class="flex items-center justify-between text-label-sm">
<span class="font-semibold text-primary">Flowering</span>
<span class="text-secondary">Jan 28</span>
</div>
<div class="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-secondary w-full"></div>
</div>
<p class="font-label-sm text-on-surface-variant">Mild Marathwada ambient window</p>
</div>
<!-- Stage 6 -->
<div class="p-3.5 rounded-xl bg-surface-container-lowest space-y-2">
<div class="flex items-center justify-between text-label-sm">
<span class="font-semibold text-primary">Harvest</span>
<span class="text-primary">Feb 24</span>
</div>
<div class="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-primary w-full"></div>
</div>
<p class="font-label-sm text-on-surface-variant">Harvest completed before 36°C spikes</p>
</div>
</div>
</section>
<!-- Sticky Confirmation Bottom Bar -->
<section class="sticky bottom-4 z-30 bg-surface-container-lowest/95 rounded-2xl p-4 sm:p-5 shadow-xl transition-all duration-300">
<div class="flex flex-col lg:flex-row items-center justify-between gap-4">
<div class="flex items-center gap-4 w-full lg:w-auto">
<div class="w-12 h-12 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[24px]">published_with_changes</span>
</div>
<div>
<div class="flex items-center gap-2">
<span class="font-title-md text-primary">Ready to update your active scenario?</span>
<span class="hidden sm:inline-flex items-center px-2 py-0.5 rounded bg-secondary/10 text-secondary font-label-sm font-semibold">
                  Score: 89 → 94
                </span>
</div>
<p class="font-body-sm text-on-surface-variant">
                Applying all 5 operational improvements updates water allocation plans and syncs farm calendar.
              </p>
</div>
</div>
<div class="flex items-center gap-3 w-full sm:w-auto shrink-0 justify-end">
<button class="w-full sm:w-auto px-5 py-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg transition-colors flex items-center justify-center gap-2" onclick="customizeSelection()">
<span class="material-symbols-outlined text-[18px]">tune</span>
<span class="">Customize Selection</span>
</button>
<button class="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container font-label-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2" id="apply-all-btn" onclick="applyAllRecommendations(this)">
<span class="material-symbols-outlined text-[20px]">auto_fix_high</span>
<span class="">Apply All Recommended Edits</span>
</button>
</div>
</div>
</section>
<!-- Farmer Autonomy Guarantee Footer Note -->
<footer class="pb-12 text-center max-w-3xl mx-auto space-y-3">
<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm">
<span class="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
<span class="">100% Objective &amp; Commission-Free</span>
</div>
<p class="font-body-sm text-on-surface-variant leading-relaxed">
<strong class="font-semibold text-on-surface">Farmer Autonomy Guarantee:</strong> KrishiMitra never takes commissions from chemical, seed, or drip equipment suppliers. All recommendations are 100% objective, agronomy-backed, and optimized solely for your farm's net prosperity.
        </p>
<p class="font-label-sm text-outline">
          Field ID: HM-2025-PATIL-08 · Shivaji Nagar, Hingoli District · KrishiMitra Engine v4.2
        </p>
</footer>
</div>
</div>
<!-- Notification Toast Container -->
<div class="fixed bottom-24 right-8 transform translate-y-32 opacity-0 pointer-events-none transition-all duration-300 z-50 flex items-center gap-3 px-5 py-3.5 bg-inverse-surface text-inverse-on-surface rounded-xl shadow-xl" id="toast">
<span class="material-symbols-outlined text-secondary" id="toast-icon">check_circle</span>
<span class="font-body-sm" id="toast-message">Active plan updated successfully.</span>
</div>
</div>
<script>
  function showToast(message, iconName = 'check_circle') {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');
    if (!toast || !toastMsg || !toastIcon) return;

    toastMsg.textContent = message;
    toastIcon.textContent = iconName;
    toast.classList.remove('translate-y-32', 'opacity-0', 'pointer-events-none');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
      toast.classList.add('translate-y-32', 'opacity-0', 'pointer-events-none');
      toast.classList.remove('translate-y-0', 'opacity-100');
    }, 3800);
  }

  function filterCards(category) {
    // Reset all tab styling
    const tabs = document.querySelectorAll('.category-tab');
    tabs.forEach(tab => {
      tab.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
      tab.classList.add('bg-surface-container', 'text-on-surface');
    });

    const activeTab = document.getElementById('tab-' + category);
    if (activeTab) {
      activeTab.classList.add('bg-primary', 'text-on-primary', 'shadow-sm');
      activeTab.classList.remove('bg-surface-container', 'text-on-surface');
    }

    const secAttention = document.getElementById('section-attention');
    const secImprove = document.getElementById('section-improve');
    const secAdvice = document.getElementById('section-advice');

    if (category === 'all') {
      secAttention.style.display = 'block';
      secImprove.style.display = 'block';
      secAdvice.style.display = 'block';
    } else if (category === 'attention') {
      secAttention.style.display = 'block';
      secImprove.style.display = 'none';
      secAdvice.style.display = 'none';
    } else if (category === 'improve') {
      secAttention.style.display = 'none';
      secImprove.style.display = 'block';
      secAdvice.style.display = 'none';
    } else if (category === 'advice') {
      secAttention.style.display = 'none';
      secImprove.style.display = 'none';
      secAdvice.style.display = 'block';
    }
  }

  function applySingleRecommendation(id, buttonEl) {
    if (buttonEl) {
      buttonEl.innerHTML = '<span class="material-symbols-outlined text-[18px]">done_all</span><span>Applied to Scenario</span>';
      buttonEl.classList.remove('bg-primary', 'text-on-primary');
      buttonEl.classList.add('bg-secondary-container', 'text-on-secondary-container');
      buttonEl.disabled = true;
    }
    showToast('Recommendation synced to active Rabi plan.');
  }

  function applyAllRecommendations(buttonEl) {
    if (buttonEl) {
      buttonEl.innerHTML = '<span class="material-symbols-outlined text-[20px] animate-spin">refresh</span><span>Applying 5 Adjustments...</span>';
      setTimeout(() => {
        buttonEl.innerHTML = '<span class="material-symbols-outlined text-[20px]">task_alt</span><span>Plan Updated (Score: 94)</span>';
        buttonEl.classList.remove('bg-primary');
        buttonEl.classList.add('bg-secondary');
        showToast('All 5 agronomic recommendations applied! Plan score is now 94/100.', 'celebration');
        
        // Update individual buttons
        const actionButtons = document.querySelectorAll('.recommendation-card button');
        actionButtons.forEach(btn => {
          if (btn.textContent.includes('Apply to Active') || btn.textContent.includes('Use in New Plan')) {
            btn.innerHTML = '<span class="material-symbols-outlined text-[18px]">done_all</span><span>Applied</span>';
            btn.classList.add('bg-secondary-container', 'text-on-secondary-container');
            btn.disabled = true;
          }
        });
      }, 700);
    }
  }

  function customizeSelection() {
    showToast('Selection drawer opened. Select specific parameters to adjust.', 'tune');
  }

  function downloadDossier(buttonEl) {
    showToast('MahaDBT Dossier #HM-8.5-2025 generated for download.', 'download_done');
  }

  function optInAlerts(buttonEl) {
    buttonEl.innerHTML = '<span class="material-symbols-outlined text-[18px]">check_circle</span><span>Subscribed via KVK WhatsApp</span>';
    buttonEl.classList.add('bg-secondary-container', 'text-on-secondary-container');
    showToast('Registered to ICAR-Hingoli KVK localized alerts.', 'notifications_active');
  }
</script></main></div>

</body></html>
```

---

## `krishimitra_resource_check_readiness/code.html`

```html
<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"><meta content="web_dashboard" name="shell-type"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"><link href="https://fonts.googleapis.com" rel="preconnect"><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "surface-container-highest": "#e4e2dd", "tertiary": "#002f3d", "tertiary-container": "#00475a", "on-tertiary": "#ffffff", "primary-container": "#164a34", "surface-bright": "#fbf9f3", "on-secondary-fixed-variant": "#00522b", "outline": "#717973", "on-primary-fixed": "#002113", "on-secondary-container": "#1f7042", "on-error": "#ffffff", "on-surface": "#1b1c18", "secondary-fixed": "#a4f4ba", "on-secondary-fixed": "#00210e", "surface-container-high": "#eae8e2", "surface-variant": "#e4e2dd", "error-container": "#ffdad6", "secondary": "#196c3e", "secondary-container": "#a1f1b7", "surface-container-lowest": "#ffffff", "on-primary-container": "#85b99c", "surface-tint": "#366850", "inverse-surface": "#30312d", "on-tertiary-container": "#6ab7d5", "on-error-container": "#93000a", "primary-fixed-dim": "#9dd2b5", "surface-dim": "#dcdad4", "surface": "#fbf9f3", "inverse-primary": "#9dd2b5", "primary": "#003320", "surface-container-low": "#f5f3ed", "tertiary-fixed": "#baeaff", "inverse-on-surface": "#f3f1eb", "surface-container": "#f0eee8", "outline-variant": "#c0c9c1", "on-tertiary-fixed": "#001f29", "background": "#fbf9f3", "on-secondary": "#ffffff", "error": "#ba1a1a", "secondary-fixed-dim": "#88d8a0", "on-primary": "#ffffff", "on-background": "#1b1c18", "on-primary-fixed-variant": "#1d5039", "tertiary-fixed-dim": "#84d1f0", "primary-fixed": "#b9efd0", "on-surface-variant": "#404943", "on-tertiary-fixed-variant": "#004d62" }, "borderRadius": { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" }, "spacing": { "margin-mobile": "1rem", "space-md": "1rem", "gutter-mobile": "1rem", "gutter": "1.5rem", "space-lg": "1.5rem", "space-xl": "2.5rem", "margin": "3rem", "space-sm": "0.5rem", "space-xs": "0.25rem" }, "fontFamily": { "title-lg": ["Plus Jakarta Sans"], "label-lg": ["Plus Jakarta Sans"], "headline-md": ["Plus Jakarta Sans"], "display-lg-mobile": ["Plus Jakarta Sans"], "label-sm": ["Plus Jakarta Sans"], "body-lg": ["Plus Jakarta Sans"], "headline-lg-mobile": ["Plus Jakarta Sans"], "title-md": ["Plus Jakarta Sans"], "body-md": ["Plus Jakarta Sans"], "headline-lg": ["Plus Jakarta Sans"], "body-sm": ["Plus Jakarta Sans"], "display-lg": ["Plus Jakarta Sans"], "label-md": ["Plus Jakarta Sans"], "headline-sm": ["Plus Jakarta Sans"] }, "fontSize": { "title-lg": ["18px", { "lineHeight": "26px", "fontWeight": "600" }], "label-lg": ["14px", { "lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "600" }], "headline-md": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600" }], "display-lg-mobile": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700" }], "label-sm": ["11px", { "lineHeight": "14px", "letterSpacing": "0.02em", "fontWeight": "500" }], "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }], "headline-lg-mobile": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600" }], "title-md": ["16px", { "lineHeight": "24px", "fontWeight": "600" }], "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }], "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700" }], "body-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }], "display-lg": ["44px", { "lineHeight": "52px", "letterSpacing": "-0.02em", "fontWeight": "700" }], "label-md": ["12px", { "lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "600" }], "headline-sm": ["20px", { "lineHeight": "28px", "fontWeight": "600" }] } } } };</script></head><body class="bg-background font-body-md text-on-surface antialiased" style="background: radial-gradient(at 10% 10%, rgba(34, 197, 94, 0.18) 0px, transparent 50%), radial-gradient(at 90% 15%, rgba(16, 185, 129, 0.16) 0px, transparent 50%), radial-gradient(rgba(5, 150, 105, 0.08) 0px, transparent 60%), radial-gradient(at 15% 85%, rgba(132, 204, 22, 0.15) 0px, transparent 50%), radial-gradient(at 85% 90%, rgba(16, 185, 129, 0.18) 0px, transparent 50%), rgb(248, 250, 247); min-height: 100vh;"><aside class="fixed left-0 top-0 h-full w-64 bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between pt-5 pb-6" style="background: rgba(255, 255, 255, 0.72); backdrop-filter: blur(24px) saturate(190%); border-right: 1px solid rgba(255, 255, 255, 0.75); box-shadow: rgba(16, 78, 45, 0.05) 0px 10px 36px 0px, rgba(255, 255, 255, 0.8) -1px 0px 1px 0px inset;"><div class="flex flex-col gap-6"><div class="px-6 flex items-center gap-3"><img alt="Brand logo. - Primary color: #164a34
- Font: plusJakartaSans
- Mode: light
- Roundness: rounded-md
" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1UwvheEflVQETpVODXud1bKJQLTG3Z9V091WAQuRWb3OjkfynIYN40ImZHKnidhICqNkNrqFqpWKzSfZlgxI5J_M82iY6odlXGtsZTTc8HXdVBAz6ryKsSz-P5wU6ZoKTCO5D247hagw2iNx0PZZfjdthMC8zjpWAGLJh7xg4qo3i9LZdCn7j6gGxugjmJTrMiBN0EKKxLQuSsUMZx2F7LChrzofAoNzJDssH-iE5FNMrlgSgXlD6etBto"><div class="flex flex-col"><span class="font-title-lg text-primary tracking-tight leading-none">KrishiMitra</span><span class="font-label-sm text-secondary">Agri-Advisory OS</span></div></div><nav class="flex flex-col px-3 space-y-1" data-active-classes="bg-primary-container text-on-primary-container font-title-md"><a class="flex items-center px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="dashboard" href="#">Dashboard</a><a class="flex items-center px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="my-farms" href="#">My Farms</a><a class="flex items-center px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="plans" href="#">Plans</a><a class="flex items-center px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="compare" href="#">Compare</a><a class="flex items-center px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="recommendations" href="#">Recommendations</a><a aria-current="page" class="flex items-center px-3 py-2.5 rounded-lg transition-all bg-primary-container text-on-primary-container font-title-md" data-path="resource-check" href="#">Resource Check</a><a class="flex items-center px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="reports" href="#">Reports</a></nav></div><div class="px-4"><div class="p-3 bg-surface-container rounded-xl flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div><div class="flex flex-col min-w-0 flex-1"><span class="font-label-lg text-on-surface truncate">Ramesh Deshmukh</span><span class="font-label-sm text-on-surface-variant truncate">Shivaji Nagar Farm #2</span></div><span class="material-symbols-outlined text-on-surface-variant text-[18px]">unfold_more</span></div></div></aside><div class="pl-64"><header class="fixed top-0 left-64 right-0 h-16 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-8" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(24px) saturate(190%); border-bottom: 1px solid rgba(255, 255, 255, 0.75); box-shadow: rgba(16, 78, 45, 0.05) 0px 8px 32px 0px, rgba(255, 255, 255, 0.9) 0px 1px 1px 0px inset;"><div class="flex items-center gap-3"><img alt="Brand logo. - Primary color: #164a34
- Font: plusJakartaSans
- Mode: light
- Roundness: rounded-md
" class="h-7 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1UwvheEflVQETpVODXud1bKJQLTG3Z9V091WAQuRWb3OjkfynIYN40ImZHKnidhICqNkNrqFqpWKzSfZlgxI5J_M82iY6odlXGtsZTTc8HXdVBAz6ryKsSz-P5wU6ZoKTCO5D247hagw2iNx0PZZfjdthMC8zjpWAGLJh7xg4qo3i9LZdCn7j6gGxugjmJTrMiBN0EKKxLQuSsUMZx2F7LChrzofAoNzJDssH-iE5FNMrlgSgXlD6etBto"><span class="font-title-md text-on-surface hidden sm:inline">KrishiMitra Management</span></div><div class="flex items-center gap-4"><div class="flex items-center bg-surface-container px-2 py-1 rounded-lg"><span class="material-symbols-outlined text-[18px] text-on-surface-variant mr-1">translate</span><select class="bg-transparent font-label-md text-on-surface outline-none cursor-pointer pr-1"><option value="en">English</option><option value="hi">हिंदी</option><option value="mr">मराठी</option></select></div><button class="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-low rounded-lg font-label-md text-on-surface hover:bg-surface-container-high transition-colors"><span class="material-symbols-outlined text-[18px] text-secondary">wb_sunny</span><span class="">Nashik 28°C · Soil Wet</span></button><button class="p-2 text-on-surface-variant hover:text-on-surface transition-colors"><span class="material-symbols-outlined text-[22px]">notifications</span></button><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></header><main class="relative pt-16 w-full min-h-screen bg-transparent"><div class="flex flex-col w-full">
<!-- Subtle Ambient Glow Element -->
<div class="relative w-full overflow-hidden">
<div class="absolute -top-32 right-12 w-96 h-96 rounded-full bg-secondary/5 blur-3xl pointer-events-none"></div>
<div class="absolute top-96 -left-20 w-80 h-80 rounded-full bg-tertiary-container/5 blur-3xl pointer-events-none"></div>
<!-- Main Content Container with Organic Breathing Room -->
<div class="max-w-[1280px] w-full mx-auto px-6 lg:px-12 py-8 flex flex-col gap-10">
<!-- Breadcrumbs & Context Header (No duplicated H1) -->
<section class="flex flex-col gap-4">
<nav class="flex items-center gap-2 text-on-surface-variant font-label-md">
<a class="hover:text-primary transition-colors" href="#">Plans</a>
<span class="material-symbols-outlined text-[14px]">chevron_right</span>
<span class="text-on-surface font-title-md">Shivaji Patil Farm (8.5 Ac)</span>
<span class="material-symbols-outlined text-[14px]">chevron_right</span>
<span class="">Rabi 2025</span>
<span class="material-symbols-outlined text-[14px]">chevron_right</span>
<span class="text-primary font-semibold">Resource Audit</span>
</nav>
<div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
<div class="flex flex-col gap-2 max-w-3xl">
<div class="flex flex-wrap items-center gap-2.5">
<span class="px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label-sm uppercase tracking-wider">Field Audit Verified</span>
<span class="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm">Rabi 2025 Sowing Window</span>
<span class="text-on-surface-variant font-label-sm flex items-center gap-1">
<span class="material-symbols-outlined text-[14px] text-secondary">pin_drop</span> Hingoli Sub-Basin
              </span>
</div>
<h2 class="font-headline-lg text-primary tracking-tight">Farm Resource Readiness &amp; Inventory Audit</h2>
<p class="font-body-md text-on-surface-variant leading-relaxed">
              Comprehensive verification of water reserves, working capital, certified seed, machinery, and skilled labor before committing seed to soil on Nov 02.
            </p>
</div>
<!-- Header Action Group -->
<div class="flex flex-wrap items-center gap-3">
<button class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg transition-all shadow-sm active:scale-95" onclick="triggerDiagnostic()">
<span class="material-symbols-outlined text-[18px] text-secondary">sync</span>
<span class="">Re-check Live</span>
</button>
<button class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg transition-all shadow-sm active:scale-95">
<span class="material-symbols-outlined text-[18px] text-on-surface-variant">download</span>
<span class="">Export PDF Dossier</span>
</button>
<button class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-label-lg hover:bg-primary-container transition-all shadow-md active:scale-95">
<span class="material-symbols-outlined text-[18px]">verified</span>
<span class="">Lock Sowing Target (Nov 02)</span>
</button>
</div>
</div>
<!-- Target Context Badges Strip -->
<div class="flex flex-wrap items-center gap-3 p-3.5 rounded-2xl bg-surface-container-low shadow-sm" style="background: rgba(255, 255, 255, 0.65); backdrop-filter: blur(20px) saturate(180%); border: 1px solid rgba(255, 255, 255, 0.7); box-shadow: rgba(16, 78, 45, 0.04) 0px 8px 24px 0px, rgba(255, 255, 255, 0.9) 0px 1px 1px 0px inset;">
<div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface shadow-xs font-label-md">
<span class="material-symbols-outlined text-[18px] text-secondary">psychiatry</span>
<span class="text-on-surface-variant">Crop Plan:</span>
<span class="font-title-md text-primary">Drip Precision Wheat</span>
</div>
<div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface shadow-xs font-label-md">
<span class="material-symbols-outlined text-[18px] text-error">event_upcoming</span>
<span class="text-on-surface-variant">Target Sowing:</span>
<span class="font-title-md text-error">Nov 02, 2025 (5 Days Left)</span>
</div>
<div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface shadow-xs font-label-md">
<span class="material-symbols-outlined text-[18px] text-tertiary">landscape</span>
<span class="text-on-surface-variant">Soil Profile:</span>
<span class="font-title-md text-tertiary">Deep Black Cotton (Vertisols)</span>
</div>
<div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface shadow-xs font-label-md ml-auto">
<span class="material-symbols-outlined text-[18px] text-secondary">grid_goldenratio</span>
<span class="text-on-surface-variant">Farm Extent:</span>
<span class="font-title-md text-primary">8.5 Net Cultivable Acres</span>
</div>
</div>
</section>
<!-- Urgent Bottleneck Resolver Banner (High Visual Priority) -->
<section class="relative overflow-hidden rounded-2xl bg-surface-container-lowest shadow-md p-6" style="background: rgba(255, 255, 255, 0.78); backdrop-filter: blur(24px) saturate(190%); border: 1px solid rgba(255, 255, 255, 0.75); box-shadow: rgba(186, 26, 26, 0.08) 0px 12px 36px 0px, rgba(255, 255, 255, 0.95) 0px 1px 1px 0px inset;">
<div class="absolute left-0 top-0 bottom-0 w-2 bg-error"></div>
<div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pl-2">
<div class="flex items-start gap-4">
<div class="w-12 h-12 rounded-xl bg-error-container text-on-error-container flex items-center justify-center shrink-0 shadow-sm">
<span class="material-symbols-outlined text-[28px]">notification_important</span>
</div>
<div class="flex flex-col gap-1">
<div class="flex items-center gap-2">
<span class="font-label-sm uppercase tracking-wider text-error font-bold">1 Action Required Prior to Sowing</span>
<span class="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm">Pickup Ready Today</span>
</div>
<h3 class="font-title-lg text-on-surface">Pick up remaining 160 kg Sonalika HD-2967 certified wheat seed</h3>
<p class="font-body-sm text-on-surface-variant max-w-2xl">
                Order <span class="font-semibold text-on-surface">#HKK-8821</span> reserved at Hingoli Krishi Kendra. Balance to disburse: <span class="font-semibold text-primary">₹7,200</span>. Dealer contact: Anand Patil (+91 98221 44520).
              </p>
</div>
</div>
<div class="flex flex-wrap items-center gap-3 w-full lg:w-auto self-end lg:self-center">
<a class="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md transition-all active:scale-95 shadow-xs" href="tel:+919822144520">
<span class="material-symbols-outlined text-[18px] text-secondary">call</span>
<span class="">Call Dealer</span>
</a>
<button class="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md transition-all active:scale-95 shadow-xs">
<span class="material-symbols-outlined text-[18px] text-tertiary">near_me</span>
<span class="">Map Route (12 km)</span>
</button>
<button class="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-secondary text-on-secondary font-label-md hover:bg-secondary/90 transition-all shadow-sm active:scale-95" id="markPickedBtn" onclick="markAsPicked()">
<span class="material-symbols-outlined text-[18px]">done_all</span>
<span class="">Mark as Picked Up</span>
</button>
</div>
</div>
</section>
<!-- Topline Readiness Scorecard Grid (Bento Layout) -->
<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
<!-- Overall Score Ring Card (Span 4) -->
<div class="lg:col-span-4 rounded-2xl bg-surface-container-lowest p-6 shadow-md flex flex-col justify-between gap-6 relative overflow-hidden" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(24px) saturate(190%); border: 1px solid rgba(255, 255, 255, 0.75); box-shadow: rgba(16, 78, 45, 0.06) 0px 10px 36px 0px, rgba(255, 255, 255, 0.9) 0px 1px 1px 0px inset;">
<div class="flex items-center justify-between">
<div class="flex flex-col">
<span class="font-label-md text-on-surface-variant uppercase tracking-wider">Audit Score</span>
<span class="font-headline-sm text-primary font-bold">Overall Readiness</span>
</div>
<span class="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm font-semibold">Grade A- · Viable</span>
</div>
<!-- Circular Graphic & Score -->
<div class="flex items-center justify-around gap-4 my-2">
<div class="relative w-32 h-32 flex items-center justify-center">
<svg class="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
<circle class="stroke-surface-container-high" cx="60" cy="60" fill="transparent" r="48" stroke-width="12"></circle>
<circle class="stroke-secondary transition-all duration-1000 ease-out" cx="60" cy="60" fill="transparent" id="scoreRing" r="48" stroke-dasharray="301.59" stroke-dashoffset="36.19" stroke-linecap="round" stroke-width="12"></circle>
</svg>
<div class="absolute flex flex-col items-center justify-center">
<span class="font-display-lg text-primary leading-none" id="scoreText">88%</span>
<span class="font-label-sm text-on-surface-variant">Sowing Ready</span>
</div>
</div>
<div class="flex flex-col gap-2 max-w-[160px]">
<div class="flex items-center gap-1.5 text-secondary font-label-md">
<span class="material-symbols-outlined text-[16px]">check_circle</span>
<span class="">4 of 5 Pillars Clear</span>
</div>
<p class="font-body-sm text-on-surface-variant leading-tight">
                No systemic blockers detected. Sowing schedule holds for Nov 02.
              </p>
</div>
</div>
<div class="p-3 rounded-xl bg-surface-container-low flex items-center justify-between text-on-surface font-label-md">
<span class="text-on-surface-variant">Critical Milestones Met</span>
<span class="font-semibold text-primary">16 of 18 Checkpoints</span>
</div>
</div>
<!-- Metric Card 1: Stored Water Security (Span 4) -->
<div class="lg:col-span-4 rounded-2xl bg-surface-container-lowest p-6 shadow-md flex flex-col justify-between gap-4" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(24px) saturate(190%); border: 1px solid rgba(255, 255, 255, 0.75); box-shadow: rgba(16, 78, 45, 0.06) 0px 10px 36px 0px, rgba(255, 255, 255, 0.9) 0px 1px 1px 0px inset;">
<div class="flex items-start justify-between">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shadow-xs">
<span class="material-symbols-outlined text-[22px]">water_drop</span>
</div>
<div class="flex flex-col">
<span class="font-label-md text-on-surface-variant">Water Security</span>
<span class="font-title-md text-on-surface">6,200 m³ Stored</span>
</div>
</div>
<span class="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm font-semibold">180% Req.</span>
</div>
<div class="flex flex-col gap-2">
<div class="flex justify-between text-on-surface font-label-sm">
<span class="text-on-surface-variant">Required for Rabi Cycle: 3,450 m³</span>
<span class="font-bold text-secondary">+2,750 m³ Buffer</span>
</div>
<div class="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
<div class="bg-secondary h-full rounded-full transition-all duration-500" style="width: 100%"></div>
</div>
</div>
<!-- Micro detail tags -->
<div class="pt-2 flex flex-col gap-1.5 font-label-sm text-on-surface-variant">
<div class="flex items-center justify-between">
<span class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>Open Wells #1 &amp; #2</span>
<span class="font-semibold text-on-surface">92% Aggregate Fill</span>
</div>
<div class="flex items-center justify-between">
<span class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>Canal Turn (Hingoli)</span>
<span class="font-semibold text-on-surface">Booked for Nov 14–16</span>
</div>
</div>
</div>
<!-- Metric Card 2: Cashflow & Liquidity (Span 4) -->
<div class="lg:col-span-4 rounded-2xl bg-surface-container-lowest p-6 shadow-md flex flex-col justify-between gap-4" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(24px) saturate(190%); border: 1px solid rgba(255, 255, 255, 0.75); box-shadow: rgba(16, 78, 45, 0.06) 0px 10px 36px 0px, rgba(255, 255, 255, 0.9) 0px 1px 1px 0px inset;">
<div class="flex items-start justify-between">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shadow-xs">
<span class="material-symbols-outlined text-[22px]">account_balance_wallet</span>
</div>
<div class="flex flex-col">
<span class="font-label-md text-on-surface-variant">Working Capital</span>
<span class="font-title-md text-on-surface">₹85,000 Liquid</span>
</div>
</div>
<span class="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm font-semibold">100% Staged</span>
</div>
<div class="flex flex-col gap-2">
<div class="flex justify-between text-on-surface font-label-sm">
<span class="text-on-surface-variant">Immediate Need: ₹38,000</span>
<span class="font-bold text-secondary">Surplus ₹47,000</span>
</div>
<div class="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
<div class="bg-secondary h-full rounded-full" style="width: 100%"></div>
</div>
</div>
<div class="pt-2 flex flex-col gap-1.5 font-label-sm text-on-surface-variant">
<div class="flex items-center justify-between">
<span class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>Bank of Maharashtra Kisan A/C</span>
<span class="font-semibold text-on-surface">₹45,000 Available</span>
</div>
<div class="flex items-center justify-between">
<span class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>KCC Credit Headroom</span>
<span class="font-semibold text-on-surface">₹1,20,000 Standby</span>
</div>
</div>
</div>
<!-- Metric Card 3: Inputs & Seed Inventory (Span 6) -->
<div class="lg:col-span-6 rounded-2xl bg-surface-container-lowest p-6 shadow-md flex flex-col justify-between gap-4" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(24px) saturate(190%); border: 1px solid rgba(255, 255, 255, 0.75); box-shadow: rgba(16, 78, 45, 0.06) 0px 10px 36px 0px, rgba(255, 255, 255, 0.9) 0px 1px 1px 0px inset;">
<div class="flex items-start justify-between">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-xl bg-error-container text-on-error-container flex items-center justify-center shadow-xs">
<span class="material-symbols-outlined text-[22px]">inventory_2</span>
</div>
<div class="flex flex-col">
<span class="font-label-md text-on-surface-variant">Certified Inputs</span>
<span class="font-title-md text-on-surface">78% Stocked on Farm</span>
</div>
</div>
<span class="px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm font-semibold">1 Item Pending</span>
</div>
<div class="flex flex-col gap-2">
<div class="flex justify-between text-on-surface font-label-sm">
<span class="text-on-surface-variant">Sonalika HD-2967: 180 kg of 340 kg</span>
<span class="font-semibold text-error">Shortfall: 160 kg</span>
</div>
<div class="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
<div class="bg-secondary h-full rounded-full" style="width: 53%"></div>
</div>
</div>
<div class="flex items-center justify-between pt-2 border-t-0 bg-surface-container-low p-3 rounded-xl">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[18px] text-secondary">verified</span>
<span class="font-label-md text-on-surface">Bio-fungicide, NPK 19:19:19 &amp; Zinc</span>
</div>
<span class="font-label-sm text-secondary font-semibold">Ready in Shed</span>
</div>
</div>
<!-- Metric Card 4: Machinery Readiness (Span 6) -->
<div class="lg:col-span-6 rounded-2xl bg-surface-container-lowest p-6 shadow-md flex flex-col justify-between gap-4" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(24px) saturate(190%); border: 1px solid rgba(255, 255, 255, 0.75); box-shadow: rgba(16, 78, 45, 0.06) 0px 10px 36px 0px, rgba(255, 255, 255, 0.9) 0px 1px 1px 0px inset;">
<div class="flex items-start justify-between">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-xs">
<span class="material-symbols-outlined text-[22px]">agriculture</span>
</div>
<div class="flex flex-col">
<span class="font-label-md text-on-surface-variant">Implements &amp; Mechanization</span>
<span class="font-title-md text-on-surface">3 of 3 Implements Certified</span>
</div>
</div>
<span class="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm font-semibold">100% Ready</span>
</div>
<div class="flex flex-col gap-2">
<div class="flex justify-between text-on-surface font-label-sm">
<span class="text-on-surface-variant">Mahindra 575 DI + Seed Drill + Drip</span>
<span class="font-bold text-secondary">Field Ready</span>
</div>
<div class="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
<div class="bg-secondary h-full rounded-full" style="width: 100%"></div>
</div>
</div>
<div class="flex items-center justify-between pt-2 bg-surface-container-low p-3 rounded-xl">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[18px] text-secondary">bolt</span>
<span class="font-label-md text-on-surface">3-Phase Feeder (6 AM–2 PM) + 5kVA Solar</span>
</div>
<span class="font-label-sm text-secondary font-semibold">Grid Active</span>
</div>
</div>
</section>
<!-- Sowing Readiness Countdown Timeline -->
<section class="rounded-2xl bg-surface-container-lowest p-6 lg:p-8 shadow-md flex flex-col gap-6" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(24px) saturate(190%); border: 1px solid rgba(255, 255, 255, 0.75); box-shadow: rgba(16, 78, 45, 0.06) 0px 10px 36px 0px, rgba(255, 255, 255, 0.9) 0px 1px 1px 0px inset;">
<div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
<div class="flex flex-col">
<span class="font-label-sm text-secondary uppercase tracking-wider font-bold">5-Day Critical Path</span>
<h3 class="font-headline-sm text-primary font-bold">Sowing Execution Sequence (Nov 02 Target)</h3>
</div>
<span class="font-label-sm text-on-surface-variant bg-surface-container-low px-3 py-1.5 rounded-full self-start md:self-auto">
            Hingoli District Agromet Advisory Sync: <span class="font-semibold text-on-surface">Optimal Dew Point</span>
</span>
</div>
<!-- 5-Step Connected Timeline Component -->
<div class="relative w-full py-4">
<div class="hidden md:block absolute top-10 left-12 right-12 h-1 bg-surface-container-high z-0"></div>
<div class="hidden md:block absolute top-10 left-12 w-1/4 h-1 bg-secondary z-0"></div>
<div class="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
<!-- Step 1: Oct 28 (Done) -->
<div class="flex md:flex-col items-center md:items-start gap-4 md:gap-3 p-3 md:p-0 rounded-xl bg-surface-container-low md:bg-transparent">
<div class="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm">
<span class="material-symbols-outlined text-[20px]">check</span>
</div>
<div class="flex flex-col">
<div class="flex items-center gap-2">
<span class="font-label-sm text-secondary font-bold">Oct 28 · Today</span>
<span class="px-1.5 py-0.2 rounded bg-secondary-container text-on-secondary-container font-label-sm text-[10px]">Complete</span>
</div>
<span class="font-title-md text-on-surface font-semibold">Pre-irrigation Profile</span>
<span class="font-body-sm text-on-surface-variant">Moisture logged at 18% dry weight across Plot A &amp; B</span>
</div>
</div>
<!-- Step 2: Oct 29 (Next Action) -->
<div class="flex md:flex-col items-center md:items-start gap-4 md:gap-3 p-3 md:p-0 rounded-xl bg-surface-container-high/60 md:bg-transparent">
<div class="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 shadow-sm ring-4 ring-secondary/20">
<span class="material-symbols-outlined text-[20px]">arrow_forward</span>
</div>
<div class="flex flex-col">
<div class="flex items-center gap-2">
<span class="font-label-sm text-on-surface font-bold">Oct 29 · Tomorrow</span>
<span class="px-1.5 py-0.2 rounded bg-surface-container-highest text-on-surface font-label-sm text-[10px]">Active</span>
</div>
<span class="font-title-md text-primary font-semibold">Seed Pickup &amp; Bio-Mix</span>
<span class="font-body-sm text-on-surface-variant">Collect 160 kg HD-2967 &amp; inoculate with Trichoderma</span>
</div>
</div>
<!-- Step 3: Oct 30 (Scheduled) -->
<div class="flex md:flex-col items-center md:items-start gap-4 md:gap-3 p-3 md:p-0 rounded-xl bg-surface-container-low md:bg-transparent">
<div class="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center shrink-0">
<span class="font-label-md font-bold">03</span>
</div>
<div class="flex flex-col">
<span class="font-label-sm text-on-surface-variant">Oct 30 · T-3 Days</span>
<span class="font-title-md text-on-surface font-semibold">Secondary Tillage</span>
<span class="font-body-sm text-on-surface-variant">Rotavator fine tilth pass &amp; planking for level seedbed</span>
</div>
</div>
<!-- Step 4: Nov 01 (Scheduled) -->
<div class="flex md:flex-col items-center md:items-start gap-4 md:gap-3 p-3 md:p-0 rounded-xl bg-surface-container-low md:bg-transparent">
<div class="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center shrink-0">
<span class="font-label-md font-bold">04</span>
</div>
<div class="flex flex-col">
<span class="font-label-sm text-on-surface-variant">Nov 01 · T-1 Day</span>
<span class="font-title-md text-on-surface font-semibold">Drip Layout &amp; Test</span>
<span class="font-body-sm text-on-surface-variant">Unroll 16mm drip laterals; run 4.2 bar pressure flush</span>
</div>
</div>
<!-- Step 5: Nov 02 (Sowing Day) -->
<div class="flex md:flex-col items-center md:items-start gap-4 md:gap-3 p-3 md:p-0 rounded-xl bg-primary/5 md:bg-transparent">
<div class="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 shadow-sm">
<span class="material-symbols-outlined text-[20px]">flag</span>
</div>
<div class="flex flex-col">
<div class="flex items-center gap-2">
<span class="font-label-sm text-primary font-bold">Nov 02 · Target</span>
<span class="px-1.5 py-0.2 rounded bg-primary-container text-on-primary-container font-label-sm text-[10px]">Lock</span>
</div>
<span class="font-title-md text-primary font-bold">Sowing &amp; Fertigation</span>
<span class="font-body-sm text-on-surface-variant">Zero-till drilling @ 40 kg/ac &amp; basal NPK pulse</span>
</div>
</div>
</div>
</div>
</section>
<!-- Interactive Category Switcher (Filter Bar) -->
<section class="flex flex-col gap-6">
<div class="flex items-center justify-between overflow-x-auto pb-2 scrollbar-none">
<div class="flex items-center gap-2 p-1.5 bg-surface-container rounded-2xl" style="background: rgba(255, 255, 255, 0.65); backdrop-filter: blur(20px) saturate(180%); border: 1px solid rgba(255, 255, 255, 0.7); box-shadow: rgba(16, 78, 45, 0.04) 0px 6px 20px 0px, rgba(255, 255, 255, 0.9) 0px 1px 1px 0px inset;">
<button class="cat-pill active-pill px-4 py-2 rounded-xl text-on-primary bg-primary font-label-md transition-all shadow-sm" onclick="filterAudit('all')">
              All Items (17)
            </button>
<button class="cat-pill px-4 py-2 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-md transition-all" onclick="filterAudit('water')">
              Water &amp; Irrigation (4)
            </button>
<button class="cat-pill px-4 py-2 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-md transition-all" onclick="filterAudit('inputs')">
              Seed &amp; Bio-Nutrients (5)
            </button>
<button class="cat-pill px-4 py-2 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-md transition-all" onclick="filterAudit('machinery')">
              Machinery &amp; Power (3)
            </button>
<button class="cat-pill px-4 py-2 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-md transition-all" onclick="filterAudit('capital')">
              Working Capital (3)
            </button>
<button class="cat-pill px-4 py-2 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-md transition-all" onclick="filterAudit('labor')">
              Labor &amp; Advisory (2)
            </button>
</div>
<div class="hidden lg:flex items-center gap-2 text-on-surface-variant font-label-sm">
<span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-secondary"></span> Verified</span>
<span class="flex items-center gap-1 ml-2"><span class="w-2 h-2 rounded-full bg-error"></span> Pending Action</span>
</div>
</div>
<!-- Detailed Audit Grid Cards -->
<style>.audit-card{background:rgba(255,255,255,0.75)!important;backdrop-filter:blur(24px) saturate(190%)!important;-webkit-backdrop-filter:blur(24px) saturate(190%)!important;border:1px solid rgba(255,255,255,0.7)!important;box-shadow:0 10px 36px 0 rgba(16,78,45,0.06),inset 0 1px 1px 0 rgba(255,255,255,0.9)!important;transition:transform 0.2s ease,box-shadow 0.2s ease!important;}.audit-card:hover{transform:translateY(-2px);box-shadow:0 16px 40px 0 rgba(16,78,45,0.1),inset 0 1px 1px 0 rgba(255,255,255,1)!important;}</style><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="auditItemsContainer">
<!-- Item 1.1: Well 1 (Category: water) -->
<div class="audit-card cat-water flex flex-col justify-between p-5 rounded-2xl bg-surface-container-lowest shadow-md gap-4">
<div class="flex items-start justify-between gap-2">
<div class="flex flex-col">
<span class="font-label-sm text-secondary font-semibold uppercase">Water Infrastructure</span>
<h4 class="font-title-lg text-on-surface">Primary Open Well #1</h4>
</div>
<span class="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[18px]">check</span>
</span>
</div>
<div class="flex flex-col gap-2 font-body-sm text-on-surface-variant">
<p class="">Capacity: <span class="text-on-surface font-semibold">3,800 m³</span> · Water column: 4.2m from surface.</p>
<div class="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between text-on-surface font-label-sm">
<span class="">5HP Submersible</span>
<span class="text-secondary font-semibold">New Capacitor Tested</span>
</div>
</div>
<div class="flex items-center justify-between pt-2 text-on-surface-variant font-label-sm">
<span class="">Audited: Oct 26</span>
<span class="text-secondary font-bold">100% Ready</span>
</div>
</div>
<!-- Item 1.2: Well 2 (Category: water) -->
<div class="audit-card cat-water flex flex-col justify-between p-5 rounded-2xl bg-surface-container-lowest shadow-md gap-4">
<div class="flex items-start justify-between gap-2">
<div class="flex flex-col">
<span class="font-label-sm text-secondary font-semibold uppercase">Water Infrastructure</span>
<h4 class="font-title-lg text-on-surface">Secondary Open Well #2</h4>
</div>
<span class="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[18px]">check</span>
</span>
</div>
<div class="flex flex-col gap-2 font-body-sm text-on-surface-variant">
<p class="">Capacity: <span class="text-on-surface font-semibold">2,400 m³</span> · Silt cleared on Oct 24.</p>
<div class="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between text-on-surface font-label-sm">
<span class="">Solar Backup Pump</span>
<span class="text-secondary font-semibold">Operational (3.0 kW)</span>
</div>
</div>
<div class="flex items-center justify-between pt-2 text-on-surface-variant font-label-sm">
<span class="">Audited: Oct 26</span>
<span class="text-secondary font-bold">100% Ready</span>
</div>
</div>
<!-- Item 1.3: Drip Laterals (Category: water) -->
<div class="audit-card cat-water flex flex-col justify-between p-5 rounded-2xl bg-surface-container-lowest shadow-md gap-4">
<div class="flex items-start justify-between gap-2">
<div class="flex flex-col">
<span class="font-label-sm text-secondary font-semibold uppercase">Distribution Network</span>
<h4 class="font-title-lg text-on-surface">Drip Lateral &amp; Manifold</h4>
</div>
<span class="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[18px]">check</span>
</span>
</div>
<div class="flex flex-col gap-2 font-body-sm text-on-surface-variant">
<p class="">16mm inline lines (1.2m spacing, 2.4 LPH emitters). Sand filter backwashed.</p>
<div class="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between text-on-surface font-label-sm">
<span class="">Operating Pressure</span>
<span class="text-secondary font-semibold">4.2 bar normal</span>
</div>
</div>
<div class="flex items-center justify-between pt-2 text-on-surface-variant font-label-sm">
<span class="">Audited: Oct 27</span>
<span class="text-secondary font-bold">Tested &amp; Sealed</span>
</div>
</div>
<!-- Item 1.4: Canal Rotation (Category: water) -->
<div class="audit-card cat-water flex flex-col justify-between p-5 rounded-2xl bg-surface-container-lowest shadow-md gap-4">
<div class="flex items-start justify-between gap-2">
<div class="flex flex-col">
<span class="font-label-sm text-secondary font-semibold uppercase">Public Surface Water</span>
<h4 class="font-title-lg text-on-surface">Hingoli Canal Rotation #1</h4>
</div>
<span class="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[18px]">check</span>
</span>
</div>
<div class="flex flex-col gap-2 font-body-sm text-on-surface-variant">
<p class="">Turn scheduled Nov 14–16 for primary vegetative root flush.</p>
<div class="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between text-on-surface font-label-sm">
<span class="">Water Cess Receipt</span>
<span class="text-secondary font-semibold">Paid #TAL-9941</span>
</div>
</div>
<div class="flex items-center justify-between pt-2 text-on-surface-variant font-label-sm">
<span class="">Roster Locked</span>
<span class="text-secondary font-bold">Confirmed</span>
</div>
</div>
<!-- Item 2.1: Certified Wheat Seed (Category: inputs - ATTENTION NEEDED) -->
<div class="audit-card cat-inputs flex flex-col justify-between p-5 rounded-2xl bg-surface-container-lowest shadow-md gap-4 relative overflow-hidden" id="seedAuditCard">
<div class="absolute left-0 top-0 bottom-0 w-1.5 bg-error"></div>
<div class="flex items-start justify-between gap-2 pl-1">
<div class="flex flex-col">
<span class="font-label-sm text-error font-semibold uppercase">Seed Inventory (Bottleneck)</span>
<h4 class="font-title-lg text-on-surface">Sonalika HD-2967 Seed</h4>
</div>
<span class="w-8 h-8 rounded-full bg-error-container text-on-error-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[18px]">pending</span>
</span>
</div>
<div class="flex flex-col gap-2 font-body-sm text-on-surface-variant pl-1">
<p class="">Required: <span class="text-on-surface font-semibold">340 kg</span> · On farm: <span class="text-on-surface font-semibold">180 kg</span> (Certified bag tag intact).</p>
<div class="p-2.5 rounded-xl bg-error-container/30 flex items-center justify-between text-on-surface font-label-sm">
<span class="">Remaining 160 kg</span>
<span class="text-error font-bold">Reserved at Kendra</span>
</div>
</div>
<div class="flex items-center justify-between pt-2 text-on-surface-variant font-label-sm pl-1">
<span class="">Pickup: Hingoli (12 km)</span>
<span class="text-error font-bold">Oct 29 Pickup</span>
</div>
</div>
<!-- Item 2.2: Trichoderma (Category: inputs) -->
<div class="audit-card cat-inputs flex flex-col justify-between p-5 rounded-2xl bg-surface-container-lowest shadow-md gap-4">
<div class="flex items-start justify-between gap-2">
<div class="flex flex-col">
<span class="font-label-sm text-secondary font-semibold uppercase">Bio-Inoculant</span>
<h4 class="font-title-lg text-on-surface">Trichoderma viride + Pseudo.</h4>
</div>
<span class="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[18px]">check</span>
</span>
</div>
<div class="flex flex-col gap-2 font-body-sm text-on-surface-variant">
<p class="">Need: 1.7 kg · In stock: <span class="text-on-surface font-semibold">2.0 kg fresh pack</span> (Mfg: Sept 2025).</p>
<div class="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between text-on-surface font-label-sm">
<span class="">Seed Coating Drum</span>
<span class="text-secondary font-semibold">Sanitized &amp; Ready</span>
</div>
</div>
<div class="flex items-center justify-between pt-2 text-on-surface-variant font-label-sm">
<span class="">Storage: Dry Pantry</span>
<span class="text-secondary font-bold">Available</span>
</div>
</div>
<!-- Item 2.3: NPK Fertigation (Category: inputs) -->
<div class="audit-card cat-inputs flex flex-col justify-between p-5 rounded-2xl bg-surface-container-lowest shadow-md gap-4">
<div class="flex items-start justify-between gap-2">
<div class="flex flex-col">
<span class="font-label-sm text-secondary font-semibold uppercase">Soluble Fertilizer</span>
<h4 class="font-title-lg text-on-surface">NPK 19:19:19 (Water Soluble)</h4>
</div>
<span class="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[18px]">check</span>
</span>
</div>
<div class="flex flex-col gap-2 font-body-sm text-on-surface-variant">
<p class="">Required: 6 bags (150 kg) for basal &amp; first 25-day fertigation cycles.</p>
<div class="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between text-on-surface font-label-sm">
<span class="">Current Stock</span>
<span class="text-secondary font-semibold">6 bags in shed</span>
</div>
</div>
<div class="flex items-center justify-between pt-2 text-on-surface-variant font-label-sm">
<span class="">Grade: 100% Soluble</span>
<span class="text-secondary font-bold">100% Stored</span>
</div>
</div>
<!-- Item 2.4: Micronutrients (Category: inputs) -->
<div class="audit-card cat-inputs flex flex-col justify-between p-5 rounded-2xl bg-surface-container-lowest shadow-md gap-4">
<div class="flex items-start justify-between gap-2">
<div class="flex flex-col">
<span class="font-label-sm text-secondary font-semibold uppercase">Soil Correction</span>
<h4 class="font-title-lg text-on-surface">Zinc Sulphate (21%) &amp; Boron</h4>
</div>
<span class="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[18px]">check</span>
</span>
</div>
<div class="flex flex-col gap-2 font-body-sm text-on-surface-variant">
<p class="">Need: 25 kg ZnSO4 + 5 kg Boron for vertisol micronutrient balancing.</p>
<div class="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between text-on-surface font-label-sm">
<span class="">Stock in Store</span>
<span class="text-secondary font-semibold">25 kg + 5 kg Sealed</span>
</div>
</div>
<div class="flex items-center justify-between pt-2 text-on-surface-variant font-label-sm">
<span class="">Soil Rec Check</span>
<span class="text-secondary font-bold">Verified</span>
</div>
</div>
<!-- Item 2.5: Neem Oil (Category: inputs) -->
<div class="audit-card cat-inputs flex flex-col justify-between p-5 rounded-2xl bg-surface-container-lowest shadow-md gap-4">
<div class="flex items-start justify-between gap-2">
<div class="flex flex-col">
<span class="font-label-sm text-secondary font-semibold uppercase">Organic Prophylaxis</span>
<h4 class="font-title-lg text-on-surface">Cold-Pressed Neem Oil (10K PPM)</h4>
</div>
<span class="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[18px]">check</span>
</span>
</div>
<div class="flex flex-col gap-2 font-body-sm text-on-surface-variant">
<p class="">Need: 2 Liters for early aphid and armyworm prophylactic barrier.</p>
<div class="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between text-on-surface font-label-sm">
<span class="">Stock Available</span>
<span class="text-secondary font-semibold">2x 1L bottles</span>
</div>
</div>
<div class="flex items-center justify-between pt-2 text-on-surface-variant font-label-sm">
<span class="">Organic Bio-grade</span>
<span class="text-secondary font-bold">Ready</span>
</div>
</div>
<!-- Item 3.1: Mahindra Tractor (Category: machinery) -->
<div class="audit-card cat-machinery flex flex-col justify-between p-5 rounded-2xl bg-surface-container-lowest shadow-md gap-4">
<div class="flex items-start justify-between gap-2">
<div class="flex flex-col">
<span class="font-label-sm text-secondary font-semibold uppercase">Heavy Machinery</span>
<h4 class="font-title-lg text-on-surface">Mahindra 575 DI (45 HP)</h4>
</div>
<span class="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[18px]">check</span>
</span>
</div>
<div class="flex flex-col gap-2 font-body-sm text-on-surface-variant">
<p class="">Rotavator blades greased; engine oil replaced at 500-hour milestone.</p>
<div class="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between text-on-surface font-label-sm">
<span class="">Diesel Reserve</span>
<span class="text-secondary font-semibold">45 L Full Tank</span>
</div>
</div>
<div class="flex items-center justify-between pt-2 text-on-surface-variant font-label-sm">
<span class="">Mechanic Sign-off</span>
<span class="text-secondary font-bold">100% Operational</span>
</div>
</div>
<!-- Item 3.2: Seed Drill (Category: machinery) -->
<div class="audit-card cat-machinery flex flex-col justify-between p-5 rounded-2xl bg-surface-container-lowest shadow-md gap-4">
<div class="flex items-start justify-between gap-2">
<div class="flex flex-col">
<span class="font-label-sm text-secondary font-semibold uppercase">Precision Implement</span>
<h4 class="font-title-lg text-on-surface">9-Tyne Zero-Till Seed Drill</h4>
</div>
<span class="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[18px]">check</span>
</span>
</div>
<div class="flex flex-col gap-2 font-body-sm text-on-surface-variant">
<p class="">Fluted rollers calibrated for exactly 40 kg/acre seed rate and basal NPK.</p>
<div class="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between text-on-surface font-label-sm">
<span class="">Coulter Clearance</span>
<span class="text-secondary font-semibold">Sharp &amp; Adjusted</span>
</div>
</div>
<div class="flex items-center justify-between pt-2 text-on-surface-variant font-label-sm">
<span class="">Calibration Date</span>
<span class="text-secondary font-bold">Oct 27 Confirmed</span>
</div>
</div>
<!-- Item 3.3: Power & Solar (Category: machinery) -->
<div class="audit-card cat-machinery flex flex-col justify-between p-5 rounded-2xl bg-surface-container-lowest shadow-md gap-4">
<div class="flex items-start justify-between gap-2">
<div class="flex flex-col">
<span class="font-label-sm text-secondary font-semibold uppercase">Energy &amp; Grid</span>
<h4 class="font-title-lg text-on-surface">3-Phase Feeder + 5kVA Solar</h4>
</div>
<span class="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[18px]">check</span>
</span>
</div>
<div class="flex flex-col gap-2 font-body-sm text-on-surface-variant">
<p class="">8-hr roster (6 AM - 2 PM Hingoli feeder). Solar sync operational.</p>
<div class="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between text-on-surface font-label-sm">
<span class="">Irrigation Controller</span>
<span class="text-secondary font-semibold">Battery Staged 100%</span>
</div>
</div>
<div class="flex items-center justify-between pt-2 text-on-surface-variant font-label-sm">
<span class="">Power Continuity</span>
<span class="text-secondary font-bold">Stable Roster</span>
</div>
</div>
<!-- Item 4.1: Cashflow Sowing Phase (Category: capital) -->
<div class="audit-card cat-capital flex flex-col justify-between p-5 rounded-2xl bg-surface-container-lowest shadow-md gap-4">
<div class="flex items-start justify-between gap-2">
<div class="flex flex-col">
<span class="font-label-sm text-secondary font-semibold uppercase">Liquid Cash</span>
<h4 class="font-title-lg text-on-surface">Sowing Phase Cash Outlay</h4>
</div>
<span class="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[18px]">check</span>
</span>
</div>
<div class="flex flex-col gap-2 font-body-sm text-on-surface-variant">
<p class="">Required: <span class="text-on-surface font-semibold">₹38,000</span> (Labor ₹12K + Seed Bal ₹7.2K + Diesel ₹4.8K + Prep ₹14K).</p>
<div class="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between text-on-surface font-label-sm">
<span class="">Bank of Maharashtra</span>
<span class="text-secondary font-semibold">₹45,000 In Savings</span>
</div>
</div>
<div class="flex items-center justify-between pt-2 text-on-surface-variant font-label-sm">
<span class="">Buffer Margin</span>
<span class="text-secondary font-bold">+₹7,000 Surplus</span>
</div>
</div>
<!-- Item 4.2: Contingency KCC Limit (Category: capital) -->
<div class="audit-card cat-capital flex flex-col justify-between p-5 rounded-2xl bg-surface-container-lowest shadow-md gap-4">
<div class="flex items-start justify-between gap-2">
<div class="flex flex-col">
<span class="font-label-sm text-secondary font-semibold uppercase">Credit Headroom</span>
<h4 class="font-title-lg text-on-surface">Kisan Credit Card (KCC) Limit</h4>
</div>
<span class="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[18px]">check</span>
</span>
</div>
<div class="flex flex-col gap-2 font-body-sm text-on-surface-variant">
<p class="">₹1,20,000 unutilized credit limit active on RuPay card at subsidized 4%.</p>
<div class="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between text-on-surface font-label-sm">
<span class="">Contingency Buffer</span>
<span class="text-secondary font-semibold">Available on Demand</span>
</div>
</div>
<div class="flex items-center justify-between pt-2 text-on-surface-variant font-label-sm">
<span class="">Card Expiry</span>
<span class="text-on-surface font-semibold">Valid 2028</span>
</div>
</div>
<!-- Item 4.3: Crop Insurance (Category: capital) -->
<div class="audit-card cat-capital flex flex-col justify-between p-5 rounded-2xl bg-surface-container-lowest shadow-md gap-4">
<div class="flex items-start justify-between gap-2">
<div class="flex flex-col">
<span class="font-label-sm text-tertiary font-semibold uppercase">Risk Mitigation</span>
<h4 class="font-title-lg text-on-surface">PMFBY Rabi Insurance</h4>
</div>
<span class="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[18px]">verified</span>
</span>
</div>
<div class="flex flex-col gap-2 font-body-sm text-on-surface-variant">
<p class="">Portal window open through Dec 15. Standard premium: ₹2,850 earmarked.</p>
<div class="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between text-on-surface font-label-sm">
<span class="">Aadhaar &amp; 7/12 Land Record</span>
<span class="text-secondary font-semibold">Pre-uploaded</span>
</div>
</div>
<div class="flex items-center justify-between pt-2 text-on-surface-variant font-label-sm">
<span class="">Scheme Coverage</span>
<span class="text-tertiary font-bold">100% Eligible</span>
</div>
</div>
<!-- Item 5.1: Sowing Crew (Category: labor) -->
<div class="audit-card cat-labor flex flex-col justify-between p-5 rounded-2xl bg-surface-container-lowest shadow-md gap-4">
<div class="flex items-start justify-between gap-2">
<div class="flex flex-col">
<span class="font-label-sm text-secondary font-semibold uppercase">Farm Hands</span>
<h4 class="font-title-lg text-on-surface">Sowing Day Workcrew (4 Hands)</h4>
</div>
<span class="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[18px]">check</span>
</span>
</div>
<div class="flex flex-col gap-2 font-body-sm text-on-surface-variant">
<p class="">4 experienced farm workers contracted for Nov 02–03 for seed treatment &amp; drill pacing.</p>
<div class="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between text-on-surface font-label-sm">
<span class="">Daily Wage Advance</span>
<span class="text-secondary font-semibold">Agreed ₹500/day</span>
</div>
</div>
<div class="flex items-center justify-between pt-2 text-on-surface-variant font-label-sm">
<span class="">Attendance Lead</span>
<span class="text-secondary font-bold">Confirmed by Tukaram</span>
</div>
</div>
<!-- Item 5.2: KVK Agronomist Hotline (Category: labor) -->
<div class="audit-card cat-labor flex flex-col justify-between p-5 rounded-2xl bg-surface-container-lowest shadow-md gap-4">
<div class="flex items-start justify-between gap-2">
<div class="flex flex-col">
<span class="font-label-sm text-secondary font-semibold uppercase">Agronomic Guidance</span>
<h4 class="font-title-lg text-on-surface">Hingoli KVK Agronomist</h4>
</div>
<span class="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[18px]">check</span>
</span>
</div>
<div class="flex flex-col gap-2 font-body-sm text-on-surface-variant">
<p class="">Dr. Vilas Rao (Wheat Specialist, Hingoli KVK) scheduled for pre-sowing call on Nov 01.</p>
<div class="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between text-on-surface font-label-sm">
<span class="">Advisory Focus</span>
<span class="text-primary font-semibold">Seed Treatment Ratio</span>
</div>
</div>
<div class="flex items-center justify-between pt-2 text-on-surface-variant font-label-sm">
<span class="">Call Slot</span>
<span class="text-secondary font-bold">Nov 01 · 9:30 AM</span>
</div>
</div>
</div>
</section>
<!-- Autonomy & Scientific Integrity Footer -->
<footer class="p-6 rounded-2xl bg-surface-container-low flex flex-col md:flex-row items-center justify-between gap-4" style="background: rgba(255, 255, 255, 0.72); backdrop-filter: blur(24px) saturate(190%); border: 1px solid rgba(255, 255, 255, 0.75); box-shadow: rgba(16, 78, 45, 0.05) 0px 10px 36px 0px, rgba(255, 255, 255, 0.9) 0px 1px 1px 0px inset;">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[22px]">verified_user</span>
</div>
<div class="flex flex-col">
<span class="font-label-md text-primary font-bold">KrishiMitra Scientific Integrity Guarantee</span>
<span class="font-body-sm text-on-surface-variant">
              Zero retail sponsorship bias. Audit calculations strictly derived from ICAR wheat package protocols and Shivaji Patil's verified 8.5-acre soil survey.
            </span>
</div>
</div>
<div class="flex items-center gap-2 text-on-surface-variant font-label-sm shrink-0">
<span class="">Audit Rev: 2025.10.28</span>
<span class="">•</span>
<a class="text-primary hover:underline" href="#">Download Audit Log</a>
</div>
</footer>
</div>
</div>
</div>
<script>
  function filterAudit(category) {
    const pills = document.querySelectorAll('.cat-pill');
    pills.forEach(p => {
      p.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
      p.classList.add('text-on-surface-variant', 'hover:bg-surface-container-high');
    });

    event.currentTarget.classList.add('bg-primary', 'text-on-primary', 'shadow-sm');
    event.currentTarget.classList.remove('text-on-surface-variant', 'hover:bg-surface-container-high');

    const cards = document.querySelectorAll('.audit-card');
    cards.forEach(card => {
      if (category === 'all' || card.classList.contains(`cat-${category}`)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  function markAsPicked() {
    const btn = document.getElementById('markPickedBtn');
    const ring = document.getElementById('scoreRing');
    const scoreText = document.getElementById('scoreText');
    const seedCard = document.getElementById('seedAuditCard');

    btn.innerHTML = '<span class="material-symbols-outlined text-[18px]">check</span> Picked Up &amp; Verified';
    btn.classList.remove('bg-secondary');
    btn.classList.add('bg-primary-container', 'text-on-primary-container', 'pointer-events-none');

    // Smoothly animate score to 100%
    scoreText.innerText = '100%';
    ring.setAttribute('stroke-dashoffset', '0');

    if (seedCard) {
      seedCard.querySelector('.text-error').innerText = 'Seed Fully Staged (340 kg)';
      seedCard.querySelector('.text-error').classList.replace('text-error', 'text-secondary');
    }
  }

  function triggerDiagnostic() {
    const btn = event.currentTarget;
    const icon = btn.querySelector('.material-symbols-outlined');
    icon.classList.add('animate-spin');
    setTimeout(() => {
      icon.classList.remove('animate-spin');
    }, 1200);
  }
</script></main></div>

</body></html>
```

---

## `krishimitra_reports_historical_audits/code.html`

```html
<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"><meta content="web_dashboard" name="shell-type"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"><link href="https://fonts.googleapis.com" rel="preconnect"><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "surface-container-highest": "#e4e2dd", "tertiary": "#002f3d", "tertiary-container": "#00475a", "on-tertiary": "#ffffff", "primary-container": "#164a34", "surface-bright": "#fbf9f3", "on-secondary-fixed-variant": "#00522b", "outline": "#717973", "on-primary-fixed": "#002113", "on-secondary-container": "#1f7042", "on-error": "#ffffff", "on-surface": "#1b1c18", "secondary-fixed": "#a4f4ba", "on-secondary-fixed": "#00210e", "surface-container-high": "#eae8e2", "surface-variant": "#e4e2dd", "error-container": "#ffdad6", "secondary": "#196c3e", "secondary-container": "#a1f1b7", "surface-container-lowest": "#ffffff", "on-primary-container": "#85b99c", "surface-tint": "#366850", "inverse-surface": "#30312d", "on-tertiary-container": "#6ab7d5", "on-error-container": "#93000a", "primary-fixed-dim": "#9dd2b5", "surface-dim": "#dcdad4", "surface": "#fbf9f3", "inverse-primary": "#9dd2b5", "primary": "#003320", "surface-container-low": "#f5f3ed", "tertiary-fixed": "#baeaff", "inverse-on-surface": "#f3f1eb", "surface-container": "#f0eee8", "outline-variant": "#c0c9c1", "on-tertiary-fixed": "#001f29", "background": "#fbf9f3", "on-secondary": "#ffffff", "error": "#ba1a1a", "secondary-fixed-dim": "#88d8a0", "on-primary": "#ffffff", "on-background": "#1b1c18", "on-primary-fixed-variant": "#1d5039", "tertiary-fixed-dim": "#84d1f0", "primary-fixed": "#b9efd0", "on-surface-variant": "#404943", "on-tertiary-fixed-variant": "#004d62" }, "borderRadius": { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" }, "spacing": { "margin-mobile": "1rem", "space-md": "1rem", "gutter-mobile": "1rem", "gutter": "1.5rem", "space-lg": "1.5rem", "space-xl": "2.5rem", "margin": "3rem", "space-sm": "0.5rem", "space-xs": "0.25rem" }, "fontFamily": { "title-lg": ["Plus Jakarta Sans"], "label-lg": ["Plus Jakarta Sans"], "headline-md": ["Plus Jakarta Sans"], "display-lg-mobile": ["Plus Jakarta Sans"], "label-sm": ["Plus Jakarta Sans"], "body-lg": ["Plus Jakarta Sans"], "headline-lg-mobile": ["Plus Jakarta Sans"], "title-md": ["Plus Jakarta Sans"], "body-md": ["Plus Jakarta Sans"], "headline-lg": ["Plus Jakarta Sans"], "body-sm": ["Plus Jakarta Sans"], "display-lg": ["Plus Jakarta Sans"], "label-md": ["Plus Jakarta Sans"], "headline-sm": ["Plus Jakarta Sans"] }, "fontSize": { "title-lg": ["18px", { "lineHeight": "26px", "fontWeight": "600" }], "label-lg": ["14px", { "lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "600" }], "headline-md": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600" }], "display-lg-mobile": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700" }], "label-sm": ["11px", { "lineHeight": "14px", "letterSpacing": "0.02em", "fontWeight": "500" }], "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }], "headline-lg-mobile": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600" }], "title-md": ["16px", { "lineHeight": "24px", "fontWeight": "600" }], "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }], "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700" }], "body-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }], "display-lg": ["44px", { "lineHeight": "52px", "letterSpacing": "-0.02em", "fontWeight": "700" }], "label-md": ["12px", { "lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "600" }], "headline-sm": ["20px", { "lineHeight": "28px", "fontWeight": "600" }] } } } };</script></head><body class="bg-background font-body-md text-on-surface antialiased" style="background: radial-gradient(at 10% 10%, rgba(34, 197, 94, 0.18) 0px, transparent 50%) fixed, radial-gradient(at 90% 15%, rgba(16, 185, 129, 0.16) 0px, transparent 50%), radial-gradient(rgba(5, 150, 105, 0.08) 0px, transparent 60%), radial-gradient(at 15% 85%, rgba(132, 204, 22, 0.15) 0px, transparent 50%), radial-gradient(at 85% 90%, rgba(16, 185, 129, 0.18) 0px, transparent 50%), rgb(248, 250, 247);"><aside class="fixed left-0 top-0 h-full w-64 bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between pt-5 pb-6" style="background: rgba(255, 255, 255, 0.72); backdrop-filter: blur(24px) saturate(190%); border-right: 1px solid rgba(255, 255, 255, 0.75); box-shadow: rgba(16, 78, 45, 0.06) 0px 10px 36px 0px, rgba(255, 255, 255, 0.8) -1px 0px 1px 0px inset;"><div class="flex flex-col gap-6"><div class="px-6 flex items-center gap-3"><img alt="Brand logo. - Primary color: #164a34
- Font: plusJakartaSans
- Mode: light
- Roundness: rounded-md
" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1UwvheEflVQETpVODXud1bKJQLTG3Z9V091WAQuRWb3OjkfynIYN40ImZHKnidhICqNkNrqFqpWKzSfZlgxI5J_M82iY6odlXGtsZTTc8HXdVBAz6ryKsSz-P5wU6ZoKTCO5D247hagw2iNx0PZZfjdthMC8zjpWAGLJh7xg4qo3i9LZdCn7j6gGxugjmJTrMiBN0EKKxLQuSsUMZx2F7LChrzofAoNzJDssH-iE5FNMrlgSgXlD6etBto"><div class="flex flex-col"><span class="font-title-lg text-primary tracking-tight leading-none">KrishiMitra</span><span class="font-label-sm text-secondary">Agri-Advisory OS</span></div></div><nav class="flex flex-col px-3 space-y-1" data-active-classes="bg-primary-container text-on-primary-container font-title-md"><a class="flex items-center px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="dashboard" href="#">Dashboard</a><a class="flex items-center px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="my-farms" href="#">My Farms</a><a class="flex items-center px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="plans" href="#">Plans</a><a class="flex items-center px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="compare" href="#">Compare</a><a class="flex items-center px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="recommendations" href="#">Recommendations</a><a class="flex items-center px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="resource-check" href="#">Resource Check</a><a class="flex items-center px-3 py-2.5 rounded-lg font-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="reports" href="#">Reports</a></nav></div><div class="px-4"><div class="p-3 bg-surface-container rounded-xl flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div><div class="flex flex-col min-w-0 flex-1"><span class="font-label-lg text-on-surface truncate">Ramesh Deshmukh</span><span class="font-label-sm text-on-surface-variant truncate">Shivaji Nagar Farm #2</span></div><span class="material-symbols-outlined text-on-surface-variant text-[18px]">unfold_more</span></div></div></aside><div class="pl-64"><header class="fixed top-0 left-64 right-0 h-16 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-8" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(24px) saturate(190%); border-bottom: 1px solid rgba(255, 255, 255, 0.75); box-shadow: rgba(16, 78, 45, 0.05) 0px 10px 36px 0px, rgba(255, 255, 255, 0.9) 0px -1px 1px 0px inset;"><div class="flex items-center gap-3"><img alt="Brand logo. - Primary color: #164a34
- Font: plusJakartaSans
- Mode: light
- Roundness: rounded-md
" class="h-7 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1UwvheEflVQETpVODXud1bKJQLTG3Z9V091WAQuRWb3OjkfynIYN40ImZHKnidhICqNkNrqFqpWKzSfZlgxI5J_M82iY6odlXGtsZTTc8HXdVBAz6ryKsSz-P5wU6ZoKTCO5D247hagw2iNx0PZZfjdthMC8zjpWAGLJh7xg4qo3i9LZdCn7j6gGxugjmJTrMiBN0EKKxLQuSsUMZx2F7LChrzofAoNzJDssH-iE5FNMrlgSgXlD6etBto"><span class="font-title-md text-on-surface hidden sm:inline">KrishiMitra Management</span></div><div class="flex items-center gap-4"><div class="flex items-center bg-surface-container px-2 py-1 rounded-lg"><span class="material-symbols-outlined text-[18px] text-on-surface-variant mr-1">translate</span><select class="bg-transparent font-label-md text-on-surface outline-none cursor-pointer pr-1"><option value="en">English</option><option value="hi">हिंदी</option><option value="mr">मराठी</option></select></div><button class="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-low rounded-lg font-label-md text-on-surface hover:bg-surface-container-high transition-colors"><span class="material-symbols-outlined text-[18px] text-secondary">wb_sunny</span><span class="">Nashik 28°C · Soil Wet</span></button><button class="p-2 text-on-surface-variant hover:text-on-surface transition-colors"><span class="material-symbols-outlined text-[22px]">notifications</span></button><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></header><main class="relative pt-16 w-full min-h-screen bg-surface" style="background: transparent;"><div class="flex flex-col w-full">
<!-- Content Canvas: Organic Paper Surface, Responsive Fluid Layout -->
<div class="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 space-y-8">
<!-- Section 1: Header, Breadcrumb Context & Global Actions -->
<section class="space-y-4">
<!-- Breadcrumb & Status Pill -->
<div class="flex flex-wrap items-center justify-between gap-3">
<nav aria-label="Breadcrumb" class="flex items-center gap-2 font-label-md text-on-surface-variant flex-wrap">
<span class="flex items-center gap-1 hover:text-on-surface cursor-pointer">
<span class="material-symbols-outlined text-[16px] text-secondary">database</span>
<span class="">Reports &amp; Audits</span>
</span>
<span class="material-symbols-outlined text-[14px] text-outline-variant">chevron_right</span>
<span class="hover:text-on-surface cursor-pointer">Shivaji Patil Farm (Plots 2A-2D)</span>
<span class="material-symbols-outlined text-[14px] text-outline-variant">chevron_right</span>
<span class="text-primary font-label-lg bg-surface-container-high px-2.5 py-0.5 rounded-full">
            Historical Performance &amp; Bank Ledgers
          </span>
</nav>
<div class="flex items-center gap-2">
<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/70 text-on-secondary-container font-label-md">
<span class="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            Blockchain Ledger Verified · UID: MH-HNG-2024-884
          </span>
</div>
</div>
<!-- Main Header Row with Context & Actions -->
<div class="flex flex-col lg:flex-row lg:items-end justify-between gap-5 bg-surface-container-lowest p-6 sm:p-7 rounded-2xl shadow-sm" style="background: rgba(255, 255, 255, 0.78); backdrop-filter: blur(24px) saturate(190%); border: 1px solid rgba(255, 255, 255, 0.85); box-shadow: rgba(16, 78, 45, 0.06) 0px 10px 36px 0px, rgba(255, 255, 255, 0.95) 0px 1px 2px 0px inset;">
<div class="space-y-2 max-w-3xl">
<div class="flex items-center gap-2.5 text-secondary">
<span class="material-symbols-outlined text-[22px]">verified</span>
<span class="font-label-lg tracking-wide uppercase">Institutional-Grade Agricultural Audit Dossier</span>
</div>
<h1 class="font-headline-lg text-primary tracking-tight">
            Multi-Season Audit Ledger &amp; Field Telemetry
          </h1>
<p class="font-body-md text-on-surface-variant leading-relaxed">
            Forensic agronomic accountability across 4 consecutive cropping cycles. Pre-sowing machine learning estimates contrasted against real APMC mandi returns, sensor-verified moisture draws, and soil carbon trajectories.
          </p>
</div>
<!-- Export & Document Generator Buttons -->
<div class="flex flex-wrap items-center gap-3 sm:self-start lg:self-end shrink-0">
<button class="inline-flex items-center gap-2 px-4 py-3 bg-surface-container-low hover:bg-surface-container text-on-surface font-label-lg rounded-xl transition-all shadow-sm">
<span class="material-symbols-outlined text-[20px] text-primary">account_balance</span>
<span class="">KCC Bank Certification</span>
</button>
<button class="inline-flex items-center gap-2 px-5 py-3 bg-primary hover:bg-primary-container text-on-primary font-label-lg rounded-xl transition-all shadow-md active:scale-95">
<span class="material-symbols-outlined text-[20px]">picture_as_pdf</span>
<span class="">Export Full Dossier (PDF)</span>
</button>
</div>
</div>
<!-- Farm Meta Bar: Quick Glance Field DNA -->
<div class="grid grid-cols-2 md:grid-cols-4 gap-3 bg-surface-container p-4 rounded-xl font-label-md text-on-surface-variant" style="background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(16px) saturate(180%); border: 1px solid rgba(255, 255, 255, 0.65); box-shadow: rgba(16, 78, 45, 0.04) 0px 4px 20px 0px, rgba(255, 255, 255, 0.9) 0px 1px 1px 0px inset;">
<div class="flex items-center gap-2.5 px-2">
<span class="material-symbols-outlined text-secondary text-[20px]">landscape</span>
<div class="flex flex-col">
<span class="text-on-surface font-title-md">8.50 Acres</span>
<span class="font-label-sm text-outline">Deep Vertisol (Black Cotton)</span>
</div>
</div>
<div class="flex items-center gap-2.5 px-2">
<span class="material-symbols-outlined text-tertiary-container text-[20px]">location_on</span>
<div class="flex flex-col">
<span class="text-on-surface font-title-md">Hingoli Sub-Basin</span>
<span class="font-label-sm text-outline">Marathwada · Maharashtra</span>
</div>
</div>
<div class="flex items-center gap-2.5 px-2">
<span class="material-symbols-outlined text-secondary text-[20px]">balance</span>
<div class="flex flex-col">
<span class="text-on-surface font-title-md">24.64 Metric Tonnes</span>
<span class="font-label-sm text-outline">4 Harvest Cycles Evaluated</span>
</div>
</div>
<div class="flex items-center gap-2.5 px-2">
<span class="material-symbols-outlined text-primary text-[20px]">analytics</span>
<div class="flex flex-col">
<span class="text-on-surface font-title-md">93.8% Forecast Fidelity</span>
<span class="font-label-sm text-outline">Agronomic Plan Confidence</span>
</div>
</div>
</div>
</section>
<!-- Filter & Live Query Toolbar -->
<section class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-surface-container-lowest p-3.5 sm:p-4 rounded-xl shadow-sm" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(24px) saturate(190%); border: 1px solid rgba(255, 255, 255, 0.8); box-shadow: rgba(16, 78, 45, 0.06) 0px 10px 36px 0px, rgba(255, 255, 255, 0.9) 0px 1px 1px 0px inset;">
<div class="flex flex-wrap items-center gap-2.5">
<span class="font-label-sm text-on-surface-variant uppercase px-2">Timeline Scope:</span>
<div class="relative">
<select class="appearance-none bg-surface-container-low pl-3.5 pr-9 py-2 rounded-lg font-label-md text-on-surface outline-none cursor-pointer hover:bg-surface-container transition-colors" id="seasonFilter">
<option value="all">All Available Cycles (2023 - 2025)</option>
<option value="rabi-2425">Rabi 2024-25 (Wheat Precision · Active)</option>
<option value="kharif-2025">Kharif 2025 (Cotton &amp; Tur · Harvested)</option>
<option value="rabi-2324">Rabi 2023-24 (Desi Gram · Audited)</option>
<option value="kharif-2024">Kharif 2024 (Soybean Pilot · Baseline)</option>
</select>
<span class="material-symbols-outlined pointer-events-none absolute right-2.5 top-2.5 text-[18px] text-on-surface-variant">expand_more</span>
</div>
<div class="relative">
<select class="appearance-none bg-surface-container-low pl-3.5 pr-9 py-2 rounded-lg font-label-md text-on-surface outline-none cursor-pointer hover:bg-surface-container transition-colors">
<option>Audit Type: All Institutional (Bank / APMC / PMFBY)</option>
<option>APMC Mandi Weighment Slips</option>
<option>PMFBY Drone &amp; NDVI Crop Loss</option>
<option>MahaDBT Drip Micro-Irrigation</option>
</select>
<span class="material-symbols-outlined pointer-events-none absolute right-2.5 top-2.5 text-[18px] text-on-surface-variant">expand_more</span>
</div>
</div>
<div class="flex items-center gap-2">
<div class="relative w-full sm:w-64">
<span class="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-on-surface-variant">search</span>
<input class="w-full bg-surface-container-low pl-9 pr-3 py-2 rounded-lg font-body-sm text-on-surface placeholder:text-outline outline-none focus:bg-surface-container transition-colors" placeholder="Search bill #, lot, crop, or mandi..." type="text">
</div>
<button class="p-2 bg-surface-container-low hover:bg-surface-container rounded-lg text-on-surface-variant hover:text-on-surface transition-colors" title="Print Selected Records">
<span class="material-symbols-outlined text-[20px]">print</span>
</button>
</div>
</section>
<!-- Section 2: Multi-Year Historical Performance Overview (Hero Scorecards) -->
<section class="space-y-4">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary text-[22px]">ssid_chart</span>
<h2 class="font-headline-sm text-primary">Cumulative Agronomic &amp; Fiscal Ledger</h2>
</div>
<span class="font-label-sm text-outline">Independent Agro-Economic Audit Benchmark</span>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
<!-- Card 1: Profit Realized -->
<div class="bg-surface-container-lowest p-6 rounded-2xl shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(24px) saturate(190%); border: 1px solid rgba(255, 255, 255, 0.75); box-shadow: rgba(16, 78, 45, 0.06) 0px 10px 36px 0px, rgba(255, 255, 255, 0.9) 0px 1px 1px 0px inset;">
<div class="absolute top-0 left-0 w-1.5 h-full bg-secondary"></div>
<div class="space-y-3">
<div class="flex items-center justify-between">
<span class="font-label-sm uppercase tracking-wider text-outline">Realized Net Profit</span>
<span class="p-1.5 rounded-lg bg-secondary-container/50 text-on-secondary-container material-symbols-outlined text-[18px]">currency_rupee</span>
</div>
<div class="space-y-1">
<span class="font-display-lg text-primary">₹6,42,800</span>
<div class="flex items-center gap-1 font-label-md text-secondary">
<span class="material-symbols-outlined text-[16px]">trending_up</span>
<span class="">+₹1,18,400 via Plan Optimization</span>
</div>
</div>
</div>
<div class="pt-4 mt-4 bg-surface-container-low -mx-6 -mb-6 px-6 py-3 flex items-center justify-between text-on-surface-variant font-label-sm">
<span class="">Historical ROI Uplift:</span>
<span class="font-title-md text-secondary">+18.4% Net</span>
</div>
</div>
<!-- Card 2: Water Conserved -->
<div class="bg-surface-container-lowest p-6 rounded-2xl shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(24px) saturate(190%); border: 1px solid rgba(255, 255, 255, 0.75); box-shadow: rgba(16, 78, 45, 0.06) 0px 10px 36px 0px, rgba(255, 255, 255, 0.9) 0px 1px 1px 0px inset;">
<div class="absolute top-0 left-0 w-1.5 h-full bg-tertiary-container"></div>
<div class="space-y-3">
<div class="flex items-center justify-between">
<span class="font-label-sm uppercase tracking-wider text-outline">Groundwater Conserved</span>
<span class="p-1.5 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed-variant material-symbols-outlined text-[18px]">water_drop</span>
</div>
<div class="space-y-1">
<span class="font-display-lg text-tertiary">6,850 m³</span>
<div class="flex items-center gap-1 font-label-md text-tertiary-container">
<span class="material-symbols-outlined text-[16px]">waves</span>
<span class="">4.8 Borewell-Months Protected</span>
</div>
</div>
</div>
<div class="pt-4 mt-4 bg-surface-container-low -mx-6 -mb-6 px-6 py-3 flex items-center justify-between text-on-surface-variant font-label-sm">
<span class="">Aquifer Depletion Risk:</span>
<span class="font-title-md text-tertiary">Zero Incursions</span>
</div>
</div>
<!-- Card 3: Model Prediction Fidelity -->
<div class="bg-surface-container-lowest p-6 rounded-2xl shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(24px) saturate(190%); border: 1px solid rgba(255, 255, 255, 0.75); box-shadow: rgba(16, 78, 45, 0.06) 0px 10px 36px 0px, rgba(255, 255, 255, 0.9) 0px 1px 1px 0px inset;">
<div class="absolute top-0 left-0 w-1.5 h-full bg-primary-container"></div>
<div class="space-y-3">
<div class="flex items-center justify-between">
<span class="font-label-sm uppercase tracking-wider text-outline">Model Forecast Accuracy</span>
<span class="p-1.5 rounded-lg bg-primary-fixed text-on-primary-fixed-variant material-symbols-outlined text-[18px]">fact_check</span>
</div>
<div class="space-y-1">
<span class="font-display-lg text-primary">93.8%</span>
<div class="flex items-center gap-1 font-label-md text-secondary">
<span class="material-symbols-outlined text-[16px]">check_circle</span>
<span class="">Within ±0.8 Q/ac Variance</span>
</div>
</div>
</div>
<div class="pt-4 mt-4 bg-surface-container-low -mx-6 -mb-6 px-6 py-3 flex items-center justify-between text-on-surface-variant font-label-sm">
<span class="">Audit Validations:</span>
<span class="font-title-md text-primary">4 / 4 Harvests Match</span>
</div>
</div>
<!-- Card 4: Soil Carbon & Health Trajectory -->
<div class="bg-surface-container-lowest p-6 rounded-2xl shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(24px) saturate(190%); border: 1px solid rgba(255, 255, 255, 0.75); box-shadow: rgba(16, 78, 45, 0.06) 0px 10px 36px 0px, rgba(255, 255, 255, 0.9) 0px 1px 1px 0px inset;">
<div class="absolute top-0 left-0 w-1.5 h-full bg-secondary"></div>
<div class="space-y-3">
<div class="flex items-center justify-between">
<span class="font-label-sm uppercase tracking-wider text-outline">Organic Carbon Index</span>
<span class="p-1.5 rounded-lg bg-surface-container text-on-surface-variant material-symbols-outlined text-[18px]">eco</span>
</div>
<div class="space-y-1">
<div class="flex items-baseline gap-2">
<span class="font-display-lg text-primary">0.64%</span>
<span class="font-title-md text-secondary line-through text-outline">0.48%</span>
</div>
<div class="flex items-center gap-1 font-label-md text-secondary">
<span class="material-symbols-outlined text-[16px]">upgrade</span>
<span class="">+33.3% Soil Rejuvenation</span>
</div>
</div>
</div>
<div class="pt-4 mt-4 bg-surface-container-low -mx-6 -mb-6 px-6 py-3 flex items-center justify-between text-on-surface-variant font-label-sm">
<span class="">Microbial Activity:</span>
<span class="font-title-md text-secondary">High (KVK Certified)</span>
</div>
</div>
</div>
</section>
<!-- Visual Anchor: Contextual Landscape Panorama -->
<div class="relative rounded-2xl overflow-hidden shadow-sm bg-surface-container">
<div class="h-44 sm:h-52 w-full bg-cover bg-center" data-alt="High-altitude aerial photography of lush green agricultural patchwork in Maharashtra with curved irrigation drainage canal through deep black cotton soil vertisols, golden sunset light, trees and farmhouses in distance, clean natural tones." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBQFpe1KFeYrOZP-tVWaa-Xt233P9Le7oLd9XfsP2zbiOXq0w9-aWS2y_50UoUJmTOiJSDLz5jWflYE3iWifiqs6kTeihWMLRfNQL3FmgLbVllB9CYmassJ22X9kYI7Bzkm_so66APeEhsIMEDPfJYzIGIu4ap1CZM7VoPpC6fnIdxCcoj8JhZF0igrQ5eG3z9-oEsyAsVLltr97uFFsHGbuwDGHCcz9z0zRoiZPv9vWmqZLCUsq9R8YA')"></div>
<div class="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent flex items-end p-6">
<div class="text-on-primary flex flex-col sm:flex-row sm:items-center justify-between w-full gap-3">
<div>
<span class="font-label-sm tracking-widest uppercase opacity-80">Telemetry Zone: Hingoli Watershed Survey #104/A</span>
<h3 class="font-title-lg font-headline-md">Plot 2A-2D Micro-Catchment Ledger</h3>
</div>
<span class="font-label-md bg-surface-container-lowest/20 backdrop-blur-md px-3.5 py-1.5 rounded-lg">
            Certified by Krishi Vigyan Kendra (KVK Hingoli)
          </span>
</div>
</div>
</div>
<!-- Section 3: Detailed Historical Season Audits & Yield Ledger -->
<section class="space-y-4">
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
<div>
<h2 class="font-headline-sm text-primary">Historical Season Audits &amp; Yield Ledger</h2>
<p class="font-body-sm text-on-surface-variant">Direct breakdown of agricultural blueprints versus verified post-harvest realities.</p>
</div>
<div class="flex items-center gap-2">
<span class="font-label-sm text-outline">Showing 4 recorded production campaigns</span>
</div>
</div>
<!-- Audit Cards Stack -->
<div class="space-y-4">
<!-- Item 1: Active Season (Rabi 2024-2025) -->
<div class="bg-surface-container-lowest rounded-2xl p-6 shadow-sm relative overflow-hidden transition-all hover:shadow-md" style="background: rgba(255, 255, 255, 0.76); backdrop-filter: blur(24px) saturate(190%); border: 1px solid rgba(255, 255, 255, 0.8); box-shadow: rgba(16, 78, 45, 0.06) 0px 10px 36px 0px, rgba(255, 255, 255, 0.95) 0px 1px 1px 0px inset;">
<div class="absolute top-0 left-0 w-2 h-full bg-secondary"></div>
<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
<!-- Left: Crop & Season Identification -->
<div class="space-y-2 lg:w-1/4">
<div class="flex items-center gap-2">
<span class="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm">
                  Active Campaign
                </span>
<span class="font-label-sm text-outline">Season #4</span>
</div>
<h3 class="font-headline-sm text-primary">Rabi 2024–2025</h3>
<p class="font-title-md text-on-surface">Drip Precision Wheat <span class="text-secondary font-label-md">(Sonalika HD-2967)</span></p>
<div class="flex items-center gap-1.5 font-label-sm text-outline">
<span class="material-symbols-outlined text-[16px]">calendar_today</span>
<span class="">Nov 02 Sowing Target · 8.5 Acres</span>
</div>
</div>
<!-- Middle: Agronomic & Economic Variance Matrix -->
<div class="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3 px-4 bg-surface-container-low rounded-xl lg:flex-1">
<div>
<span class="font-label-sm text-outline block">Forecast Target</span>
<span class="font-title-lg text-primary">21.2 Q/ac</span>
<span class="font-label-sm text-secondary block">Model Confidence 94%</span>
</div>
<div>
<span class="font-label-sm text-outline block">Harvest Actual</span>
<span class="font-title-lg text-on-surface-variant">Staged / Pod</span>
<span class="font-label-sm text-outline block">Harvest in ~62 days</span>
</div>
<div>
<span class="font-label-sm text-outline block">Water Allocation</span>
<span class="font-title-lg text-tertiary">3,450 m³</span>
<span class="font-label-sm text-tertiary-container block">Drip emitter verified</span>
</div>
<div>
<span class="font-label-sm text-outline block">Projected Net P&amp;L</span>
<span class="font-title-lg text-secondary">₹1,84,500</span>
<span class="font-label-sm text-outline block">MSP Baseline Guarded</span>
</div>
</div>
<!-- Right: Status Tag & Season Actions -->
<div class="flex flex-col items-start lg:items-end justify-between gap-3 lg:w-60">
<div class="flex items-center gap-1.5 text-secondary bg-secondary-container/40 px-3 py-1 rounded-full font-label-sm">
<span class="material-symbols-outlined text-[16px]">task_alt</span>
<span class="">Pre-Sowing Audit Verified</span>
</div>
<div class="flex items-center gap-2 w-full lg:w-auto">
<button class="flex-1 lg:flex-initial px-3.5 py-2 bg-surface-container hover:bg-surface-container-high rounded-lg text-on-surface font-label-md flex items-center justify-center gap-1.5 transition-colors">
<span class="material-symbols-outlined text-[18px]">visibility</span>
<span class="">Simulation</span>
</button>
<button class="flex-1 lg:flex-initial px-3.5 py-2 bg-primary hover:bg-primary-container text-on-primary rounded-lg font-label-md flex items-center justify-center gap-1.5 transition-colors shadow-sm">
<span class="material-symbols-outlined text-[18px]">download</span>
<span class="">Blueprint</span>
</button>
</div>
</div>
</div>
</div>
<!-- Item 2: Kharif 2025 (Completed with Gain) -->
<div class="bg-surface-container-lowest rounded-2xl p-6 shadow-sm relative overflow-hidden transition-all hover:shadow-md" style="background: rgba(255, 255, 255, 0.76); backdrop-filter: blur(24px) saturate(190%); border: 1px solid rgba(255, 255, 255, 0.8); box-shadow: rgba(16, 78, 45, 0.06) 0px 10px 36px 0px, rgba(255, 255, 255, 0.95) 0px 1px 1px 0px inset;">
<div class="absolute top-0 left-0 w-2 h-full bg-secondary"></div>
<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
<div class="space-y-2 lg:w-1/4">
<div class="flex items-center gap-2">
<span class="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm">
                  Audit Completed &amp; Cleared
                </span>
<span class="font-label-sm text-outline">Season #3</span>
</div>
<h3 class="font-headline-sm text-primary">Kharif 2025</h3>
<p class="font-title-md text-on-surface">Cotton + Pigeon Pea (Tur) Intercrop</p>
<div class="flex items-center gap-1.5 font-label-sm text-outline">
<span class="material-symbols-outlined text-[16px]">receipt_long</span>
<span class="">APMC Hingoli Ref: #KM-AUD-2025-08</span>
</div>
</div>
<div class="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3 px-4 bg-surface-container-low rounded-xl lg:flex-1">
<div>
<span class="font-label-sm text-outline block">Forecast Target</span>
<span class="font-title-lg text-on-surface-variant">14.0 Q/ac</span>
<span class="font-label-sm text-outline block">Pre-season model</span>
</div>
<div>
<span class="font-label-sm text-outline block">Harvest Actual</span>
<span class="font-title-lg text-secondary">14.6 Q/ac</span>
<span class="font-label-sm text-secondary font-title-md block">+4.28% Outperformance</span>
</div>
<div>
<span class="font-label-sm text-outline block">Water Used</span>
<span class="font-title-lg text-tertiary">4,100 m³</span>
<span class="font-label-sm text-tertiary block">-620 m³ vs regional avg</span>
</div>
<div>
<span class="font-label-sm text-outline block">Realized Net Profit</span>
<span class="font-title-lg text-secondary">₹2,14,300</span>
<span class="font-label-sm text-secondary block">+₹32,400 over Mandi avg</span>
</div>
</div>
<div class="flex flex-col items-start lg:items-end justify-between gap-3 lg:w-60">
<div class="flex items-center gap-1.5 text-secondary bg-secondary-container/40 px-3 py-1 rounded-full font-label-sm">
<span class="material-symbols-outlined text-[16px]">verified</span>
<span class="">APMC Lot #449 Verified</span>
</div>
<div class="flex items-center gap-2 w-full lg:w-auto">
<button class="flex-1 lg:flex-initial px-3.5 py-2 bg-surface-container hover:bg-surface-container-high rounded-lg text-on-surface font-label-md flex items-center justify-center gap-1.5 transition-colors">
<span class="material-symbols-outlined text-[18px]">receipt</span>
<span class="">Mandi Slip</span>
</button>
<button class="flex-1 lg:flex-initial px-3.5 py-2 bg-surface-container hover:bg-surface-container-high rounded-lg text-on-surface font-label-md flex items-center justify-center gap-1.5 transition-colors">
<span class="material-symbols-outlined text-[18px]">folder_zip</span>
<span class="">Dossier</span>
</button>
</div>
</div>
</div>
</div>
<!-- Item 3: Rabi 2023-2024 (Completed) -->
<div class="bg-surface-container-lowest rounded-2xl p-6 shadow-sm relative overflow-hidden transition-all hover:shadow-md" style="background: rgba(255, 255, 255, 0.76); backdrop-filter: blur(24px) saturate(190%); border: 1px solid rgba(255, 255, 255, 0.8); box-shadow: rgba(16, 78, 45, 0.06) 0px 10px 36px 0px, rgba(255, 255, 255, 0.95) 0px 1px 1px 0px inset;">
<div class="absolute top-0 left-0 w-2 h-full bg-secondary"></div>
<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
<div class="space-y-2 lg:w-1/4">
<div class="flex items-center gap-2">
<span class="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm">
                  Subsidies Disbursed
                </span>
<span class="font-label-sm text-outline">Season #2</span>
</div>
<h3 class="font-headline-sm text-primary">Rabi 2023–2024</h3>
<p class="font-title-md text-on-surface">Desi Chickpea / Chana (Vijay-Phule)</p>
<div class="flex items-center gap-1.5 font-label-sm text-outline">
<span class="material-symbols-outlined text-[16px]">account_balance</span>
<span class="">MahaDBT Ref: #MDBT-HNG-901</span>
</div>
</div>
<div class="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3 px-4 bg-surface-container-low rounded-xl lg:flex-1">
<div>
<span class="font-label-sm text-outline block">Forecast Target</span>
<span class="font-title-lg text-on-surface-variant">12.0 Q/ac</span>
<span class="font-label-sm text-outline block">Standard plan</span>
</div>
<div>
<span class="font-label-sm text-outline block">Harvest Actual</span>
<span class="font-title-lg text-secondary">12.4 Q/ac</span>
<span class="font-label-sm text-secondary font-title-md block">+3.33% Outperformance</span>
</div>
<div>
<span class="font-label-sm text-outline block">Water Used</span>
<span class="font-title-lg text-tertiary">2,150 m³</span>
<span class="font-label-sm text-tertiary block">Low-till moisture hold</span>
</div>
<div>
<span class="font-label-sm text-outline block">Realized Net Profit</span>
<span class="font-title-lg text-secondary">₹1,54,800</span>
<span class="font-label-sm text-secondary block">Zero wilt loss recorded</span>
</div>
</div>
<div class="flex flex-col items-start lg:items-end justify-between gap-3 lg:w-60">
<div class="flex items-center gap-1.5 text-secondary bg-secondary-container/40 px-3 py-1 rounded-full font-label-sm">
<span class="material-symbols-outlined text-[16px]">verified</span>
<span class="">KCC Bank Audit Passed</span>
</div>
<div class="flex items-center gap-2 w-full lg:w-auto">
<button class="flex-1 lg:flex-initial px-3.5 py-2 bg-surface-container hover:bg-surface-container-high rounded-lg text-on-surface font-label-md flex items-center justify-center gap-1.5 transition-colors">
<span class="material-symbols-outlined text-[18px]">verified_user</span>
<span class="">Certificate</span>
</button>
<button class="flex-1 lg:flex-initial px-3.5 py-2 bg-surface-container hover:bg-surface-container-high rounded-lg text-on-surface font-label-md flex items-center justify-center gap-1.5 transition-colors">
<span class="material-symbols-outlined text-[18px]">folder_zip</span>
<span class="">Dossier</span>
</button>
</div>
</div>
</div>
</div>
<!-- Item 4: Kharif 2024 (Pilot Season - Dry spell anomaly) -->
<div class="bg-surface-container-lowest rounded-2xl p-6 shadow-sm relative overflow-hidden transition-all hover:shadow-md" style="background: rgba(255, 255, 255, 0.76); backdrop-filter: blur(24px) saturate(190%); border: 1px solid rgba(255, 255, 255, 0.8); box-shadow: rgba(16, 78, 45, 0.06) 0px 10px 36px 0px, rgba(255, 255, 255, 0.95) 0px 1px 1px 0px inset;">
<div class="absolute top-0 left-0 w-2 h-full bg-outline-variant"></div>
<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
<div class="space-y-2 lg:w-1/4">
<div class="flex items-center gap-2">
<span class="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm">
                  First KrishiMitra Baseline Pilot
                </span>
<span class="font-label-sm text-outline">Season #1</span>
</div>
<h3 class="font-headline-sm text-primary">Kharif 2024</h3>
<p class="font-title-md text-on-surface">Soybean (JS-335 Single Stand)</p>
<div class="flex items-center gap-1.5 font-label-sm text-outline">
<span class="material-symbols-outlined text-[16px]">cloud_off</span>
<span class="">Agromet Dry-Spell Zone Event</span>
</div>
</div>
<div class="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3 px-4 bg-surface-container-low rounded-xl lg:flex-1">
<div>
<span class="font-label-sm text-outline block">Forecast Target</span>
<span class="font-title-lg text-on-surface-variant">9.5 Q/ac</span>
<span class="font-label-sm text-outline block">Pre-season model</span>
</div>
<div>
<span class="font-label-sm text-outline block">Harvest Actual</span>
<span class="font-title-lg text-on-surface">9.1 Q/ac</span>
<span class="font-label-sm text-error font-title-md block">-4.21% (Late Aug Rain Gap)</span>
</div>
<div>
<span class="font-label-sm text-outline block">Water Used</span>
<span class="font-title-lg text-tertiary">3,980 m³</span>
<span class="font-label-sm text-outline block">Supplemental sprinkler</span>
</div>
<div>
<span class="font-label-sm text-outline block">Realized Net Profit</span>
<span class="font-title-lg text-on-surface">₹89,200</span>
<span class="font-label-sm text-secondary block">Weather insurance salvaged</span>
</div>
</div>
<div class="flex flex-col items-start lg:items-end justify-between gap-3 lg:w-60">
<div class="flex items-center gap-1.5 text-on-surface-variant bg-surface-container px-3 py-1 rounded-full font-label-sm">
<span class="material-symbols-outlined text-[16px]">info</span>
<span class="">Dry Spell Analyzed</span>
</div>
<div class="flex items-center gap-2 w-full lg:w-auto">
<button class="flex-1 lg:flex-initial px-3.5 py-2 bg-surface-container hover:bg-surface-container-high rounded-lg text-on-surface font-label-md flex items-center justify-center gap-1.5 transition-colors">
<span class="material-symbols-outlined text-[18px]">replay</span>
<span class="">Agromet Log</span>
</button>
<button class="flex-1 lg:flex-initial px-3.5 py-2 bg-surface-container hover:bg-surface-container-high rounded-lg text-on-surface font-label-md flex items-center justify-center gap-1.5 transition-colors">
<span class="material-symbols-outlined text-[18px]">folder_zip</span>
<span class="">Dossier</span>
</button>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- Section 4: Predicted vs Actual Variance Analysis (Data Viz & Agronomic Root Cause) -->
<section class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
<!-- Variance Comparative Visualizer -->
<div class="lg:col-span-7 bg-surface-container-lowest p-6 sm:p-7 rounded-2xl shadow-sm space-y-6" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(24px) saturate(190%); border: 1px solid rgba(255, 255, 255, 0.8); box-shadow: rgba(16, 78, 45, 0.06) 0px 10px 36px 0px, rgba(255, 255, 255, 0.95) 0px 1px 1px 0px inset;">
<div class="flex items-center justify-between">
<div>
<span class="font-label-sm text-secondary uppercase tracking-wider">Agronomic Precision Analysis</span>
<h3 class="font-title-lg font-headline-sm text-primary">Predicted vs. Actual Yield &amp; Market Realization</h3>
</div>
<div class="flex items-center gap-3 font-label-sm">
<span class="flex items-center gap-1 text-outline"><span class="w-3 h-3 rounded-full bg-outline-variant"></span> Target Forecast</span>
<span class="flex items-center gap-1 text-primary"><span class="w-3 h-3 rounded-full bg-primary"></span> Ground Reality</span>
</div>
</div>
<!-- Metric Bars Visualization -->
<div class="space-y-5">
<!-- Item 1: Cotton & Tur -->
<div class="space-y-2">
<div class="flex justify-between font-label-md text-on-surface">
<span class="">Kharif 2025: Cotton + Pigeon Pea (Quintals / Acre)</span>
<span class="text-secondary font-title-md">14.6 Q/ac (Target: 14.0) · +4.2%</span>
</div>
<div class="h-3 w-full bg-surface-container-high rounded-full overflow-hidden flex">
<div class="bg-outline-variant h-full" style="width: 70%;"></div>
<div class="bg-secondary h-full" style="width: 4%;"></div>
</div>
<p class="font-label-sm text-on-surface-variant">
              Deep vertisol moisture retention buffering delayed monsoon withdrawal; APMC premium quality grade A1.
            </p>
</div>
<!-- Item 2: Desi Gram -->
<div class="space-y-2">
<div class="flex justify-between font-label-md text-on-surface">
<span class="">Rabi 2023–24: Desi Chickpea (Quintals / Acre)</span>
<span class="text-secondary font-title-md">12.4 Q/ac (Target: 12.0) · +3.3%</span>
</div>
<div class="h-3 w-full bg-surface-container-high rounded-full overflow-hidden flex">
<div class="bg-outline-variant h-full" style="width: 60%;"></div>
<div class="bg-secondary h-full" style="width: 3%;"></div>
</div>
<p class="font-label-sm text-on-surface-variant">
              Precision Trichoderma seed coating prevented root rot; market price realized at ₹6,100/Q (MSP was ₹5,440).
            </p>
</div>
<!-- Item 3: Soybean Pilot -->
<div class="space-y-2">
<div class="flex justify-between font-label-md text-on-surface">
<span class="">Kharif 2024: Soybean JS-335 (Quintals / Acre)</span>
<span class="text-error font-title-md">9.1 Q/ac (Target: 9.5) · -4.2%</span>
</div>
<div class="h-3 w-full bg-surface-container-high rounded-full overflow-hidden flex">
<div class="bg-primary h-full" style="width: 46%;"></div>
<div class="bg-error-container h-full" style="width: 2%;"></div>
</div>
<p class="font-label-sm text-on-surface-variant">
              21-day dry spell during flowering stage mitigated through single supplemental sprinkler furrow pass.
            </p>
</div>
</div>
<!-- Mandi Pricing Realization Sparkline Indicator -->
<div class="pt-4 bg-surface-container-low -mx-6 -mb-6 p-6 rounded-b-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container">
<span class="material-symbols-outlined text-[20px]">price_check</span>
</div>
<div>
<span class="font-title-md text-primary block">Mandi Spread: +₹92/Quintal Over Regional Mean</span>
<span class="font-body-sm text-on-surface-variant">Graded cleanliness, reduced pod borer damage, high test weight.</span>
</div>
</div>
<span class="font-label-sm bg-surface-container-lowest px-3 py-1.5 rounded-lg text-primary font-title-md shrink-0">
            APMC Hingoli Certified
          </span>
</div>
</div>
<!-- Root Cause Analysis & AI Learning Insights -->
<div class="lg:col-span-5 bg-primary-container text-on-primary rounded-2xl p-6 sm:p-7 shadow-sm space-y-5" style="background: rgba(22, 74, 52, 0.88); backdrop-filter: blur(24px) saturate(190%); border: 1px solid rgba(161, 241, 183, 0.35); box-shadow: rgba(0, 51, 32, 0.22) 0px 14px 40px 0px, rgba(255, 255, 255, 0.35) 0px 1px 1px 0px inset;">
<div class="flex items-center gap-2 text-on-primary-container">
<span class="material-symbols-outlined text-[22px]">psychology_alt</span>
<span class="font-label-lg uppercase tracking-wider">KrishiMitra Agronomic Feedback Loop</span>
</div>
<h3 class="font-headline-sm text-on-primary">
          How Field Variances Shaped 2024–2025 Sowing Parameters
        </h3>
<div class="space-y-4 font-body-sm text-on-primary-container">
<div class="flex items-start gap-3 bg-primary/40 p-3.5 rounded-xl">
<span class="material-symbols-outlined text-secondary-fixed text-[20px] shrink-0 mt-0.5">water_lux</span>
<p class="">
<strong class="text-on-primary">Black Cotton Capillary Draw:</strong> In-situ sensors recorded 18% higher sub-surface water retention than standard FAO-56 models. Irrigation intervals for Wheat were pushed from 10 to 14 days, saving 18% pumping energy.
            </p>
</div>
<div class="flex items-start gap-3 bg-primary/40 p-3.5 rounded-xl">
<span class="material-symbols-outlined text-secondary-fixed text-[20px] shrink-0 mt-0.5">compost</span>
<p class="">
<strong class="text-on-primary">Phosphorus Solubilizing Biofertilizers (PSB):</strong> After soil tests revealed pH 7.8 fixation, microbial inoculants mobilized tied-up phosphates, trimming DAP requirement by 35 kg across plot 2B.
            </p>
</div>
<div class="flex items-start gap-3 bg-primary/40 p-3.5 rounded-xl">
<span class="material-symbols-outlined text-secondary-fixed text-[20px] shrink-0 mt-0.5">insights</span>
<p class="">
<strong class="text-on-primary">Dynamic Micro-Weather Windows:</strong> Automatic rain alert averted scheduled neem oil spray 8 hours before unseasonal drizzle, avoiding ₹3,400 chemical wash-off loss.
            </p>
</div>
</div>
<div class="pt-2 flex items-center justify-between border-t border-on-primary-container/20 text-on-primary font-label-md">
<span class="">Model Iteration Engine v4.2</span>
<span class="text-secondary-fixed font-title-md">Confidence Score: 96.2%</span>
</div>
</div>
</section>
<!-- Section 5: Institutional Dossiers for Bank & Government Clearance -->
<section class="space-y-4">
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
<div>
<h2 class="font-headline-sm text-primary">Bank, KCC &amp; Government Scheme Dossiers</h2>
<p class="font-body-sm text-on-surface-variant">Certified tamper-evident documentation packages ready for sub-district institutional clearance.</p>
</div>
<span class="font-label-sm text-secondary bg-secondary-container/50 px-3 py-1 rounded-full flex items-center gap-1.5 self-start sm:self-auto">
<span class="material-symbols-outlined text-[16px]">verified</span>
          ICAR Protocol Compliant
        </span>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-5">
<!-- Dossier 1: PMFBY Crop Insurance Loss-Proof File -->
<div class="bg-surface-container-lowest p-6 rounded-2xl shadow-sm flex flex-col justify-between space-y-4 relative group hover:shadow-md transition-all" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(24px) saturate(190%); border: 1px solid rgba(255, 255, 255, 0.8); box-shadow: rgba(16, 78, 45, 0.06) 0px 10px 36px 0px, rgba(255, 255, 255, 0.95) 0px 1px 1px 0px inset;">
<div class="space-y-3">
<div class="flex items-center justify-between">
<span class="p-2 rounded-xl bg-surface-container-high text-primary material-symbols-outlined text-[22px]">satellite_alt</span>
<span class="font-label-sm px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">QR Tamper-Proof</span>
</div>
<h3 class="font-headline-sm text-primary">PMFBY Crop Insurance Loss-Proof Dossier</h3>
<p class="font-body-sm text-on-surface-variant">
              Timestamped Sentinel-2 satellite NDVI imagery logs, soil moisture sensor archives, and rainfall deficit index for expedited, undisputed claim processing.
            </p>
<div class="bg-surface-container-low p-3 rounded-lg space-y-1 font-label-sm text-on-surface">
<div class="flex justify-between">
<span class="text-outline">Plots Surveyed:</span>
<span class="font-title-md">2A, 2B, 2C, 2D (Hingoli)</span>
</div>
<div class="flex justify-between">
<span class="text-outline">Telemetry Nodes:</span>
<span class="font-title-md">3 Capacitive Probes Active</span>
</div>
</div>
</div>
<button class="w-full py-2.5 px-4 bg-surface-container hover:bg-surface-container-high rounded-xl font-label-md text-on-surface flex items-center justify-center gap-2 transition-colors">
<span class="material-symbols-outlined text-[18px]">download</span>
<span class="">Download Claim PDF (5.2 MB)</span>
</button>
</div>
<!-- Dossier 2: Kisan Credit Card (KCC) Limit Enhancement File -->
<div class="bg-surface-container-lowest p-6 rounded-2xl shadow-sm flex flex-col justify-between space-y-4 relative group hover:shadow-md transition-all" style="background: rgba(255, 255, 255, 0.78); backdrop-filter: blur(24px) saturate(190%); border: 1px solid rgba(25, 108, 62, 0.35); box-shadow: rgba(25, 108, 62, 0.08) 0px 10px 36px 0px, rgba(255, 255, 255, 0.95) 0px 1px 2px 0px inset;">
<div class="space-y-3">
<div class="flex items-center justify-between">
<span class="p-2 rounded-xl bg-secondary-container text-on-secondary-container material-symbols-outlined text-[22px]">account_balance_wallet</span>
<span class="font-label-sm px-2 py-0.5 rounded bg-secondary-container/60 text-on-secondary-container">Bank Ready</span>
</div>
<h3 class="font-headline-sm text-primary">KCC Limit Enhancement Ledger</h3>
<p class="font-body-sm text-on-surface-variant">
              Verified 217% average input ROI across 4 seasons, zero default score, and certified harvest revenues calibrated for State Bank of India &amp; Bank of Maharashtra Hingoli Branch.
            </p>
<div class="bg-surface-container-low p-3 rounded-lg space-y-1 font-label-sm text-on-surface">
<div class="flex justify-between">
<span class="text-outline">Eligible Scale of Finance:</span>
<span class="font-title-md text-secondary">₹4,25,000 (Recommended)</span>
</div>
<div class="flex justify-between">
<span class="text-outline">Debt-Service Ratio:</span>
<span class="font-title-md">1.42 (Prime Tier 1)</span>
</div>
</div>
</div>
<button class="w-full py-2.5 px-4 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-label-md flex items-center justify-center gap-2 transition-colors shadow-sm">
<span class="material-symbols-outlined text-[18px]">badge</span>
<span class="">Generate Bank Letter</span>
</button>
</div>
<!-- Dossier 3: MahaDBT Micro-Irrigation Verification Slip -->
<div class="bg-surface-container-lowest p-6 rounded-2xl shadow-sm flex flex-col justify-between space-y-4 relative group hover:shadow-md transition-all" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(24px) saturate(190%); border: 1px solid rgba(255, 255, 255, 0.8); box-shadow: rgba(16, 78, 45, 0.06) 0px 10px 36px 0px, rgba(255, 255, 255, 0.95) 0px 1px 1px 0px inset;">
<div class="space-y-3">
<div class="flex items-center justify-between">
<span class="p-2 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed-variant material-symbols-outlined text-[22px]">water</span>
<span class="font-label-sm px-2 py-0.5 rounded bg-tertiary-fixed/60 text-on-tertiary-fixed-variant">Subsidy Cleared</span>
</div>
<h3 class="font-headline-sm text-primary">MahaDBT Drip Verification Dossier</h3>
<p class="font-body-sm text-on-surface-variant">
              Geo-tagged emitter pressure audits, GPS boundary points, and water conservation certificate required to clear 55% state micro-irrigation subsidy disbursal.
            </p>
<div class="bg-surface-container-low p-3 rounded-lg space-y-1 font-label-sm text-on-surface">
<div class="flex justify-between">
<span class="text-outline">Govt Application No:</span>
<span class="font-title-md">MH-DBT-2024-DRP-810</span>
</div>
<div class="flex justify-between">
<span class="text-outline">Subsidy Claim:</span>
<span class="font-title-md text-tertiary">₹68,400 Approved</span>
</div>
</div>
</div>
<button class="w-full py-2.5 px-4 bg-surface-container hover:bg-surface-container-high rounded-xl font-label-md text-on-surface flex items-center justify-center gap-2 transition-colors">
<span class="material-symbols-outlined text-[18px]">verified</span>
<span class="">Inspection Certificate</span>
</button>
</div>
</div>
</section>
<!-- Section 6: Soil Test & Moisture Sensor Historical Logs -->
<section class="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl shadow-sm space-y-6" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(24px) saturate(190%); border: 1px solid rgba(255, 255, 255, 0.8); box-shadow: rgba(16, 78, 45, 0.06) 0px 10px 36px 0px, rgba(255, 255, 255, 0.95) 0px 1px 1px 0px inset;">
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<div>
<span class="font-label-sm text-secondary uppercase tracking-wider">Agronomic Ground Truth</span>
<h2 class="font-headline-sm text-primary">Physical Soil Tests &amp; In-Situ Telemetry Archive</h2>
</div>
<div class="flex items-center gap-3">
<span class="font-label-sm text-on-surface-variant flex items-center gap-1.5">
<span class="w-2.5 h-2.5 rounded-full bg-secondary"></span> Dr. Vilas Rao (Senior Agronomist, KVK Hingoli) Sign-Off Active
          </span>
</div>
</div>
<!-- Soil Parameters Timeline Table -->
<div class="overflow-x-auto">
<table class="w-full text-left font-body-sm">
<thead>
<tr class="border-b border-surface-container-high font-label-sm text-outline uppercase tracking-wider">
<th class="py-3 px-4">Audit Date</th>
<th class="py-3 px-4">Lab / Agency</th>
<th class="py-3 px-4">pH Index</th>
<th class="py-3 px-4">Organic Carbon (OC)</th>
<th class="py-3 px-4">Available Nitrogen (N)</th>
<th class="py-3 px-4">Phosphate (P₂O₅)</th>
<th class="py-3 px-4">Potash (K₂O)</th>
<th class="py-3 px-4 text-right">Official Slip</th>
</tr>
</thead>
<tbody class="divide-y divide-surface-container-high font-label-md text-on-surface">
<tr class="hover:bg-surface-container-low transition-colors">
<td class="py-3.5 px-4 font-title-md">Oct 14, 2024</td>
<td class="py-3.5 px-4 text-on-surface-variant">District Soil Testing Lab, Hingoli (#STL-8809)</td>
<td class="py-3.5 px-4"><span class="px-2 py-0.5 rounded bg-surface-container font-label-sm">7.8 (Optimal Vertisol)</span></td>
<td class="py-3.5 px-4 font-title-md text-secondary">0.64% (Improved)</td>
<td class="py-3.5 px-4">224 kg/ha (Medium)</td>
<td class="py-3.5 px-4 text-primary font-title-md">16.8 kg/ha (Fixed)</td>
<td class="py-3.5 px-4">390 kg/ha (High)</td>
<td class="py-3.5 px-4 text-right">
<button class="text-primary hover:text-primary-container p-1 rounded transition-colors inline-flex items-center gap-1 font-label-sm">
<span class="material-symbols-outlined text-[16px]">file_open</span> View Slip
                </button>
</td>
</tr>
<tr class="hover:bg-surface-container-low transition-colors">
<td class="py-3.5 px-4 font-title-md">May 22, 2024</td>
<td class="py-3.5 px-4 text-on-surface-variant">Krishi Vigyan Kendra (KVK) Hingoli (#KVK-24-110)</td>
<td class="py-3.5 px-4"><span class="px-2 py-0.5 rounded bg-surface-container font-label-sm">7.9 (Slightly Alkaline)</span></td>
<td class="py-3.5 px-4 font-title-md text-on-surface">0.56%</td>
<td class="py-3.5 px-4">208 kg/ha (Low-Med)</td>
<td class="py-3.5 px-4">14.2 kg/ha (Low)</td>
<td class="py-3.5 px-4">382 kg/ha (High)</td>
<td class="py-3.5 px-4 text-right">
<button class="text-primary hover:text-primary-container p-1 rounded transition-colors inline-flex items-center gap-1 font-label-sm">
<span class="material-symbols-outlined text-[16px]">file_open</span> View Slip
                </button>
</td>
</tr>
<tr class="hover:bg-surface-container-low transition-colors">
<td class="py-3.5 px-4 font-title-md">Nov 05, 2023</td>
<td class="py-3.5 px-4 text-on-surface-variant">MahaAgri Baseline Survey (#MAHA-SOIL-701)</td>
<td class="py-3.5 px-4"><span class="px-2 py-0.5 rounded bg-surface-container font-label-sm">8.1 (Alkaline Alert)</span></td>
<td class="py-3.5 px-4 font-title-md text-outline">0.48% (Depleted)</td>
<td class="py-3.5 px-4">186 kg/ha (Low)</td>
<td class="py-3.5 px-4">11.8 kg/ha (Deficient)</td>
<td class="py-3.5 px-4">364 kg/ha (High)</td>
<td class="py-3.5 px-4 text-right">
<button class="text-primary hover:text-primary-container p-1 rounded transition-colors inline-flex items-center gap-1 font-label-sm">
<span class="material-symbols-outlined text-[16px]">file_open</span> View Slip
                </button>
</td>
</tr>
</tbody>
</table>
</div>
<!-- Soil Health Agronomist Prescription Box -->
<div class="bg-surface-container-low p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-secondary text-[24px]">verified_user</span>
<div>
<span class="font-title-md text-primary block">Official Sign-Off: FYM Compost &amp; Zinc Sulphate Recommendation Completed</span>
<span class="font-body-sm text-on-surface-variant">Recommended 4 tonnes/acre well-decomposed FYM applied before Rabi wheat sowing. Next soil core scheduled April 2025.</span>
</div>
</div>
<button class="px-4 py-2 bg-surface-container hover:bg-surface-container-high rounded-lg text-on-surface font-label-md shrink-0 transition-colors">
          Schedule Next Core Sampling
        </button>
</div>
</section>
<!-- Section 7: Cryptographic Ledger & Farmer Autonomy Guarantee -->
<section class="bg-surface-container p-6 sm:p-7 rounded-2xl space-y-4" style="background: rgba(255, 255, 255, 0.65); backdrop-filter: blur(24px) saturate(190%); border: 1px solid rgba(255, 255, 255, 0.75); box-shadow: rgba(16, 78, 45, 0.05) 0px 10px 36px 0px, rgba(255, 255, 255, 0.9) 0px 1px 1px 0px inset;">
<div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
<div class="space-y-1">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary text-[20px]">lock</span>
<span class="font-label-lg uppercase tracking-wider text-primary">Data Autonomy &amp; Cryptographic Integrity Guarantee</span>
</div>
<p class="font-body-sm text-on-surface-variant max-w-3xl">
            All harvest records, APMC weighments, and sensor logs are cryptographically hashed using SHA-256 and anchored to the MahaAgri Public Cloud ledger. 
            Ramesh Deshmukh retains 100% legal ownership of this data. Third-party lending or insurance access requires explicit farmer biometrics or OTP consent.
          </p>
</div>
<div class="flex items-center gap-2 shrink-0">
<button class="px-4 py-2 bg-surface-container-lowest hover:bg-surface-bright text-on-surface font-label-md rounded-xl shadow-sm transition-colors flex items-center gap-1.5">
<span class="material-symbols-outlined text-[18px]">share</span>
<span class="">Delegate Bank Access</span>
</button>
<button class="px-4 py-2 bg-surface-container-lowest hover:bg-surface-bright text-on-surface font-label-md rounded-xl shadow-sm transition-colors flex items-center gap-1.5">
<span class="material-symbols-outlined text-[18px]">download_for_offline</span>
<span class="">JSON Audit Backup</span>
</button>
</div>
</div>
<div class="bg-surface-container-highest/60 p-3 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-2 font-label-sm text-outline">
<span class="font-mono truncate">Audit Hash: e9b47a8290fbc28394e1d528bca61084d59f772a859424c321d283625f190e8c</span>
<span class="shrink-0 text-on-surface-variant font-label-md">Verified Node: Hingoli-AgriNet-04</span>
</div>
</section>
</div>
</div>
<script>
  // Simple interactive filter for multi-season view demonstration
  const seasonSelect = document.getElementById('seasonFilter');
  if (seasonSelect) {
    seasonSelect.addEventListener('change', function(e) {
      const selected = e.target.value;
      // Visual feedback indicator for filter application
      const indicator = document.querySelector('[aria-label="Breadcrumb"] span.text-primary');
      if (indicator) {
        if (selected === 'all') {
          indicator.textContent = 'Multi-Season Audit Logs & Performance Ledgers';
        } else {
          indicator.textContent = `Filtered: ${seasonSelect.options[seasonSelect.selectedIndex].text}`;
        }
      }
    });
  }
</script></main></div>

</body></html>
```

---

## `krishimitra_reports_historical_audits_mobile/code.html`

```html
<!DOCTYPE html><html class="h-full" lang="en"><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" name="viewport"><meta content="mobile_tab" name="shell-type"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"><link href="https://fonts.googleapis.com" rel="preconnect"><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "on-primary-fixed": "#002113", "on-tertiary-fixed-variant": "#004d62", "on-secondary-fixed-variant": "#00522b", "secondary": "#196c3e", "primary-container": "#164a34", "on-secondary-fixed": "#00210e", "on-tertiary-container": "#6ab7d5", "secondary-fixed-dim": "#88d8a0", "tertiary": "#002f3d", "on-surface-variant": "#404943", "on-error": "#ffffff", "surface-container-high": "#eae8e2", "error": "#ba1a1a", "background": "#fbf9f3", "on-secondary-container": "#1f7042", "on-primary-container": "#85b99c", "surface-dim": "#dcdad4", "surface": "#fbf9f3", "outline-variant": "#c0c9c1", "primary-fixed-dim": "#9dd2b5", "secondary-fixed": "#a4f4ba", "secondary-container": "#a1f1b7", "outline": "#717973", "primary": "#003320", "inverse-surface": "#30312d", "on-background": "#1b1c18", "error-container": "#ffdad6", "on-primary-fixed-variant": "#1d5039", "surface-tint": "#366850", "tertiary-fixed-dim": "#84d1f0", "on-surface": "#1b1c18", "surface-container-low": "#f5f3ed", "surface-container-lowest": "#ffffff", "on-secondary": "#ffffff", "surface-container": "#f0eee8", "on-error-container": "#93000a", "on-primary": "#ffffff", "on-tertiary-fixed": "#001f29", "inverse-primary": "#9dd2b5", "primary-fixed": "#b9efd0", "inverse-on-surface": "#f3f1eb", "tertiary-fixed": "#baeaff", "surface-variant": "#e4e2dd", "tertiary-container": "#00475a", "surface-container-highest": "#e4e2dd", "on-tertiary": "#ffffff", "surface-bright": "#fbf9f3" }, "borderRadius": { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" }, "spacing": { "margin": "3rem", "space-xs": "0.25rem", "space-sm": "0.5rem", "gutter": "1.5rem", "margin-mobile": "1rem", "space-xl": "2.5rem", "space-md": "1rem", "gutter-mobile": "1rem", "space-lg": "1.5rem" }, "fontFamily": { "display-lg-mobile": ["Plus Jakarta Sans"], "label-md": ["Plus Jakarta Sans"], "headline-lg": ["Plus Jakarta Sans"], "title-md": ["Plus Jakarta Sans"], "body-lg": ["Plus Jakarta Sans"], "title-lg": ["Plus Jakarta Sans"], "headline-lg-mobile": ["Plus Jakarta Sans"], "display-lg": ["Plus Jakarta Sans"], "body-md": ["Plus Jakarta Sans"], "label-lg": ["Plus Jakarta Sans"], "headline-md": ["Plus Jakarta Sans"], "headline-sm": ["Plus Jakarta Sans"], "body-sm": ["Plus Jakarta Sans"], "label-sm": ["Plus Jakarta Sans"] }, "fontSize": { "display-lg-mobile": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700" }], "label-md": ["12px", { "lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "600" }], "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700" }], "title-md": ["16px", { "lineHeight": "24px", "fontWeight": "600" }], "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }], "title-lg": ["18px", { "lineHeight": "26px", "fontWeight": "600" }], "headline-lg-mobile": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600" }], "display-lg": ["44px", { "lineHeight": "52px", "letterSpacing": "-0.02em", "fontWeight": "700" }], "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }], "label-lg": ["14px", { "lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "600" }], "headline-md": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600" }], "headline-sm": ["20px", { "lineHeight": "28px", "fontWeight": "600" }], "body-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }], "label-sm": ["11px", { "lineHeight": "14px", "letterSpacing": "0.02em", "fontWeight": "500" }] } } } }</script><style>@layer base { body { min-height: 100vh; overscroll-behavior-y: none; } .pb-safe { padding-bottom: env(safe-area-inset-bottom, 0px); } .pt-safe { padding-top: env(safe-area-inset-top, 0px); } main > :first-child { margin-top: 0 !important; } main > :last-child { margin-bottom: 0 !important; } } ::-webkit-scrollbar { display: none; }</style></head><body class="bg-surface text-on-surface font-body-md text-body-md flex flex-col min-h-screen" style="background: radial-gradient(at 15% 10%, rgba(34, 197, 94, 0.18) 0px, transparent 50%), radial-gradient(at 85% 15%, rgba(16, 185, 129, 0.16) 0px, transparent 45%), radial-gradient(rgba(5, 150, 105, 0.08) 0px, transparent 60%), radial-gradient(at 20% 85%, rgba(132, 204, 22, 0.15) 0px, transparent 50%), radial-gradient(at 80% 90%, rgba(16, 185, 129, 0.18) 0px, transparent 50%), rgb(248, 250, 247); min-height: max(884px, 100dvh);"><header class="fixed top-0 w-full z-50 pt-safe bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]" style="background: rgba(255, 255, 255, 0.72); backdrop-filter: blur(24px) saturate(180%); border-bottom: 1px solid rgba(255, 255, 255, 0.6); box-shadow: rgba(16, 78, 45, 0.05) 0px 4px 20px 0px;"><div class="h-16 px-gutter-mobile flex items-center justify-between gap-space-sm"><div class="flex items-center gap-space-sm min-w-0"><img alt="Brand logo. - Primary color: #164a34
- Font: plusJakartaSans
- Mode: light
- Roundness: rounded-md
" class="h-8 w-auto object-contain flex-shrink-0" src="https://lh3.googleusercontent.com/aida/AEtjO1UwvheEflVQETpVODXud1bKJQLTG3Z9V091WAQuRWb3OjkfynIYN40ImZHKnidhICqNkNrqFqpWKzSfZlgxI5J_M82iY6odlXGtsZTTc8HXdVBAz6ryKsSz-P5wU6ZoKTCO5D247hagw2iNx0PZZfjdthMC8zjpWAGLJh7xg4qo3i9LZdCn7j6gGxugjmJTrMiBN0EKKxLQuSsUMZx2F7LChrzofAoNzJDssH-iE5FNMrlgSgXlD6etBto"><div class="flex flex-col min-w-0"><span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold leading-none">KrishiMitra</span><h1 class="font-title-md text-title-md text-on-surface truncate leading-tight">Farm Reports</h1></div></div><div class="flex items-center gap-space-xs flex-shrink-0"><button aria-label="Toggle Marathi or English Language" class="h-9 px-space-sm rounded-full bg-surface-container flex items-center gap-1 text-on-surface-variant hover:text-on-surface"><span class="font-label-sm text-label-sm font-semibold text-primary">मराठी</span><span class="text-outline-variant font-label-sm text-label-sm">/</span><span class="font-label-sm text-label-sm font-semibold text-on-surface-variant">EN</span></button><button aria-label="Notifications" class="w-11 h-11 flex items-center justify-center text-on-surface-variant hover:text-on-surface rounded-full"><span class="material-symbols-outlined text-[22px]">notifications</span></button><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main class="flex-1 flex flex-col relative w-full pt-16 pb-20 px-gutter-mobile"><div class="flex flex-col w-full pb-10 space-y-5">
<!-- Verification & Top Header Banner -->
<div class="flex flex-col space-y-3 pt-1">
<!-- Blockchain Ledger Verified Pill -->
<div class="flex items-center justify-between">
<div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container shadow-sm">
<span class="material-symbols-outlined text-[15px]" style="font-variation-settings: 'FILL' 1;">verified</span>
<span class="font-label-sm text-label-sm font-semibold tracking-wide">UID: MH-HNG-2024-884</span>
</div>
<span class="inline-flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
<span class="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
        Ledger Active
      </span>
</div>
<!-- Title & Contextual Dossier Subtitle -->
<div class="flex flex-col space-y-1">
<h2 class="font-headline-lg-mobile text-headline-lg-mobile text-primary font-bold tracking-tight">
        Multi-Season Audit Dossier
      </h2>
<p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
        Forensic agronomic accountability across 4 cropping cycles for Shivaji Patil Farm (Plots 2A–2D). Pre-sowing vs post-harvest APMC mandi returns, sensor-verified water draws, and soil carbon trajectory.
      </p>
</div>
<!-- Primary Action Buttons Row -->
<div class="grid grid-cols-2 gap-2.5 pt-1">
<button class="h-11 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center justify-center gap-1.5 transition-transform active:scale-[0.98]" type="button">
<span class="material-symbols-outlined text-[18px] text-secondary">account_balance</span>
<span class="truncate">KCC Bank Cert</span>
</button>
<button class="h-11 px-3 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center gap-1.5 shadow-sm transition-transform active:scale-[0.98]" type="button">
<span class="material-symbols-outlined text-[18px] text-primary-fixed">download</span>
<span class="truncate">Export PDF (Full)</span>
</button>
</div>
</div>
<!-- Farm Quick Stats (2x2 Compact Metric Tiles) -->
<div class="grid grid-cols-2 gap-2.5">
<div class="p-3 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(20px) saturate(180%); border: 1px solid rgba(255, 255, 255, 0.7); box-shadow: rgba(16, 78, 45, 0.06) 0px 8px 32px 0px, rgba(255, 255, 255, 0.8) 0px 1px 1px 0px inset;">
<div class="flex items-center gap-1.5 text-on-surface-variant">
<span class="material-symbols-outlined text-[16px] text-secondary">landscape</span>
<span class="font-label-sm text-label-sm uppercase tracking-wider">Holding Size</span>
</div>
<div class="mt-2">
<span class="font-title-lg text-title-lg text-on-surface font-bold">8.50 Acres</span>
<p class="font-label-sm text-label-sm text-on-surface-variant">Deep Vertisol (Black)</p>
</div>
</div>
<div class="p-3 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(20px) saturate(180%); border: 1px solid rgba(255, 255, 255, 0.7); box-shadow: rgba(16, 78, 45, 0.06) 0px 8px 32px 0px, rgba(255, 255, 255, 0.8) 0px 1px 1px 0px inset;">
<div class="flex items-center gap-1.5 text-on-surface-variant">
<span class="material-symbols-outlined text-[16px] text-tertiary">water_drop</span>
<span class="font-label-sm text-label-sm uppercase tracking-wider">Basin Cadastre</span>
</div>
<div class="mt-2">
<span class="font-title-lg text-title-lg text-on-surface font-bold">Hingoli Sub-Basin</span>
<p class="font-label-sm text-label-sm text-on-surface-variant">Marathwada Zone 7</p>
</div>
</div>
<div class="p-3 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(20px) saturate(180%); border: 1px solid rgba(255, 255, 255, 0.7); box-shadow: rgba(16, 78, 45, 0.06) 0px 8px 32px 0px, rgba(255, 255, 255, 0.8) 0px 1px 1px 0px inset;">
<div class="flex items-center gap-1.5 text-on-surface-variant">
<span class="material-symbols-outlined text-[16px] text-secondary">inventory_2</span>
<span class="font-label-sm text-label-sm uppercase tracking-wider">Total Production</span>
</div>
<div class="mt-2">
<span class="font-title-lg text-title-lg text-on-surface font-bold">24.64 MT</span>
<p class="font-label-sm text-label-sm text-on-surface-variant">Across 4 Harvests</p>
</div>
</div>
<div class="p-3 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(20px) saturate(180%); border: 1px solid rgba(255, 255, 255, 0.7); box-shadow: rgba(16, 78, 45, 0.06) 0px 8px 32px 0px, rgba(255, 255, 255, 0.8) 0px 1px 1px 0px inset;">
<div class="flex items-center gap-1.5 text-on-surface-variant">
<span class="material-symbols-outlined text-[16px] text-secondary">model_training</span>
<span class="font-label-sm text-label-sm uppercase tracking-wider">Model Fidelity</span>
</div>
<div class="mt-2">
<span class="font-title-lg text-title-lg text-secondary font-bold">93.8% Match</span>
<p class="font-label-sm text-label-sm text-on-surface-variant">±0.8 Q/ac Variance</p>
</div>
</div>
</div>
<!-- Filter Selector and Mobile Search Input -->
<div class="flex flex-col gap-2 pt-1">
<div class="relative w-full">
<select aria-label="Select harvest cycle" class="w-full h-11 pl-3.5 pr-9 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-sm appearance-none focus:outline-none" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(20px) saturate(180%); border: 1px solid rgba(255, 255, 255, 0.7); box-shadow: rgba(16, 78, 45, 0.06) 0px 8px 32px 0px, rgba(255, 255, 255, 0.8) 0px 1px 1px 0px inset;">
<option selected="">All Available Cycles (2023–2025)</option>
<option>Rabi 2024–2025 (Active Wheat)</option>
<option>Kharif 2025 (Cotton-Tur Intercrop)</option>
<option>Rabi 2023–2024 (Chana Phule)</option>
<option>Kharif 2024 (Soybean Baseline)</option>
</select>
<span class="material-symbols-outlined pointer-events-none absolute right-3 top-3 text-[18px] text-on-surface-variant">expand_more</span>
</div>
<div class="relative w-full">
<span class="material-symbols-outlined absolute left-3 top-3 text-[18px] text-outline">search</span>
<input class="w-full h-11 pl-9 pr-10 rounded-lg bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-sm text-body-sm shadow-sm focus:outline-none" placeholder="Search bill #, lot, crop, or mandi..." type="search" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(20px) saturate(180%); border: 1px solid rgba(255, 255, 255, 0.7); box-shadow: rgba(16, 78, 45, 0.06) 0px 8px 32px 0px, rgba(255, 255, 255, 0.8) 0px 1px 1px 0px inset;">
<button aria-label="Filter" class="absolute right-2 top-2 h-7 w-7 rounded-md bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface">
<span class="material-symbols-outlined text-[16px]">tune</span>
</button>
</div>
</div>
<!-- Cumulative Agro-Economic & Ecological Benchmark -->
<div class="flex flex-col space-y-2.5">
<div class="flex items-center justify-between">
<h3 class="font-title-md text-title-md text-on-surface font-bold">Cumulative Ecological Impact</h3>
<span class="font-label-sm text-label-sm text-secondary font-semibold">4 Seasons Aggregated</span>
</div>
<div class="grid grid-cols-2 gap-2.5">
<!-- Metric 1 -->
<div class="p-3.5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between space-y-2" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(20px) saturate(180%); border: 1px solid rgba(255, 255, 255, 0.7); box-shadow: rgba(16, 78, 45, 0.06) 0px 8px 32px 0px, rgba(255, 255, 255, 0.8) 0px 1px 1px 0px inset;">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-on-surface-variant font-medium">Realized Profit</span>
<span class="p-1 rounded-md bg-secondary-container text-on-secondary-container">
<span class="material-symbols-outlined text-[14px]">trending_up</span>
</span>
</div>
<div>
<span class="font-headline-sm text-headline-sm text-on-surface font-bold">₹6,42,800</span>
<div class="mt-1 flex items-center gap-1">
<span class="inline-block px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">+18.4% ROI</span>
</div>
<p class="font-label-sm text-label-sm text-on-surface-variant mt-1">+₹1.18L via plan tuning</p>
</div>
</div>
<!-- Metric 2 -->
<div class="p-3.5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between space-y-2" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(20px) saturate(180%); border: 1px solid rgba(255, 255, 255, 0.7); box-shadow: rgba(16, 78, 45, 0.06) 0px 8px 32px 0px, rgba(255, 255, 255, 0.8) 0px 1px 1px 0px inset;">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-on-surface-variant font-medium">Groundwater Saved</span>
<span class="p-1 rounded-md bg-tertiary-container text-on-tertiary-container">
<span class="material-symbols-outlined text-[14px]">shield_with_heart</span>
</span>
</div>
<div>
<span class="font-headline-sm text-headline-sm text-on-surface font-bold">6,850 m³</span>
<div class="mt-1 flex items-center gap-1">
<span class="inline-block px-1.5 py-0.5 rounded bg-tertiary-container text-on-tertiary-container font-label-sm text-label-sm font-semibold">Zero Incursions</span>
</div>
<p class="font-label-sm text-label-sm text-on-surface-variant mt-1">4.8 Borewell-Months saved</p>
</div>
</div>
<!-- Metric 3 -->
<div class="p-3.5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between space-y-2" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(20px) saturate(180%); border: 1px solid rgba(255, 255, 255, 0.7); box-shadow: rgba(16, 78, 45, 0.06) 0px 8px 32px 0px, rgba(255, 255, 255, 0.8) 0px 1px 1px 0px inset;">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-on-surface-variant font-medium">Forecast Accuracy</span>
<span class="p-1 rounded-md bg-surface-container text-secondary">
<span class="material-symbols-outlined text-[14px]">target</span>
</span>
</div>
<div>
<span class="font-headline-sm text-headline-sm text-on-surface font-bold">93.8%</span>
<div class="mt-1 flex items-center gap-1">
<span class="inline-block px-1.5 py-0.5 rounded bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold">4/4 Audited</span>
</div>
<p class="font-label-sm text-label-sm text-on-surface-variant mt-1">Within ±0.8 Q/ac delta</p>
</div>
</div>
<!-- Metric 4 -->
<div class="p-3.5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between space-y-2" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(20px) saturate(180%); border: 1px solid rgba(255, 255, 255, 0.7); box-shadow: rgba(16, 78, 45, 0.06) 0px 8px 32px 0px, rgba(255, 255, 255, 0.8) 0px 1px 1px 0px inset;">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-on-surface-variant font-medium">Organic Carbon</span>
<span class="p-1 rounded-md bg-secondary-container text-on-secondary-container">
<span class="material-symbols-outlined text-[14px]">compost</span>
</span>
</div>
<div>
<span class="font-headline-sm text-headline-sm text-secondary font-bold">0.64%</span>
<div class="mt-1 flex items-center gap-1">
<span class="inline-block px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">+33.3% Rejuvenation</span>
</div>
<p class="font-label-sm text-label-sm text-on-surface-variant mt-1">Baseline 0.48% (KVK Hingoli)</p>
</div>
</div>
</div>
</div>
<!-- Micro-Catchment Field Telemetry Visual Card -->
<div class="relative overflow-hidden rounded-2xl bg-primary-container text-on-primary shadow-sm p-4" style="background: linear-gradient(135deg, rgba(22, 74, 52, 0.92), rgba(0, 51, 32, 0.88)); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.25); box-shadow: rgba(16, 78, 45, 0.16) 0px 8px 32px 0px, rgba(255, 255, 255, 0.3) 0px 1px 1px 0px inset;">
<div class="relative z-10 flex flex-col space-y-2.5">
<div class="flex items-center justify-between">
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary font-label-sm text-label-sm text-primary-fixed font-semibold">
<span class="material-symbols-outlined text-[13px]">satellite_alt</span>
          Catchment Ledger #104/A
        </span>
<span class="font-label-sm text-label-sm text-on-primary-container font-medium">Cadastral Survey 2024</span>
</div>
<div>
<h4 class="font-title-md text-title-md font-bold text-on-primary">
          Plots 2A–2D Hydrological Equilibrium
        </h4>
<p class="font-body-sm text-body-sm text-on-primary-container mt-0.5 leading-relaxed">
          Deep Vertisol profile certified by Krishi Vigyan Kendra Hingoli. Infiltration capacity maintained at 14.8 mm/hr with zero runoff losses recorded.
        </p>
</div>
<div class="pt-1 flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="h-2 w-2 rounded-full bg-secondary-fixed"></span>
<span class="font-label-sm text-label-sm text-on-primary font-medium">Subsurface Moisture: 68%</span>
</div>
<button class="inline-flex items-center gap-1 font-label-sm text-label-sm text-primary-fixed hover:underline font-semibold">
          View Geo-Telemetry
          <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
</button>
</div>
</div>
<!-- Decorative Topographic Ring SVG Pattern -->
<div class="absolute -right-6 -bottom-6 opacity-15 pointer-events-none">
<svg class="text-on-primary" fill="none" height="180" stroke="currentColor" viewBox="0 0 100 100" width="180">
<circle cx="50" cy="50" r="45" stroke-dasharray="3 3" stroke-width="1.5"></circle>
<circle cx="50" cy="50" r="35" stroke-width="2"></circle>
<circle cx="50" cy="50" r="25" stroke-width="1.5"></circle>
<circle cx="50" cy="50" r="15" stroke-width="2"></circle>
</svg>
</div>
</div>
<!-- Historical Season Audits & Yield Ledger -->
<div class="flex flex-col space-y-3 pt-1">
<div class="flex items-center justify-between">
<h3 class="font-title-md text-title-md text-on-surface font-bold">Multi-Season Audit Ledger</h3>
<span class="font-label-sm text-label-sm text-on-surface-variant font-medium">Sorted: Newest First</span>
</div>
<!-- Season Card #4: Active Rabi 2024-2025 -->
<div class="p-4 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col space-y-3 border-l-4 border-secondary" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(20px) saturate(180%); border-width: 1px 1px 1px 4px; border-style: solid; border-color: rgba(255, 255, 255, 0.7) rgba(255, 255, 255, 0.7) rgba(255, 255, 255, 0.7) rgb(25, 108, 62); border-image: none; box-shadow: rgba(16, 78, 45, 0.06) 0px 8px 32px 0px, rgba(255, 255, 255, 0.8) 0px 1px 1px 0px inset;">
<div class="flex items-start justify-between">
<div>
<span class="inline-block px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
            Active Campaign · Rabi 2024–25
          </span>
<h4 class="font-title-md text-title-md text-on-surface font-bold mt-1">
            Drip Precision Wheat (HD-2967)
          </h4>
<p class="font-label-sm text-label-sm text-on-surface-variant">Sown: Nov 02 · 8.5 Acres</p>
</div>
<span class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-surface-container text-primary font-label-sm text-label-sm font-semibold">
<span class="material-symbols-outlined text-[14px]">sync</span> Active
        </span>
</div>
<!-- Quick Metrics Grid -->
<div class="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-surface-container-low text-center">
<div>
<span class="block font-label-sm text-label-sm text-on-surface-variant">Yield Target</span>
<span class="font-title-md text-title-md text-on-surface font-bold">21.2 Q/ac</span>
<span class="block font-label-sm text-label-sm text-secondary font-medium">94% Conf.</span>
</div>
<div>
<span class="block font-label-sm text-label-sm text-on-surface-variant">Est. Water</span>
<span class="font-title-md text-title-md text-on-surface font-bold">3,450 m³</span>
<span class="block font-label-sm text-label-sm text-tertiary font-medium">Drip Emitter</span>
</div>
<div>
<span class="block font-label-sm text-label-sm text-on-surface-variant">Projected P&amp;L</span>
<span class="font-title-md text-title-md text-secondary font-bold">₹1,84,500</span>
<span class="block font-label-sm text-label-sm text-on-surface-variant font-medium">MSP Floor</span>
</div>
</div>
<!-- Footer Actions -->
<div class="flex items-center justify-between pt-1">
<div class="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
<span class="">Pre-Sowing Audit Verified</span>
</div>
<div class="flex gap-2">
<button class="h-8 px-3 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold hover:bg-surface-container-high transition-colors">
            Simulation
          </button>
<button class="h-8 px-3 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold hover:bg-primary transition-colors">
            Blueprint
          </button>
</div>
</div>
</div>
<!-- Season Card #3: Cleared Kharif 2025 -->
<div class="p-4 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col space-y-3 border-l-4 border-secondary" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(20px) saturate(180%); border-width: 1px 1px 1px 4px; border-style: solid; border-color: rgba(255, 255, 255, 0.7) rgba(255, 255, 255, 0.7) rgba(255, 255, 255, 0.7) rgb(25, 108, 62); border-image: none; box-shadow: rgba(16, 78, 45, 0.06) 0px 8px 32px 0px, rgba(255, 255, 255, 0.8) 0px 1px 1px 0px inset;">
<div class="flex items-start justify-between">
<div>
<span class="inline-block px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold">
            Audit Cleared · Kharif 2025
          </span>
<h4 class="font-title-md text-title-md text-on-surface font-bold mt-1">
            Cotton + Pigeon Pea (Tur) Intercrop
          </h4>
<p class="font-label-sm text-label-sm text-on-surface-variant">APMC Hingoli Lot #449-B · 8.5 Acres</p>
</div>
<span class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
<span class="material-symbols-outlined text-[14px]">check_circle</span> Cleared
        </span>
</div>
<!-- Forecast vs Actual Visual Tag -->
<div class="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-surface-container-low text-center">
<div>
<span class="block font-label-sm text-label-sm text-on-surface-variant">Actual Yield</span>
<span class="font-title-md text-title-md text-on-surface font-bold">14.6 Q/ac</span>
<span class="block font-label-sm text-label-sm text-secondary font-semibold">+4.3% vs Target</span>
</div>
<div>
<span class="block font-label-sm text-label-sm text-on-surface-variant">Draw Volume</span>
<span class="font-title-md text-title-md text-on-surface font-bold">4,100 m³</span>
<span class="block font-label-sm text-label-sm text-secondary font-semibold">-620 m³ saved</span>
</div>
<div>
<span class="block font-label-sm text-label-sm text-on-surface-variant">Realized Net</span>
<span class="font-title-md text-title-md text-secondary font-bold">₹2,14,300</span>
<span class="block font-label-sm text-label-sm text-on-surface-variant font-medium">+₹32.4k over avg</span>
</div>
</div>
<!-- Footer Actions -->
<div class="flex items-center justify-between pt-1">
<div class="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[16px] text-secondary">receipt_long</span>
<span class="">APMC Bill Confirmed</span>
</div>
<div class="flex gap-2">
<button class="h-8 px-3 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold hover:bg-surface-container-high transition-colors">
            Mandi Slip
          </button>
<button class="h-8 px-3 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold hover:bg-primary transition-colors">
            Dossier
          </button>
</div>
</div>
</div>
<!-- Season Card #2: Subsidies Disbursed Rabi 2023-2024 -->
<div class="p-4 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col space-y-3 border-l-4 border-secondary" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(20px) saturate(180%); border-width: 1px 1px 1px 4px; border-style: solid; border-color: rgba(255, 255, 255, 0.7) rgba(255, 255, 255, 0.7) rgba(255, 255, 255, 0.7) rgb(25, 108, 62); border-image: none; box-shadow: rgba(16, 78, 45, 0.06) 0px 8px 32px 0px, rgba(255, 255, 255, 0.8) 0px 1px 1px 0px inset;">
<div class="flex items-start justify-between">
<div>
<span class="inline-block px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold">
            Subsidies Disbursed · Rabi 2023–24
          </span>
<h4 class="font-title-md text-title-md text-on-surface font-bold mt-1">
            Desi Chickpea / Chana (Vijay-Phule)
          </h4>
<p class="font-label-sm text-label-sm text-on-surface-variant">Seed Multiplier Certified · 8.5 Acres</p>
</div>
<span class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
<span class="material-symbols-outlined text-[14px]">done_all</span> Settled
        </span>
</div>
<div class="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-surface-container-low text-center">
<div>
<span class="block font-label-sm text-label-sm text-on-surface-variant">Actual Yield</span>
<span class="font-title-md text-title-md text-on-surface font-bold">12.4 Q/ac</span>
<span class="block font-label-sm text-label-sm text-secondary font-semibold">+3.3% Target</span>
</div>
<div>
<span class="block font-label-sm text-label-sm text-on-surface-variant">Water Draw</span>
<span class="font-title-md text-title-md text-on-surface font-bold">2,150 m³</span>
<span class="block font-label-sm text-label-sm text-secondary font-semibold">Soil Moisture</span>
</div>
<div>
<span class="block font-label-sm text-label-sm text-on-surface-variant">Realized Net</span>
<span class="font-title-md text-title-md text-secondary font-bold">₹1,54,800</span>
<span class="block font-label-sm text-label-sm text-on-surface-variant font-medium">Zero Wilt Loss</span>
</div>
</div>
<div class="flex items-center justify-between pt-1">
<div class="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[16px] text-secondary">account_balance_wallet</span>
<span class="">KCC Direct Credit Done</span>
</div>
<div class="flex gap-2">
<button class="h-8 px-3 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold hover:bg-surface-container-high transition-colors">
            Certificate
          </button>
<button class="h-8 px-3 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold hover:bg-primary transition-colors">
            Dossier
          </button>
</div>
</div>
</div>
<!-- Season Card #1: Baseline Kharif 2024 -->
<div class="p-4 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col space-y-3 border-l-4 border-outline" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(20px) saturate(180%); border-width: 1px 1px 1px 4px; border-style: solid; border-color: rgba(255, 255, 255, 0.7) rgba(255, 255, 255, 0.7) rgba(255, 255, 255, 0.7) rgb(113, 121, 115); border-image: none; box-shadow: rgba(16, 78, 45, 0.06) 0px 8px 32px 0px, rgba(255, 255, 255, 0.8) 0px 1px 1px 0px inset;">
<div class="flex items-start justify-between">
<div>
<span class="inline-block px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold">
            Baseline Pilot · Kharif 2024
          </span>
<h4 class="font-title-md text-title-md text-on-surface font-bold mt-1">
            Soybean (JS-335 Monocrop)
          </h4>
<p class="font-label-sm text-label-sm text-on-surface-variant">Initial Telemetry Rollout · 8.5 Acres</p>
</div>
<span class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold">
<span class="material-symbols-outlined text-[14px]">flag</span> Baseline
        </span>
</div>
<div class="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-surface-container-low text-center">
<div>
<span class="block font-label-sm text-label-sm text-on-surface-variant">Actual Yield</span>
<span class="font-title-md text-title-md text-on-surface font-bold">9.1 Q/ac</span>
<span class="block font-label-sm text-label-sm text-error font-semibold">-4.2% drought dip</span>
</div>
<div>
<span class="block font-label-sm text-label-sm text-on-surface-variant">Rain/Irrigation</span>
<span class="font-title-md text-title-md text-on-surface font-bold">3,720 m³</span>
<span class="block font-label-sm text-label-sm text-on-surface-variant font-medium">Dry spell phase</span>
</div>
<div>
<span class="block font-label-sm text-label-sm text-on-surface-variant">Realized Net</span>
<span class="font-title-md text-title-md text-on-surface font-bold">₹89,200</span>
<span class="block font-label-sm text-label-sm text-secondary font-medium">Insurance aided</span>
</div>
</div>
<div class="flex items-center justify-between pt-1">
<div class="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[16px] text-outline">analytics</span>
<span class="">Dry Spell Analyzed</span>
</div>
<div class="flex gap-2">
<button class="h-8 px-3 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold hover:bg-surface-container-high transition-colors">
            Agromet Log
          </button>
<button class="h-8 px-3 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold hover:bg-primary transition-colors">
            Dossier
          </button>
</div>
</div>
</div>
</div>
<!-- Agronomic Precision & Machine Learning Feedback Loop -->
<div class="p-4 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col space-y-3.5" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(20px) saturate(180%); border: 1px solid rgba(255, 255, 255, 0.7); box-shadow: rgba(16, 78, 45, 0.06) 0px 8px 32px 0px, rgba(255, 255, 255, 0.8) 0px 1px 1px 0px inset;">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="p-1 rounded-md bg-secondary-container text-on-secondary-container">
<span class="material-symbols-outlined text-[18px]">psychology</span>
</span>
<h3 class="font-title-md text-title-md text-on-surface font-bold">Model Precision Variance</h3>
</div>
<span class="font-label-sm text-label-sm text-secondary font-bold">4 Seasons</span>
</div>
<!-- Comparative Yield Target vs Actual Bar Charts -->
<div class="flex flex-col space-y-2.5">
<!-- Season Kharif 2025 -->
<div class="flex flex-col space-y-1">
<div class="flex justify-between font-label-sm text-label-sm">
<span class="text-on-surface font-semibold">Kharif 2025 (Cotton-Tur)</span>
<span class="text-secondary font-bold">14.6 / 14.0 Q/ac (+4.3%)</span>
</div>
<div class="w-full h-3 rounded-full bg-surface-container overflow-hidden flex">
<div class="h-full bg-secondary rounded-full" style="width: 95%;"></div>
</div>
</div>
<!-- Season Rabi 2023-2024 -->
<div class="flex flex-col space-y-1">
<div class="flex justify-between font-label-sm text-label-sm">
<span class="text-on-surface font-semibold">Rabi 2023–24 (Desi Chana)</span>
<span class="text-secondary font-bold">12.4 / 12.0 Q/ac (+3.3%)</span>
</div>
<div class="w-full h-3 rounded-full bg-surface-container overflow-hidden flex">
<div class="h-full bg-secondary rounded-full" style="width: 88%;"></div>
</div>
</div>
<!-- Season Kharif 2024 -->
<div class="flex flex-col space-y-1">
<div class="flex justify-between font-label-sm text-label-sm">
<span class="text-on-surface font-semibold">Kharif 2024 (Soybean Baseline)</span>
<span class="text-on-surface-variant font-medium">9.1 / 9.5 Q/ac (-4.2%)</span>
</div>
<div class="w-full h-3 rounded-full bg-surface-container overflow-hidden flex">
<div class="h-full bg-outline rounded-full" style="width: 65%;"></div>
</div>
</div>
</div>
<!-- Closed Feedback Loop Ingestion Info Card -->
<div class="p-3 rounded-xl bg-primary text-on-primary flex flex-col space-y-1.5">
<div class="flex items-center gap-1.5 text-primary-fixed">
<span class="material-symbols-outlined text-[16px]">neurology</span>
<span class="font-label-sm text-label-sm font-bold uppercase tracking-wider">KrishiMitra Machine Learning Ingestion</span>
</div>
<p class="font-body-sm text-body-sm text-surface-container-high leading-relaxed">
        Capillary moisture readings in deep Vertisol soils (Plot 2C) showed 18% higher hold capacity than regional models. Model auto-recalibrated fertilizer splits and saved ₹8,400 in unnecessary nitrogen leaching.
      </p>
</div>
</div>
<!-- Bank, KCC & Government Scheme Dossiers -->
<div class="flex flex-col space-y-3 pt-1">
<div class="flex items-center justify-between">
<h3 class="font-title-md text-title-md text-on-surface font-bold">Institutional Scheme Portfolios</h3>
<span class="font-label-sm text-label-sm text-secondary font-semibold">3 Certified</span>
</div>
<!-- Card 1: PMFBY Loss-Proof Dossier -->
<div class="p-3.5 rounded-2xl bg-surface-container-lowest shadow-sm flex items-center justify-between gap-3" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(20px) saturate(180%); border: 1px solid rgba(255, 255, 255, 0.7); box-shadow: rgba(16, 78, 45, 0.06) 0px 8px 32px 0px, rgba(255, 255, 255, 0.8) 0px 1px 1px 0px inset;">
<div class="flex items-start gap-3 min-w-0">
<div class="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center flex-shrink-0">
<span class="material-symbols-outlined text-[20px]">security</span>
</div>
<div class="flex flex-col min-w-0">
<h4 class="font-title-md text-title-md text-on-surface font-bold truncate">PMFBY Crop Insurance Dossier</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant truncate">Sentinel-2 NDVI telemetry verified</p>
<span class="font-label-sm text-label-sm text-secondary font-semibold mt-0.5">Approved &amp; Indexed · PDF (5.2 MB)</span>
</div>
</div>
<button aria-label="Download Insurance Claim" class="w-10 h-10 rounded-xl bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface flex-shrink-0">
<span class="material-symbols-outlined text-[20px]">download</span>
</button>
</div>
<!-- Card 2: KCC Limit Enhancement Ledger -->
<div class="p-3.5 rounded-2xl bg-surface-container-lowest shadow-sm flex items-center justify-between gap-3" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(20px) saturate(180%); border: 1px solid rgba(255, 255, 255, 0.7); box-shadow: rgba(16, 78, 45, 0.06) 0px 8px 32px 0px, rgba(255, 255, 255, 0.8) 0px 1px 1px 0px inset;">
<div class="flex items-start gap-3 min-w-0">
<div class="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center flex-shrink-0">
<span class="material-symbols-outlined text-[20px]">payments</span>
</div>
<div class="flex flex-col min-w-0">
<h4 class="font-title-md text-title-md text-on-surface font-bold truncate">KCC Credit Scale Booster</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant truncate">Verified 217% average input ROI</p>
<span class="font-label-sm text-label-sm text-secondary font-semibold mt-0.5">Eligible Limit: ₹4,25,000</span>
</div>
</div>
<button aria-label="Generate KCC Letter" class="w-10 h-10 rounded-xl bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface flex-shrink-0">
<span class="material-symbols-outlined text-[20px]">description</span>
</button>
</div>
<!-- Card 3: MahaDBT Drip Verification -->
<div class="p-3.5 rounded-2xl bg-surface-container-lowest shadow-sm flex items-center justify-between gap-3" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(20px) saturate(180%); border: 1px solid rgba(255, 255, 255, 0.7); box-shadow: rgba(16, 78, 45, 0.06) 0px 8px 32px 0px, rgba(255, 255, 255, 0.8) 0px 1px 1px 0px inset;">
<div class="flex items-start gap-3 min-w-0">
<div class="w-10 h-10 rounded-xl bg-tertiary-container text-on-tertiary-container flex items-center justify-center flex-shrink-0">
<span class="material-symbols-outlined text-[20px]">water</span>
</div>
<div class="flex flex-col min-w-0">
<h4 class="font-title-md text-title-md text-on-surface font-bold truncate">MahaDBT Drip Subsidy 55%</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant truncate">GPS-stamped emitter inspection passed</p>
<span class="font-label-sm text-label-sm text-secondary font-semibold mt-0.5">Disbursed ₹68,400 to Bank A/c</span>
</div>
</div>
<button aria-label="View Inspection Certificate" class="w-10 h-10 rounded-xl bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface flex-shrink-0">
<span class="material-symbols-outlined text-[20px]">visibility</span>
</button>
</div>
</div>
<!-- In-Situ Soil Health Ground Truth History -->
<div class="p-4 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col space-y-3.5" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(20px) saturate(180%); border: 1px solid rgba(255, 255, 255, 0.7); box-shadow: rgba(16, 78, 45, 0.06) 0px 8px 32px 0px, rgba(255, 255, 255, 0.8) 0px 1px 1px 0px inset;">
<div class="flex items-center justify-between">
<div>
<h3 class="font-title-md text-title-md text-on-surface font-bold">In-Situ Soil Health Chronology</h3>
<p class="font-label-sm text-label-sm text-on-surface-variant">Plots 2A–2D Deep Vertisol Core Samplings</p>
</div>
<span class="material-symbols-outlined text-secondary text-[22px]">science</span>
</div>
<div class="flex flex-col space-y-2.5">
<!-- Test 1: Recent -->
<div class="p-3 rounded-xl bg-surface-container-low flex flex-col space-y-2">
<div class="flex items-center justify-between">
<span class="font-label-md text-label-md text-on-surface font-bold">Oct 14, 2024 · Post-Kharif Cycle</span>
<span class="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">Latest Test</span>
</div>
<div class="grid grid-cols-4 gap-1 text-center py-1 bg-surface-container-lowest rounded-lg">
<div>
<span class="block font-label-sm text-label-sm text-on-surface-variant">pH</span>
<span class="font-label-md text-label-md text-on-surface font-bold">7.8</span>
</div>
<div>
<span class="block font-label-sm text-label-sm text-on-surface-variant">OC</span>
<span class="font-label-md text-label-md text-secondary font-bold">0.64%</span>
</div>
<div>
<span class="block font-label-sm text-label-sm text-on-surface-variant">N (kg/ha)</span>
<span class="font-label-md text-label-md text-on-surface font-bold">224</span>
</div>
<div>
<span class="block font-label-sm text-label-sm text-on-surface-variant">P / K</span>
<span class="font-label-md text-label-md text-on-surface font-bold">16.8/390</span>
</div>
</div>
<div class="flex justify-between items-center text-on-surface-variant font-label-sm text-label-sm">
<span class="">Hingoli Dist Soil Lab</span>
<button class="text-secondary font-semibold hover:underline">View Digital Slip</button>
</div>
</div>
<!-- Test 2: Mid-cycle -->
<div class="p-3 rounded-xl bg-surface-container-low flex flex-col space-y-2">
<div class="flex items-center justify-between">
<span class="font-label-md text-label-md text-on-surface font-bold">May 22, 2024 · Pre-Kharif Prep</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">KVK Lab Hingoli</span>
</div>
<div class="grid grid-cols-4 gap-1 text-center py-1 bg-surface-container-lowest rounded-lg">
<div>
<span class="block font-label-sm text-label-sm text-on-surface-variant">pH</span>
<span class="font-label-md text-label-md text-on-surface font-bold">7.9</span>
</div>
<div>
<span class="block font-label-sm text-label-sm text-on-surface-variant">OC</span>
<span class="font-label-md text-label-md text-secondary font-bold">0.56%</span>
</div>
<div>
<span class="block font-label-sm text-label-sm text-on-surface-variant">N (kg/ha)</span>
<span class="font-label-md text-label-md text-on-surface font-bold">208</span>
</div>
<div>
<span class="block font-label-sm text-label-sm text-on-surface-variant">P / K</span>
<span class="font-label-md text-label-md text-on-surface font-bold">14.2/382</span>
</div>
</div>
<div class="flex justify-between items-center text-on-surface-variant font-label-sm text-label-sm">
<span class="">Certified Microbes Active</span>
<button class="text-secondary font-semibold hover:underline">View Digital Slip</button>
</div>
</div>
<!-- Test 3: Baseline -->
<div class="p-3 rounded-xl bg-surface-container-low flex flex-col space-y-2">
<div class="flex items-center justify-between">
<span class="font-label-md text-label-md text-on-surface font-bold">Nov 05, 2023 · Initial Baseline</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">MahaAgri Base</span>
</div>
<div class="grid grid-cols-4 gap-1 text-center py-1 bg-surface-container-lowest rounded-lg">
<div>
<span class="block font-label-sm text-label-sm text-on-surface-variant">pH</span>
<span class="font-label-md text-label-md text-on-surface font-bold">8.1</span>
</div>
<div>
<span class="block font-label-sm text-label-sm text-on-surface-variant">OC</span>
<span class="font-label-md text-label-md text-on-surface font-bold">0.48%</span>
</div>
<div>
<span class="block font-label-sm text-label-sm text-on-surface-variant">N (kg/ha)</span>
<span class="font-label-md text-label-md text-on-surface font-bold">186</span>
</div>
<div>
<span class="block font-label-sm text-label-sm text-on-surface-variant">P / K</span>
<span class="font-label-md text-label-md text-on-surface font-bold">11.8/364</span>
</div>
</div>
<div class="flex justify-between items-center text-on-surface-variant font-label-sm text-label-sm">
<span class="">Pre-Optimization Marker</span>
<button class="text-secondary font-semibold hover:underline">View Digital Slip</button>
</div>
</div>
</div>
<!-- Official Agronomist Sign-Off Note -->
<div class="p-3 rounded-xl bg-surface-container flex items-start gap-2.5">
<div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary flex-shrink-0">
<span class="material-symbols-outlined text-[16px]">verified</span>
</div>
<div class="flex flex-col">
<span class="font-label-md text-label-md text-on-surface font-bold">Dr. Vilas Rao</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">Senior Agronomist, Krishi Vigyan Kendra Hingoli</span>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-snug">
          "Patil's adoption of intercropping and targeted residue incorporation has restored humus levels from 0.48% to 0.64%, significantly stabilizing monsoon moisture retention."
        </p>
</div>
</div>
</div>
<!-- Data Sovereignty & Cryptographic Integrity Footer -->
<div class="p-4 rounded-2xl bg-surface-container text-on-surface-variant flex flex-col space-y-3" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(20px) saturate(180%); border: 1px solid rgba(255, 255, 255, 0.7); box-shadow: rgba(16, 78, 45, 0.06) 0px 8px 32px 0px, rgba(255, 255, 255, 0.8) 0px 1px 1px 0px inset;">
<div class="flex items-center justify-between">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px] text-secondary">fingerprint</span>
<span class="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-on-surface">Cryptographic Proof</span>
</div>
<span class="font-label-sm text-label-sm text-secondary font-bold">SHA-256 Validated</span>
</div>
<div class="p-2 rounded-lg bg-surface-container-highest font-mono text-[11px] leading-tight text-on-surface-variant break-all select-all">
      e9b47a8290fbc28394e1d520f8c3641b9d107293a9c720e74fba8491c390214a
    </div>
<div class="grid grid-cols-2 gap-2 pt-1">
<button class="h-10 px-3 rounded-lg bg-surface-container-lowest text-on-surface font-label-sm text-label-sm font-semibold hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1">
<span class="material-symbols-outlined text-[16px]">share</span>
<span class="">Delegate Bank Access</span>
</button>
<button class="h-10 px-3 rounded-lg bg-surface-container-lowest text-on-surface font-label-sm text-label-sm font-semibold hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1">
<span class="material-symbols-outlined text-[16px]">data_object</span>
<span class="">JSON Audit Backup</span>
</button>
</div>
</div>
</div></main><nav class="fixed bottom-0 w-full z-50 pb-safe bg-surface/85 backdrop-blur-xl shadow-[0_-2px_12px_rgba(22,74,52,0.05)]" data-active-classes="text-primary font-semibold" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(24px) saturate(180%); border-top: 1px solid rgba(255, 255, 255, 0.7); box-shadow: rgba(16, 78, 45, 0.07) 0px -4px 24px 0px;"><div class="h-16 px-space-xs flex items-center justify-around"><a class="flex flex-col items-center justify-center flex-1 h-full py-1 text-on-surface-variant hover:text-on-surface" data-path="dashboard" href="#"><span class="material-symbols-outlined text-[24px]">grid_view</span><span class="font-label-sm text-label-sm mt-0.5">Dashboard</span></a><a class="flex flex-col items-center justify-center flex-1 h-full py-1 text-on-surface-variant hover:text-on-surface" data-path="crop-plans" href="#"><span class="material-symbols-outlined text-[24px]">calendar_month</span><span class="font-label-sm text-label-sm mt-0.5">Plans</span></a><a class="flex flex-col items-center justify-center flex-1 h-full py-1 text-on-surface-variant hover:text-on-surface" data-path="compare-crops" href="#"><span class="material-symbols-outlined text-[24px]">compare_arrows</span><span class="font-label-sm text-label-sm mt-0.5">Compare</span></a><a class="flex flex-col items-center justify-center flex-1 h-full py-1 text-on-surface-variant hover:text-on-surface" data-path="agronomy-advisory" href="#"><span class="material-symbols-outlined text-[24px]">psychology_alt</span><span class="font-label-sm text-label-sm mt-0.5">Advisory</span></a><a aria-current="page" class="flex flex-col items-center justify-center flex-1 h-full py-1 text-primary font-semibold" data-path="farm-reports" href="#"><span class="material-symbols-outlined text-[24px]">analytics</span><span class="font-label-sm text-label-sm mt-0.5">Reports</span></a></div></nav>

</body></html>
```

---

## `krishimitra_resource_check_readiness_mobile/code.html`

```html
<!DOCTYPE html><html class="h-full" lang="en"><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" name="viewport"><meta content="mobile_tab" name="shell-type"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"><link href="https://fonts.googleapis.com" rel="preconnect"><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "on-primary-fixed": "#002113", "on-tertiary-fixed-variant": "#004d62", "on-secondary-fixed-variant": "#00522b", "secondary": "#196c3e", "primary-container": "#164a34", "on-secondary-fixed": "#00210e", "on-tertiary-container": "#6ab7d5", "secondary-fixed-dim": "#88d8a0", "tertiary": "#002f3d", "on-surface-variant": "#404943", "on-error": "#ffffff", "surface-container-high": "#eae8e2", "error": "#ba1a1a", "background": "#fbf9f3", "on-secondary-container": "#1f7042", "on-primary-container": "#85b99c", "surface-dim": "#dcdad4", "surface": "#fbf9f3", "outline-variant": "#c0c9c1", "primary-fixed-dim": "#9dd2b5", "secondary-fixed": "#a4f4ba", "secondary-container": "#a1f1b7", "outline": "#717973", "primary": "#003320", "inverse-surface": "#30312d", "on-background": "#1b1c18", "error-container": "#ffdad6", "on-primary-fixed-variant": "#1d5039", "surface-tint": "#366850", "tertiary-fixed-dim": "#84d1f0", "on-surface": "#1b1c18", "surface-container-low": "#f5f3ed", "surface-container-lowest": "#ffffff", "on-secondary": "#ffffff", "surface-container": "#f0eee8", "on-error-container": "#93000a", "on-primary": "#ffffff", "on-tertiary-fixed": "#001f29", "inverse-primary": "#9dd2b5", "primary-fixed": "#b9efd0", "inverse-on-surface": "#f3f1eb", "tertiary-fixed": "#baeaff", "surface-variant": "#e4e2dd", "tertiary-container": "#00475a", "surface-container-highest": "#e4e2dd", "on-tertiary": "#ffffff", "surface-bright": "#fbf9f3" }, "borderRadius": { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" }, "spacing": { "margin": "3rem", "space-xs": "0.25rem", "space-sm": "0.5rem", "gutter": "1.5rem", "margin-mobile": "1rem", "space-xl": "2.5rem", "space-md": "1rem", "gutter-mobile": "1rem", "space-lg": "1.5rem" }, "fontFamily": { "display-lg-mobile": ["Plus Jakarta Sans"], "label-md": ["Plus Jakarta Sans"], "headline-lg": ["Plus Jakarta Sans"], "title-md": ["Plus Jakarta Sans"], "body-lg": ["Plus Jakarta Sans"], "title-lg": ["Plus Jakarta Sans"], "headline-lg-mobile": ["Plus Jakarta Sans"], "display-lg": ["Plus Jakarta Sans"], "body-md": ["Plus Jakarta Sans"], "label-lg": ["Plus Jakarta Sans"], "headline-md": ["Plus Jakarta Sans"], "headline-sm": ["Plus Jakarta Sans"], "body-sm": ["Plus Jakarta Sans"], "label-sm": ["Plus Jakarta Sans"] }, "fontSize": { "display-lg-mobile": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700" }], "label-md": ["12px", { "lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "600" }], "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700" }], "title-md": ["16px", { "lineHeight": "24px", "fontWeight": "600" }], "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }], "title-lg": ["18px", { "lineHeight": "26px", "fontWeight": "600" }], "headline-lg-mobile": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600" }], "display-lg": ["44px", { "lineHeight": "52px", "letterSpacing": "-0.02em", "fontWeight": "700" }], "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }], "label-lg": ["14px", { "lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "600" }], "headline-md": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600" }], "headline-sm": ["20px", { "lineHeight": "28px", "fontWeight": "600" }], "body-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }], "label-sm": ["11px", { "lineHeight": "14px", "letterSpacing": "0.02em", "fontWeight": "500" }] } } } }</script><style>@layer base { body { min-height: 100vh; overscroll-behavior-y: none; } .pb-safe { padding-bottom: env(safe-area-inset-bottom, 0px); } .pt-safe { padding-top: env(safe-area-inset-top, 0px); } main > :first-child { margin-top: 0 !important; } main > :last-child { margin-bottom: 0 !important; } } ::-webkit-scrollbar { display: none; }</style><style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
</head><body class="bg-surface text-on-surface font-body-md text-body-md flex flex-col min-h-screen" style="background: radial-gradient(at 15% 10%, rgba(34, 197, 94, 0.18) 0px, transparent 50%), radial-gradient(at 85% 15%, rgba(16, 185, 129, 0.16) 0px, transparent 45%), radial-gradient(rgba(5, 150, 105, 0.08) 0px, transparent 60%), radial-gradient(at 20% 85%, rgba(132, 204, 22, 0.15) 0px, transparent 50%), radial-gradient(at 80% 90%, rgba(16, 185, 129, 0.18) 0px, transparent 50%), rgb(248, 250, 247); min-height: max(884px, 100dvh);"><header class="fixed top-0 w-full z-50 pt-safe bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]" style="background: rgba(255, 255, 255, 0.72); backdrop-filter: blur(24px) saturate(180%); border-bottom: 1px solid rgba(255, 255, 255, 0.75); box-shadow: rgba(0, 33, 19, 0.04) 0px 4px 20px 0px;"><div class="h-16 px-gutter-mobile flex items-center justify-between gap-space-sm"><div class="flex items-center gap-space-sm min-w-0"><img alt="Brand logo. - Primary color: #164a34
- Font: plusJakartaSans
- Mode: light
- Roundness: rounded-md
" class="h-8 w-auto object-contain flex-shrink-0" src="https://lh3.googleusercontent.com/aida/AEtjO1UwvheEflVQETpVODXud1bKJQLTG3Z9V091WAQuRWb3OjkfynIYN40ImZHKnidhICqNkNrqFqpWKzSfZlgxI5J_M82iY6odlXGtsZTTc8HXdVBAz6ryKsSz-P5wU6ZoKTCO5D247hagw2iNx0PZZfjdthMC8zjpWAGLJh7xg4qo3i9LZdCn7j6gGxugjmJTrMiBN0EKKxLQuSsUMZx2F7LChrzofAoNzJDssH-iE5FNMrlgSgXlD6etBto"><div class="flex flex-col min-w-0"><span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold leading-none">KrishiMitra</span><h1 class="font-title-md text-title-md text-on-surface truncate leading-tight">Farm Reports</h1></div></div><div class="flex items-center gap-space-xs flex-shrink-0"><button aria-label="Toggle Marathi or English Language" class="h-9 px-space-sm rounded-full bg-surface-container flex items-center gap-1 text-on-surface-variant hover:text-on-surface"><span class="font-label-sm text-label-sm font-semibold text-primary">मराठी</span><span class="text-outline-variant font-label-sm text-label-sm">/</span><span class="font-label-sm text-label-sm font-semibold text-on-surface-variant">EN</span></button><button aria-label="Notifications" class="w-11 h-11 flex items-center justify-center text-on-surface-variant hover:text-on-surface rounded-full"><span class="material-symbols-outlined text-[22px]">notifications</span></button><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main class="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface px-gutter-mobile" style="background: transparent;"><div class="flex flex-col w-full space-y-space-md">
<!-- Operational Header & Sowing Countdown Hero Card -->
<div class="bg-surface-container-lowest rounded-xl p-space-md shadow-sm" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(20px) saturate(180%); border: 1px solid rgba(255, 255, 255, 0.65); box-shadow: rgba(16, 78, 45, 0.06) 0px 8px 32px 0px, rgba(255, 255, 255, 0.8) 0px 1px 1px 0px inset;">
<div class="flex items-center justify-between gap-space-xs mb-space-xs">
<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">verified</span>
        FIELD AUDIT VERIFIED
      </span>
<span class="font-label-sm text-label-sm text-on-surface-variant font-medium">Rabi 2025 Cycle</span>
</div>
<div class="flex items-baseline justify-between gap-2">
<h2 class="font-headline-md text-headline-md text-on-surface tracking-tight">Sowing Readiness Audit</h2>
<div class="flex items-center gap-1 text-error bg-error-container/60 px-2 py-0.5 rounded-md">
<span class="material-symbols-outlined text-[15px]">schedule</span>
<span class="font-label-md text-label-md font-bold">5 Days Left</span>
</div>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">
      Shivaji Patil Farm · 8.5 Acres · Drip Precision Wheat (HD-2967)
    </p>
<!-- Context Chips Horizontal Scroll -->
<div class="flex items-center gap-1.5 overflow-x-auto py-2 no-scrollbar">
<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container font-label-sm text-label-sm text-on-surface whitespace-nowrap">
<span class="material-symbols-outlined text-[14px] text-secondary">landscape</span>
        Deep Black Cotton Soil
      </span>
<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container font-label-sm text-label-sm text-on-surface whitespace-nowrap">
<span class="material-symbols-outlined text-[14px] text-tertiary">calendar_today</span>
        Target: Nov 02, 2025
      </span>
<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container font-label-sm text-label-sm text-on-surface whitespace-nowrap">
<span class="material-symbols-outlined text-[14px] text-secondary">location_on</span>
        Hingoli Sub-District
      </span>
</div>
<!-- Micro Action Row -->
<div class="flex items-center gap-space-sm pt-2">
<button class="flex-1 h-10 px-3 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md flex items-center justify-center gap-1.5 active:scale-95 transition-transform" id="lockTargetBtn" onclick="toggleLockState()">
<span class="material-symbols-outlined text-[18px]" id="lockIcon">lock_open</span>
<span id="lockText" class="">Lock Sowing Target</span>
</button>
<button class="h-10 px-3 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md flex items-center justify-center gap-1.5 active:scale-95 transition-transform" onclick="simulatePdfDownload()">
<span class="material-symbols-outlined text-[18px] text-on-surface-variant">picture_as_pdf</span>
<span class="">Export PDF</span>
</button>
</div>
</div>
<!-- Urgent Action Required Banner (Bottleneck Alert) -->
<div class="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border-l-4 border-l-error" id="urgentAlertCard" style="background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(20px) saturate(180%); border-top: 1px solid rgba(255, 255, 255, 0.8); border-right: 1px solid rgba(255, 255, 255, 0.7); border-bottom: 1px solid rgba(255, 255, 255, 0.7); box-shadow: rgba(186, 26, 26, 0.08) 0px 8px 32px 0px, rgba(255, 255, 255, 0.9) 0px 1px 1px 0px inset;">
<div class="flex items-start justify-between gap-2">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-error text-[20px]" style="font-variation-settings: 'FILL' 1;">warning</span>
<span class="font-label-sm text-label-sm uppercase tracking-wide text-error font-bold">1 Action Required Prior to Sowing</span>
</div>
<span class="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">Pickup Today</span>
</div>
<div class="mt-2.5">
<h3 class="font-title-md text-title-md text-on-surface">Pick up remaining 160 kg Sonalika HD-2967 Seed</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
        Order <strong class="text-on-surface">#HKK-8821</strong> held at Hingoli Krishi Kendra. Balance to pay: <strong class="text-on-surface">₹7,200</strong>.
      </p>
</div>
<!-- Mobile Action Buttons -->
<div class="grid grid-cols-3 gap-2 mt-3.5">
<a class="h-10 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center justify-center gap-1 active:scale-95 transition-transform" href="tel:+919822001122">
<span class="material-symbols-outlined text-[16px] text-secondary">call</span>
<span class="">Call Shop</span>
</a>
<button class="h-10 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center justify-center gap-1 active:scale-95 transition-transform" onclick="openDealerRoute()">
<span class="material-symbols-outlined text-[16px] text-tertiary">directions</span>
<span class="">Route (12km)</span>
</button>
<button class="h-10 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm flex items-center justify-center gap-1 active:scale-95 transition-transform shadow-sm" onclick="resolveUrgentAction()">
<span class="material-symbols-outlined text-[16px]">check_circle</span>
<span class="">Picked Up</span>
</button>
</div>
</div>
<!-- Topline Readiness Scorecards (2x2 Touch Grid) -->
<div class="grid grid-cols-2 gap-space-sm">
<!-- 1. Overall Readiness -->
<div class="bg-surface-container-lowest rounded-xl p-3.5 shadow-sm flex flex-col justify-between" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(20px) saturate(180%); border: 1px solid rgba(255, 255, 255, 0.65); box-shadow: rgba(16, 78, 45, 0.06) 0px 8px 32px 0px, rgba(255, 255, 255, 0.8) 0px 1px 1px 0px inset;">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-on-surface-variant font-medium">Readiness Index</span>
<span class="material-symbols-outlined text-secondary text-[18px]">verified_user</span>
</div>
<div class="my-2 flex items-baseline gap-1.5">
<span class="font-headline-md text-headline-md font-bold text-primary" id="scoreOverall">88%</span>
<span class="font-label-sm text-label-sm font-semibold text-secondary">Grade A-</span>
</div>
<div>
<div class="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
<div class="bg-secondary h-1.5 rounded-full" style="width: 88%"></div>
</div>
<p class="font-label-sm text-label-sm text-on-surface-variant mt-1.5">4 of 5 pillars verified</p>
</div>
</div>
<!-- 2. Water Security -->
<div class="bg-surface-container-lowest rounded-xl p-3.5 shadow-sm flex flex-col justify-between" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(20px) saturate(180%); border: 1px solid rgba(255, 255, 255, 0.65); box-shadow: rgba(16, 78, 45, 0.06) 0px 8px 32px 0px, rgba(255, 255, 255, 0.8) 0px 1px 1px 0px inset;">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-on-surface-variant font-medium">Water Security</span>
<span class="material-symbols-outlined text-on-tertiary-container text-[18px]">water_drop</span>
</div>
<div class="my-2">
<div class="flex items-baseline gap-1">
<span class="font-headline-md text-headline-md font-bold text-on-surface">6,200</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">m³</span>
</div>
<span class="font-label-sm text-label-sm font-semibold text-secondary">180% of Req (+2.7k buffer)</span>
</div>
<div>
<div class="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
<div class="bg-tertiary-container h-1.5 rounded-full" style="width: 92%"></div>
</div>
<p class="font-label-sm text-label-sm text-on-surface-variant mt-1.5">Wells #1 &amp; #2 at 92%</p>
</div>
</div>
<!-- 3. Working Capital -->
<div class="bg-surface-container-lowest rounded-xl p-3.5 shadow-sm flex flex-col justify-between" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(20px) saturate(180%); border: 1px solid rgba(255, 255, 255, 0.65); box-shadow: rgba(16, 78, 45, 0.06) 0px 8px 32px 0px, rgba(255, 255, 255, 0.8) 0px 1px 1px 0px inset;">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-on-surface-variant font-medium">Working Capital</span>
<span class="material-symbols-outlined text-secondary text-[18px]">account_balance_wallet</span>
</div>
<div class="my-2">
<span class="font-headline-md text-headline-md font-bold text-on-surface">₹85,000</span>
<p class="font-label-sm text-label-sm text-secondary font-semibold">₹47k Surplus Stage</p>
</div>
<div class="bg-surface-container px-2 py-1 rounded">
<p class="font-label-sm text-label-sm text-on-surface-variant truncate">+ ₹1.2L KCC Headroom</p>
</div>
</div>
<!-- 4. Certified Inputs & Tools -->
<div class="bg-surface-container-lowest rounded-xl p-3.5 shadow-sm flex flex-col justify-between" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(20px) saturate(180%); border: 1px solid rgba(255, 255, 255, 0.65); box-shadow: rgba(16, 78, 45, 0.06) 0px 8px 32px 0px, rgba(255, 255, 255, 0.8) 0px 1px 1px 0px inset;">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-on-surface-variant font-medium">Inputs &amp; Rig</span>
<span class="material-symbols-outlined text-error text-[18px]">precision_manufacturing</span>
</div>
<div class="my-2 flex items-baseline gap-1.5">
<span class="font-headline-md text-headline-md font-bold text-on-surface">78%</span>
<span class="font-label-sm text-label-sm text-error font-medium">1 Item Short</span>
</div>
<div>
<div class="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
<div class="bg-secondary h-1.5 rounded-full" style="width: 78%"></div>
</div>
<p class="font-label-sm text-label-sm text-on-surface-variant mt-1.5">Mahindra 575 DI Ready</p>
</div>
</div>
</div>
<!-- 5-Day Critical Path Sowing Countdown (Interactive Timeline) -->
<div class="bg-surface-container-lowest rounded-xl p-space-md shadow-sm" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(20px) saturate(180%); border: 1px solid rgba(255, 255, 255, 0.65); box-shadow: rgba(16, 78, 45, 0.06) 0px 8px 32px 0px, rgba(255, 255, 255, 0.8) 0px 1px 1px 0px inset;">
<div class="flex items-center justify-between mb-3">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-secondary text-[20px]">route</span>
<h3 class="font-title-md text-title-md text-on-surface">Critical Path Sowing Plan</h3>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant">Nov 02 Sowing</span>
</div>
<div class="relative pl-6 space-y-4">
<!-- Continuous vertical track -->
<div class="absolute left-2.5 top-2 bottom-2 w-0.5 bg-surface-container-high"></div>
<!-- Stage 1: Oct 28 (Done) -->
<div class="relative flex items-start gap-2.5">
<div class="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-secondary text-on-secondary flex items-center justify-center">
<span class="material-symbols-outlined text-[13px]">done</span>
</div>
<div class="flex-1 bg-surface-container-low p-2.5 rounded-lg">
<div class="flex items-center justify-between">
<span class="font-label-md text-label-md font-bold text-on-surface">Oct 28 (Today)</span>
<span class="font-label-sm text-label-sm text-secondary font-semibold">Completed</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            Pre-irrigation Profile: Soil moisture logged at 18% dry weight across Plot A &amp; B.
          </p>
</div>
</div>
<!-- Stage 2: Oct 29 (Active) -->
<div class="relative flex items-start gap-2.5">
<div class="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-error text-on-error flex items-center justify-center animate-pulse">
<span class="material-symbols-outlined text-[13px]">radio_button_checked</span>
</div>
<div class="flex-1 bg-surface-container-lowest p-2.5 rounded-lg border-l-2 border-l-error shadow-sm">
<div class="flex items-center justify-between">
<span class="font-label-md text-label-md font-bold text-error">Oct 29 (Tomorrow)</span>
<span class="font-label-sm text-label-sm bg-error-container text-on-error-container px-1.5 py-0.5 rounded font-semibold">Critical</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface font-medium mt-0.5">
            Seed Pickup (160 kg) &amp; Trichoderma Bio-Mix Inoculation slurry prep.
          </p>
</div>
</div>
<!-- Stage 3: Oct 30 -->
<div class="relative flex items-start gap-2.5">
<div class="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center">
<span class="material-symbols-outlined text-[12px]">schedule</span>
</div>
<div class="flex-1 p-2 rounded-lg bg-surface-container-low/60">
<span class="font-label-md text-label-md font-semibold text-on-surface">Oct 30 · T-3 Days</span>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            Secondary Tillage &amp; laser leveling for uniform seedbed depth.
          </p>
</div>
</div>
<!-- Stage 4: Nov 01 -->
<div class="relative flex items-start gap-2.5">
<div class="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center">
<span class="material-symbols-outlined text-[12px]">schedule</span>
</div>
<div class="flex-1 p-2 rounded-lg bg-surface-container-low/60">
<span class="font-label-md text-label-md font-semibold text-on-surface">Nov 01 · T-1 Day</span>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            Drip line layout &amp; 4.2 bar manifold pressure check. Agronomist prep call.
          </p>
</div>
</div>
<!-- Stage 5: Nov 02 (Target) -->
<div class="relative flex items-start gap-2.5">
<div class="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center">
<span class="material-symbols-outlined text-[12px]">flag</span>
</div>
<div class="flex-1 p-2.5 rounded-lg bg-surface-container text-on-surface">
<div class="flex items-center justify-between">
<span class="font-label-md text-label-md font-bold text-primary">Nov 02 · TARGET SOWING DAY</span>
<span class="font-label-sm text-label-sm text-secondary font-bold">5:30 AM Start</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            Zero-till seed drill @ 40 kg/ac + basal NPK application across 8.5 acres.
          </p>
</div>
</div>
</div>
</div>
<!-- Filterable Category Horizontal Pills -->
<div class="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
<button class="category-pill px-3 py-1.5 rounded-full bg-primary text-on-primary font-label-md text-label-md whitespace-nowrap shadow-sm" onclick="filterChecklist('all', this)">
      All (13)
    </button>
<button class="category-pill px-3 py-1.5 rounded-full bg-surface-container text-on-surface font-label-md text-label-md whitespace-nowrap" onclick="filterChecklist('water', this)">
      Water (4)
    </button>
<button class="category-pill px-3 py-1.5 rounded-full bg-surface-container text-on-surface font-label-md text-label-md whitespace-nowrap" onclick="filterChecklist('seed', this)">
      Seed &amp; Bio (4)
    </button>
<button class="category-pill px-3 py-1.5 rounded-full bg-surface-container text-on-surface font-label-md text-label-md whitespace-nowrap" onclick="filterChecklist('machinery', this)">
      Machinery (2)
    </button>
<button class="category-pill px-3 py-1.5 rounded-full bg-surface-container text-on-surface font-label-md text-label-md whitespace-nowrap" onclick="filterChecklist('capital', this)">
      Capital (1)
    </button>
<button class="category-pill px-3 py-1.5 rounded-full bg-surface-container text-on-surface font-label-md text-label-md whitespace-nowrap" onclick="filterChecklist('labor', this)">
      Labor &amp; Advisory (2)
    </button>
</div>
<!-- Itemized Checklist Cards -->
<div class="space-y-2.5" id="checklistContainer">
<!-- URGENT SEED CARD -->
<div class="checklist-item bg-surface-container-lowest rounded-xl p-3.5 shadow-sm border-l-4 border-l-error transition-all" data-category="seed">
<div class="flex items-start justify-between gap-2">
<div class="flex items-center gap-2 min-w-0">
<div class="w-8 h-8 rounded-lg bg-error-container/70 flex items-center justify-center flex-shrink-0">
<span class="material-symbols-outlined text-error text-[18px]">grain</span>
</div>
<div class="min-w-0">
<h4 class="font-title-md text-title-md text-on-surface truncate">Sonalika HD-2967 Seed (340 kg Total)</h4>
<p class="font-body-sm text-body-sm text-error font-semibold">180 kg on farm · 160 kg pending pickup</p>
</div>
</div>
<span class="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold flex-shrink-0">Action Req</span>
</div>
<div class="mt-2.5 pt-2 flex items-center justify-between bg-surface-container-low px-2.5 py-1.5 rounded-lg">
<span class="font-label-sm text-label-sm text-on-surface-variant">Reserved at Hingoli Kendra (₹7,200 due)</span>
<button class="font-label-sm text-label-sm text-secondary font-bold hover:underline" onclick="resolveSeedItem(this)">Mark Received</button>
</div>
</div>
<!-- Well #1 -->
<div class="checklist-item bg-surface-container-lowest rounded-xl p-3.5 shadow-sm border-l-4 border-l-secondary transition-all" data-category="water">
<div class="flex items-start justify-between gap-2">
<div class="flex items-center gap-2 min-w-0">
<div class="w-8 h-8 rounded-lg bg-secondary-container/60 flex items-center justify-center flex-shrink-0">
<span class="material-symbols-outlined text-secondary text-[18px]">water</span>
</div>
<div class="min-w-0">
<h4 class="font-title-md text-title-md text-on-surface truncate">Primary Open Well #1 (3,800 m³)</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant">5 HP Submersible tested · Discharge 180 LPM</p>
</div>
</div>
<span class="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold flex-shrink-0">100% Ready</span>
</div>
</div>
<!-- Well #2 -->
<div class="checklist-item bg-surface-container-lowest rounded-xl p-3.5 shadow-sm border-l-4 border-l-secondary transition-all" data-category="water">
<div class="flex items-start justify-between gap-2">
<div class="flex items-center gap-2 min-w-0">
<div class="w-8 h-8 rounded-lg bg-secondary-container/60 flex items-center justify-center flex-shrink-0">
<span class="material-symbols-outlined text-secondary text-[18px]">solar_power</span>
</div>
<div class="min-w-0">
<h4 class="font-title-md text-title-md text-on-surface truncate">Secondary Well #2 (2,400 m³)</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant">Solar 3.0 kW dual inverter grid operational</p>
</div>
</div>
<span class="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold flex-shrink-0">100% Ready</span>
</div>
</div>
<!-- Drip Irrigation -->
<div class="checklist-item bg-surface-container-lowest rounded-xl p-3.5 shadow-sm border-l-4 border-l-secondary transition-all" data-category="water">
<div class="flex items-start justify-between gap-2">
<div class="flex items-center gap-2 min-w-0">
<div class="w-8 h-8 rounded-lg bg-secondary-container/60 flex items-center justify-center flex-shrink-0">
<span class="material-symbols-outlined text-secondary text-[18px]">valve</span>
</div>
<div class="min-w-0">
<h4 class="font-title-md text-title-md text-on-surface truncate">Drip Lateral &amp; Manifold (16mm Inline)</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant">Flushed &amp; acid treated · Holds 4.2 bar</p>
</div>
</div>
<span class="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold flex-shrink-0">Verified</span>
</div>
</div>
<!-- Canal Allocation -->
<div class="checklist-item bg-surface-container-lowest rounded-xl p-3.5 shadow-sm border-l-4 border-l-secondary transition-all" data-category="water">
<div class="flex items-start justify-between gap-2">
<div class="flex items-center gap-2 min-w-0">
<div class="w-8 h-8 rounded-lg bg-secondary-container/60 flex items-center justify-center flex-shrink-0">
<span class="material-symbols-outlined text-secondary text-[18px]">waves</span>
</div>
<div class="min-w-0">
<h4 class="font-title-md text-title-md text-on-surface truncate">Hingoli Canal Water Turn #1</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant">Scheduled Nov 14–16 · Irrigation cess paid</p>
</div>
</div>
<span class="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold flex-shrink-0">Confirmed</span>
</div>
</div>
<!-- Bio Inoculants -->
<div class="checklist-item bg-surface-container-lowest rounded-xl p-3.5 shadow-sm border-l-4 border-l-secondary transition-all" data-category="seed">
<div class="flex items-start justify-between gap-2">
<div class="flex items-center gap-2 min-w-0">
<div class="w-8 h-8 rounded-lg bg-secondary-container/60 flex items-center justify-center flex-shrink-0">
<span class="material-symbols-outlined text-secondary text-[18px]">science</span>
</div>
<div class="min-w-0">
<h4 class="font-title-md text-title-md text-on-surface truncate">Trichoderma viride + Pseudomonas</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant">2.0 kg fresh pack stored in cool shed</p>
</div>
</div>
<span class="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold flex-shrink-0">In Stock</span>
</div>
</div>
<!-- Soluble Fertilizer -->
<div class="checklist-item bg-surface-container-lowest rounded-xl p-3.5 shadow-sm border-l-4 border-l-secondary transition-all" data-category="seed">
<div class="flex items-start justify-between gap-2">
<div class="flex items-center gap-2 min-w-0">
<div class="w-8 h-8 rounded-lg bg-secondary-container/60 flex items-center justify-center flex-shrink-0">
<span class="material-symbols-outlined text-secondary text-[18px]">inventory_2</span>
</div>
<div class="min-w-0">
<h4 class="font-title-md text-title-md text-on-surface truncate">Fertilizer: NPK 19:19:19 (Soluble)</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant">6 bags (300 kg) staged for fertigation schedule</p>
</div>
</div>
<span class="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold flex-shrink-0">100% Staged</span>
</div>
</div>
<!-- Micro-nutrients -->
<div class="checklist-item bg-surface-container-lowest rounded-xl p-3.5 shadow-sm border-l-4 border-l-secondary transition-all" data-category="seed">
<div class="flex items-start justify-between gap-2">
<div class="flex items-center gap-2 min-w-0">
<div class="w-8 h-8 rounded-lg bg-secondary-container/60 flex items-center justify-center flex-shrink-0">
<span class="material-symbols-outlined text-secondary text-[18px]">colorize</span>
</div>
<div class="min-w-0">
<h4 class="font-title-md text-title-md text-on-surface truncate">Zinc Sulphate (21%) &amp; Solubor Boron</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant">25 kg ZnSO4 + 5 kg Boron sealed</p>
</div>
</div>
<span class="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold flex-shrink-0">In Stock</span>
</div>
</div>
<!-- Tractor -->
<div class="checklist-item bg-surface-container-lowest rounded-xl p-3.5 shadow-sm border-l-4 border-l-secondary transition-all" data-category="machinery">
<div class="flex items-start justify-between gap-2">
<div class="flex items-center gap-2 min-w-0">
<div class="w-8 h-8 rounded-lg bg-secondary-container/60 flex items-center justify-center flex-shrink-0">
<span class="material-symbols-outlined text-secondary text-[18px]">agriculture</span>
</div>
<div class="min-w-0">
<h4 class="font-title-md text-title-md text-on-surface truncate">Mahindra 575 DI (47 HP)</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant">Serviced, greased · 45L Diesel tank filled</p>
</div>
</div>
<span class="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold flex-shrink-0">100% Ready</span>
</div>
</div>
<!-- Seed Drill -->
<div class="checklist-item bg-surface-container-lowest rounded-xl p-3.5 shadow-sm border-l-4 border-l-secondary transition-all" data-category="machinery">
<div class="flex items-start justify-between gap-2">
<div class="flex items-center gap-2 min-w-0">
<div class="w-8 h-8 rounded-lg bg-secondary-container/60 flex items-center justify-center flex-shrink-0">
<span class="material-symbols-outlined text-secondary text-[18px]">build</span>
</div>
<div class="min-w-0">
<h4 class="font-title-md text-title-md text-on-surface truncate">9-Tyne Zero-Till Seed Drill</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant">Furrow openers calibrated to 40 kg/acre rate</p>
</div>
</div>
<span class="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold flex-shrink-0">Calibrated</span>
</div>
</div>
<!-- Liquid Capital -->
<div class="checklist-item bg-surface-container-lowest rounded-xl p-3.5 shadow-sm border-l-4 border-l-secondary transition-all" data-category="capital">
<div class="flex items-start justify-between gap-2">
<div class="flex items-center gap-2 min-w-0">
<div class="w-8 h-8 rounded-lg bg-secondary-container/60 flex items-center justify-center flex-shrink-0">
<span class="material-symbols-outlined text-secondary text-[18px]">payments</span>
</div>
<div class="min-w-0">
<h4 class="font-title-md text-title-md text-on-surface truncate">Bank Liquid Capital &amp; Cash Buffer</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant">₹45,000 cash on hand + ₹40,000 SBI current</p>
</div>
</div>
<span class="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold flex-shrink-0">Secured</span>
</div>
</div>
<!-- Labor Squad -->
<div class="checklist-item bg-surface-container-lowest rounded-xl p-3.5 shadow-sm border-l-4 border-l-secondary transition-all" data-category="labor">
<div class="flex items-start justify-between gap-2">
<div class="flex items-center gap-2 min-w-0">
<div class="w-8 h-8 rounded-lg bg-secondary-container/60 flex items-center justify-center flex-shrink-0">
<span class="material-symbols-outlined text-secondary text-[18px]">groups</span>
</div>
<div class="min-w-0">
<h4 class="font-title-md text-title-md text-on-surface truncate">Contracted Sowing Workcrew (4 Hands)</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant">Assigned Nov 02–03 · Advance paid (₹500/day agreed)</p>
</div>
</div>
<span class="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold flex-shrink-0">Booked</span>
</div>
</div>
<!-- Agronomist Consult -->
<div class="checklist-item bg-surface-container-lowest rounded-xl p-3.5 shadow-sm border-l-4 border-l-secondary transition-all" data-category="labor">
<div class="flex items-start justify-between gap-2">
<div class="flex items-center gap-2 min-w-0">
<div class="w-8 h-8 rounded-lg bg-secondary-container/60 flex items-center justify-center flex-shrink-0">
<span class="material-symbols-outlined text-secondary text-[18px]">psychology</span>
</div>
<div class="min-w-0">
<h4 class="font-title-md text-title-md text-on-surface truncate">Dr. Vilas Rao (Hingoli KVK Agronomist)</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant">Pre-sowing weather check call slotted for Nov 01, 6 PM</p>
</div>
</div>
<span class="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold flex-shrink-0">Confirmed</span>
</div>
</div>
</div>
<!-- Notification Toast Simulation -->
<div class="hidden fixed bottom-24 left-4 right-4 z-50 bg-primary text-on-primary p-3 rounded-xl shadow-lg flex items-center justify-between" id="toastMessage">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary-fixed text-[20px]">check_circle</span>
<span class="font-label-md text-label-md" id="toastText">Audit updated successfully!</span>
</div>
<button class="text-on-primary-container hover:text-on-primary" onclick="dismissToast()">
<span class="material-symbols-outlined text-[18px]">close</span>
</button>
</div>
<!-- Footer Verification Guarantee Card -->
<div class="bg-surface-container rounded-xl p-space-md flex flex-col items-center text-center space-y-2 mb-2" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(20px) saturate(180%); border: 1px solid rgba(255, 255, 255, 0.65); box-shadow: rgba(16, 78, 45, 0.06) 0px 8px 32px 0px, rgba(255, 255, 255, 0.8) 0px 1px 1px 0px inset;">
<div class="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm">
<span class="material-symbols-outlined text-[28px]" style="font-variation-settings: 'FILL' 1;">shield_with_heart</span>
</div>
<h5 class="font-title-md text-title-md text-on-surface">ICAR Package of Practices Compliant</h5>
<p class="font-body-sm text-body-sm text-on-surface-variant max-w-xs">
      Verified against Marathwada Agri University (VNMKV) Wheat Protocol #W-2025.
    </p>
<div class="pt-1 flex items-center gap-2">
<button class="inline-flex items-center gap-1 text-primary font-label-md text-label-md font-semibold hover:underline" onclick="simulateLogDownload()">
<span class="material-symbols-outlined text-[16px]">history_edu</span>
        Download Immutable Audit Log (#KM-88219-HNG)
      </button>
</div>
</div>
</div>
<script>
  let targetLocked = false;

  function toggleLockState() {
    targetLocked = !targetLocked;
    const lockIcon = document.getElementById('lockIcon');
    const lockText = document.getElementById('lockText');
    const lockBtn = document.getElementById('lockTargetBtn');

    if (targetLocked) {
      lockIcon.innerText = 'lock';
      lockText.innerText = 'Target Locked (Nov 02)';
      lockBtn.classList.remove('bg-primary-container', 'text-on-primary-container');
      lockBtn.classList.add('bg-primary', 'text-on-primary');
      showToast('Sowing Target locked for Nov 02, 2025. Notifications synced with field labor.');
    } else {
      lockIcon.innerText = 'lock_open';
      lockText.innerText = 'Lock Sowing Target';
      lockBtn.classList.remove('bg-primary', 'text-on-primary');
      lockBtn.classList.add('bg-primary-container', 'text-on-primary-container');
      showToast('Target unlocked for revision.');
    }
  }

  function resolveUrgentAction() {
    const alertCard = document.getElementById('urgentAlertCard');
    const scoreOverall = document.getElementById('scoreOverall');
    
    // Hide alert with smooth fade
    alertCard.style.opacity = '0.3';
    setTimeout(() => {
      alertCard.classList.add('hidden');
      scoreOverall.innerText = '98%';
      showToast('Seed marked as collected! Readiness raised to 98% (Grade A+).');
    }, 250);
  }

  function resolveSeedItem(btn) {
    const card = btn.closest('.checklist-item');
    card.classList.remove('border-l-error');
    card.classList.add('border-l-secondary');
    btn.parentElement.innerHTML = '<span class="font-label-sm text-label-sm text-secondary font-semibold flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">done_all</span> All 340 kg Stocked in Farm Storage</span>';
    showToast('Seed inventory 100% verified on farm.');
  }

  function filterChecklist(category, element) {
    // Update button states
    const buttons = document.querySelectorAll('.category-pill');
    buttons.forEach(btn => {
      btn.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
      btn.classList.add('bg-surface-container', 'text-on-surface');
    });
    element.classList.remove('bg-surface-container', 'text-on-surface');
    element.classList.add('bg-primary', 'text-on-primary', 'shadow-sm');

    // Filter cards
    const items = document.querySelectorAll('.checklist-item');
    items.forEach(item => {
      if (category === 'all' || item.getAttribute('data-category') === category) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  }

  function openDealerRoute() {
    window.open('https://maps.google.com?q=Hingoli+Krishi+Kendra+Maharashtra', '_blank');
  }

  function simulatePdfDownload() {
    showToast('Generating official Rabi 2025 Audit Sheet (PDF)...');
  }

  function simulateLogDownload() {
    showToast('Downloading ICAR compliance log #KM-88219...');
  }

  function showToast(message) {
    const toast = document.getElementById('toastMessage');
    const toastText = document.getElementById('toastText');
    toastText.innerText = message;
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 3800);
  }

  function dismissToast() {
    document.getElementById('toastMessage').classList.add('hidden');
  }
</script></main><nav class="fixed bottom-0 w-full z-50 pb-safe bg-surface/85 backdrop-blur-xl shadow-[0_-2px_12px_rgba(22,74,52,0.05)]" data-active-classes="text-primary font-semibold" style="background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(24px) saturate(180%); border-top: 1px solid rgba(255, 255, 255, 0.75); box-shadow: rgba(0, 33, 19, 0.06) 0px -4px 24px 0px;"><div class="h-16 px-space-xs flex items-center justify-around"><a class="flex flex-col items-center justify-center flex-1 h-full py-1 text-on-surface-variant hover:text-on-surface" data-path="dashboard" href="#"><span class="material-symbols-outlined text-[24px]">grid_view</span><span class="font-label-sm text-label-sm mt-0.5">Dashboard</span></a><a class="flex flex-col items-center justify-center flex-1 h-full py-1 text-on-surface-variant hover:text-on-surface" data-path="crop-plans" href="#"><span class="material-symbols-outlined text-[24px]">calendar_month</span><span class="font-label-sm text-label-sm mt-0.5">Plans</span></a><a class="flex flex-col items-center justify-center flex-1 h-full py-1 text-on-surface-variant hover:text-on-surface" data-path="compare-crops" href="#"><span class="material-symbols-outlined text-[24px]">compare_arrows</span><span class="font-label-sm text-label-sm mt-0.5">Compare</span></a><a class="flex flex-col items-center justify-center flex-1 h-full py-1 text-on-surface-variant hover:text-on-surface" data-path="agronomy-advisory" href="#"><span class="material-symbols-outlined text-[24px]">psychology_alt</span><span class="font-label-sm text-label-sm mt-0.5">Advisory</span></a><a class="flex flex-col items-center justify-center flex-1 h-full py-1 text-on-surface-variant hover:text-on-surface" data-path="farm-reports" href="#"><span class="material-symbols-outlined text-[24px]">analytics</span><span class="font-label-sm text-label-sm mt-0.5">Reports</span></a></div></nav>

</body></html>
```

---

## `krishimitra_recommendations_mobile/code.html`

```html
<!DOCTYPE html><html class="h-full" lang="en" style=""><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" name="viewport"><meta content="mobile_tab" name="shell-type"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"><link href="https://fonts.googleapis.com" rel="preconnect"><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "on-primary-fixed": "#002113", "on-tertiary-fixed-variant": "#004d62", "on-secondary-fixed-variant": "#00522b", "secondary": "#196c3e", "primary-container": "#164a34", "on-secondary-fixed": "#00210e", "on-tertiary-container": "#6ab7d5", "secondary-fixed-dim": "#88d8a0", "tertiary": "#002f3d", "on-surface-variant": "#404943", "on-error": "#ffffff", "surface-container-high": "#eae8e2", "error": "#ba1a1a", "background": "#fbf9f3", "on-secondary-container": "#1f7042", "on-primary-container": "#85b99c", "surface-dim": "#dcdad4", "surface": "#fbf9f3", "outline-variant": "#c0c9c1", "primary-fixed-dim": "#9dd2b5", "secondary-fixed": "#a4f4ba", "secondary-container": "#a1f1b7", "outline": "#717973", "primary": "#003320", "inverse-surface": "#30312d", "on-background": "#1b1c18", "error-container": "#ffdad6", "on-primary-fixed-variant": "#1d5039", "surface-tint": "#366850", "tertiary-fixed-dim": "#84d1f0", "on-surface": "#1b1c18", "surface-container-low": "#f5f3ed", "surface-container-lowest": "#ffffff", "on-secondary": "#ffffff", "surface-container": "#f0eee8", "on-error-container": "#93000a", "on-primary": "#ffffff", "on-tertiary-fixed": "#001f29", "inverse-primary": "#9dd2b5", "primary-fixed": "#b9efd0", "inverse-on-surface": "#f3f1eb", "tertiary-fixed": "#baeaff", "surface-variant": "#e4e2dd", "tertiary-container": "#00475a", "surface-container-highest": "#e4e2dd", "on-tertiary": "#ffffff", "surface-bright": "#fbf9f3" }, "borderRadius": { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" }, "spacing": { "margin": "3rem", "space-xs": "0.25rem", "space-sm": "0.5rem", "gutter": "1.5rem", "margin-mobile": "1rem", "space-xl": "2.5rem", "space-md": "1rem", "gutter-mobile": "1rem", "space-lg": "1.5rem" }, "fontFamily": { "display-lg-mobile": ["Plus Jakarta Sans"], "label-md": ["Plus Jakarta Sans"], "headline-lg": ["Plus Jakarta Sans"], "title-md": ["Plus Jakarta Sans"], "body-lg": ["Plus Jakarta Sans"], "title-lg": ["Plus Jakarta Sans"], "headline-lg-mobile": ["Plus Jakarta Sans"], "display-lg": ["Plus Jakarta Sans"], "body-md": ["Plus Jakarta Sans"], "label-lg": ["Plus Jakarta Sans"], "headline-md": ["Plus Jakarta Sans"], "headline-sm": ["Plus Jakarta Sans"], "body-sm": ["Plus Jakarta Sans"], "label-sm": ["Plus Jakarta Sans"] }, "fontSize": { "display-lg-mobile": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700" }], "label-md": ["12px", { "lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "600" }], "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700" }], "title-md": ["16px", { "lineHeight": "24px", "fontWeight": "600" }], "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }], "title-lg": ["18px", { "lineHeight": "26px", "fontWeight": "600" }], "headline-lg-mobile": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600" }], "display-lg": ["44px", { "lineHeight": "52px", "letterSpacing": "-0.02em", "fontWeight": "700" }], "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }], "label-lg": ["14px", { "lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "600" }], "headline-md": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600" }], "headline-sm": ["20px", { "lineHeight": "28px", "fontWeight": "600" }], "body-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }], "label-sm": ["11px", { "lineHeight": "14px", "letterSpacing": "0.02em", "fontWeight": "500" }] } } } }</script><style>@layer base { body { min-height: 100vh; overscroll-behavior-y: none; } .pb-safe { padding-bottom: env(safe-area-inset-bottom, 0px); } .pt-safe { padding-top: env(safe-area-inset-top, 0px); } main > :first-child { margin-top: 0 !important; } main > :last-child { margin-bottom: 0 !important; } } ::-webkit-scrollbar { display: none; }</style><style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
</head><body class="bg-surface text-on-surface font-body-md text-body-md flex flex-col min-h-screen"><header class="fixed top-0 w-full z-50 pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)] bg-surface"><div class="h-16 px-gutter-mobile flex items-center justify-between gap-space-sm"><div class="flex items-center gap-space-sm min-w-0"><img alt="Brand logo. - Primary color: #164a34
- Font: plusJakartaSans
- Mode: light
- Roundness: rounded-md
" class="h-8 w-auto object-contain flex-shrink-0" src="https://lh3.googleusercontent.com/aida/AEtjO1UwvheEflVQETpVODXud1bKJQLTG3Z9V091WAQuRWb3OjkfynIYN40ImZHKnidhICqNkNrqFqpWKzSfZlgxI5J_M82iY6odlXGtsZTTc8HXdVBAz6ryKsSz-P5wU6ZoKTCO5D247hagw2iNx0PZZfjdthMC8zjpWAGLJh7xg4qo3i9LZdCn7j6gGxugjmJTrMiBN0EKKxLQuSsUMZx2F7LChrzofAoNzJDssH-iE5FNMrlgSgXlD6etBto"><div class="flex flex-col min-w-0"><span class="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold leading-none">KrishiMitra</span><h1 class="font-title-md text-title-md text-on-surface truncate leading-tight">Farm Reports</h1></div></div><div class="flex items-center gap-space-xs flex-shrink-0"><button aria-label="Toggle Marathi or English Language" class="h-9 px-space-sm rounded-full bg-surface-container flex items-center gap-1 text-on-surface-variant hover:text-on-surface"><span class="font-label-sm text-label-sm font-semibold text-primary">मराठी</span><span class="text-outline-variant font-label-sm text-label-sm">/</span><span class="font-label-sm text-label-sm font-semibold text-on-surface-variant">EN</span></button><button aria-label="Notifications" class="w-11 h-11 flex items-center justify-center text-on-surface-variant hover:text-on-surface rounded-full"><span class="material-symbols-outlined text-[22px]">notifications</span></button><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main class="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface px-gutter-mobile"><div class="flex flex-col w-full pb-10">
<!-- Farm Context Hero & Score Strip -->
<section class="w-full mb-space-md">
<div class="rounded-xl p-space-md bg-surface-container-low shadow-sm flex flex-col gap-space-sm relative overflow-hidden">
<!-- Ambient decorative leaf aura -->

<!-- Top Location & Farm Identification -->
<div class="flex items-start justify-between gap-space-sm">
<div class="min-w-0">
<div class="flex items-center gap-1.5 text-secondary">
<span class="material-symbols-outlined text-[16px]">location_on</span>
<span class="font-label-sm text-label-sm uppercase tracking-wider font-semibold">Hingoli, Maharashtra</span>
</div>
<h2 class="font-title-lg text-title-lg text-on-surface truncate mt-0.5">Shivaji Patil Farm</h2>
<p class="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5 mt-0.5">
<span class="">8.5 Acres</span>
<span class="w-1 h-1 rounded-full bg-outline-variant"></span>
<span class="text-tertiary font-medium">Deep Black Cotton Soil (Regur)</span>
</p>
</div>
<!-- Plan Mode Badge -->
<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary text-on-primary font-label-sm text-label-sm shadow-sm flex-shrink-0">
<span class="material-symbols-outlined text-[14px]">tune</span>
          Optimized
        </span>
</div>
<!-- Sowing Target Benchmark -->
<div class="p-space-sm rounded-lg flex items-center justify-between gap-space-sm bg-surface-container-lowest">
<div class="flex items-center gap-2 min-w-0">
<div class="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0">
<span class="material-symbols-outlined text-[18px]">grain</span>
</div>
<div class="min-w-0">
<span class="font-label-sm text-label-sm text-on-surface-variant block leading-tight">Current Target</span>
<p class="font-label-lg text-label-lg text-on-surface font-semibold truncate leading-tight">Drip Precision Wheat</p>
</div>
</div>
<div class="text-right flex-shrink-0">
<span class="font-label-sm text-label-sm text-outline block leading-tight">Baseline</span>
<span class="font-label-sm text-label-sm text-on-surface-variant line-through leading-tight">Furrow Field</span>
</div>
</div>
<!-- Decision Score Banner -->
<div class="pt-space-xs flex items-center justify-between gap-space-sm">
<div class="flex items-baseline gap-1.5">
<span class="font-label-sm text-label-sm text-on-surface-variant">Agronomic Fidelity:</span>
<span class="font-headline-md text-headline-md font-bold text-primary">89</span>
<span class="font-label-md text-label-md text-on-surface-variant">/100</span>
</div>
<div class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
<span class="material-symbols-outlined text-[15px]">trending_up</span>
          +5 potential → 94
        </div>
</div>
</div>
</section>
<!-- Advisory Summary Horizon Strip (3 High-Value Indicators) -->
<section class="w-full mb-space-md">
<div class="grid grid-cols-3 gap-2">
<!-- Stat Card 1 -->
<div class="p-2.5 rounded-xl flex flex-col justify-between shadow-sm bg-error-container">
<div class="flex items-center justify-between mb-1">
<span class="material-symbols-outlined text-error text-[18px]">alarm</span>
<span class="w-2 h-2 rounded-full bg-error animate-ping"></span>
</div>
<span class="font-headline-sm text-headline-sm font-bold text-error leading-tight">2 Items</span>
<span class="font-label-sm text-label-sm text-on-surface-variant leading-tight mt-0.5">Need action by Nov 02</span>
</div>
<!-- Stat Card 2 -->
<div class="p-2.5 rounded-xl bg-surface-container-lowest flex flex-col justify-between shadow-sm">
<span class="material-symbols-outlined text-secondary text-[18px] mb-1">monetization_on</span>
<span class="font-headline-sm text-headline-sm font-bold text-secondary leading-tight">+₹24.8k</span>
<span class="font-label-sm text-label-sm text-on-surface-variant leading-tight mt-0.5">+18.4% value unlock</span>
</div>
<!-- Stat Card 3 -->
<div class="p-2.5 rounded-xl bg-surface-container-lowest flex flex-col justify-between shadow-sm">
<span class="material-symbols-outlined text-tertiary text-[18px] mb-1">water_drop</span>
<span class="font-headline-sm text-headline-sm font-bold text-tertiary leading-tight">+420 m³</span>
<span class="font-label-sm text-label-sm text-on-surface-variant leading-tight mt-0.5">Water buffer reserve</span>
</div>
</div>
</section>
<!-- Filter Horizon Tabs -->
<section class="w-full mb-space-md sticky top-16 z-40 py-1 bg-surface">
<div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1" id="filterTabGroup">
<button class="filter-tab active h-9 px-3.5 rounded-full bg-primary text-on-primary font-label-md text-label-md whitespace-nowrap flex items-center gap-1.5 shadow-sm transition-all duration-200" onclick="filterAdvisories('all', this)">
<span class="">All</span>
<span class="w-4 h-4 rounded-full bg-on-primary/20 text-on-primary text-[10px] flex items-center justify-center font-bold">7</span>
</button>
<button class="filter-tab h-9 px-3.5 rounded-full bg-surface-container text-on-surface-variant font-label-md text-label-md whitespace-nowrap flex items-center gap-1.5 transition-all duration-200" onclick="filterAdvisories('urgent', this)">
<span class="w-2 h-2 rounded-full bg-error"></span>
<span class="">Needs Attention</span>
<span class="font-semibold text-error">2</span>
</button>
<button class="filter-tab h-9 px-3.5 rounded-full bg-surface-container text-on-surface-variant font-label-md text-label-md whitespace-nowrap flex items-center gap-1.5 transition-all duration-200" onclick="filterAdvisories('improve', this)">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
<span class="">Can Improve</span>
<span class="font-semibold text-secondary">3</span>
</button>
<button class="filter-tab h-9 px-3.5 rounded-full bg-surface-container text-on-surface-variant font-label-md text-label-md whitespace-nowrap flex items-center gap-1.5 transition-all duration-200" onclick="filterAdvisories('enabler', this)">
<span class="w-2 h-2 rounded-full bg-tertiary"></span>
<span class="">Enablers</span>
<span class="font-semibold text-tertiary">2</span>
</button>
</div>
</section>
<!-- SECTION 1: Needs Attention (2 Cards) -->
<section class="w-full mb-space-lg advisory-section" data-category="urgent">
<div class="flex items-center justify-between mb-space-sm">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-error text-[20px]">warning</span>
<h3 class="font-title-md text-title-md text-on-surface font-bold">Needs Attention</h3>
</div>
<span class="font-label-sm text-label-sm text-error font-semibold uppercase tracking-wider">2 Pre-Sowing Crits</span>
</div>
<div class="flex flex-col gap-space-sm">
<!-- Card 1: Well #2 Buffer -->
<article class="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-sm relative overflow-hidden">
<!-- Visual left-accent indicator stripe -->
<div class="absolute left-0 top-0 bottom-0 w-1.5 bg-error"></div>
<div class="pl-2">
<!-- Top Urgency Pill & Date -->
<div class="flex items-center justify-between gap-space-xs mb-1">
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
<span class="material-symbols-outlined text-[13px]">emergency</span>
              High Priority · Before Oct 28
            </span>
<span class="font-label-sm text-label-sm font-bold text-error">5 Days Left</span>
</div>
<h4 class="font-title-md text-title-md text-on-surface font-semibold leading-snug">Secondary Well #2 Contingency Buffer</h4>
<div class="mt-2 p-2.5 rounded-lg bg-surface-container-low text-on-surface-variant font-body-sm text-body-sm flex flex-col gap-1.5">
<div class="flex items-start gap-2">
<span class="material-symbols-outlined text-error text-[18px] flex-shrink-0 mt-0.5">report_problem</span>
<p class=""><strong class="text-on-surface">Issue:</strong> Well #2 recharge is 18% below post-monsoon baseline. Risk of 1.8 Q/ac grain pinch if February Purna canal rotation gets delayed.</p>
</div>
<div class="flex items-start gap-2">
<span class="material-symbols-outlined text-secondary text-[18px] flex-shrink-0 mt-0.5">task_alt</span>
<p class=""><strong class="text-on-surface">Agronomic Fix:</strong> Desilt 40m feeder ditch or confirm shared micro-storage agreement with Plot #5 (Pawar Farm).</p>
</div>
</div>
<!-- Impact Metrics -->
<div class="mt-2.5 flex items-center justify-between text-on-surface-variant">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-secondary text-[18px]">verified</span>
<span class="font-label-sm text-label-sm text-on-surface font-medium">Secures ₹16,200 crop value</span>
</div>
<span class="font-label-sm text-label-sm font-semibold text-tertiary">420 m³ reserve buffer</span>
</div>
<!-- Actions -->
<div class="mt-space-sm pt-2 flex flex-col sm:flex-row gap-2">
<button class="h-11 px-space-md rounded-xl bg-primary text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-sm" onclick="handlePlanAction('Well #2 buffer synced to Wheat schedule', this)">
<span class="material-symbols-outlined text-[18px]">add_task</span>
              Apply to Active Plan
            </button>
<button class="h-11 px-space-md rounded-xl bg-surface-container text-on-surface-variant hover:text-on-surface font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-transform" onclick="handlePlanAction('Pawar Farm contact alert opened', this)">
<span class="material-symbols-outlined text-[18px]">handshake</span>
              Coordinate Plot #5
            </button>
</div>
</div>
</article>
<!-- Card 2: Seed Sourcing & Bio-Fungicide -->
<article class="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-sm relative overflow-hidden">
<div class="absolute left-0 top-0 bottom-0 w-1.5 bg-error"></div>
<div class="pl-2">
<div class="flex items-center justify-between gap-space-xs mb-1">
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
<span class="material-symbols-outlined text-[13px]">schedule</span>
              Time-Sensitive · Before Oct 29
            </span>
<span class="font-label-sm text-label-sm font-bold text-error">6 Days Left</span>
</div>
<h4 class="font-title-md text-title-md text-on-surface font-semibold leading-snug">Pre-Order Certified Sonalika HD-2967 &amp; Bio-Treatment</h4>
<div class="mt-2 p-2.5 rounded-lg bg-surface-container-low text-on-surface-variant font-body-sm text-body-sm flex flex-col gap-1.5">
<div class="flex items-start gap-2">
<span class="material-symbols-outlined text-error text-[18px] flex-shrink-0 mt-0.5">inventory_2</span>
<p class=""><strong class="text-on-surface">Issue:</strong> APMC Hingoli certified seed lots down to last 15%. Untreated farm seed carries 22% loose smut and foot rot vulnerability.</p>
</div>
<div class="flex items-start gap-2">
<span class="material-symbols-outlined text-secondary text-[18px] flex-shrink-0 mt-0.5">science</span>
<p class=""><strong class="text-on-surface">Agronomic Fix:</strong> Procure 340 kg seed from Krishi Kendra &amp; dry-coat with <em>Trichoderma viride</em> (5g/kg) + Azotobacter prior to sowing.</p>
</div>
</div>
<div class="mt-2.5 flex items-center justify-between text-on-surface-variant">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-secondary text-[18px]">verified</span>
<span class="font-label-sm text-label-sm text-on-surface font-medium">94% germination rate</span>
</div>
<span class="font-label-sm text-label-sm font-semibold text-secondary">₹14,200 loss prevention</span>
</div>
<!-- Actions -->
<div class="mt-space-sm pt-2 flex flex-col sm:flex-row gap-2">
<button class="h-11 px-space-md rounded-xl bg-primary text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-sm" onclick="handlePlanAction('Seed procurement timeline locked', this)">
<span class="material-symbols-outlined text-[18px]">check_circle</span>
              Apply to Active Plan
            </button>
<button class="h-11 px-space-md rounded-xl bg-surface-container text-on-surface-variant hover:text-on-surface font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-transform" onclick="handlePlanAction('Opening Hingoli Kendra Dealer directory', this)">
<span class="material-symbols-outlined text-[18px]">storefront</span>
              Locate Kendra Dealer
            </button>
</div>
</div>
</article>
</div>
</section>
<!-- SECTION 2: Can Improve (3 Optimizations) -->
<section class="w-full mb-space-lg advisory-section" data-category="improve">
<div class="flex items-center justify-between mb-space-sm">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary text-[20px]">psychology</span>
<h3 class="font-title-md text-title-md text-on-surface font-bold">Can Improve (Crop Economics)</h3>
</div>
<span class="font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider">3 Upgrades</span>
</div>
<div class="flex flex-col gap-space-sm">
<!-- Optimization 1: Fertigation -->
<article class="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs relative overflow-hidden">
<div class="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary"></div>
<div class="pl-2">
<div class="flex items-center justify-between gap-space-xs">
<span class="font-label-sm text-label-sm text-secondary font-semibold">Nutrient Timing Upgrade</span>
<span class="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">+₹11,200 Margin</span>
</div>
<h4 class="font-title-md text-title-md text-on-surface font-semibold mt-1">Split Fertigation via Venturi Drip (19:19:19 &amp; Bio-NPK)</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Replace single-shot broadcast with 4-stage soluble fertigation tied directly to root flushes. Eliminates 35% synthetic chemical leaching in clay soil.
          </p>
<div class="mt-2 flex items-center gap-3 text-on-surface-variant font-label-sm text-label-sm">
<span class="flex items-center gap-1">
<span class="material-symbols-outlined text-secondary text-[16px]">eco</span>
              -35% chemical load
            </span>
<span class="flex items-center gap-1">
<span class="material-symbols-outlined text-primary text-[16px]">speed</span>
              Higher uptake in 8.5 Ac
            </span>
</div>
<div class="mt-3 pt-2">
<button class="w-full h-11 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md font-semibold flex items-center justify-center gap-2 active:scale-98 transition-all" onclick="handlePlanAction('Split fertigation mapped into plan', this)">
<span class="material-symbols-outlined text-secondary text-[18px]">swap_calls</span>
              Use in Plan
            </button>
</div>
</div>
</article>
<!-- Optimization 2: Sowing Window Shift -->
<article class="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs relative overflow-hidden">
<div class="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary"></div>
<div class="pl-2">
<div class="flex items-center justify-between gap-space-xs">
<span class="font-label-sm text-label-sm text-secondary font-semibold">Heat Stress Mitigation</span>
<span class="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">+2.1 Q/Ac Yield</span>
</div>
<h4 class="font-title-md text-title-md text-on-surface font-semibold mt-1">Shift Sowing Target to Nov 02 (Dodge Late-Season Heat)</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Planting by Nov 02 ensures grain-filling occurs before Marathwada February temperatures breach 34°C, preventing early shriveling.
          </p>
<div class="mt-2 flex items-center gap-3 text-on-surface-variant font-label-sm text-label-sm">
<span class="flex items-center gap-1">
<span class="material-symbols-outlined text-tertiary text-[16px]">thermostat</span>
              Avoids terminal heat stress
            </span>
<span class="flex items-center gap-1">
<span class="material-symbols-outlined text-secondary text-[16px]">calendar_today</span>
              16 days extra vegetative buffer
            </span>
</div>
<div class="mt-3 pt-2">
<button class="w-full h-11 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md font-semibold flex items-center justify-center gap-2 active:scale-98 transition-all" onclick="handlePlanAction('Sowing date shifted to Nov 02', this)">
<span class="material-symbols-outlined text-secondary text-[18px]">calendar_month</span>
              Lock Nov 02 Window
            </button>
</div>
</div>
</article>
<!-- Optimization 3: BBF Bed Configuration -->
<article class="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs relative overflow-hidden">
<div class="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary"></div>
<div class="pl-2">
<div class="flex items-center justify-between gap-space-xs">
<span class="font-label-sm text-label-sm text-secondary font-semibold">Soil Physics</span>
<span class="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold">+8% Aeration</span>
</div>
<h4 class="font-title-md text-title-md text-on-surface font-semibold mt-1">Broad Bed &amp; Furrow (BBF) + Lateral Placement</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Heavy Hingoli black cotton soil tends to compact. 120cm broad beds improve root aeration and prevent crown rot during heavy unseasonal dew spells.
          </p>
<div class="mt-3 pt-2">
<button class="w-full h-11 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md font-semibold flex items-center justify-center gap-2 active:scale-98 transition-all" onclick="handlePlanAction('BBF bed geometry integrated', this)">
<span class="material-symbols-outlined text-secondary text-[18px]">layers</span>
              Adopt BBF Geometry
            </button>
</div>
</div>
</article>
</div>
</section>
<!-- SECTION 3: Phenological Stage & Irrigation Pulse Horizon -->
<section class="w-full mb-space-lg">
<div class="flex items-center justify-between mb-space-sm">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-[20px]">timeline</span>
<h3 class="font-title-md text-title-md text-on-surface font-bold">Phenology &amp; Pulse Roadmap</h3>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant">Nov – Feb</span>
</div>
<!-- Scrollable Lifecycle Timeline -->
<div class="p-space-md rounded-xl bg-surface-container-lowest shadow-sm overflow-hidden">
<div class="overflow-x-auto no-scrollbar pb-2">
<div class="flex items-center min-w-[540px] relative pt-2">
<!-- Continuous Connection Line -->
<div class="absolute top-5 left-4 right-4 h-0.5 bg-surface-container-highest z-0"></div>
<!-- Milestone 1 -->
<div class="flex flex-col items-center flex-1 relative z-10">
<div class="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm font-bold shadow-sm ring-4 ring-surface-container-lowest">
              1
            </div>
<span class="font-label-md text-label-md font-bold text-on-surface mt-2">Sowing</span>
<span class="font-label-sm text-label-sm text-secondary font-medium">Nov 02</span>
<span class="font-label-sm text-label-sm text-on-surface-variant mt-0.5 text-center">Light Drip</span>
</div>
<!-- Milestone 2 (CRI) -->
<div class="flex flex-col items-center flex-1 relative z-10">
<div class="w-7 h-7 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-label-sm text-label-sm font-bold shadow-sm ring-4 ring-surface-container-lowest">
              2
            </div>
<span class="font-label-md text-label-md font-bold text-on-surface mt-2">CRI Stage</span>
<span class="font-label-sm text-label-sm text-error font-semibold">Nov 23</span>
<span class="font-label-sm text-label-sm text-error mt-0.5 text-center">Critical Pulse</span>
</div>
<!-- Milestone 3 -->
<div class="flex flex-col items-center flex-1 relative z-10">
<div class="w-7 h-7 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-label-sm text-label-sm font-bold ring-4 ring-surface-container-lowest">
              3
            </div>
<span class="font-label-md text-label-md font-medium text-on-surface mt-2">Tillering</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">Dec 15</span>
<span class="font-label-sm text-label-sm text-on-surface-variant mt-0.5 text-center">19:19:19 Split</span>
</div>
<!-- Milestone 4 -->
<div class="flex flex-col items-center flex-1 relative z-10">
<div class="w-7 h-7 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-label-sm text-label-sm font-bold ring-4 ring-surface-container-lowest">
              4
            </div>
<span class="font-label-md text-label-md font-medium text-on-surface mt-2">Booting</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">Jan 10</span>
<span class="font-label-sm text-label-sm text-on-surface-variant mt-0.5 text-center">Moisture Guard</span>
</div>
<!-- Milestone 5 -->
<div class="flex flex-col items-center flex-1 relative z-10">
<div class="w-7 h-7 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-label-sm text-label-sm font-bold ring-4 ring-surface-container-lowest">
              5
            </div>
<span class="font-label-md text-label-md font-medium text-on-surface mt-2">Flowering</span>
<span class="font-label-sm text-label-sm text-tertiary">Jan 28</span>
<span class="font-label-sm text-label-sm text-tertiary mt-0.5 text-center">Heat Shield</span>
</div>
<!-- Milestone 6 -->
<div class="flex flex-col items-center flex-1 relative z-10">
<div class="w-7 h-7 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-label-sm text-label-sm font-bold ring-4 ring-surface-container-lowest">
              6
            </div>
<span class="font-label-md text-label-md font-medium text-on-surface mt-2">Harvest</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">Feb 24</span>
<span class="font-label-sm text-label-sm text-on-surface-variant mt-0.5 text-center">Full Dry</span>
</div>
</div>
</div>
<p class="font-label-sm text-label-sm text-on-surface-variant mt-2 text-center flex items-center justify-center gap-1">
<span class="material-symbols-outlined text-[14px] text-secondary">verified_user</span>
        Synchronized with Hingoli agro-climatic historical heat models
      </p>
</div>
</section>
<!-- SECTION 4: Helpful Advice & Institutional Enablers (2 Cards) -->
<section class="w-full mb-space-lg advisory-section" data-category="enabler">
<div class="flex items-center justify-between mb-space-sm">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-tertiary text-[20px]">account_balance</span>
<h3 class="font-title-md text-title-md text-on-surface font-bold">Subsidies &amp; Extension Support</h3>
</div>
<span class="font-label-sm text-label-sm text-tertiary font-semibold uppercase tracking-wider">2 Institutional</span>
</div>
<div class="flex flex-col gap-space-sm">
<!-- Enabler 1: MahaDBT Subsidy -->
<article class="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs relative overflow-hidden">
<div class="absolute left-0 top-0 bottom-0 w-1.5 bg-tertiary"></div>
<div class="pl-2">
<div class="flex items-center justify-between gap-space-xs">
<span class="inline-flex items-center gap-1 font-label-sm text-label-sm text-tertiary font-semibold">
<span class="material-symbols-outlined text-[15px]">badge</span>
              MahaDBT Micro-Irrigation (PMKSY)
            </span>
<span class="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">7/12 Ready</span>
</div>
<h4 class="font-title-md text-title-md text-on-surface font-semibold mt-1">Pre-filled Drip Component Dossier (₹38,500 Direct Subsidy)</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Eligible under Hingoli Small &amp; Marginal Farmer cluster quota. Includes lateral bill estimates, GPS land map, and quotation from empanelled Jain / Netafim dealers.
          </p>
<div class="mt-3 pt-1">
<button class="w-full h-11 rounded-xl bg-tertiary text-on-tertiary hover:bg-tertiary-container font-label-md text-label-md font-semibold flex items-center justify-center gap-2 active:scale-98 transition-all shadow-sm" onclick="handlePlanAction('Downloading pre-filled MahaDBT Dossier', this)">
<span class="material-symbols-outlined text-[18px]">download</span>
              Download Subsidy Dossier (PDF)
            </button>
</div>
</div>
</article>
<!-- Enabler 2: Hingoli KVK Advisory -->
<article class="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs relative overflow-hidden">
<div class="absolute left-0 top-0 bottom-0 w-1.5 bg-tertiary"></div>
<div class="pl-2">
<div class="flex items-center justify-between gap-space-xs">
<span class="inline-flex items-center gap-1 font-label-sm text-label-sm text-tertiary font-semibold">
<span class="material-symbols-outlined text-[15px]">podcasts</span>
              Hingoli Krishi Vigyan Kendra (KVK)
            </span>
<span class="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-medium">Weekly SMS</span>
</div>
<h4 class="font-title-md text-title-md text-on-surface font-semibold mt-1">Pest Surveillance &amp; Rust Spore Early Warning</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Direct agronomy alerts sent via WhatsApp &amp; SMS from KVK Hingoli agronomists, flagging localized yellow rust outbreaks and aphid spore trap counts.
          </p>
<div class="mt-3 pt-1">
<button class="w-full h-11 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md font-semibold flex items-center justify-center gap-2 active:scale-98 transition-all" onclick="handlePlanAction('KVK SMS &amp; WhatsApp advisories activated', this)">
<span class="material-symbols-outlined text-secondary text-[18px]">notifications_active</span>
              Opt into Local KVK Alerts
            </button>
</div>
</div>
</article>
</div>
</section>
<!-- Sticky Decision Bar / Confirmation Tray -->
<section class="w-full mt-space-sm mb-space-sm">
<div class="p-space-md rounded-xl bg-primary-container text-on-primary-container shadow-md flex flex-col gap-space-sm">
<div class="flex items-center justify-between">
<div>
<span class="font-label-sm text-label-sm text-on-primary-container/80 uppercase font-semibold">Bulk Plan Sync</span>
<p class="font-title-md text-title-md text-on-primary font-bold">Apply All 5 Technical Upgrades</p>
</div>
<div class="text-right">
<span class="font-headline-sm text-headline-sm font-bold text-primary-fixed">+₹24,800</span>
<span class="block font-label-sm text-label-sm text-on-primary-container/70">Total Uplift</span>
</div>
</div>
<div class="flex flex-col sm:flex-row gap-2 mt-1">
<button class="h-12 w-full rounded-xl bg-primary-fixed text-on-primary-fixed font-title-md text-title-md font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-md" id="applyAllBtn" onclick="applyAllRecommendations(this)">
<span class="material-symbols-outlined text-[20px]">auto_fix_high</span>
          Apply All Recommended Edits
        </button>
<button class="h-11 w-full rounded-xl bg-on-primary-container/10 text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all" onclick="handlePlanAction('Customizing recommendation checklist', this)">
<span class="material-symbols-outlined text-[18px]">tune</span>
          Customize Selection
        </button>
</div>
<!-- Trust & Autonomy Seal -->
<div class="pt-2 border-none flex items-start gap-2 text-on-primary-container/80 font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[16px] text-primary-fixed flex-shrink-0 mt-0.5">verified_user</span>
<p class="">100% Objective &amp; Commission-Free. Backed by ICAR protocols and Hingoli KVK soil health record #HK-2023-882.</p>
</div>
</div>
</section>
<!-- Interactive Feedback Toast (Hidden by default) -->
<div class="fixed bottom-20 left-4 right-4 z-50 transform translate-y-32 transition-transform duration-300 pointer-events-none" id="toastNotification">
<div class="p-3.5 rounded-xl bg-primary text-on-primary shadow-xl flex items-center justify-between gap-3">
<div class="flex items-center gap-2.5 min-w-0">
<span class="material-symbols-outlined text-primary-fixed text-[20px] flex-shrink-0">check_circle</span>
<span class="font-body-sm text-body-sm text-on-primary truncate font-medium" id="toastMessage">Recommendation updated</span>
</div>
<button class="pointer-events-auto text-on-primary/70 hover:text-on-primary" onclick="dismissToast()">
<span class="material-symbols-outlined text-[18px]">close</span>
</button>
</div>
</div>
</div>
<script>
  // Filter Advisory Cards
  function filterAdvisories(category, clickedButton) {
    // Update active tab style
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(tab => {
      tab.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
      tab.classList.add('bg-surface-container', 'text-on-surface-variant');
    });

    clickedButton.classList.remove('bg-surface-container', 'text-on-surface-variant');
    clickedButton.classList.add('bg-primary', 'text-on-primary', 'shadow-sm');

    // Show/hide sections
    const sections = document.querySelectorAll('.advisory-section');
    sections.forEach(section => {
      if (category === 'all' || section.getAttribute('data-category') === category) {
        section.classList.remove('hidden');
      } else {
        section.classList.add('hidden');
      }
    });
  }

  // Interactive Toast trigger
  let toastTimer;
  function handlePlanAction(msg, btnElement) {
    // Micro tactile bounce
    if (btnElement) {
      btnElement.classList.add('scale-95');
      setTimeout(() => btnElement.classList.remove('scale-95'), 150);
    }

    const toast = document.getElementById('toastNotification');
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.textContent = msg;

    toast.classList.remove('translate-y-32');
    toast.classList.add('translate-y-0');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      dismissToast();
    }, 3200);
  }

  function dismissToast() {
    const toast = document.getElementById('toastNotification');
    toast.classList.remove('translate-y-0');
    toast.classList.add('translate-y-32');
  }

  // Bulk Apply All Action
  function applyAllRecommendations(btn) {
    btn.innerHTML = '<span class="material-symbols-outlined text-[20px] animate-spin">sync</span> Updating Plan & Schedule...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = '<span class="material-symbols-outlined text-[20px]">done_all</span> All 5 Upgrades Applied!';
      btn.classList.remove('bg-primary-fixed');
      btn.classList.add('bg-secondary-container', 'text-on-secondary-container');
      handlePlanAction('Wheat Plan calibrated: Score upgraded to 94/100', null);
    }, 900);
  }
</script></main><nav class="fixed bottom-0 w-full z-50 pb-safe shadow-[0_-2px_12px_rgba(22,74,52,0.05)] bg-surface" data-active-classes="text-primary font-semibold"><div class="h-16 px-space-xs flex items-center justify-around"><a class="flex flex-col items-center justify-center flex-1 h-full py-1 text-on-surface-variant hover:text-on-surface" data-path="dashboard" href="#"><span class="material-symbols-outlined text-[24px]">grid_view</span><span class="font-label-sm text-label-sm mt-0.5">Dashboard</span></a><a class="flex flex-col items-center justify-center flex-1 h-full py-1 text-on-surface-variant hover:text-on-surface" data-path="crop-plans" href="#"><span class="material-symbols-outlined text-[24px]">calendar_month</span><span class="font-label-sm text-label-sm mt-0.5">Plans</span></a><a class="flex flex-col items-center justify-center flex-1 h-full py-1 text-on-surface-variant hover:text-on-surface" data-path="compare-crops" href="#"><span class="material-symbols-outlined text-[24px]">compare_arrows</span><span class="font-label-sm text-label-sm mt-0.5">Compare</span></a><a class="flex flex-col items-center justify-center flex-1 h-full py-1 text-on-surface-variant hover:text-on-surface" data-path="agronomy-advisory" href="#"><span class="material-symbols-outlined text-[24px]">psychology_alt</span><span class="font-label-sm text-label-sm mt-0.5">Advisory</span></a><a class="flex flex-col items-center justify-center flex-1 h-full py-1 text-on-surface-variant hover:text-on-surface" data-path="farm-reports" href="#"><span class="material-symbols-outlined text-[24px]">analytics</span><span class="font-label-sm text-label-sm mt-0.5">Reports</span></a></div></nav>

</body></html>
```
