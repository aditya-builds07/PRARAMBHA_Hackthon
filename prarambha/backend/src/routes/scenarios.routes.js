import { Router } from "express";
import { getScenarios, postScenario } from "../controllers/scenario.controller.js";

export const scenarioRouter = Router();

scenarioRouter.get("/scenarios", getScenarios);
scenarioRouter.post("/scenarios", postScenario);
