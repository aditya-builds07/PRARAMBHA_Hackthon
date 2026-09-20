import { Router } from "express";
import { deleteFarm, getFarms, putFarm, postFarm } from "../controllers/farm.controller.js";
import { requireAuthenticatedUser } from '../middleware/authentication.middleware.js';

export const farmRouter = Router();

farmRouter.get("/farms", requireAuthenticatedUser, getFarms);
farmRouter.post("/farms", requireAuthenticatedUser, postFarm);
farmRouter.put('/farms/:id', requireAuthenticatedUser, putFarm);
farmRouter.delete('/farms/:id', requireAuthenticatedUser, deleteFarm);
