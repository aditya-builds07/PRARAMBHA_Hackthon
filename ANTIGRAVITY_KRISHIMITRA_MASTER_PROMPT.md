# ANTIGRAVITY — KRISHIMITRA EXACT STITCH RECONSTRUCTION + FUNCTIONAL ANIMATIONS

You are working on the PRARAMBHA 2.0 KrishiMitra Agri Scenario & Decision Simulator.

I am giving you TWO visual reference sources:

1. The original Stitch screenshots/assets.
2. `STITCH_HTML_REFERENCE.md`, which contains the exact HTML source from every Stitch `code.html` in the design ZIP.

## ABSOLUTE PRIORITY

Do NOT redesign the website.

Do NOT create a "similar" design.

Do NOT create your own modern dashboard.

Reconstruct the Stitch design as closely as possible, then connect it to the existing KrishiMitra functionality.

The final React website should look like the Stitch screenshots when placed side-by-side.

The HTML reference is the visual implementation source of truth.

---

# 1. READ THE REFERENCE BEFORE CODING

Before changing code, read:

```text
STITCH_HTML_REFERENCE.md
```

It contains the exact HTML for:

- logo
- landing page
- farm dashboard
- plan results
- compare plans
- why did it change
- recommendations
- resource readiness
- reports/history
- mobile recommendations
- mobile resource readiness
- mobile reports/history

Also inspect the corresponding Stitch `screen.png` files if they are available in the workspace.

Also inspect the existing:

```text
DESIGN.md
PRD.md
TECH.md
Task_Distribution.md
```

Do not begin implementation until you understand the reference structure.

---

# 2. HOW TO USE THE HTML REFERENCE

The reference HTML is NOT a request to paste standalone HTML pages into the React app.

Instead:

```text
Exact Stitch HTML
        ↓
Understand exact DOM/layout/classes/styles
        ↓
Convert to reusable React components
        ↓
Preserve the same visual result
        ↓
Replace only demo/static data with real application data
        ↓
Add the actual KrishiMitra functionality
```

Do not reinterpret the layout.

Do not simplify it.

Do not replace it with a generic component library.

Do not "improve" the visual design away from Stitch.

---

# 3. DESIGN IS LOCKED

Treat these as locked unless a responsive or functional requirement makes a change necessary:

- colors
- typography
- font weights
- line heights
- card proportions
- spacing
- padding
- margins
- borders
- radius
- shadows
- sidebar
- navigation
- header composition
- chart composition
- button styles
- section ordering
- background treatment

If your preference differs from Stitch:

STITCH WINS.

If the existing website differs from Stitch:

STITCH WINS VISUALLY.

If Stitch demo data differs from the backend:

BACKEND WINS FOR DATA, STITCH WINS FOR PRESENTATION.

---

# 4. IMPORTANT: NO EMOJI

Do NOT use emoji anywhere in the production UI.

No emoji for:

- navigation
- buttons
- metrics
- recommendations
- resource status
- warnings
- headings
- empty states
- cards

Do not use emoji as icon fallbacks.

---

# 5. IMPORTANT: NO SVG

Do NOT use:

```text
<svg>
.svg files
inline SVG
SVG icon components
SVG logos
generated SVG
```

For icons, use the same Material Symbols font approach used by the Stitch HTML.

The Stitch HTML uses Material Symbols.

Use the corresponding Material Symbols names and styling.

For images, use raster assets only:

```text
PNG
JPG
JPEG
WEBP
```

Use the actual raster assets supplied by the design package where applicable.

Do not replace a Stitch icon with an unrelated icon library.

---

# 6. EXACT STITCH DESIGN SYSTEM

The reference HTML establishes the following core visual system.

Font:

```text
Plus Jakarta Sans
```

Core colors include:

