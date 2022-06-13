import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '~/lib/prisma'

const useSecureCookies = Boolean(process.env.VERCEL_URL)

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  cookies: useSecureCookies
    ? {
        sessionToken: {
          name: `${useSecureCookies ? '__Secure-' : ''}next-auth.session-token`,
          options: {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            domain: '.nizipli.com',
            secure: useSecureCookies,
          },
        },
      }
    : undefined,
  pages: {
    signIn: '/auth/signin',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
})
