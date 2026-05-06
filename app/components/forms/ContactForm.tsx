import { submitContactForm } from '@/app/lib/actions/contact-submission/submitContactForm'
import { Phone, Send, User, Mail, Home, DollarSign, Clock, MessageSquare } from 'lucide-react'
import { useState } from 'react'

const PROPERTY_TYPES = ['Residential', 'Condo', 'Multi-Family', 'Commercial', 'Land', 'Other']
const PRICE_RANGES = ['Under $300k', '$300k–$500k', '$500k–$750k', '$750k–$1M', 'Over $1M']
const TIMEFRAMES = ['ASAP', '1–3 months', '3–6 months', '6–12 months', 'Just exploring']

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  propertyType: '',
  priceRange: '',
  timeframe: '',
  subject: '',
  message: ''
}

export function ContactForm({ setSubmitted }: { setSubmitted: (submitted: boolean) => void }) {
  const [inputs, setInputs] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errors, setErrors] = useState<Partial<Record<keyof typeof initialForm, string>>>({})

  const validate = () => {
    const newErrors: Partial<Record<keyof typeof initialForm, string>> = {}

    if (!inputs.firstName.trim()) newErrors.firstName = 'First name is required.'
    if (!inputs.lastName.trim()) newErrors.lastName = 'Last name is required.'
    if (!inputs.email.trim()) {
      newErrors.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email)) {
      newErrors.email = 'Please enter a valid email address.'
    }
    if (!inputs.subject.trim()) newErrors.subject = 'Subject is required.'
    if (!inputs.message.trim()) {
      newErrors.message = 'Message is required.'
    } else if (inputs.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.'
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      // Scroll to first error
      const firstError = document.querySelector('[data-error="true"]')
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setErrors({})
    setSubmitting(true)
    setError(null)
    const result = await submitContactForm(inputs)
    if (result.success) {
      setSubmitted(true)
      setInputs(initialForm)
    } else {
      setError('Something went wrong. Please try again.')
    }
    setSubmitting(false)
  }

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setInputs((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof typeof initialForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const inputClass = `w-full bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark px-3 py-2.5 text-sm text-text-light dark:text-text-dark placeholder:text-placeholder-light dark:placeholder:text-placeholder-dark focus:border-primary-light dark:focus:border-primary-dark focus:outline-none transition-colors duration-200`
  const labelClass = `block text-xs uppercase font-semibold text-muted-light dark:text-muted-dark mb-1.5`
  const iconClass = `absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-light dark:text-muted-dark pointer-events-none`

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      className="flex flex-col gap-4"
    >
      {/* Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className={labelClass}>
            First Name{' '}
            <span aria-hidden="true" className="text-red-500">
              *
            </span>
          </label>
          <div className="relative">
            <User className={iconClass} aria-hidden="true" />
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              autoComplete="given-name"
              value={inputs.firstName}
              onChange={handleInput}
              placeholder="First name"
              aria-required="true"
              aria-invalid={!!errors.firstName}
              aria-describedby={errors.firstName ? 'firstName-error' : undefined}
              data-error={!!errors.firstName}
              className={`${inputClass} pl-9 ${errors.firstName ? 'border-red-500 focus:border-red-500' : ''}`}
            />
          </div>
          {errors.firstName && (
            <p id="firstName-error" role="alert" className="text-xs text-red-500 mt-1">
              {errors.firstName}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>
            Last Name{' '}
            <span aria-hidden="true" className="text-red-500">
              *
            </span>
          </label>
          <div className="relative">
            <User className={iconClass} aria-hidden="true" />
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              autoComplete="family-name"
              value={inputs.lastName}
              onChange={handleInput}
              placeholder="Last name"
              aria-required="true"
              aria-invalid={!!errors.lastName}
              aria-describedby={errors.lastName ? 'lastName-error' : undefined}
              data-error={!!errors.lastName}
              className={`${inputClass} pl-9 ${errors.lastName ? 'border-red-500 focus:border-red-500' : ''}`}
            />
          </div>
          {errors.lastName && (
            <p id="lastName-error" role="alert" className="text-xs text-red-500 mt-1">
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelClass}>
          Email Address{' '}
          <span aria-hidden="true" className="text-red-500">
            *
          </span>
        </label>
        <div className="relative">
          <Mail className={iconClass} aria-hidden="true" />
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={inputs.email}
            onChange={handleInput}
            placeholder="you@example.com"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            data-error={!!errors.email}
            className={`${inputClass} pl-9 ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
          />
        </div>
        {errors.email && (
          <p id="email-error" role="alert" className="text-xs text-red-500 mt-1">
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phoneNumber" className={labelClass}>
          Phone Number
        </label>
        <div className="relative">
          <Phone className={iconClass} aria-hidden="true" />
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            autoComplete="tel"
            value={inputs.phoneNumber}
            onChange={handleInput}
            placeholder="(781) 000-0000"
            className={`${inputClass} pl-9`}
          />
        </div>
      </div>

      {/* Property Type + Price Range */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="propertyType" className={labelClass}>
            Property Type
          </label>
          <div className="relative">
            <Home className={iconClass} aria-hidden="true" />
            <select
              id="propertyType"
              name="propertyType"
              value={inputs.propertyType}
              onChange={handleInput}
              aria-label="Property type"
              className={`${inputClass} pl-9 appearance-none`}
            >
              <option value="">Select type</option>
              {PROPERTY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="priceRange" className={labelClass}>
            Budget Range
          </label>
          <div className="relative">
            <DollarSign className={iconClass} aria-hidden="true" />
            <select
              id="priceRange"
              name="priceRange"
              value={inputs.priceRange}
              onChange={handleInput}
              aria-label="Budget range"
              className={`${inputClass} pl-9 appearance-none`}
            >
              <option value="">Select range</option>
              {PRICE_RANGES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Timeframe */}
      <div>
        <label htmlFor="timeframe" className={labelClass}>
          Timeframe
        </label>
        <div className="relative">
          <Clock className={iconClass} aria-hidden="true" />
          <select
            id="timeframe"
            name="timeframe"
            value={inputs.timeframe}
            onChange={handleInput}
            aria-label="Timeframe"
            className={`${inputClass} pl-9 appearance-none`}
          >
            <option value="">When are you looking?</option>
            {TIMEFRAMES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className={labelClass}>
          Subject{' '}
          <span aria-hidden="true" className="text-red-500">
            *
          </span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          value={inputs.subject}
          onChange={handleInput}
          placeholder="What can Eileen help you with?"
          aria-required="true"
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          data-error={!!errors.subject}
          className={`${inputClass} ${errors.subject ? 'border-red-500 focus:border-red-500' : ''}`}
        />
        {errors.subject && (
          <p id="subject-error" role="alert" className="text-xs text-red-500 mt-1">
            {errors.subject}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClass}>
          Message{' '}
          <span aria-hidden="true" className="text-red-500">
            *
          </span>
        </label>
        <div className="relative">
          <MessageSquare
            className="absolute left-3 top-3 w-3.5 h-3.5 text-muted-light dark:text-muted-dark pointer-events-none"
            aria-hidden="true"
          />
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={inputs.message}
            onChange={handleInput}
            placeholder="Tell Eileen more about what you're looking for..."
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            data-error={!!errors.message}
            className={`${inputClass} pl-9 resize-none ${errors.message ? 'border-red-500 focus:border-red-500' : ''}`}
          />
        </div>
        {errors.message && (
          <p id="message-error" role="alert" className="text-xs text-red-500 mt-1">
            {errors.message}
          </p>
        )}
      </div>

      {/* Error */}
      {error && (
        <p role="alert" className="text-xs text-red-500 font-medium">
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        aria-label="Send message"
        className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary-light dark:bg-primary-dark text-white dark:text-bg-dark font-bold uppercase text-sm hover:bg-button-light dark:hover:bg-button-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
      >
        <Send className="w-4 h-4" aria-hidden="true" />
        {submitting ? 'Sending...' : 'Send Message'}
      </button>

      <p className="text-xs text-muted-light dark:text-muted-dark text-center">
        <span aria-hidden="true" className="text-red-500">
          *
        </span>{' '}
        Required fields
      </p>
    </form>
  )
}
