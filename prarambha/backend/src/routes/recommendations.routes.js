import { Router } from "express";
import { getScenarioRecommendations, postRecommendations } from "../controllers/recommendation.controller.js";
import { requireAuthenticatedUser } from "../middleware/authentication.middleware.js";

export const recommendationRouter = Router();

// Recommendations are derived from user-owned simulation results (D5).
recommendationRouter.post("/recommendations", requireAuthenticatedUser, postRecommendations);
recommendationRouter.get('/scenarios/:scenarioId/recommendations', requireAuthenticatedUser, getScenarioRecommendations);
