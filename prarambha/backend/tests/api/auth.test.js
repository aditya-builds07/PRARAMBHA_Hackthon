import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "../../src/app.js";
import { verifyOtp } from "../../src/services/otp.service.js";

describe("Authentication & OTP Verification Endpoints", () => {
  const app = createApp();

  it("POST /api/auth/send-otp rejects missing or invalid email", async () => {
    const res = await request(app)
      .post("/api/auth/send-otp")
      .send({ email: "invalid-email" });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("POST /api/auth/send-otp successfully generates OTP code for valid email", async () => {
    const testEmail = "farmer.verify.test@example.com";
    const res = await request(app)
      .post("/api/auth/send-otp")
      .send({ email: testEmail, fullName: "Test Farmer" });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.devOtp).toBeDefined();
    expect(res.body.devOtp.length).toBe(6);

    // Verify OTP service directly
    const directVerify = verifyOtp({ email: testEmail, otp: res.body.devOtp });
    expect(directVerify.valid).toBe(true);
  });

  it("POST /api/auth/verify-and-register rejects invalid OTP", async () => {
    const testEmail = "farmer.verify.test2@example.com";
    // First generate OTP
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
