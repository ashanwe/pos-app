import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { User as NextAuthUser } from "next-auth";

const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<NextAuthUser | null> {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        try {
          await connectToDatabase();

          const user = await User.findOne({
            username: credentials.username.toLowerCase(),
          });

          if (!user) {
            throw new Error("User not found");
          }

          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password as string
          );

          if (!isValidPassword) {
            throw new Error("Invalid password");
          }

          // Return user object that matches your extended User interface
          return {
            id: user.id.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            role: user.role,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          firstName: token.firstName,
          lastName: token.lastName,
          username: token.username,
          role: token.role,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
