import { Router } from "express";
import { deleteScenario, getScenario, getScenarios, postScenario, putScenario } from "../controllers/scenario.controller.js";
import { requireAuthenticatedUser } from '../middleware/authentication.middleware.js';

export const scenarioRouter = Router();

scenarioRouter.get("/scenarios", requireAuthenticatedUser, getScenarios);
scenarioRouter.post("/scenarios", requireAuthenticatedUser, postScenario);
scenarioRouter.get('/scenarios/:id', requireAuthenticatedUser, getScenario);
scenarioRouter.put('/scenarios/:id', requireAuthenticatedUser, putScenario);
scenarioRouter.delete('/scenarios/:id', requireAuthenticatedUser, deleteScenario);
