import { Router } from "express";
import { getComparison, postComparison } from "../controllers/comparison.controller.js";

export const comparisonRouter = Router();

comparisonRouter.get("/compare", getComparison);
comparisonRouter.post("/compare", postComparison);
