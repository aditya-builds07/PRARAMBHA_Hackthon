# PRARAMBHA 2.0 — Simulation Specification

**Author:** Member 1 — Simulation & Domain Engineer  
**Model Version:** `2.0.0`  
**Assumptions Version:** `2026.1`  

---

## 1. Overview & Versioning

The PRARAMBHA 2.0 Simulation Engine provides a deterministic numerical source of truth for agricultural scenario planning.

- **`MODEL_VERSION`**: `2.0.0`
- **`ASSUMPTIONS_VERSION`**: `2026.1`

---

## 2. Centralized Crop Parameters

Crop parameters are centralized in `prarambha/backend/src/simulation/crop.parameters.js` and retrieved via `getCropParameters(cropKey)`.

> **Disclaimer**: Crop parameter values are **illustrative simulation parameters** used for decision support and scenario comparison. They are not guaranteed agricultural predictions.

### Parameter Fields & Schema
- `crop`: Crop identifier key (e.g. `'wheat'`)
- `name`: Human-readable name (e.g. `'Wheat'`)
- `season`: Sowing season (`'rabi'`, `'kharif'`, `'annual'`)
- `potentialYield`: Base potential yield per acre in **quintals/acre** (q/acre)
- `pricePerUnit`: Reference price in **₹/quintal** (₹/q)
- `baseCostPerAcre`: Baseline production cost in **₹/acre**
- `waterRequirementMm`: Baseline crop water requirement stored in source unit **mm**
- `unit`: Yield measurement unit (`'quintal'`)

### Supported Crop Baseline Table

| Crop Key | Season | Potential Yield (q/acre) | Price (₹/q) | Base Cost (₹/acre) | Water Requirement (mm) | Unit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`wheat`** | Rabi | 16 | ₹2,400 | ₹24,000 | 450 mm | quintal |
| **`rice`** | Kharif | 22 | ₹2,300 | ₹32,000 | 1200 mm | quintal |
| **`maize`** | Kharif | 24 | ₹2,100 | ₹30,000 | 600 mm | quintal |
| **`sugarcane`** | Annual | 320 | ₹350 | ₹85,000 | 1800 mm | quintal |
| **`soybean`** | Kharif | 8 | ₹4,600 | ₹21,000 | 450 mm | quintal |
| **`cotton`** | Kharif | 8 | ₹7,000 | ₹34,000 | 700 mm | quintal |

---

## 3. Water Engine (`water.engine.js`)

The Water Engine computes crop water requirement, volumetric conversion, water availability factor, water drawn, and water productivity.

### 3.1 Unit Conversion
- **Source Unit**: Crop water requirement is stored in **mm**.
- **Conversion Factor**: $1 \text{ mm water depth / acre} = 4.046856 \text{ m}^3 / \text{acre}$ ($1 \text{ acre} = 4046.856 \text{ m}^2$).
- **Required Water Volume Formula**:
  $$\text{requiredWaterM3} = \text{waterRequirementMm} \times \text{areaAcres} \times 4.046856$$

### 3.2 Water Availability Factor (`waterFactor`)
- **Formula**:
  $$\text{waterFactor} = \text{clamp}\left(\frac{\text{waterAvailabilityPercent}}{100}, 0, 1\right)$$
- Linear scaling: $100\% \rightarrow 1.0$, $75\% \rightarrow 0.75$, $50\% \rightarrow 0.50$, $25\% \rightarrow 0.25$, $0\% \rightarrow 0.0$.
- **Monotonicity**: Increasing water availability can never reduce `waterFactor`.

### 3.3 Water Drawn (`waterDrawnM3`)
- **Formula**:
  $$\text{waterDrawnM3} = \text{requiredWaterM3} \times \text{waterFactor}$$
- Zero-water behavior: If `waterAvailabilityPercent` is 0%, `waterDrawnM3` is strictly `0`.

### 3.4 Water Productivity (`waterProductivityKgPerM3`)
- **Formula**:
  $$\text{waterProductivityKgPerM3} = \frac{\text{totalYieldKg}}{\text{waterDrawnM3}}$$
- **Zero-Drawn & Missing Yield Handling**: Returns `0` if `waterDrawnM3` is 0 or yield is 0/missing. Never returns `NaN` or `Infinity`. Returns `null` if `totalYieldKg` is `null`/`undefined`.

### 3.5 Irrigation System Handling
- Irrigation types (`'flood'`, `'sprinkler'`, `'drip'`) are accepted as inputs and preserved in the engine output object.
- **Statement**: Irrigation-efficiency multipliers are **not yet part of the approved MVP model**.

---

## 4. Yield Engine (`yield.engine.js`)

The Yield Engine computes weather factor, planting factor, per-acre yield, total yield, and uncertainty range.

