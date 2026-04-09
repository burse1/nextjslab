import NextAuth from "next-auth";

export const { auth } = NextAuth({
  providers: [],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const path = nextUrl.pathname;

      const isProtectedRoute =
        path.startsWith("/add-profile") ||
        path.startsWith("/edit-profile/");

      if (isProtectedRoute && !isLoggedIn) {
        return false;
      }

      return true;
    },
  },
});