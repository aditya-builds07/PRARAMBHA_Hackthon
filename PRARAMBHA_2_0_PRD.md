# PRARAMBHA 2.0 — Agri Scenario & Decision Simulator

## 1. Product Overview

**Project:** PRARAMBHA 2.0  
**Domain:** AGRI TECH — Sustainable Solutions  
**Project Type:** Interactive Web-Based Decision Simulator  
**Hackathon:** 24-Hour Online Hackathon  

The **Agri Scenario & Decision Simulator** is an interactive web application that helps users explore farming “what-if” scenarios before committing real agricultural resources. It allows a user to configure farming parameters, create a baseline and alternative scenarios, simulate estimated outcomes using transparent rule-based logic, compare scenarios visually, and understand the major factors responsible for differences. fileciteturn0file0L2-L12

---

## 2. Problem Statement

Farmers make decisions under changing conditions such as:

- Crop selection
- Water availability
- Weather
- Planting schedule
- Input costs

A decision that works under one set of conditions may produce a very different outcome when those conditions change. The core problem is the lack of a simple, interactive system that allows a farmer to test different farming situations before committing real resources.

The system should help users understand how changes in important variables can affect:

- Resource consumption
- Estimated cost
- Risk
- Expected agricultural outcome

### Problem in Simple Words

A farmer should be able to ask:

> “What will happen if I change something?”

Examples:

- What if water becomes 30% lower?
- What if planting is delayed?
- What if fertilizer/input cost increases?

The simulator should simulate the situation and show the impact. fileciteturn0file0L15-L26

---

## 3. Product Goals

The MVP should:

1. Allow a user to configure a farming scenario.
2. Create a baseline/reference scenario.
3. Allow one or multiple variables to be changed.
4. Create alternative scenarios.
5. Run an instant simulation after parameter changes.
6. Estimate cost, expected yield/outcome, resource usage and risk.
7. Compare multiple scenarios side-by-side.
8. Explain the major factors responsible for scenario differences.
9. Present results through cards, tables and charts.
10. Clearly communicate that simulated values are estimates rather than guaranteed real-world agricultural results. fileciteturn0file0L27-L37

---

## 4. Target User

### Primary User

**Farmer / farming decision-maker**

The interface should be understandable to non-technical users and support interactive exploration of farming situations.

### User Need

The user needs a simple way to test possible farming conditions digitally before committing real resources.

---

## 5. Main User Journey

| Step | User Action | System Response |
|---|---|---|
| 1 | Enter Farm Parameters | User selects crop and provides water availability, weather, planting schedule and input costs. |
| 2 | Create Baseline | System creates a reference scenario from the entered values. |
| 3 | Create Alternatives | User changes one or more variables to test different situations. |
| 4 | Run Simulation | System calculates estimated cost, yield, resource usage and risk. |
| 5 | Compare | System displays scenarios in cards, charts and a comparison table. |
| 6 | Understand Why | System displays the major factors responsible for differences. |
| 7 | Make an Informed Decision | User uses simulation results as decision-support information before committing resources. |

Source: fileciteturn0file0L38-L61

---

## 6. Functional Requirements

### FR-01: Scenario Configuration

The system shall allow users to configure a farming scenario using:

- Crop
- Water availability
- Weather condition
- Planting schedule
- Input costs
- Farm area
- Optional advanced inputs

### FR-02: Crop Selection

The system shall support crop options such as:

- Wheat
- Rice
- Maize
- Sugarcane
- Other selected crops

### FR-03: Water Availability

The system shall allow water availability to be represented as:

- High
- Medium
- Low
- Percentage availability

### FR-04: Weather

The system shall allow weather to be represented as:

- Normal
- Good
- Poor
- Rainfall score

### FR-05: Planting Schedule

The system shall support:

- On-time
- Early
- Delayed

### FR-06: Input Cost

The system shall capture estimated costs for:

- Seeds
- Fertilizer
- Pesticide
- Other inputs

### FR-07: Farm Area

The system shall capture the area under cultivation.

### FR-08: Advanced Inputs

The system may support:

- Soil quality
- Irrigation method
- Fertilizer quantity
- Other advanced parameters

Source: fileciteturn0file0L62-L70

---

## 7. Scenario Management

The system shall allow users to:

- Create a baseline scenario.
- Create at least 2–3 alternative scenarios.
- Change one or multiple parameters.
- Run simulations independently.
- Save scenario history during the session.
- Revisit previously created scenarios.
- Compare scenarios using common metrics.

The 24-hour MVP specifically requires a farmer/user-friendly scenario form and support for at least 2–3 alternative scenarios. fileciteturn0file0L119-L130

---

## 8. Simulation Engine

### 8.1 MVP Approach

For the hackathon MVP, the simulator shall use a **transparent rule-based scoring model** rather than claiming to be a real agricultural prediction engine.

