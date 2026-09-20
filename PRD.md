# PRD.md --- Agri Scenario & Decision Simulator

## 1. Product

**PRARAMBHA 2.0 --- Agri Scenario & Decision Simulator**

**Tagline:** Test the season before you sow it.

A transparent, explainable agricultural decision-support web app that
lets farmers compare farming plans before committing land, water,
inputs, and money. Results are estimates, not guaranteed predictions.
fileciteturn2file0L10-L20

## 2. Core User

Small/marginal farmers who need to understand trade-offs involving:

-   Water
-   Weather
-   Sowing timing
-   Irrigation
-   Input cost
-   Crop choice
-   Budget
-   Resource availability

## 3. Core Flow

``` text
Create / Select Farm
        ↓
Enter Farm + Crop Data
        ↓
Create Baseline
        ↓
Clone Scenario
        ↓
Modify Variables
        ↓
Run Simulation
        ↓
Compare 2–4 Scenarios
        ↓
Why Did It Change?
        ↓
Recommendations
        ↓
Resource + Cost Check
        ↓
Save / Report
```

## 4. MVP Requirements

### Farm

-   Create/select multiple farms.
-   Store area, region, crop cycle, water profile and resources.
-   Keep farm/scenario/result data isolated.

### Crops

P0: - Wheat - Rice - Maize

P1: - Sugarcane - Soybean - Cotton

Crop parameters must be configurable rather than hard-coded in UI.

### Scenario Inputs

``` json
{
  "farmId": "farm-001",
  "crop": "wheat",
  "areaAcres": 5,
  "sowingDate": "2026-10-15",
  "waterAvailabilityPercent": 100,
  "availableWaterM3": null,
  "weather": "normal",
  "planting": {
    "type": "on_time",
    "delayDays": 0
  },
  "inputCostMultiplier": 1.0,
  "irrigation": "flood",
  "priorityProfile": "balanced"
}
```

The logical contract must remain stable even if the transport format
changes. fileciteturn2file0L270-L289

## 5. Simulation

The MVP uses a deterministic, rule-based model. Every result must be
reproducible from inputs, crop parameters, assumptions and model
version. fileciteturn2file0L290-L301

### Yield

``` text
YieldPerAcre =
PotentialYield × WaterFactor × WeatherFactor × PlantingFactor

TotalYield = YieldPerAcre × Area
```

### Economics

``` text
Revenue = TotalYield × PricePerUnit

TotalCost =
(BaseCostPerAcre × InputCostMultiplier × Area)
+ IrrigationCost

Profit = Revenue - TotalCost

ROI = (Profit / TotalCost) × 100
```

### Risk

``` text
Risk =
35% WaterRisk
+ 20% WeatherRisk
+ 20% PlantingRisk
+ 25% FinancialRisk
```

Risk levels:

``` text
Low < 35
Medium 35–65
High > 65
```

### Decision Profiles

``` text
Balanced:   Yield 35% | Profit 30% | Safety 35%
Max Profit: Yield 25% | Profit 50% | Safety 25%
Play Safe:  Yield 20% | Profit 20% | Safety 60%
```

The selected profile must always be visible.
fileciteturn2file0L378-L404

## 6. Required Outputs

Every scenario must show:

-   Estimated yield per acre
-   Total yield
-   Yield range
-   Cost
-   Revenue
-   Profit
-   ROI
-   Water requirement
-   Water drawn
-   Water productivity
-   Water/weather/planting/financial risk
-   Overall risk
-   Decision score

All outputs require units and estimated-status labelling.
fileciteturn2file0L319-L345

## 7. Comparison

Support **2--4 scenarios**.

Required metrics:

``` text
Yield
Profit
Cost
ROI
Water
Water Productivity
Risk
Decision Score
```

Required charts:

1.  Cost / Revenue / Profit
2.  Risk comparison

Optional: - Yield range - Water productivity

fileciteturn2file0L442-L459

## 8. Why Panel

Show:

-   Changed factors
-   Yield impact
-   Profit impact
-   Water impact
-   Risk impact
-   Factor contributions
-   Controllable vs external factors

Controllable examples: - Planting - Irrigation - Water allocation -
Input purchasing - Crop choice

External examples: - Weather - Forecast conditions - Market conditions

fileciteturn2file0L460-L492

## 9. Recommendations

Recommendations must be rule-based and traceable.

Format:

``` text
Trigger
→ Observed condition
→ Impact
→ Suggested action
→ Reason
```

Main triggers:

-   Water stress
-   Delayed planting
-   High input cost
-   Poor weather
-   Negative profit
-   Low water productivity

fileciteturn2file0L493-L521

## 10. Resource & Cost Check

Show:

``` text
Required
Available
Gap
Status
```

Statuses:

-   Available
-   Shortage
-   Critical

Check budget, water, seed, fertilizer and selected inputs. This is a
readiness check, not a marketplace checkout.
fileciteturn2file0L522-L542

## 11. Required Screens

1.  Landing / Entry
2.  Farm Selection
3.  Scenario Builder
4.  Scenario Results
5.  Comparison
6.  Why Panel
7.  Recommendations
8.  Resource & Cost Check
9.  Assumptions
10. History
11. Report

fileciteturn2file0L583-L668

## 12. Trust & Safety

The UI must:

-   Label simulated results as estimates.
-   Show units.
-   Show assumptions and model version.
-   Show data quality.
-   Never present simulated yield as guaranteed.
-   Never let AI calculate or override the deterministic simulation.
-   Never hide uncertainty.

fileciteturn2file0L682-L697

## 13. MVP Scope Freeze

Do not make these critical MVP features:

-   Authentication
-   Weather API
-   Soil OCR
-   Maps
-   AI chat
-   Market-price API
-   Marketplace
-   Multi-language support
-   PDF export
-   FPO dashboard
-   IoT

Core simulator features must be complete first.
fileciteturn2file0L1313-L1329

## 14. Acceptance Criteria

The MVP is complete when:

-   Farm can be created.
-   Scenario inputs work.
-   Baseline simulation works.
-   Baseline can be cloned.
-   Live inputs update results without reload.
-   Yield range, economics, water and risk are shown.
-   2--4 scenarios can be compared.
-   At least two dynamic charts work.
-   Why panel works.
-   Assumptions are visible.
-   Resource shortages are identified.
-   Scenarios can be saved/reloaded.
-   Mobile works at 360px, 768px and 1440px.
-   No NaN/Infinity/impossible outputs appear.
-   Estimates are clearly labelled.

fileciteturn2file0L1353-L1379

## 15. Demo Flow

``` text
5-acre Wheat Farm
      ↓
Scenario A — Baseline
      ↓
Scenario B — Reduced Water
      ↓
Scenario C — Poor Weather + Delay + High Cost
      ↓
Compare
      ↓
Why Panel
      ↓
Scenario D — On-time + Drip + Controlled Cost
      ↓
Resource Check
      ↓
Assumptions
```

Finish with:

> This is decision support, not a guarantee.

fileciteturn2file0L1251-L1269
