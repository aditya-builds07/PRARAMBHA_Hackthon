import { Router } from "express";
import { deleteFarm, getFarm, getFarms, putFarm, postFarm } from "../controllers/farm.controller.js";
import { requireAuthenticatedUser } from '../middleware/authentication.middleware.js';

export const farmRouter = Router();

farmRouter.get("/farms", requireAuthenticatedUser, getFarms);
farmRouter.post("/farms", requireAuthenticatedUser, postFarm);
farmRouter.get('/farms/:id', requireAuthenticatedUser, getFarm);
farmRouter.put('/farms/:id', requireAuthenticatedUser, putFarm);
farmRouter.delete('/farms/:id', requireAuthenticatedUser, deleteFarm);
