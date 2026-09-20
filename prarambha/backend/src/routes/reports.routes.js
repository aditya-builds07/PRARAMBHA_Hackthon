import { Router } from "express";
import { getHistory } from "../controllers/history.controller.js";

export const reportRouter = Router();

reportRouter.get("/history", getHistory);
