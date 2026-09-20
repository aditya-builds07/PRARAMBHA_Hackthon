PRARAMBHA 2.0

UPDATED PROFESSIONAL SYSTEM ARCHITECTURE

Matched against the new Optimized, IDE-Agnostic PRD

Agri Scenario & Decision Simulator • 24-hour MVP

1. Architecture Review — What Changed From the Previous Architecture

The new PRD expands the previous architecture from a simple simulator stack into a clearer decision-support platform. The architecture below incorporates those changes while keeping the simulator as the product identity. Source: supplied optimized PRD. fileciteturn7file0

2. New Professional High-Level Architecture


                                  ┌───────────────────────────┐
                                  │       FARMER / USER       │
                                  │   Desktop / Mobile Web    │
                                  └─────────────┬─────────────┘
                                                │
                                                ▼
╔══════════════════════════════════════════════════════════════════════════════╗
║                         PRESENTATION / UX LAYER                             ║
║                                                                            ║
║  React + Vite                                                              ║
║                                                                            ║
║  Entry │ Farm Selection │ Scenario Builder │ Results │ Compare 2–4         ║
║  Why │ Recommendations │ Resource & Cost │ Assumptions │ History │ Report ║
║                                                                            ║
║  Tailwind CSS │ shadcn/ui │ Recharts │ i18n │ Responsive / Accessible     ║
╚══════════════════════════════════════╤═════════════════════════════════════╝
                                       │ HTTPS / REST JSON
                                       ▼
╔══════════════════════════════════════════════════════════════════════════════╗
║                             API / APPLICATION LAYER                          ║
║                                                                            ║
║ Node.js + Express                                                         ║
║                                                                            ║
║ Farm API │ Scenario API │ Simulation API │ Comparison API                  ║
║ Weather API │ Recommendation API │ Resource API │ Assumption API           ║
║ Soil Report API │ Report API │ History/Audit API                           ║
╚══════════════════════════════════════╤═════════════════════════════════════╝
                                       │
                                       ▼
╔══════════════════════════════════════════════════════════════════════════════╗
║                         DOMAIN / BUSINESS LAYER                             ║
║                                                                            ║
║  ┌──────────────────────────── CORE SIMULATION ──────────────────────────┐ ║
║  │ Water │ Yield │ Financial │ Risk │ Decision Score                    │ ║
║  └──────────────────────────────────┬────────────────────────────────────┘ ║
║                                     ▼                                      ║
║  Scenario Comparison │ Why / Attribution │ Recommendation Rules           ║
║  Resource Readiness │ Assumptions │ Model Versioning │ Validation          ║
╚══════════════════════════════════════╤═════════════════════════════════════╝
                                       │
                    ┌──────────────────┼────────────────────┐
                    ▼                  ▼                    ▼
╔═══════════════════════╗  ╔═══════════════════════╗  ╔═══════════════════════╗
║ DATA / PERSISTENCE    ║  ║ EXTERNAL ADAPTERS     ║  ║ OPTIONAL INTELLIGENCE ║
║                       ║  ║                       ║  ║                       ║
║ Supabase              ║  ║ Open-Meteo            ║  ║ AI Explanation        ║
║ PostgreSQL            ║  ║ Google Maps            ║  ║ Soil OCR              ║
║ Auth + RLS            ║  ║ Future market data    ║  ║ Lab Summary           ║
║ Storage               ║  ║                       ║  ║ Suitability           ║
╚═══════════════════════╝  ╚═══════════════════════╝  ╚═══════════════════════╝

3. Product Flow Architecture


FARM
 │
 ├── Area / Location / Water / Budget / Soil
 │
 ▼
CONTEXT
 │
 ├── Weather / Forecast
 ├── Crop parameters
 ├── Optional verified soil values
 └── Assumptions + model version
 │
 ▼
SCENARIO BUILDER
 │
 ├── Crop
 ├── Area
 ├── Sowing date / delay
 ├── Water availability
 ├── Weather condition
 ├── Input cost
 ├── Irrigation
 └── Priority profile
 │
 ▼
SIMULATION ENGINE
 │
 ├── Water Engine
 ├── Yield Engine
 ├── Financial Engine
 ├── Risk Engine
 └── Decision Engine
 │
 ▼
RESULTS
 │
 ├── Yield + uncertainty
 ├── Cost / Revenue / Profit / ROI
 ├── Water + productivity
 ├── Risk
 └── Decision Score
 │
 ▼
COMPARE 2–4 SCENARIOS
 │
 ▼
