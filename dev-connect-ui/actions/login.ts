"use server";

import * as z from "zod";

import { LoginSchema } from "../schemas";
import { redirectDefaultURL } from "@/routes";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationURL } from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validator = LoginSchema.safeParse(values);
  if (!validator.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validator.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid Username or Password" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationURL(verificationToken.email, verificationToken.token);
    return { success: "Verification email sent!" };
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