```text
primary: #003320
primary-container: #164A34
secondary: #196C3E
secondary-container: #A1F1B7
background: #FBF9F3
surface: #FBF9F3
surface-container-low: #F5F3ED
surface-container: #F0EEE8
surface-container-high: #EAE8E2
surface-container-highest: #E4E2DD
on-surface: #1B1C18
on-surface-variant: #404943
outline: #717973
outline-variant: #C0C9C1
tertiary: #002F3D
tertiary-container: #00475A
error: #BA1A1A
```

Use the exact values from `STITCH_HTML_REFERENCE.md`.

Do not substitute approximate colors.

---

# 7. EXACT TYPOGRAPHY

Use the exact typography from the reference HTML.

Important reference values include:

```text
display-lg:
44px / 52px / 700

display-lg-mobile:
32px / 40px / 700

headline-lg:
32px / 40px / 700

headline-lg-mobile:
24px / 32px / 600

headline-md:
24px / 32px / 600

headline-sm:
20px / 28px / 600

title-lg:
18px / 26px / 600

title-md:
16px / 24px / 600

body-lg:
18px / 28px / 400

body-md:
16px / 24px / 400

body-sm:
14px / 20px / 400

label-lg:
14px / 20px / 600

label-md:
12px / 16px / 600

label-sm:
11px / 14px / 500
```

Do not randomly change typography per page.

---

# 8. EXACT PAGE IMPLEMENTATION

Implement these screens from their corresponding Stitch HTML:

```text
/
    Landing

/dashboard
    Farm Dashboard

/farms
    My Farms

/scenarios/new
    Scenario Builder

/scenarios/:id
    Scenario Results

/compare
    Compare Plans

/why
    Why Did It Change?

/recommendations
    Recommendations

/resources
    Resource Check / Readiness

/assumptions
    Model Assumptions

/history
    Scenario History

/report
    Printable Report
```

If the existing project already has compatible route names, preserve compatibility.

---

# 9. ONE CONSISTENT WEBSITE

Every internal page must feel like the same KrishiMitra application.

Reuse:

- same sidebar
- same header treatment
- same page container
- same card system
- same button system
- same typography
- same colors
- same spacing
- same status badges
- same icon system
- same footer
- same background

Only the content and active navigation state change.

Do NOT create a different visual system for Comparison, Why, Recommendations, Resources, or Reports.

---

# 10. LANDING PAGE

Reproduce the Stitch landing page exactly.

The root `/` must load the landing page first.

The main CTA must enter the real application flow.

Use the existing farm-selection/scenario workflow rather than inventing a new flow.

Do not load the dashboard at `/`.

---

# 11. DASHBOARD

Reproduce the exact Stitch dashboard structure.

Use actual backend data.

Do not hardcode Stitch example values as production data.

If data is unavailable, show a polished empty state using the same Stitch visual system.

Do not alter the layout merely because API data has a different shape.

Use frontend adapters/mappers where needed.

---

# 12. SCENARIO BUILDER

Use the Stitch visual language while preserving the actual scenario functionality.

Fields:

- crop
- area
- sowing date
- water availability
- weather
- planting
- irrigation
- input cost
- priority profile

Use the existing backend/simulation contracts.

Do not duplicate simulation calculations in React.

Primary action:

```text
Simulate Plan
```

---

# 13. SCENARIO RESULTS

Reproduce the Stitch Plan Results layout.

Connect actual simulation output:

- estimated yield
- revenue
- cost
- profit
- ROI
- water
- water productivity
- risk
- decision score

Keep the existing product requirement:

```text
Estimated — not guaranteed
```

Do not present model output as guaranteed.

---

# 14. COMPARE

Reproduce the exact Stitch Compare Plans composition.

Do not replace it with a generic table.

Use actual 2–4 scenario data.

Show the same categories and chart hierarchy as the Stitch reference.

Do not declare a universal winner.

Present trade-offs.

---

# 15. WHY DID IT CHANGE

Reproduce the Stitch Why screen.

Use actual attribution engine data.

Show:

- baseline
- alternative
- changed inputs
- metric deltas
- attribution
- explanation

Do not invent causal explanations.

---

# 16. RECOMMENDATIONS

