"use server";

import { auth } from "@/auth";
import { UserRole } from "@prisma/client";

export const admin = async () => {
  const user = await auth();

  if (user?.user?.role === UserRole.ADMIN) {
    return { success: "Admin User" };
  } else {
    return { error: "Not Admin User" };
  }
};