> **Trust & Safety Notice**: Yield results are model-based estimates and are **never guaranteed predictions**.

### 4.1 Weather Factor (`weatherFactor`)
- **Deterministic Weather Values**:
  - `good` = `1.00` (Optimal weather conditions)
  - `normal` = `0.90` (Standard average weather)
  - `poor` = `0.65` (Adverse weather stress)
- **Monotonicity**: Poor weather can never improve yield ($\text{good} \ge \text{normal} \ge \text{poor}$).

### 4.2 Planting Factor (`plantingFactor`)
- **On-time / Early Planting**: `1.00` (neutral base factor, no artificial bonuses or penalties).
- **Delayed Planting Formula**:
  $$\text{plantingFactor} = \text{clamp}(1.0 - (\text{delayDays} \times 0.015), 0.4, 1.0)$$
- **Delay Penalty**: 1.5% reduction per day of delay, clamped strictly between $0.40$ and $1.00$.

### 4.3 Core Yield Formulas
$$\text{YieldPerAcre} = \text{PotentialYield} \times \text{WaterFactor} \times \text{WeatherFactor} \times \text{PlantingFactor}$$
$$\text{TotalYield} = \text{YieldPerAcre} \times \text{areaAcres}$$

### 4.4 Estimated Yield Uncertainty Range
$$\text{Low} = \text{TotalYield} \times 0.90$$
$$\text{High} = \text{TotalYield} \times 1.10$$
- Output structure contains `estimated: true` flag to ensure transparent labeling.

---

## 5. Financial Engine (`financial.engine.js`)

The Financial Engine computes base input costs, irrigation operational overheads, total cost, revenue, profit, and return on investment (ROI).

> **Disclaimer**: Financial outputs are estimates based on baseline crop parameters and user inputs. Negative profit is valid and represents an operating loss scenario.

### 5.1 Irrigation Operational Overhead Assumptions
- **Flood**: ₹0 / acre (standard baseline)
- **Sprinkler**: ₹1,200 / acre (pump & line operational overhead)
- **Drip**: ₹2,500 / acre (micro-irrigation maintenance overhead)
- **Formula**:
  $$\text{IrrigationCost} = \text{IrrigationCostPerAcre} \times \text{areaAcres}$$

### 5.2 Base Input Cost
$$\text{BaseCost} = \text{BaseCostPerAcre} \times \text{inputCostMultiplier} \times \text{areaAcres}$$

### 5.3 Total Cost
$$\text{TotalCost} = \text{BaseCost} + \text{IrrigationCost}$$

### 5.4 Revenue
$$\text{Revenue} = \text{TotalYieldQuintals} \times \text{PricePerQuintal}$$

### 5.5 Profit
$$\text{Profit} = \text{Revenue} - \text{TotalCost}$$
- **Loss Handling**: Negative profit is valid and is **not clamped to zero**.

### 5.6 Return on Investment (ROI)
$$\text{ROI} = \begin{cases} \frac{\text{Profit}}{\text{TotalCost}} \times 100 & \text{if } \text{TotalCost} > 0 \\ 0 & \text{if } \text{TotalCost} = 0 \end{cases}$$
- **Zero-Cost Behavior**: Returns `0` when `TotalCost` is 0. Never returns `NaN`, `Infinity`, or `-Infinity`.

---

## 6. Risk Engine (`risk.engine.js`)

The Risk Engine computes individual risk components, overall weighted risk score, and qualitative risk level classifications.

### 6.1 Approved Risk Component Weights
- **Water Risk**: 35% (`0.35`)
- **Weather Risk**: 20% (`0.20`)
- **Planting Risk**: 20% (`0.20`)
- **Financial Risk**: 25% (`0.25`)

### 6.2 Component Risk Formulas

#### Water Risk (`WaterRisk`)
$$\text{WaterRisk} = \text{clamp}((1 - \text{waterFactor}) \times 100, 0, 100)$$
- `waterFactor` = 1.0 $\rightarrow$ `WaterRisk` = 0
- `waterFactor` = 0.75 $\rightarrow$ `WaterRisk` = 25
- `waterFactor` = 0.50 $\rightarrow$ `WaterRisk` = 50
- `waterFactor` = 0.00 $\rightarrow$ `WaterRisk` = 100

#### Weather Risk (`WeatherRisk`)
$$\text{WeatherRisk} = \begin{cases} 10 & \text{if } \text{weather} = \text{'good'} \\ 30 & \text{if } \text{weather} = \text{'normal'} \\ 80 & \text{if } \text{weather} = \text{'poor'} \end{cases}$$

