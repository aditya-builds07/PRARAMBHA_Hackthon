# KrishiMitra --- 4-Member Parallel Development Plan

**Hackathon:** PRARAMBHA 2.0\
**Project:** KrishiMitra\
**Architecture:** PRARAMBHA 2.0 Updated Professional System
Architecture\
**Development model:** 4 members working in parallel\
**Target:** 24-hour hackathon MVP

------------------------------------------------------------------------

## 1. Purpose

This document divides KrishiMitra into four independent development
workstreams so that all four members can work simultaneously with
minimum file conflicts.

The division follows the uploaded architecture exactly:

-   **Member 1 --- Simulation / Backend Domain**
-   **Member 2 --- Backend / Data**
-   **Member 3 --- Frontend Core**
-   **Member 4 --- Frontend UX / Visualization**

The architecture explicitly maps these four responsibilities this way
and places the deterministic simulator at the center of the product.
fileciteturn1file0L534-L540

The application architecture is:

``` text
React + Vite
      │
      │ REST / JSON
      ▼
Node.js + Express
      │
      ▼
Domain / Decision Layer
      │
      ├── Simulation
      ├── Comparison
      ├── Why / Attribution
      ├── Recommendations
      └── Resource Readiness
      │
      ├───────────────┬───────────────────┐
      ▼               ▼                   ▼
   Supabase       External APIs      Optional AI/OCR
```

The uploaded architecture defines the frontend, API/application, domain,
persistence and external-adapter boundaries in this layered form.
fileciteturn1file0L62-L113

------------------------------------------------------------------------

# 2. Critical Rule: Work in Parallel

The team should **not** divide the application simply by "pages".

Instead, each member owns a technical/domain boundary.

### Ownership

  -----------------------------------------------------------------------
  Member                  Primary Ownership       Main Responsibility
  ----------------------- ----------------------- -----------------------
  Member 1                Domain / Simulation     Numerical truth and
                                                  business rules

  Member 2                Backend / Data          APIs, database,
                                                  persistence,
                                                  integrations

  Member 3                Frontend Core           Farm + scenario
                                                  creation + live
                                                  simulation UI

  Member 4                Frontend UX             Comparison +
                                                  explainability +
                                                  resource/readiness UI
  -----------------------------------------------------------------------

This prevents two people from independently implementing the same
business logic.

------------------------------------------------------------------------

# 3. Shared Contract --- Freeze Before Coding

Before development starts, all four members must agree on these
contracts:

``` text
1. ScenarioInput
2. SimulationResult
3. Scenario
4. Farm
5. ResourceAvailability
6. ComparisonResult
7. WhyExplanation
8. Recommendation
9. API response/error format
```

No member should change these contracts casually.

If a contract needs to change:

``` text
Member proposes change
        ↓
Team agrees
        ↓
Update shared documentation
        ↓
Update affected modules
```

------------------------------------------------------------------------

# 4. Recommended Git Branches

Use one branch per member:

``` text
main
│
├── feature/member-1-simulation
├── feature/member-2-backend-data
├── feature/member-3-frontend-core
└── feature/member-4-frontend-ux
```

Optional integration branch:

``` text
develop
```

Recommended flow:

``` text
Member branch
     ↓
Local tests
     ↓
Pull Request
     ↓
Integration check
     ↓
develop
     ↓
main
```

Never directly push experimental work into `main`.

------------------------------------------------------------------------

# 5. File Ownership Rules

To minimize merge conflicts:

### Member 1 owns

``` text
backend/src/simulation/
backend/src/validators/
backend/src/services/recommendation.service.js
backend/tests/simulation/
tests/simulation/
docs/SIMULATION.md
```

### Member 2 owns

``` text
backend/src/routes/
backend/src/controllers/
backend/src/services/
backend/src/adapters/
backend/src/middleware/
database/
backend/tests/api/
docs/API.md
docs/DATABASE.md
```

### Member 3 owns

``` text
frontend/src/pages/Entry/
frontend/src/pages/FarmSelection/
frontend/src/pages/ScenarioBuilder/
frontend/src/pages/ScenarioResults/
frontend/src/components/farm/
frontend/src/components/scenario/
frontend/src/components/results/
frontend/src/state/
frontend/src/hooks/
frontend/src/services/api.js
frontend/src/services/farm.service.js
frontend/src/services/scenario.service.js
frontend/src/services/simulation.service.js
```

### Member 4 owns

``` text
frontend/src/pages/ScenarioComparison/
frontend/src/pages/Why/
frontend/src/pages/Recommendations/
frontend/src/pages/ResourceCheck/
frontend/src/pages/Assumptions/
frontend/src/pages/History/
frontend/src/pages/Report/
frontend/src/components/comparison/
frontend/src/components/why/
frontend/src/components/recommendations/
frontend/src/components/resources/
frontend/src/components/assumptions/
frontend/src/components/history/
frontend/src/components/report/
frontend/src/services/comparison.service.js
frontend/src/services/report.service.js
frontend/src/i18n/
frontend/tests/
```

### Shared files

These must have one designated owner during the first integration:

``` text
package.json
README.md
.env.example
frontend/src/main.jsx
global styles
routing configuration
shared types
```

Do not have four members editing these simultaneously.

------------------------------------------------------------------------

# 6. MEMBER 1 --- Simulation & Domain Engineer

## Role

**Owner of KrishiMitra's numerical truth and business logic.**

