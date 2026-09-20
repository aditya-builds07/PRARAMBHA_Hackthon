
# Clean Resource Library

React + Vite ? Node.js + Express ? Supabase

## 1. Final Technology Stack

Technology
What it is
Why PRARAMBHA uses it
React
JavaScript library for building user interfaces.
Builds the farmer dashboard, simulator and marketplace screens.
Vite
Fast development/build tool for modern web applications.
Runs the React project locally and creates the production frontend build.
Node.js
JavaScript runtime that runs JavaScript outside the browser.
Runs the backend server.
Express.js
Lightweight web framework for Node.js.
Creates REST APIs such as weather, simulation, farms and marketplace APIs.
Supabase
Backend platform built around PostgreSQL.
Database, authentication, storage and application data.
PostgreSQL
Relational SQL database.
Stores farms, scenarios, results, products, sellers and RFQs through Supabase.
Tailwind CSS
Utility-first CSS framework.
Builds the responsive UI quickly.
shadcn/ui
Reusable React UI components.
Provides clean buttons, dialogs, forms, cards and other interface components.
Recharts
React charting library.
Displays scenario comparison, risk and financial charts.
Google Maps API
Google mapping service for web applications.
Shows farm location and map-based location selection.
Open-Meteo
Weather data API.
Provides forecast/weather context for the simulator.
OpenAI API
API for AI models.
Optional natural-language explanation and report/lab summaries.
Gemini API
Google AI API.
Optional AI summary/explanation; not required if OpenAI is used.
Tesseract OCR
Optical Character Recognition engine.
Extracts text and values from uploaded soil/lab reports.
Vitest
JavaScript/TypeScript testing framework.
Tests frontend logic and utility functions.

## 2. API Keys

Enter your own keys here when setting up the project. Never commit real keys to GitHub.
API
Key

Google Maps API Key
your_google_maps_api_key_here

ChatGPT API Key
your_openai_api_key_here

Supabase Project URL
https://supabase.com/dashboard/project/ltzpntlwnqkuzoybtwdg/settings/api-keys

Supabase Publishable Key
your_supabase_publishable_key_here

Supabase Secret Key
your_supabase_secret_key_here

maps Javascriptapi
your_google_maps_javascript_api_key_here

Geocoding api
your_google_geocoding_api_key_here

places api
your_google_places_api_key_here

## 3. Core Resources

Resource
Role
Required
VS Code
Primary development, debugging and project management.
YES
Open-Meteo
Weather forecast and agricultural weather context.
YES
Supabase
Database, authentication, storage and marketplace data.
YES
Google Maps
Farm location and map UI.
YES / PILOT
OpenAI / ChatGPT API
Optional AI explanations and summaries.
OPTIONAL
Gemini API
Optional AI explanations/summaries.
OPTIONAL
Tesseract OCR
Soil/lab report extraction.
OPTIONAL
data.gov.in / AGMARKNET
Indian agriculture and market data when needed.
OPTIONAL
ICAR / FAO
Agriculture and crop/water reference information.
REFERENCE

## 4. Marketplace Resources

* Supabase database - products, categories, sellers, customer inquiries and B2B RFQs.
* Supabase Storage - product images and uploaded documents.
* Seed/demo marketplace data - enough for the hackathon demonstration.
* The marketplace connects products to the simulator's required seeds, fertilizer, irrigation and other inputs.

## 5. Development Tools

Tool
Purpose
Use in PRARAMBHA
VS Code
Code editor/development environment.
Primary tool.
Antigravity
Agentic development environment.
Optional development assistant.
Codex
AI coding/refactoring assistant.
Optional development assistant only.

## 6. API Integration Pattern

React frontend ? Node.js/Express backend ? external APIs/services ? normalized data ? PRARAMBHA simulator.
Weather: React ? /api/weather ? Open-Meteo ? weather data ? simulator.
Maps: React ? Google Maps ? farm location ? latitude/longitude ? weather lookup.
AI: React ? Node.js backend ? OpenAI/Gemini ? explanation/summary. AI does not calculate the core simulation.

## 7. Official Resource Links

* React: https://react.dev/
* Vite: https://vite.dev/
* Node.js: https://nodejs.org/
* Express.js: https://expressjs.com/
* Supabase: https://supabase.com/
* Open-Meteo: https://open-meteo.com/en/docs
* Google Maps Platform: https://developers.google.com/maps
* OpenAI API: https://platform.openai.com/
* Gemini API: https://ai.google.dev/gemini-api
* Tesseract OCR: https://github.com/tesseract-ocr/tesseract
* Tailwind CSS: https://tailwindcss.com/
* shadcn/ui: https://ui.shadcn.com/
* Recharts: https://recharts.org/
* Vitest: https://vitest.dev/
