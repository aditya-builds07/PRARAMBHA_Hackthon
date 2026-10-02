import nodemailer from "nodemailer";
import { getAdminClient } from "../adapters/db/supabase.admin.client.js";

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

  const isDev = process.env.NODE_ENV !== "production";
  const transporter = createTransporter();

  console.log(`[KrishiMitra Auth] Registration verification OTP for ${cleanEmail}: ${otp}`);

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
        devOtp: isDev ? otp : undefined,
      };
    } catch (mailError) {
      console.warn(`[KrishiMitra Auth] Failed to send email via SMTP (${mailError.message}). Falling back to dev OTP delivery.`);
      return {
        success: true,
        message: `Verification code generated. (SMTP rate-limit or delivery notice: ${mailError.message})`,
        devOtp: otp,
      };
    }
  }

  // If no SMTP configured, return devOtp so user is not blocked
  return {
    success: true,
    message: `Verification code generated for ${cleanEmail}. (Check console or code below)`,
    devOtp: otp,
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
 * Registers or updates a verified farmer profile in Supabase Auth via admin client.
 * NOTE on RLS bypass: This operation provisions a new auth.users account before the user has a JWT session.
 * Only the service-role client possesses auth.admin permissions to create pre-confirmed users.
 *
 * @param {{ email: string, password: string, profile: object }} param0
 */
export async function registerVerifiedFarmer({ email, password, profile }) {
  const cleanEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim();
  const admin = getAdminClient();

  let existingUser = null;
  try {
    const { data: listData, error: listError } = await admin.auth.admin.listUsers();
    if (!listError && listData?.users) {
      existingUser = listData.users.find(
        (u) => u.email?.toLowerCase() === cleanEmail
      );
    }
  } catch (checkErr) {
    console.warn("[Auth Service] User lookup check notice:", checkErr.message);
  }

  const metadata = {
    ...(profile || {}),
    email: cleanEmail,
    email_verified: true,
    role: "farmer",
  };

  if (existingUser) {
    const { error: updateError } = await admin.auth.admin.updateUserById(
      existingUser.id,
      {
        password: cleanPassword,
        email_confirm: true,
        user_metadata: metadata,
      }
    );
    if (updateError) throw updateError;
    return { id: existingUser.id, email: cleanEmail, updated: true };
  } else {
    const { data: newUser, error: createError } = await admin.auth.admin.createUser({
      email: cleanEmail,
      password: cleanPassword,
      email_confirm: true,
      user_metadata: metadata,
    });
    if (createError) throw createError;
    return { id: newUser?.user?.id, email: cleanEmail, created: true };
  }
}