The uploaded architecture assigns Member 1:

> simulation engine, attribution, validation, recommendation rules and
> simulation tests. fileciteturn1file0L534-L536

This is the most important backend/domain responsibility.

------------------------------------------------------------------------

## 6.1 Main Objective

Build a completely independent deterministic simulation engine.

It must accept a scenario input and return a reproducible simulation
result.

``` text
ScenarioInput
     ↓
Validation
     ↓
Water Engine
     ↓
Yield Engine
     ↓
Financial Engine
     ↓
Risk Engine
     ↓
Decision Engine
     ↓
SimulationResult
```

The architecture specifies these simulation modules explicitly.
fileciteturn1file0L364-L399

------------------------------------------------------------------------

## 6.2 Files Owned

``` text
backend/src/simulation/
├── simulation.engine.js
├── water.engine.js
├── yield.engine.js
├── financial.engine.js
├── risk.engine.js
├── decision.engine.js
├── attribution.engine.js
└── model.version.js

backend/src/validators/
└── scenario.validator.js

backend/src/services/
└── recommendation.service.js

backend/tests/simulation/
└── ...

docs/
└── SIMULATION.md
```

------------------------------------------------------------------------

## 6.3 Task A --- Define Simulation Input

Create the canonical input object:

``` javascript
{
  farmId,
  crop,
  areaAcres,
  sowingDate,
  waterAvailabilityPercent,
  availableWaterM3,
  weather,
  planting: {
    type,
    delayDays
  },
  inputCostMultiplier,
  irrigation,
  priorityProfile
}
```

The architecture defines this exact simulation input contract.
fileciteturn1file0L364-L377

------------------------------------------------------------------------

## 6.4 Task B --- Water Engine

Implement:

``` text
calculateWaterFactor()
calculateWaterDraw()
calculateWaterProductivity()
```

Requirements:

-   Water availability between 0--100%.
-   Crop-specific water demand.
-   Irrigation method affects water usage.
-   Zero-water case must remain numerically valid.
-   No negative water.
-   More water must never reduce estimated yield.

Water productivity:

``` text
Total Yield kg
----------------
Water Drawn m³
```

------------------------------------------------------------------------

## 6.5 Task C --- Yield Engine

Implement:

``` text
calculateWeatherFactor()
calculatePlantingFactor()
calculateYield()
calculateYieldRange()
```

Reference conceptual formula:

``` text
Yield
=
Potential Yield
× Water Factor
× Weather Factor
× Planting Factor
```

Required invariants:

``` text
Better water ≠ lower yield
Better weather ≠ lower yield
Less delay ≠ lower yield
```

------------------------------------------------------------------------

## 6.6 Task D --- Financial Engine

Implement:

``` text
calculateCost()
calculateRevenue()
calculateProfit()
calculateROI()
```

Reference:

``` text
Revenue = Total Yield × Price

Cost =
(Base Cost × Input Cost Multiplier × Area)
+
Irrigation Cost

Profit =
Revenue - Cost

ROI =
Profit / Cost × 100
```

Handle:

``` text
Cost = 0
Profit < 0
Large area
Decimal area
```

Never produce:

``` text
NaN
Infinity
```

------------------------------------------------------------------------

## 6.7 Task E --- Risk Engine

Implement:

``` text
calculateWaterRisk()
calculateWeatherRisk()
calculatePlantingRisk()
calculateFinancialRisk()
calculateOverallRisk()
getRiskLevel()
```

Reference weighted risk:

``` text
Water       35%
Weather     20%
Planting    20%
Financial   25%
```

Risk:

``` text
0–34  Low
35–65 Medium
66–100 High
```

------------------------------------------------------------------------

## 6.8 Task F --- Decision Engine

Implement priority profiles:

``` text
Balanced
Max Profit
Play Safe
```

Reference weights:

``` text
Balanced:
Yield 35%
Profit 30%
Safety 35%

Max Profit:
Yield 25%
Profit 50%
Safety 25%

Play Safe:
Yield 20%
Profit 20%
Safety 60%
```

Safety:

``` text
100 - Risk
```

Return:

``` javascript
decisionScore
```

Do not create an absolute "best scenario" rule.

------------------------------------------------------------------------

## 6.9 Task G --- Attribution Engine

Build:

``` text
compareScenarioInputs()
calculateFactorContributions()
```

Potential factors:

``` text
Water
Weather
Planting
Input Cost
Irrigation
```

Output:

``` javascript
{
  totalChange: -18000,
  factors: [
    {
      factor: "water",
      contribution: -9000
    },
    {
      factor: "planting",
      contribution: -5000
    },
    {
      factor: "inputCost",
      contribution: -4000
    }
  ]
}
```

Mandatory:

``` text
sum(contributions)
≈
totalChange
```

within defined rounding tolerance.

------------------------------------------------------------------------

## 6.10 Task H --- Recommendation Rules

Implement deterministic rules.

Example:

``` text
IF water < threshold
→ water stress warning

IF delayDays > threshold
→ delayed sowing warning

IF inputCostMultiplier > threshold
→ high input cost warning

IF weather = poor
→ weather risk warning

IF water productivity < threshold
→ water efficiency warning

IF profit < 0
→ negative profit warning
```

Each recommendation must contain:

``` text
trigger
condition
impact
action
reason
```

The architecture explicitly requires this traceable structure.
fileciteturn1file0L169-L182

------------------------------------------------------------------------

