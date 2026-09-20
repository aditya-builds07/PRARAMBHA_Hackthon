import { Router } from "express";
import { getAudit } from "../controllers/audit.controller.js";
import { requireAuthenticatedUser } from "../middleware/authentication.middleware.js";

export const auditRouter = Router();

/**
 * GET /api/audit?farmId=<uuid>&limit=<n>
 * Returns recent audit log entries for a given farm.
 * Protected: requires a valid Supabase session token in the Authorization header.
 * The backend service role is used for the actual database query.
 */
auditRouter.get("/audit", requireAuthenticatedUser, getAudit);