WHY?
 │
 ├── Changed factors
 ├── Factor attribution
 ├── Controllable vs external
 │
 ▼
RECOMMENDATIONS
 │
 └── Trigger → Condition → Impact → Action → Reason
 │
 ▼
RESOURCE & COST CHECK
 │
 ├── Required
 ├── Available
 ├── Gap
 └── Available / Shortage / Critical
 │
 ▼
SAVE / HISTORY / REPORT / AUDIT

4. UPDATED DIRECTORY STRUCTURE

prarambha/

│

├── README.md

├── PRD.md

├── package.json

├── .env.example

├── .gitignore

│

├── frontend/

│   ├── src/

│   │   ├── components/

│   │   │   ├── common/

│   │   │   ├── dashboard/

│   │   │   ├── farm/

│   │   │   ├── scenario/

│   │   │   ├── results/

│   │   │   ├── comparison/

│   │   │   ├── why/

│   │   │   ├── recommendations/

│   │   │   ├── resources/

│   │   │   ├── assumptions/

│   │   │   ├── history/

│   │   │   └── report/

│   │   │

│   │   ├── pages/

│   │   │   ├── Entry/

│   │   │   ├── FarmSelection/

│   │   │   ├── ScenarioBuilder/

│   │   │   ├── ScenarioResults/

│   │   │   ├── ScenarioComparison/

│   │   │   ├── Why/

│   │   │   ├── Recommendations/

│   │   │   ├── ResourceCheck/

│   │   │   ├── Assumptions/

│   │   │   ├── History/

│   │   │   └── Report/

│   │   │

│   │   ├── services/

│   │   │   ├── api.js

│   │   │   ├── farm.service.js

│   │   │   ├── scenario.service.js

│   │   │   ├── simulation.service.js

│   │   │   ├── comparison.service.js

│   │   │   ├── weather.service.js

│   │   │   └── report.service.js

│   │   │

│   │   ├── state/

│   │   ├── hooks/

│   │   ├── utils/

│   │   ├── i18n/

│   │   ├── styles/

│   │   ├── assets/

│   │   └── main.jsx

│   │

│   └── tests/

│

├── backend/

│   ├── src/

│   │   ├── routes/

│   │   │   ├── farms.routes.js

│   │   │   ├── crops.routes.js

│   │   │   ├── scenarios.routes.js

│   │   │   ├── simulate.routes.js

│   │   │   ├── compare.routes.js

│   │   │   ├── weather.routes.js

│   │   │   ├── recommendations.routes.js

│   │   │   ├── resources.routes.js

│   │   │   ├── assumptions.routes.js

│   │   │   ├── soil.routes.js

│   │   │   ├── reports.routes.js

│   │   │   └── audit.routes.js

│   │   │

│   │   ├── controllers/

│   │   ├── services/

│   │   │   ├── farm.service.js

│   │   │   ├── scenario.service.js

│   │   │   ├── comparison.service.js

│   │   │   ├── recommendation.service.js

│   │   │   ├── resource.service.js

│   │   │   ├── assumption.service.js

│   │   │   ├── audit.service.js

│   │   │   └── report.service.js

│   │   │

│   │   ├── simulation/

│   │   │   ├── simulation.engine.js

│   │   │   ├── water.engine.js

│   │   │   ├── yield.engine.js

│   │   │   ├── financial.engine.js

│   │   │   ├── risk.engine.js

│   │   │   ├── decision.engine.js

│   │   │   ├── attribution.engine.js

│   │   │   └── model.version.js

│   │   │

│   │   ├── adapters/

│   │   │   ├── weather/

│   │   │   │   └── openMeteo.adapter.js

│   │   │   ├── maps/

│   │   │   │   └── googleMaps.adapter.js

│   │   │   ├── ai/

│   │   │   │   ├── openai.adapter.js

│   │   │   │   └── gemini.adapter.js

│   │   │   └── ocr/

│   │   │       └── tesseract.adapter.js

│   │   │

│   │   ├── validators/

│   │   ├── middleware/

│   │   └── app.js

│   │

│   └── tests/

│

├── database/

│   ├── schema/

│   │   ├── profiles.sql

│   │   ├── farms.sql

│   │   ├── crop_params.sql

│   │   ├── scenarios.sql

│   │   ├── simulation_results.sql

│   │   ├── assumptions.sql

│   │   ├── resources.sql

│   │   ├── weather_snapshots.sql

│   │   ├── soil_reports.sql

