import { Router } from "express";
import { getComparison, postComparison } from "../controllers/comparison.controller.js";
import { requireAuthenticatedUser } from "../middleware/authentication.middleware.js";

export const comparisonRouter = Router();

// Comparison reads user-owned scenario results (D5).
comparisonRouter.get("/compare", requireAuthenticatedUser, getComparison);
comparisonRouter.post("/compare", requireAuthenticatedUser, postComparison);
