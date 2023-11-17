import { db } from "@/lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "username",
          type: "text",
          placeholder: "Your Username",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "Your Password",
        },
      },
      async authorize(credentials) {
        console.log("Received credentials:", credentials);

        console.log("Invalid credentials");

        if (!credentials?.username || !credentials?.password) {
          console.log("Missing username or password");
          return null;
        }

        const existingUser = await db.user.findUnique({
          where: { username: credentials?.username },
        });

        console.log("Existing user:", existingUser);

        if (!existingUser) {
          console.log("User not found");
          return null;
        }

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password
        );

        console.log("Password match:", passwordMatch);

        if (!passwordMatch) {
          console.log("Password does not match");
          return null;
        }

        return {
          id: `${existingUser.id}`,
          username: existingUser.username,
          email: existingUser.email,
        };
      },
    }),
  ],
};
