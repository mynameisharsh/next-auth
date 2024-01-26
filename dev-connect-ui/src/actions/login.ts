"use server";

import * as z from "zod";

import { LoginSchema } from "@/schemas";

export const login = async (
  values: z.infer<typeof LoginSchema>
): Promise<{ error?: string; success?: string }> => {
  const validator = LoginSchema.safeParse(values);
  if (!validator.success) {
    return { error: "Invalid fields" };
  }
  return { success: "Email sent!" };
};
