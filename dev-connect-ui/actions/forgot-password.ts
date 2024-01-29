"use server";

import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import { ForgotPasswordSchema } from "@/schemas";
import { generateForgotPasswordToken } from "@/lib/token";
import { sendForgotPasswordURL } from "@/lib/mail";

export const forgotPassword = async (
  value: z.infer<typeof ForgotPasswordSchema>
) => {
  const validator = ForgotPasswordSchema.safeParse(value);
  if (!validator.success) return { error: "Email is required" };
  const { email } = validator.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) return { error: "User with email does not exist" };

  const token = await generateForgotPasswordToken(email);
  await sendForgotPasswordURL(token.email, token.token);
  return { success: "Email sent" };
};
