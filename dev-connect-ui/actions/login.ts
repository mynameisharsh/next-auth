"use server";

import * as z from "zod";

import { LoginSchema } from "../schemas";
import { redirectDefaultURL } from "@/routes";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/token";
import { sendTwoFactorToken, sendVerificationURL } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/data/token";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validator = LoginSchema.safeParse(values);
  if (!validator.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, code } = validator.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid Username or Password" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationURL(verificationToken.email, verificationToken.token);
    return { success: "Verification email sent!" };
  }

  if (existingUser.isTwoFactorEnabled) {
    if (code) {
      const existing2FAToken = await getTwoFactorTokenByEmail(
        existingUser.email
      );
      if (!existing2FAToken) return { error: "Token is not valid" };
      const isExpired = new Date(existing2FAToken.expires) < new Date();

      if (isExpired) return { error: "Token is expired" };
      if (code !== existing2FAToken.token)
        return { error: "Token is not valid" };
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorToken(twoFactorToken.email, twoFactorToken.token);
      return { twoFactorAuthentication: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: redirectDefaultURL,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }

    throw error;
  }
};
