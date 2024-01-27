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