Reproduce the Stitch Recommendations screen.

Use actual recommendation service output.

Keep the recommendation UI deterministic and traceable.

Do not turn it into a chatbot.

---

# 17. RESOURCE READINESS

Reproduce the Stitch Resource Check screen.

Use actual resource API data.

Show:

- required
- available
- gap
- status

for the resources supported by the project.

---

# 18. HISTORY / REPORT

Reproduce the Stitch Reports/Historical Audits design.

Do not turn it into a generic admin table.

Use actual historical scenario data.

Keep the same visual system.

---

# 19. MOBILE

Use the supplied mobile Stitch HTML/screens as the source of truth for:

- Recommendations
- Resource Readiness
- Reports/History

Infer the same responsive system for the other pages.

Test:

```text
360px
390px
412px
768px
1024px
1440px
```

No horizontal overflow.

Do not simply scale desktop down.

---

# 20. ANIMATIONS — ADD THEM WITHOUT CHANGING THE STITCH DESIGN

First make the static UI match Stitch.

Only then add motion.

Animations must be subtle and functional.

Use approximately:

```text
150–250ms
ease-out
```

unless the reference already specifies another behavior.

### Page transition

Use:

```text
opacity: 0 → 1
transform: translateY(6px) → translateY(0)
```

Do not use long transitions.

### Card hover

Use a subtle:

```text
translateY(-2px)
```

plus a slightly stronger shadow.

Do not change dimensions.

### Button interaction

Use a subtle pressed state.

### Tabs / segmented controls

Animate the active indicator or background very subtly.

### Modal / drawer

Use short opacity + scale/translate transitions.

### Charts

Use the existing chart library's entrance animation where available.

Do not install a new animation library unless absolutely necessary.

---

# 21. PROJECT-FEATURE ANIMATIONS

Animations should communicate actual application state.

Do NOT add decorative animations just for appearance.

Implement these:

### Scenario simulation

When the user presses:

```text
Simulate Plan
```

show a short deterministic processing state:

```text
Preparing scenario
→
Calculating yield
→
Calculating economics
→
Evaluating risk
→
Preparing result
```

Keep this fast.

Do not fake a long 5–10 second process.

The actual API/simulation result controls completion.

### Results reveal

When results arrive:

Reveal the existing Stitch result sections with subtle stagger:

```text
Yield
Economics
Water
Risk
Decision
```

Total animation should remain short.

### Comparison selection

When a scenario is selected:

Use a subtle highlight transition.

Do not rearrange the page.

### Why factors

When factor data loads:

Fade/slide the existing factor cards into view.

### Recommendations

Reveal recommendation cards in a short stagger.

### Resource readiness

Animate the progress/status indicators only when their real data loads.

Do not animate fake values.

---

# 22. DO NOT ADD EXCESSIVE ANIMATION

Forbidden unless explicitly present in Stitch:

- particles
- floating objects
- continuous background movement
- spinning cards
- large parallax effects
- 3D animation
- animated gradients everywhere
- excessive blur movement
- bouncing buttons

The product should feel calm and trustworthy.

---

# 23. REDUCED MOTION

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

When enabled:

- remove page transitions
- remove count-up effects
- remove stagger
- remove decorative motion
- keep state changes immediate

---

# 24. API / BACKEND SAFETY

Do not rewrite:

```text
backend/
simulation engines
database
Supabase
Member 1 implementation
Member 2 implementation
```

unless a genuine frontend integration issue requires a minimal compatible change.

Prefer frontend adapters.

Do not duplicate:

- yield calculations
- water calculations
- financial calculations
- risk calculations
- decision calculations
- attribution
- recommendations

---

# 25. ROUTING

Use the existing router.

Do not install a second routing system.

Verify:

```text
/
 /dashboard
 /farms
 /scenarios/new
 /scenarios/:id
 /compare
 /why
 /recommendations
 /resources
 /assumptions
 /history
 /report
```

Test:

- click navigation
- browser back
- browser forward
- refresh
- direct URL