## 6.11 Task I --- Validation

Create validation for:

``` text
crop
area
water
weather
planting
delay
input cost
irrigation
priority
```

Reject:

``` text
negative area
negative delay
water > 100
negative cost multiplier
unknown crop
unknown irrigation
unknown weather
```

------------------------------------------------------------------------

## 6.12 Task J --- Tests

Mandatory tests:

### Water monotonicity

``` text
80% water yield >= 50% water yield
```

### Weather monotonicity

``` text
Normal yield >= Poor yield
```

### Planting monotonicity

``` text
0-day delay yield >= 10-day delay yield
```

### Cost

``` text
Higher input cost
→ lower/equal profit
```

### Area

``` text
2× area
→ 2× total quantities
```

### Bounds

``` text
0 <= risk <= 100
0 <= decisionScore <= 100
```

### Attribution

``` text
factor sum ≈ scenario difference
```

------------------------------------------------------------------------

## 6.13 Member 1 Definition of Done

Member 1 is finished when:

-   Simulation engine works independently.
-   All six crops can be simulated.
-   Water, yield, financial, risk and decision engines work.
-   Attribution works.
-   Recommendations work.
-   Input validation works.
-   Unit tests pass.
-   Edge cases pass.
-   `SIMULATION.md` documents formulas and examples.
-   API-independent simulation function can be called by another
    developer.

------------------------------------------------------------------------

# 7. MEMBER 2 --- Backend & Data Engineer

## Role

**Owner of APIs, Supabase/PostgreSQL, persistence, external adapters and
backend infrastructure.**

The architecture assigns Member 2:

> Express APIs, Supabase schema/RLS, persistence, weather adapter,
> audit/resources. fileciteturn1file0L537-L537

------------------------------------------------------------------------

## 7.1 Main Objective

Build the complete backend interface between frontend, domain logic and
database.

``` text
Frontend
   ↓
Express API
   ↓
Validation/Auth
   ↓
Controller
   ↓
Domain Service
   ↓
Simulation / Persistence
```

------------------------------------------------------------------------

## 7.2 Database Tasks

Create:

``` text
profiles
farms
crop_params
scenarios
simulation_results
assumptions
resources
weather_snapshots
soil_reports
audit_logs
```

The architecture specifies these Supabase/PostgreSQL entities.
fileciteturn1file0L465-L486

------------------------------------------------------------------------

## 7.3 Task A --- Supabase Setup

Configure:

-   Supabase project
-   PostgreSQL schema
-   Auth
-   RLS
-   Storage

Do not commit secrets.

------------------------------------------------------------------------

## 7.4 Task B --- Database Schema

Create SQL migrations.

### farms

``` text
id
user_id
name
area
region
latitude
longitude
created_at
updated_at
```

### scenarios

``` text
id
farm_id
name
is_baseline
input snapshot
model_version
assumption_version
timestamps
```

### simulation_results

Store:

``` text
yield
economics
water
risk
decision score
model version
```

### crop_params

Store configurable crop data.

Do not hardcode crop parameters in React.

------------------------------------------------------------------------

## 7.5 Task C --- RLS

Rules:

``` text
User A
  ↓
Only User A farms
  ↓
Only scenarios belonging to User A farms
  ↓
Only corresponding results/resources
```

Never allow one user to read another user's farm.

------------------------------------------------------------------------

## 7.6 Task D --- Farm APIs

Implement:

``` http
GET    /api/farms
POST   /api/farms
PUT    /api/farms/:id
DELETE /api/farms/:id
```

Responsibilities:

-   Authentication
-   Validation
-   Persistence
-   Authorization

------------------------------------------------------------------------

## 7.7 Task E --- Crop API

``` http
GET /api/crops
```

Return:

``` json
[
  {
    "crop": "wheat",
    "season": "rabi",
    "potentialYield": 16,
    "price": 2400,
    "baseCost": 24000,
    "waterNeed": 450
  }
]
```

------------------------------------------------------------------------

## 7.8 Task F --- Scenario APIs

``` http
POST /api/scenarios
GET /api/scenarios
GET /api/scenarios/:id
PUT /api/scenarios/:id
DELETE /api/scenarios/:id
```

Store input snapshots.

Do not silently recalculate historical scenarios with newer model
versions.

------------------------------------------------------------------------

## 7.9 Task G --- Simulation API

``` http
POST /api/simulate
```

Flow:

``` text
Request
 ↓
Validate
 ↓
Load crop parameters
 ↓
Simulation engine
 ↓
Save optional result
 ↓
Return SimulationResult
```

Member 1 owns the engine.

Member 2 owns the API integration.

------------------------------------------------------------------------

## 7.10 Task H --- Comparison API

``` http
POST /api/compare
```

Input:

``` json
{
  "scenarioIds": [
    "scenario-a",
    "scenario-b",
    "scenario-c"
  ]
}
```

Rules:

``` text
Minimum 2
Maximum 4
```

Return normalized comparison data.

------------------------------------------------------------------------

## 7.11 Task I --- Resource API

``` http
GET  /api/resources/:farmId
POST /api/resources
PUT  /api/resources/:farmId
```

Store:

``` text
budget
water
seed
fertilizer
other inputs
```

------------------------------------------------------------------------

## 7.12 Task J --- Weather Adapter

Implement:

``` text
backend/src/adapters/weather/openMeteo.adapter.js
```

