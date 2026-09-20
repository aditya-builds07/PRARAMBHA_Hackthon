import cors from "cors";
import express from "express";
import { assumptionRouter } from "./routes/assumptions.routes.js";
import { comparisonRouter } from "./routes/compare.routes.js";
import { cropRouter } from "./routes/crop.routes.js";
import { farmRouter } from "./routes/farms.routes.js";
import { scenarioRouter } from "./routes/scenarios.routes.js";
import { simulateRouter } from "./routes/simulate.routes.js";
import { resourceRouter } from "./routes/resources.routes.js";
import { recommendationRouter } from "./routes/recommendations.routes.js";
import { reportRouter } from "./routes/reports.routes.js";
import { healthRouter } from "./routes/health.routes.js";

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

  app.use((_request, response) => {
    response.status(404).json({
      error: { code: "NOT_FOUND", message: "The requested API route does not exist." },
    });
  });

  app.use((error, _request, response, _next) => {
    console.error(error);
    response.status(500).json({
      error: { code: "INTERNAL_ERROR", message: "The server could not complete the request." },
    });
  });

  return app;
}
