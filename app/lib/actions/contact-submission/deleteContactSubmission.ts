'use server'

import prisma from '@/prisma/client'
import { auth } from '../../auth'
import { createLog } from '../log/createLog'

export async function deleteContactSubmission(id: string) {
  const session = await auth()
  if (!session || !['SUPER_USER', 'ADMIN'].includes(session.user.role ?? '')) {
    return { success: false, error: 'Unauthorized' }
  }

  try {
    const submission = await prisma.contactSubmission.findUnique({
      where: { id },
      select: { firstName: true, lastName: true }
    })

    if (!submission) return { success: false, error: 'Submission not found.' }

    await prisma.contactSubmission.delete({ where: { id } })

    await createLog({
      action: 'SUBMISSION_DELETED',
      message: `${session.user.id} deleted submission from ${submission.firstName} ${submission.lastName}`,
      entity: 'ContactSubmission',
      entityId: id
    })

    return { success: true }
  } catch {
    return { success: false, error: 'Failed to delete submission.' }
  }
}
