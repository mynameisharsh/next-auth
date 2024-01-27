import { db } from "@/lib/db";

export const getTokenByEmail = async (email: string) => {
  try {
    return await db.confirmationToken.findFirst({
      where: {
        email,
      },
    });
  } catch {
    return null;
  }
};

export const getTokenByToken = async (token: string) => {
  try {
    return await db.confirmationToken.findUnique({
      where: {
        token,
      },
    });
  } catch (error) {
    return null;
  }
};
