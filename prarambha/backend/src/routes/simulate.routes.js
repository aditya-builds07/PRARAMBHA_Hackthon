import { Router } from "express";
import { postSimulation } from "../controllers/simulation.controller.js";
import { postSimulateAndSave } from "../controllers/simulation-save.controller.js";
import { postSimulationResult } from "../controllers/simulation-result.controller.js";
import { requireAuthenticatedUser } from "../middleware/authentication.middleware.js";
import { simulationLimiter } from "../middleware/rate-limiter.middleware.js";

export const simulateRouter = Router();

// All simulate endpoints require a valid user session (D5) and are rate-limited to mitigate DoS (V6).
simulateRouter.post("/simulate", simulationLimiter, requireAuthenticatedUser, postSimulation);
simulateRouter.post("/simulate-and-save", simulationLimiter, requireAuthenticatedUser, postSimulateAndSave);
simulateRouter.post("/simulation-results", simulationLimiter, requireAuthenticatedUser, postSimulationResult);
