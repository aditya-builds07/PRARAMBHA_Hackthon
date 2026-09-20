# TECH.md --- PRARAMBHA Tech Stack

## 1. Recommended Stack

  Layer           Technology
  --------------- -----------------------
  Frontend        React + Vite
  Styling         Tailwind CSS
  UI Components   shadcn/ui
  Charts          Recharts
  Backend         Node.js + Express.js
  Database        Supabase / PostgreSQL
  Weather         Open-Meteo
  Maps            Google Maps
  Optional AI     OpenAI / Gemini
  Optional OCR    Tesseract
  Testing         Vitest

The supplied resource library defines this stack and its roles.
fileciteturn2file1L5-L42

## 2. Architecture

``` text
React + Vite
      ↓
Node.js + Express
      ↓
Supabase / PostgreSQL
      ↓
External Adapters
 ┌────┼─────┬─────┐
Weather Maps  AI   OCR
```

External services should be replaceable through adapter interfaces.
fileciteturn2file1L85-L89

## 3. Frontend

Use React for:

-   Farmer dashboard
-   Farm management
-   Scenario Builder
-   Results
-   Comparison
-   Charts
-   Why panel
-   Resource Check

Use Vite for development and production builds.

Use Tailwind CSS and shadcn/ui for responsive UI components.

Use Recharts for scenario, risk and financial charts.

## 4. Backend

Use Node.js + Express for REST APIs.

Core endpoints:

``` text
GET    /api/farms
POST   /api/farms
PUT    /api/farms/:id
DELETE /api/farms/:id

GET    /api/crops

POST   /api/simulate

GET    /api/scenarios
POST   /api/scenarios
DELETE /api/scenarios/:id

GET    /api/assumptions

GET    /api/resources/:farmId
POST   /api/resources
PUT    /api/resources/:id

POST   /api/recommendations

GET    /api/weather

POST   /api/soil-report
```

These endpoints are defined in the PRD API contract.
fileciteturn2file0L831-L904

## 5. Database

Minimum entities:

``` text
users
farms
scenarios
simulation_results
crop_params
assumptions
resources
weather_snapshots
soil_reports
audit_log
```

Supabase provides PostgreSQL, authentication and storage capabilities.
fileciteturn2file0L905-L1013

## 6. Project Structure

``` text
prarambha/
├── PRD.md
├── TECH.md
├── README.md
├── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── state/
│   │   ├── simulation/
│   │   ├── charts/
│   │   └── types/
│   └── tests/
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── simulation/
│   │   ├── validators/
│   │   └── adapters/
│   └── tests/
│
├── database/
│   ├── schema.sql
│   ├── seed.sql
│   └── migrations/
│
└── docs/
    ├── API.md
    ├── SIMULATION.md
    ├── DATABASE.md
    └── DEMO.md
```

The PRD defines this separation of frontend, backend, database and
documentation responsibilities. fileciteturn2file0L746-L792

## 7. Architecture Rules

### UI

Responsible for:

-   Rendering
-   Forms
-   Interaction
-   Navigation
-   Visualization

### Simulation Engine

Responsible for:

-   Deterministic calculations
-   Validation
-   Derived metrics
-   Model versioning

### Backend

Responsible for:

-   Persistence
-   Authorization
-   Server validation
-   API contracts
-   External adapters

### Database

Responsible for:

-   Farms
-   Scenarios
-   Results
-   Parameters
-   Assumptions
-   Resources
-   Audit data

### AI

Responsible only for:

-   Summarization
-   Explanation
-   Report generation from verified data

AI must never calculate or override the core simulation.
fileciteturn2file0L793-L830

## 8. Security

-   Never commit API keys.
-   Use `.env`.
-   Commit only `.env.example`.
-   Keep secret keys server-side.
-   Use authorization for farm/scenario operations.
-   Validate uploads.
-   Never execute uploaded files.
-   Use parameterized database operations.

The resource library contains credentials; those credentials must be
treated as exposed and rotated rather than copied into the project.
fileciteturn2file1L43-L54

## 9. Testing

### Unit

Test:

-   Water factor
-   Weather factor
-   Planting factor
-   Yield
-   Cost
-   Revenue
-   Profit
-   ROI
-   Water productivity
-   Risk
-   Decision score
-   Validation

### Integration

Test:

-   Farm creation
-   Scenario creation
-   Simulation API
-   Save/reload
-   Comparison
-   Recommendations

### UI

Test:

-   Form validation
-   Scenario cloning
-   Live re-simulation
-   Comparison selection
-   Mobile layout
-   Navigation

fileciteturn2file0L1091-L1123

## 10. Mandatory Simulation Rules

These must always remain true:

``` text
More water must not reduce yield.

Poor weather must not improve yield.

Longer planting delay must not improve yield.

Zero-water scenarios must remain numerically valid.

Increasing area scales totals without changing per-acre yield/risk.

Increasing input cost reduces profit without changing yield.

Risk stays between 0–100.

Decision score stays between 0–100.

Attribution reconciles with scenario difference.
```

fileciteturn2file0L1124-L1134

## 11. Environment

Use:

``` text
.env
.env.example
```

Example variable names:

``` text
PORT=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
WEATHER_API_BASE_URL=
GOOGLE_MAPS_API_KEY=
AI_PROVIDER=
OPENAI_API_KEY=
GEMINI_API_KEY=
```

Never hard-code secrets. fileciteturn2file0L1058-L1075

## 12. Degraded Mode

If external APIs fail:

``` text
Weather unavailable
      ↓
Manual weather input
      ↓
Deterministic simulator continues
```

The core simulator must continue operating without weather, maps or AI
services. Never fabricate live data. fileciteturn2file0L1168-L1175

## 13. 24-Hour Priority

``` text
0–2h    Requirements + DB + simulation rules
2–6h    Scenario Builder + local simulation
6–10h   Backend + database
10–14h  Yield/economics/water/risk/score
14–17h  Comparison + charts
17–20h  Why + recommendations + assumptions
20–22h  Testing + responsive design
22–24h  Polish + demo rehearsal
```

Do not cut:

-   Live simulation
-   Scenario comparison
-   Why panel
-   Assumptions

fileciteturn2file0L1330-L1352
