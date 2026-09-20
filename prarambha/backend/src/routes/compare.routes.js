import { Router } from "express";
import { getComparison } from "../controllers/comparison.controller.js";

export const comparisonRouter = Router();

comparisonRouter.get("/compare", getComparison);
