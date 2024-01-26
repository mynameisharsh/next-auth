"use server";

import * as z from "zod";

import { RegisterSchema } from "@/schemas";

export const register = async (
  values: z.infer<typeof RegisterSchema>
): Promise<{ error?: string; success?: string }> => {
  const validator = RegisterSchema.safeParse(values);
  if (!validator.success) {
    return { error: "Invalid fields" };
  }
  return { success: "Email sent!" };
};
