export interface IContactSubmission {
  id: string
  firstName: string
  lastName: string
  email?: string | null
  phoneNumber?: string | null
  propertyType?: string | null
  priceRange?: string | null
  timeframe?: string | null
  subject: string
  message: string
  status: string
  source: string
  createdAt: Date
}