Each parameter contributes positively or negatively to an outcome score. Weights can be calibrated using crop-specific assumptions and clearly shown to the user.

### 8.2 Conceptual Formula

```text
Outcome Score =
    Base Crop Score
    + Weather Effect
    + Water Effect
    + Planting Effect
    - Cost/Risk Effects
```

The resulting score can be mapped to:

- Estimated yield range
- Risk level

Cost shall be calculated using farm area and input-cost assumptions.

Resource usage shall be calculated using crop and water settings. fileciteturn0file0L72-L84

### 8.3 Simulation Principles

The simulator shall:

- Use transparent assumptions.
- Display relevant weights/assumptions.
- Avoid presenting simulated values as guaranteed real-world yield.
- Keep the simulation model modular.
- Allow future integration of agricultural datasets or ML models.

---

## 9. Scenario Example

### Baseline — Scenario A: Normal

Conditions:

- Adequate water
- Normal weather
- On-time planting
- Normal input cost

Interpretation:

- Reference / baseline

### Scenario B: Water Stress

Conditions:

- Low water
- Normal weather
- On-time planting
- Normal input cost

Interpretation:

- Lower expected outcome
- Higher risk

### Scenario C: Delayed & Costly

Conditions:

- Low water
- Poor weather
- Delayed planting
- High input cost

Interpretation:

- Higher risk
- Higher estimated cost
- Lower expected outcome

Source: fileciteturn0file0L85-L99

---

## 10. Output Metrics

Every simulated scenario should provide, where applicable:

1. **Estimated Cost**
2. **Expected Yield / Outcome**
3. **Water / Resource Usage**
4. **Risk Score**
5. **Risk Level**
6. **Outcome Score**
7. **Major Contributing Factors**

Risk should be represented numerically and/or through:

- Low
- Medium
- High

The MVP requires cost estimation, expected-yield/outcome estimation, resource usage, risk classification, scenario comparison, charts and explainable reasons. fileciteturn0file0L119-L130

---

## 11. Explainability / Reasoning

The simulator shall include a reasoning panel that answers:

> “Why did this scenario change?”

The system should identify the major variables responsible for differences between scenarios.

Examples of explainable factors:

- Lower water availability increased risk.
- Poor weather reduced the expected outcome.
- Delayed planting negatively affected the outcome.
- Higher input costs increased estimated cost.

The purpose is to show a clear cause-and-effect chain rather than only presenting a final score. fileciteturn0file0L142-L161

---

## 12. Dashboard & UI Requirements

### 12.1 Dashboard

Display:

- Active scenario
- Key indicators
- Summary of simulation results

### 12.2 Scenario Builder

Provide:

- Forms
- Sliders
- Dropdowns
- Parameter controls

for changing farming variables.

### 12.3 Scenario Cards

Display side-by-side summaries of scenarios.

### 12.4 Comparison Table

Compare:

- Cost
- Expected yield
- Water usage
- Risk
- Outcome score

### 12.5 Charts

The MVP should contain at least two useful charts.

Recommended visualizations from the source:

- Bar chart for cost/yield
- Radar or indicator view for risk/resources

### 12.6 Reasoning Panel

Show:

- Major contributing factors
- Why a scenario improved or worsened
- Differences between baseline and alternatives

### 12.7 Scenario History

Allow users to save and revisit scenarios during the current session.

Source: fileciteturn0file0L102-L109

---

## 13. Technology Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, Bootstrap, JavaScript |
| Backend | PHP |
| Database | MySQL |
| Development | VS Code + XAMPP |
| Charts | Chart.js |
| Optional Advanced Model | Python/Flask or separate ML service |

Source: fileciteturn0file0L110-L118

---

## 14. Database Requirements

Database persistence is optional for the MVP, but the proposed design contains the following tables.

### 14.1 `users`

| Field | Purpose |
|---|---|
| `id` | User identifier |
| `name` | User name |
| `email` | User email |
| `password` | Authentication credential |
| `role` | User role |

### 14.2 `scenarios`

| Field | Purpose |
|---|---|
| `id` | Scenario identifier |
| `user_id` | Associated user |
| `scenario_name` | Scenario name |
| `crop` | Selected crop |
| `water_level` | Water condition |
| `weather` | Weather condition |
| `planting_status` | Planting schedule |
| `input_cost` | Estimated input cost |
| `farm_area` | Cultivated area |
| `created_at` | Creation timestamp |

### 14.3 `simulation_results`

| Field | Purpose |
|---|---|
| `id` | Result identifier |
| `scenario_id` | Associated scenario |
| `estimated_cost` | Estimated cost |
| `expected_yield` | Expected yield |
| `resource_usage` | Resource usage |
| `risk_score` | Risk score |
| `outcome_score` | Outcome score |

Source: fileciteturn0file0L131-L139

