import cors from "cors";
import express from "express";
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

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json({ limit: "100kb" }));
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

  app.use((_request, response) => {
    sendError(response, 404, 'NOT_FOUND', 'The requested API route does not exist.');
  });

  app.use((error, _request, response, _next) => {
    console.error(error);
    sendError(response, 500, 'INTERNAL_SERVER_ERROR', 'The server could not complete the request.');
  });

  return app;
}
