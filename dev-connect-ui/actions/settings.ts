"use server";

import { auth } from "@/auth";
import { SettingsSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const save = async (values: z.infer<typeof SettingsSchema>) => {
  const validate = SettingsSchema.safeParse(values);
  if (!validate.success) {
    return { error: "Invalid Data" };
  }

  const { password, name, role, isTwoFactorEnabled } = validate.data;
  const userSession = await auth();

  const existingUser = await getUserByEmail(userSession?.user?.email ?? "");
  if (!existingUser) {
    return { error: "User does not exist" };
  }
  let hashedPassword = "";
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  } else {
    hashedPassword = existingUser.password || "";
  }

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      name,
      password: hashedPassword,
      isTwoFactorEnabled: isTwoFactorEnabled,
      role: role,
    },
  });

  return {
    success: "Settings Updated",
  };
};
