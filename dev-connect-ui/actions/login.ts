"use server";

import * as z from "zod";

import { LoginSchema } from "../schemas";
import { redirectDefaultURL } from "@/routes";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export const login = async (
  values: z.infer<typeof LoginSchema>
) => {
  console.log(values)
  const validator = LoginSchema.safeParse(values);
  if (!validator.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validator.data;
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
