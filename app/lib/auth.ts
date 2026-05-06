import prisma from '@/prisma/client'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { Role } from '@prisma/client'
import NextAuth from 'next-auth'
import googleProvider from './providers/googleProvider'
import { handleGoogleCallback } from './callbacks/handleGoogleCallback'

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: false,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60
  },
  adapter: PrismaAdapter(prisma),
  pages: { error: '/login' },
  providers: [googleProvider],

  callbacks: {
    async signIn({ user, account }) {
      switch (account?.provider) {
        case 'google':
          return handleGoogleCallback(user, account)
        default:
          return true
      }
    },

    async jwt({ token, user }) {
      if (!user?.id) return token

      const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: {
          id: true,
          role: true
        }
      })

      if (dbUser) {
        token.userId = dbUser.id
        token.role = dbUser.role
      }

      return token
    },

    async session({ session, token }) {
      if (token.userId && typeof token.userId === 'string') {
        session.user.id = token.userId
        session.user.role = token.role as Role
      }
      return session
    }
  }
})
