import { createLog } from '../actions/log/createLog'
import { getErrorMessage } from '../utils/_error.utils'
import { resend } from './resend'
import { contactSubmissionTemplate } from './templates/contact-submission.template'

interface ContactSubmissionEmailProps {
  id: string
  firstName: string
  lastName: string
  email?: string
  phoneNumber?: string
  propertyType?: string
  priceRange?: string
  timeframe?: string
  subject: string
  message: string
  createdAt?: Date
}

export async function sendContactSubmission(
  submission: ContactSubmissionEmailProps,
  to: string = process.env.RESEND_TO_EMAIL ?? 'eileen@jonahgroupre.com'
) {
  try {
    await resend.emails.send({
      from: `Jonah Group Real Estate <${process.env.RESEND_FROM_EMAIL}>`,
      to,
      subject: `New Contact: ${submission.firstName} ${submission.lastName} — ${submission.subject}`,
      html: contactSubmissionTemplate(submission)
    })
  } catch (error) {
    await createLog({
      action: 'CONTACT_FORM_SUBMITTED',
      message: 'Failed to send contact submission email',
      entity: 'ContactSubmission',
      entityId: submission.id,
      metadata: {
        email: submission.email,
        error: getErrorMessage(error)
      }
    })
  }
}
