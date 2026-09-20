import { Router } from "express";
import { getScenarioRecommendations, postRecommendations } from "../controllers/recommendation.controller.js";

export const recommendationRouter = Router();

recommendationRouter.post("/recommendations", postRecommendations);
recommendationRouter.get('/scenarios/:scenarioId/recommendations', getScenarioRecommendations);