Architecture requires external services to support the simulator rather
than replace deterministic numerical truth.
fileciteturn1file0L450-L464

Flow:

``` text
/api/weather
    ↓
weather.service
    ↓
Open-Meteo adapter
    ↓
normalized weather object
```

Must have fallback:

``` text
API unavailable
      ↓
manual Good/Normal/Poor
```

------------------------------------------------------------------------

## 7.13 Task K --- Audit

Store:

``` text
user
farm
scenario
action
modelVersion
input snapshot
output snapshot
timestamp
```

Important actions:

``` text
CREATE_FARM
CREATE_SCENARIO
SIMULATE
SAVE_SCENARIO
UPDATE_SCENARIO
DELETE_SCENARIO
GENERATE_REPORT
```

------------------------------------------------------------------------

## 7.14 Task L --- Assumptions API

``` http
GET /api/assumptions
```

Return:

``` text
formulas
weights
crop parameters
sources
model version
assumption version
```

------------------------------------------------------------------------

## 7.15 Task M --- Error Format

All APIs should use a consistent response format.

Success:

``` json
{
  "success": true,
  "data": {}
}
```

Error:

``` json
{
  "success": false,
  "error": {
    "code": "INVALID_SCENARIO",
    "message": "Water availability must be between 0 and 100."
  }
}
```

------------------------------------------------------------------------

## 7.16 Member 2 Definition of Done

-   Supabase configured.
-   Database schema created.
-   RLS configured.
-   Farm CRUD works.
-   Crop API works.
-   Scenario CRUD works.
-   Simulation endpoint works.
-   Comparison endpoint works.
-   Resource endpoint works.
-   Assumptions endpoint works.
-   Weather adapter works or deterministic fallback is available.
-   Audit logging works.
-   API documentation exists.
-   API tests pass.

------------------------------------------------------------------------

# 8. MEMBER 3 --- Frontend Core Engineer

## Role

**Owner of the primary farmer workflow.**

The architecture assigns Member 3:

> React/Vite, farm selection, scenario builder, results and state
> management. fileciteturn1file0L538-L539

------------------------------------------------------------------------

## 8.1 Main Objective

Build the workflow that takes the user from:

``` text
Entry
 ↓
Farm
 ↓
Scenario
 ↓
Simulation
 ↓
Results
```

------------------------------------------------------------------------

## 8.2 Files Owned

``` text
frontend/src/pages/Entry/
frontend/src/pages/FarmSelection/
frontend/src/pages/ScenarioBuilder/
frontend/src/pages/ScenarioResults/

frontend/src/components/farm/
frontend/src/components/scenario/
frontend/src/components/results/

frontend/src/state/
frontend/src/hooks/

frontend/src/services/api.js
frontend/src/services/farm.service.js
frontend/src/services/scenario.service.js
frontend/src/services/simulation.service.js
```

------------------------------------------------------------------------

## 8.3 Task A --- Application Shell

Build:

``` text
Header
Navigation
Main content
Responsive container
Toast/notification system
Loading states
Error states
```

Keep global styles minimal and reusable.

------------------------------------------------------------------------

## 8.4 Task B --- Entry Screen

Display:

``` text
KrishiMitra
Test the season before you sow it.

[Start Simulation]
```

Also provide:

``` text
Language
Existing farms
```

------------------------------------------------------------------------

## 8.5 Task C --- Farm Selection

Build:

``` text
Farm cards
Create farm
Edit farm
Delete farm
Select farm
```

Farm card:

``` text
Farm Name
Area
Region
Current Crop
Water Profile

[Open Farm]
```

------------------------------------------------------------------------

## 8.6 Task D --- Farm Creation Form

Fields:

``` text
Farm name
Area
Region
Latitude/Longitude optional
Available water
Available budget
```

Validation must be client-side.

Server remains authoritative.

------------------------------------------------------------------------

## 8.7 Task E --- Scenario Builder

Build the main simulation input form.

Fields:

``` text
Crop
Area
Sowing date
Water availability
Weather
Planting type
Delay days
Input cost
Irrigation
Priority profile
```

Architecture specifies these Scenario Builder inputs.
fileciteturn1file0L129-L141

------------------------------------------------------------------------

## 8.8 Task F --- Scenario State

Create a normalized scenario state.

Example:

``` javascript
{
  farmId: null,
  crop: "wheat",
  areaAcres: 5,
  sowingDate: null,
  waterAvailabilityPercent: 100,
  weather: "normal",
  planting: {
    type: "on_time",
    delayDays: 0
  },
  inputCostMultiplier: 1,
  irrigation: "flood",
  priorityProfile: "balanced"
}
```

------------------------------------------------------------------------

## 8.9 Task G --- Presets

Implement:

``` text
Normal
Dry Year
Late Sowing
Costly Inputs
Stress Test
```

A preset should populate the form, not bypass the simulator.

------------------------------------------------------------------------

## 8.10 Task H --- Scenario Clone

Implement:

``` text
Baseline
   ↓ Clone
Alternative
```

The clone must preserve all existing values and allow editing.

------------------------------------------------------------------------

## 8.11 Task I --- Live Re-simulation

Changing:

``` text
water
weather
delay
input cost
irrigation
```

should trigger simulation without full page reload.

Recommended behavior:

``` text
User changes input
      ↓
Debounce if needed
      ↓
POST /api/simulate
      ↓
Update state
      ↓
Update result cards
```

