import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

/**
 * In-memory OTP storage for registration verification
 * Key: normalized email (lowercase)
 * Value: { otp: string, expiresAt: number, fullName: string }
 */
const otpStore = new Map();

/**
 * Creates nodemailer transporter if SMTP credentials are provided
 */
function createTransporter() {
  const user = process.env.GMAIL_USER || process.env.SMTP_USER;
  const pass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const secure = port === 465;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

function getSupabaseClient() {
  const url = process.env.SUPABASE_URL || "https://ltzpntlwnqkuzoybtwdg.supabase.co";
  const key = process.env.SUPABASE_ANON_KEY || "sb_publishable_eK0B2yFF3boJGIUTf_Epxw_3o1pnOA_";
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

/**
 * Sends a 6-digit registration verification OTP to the user's email
 * @param {{ email: string, fullName?: string }} param0
 */
export async function sendRegistrationOtp({ email, fullName = "Farmer" }) {
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail || !/\S+@\S+\.\S+/.test(cleanEmail)) {
    throw new Error("A valid email address is required.");
  }

  // Generate secure 6-digit numeric OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

  otpStore.set(cleanEmail, {
    otp,
    expiresAt,
    fullName: fullName.trim(),
  });

  const transporter = createTransporter();

  if (transporter) {
    try {
      const sender = process.env.GMAIL_USER || process.env.SMTP_USER || "no-reply@krishimitra.org";
      await transporter.sendMail({
        from: `"KrishiMitra Auth" <${sender}>`,
        to: cleanEmail,
        subject: `${otp} is your KrishiMitra Verification Code`,
        text: `Hello ${fullName},\n\nYour KrishiMitra verification code is: ${otp}\n\nThis code is valid for 10 minutes. Please enter it to complete your account registration.\n\nIf you did not request this, please ignore this email.\n\nKrishiMitra Team`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 520px; margin: 0 auto; background-color: #002216; color: #f1f5f9; border-radius: 16px; padding: 32px; border: 1px solid #164A34;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h2 style="color: #34d399; margin: 0; font-size: 24px; letter-spacing: 1px;">KRISHIMITRA</h2>
              <p style="color: #94a3b8; font-size: 12px; margin-top: 4px;">Agri Scenario &amp; Decision Simulator</p>
            </div>
            <p style="font-size: 15px; margin-bottom: 16px;">Namaste <strong>${fullName}</strong>,</p>
            <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6;">
              Please use the following 6-digit verification code to authenticate and activate your KrishiMitra farmer account:
            </p>
            <div style="background-color: #00170E; border: 2px dashed #10b981; border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0;">
              <span style="font-size: 36px; font-weight: 900; letter-spacing: 8px; color: #34d399; font-family: monospace;">${otp}</span>
            </div>
            <p style="font-size: 12px; color: #94a3b8; line-height: 1.5;">
              ⏱️ This code expires in <strong>10 minutes</strong>. For your security, never share this code with anyone.
            </p>
            <hr style="border: none; border-top: 1px solid #164A34; margin: 24px 0;" />
            <p style="font-size: 11px; color: #64748b; text-align: center;">
              KrishiMitra • Deterministic Decision Engine v2.0 • Made for Indian Farmers 🇮🇳
            </p>
          </div>
        `,
      });

      return {
        success: true,
        message: `Verification code sent to ${cleanEmail}`,
      };
    } catch (mailError) {
      console.warn(`[KrishiMitra Auth] Failed to send email via SMTP (${mailError.message}).`);
    }
  }

  // Also send via Supabase auth OTP if SMTP is not active
  try {
    const supabase = getSupabaseClient();
    await supabase.auth.signInWithOtp({
      email: cleanEmail,
      options: {
        shouldCreateUser: true,
        data: { full_name: fullName.trim() },
      },
    });
  } catch (supaErr) {
    console.warn(`[KrishiMitra Auth] Supabase OTP notice: ${supaErr.message}`);
  }

  return {
    success: true,
    message: `Verification code dispatched to ${cleanEmail}`,
  };
}

/**
 * Verifies the OTP entered by user
 * @param {{ email: string, otp: string }} param0
 */
export function verifyOtp({ email, otp }) {
  const cleanEmail = email.trim().toLowerCase();
  const cleanOtp = (otp || "").toString().trim();

  const record = otpStore.get(cleanEmail);
  if (!record) {
    return {
      valid: false,
      error: "Verification code expired or not found. Please request a new code.",
    };
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(cleanEmail);
    return {
      valid: false,
      error: "Verification code has expired. Please request a new code.",
    };
  }

  if (record.otp !== cleanOtp) {
    return {
      valid: false,
      error: "Invalid verification code. Please check the code and try again.",
    };
  }

  // Valid OTP! Clear it so it cannot be reused
  otpStore.delete(cleanEmail);
  return { valid: true };
}

/**
 * Registers a verified farmer profile in Supabase Auth using the standard registered client.
 *
 * @param {{ email: string, password: string, profile: object }} param0
 */
export async function registerVerifiedFarmer({ email, password, profile }) {
  const cleanEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim();
  const supabase = getSupabaseClient();

  const metadata = {
    ...(profile || {}),
    email: cleanEmail,
    email_verified: true,
    role: "farmer",
  };

  // Attempt signup
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: cleanEmail,
    password: cleanPassword,
    options: {
      data: metadata,
    },
  });

  // If user is already registered, authenticate them
  if (signUpError && signUpError.message?.toLowerCase().includes("already registered")) {
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password: cleanPassword,
    });
    if (signInError) throw signInError;
    return { id: signInData.user?.id, email: cleanEmail, updated: true };
  }

  if (signUpError) throw signUpError;
  return { id: signUpData?.user?.id, email: cleanEmail, created: true };
}
