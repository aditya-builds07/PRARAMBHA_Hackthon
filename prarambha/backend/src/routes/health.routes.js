import { Router } from "express";
import { sendSuccess } from "../utils/response.js";

export const healthRouter = Router();

healthRouter.get("/health", (_request, response) => {
  sendSuccess(response, 200, { ok: true, status: "ok", service: "krishimitra-api" });
});
