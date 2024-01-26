import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log("credentials", credentials);
        const dataValidator = LoginSchema.safeParse(credentials);
        if (!dataValidator.success) {
          return null;
        }
        const { email, password } = dataValidator.data;
        const user = await getUserByEmail(email);
        if (!user || !user.password) return null;
        const passwordMatcher = await bcrypt.compare(password, user.password);
        if (passwordMatcher) {
          return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
