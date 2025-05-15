import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).id = token.sub;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl; // Redirect to homepage after login
    },
  },
};

export default NextAuth(authOptions);