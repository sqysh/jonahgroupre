import { ContactSubmissionEmailProps } from '@/app/types/contact-submission.types'

export const contactSubmissionTemplate = ({
  id,
  firstName,
  lastName,
  email,
  phoneNumber,
  propertyType,
  priceRange,
  timeframe,
  subject,
  message,
  createdAt
}: ContactSubmissionEmailProps) => {
  const submitted = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'America/New_York'
  }).format(createdAt ?? new Date())

  const propertyTypeLabel =
    propertyType === 'buy'
      ? 'Buying'
      : propertyType === 'sell'
        ? 'Selling'
        : propertyType === 'both'
          ? 'Buying &amp; Selling'
          : null

  const detailsBlock =
    propertyTypeLabel || priceRange || timeframe
      ? `
    <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
      <tr>
        ${
          propertyTypeLabel
            ? `<td style="padding-right: 32px; vertical-align: top; width: 33%;">
              <p style="margin: 0 0 4px 0; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: #71717a; font-weight: 600; font-family: 'Courier New', monospace;">Intent</p>
              <p style="margin: 0; font-size: 14px; font-weight: 600; color: #111111;">${propertyTypeLabel}</p>
            </td>`
            : ''
        }
        ${
          priceRange
            ? `<td style="padding-right: 32px; vertical-align: top; width: 33%;">
              <p style="margin: 0 0 4px 0; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: #71717a; font-weight: 600; font-family: 'Courier New', monospace;">Budget</p>
              <p style="margin: 0; font-size: 14px; font-weight: 600; color: #111111;">${priceRange}</p>
            </td>`
            : ''
        }
        ${
          timeframe
            ? `<td style="vertical-align: top; width: 33%;">
              <p style="margin: 0 0 4px 0; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: #71717a; font-weight: 600; font-family: 'Courier New', monospace;">Timeframe</p>
              <p style="margin: 0; font-size: 14px; font-weight: 600; color: #111111;">${timeframe}</p>
            </td>`
            : ''
        }
      </tr>
    </table>
    <div style="height: 1px; background: #e0e0e0; margin-bottom: 24px;"></div>
  `
      : ''

  const replyButton = email
    ? `<a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="display: inline-block; background: #65a30d; color: #ffffff; text-decoration: none; padding: 10px 20px; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; font-family: 'Courier New', monospace;">Reply to ${firstName}</a>`
    : ''

  const callButton = phoneNumber
    ? `<a href="tel:${phoneNumber}" style="display: inline-block; background: #ffffff; color: #111111; text-decoration: none; padding: 10px 20px; font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; font-family: 'Courier New', monospace; border: 1px solid #e0e0e0; margin-left: ${email ? '8px' : '0'};">Call ${firstName}</a>`
    : ''

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Submission — ${subject}</title>
  <style>
    @media only screen and (max-width: 480px) {
      .name-heading { font-size: 20px !important; }
      .message-text { font-size: 13px !important; }
      .cta-button   { padding: 10px 16px !important; font-size: 11px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 16px;">

    <!-- Header -->
    <div style="background: #111111; padding: 20px 32px; border-bottom: 4px solid #65a30d; margin-bottom: 0;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td>
            <p style="margin: 0; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: #65a30d; font-weight: 600; font-family: 'Courier New', monospace;">Century 21 North East</p>
            <p style="margin: 4px 0 0 0; font-size: 20px; font-weight: 700; color: #f0f0f0; line-height: 1.2;">New Contact Submission</p>
          </td>
          <td style="text-align: right; vertical-align: middle; white-space: nowrap;">
            <p style="margin: 0; font-size: 11px; color: #666666; font-family: 'Courier New', monospace;">${submitted}</p>
          </td>
        </tr>
      </table>
    </div>

    <!-- Body -->
    <div style="background: #ffffff; padding: 28px 32px;">

      <!-- Subject pill -->
      <div style="margin-bottom: 20px;">
        <span style="display: inline-block; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; color: #4d7c0f; background: #f0fdf4; padding: 4px 10px; border: 1px solid #bbf7d0; font-family: 'Courier New', monospace;">${subject}</span>
      </div>

      <!-- Name -->
      <p class="name-heading" style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700; color: #111111; line-height: 1.2;">${firstName} ${lastName}</p>

      <!-- Contact info -->
      <table role="presentation" style="border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          ${
            email
              ? `<td style="padding-right: 32px; padding-bottom: 8px; vertical-align: top;">
              <p style="margin: 0 0 2px 0; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #71717a; font-weight: 600; font-family: 'Courier New', monospace;">Email</p>
              <a href="mailto:${email}" style="font-size: 14px; color: #65a30d; text-decoration: none; font-weight: 500;">${email}</a>
            </td>`
              : ''
          }
          ${
            phoneNumber
              ? `<td style="padding-bottom: 8px; vertical-align: top;">
              <p style="margin: 0 0 2px 0; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #71717a; font-weight: 600; font-family: 'Courier New', monospace;">Phone</p>
              <a href="tel:${phoneNumber}" style="font-size: 14px; color: #65a30d; text-decoration: none; font-weight: 500;">${phoneNumber}</a>
            </td>`
              : ''
          }
        </tr>
      </table>

      <!-- Divider -->
      <div style="height: 1px; background: #e0e0e0; margin-bottom: 24px;"></div>

      <!-- Property details (conditional) -->
      ${detailsBlock}

      <!-- Message label -->
      <p style="margin: 0 0 10px 0; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: #71717a; font-weight: 600; font-family: 'Courier New', monospace;">Message</p>

      <!-- Message body -->
      <p class="message-text" style="margin: 0; font-size: 14px; line-height: 1.8; color: #444444; white-space: pre-wrap;">${message}</p>

    </div>

    <!-- CTA bar -->
    <div style="background: #f5f5f5; padding: 20px 32px; border-top: 1px solid #e0e0e0;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="vertical-align: middle;">
            ${replyButton}${callButton}
          </td>
          <td style="text-align: right; vertical-align: middle;">
            <p style="margin: 0; font-size: 10px; color: #9b9fa4; font-family: 'Courier New', monospace;">#${id.slice(-8).toUpperCase()}</p>
          </td>
        </tr>
      </table>
    </div>

    <!-- Footer -->
    <div style="background: #111111; padding: 16px 32px; border-top: 2px solid #65a30d;">
      <p style="margin: 0; font-size: 11px; color: #858585; line-height: 1.6;">
        This submission was received via jonahgroupre.com. Do not reply directly to this email.
      </p>
    </div>

  </div>
</body>
</html>`
}
