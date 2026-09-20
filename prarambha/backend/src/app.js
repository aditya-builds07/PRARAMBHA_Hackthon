import "./config/loadEnv.js";
import cors from "cors";
import express from "express";
import { securityHeaders } from "./middleware/securityHeaders.middleware.js";
import { globalErrorHandler } from "./middleware/errorHandler.middleware.js";
import { assumptionRouter } from "./routes/assumptions.routes.js";
import { comparisonRouter } from "./routes/compare.routes.js";
import { cropRouter } from "./routes/crops.routes.js";
import { farmRouter } from "./routes/farms.routes.js";
import { scenarioRouter } from "./routes/scenarios.routes.js";
import { simulateRouter } from "./routes/simulate.routes.js";
import { resourceRouter } from "./routes/resources.routes.js";
import { recommendationRouter } from "./routes/recommendations.routes.js";
import { reportRouter } from "./routes/reports.routes.js";
import { healthRouter } from "./routes/health.routes.js";
import { weatherRouter } from "./routes/weather.routes.js";
import { auditRouter } from "./routes/audit.routes.js";
import { sendError } from './utils/response.js';
import { getAllowedCorsOrigins } from './config/environment.js';
import { apiLimiter } from './middleware/rate-limiter.middleware.js';

export function createApp(options = {}) {
  const app = express();

  // Disable technology footprint disclosure
  app.disable("x-powered-by");

  // V7: Standard Security HTTP Headers via Helmet (CSP, HSTS, X-Frame-Options, X-Content-Type-Options)
  app.use(securityHeaders);

  // V5: Strict CORS Policy
  const allowedOrigins = getAllowedCorsOrigins();
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        }
        return callback(new Error(`CORS policy does not allow access from origin: ${origin}`));
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.use(express.json({ limit: "100kb" }));

  // V6: Rate limiting across /api
  app.use("/api", apiLimiter);

  app.use("/api", healthRouter);
  app.use("/api", cropRouter);
  app.use("/api", assumptionRouter);
  app.use("/api", comparisonRouter);
  app.use("/api", farmRouter);
  app.use("/api", scenarioRouter);
  app.use("/api", simulateRouter);
  app.use("/api", resourceRouter);
  app.use("/api", recommendationRouter);
  app.use("/api", reportRouter);
  app.use("/api", weatherRouter);
  app.use("/api", auditRouter);

  // Optional extension hook for test routes before 404 handler
  if (typeof options?.configure === "function") {
    options.configure(app);
  }

  // 404 Route Handler
  app.use((_request, response) => {
    sendError(response, 404, 'NOT_FOUND', 'The requested API route does not exist.');
  });

  // V8: Centralized Error Handler preventing database error & stack trace leakage + CORS errors
  app.use((error, _request, response, next) => {
    if (error.message?.includes("CORS policy")) {
      return sendError(response, 403, "CORS_FORBIDDEN", error.message);
    }
    return globalErrorHandler(error, _request, response, next);
  });

  return app;
}
