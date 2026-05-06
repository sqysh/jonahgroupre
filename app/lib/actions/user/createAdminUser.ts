'use server'

import prisma from '@/prisma/client'
import { auth } from '../../auth'
import { createLog } from '../log/createLog'

export async function createAdminUser(email: string, firstName: string, lastName: string) {
  const session = await auth()
  if (!session || session.user.role !== 'SUPER_USER') {
    return { success: false, error: 'Unauthorized' }
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) return { success: false, error: 'A user with that email already exists.' }

    const user = await prisma.user.create({
      data: { email, firstName, lastName, role: 'ADMIN' }
    })

    const creator = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { firstName: true, lastName: true }
    })

    await createLog({
      action: 'USER_CREATED',
      message: `${creator?.firstName} ${creator?.lastName} created admin account for ${firstName} ${lastName}`,
      entity: 'User',
      entityId: user.id,
      metadata: { email, role: 'ADMIN', createdBy: session.user.id }
    })

    return { success: true }
  } catch {
    return { success: false, error: 'Failed to create user.' }
  }
}
