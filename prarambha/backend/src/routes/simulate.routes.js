import { Router } from "express";
import { postSimulationResult } from "../controllers/simulation-result.controller.js";

export const simulateRouter = Router();

simulateRouter.post("/simulation-results", postSimulationResult);
