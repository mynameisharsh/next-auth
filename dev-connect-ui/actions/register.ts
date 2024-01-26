"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "../schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const register = async (
  values: z.infer<typeof RegisterSchema>
): Promise<{ error?: string; success?: string }> => {
  const validator = RegisterSchema.safeParse(values);
  if (!validator.success) {
    return { error: "Invalid fields" };
  }

  const { email, name, password } = validator.data;

  const isAlreadyExist = await getUserByEmail(email);

  if(isAlreadyExist) {
    return {
      error: "User is already registered with email id"
    }
  }

  const hashedPassword: string = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword
    }
  })
  return { success: "User created successfully" };
};
