import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationURL = async (email: string, token: string) => {
  const verificationLink = `http://localhost:3000/auth/verify-account?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify Account",
    html: `<p>Click on <a href="${verificationLink}">link</a> to verify your account.</p>`,
  });
};

export const sendForgotPasswordURL = async (email: string, token: string) => {
  const verificationLink = `http://localhost:3000/auth/new-password?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Change your password",
    html: `<p>Click on <a href="${verificationLink}">link</a> to change account password.</p>`,
  });
};

export const sendTwoFactorToken = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "2FA Code",
    html: `<p>Here is your 2FA token: ${token}.</p>`,
  });
};
