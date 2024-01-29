"use server";

import { getForgotPasswordTokenByToken, getTokenByToken } from "@/data/token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const verifyResetPasswordToken = async (
  password: string,
  token: string | null
) => {
  if (!token) return { error: "Token is not valid" };

  const verificationToken = await getForgotPasswordTokenByToken(token);
  if (!verificationToken) return { error: "Invalid token" };

  const isExpired = new Date(verificationToken?.expires) < new Date();

  if (isExpired) {
    return { error: "Token has expired! Please request new token." };
  }
  const existingUser = await getUserByEmail(verificationToken.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      email: verificationToken.email,
      password: hashedPassword,
    },
  });

  await db.resetPasswordToken.delete({
    where: {
      id: verificationToken.id,
    },
  });

  return { success: "Password Changed. Login to account." };
};
