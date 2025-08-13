import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: process.env.LOG_LEVEL == 'debug',
  providers: [GitHub],
  trustHost: true,
});