#### Planting Risk (`PlantingRisk`)
$$\text{PlantingRisk} = \min(100, \text{delayDays} \times 3.5)$$
- On-time/Early planting (0 days delay) $\rightarrow$ 0
- 10 days delay $\rightarrow$ 35
- 20 days delay $\rightarrow$ 70
- 30+ days delay $\rightarrow$ 100
- Early planting remains neutral (0 delay penalty).

#### Financial Risk (`FinancialRisk`)
$$\text{FinancialRisk} = \begin{cases} 0 & \text{if } \text{totalCost} \le 0 \\ 100 & \text{if } \text{profit} < 0 \\ 0 & \text{if } \text{profit} \ge 0 \end{cases}$$

> **MVP Simulation Assumption**: The binary financial risk rule ($\text{profit} < 0 \rightarrow 100$, otherwise $0$) is an explicit **MVP simulation assumption** designed for transparent score behavior in initial decision testing. It is not an external agricultural or financial industry standard and can be refined in future model iterations.

### 6.3 Overall Risk Calculation
$$\text{OverallRisk} = \text{clamp}(0.35 \times \text{WaterRisk} + 0.20 \times \text{WeatherRisk} + 0.20 \times \text{PlantingRisk} + 0.25 \times \text{FinancialRisk}, 0, 100)$$

### 6.4 Risk Level Boundaries
- **Low**: $\text{OverallRisk} < 35$
- **Medium**: $35 \le \text{OverallRisk} \le 65$
- **High**: $\text{OverallRisk} > 65$

Explicit boundary examples:
- `34.99` $\rightarrow$ `low`
- `35.00` $\rightarrow$ `medium`
- `65.00` $\rightarrow$ `medium`
- `65.01` $\rightarrow$ `high`

---

## 7. Decision Engine (`decision.engine.js`)

The Decision Engine computes a transparent **Decision Score** ($0\text{--}100$) by combining normalized Yield, Profit, and Safety indices using user-selected priority profiles.

> **Trust & Safety Notice**: Decision Score is a comparative scenario-planning score. It is **not a guaranteed agricultural recommendation**.

### 7.1 Approved Decision Profiles

| Profile Key | Aliases | Yield Weight | Profit Weight | Safety Weight |
| :--- | :--- | :---: | :---: | :---: |
| **`balanced`** *(Default)* | `'balanced'` | 35% (`0.35`) | 30% (`0.30`) | 35% (`0.35`) |
| **`max_profit`** | `'max_profit'`, `'max profit'`, `'maxProfit'` | 25% (`0.25`) | 50% (`0.50`) | 25% (`0.25`) |
| **`play_safe`** | `'play_safe'`, `'play safe'`, `'playSafe'` | 20% (`0.20`) | 20% (`0.20`) | 60% (`0.60`) |

All profile weights strictly sum to $1.0$. Alias strings are normalized via `normalizePriorityProfile()`.

### 7.2 Component Index Formulas

#### Yield Index (`YieldIndex`)
$$\text{YieldIndex} = \text{clamp}\left(\frac{\text{TotalYield}}{\text{PotentialYield} \times \text{AreaAcres}} \times 100, 0, 100\right)$$
- If area or potential yield is $\le 0$, missing, or non-finite: $\text{YieldIndex} = 0$.

#### Profit Index (`ProfitIndex`)
$$\text{ProfitIndex} = \text{clamp}\left(\frac{\text{ROI} + 100}{2}, 0, 100\right)$$
- $\text{ROI} = -100\% \rightarrow \text{ProfitIndex} = 0$
- $\text{ROI} = 0\% \rightarrow \text{ProfitIndex} = 50$
- $\text{ROI} = 50\% \rightarrow \text{ProfitIndex} = 75$
- $\text{ROI} = 100\% \rightarrow \text{ProfitIndex} = 100$
- If ROI is missing or non-finite: $\text{ProfitIndex} = 0$.

> **MVP Simulation Assumption**: Profit Index normalization uses ROI mapped linearly via $(\text{ROI} + 100)/2$. This is an explicit **MVP simulation assumption** to scale profit performance into $[0, 100]$ without area bias. It is not an agricultural or financial industry standard.

#### Safety Index (`SafetyIndex`)
$$\text{SafetyIndex} = \text{clamp}(100 - \text{OverallRisk}, 0, 100)$$
- $\text{OverallRisk} = 0 \rightarrow \text{SafetyIndex} = 100$
- $\text{OverallRisk} = 14 \rightarrow \text{SafetyIndex} = 86$
- $\text{OverallRisk} = 100 \rightarrow \text{SafetyIndex} = 0$
- If overall risk is missing or non-finite: $\text{SafetyIndex} = 0$.

