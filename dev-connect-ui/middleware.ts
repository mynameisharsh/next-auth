import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  apiRoutePrefix,
  authRoutes,
  publicRoutes,
  redirectDefaultURL,
} from "./routes";
import { NextURL } from "next/dist/server/web/next-url";
export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // req.auth
  const nextURL: NextURL = req.nextUrl;
  const isLoggedIn: boolean = !!req.auth;
  const isAPIRoute: boolean = nextURL.pathname.startsWith(apiRoutePrefix);
  const isPublicRoute: boolean = publicRoutes.includes(nextURL.pathname);
  const isAuthRoute: boolean = authRoutes.includes(nextURL.pathname);

  if (isAPIRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(redirectDefaultURL, nextURL));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextURL));
  }

  return null;
});

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
