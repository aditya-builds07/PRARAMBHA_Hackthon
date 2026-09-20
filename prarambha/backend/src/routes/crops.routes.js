import { Router } from "express";
import { getCrops } from "../controllers/crop.controller.js";
import { requireAuthenticatedUser } from "../middleware/authentication.middleware.js";

export const cropRouter = Router();

// crop_params is read-only for any authenticated user (D3).
cropRouter.get("/crops", requireAuthenticatedUser, getCrops);
