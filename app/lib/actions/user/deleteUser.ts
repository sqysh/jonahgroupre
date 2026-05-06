'use server'

import prisma from '@/prisma/client'
import { auth } from '../../auth'
import { createLog } from '../log/createLog'

export async function deleteUser(userId: string) {
  const session = await auth()
  if (!session || !['SUPER_USER', 'ADMIN'].includes(session.user.role ?? '')) {
    return { success: false, error: 'Unauthorized' }
  }

  // Prevent self-deletion
  if (userId === session.user.id) {
    return { success: false, error: 'You cannot delete your own account.' }
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { firstName: true, lastName: true, email: true, role: true }
    })

    if (!user) return { success: false, error: 'User not found.' }

    await prisma.user.delete({ where: { id: userId } })

    await createLog({
      action: 'USER_DELETED',
      message: `${session.user.id} deleted account for ${user.firstName} ${user.lastName}`,
      entity: 'User',
      entityId: userId,
      metadata: { email: user.email, role: user.role }
    })

    return { success: true }
  } catch {
    return { success: false, error: 'Failed to delete user.' }
  }
}
