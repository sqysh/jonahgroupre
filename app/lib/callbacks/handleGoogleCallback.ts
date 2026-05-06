import { User as NextAuthUser, Account } from 'next-auth'
import prisma from '@/prisma/client'
import { createLog } from '../actions/log/createLog'

export async function handleGoogleCallback(user: NextAuthUser, account: Account): Promise<boolean> {
  if (!user.email) return false

  let existingUser = await prisma.user.findUnique({
    where: { email: user.email },
    select: { id: true, firstName: true, lastName: true, role: true }
  })

  if (!existingUser) {
    existingUser = await prisma.user.findFirst({
      where: { email: user.email },
      select: { id: true, firstName: true, lastName: true, role: true }
    })
  }

  if (!existingUser) {
    await createLog({
      action: 'USER_LOGIN_DENIED',
      message: `Sign-in attempted via Google — no account found for ${user.email}`,
      metadata: { email: user.email, reason: 'No account found' }
    })
    return false
  }

  if (!['SUPER_USER', 'ADMIN'].includes(existingUser.role)) {
    await createLog({
      action: 'USER_LOGIN_DENIED',
      message: `${existingUser.firstName} ${existingUser.lastName} was denied access — insufficient role`,
      entity: 'User',
      entityId: existingUser.id,
      metadata: { email: user.email, role: existingUser.role, reason: 'Insufficient role' }
    })
    return false
  }

  const existingAccount = await prisma.account.findFirst({
    where: { userId: existingUser.id, provider: 'google' }
  })

  if (!existingAccount) {
    await prisma.account.create({
      data: {
        userId: existingUser.id,
        type: account.type,
        provider: account.provider,
        providerAccountId: account.providerAccountId,
        access_token: account.access_token,
        expires_at: account.expires_at,
        id_token: account.id_token,
        refresh_token: account.refresh_token,
        scope: account.scope,
        token_type: account.token_type
      }
    })
  }

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { lastLoginAt: new Date(), emailVerified: new Date() }
  })

  user.id = existingUser.id

  await createLog({
    action: 'USER_LOGIN',
    message: `${existingUser.firstName} ${existingUser.lastName} signed in via Google`,
    entity: 'User',
    entityId: existingUser.id,
    metadata: { email: user.email, role: existingUser.role }
  })

  return true
}
