import cors from "cors";
import express from "express";
import { healthRouter } from "./routes/health.routes.js";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json({ limit: "100kb" }));
  app.use("/api", healthRouter);

  app.use((_request, response) => {
    response.status(404).json({
      error: {
        code: "NOT_FOUND",
        message: "The requested API route does not exist.",
      },
    });
  });

  return app;
}
