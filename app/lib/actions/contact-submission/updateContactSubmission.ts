'use server'

import prisma from '@/prisma/client'
import { auth } from '../../auth'

export async function updateSubmissionStatus(id: string, status: string) {
  const session = await auth()
  if (!session) return { success: false, error: 'Unauthorized' }

  await prisma.contactSubmission.update({
    where: { id },
    data: { status }
  })

  return { success: true }
}
