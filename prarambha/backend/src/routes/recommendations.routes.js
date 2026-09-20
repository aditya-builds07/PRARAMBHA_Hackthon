import { Router } from "express";
import { postRecommendations } from "../controllers/recommendation.controller.js";

export const recommendationRouter = Router();

recommendationRouter.post("/recommendations", postRecommendations);
