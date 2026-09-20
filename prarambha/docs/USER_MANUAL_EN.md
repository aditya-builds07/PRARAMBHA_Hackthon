# KrishiMitra (PRARAMBHA 2.0) — User Manual
**Agri Scenario & Decision Simulator**  
*Tagline: "Test the season before you sow it."*

---

## 1. Introduction & Overview

**KrishiMitra (PRARAMBHA 2.0)** is an explainable, transparent, and deterministic agricultural decision-support web platform designed for small and marginal farmers, agricultural extension officers, and farmer collectives. 

Before committing scarce land, water, seeds, fertilizers, and financial capital, KrishiMitra enables farmers to simulate, compare, and stress-test agricultural scenarios under diverse weather conditions, sowing dates, and irrigation choices.

> **Important Agricultural Disclaimer:**  
> KrishiMitra provides **decision support and predictive estimates, not guaranteed outcomes**. Farming yields and economic returns are influenced by real-world biological, climatic, and market dynamics. The simulator is designed to illuminate trade-offs and risks, allowing proactive planning rather than reactive losses.

---

## 2. Core User Workflow

The platform follows a natural 9-step decision cycle:

```text
1. Select or Create Farm Profile (Region, Soil, Area, Water Source)
               ↓
2. Choose Crop & Baseline Scenario (Wheat, Rice, Maize, Cotton, Soybean, Sugarcane)
               ↓
3. Configure Scenario Variables (Sowing date, Water %, Irrigation, Input costs, Weather)
               ↓
4. Run Instant Deterministic Simulation (Yield range, Profit, ROI, Risk metrics)
               ↓
5. Clone Scenarios & Test "What-If" Alternatives (e.g., Drought stress vs. Drip adoption)
               ↓
6. Compare 2 to 4 Scenarios Side-by-Side (Comparative economic & risk charts)
               ↓
7. Inspect the "Why Did It Change?" Panel (Attribution of controllable vs. external factors)
               ↓
8. Review Rule-Based Actionable Recommendations (Triggered agronomic remedies)
               ↓
9. Check Resource Readiness & Export Summary Report (Audit seeds, water, budget)
```

---

## 3. System Architecture & Quickstart Guide

### Prerequisites
- **Node.js**: Version 18.x or higher
- **Modern Web Browser**: Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari

### Running Locally

1. **Clone the Repository & Navigate to Workspace**:
   ```bash
   git clone https://github.com/aditya-builds07/PRARAMBHA_Hackthon.git
   cd PRARAMBHA_Hackthon/prarambha
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   cp .env.example .env     # Configure PORT (default: 5000), DB credentials if using Postgres
   npm run dev              # Runs Express API on http://localhost:5000
   ```

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   npm run dev              # Runs Vite dev server on http://localhost:5173
   ```

4. Open `http://localhost:5173` in your browser.

---

## 4. Feature-by-Feature User Guide

### 4.1. Farm Profile Selection & Management
- **Dashboard Navigation**: Access your registered farms from the **Farms** tab.
- **Farm Parameters**:
  - **Farm Name & Identifier**: (e.g., `Shri Ganesh Krishi Farm - Plot A`).
  - **Land Area**: Total cultivable acres (e.g., `4.0 Acres`).
  - **Soil Type**: Black Cotton Soil, Sandy Loam, Clay, Alluvial, Red Loam.
  - **Primary Water Source**: Borewell, Canal, Farm Pond (Shet-tale), Open Well.
  - **Existing Irrigation Setup**: Flood/Surface, Furrow, Drip, Sprinkler.

### 4.2. Scenario Builder & Live Parameter Adjustment
The scenario builder allows adjusting farming choices via intuitive sliders and toggles:

1. **Crop Selection**:
   - Primary supported crops: **Wheat (गेहू / गहू)**, **Rice / Paddy (भात / धान)**, **Maize (मका)**, **Cotton (कापूस)**, **Soybean (सोयाबीन)**, and **Sugarcane (ऊस)**.
2. **Sowing Date & Schedule**:
   - Select the planned sowing date.
   - Adjust the **Planting Delay Slider** (0 to 30 days). Delayed sowing automatically computes the heat stress or shortened grain-filling penalty.
3. **Water Availability & Irrigation Method**:
   - **Water Availability Slider**: Set from 20% (severe drought) to 120% (abundant canal supply).
   - **Irrigation Technique**: 
     - *Flood*: Standard water volume, higher evaporation loss.
     - *Drip*: 40–50% water savings, improved water productivity ($kg/m^3$).
     - *Sprinkler*: 25–30% water savings, optimal for undulating terrains.
4. **Input Cost Multiplier**:
   - Fine-tune fertilizer and seed expenses (from 0.8x to 1.5x) to model inflation or organic low-cost strategies.
5. **Weather Outlook**:
   - Select between **Normal Weather**, **Deficit / Drought**, or **Excessive Rainfall / Flooding**.
6. **Decision Profile**:
   - **Balanced** (Default): Equal emphasis on yield (35%), profit (30%), and risk protection (35%).
   - **Max Profit**: Optimized for commercial upside (50% profit weighting).
   - **Play Safe**: Prioritizes risk minimization and downside resilience (60% safety weighting).

