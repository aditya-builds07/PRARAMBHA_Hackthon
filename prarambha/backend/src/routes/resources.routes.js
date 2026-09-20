import { Router } from "express";
import { getResources, postResource } from "../controllers/resource.controller.js";

export const resourceRouter = Router();

resourceRouter.get("/resources", getResources);
resourceRouter.post("/resources", postResource);
