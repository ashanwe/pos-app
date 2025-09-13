import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    firstName: string;
    lastName: string;
    username: string;
    role: string;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      username: string;
      role: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    role: string;
  }
}
