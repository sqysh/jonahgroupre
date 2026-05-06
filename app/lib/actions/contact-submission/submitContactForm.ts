'use server'

import prisma from '@/prisma/client'
import { createLog } from '../log/createLog'

export async function submitContactForm(data: {
  firstName: string
  lastName: string
  email?: string
  phoneNumber?: string
  propertyType?: string
  priceRange?: string
  timeframe?: string
  subject: string
  message: string
}) {
  try {
    const submission = await prisma.contactSubmission.create({ data })

    await createLog({
      action: 'CONTACT_FORM_SUBMITTED',
      message: `${data.firstName} ${data.lastName} filled out a contact form`,
      entity: 'ContactSubmission',
      entityId: submission.id,
      metadata: {
        email: data.email,
        propertyType: data.propertyType,
        timeframe: data.timeframe
      }
    })

    return { success: true }
  } catch {
    return { success: false, error: 'Failed to submit' }
  }
}
