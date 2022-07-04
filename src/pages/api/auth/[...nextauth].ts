import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { withSentry } from '@sentry/nextjs'

import { prisma } from '~/lib/prisma'
import { Role } from '~/graphql/types.generated'

const useSecureCookies = Boolean(process.env.VERCEL_URL)

export const authOptions: NextAuthOptions = {
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
  callbacks: {
    async session({ session, token, user }) {
      if (session.user) {
        session.user.id = user.id
        session.user.role = user.role as Role
      }

      return session
    },
  },
}

export const config = { api: { externalResolver: true } }
export default withSentry(NextAuth(authOptions))
