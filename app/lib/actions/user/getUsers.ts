'use server'

import prisma from '@/prisma/client'
import { auth } from '../../auth'

export async function getUsers() {
  const session = await auth()
  if (!session || !['SUPER_USER', 'ADMIN'].includes(session.user.role ?? '')) {
    return { success: false, error: 'Unauthorized', data: [] }
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return { success: true, data: users }
  } catch {
    return { success: false, error: 'Failed to fetch users.', data: [] }
  }
}