│   │   └── audit_logs.sql

│   │

│   ├── migrations/

│   └── seed/

│       └── crop_params.sql

│

├── docs/

│   ├── architecture/

│   ├── API.md

│   ├── SIMULATION.md

│   ├── DATABASE.md

│   ├── DEMO.md

│   └── ASSUMPTIONS.md

│

└── tests/

    ├── simulation/

    ├── api/

    └── e2e/

5. Frontend Architecture

Entry/Farm Selection: choose or create the active farm and crop cycle.

Scenario Builder: normalized scenario state; clone baseline; presets; live recalculation.

Results: estimated yield range, economics, water, risk and decision score.

Comparison: 2–4 scenarios, common metric table, cost/revenue/profit chart, risk chart.

Why: changed factors, attribution, controllable vs external classification.

Recommendations: trigger, condition, impact, action and reason.

Resource Check: required vs available resources and gap.

Assumptions: formulas, weights, coefficients, source and model version.

History/Report: saved scenarios, timestamps and concise reports.

Localization: English/Marathi/Hindi strings externalized; language does not affect calculations.

6. Backend / Domain Architecture


HTTP Request
   ↓
Route
   ↓
Auth + Validation
   ↓
Controller
   ↓
Domain Service
   ├── Scenario Service
   ├── Simulation Service
   ├── Comparison Service
   ├── Recommendation Service
   ├── Resource Service
   ├── Report Service
   └── Audit Service
   ↓
Deterministic Simulation Engine
   ├── Water
   ├── Yield
   ├── Financial
   ├── Risk
   ├── Decision
   └── Attribution
   ↓
Persistence / External Adapters

7. Simulation Engine Contract


Input
 ├── farmId
 ├── crop
 ├── areaAcres
 ├── sowingDate
 ├── waterAvailabilityPercent
 ├── availableWaterM3
 ├── weather
 ├── planting.type
 ├── planting.delayDays
 ├── inputCostMultiplier
 ├── irrigation
 └── priorityProfile

Engine
 ├── Water factor
 ├── Weather factor
 ├── Planting factor
 ├── Yield
 ├── Cost
 ├── Revenue
 ├── Profit
 ├── ROI
 ├── Water drawn
 ├── Water productivity
 ├── Risk
 ├── Uncertainty range
 └── Decision score

Output
 ├── modelVersion
 ├── estimated=true
 ├── yield {perAcre,total,low,high}
 ├── economics {cost,revenue,profit,roi}
 ├── water {drawnM3,productivity}
 ├── risk {components,overall,level}
 └── decisionScore

8. Explainability Architecture


Scenario A
    │
    ├── inputs A
    └── result A
          │
          ├──────────────┐
          ▼              ▼
     Scenario B       Difference
          │              │
          └──────┬───────┘
                 ▼
        Attribution Engine
                 │
       ┌─────────┼──────────┐
       ▼         ▼          ▼
     Water    Planting    Weather
       │         │          │
       └─────────┼──────────┘
                 ▼
          Why Panel Output
                 │
        ┌────────┴────────┐
        ▼                 ▼
 Controllable         External
 factors              factors

If fair-share/Shapley-style attribution is used, contributions must reconcile to the total scenario difference.

9. Resource & Cost Architecture


Farm Resources
      │
      ├── Available Budget
      ├── Available Water
      ├── Seed
      ├── Fertilizer
      └── Other Inputs
              │
              ▼
       Scenario Requirement
              │
              ▼
        Readiness Service
              │
      ┌───────┼────────┐
      ▼       ▼        ▼
   Available Shortage Critical
      │       │        │
      └───────┼────────┘
              ▼
       Gap + Explanation

10. Weather / Soil / AI Boundary


                    CORE SIMULATOR
                         ▲
                         │ verified/normalized data
          ┌──────────────┼────────────────┐
          │              │                │
     Weather Adapter  Soil Pipeline    AI Layer
          │              │                │
      Open-Meteo     OCR → Verify     Explain/Summarize
          │              │                │
          └──────────────┴────────────────┘

RULE:
External services support the simulator.
They do not replace deterministic numerical truth.

11. Updated Database Architecture


SUPABASE
│
├── Auth
│
├── PostgreSQL
│   ├── profiles
│   ├── farms
│   ├── crop_params
│   ├── scenarios
│   ├── simulation_results
│   ├── assumptions
│   ├── resources
│   ├── weather_snapshots
│   ├── soil_reports
│   └── audit_logs
│
├── Storage
│   └── soil report files / report assets
│
└── Row Level Security
    └── user → authorized farms → authorized scenarios/results

