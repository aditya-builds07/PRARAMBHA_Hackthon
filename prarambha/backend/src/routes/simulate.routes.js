import { Router } from "express";
import { postSimulation } from "../controllers/simulation.controller.js";
import { postSimulateAndSave } from "../controllers/simulation-save.controller.js";
import { postSimulationResult } from "../controllers/simulation-result.controller.js";
import { requireAuthenticatedUser } from "../middleware/authentication.middleware.js";

export const simulateRouter = Router();

// All simulate endpoints require a valid user session (D5).
// /api/simulate remains stateless/pure — auth only verifies the caller; it does not store state.
simulateRouter.post("/simulate", requireAuthenticatedUser, postSimulation);
simulateRouter.post("/simulate-and-save", requireAuthenticatedUser, postSimulateAndSave);
simulateRouter.post("/simulation-results", requireAuthenticatedUser, postSimulationResult);
