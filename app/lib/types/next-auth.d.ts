import { DefaultSession } from 'next-auth'
import { AdapterUser as BaseAdapterUser } from '@auth/core/adapters'
import { Role } from '@prisma/client'

declare module 'next-auth' {
  interface User {
    id: string
    role?: Role
  }

  interface Session {
    user: {
      id: string
      role?: Role
    } & DefaultSession['user']
  }
}

declare module '@auth/core/adapters' {
  interface AdapterUser extends BaseAdapterUser {
    role?: Role
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    userId?: string
    role?: Role
  }
}
