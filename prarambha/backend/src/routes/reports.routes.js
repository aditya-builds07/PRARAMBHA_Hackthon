import { Router } from "express";
import { getHistory } from "../controllers/history.controller.js";
import { requireAuthenticatedUser } from "../middleware/authentication.middleware.js";

export const reportRouter = Router();

// Simulation history is tied to user-owned farms (D5).
reportRouter.get("/history", requireAuthenticatedUser, getHistory);