---

## 15. MVP Scope — 24 Hours

The 24-hour MVP must prioritize:

- Farmer/user-friendly scenario input form
- Baseline scenario
- At least 2–3 alternative scenarios
- Rule-based simulation engine
- Cost estimation
- Expected-yield/outcome estimation
- Water/resource usage indicator
- Risk score / Low-Medium-High classification
- Scenario comparison table
- At least 2 useful charts
- Explainable reasons for scenario differences
- Responsive web interface

Source: fileciteturn0file0L119-L130

---

## 16. Evaluation-Metric Alignment

| Evaluation Metric | Product Implementation |
|---|---|
| Scenario Simulation Accuracy | Parameter changes directly affect the simulation through a defined and transparent model. |
| Decision Comparison Quality | Multiple scenarios are shown side-by-side using common metrics and charts. |
| Resource and Cost Analysis | Water/resource usage and estimated cost are calculated and visualized. |
| Risk Assessment | Risk score/level changes according to adverse conditions such as low water, poor weather and delayed planting. |
| Explainability | Major factors responsible for scenario differences are identified. |
| Interactive Adaptability | Users can change parameters and immediately re-run the simulation. |

Source: fileciteturn0file0L142-L156

---

## 17. Innovation / Differentiation

The project differentiates itself through:

1. **What-if simulation** instead of only displaying farming information.
2. **Multiple scenario comparison** before a real-world decision is made.
3. **Explainable results** showing which variables caused changes.
4. **Interactive visual decision support** for non-technical users.
5. **Modular architecture** that can later integrate weather APIs, soil data, market prices and ML models.

Source: fileciteturn0file0L157-L163

---

## 18. Future Scope

Potential future enhancements include:

- Real-time weather and rainfall API integration.
- Soil and crop-condition data through IoT sensors.
- Historical crop-yield datasets for model calibration.
- Machine-learning-based yield/risk prediction.
- Market-price and mandi-rate integration.
- Regional/language support, including Marathi.
- Mobile/PWA version for field use.
- Personalized recommendations based on farm history.

These are future-scope items and are not required for the 24-hour MVP. fileciteturn0file0L164-L172

---

## 19. Important Product Positioning

The project must be presented as a **decision-support simulator**, not as a system that guarantees future agricultural results.

The primary demo flow should clearly demonstrate:

```text
CHANGE INPUT
     ↓
SIMULATE
     ↓
COMPARE
     ↓
EXPLAIN
     ↓
SUPPORT DECISION
```

Source: fileciteturn0file0L173-L177

---

## 20. 24-Hour Development Plan

| Time | Task |
|---|---|
| Hour 0–2 | Finalize requirements, user flow, UI wireframe and simulation rules. |
| Hour 2–6 | Build frontend and scenario input form. |
| Hour 6–10 | Implement backend/database and scenario storage. |
| Hour 10–14 | Implement simulation engine and calculations. |
| Hour 14–17 | Build comparison dashboard and charts. |
| Hour 17–20 | Add explainability/reasoning and improve UX. |
| Hour 20–22 | Test multiple scenarios and edge cases. |
| Hour 22–24 | Polish UI, prepare demo, presentation and final submission. |

Source: fileciteturn0file0L180-L191

---

## 21. One-Minute Product Pitch

Farmers often make decisions using fixed assumptions, even though water, weather, planting time and input costs can change. The Agri Scenario & Decision Simulator lets a farmer create a baseline scenario, change important farming variables and instantly simulate alternative situations.

The system compares estimated cost, resource usage, risk and expected outcome using clear charts and explains the main factors behind the differences.

Instead of asking a farmer to commit resources first and learn the result later, the system provides a digital what-if environment to explore possible decisions before taking action. fileciteturn0file0L192-L199

---

## 22. Final Product Statement

We are building an interactive, explainable farming scenario simulator that helps users:

- Explore “what-if” situations.
- Compare alternative farming plans.
- Understand cost, resource and risk impacts.
- Evaluate estimated outcomes.
- Make more informed decisions before committing real agricultural resources.

Source: fileciteturn0file0L200-L204

---

## 23. MVP Acceptance Criteria

The MVP is considered complete when:

- [ ] A user can configure a farming scenario.
- [ ] A baseline scenario can be created.
- [ ] At least 2–3 alternative scenarios can be created.
- [ ] Changing parameters changes the simulation result.
- [ ] Estimated cost is calculated.
- [ ] Expected yield/outcome is calculated.
- [ ] Water/resource usage is displayed.
- [ ] Risk score/level is displayed.
- [ ] Scenarios can be compared side-by-side.
- [ ] At least two charts are available.
- [ ] The system explains major reasons behind differences.
- [ ] The interface is responsive.
- [ ] The simulator clearly communicates that results are estimates and not guaranteed agricultural predictions.
