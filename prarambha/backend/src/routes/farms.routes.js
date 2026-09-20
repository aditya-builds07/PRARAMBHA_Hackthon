import { Router } from "express";
import { getFarms, postFarm } from "../controllers/farm.controller.js";

export const farmRouter = Router();

farmRouter.get("/farms", getFarms);
farmRouter.post("/farms", postFarm);
