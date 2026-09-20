import { Router } from "express";
import { postSimulation } from "../controllers/simulation.controller.js";
import { postSimulateAndSave } from "../controllers/simulation-save.controller.js";
import { postSimulationResult } from "../controllers/simulation-result.controller.js";

export const simulateRouter = Router();

simulateRouter.post("/simulate", postSimulation);
simulateRouter.post("/simulate-and-save", postSimulateAndSave);
simulateRouter.post("/simulation-results", postSimulationResult);
