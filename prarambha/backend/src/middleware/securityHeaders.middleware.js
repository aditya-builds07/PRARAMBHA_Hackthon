import helmet from "helmet";

/**
 * ============================================================================
 * SECURITY HTTP HEADERS MIDDLEWARE (V7 — Helmet & Standard Security Headers)
 * ============================================================================
 * 
 * Implements standard security headers:
 * - Content-Security-Policy (CSP)
 * - X-Frame-Options: DENY
 * - X-Content-Type-Options: nosniff
 * - Strict-Transport-Security (HSTS) with includeSubDomains & preload
 * - Referrer-Policy: strict-origin-when-cross-origin
 * - Cross-Origin-Opener-Policy & Cross-Origin-Resource-Policy
 * - Disables X-Powered-By
 */
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      baseUri: ["'self'"],
      fontSrc: ["'self'", "https:", "data:"],
      formAction: ["'self'"],
      frameAncestors: ["'none'"],
      imgSrc: ["'self'", "data:", "https:"],
      objectSrc: ["'none'"],
      scriptSrc: ["'self'"],
      scriptSrcAttr: ["'none'"],
      styleSrc: ["'self'", "https:", "'unsafe-inline'"],
      upgradeInsecureRequests: [],
    },
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginOpenerPolicy: { policy: "same-origin" },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  frameguard: { action: "deny" },
  noSniff: true,
  xssFilter: true,
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  dnsPrefetchControl: { allow: false },
  ieNoOpen: true,
  permittedCrossDomainPolicies: { permittedPolicies: "none" },
});
