import { Router } from "express";
import { sendRegistrationOtp, verifyOtp, registerVerifiedFarmer } from "../services/otp.service.js";

const router = Router();

/**
 * POST /api/auth/send-otp
 * Generates and dispatches a 6-digit verification code to the given email address.
 */
router.post("/send-otp", async (req, res) => {
  try {
    const { email, fullName } = req.body || {};
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({
        success: false,
        error: "A valid email address is required.",
      });
    }

    const result = await sendRegistrationOtp({ email, fullName });
    return res.status(200).json(result);
  } catch (err) {
    console.error("[Auth Route] send-otp error:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "Failed to send verification code. Please try again.",
    });
  }
});

/**
 * POST /api/auth/verify-and-register
 * Validates the 6-digit OTP code, then registers and confirms the farmer in Supabase Auth.
 */
router.post("/verify-and-register", async (req, res) => {
  try {
    const { email, otp, password, profile } = req.body || {};

    if (!email || !otp || !password) {
      return res.status(400).json({
        success: false,
        error: "Email, OTP verification code, and password are all required.",
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (cleanPassword.length < 6) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 6 characters.",
      });
    }

    // 1. Verify OTP
    const verification = verifyOtp({ email: cleanEmail, otp });
    if (!verification.valid) {
      return res.status(400).json({
        success: false,
        error: verification.error,
      });
    }

    // 2. Register/Confirm User in Supabase Auth via Service
    await registerVerifiedFarmer({
      email: cleanEmail,
      password: cleanPassword,
      profile,
    });

    return res.status(200).json({
      success: true,
      message: "Account verified and registered successfully.",
    });
  } catch (err) {
    console.error("[Auth Route] verify-and-register error:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "Failed to complete account registration.",
    });
  }
});

export default router;