------------------------------------------------------------------------

## 8.12 Task J --- Results Screen

Display:

### Yield

``` text
Estimated Yield
Low – High
Per Acre
Total
```

### Economics

``` text
Cost
Revenue
Profit
ROI
```

### Water

``` text
Water Drawn
Water Productivity
```

### Risk

``` text
Risk Score
Risk Level
```

### Decision

``` text
Decision Score
```

The architecture defines these result categories.
fileciteturn1file0L150-L157

------------------------------------------------------------------------

## 8.13 Task K --- Result Components

Create reusable components:

``` text
MetricCard
YieldCard
EconomicsCard
WaterCard
RiskCard
DecisionScoreCard
```

Member 4 should consume these components where possible instead of
recreating them.

------------------------------------------------------------------------

## 8.14 Task L --- Loading/Error/Empty States

Must support:

``` text
Simulating...
Unable to simulate
No scenario selected
No farm selected
```

------------------------------------------------------------------------

## 8.15 Task M --- Mobile Workflow

Ensure:

``` text
320px+
```

works.

Controls should be:

-   Touch-friendly
-   Full-width where appropriate
-   Clearly labelled
-   Easy to scan

------------------------------------------------------------------------

## 8.16 Member 3 Definition of Done

-   Entry page works.
-   Farm selection works.
-   Farm creation/editing works.
-   Scenario builder works.
-   Presets work.
-   Scenario cloning works.
-   Live simulation works.
-   Results page works.
-   All result categories display correctly.
-   Mobile layout works.
-   API errors are handled.
-   State is clean and reusable.

------------------------------------------------------------------------

# 9. MEMBER 4 --- Frontend UX, Comparison & Explainability Engineer

## Role

**Owner of the decision-making interface after simulation.**

The architecture assigns Member 4:

> comparison, charts, Why panel, resource check,
> assumptions/history/report and responsive/accessibility.
> fileciteturn1file0L539-L540

This member owns the primary **hackathon wow-factor interface**.

------------------------------------------------------------------------

## 9.1 Main Objective

Turn simulation output into understandable decision support.

``` text
Results
 ↓
Compare
 ↓
Why
 ↓
Recommendations
 ↓
Resource Check
 ↓
Assumptions
 ↓
History / Report
```

------------------------------------------------------------------------

## 9.2 Files Owned

``` text
frontend/src/pages/ScenarioComparison/
frontend/src/pages/Why/
frontend/src/pages/Recommendations/
frontend/src/pages/ResourceCheck/
frontend/src/pages/Assumptions/
frontend/src/pages/History/
frontend/src/pages/Report/

frontend/src/components/comparison/
frontend/src/components/why/
frontend/src/components/recommendations/
frontend/src/components/resources/
frontend/src/components/assumptions/
frontend/src/components/history/
frontend/src/components/report/

frontend/src/services/comparison.service.js
frontend/src/services/report.service.js
frontend/src/i18n/
```

------------------------------------------------------------------------

# 10. Comparison Module

## Task A --- Scenario Selector

Allow:

``` text
2–4 scenarios
```

Example:

``` text
☑ Normal Plan
☑ Low Water
☑ Late Sowing
☐ Drip Plan
```

Disable compare until at least two are selected.

------------------------------------------------------------------------

## Task B --- Comparison Table

Metrics:

``` text
Yield
Yield Range
Cost
Revenue
Profit
ROI
Water
Water Productivity
Risk
Decision Score
```

Use neutral labels.

Example:

``` text
Scenario A
Higher Profit

Scenario B
Lower Water Use

Scenario C
Lower Risk
```

Do not label a scenario as universally "best".

------------------------------------------------------------------------

# 11. Charts

At least two dynamic charts.

## Chart 1 --- Economics

``` text
Cost
Revenue
Profit
```

## Chart 2 --- Risk / Water

Choose:

``` text
Risk comparison
```

or:

``` text
Water use + productivity
```

Charts must update when scenario data changes.

------------------------------------------------------------------------

# 12. Why Panel

This is a core feature.

Display:

``` text
Why did this scenario change?
```

Sections:

### Changed Factors

``` text
Water
Planting
Weather
Input Cost
Irrigation
```

### Attribution

Example:

``` text
Water Stress       -₹9,000
Late Sowing        -₹5,000
Input Cost         -₹4,000
```

### Controllable

``` text
Sowing
Irrigation
Input purchasing
```

### External

``` text
Weather
```

The architecture defines this exact explainability flow.
fileciteturn1file0L400-L427

------------------------------------------------------------------------

# 13. Recommendations UI

Display every recommendation as:

``` text
Trigger
Condition
Impact
Action
Reason
```

Example:

``` text
WATER STRESS

Condition
Water availability is below crop requirement.

Impact
Estimated yield and water risk are affected.

Action
Evaluate a water-efficient irrigation scenario.

Reason
The simulated scenario has significant water stress.
```

Do not invent recommendations in the frontend.

Backend/domain rules are authoritative.

------------------------------------------------------------------------

# 14. Resource & Cost Check

Display:

``` text
Required
Available
Gap
Status
```

Example:

``` text
BUDGET

Required
₹1,25,000

Available
₹1,40,000

Status
AVAILABLE
```

Water:

``` text
Required: 4,500 m³
Available: 3,200 m³
Gap: 1,300 m³
Status: SHORTAGE
```

Architecture defines the resource flow as:

