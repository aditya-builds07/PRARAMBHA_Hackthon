import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "../../src/app.js";

describe("Authentication & OTP Verification Endpoints", () => {
  const app = createApp();

  it("POST /api/auth/send-otp rejects missing or invalid email", async () => {
    const res = await request(app)
      .post("/api/auth/send-otp")
      .send({ email: "invalid-email" });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("POST /api/auth/send-otp dispatches OTP without exposing the code in the response", async () => {
    const testEmail = "farmer.verify.test@example.com";
    const res = await request(app)
      .post("/api/auth/send-otp")
      .send({ email: testEmail, fullName: "Test Farmer" });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    // Security check: OTP code must NEVER be exposed in response body
    expect(res.body.devOtp).toBeUndefined();
    expect(res.body.otp).toBeUndefined();
  });

  it("POST /api/auth/verify-and-register rejects invalid OTP", async () => {
    const testEmail = "farmer.verify.test2@example.com";
    await request(app)
      .post("/api/auth/send-otp")
      .send({ email: testEmail, fullName: "Test Farmer" });

    // Attempt to verify with wrong OTP
    const res = await request(app)
      .post("/api/auth/verify-and-register")
      .send({
        email: testEmail,
        otp: "000000",
        password: "securePassword123",
        profile: { full_name: "Test Farmer" },
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain("Invalid verification code");
  });
});
