import rateLimit from "express-rate-limit";
import { sendError } from "../utils/response.js";

/**
 * General API Rate Limiter
 * Limits each IP to 200 requests per 15-minute window across standard API routes.
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_request, response) => {
    sendError(
      response,
      429,
      "RATE_LIMIT_EXCEEDED",
      "Too many requests from this IP. Please try again later."
    );
  },
});

/**
 * Strict Rate Limiter for Resource-Heavy Simulation Endpoints (DoS Risk mitigation)
 * Limits each IP to 30 requests per 1-minute window on heavy calculation routes.
 */
export const simulationLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_request, response) => {
    sendError(
      response,
      429,
      "SIMULATION_RATE_LIMIT_EXCEEDED",
      "Simulation rate limit exceeded. Heavy computing routes are limited to 30 requests per minute."
    );
  },
});
