import NextAuth from "next-auth";

// prevents IDEs from removing the unused `NextAuth` import
NextAuth.name;

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context.
   * Session `user` should only contain immutable variables.
   */
  interface Session {
    access_token: string;
    refresh_token: string;
    user: {
      pk: number;
      username: string;
      email: string | null;
    },
  }
}