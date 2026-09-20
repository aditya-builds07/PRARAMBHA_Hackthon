import { Router } from "express";
import { getResources, postResource } from "../controllers/resource.controller.js";
import { getReadiness } from "../controllers/resource-readiness.controller.js";

export const resourceRouter = Router();

resourceRouter.get("/resources", getResources);
resourceRouter.post("/resources", postResource);
resourceRouter.get("/resources/:farmId/readiness", getReadiness);
