import { db } from '@/lib/db';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcrypt';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
export const options: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  pages: {
    signIn: '/login',
  }, //replacing the default login page provided by the auth with custom login page
  session: {
    strategy: 'jwt',
  }, //use token for storing the user deatil
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // authorization: {
      //   params: {
      //     prompt: 'consent',
      //     access_type: 'offline',
      //     response_type: 'code',
      //   },
      // },
    }), //use the google provider for sign in
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'username',
          type: 'text',
          placeholder: 'Your Username',
        },
        password: {
          label: 'password',
          type: 'password',
          placeholder: 'Your Password',
        },
      }, //use the username and password for login
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          // console.log("Missing username or password");
          return null;
        } //returning notting if detail is not provided

        const existingUser = await db.user.findUnique({
          where: { username: credentials?.username, isVerified: true },
        }); // if the user is verified through email and filtering user through username for finding the user is exist

        if (!existingUser) {
          console.log('User not found or Email is not verfied');
          return null;
        } //in case user is not varified or user is not founf

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password
        );
        //comparing the password user input and password while registering
        //compare method is provided by the bycrpt

        if (!passwordMatch) {
          console.log('Password does not match');
          return null;
        }

        return {
          id: `${existingUser.id}`,
          username: existingUser.username,
          email: existingUser.email,
          role: existingUser.role,
        }; //if user is found and email is verified
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    }, //returning token with user detail
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    }, //returning session with user detail
  },
};
