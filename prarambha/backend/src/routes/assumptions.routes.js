import { Router } from "express";
import { getAssumptions } from "../controllers/assumption.controller.js";
import { requireAuthenticatedUser } from "../middleware/authentication.middleware.js";

export const assumptionRouter = Router();

// assumptions is read-only for any authenticated user (D3).
assumptionRouter.get("/assumptions", requireAuthenticatedUser, getAssumptions);