---

# 26. NO DEAD BUTTONS

Audit every button.

Every visible button must either:

- perform a real action,
- navigate,
- submit a real form,
- open a real panel/modal,

or be intentionally disabled with a clear state.

Do not leave decorative fake buttons.

---

# 27. NO GENERIC UI COMPONENT REPLACEMENT

Do not replace the Stitch visual system with:

- generic shadcn defaults
- generic Material UI
- generic Bootstrap
- generic admin templates
- generic dashboard templates

If existing shadcn components are used, style them to reproduce Stitch exactly.

---

# 28. USE SHARED DESIGN TOKENS

Create one shared KrishiMitra design token layer for:

- colors
- typography
- spacing
- radius
- shadows
- transitions

All pages must use the same tokens.

---

# 29. MEANINGFUL COMMENTS ONLY

Add comments only where they explain non-obvious decisions.

Good:

```js
// Keep the result reveal tied to the real simulation response so animation
// never implies that a calculation has completed before the backend result exists.
```

Bad:

```js
// Render card
```

Do not add comments that simply repeat the JSX.

---

# 30. VISUAL QA — MANDATORY

After implementing each page:

1. Run the website.
2. Open the corresponding route.
3. Compare it with the Stitch screenshot.
4. Inspect spacing and computed styles.
5. Fix mismatches.
6. Re-render.
7. Repeat.

Do this for every page.

Do not assume the design is correct because the build succeeds.

---

# 31. FINAL VISUAL ACCEPTANCE

The final website should pass this test:

Place:

```text
Stitch screenshot
```

beside:

```text
Rendered React page
```

The following must visibly match:

- overall composition
- page width
- sidebar
- navigation
- header
- typography
- colors
- cards
- spacing
- buttons
- icons
- charts
- footer
- responsive behavior

Only the actual application data and functional behavior should differ.

---

# 32. SEARCH FOR FORBIDDEN UI

Before finishing, search the frontend source for:

```text
<svg
.svg
emoji characters
```

There must be:

```text
NO EMOJI
NO SVG
```

in the production UI.

Material Symbols font is allowed.

PNG/JPG/JPEG/WEBP are allowed.

---

# 33. BUILD / TEST

Run the existing project commands.

Do not introduce a new testing framework.

At minimum, if the scripts exist:

```bash
npm test
npm run build
```

Fix frontend-owned errors.

---

# 34. FINAL BROWSER TEST

Run the complete user flow:

```text
Landing
→ Start Planning
→ My Farms
→ Scenario Builder
→ Simulate
→ Results
→ Compare
→ Why
→ Recommendations
→ Resource Readiness
→ History
→ Report
```

Verify the UI remains visually consistent throughout.

---

# 35. FINAL RESPONSE

Report:

```text
Stitch reference loaded: YES/NO

Landing: MATCH / NEEDS FIX
Dashboard: MATCH / NEEDS FIX
Scenario Builder: MATCH / NEEDS FIX
Results: MATCH / NEEDS FIX
Comparison: MATCH / NEEDS FIX
Why: MATCH / NEEDS FIX
Recommendations: MATCH / NEEDS FIX
Resources: MATCH / NEEDS FIX
History: MATCH / NEEDS FIX
Report: MATCH / NEEDS FIX

Routing: PASS/FAIL
Animations: PASS/FAIL
Mobile: PASS/FAIL
Console: CLEAN/ERRORS
Build: PASS/FAIL

Emoji in UI: NONE
SVG in UI: NONE

Backend changed: NO/YES
Remaining visual differences:
...
```

## FINAL COMMAND

Do not make a new design.

Use `STITCH_HTML_REFERENCE.md` as the locked visual reference.

Reproduce the Stitch HTML's visual structure in React.

Then connect the real KrishiMitra functionality.

Then add subtle, functional animations.

Do not use emoji.

Do not use SVG.

Do not replace the Stitch design with a generic UI.

Do not stop when the build passes.

Run the application and visually verify every page.