``` text
Farm Resources
    ↓
Scenario Requirement
    ↓
Readiness Service
    ↓
Available / Shortage / Critical
    ↓
Gap + Explanation
```

fileciteturn1file0L428-L449

------------------------------------------------------------------------

# 15. Assumptions Screen

Show:

``` text
Model Version
Assumption Version
Crop Parameters
Risk Weights
Priority Weights
Formulas
Sources
```

Include:

``` text
Estimated values are model-based and are not guaranteed future results.
```

------------------------------------------------------------------------

# 16. History

Build:

``` text
Saved Scenarios
Timestamp
Crop
Area
Profit
Risk
Model Version
```

Actions:

``` text
Open
Rename
Delete
Compare
```

Historical results must remain tied to their original model/assumption
version.

------------------------------------------------------------------------

# 17. Report

Build a concise report view.

Sections:

``` text
Farm
Scenario
Inputs
Yield
Economics
Water
Risk
Why
Recommendations
Resources
Assumptions
Disclaimer
```

The report should be printable even if PDF generation is deferred.

------------------------------------------------------------------------

# 18. Localization

Prepare:

``` text
English
Marathi
Hindi
```

Suggested structure:

``` text
frontend/src/i18n/
├── en.json
├── mr.json
└── hi.json
```

Never hardcode translated UI strings inside components.

Important:

``` text
Language changes labels.
Language never changes numerical calculations.
```

------------------------------------------------------------------------

# 19. Accessibility

Member 4 owns the cross-application accessibility review.

Check:

-   Keyboard navigation
-   Focus states
-   Form labels
-   Semantic HTML
-   Contrast
-   Mobile touch targets
-   Screen-reader text
-   Chart summaries
-   Risk labels
-   No colour-only information

Example:

``` text
HIGH RISK
72 / 100
```

not:

``` text
[red box]
```

only.

------------------------------------------------------------------------

# 20. Member 4 Definition of Done

-   Comparison supports 2--4 scenarios.
-   Comparison table works.
-   Two charts work.
-   Why panel works.
-   Attribution is displayed.
-   Controllable/external factors are displayed.
-   Recommendations UI works.
-   Resource check works.
-   Assumptions screen works.
-   History works.
-   Report works.
-   Language structure exists.
-   Accessibility review is complete.
-   Mobile layouts work.

------------------------------------------------------------------------

# 21. Integration Contract Between Members

## Member 1 → Member 2

Member 1 provides:

``` text
Simulation Engine
Recommendation Engine
Attribution Engine
Validators
```

Member 2 integrates these into APIs.

### Required function

``` javascript
simulateScenario(input)
```

Returns:

``` javascript
{
  modelVersion,
  estimated: true,
  yield,
  economics,
  water,
  risk,
  decisionScore
}
```

------------------------------------------------------------------------

## Member 2 → Member 3

Member 2 provides:

``` text
Farm API
Crop API
Scenario API
Simulation API
```

Member 3 consumes these APIs.

------------------------------------------------------------------------

## Member 2 → Member 4

Member 2 provides:

``` text
Compare API
Recommendation API
Resource API
Assumptions API
History API
Report API
```

Member 4 consumes these APIs.

------------------------------------------------------------------------

## Member 3 → Member 4

Member 3 provides:

``` text
Scenario state
Selected farm
Scenario IDs
Reusable result components
Navigation
Global layout
```

Member 4 builds downstream decision-support screens on top of these.

------------------------------------------------------------------------

# 22. Shared Data Contracts

## ScenarioInput

``` typescript
type ScenarioInput = {
  farmId: string;
  crop: string;
  areaAcres: number;
  sowingDate?: string;
  waterAvailabilityPercent: number;
  availableWaterM3?: number;

  weather: "good" | "normal" | "poor";

  planting: {
    type: "early" | "on_time" | "delayed";
    delayDays: number;
  };

  inputCostMultiplier: number;

  irrigation: "flood" | "sprinkler" | "drip";

  priorityProfile: "balanced" | "max_profit" | "play_safe";
};
```

------------------------------------------------------------------------

# 23. SimulationResult

``` typescript
type SimulationResult = {
  modelVersion: string;
  estimated: true;

  yield: {
    perAcre: number;
    total: number;
    low: number;
    high: number;
    unit: string;
  };

  economics: {
    cost: number;
    revenue: number;
    profit: number;
    roi: number;
  };

  water: {
    drawnM3: number;
    productivity: number;
  };

  risk: {
    components: {
      water: number;
      weather: number;
      planting: number;
      financial: number;
    };
    overall: number;
    level: "low" | "medium" | "high";
  };

  decisionScore: number;
};
```

The architecture defines this output structure, including model version,
estimated flag, yield, economics, water, risk and decision score.
fileciteturn1file0L392-L399

------------------------------------------------------------------------

# 24. ComparisonResult

``` typescript
type ComparisonResult = {
  scenarios: SimulationResult[];

  differences: {
    metric: string;
    values: Record<string, number>;
  }[];

  baselineScenarioId?: string;
};
```

------------------------------------------------------------------------

# 25. WhyExplanation

``` typescript
type WhyExplanation = {
  referenceScenarioId: string;
  targetScenarioId: string;

  totalChange: {
    metric: string;
    value: number;
  };

  factors: {
    factor: string;
    contribution: number;
    controllability: "controllable" | "external";
    explanation: string;
  }[];
};
```

------------------------------------------------------------------------

