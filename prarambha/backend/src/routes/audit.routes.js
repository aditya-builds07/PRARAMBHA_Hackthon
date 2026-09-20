import { Router } from "express";
import { getAudit } from "../controllers/audit.controller.js";

export const auditRouter = Router();

auditRouter.get("/audit", getAudit);
