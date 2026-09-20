import { Router } from "express";
import { getAssumptions } from "../controllers/assumption.controller.js";

export const assumptionRouter = Router();

assumptionRouter.get("/assumptions", getAssumptions);
