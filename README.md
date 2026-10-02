# PRARAMBHA 2.0 (KrishiMitra) — Agri Scenario & Decision Simulator
> **Tagline:** *Test the season before you sow it.* / *पेरणीपूर्वी हंगामाची पडताळणी करा.*

An explainable, transparent, and deterministic agricultural decision-support web platform that empowers farmers, extension workers, and FPOs to simulate, compare, and stress-test agricultural scenarios before committing land, water, inputs, and capital.

---

## 📖 User Manuals (वापरकर्ता पुस्तिका)

Comprehensive step-by-step documentation is available in both English and Marathi:

- 🇬🇧 **[English User Manual (USER_MANUAL_EN.md)](USER_MANUAL_EN.md)** / [`prarambha/docs/USER_MANUAL_EN.md`](prarambha/docs/USER_MANUAL_EN.md)
  - Complete walkthrough of farm profiles, scenario builder, simulation engine, multi-scenario comparisons (2–4), "Why Did It Change?" causal attribution, rule-based recommendations, resource readiness audits, and printable reports.
- 🇮🇳 **[मराठी वापरकर्ता पुस्तिका (USER_MANUAL_MR.md)](USER_MANUAL_MR.md)** / [`prarambha/docs/USER_MANUAL_MR.md`](prarambha/docs/USER_MANUAL_MR.md)
  - शेतकरी बांधवांसाठी संपूर्ण मार्गदर्शक: शेत निवड, पीक व सिंचन नियोजन, हवामान अंदाज, नफा-तोटा व जोखीम विश्लेषण, तुलनात्मक तक्ते आणि साधनांची सज्जता तपासणी.

---

## 🚀 Quickstart & Evaluation Guide

### Prerequisites
- Node.js 18+ (tested on Node.js 18, 20, 22)
- Modern Web Browser (Chrome, Edge, Firefox, Safari)

### 1. Backend Setup
```bash
cd prarambha/backend
npm install
npm run dev
```
Backend API will be running on `http://localhost:3001` (Health check: `http://localhost:3001/health`).

### 2. Frontend Setup
```bash
cd prarambha/frontend
npm install
npm run dev
```
Frontend Web App will be running on `http://localhost:5173`.

---

## 🧪 Automated Test & Verification Suite (For Judges)

The platform is backed by comprehensive automated test suites covering simulation mechanics, security posture, and authentication:

| Test Suite | Command | Coverage | Status |
| :--- | :--- | :--- | :--- |
| **Security Regression Tests** | `cd prarambha/backend && npm test` | CSP, HSTS, X-Frame-Options, SQL leak prevention, Express fingerprint stripping, tenant isolation | ✅ **18/18 Passed** |
| **Backend Unit & Integration Tests** | `cd prarambha/backend && npm run test:vitest` | Simulation engines, service role security, tenant isolation, auth endpoints | ✅ **98/98 Passed** |
| **Frontend Shell & Smoke Tests** | `cd prarambha/frontend && npm test` | Component rendering, router navigation, unit labels | ✅ **7/7 Passed** |
| **Production Build Validation** | `cd prarambha/frontend && npm run build` | Vite asset compilation, chunk optimization, bundle health | ✅ **Clean Build (0 errors)** |

---

## 🌾 Core Features

- **Farm Profile Management**: Manage multiple farms, land area, soil characteristics, and irrigation infrastructure.
- **Scenario Simulator**: Real-time deterministic yield range, profit, ROI, water productivity, and composite risk scoring.
- **Multi-Scenario Comparison**: Side-by-side analysis of 2 to 4 agricultural scenarios with comparative bar and risk charts.
- **"Why Did It Change?" Panel**: Transparent factor attribution separating controllable farmer decisions from external environmental variables.
- **Traceable Recommendations**: Rule-based agronomic guidance triggered by stress thresholds.
- **Resource Readiness Audit**: Check availability and identify shortages for seeds, fertilizers, water, and capital.
- **Assumption Transparency**: Full visibility into underlying coefficients, crop prices, and model versions (`v2.0-deterministic`).
- **Printable Summary Report**: Clean, printer-friendly scenario dossiers for bank loans and extension advisory.

---

## 🛡️ Authentication & Security Architecture

1. **Automated One-Click Email Activation**:
   - Registration dispatches an authenticated activation link directly to the farmer's inbox via Supabase.
   - Built with **real-time session auto-detection**: once the user clicks "Sign In" in their email, the app automatically authenticates the user, preserves their chosen password and profile, and launches the simulator without requiring manual code entry.
   - Cross-tab broadcast synchronization ensures instant authentication whether the email link opens in the same tab or a new window.

2. **Zero Credential & Code Exposure**:
   - No sensitive verification codes or tokens are rendered in responses or exposed in client bundles.
   - Strict rate limiting protects endpoints against brute force attempts.

3. **Multi-Tenant Tenant Isolation**:
   - Each authenticated farmer has strict tenant boundaries enforced through Supabase Row-Level Security (RLS) and verified by automated regression test suites.

---

> **Important Agricultural Disclaimer:**  
> KrishiMitra provides decision support and predictive estimates, not guaranteed outcomes. Farming yields and economic returns are influenced by real-world biological, climatic, and market dynamics.