### 7.3 Decision Score Formula
$$\text{DecisionScore} = \text{clamp}(\text{YieldWeight} \times \text{YieldIndex} + \text{ProfitWeight} \times \text{ProfitIndex} + \text{SafetyWeight} \times \text{SafetyIndex}, 0, 100)$$

### 7.4 Output Contract Structure
`calculateDecision(input)` returns a transparent breakdown object:
```json
{
  "priorityProfile": "balanced",
  "weights": {
    "yield": 0.35,
    "profit": 0.30,
    "safety": 0.35
  },
  "indices": {
    "yield": 100,
    "profit": 80,
    "safety": 86
  },
  "decisionScore": 89.1
}
```

---

## 8. Attribution Engine (`attribution.engine.js`)

The Attribution Engine compares baseline and alternative simulation scenarios to provide transparent, traceable explanations for decision changes (powering the simulator's "Why?" panel).

> **Important Limitation & Causal Disclaimer**: Attribution identifies changed inputs and associated measurable output differences. It **does not claim exact isolated causal contribution** when multiple inputs change simultaneously.

### 8.1 Delta Convention
$$\text{delta} = \text{alternative} - \text{baseline}$$
- $\text{delta} > 0 \rightarrow \text{direction} = \text{'increase'}$
- $\text{delta} < 0 \rightarrow \text{direction} = \text{'decrease'}$
- $\text{delta} = 0 \rightarrow \text{direction} = \text{'unchanged'}$
- Categorical string differences $\rightarrow \text{direction} = \text{'changed'}$ or $\text{'unchanged'}$

### 8.2 Traceable Model Pathways

1. **Water Pathway**:
   $$\text{waterAvailabilityPercent} \rightarrow \text{waterFactor} \rightarrow \text{waterDrawnM3} / \text{totalYield} \rightarrow \text{waterRisk} / \text{profit} \rightarrow \text{decisionScore}$$

2. **Weather Pathway**:
   $$\text{weather} \rightarrow \text{weatherFactor} \rightarrow \text{totalYield} \rightarrow \text{revenue} \rightarrow \text{profit} / \text{weatherRisk} \rightarrow \text{decisionScore}$$

3. **Planting Pathway**:
   $$\text{delayDays} \rightarrow \text{plantingFactor} \rightarrow \text{totalYield} \rightarrow \text{revenue} \rightarrow \text{profit}$$
   $$\text{delayDays} \rightarrow \text{plantingRisk} \rightarrow \text{overallRisk} \rightarrow \text{safetyIndex} \rightarrow \text{decisionScore}$$

4. **Financial Pathway**:
   $$\text{inputCostMultiplier} \rightarrow \text{baseCost} \rightarrow \text{totalCost} \rightarrow \text{profit} \rightarrow \text{ROI} \rightarrow \text{profitIndex} \rightarrow \text{decisionScore}$$
   *(Architectural Invariant: `inputCostMultiplier` changes affect costs/profit but MUST NOT alter `totalYield` or `yieldIndex`)*

5. **Irrigation Pathway**:
   $$\text{irrigation} \rightarrow \text{irrigationCost} \rightarrow \text{totalCost} \rightarrow \text{profit} \rightarrow \text{ROI} \rightarrow \text{decisionScore}$$
   *(Architectural Invariant: Under current MVP assumptions, changing irrigation system does NOT alter `waterFactor` or `waterDrawnM3`)*

6. **Decision Pathway**:
   $$\text{priorityProfile} \rightarrow \text{weights} \rightarrow \text{decisionScore}$$
   *(Architectural Invariant: Preference profile changes alone alter weights/score but MUST NOT change physical scenario outputs)*

### 8.3 MVP Technical Limitations
The engine is strictly deterministic and does NOT use:
- AI or Large Language Models (LLMs)
- Probabilistic causal inference or Bayesian networks
- Machine Learning (ML)
- External APIs or database queries

### 8.4 Output Contract Structure
`calculateAttribution({ baseline, alternative })` returns:
```json
{
  "baseline": { ... },
  "alternative": { ... },
  "changedInputs": [
    {
      "field": "waterAvailabilityPercent",
      "baseline": 100,
      "alternative": 75,
      "delta": -25,
      "direction": "decrease",
      "unit": "%"
    }
  ],
  "metricDeltas": [
    {
      "metric": "profit",
      "baseline": 40000,
      "alternative": 35000,
      "delta": -5000,
      "direction": "decrease",
      "unit": "INR"
    }
  ],
  "attributions": [
    {
      "category": "water",
      "changed": true,
      "drivers": [ ... ],
      "impacts": [ ... ]
    }
  ],
  "summary": {
    "changedInputCount": 1,
    "changedMetricCount": 1,
    "changedCategories": ["water"]
  }
}
```



