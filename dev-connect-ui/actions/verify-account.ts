"use server";

import { getTokenByToken } from "@/data/token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";

export const verifyAccount = async (token: string | null) => {
  if (!token) return { error: "Token is not valid" };

  const verificationToken = await getTokenByToken(token);
  if (!verificationToken) return { error: "Token does not exist" };

  const isExpired = new Date(verificationToken?.expires) < new Date();

  if (isExpired) {
    return { error: "Token has expired! Please request new token." };
  }
  const existingUser = await getUserByEmail(verificationToken.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: verificationToken.email,
    },
  });

  await db.confirmationToken.delete({
    where: {
      id: verificationToken.id,
    },
  });

  return { success: "Email verified. Login to account." };
};