# 26. Recommendation

``` typescript
type Recommendation = {
  id: string;
  trigger: string;
  condition: string;
  impact: string;
  action: string;
  reason: string;
  severity: "info" | "warning" | "critical";
};
```

------------------------------------------------------------------------

# 27. ResourceReadiness

``` typescript
type ResourceReadiness = {
  budget: ResourceStatus;
  water: ResourceStatus;
  seed?: ResourceStatus;
  fertilizer?: ResourceStatus;
  otherInputs?: ResourceStatus[];
  overallStatus: "available" | "shortage" | "critical";
};
```

------------------------------------------------------------------------

# 28. ResourceStatus

``` typescript
type ResourceStatus = {
  required: number;
  available: number;
  gap: number;
  status: "available" | "shortage" | "critical";
  unit: string;
};
```

------------------------------------------------------------------------

# 29. Integration Timeline

## Hour 0--1

### All members

Freeze:

-   Folder structure
-   Contracts
-   Git branches
-   API response format
-   Design tokens

------------------------------------------------------------------------

## Hour 1--4

### Member 1

Simulation engine.

### Member 2

Supabase schema + Express skeleton.

### Member 3

React/Vite shell + Scenario Builder.

### Member 4

Comparison/Why UI mock using static JSON.

------------------------------------------------------------------------

## Hour 4--7

### Member 1

Risk + decision + attribution.

### Member 2

Farm + scenario + simulation APIs.

### Member 3

Connect Scenario Builder to API.

### Member 4

Charts + comparison.

------------------------------------------------------------------------

## Hour 7--10

### Member 1

Recommendations + tests.

### Member 2

Resources + assumptions + audit.

### Member 3

Results + clone + live simulation.

### Member 4

Why + recommendations UI.

------------------------------------------------------------------------

## Hour 10--14

### All

First integration.

Target:

``` text
Create Farm
 ↓
Create Scenario
 ↓
Simulate
 ↓
Display Results
```

This must work before adding advanced features.

------------------------------------------------------------------------

## Hour 14--17

### Member 1

Finalize tests.

### Member 2

Weather/fallback.

### Member 3

Mobile polish.

### Member 4

Resource check + assumptions + history.

------------------------------------------------------------------------

## Hour 17--20

Integration:

``` text
Compare
 ↓
Why
 ↓
Recommendations
 ↓
Resources
```

------------------------------------------------------------------------

## Hour 20--22

QA:

-   Invalid inputs
-   API failure
-   Weather failure
-   Mobile
-   Empty states
-   Loading states
-   Risk boundaries
-   Attribution
-   Scenario cloning

------------------------------------------------------------------------

## Hour 22--24

No major architecture changes.

Only:

``` text
Bug fixes
UI polish
Demo data
Demo rehearsal
Documentation
```

The architecture's recommended 24-hour sequence follows this same
progression: simulation first, backend persistence, scenario
builder/results, comparison, Why/recommendations, resource/assumptions,
weather fallback, QA and final demo freeze.
fileciteturn1file0L541-L551

------------------------------------------------------------------------

# 30. Integration Checkpoints

## Checkpoint 1 --- Simulation

``` text
POST /api/simulate
```

Must return valid result.

------------------------------------------------------------------------

## Checkpoint 2 --- Farm + Scenario

``` text
Create farm
Create scenario
Load scenario
```

------------------------------------------------------------------------

## Checkpoint 3 --- Full Core Flow

``` text
Farm
 ↓
Scenario
 ↓
Simulation
 ↓
Results
```

------------------------------------------------------------------------

## Checkpoint 4 --- Decision Flow

``` text
Results
 ↓
Compare
 ↓
Why
 ↓
Recommendations
 ↓
Resources
```

------------------------------------------------------------------------

## Checkpoint 5 --- Final Demo

``` text
Save
 ↓
History
 ↓
Report
 ↓
Assumptions
```

------------------------------------------------------------------------

# 31. What Members Must NOT Build

To protect hackathon time, nobody should independently add:

``` text
Full marketplace
Cart
Payment
Seller dashboard
RFQ system
Generic chatbot
ML training pipeline
IoT integration
Complex B2B/B2G dashboard
```

These are explicitly outside the current core architecture.
fileciteturn1file0L552-L562

------------------------------------------------------------------------

# 32. Conflict Prevention Rules

### Rule 1

One owner per folder.

### Rule 2

Never modify another member's module without coordination.

### Rule 3

Use interfaces/contracts instead of importing internal implementation.

### Rule 4

No duplicate simulation formulas in frontend.

Frontend must consume simulation results.

### Rule 5

No hardcoded crop parameters in React.

Crop data comes from the backend/database.

### Rule 6

No AI-generated numerical calculations.

AI can explain verified results only.

### Rule 7

No API keys in frontend code or Git.

### Rule 8

Every PR must pass tests before integration.

------------------------------------------------------------------------

# 33. Definition of Integration Complete

The project is integration-complete when this entire flow works:

``` text
                    KRISHIMITRA
                         │
                         ▼
                 Select / Create Farm
                         │
                         ▼
                  Scenario Builder
                         │
                         ▼
                   Live Simulation
                         │
                         ▼
                      Results
                         │
             ┌───────────┼───────────┐
             ▼           ▼           ▼
          Compare       Why     Recommendations
             │           │           │
             └───────────┼───────────┘
                         ▼
                 Resource Check
                         │
                         ▼
                     Assumptions
                         │
                         ▼
                   Save / History
                         │
                         ▼
                       Report
```

