import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";

export default {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
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