12. API Architecture

13. Database Changes Required From Previous Architecture

ADD assumptions table — visible formulas, weights, coefficients, source and version.

ADD soil_reports — uploaded report metadata, OCR values, verification status and summary.

KEEP weather_snapshots — provider, timestamp and normalized forecast/context.

KEEP crop_params — crop values must remain configurable rather than embedded in UI.

KEEP resources — budget, water and input availability.

KEEP audit_logs — model version, input/output snapshots and actions.

REMOVE marketplace/product/category/order/payment/RFQ tables from the core architecture; the new PRD places marketplace in future scale, not MVP.

ADD model/assumptions version fields to simulation results for reproducibility.

14. MVP vs Pilot vs Scale Architecture

15. 4-Member Team Mapping

Member 1 — Simulation/Backend: simulation engine, attribution, validation, recommendation rules, simulation tests.

Member 2 — Backend/Data: Express APIs, Supabase schema/RLS, persistence, weather adapter, audit/resources.

Member 3 — Frontend Core: React/Vite, farm selection, scenario builder, results, state management.

Member 4 — Frontend UX: comparison, charts, Why panel, resource check, assumptions/history/report, responsive/accessibility.

16. Updated 24-Hour Build Order

0–2h: Freeze P0, create DB schema, simulation contract and frontend shell.

2–5h: Build pure simulation engine + unit tests.

5–8h: Build Express API + Supabase farm/scenario persistence.

8–12h: Build scenario builder + results + live re-simulation.

12–15h: Build comparison 2–4 + charts.

15–17h: Build Why/attribution + recommendations.

17–19h: Build Resource & Cost Check + Assumptions.

19–21h: Add weather adapter/fallback if stable; otherwise keep deterministic demo context.

21–23h: QA, mobile/accessibility, degraded-mode tests, demo dataset.

23–24h: Polish, rehearse judge flow, freeze code.

17. What Should NOT Be Added to the Architecture Now

Full marketplace backend.

Product/category/cart/order/payment/RFQ/seller database.

Generic AI chatbot.

ML training pipeline.

IoT integration.

Complex B2B/B2G dashboards.

Payment gateway.

Opaque AI-generated numerical results.

IDE-specific runtime dependencies.

18. Final Architecture — One View


                              PRARAMBHA 2.0
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   REACT + VITE      │
                         │ PRESENTATION / UX    │
                         └──────────┬──────────┘
                                    │
                              REST / JSON
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │ NODE + EXPRESS      │
                         │ API / APPLICATION   │
                         └──────────┬──────────┘
                                    │
                                    ▼
              ┌───────────────────────────────────────────┐
              │            DOMAIN / DECISION LAYER        │
              │                                           │
              │ Scenario │ Simulation │ Compare │ Why     │
              │ Water │ Yield │ Finance │ Risk │ Score    │
              │ Recommendations │ Resources │ Assumptions │
              └──────────────┬────────────────────────────┘
                             │
             ┌───────────────┼─────────────────┐
             ▼               ▼                 ▼
      ┌─────────────┐ ┌──────────────┐ ┌─────────────────┐
      │  SUPABASE   │ │ EXTERNAL     │ │ OPTIONAL        │
      │             │ │ ADAPTERS     │ │ INTELLIGENCE    │
      │ PostgreSQL  │ │              │ │                 │
      │ Auth / RLS  │ │ Open-Meteo   │ │ AI Explanation  │
      │ Storage     │ │ Google Maps  │ │ Soil OCR        │
      │ Audit/Data  │ │ Future APIs  │ │ Lab Summary     │
      └─────────────┘ └──────────────┘ └─────────────────┘

                     CORE PRINCIPLE
       External context → verified inputs → deterministic engine
       → comparison → explainability → recommendation → readiness

19. Architecture Decision Summary

After checking the new PRD against the previous architecture, the architecture is now aligned to the new product scope. The largest structural changes are: adding explicit Context, Comparison, Why/Attribution, Recommendation, Resource Readiness, Assumptions, Soil Report and Report/History boundaries; moving marketplace out of the MVP/core database; adding model and assumptions versioning; and formalizing degraded-mode operation and testing. The simulator remains the central domain service.

Source: the uploaded PRARAMBHA 2.0 Optimized, IDE-Agnostic PRD. fileciteturn7file0

PRARAMBHA 2.0 • Updated Architecture • PRD-Aligned