------------------------------------------------------------------------

# 34. Final Responsibility Matrix

  -----------------------------------------------------------------------------
  Feature                       M1             M2             M3             M4
  ----------------- -------------- -------------- -------------- --------------
  Simulation engine      **OWNER**    Integration            ---            ---

  Water calculation      **OWNER**    Integration            ---            ---

  Yield calculation      **OWNER**    Integration            ---            ---

  Financial              **OWNER**    Integration            ---            ---
  calculation                                                    

  Risk calculation       **OWNER**    Integration            ---        Display

  Decision score         **OWNER**    Integration        Display        Display

  Attribution            **OWNER**            API            ---         **UI**

  Recommendation         **OWNER**            API            ---         **UI**
  rules                                                          

  Validation             **OWNER** API validation           Form  UI validation
                                                      validation 

  Database                     ---      **OWNER**        Consume        Consume

  Supabase/RLS                 ---      **OWNER**            ---            ---

  Farm API                     ---      **OWNER**        Consume            ---

  Scenario API                 ---      **OWNER**        Consume        Consume

  Simulation API            Engine      **OWNER**        Consume            ---

  Comparison API    Domain support      **OWNER**            ---        Consume

  Weather API                  ---      **OWNER**            ---        Display

  Farm UI                      ---            ---      **OWNER**            ---

  Scenario Builder             ---            API      **OWNER**            ---

  Results UI                   ---            API      **OWNER**            ---

  Comparison UI                ---            API            ---      **OWNER**

  Charts                       ---           Data            ---      **OWNER**

  Why UI               Attribution            API            ---      **OWNER**
                              data                               

  Recommendations            Rules            API            ---      **OWNER**
  UI                                                             

  Resource UI            Logic/API            API            ---      **OWNER**

  Assumptions UI        Model data            API            ---      **OWNER**

  History UI                   ---            API            ---      **OWNER**

  Report UI                    ---            API            ---      **OWNER**

  Localization                 ---            ---   Shared shell      **OWNER**

  Accessibility                ---            ---     Core forms      **OWNER**

  Simulation tests       **OWNER**            ---            ---            ---

  API tests                    ---      **OWNER**            ---            ---

  UI tests                     ---            ---           Core      **OWNER**
  -----------------------------------------------------------------------------

------------------------------------------------------------------------

# 35. Individual Deliverable Checklist

## Member 1

``` text
[ ] Water engine
[ ] Yield engine
[ ] Financial engine
[ ] Risk engine
[ ] Decision engine
[ ] Attribution engine
[ ] Recommendation rules
[ ] Validators
[ ] Unit tests
[ ] Simulation documentation
```

## Member 2

``` text
[ ] Supabase project
[ ] Database schema
[ ] RLS
[ ] Farm API
[ ] Crop API
[ ] Scenario API
[ ] Simulation API
[ ] Comparison API
[ ] Resource API
[ ] Assumptions API
[ ] Weather adapter
[ ] Audit logging
[ ] API tests
[ ] API documentation
```

## Member 3

``` text
[ ] React/Vite shell
[ ] Entry
[ ] Farm selection
[ ] Farm creation
[ ] Scenario Builder
[ ] Scenario presets
[ ] Scenario cloning
[ ] Live re-simulation
[ ] Results
[ ] Loading states
[ ] Error states
[ ] Mobile responsiveness
```

## Member 4

``` text
[ ] Comparison
[ ] Comparison table
[ ] Economics chart
[ ] Risk/water chart
[ ] Why panel
[ ] Attribution display
[ ] Controllable/external display
[ ] Recommendations UI
[ ] Resource Check
[ ] Assumptions
[ ] History
[ ] Report
[ ] i18n
[ ] Accessibility audit
```

------------------------------------------------------------------------

# 36. Final Team Strategy

The four members should think of KrishiMitra as four connected products:

### Member 1

**"Can we calculate the decision correctly?"**

### Member 2

**"Can the application reliably store, validate and expose the
decision?"**

### Member 3

**"Can a farmer easily create and run the scenario?"**

### Member 4

**"Can the farmer understand and act on the result?"**

Together:

``` text
M1
Simulation Truth
      ↓
M2
Reliable Platform
      ↓
M3
Farmer Workflow
      ↓
M4
Decision Experience
      ↓
KRISHIMITRA
```

The central architectural principle remains:

> **External context → verified inputs → deterministic simulation →
> comparison → explainability → recommendation → resource readiness →
> decision.**

The uploaded architecture explicitly states that the simulator remains
the central domain service and that the major structural boundaries are
Simulation, Comparison, Why/Attribution, Recommendations, Resource
Readiness, Assumptions, Soil/Report and History.
fileciteturn1file0L602-L608

------------------------------------------------------------------------

# 37. Recommended First Action

Before any member starts coding, create these four tickets:

``` text
KM-001 — Simulation & Domain Engine
Owner: Member 1

KM-002 — Backend, Supabase & APIs
Owner: Member 2

KM-003 — Farmer Workflow Frontend
Owner: Member 3

KM-004 — Decision Intelligence Frontend
Owner: Member 4
```

Then freeze:

``` text
ScenarioInput
SimulationResult
API response format
Database schema
Folder ownership
Git branches
```

After that, all four members can work independently with minimal
blocking.
