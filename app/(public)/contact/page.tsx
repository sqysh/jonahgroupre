'use client'

import { ContactForm } from '@/app/components/forms/ContactForm'
import { Send } from 'lucide-react'
import { useState } from 'react'

const Contact = () => {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div>
      <div className="px-4 py-16 sm:py-24">
        <div className="max-w-155 mx-auto w-full">
          {/* Header */}
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold uppercase text-text-light dark:text-text-dark mb-2">
              Get in Touch
            </h2>
            <div
              className="w-10 h-1 bg-primary-light dark:bg-primary-dark mb-4"
              aria-hidden="true"
            />
            <p className="text-sm text-muted-light dark:text-muted-dark leading-relaxed">
              Fill out the form below and Eileen will get back to you as soon as possible.
            </p>
          </div>

          {submitted ? (
            <div
              role="alert"
              className="bg-primary-light/10 dark:bg-primary-dark/10 border border-primary-light dark:border-primary-dark p-10 text-center"
            >
              <Send
                className="w-10 h-10 text-primary-light dark:text-primary-dark mx-auto mb-4"
                aria-hidden="true"
              />
              <p className="text-lg font-bold text-text-light dark:text-text-dark mb-2">
                Message Sent!
              </p>
              <p className="text-sm text-muted-light dark:text-muted-dark mb-6">
                Eileen will be in touch with you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs uppercase font-semibold text-primary-light dark:text-primary-dark hover:underline focus-visible:outline-none focus-visible:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <ContactForm setSubmitted={setSubmitted} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Contact
