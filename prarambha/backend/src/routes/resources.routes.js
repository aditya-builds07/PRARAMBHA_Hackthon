import { Router } from "express";
import { getResources, postResource, putResource } from "../controllers/resource.controller.js";
import { getReadiness } from "../controllers/resource-readiness.controller.js";
import { requireAuthenticatedUser } from '../middleware/authentication.middleware.js';

export const resourceRouter = Router();

resourceRouter.get("/resources", requireAuthenticatedUser, getResources);
resourceRouter.post("/resources", requireAuthenticatedUser, postResource);
resourceRouter.get("/resources/:farmId/readiness", requireAuthenticatedUser, getReadiness);
resourceRouter.get('/farms/:farmId/resources/readiness', requireAuthenticatedUser, getReadiness);
resourceRouter.get('/resources/:farmId', requireAuthenticatedUser, getResources);
resourceRouter.put('/resources/:id', requireAuthenticatedUser, putResource);