### 4.3. Interpreting Simulation Results
Once variables are set, the deterministic simulation engine updates in real-time without page reload:
- **Yield Projection**:
  - *Yield per Acre* and *Total Farm Yield* (in Quintals).
  - *Yield Range*: Shows expected optimistic, nominal, and pessimistic bounds.
- **Economic Breakdown**:
  - *Gross Revenue (₹)*: Total yield multiplied by expected minimum support / market price.
  - *Total Cost of Cultivation (₹)*: Includes seeds, inputs, labor, and irrigation electricity.
  - *Net Estimated Profit (₹)*: Gross Revenue minus Total Costs.
  - *Return on Investment (ROI %)*: Net Profit divided by Total Cost.
- **Water Metrics**:
  - *Water Requirement vs. Water Drawn ($m^3$)*.
  - *Water Productivity*: Kilograms of harvest produced per cubic meter of water used ($kg/m^3$).
- **Multi-Factor Risk Score (0 to 100)**:
  - Aggregated risk calculated from Water Stress (35%), Weather Exposure (20%), Sowing Delay (20%), and Financial Risk (25%).
  - **Low Risk (< 35)**: Stable, resilient plan.
  - **Medium Risk (35 – 65)**: Moderate volatility; requires monitoring.
  - **High Risk (> 65)**: Fragile plan prone to catastrophic losses under stress.

### 4.4. Multi-Scenario Comparison (2 to 4 Scenarios)
- Compare multiple plans on a single screen (e.g., *Scenario A: Flood Irrigation Baseline* vs. *Scenario B: Drip Irrigation with Delayed Sowing*).
- **Interactive Visual Comparison Charts**:
  - **Economics Comparison**: Side-by-side grouped bars for Cost, Revenue, and Profit.
  - **Risk Heatmap & Radar**: Comparative visualization of Water, Weather, Planting, and Financial risks.
  - **Water Consumption Bar Chart**: Clear visibility into cubic meters of water saved.
- **System Recommendation Badge**: Automatically tags the scenario that best satisfies the active Decision Profile.

### 4.5. "Why Did It Change?" (Explainability Panel)
KrishiMitra never acts as an opaque "black box". The **Why Panel** breaks down exact mathematical causalities:
- **Yield Delta Drivers**: Shows whether a yield gain/loss was caused by irrigation efficiency, sowing timing, or rainfall deficits.
- **Controllable vs. External Factors**:
  - *Controllable*: Planting date, irrigation type, crop variety, fertilizer quantity.
  - *External*: Heatwaves, untimely rainfall, wholesale market price fluctuation.
- Helps the farmer answer: *"Why is Scenario B giving ₹25,000 more profit despite 20% less water?"*

### 4.6. Rule-Based Agronomic Recommendations
When critical risks or inefficiencies are detected, the system triggers traceable recommendations:
- **Format**:
  - **Trigger**: Detected condition (e.g., Water deficit > 30%).
  - **Impact**: Projected 18% yield drop and high financial risk.
  - **Suggested Remedy**: Switch from flood irrigation to drip irrigation or apply mulch.
  - **Reasoning**: Drip maintains root-zone moisture while cutting total water usage by 45%.

### 4.7. Resource & Cost Readiness Audit
Before purchasing inputs, verify whether current farm assets match the scenario's demands:
- **Tracked Assets**:
  - Available Working Capital / Cash in Hand (₹)
  - Stored or Allocated Water ($m^3$)
  - Seed Stocks in Bag / kg
  - Fertilizer Quantity (Urea, DAP, Potash)
- **Status Indicators**:
  - **Available (Green)**: Assets fully cover requirements.
  - **Shortage (Amber)**: Manageable shortfall; needs supplemental purchase.
  - **Critical (Red)**: Serious gap that will cause crop failure or insolvency if not addressed.

### 4.8. Assumptions, Model Transparency & Audit Trails
- **Assumption Drawer**: View all underlying constants (potential yields, baseline costs per acre, crop water coefficients $K_c$, crop base prices).
- **Model Version**: Fully tracked (e.g., `v2.0-deterministic`, assumptions release `2026.1`).
- **Audit Logs**: Comprehensive history of simulated scenario saves, clones, updates, and comparisons.

### 4.9. Saving, History & Generating Reports
- **Save & Clone**: Clone any existing scenario with one click to test small variations.
- **Scenario History**: Search scenarios by crop, sort by highest profit or lowest risk.
- **Clean Printable Report**: Click **Print / Export Report** to generate a clean, printer-friendly summary for bank loan applications, FPO advisory, or personal record keeping.

---

## 5. Frequently Asked Questions (FAQ)

**Q1: Does KrishiMitra guarantee the exact crop yield shown?**  
*No.* All outputs are deterministic scientific estimates based on agronomic formulas, baseline data, and user inputs. Weather anomalies and pest outbreaks may cause variations.

**Q2: Can I use KrishiMitra on a smartphone?**  
*Yes.* The entire application is fully responsive and optimized for mobile screens (360px+), tablets (768px+), and desktop monitors (1440px+).

**Q3: Can I run simulations without an active internet connection?**  
*Yes.* The frontend application includes an offline-capable mock calculation engine with in-memory persistence that operates smoothly even if backend connectivity drops.

---

*KrishiMitra (PRARAMBHA 2.0) — Empowering farmers with transparent, data-driven foresight before a single seed touches the soil.*
