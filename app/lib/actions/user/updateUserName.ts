'use server'

import prisma from '@/prisma/client'
import { auth } from '../../auth'

export async function updateUserName(firstName: string, lastName: string) {
  const session = await auth()
  if (!session) return { success: false, error: 'Unauthorized' }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { firstName, lastName }
  })

  return { success: true }
}
