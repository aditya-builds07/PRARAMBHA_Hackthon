import { Router } from "express";
import { getCrops } from "../controllers/crop.controller.js";

export const cropRouter = Router();

cropRouter.get("/crops", getCrops);
